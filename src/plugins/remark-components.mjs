import path from 'node:path';
import { SKIP, visit } from 'unist-util-visit';

/**
 * Componentes estáticos escritos como directivas Markdown (`:::callout`),
 * transformados a HTML en build time vía `data.hName`/`hProperties`, sin
 * pasar por React. Requiere `remark-directive` antes en la cadena.
 *
 * Los estilos viven en src/styles/components.css.
 */

const CALLOUT_TITLES = {
  info: 'Información',
  tip: 'Consejo',
  warning: 'Advertencia',
  danger: 'Peligro',
  note: 'Nota',
};

const SOLUTION_VARIANTS = new Set(['default', 'hint', 'warning', 'info']);

/** `icon` de solution → sufijo de la clase con el logo (src/styles/components.css). */
const SOLUTION_LANGS = {
  Python: 'python',
  JavaScript: 'javascript',
  Java: 'java',
  C: 'c',
  'C++': 'cpp',
  SQL: 'sql',
  MongoDB: 'mongodb',
};

/** Nodo contenedor sin significado Markdown; mdast-util-to-hast lo emite como `data.hName`. */
function block(hName, children, hProperties) {
  return { type: 'componentBlock', data: { hName, hProperties }, children };
}

/** Separa el párrafo `[etiqueta]` que remark-directive pone primero en los contenedores. */
function takeLabel(node) {
  const [first, ...rest] = node.children;
  return first?.type === 'paragraph' && first.data?.directiveLabel
    ? { label: first.children, body: rest }
    : { label: null, body: node.children };
}

/** Bloques de código que son salidas de terminal: ```output (sin fondo) y ```terminal (CRT). */
const TERMINAL_LANGS = { output: ['terminal'], terminal: ['terminal', 'terminal-bg'] };

/** Texto plano de la salida; las líneas que empiezan con `#` van atenuadas como comentarios. */
function terminalChildren(value) {
  return value.split('\n').flatMap((line, i) => {
    const node = /^\s*#/.test(line)
      ? { type: 'element', tagName: 'span', properties: { className: ['terminal-comment'] }, children: [{ type: 'text', value: line }] }
      : { type: 'text', value: line };
    return i === 0 ? [node] : [{ type: 'text', value: '\n' }, node];
  });
}

export default function remarkComponents() {
  return (tree, file) => {
    // <samp> (salida de programa) y no <pre>: el mapping MDX cambia <pre> por PreBlock, que agrega
    // el botón de copiar, y Sätteri no le pasa las props para distinguirlo. Sin <code>, Prism no lo toca.
    // Con `id` se numera ("Salida N", en orden de documento) y con `caption` lleva título: ambos van en <figure>.
    let terminalCount = 0;
    visit(tree, 'code', (node) => {
      const className = TERMINAL_LANGS[node.lang];
      if (!className) return;
      const meta = Object.fromEntries([...(node.meta ?? '').matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
      const number = meta.id ? ++terminalCount : null;
      const caption = number ? `Salida ${number}${meta.caption ? `: ${meta.caption}` : ''}` : meta.caption;
      const children = terminalChildren(node.value);
      // Tipo propio: el manejador de `code` envolvería el resultado en un <pre>
      node.type = 'terminalOutput';
      if (!caption) {
        node.data = { hName: 'samp', hProperties: { className }, hChildren: children };
        return;
      }
      node.data = {
        hName: 'figure',
        hProperties: { id: meta.id, className: ['terminal-figure'] },
        hChildren: [
          { type: 'element', tagName: 'figcaption', properties: { className: ['terminal-caption'] }, children: [{ type: 'text', value: caption }] },
          { type: 'element', tagName: 'samp', properties: { className: [...className, 'terminal-with-caption'] }, children },
        ],
      };
    });

    const source = String(file.value);
    const warn = (node, message) => {
      const name = file.path ? path.relative(process.cwd(), file.path) : 'mdx';
      const line = node.position ? `:${node.position.start.line}` : '';
      console.warn(`[remark-components] ${name}${line}: ${message}`);
    };
    const rawSource = (node) => {
      const start = node.position?.start.offset;
      const end = node.position?.end.offset;
      return start !== undefined && end !== undefined ? source.slice(start, end) : `:${node.name}`;
    };

    visit(tree, ['containerDirective', 'leafDirective', 'textDirective'], (node, index, parent) => {
      // Respuesta oculta; el clic lo maneja el script de LessonLayout (sin React)
      if (node.type === 'textDirective' && node.name === 'reveal') {
        node.data = {
          hName: 'button',
          hProperties: {
            type: 'button',
            className: ['reveal'],
            ariaPressed: 'false',
            ariaLabel: 'Mostrar respuesta',
          },
        };
        node.children = [
          block('span', [{ type: 'text', value: node.attributes?.placeholder ?? '···' }], {
            className: ['reveal-placeholder'],
          }),
          block('span', node.children, { className: ['reveal-content'] }),
        ];
        return;
      }

      // remark-directive también captura texto como "Nota:importante" o "::x";
      // las demás inline y de hoja se restauran tal cual.
      if (node.type !== 'containerDirective') {
        const raw = rawSource(node);
        if (raw !== `:${node.name}`) warn(node, `directiva desconocida "${raw}", se muestra como texto.`);
        parent.children[index] =
          node.type === 'textDirective'
            ? { type: 'text', value: raw }
            : { type: 'paragraph', children: [{ type: 'text', value: raw }] };
        return SKIP;
      }

      const attrs = node.attributes ?? {};
      switch (node.name) {
        case 'callout': {
          let type = attrs.type ?? 'info';
          if (!Object.hasOwn(CALLOUT_TITLES, type)) {
            warn(node, `tipo de callout desconocido "${type}", se usa "info".`);
            type = 'info';
          }
          // El título va como etiqueta (admite Markdown y matemáticas) o como atributo de texto plano
          const { label, body } = takeLabel(node);
          const title = label ?? [{ type: 'text', value: attrs.title ?? CALLOUT_TITLES[type] }];
          node.data = { hName: 'aside', hProperties: { className: ['callout', `callout-${type}`] } };
          node.children = [
            block('div', [block('span', title, { className: ['callout-title'] })], {
              className: ['callout-header'],
            }),
            block('div', body, { className: ['callout-body'] }),
          ];
          return;
        }

        case 'solution': {
          // <details> nativo: el navegador abre y cierra sin JS. `icon` cambia la ampolleta por el logo del lenguaje.
          let variant = attrs.variant ?? 'default';
          if (!SOLUTION_VARIANTS.has(variant)) {
            warn(node, `variante de solution desconocida "${variant}", se usa "default".`);
            variant = 'default';
          }
          let icon = ['solution-idea'];
          if (attrs.icon) {
            if (Object.hasOwn(SOLUTION_LANGS, attrs.icon)) icon = ['solution-lang', `solution-lang-${SOLUTION_LANGS[attrs.icon]}`];
            else warn(node, `icono de solution desconocido "${attrs.icon}", se usa la ampolleta.`);
          }
          const { label, body } = takeLabel(node);
          const title = label ?? [{ type: 'text', value: attrs.title ?? 'Solución' }];
          node.data = {
            hName: 'details',
            hProperties: {
              className: ['solution', `solution-${variant}`],
              open: attrs.open !== undefined && attrs.open !== 'false' ? true : undefined,
            },
          };
          node.children = [
            block(
              'summary',
              [
                block(
                  'span',
                  [
                    block('span', [], { className: icon }),
                    block('span', [], { className: ['solution-chevron'] }),
                  ],
                  { className: ['solution-icons'], ariaHidden: 'true' },
                ),
                block('span', title, { className: ['solution-title'] }),
              ],
              { className: ['solution-header'] },
            ),
            block('div', body, { className: ['solution-content'] }),
          ];
          return;
        }

        case 'box': {
          const { label, body } = takeLabel(node);
          const title = label ?? (attrs.title ? [{ type: 'text', value: attrs.title }] : null);
          node.data = { hName: 'div', hProperties: { className: ['box'] } };
          node.children = [
            ...(title ? [block('div', title, { className: ['box-title'] })] : []),
            block('div', body, { className: ['box-content'] }),
          ];
          return;
        }

        case 'columns':
          node.data = { hName: 'div', hProperties: { className: ['columns'] } };
          return;

        case 'col':
          node.data = { hName: 'div' };
          return;

        default:
          warn(node, `directiva desconocida ":::${node.name}", se muestra solo su contenido.`);
          node.data = { hName: 'div' };
          return;
      }
    });
  };
}

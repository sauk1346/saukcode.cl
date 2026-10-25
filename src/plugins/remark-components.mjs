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

export default function remarkComponents() {
  return (tree, file) => {
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
      // remark-directive también captura texto como "Nota:importante" o "::x";
      // las inline y de hoja aún no tienen componentes, se restauran tal cual.
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

        default:
          warn(node, `directiva desconocida ":::${node.name}", se muestra solo su contenido.`);
          node.data = { hName: 'div' };
          return;
      }
    });
  };
}

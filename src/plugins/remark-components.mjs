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

/** Colores de `:red[texto]` y compañía (anotaciones en tinta) y de las filas `:highlight{color=…}`. */
const COLORS = new Set(['red', 'blue', 'green', 'gray', 'yellow']);

const TABLE_LAYOUTS = new Set(['auto', 'fixed', 'mixed']);
const AUDIO_URL = /\.(mp3|wav|ogg|m4a)$/i;

const isBlank = (node) => node.type === 'text' && !node.value.trim();
const isDirective = (node, name) => node?.type === 'textDirective' && node.name === name;

/**
 * Tabla GFM → <div.table-wrapper><table.smart-table>, con nodos propios en vez del manejador
 * `table` de mdast-util-to-hast para poder agregar caption, colspan y clases. En la tabla:
 * - `:highlight` (o `:highlight{color="green"}`) al inicio de la primera celda destaca la fila.
 * - `:section[Texto]` como única celda de la fila es un separador de grupo a todo el ancho.
 * - Una celda hecha solo de `:li[...]` es una lista; un enlace a un .mp3 es un reproductor.
 * - Encabezados vacíos: tabla sin <thead>.
 */
function buildTable(table, { id, caption, layout = 'auto', widths = [] }, warn) {
  const [headerRow, ...bodyRows] = table.children;
  const columns = Math.max(...table.children.map((row) => row.children.length));
  const align = (i) => (table.align?.[i] ? `text-align:${table.align[i]}` : undefined);

  const cellContent = (cell) => {
    const items = cell.children.filter((c) => !isBlank(c));
    if (items.length && items.every((c) => isDirective(c, 'li'))) {
      return [block('ul', items.map((li) => block('li', li.children)))];
    }
    return cell.children.map((child) => {
      if (child.type === 'link' && AUDIO_URL.test(child.url)) {
        return block('audio', [block('source', [], { src: child.url, type: 'audio/mpeg' }), ...child.children], {
          controls: true,
        });
      }
      if (child.type === 'inlineMath') return block('span', [child], { className: ['katex-wrapper'] });
      return child;
    });
  };

  const rows = bodyRows.map((row) => {
    const [first, ...rest] = row.children;
    if (first && rest.every((c) => !c.children.length)) {
      const items = first.children.filter((c) => !isBlank(c));
      if (items.length === 1 && isDirective(items[0], 'section')) {
        return block('tr', [block('td', items[0].children, { colSpan: columns, className: ['table-section'] })]);
      }
    }
    let className;
    if (first && isDirective(first.children[0], 'highlight')) {
      let color = first.children[0].attributes?.color ?? 'yellow';
      if (!COLORS.has(color)) {
        warn(first.children[0], `color de highlight desconocido "${color}", se usa "yellow".`);
        color = 'yellow';
      }
      className = ['table-highlight', `table-highlight-${color}`];
      first.children.shift();
      if (first.children[0]?.type === 'text') first.children[0].value = first.children[0].value.trimStart();
    }
    return block(
      'tr',
      row.children.map((cell, i) => block('td', cellContent(cell), { style: align(i) })),
      { className },
    );
  });

  const hasHeader = headerRow.children.some((cell) => cell.children.length);
  const width = (i) => (layout === 'mixed' && widths[i] ? `width:${widths[i]}` : undefined);
  const style = (i) => [width(i), align(i)].filter(Boolean).join(';') || undefined;
  const header = hasHeader
    ? [block('thead', [block('tr', headerRow.children.map((cell, i) => block('th', cellContent(cell), { style: style(i) })))])]
    : [];

  const layoutClass = layout === 'auto' ? [] : [`smart-table-${layout}`];
  return block(
    'div',
    [
      block(
        'table',
        [
          ...(caption ? [block('caption', [{ type: 'text', value: caption }])] : []),
          ...header,
          ...(rows.length ? [block('tbody', rows)] : []),
        ],
        { className: ['smart-table', ...layoutClass] },
      ),
    ],
    { id, className: ['table-wrapper'] },
  );
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

    // Tablas: las que tienen `id` se numeran ("Tabla N", en orden de documento) y `:tableref{#id}` enlaza a ellas,
    // aunque la referencia aparezca antes que la tabla.
    const tableNumbers = new Map(); // id → número
    const numberedTables = new Map(); // nodo → número
    visit(tree, 'containerDirective', (node) => {
      const id = node.attributes?.id;
      if (node.name !== 'table' || !id) return;
      numberedTables.set(node, numberedTables.size + 1);
      if (tableNumbers.has(id)) warn(node, `id de tabla repetido "${id}".`);
      else tableNumbers.set(id, numberedTables.size);
    });
    // Las tablas GFM sueltas usan el formato por defecto; las de :::table se arman con sus atributos más abajo
    visit(tree, 'table', (node, index, parent) => {
      if (parent.type === 'containerDirective' && parent.name === 'table') return SKIP;
      parent.children[index] = buildTable(node, {}, warn);
      return SKIP;
    });

    visit(tree, ['containerDirective', 'leafDirective', 'textDirective'], (node, index, parent) => {
      if (node.type === 'textDirective' && node.name === 'tableref') {
        const id = node.attributes?.id;
        const number = tableNumbers.get(id);
        if (!number) warn(node, `:tableref sin tabla destino "${id ?? ''}".`);
        node.data = number
          ? { hName: 'a', hProperties: { href: `#${id}` } }
          : { hName: 'span', hProperties: { className: ['table-ref-error'] } };
        node.children = [{ type: 'text', value: number ? `Tabla ${number}` : '[Tabla ?]' }];
        return;
      }

      if (node.type === 'textDirective' && COLORS.has(node.name) && rawSource(node).startsWith(`:${node.name}[`)) {
        node.data = { hName: 'span', hProperties: { className: [`text-${node.name}`] } };
        return;
      }

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

        case 'table': {
          const tables = node.children.filter((c) => c.type === 'table');
          if (tables.length !== 1 || node.children.length !== 1) {
            warn(node, ':::table debe contener exactamente una tabla Markdown.');
          }
          if (!tables.length) {
            node.data = { hName: 'div' };
            return;
          }
          let layout = attrs.layout ?? 'auto';
          if (!TABLE_LAYOUTS.has(layout)) {
            warn(node, `layout de tabla desconocido "${layout}", se usa "auto".`);
            layout = 'auto';
          }
          const number = numberedTables.get(node);
          const caption = number ? `Tabla ${number}${attrs.caption ? `: ${attrs.caption}` : ''}` : attrs.caption;
          const widths = attrs.widths ? attrs.widths.split(',').map((w) => w.trim()) : [];
          parent.children[index] = buildTable(tables[0], { id: attrs.id, caption, layout, widths }, warn);
          return [SKIP, index]; // revisitar el reemplazo (no el nodo viejo): las celdas pueden tener otras directivas
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

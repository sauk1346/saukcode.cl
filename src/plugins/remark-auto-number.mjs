import { visit } from 'unist-util-visit';

/**
 * Numera SmartTable / SmartFigure en orden de documento,
 * en build time, inyectando un atributo `number` — reemplaza los contextos
 * React (TableProvider/FigureProvider) del sitio Next. Las salidas de terminal
 * (```output / ```terminal) las numera remark-components.
 *
 * Replica la semántica original: solo se numeran elementos CON `id` y sin
 * `autoNumber={false}`. Además resuelve TableRef/FigureRef
 * inyectándoles el número de su destino.
 */
const COUNTED = {
  SmartTable: 'table',
  SmartFigure: 'figure',
};

const REFS = {
  TableRef: 'table',
  FigureRef: 'figure',
};

function getAttr(node, name) {
  return (node.attributes || []).find(
    (a) => a.type === 'mdxJsxAttribute' && a.name === name
  );
}

function isAutoNumberOff(node) {
  const attr = getAttr(node, 'autoNumber');
  if (!attr) return false;
  // autoNumber={false} llega como expresión con value 'false'
  return attr.value && typeof attr.value === 'object' && attr.value.value === 'false';
}

export default function remarkAutoNumber() {
  return (tree) => {
    const counters = { table: 0, figure: 0 };
    const numbersById = {};

    // Pasada 1: numerar elementos en orden de documento
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      const kind = COUNTED[node.name];
      if (!kind) return;

      const idAttr = getAttr(node, 'id');
      const id = idAttr && typeof idAttr.value === 'string' ? idAttr.value : null;
      if (!id || isAutoNumberOff(node)) return;

      counters[kind] += 1;
      numbersById[`${kind}:${id}`] = counters[kind];
      node.attributes.push({
        type: 'mdxJsxAttribute',
        name: 'number',
        value: String(counters[kind]),
      });
    });

    // Pasada 2: resolver referencias cruzadas
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      const kind = REFS[node.name];
      if (!kind) return;

      const idAttr = getAttr(node, 'id');
      const id = idAttr && typeof idAttr.value === 'string' ? idAttr.value : null;
      const number = id ? numbersById[`${kind}:${id}`] : undefined;
      if (number) {
        node.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'number',
          value: String(number),
        });
      }
    });
  };
}

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkComponents from '../plugins/remark-components.mjs';
import { PreBlock } from '../components/mdx/Pre.jsx';
import { Code } from '../components/mdx/InlineCode.jsx';
import SmartFigure from '../components/mdx/SmartFigure.jsx';
import SmartTable from '../components/mdx/SmartTable.jsx';

const components = {
  pre: PreBlock,
  code: Code,
  SmartFigure,
  SmartTable,
};

const evaluateOptions = {
  ...runtime,
  // remark-components: salidas ```output / ```terminal (estilos en src/styles/components.css)
  remarkPlugins: [remarkGfm, remarkMath, remarkComponents],
  rehypePlugins: [rehypeKatex],
};

// A diferencia de Next (que serializa elementos React server→client), las
// props de una isla Astro deben ser JSON-serializables: las cartas se
// compilan y renderizan a HTML estático en build, y FlashcardStudy las
// inyecta con dangerouslySetInnerHTML.
async function renderContent(source) {
  const { default: Content } = await evaluate(source, evaluateOptions);
  return renderToStaticMarkup(React.createElement(Content, { components }));
}

export async function renderMdxCards(cards) {
  return Promise.all(
    cards.map(async (card) => ({
      ...card,
      front: await renderContent(card.front),
      back: await renderContent(card.back),
    }))
  );
}

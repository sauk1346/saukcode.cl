import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeKatex from 'rehype-katex';
import remarkComponents from '../plugins/remark-components.mjs';
import { PreBlock } from '../components/mdx/Pre.jsx';
import { Code } from '../components/mdx/InlineCode.jsx';
import SmartFigure from '../components/mdx/SmartFigure.jsx';

const components = {
  pre: PreBlock,
  code: Code,
  SmartFigure,
};

const evaluateOptions = {
  ...runtime,
  // remark-directive + remark-components: misma sintaxis que las lecciones (:::callout, :::table,
  // ```output…); estilos en src/styles/components.css
  remarkPlugins: [remarkGfm, remarkMath, remarkDirective, remarkComponents],
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

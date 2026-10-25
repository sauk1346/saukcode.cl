// Componentes React del mapping MDX (los wrappers .astro se importan en el
// frontmatter de la página de lección: importarlos desde un .js les hace
// perder el metadata de renderer de Astro).
import { H1, H2, H3 } from './Headings.jsx';
import { Paragraph, P } from './Paragraph.jsx';
import { UnorderedList, OrderedList, ListItem, List } from './Lists.jsx';
import { Blockquote } from './Blockquote.jsx';
import { CustomIframe } from './Iframe.jsx';
import { SmartLink } from '../ui/SmartLink.jsx';
import { FigureProvider, FigureRef } from './SmartFigure.jsx';
import { PreBlock } from './Pre.jsx';
import { Code } from './InlineCode.jsx';

export const reactMdxComponents = {
  // Elementos markdown
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  pre: PreBlock,
  code: Code,
  a: SmartLink,
  iframe: CustomIframe,
  // Componentes con nombre
  P,
  List,
  FigureProvider,
  FigureRef,
  SmartLink,
  CustomIframe,
};

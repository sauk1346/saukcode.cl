import styles from './CardRenderer.module.css';

// El contenido llega como HTML pre-renderizado en build (ver renderMdxCards):
// las props de una isla Astro deben ser serializables, así que las cartas ya
// no viajan como elementos React.
export default function CardRenderer({ content, layout }) {
  return (
    <div
      className={`${styles.content} ${layout === 'language' ? styles.language : ''}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

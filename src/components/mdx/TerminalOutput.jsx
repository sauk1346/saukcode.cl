import React from "react";
import styles from "./TerminalOutput.module.css";

// La numeración la inyecta remark-auto-number en build time (prop `number`).
// TerminalProvider queda como passthrough por compatibilidad.
export function TerminalProvider({ children }) {
  return <>{children}</>;
}

export function TerminalRef({ id, number }) {
  if (!number) {
    return <span className={styles.terminalRefError}>[Salida ?]</span>;
  }

  return (
    <a href={`#${id}`} className={styles.terminalRef}>
      Salida {number}
    </a>
  );
}

// En Astro MDX los children de una expresión {`...`} llegan como elemento
// envuelto, no como string plano — extraer el texto recursivamente.
function unescapeHtml(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function toText(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (typeof node === "object" && node.props) {
    // Wrapper de HTML estático de Astro: el texto viene escapado en props.value
    const v = node.props.value;
    if (typeof v === "string" || v instanceof String) return unescapeHtml(String(v));
    return toText(node.props.children);
  }
  return "";
}

function renderWithComments(children) {
  const text = toText(children);
  const lines = text.split("\n");

  return lines.map((line, i) => {
    const isLast = i === lines.length - 1;
    const suffix = isLast ? null : "\n";

    if (/^\s*#/.test(line)) {
      return (
        <React.Fragment key={i}>
          <span className={styles.comment}>{line}</span>
          {suffix}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={i}>
        {line}
        {suffix}
      </React.Fragment>
    );
  });
}

export function TerminalOutput({ children, withBg = false, className = "", caption, id, autoNumber = true, number }) {
  const terminalClass = withBg ? styles.terminalWithBg : styles.terminal;

  const fullCaption = autoNumber && number
    ? `Salida ${number}${caption ? `: ${caption}` : ""}`
    : caption;

  if (fullCaption) {
    return (
      <figure id={id} className={styles.figure}>
        <figcaption className={styles.caption}>{fullCaption}</figcaption>
        <pre className={`${terminalClass} ${styles.withCaption} ${className}`}>
          {renderWithComments(children)}
        </pre>
      </figure>
    );
  }

  return (
    <pre id={id} className={`${terminalClass} ${className}`}>
      {renderWithComments(children)}
    </pre>
  );
}

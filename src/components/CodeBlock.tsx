import { useMemo } from "react";

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "await", "async",
  "require", "import", "from", "export", "new", "try", "catch", "finally", "for", "of"
]);

type Token = { type: "kw" | "fn" | "str" | "comm" | "punct" | "text"; value: string };

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  // comment
  const cIdx = line.indexOf("//");
  let code = line;
  let comment = "";
  if (cIdx >= 0) {
    code = line.slice(0, cIdx);
    comment = line.slice(cIdx);
  }

  const re = /(['"`])(?:\\.|(?!\1).)*\1|\b[a-zA-Z_$][\w$]*\b|\s+|[^\w\s]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    const t = m[0];
    if (/^['"`]/.test(t)) tokens.push({ type: "str", value: t });
    else if (/^\s+$/.test(t)) tokens.push({ type: "text", value: t });
    else if (/^[a-zA-Z_$]/.test(t)) {
      if (KEYWORDS.has(t)) tokens.push({ type: "kw", value: t });
      else {
        // function-call detection: next non-space char is '('
        const after = code.slice(m.index + t.length);
        if (/^\s*\(/.test(after)) tokens.push({ type: "fn", value: t });
        else tokens.push({ type: "text", value: t });
      }
    } else tokens.push({ type: "punct", value: t });
  }

  if (comment) tokens.push({ type: "comm", value: comment });
  return tokens;
}

const COLORS: Record<Token["type"], string> = {
  kw: "var(--color-syntax-keyword)",
  fn: "var(--color-syntax-fn)",
  str: "var(--color-syntax-string)",
  comm: "var(--color-syntax-comment)",
  punct: "#374151",
  text: "#1a1a1a",
};

export function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const lines = useMemo(() => code.split("\n").map(tokenizeLine), [code]);

  return (
    <div className="rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface-alt)] overflow-hidden font-mono text-[13px] leading-[1.7]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--color-line)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        {filename && (
          <span className="ml-3 text-[12px] text-[var(--color-ink-soft)] font-sans">{filename}</span>
        )}
      </div>
      <pre className="p-5 overflow-x-auto">
        <code>
          {lines.map((tokens, i) => (
            <div key={i}>
              {tokens.length === 0 ? "\u00A0" : tokens.map((t, j) => (
                <span key={j} style={{ color: COLORS[t.type] }}>{t.value}</span>
              ))}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

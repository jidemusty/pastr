import { codeToHtml } from "shiki";

export async function highlightCode(
  code: string,
  language: string = "text",
): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language,
      theme: "github-light",
    });

    return html;
  } catch (e) {
    console.error("Error highlighting code:", e);
    // fallback to plain text with basic HTML escaping
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"'"]/g, (m) => map[m]);
}

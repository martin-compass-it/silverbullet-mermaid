export function widget(
  bodyText: string,
): { html: string; script: string } {
  return {
    html: `<pre class="mermaid">${bodyText.replaceAll("<", "&lt;")}</pre>`,
    script: `
    loadJsByUrl("https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.min.js","sha256-a43bc1afd446f9c4cc66ac5dd45d02e8d65e26fc5344ec0ef787f88d6ddb6f9e").then(() => {
      mermaid.init().then(updateHeight);
      mermaid.registerIconPacks([
        {
          name: 'logos',
          loader: () =>
            fetch('https://unpkg.com/@iconify-json/logos@1/icons.json').then((res) => res.json()),
        },
      ]);
    });
    document.addEventListener("click", () => {
      api({type: "blur"});
    });
    `,
  };
}

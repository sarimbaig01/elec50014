document.addEventListener("DOMContentLoaded", () => {
  // Find all <pseudocode> tags
  const blocks = document.querySelectorAll("pseudocode");

  blocks.forEach(block => {
    const file = block.getAttribute("src"); // filename comes from src attribute
    if (!file) return;

    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not load pseudocode from ${file}`);
        }
        return response.text();
      })
      .then(data => {
        // Escape HTML entities
        let escaped = data
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        // Bold common pseudocode keywords (CLSR-style)
        const keywordPattern = /\b(IF|ELSE|WHILE|FOR|RETURN|SET|THEN|DO|END|TO|UNTIL|BREAK|CONTINUE|REPEAT|BEGIN|AND|OR|NOT|NULL)\b/g;
        escaped = escaped.replace(keywordPattern, "<strong>$1</strong>");

        // Bold the first line if it's a function header like: smalloc(byte_count)
        escaped = escaped.replace(/^([a-z_]+\s*\(.*?\))$/im, "<strong>$1</strong>");

        // Create and insert HTML elements
        const pre = document.createElement("pre");
        pre.innerHTML = escaped;

        const wrapper = document.createElement("div");
        wrapper.className = "pseudocode";
        wrapper.appendChild(pre);

        block.replaceWith(wrapper);
      })
      .catch(error => {
        console.error(error);
      });
  });
});

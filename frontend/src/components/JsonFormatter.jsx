import { useState } from "react";

function JsonFormatter() {
  const [input, setInput] = useState("");

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
    } catch {
      alert("Invalid JSON");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
    } catch {
      alert("Invalid JSON");
    }
  };

  const copyJSON = () => {
    if (!input.trim()) return;
    navigator.clipboard.writeText(input);
    alert("Copied!");
  };

  const clearJSON = () => {
    if (!input.trim()) return;

    const confirmClear = window.confirm(
      "This will remove your JSON. Make sure you've copied it if needed.\n\nClear anyway?",
    );

    if (confirmClear) {
      setInput("");
    }
  };

  return (
    <div>
      <h2>JSON Formatter</h2>

      <textarea
        rows="10"
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="buttons">
        <button onClick={formatJSON}>Format</button>
        <button onClick={minifyJSON}>Minify</button>
        <button onClick={copyJSON}>Copy</button>
        <button onClick={clearJSON} style={{ backgroundColor: "#475569" }}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default JsonFormatter;

import { useState } from "react";

function ApiTester() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState(null);

  const sendRequest = async () => {
    try {
      const start = performance.now();

      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (method !== "GET" && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const end = performance.now();

      const contentType = res.headers.get("content-type") || "";
      let formattedResponse = "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        formattedResponse = JSON.stringify(data, null, 2);
      } else {
        formattedResponse = await res.text();
      }

      setStatus(res.status);
      setResponse(formattedResponse);
      setTime((end - start).toFixed(2));
    } catch {
      setStatus("Error");
      setResponse("Request failed");
      setTime(null);
    }
  };

  // --- NEW FUNCTION ---
  const copyResponse = () => {
    if (!response) return; // Don't copy if empty
    navigator.clipboard.writeText(response);
    alert("Response copied!");
  };

  return (
    <div>
      <h2>API Tester</h2>

      <div className="api-row">
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          placeholder="Enter API URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <textarea
        rows="5"
        placeholder="Request Body (JSON optional)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button onClick={sendRequest}>Send Request</button>

      <p
        style={{ color: status >= 200 && status < 300 ? "#22c55e" : "#ef4444" }}
      >
        Status: {status}
      </p>

      <p>Response Time: {time ? `${time} ms` : "-"}</p>

      <textarea
        rows="10"
        value={response}
        readOnly
        placeholder="Response will appear here..."
      />

      {/* --- NEW BUTTON --- */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={copyResponse} disabled={!response}>
          Copy Response
        </button>
      </div>
    </div>
  );
}

export default ApiTester;

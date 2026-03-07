import JsonFormatter from "./components/JsonFormatter";
import ApiTester from "./components/ApiTester";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>⚙️ DevTool</h1>
      <p className="subtitle">JSON Formatter + API Tester</p>

      <div className="tool">
        <JsonFormatter />
      </div>

      <div className="tool">
        <ApiTester />
      </div>
    </div>
  );
}

export default App;

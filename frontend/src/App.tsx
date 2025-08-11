import React, { useState } from "react";
import axios from "axios";
import CodeEditor from "./components/CodeEditor";

export default function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// paste code here");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleSubmit() {
    setLoading(true);
    setResult(null);
    try {
      const base = (import.meta.env.VITE_API_BASE as string) || "http://localhost:4000";
      const resp = await axios.post(`${base}/api/review`, {
        language,
        code
      }, { timeout: 120000 });
      setResult(resp.data.review);
    } catch (err: any) {
      setResult({ error: err?.response?.data || err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 1000, margin: "0 auto" }}>
      <h1>AI Code Review Assistant</h1>
      <div style={{ marginBottom: 8 }}>
        <label>Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <button onClick={handleSubmit} style={{ marginLeft: 12 }} disabled={loading}>
          {loading ? "Reviewing..." : "Run Review"}
        </button>
      </div>

      <CodeEditor value={code} onChange={setCode} language={language} />

      <div style={{ marginTop: 20 }}>
        <h2>Review Output</h2>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f5f5f5", padding: 12 }}>
          {result ? JSON.stringify(result, null, 2) : "Paste code and click Run Review"}
        </pre>
      </div>
    </div>
  );
}

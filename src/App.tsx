import { useState } from "react";
import { useJobStatus } from "./useJobStatus";
import { runAgent } from "./agent";
import { getBasket } from "./tools";

// The screen that uses your hook.
export default function App() {
  const [jobId, setJobId] = useState("job-a");

  // Optional — only if there's time: use the hook and render the job's status

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <button onClick={() => setJobId("job-a")}>Job A</button>{" "}
      <button onClick={() => setJobId("job-b")}>Job B</button>
      <h2>{jobId}</h2>
      <AgentPanel />
    </div>
  );
}

// Part 2 — runs your agent. You don't need to change this.
function AgentPanel() {
  const [output, setOutput] = useState("");

  async function run(message: string) {
    setOutput("Running…");
    try {
      const answer = await runAgent(message);
      setOutput(`${answer}\n\nBasket: ${JSON.stringify(getBasket())}`);
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : String(e)}\n\nBasket: ${JSON.stringify(getBasket())}`);
    }
  }

  return (
    <div style={{ marginTop: 32, borderTop: "1px solid #ccc", paddingTop: 16 }}>
      <h3>Part 2: Agent</h3>
      <button onClick={() => run("Add two tubs of vegan chocolate protein to my basket")}>
        Add vegan protein
      </button>{" "}
      <button onClick={() => run("Compare all your protein products for me")}>Compare proteins</button>
      <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
    </div>
  );
}

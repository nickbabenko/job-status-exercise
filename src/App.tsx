import { useState } from "react";
import { useJobStatus } from "./useJobStatus";

// The screen that uses your hook.
export default function App() {
  const [jobId, setJobId] = useState("job-a");

  // Optional — only if there's time: use the hook and render the job's status

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <button onClick={() => setJobId("job-a")}>Job A</button>{" "}
      <button onClick={() => setJobId("job-b")}>Job B</button>
      <h2>{jobId}</h2>
    </div>
  );
}

// Mock API — you don't need to change this file.
// Returns the latest status for a job. Responses take 0.3–1.5s and fail ~10% of the time.

const calls: Record<string, number> = {};

export async function fetchJobStatus(jobId: string): Promise<unknown> {
  const n = (calls[jobId] = (calls[jobId] ?? 0) + 1);
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 1200));

  if (Math.random() < 0.1) throw new Error("Network request failed");

  const sequence: unknown[] = [
    { status: "queued", position: 3 },
    { status: "running", progress: 20 },
    { status: "paused" },
    { status: "running", progress: 75 },
    { status: "completed", resultUrl: `https://example.com/results/${jobId}` },
  ];

  return { jobId, ...(sequence[Math.min(n - 1, sequence.length - 1)] as object) };
}

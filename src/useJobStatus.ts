import { fetchJobStatus } from "./api";

// The API returns one of:
//   { status: "queued", position: number }
//   { status: "running", progress: number }        // 0-100
//   { status: "completed", resultUrl: string }
//   { status: "failed", error: string }
//   { status: "cancelled" }
//
// Task:
// 1. Type the job status.
// 2. Write useJobStatus(jobId) for a React screen. It should:
//    - fetch immediately, then poll every 5 seconds
//    - stop polling once the job has completed, failed or been cancelled
//    - expose loading and error states to the screen

export type JobStatus = unknown; // TODO

export function useJobStatus(jobId: string) {
  // TODO
}

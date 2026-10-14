import { callModel, type Message } from "./model";
import { searchProducts, addToBasket } from "./tools";

// Part 2 — a shopping assistant agent.
//
// callModel (src/model.ts) is a mock LLM with tool calling. The tools are in src/tools.ts.
//
// Task:
// Write runAgent(userMessage). It should:
//   - send the conversation to the model
//   - when the model asks for a tool, run it and send the result back
//   - repeat until the model gives a final answer, and return that answer's text
//
// It doesn't need to be production-ready. Talk through what you'd do next.

export async function runAgent(userMessage: string): Promise<string> {
  // TODO
  throw new Error("Not implemented");
}

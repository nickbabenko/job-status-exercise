import { callModel, type Message, type ToolCall } from "./model";
import { searchProducts, addToBasket } from "./tools";

// Part 2 — code review.
//
// A teammate has opened a PR adding this shopping assistant agent loop.
// callModel (src/model.ts) is a mock LLM with tool calling. The tools are in src/tools.ts.
// Use the buttons on the page to run it.
//
// Review it as you would a real PR: what would you comment on, and what would you change?

type ModelResponse =
  | { type: "tool_call"; toolCall: ToolCall }
  | { type: "final"; text: string };

const tools: Record<string, (args: any) => Promise<unknown>> = {
  searchProducts,
  addToBasket,
};

export async function runAgent(userMessage: string): Promise<string> {
  const messages: Message[] = [{ role: "user", content: userMessage }];

  while (true) {
    const response = (await callModel(messages)) as ModelResponse;

    if (response.type === "final") {
      return response.text;
    }

    const { toolCall } = response;
    messages.push({ role: "assistant", toolCall });

    const result = await tools[toolCall.name](JSON.parse(toolCall.arguments));
    messages.push({ role: "tool", toolCallId: toolCall.id, content: JSON.stringify(result) });
  }
}

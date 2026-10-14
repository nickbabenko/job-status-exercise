// Mock LLM — you don't need to change this file.
// Behaves like a chat model with tool calling. Responses take 0.2–0.8s.

export type ToolCall = { id: string; name: string; arguments: string }; // arguments is a JSON string

export type Message =
  | { role: "user"; content: string }
  | { role: "assistant"; toolCall: ToolCall }
  | { role: "tool"; toolCallId: string; content: string };

// Returns one of:
//   { type: "tool_call", toolCall: { id, name, arguments } }
//   { type: "final", text: string }
export async function callModel(messages: Message[]): Promise<unknown> {
  await new Promise((r) => setTimeout(r, 200 + Math.random() * 600));

  const first = messages[0];
  const prompt = first && first.role === "user" ? first.content.toLowerCase() : "";
  const n = messages.filter((m) => m.role === "tool").length;
  const call = (id: string, name: string, args: string) => ({
    type: "tool_call",
    toolCall: { id, name, arguments: args },
  });

  if (prompt.includes("compare")) {
    return call(`call_${n}`, "searchProducts", JSON.stringify({ query: `protein ${n}` }));
  }

  switch (n) {
    case 0:
      return call("call_0", "searchProducts", '{"query":"vegan protein powder"}');
    case 1:
      return call("call_1", "addToBasket", '{"productId":"p-102","quantity":"2"}');
    case 2:
      return call("call_2", "addToBasket", '{"productId":"p-102","quantity":2}');
    case 3:
      return call("call_2", "addToBasket", '{"productId":"p-102","quantity":2}');
    case 4:
      return call("call_4", "checkDelivery", '{"postcode":"M1 1AA"}');
    default:
      return { type: "final", text: "I've added 2 × Vegan Protein Powder (Chocolate) to your basket." };
  }
}

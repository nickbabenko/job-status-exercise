// Tools the agent can use — you don't need to change this file.

type Product = { id: string; name: string; price: number; vegan: boolean };

const catalogue: Product[] = [
  { id: "p-101", name: "Whey Protein Powder (Chocolate)", price: 24.99, vegan: false },
  { id: "p-102", name: "Vegan Protein Powder (Chocolate)", price: 27.99, vegan: true },
  { id: "p-103", name: "Vegan Protein Bar (Peanut)", price: 2.49, vegan: true },
];

const basket: Record<string, number> = {};

export async function searchProducts(args: { query: string }): Promise<Product[]> {
  const words = args.query.toLowerCase().split(/\s+/);
  return catalogue.filter((p) => words.some((w) => p.name.toLowerCase().includes(w)));
}

export async function addToBasket(args: { productId: string; quantity: number }): Promise<{ ok: true }> {
  if (!catalogue.some((p) => p.id === args.productId)) throw new Error(`Unknown product ${args.productId}`);
  basket[args.productId] = (basket[args.productId] ?? 0) + args.quantity;
  return { ok: true };
}

export function getBasket(): Record<string, number> {
  return { ...basket };
}

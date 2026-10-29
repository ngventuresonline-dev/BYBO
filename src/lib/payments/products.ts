/**
 * What can be bought on /pay. Prices are set here, on the server: the browser
 * only sends a product id, so an amount can't be changed in the page.
 */

export type Product = { id: string; name: string; price: number; lead: string; description: string; includes: string[] };

export const PRODUCTS: Product[] = [
  {
    id: 'blueprint',
    name: 'Blueprint',
    price: 15000,
    lead: 'Know before you commit.',
    description: 'We study the work, the tools and the numbers, then show you where a system or product pays back first.',
    includes: ['Process and opportunity map', 'Recommended first build', 'Fixed scope and quote in writing'],
  },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id) ?? null;

// Outputs: /builtwith.json
export function GET() {
  return new Response(
    JSON.stringify({
      name: "Astro",
      url: import.meta.env.BLABLA,
    }),
  );
}
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const priceId = searchParams.get("priceId");

  if (!priceId) {
    return new Response(JSON.stringify({ error: "Missing priceId" }), { status: 400 });
  }

  try {
    const price = await stripe.prices.retrieve(priceId);
    return new Response(JSON.stringify({ amount: price.unit_amount ?? 0 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Stripe error" }), { status: 500 });
  }
}

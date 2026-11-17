"use client";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/** Every table and function lives in the `flotempo` schema. */
export const db = createClient(url, key, {
  db: { schema: "flotempo" },
  realtime: { params: { eventsPerSecond: 20 } },
});

export const rupees = (n: number | null | undefined) =>
  n == null ? "—" : "₹" + Math.round(Number(n)).toLocaleString("en-IN");

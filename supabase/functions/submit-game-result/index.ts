import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.1";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BodySchema = z.object({
  board_size: z.number().int().min(4).max(12),
  moves: z.number().int().min(1).max(10000),
  time_ms: z.number().int().min(100).max(3600000),
  completed: z.literal(true),
  difficulty: z.enum(["easy", "medium", "hard"]),
  hints_used: z.number().int().min(0).max(10),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      console.error("Missing env vars", { hasUrl: !!supabaseUrl, hasAnon: !!supabaseAnonKey, hasService: !!supabaseServiceKey });
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await anonClient.auth.getUser();

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { board_size, moves, time_ms, difficulty, hints_used } = parsed.data;

    // Difficulty base score: Hard > Medium > Easy
    const baseByDifficulty: Record<string, number> = { easy: 5000, medium: 8000, hard: 12000 };
    const baseScore = baseByDifficulty[difficulty] ?? 8000;

    // Penalties
    const timePenalty = Math.floor(time_ms / 100); // 1pt per 0.1s
    const movePenalty = Math.max(0, moves - board_size) * 25; // only extra moves penalized
    const hintPenalty = hints_used * 1500;
    const sizeBonus = board_size * 150;

    const score = Math.max(
      0,
      Math.round(baseScore + sizeBonus - timePenalty - movePenalty - hintPenalty)
    );

    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { error: insertError } = await adminClient.from("game_history").insert({
      user_id: user.id,
      board_size,
      moves,
      time_ms,
      score,
      completed: true,
      difficulty,
      hints_used,
    });

    if (insertError) {
      console.error("Insert failed:", insertError);
      return new Response(JSON.stringify({ error: "Failed to save game", details: insertError.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ score }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Unhandled error:", e);
    return new Response(JSON.stringify({ error: "Internal error", details: String((e as Error)?.message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

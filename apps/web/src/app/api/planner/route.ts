import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";

import type { PlannerRequest } from "@/features/planner/planner-api";
import { buildPlannerPrompt } from "@/features/planner/prompts/planner-prompt";
import { PlannerSchema } from "@/features/planner/schemas/planner-schema";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as PlannerRequest;

    const prompt = buildPlannerPrompt(body);

    const response =
      await client.responses.parse({
        model: "gpt-5",

        input: prompt,

        text: {
          format: zodTextFormat(
            PlannerSchema,
            "planner_response",
          ),
        },
      });

    return NextResponse.json(
      response.output_parsed,
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
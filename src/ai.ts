import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();
const token: string | undefined = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error("GITHUB_TOKEN is not set in environment variables");
}
const endpoint = "https://models.github.ai/inference";
const model = "mistral-ai/mistral-medium-2505";

export async function main(e: string): Promise<string> {
  const client = ModelClient(endpoint, new AzureKeyCredential(token as string));
  const prompt = `return a funny remark for the attached error , just a single line mocking the person who got it, no quotes just a plain text line ERROR : ${e}`;
  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "" },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      top_p: 0.1,
      max_tokens: 2048,
      model: model,
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const choice = response.body.choices[0];
  if (!choice || !choice.message || !choice.message.content) {
    throw new Error("Invalid response from AI model");
  }

  const r = choice.message.content as string;
  return r;
}

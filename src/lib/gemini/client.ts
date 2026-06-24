import { GoogleGenAI } from "@google/genai";

const globalForAI = globalThis as unknown as { gemini: GoogleGenAI };

export const gemini =
  globalForAI.gemini ??
  new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

if (process.env.NODE_ENV !== "production") globalForAI.gemini = gemini;

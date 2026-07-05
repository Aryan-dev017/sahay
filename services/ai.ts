/**
 * AI access for Sahay must NOT call OpenAI from the mobile client.
 *
 * Production flow (later):
 * 1. App calls a Supabase Edge Function with the user prompt.
 * 2. Edge Function uses OPENAI_API_KEY (server-only env).
 * 3. Function returns the draft/summary to the app.
 *
 * OPENAI_API_KEY must never appear in EXPO_PUBLIC_* or client bundles.
 */

import { mockComplaintDraft } from "@/constants/mockData";

const COMPLAINT_KEYWORDS = ["complaint", "refund", "bank", "upi", "transaction", "dispute"];
const RTI_KEYWORDS = ["rti", "municipal", "pothole", "public authority"];
const SUMMARY_KEYWORDS = ["summarize", "summary", "agreement", "document", "notice", "policy"];

export async function generateDraftMock(prompt: string): Promise<string> {
  // Simulate network latency for realistic UX testing.
  await new Promise((resolve) => setTimeout(resolve, 500));

  const normalized = prompt.trim().toLowerCase();
  if (!normalized) return mockComplaintDraft;

  if (SUMMARY_KEYWORDS.some((word) => normalized.includes(word))) {
    return buildSummaryMock(prompt);
  }

  if (RTI_KEYWORDS.some((word) => normalized.includes(word))) {
    return buildRtiMock(prompt);
  }

  if (COMPLAINT_KEYWORDS.some((word) => normalized.includes(word))) {
    return buildComplaintMock(prompt);
  }

  return buildGeneralApplicationMock(prompt);
}

function buildComplaintMock(prompt: string): string {
  return `Subject: Formal complaint regarding service issue

Respected Sir/Madam,

I am writing to formally register a complaint in connection with the following matter:

${prompt.trim()}

I request that your team investigate this issue, share a written acknowledgement with a reference number, and resolve the matter within the timelines prescribed under applicable RBI / consumer protection guidelines.

Supporting documents (transaction records, correspondence, and identity proof) are available on request.

Thank you for your assistance.

Yours faithfully,
[Your full name]
[Registered mobile number]
[Account / customer ID, if applicable]`;
}

function buildRtiMock(prompt: string): string {
  return `To,
The Public Information Officer
[Department / Authority Name]
[Office Address]

Subject: Application under the Right to Information Act, 2005

Sir/Madam,

Under the Right to Information Act, 2005, I request the following information:

${prompt.trim()}

I am an Indian citizen. I am willing to pay the prescribed application fee. Please treat this as an RTI application and provide information in English (or Kannada/Hindi, as applicable).

Contact:
[Your name]
[Address]
[Phone]
[Email]

Date: ${new Date().toLocaleDateString("en-IN")}

Signature:
[Your name]`;
}

function buildSummaryMock(prompt: string): string {
  return `Plain-language summary (mock — for local testing only)

Topic: ${prompt.trim().slice(0, 120)}${prompt.length > 120 ? "…" : ""}

Key points:
1. This is a structured summary placeholder generated on-device.
2. Deadlines, amounts, and party names should be verified against the original document.
3. When server AI is enabled, summaries will be produced via a Supabase Edge Function (OpenAI key stays server-side).

Suggested next steps:
- Note any payment or renewal dates in Sahay reminders.
- Keep the original PDF or notice for records.
- Escalate to the institution if terms differ from your understanding.`;
}

function buildGeneralApplicationMock(prompt: string): string {
  return `Subject: Application / request for assistance

Respected Sir/Madam,

I am submitting the following request for your kind consideration:

${prompt.trim()}

I would appreciate a written response with any reference number assigned to this request. Please let me know if additional documents are required.

Thank you,

[Your name]
[Contact number]
[City]`;
}

export type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; errors: string[] };

// The dev server proxies /api to the ASP.NET Web API (see vite.config.ts),
// so this works unchanged in both development and a same-origin production deploy.
export async function sendContactMessage(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { ok: true };
    }

    if (response.status === 400) {
      const problem = await response.json();
      const errors: string[] = problem?.errors
        ? Object.values(problem.errors).flat().map(String)
        : ["Please check the form and try again."];
      return { ok: false, errors };
    }

    return { ok: false, errors: ["Something went wrong on the server. Please try again shortly."] };
  } catch {
    return { ok: false, errors: ["Couldn't reach the server. Check your connection and try again."] };
  }
}

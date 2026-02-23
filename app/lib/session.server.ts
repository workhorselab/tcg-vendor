import { redirect } from "react-router";
import { auth } from "~/lib/auth";

export async function getSession(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    return session;
  } catch {
    return null;
  }
}

export async function requireAuth(request: Request) {
  const session = await getSession(request);

  if (!session) {
    throw redirect("/login");
  }

  return session;
}

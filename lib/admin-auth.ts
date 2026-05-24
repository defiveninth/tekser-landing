export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "password999";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_VALUE = "tekser-admin-authenticated";

export function isValidAdminSession(session: string | undefined): boolean {
  return session === ADMIN_SESSION_VALUE;
}

export function checkAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

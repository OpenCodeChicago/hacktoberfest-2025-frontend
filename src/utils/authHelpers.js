// Utility helpers for normalizing auth responses
export function extractToken(payload) {
  if (!payload) return null;
  // Prefer tokens attached to user object first (some APIs return token inside user)
  return (
    payload?.user?.token ??
    payload?.data?.user?.token ??
    payload?.token ??
    payload?.data?.token ??
    null
  );
}

export function normalizeUser(payload, fallback = {}) {
  if (!payload) return fallback;

  const user =
    payload.user ??
    payload?.data?.user ??
    (payload.name || payload.email ? { name: payload.name, email: payload.email } : null) ??
    (payload?.data?.name || payload?.data?.email ? { name: payload.data.name, email: payload.data.email } : null);

  return user ?? fallback;
}

export function getDisplayName(user) {
  if (!user) return 'User';
  return user.name || user.fullName || user.username || 'User';
}

export default {
  extractToken,
  normalizeUser,
  getDisplayName,
};

import DOMPurify from 'dompurify';

export function sanitizeErrorMessage(message, max = 200) {
  if (typeof message !== 'string') return 'An error occurred';
  // Strip all tags/attributes
  const clean = DOMPurify.sanitize(message, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  // Decode HTML entities and get plain text
  const tmp = typeof document !== 'undefined' ? document.createElement('div') : null;
  if (tmp) {
    tmp.innerHTML = clean;
    return String(tmp.textContent || tmp.innerText || '').substring(0, max) || 'An error occurred';
  }
  // Fallback for non-DOM environments
  return String(clean).replace(/[<>]/g, '').substring(0, max) || 'An error occurred';
}
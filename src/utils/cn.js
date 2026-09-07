/**
 * Combines CSS classes and filters out falsy values.
 * @param {...(string|boolean|null|undefined)} classes 
 * @returns {string} Combined class names string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

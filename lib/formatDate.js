export function formatDate(date) {
  if (date instanceof Date) {
    return date.toLocaleString("en-us");
  }
  return "";
}

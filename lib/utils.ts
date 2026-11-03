export { cn } from "cn"

export function formatEventDate(date: string) {
  // Parsed as a local date so the day never shifts in other timezones.
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

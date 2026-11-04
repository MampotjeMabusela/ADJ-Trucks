import { FESTIVE_DECOR_ENABLED, FESTIVE_DECOR_ENDS_AT } from "@/lib/constants";

/** Returns true while festive décor should show (flag on and before end date). */
export function isFestiveDecorActive(now = new Date()): boolean {
  if (!FESTIVE_DECOR_ENABLED) return false;

  const endsAt = new Date(`${FESTIVE_DECOR_ENDS_AT}T23:59:59`);
  if (Number.isNaN(endsAt.getTime())) return false;

  return now.getTime() <= endsAt.getTime();
}

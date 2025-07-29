import { differenceInCalendarDays, format, isToday, isYesterday, parseISO } from "date-fns";

export interface StreakResult {
  currentStreak: number;
  longestStreak: number;
  lastActivityLabel: string;
}

export function calculateStreaks(dates: string[]): StreakResult {
  const uniqueDates = Array.from(new Set(dates)).sort();
  if (uniqueDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastActivityLabel: "Never" };
  }
  const parsed = uniqueDates.map(d => parseISO(d));

  let longest = 1;
  let run = 1;
  for (let i = 1; i < parsed.length; i++) {
    if (differenceInCalendarDays(parsed[i], parsed[i - 1]) === 1) {
      run += 1;
    } else {
      if (run > longest) longest = run;
      run = 1;
    }
  }
  if (run > longest) longest = run;

  let current = 1;
  for (let i = parsed.length - 1; i > 0; i--) {
    if (differenceInCalendarDays(parsed[i], parsed[i - 1]) === 1) {
      current += 1;
    } else {
      break;
    }
  }

  const lastDate = parsed[parsed.length - 1];
  let label: string;
  if (isToday(lastDate)) label = "Today";
  else if (isYesterday(lastDate)) label = "Yesterday";
  else label = format(lastDate, "MMM d");

  return { currentStreak: current, longestStreak: longest, lastActivityLabel: label };
}
import { supabase } from "@/integrations/supabase/client";

export async function recalcMemberStreak(memberId: string) {
  const { data: logs, error } = await supabase
    .from("activity_logs")
    .select("date")
    .eq("family_member_id", memberId)
    .order("date", { ascending: true });
  if (error) throw error;
  const result = calculateStreaks(logs.map(l => l.date as string));
  await supabase
    .from("family_members")
    .update({
      last_activity: result.lastActivityLabel,
      streak: result.currentStreak
    })
    .eq("id", memberId);
  return result;
}

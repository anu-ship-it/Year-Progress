export interface TimeProgress {
  year: ProgressData;
  month: ProgressData;
  week: ProgressData;
  day: ProgressData;
}

export interface ProgressData {
  label: string;
  percent: number;
  elapsedMs: number;
  totalMs: number;
  unit: "days" | "hours" | "minutes";
  elapsedLabel: string;
  remainingLabel: string;
  nextMilestone: Milestone | null;
  accentColor: string;
}

export interface Milestone {
  label: string;
  targetPercent: number;
  timeUntilLabel: string;
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365;
}

function isoWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function isoWeeksInYear(year: number): number {
  // A year has 53 ISO weeks if Jan 1 is Thursday, or if it's a leap year and Jan 1 is Wednesday or Thursday
  const jan1 = new Date(year, 0, 1).getDay(); // 0=Sun,1=Mon...6=Sat
  const dec31 = new Date(year, 11, 31).getDay();
  return (jan1 === 4 || dec31 === 4) ? 53 : 52;
}

function formatDuration(ms: number, unit: "days" | "hours" | "minutes"): string {
  if (unit === "days") {
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return `${days}d`;
  }
  if (unit === "hours") {
    const hrs = Math.ceil(ms / (1000 * 60 * 60));
    return `${hrs}h`;
  }
  const mins = Math.ceil(ms / (1000 * 60));
  return `${mins}m`;
}

function findNextMilestone(
  percent: number,
  totalMs: number,
  elapsedMs: number,
  unit: "days" | "hours" | "minutes"
): Milestone | null {
  const milestones = [25, 50, 75, 90, 99];
  const next = milestones.find((m) => percent < m);
  if (!next) return null;

  const targetMs = (next / 100) * totalMs;
  const remainingMs = targetMs - elapsedMs;

  return {
    label: `${next}%`,
    targetPercent: next,
    timeUntilLabel: formatDuration(remainingMs, unit),
  };
}

export function calculateProgress(now: Date): TimeProgress {
  const year = now.getFullYear();
  const month = now.getMonth();

  // ── YEAR ──────────────────────────────────────────────────────────────────
  const totalYearDays = daysInYear(year);
  const msInYear = totalYearDays * 86400000;
  const msElapsedYear = now.getTime() - new Date(year, 0, 1).getTime();
  const yearPercent = Math.min((msElapsedYear / msInYear) * 100, 100);
  const daysElapsedYear = Math.floor(msElapsedYear / 86400000);
  const daysRemainingYear = totalYearDays - daysElapsedYear - 1;

  // ── MONTH ─────────────────────────────────────────────────────────────────
  const totalMonthDays = daysInMonth(year, month);
  const msInMonth = totalMonthDays * 86400000;
  const msElapsedMonth = now.getTime() - new Date(year, month, 1).getTime();
  const monthPercent = Math.min((msElapsedMonth / msInMonth) * 100, 100);
  // Use ms-derived days for consistency with percent
  const daysElapsedMonth = Math.floor(msElapsedMonth / 86400000);
  const daysRemainingMonth = totalMonthDays - daysElapsedMonth - 1;

  // ── WEEK ──────────────────────────────────────────────────────────────────
  const isoDay = (now.getDay() + 6) % 7; // Mon=0 … Sun=6
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - isoDay);
  weekStart.setHours(0, 0, 0, 0);
  const msInWeek = 7 * 86400000;
  const msElapsedWeek = now.getTime() - weekStart.getTime();
  const weekPercent = Math.min((msElapsedWeek / msInWeek) * 100, 100);
  const daysElapsedWeek = Math.floor(msElapsedWeek / 86400000);
  const daysRemainingWeek = 6 - daysElapsedWeek;

  // ── DAY ───────────────────────────────────────────────────────────────────
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const msInDay = 86400000;
  const msElapsedDay = now.getTime() - dayStart.getTime();
  const dayPercent = Math.min((msElapsedDay / msInDay) * 100, 100);
  const hoursElapsedDay = Math.floor(msElapsedDay / 3600000);
  const hoursRemainingDay = 23 - hoursElapsedDay;

  return {
    year: {
      label: "Year",
      percent: yearPercent,
      elapsedMs: msElapsedYear,
      totalMs: msInYear,
      unit: "days",
      elapsedLabel: `${daysElapsedYear + 1} of ${totalYearDays} days`,
      remainingLabel: `${daysRemainingYear} day${daysRemainingYear !== 1 ? "s" : ""} left`,
      nextMilestone: findNextMilestone(yearPercent, msInYear, msElapsedYear, "days"),
      accentColor: "var(--accent-year)",
    },
    month: {
      label: "Month",
      percent: monthPercent,
      elapsedMs: msElapsedMonth,
      totalMs: msInMonth,
      unit: "days",
      elapsedLabel: `${daysElapsedMonth + 1} of ${totalMonthDays} days`,
      remainingLabel: `${daysRemainingMonth} day${daysRemainingMonth !== 1 ? "s" : ""} left`,
      nextMilestone: findNextMilestone(monthPercent, msInMonth, msElapsedMonth, "days"),
      accentColor: "var(--accent-month)",
    },
    week: {
      label: "Week",
      percent: weekPercent,
      elapsedMs: msElapsedWeek,
      totalMs: msInWeek,
      unit: "days",
      elapsedLabel: `${daysElapsedWeek + 1} of 7 days`,
      remainingLabel: `${daysRemainingWeek} day${daysRemainingWeek !== 1 ? "s" : ""} left`,
      nextMilestone: findNextMilestone(weekPercent, msInWeek, msElapsedWeek, "days"),
      accentColor: "var(--accent-week)",
    },
    day: {
      label: "Day",
      percent: dayPercent,
      elapsedMs: msElapsedDay,
      totalMs: msInDay,
      unit: "hours",
      elapsedLabel: `${hoursElapsedDay}h of 24h`,
      remainingLabel: `${hoursRemainingDay}h ${hoursRemainingDay !== 1 ? "" : ""}left`,
      nextMilestone: findNextMilestone(dayPercent, msInDay, msElapsedDay, "minutes"),
      accentColor: "var(--accent-day)",
    },
  };
}

export { isoWeekNumber, isoWeeksInYear, daysInYear, isLeapYear };

"use client";

import { useMemo } from "react";
import { daysInYear } from "@/lib/time";
import styles from "./YearDots.module.css";

interface Props {
  now: Date;
}

function getDayTitle(year: number, dayIndex: number): string {
  return new Date(year, 0, 1 + dayIndex)
    .toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function YearDots({ now }: Props) {
  const year  = now.getFullYear();
  const total = daysInYear(year);

  const startOfYear = new Date(year, 0, 1);
  // 0-indexed: day 0 = Jan 1
  const todayIndex  = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);

  // Memoised so 365 titles don't recompute every second
  const dots = useMemo(
    () => Array.from({ length: total }, (_, i) => ({ i, title: getDayTitle(year, i) })),
    [year, total]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Days of {year}</span>
        <span className={styles.sub}>day {todayIndex + 1} of {total}</span>
      </div>
      <div
        className={styles.grid}
        role="img"
        aria-label={`Visual calendar: day ${todayIndex + 1} of ${total} in ${year}`}
      >
        {dots.map(({ i, title }) => (
          <div
            key={i}
            className={
              i < todayIndex  ? styles.past   :
              i === todayIndex ? styles.today  :
              styles.future
            }
            title={title}
          />
        ))}
      </div>
    </div>
  );
}

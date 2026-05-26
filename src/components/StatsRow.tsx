"use client";

import React from "react";
import { isoWeekNumber, isoWeeksInYear, daysInYear, isLeapYear } from "@/lib/time";
import styles from "./StatsRow.module.css";

interface Props {
  now: Date;
}

export function StatsRow({ now }: Props) {
  const year = now.getFullYear();
  const totalDays = daysInYear(year);
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000) + 1;
  const daysLeft = totalDays - dayOfYear;
  const weekNum = isoWeekNumber(now);
  const totalWeeks = isoWeeksInYear(year);
  const quarter = Math.ceil((now.getMonth() + 1) / 3);
  const leap = isLeapYear(year);

  const stats: { label: string; value: string; sub: string }[] = [
    { label: "Day of year",  value: String(dayOfYear),     sub: `of ${totalDays}${leap ? " ·leap" : ""}` },
    { label: "ISO week",     value: `W${weekNum}`,         sub: `of ${totalWeeks}` },
    { label: "Quarter",      value: `Q${quarter}`,         sub: "of 4" },
    { label: "Days left",    value: String(daysLeft),      sub: `in ${year}` },
  ];

  return (
    <div className={styles.row} role="region" aria-label="Year statistics">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={styles.stat}
          style={{ animationDelay: `${i * 0.06}s` } as React.CSSProperties}
        >
          <span className={styles.label}>{s.label}</span>
          <span className={styles.value}>{s.value}</span>
          <span className={styles.sub}>{s.sub}</span>
        </div>
      ))}
    </div>
  );
}

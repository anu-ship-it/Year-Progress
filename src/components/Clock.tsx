"use client";

import styles from "./Clock.module.css";

interface Props {
  now: Date;
}

const DAY_NAMES   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function Clock({ now }: Props) {
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className={styles.wrapper}>
      {/* aria-label on wrapper; no aria-live — announcing every second is hostile */}
      <div
        className={styles.time}
        aria-label={`Current local time: ${hh}:${mm}:${ss}`}
      >
        <span className={styles.hhmm}>{hh}</span>
        <span className={styles.colon} aria-hidden="true">:</span>
        <span className={styles.hhmm}>{mm}</span>
        <span className={styles.colon} aria-hidden="true">:</span>
        <span className={styles.seconds}>{ss}</span>
      </div>
      <div className={styles.date} aria-label={`${DAY_NAMES[now.getDay()]}, ${MONTH_NAMES[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`}>
        <span>{DAY_NAMES[now.getDay()]},</span>
        <span>{MONTH_NAMES[now.getMonth()]} {now.getDate()}, {now.getFullYear()}</span>
        <span className={styles.tz} title="Your local timezone">{tz}</span>
      </div>
    </div>
  );
}

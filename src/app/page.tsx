"use client";

import { useClock } from "@/hooks/useClock";
import { calculateProgress } from "@/lib/time";
import { ProgressBar } from "@/components/ProgressBar";
import { Clock } from "@/components/Clock";
import { YearDots } from "@/components/YearDots";
import { StatsRow } from "@/components/StatsRow";
import styles from "./page.module.css";

export default function Home() {
  const now = useClock(1000);

  // Server/first-render skeleton — avoids hydration mismatch
  if (!now) {
    return (
      <main className={styles.main}>
        <div className={styles.skeleton} aria-hidden="true" />
      </main>
    );
  }

  const progress = calculateProgress(now);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>Time, quantified</p>
          <h1 className={styles.title}>Year Progress</h1>
          <p className={styles.subtitle}>
            Every second of every day, measured.
          </p>
        </header>

        {/* Live Clock */}
        <Clock now={now} />

        {/* Stats chips */}
        <StatsRow now={now} />

        {/* Four progress bars */}
        <section className={styles.bars} aria-label="Progress bars">
          {(["year", "month", "week", "day"] as const).map((key, i) => (
            <ProgressBar
              key={key}
              data={progress[key]}
              index={i}
            />
          ))}
        </section>

        {/* Dot grid */}
        <YearDots now={now} />

        {/* Footer */}
        <footer className={styles.footer}>
          <span>Built with Next.js · Deployed on Vercel</span>
          <span className={styles.dot}>·</span>
          <span>Updates every second</span>
        </footer>
      </div>
    </main>
  );
}

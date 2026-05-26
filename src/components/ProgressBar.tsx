"use client";

import React, { useEffect, useRef } from "react";
import type { ProgressData } from "@/lib/time";
import styles from "./ProgressBar.module.css";

interface Props {
  data: ProgressData;
  index: number;
}

export function ProgressBar({ data, index }: Props) {
  const fillRef = useRef<HTMLDivElement>(null);
  const nubRef  = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  // Mount animation — runs once
  useEffect(() => {
    const fill = fillRef.current;
    const nub  = nubRef.current;
    if (!fill || !nub) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = `${index * 120}ms`;

    if (prefersReduced) {
      fill.style.width = `${data.percent}%`;
      nub.style.left   = `${Math.min(data.percent, 99.4)}%`;
      mounted.current  = true;
      return;
    }

    fill.style.transition = "none";
    nub.style.transition  = "none";
    fill.style.width = "0%";
    nub.style.left   = "0%";

    // Double rAF guarantees the browser has painted the 0% state
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        fill.style.transition = `width 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`;
        nub.style.transition  = `left  1.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`;
        fill.style.width = `${data.percent}%`;
        nub.style.left   = `${Math.min(data.percent, 99.4)}%`;

        setTimeout(() => { mounted.current = true; }, 1500 + index * 120 + 50);
      })
    );

    return () => cancelAnimationFrame(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live updates after mount
  useEffect(() => {
    if (!mounted.current) return;
    const fill = fillRef.current;
    const nub  = nubRef.current;
    if (!fill || !nub) return;

    fill.style.transition = "width 0.95s cubic-bezier(0.16, 1, 0.3, 1)";
    nub.style.transition  = "left  0.95s cubic-bezier(0.16, 1, 0.3, 1)";
    fill.style.width = `${data.percent}%`;
    nub.style.left   = `${Math.min(data.percent, 99.4)}%`;
  }, [data.percent]);

  const pct        = data.percent.toFixed(4);
  const remainPct  = (100 - data.percent).toFixed(4);

  return (
    <div
      className={styles.card}
      style={{ "--accent-color": data.accentColor } as React.CSSProperties}
    >
      <div className={styles.header}>
        <span className={styles.label}>{data.label}</span>
        <span className={styles.percent}>{pct}<span className={styles.pctSign}>%</span></span>
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={Math.round(data.percent * 100) / 100}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${data.label} — ${pct}% complete`}
      >
        <div ref={fillRef} className={styles.fill} />
        <div ref={nubRef}  className={styles.nub}  />
      </div>

      <div className={styles.stats}>
        <span className={styles.stat}>{data.elapsedLabel}</span>
        <span className={styles.divider}>·</span>
        <span className={styles.stat}>{data.remainingLabel}</span>
        <span className={styles.remainPct}>{remainPct}% remaining</span>
      </div>

      {data.nextMilestone && (
        <div className={styles.milestone}>
          <span className={styles.milestoneLabel}>Next milestone</span>
          <span className={styles.milestoneValue}>
            {data.nextMilestone.label} in {data.nextMilestone.timeUntilLabel}
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export function StaggerGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} variants={staggerContainer} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

export function FadeIn({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

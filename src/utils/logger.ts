// src/utils/logger.ts
/* eslint-disable no-console */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: unknown[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (isDev) {
      console.error(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },
  info: (...args: unknown[]) => {
    if (isDev) {
      console.info(...args);
    }
  },
  group: (...args: unknown[]) => {
    if (isDev) {
      console.group(...args);
    }
  },
  groupEnd: () => {
    if (isDev) {
      console.groupEnd();
    }
  },
};

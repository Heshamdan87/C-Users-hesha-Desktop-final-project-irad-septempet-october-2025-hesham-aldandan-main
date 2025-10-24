#!/usr/bin/env node
const open = require('open');

// URL used by CRA default dev server
const url = process.env.DEV_URL || 'http://localhost:3000';

// List of browser app identifiers to try. Order matters: try Chrome, Edge, Firefox, then default.
// These names work across platforms in many cases; open will fall back if not available.
const browsers = [
  { name: 'google chrome', label: 'Chrome' },
  { name: 'chrome', label: 'Chrome' },
  { name: 'msedge', label: 'Edge' },
  { name: 'microsoft-edge', label: 'Edge' },
  { name: 'firefox', label: 'Firefox' },
];

(async () => {
  console.log(`Opening ${url} in multiple browsers...`);
  for (const b of browsers) {
    try {
      // open in background; don't await long — allow attempts to proceed
      await open(url, { app: { name: b.name } });
      console.log(`Opened in ${b.label} (${b.name})`);
    } catch (err) {
      console.warn(`Could not open ${b.label} (${b.name}): ${err && err.message ? err.message : err}`);
    }
  }

  // Also open default system browser as a fallback / extra
  try {
    await open(url);
    console.log('Opened in default system browser');
  } catch (err) {
    console.warn('Could not open default browser:', err && err.message ? err.message : err);
  }

  // keep the process alive briefly for any async operations to settle
  setTimeout(() => process.exit(0), 500);
})();

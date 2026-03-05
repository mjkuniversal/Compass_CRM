#!/usr/bin/env node
/**
 * Inspect Inertia page props to extract field schemas.
 * Usage: node inspect-props.js <json-file> [--deep]
 */
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
const deep = process.argv.includes('--deep');

if (!file) {
  // List available files
  const dir = path.join(__dirname, 'raw/pages');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_'));
  console.log('Available props files:');
  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
    const propCount = Object.keys(data.props || {}).length;
    console.log(`  ${f.padEnd(40)} component: ${data.component || 'N/A'}, ${propCount} props`);
  });
  process.exit(0);
}

const filePath = file.includes('/') ? file : path.join(__dirname, 'raw/pages', file);
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const props = data.props || {};

console.log(`Component: ${data.component}`);
console.log(`URL: ${data.url}`);
console.log(`Props: ${Object.keys(props).length} keys\n`);

for (const key of Object.keys(props)) {
  const val = props[key];
  if (val === null || val === undefined) {
    console.log(`  ${key}: null`);
    continue;
  }

  if (Array.isArray(val)) {
    console.log(`  ${key}: Array[${val.length}]`);
    if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
      console.log(`    Keys: ${Object.keys(val[0]).join(', ')}`);
      if (deep) console.log(`    Sample: ${JSON.stringify(val[0]).slice(0, 500)}`);
    } else if (val.length > 0) {
      console.log(`    Sample: ${JSON.stringify(val.slice(0, 5))}`);
    }
  } else if (typeof val === 'object') {
    const keys = Object.keys(val);
    console.log(`  ${key}: Object{${keys.length}}`);
    if (keys.length <= 20) {
      console.log(`    Keys: ${keys.join(', ')}`);
    } else {
      console.log(`    Keys: ${keys.slice(0, 15).join(', ')} ... (+${keys.length - 15} more)`);
    }
    if (deep && keys.length > 0) {
      // Show structure of first few keys
      for (const k of keys.slice(0, 3)) {
        const v = val[k];
        if (typeof v === 'object' && v !== null) {
          console.log(`    .${k}: ${JSON.stringify(v).slice(0, 300)}`);
        } else {
          console.log(`    .${k}: ${JSON.stringify(v)}`);
        }
      }
    }
  } else {
    const strVal = String(val);
    console.log(`  ${key}: ${typeof val} = ${strVal.slice(0, 100)}`);
  }
}

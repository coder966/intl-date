import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const node = process.env.NODE || process.execPath;
const jestCli = require.resolve('jest/bin/jest');
const jestArgs = process.argv.slice(2);

const timeZones = [
  'Asia/Riyadh',
  'UTC',
  'Asia/Tokyo',
  'Africa/Cairo',
  'America/New_York',
];

for (const timeZone of timeZones) {
  console.log(`[TZ=${timeZone}]`);

  const result = spawnSync(node, [jestCli, ...jestArgs], {
    env: { ...process.env, TZ: timeZone },
    stdio: 'inherit',
  });

  if (result.error || result.status !== 0) {
    console.error(result.error);
    process.exitCode = result.status ?? 1;
    break;
  }
}

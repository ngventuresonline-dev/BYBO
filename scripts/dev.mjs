import { spawn } from 'node:child_process';

// Accept the preview supervisor's Vite-style flags while retaining Next.js.
const received = process.argv.slice(2);
const args = received.flatMap((arg) => arg === '--strictPort' ? [] : [arg === '--host' ? '--hostname' : arg]);
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--turbopack', ...args], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', (code) => process.exit(code ?? 1));

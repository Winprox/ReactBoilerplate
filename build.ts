import { exec, execSync } from 'child_process';
import { readFile, writeFile } from 'fs';

performance.mark('start');

const changeLine = (file: string, search: string, text: string) =>
  new Promise((res, rej) =>
    readFile(file, (e, d) => {
      if (e) return rej(`"${file}" not found`);

      const data = d.toString().split('\n');
      const line = data.find((v) => v.match(search));
      if (line === undefined) return rej(`"${search}" not found in "${file}"`);

      data.splice(data.indexOf(line), 1, String(text));
      const newData = data.join('\n');
      writeFile(file, newData, (e) => {
        if (e) return rej(`Error writing "${file}"`);
        res(newData);
      });
    })
  );

const setupEnv = async (type: string, ver: string) => {
  try {
    await changeLine('package.json', 'version', `"version": "${ver}",`);
    await changeLine('.env', 'VITE_DEV', `VITE_DEV = ${type === 'dev'}`);
  } catch (e) {
    console.error(e);
    process.exit();
  }
};

const now = new Date();
const ver = `${now.getMonth() + 1}.${now.getDate()}.${now.getHours()}`;
const type = process.argv.at(-1) === '-p' ? 'prod' : 'dev';
const win = process.platform === 'win32';

process.stdout.write(`${ver} `);
setInterval(() => process.stdout.write('.'), 500);

await setupEnv(type, ver);
execSync(`${win ? 'if exist dist rd /s/q' : 'rm -rf'} dist`);
exec('pnpm vite build', async (e) => {
  await setupEnv('dev', '0.0.0');
  if (e) {
    console.error(` Build error: ${e}`);
    process.exit();
  }

  execSync('pnpm prettier --write "**/*.{ts,json}"');

  performance.mark('end');
  performance.measure('took', 'start', 'end');
  const took = (performance.getEntriesByName('took')[0].duration / 1000).toFixed(2);
  console.log(` OK (${took}s)`);
  process.exit();
});

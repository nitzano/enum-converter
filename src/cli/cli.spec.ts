import { execSync } from 'child_process';
const packageJson = require('../../package.json');

describe('CLI', () => {
  let cliPath: string;

  beforeAll(() => {
    const binPath = execSync('npm bin')
      .toString()
      .trim();
    const tsNodePath = `${binPath}/ts-node`;
    const cliFile: string = `${__dirname}/cli.ts`;
    cliPath = `${tsNodePath} ${cliFile}`;
  });

  it('should make sure both cli and package version report the same', () => {
    const cliVersion: string = execSync(`${cliPath} --version`)
      .toString()
      .trim();
    const packageVersion = packageJson.version;
    expect(cliVersion).toBe(packageVersion);
  });
});

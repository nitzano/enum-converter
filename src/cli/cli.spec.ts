import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';
const packageJson = require('../../package.json');

describe('CLI', () => {
  let cliPath: string;
  const samplesPath = resolve(`${__dirname}/../../__tests__/samples`);
  const pythonSampleFile = `${samplesPath}/cli/python.cli.sample.py`;

  beforeAll(() => {
    const binPath = execSync('npm bin')
      .toString()
      .trim();
    const tsNodePath = `${binPath}/ts-node`;
    const cliFile: string = `${__dirname}/cli.ts`;
    cliPath = `${tsNodePath} ${cliFile}`;
  });

  function runCli(cliArgs: string): string {
    return execSync(`${cliPath} ${cliArgs}`).toString();
  }

  it('should make sure both cli and package version report the same', () => {
    const cliVersion: string = runCli('--version').trim();
    const packageVersion = packageJson.version;
    expect(cliVersion).toBe(packageVersion);
  });

  it('should convert python to a valid json', () => {
    const jsonEnum: string = runCli(`${pythonSampleFile} --to json`);
    const jsonEnumString = JSON.parse(jsonEnum);

    const jsonSample = JSON.parse(
      String(readFileSync(`${samplesPath}/cli/json.cli.sample.json`))
    );

    expect(jsonSample).toEqual(jsonEnumString);
  });

  it('should not emit header when emitHeader flag is false', () => {
    const cliOutput: string = runCli(
      `${pythonSampleFile} --to python --emitHeader false`
    );
    expect(cliOutput).not.toContain(
      '# From python.cli.sample.py (2 Enums 6 Values)'
    );
  });

  it('should not emit stats when emitStats flag is false', () => {
    const cliOutput: string = runCli(
      `${pythonSampleFile} --to python --emitStats false`
    );

    expect(cliOutput).toContain('# From python.cli.sample.py');
    expect(cliOutput).not.toContain('(2 Enums 6 Values)');
  });
});

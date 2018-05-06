import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';
const packageJson = require('../../package.json');

describe('CLI', () => {
  let cliPath: string;
  const samplesPath = resolve(`${__dirname}/../../__tests__/samples`);

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

  it('should convert python to a valid json', () => {
    const cliPythonSamplePath: string = `${samplesPath}/cli/python.cli.sample.py`;
    const jsonEnum: string = execSync(
      `${cliPath} ${cliPythonSamplePath} --to json`
    ).toString();
    const jsonEnumString = JSON.parse(jsonEnum);

    const jsonSample = JSON.parse(
      String(readFileSync(`${samplesPath}/cli/json.cli.sample.json`))
    );

    expect(jsonSample).toEqual(jsonEnumString);
  });
});

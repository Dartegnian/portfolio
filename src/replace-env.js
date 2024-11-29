const fs = require('fs');
const path = require('path');

const prodEnvFilePath = path.resolve(__dirname, 'src/environments/environment.prod.ts');
const devEnvFilePath = path.resolve(__dirname, 'src/environments/environment.ts');
const apiKey = process.env.LASTFM_API_KEY;

if (!apiKey) {
  throw new Error('LASTFM_API_KEY is not defined');
}

const prodEnvFileContent = `
export const environment = {
  production: true,
  lastfmApiKey: '${apiKey}'
};
`;

const devEnvFileContent = `
export const environment = {
  production: false,
  lastfmApiKey: '${apiKey}'
};
`;

fs.writeFileSync(prodEnvFilePath, prodEnvFileContent);
console.log(`Production environment file written to ${prodEnvFilePath}`);

fs.writeFileSync(devEnvFilePath, devEnvFileContent);
console.log(`Development environment file written to ${devEnvFilePath}`);

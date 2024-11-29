const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load environment variables from src/.env file

const prodEnvFilePath = path.resolve(__dirname, 'environments/environment.prod.ts');
const devEnvFilePath = path.resolve(__dirname, 'environments/environment.ts');
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

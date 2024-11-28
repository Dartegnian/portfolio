const fs = require('fs');
const path = require('path');

const envFilePath = path.resolve(__dirname, 'src/environments/environment.prod.ts');
const apiKey = process.env.LASTFM_API_KEY;

if (!apiKey) {
  throw new Error('LASTFM_API_KEY is not defined');
}

const envFileContent = `
export const environment = {
  production: true,
  lastfmApiKey: '${apiKey}'
};
`;

fs.writeFileSync(envFilePath, envFileContent);
console.log(`Environment file written to ${envFilePath}`);

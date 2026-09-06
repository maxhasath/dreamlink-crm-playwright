const path = require("path");
const fs = require("fs");

function loadEnvFile(envName = "qa") {
  const envPath = path.resolve(__dirname, `../env/${envName}.env`);
  if (!fs.existsSync(envPath)) {
    console.warn(`Env file not found: ${envPath}`);
    return;
  }
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
}

function getCredentials() {
  return {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    displayName: process.env.TEST_DISPLAY_NAME,
  };
}

module.exports = { loadEnvFile, getCredentials };

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: 9000,
  httpsOptions: {
    key: fs.readFileSync(path.resolve("./localhost-key.pem")),
    cert: fs.readFileSync(path.resolve("./localhost.pem")),
  },
  outputDir: "../../packages/design-system/src",
  tokensFilePath: "../../packages/tokens/tokens.css",
  overwriteFiles: true,
};

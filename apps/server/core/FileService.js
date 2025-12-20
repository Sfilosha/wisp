import fs from 'fs';
import path from 'path';
import Logger from '../../../helpers/Logger.js';

export default class FileService {
  static writeSafe(filePath, content) {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, content);
      const filename = path.basename(filePath);
      Logger.info(`[FileService] Файл ${filename} успішно оновлено!`);
      console.log(filePath)
    } catch (err) {
      Logger.error(`[FileService] Не вдалося записати файл ${filePath}: ${err.message}`);
    }
  }

  static ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  }

}

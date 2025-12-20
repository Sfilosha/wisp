import Logger from '../../../helpers/Logger.js';
import FileService from '../core/FileService.js';
import CssBuilder from '../core/TokensCssBuilder.js';
import config from '../config/index.js';

const updateTokensCtrl = async (req, res) => {
  Logger.divider();
  Logger.info('Отримано запит на оновлення токенів...');

  const payload = req.body.payload || req.body;

  // Extract token categories from payload
  const { ids, color, numeric, string, typography } = payload || {};

  // Validate presence of ids
  if (!ids) {
    Logger.error('Incorrect structure: Token IDs missing in payload.');
    return res.status(400).json({ message: 'Invalid token structure' });
  }
  
  // Writing variable IDs to variables.json
  const variables = JSON.stringify(ids, null, 2)
  FileService.writeSafe(config.variablesFilePath, variables);

  const tokens = CssBuilder.build({
    'Color Tokens': color,
    'Numeric Tokens': numeric,
    'String Variables': string,
    'Typography Styles': typography,
  });

  // Writing CSS tokens to tokens.css
  FileService.writeSafe(config.tokensFilePath, tokens);

  res.status(200).json({ message: 'Variables and Tokens File Updated' });
};

export {updateTokensCtrl}

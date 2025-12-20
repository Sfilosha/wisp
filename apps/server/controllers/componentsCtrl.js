import GeneratorService from '../core/GeneratorService.js';
import Logger from '../../../helpers/Logger.js';

const generator = new GeneratorService();

const generateCtrl = async (req, res) => {
  Logger.divider();
  Logger.info('[componentsCtrl.js] Get request to generate components...');
  const result = await generator.generate(req.body);
  res.status(200).json({ message: result });
};

const cancelCtrl = async (_, res) => {
  generator.cancel();
  Logger.info('[componentsCtrl.js] Get request to cancel generation...');
  res.status(200).json({ message: 'stop' });
};

export { generateCtrl, cancelCtrl };
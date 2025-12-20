import axios from 'axios';
import Logger from '../../../helpers/Logger.js';
import config from '../config/index.js';

export default class FigmaService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.figma.com/v1',
      headers: { 'X-Figma-Token': config.figmaApiKey },
    });
  }

  // Fetch nodes from Figma file by their IDs
  async fetchNodes(fileKey, nodeIds) {
    console.log('FigmaService.js Started fetchNodes with IDs:', nodeIds);
    try {
      const res = await this.api.get(`/files/${fileKey}/nodes`, {
        params: { ids: nodeIds.join(',') },
      });
      return res.data.nodes || {};
    } catch (err) {
      Logger.error(`Request Error Figma API: ${err.message}`);
      throw err;
    }
  }
}

import * as fs from 'fs-extra';
import Signature, { Opts } from './Signature';
import FacadeConfig from '../utils/localStorage/FacadeConfig';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';

export default (config: FacadeConfig): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.storageDir, lrs_id });
    await fs.ensureDir(dir);
    const promises = models.map((model) => {
      return new Promise((resolve, reject) => {
        const filePath = getAttachmentPath({
          dir,
          hash: model.hash,
          contentType: model.contentType
        });
        const writeStream = fs.createWriteStream(filePath, { encoding: 'binary' });
        model.stream.pipe(writeStream);
        writeStream.on('finish', () => {
          resolve();
        });
        model.stream.on('error', reject);
        writeStream.on('error', reject);
      });
    });
    await Promise.all(promises);
  };
};

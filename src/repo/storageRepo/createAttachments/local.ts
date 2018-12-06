import * as fs from 'fs-extra';
import * as streamToString from 'stream-to-string';
import Signature, { Opts } from './Signature';
import FacadeConfig from '../utils/localStorage/FacadeConfig';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';

export default (config: FacadeConfig): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.storageDir, lrs_id });
    await fs.ensureDir(dir);
    const promises = models.map(async (model) => {
      const filePath = getAttachmentPath({
        dir,
        hash: model.hash,
        contentType: model.contentType
      });
      const content = await streamToString(model.stream);
      await fs.writeFile(filePath, content, { encoding: 'binary' });
    });
    await Promise.all(promises);
  };
};

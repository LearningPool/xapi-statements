import * as streamToString from 'stream-to-string';
import Signature, { Opts } from './Signature';
import FacadeConfig from '../utils/googleStorage/FacadeConfig';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';

export default (config: FacadeConfig): Signature => {
  return async ({ lrs_id, models }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });

    const promises = models.map(async (model) => {
      const filePath = getAttachmentPath({
        dir,
        hash: model.hash,
        contentType: model.contentType
      });
      const content = await streamToString(model.stream);
      const file = config.storage.bucket(config.bucketName).file(filePath);
      await file.save(content, { metadata: { contentEncoding: 'binary' } });
    });

    await Promise.all(promises);
  };
};

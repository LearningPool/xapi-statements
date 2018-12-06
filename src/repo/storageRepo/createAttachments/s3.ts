import * as streamToString from 'stream-to-string';
import Signature, { Opts } from './Signature';
import FacadeConfig from '../utils/s3Storage/FacadeConfig';
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
      await config.client
        .upload({
          Bucket: config.bucketName,
          Body: content,
          Key: filePath,
          ContentEncoding: 'binary'
        })
        .promise();
    });
    await Promise.all(promises);
  };
};

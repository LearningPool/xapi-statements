import Signature, { Opts, Result } from './Signature';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import FacadeConfig from '../utils/s3Storage/FacadeConfig';

export default (config: FacadeConfig): Signature => {
  return async ({ contentType, hash, lrs_id }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });
    const filePath = getAttachmentPath({ dir, hash, contentType });
    const s3Params = {
      Bucket: config.bucketName,
      Key: filePath,
    };
    const s3headObjectRequest = config.client.headObject(s3Params);
    const s3ObjectRequest = config.client.getObject(s3Params);

    const s3Head = await s3headObjectRequest.promise();
    const contentLength = s3Head.ContentLength;
    const stream = s3ObjectRequest.createReadStream();
    return { stream, contentLength };
  };
};

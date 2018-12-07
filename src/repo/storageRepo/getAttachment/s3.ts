import Signature from './Signature';
import getAttachmentDir from '../../../utils/getAttachmentDir';
import getAttachmentPath from '../../../utils/getAttachmentPath';
import FacadeConfig from '../utils/s3Storage/FacadeConfig';
import * as stringToStream from 'string-to-stream';
import getStreamData from '../../../utils/getStreamData';

export default (config: FacadeConfig): Signature => {
  return async ({ contentType, hash, lrs_id }) => {
    const dir = getAttachmentDir({ subFolder: config.subFolder, lrs_id });
    const filePath = getAttachmentPath({ dir, hash, contentType });
    const s3HeadObject = await config.client
      .headObject({
        Bucket: config.bucketName,
        Key: filePath
      })
      .promise();
    const contentLength = s3HeadObject.ContentLength;
    const stream = config.client
      .getObject({ Bucket: config.bucketName, Key: filePath, ResponseContentEncoding: 'binary' })
      .createReadStream();
    const streamAsString = await getStreamData(stream);
    const streamAsStream = stringToStream(streamAsString);
    return { stream: streamAsStream, contentLength };
  };
};

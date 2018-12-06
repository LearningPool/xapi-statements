import * as stringToStream from 'string-to-stream';
import createSha from './createSha';
import AttachmentModel from '../../models/AttachmentModel';

export default (content: string, contentType: string = 'text/plain'): AttachmentModel => {
  return {
    stream: stringToStream(content),
    hash: createSha(content),
    contentType,
    contentLength: content.length
  };
};

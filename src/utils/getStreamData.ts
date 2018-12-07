import { Readable as ReadableStream } from 'stream';
import { trim } from 'lodash';

const trimmedChars = `\r\n\s`;

export default async (stream: ReadableStream): Promise<string> => {
  let data = '';

  await new Promise((resolve, reject) => {
    stream.on('data', (chunk: Buffer) => {
      data += chunk.toString('binary');
    });

    stream.on('end', () => {
      resolve();
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });

  const trimmedData = trim(data, trimmedChars);
  return trimmedData;
};

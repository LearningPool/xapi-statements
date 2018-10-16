declare module 'string-to-stream' {
  const x: (content: string, encoding: string) => NodeJS.ReadableStream;
  export = x;
}

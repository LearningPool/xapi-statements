import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public objectType: string) {
    super();
  }
}

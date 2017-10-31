import config from './config';

export type Tracker = (name: string, value: any) => void;

export default async (): Promise<Tracker> => {
  /* istanbul ignore next */
  if (config.tracker.newrelic.enabled === true) {
    const newrelic = require('newrelic');
    const tracker: Tracker = (name, value) => {
      newrelic.addCustomParameter(name, value);
    };
    return tracker;
  } else {
    const tracker: Tracker = () => {};
    return tracker;
  }
};

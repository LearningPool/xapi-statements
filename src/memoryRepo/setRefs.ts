import { includes } from 'lodash';
import SetRefsOptions from '../repo/SetRefsOptions';
import logger from '../logger';
import Config from './Config';

export default (config: Config) => {
  return async (opts: SetRefsOptions): Promise<void> => {
    logger.debug('setRefs', opts);
    const refs = config.state.statements.filter((model) => {
      return includes(opts.refIds, model.statement.id);
    }).map((model) => {
      return model.statement;
    });
    config.state.statements = config.state.statements.map((model) => {
      if (model.statement.id === opts.id) {
        return {
          ...model,
          refs
        };
      }
      return model;
    });
  };
};

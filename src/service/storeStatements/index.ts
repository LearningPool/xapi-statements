import checkScopes from 'jscommons/dist/service/utils/checkScopes';
import { STATEMENT_WRITE_SCOPES } from '../../utils/scopes';
import StoreStatementsOptions from '../../serviceFactory/options/StoreStatementsOptions';
import Config from '../Config';
import preValidationSetup from './preValidationSetup';
import validateStatements from './validateStatements';
import postValidationSetup from './postValidationSetup';
import getUnstoredModels from './getUnstoredModels';
import checkAttachments from './checkAttachments';
import checkVoiders from './checkVoiders';
import createAttachments from './createAttachments';
import createStatements from './createStatements';
import voidStatements from './voidStatements';
import updateReferences from './updateReferences';

/* istanbul ignore next */
const awaitUpdates = async (config: Config, updates: Promise<any>) => {
  if (config.awaitUpdates === true) {
    await updates;
  }
};

export default (config: Config) => {
  return async (opts: StoreStatementsOptions): Promise<string[]> => {
    checkScopes(STATEMENT_WRITE_SCOPES, opts.client.scopes);
    const preValidatedModels = preValidationSetup(opts.models);
    validateStatements(preValidatedModels);
    const postValidatedModels = postValidationSetup(preValidatedModels, opts.client);
    const unstoredModels = await getUnstoredModels(config, postValidatedModels, opts.client);
    const voidedObjectIds = await checkVoiders(config, unstoredModels, opts.client);
    await checkAttachments(config, unstoredModels, opts.attachments);

    await createStatements(config, unstoredModels);

    const statementIds = postValidatedModels.map((postValidatedModel) => {
      return postValidatedModel.statement.id;
    });

    // Completes actions that do not need to be awaited.
    const unawaitedUpdates: Promise<any> = Promise.all([
      createAttachments(config, opts.attachments),
      voidStatements(config, unstoredModels, voidedObjectIds, opts.client),
      updateReferences(config, unstoredModels, opts.client),
    ]);

    await awaitUpdates(config, unawaitedUpdates);
    config.repo.emitNewStatements({ ids: statementIds });

    return statementIds;
  };
};

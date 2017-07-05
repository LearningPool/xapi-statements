import StoredStatementModel from '../../models/StoredStatementModel';
import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
import matchesClientOption from '../utils/matchesClientOption';
import Config from '../Config';
import matchesAgentOption from './matchesAgentOption';
import matchesCursorOption from './matchesCursorOption';
import matchesVerbOption from './matchesVerbOption';
import matchesActivityOption from './matchesActivityOption';
import matchesRegistrationOption from './matchesRegistrationOption';
import matchesUntilOption from './matchesUntilOption';
import matchesSinceOption from './matchesSinceOption';

const filterModels = (models: StoredStatementModel[], opts: GetStatementsOptions) => {
  return models.filter((model: StoredStatementModel) => {
    const statement = model.statement;
    return (
      matchesCursorOption(model, opts) &&
      matchesClientOption(model, opts.client) &&
      matchesAgentOption(model, opts) &&
      matchesVerbOption(model, opts) &&
      matchesActivityOption(model, opts) &&
      matchesRegistrationOption(model, opts) &&
      matchesUntilOption(statement, opts) &&
      matchesSinceOption(statement, opts)
    );
  });
};

const sortModels = (models: StoredStatementModel[], ascending: boolean) => {
  const lower = ascending ? -1 : 1;
  const higher = ascending ? 1 : -1;
  return models.sort((modelA, modelB) => {
    const storedA = modelA.statement.stored;
    const storedB = modelB.statement.stored;
    if (storedA < storedB) return lower;
    if (storedA > storedB) return higher;
    return 0;
  });
};

const limitModels = (
  models: StoredStatementModel[],
  skip: number = 0,
  limit: number = models.length
) => {
  return models.slice(skip, limit + skip);
};

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StoredStatementModel[]> => {
    const filteredItems = filterModels(config.state.statements, opts);
    const sortedItems = sortModels(filteredItems, opts.ascending);
    const limitedItems = limitModels(sortedItems, opts.skip, opts.limit);
    return limitedItems;
  };
};
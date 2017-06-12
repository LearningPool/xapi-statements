import * as assert from 'assert';
import { isArray } from 'lodash';
import setup from '../../../utils/setup';
import createClientModel from '../../../utils/createClientModel';
import storeStatementsInService from '../../../utils/storeStatementsInService';

const TEST_CLIENT = createClientModel();

export default () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  return async (
    exactStatement: any,
    canonicalStatement: any
  ): Promise<void> => {
    await storeStatements([exactStatement]);
    const actualStatements = await service.getIdsStatements({
      client: TEST_CLIENT,
    });
    const expectedStatement = {...actualStatements[0], ...canonicalStatement};
    assert(isArray(actualStatements));
    assert.equal(actualStatements.length, 1);
    assert.deepEqual(actualStatements[0], expectedStatement);
  };
};

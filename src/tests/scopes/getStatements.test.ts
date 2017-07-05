import * as assert from 'assert';
import { difference } from 'lodash';
import Forbidden from 'jscommons/dist/errors/Forbidden';
import * as scopes from '../../utils/scopes';
import allScopes from '../../utils/scopes';
import setup from '../utils/setup';
import assertError from '../utils/assertError';
import createStatement from '../utils/createStatement';
import createClientModel from '../utils/createClientModel';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_FORBIDDEN_SCOPES = difference(allScopes, scopes.STATEMENT_READ_SCOPES);

describe('get statements with scopes', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const testReadAllScope = async (scopes: string[]) => {
    const client = createClientModel({ _id: 'test_client_b', scopes });
    await storeStatements([TEST_STATEMENT]);
    const result = await service.getStatements({ client });
    const actualIds = result.statements.map(statement => {
      return statement.id;
    });
    const expectedIds = [TEST_ID];
    assert.deepEqual(actualIds, expectedIds);
  };

  it('should return no statements when using a different client with read mine scope', async () => {
    const client = createClientModel({
      _id: 'test_client_b',
      scopes: [scopes.XAPI_STATEMENTS_READ_MINE]
    });
    await storeStatements([TEST_STATEMENT]);
    const actualStatements = (await service.getStatements({ client })).statements;
    assert.deepEqual(actualStatements, []);
  });

  it('should return a statement when using a different client with xAPI all scope', async () => {
    await testReadAllScope([scopes.XAPI_ALL]);
  });

  it('should return a statement when using a different client with xAPI read scope', async () => {
    await testReadAllScope([scopes.XAPI_READ]);
  });

  it('should return a statement when using a different client with xAPI read statements scope', async () => {
    await testReadAllScope([scopes.XAPI_STATEMENTS_READ]);
  });

  it('should return a statement when using a different client with read all scope', async () => {
    await testReadAllScope([scopes.ALL_READ]);
  });

  it('should throw an error when using a forbidden read scope', async () => {
    const client = createClientModel({
      _id: 'test_client_b',
      scopes: TEST_FORBIDDEN_SCOPES
    });
    await storeStatements([TEST_STATEMENT]);
    const promise = service.getStatements({ client });
    await assertError(Forbidden)(promise);
  });
});
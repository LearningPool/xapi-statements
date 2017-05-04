import * as assert from 'assert';
import NoModel from '../../errors/NoModel';
import setup from '../utils/setup';
import createStatement from '../utils/createStatement';
import createVoidingStatement from '../utils/createVoidingStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_STATEMENT = createStatement({ id: TEST_ID });
const TEST_VOIDER = createVoidingStatement(TEST_ID);

describe('store statements voiding', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  const assertVoided = async () => {
    try {
      await service.getStatement({ id: TEST_ID, voided: false });
      assert(false);
    } catch (err) {
      assert.equal(err.constructor, NoModel);
      const voidedStatement = await service.getStatement({ id: TEST_ID, voided: true });
      assert.equal(voidedStatement.id, TEST_ID);
    }
  };

  it('should void a statement when it is voided in a following batch', async () => {
    await storeStatements([TEST_STATEMENT]);
    await storeStatements([TEST_VOIDER]);
    await assertVoided();
  });

  it('should void a statement when it is voided in a previous batch', async () => {
    await storeStatements([TEST_VOIDER]);
    await storeStatements([TEST_STATEMENT]);
    await assertVoided();
  });

  it('should void a statement when it is voided earlier in the same batch', async () => {
    await storeStatements([TEST_VOIDER, TEST_STATEMENT]);
    await assertVoided();
  });

  it('should void a statement when it is voided later in the same batch', async () => {
    await storeStatements([TEST_STATEMENT, TEST_VOIDER]);
    await assertVoided();
  });
});
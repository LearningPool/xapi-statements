import { ObjectID } from 'mongodb';
import Signature, { Opts, Result } from './Signature';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import matchesFullActivity from '../utils/mongoModels/matchesFullActivity';
import { replaceDotsInExtensions } from '../utils/mongoModels/replaceDotsInStatement';
import { FULL_ACTIVITIES_COLLECTION_NAME } from '../utils/mongoModels/constants';

export default (config: FacadeConfig): Signature => {
  return async ({ activityId, client }) => {
    const lrsId = new ObjectID(client.lrs_id);
    const organisationId = new ObjectID(client.organisation);
    const collection = (await config.db()).collection(FULL_ACTIVITIES_COLLECTION_NAME);
    const query = matchesFullActivity({ activityId, lrsId, organisationId });
    const fields = {
      _id: 0,
      id: 1,
      name: 1,
      description: 1,
      extensions: 1,
      moreInfo: 1,
      type: 1,
    };

    const result = await collection.findOne(query, { fields }) as Result | null;

    if (result === null) {
      return {
        id: activityId,
        name: {},
        description: {},
        extensions: {},
      };
    }

    return {
      id: activityId,
      name: result.name,
      description: result.description,
      extensions: replaceDotsInExtensions(/&46;/g, '.')(result.extensions),
      ...(result.type === undefined ? {} : { type: result.type }),
      ...(result.moreInfo === undefined ? {} : { moreInfo: result.moreInfo }),
    };
  };
};

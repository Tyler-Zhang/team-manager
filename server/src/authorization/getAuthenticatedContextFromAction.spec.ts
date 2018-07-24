import 'mocha';
import { lorem } from 'faker';
import * as  _ from 'lodash';
import * as sinon from 'sinon';
import { getAuthenticatedContextFromAction } from './getAuthenticatedContextFromAction';
import { AuthenticatedContextOperations } from '../operations';

describe('getAuthenticatedContextFromAction', () => {
  const token = lorem.text(10);
  const mockAction = {};
  _.set(mockAction, 'request.headers.authorization', token);

  it('calls AuthenticatedContextOperations.FromToken with the correct arguments', () => {
    const fromMemberRun = sinon.stub(AuthenticatedContextOperations.FromToken, 'run');

    getAuthenticatedContextFromAction(mockAction as any);

    fromMemberRun.restore();

    sinon.assert.calledWith(fromMemberRun, { token });
  })

})

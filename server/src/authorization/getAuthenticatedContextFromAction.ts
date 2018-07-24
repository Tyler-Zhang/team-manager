import { Action } from "routing-controllers";
import { get } from 'lodash';
import { AuthenticatedContextOperations } from '../operations';

export function getAuthenticatedContextFromAction(action: Action) {
  const jwt = get(action.request, 'headers.authorization');

  return AuthenticatedContextOperations.FromToken.run({ jwtToken: jwt });
}

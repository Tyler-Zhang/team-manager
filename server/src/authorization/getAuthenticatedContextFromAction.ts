import { Action } from "routing-controllers";
import { get } from 'lodash';
import { AuthenticatedContextOperations } from '../operations';

export function getAuthenticatedContextFromAction(action: Action) {
  const token = get(action.request, 'headers.authorization');

  return AuthenticatedContextOperations.FromToken.run({ token });
}

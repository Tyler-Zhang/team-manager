import { Action } from "routing-controllers";
import { get } from 'lodash';
import { FromToken } from "../operations/AuthenticatedContext/FromToken";

export function getAuthenticatedContextFromAction(action: Action) {
  const jwt = get(action.request, 'headers.authorization');

  return new FromToken({ jwtToken: jwt }).run();
}

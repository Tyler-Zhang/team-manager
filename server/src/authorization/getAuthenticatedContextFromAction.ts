import { Action } from "routing-controllers";
import { AuthenticatedContextOperations } from '../operations';
import { Request } from "express";

function getTokenFromRequest(request: Request) {
  const tokenFromCookie = request.cookies.authorization;

  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  return null;
}

export function getAuthenticatedContextFromAction(action: Action) {
  const token = getTokenFromRequest(action.request);

  return AuthenticatedContextOperations.FromToken.run({ token });
}

/**
 * This file defines a parameter decorator that can be used by controller methods
 * to extract the auth context from the request
 */
import { createParamDecorator } from 'routing-controllers';
import { getAuthenticatedContextFromAction } from './getAuthenticatedContextFromAction';

export function authContext({ required = true } = {}) {
  return createParamDecorator({
    required,
    value: getAuthenticatedContextFromAction
  });
}

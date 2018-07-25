import { Factory } from 'rosie';
import { AuthenticatedContext, IAuthenticatedContextConstructorProps, AuthenticationType, IAuthenticatedContextSystemConstructorProps, IAuthenticatedContextMemberConstructorProps, Authority } from '../../models';
import * as Faker from 'faker';

const constructor = (params: IAuthenticatedContextConstructorProps) => new AuthenticatedContext(params);

export const systemAuthenticatedContext = Factory.define<IAuthenticatedContextSystemConstructorProps>(
  'system_authenticated_context',
  constructor
)
  .attr('type', AuthenticationType.system);

export const memberAuthenticatedContext = Factory.define<IAuthenticatedContextMemberConstructorProps>(
  'member_authenticated_context',
  constructor
)
  .attr('type', AuthenticationType.member)
  .attr('memberId', () => Faker.random.number())
  .attr('organizationId', () => Faker.random.number())
  .attr('authority', Authority.member)

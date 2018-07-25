import { Factory, IFactory } from 'rosie';
import { AuthenticatedContext, AuthenticationType, IAuthenticatedContextSystemConstructorProps, IAuthenticatedContextMemberConstructorProps, Authority } from '../../models';
import * as Faker from 'faker';

/**
 * We cast the factory to a IFactory<AuthenticatedContext> so that others using it will get the
 * right type. We expose these attributes because they correspond with what AuthenticatedContext
 * takes in its constructor
 */

export const systemAuthenticatedContext = Factory.define<IAuthenticatedContextSystemConstructorProps>(
  'system_authenticated_context',
  AuthenticatedContext
)
  .attr('type', AuthenticationType.system) as any as IFactory<AuthenticatedContext>;

export const memberAuthenticatedContext = Factory.define<IAuthenticatedContextMemberConstructorProps>(
  'member_authenticated_context',
  AuthenticatedContext
)
  .attr('type', AuthenticationType.member)
  .attr('memberId', () => Faker.random.number())
  .attr('organizationId', () => Faker.random.number())
  .attr('authority', Authority.member) as any as IFactory<AuthenticatedContext>;

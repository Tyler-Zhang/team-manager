import 'mocha';
import { AuthenticatedContext } from '../../models';
import { Factories } from '../../specs';
import { expect } from 'chai';
import { AuthenticatedContextOperations } from '..';

describe('operations/AuthenticatedContext/FromToken', () => {
  let jwt: () => string;
  const run = () => AuthenticatedContextOperations.FromToken.run({ token: jwt() })

  context('when it is a system authenticated context', () => {
    let authContext: AuthenticatedContext;

    before(async () => {
      authContext = Factories.systemAuthenticatedContext.build();
      const token = await AuthenticatedContextOperations.IntoToken.run({ authContext });
      jwt = () => token
    })

    it('returns an authenticated context with the same properties', async () => {
      expect(await run()).to.deep.equal(authContext)
    })
  })

  context('when it is a member authenticated context', () => {
    let authContext: AuthenticatedContext;

    before(async () => {
      authContext = Factories.memberAuthenticatedContext.build();
      const token = await AuthenticatedContextOperations.IntoToken.run({ authContext })
      jwt = () => token
    })

    it('returns an authenticated context with the same properties', async () => {
      expect(await run()).to.deep.equal(authContext)
    })
  })
})

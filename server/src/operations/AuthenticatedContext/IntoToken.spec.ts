import 'mocha';
import { AuthenticatedContext, AuthenticationType } from '../../models';
import { Factories } from '../../specs';
import { expect } from 'chai';
import { AuthenticatedContextOperations } from '..';
import { verify } from 'jsonwebtoken';
import { secretsConfig } from '../../config';

describe('operations/AuthenticatedContext/IntoToken', () => {
  let authContext: () => AuthenticatedContext = () => Factories.systemAuthenticatedContext.build();

  const run = () => AuthenticatedContextOperations.IntoToken.run({ authContext: authContext() })

  it('returns a string', async () => {
    expect(typeof await run()).to.equal('string');
  })

  it('returns a string signed by the secret key', async () => {
    const token = await run();
    expect(() => verify(token, secretsConfig.privateKey)).to.not.throw()
  })

  context('when it is a system authenticated context', () => {
    let payload: any;

    before(async () => {
      authContext = () => Factories.systemAuthenticatedContext.build();
      const token = await run();
      payload = verify(token, secretsConfig.privateKey);
    });

    it('has a string field type with value system', () => {
      expect(payload).to.haveOwnProperty('type').and.is.a('string');
      expect(payload.type).to.equal(AuthenticationType.system);
    })
  })

  context('when it is a member authenticated context', () => {
    let payload: any;

    before(async () => {
      authContext = () => Factories.memberAuthenticatedContext.build();
      const token = await run();
      payload = verify(token, secretsConfig.privateKey);
    });

    it('has a string field type with value member', () => {
      expect(payload).to.haveOwnProperty('type').and.is.a('string');
      expect(payload.type).to.equal(AuthenticationType.member);
    });

    it('has a string field authority', () => {
      expect(payload).to.haveOwnProperty('authority').and.is.a('string');
    })

    it('has a number field memberId', () => {
      expect(payload).to.haveOwnProperty('memberId').and.is.a('number');
    })

    it('has a number field organizationId', () => {
      expect(payload).to.haveOwnProperty('organizationId').and.is.a('number');
    })
  })
})

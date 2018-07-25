import 'mocha';
import { expect } from 'chai';
import * as _ from 'lodash';
import * as Faker from 'faker';
import { AuthenticationType, AuthenticatedContext, IAuthenticatedContextConstructorProps } from './AuthenticatedContext';
import { Authority } from './Member';

describe('models/AuthenticatedContext', () => {
  let subject: AuthenticatedContext;

  describe('when the authenticated type is system', () => {
    beforeEach(() => {
      subject = new AuthenticatedContext({ type: AuthenticationType.system });
    })

    describe('.isSystem', () => {
      it('returns true', () => {
        expect(subject.isSystem()).to.equal(true);
      })
    })

    describe('.isMember', () => {
      it('returns false', () => {
        expect(subject.isMember()).to.equal(false);
      })
    })

    describe('.getMemberId', () => {
      it('throws an error', () => {
        expect(() => subject.getMemberId()).throws('Can only get memberId on a member auth context');
      })
    })

    describe('.getOrganizationId', () => {
      it('throws an error', () => {
        expect(() => subject.getOrganizationId()).throws('Can only get organizationId on a member auth context');
      })
    })

    describe('.getAuthority', () => {
      it('throws an error', () => {
        expect(() => subject.getAuthority()).throws('Can only get authority on a member auth context');
      })
    })
  })

  describe('when the authenticated type is member', () => {
    const authority: Authority = _.sample(Object.values(Authority));
    const memberId = Faker.random.number();
    const organizationId = Faker.random.number();

    beforeEach(() => {
      subject = new AuthenticatedContext({
        type: AuthenticationType.member,
        authority,
        memberId,
        organizationId
      });
    })

    describe('.isMember', () => {
      it('returns true', () => {
        expect(subject.isSystem()).to.equal(false);
      })
    })

    describe('.isSystem', () => {
      it('returns false', () => {
        expect(subject.isMember()).to.equal(true);
      })
    })

    describe('.getMemberId', () => {
      it('returns the member id', () => {
        expect(subject.getMemberId()).to.equal(memberId);
      })
    })

    describe('.getOrganizationId', () => {
      it('returns the organization', () => {
        expect(subject.getOrganizationId()).to.equal(organizationId);
      })
    })

    describe('.getAuthority', () => {
      it('returns the authority', () => {
        expect(subject.getAuthority()).to.equal(authority);
      })
    })
  })
})

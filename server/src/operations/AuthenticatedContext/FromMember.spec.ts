import 'mocha';
import { Factories } from '../../specs';
import * as Faker from 'faker';
import { expect } from 'chai';
import { AuthenticatedContextOperations } from '..';

describe('operations/AuthenticatedContext/FromMember', () => {
  const member = Factories.member.build();
  const run = () => AuthenticatedContextOperations.FromMember.run({ member })

  beforeEach(() => {
    member.id = Faker.random.number();
  })

  it('sets the fields correctly', async () => {
    const authContext = await run();

    expect(authContext.getAuthority()).to.equal(member.authority)
    expect(authContext.getMemberId()).to.equal(member.id)
    expect(authContext.getOrganizationId()).to.equal(member.organizationId)
  })
})

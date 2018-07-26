import { Factory } from 'rosie';
import { Member, Authority, Organization } from '../../models';
import * as bcrypt from 'bcryptjs';
import * as Faker from 'faker';
import { organization } from './Organization';

export const member = Factory.define<Member>('member', Member)
  .attr('authority', Authority.member)
  .attr('email', Faker.internet.email)
  .attr('firstName', Faker.name.firstName)
  .attr('lastName', Faker.name.lastName)
  .attr('password', () => {
    return bcrypt.hashSync(Faker.lorem.text(10))
  })
  .attr('phoneNumber', Faker.phone.phoneNumber)
  .attr('organization', () => organization.build())
  .attr('organizationId', ['organization'], (org: Organization) => org.id)

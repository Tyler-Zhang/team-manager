import { Factory } from 'rosie';
import { Organization } from '../../models';
import * as Faker from 'faker';

export const organization = Factory.define<Organization>('organization', Organization)
  .sequence('id')
  .attr('name', Faker.lorem.text)

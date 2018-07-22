import { ICreateOperationArgs } from '../Abstract';
import { Organization } from '../../models';
import { getManager, EntityManager } from 'typeorm';
import { AbstractOperation } from '../AbstractOperation';
import { BadRequestError } from 'routing-controllers';

export class OrganizationCreateOperation extends AbstractOperation {
  public static run(args: ICreateOperationArgs<Organization>): Promise<Organization> {
    return super.run(args);
  }

  public model: Organization;
  public entityManager: EntityManager;

  constructor({ model, entityManager = getManager() }: ICreateOperationArgs<Organization>) {
    super();
    this.model = model;
    this.entityManager = entityManager;
  }

  public async run() {
    await this.checkNameUnique();

    return this.entityManager.save(this.model);
  }

  private async checkNameUnique() {
    const name = this.model.name;

    const organzation = await this.entityManager.findOne(Organization, { where: { name } });

    if (organzation) {
      throw new BadRequestError('The name for this organization is already taken');
    }
  }
}

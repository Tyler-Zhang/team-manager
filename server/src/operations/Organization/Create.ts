import { IModelApplicationOperationArgs, ModelApplicationOperation } from '../ApplicationOperation';
import { Organization } from '../../models';
import { BadRequestError } from 'routing-controllers';
import { Operation } from "../../lib/sti-model-operations/Operation";

@Operation('Organization')
export class Create extends ModelApplicationOperation<Organization> {
  public static run(args: IModelApplicationOperationArgs<Organization>): Promise<Organization> {
    return super.run(args);
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

import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Resource } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";

@Operation('Resource')
export class Create extends ModelApplicationOperation<Resource> {
  public static run(args: IModelApplicationOperationArgs<Resource>): Promise<Resource> {
    return super.run(args);
  }

  public async run() {
    const existingResource = await this.getExistingResource();

    if (existingResource) {
      // A resource with the same id exists, we should update it.
      Resource.merge(existingResource, this.model);
      return this.entityManager.save(existingResource);
    } else {
      return this.entityManager.save(this.model);
    }
  }

  protected async getExistingResource() {
    const externalId = this.model.externalId;

    return this.entityManager.findOne(Resource, {
      where: { externalId }
    });
  }
}

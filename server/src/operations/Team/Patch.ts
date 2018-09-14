import * as _ from 'lodash';
import { Team, Resource } from '../../models';
import { Operation } from "../../lib/sti-model-operations/Operation";
import { PatchModelApplicationOperation, IPatchModelApplicationOperationArgs } from '../ApplicationOperation/PatchModelApplicationOperation';
import { BadRequestError } from 'routing-controllers';

@Operation('Team')
export class Patch extends PatchModelApplicationOperation<Team> {
  public static run(args: IPatchModelApplicationOperationArgs<Team>) {
    return super.run(args);
  }

  /**
   * If we have changed any resources of the team while performing the
   * patch operation
   */
  private resourceTouchedIds?: number[];

  public async run() {
    /**
     * Update everything but resources
     */
    this.model = Team.merge(this.model, _.omit(this.changes, 'resources'));

    await this.setResourcesFromChanges();
    await this.model.save();

    /**
     * If there were resource changes, we need to fire off jobs to sync them
     * with each team member
     */
    
  }

  private async setResourcesFromChanges() {
    const resources = this.changes.resources;

    if (!resources) {
      return;
    }

    const resourceIds = resources.map(r => r.id);

    const resourceModels = await Resource.find({
      where: {
        id: resourceIds,
        organizationId: this.model.organizationId
      }
    });

    if (resources.length !== resourceModels.length) {
      throw new BadRequestError('Not all resources found');
    }

    const newResourceIds = resourceModels.map(r => r.id);
    const oldResourceIds = (await this.getModelResources()).map(r => r.id);

    this.resourceTouchedIds = _.xor(newResourceIds, oldResourceIds);

    this.model.resources = resourceModels;
  }

  private async getModelResources() {
    if (this.model.resources) {
      return this.model.resources;
    } else {
      return Resource.find({
        where: { teams: [this.model] }
      });
    }
  }
}

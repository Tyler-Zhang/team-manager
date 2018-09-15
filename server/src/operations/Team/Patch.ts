import * as _ from 'lodash';
import { Team, Resource, Position } from '../../models';
import { Operation } from "../../lib/sti-model-operations/Operation";
import { PatchModelApplicationOperation, IPatchModelApplicationOperationArgs } from '../ApplicationOperation/PatchModelApplicationOperation';
import { BadRequestError } from 'routing-controllers';
import { syncResourceToMemberPublisher } from '../../publishers';

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
    this.model.name = this.changes.name || this.model.name;
    
    await this.setResourcesFromChanges();
    await this.model.save();

    /**
     * If there were resource changes, we need to fire off jobs to sync them
     * with each team member
     */
    await this.notifyResourceChanges();

    return this.model;
  }

  private async notifyResourceChanges() {
    const resourceTouchedIds = this.resourceTouchedIds;

    if(!resourceTouchedIds) {
      return;
    }

    // Add a job for each changed resource for each member
    for (const { memberId } of await this.getModelPositions()) {
      for(const resourceId of resourceTouchedIds) {
        syncResourceToMemberPublisher.publish({
          memberId,
          resourceId
        });
      }
    }
  }

  private async setResourcesFromChanges() {
    const resources = this.changes.resources;

    if (!resources) {
      return;
    }

    const resourceIds = resources.map(r => r.id);

    const resourceModels = await this.entityManager.getRepository(Resource)
      .createQueryBuilder('resource')
      .where('resource.organizationId = :organizationId', { organizationId: this.model.organizationId })
      .andWhereInIds(resourceIds)
      .getMany();

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
      return this.entityManager.find(Resource, {
        where: { teams: [this.model] }
      });
    }
  }

  private async getModelPositions() {
    if (this.model.positions) {
      return this.model.positions;
    } else {
      return this.entityManager.find(Position, {
        where: { team: this.model }
      });
    }
  }
}

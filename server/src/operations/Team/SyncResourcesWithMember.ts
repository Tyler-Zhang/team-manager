/**
 * This operation creates jobs to sync resources for each
 * resource for the team with a member
 */
import { IModelApplicationOperationArgs, ModelApplicationOperation } from '../ApplicationOperation';
import { Team, Member, Resource } from '../../models';
import { Operation } from "../../lib/sti-model-operations/Operation";
import { syncResourceToMemberPublisher } from '../../publishers';
import { log } from '../../config';

interface ISyncResourcesWithMemberOperationArgs extends IModelApplicationOperationArgs<Team> {
  member: Member;
}

@Operation('Team')
export class SyncResourcesWithMember extends ModelApplicationOperation<Team> {
  public static run(args: ISyncResourcesWithMemberOperationArgs) {
    return super.run(args);
  }

  private member: Member;

  constructor(args: ISyncResourcesWithMemberOperationArgs) {
    super(args);
    this.member = args.member;
  }

  public async run() {
    const resources = await this.getResources();

    for (const resource of resources) {
      syncResourceToMemberPublisher.publish({
        memberId: this.member.id,
        resourceId: resource.id
      });
    }
  }

  private async getResources() {
    if (this.model.resources) {
      return this.model.resources;
    } else {
      const teamWithResources = await this.entityManager.findOneOrFail(Team, this.model.id, {
        relations: ['resources']
      });

      return teamWithResources.resources;
    }
  }
}

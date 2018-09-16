import { IModelApplicationOperationArgs, ModelApplicationOperation } from '../ApplicationOperation';
import { Position, Team, Member } from '../../models';
import { Operation } from "../../lib/sti-model-operations/Operation";
import { TeamOperations } from '..';

@Operation('Position')
export class Delete extends ModelApplicationOperation<Position> {
  public static run(args: IModelApplicationOperationArgs<Position>): Promise<Position> {
    return super.run(args);
  }

  public async run() {
    await this.populateRelations();

    this.model.onAfterRemove(() => {
      TeamOperations.SyncResourcesWithMember.run({
        member: this.model.member,
        model: this.model.team
      });
    });

    await this.entityManager.remove(this.model);
  }

  private async populateRelations() {
    if (!this.model.team) {
      this.model.team = await Team.findOne(this.model.teamId) as Team;
    }

    if (!this.model.member) {
      this.model.member = await Member.findOne(this.model.memberId) as Member;
    }
  }
}

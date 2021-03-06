import { IModelApplicationOperationArgs, ModelApplicationOperation } from '../ApplicationOperation';
import { Position, Member, Team } from '../../models';
import { NotFoundError } from 'routing-controllers';
import { Operation } from "../../lib/sti-model-operations/Operation";
import { TeamOperations } from '..';

@Operation('Position')
export class Create extends ModelApplicationOperation<Position> {
  public static run(args: IModelApplicationOperationArgs<Position>) {
    return super.run(args);
  }

  public async run() {
    await this.populateRelations();

    this.model.onAfterInsert(() => {
      TeamOperations.SyncResourcesWithMember.run({
        member: this.model.member,
        model: this.model.team
      });
    });

    return this.entityManager.save(this.model);
  }

  /**
   * Just ensure the relations are populated
   */
  private async populateRelations() {
    const position = this.model;

    position.member = position.member || await this.entityManager.findOne(Member, position.memberId);
    position.team = position.team || await this.entityManager.findOne(Team, position.teamId);

    if (!position.member) {
      throw new NotFoundError('This member does not exist');
    }

    if (!position.team) {
      throw new NotFoundError('This team does not exist');
    }

    return position;
  }
}

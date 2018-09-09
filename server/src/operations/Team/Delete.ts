import { IModelApplicationOperationArgs, ModelApplicationOperation } from '../ApplicationOperation';
import { Team, Position } from '../../models';
import { EntityManager } from 'typeorm';
import { PositionOperations } from '..';
import { Operation } from "../../lib/sti-model-operations/Operation";

@Operation('Team')
export class Delete extends ModelApplicationOperation<Team> {
  public static run(args: IModelApplicationOperationArgs<Team>): Promise<void> {
    return super.run(args);
  }

  public run() {
    return this.entityManager.transaction(async entityManager => {
      await this.deletePositions(entityManager);

      await entityManager.remove(this.model);
    });
  }

  private async deletePositions(entityManager: EntityManager) {
    const positions = await entityManager.find(Position, { where: { team: this.model } });

    await Promise.all(positions.map(position => PositionOperations.Delete.run({
      model: position,
      entityManager
    })));
  }
}

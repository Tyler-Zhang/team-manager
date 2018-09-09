import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../ApplicationOperation';
import { Member, Position } from '../../models';
import { EntityManager } from 'typeorm';
import { PositionOperations } from '..';
import { Operation } from "../../lib/sti-model-operations/Operation";

@Operation('Member')
export class Delete extends ModelApplicationOperation<Member> {
  public static run(args: IModelApplicationOperationArgs<Member>): Promise<Member> {
    return super.run(args);
  }

  public run() {
    return this.entityManager.transaction(async entityManager => {
      await this.deletePositions(entityManager);

      await entityManager.remove(this.model);
    });
  }

  private async deletePositions(entityManager: EntityManager) {
    const positions = await entityManager.find(Position, { where: { member: this.model } });

    await Promise.all(positions.map(position => PositionOperations.Delete.run({
      model: position,
      entityManager
    })));
  }
}

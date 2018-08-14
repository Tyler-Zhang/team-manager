import { IDeleteOperationArgs } from '../Abstract';
import { Team, Position } from '../../models';
import { getManager, EntityManager } from 'typeorm';
import { AbstractOperation } from '../AbstractOperation';
import { PositionOperations } from '..';

export class Delete extends AbstractOperation {
  public static run(args: IDeleteOperationArgs<Team>): Promise<void> {
    return super.run(args);
  }

  public model: Team;
  public entityManager: EntityManager;

  constructor({ model, entityManager = getManager() }: IDeleteOperationArgs<Team>) {
    super();
    this.model = model;
    this.entityManager = entityManager;
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

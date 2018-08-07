import { ICreateOperationArgs, IDeleteOperationArgs } from '../Abstract';
import { Member, Position } from '../../models';
import { getManager, EntityManager } from 'typeorm';
import { AbstractOperation } from '../AbstractOperation';
import { PositionOperations } from '..';

export class Delete extends AbstractOperation {
  public static run(args: IDeleteOperationArgs<Member>): Promise<Member> {
    return super.run(args);
  }

  public model: Member;
  public entityManager: EntityManager;

  constructor({ model, entityManager = getManager() }: ICreateOperationArgs<Member>) {
    super();
    this.model = model;
    this.entityManager = entityManager;
  }

  public run() {
    return this.entityManager.transaction(async entityManager => {
      await this.deletePositions(entityManager);
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

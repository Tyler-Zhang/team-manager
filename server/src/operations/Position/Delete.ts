import { ICreateOperationArgs, IDeleteOperationArgs } from '../Abstract';
import { Position } from '../../models';
import { getManager, EntityManager } from 'typeorm';
import { AbstractOperation } from '../AbstractOperation';

export class Delete extends AbstractOperation {
  public static run(args: IDeleteOperationArgs<Position>): Promise<Position> {
    return super.run(args);
  }

  public model: Position;
  public entityManager: EntityManager;

  constructor({ model, entityManager = getManager() }: ICreateOperationArgs<Position>) {
    super();
    this.model = model;
    this.entityManager = entityManager;
  }

  public async run() {
    await this.entityManager.remove(this.model);
  }
}

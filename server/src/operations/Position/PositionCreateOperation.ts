import { ICreateOperationArgs } from '../Abstract';
import { Position, Member, Team } from '../../models';
import { NotFoundError } from 'routing-controllers';
import { getManager, EntityManager } from 'typeorm';
import { AbstractOperation } from '../AbstractOperation';

export class Create extends AbstractOperation {
  public static run(args: ICreateOperationArgs<Position>) {
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
    this.populateRelations();
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

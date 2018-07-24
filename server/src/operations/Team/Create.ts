import { ICreateOperationArgs } from '../Abstract';
import { Team } from '../../models';
import { BadRequestError } from 'routing-controllers';
import { getManager, EntityManager } from 'typeorm';
import { AbstractOperation } from '../AbstractOperation';

export class Create extends AbstractOperation {
  public static run(args: ICreateOperationArgs<Team>) {
    return super.run(args);
  }

  public model: Team;
  public entityManager: EntityManager;

  constructor({ model, entityManager = getManager() }: ICreateOperationArgs<Team>) {
    super();
    this.model = model;
    this.entityManager = entityManager;
  }

  public async run() {
    if (await this.doesTeamWithSameNameExist()) {
      throw new BadRequestError('Team with the same name already exists');
    }

    return this.entityManager.save(this.model);
  }

  private async doesTeamWithSameNameExist () {
    const team = this.model;

    const result = await this.entityManager.findAndCount(Team, {
      where: {
        organizationId: team.organizationId,
        name: team.name
      }
    });

    return result[1] > 0;
  }
}

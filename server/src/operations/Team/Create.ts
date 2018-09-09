import { IModelApplicationOperationArgs, ModelApplicationOperation } from '../ApplicationOperation';
import { Team } from '../../models';
import { BadRequestError } from 'routing-controllers';
import { Operation } from '../../lib/AutoOperation';

@Operation('Team')
export class Create extends ModelApplicationOperation<Team> {
  public static run(args: IModelApplicationOperationArgs<Team>) {
    return super.run(args);
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

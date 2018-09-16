import { Post, Body, JsonController, Delete, Param, NotFoundError, UnauthorizedError, HttpCode } from "routing-controllers";
import { Position, AuthenticatedContext } from '../models';
import { PositionOperations } from "../operations";
import authenticatedContext from "../authorization/authenticatedContext";

@JsonController('/positions')
export class PositionController {
  @Post('')
  public async create(@Body({ required: true }) body: Position) {
    return PositionOperations.Create.run({ model: body });
  }

  @Delete('/:id')
  @HttpCode(204)
  public async delete(
    @Param('id') positionId: number,
    @authenticatedContext({ required: true }) authContext: AuthenticatedContext
  ) {
    const position = await Position.findOne(positionId, {
      relations: ['team', 'member']
    });

    if (!position) {
      throw new NotFoundError('This position does not exist');
    }

    if (position.team.organizationId !== authContext.getOrganizationId()) {
      throw new UnauthorizedError();
    }

    await PositionOperations.Delete.run({ model: position });
    return true;
  }
}

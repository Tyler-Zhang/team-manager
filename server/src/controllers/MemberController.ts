import { Get, Post, Body, BadRequestError, JsonController, QueryParam, Delete, Param } from "routing-controllers";
import { Organization, Member, AuthenticatedContext } from '../models';
import { MemberOperations, PositionOperations } from '../operations';
import { getManager } from "typeorm";
import authenticatedContext from "../authorization/authenticatedContext";

@JsonController('/members')
export class MemberController {
  @Post('')
  public async create(
    @Body({ required: true }) body: Member,
    @authenticatedContext({ required: true }) authContext: AuthenticatedContext
  ) {
    body.organizationId = body.organizationId || authContext.getOrganizationId();

    const organization = await Organization.findOne(body.organizationId);

    if (!organization) {
      throw new BadRequestError('Organization does not exist');
    }

    /**
     * Split up the creation of the member, with it joining the different teams
     */
    const positions = body.positions || [];
    body.positions = [];

    await getManager().transaction(async entityManager => {
      body = await MemberOperations.Create.run({ model: body, entityManager });

      /**
       * Properly associated each position relation id
       */
      positions.forEach(position => { position.memberId = body.id });
      /**
       * Create the positions
       */
      body.positions = await Promise.all(positions.map((position) => PositionOperations.Create.run({ model: position, entityManager })));

    });

    return body;
  }

  @Get('')
  public async get(@QueryParam('organizationId') organizationId: string) {
    return Member.find({
      where: { organizationId },
      relations: ['positions', 'positions.team']
    });
  }

  @Delete('/:id')
  public async delete(@Param('id') memberId: string) {
    const member = await Member.findOne(memberId);

    if (!member) {
      throw new BadRequestError('This member does not exist');
    }

    await MemberOperations.Delete.run({ model: member });
  }
}

import { Post, Body, BadRequestError, JsonController } from "routing-controllers";
import { Organization, Member } from '../models';
import { MemberCreateOperation } from "../operations/Member/MemberCreateOperation";
import { PositionCreateOperation } from "../operations/Position/PositionCreateOperation";
import { getManager } from "typeorm";

@JsonController('/members')
export class MemberController {
  @Post('')
  public async create(@Body({ required: true }) body: Member) {
    const organization = await Organization.findOne(body.id);

    if (!organization) {
      throw new BadRequestError('Organization does not exist');
    }

    /**
     * Split up the creation of the member, with it joining the different teams
     */
    const positions = body.positions;
    body.positions = [];

    await getManager().transaction(async entityManager => {
      body = await MemberCreateOperation.run({ model: body, entityManager });

      /**
       * Properly associated each position relation id
       */
      positions.forEach(position => { position.memberId = body.id });
      /**
       * Create the positions
       */
      body.positions = await Promise.all(positions.map((position) => PositionCreateOperation.run({ model: position, entityManager })));

    });

    return body;
  }
}
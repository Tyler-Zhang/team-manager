import { Post, Body, JsonController, Res, Redirect } from "routing-controllers";
import { Authority } from '../models';
import { CreateOrganizationRequest } from "../requests/CreateOrganizationRequest";
import { getManager } from "typeorm";
import { OrganizationOperations, MemberOperations } from '../operations';
import { Response } from "express-serve-static-core";

@JsonController('/organizations')
export class OrganizationController {
  @Post('/init')
  @Redirect('/login')
  public async init(
    @Body({ required: true, validate: true}) body: CreateOrganizationRequest,
    @Res() res: Response
  ) {
    // initial member is the person to create the organization, and should be an admin
    const { organization, member: initialMember } = body;

    initialMember.authority = Authority.admin;

    await getManager().transaction(async (entityManager) => {
      const createdOrganization = await OrganizationOperations.Create.run({ model: organization, entityManager });
      initialMember.organization = createdOrganization;
      return MemberOperations.Create.run({ model: initialMember, entityManager });
    });
  }
}

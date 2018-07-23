import { Post, Body, JsonController, Res, Redirect } from "routing-controllers";
import { Authority } from '../models';
import { CreateOrganizationRequest } from "../requests/CreateOrganizationRequest";
import { getManager } from "typeorm";
import { OrganizationCreateOperation } from "../operations/Organization/OrganizationCreateOperation";
import { MemberCreateOperation } from "../operations/Member/MemberCreateOperation";
import { Response } from "express-serve-static-core";

@JsonController('/organizations')
export class OrganizationController {
  @Post('')
  @Redirect('/login')
  public async create(
    @Body({ required: true, validate: true}) body: CreateOrganizationRequest,
    @Res() res: Response
  ) {
    // initial member is the person to create the organization, and should be an admin
    const { organization, member: initialMember } = body;

    initialMember.authority = Authority.admin;

    await getManager().transaction(async (entityManager) => {
      const createdOrganization = await OrganizationCreateOperation.run({ model: organization, entityManager });
      initialMember.organization = createdOrganization;
      return MemberCreateOperation.run({ model: initialMember, entityManager });
    });
  }
}

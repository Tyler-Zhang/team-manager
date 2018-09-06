import { Post, Body, JsonController, Res, HttpCode, Get } from "routing-controllers";
import { Authority, AuthenticatedContext, Organization } from '../models';
import { CreateOrganizationRequest } from "../requests/CreateOrganizationRequest";
import { getManager } from "typeorm";
import { OrganizationOperations, MemberOperations } from '../operations';
import { Response } from "express-serve-static-core";
import authenticatedContext from "../authorization/authenticatedContext";

@JsonController('/organizations')
export class OrganizationController {
  @Get()
  public async get(@authenticatedContext() authContext: AuthenticatedContext) {
    const organizationId = authContext.getOrganizationId();

    return Organization.find({
      where: { id: organizationId },
      relations: ['externalConnections']
    });
  }


  @Post('/init')
  @HttpCode(204)
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

    return null;
  }
}

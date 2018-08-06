import { Post, Body, JsonController, OnUndefined, Res, UnauthorizedError, BadRequestError } from "routing-controllers";
import { compare } from 'bcryptjs';
import { Member, AuthenticatedContext, Organization } from '../models';
import { LoginRequest } from "../requests/LoginRequest";
import { Response } from "express";
import { AuthenticatedContextOperations } from '../operations';
import authenticatedContext from "../authorization/authenticatedContext";


@JsonController('/authentication')
export class AuthenticationController {
  @Post('/login')
  @OnUndefined(401)
  public async login(
    @Body({ required: true }) body: LoginRequest,
    @Res() res: Response
  ) {
    const { email, password } = body;

    const member = await Member.findOne({
      where: { email },
      join: {
        alias: 'member',
        leftJoinAndSelect: {
          organization: 'member.organization'
        }
      }
    });

    if (!member || !await compare(password, member.password)) {
      throw new UnauthorizedError('Bad credentials');
    }

    const authContext = await AuthenticatedContextOperations.FromMember.run({ member });
    const token = await AuthenticatedContextOperations.IntoToken.run({ authContext });

    // Set as cookie
    res.cookie('authorization', token, { httpOnly: true });

    return {
      organization: member.organization,
      authenticatedContext: authContext
    }
  }

  @Post('/logout')
  public async logout(@Res() res: Response) {
    res.clearCookie('authorization');
    return null;
  }

  @Post('/reauthenticate')
  public async reauthenticate(
    @authenticatedContext({required: true}) authContext: AuthenticatedContext
  ) {
    const organizationId = authContext.getOrganizationId();
    const organization = await Organization.find({ where: { organizationId } });

    if (!organization) {
      throw new BadRequestError('Your organization does not exist');
    }

    return {
      organization,
      authenticatedContext: authContext
    }
  }
}

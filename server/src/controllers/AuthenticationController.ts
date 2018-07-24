import { Post, Body, JsonController, OnUndefined, Res, UnauthorizedError } from "routing-controllers";
import { compare } from 'bcryptjs';
import { Member } from '../models';
import { LoginRequest } from "../requests/LoginRequest";
import { Response } from "express";
import { AuthenticatedContextOperations } from '../operations';


@JsonController('/authentication')
export class AuthenticationController {
  @Post('/login')
  @OnUndefined(401)
  public async login(
    @Body({ required: true }) body: LoginRequest,
    @Res() res: Response
  ) {
    const { email, password } = body;

    const member = await Member.findOne({ where: { email }});

    if (!member || !await compare(password, member.password)) {
      throw new UnauthorizedError('Bad credentials');
    }

    const authContext = await AuthenticatedContextOperations.FromMember.run({ member });
    const token = await AuthenticatedContextOperations.IntoToken.run({ authContext });

    // Set as cookie
    res.cookie('authorization', token, { httpOnly: true });
    return null;
  }
}

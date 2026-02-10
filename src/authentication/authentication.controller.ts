import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

import { Auth } from './deconrators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { RefreshTokenDto } from './dto/refresh-token.dto';


@Auth(AuthType.None) 
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService

  ) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK) // by default @Post does 201, we wanted 200 - hence using @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
   return this.authService.signIn(signInDto)
  }

  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }


}
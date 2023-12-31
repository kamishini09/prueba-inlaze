import {
  Controller,
  UseGuards,
  HttpStatus,
  Response,
  Request,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../services/user.service';
import { CreateUsersDto } from '../dto/interfaces/user/dto/createuser.dto';
//import { debug } from 'util';
import { LoginUserDto } from '../auth/dto/loginuser.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../auth/dto/jwt-payload.interface';

//@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Response() res, @Body() login: LoginUserDto) {
    const user = await this.usersService.findByEmail(login.email);
    if (!user) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'User Not Found',
      });
    } else { 
      //debug('start getting the token');
      const token = this.authService.createToken(user);
      //debug(token.accessToken);
      return res.status(HttpStatus.OK).json(token);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  public async getUserlogin(@Request() req: any): Promise<JwtPayload> {
    return req.user;
  }
}

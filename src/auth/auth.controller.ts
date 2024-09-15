import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Role } from '../common/enums/role.enum';
import { AuthDecorator } from './decorators/auth.decorator';
import { ActiveUserr } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

interface RequestWithUser extends Request { // Interfaz creada para typar la informacion del usuario que viaja en el JWT
  user: {
    email: string;
    role: string;
  }
}

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ){}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterUserDto
  ){
    return this.authService.register(registerDto)
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto
  ){
    return this.authService.login(loginDto)
  }

  // @Get('profile')
  // @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  // profile(
  //   @Req() req : RequestWithUser){
  //   return req.user
  // }

  @Get('profile') //La diferencia con el de arriba es que aca solo usamos un decorador que junta varios decoradores
  @AuthDecorator(Role.ADMIN)
  profile(@ActiveUserr() user: UserActiveInterface){
    return user
  }
}

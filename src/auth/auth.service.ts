import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
  constructor(
    private readonly userServices: UsersService,
    private readonly jwtServices: JwtService
  ) {}

  async login( user: LoginDto) {
    const userFound = await this.userServices.findOneByEmailWithPassword(user.email)

    if(!userFound) throw new UnauthorizedException('Email is wrong')

    const isValidPassword = await bcryptjs.compare(user.password, userFound.password)

    if(!isValidPassword) throw new UnauthorizedException('Password is wrong')

    const payload = { email: user.email, rol: userFound.role }

    const token = await this.jwtServices.signAsync(payload)

    return {
      token,
      userFound
    }
  }

  async register( {name, email, password }: RegisterUserDto ) {
    const user = await this.userServices.findOneByEmail(email)

    if(user) throw new BadRequestException('User already exists')
      
    const hashPassword = await bcryptjs.hash(password, 10)

    await this.userServices.create({
      name,
      email,
      password : hashPassword
    })

    return { 
      name,
      email
    }
  }
}

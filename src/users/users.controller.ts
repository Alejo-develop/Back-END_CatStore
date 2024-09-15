import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';

@AuthDecorator(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(){
    return this.usersService.findAll()
  }
}

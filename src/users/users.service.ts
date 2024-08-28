import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    try {
      const userFound = this.userRepository.findOneBy({ email }) //Este es para que encontremos una columna bajo el dato que le pasemos

      if(!userFound) throw new Error('User not found by email')

      return userFound  
    } catch (err) {
        return err
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOneByEmailWithPassword( email: string ){
    return this.userRepository.findOne({  //Este es para que encontremos una columna bajo querys mas especificas
      where: { email },
      select: [ 'id', 'name', 'email', 'password', 'role' ] 
    })
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}

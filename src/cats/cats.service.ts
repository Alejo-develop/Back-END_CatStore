import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class CatsService {

  constructor(

    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>

  ){ }

  private async verifyIfBreedExist(breed: string){
    const breedFound = await this.breedRepository.findOneBy({ name: breed})

    if(!breedFound){
      throw new BadRequestException('Breed not found')
    }

    return breedFound
  }

  async create(createCatDto: CreateCatDto, user: UserActiveInterface ) {
    const breed = await this.verifyIfBreedExist(createCatDto.breed)

    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email
    })
  }

  async findAll(user: UserActiveInterface) {
    if(user.role === Role.ADMIN){
      return await this.catRepository.find()
    }
    
    return await this.catRepository.find({
      where: { userEmail: user.email }
    });
  }

  private validateOwnerShip(cat: Cat, user: UserActiveInterface){
    if(user.role !== Role.ADMIN && cat.userEmail !== user.email){
      throw new UnauthorizedException('You do not have permissions')
    }
  }


  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOne({ 
      where : {id}
    });

    if(!cat) throw new Error('Cat not found')

    this.validateOwnerShip(cat, user)

    return cat
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
   await this.findOne(id, user)

    return await this.catRepository.update(id,{
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.verifyIfBreedExist(updateCatDto.breed) : undefined,
      userEmail: user.email
    })
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user)

    return await this.catRepository.softDelete({id}); // Este hace una eliminacion fisica

    //return await this.catRepository.softDelete({id}); A este se le pasa el id y hace una eliminacion logica
    //return await this.catRepository.softRevome({id)}; A este se le pasa la instancia
  }
}

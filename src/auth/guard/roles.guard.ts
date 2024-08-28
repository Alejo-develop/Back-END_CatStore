import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){} // EL modulo reflector sirve para poder leer el rol


  canActivate( // Esta funcion solo devolvera un booleano por que lo que nos interesa es saber si esta autorizado o no
    context: ExecutionContext, 
  ): boolean {

    const roles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [  //Recibimos dos cosas como en el local storage, llave y valor de nuestro decorador
      context.getHandler(), // Es la extraccion de los metadatos para el controlador de ruta procesado en el momento
      context.getClass() // metadatos del controlador de clase, sirve para acceder a los metadatos de esta clase en especifico
    ])

    if(!roles) return true 

    const { user } = context.switchToHttp().getRequest()
    
    // return roles.some((role) => user.role?.includes(role)) <= Retornamos asi si estamos trabajando con un array y no con un string que es el caso
    return roles === user.role
  }
}

import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function AuthDecorator(role: Role){ //Exportamos funcion que juntara los decoradores que queramos en la logica
    return applyDecorators( //Modulo para juntar decoradores
        Roles(role), // Es el decorador para los roles 
        UseGuards(AuthGuard, RolesGuard) // Decorador con el guard del token y el guard de los roles, el primero verifica que el token sea valido y el segundo verifica el rol del usuario
    )

    //Le pasamos el rol a la funcion para saber bajo que rol se usara este decorador, osea si es ADMIN o USER
}
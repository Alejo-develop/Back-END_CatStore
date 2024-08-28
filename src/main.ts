import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/vi');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // Le decimos que admita lo que pongamos en los DTO'S
      forbidNonWhitelisted: true, // Le tira un error al cliente si intenta mandar otra cosa
      transform: true //Transforma los datos que sea posible transformar 
    })
  )
  await app.listen(3000); //Cuando todo se cumpla y este correcto nuestra app empezara a escuchar solicitudes en el puerto 3000
}
bootstrap(); // No se por que pero solo inica con este comando  ./node_modules/.bin/nest start --watch


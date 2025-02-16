import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


    // forbidNonWhitelisted he didn't let you to show auther thing except what in the body like ajouter : ticket:12223 in other way server stop it

    // whitelist: he let you to write but he didn't how what you write in other way server display non it
    
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true, forbidNonWhitelisted:true}))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

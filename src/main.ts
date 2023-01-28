import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    optionsSuccessStatus: 200,
  });

  await app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening at port ${process.env.PORT || 8080}`);
  });
}
bootstrap();

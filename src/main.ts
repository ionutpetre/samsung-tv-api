require('dotenv').config();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SamsungTVModule } from './samsung-tv.module';

async function bootstrap() {
  const app = await NestFactory.create(SamsungTVModule);
  await app.listen(process.env.PORT, () => {
    Logger.log(`SamsungTV API listening on http://localhost:${process.env.PORT}`, 'Main');
  });
}
bootstrap();

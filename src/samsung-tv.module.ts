import { Module } from '@nestjs/common';
import { SamsungTVController } from './samsung-tv.controller';
import { SamsungTVService } from './samsung-tv.service';

@Module({
  controllers: [SamsungTVController],
  providers: [SamsungTVService],
})
export class SamsungTVModule {}

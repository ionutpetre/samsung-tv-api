import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { SamsungTVService } from './samsung-tv.service';

@Controller('samsung-tv')
export class SamsungTVController {
  constructor(private samsungTVService: SamsungTVService) {}

  @Get('/tv/start')
  @HttpCode(HttpStatus.OK)
  async startTV(): Promise<void> {
    return this.samsungTVService.startTV();
  }

  @Get('/tv/stop')
  @HttpCode(HttpStatus.OK)
  async stopTV(): Promise<void> {
    return this.samsungTVService.stopTV();
  }

  @Get('/tv/open')
  @HttpCode(HttpStatus.OK)
  async openTV(): Promise<void> {
    return this.samsungTVService.openTV();
  }

  @Get('/apps')
  @HttpCode(HttpStatus.OK)
  getApps(): Promise<object[]> {
    return this.samsungTVService.getApps();
  }

  @Get('/apps/youtube')
  @HttpCode(HttpStatus.OK)
  openYoutube(): Promise<void> {
    return this.samsungTVService.openAppByName('YouTube');
  }

  @Get('/apps/netflix')
  @HttpCode(HttpStatus.OK)
  openNetflix(): Promise<void> {
    return this.samsungTVService.openAppByName('Netflix');
  }

  @Get('/apps/hbogo')
  @HttpCode(HttpStatus.OK)
  openHBO(): Promise<void> {
    return this.samsungTVService.openAppByName('HBO GO');
  }

  @Get('/apps/:appId')
  @HttpCode(HttpStatus.OK)
  async openApp(@Param('appId') appId: string): Promise<void> {
    return this.samsungTVService.openAppById(appId);
  }
}

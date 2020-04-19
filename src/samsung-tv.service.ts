import { Injectable } from '@nestjs/common';
import { MySamsungTV } from './core/samsung-tv';

@Injectable()
export class SamsungTVService {
  private tv;

  constructor() {
    this.tv = new MySamsungTV(
      process.env.SAMSUNG_TV_IP,
      process.env.SAMSUNG_TV_MAC,
    );
    this.tv.connect();
  }

  async startTV() {
    await this.tv.sendKey('KEY_POWERON');
  }

  async stopTV() {
    await this.tv.sendKey('KEY_POWER');
  }

  async openTV() {
    await this.tv.sendKeyUnsafe('KEY_SOURCE', 1000);
    await this.tv.sendKeyUnsafe('KEY_HDMI', 2000);
    await this.tv.sendKeyUnsafe('KEY_HDMI1', 3000);
  }

  getApps() {
    return this.tv.getApps();
  }

  openAppById(appId: string) {
    return this.tv.openApp(appId);
  }

  async openAppByName(appName: string) {
    const apps = await this.getApps();
    const app = apps.find(_app => _app.name === appName);
    if (app) {
      await this.openAppById(app.appId);
    }
  }
}

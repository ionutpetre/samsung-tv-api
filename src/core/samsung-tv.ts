const SamsungTV = require('./../../node_modules/samsungtv/build/device');

export class MySamsungTV extends SamsungTV {
  constructor(ip, mac) {
    super(ip, mac);
  }

  async sendKeyUnsafe(key, delay = 1000) {
    if (!this.isConnected) {
      throw new Error('Not connected to device. Call `tv.connect()` first!');
    }

    return new Promise(resolve => {
      setTimeout(() => {
        this.ws.send(
          JSON.stringify({
            method: 'ms.remote.control',
            params: {
              Cmd: 'Click',
              DataOfCmd: key,
              Option: 'false',
              TypeOfRemote: 'SendRemoteKey',
            },
          }),
        );
        resolve();
      }, delay);
    });
  }

  async getApps() {
    if (!this.isConnected) {
      throw new Error('Not connected to device. Call `tv.connect()` first!');
    }

    return new Promise((resolve, reject) => {
      this.ws.send(
        JSON.stringify({
          method: 'ms.channel.emit',
          params: {
            data: '',
            event: 'ed.installedApp.get',
            to: 'host',
          },
        }),
      );
      this.ws.on('message', message => {
        const messageData = JSON.parse(message);
        if (messageData.event === 'ed.installedApp.get') {
          resolve(messageData.data.data);
        } else {
          reject('Not valid event');
        }
      });
    });
  }

  async openApp(appId) {
    const apps: any = await this.getApps();
    const app = apps.find(_app => _app.appId === appId);
    return new Promise((resolve, reject) => {
      if (!app) {
        return reject('Not valid application');
      }
      this.ws.send(
        JSON.stringify({
          method: 'ms.channel.emit',
          params: {
            data: {
              action_type: app.app_type === 2 ? 'DEEP_LINK' : 'NATIVE_LAUNCH',
              appId: app.appId,
            },
            event: 'ed.apps.launch',
            to: 'host',
          },
        }),
      );
      this.ws.on('message', message => {
        const messageData = JSON.parse(message);
        if (messageData.event === 'ed.apps.launch') {
          resolve();
        } else {
          reject('Not valid event');
        }
      });
    });
  }
}

/**
 * ConfigService, Load and Get Application level configurations.
 */

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConfig } from './config.contracts';

@Injectable()
export class ConfigService {
  private config: AppConfig;

  constructor() {}

  // get application configurations object
  public getAppConfig(): AppConfig {
    return this.config;
  }

  // load application configurations
  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.config = environment;
      //    resolve();
    });
  }
}

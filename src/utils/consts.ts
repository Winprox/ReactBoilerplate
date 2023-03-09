import config from '../../package.json';

export class Consts {
  static version = config.version;
  static isEnvDev = import.meta.env.DEV;
  static isModeDev = import.meta.env.VITE_DEV === 'true';
}

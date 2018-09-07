import { ApplicationEntity } from './ApplicationEntity';
import { plainToClass } from 'class-transformer';

export abstract class STIApplicationEntity extends ApplicationEntity {
  public static buildForType(plainObject: any) {
    const klass: any = this.typeMap[this.getType(plainObject)] || this;

    return plainToClass(klass, plainObject);
  }

  public static getType(plainObject: any): string {
    return plainObject.type;
  }

  public static get typeMap(): Record<string, any> {
    return {};
  }
}

import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ConstructableModel } from '../lib/sti-model-operations';

export abstract class ApplicationEntity extends BaseEntity {
  public static getAppropriateClass = ConstructableModel.getAppropriateClass;
  
  public static build = ConstructableModel.build;

  public static getType(plainObject: any) {
    return plainObject.type;
  }

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}

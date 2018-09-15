import { BaseEntity, CreateDateColumn, UpdateDateColumn, AfterInsert, AfterRemove } from 'typeorm';
import { ConstructableModel } from '../lib/sti-model-operations';

type IEventCallback<T> = (entity: T) => any;

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

  private onAfterInsertCallbacks: Array<IEventCallback<this>> = [];
  private onAfterRemoveCallbacks: Array<IEventCallback<this>> = [];

  public onAfterInsert(callback: IEventCallback<this>) {
    this.onAfterInsertCallbacks.push(callback);
  }

  public onAfterRemove(callback: IEventCallback<this>) {
    this.onAfterRemoveCallbacks.push(callback);
  }

  @AfterInsert()
  private afterInsert() {
    for (const cb of this.onAfterInsertCallbacks) {
      cb(this);
    }

    this.onAfterInsertCallbacks = [];
  }

  @AfterRemove()
  private afterRemove() {
    for (const cb of this.onAfterRemoveCallbacks) {
      cb(this);
    }
  }
}

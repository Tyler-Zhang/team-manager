import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class ApplicationEntity extends BaseEntity {
  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}

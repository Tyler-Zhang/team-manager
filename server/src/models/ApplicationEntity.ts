import { Entity, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export abstract class ApplicationEntity extends BaseEntity {
  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}

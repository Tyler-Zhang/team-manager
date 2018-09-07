import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, TableInheritance } from 'typeorm';
import { ApplicationEntity } from './ApplicationEntity';
import { Organization } from './Organization';
import { Type } from 'class-transformer';

@Entity()
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class ExternalConnection extends ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;
  
  @Column()
  public type!: string;

  @Column({ type: 'int', nullable: false })
  @Index()
  public organizationId!: number;

  @Type(() => Organization)
  @ManyToOne(type => Organization)
  @JoinColumn({ name: 'organizationId' })
  public organization!: Organization;
}

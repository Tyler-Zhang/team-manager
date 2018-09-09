import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApplicationEntity } from './ApplicationEntity';
import { Member } from './Member';
import { Type } from 'class-transformer';
import { ExternalConnection } from './ExternalConnection';
import { Resource } from './Resource';
import { Model } from '../lib/sti-model-operations';

@Model('Organization')
@Entity()
export class Organization extends ApplicationEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Type(() => Member)
  @OneToMany(type => Member, member => member.organization)
  public members!: Member[];

  @Type(() => ExternalConnection)
  @OneToMany(type => ExternalConnection, externalConnection => externalConnection.organization)
  public externalConnections!: ExternalConnection[];

  @Type(() => Resource)
  @OneToMany(type => Resource, resource => resource.organization)
  public resources!: ExternalConnection[];
}

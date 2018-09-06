import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate, Index } from 'typeorm';
import { ApplicationEntity } from './ApplicationEntity';
import { Organization } from './Organization';
import { Position } from './Position';
import { Type } from 'class-transformer';

export enum Authority {
  member = 'member',
  admin = 'admin'
}

@Entity()
@Index(['organizationId', 'email'], { unique: true })
export class Member extends ApplicationEntity {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ enum: Authority, default: Authority.member })
  public authority!: Authority

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @Type(() => Position)
  @OneToMany(type => Position, position => position.member)
  public positions!: Position[];

  @Column({ type: 'int', nullable: false })
  public organizationId!: number;

  @Type(() => Organization)
  @ManyToOne(type => Organization)
  @JoinColumn({ name: 'organizationId' })
  public organization!: Organization;

  @BeforeInsert()
  @BeforeUpdate()
  private normalizeEmail() {
    this.email = this.email.toLowerCase();
  }
}

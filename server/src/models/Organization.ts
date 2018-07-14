import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';

/**
 * A Game model stores a game on a court in a rotation
 */
@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;
}

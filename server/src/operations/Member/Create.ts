import { ICreateOperationArgs } from '../Abstract';
import { Member } from '../../models';
import { getManager, EntityManager } from 'typeorm';
import { hash } from 'bcryptjs';
import { AbstractOperation } from '../AbstractOperation';

export class Create extends AbstractOperation {
  public static run(args: ICreateOperationArgs<Member>): Promise<Member> {
    return super.run(args);
  }

  public model: Member;
  public entityManager: EntityManager;

  constructor({ model, entityManager = getManager() }: ICreateOperationArgs<Member>) {
    super();
    this.model = model;
    this.entityManager = entityManager;
  }

  public async run() {
    await this.hashPassword();

    return this.entityManager.save(this.model);
  }

  private async hashPassword() {
    this.model.password = await hash(this.model.password, 10);
  }
}

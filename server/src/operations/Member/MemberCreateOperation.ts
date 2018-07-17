import { ICreateOperationArgs } from '../Abstract';
import { Member } from '../../models';
import { getManager, EntityManager } from 'typeorm';
import { AbstractOperation } from '../AbstractOperation';

export class MemberCreateOperation extends AbstractOperation {
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

  public run() {
    return this.entityManager.save(this.model);
  }
}

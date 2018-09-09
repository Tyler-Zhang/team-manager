import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../ApplicationOperation';
import { Member } from '../../models';
import { hash } from 'bcryptjs';
import { Operation } from "../../lib/sti-model-operations/Operation";

@Operation('Member')
export class Create extends ModelApplicationOperation<Member> {
  public static run(args: IModelApplicationOperationArgs<Member>): Promise<Member> {
    return super.run(args);
  }

  public async run() {
    await this.hashPassword();

    return this.entityManager.save(this.model);
  }

  private async hashPassword() {
    this.model.password = await hash(this.model.password, 10);
  }
}

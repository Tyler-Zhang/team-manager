import { IModelApplicationOperationArgs, ModelApplicationOperation } from '../ApplicationOperation';
import { Position } from '../../models';
import { Operation } from "../../lib/sti-model-operations/Operation";

@Operation('Position')
export class Delete extends ModelApplicationOperation<Position> {
  public static run(args: IModelApplicationOperationArgs<Position>): Promise<Position> {
    return super.run(args);
  }

  public async run() {
    await this.entityManager.remove(this.model);
  }
}

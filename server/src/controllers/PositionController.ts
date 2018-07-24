import { Post, Body, JsonController } from "routing-controllers";
import { Position } from '../models';
import { PositionOperations } from "../operations";

@JsonController('/positions')
export class PositionController {
  @Post('')
  public async create(@Body({ required: true }) body: Position) {
    return PositionOperations.Create.run({ model: body });
  }
}

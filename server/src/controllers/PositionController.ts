import { Post, Body, JsonController } from "routing-controllers";
import { Position } from '../models';
import { PositionCreateOperation } from "../operations/Position/PositionCreateOperation";

@JsonController('/positions')
export class PositionController {
  @Post('')
  public async create(@Body({ required: true }) body: Position) {
    return PositionCreateOperation.run({ model: body });
  }
}

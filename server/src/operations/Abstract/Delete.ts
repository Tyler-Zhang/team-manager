import { EntityManager } from "typeorm";

export interface IDeleteOperationArgs<T> {
  model: T,
  entityManager?: EntityManager
}

import { EntityManager } from "typeorm";

export interface ICreateOperationArgs<T> {
  model: T,
  entityManager?: EntityManager
}

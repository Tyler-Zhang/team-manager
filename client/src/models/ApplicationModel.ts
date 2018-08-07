import { Omit } from "react-redux";
import { attr, Model } from "redux-orm";

export abstract class ApplicationModel<Fields, Additional={}, VirtualFields={}> extends Model<Fields, Additional, VirtualFields> {
}

export interface IBaseFields {
  isFetching: boolean;
  isDeleting: boolean;
}

export type ProtoModel<M extends { id: any }> = Omit<M, 'id'>

export const baseFields = {
  isFetching: attr({ getDefault: () => false }),
  isDeleting: attr({ getDefault: () => false })
}

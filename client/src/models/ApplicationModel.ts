import { Omit } from "react-redux";
import { attr, Model } from "redux-orm";

export abstract class ApplicationModel<Fields, Additional={}, VirtualFields={}> extends Model<Fields, Additional, VirtualFields> {
}

export interface IFetchableFields {
  isFetching: boolean;
}

export type ProtoModel<M extends { id: any }> = Omit<M, 'id'>

export const fetchableFields = {
  isFetching: attr({ getDefault: () => false })
}

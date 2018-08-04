import { attr, Model } from "redux-orm";

export abstract class ApplicationModel<Fields, Additional={}, VirtualFields={}> extends Model<Fields, Additional, VirtualFields> {
}

export interface IFetchableFields {
  isFetching: boolean;
}

export const fetchableFields = {
  isFetching: attr({ getDefault: () => false })
}

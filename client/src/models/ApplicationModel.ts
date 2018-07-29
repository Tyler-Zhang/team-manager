import { Model } from "redux-orm";

export abstract class ApplicationModel<Fields, Additional={}, VirtualFields={}> extends Model<Fields, Additional, VirtualFields> {

}

export type Fetchable<U> = ({ isFetching: true } & Partial<U>) | ({ isFetching: false } & U)

import { ORM, ORMCommonState } from 'redux-orm';
import { Member, MemberState } from './Member';
import { Team, TeamState } from './Team';

export * from './Member';
export * from './Team';
export * from './Organization';
export * from './ApplicationModel';
export * from './AuthenticatedContext';

export interface IORMState extends ORMCommonState {
  member: MemberState;
  team: TeamState;
}

export interface IORMModels {
  member: typeof Member;
  team: typeof Team;
}

const orm = new ORM<IORMState>();
orm.register<IORMModels>(Member)

export { orm }

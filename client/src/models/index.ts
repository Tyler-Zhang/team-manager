import { ORM, ORMCommonState } from 'redux-orm';
import { Member, MemberState } from './Member';
import { Position, PositionState } from './Position';
import { Team, TeamState } from './Team';

export * from './Member';
export * from './Team';
export * from './Organization';
export * from './ApplicationModel';
export * from './AuthenticatedContext';

export interface IORMState extends ORMCommonState {
  Member: MemberState;
  Team: TeamState;
  Position: PositionState;
}

export interface IORMModels {
  Member: typeof Member;
  Team: typeof Team;
  Position: typeof Position;
}

const orm = new ORM<IORMState>();
orm.register<IORMModels>(Member, Team, Position);

export { orm }

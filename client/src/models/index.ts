import { ORM, ORMCommonState } from 'redux-orm';
import { Member, MemberState } from './Member';
import { Organization, OrganizationState } from './Organization';
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
  Organization: OrganizationState;
}

export interface IORMModels {
  Member: typeof Member;
  Team: typeof Team;
  Position: typeof Position;
  Organization: typeof Organization;
}

const orm = new ORM<IORMState>();
orm.register<IORMModels>(Member, Team, Position, Organization);

export { orm }

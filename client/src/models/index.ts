import { ORM, ORMCommonState } from 'redux-orm';
import { ExternalConnection, ExternalConnectionState } from './ExternalConnection';
import { Member, MemberState } from './Member';
import { Organization, OrganizationState } from './Organization';
import { Position, PositionState } from './Position';
import { Resource, ResourceState } from './Resource';
import { Team, TeamState } from './Team';

export * from './Member';
export * from './Team';
export * from './Organization';
export * from './ApplicationModel';
export * from './AuthenticatedContext';
export * from './ExternalConnection';
export * from './Resource';
export * from './Position';

export interface IORMState extends ORMCommonState {
  Member: MemberState;
  Team: TeamState;
  Position: PositionState;
  Organization: OrganizationState;
  ExternalConnection: ExternalConnectionState;
  Resource: ResourceState;
}

export interface IORMModels {
  Member: typeof Member;
  Team: typeof Team;
  Position: typeof Position;
  Organization: typeof Organization;
  ExternalConnection: typeof ExternalConnection;
  Resource: typeof Resource;
}

const orm = new ORM<IORMState>();
orm.register<IORMModels>(Member, Team, Position, Organization, ExternalConnection, Resource);

export { orm }

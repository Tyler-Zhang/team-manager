import { ModelApplicationOperation, IModelApplicationOperationArgs } from '../../ApplicationOperation';
import { Member, Resource, ExternalConnection } from '../../../models';
import { Operation } from "../../../lib/sti-model-operations/Operation";
import { ExternalConnectionOperations } from '../..';
import { log } from '../../../config';

export interface IResourceSyncToMemberOperationArgs<T=Resource>
  extends IModelApplicationOperationArgs<T>{
    member: Member;
}

@Operation('Resource')
export abstract class SyncToMember<T extends Resource = Resource> extends ModelApplicationOperation<T> {
  public static run(args: IResourceSyncToMemberOperationArgs) {
    return super.run(args);
  }

  protected member: Member;
  protected externalConnection?: ExternalConnection;
  
  constructor(args: IResourceSyncToMemberOperationArgs<T>) {
    super(args);
    this.member = args.member;
  }

  public async run() {
    await this.hydrateExternalConnectionForResource();

    const shouldMemberHaveAccess = await this.shouldMemberHaveAccessToResource();
    const doesMemberHaveAccess = await this.doesMemberHaveAccessToResource();

    if (shouldMemberHaveAccess === doesMemberHaveAccess) {
      // The member already has the correct permissionss
      return;
    }

    await shouldMemberHaveAccess? 
      this.grantMemberAccessToResource() : 
      this.revokeMemberAccessToResource();
  }

  /**
   * The member should have access to the resource if it is a part of a team
   * that has access to the resource
   */
  protected async shouldMemberHaveAccessToResource(): Promise<boolean> {
    const queryResult = await this.entityManager
      .createQueryBuilder(Member, 'member')
      .leftJoinAndSelect('member.positions', 'position')
      .leftJoinAndSelect('position.team', 'team')
      .leftJoinAndSelect('team.resources', 'resource')
      .where('resource.id = :resourceId', { resourceId: this.model.id })
      .andWhere('member.id = :memberId', { memberId: this.member.id })
      .getOne();
    
    return !!queryResult;
  }

  /**
   * Get the external connection for the resource and make sure it is valid
   */
  protected async hydrateExternalConnectionForResource() {
    const externalConnection = await ExternalConnection.findOne(this.model.externalConnectionId);

    if (!externalConnection) {
      // This should never happen
      throw new Error(`External connection id: ${this.model.externalConnectionId} does not exist`);
    }

    await ExternalConnectionOperations.EnsureValid.run({ model: externalConnection, entityManager: this.entityManager });
    this.externalConnection = externalConnection;
  }

  /**
   * If the member already has access to the resource. Return null if we don't know
   */
  protected abstract async doesMemberHaveAccessToResource(): Promise<boolean | null>;

  protected abstract async grantMemberAccessToResource(): Promise<any>;

  protected abstract async revokeMemberAccessToResource(): Promise<any>;
}

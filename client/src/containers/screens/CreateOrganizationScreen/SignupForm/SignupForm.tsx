import { Button, Divider, Row } from 'antd';
import * as React from 'react';
import { Authority, IMember, IOrganization, ProtoModel } from '../../../../models';

import MemberForm from './MemberForm/MemberForm';
import OrganizationForm from './OrganizationForm/OrganizationForm';

interface IProps {
  onSubmit: (params: { organization: ProtoModel<IOrganization>, member: ProtoModel<IMember> }) => any
}

interface IState {
  organization: ProtoModel<IOrganization>;
  member: ProtoModel<IMember>;
}

/**
 * @TODO: This and its sub components are not styled properly, we should come back and
 * reod these.
 */
export default class SignupFormComponent extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      organization: { name: '' },
      member: {
        authority: Authority.admin,
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
      }
    }
  }

  public render (){
    return (
      <div>
        <h1> Create a new organization </h1>

        <Divider orientation='left'> Organization Settings </Divider>
        <Row>
          <OrganizationForm
            organization={this.state.organization}
            onChange={this.onChangeOrganization}
          />
        </Row>

        <Divider orientation='left'> First Member </Divider>
        <Row>
          <MemberForm
            member={this.state.member}
            onChange={this.onChangeMember}
          />
        </Row>

        <Button
          children='Submit'
          type='primary'
          onClick={this.onSubmit}
        />
      </div>
    )
  }

  private onChangeOrganization = (newOrganization: ProtoModel<IOrganization>) => {
    this.setState({ organization: newOrganization });
  }

  private onChangeMember = (newMember: ProtoModel<IMember>) => {
    this.setState({ member: newMember });
  }

  private onSubmit = () => {
    const { member, organization } = this.state;

    this.props.onSubmit({ member, organization });
  }
}

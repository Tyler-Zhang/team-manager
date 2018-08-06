import { Input, Row } from 'antd';
import * as React from 'react';
import { IOrganization, ProtoModel } from '../../../../../models';

interface IProps {
  organization: ProtoModel<IOrganization>;
  onChange: (organization: ProtoModel<IOrganization>) => any;
}

const OrganizationFormComponent = ({ organization, onChange }: IProps) => {
  const onFieldChangeCreator = (fieldName: string) => (event: React.ChangeEvent<any>) => {
    onChange({ ...organization, [fieldName]: event.target.value })
  };


  return (
    <div>
      <Row>
        <Input
          addonBefore='Name'
          placeholder='My Awesome Organization'
          onChange={onFieldChangeCreator('name')}
        />
      </Row>
    </div>
  )
}

export default OrganizationFormComponent;

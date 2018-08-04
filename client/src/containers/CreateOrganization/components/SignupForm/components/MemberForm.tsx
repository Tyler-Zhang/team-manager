import { Input } from 'antd';
import * as React from 'react';
import { IMember, ProtoModel } from '../../../../../models';

interface IProps {
  member: ProtoModel<IMember>;
  onChange: (Member: ProtoModel<IMember>) => any;
}

const MemberFormComponent = ({ member, onChange }: IProps) => {
  const onFieldChangeCreator = (fieldName: string) => (event: React.ChangeEvent<any>) => {
    onChange({ ...member, [fieldName]: event.target.value })
  };

  return (
    <div>
      <Input
        addonBefore='First name'
        placeholder='Sam'
        onChange={onFieldChangeCreator('firstName')}
      />

      <Input
        addonBefore='Last name'
        placeholder='Jackson'
        onChange={onFieldChangeCreator('lastName')}
      />

      <Input
        addonBefore='Email'
        placeholder='example@gmail.com'
        onChange={onFieldChangeCreator('email')}
      />

      <Input
        addonBefore='Phone Number'
        onChange={onFieldChangeCreator('phoneNumber')}
      />

      <Input
        addonBefore='Password'
        onChange={onFieldChangeCreator('password')}
      />
    </div>
  )
}

export default MemberFormComponent;

import { Button, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { OptionProps } from 'antd/lib/select';
import * as React from 'react'
import { IMember, ITeam, ProtoModel } from '../../../models';

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

interface IProps{
  members: IMember[];
  onCreate: (team: ProtoModel<ITeam>) => any;
  loading?: boolean;
}

class AddTeamForm extends React.Component<IProps & FormComponentProps, {}> {
  public handleSubmit = (event: any) => {
    event.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }

      if (values.members) {
        values.positions = values.members.map((memberId: number) => ({
          memberId
        }));
      }

      this.props.onCreate(values);
    })
  }

  public render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Name">
          {
            getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Input a name' }
            ]})(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Members">
          {
            getFieldDecorator('members')(
              <Select
                mode="multiple"
                tokenSeparators={[',']}
                filterOption={this.filterMembers}
              >
                {
                  this.props.members.map(member => (
                    <Select.Option key={member.id} value={member.id + ''}>
                      {member.firstName} {member.lastName}
                    </Select.Option>
                  ))
                }
              </Select>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={this.props.loading}
          >Submit
          </Button>
        </FormItem>
      </Form>
    )
  }

  private filterMembers(filterText: string, option: React.ReactElement<OptionProps>) {
    return (option.props.children as string).indexOf(filterText) !== -1;
  }
}

export default Form.create()(AddTeamForm)

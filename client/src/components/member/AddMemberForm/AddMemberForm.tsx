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
  teams: ITeam[];
  onCreate: (member: ProtoModel<IMember>) => any;
  loading?: boolean;
}

class AddMemberForm extends React.Component<IProps & FormComponentProps, {}> {
  public handleSubmit = (event: any) => {
    event.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }

      /**
       * The form input for "teams" are a list of teamIds, we convert
       * to position associations
       */
      if(values.teams) {
        values.positions = values.teams.map((teamId: number) => ({
          teamId
        }))
      }

      this.props.onCreate(values);
    })
  }

  public render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="Email">
          {
            getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'Input is not a valid email' },
                { required: true, message: 'Input a email' }
            ]})(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {
            getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Input a password' }
              ],
              initialValue: '1234'
            })(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="First Name">
          {
            getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Input a first name' }]
            })(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Last Name">
          {
            getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Input a last name' }]
            })(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Address">
          {
            getFieldDecorator('address')(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Phone number">
          {
            getFieldDecorator('phoneNumber')(<Input />)
          }
        </FormItem>
        <FormItem {...formItemLayout} label="Teams">
          {
            getFieldDecorator('teams')(
              <Select
                mode="multiple"
                tokenSeparators={[',']}
                filterOption={this.filterTeams}
              >
                {
                  this.props.teams.map(team => (
                    <Select.Option key={team.id} value={team.id + ''}>{team.name}</Select.Option>
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

  private filterTeams(filterText: string, option: React.ReactElement<OptionProps>) {
    return (option.props.children as string).indexOf(filterText) !== -1;
  }
}

export default Form.create()(AddMemberForm)

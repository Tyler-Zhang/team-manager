import { Button, Checkbox, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';

const FormItem = Form.Item;

interface IProps {
  onSubmit: (params: { email: string, password: string}) => any
}

class NormalLoginForm extends React.Component<IProps & FormComponentProps> {
  public handleSubmit:React.ChangeEventHandler = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1> Login </h1>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);

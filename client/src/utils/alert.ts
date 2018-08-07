import { notification } from 'antd';

export interface IAlert {
  error: (error: Error) => any;
  success: (title: string, description?: string) => any;
  info: (title: string, description?: string) => any;
}

const alert: IAlert = {
  error: (error) => {
    notification.error({
      message: 'An error has occurred',
      description: error.message
    })
  },

  success: (message, description) => {
    notification.success({
      message,
      description
    })
  },

  info: (message, description) => {
    notification.info({
      message,
      description
    })
  }
}

export default alert;

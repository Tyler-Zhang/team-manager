import { notification } from 'antd';
import * as React from 'react';

export interface IAlertContext {
  error: (error: Error) => any;
  success: (title: string, description?: string) => any;
  info: (title: string, description?: string) => any;
}

export const defaultAlertContext: IAlertContext = {
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

export default React.createContext(defaultAlertContext);


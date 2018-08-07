import * as React from 'react';
import { AlertContext } from "../contexts";
import { IAlert } from '../utils/alert';

export default function withAlertContext(BaseComponent: React.ComponentClass) {
  return (props: any) => (
      <AlertContext.Consumer>
        {
          (alertContext: IAlert) => <BaseComponent {...props} alert={alertContext}/>
        }
      </AlertContext.Consumer>
  )
}

export interface IAlertProps {
  alert: IAlert;
}

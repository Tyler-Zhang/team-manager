import * as React from 'react';
import { AlertContext } from "../contexts";
import { IAlertContext } from "../contexts/AlertContext";

export default function withAlertContext(BaseComponent: React.ComponentClass) {
  return (props: any) => (
      <AlertContext.Consumer>
        {
          (alertContext: IAlertContext) => <BaseComponent {...props} alert={alertContext}/>
        }
      </AlertContext.Consumer>
  )
}

export interface IAlertProps {
  alert: IAlertContext;
}

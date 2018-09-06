import { Spin } from 'antd';
import * as React from 'react';

interface ISpinnerWhileLoadingOptions {
  showLoadingProps?: boolean
}

const spinnerWhileLoading = (
  propNames: string[], 
  {
    showLoadingProps = false
  }: ISpinnerWhileLoadingOptions = {}
) => (BaseComponent: React.ComponentClass) => (props: any) => {
  const missingProps = propNames.filter((propName) => !(props[propName]));

  if (!missingProps.length) {
    return <BaseComponent {...props}/>
  }
  
  if (showLoadingProps) {
    return (
      <div>
        <p>Loading: {missingProps.join(',')}</p>
        <Spin />
      </div>
    );
  }

  return <Spin />;
}

export default spinnerWhileLoading;

import { Card, Icon } from 'antd';
import * as React from 'react';

const ConnectedCard: React.SFC = () => (
  <Card title="Google Integration">
    <p> You are currently connected to google </p>
    <Icon type="check"/>
  </Card>
);

export default ConnectedCard;

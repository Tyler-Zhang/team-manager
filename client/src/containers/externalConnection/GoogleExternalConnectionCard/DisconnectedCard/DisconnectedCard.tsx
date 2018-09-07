import { Button, Card } from 'antd';
import * as React from 'react';

interface IProps {
  onAuthorize: () => any;
}

const DisconnectedCard: React.SFC<IProps> = ({ onAuthorize }) => (
  <Card title="Google Integration">
    <p> You are currently disconnected from google </p>

    <Button
      type="primary"
      onClick={onAuthorize}
    >Connect
    </Button>
  </Card>
);

export default DisconnectedCard;

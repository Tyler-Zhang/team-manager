import { Card, Collapse, Icon } from 'antd';
import * as React from 'react';

import { IExternalConnection } from '../../../../models';
import ExternalConnectionResourceList from '../../../resource/ExternalConnectionResourceList/ExternalConnectionResourceList';

interface IProps {
  externalConnection: IExternalConnection;
}

const ConnectedCard: React.SFC<IProps> = ({ externalConnection }) => (
  <Card title="Google Integration">
    <p> You are currently connected to google </p>

    <Icon type="check"/>

    <Collapse>
      <Collapse.Panel header="Resources" key="1">
        <ExternalConnectionResourceList
          externalConnection={externalConnection}
        />
      </Collapse.Panel>
    </Collapse>
  </Card>
);

export default ConnectedCard;

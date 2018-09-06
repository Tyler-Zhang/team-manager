import * as _ from 'lodash';
import * as React from 'react';
import { ExternalConnectionType, IExternalConnection } from '../../../../models';
import GoogleExternalConnectionCard from '../../../externalConnection/GoogleExternalConnectionCard/GoogleExternalConnectionCard';

interface IProps {
  externalConnections: IExternalConnection[];
}

const ExternalConnections: React.SFC<IProps> = ({ externalConnections }) => {
  const externalConnectionMap: Record<string, IExternalConnection> = _.keyBy(externalConnections, 'type');

  return (
    <div>
      <GoogleExternalConnectionCard externalConnection={externalConnectionMap[ExternalConnectionType.google]}/>
    </div>
  )
}

export default ExternalConnections;

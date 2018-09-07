import * as React from 'react';
import { IExternalConnection } from '../../../models';

import { GoogleService } from '../../../services';
import ConnectedCard from './ConnectedCard/ConnectedCard';
import DisconnectedCard from './DisconnectedCard/DisconnectedCard';

interface IProps {
  externalConnection?: IExternalConnection
}

export default class GoogleExternalConnectionCard extends React.PureComponent<IProps> {
  public render() {
    if (this.props.externalConnection) {
      return (
        <ConnectedCard/>
      );
    }

    return (
      <DisconnectedCard onAuthorize={this.authorize}/>
    );
  }

  private async authorize() {
    const response = await GoogleService.getRedirectUrl();

    const url = response.data;

    window.location.assign(url);
  }
}

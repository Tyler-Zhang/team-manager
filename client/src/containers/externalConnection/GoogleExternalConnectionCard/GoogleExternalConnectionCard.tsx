import * as React from 'react';
import { IExternalConnection } from '../../../models';

import { GoogleOauthService } from '../../../services';
import ConnectedCard from './ConnectedCard/ConnectedCard';
import DisconnectedCard from './DisconnectedCard/DisconnectedCard';

interface IProps {
  externalConnection?: IExternalConnection
}

export default class GoogleExternalConnectionCard extends React.PureComponent<IProps> {
  public render() {
    if (this.props.externalConnection) {
      return (
        <ConnectedCard
          externalConnection={this.props.externalConnection}
       />
      );
    }

    return (
      <DisconnectedCard onAuthorize={this.authorize}/>
    );
  }

  private async authorize() {
    const response = await GoogleOauthService.getRedirectUrl();

    const url = response.data;

    window.location.assign(url);
  }
}

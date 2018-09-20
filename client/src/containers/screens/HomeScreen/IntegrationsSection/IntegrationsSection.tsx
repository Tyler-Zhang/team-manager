import { Row } from 'antd';
import * as React from 'react';
import CenterInPage from '../../../../components/CenterInPage/CenterInPage';

import IntegrationCard from './IntegrationCard/IntegrationCard';

import googleDriveIcon from './google-drive-icon.png';
import slackIcon from './slack-icon.png';

import './IntegrationsSection.css';

const INTEGRATIONS = [{
  name: 'Google Drive',
  description: 'Allocate Google drive files to your team members',
  thumbnail: googleDriveIcon
}, {
  name: 'Slack',
  description: 'Allocate slack channels, and automatically send slack invites to your team members (coming soon)',
  thumbnail: slackIcon
}];

export default () => (
  <div className="integrations-section">
    <CenterInPage width={10}>
      <Row>
        <div className="heading">
          <span> Integrates with </span>
        </div>
      </Row>

      <Row>
        <div className="integration-cards">
          {
            INTEGRATIONS.map(integration => (
              <IntegrationCard {...integration}/>
            ))
          }
        </div>
      </Row>
    </CenterInPage>
  </div>
);

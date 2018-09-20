import * as React from 'react';

import IntegrationsSection from './IntegrationsSection/IntegrationsSection';
import IntroSection from './IntroSection/IntroSection';

export default class HomeScreen extends React.Component {
  public render() {
    return (
      <div>
        <IntroSection/>
        <IntegrationsSection/>
      </div>
    );
  }
}

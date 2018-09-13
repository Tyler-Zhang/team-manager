import * as React from 'react';
import { compose } from 'recompose';

import { Collapse } from 'antd';
import { ITeam } from '../../../models';
import TeamResourceList from '../../resource/TeamResourceList/TeamResourceList';

interface IOuterProps {
  team: ITeam
}

interface IProps extends IOuterProps {
  team: ITeam
}

class TeamSettings extends React.Component<IProps> {
  public render() {
    return (
      <div>
        <b>Name: {this.props.team.name} </b>

        <Collapse>
          <Collapse.Panel header="Resources" key="1">
            <TeamResourceList
              team={this.props.team}
            />
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  }
}

export default compose<IProps, IOuterProps>(

)(TeamSettings);

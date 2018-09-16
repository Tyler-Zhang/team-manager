import { Button, Icon, Popover, Select, Tag } from 'antd';
import * as React from 'react';
import { Flex } from 'reflexbox';
import { ITeam } from '../../../models';

interface IProps {
  teams: ITeam[];
  onAdd: (team: ITeam) => any;
}

interface IState {
  selectedTeam?: ITeam
}

export default class AddTeamTag extends React.PureComponent<IProps, IState> {
  public state: IState = {};
  
  public render() {
    return(
      <Popover
        title="Add Team"
        content={this.renderAddTeamPopoverContent()}
      >
        <Tag color="green">
          <Icon type="plus"/> Add Team
        </Tag>
      </Popover>
    );
  }

  private renderAddTeamPopoverContent() {
    return (
      <Flex column={true}>
        <Select
          showSearch={true}
          style={{width: 200}}
          placeholder="Select a team"
          optionFilterProp="children"
          onChange={this.onSelectTeam}
          filterOption={this.autocompleteFilter}
        >
          {
            this.props.teams.map(team => (
              <Select.Option 
                key={team.id}
                value={team.id}
              >{team.name}
              </Select.Option>
            ))
          }
        </Select>,

        <Button
          type="primary"
          disabled={!this.state.selectedTeam}
          onClick={this.onConfirm}
        > OK
        </Button>
      </Flex>
    )
  }

  private autocompleteFilter(input: string, option: any) {
    return (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) !== -1;
  }

  private onSelectTeam = (teamId: string) => {
    const castedTeamId = Number(teamId);
    const team = this.props.teams.find(t => t.id === castedTeamId);

    this.setState({ selectedTeam: team });
  }

  private onConfirm = () => {
    if (!this.state.selectedTeam) {
      return;
    }

    this.props.onAdd(this.state.selectedTeam);
  }
}

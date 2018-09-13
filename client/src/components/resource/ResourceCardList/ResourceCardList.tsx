import { Button, List, Row } from 'antd';
import * as _ from 'lodash';
import * as React from 'react';

import { IResource } from '../../../models';
import ResourceCard from '../ResourceCard/ResourceCard';

interface IProps {
  resources: IResource[];
  selectable?: boolean;
  selected?: number[];
  onSubmit?: (resources: number[]) => any;
}

interface IState {
  selected: number[];
}

export default class ResourceCardList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selected: props.selected || []
    };
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.setState({ selected: nextProps.selected || [] });
  }

  public render() {
    return (
      <div>
        <Row>
          <List
            dataSource={this.props.resources}
            renderItem={this.renderItem}
          />
        </Row>
        {
          this.props.selectable &&
          <Row>
            <Button
              type="primary"
              onClick={this.submitChanges}
            > Save
            </Button>

            <Button
              onClick={this.cancelChanges}
            > Cancel
            </Button>
          </Row>
        }
      </div>
    );
  }

  private renderItem = (item: IResource) => {
    return (
      <List.Item>
        <ResourceCard
          resource={item}
          selectable={this.props.selectable}
          selected={_.includes(this.state.selected, item.id)}
          onChange={this.onChangeFactory(item)}
        />
      </List.Item>
    );
  }

  private onChangeFactory = (item: IResource) => {
    return () => {
      const selected = this.state.selected;
      
      if (!selected) {
        return;
      }

      const newSelected = _.includes(selected, item.id) ?
        _.without(selected, item.id) :
        _.concat(selected, item.id);

      this.setState({ selected: newSelected });
    }
  }

  private cancelChanges = () => {
    this.setState({ selected: this.props.selected || [] });
  }

  private submitChanges = () => this.props.onSubmit && 
    this.props.onSubmit(this.state.selected);
}

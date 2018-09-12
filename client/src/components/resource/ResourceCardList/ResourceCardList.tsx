import { List } from 'antd';
import * as React from 'react';

import { IResource } from '../../../models';
import ResourceCard from '../ResourceCard/ResourceCard';

interface IProps {
  resources: IResource[];
  selectable?: boolean;
  selected?: number[];
}

interface IState {
  selected?: number[];
}

export default class ResourceCardList extends React.Component<IProps, IState> {
  public render() {
    return (
      <List
        dataSource={this.props.resources}
        renderItem={this.renderItem}
      />
    );
  }

  private renderItem(item: IResource) {
    return (
      <List.Item>
        <ResourceCard
          resource={item}
        />
      </List.Item>
    )
  }
}

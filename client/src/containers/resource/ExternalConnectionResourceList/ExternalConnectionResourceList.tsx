import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ResourceCardList from '../../../components/resource/ResourceCardList/ResourceCardList';
import { IExternalConnection, IResource } from '../../../models';
import { externalConnectionResourceListSelector } from '../../../selectors/resourceListSelector';
import { IState } from '../../../store';

interface IOuterProps {
  externalConnection: IExternalConnection;
}

interface IProps extends IOuterProps {
  resources: IResource[];
}

class ExternalConnectionResourceList extends React.Component<IProps> {
  public render() {
    return (
      <ResourceCardList
        resources={this.props.resources}
      />
    );
  }
}

export default compose<IProps, IOuterProps>(
  connect((state: IState, props: IOuterProps) => ({
    resources: externalConnectionResourceListSelector(props.externalConnection.id, state.orm)
  }))
)(ExternalConnectionResourceList);

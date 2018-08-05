import { Layout } from 'antd'
import * as React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { MemberActions } from '../../../store/reducers/membersReducer';


interface IProps {
  queryMembers: () => any
}

class UsersContainer extends React.Component<IProps, {}> {
  public componentDidMount () {
    this.props.queryMembers();
  }

  public render () {
    return (
      <Layout/>
    )
  }
}

export default compose(
  connect(null, (dispatch: Dispatch) => bindActionCreators({
    queryMembers: MemberActions.membersQuery
  }, dispatch))
)(UsersContainer);

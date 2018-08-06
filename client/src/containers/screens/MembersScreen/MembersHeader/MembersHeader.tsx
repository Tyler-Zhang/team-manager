import { Button, Col, Input, Layout, Row } from 'antd';
import * as React from 'react';
import { Flex } from 'reflexbox';
import { IMember, ITeam, ProtoModel } from '../../../../models';

import AddMemberModal from '../../../../components/member/AddMemberModal/AddMemberModal';

interface IProps {
  teams: ITeam[];
  onCreate: (member: ProtoModel<IMember>) => any;
  onRefresh: () => any;
}

export default class MembersHeader extends React.PureComponent<IProps> {
  public render() {
    return (
      <Layout.Header style={{ background: '#fff'}}>
          <Row>
            <Col span={4}><h3> Users Page </h3></Col>
            <Col span={8}>
              <Input.Search
                  placeholder="Search here"
                  enterButton={true}
              />
            </Col>
            <Col span={4} offset={8}>
              <Flex align="center" justify="flex-end">
                <Button type="dashed" icon="reload" onClick={this.props.onRefresh}/>
                <div style={{width: 10}}/>
                <AddMemberModal
                  teams={this.props.teams}
                  onCreate={this.props.onCreate}/>
              </Flex>
            </Col>
          </Row>
      </Layout.Header>
    )
  }
}

import { Button, Col, Input, Layout, Row } from 'antd';
import * as React from 'react';
import { Flex } from 'reflexbox';

import AddTeamButton from '../../../team/AddTeamButton/AddTeamButton';

interface IProps {
  onRefresh: () => any;
}

export default class TeamsHeader extends React.PureComponent<IProps> {
  public render() {
    return (
      <Layout.Header style={{ background: '#fff'}}>
          <Row>
            <Col span={4}><h3> Teams </h3></Col>
            <Col span={8}>
              <Input.Search
                  placeholder="Search here"
                  enterButton={true}
                  disabled={true}
              />
            </Col>
            <Col span={4} offset={8}>
              <Flex align="center" justify="flex-end">
                <Button type="dashed" icon="reload" onClick={this.props.onRefresh}/>
                <div style={{width: 10}}/>
                <AddTeamButton/>
              </Flex>
            </Col>
          </Row>
      </Layout.Header>
    )
  }
}

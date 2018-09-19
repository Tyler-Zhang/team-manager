import { Col, Row } from 'antd';
import * as _ from 'lodash';
import * as React from 'react';
import './CenterInPage.scss';

interface IProps {
  width: number;
}

const CenterInPage: React.SFC<IProps> = (props) => (
  <div className='center-in-page' {..._.omit(props, ['width', 'children'])} >
    <Row>
      <Col span={props.width} offset={(24 - props.width) / 2}>
        {props.children}
      </Col>
    </Row>
  </div>
)

export default CenterInPage;

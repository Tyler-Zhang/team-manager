import { Col, Row } from 'antd';
import * as React from 'react';
import './styles.scss';

interface IProps {
  width: number;
}

const CenterInPage: React.SFC<IProps> = ({ children, width }) => (
  <div className='center-in-page'>
    <Row>
      <Col span={width} offset={(24 - width) / 2}>
        {children}
      </Col>
    </Row>
  </div>
)

export default CenterInPage;

import { Col, Row } from 'antd';
import * as React from 'react';

import './IntegrationCard.css';

interface IProps {
  name: string;
  description: string;
  thumbnail: string;
}

const IntegrationCard: React.SFC<IProps> = ({ 
  name,
  description,
  thumbnail
}) => (
  <div className="integration-card">
    <Row>
      <Col md={2}>
        <img src={thumbnail}/>
      </Col>

      <Col offset={2} md={14}>
        <Row>
          <span className="name">{name}</span>
        </Row>
        <Row>
          <p className="description">{description}</p>
        </Row>
      </Col>
    </Row>
  </div>
);

export default IntegrationCard;

import { Col, Row } from 'antd';
import * as React from 'react';

import { Link } from 'react-router-dom';

import './IntroSection.css';
import teamManagerPhoto from './team-manager.png';

export default () => (
  <div className="intro-section">
    <Row>
      <Col md={6} offset={5}>
        <span className="title"> Team Manager </span>
        <p className="subtext">
          All in one application for allocating resources to your team members
        </p>

        <div className="get-started shadowed">
          <Link to="/create_organization">
            <span> Get Started </span>
          </Link>
        </div>

        <div className="login">
          <span>
            Already have an account?&nbsp;
            <Link to="/login">
              Login here.
            </Link>
          </span>
        </div>
      </Col>

      <Col md={6} offset={1}>
        <img className="demo-image shadowed" src={teamManagerPhoto}/>
      </Col>
    </Row>
  </div>
);

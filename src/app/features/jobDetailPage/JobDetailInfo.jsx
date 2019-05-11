import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Label, Segment } from 'semantic-ui-react';


/**
 * Component for rendering the Job Detail Info
 *
 * @param job
 * @returns {*}
 * @constructor
 */
const JobDetailInfo = ({ description, participants }) => (
  <Segment.Group>
    <Segment>
      <Container>
        <h1>Details</h1>
        <p>{description}</p>
      </Container>
    </Segment>
    <Segment>
      <h1>
        Participants (
        {participants.length}
        )
      </h1>
      <Label.Group circular>
        {participants && participants.map(p => (
          <Label key="index" as={Link} to={`/profile/${'asd'}`} content="John Doe" />
        ))}
      </Label.Group>
    </Segment>
  </Segment.Group>
);

export default JobDetailInfo;

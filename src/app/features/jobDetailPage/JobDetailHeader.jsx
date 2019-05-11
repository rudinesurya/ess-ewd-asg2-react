import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';


/**
 * Component for rendering the Job Detail Header
 *
 * @param auth
 * @param isHost
 * @param isGoing
 * @param takeJob
 * @param leaveJob
 * @returns {*}
 * @constructor
 */
const JobDetailHeader = ({
  authenticated, isHost, isGoing, dateString, jobId, jobTitle, hostName, takeJob, leaveJob,
}) => (
  <div>
    <Header icon textAlign="center">
      <Icon name="users" circular />

      <Header.Content>{jobTitle}</Header.Content>
      <Header.Content>{dateString}</Header.Content>
      <Header.Content>
        {`Posted by: ${hostName}`}
      </Header.Content>

    </Header>

    <Button.Group attached="bottom">
      {authenticated && !isHost && (
        <React.Fragment>
          {isGoing ? (<Button onClick={leaveJob} content="Leave" />) : (
            <Button onClick={takeJob} content="Join" color="blue" />)}
        </React.Fragment>
      )}

      {isHost && (
        <Button as={Link} to={`/updateJob/${jobId}`} content="Edit" />
      )}
    </Button.Group>
  </div>
);

JobDetailHeader.propTypes = {};

export default JobDetailHeader;

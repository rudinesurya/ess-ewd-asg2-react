import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';

const JobListItem = ({ job }) => {
  const {
    _id, title, host: { name: hostName }, payout, venue, date, urgency, host, participants,
  } = job;

  const jobAlreadyPast = date && date < Date.now();
  const dateColor = jobAlreadyPast ? 'red' : 'green';
  const dateString = date && dateFormat(date, 'dddd, mmmm dS, yyyy, h:MM:ss TT');

  return (
    <Fragment>
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as={Link} to={`/job/${_id}`}>{title}</Item.Header>

                {urgency && (<Label attached="top right" color="red">Urgent</Label>)}

                <Item.Meta>
                  <Label>
                    $
                    {payout}
                  </Label>

                  <Label color={dateColor}>
                    <Icon name="clock" />
                    {' '}
                    {dateString}
                  </Label>

                  {participants.length > 0 && (
                    <Label>
                      {`${participants.length} participants`}
                    </Label>
                  )}

                  <Label>
                    <Icon name="marker" />
                    {' '}
                    {venue.name}
                  </Label>
                  <br />

                </Item.Meta>

                <Item.Description>
                  {'Posted by '}
                  <Link to={`/profile/${host._id}`}>{hostName}</Link>
                </Item.Description>

              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment clearing>

          <Item.Description>{job.description}</Item.Description>

          <Button
            as={Link}
            to={`/job/${_id}`}
            color="blue"
            primary
            floated="right"
            content="View"
          />
        </Segment>

      </Segment.Group>
    </Fragment>
  );
};

JobListItem.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobListItem;

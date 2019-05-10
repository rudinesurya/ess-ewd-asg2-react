import React, { Fragment } from 'react';
import PropTypes from 'redux-form/es/propTypes';
import JobListItem from './JobListItem';

/**
 * Component for rendering the Job List
 */
const JobList = ({ jobs }) => (
  <Fragment>
    {jobs && jobs.map(job => (
      <JobListItem key={job._id} job={job} />
    ))}
  </Fragment>
);

JobList.propTypes = {
  jobs: PropTypes.array,
};

export default JobList;

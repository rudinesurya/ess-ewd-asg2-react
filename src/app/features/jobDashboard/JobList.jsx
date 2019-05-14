import React, { Fragment } from 'react';
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

export default JobList;

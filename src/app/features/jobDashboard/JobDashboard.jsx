import React from 'react';
import { connect } from 'react-redux';
import { Grid, Pagination } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { loadJobs } from '../../redux/actions/job';
import JobList from './JobList';
import Spinner from '../../utils/Spinner';
import Controller from './Controller';
import SampleGuide from './SampleGuide';

class JobDashboard extends React.Component {
  state = {
    query: null,
    sortBy: null,
  };

  componentDidMount() {
    this.reloadJobs({ sortBy: JSON.stringify({ date: -1 }), page: 1, limit: 3 });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { job } = nextProps;
    if (job.loading) return;

    if (job.pages) {
      this.setState({
        pages: job.pages,
      });
    }

    const { error: { data, error, message } } = job;
    if (error) {
      toast.error(message);
    }
  }

  pageChangeHandler = (event, data) => {
    this.reloadJobs({ ...this.state, page: data.activePage });
  };

  formSubmitHandler = (values) => {
    const { query, sortBy } = values;
    this.reloadJobs({ query, sortBy, page: 1 });
  };

  reloadJobs = ({
    query, sortBy, page, limit,
  }) => {
    let newState = { ...this.state };
    if (query) {
      newState = { ...newState, query };
    } else {
      newState = { ...newState, query: JSON.stringify({}) };
    }
    if (sortBy) {
      newState = { ...newState, sortBy };
    } else {
      newState = { ...newState, sortBy: JSON.stringify({}) };
    }
    if (page) newState = { ...newState, page };
    if (limit) newState = { ...newState, limit };

    this.setState({ ...newState });

    const { loadJobs } = this.props;
    loadJobs(
      newState.query,
      newState.sortBy,
      newState.page,
      newState.limit,
    );
  };

  render() {
    const { job } = this.props;
    if (job.loading) return (<Spinner />);

    return (
      <Grid>
        <Grid.Column width={10}>
          <React.Fragment>
            <JobList jobs={job.jobs} />
            <Pagination
              activePage={this.state.page}
              totalPages={this.state.pages}
              onPageChange={this.pageChangeHandler}
            />
          </React.Fragment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Controller initialValues={this.state} onSubmitHandler={this.formSubmitHandler} />
          <SampleGuide />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  job: state.job,
});

const mapDispatchToProps = {
  loadJobs,
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDashboard);

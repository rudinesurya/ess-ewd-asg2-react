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
    sortBy: '-date',
    activePage: 1,
    pageLimit: 3,
  };

  componentDidMount() {
    this.reloadJobs(this.state);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { job } = nextProps;
    if (job.loading) return;

    if (job.pages) {
      this.setState({
        pages: job.pages,
      });
    }

    const { error: { data, error } } = job;
    if (error) {
      toast.error(error);
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.state.sortBy !== nextState.sortBy
      || this.state.query !== nextState.query
      || this.state.activePage !== nextState.activePage
      || this.state.pageLimit !== nextState.pageLimit
    ) {
      this.reloadJobs(nextState);
    }
  }

  pageChangeHandler = (event, data) => {
    this.setState({
      activePage: data.activePage,
    });
  };

  formSubmitHandler = (values) => {
    const { query, sortBy } = values;
    this.setState({
      query,
      sortBy,
    });
  };

  reloadJobs = ({
    query, sortBy, activePage, pageLimit,
  }) => {
    const { loadJobs } = this.props;
    loadJobs(
      query,
      sortBy,
      activePage,
      pageLimit,
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
              activePage={this.state.activePage}
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

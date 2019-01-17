import React, { Component } from 'react';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Repositories extends Component {
  constructor(props) {
    super();
  }

  render() {
    let loading;
    if(this.props.loading) loading = <Loading />;

    let repos;
    if(this.props.repoData && this.props.repoData.length > 0) {
      repos = this.props.repoData.map(repo => {
        return (
          <div className="card" key={repo.id}>
            <div className="card-body">
              <h5 className="card-title">
                {repo.name}
                <small className="float-right" title="Open Issues">
                  <FontAwesomeIcon icon="info-circle" />
                  {repo.open_issues}
                </small>
                <small className="float-right" title="Forks">
                  <FontAwesomeIcon icon="code-branch" />
                  {repo.forks}
                </small>
                <small className="float-right" title="Watchers">
                  <FontAwesomeIcon icon="star" />
                  {repo.watchers}
                </small>
              </h5>
              <p className="card-text">{repo.description}</p>
            </div>
          </div>
        )
      });
    } else {
      repos = <p className="text-muted no-data">(No Repositories)</p>
    };

    return (
      <div className="repositories-container col-sm-9">
        <h5 className="col-header">Repositories</h5>
        { loading }
        { repos }
      </div>
    );
  }
}

export default Repositories;

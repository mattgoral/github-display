import React, { Component } from 'react';
import Loading from '../components/Loading';

class Organizations extends Component {
  constructor(props) {
    super();
  }

  render() {
    let loading;
    if(this.props.loading) loading = <Loading />;

    let orgs;
    if(this.props.userData && this.props.userData.orgs && this.props.userData.orgs.length > 0) {
      orgs = this.props.userData.orgs.map(org => {
        return (
          <div key={org.id}>
            <p>{org.login}</p>
          </div>
        )
      });
    } else {
      orgs = <p className="text-muted no-data">(No Organizations)</p>
    };

    return (
      <div className="organizations-container col-sm-3">
        <h5 className="col-header">Organizations</h5>
        { loading }
        { orgs }
      </div>
    );
  }
}

export default Organizations;

import React, { Component } from 'react';
import { getRepos, getUserData } from './api/github-api';
import Organizations from './components/Organizations';
import Repositories from './components/Repositories';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faCodeBranch, faStar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch, faSpinner, faCodeBranch, faStar, faInfoCircle);

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      user: '',
      repos: [],
      reposLoading: false,
      userData: {},
      userDataLoading: false,
      didSearch: false,
      error: false
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.getGithubData = this.getGithubData.bind(this);
  }

  inputChangeHandler(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  getGithubData(event) {
    event.preventDefault();
    console.log('GET REPO DATA');
    this.setState({
      reposLoading: true,
      userDataLoading: true,
      didSearch: true,
      error: false
    });
    getRepos(this.state.user)
    .then(repoDataRes => {
      console.log('Repos', repoDataRes);
      this.setState({
        repos: repoDataRes,
        reposLoading: false
      });
    })
    .catch(error => {
      this.setState({ error: error.response });
    });
    getUserData(this.state.user).then(userDataRes => {
      console.log('User Data', userDataRes);
      this.setState({
        userData: userDataRes,
        userDataLoading: false
      });
    })
    .catch(error => {
      this.setState({ error: error.response });
      console.log(error.response)
    });
  }

  render() {
    let content;
    if(this.state.error) {
      content = (
        <div id="content" className="error">
          <h3>{ this.state.error.status }</h3>
          <h4>{ this.state.error.statusText }</h4>
        </div>
      )
    } else if(this.state.didSearch) {
      content = (
        <div id="content" className="row">
          <Organizations userData={this.state.userData} loading={this.state.userDataLoading} />
          <Repositories repoData={this.state.repos} loading={this.state.reposLoading} />
        </div>
      )
    } else {
      content = (
        <div id="content" className="row">
          <h3 className="search-message">Please enter a GitHub user above.</h3>
        </div>
      )
    }
    return (
      <div id="App" className="container-fluid">
        <header>
          <div className="app-title">GitHub Display</div>
          <form className="form-inline" id="user-form">
            <div className="input-group">
              <input className="form-control"
                     id="user"
                     onChange={this.inputChangeHandler}
                     placeholder="Username"
                     type="text"
                     value={this.state.user}/>
            <div className="input-group-append">
                <button className="btn btn-primary"
                        onClick={this.getGithubData}
                        type="submit">
                  <FontAwesomeIcon icon="search" />
                </button>
              </div>
            </div>
          </form>
        </header>
        { content }
      </div>
    );
  }
}

export default App;

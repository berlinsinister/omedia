import React from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import Main from './Main';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      mode: 'list',
      error: null,
      isLoaded: false,
      items: [],
      userPageData: {
        login: '',
        avatar: '',
        type: '',
        url: ''
      },
      repos: [],
      orgs: []
    }

    this.handleViewSwitch = this.handleViewSwitch.bind(this);
    this.handleIdDetection = this.handleIdDetection.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // from Navbar to Main
  handleViewSwitch = id => {
    let mode = (id === 'list-view') ? 'list' : 'grid';
    this.setState(() => ({ id: '', mode: mode }));
  }

  // from Navbar to Main
  handleSearch = value => {
    let foundUser = this.state.items.find(user => user.login.toLowerCase() === value.toLowerCase());
    let id = this.state.items.indexOf(foundUser);
    id++;
    this.setState(state => {
      if (foundUser)
        return {
          id: id,
          mode: state.mode,
          userPageData: {
            login: state.items[id - 1].login,
            avatar: state.items[id - 1].avatar_url,
            type: state.items[id - 1].type,
            url: state.items[id - 1].html_url
          }
        }
    });
  }

  // from Main to Main
  handleIdDetection = id => {
    this.setState(state => {
      return {
        id: id,
        mode: state.mode, // mode: state.mode - writing prev view mode
        userPageData: {
          login: state.items[id - 1].login,
          avatar: state.items[id - 1].avatar_url,
          type: state.items[id - 1].type,
          url: state.items[id - 1].html_url
        }
      }
    });
  }

  // from Main to Main
  handleCloseClick = () => {
    this.setState(state => ({ id: '', mode: state.mode }));
  }

  // fetch
  componentDidMount() {
    fetch('https://api.github.com/search/users?q=repos:followers:<1000&page=1&per_page=12')
      .then(res => res.json())
      .then(
        (result) => {
          const promises = result.items.map(user => {
            return fetch(`https://api.github.com/users/${user.login}/repos?q=page=1&per_page=3`)
              .then(response => {
                return response.json()
              });
          });

          const orgPromises = result.items.map(user => {
            return fetch(`https://api.github.com/users/${user.login}/orgs`) // not per page;
              .then(response => {
                return response.json();
              });
          });

          Promise.all(promises).then(results => {
            let repos = results
            this.setState({ items: result.items, isLoaded: true, repos });
          })

          Promise.all(orgPromises).then(results => {
            let orgs = results
            this.setState({ items: result.items, isLoaded: true, orgs });
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items, id, mode, userPageData, repos, orgs } = this.state;
    if (error) {
      return (
        <div>
          Error: {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="App">
          <Navbar />
          <Menu />
          <div className="loading">
            <i class="fas fa-spinner fa-pulse"></i>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar
            handleViewSwitch={this.handleViewSwitch}
            handleSearch={this.handleSearch}
          />
          <Menu />
          <Main
            data={items}
            handleIdDetection={this.handleIdDetection}
            handleCloseClick={this.handleCloseClick}
            id={id}
            view={mode}
            userPageData={userPageData}
            repos={repos}
            orgs={orgs}
          />
        </div>
      );
    }
  }
}

export default App;
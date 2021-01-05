import React from 'react';
import './Main.css';
import UserListView from './UserListView';
import UserGridView from './UserGridView';
import UserPage from './UserPage';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: '' }

        this.handleIdDetection = this.handleIdDetection.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    // lifting state up - to App (from UserListView / UserGridView)
    handleIdDetection = id => {
        this.props.handleIdDetection(id);
    }

    // lifting state up - to App (from UserPage)
    handleCloseClick = () => {
        this.props.handleCloseClick();
    }

    render() {
        let listViewClassName = '';
        let gridViewClassName = '';
        let userPageClassName = '';
        if (this.props.id) {
            userPageClassName = 'user-page-view';
            listViewClassName = 'hide';
            gridViewClassName = 'hide';
        } else {
            if (this.props.view === 'list') {
                listViewClassName = 'list-view';
                gridViewClassName = 'hide';
                userPageClassName = 'hide';
            } else if (this.props.view === 'grid') {
                listViewClassName = 'hide';
                gridViewClassName = 'grid-view';
                userPageClassName = 'hide';
            }
        }

        let { id, data, userPageData, repos, orgs } = this.props;
        let userListViewArr = [];
        let userGridViewArr = [];
        let listViewNumber = '';
        for (let i = 0; i < 12; i++) {
            listViewNumber = (i < 9) ? '0' + (i + 1) : (i + 1);
            userListViewArr.push(<UserListView
                handleIdDetection={this.handleIdDetection}
                number={listViewNumber}
                id={i + 1}
                login={data[i].login}
                avatar={data[i].avatar_url}
                type={data[i].type}
                repos={repos[i]}
            />
            );
            userGridViewArr.push(<UserGridView
                handleIdDetection={this.handleIdDetection}
                id={i + 1}
                login={data[i].login}
                avatar={data[i].avatar_url}
                type={data[i].type}
                repos={repos[i]}
            />
            );
        }

        return (
            <div className="main">
                <div className={listViewClassName}>
                    {userListViewArr}
                </div>
                <div className={gridViewClassName}>
                    {userGridViewArr}
                </div>
                <div className={userPageClassName}>
                    <UserPage
                        id={id}
                        repos={repos}
                        orgs={orgs}
                        handleCloseClick={this.handleCloseClick}
                        data={userPageData}
                    />
                </div>
            </div>
        );
    }
}

export default Main;
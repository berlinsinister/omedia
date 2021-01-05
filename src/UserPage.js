import React from 'react';
import './UserPage.css';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    // lifting state up - to Main
    handleCloseClick = () => {
        this.props.handleCloseClick();
    }

    render() {
        let { login, avatar, type, url } = this.props.data;
        let { id, repos, orgs } = this.props;
        let userPageRepos = repos[id - 1];
        let userPageOrgs = orgs[id - 1];
        return (
            <div className="user-page">
                <div className="header">
                    <div className="header-name-page">
                        {login}
                    </div>
                    <i className="material-icons logo-header-1">insights</i>
                    <i className="material-icons logo-header-2">insights</i>
                    <span class="material-icons close-icon" id="close" onClick={this.handleCloseClick}>close</span>
                </div>
                <div className="user">
                    <div className="avatar-page">
                        <img src={avatar} alt="user photo" className="photo-page" />
                    </div>
                    <div className="info-page">
                        <div className="name-page">
                            <span className="material-icons person-icon-page">person</span>
                            {login}
                        </div>
                        <div>
                            <a href={url} className="user-link-page" target="_blank">
                                <span className="material-icons link-icon-page">link</span>
                                github profile
                            </a>
                        </div>
                        <div className="user-type-page">
                            <span className="material-icons type-icon-page">star</span>
                            GitHub Account: {type}
                        </div>
                    </div>
                </div>
                <div className="repos-and-organisation">
                    <p className="repos-title">github repos</p>
                    <div className="repos-page">
                        {userPageRepos ?
                            userPageRepos.map((repo, index) =>
                                <div className="single-repo">
                                    <ul>
                                        <li key={index + 1}>{repo.name}</li>
                                        <li key={index + 2}><span className="langs-resp-page">Language:</span><span className="lang">{repo.language ? repo.language : "not indicated"}</span></li>
                                        <li key={index + 3}>
                                            <span className="material-icons arrow-icon-page">chevron_right</span>
                                            <a href={repo.html_url} target="_blank" className="repo-link"><span className="repos-resp-page">repo</span> on github</a>
                                        </li>
                                    </ul>
                                </div>) : ""}
                    </div>
                    <p className="organisation-title">organisations</p>
                    <div className="organisation-page">
                        {userPageOrgs && userPageOrgs.length !== 0 ?
                            userPageOrgs.map((org, index) =>
                                <div className="single-org">
                                    <ul>
                                        <li key={index + 4}>
                                            <img src={org.avatar_url} alt="organisation avatar" className="org-avatar" />
                                        </li>
                                        <li key={index + 5}>
                                            <a href={`https://github.com/${org.login}`} target="_blank" className="org-link">{org.login.toLowerCase()}</a>
                                        </li>
                                    </ul>
                                </div>) : <span className="no-orgs">no organisations listed</span>}
                    </div>
                </div>
                <div className="footer">&copy; Malika Efremova | 2020 - 2021</div>
            </div>
        );
    }
}

export default UserPage;
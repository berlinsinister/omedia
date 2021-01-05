import React from 'react';
import './UserListView.css';

class UserListView extends React.Component {
    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    // lifting state up - to Main
    handleLinkClick = event => {
        this.props.handleIdDetection(event.target.id);
    }

    render() {
        let { login, avatar, type, number, id, repos } = this.props;
        let len = 14;
        return (
            <div className="user-list-view">
                <div className="vertical-line-list">
                    <span className="material-icons horizontal-line-list">horizontal_rule</span>
                    <span className="number-list">{number}</span>
                </div>
                <div className="avatar-list">
                    <img src={avatar} alt="user photo" className="photo-list" />
                </div>
                <div className="user-info-list">
                    <div className="name-list" id={id} onClick={this.handleLinkClick}>
                        <span className="material-icons person-icon-list" id={id} onClick={this.handleLinkClick}>person</span>
                        {login}
                    </div>
                </div>
                <div className="user-type-list">
                    <span className="material-icons type-icon-list">star</span>
                    <span className="type-resp-list">GitHub Account:</span>&nbsp;{type}
                </div>
                <div className="repos-list">
                    <span className="repos-resp-list">Repos:</span>
                    <ul>
                        {repos.map((repo, index) =>
                            <li key={index} title={repo.name.length < len ? "" : "cropped title"}>
                                <span className="material-icons arrow-icon-list">chevron_right</span>
                                {repo.name.length < len ? repo.name : (repo.name.slice(0, len).concat('...'))}
                            </li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserListView;
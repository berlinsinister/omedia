import React from 'react';
import './UserGridView.css';

class UserGridView extends React.Component {
    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    // lifting state up - to Main
    handleLinkClick = event => {
        this.props.handleIdDetection(event.target.id);
    }

    render() {
        let { login, avatar, type, id, repos } = this.props;
        return (
            <div className="user-grid-view">
                <div className="avatar-grid">
                    <img src={avatar} alt="user photo" className="photo-grid" />
                </div>
                <div className="user-info-grid">
                    <div className="name-grid" id={id} onClick={this.handleLinkClick}>
                        <span className="material-icons person-icon-grid" id={id} onClick={this.handleLinkClick}>person</span>
                        {login}
                    </div>
                    <div className="user-type-grid">
                        <span className="material-icons type-icon-grid">star</span>
                        GitHub Account:<br />{type}
                    </div>
                </div>
                <div className="repos-grid">
                    <ul>
                        {repos.map((repo, index) =>
                            <li key={index}>
                                <span className="material-icons arrow-icon-grid">chevron_right</span>
                                {repo.name}
                            </li>)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserGridView;
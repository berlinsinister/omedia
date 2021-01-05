import React from 'react';
import Article from './Article';
import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: 'more',
            more: false
        }
        this.handleMoreLess = this.handleMoreLess.bind(this);
    }

    handleMoreLess = () => {
        this.setState(state => {
            return {
                button: state.button === 'more' ? 'less' : 'more',
                more: !state.more
            }
        });
    }

    render() {
        let articles = [];
        let content = [
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
            `Quis autem vel eum iure reprehenderit qui in ea voluptate velit.`,
            `Ut enim ad minima veniam, quis nostrum exercitationem ullam.`,
            `Sed do eiusmod tempor ut labore et dolore magna aliqua.`,
            `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.`,
            `Et harum quidem rerum facilis est et expedita distinctio.`
        ];
        let { button, more } = this.state;
        let len = more ? 6 : 4;
        for (let i = 0; i < len; i++) {
            articles.push(<Article number={i + 1} content={content[i]} />);
        }
        return (
            <div className="menu">
                {articles}
                <button className="more" onClick={this.handleMoreLess}>
                    {button} ...
                </button>
            </div>
        );
    }
}

export default Menu;
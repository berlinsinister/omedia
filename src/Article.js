import React from 'react';
import './Article.css';

class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { number, content } = this.props;
        return (
            <div className="article">
                <p className="article-title">
                    <span className="material-icons done">done</span>
                    Article # {number}
                </p>
                <div className="article-content">
                    {content}
                </div>
            </div>
        );
    }
}

export default Article;
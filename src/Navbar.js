import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSearchQuery: '',
            searchQueries: [],
            count: 0,
            dropDown: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchFocus = this.handleSearchFocus.bind(this);
        this.handleSearchBlur = this.handleSearchBlur.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
    }

    // lifting state up - to App
    handleClick = event => this.props.handleViewSwitch(event.target.id);

    handleSearchFocus = () => this.setState(() => ({ dropDown: true }));
    handleInput = event => this.setState(() => ({ currentSearchQuery: event.target.value }));

    handleSearch = event => {
        this.setState(state => {
            if (event.key === 'Enter') {
                // lifting state up - to App
                this.props.handleSearch(state.currentSearchQuery);
                if (state.count < 3) {
                    return {
                        searchQueries: state.searchQueries.concat(state.currentSearchQuery).reverse(),
                        currentSearchQuery: '',
                        count: state.count + 1,
                        dropDown: false
                    }
                } else {
                    return {
                        searchQueries: this.rearrange(state.searchQueries, event.target.value),
                        currentSearchQuery: '',
                        count: 3,
                        dropDown: false
                    }
                }
            } else {
                return ({ dropDown: false })
            }
        });
    }

    rearrange = (arr, value) => {
        if (arr[0] === value)
            return arr;
        arr.unshift(value);
        arr = arr.slice(0, 3);
        return arr;
    }

    handleSearchFocus = () => this.setState(() => ({ dropDown: true }));
    handleSearchBlur = () => this.setState(() => ({ dropDown: false }));

    handleSearchClick = () => {
        this.setState(state => {
            this.props.handleSearch(this.state.currentSearchQuery);
            if (state.count < 3) {
                return {
                    searchQueries: state.searchQueries.concat(state.currentSearchQuery).reverse(),
                    currentSearchQuery: '',
                    count: state.count + 1,
                    dropDown: false
                }
            } else {
                return {
                    searchQueries: this.rearrange(state.searchQueries, state.currentSearchQuery),
                    currentSearchQuery: '',
                    count: 3,
                    dropDown: false
                }
            }
        });
    }

    render() {
        let dropDownClassName = this.state.dropDown ? 'dropdown-content' : 'hide';

        return (
            <div className="navbar">
                <div className="logo-container">
                    <i className="material-icons logo">insights</i>
                    top rates
                </div>
                <div className="views-and-search">
                    <div className="views">
                        <i className="material-icons list-icon" id="list-view" title="list view" onClick={this.handleClick}>list</i>
                        <i className="material-icons grid-icon" id="grid-view" title="grid view" onClick={this.handleClick}>view_module</i>
                    </div>
                    <div className="search dropdown">
                        <input type="text" value={this.state.currentSearchQuery} placeholder="search..." className="search-bar" autoComplete="on"
                            onInput={this.handleInput}
                            onKeyPress={this.handleSearch}
                            onFocus={this.handleSearchFocus}
                            onBlur={this.handleSearchBlur}
                        />
                        <div className={dropDownClassName}>
                            <ul>
                                {this.state.searchQueries.map((query, index) => <li key={index}>{query}</li>)}
                            </ul>
                        </div>
                        <i className="material-icons search-icon" title="user search" onClick={this.handleSearchClick}>person_search</i>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
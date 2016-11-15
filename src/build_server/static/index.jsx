/**
 * Individual match in Match list panel
 */
class MatchListPanelItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var self = this;
        return(
            <div className="well">
                {Object.keys(this.props.match).map(function(key){
                    return <span><strong>{key}:</strong>  {JSON.stringify(self.props.match[key])}<br/></span>;
                })}
            </div>
        )
    }
}

/**
 * Dynamic List of Matches
 */
class MatchListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            filterQs: "",
        };

        this.updateMatches = this.updateMatches.bind(this);
        this.onChangedFilter = this.onChangedFilter.bind(this);

        setInterval(this.updateMatches, 1000);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">Match List</div>
                    <div className="input-group">
                        <span className="input-group-addon">&#123;</span>
                        <input onChange={this.onChangedFilter} type="text" className="form-control"
                               placeholder="JSON Filter..."/>
                        <span className="input-group-addon">&#125;</span>
                    </div>
                </div>

                <div className="panel-body">
                    {this.state.matches.map(function (match) {
                        return <MatchListPanelItem match={match}/>;
                    })}
                </div>
            </div>
        );
    }

}

/**
 * Main Application
 */
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Builder</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </span>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("mainContainer")
);

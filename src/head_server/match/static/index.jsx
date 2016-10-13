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
 * Dynamic contents of Match list panel
 */
class MatchListPanelContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: []
        };

        this.updateMatches = this.updateMatches.bind(this);

        setInterval(this.updateMatches, 1000);
    }
    render() {
        return (
            <span>
                {this.state.matches.map(function(match) {
                    return <MatchListPanelItem match={match}/>;
                })}
            </span>
        );
    }

    updateMatches() {
        var self = this;
        $.get("/api/v2/match/", function(matches) {
            self.setState({"matches": matches});

        }).fail(function() {
            self.setState({"matches": []});

        });
    }
}

/**
 * List of Matches panel
 */
class MatchListPanel extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Match List</div>

                <div className="panel-body">
                    <MatchListPanelContents/>
                </div>
            </div>
        );
    }
}

/**
 * Get Match Section
 */
class GetMatchGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "Get match output",
            matchId: 0
        };

        this.handleMatchIdUpdate = this.handleMatchIdUpdate.bind(this);
        this.handleGetMatch = this.handleGetMatch.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <label>Get a match</label>
                    <input onChange={this.handleMatchIdUpdate} type="number" className="form-control"/>
                    <button onClick={this.handleGetMatch} type="button" className="btn btn-default btn-block">Get!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleMatchIdUpdate(e) {
        var val = e.target.value == null ? -1 : e.target.value;
        this.setState({matchId: val});
    }
    handleGetMatch(e) {
        var self = this;
        $.get(`/api/v2/match/${self.state.matchId}/`, function(match){
            var out = Object.keys(match).map(function(key){
                return <span><strong>{key}</strong> {JSON.stringify(match[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(){
            self.setState({output: "Failed to get match!"});
        });
    }
}

/**
 * Create Match Section
 */
class CreateMatchGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            output: "Create match output"
        };

        this.handleCreateMatch = this.handleCreateMatch.bind(this);
        this.handleChangedInput = this.handleChangedInput.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <label>Create a match</label>
                    <input onChange={this.handleChangedInput} type="text" className="form-control"/>
                    <button onClick={this.handleCreateMatch} type="button" className="btn btn-default btn-block">Create!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleChangedInput(e) {
        var val = e.target.value == null ? "{}" : e.target.value;
        this.setState({input: val});
    }

    handleCreateMatch(e) {
        var body = JSON.parse( this.state.input );
        var self = this;
        $.post("api/v2/match/", body, function(newMatch){
            var out = Object.keys(newMatch).map(function(key){
                return <span><strong>{key}</strong> {JSON.stringify(newMatch[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(){
            self.setState({output: "Failed to create match!"});
        });
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
                        <h1>Match Manager</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <CreateMatchGroup/>
                        <GetMatchGroup/>
                    </div>
                    <div className="col-md-6">
                        <MatchListPanel/>
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

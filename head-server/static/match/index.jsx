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
                        <input onChange={this.onChangedFilter} type="text" className="form-control" placeholder="JSON Filter..."/>
                        <span className="input-group-addon">&#125;</span>
                    </div>
                </div>

                <div className="panel-body">
                    {this.state.matches.map(function(match) {
                        return <MatchListPanelItem match={match}/>;
                    })}
                </div>
            </div>
        );
    }

    onChangedFilter(e) {
        try{
            var val = e.target.value == null ? "" : e.target.value;
            var qs = `{${val}}`;
            console.log(qs);
            qs = JSON.parse(qs);
            qs = $.param(qs);
            console.log(qs);
            this.setState({filterQs: qs});
        }
        catch(e) {
            console.warn(e);
        }
    }

    updateMatches() {
        var self = this;

        console.log(this.state.filterQs);
        $.get(`/api/v2/match/?${this.state.filterQs}`, function(matches) {
            self.setState({"matches": matches});

        }).fail(function() {
            self.setState({"matches": []});

        });
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
                <div className="panel-heading">
                    Get a match</div>
                <div className="panel-body">
                    <input onChange={this.handleMatchIdUpdate} type="number" className="form-control" placeholder="Id"/>
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
                return <span><strong>{key}</strong>: {JSON.stringify(match[key])}<br/></span>;
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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangedBody = this.handleChangedBody.bind(this);

        this.TEXT_AREA_STYLE = {resize: "vertical"};
        this.TEXT_AREA_DEFAULT_CONTENT = JSON.stringify({
            clients: [],
            schedule_id: 1,
        }, null, 2);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    Create a match</div>
                <div className="panel-body">
                    <textarea onChange={this.handleChangedBody} rows="5" className="form-control">
                        {this.TEXT_AREA_DEFAULT_CONTENT}
                    </textarea>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-block">Create!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleChangedBody(e) {
        var val = e.target.value == null ? "{}" : e.target.value;
        this.setState({input: val});
    }

    handleSubmit(e) {
        try {
            var body = JSON.parse( this.state.input );
        } catch(err) {
            this.setState({output: err.toString()});
        }

        var self = this;
        $.post("/api/v2/match/", body, function(newMatch){
            var out = Object.keys(newMatch).map(function(key){
                return <span><strong>{key}</strong>: {JSON.stringify(newMatch[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(){
            self.setState({output: "Failed to create match!"});
        });
    }
}

class UpdateMatchGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputBody: "{}",
            inputId: -1,
            output: "Update match output"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangedId= this.handleChangedId.bind(this);
        this.handleChangedBody = this.handleChangedBody.bind(this);

        this.TEXT_AREA_DEFAULT_CONTENT = JSON.stringify({
            clients: [],
            schedule_id: 1,
        }, null, 2);

        this.TEXT_AREA_STYLE = {resize: "vertical"};
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    Update a match</div>
                <div className="panel-body">
                    <input onChange={this.handleChangedId} type="number" className="form-control" placeholder="Id"/>
                    <textarea onChange={this.handleChangedBody} rows="5" className="form-control" style={this.TEXT_AREA_STYLE}>
                        {this.TEXT_AREA_DEFAULT_CONTENT}</textarea>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-block">Update!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleChangedId(e) {
        var val = e.target.value == null ? -1 : e.target.value;
        this.setState({inputId: val});
    }

    handleChangedBody(e) {
        var val = e.target.value == null ? "{}" : e.target.value;
        this.setState({inputBody: val});
    }

    handleSubmit(e) {
        var body = JSON.parse( this.state.inputBody );
        var id = this.state.inputId;
        var self = this;
        $.post(`/api/v2/match/${id}/update/`, body, function(newMatch){
            var out = Object.keys(newMatch).map(function(key){
                return <span><strong>{key}</strong>: {JSON.stringify(newMatch[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(){
            self.setState({output: "Failed to update match!"});
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
                        <GetMatchGroup/>
                        <CreateMatchGroup/>
                        <UpdateMatchGroup/>
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

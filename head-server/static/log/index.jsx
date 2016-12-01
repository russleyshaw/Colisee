
class CreateLogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputBody: "{}",
            output: "Create match output"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangedBody = this.handleChangedBody.bind(this);
    }
    render() {
        var textAreaStyle = {resize: "vertical"};
        var template = JSON.stringify({
            "message": "",
            "severity": "debug",
            "location": ""
        }, null, 2);
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <label>Create a log</label>
                    <textarea onChange={this.handleChangedBody} rows="5" className="form-control" placeholder="Enter JSON here..." style={textAreaStyle}>{template}</textarea>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-block">Create!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleChangedBody(e) {
        var val = e.target.value == null ? "{}" : e.target.value;
        this.setState({inputBody: val});
    }

    handleSubmit(e) {
        try {
            var body = JSON.parse(this.state.inputBody);
        }
        catch(e) {
            this.setState({output: e.toString()});
            return;
        }

        var self = this;
        $.post("/api/v2/log/", body, function(newLog){
            var out = Object.keys(newLog).map(function(key){
                return <span><strong>{key}</strong>: {JSON.stringify(newLog[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(e){
            self.setState({output: "Failed to create log!"});
        });
    }
}

var LIST_GROUP_ITEM_CONTEXT_MAP = {
    "warn": "list-group-item-warning",
    "error": "list-group-item-danger",
    "critical": "list-group-item-danger",
    "info": "list-group-item-info",
    "debug": ""
};

class LogListPanelItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var self = this;

        var className = `list-group-item ${LIST_GROUP_ITEM_CONTEXT_MAP[this.props.log.severity]}`;

        var badge = this.props.log.location == null ? "" : <span className="badge">{this.props.log.location}</span>;
        return(
            <li className={className}>
                {badge} {this.props.log.message}
            </li>
        )
    }
}

class LogListPanelListGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: []
        };
        this.updateLogs = this.updateLogs.bind(this);
        setInterval(this.updateLogs, 1000);
    }
    render() {
        return (
            <ul className="list-group">
                {this.state.logs.map(function(log) {
                    return <LogListPanelItem log={log}/>;
                })}
            </ul>
        );
    }

    updateLogs() {
        var limit = parseInt(this.props.limit);
        var severity = this.props.severity;

        var self = this;
        $.get(`/api/v2/log/?limit=${limit}&severity=${severity}`, function(logs) {
            self.setState({logs: logs});

        }).fail(function() {
            self.setState({logs: []});

        });
    }
}

class LogListPanel extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Log List - {this.props.name}</div>

                <LogListPanelListGroup limit={this.props.limit} severity={this.props.severity} />
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Log Manager</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <LogListPanel limit="10" severity="debug" name="All"/>
                    </div>
                    <div className="col-md-6">
                        <LogListPanel limit="10" severity="warn" name="Warning"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <CreateLogComponent/>
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

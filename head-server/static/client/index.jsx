/**
 * Individual client in Client list panel
 */
class ClientListPanelItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var self = this;
        return(
            <div className="well">
                {Object.keys(this.props.client).map(function(key){
                    return <span><strong>{key}</strong>:  {JSON.stringify(self.props.client[key])}<br/></span>;
                })}
            </div>
        )
    }
}

class ClientListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            filterQs: "",
        };

        this.onChangedFilter = this.onChangedFilter.bind(this);
        this.updateClients = this.updateClients.bind(this);

        setInterval(this.updateClients, 1000);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">Client List</div>
                    <div className="input-group">
                        <span className="input-group-addon">&#123;</span>
                        <input onChange={this.onChangedFilter} type="text" className="form-control" placeholder="JSON Filter..."/>
                        <span className="input-group-addon">&#125;</span>
                    </div>
                </div>

                <div className="panel-body">
                    {this.state.clients.map(function(client) {
                        return <ClientListPanelItem client={client}/>;
                    })}
                </div>
            </div>
        );
    }

    onChangedFilter(e) {
        try {
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

    updateClients() {
        var self = this;

        console.log(this.state.filterQs);
        $.get(`/api/v2/client/?${this.state.filterQs}`, function(clients) {
            self.setState({"clients": clients});

        }).fail(function() {
            self.setState({"clients": []});

        });
    }

}

class GetClientGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "Get client output",
            clientId: 0
        };
        this.handleChangedId = this.handleChangedId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel panel-heading">Get a client</div>
                <div className="panel-body">
                    <input onChange={this.handleChangedId} type="number" className="form-control" placeholder="Id"/>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-block">Get!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleChangedId(e) {
        var val = e.target.value == null ? -1 : e.target.value;
        this.setState({clientId: val});
    }
    handleSubmit(e) {
        var self = this;
        $.get(`/api/v2/client/${self.state.clientId}/`, function(client){
            var out = Object.keys(client).map(function(key){
                return <span><strong>{key}</strong> {JSON.stringify(client[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(){
            self.setState({output: "Failed to get client!"});
        });
    }
}

class CreateClientGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputBody: "{}",
            output: "Create client output"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangedBody = this.handleChangedBody.bind(this);


        this.TEXT_AREA_DEFAULT_CONTENT = JSON.stringify({
            name: "",
            repo: "",
            hash: "",
            language: "",
        }, null, 2);
        this.TEXT_AREA_STYLE = {resize: "vertical"};

    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel panel-heading">Create a client</div>
                <div className="panel-body">
                    <textarea onChange={this.handleChangedBody} rows="6" className="form-control" style={this.TEXT_AREA_STYLE}>
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
            return
        }

        var self = this;
        $.post("/api/v2/client/", body, function(newClient){
            var out = Object.keys(newClient).map(function(key){
                return <span><strong>{key}</strong> {JSON.stringify(newClient[key])}<br/></span>;
            });
            self.setState({output: out});

        }).fail(function(){
            self.setState({output: "Failed to create client!"});

        });
    }
}

class UpdateClientGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputId: -1,
            inputBody: "{}",
            output: "Update client output"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangedId = this.handleChangedId.bind(this);
        this.handleChangedBody = this.handleChangedBody.bind(this);

        this.TEXT_AREA_DEFAULT_CONTENT = JSON.stringify({
            repo: "",
            hash: "",
            language: ""
        }, null, 2);

        this.TEXT_AREA_STYLE = {resize: "vertical"};
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">Update a client</div>
                <div className="panel-body">
                    <input onChange={this.handleChangedId} type="number" className="form-control" placeholder="Id"/>
                    <textarea onChange={this.handleChangedBody} rows="6" className="form-control" style={this.TEXT_AREA_STYLE}>
                        {this.TEXT_AREA_DEFAULT_CONTENT}
                    </textarea>
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
        $.post(`/api/v2/client/${id}/update/`, body, function(newClient){
            var out = Object.keys(newClient).map(function(key){
                return <span><strong>{key}</strong>: {JSON.stringify(newClient[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(){
            self.setState({output: "Failed to create client!"});
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
                    <div className="col-md-12"><h1>Client Manager</h1></div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <GetClientGroup/>
                        <CreateClientGroup/>
                        <UpdateClientGroup/>
                    </div>
                    <div className="col-md-6">
                        <ClientListPanel/>
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
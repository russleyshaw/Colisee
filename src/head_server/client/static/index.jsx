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

/**
 * Dynamic contents of Client list panel
 */
class ClientListPanelContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        };

        this.updateClients = this.updateClients.bind(this);

        setInterval(this.updateClients, 1000);
    }
    render() {
        return (
            <span>
                {this.state.clients.map(function(client) {
                    return <ClientListPanelItem client={client}/>;
                })}
            </span>
        );
    }

    updateClients() {
        var self = this;
        $.get("/api/v2/client/", function(clients) {
            self.setState({"clients": clients});

        }).fail(function() {
            self.setState({"clients": []});

        });
    }
}

/**
 * List of Clients panel
 */
class ClientListPanel extends React.Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Client List</div>

                <div className="panel-body">
                    <ClientListPanelContents/>
                </div>
            </div>
        );
    }
}

/**
 * Get Client Section
 */
class GetClientGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "Get client output",
            clientId: 0
        };

        this.handleClientIdUpdate = this.handleClientIdUpdate.bind(this);
        this.handleGetClient = this.handleGetClient.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <label>Get a client</label>
                    <input onChange={this.handleClientIdUpdate} type="number" className="form-control" placeholder="Id"/>
                    <button onClick={this.handleGetClient} type="button" className="btn btn-default btn-block">Get!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleClientIdUpdate(e) {
        var val = e.target.value == null ? -1 : e.target.value;
        this.setState({clientId: val});
    }
    handleGetClient(e) {
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

/**
 * Create Client Section
 */
class CreateClientGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            output: "Create client output"
        };

        this.handleCreateClient = this.handleCreateClient.bind(this);
        this.handleChangedInput = this.handleChangedInput.bind(this);
    }
    render() {
        var textAreaStyle = {resize: "vertical"};
        var template = JSON.stringify({
            name: "",
        }, null, 2);
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <label>Create a client</label>
                    <textarea onChange={this.handleChangedInput} rows="5" className="form-control" style={textAreaStyle}>{template}</textarea>
                    <button onClick={this.handleCreateClient} type="button" className="btn btn-default btn-block">Create!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleChangedInput(e) {
        var val = e.target.value == null ? "{}" : e.target.value;
        this.setState({input: val});
    }

    handleCreateClient(e) {
        var body = JSON.parse( this.state.input );
        var self = this;
        $.post("api/v2/client/", body, function(newClient){
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

        this.handleCreateClient = this.handleCreateClient.bind(this);
        this.handleChangedIdInput = this.handleChangedIdInput.bind(this);
        this.handleChangedBodyInput = this.handleChangedBodyInput.bind(this);
    }
    render() {
        var textAreaStyle = {resize: "vertical"};
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <label>Update a client</label>
                    <input onChange={this.handleChangedIdInput} type="number" className="form-control" placeholder="Id"/>
                    <textarea onChange={this.handleChangedBodyInput} rows="5" className="form-control" placeholder="Enter JSON here..." style={textAreaStyle}/>
                    <button onClick={this.handleCreateClient} type="button" className="btn btn-default btn-block">Update!</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleChangedIdInput(e) {
        var val = e.target.value == null ? -1 : e.target.value;
        this.setState({inputId: val});
    }

    handleChangedBodyInput(e) {
        var val = e.target.value == null ? "{}" : e.target.value;
        this.setState({inputBody: val});
    }

    handleCreateClient(e) {
        var body = JSON.parse( this.state.inputBody );
        var id = this.state.inputId;
        var self = this;
        $.post(`api/v2/client/${id}/update/`, body, function(newClient){
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
                    <div className="col-md-12">
                        <h1>Client Manager</h1>
                    </div>
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
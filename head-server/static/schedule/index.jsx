class StartSchedule extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "Start running the scheduler",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-block">Start</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        var self = this;
        $.post(`/api/v2/schedule/start/`, function(){
            self.setState({output: "Successfully started the scheduler"});
        }).fail(function(){
            self.setState({output: "Failed to start the scheduler"});
        });
    }
}

class StopSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "Stop running the scheduler",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-block">Stop</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        var self = this;
        $.post(`/api/v2/schedule/stop/`, function(){
            self.setState({output: "Successfully stopped the scheduler"});
        }).fail(function(){
            self.setState({output: "Failed to stop the scheduler"});
        });
    }
}

class PauseSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "Pause the currently running scheduler",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-block">Pause</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        var self = this;
        /* Temporary Placeholder - Figure out how to change if statement to actually do stuff */
        if(true)
            self.setState({output: "Successfully paused the scheduler"});
        else
            self.setState({output: "Failed to pause the scheduler"});
    }
}

class ResumeSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "Resume running a currently paused scheduler",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-body">
                    <button onClick={this.handleSubmit} type="button" className="btn btn-default btn-block">Resume</button>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        );
    }

    handleSubmit(e) {
        var self = this;
        /* Temporary Placeholder - Figure out how to change if statement to actually do stuff */
        if(true)
            self.setState({output: "Successfully resumed running the scheduler"});
        else
            self.setState({output: "Failed to resume running the scheduler"});
    }
}

class ScheduleType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "The current schedule type is: ",
        };
        this.onChangedFilter = this.onChangedFilter.bind(this);
    }
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="dropdown">
                        <select defaultValue={this.state.value} onChange={this.onChangedFilter}>
                            <option value = "Random">Random</option>
                            <option value = "Single_elimination">Single_elimination</option>
                            <option value = "Triple_elimination">Triple_elimination</option>
                            <option value = "Swiss">Swiss</option>
                            <option value = "Test">Test</option>
                        </select>
                    </div>
                    <div className="well">{this.state.output}</div>
                </div>
            </div>
        )
    }
    onChangedFilter(e) {
        try {
            var val = e.target.value == null ? "" : e.target.value;
            var qs = `${val}`;
            console.log(qs);
            this.setState({output: "The current schedule type is: " + qs});
        }
        catch(e) {
            console.warn(e);
        }
    }
}

/**
 * Individual schedule in Schedule list panel
 */
class ScheduleListPanelItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var self = this;
        return(
            <div className="well">
                {Object.keys(this.props.schedule).map(function(key){
                    return <span><strong>{key}</strong>:  {JSON.stringify(self.props.schedule[key])}<br/></span>;
                })}
            </div>
        )
    }
}

class ScheduleListPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules: [],
            filterQs: "",
        };

        this.onChangedFilter = this.onChangedFilter.bind(this);
        this.updateSchedules = this.updateSchedules.bind(this);

        setInterval(this.updateSchedules, 1000);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="panel-title">Schedule List</div>
                    <div className="input-group">
                        <span className="input-group-addon">&#123;</span>
                        <input onChange={this.onChangedFilter} type="text" className="form-control" placeholder="JSON Filter..."/>
                        <span className="input-group-addon">&#125;</span>
                    </div>
                </div>

                <div className="panel-body">
                    {this.state.schedules.map(function(schedule) {
                        return <ScheduleListPanelItem schedule={schedule}/>;
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

    updateSchedules() {
        var self = this;

        console.log(this.state.filterQs);
        if(this.state.filterQs===null || this.state.filterQs===undefined)
            this.state.filterQs = "";
        $.get(`/api/v2/schedule/?${this.state.filterQs}`, function(schedules) {
            self.setState({"schedules": schedules});

        }).fail(function() {
            self.setState({"schedules": []});

        });
    }

}

class GetScheduleGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            output: "Get schedule output",
            clientId: 0
        };
        this.handleChangedId = this.handleChangedId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel panel-heading">Get a schedule</div>
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
        this.setState({scheduleId: val});
    }
    handleSubmit(e) {
        var self = this;
        $.get(`/api/v2/schedule/${self.state.scheduleId}/`, function(schedule){
            var out = Object.keys(schedule).map(function(key){
                return <span><strong>{key}</strong> {JSON.stringify(schedule[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(){
            self.setState({output: "Failed to get schedule!"});
        });
    }
}

class CreateScheduleGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputBody: "{}",
            output: "Create schedule output"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangedBody = this.handleChangedBody.bind(this);


        this.TEXT_AREA_DEFAULT_CONTENT = JSON.stringify({
            type: "",
            status: "",
        }, null, 2);
        this.TEXT_AREA_STYLE = {resize: "vertical"};

    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel panel-heading">Create a schedule</div>
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
        $.post("/api/v2/schedule/", body, function(newSchedule){
            var out = Object.keys(newSchedule).map(function(key){
                return <span><strong>{key}</strong> {JSON.stringify(newSchedule[key])}<br/></span>;
            });
            self.setState({output: out});

        }).fail(function(){
            self.setState({output: "Failed to create a schedule!"});

        });
    }
}

class UpdateScheduleGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputId: -1,
            inputBody: "{}",
            output: "Update schedule output"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangedId = this.handleChangedId.bind(this);
        this.handleChangedBody = this.handleChangedBody.bind(this);

        this.TEXT_AREA_DEFAULT_CONTENT = JSON.stringify({
            type: "",
            status: ""
        }, null, 2);

        this.TEXT_AREA_STYLE = {resize: "vertical"};
    }
    render() {
        return(
            <div className="panel panel-default">
                <div className="panel-heading">Update a schedule</div>
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
        $.post(`/api/v2/schedule/${id}/update/`, body, function(newSchedule){
            var out = Object.keys(newSchedule).map(function(key){
                return <span><strong>{key}</strong>: {JSON.stringify(newSchedule[key])}<br/></span>;
            });
            self.setState({output: out});
        }).fail(function(){
            self.setState({output: "Failed to create schedule!"});
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
                    <div className="col-md-12"><h1>Schedule Manager</h1></div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <StartSchedule/>
                        <StopSchedule/>
                    </div>
                    <div className="col-md-4">
                        <PauseSchedule/>
                        <ResumeSchedule/>
                    </div>
                    <div className="col-md-4">
                        <ScheduleType/>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        <GetScheduleGroup/>
                        <CreateScheduleGroup/>
                        <UpdateScheduleGroup/>
                    </div>
                    <div className="col-md-6">
                        <ScheduleListPanel/>
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
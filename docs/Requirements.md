# Colisee Requirements

### Web Server Interaction
- Must be able to provide the web server with game information
- Must be able to provide the web server with client information
- Must be able to request client information from the web server

### Visualizer
- Must be able to provide the visualizer with a previously unvisualized game

### Play Server
- Must request head server for a scheduled game to play
- Must execute built code in a secure environment (docker)
- Must send request to head server with completed game info & gamelog

### Build Server
- Must accept a git repository(s) and git hash(es) and generate a build
- Must accept a git repository and provide the latest build'
- Must build code in a secure environment (docker)

### Bracket Visualizer
- Must incrementally visualize progression of tournament bracket
- Must provide links to visualization of game logs given in tournament data
- Must provide stub to select games based on an "interestingness" factor of game logs

### Scheduling Component
- Must be able to schedule (or enqueue) games to be ran by play servers
- Must expose ability to manually schedule (inject) a game(s) into the queue
- Must be able to start/pause/resume/stop scheduling
- Must be able to switch between schedulers

##### Competition Scheduler
- Must continuously schedule games
- Must randomly pair two clients to schedule

##### Tournament Scheduler
- Must schedule games needed for final & quickdraw tournaments
- Must seed tournament initial brackets with clients at the same skill level
- Must run matches, where a match is 7 individual games. Winner of match wins 4/7 games.
- Must run triple elimination tournament and be able to note first, second and third places.

##### Validating Scheduler
- Must schedule every client (at least) once to see if they break

### Log Component
- Must expose functions to log errors, status, etc, from within the head_server
- Must expose a RESTful API (/log/) for other services (build server, play servers) to interact with it
  - `GET /api/v2/log/` - Get recent logs
  - `GET /api/v2/log/level/:level` - Get recent log by severity level
  - `POST /api/v2/log/` - Create a new log
- Must allow each log entry to contain an id, severity/level, timestamp, location, message
- Must allow logging of trace, info, warning, error and critical error messages
- Must provide a web page that contains a searchable, sortable, and filterable listing of logs

### Gamelog Server
- Must accept a request for a new gamelog to be entered
  - `POST /api/v2/gamelog/new`
- Must accept a request to get an existing gamelog from URL
  - `GET /api/v2/gamelog/:id`

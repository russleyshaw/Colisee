define({ "api": [
  {
    "name": "Build",
    "group": "Builder",
    "type": "post",
    "url": "/api/v2/build/:id",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/build_server/main.js",
    "groupTitle": "Builder"
  },
  {
    "name": "Get_Build",
    "group": "Builder",
    "type": "get",
    "url": "/api/v2/build/:id",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Database client id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/build_server/main.js",
    "groupTitle": "Builder"
  },
  {
    "name": "Get_Build_Log",
    "group": "Builder",
    "type": "get",
    "url": "/api/v2/build/:id/log",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>Database client id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/build_server/main.js",
    "groupTitle": "Builder"
  },
  {
    "name": "Get_gamelog",
    "group": "Gamelog",
    "description": "<p>Gets a gamelog from the server</p>",
    "type": "get",
    "url": "/api/v2/glog/:glog",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "integer",
            "optional": false,
            "field": "glog",
            "description": "<p>Gamelog id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/gamelog_server/main.js",
    "groupTitle": "Gamelog"
  },
  {
    "name": "Post_gamelog",
    "group": "Gamelog",
    "description": "<p>Store a gamelog stored in the request body</p>",
    "type": "post",
    "url": "/api/v2/glog/",
    "title": "",
    "version": "0.0.0",
    "filename": "src/gamelog_server/main.js",
    "groupTitle": "Gamelog"
  }
] });

define({ "api": [
  {
    "type": "post",
    "url": "/register",
    "title": "User registration",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Registration email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message</p>"
          }
        ]
      }
    },
    "group": "authentication",
    "filename": "../graphql/auth.go",
    "groupTitle": "authentication",
    "name": "PostRegister",
    "sampleRequest": [
      {
        "url": "https://api.joshuaschmidt.tech/register"
      }
    ]
  },
  {
    "type": "put",
    "url": "/loginEmailPassword",
    "title": "User login",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token for authenticated requests</p>"
          }
        ]
      }
    },
    "group": "authentication",
    "filename": "../graphql/auth.go",
    "groupTitle": "authentication",
    "name": "PutLoginemailpassword",
    "sampleRequest": [
      {
        "url": "https://api.joshuaschmidt.tech/loginEmailPassword"
      }
    ]
  },
  {
    "type": "put",
    "url": "/logoutEmailPassword",
    "title": "User logout",
    "version": "0.0.1",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message</p>"
          }
        ]
      }
    },
    "group": "authentication",
    "filename": "../graphql/auth.go",
    "groupTitle": "authentication",
    "name": "PutLogoutemailpassword",
    "sampleRequest": [
      {
        "url": "https://api.joshuaschmidt.tech/logoutEmailPassword"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>&quot;Bearer <code>token</code>&quot; - login auth token</p>"
          }
        ]
      }
    }
  },
  {
    "type": "put",
    "url": "/resetPassword",
    "title": "Reset password",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Password reset token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Response message</p>"
          }
        ]
      }
    },
    "group": "authentication",
    "filename": "../graphql/auth.go",
    "groupTitle": "authentication",
    "name": "PutResetpassword",
    "sampleRequest": [
      {
        "url": "https://api.joshuaschmidt.tech/resetPassword"
      }
    ]
  },
  {
    "type": "put",
    "url": "/sendResetEmail",
    "title": "Send reset email",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message for email sent</p>"
          }
        ]
      }
    },
    "group": "emails",
    "filename": "../graphql/email.go",
    "groupTitle": "emails",
    "name": "PutSendresetemail",
    "sampleRequest": [
      {
        "url": "https://api.joshuaschmidt.tech/sendResetEmail"
      }
    ]
  },
  {
    "type": "put",
    "url": "/sendTestEmail",
    "title": "Send test email",
    "version": "0.0.1",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Success message for email sent</p>"
          }
        ]
      }
    },
    "group": "emails",
    "filename": "../graphql/email.go",
    "groupTitle": "emails",
    "name": "PutSendtestemail",
    "sampleRequest": [
      {
        "url": "https://api.joshuaschmidt.tech/sendTestEmail"
      }
    ]
  },
  {
    "type": "get",
    "url": "/countPosts",
    "title": "Count posts for search term",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchterm",
            "description": "<p>Search term to count results</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "allowedValues": [
              "\"blog\"",
              "\"project\""
            ],
            "optional": false,
            "field": "type",
            "description": "<p>Post type</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>Result count</p>"
          }
        ]
      }
    },
    "group": "misc",
    "filename": "../graphql/count.go",
    "groupTitle": "misc",
    "name": "GetCountposts",
    "sampleRequest": [
      {
        "url": "https://api.joshuaschmidt.tech/countPosts"
      }
    ]
  },
  {
    "type": "get",
    "url": "/hello",
    "title": "Test rest request",
    "version": "0.0.1",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Hello message</p>"
          }
        ]
      }
    },
    "group": "misc",
    "filename": "../graphql/main.go",
    "groupTitle": "misc",
    "name": "GetHello",
    "sampleRequest": [
      {
        "url": "https://api.joshuaschmidt.tech/hello"
      }
    ]
  }
] });

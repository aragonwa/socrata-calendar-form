const creds = {
"socrata": {
    "username" : process.env.SOCRATA_USER_NAME,
    "password" : process.env.SOCRATA_USER_PASSWORD,
    "apiToken" : process.env.SOCRATA_API_TOKEN,
    "dataset":  process.env.SOCRATA_DS
  },
  "session": {
    "secret" : process.env.SESSION_SECRET
  },
  "login": {
    "user" : process.env.LOGIN_USER,
    "pass" : process.env.LOGIN_PASSWORD
  }
}

module.exports = creds;
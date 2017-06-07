const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const forbidden = message => (req, res) => {
  res.status(403).send(message)
}

// Feel free to add more filters here (suggested: something that keeps out non-admins)

const mustBeAdmin = (req, res, next) => {
  if (req.user.type !== 'Admin') {
    return res.status(403).send('You must be an admin to do that')
  }
  next()
}

const mustBeHost = (req, res, next) => {
  if (req.user.type !== 'Host' && req.user.type !== 'Admin') {
    return res.status(403).send('You must be a host or admin to do that')
  }
  next()
}

module.exports = {mustBeLoggedIn, selfOnly, forbidden, mustBeAdmin, mustBeHost}

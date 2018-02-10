module.exports = (req, res) => (req.isAuthenticated() ? next() : res.sendStatus(401))

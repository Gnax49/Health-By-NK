const users = require('./controllers/User.js');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send({message: 'Hello world'})
    })

    app.post('/users', users.create)
    app.get('/users/:id', users.findById)
}
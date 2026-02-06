const newsRouter = require('./news')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.status(200).json({
            message: "API is running"
        })
    })

    app.use('/api/v1/news', newsRouter);
}



const path = require('path');
const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const {connectDB} = require('./config/db');
const port = process.env.PORT

const countryRoutes = require('./routes/countryRoutes')
const roiRoutes = require('./routes/roiRoutes')
const poiRoutes = require('./routes/poiRoutes')
const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')
const commentRoutes = require('./routes/commentRoutes')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api', countryRoutes)
app.use('/api', roiRoutes)
app.use('/api', poiRoutes)
app.use('/api', postRoutes)
app.use('/api', userRoutes)
app.use('/api', commentRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => 
    res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
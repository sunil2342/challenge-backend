const express = require("express")

const app = express()

const port = process.env.PORT || 3000

const suggestionRoute = require("./routes/suggestionRoute.js")

app.use(express.urlencoded({ extended: true}))

app.use("/suggestion", suggestionRoute)

// Starts the server to listen for requests
app.listen(port, (req, res) => {
    console.log(`Server started at port ${port}..`)
})
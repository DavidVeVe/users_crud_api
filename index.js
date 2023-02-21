const express = require('express')
const App = express()

const port = 3000

App.listen(port, () => {
    console.log(`Server up and running on port ${port}...`);
})
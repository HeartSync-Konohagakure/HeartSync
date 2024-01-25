const { app, server, PORT } = require('../app');

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
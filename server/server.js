// moved server to a separate file to make testing easier
// the previous server file was renamed to app.js

const app = require('./app');


// updated so port is assigned if variable is undefined
// + coerces strings into numbers
const PORT = +process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Listening to PORT: ${PORT}`)
});
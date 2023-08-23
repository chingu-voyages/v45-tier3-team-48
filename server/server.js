	
const port = 8000;
const express = require('express');
const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

// CORS FOR FRONT END 
// const cors = require("cors");
// app.use(cors({ //cors is going to allow different ports to send requests to our API
//     origin:"http://localhost:3000" 
// }));

// ROUTES AND CONFIG AFTER MAKING FILES
// require("./config/mongoose.config");
// const xRoutes = require("./routes/xxxx");
// xRoutes(app);

app.listen(port, () => console.log(`🎉Party on port: ${port}`) );   
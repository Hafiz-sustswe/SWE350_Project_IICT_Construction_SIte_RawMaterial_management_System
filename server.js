require('dotenv').config();
const connection = require('./connection');
// const http = require('http');
const app = require('./index');
const query = require('./query');
// const server = http.createServer(app);
// server.listen(process.env.PORT);
const port = process.env.PORT



async function main() {

    try {
        connection.connect((err) =>{
            if(!err)
            {
                console.log('Database connected');
                    // query();
            }
            else
            {
                console.log(err);
            }
        });
        app.listen(port, () => {
            console.log(`app listening on port ${port} | http://localhost:${port}`);
          })
    } catch (error) {
      console.log("Failed to connect", error);
    }
  }
  
  main();
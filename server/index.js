const express = require("express")
const app = express()
const cors = require("cors");
const mongoose = require("mongoose")
const db = require('./models');
const Role = db.role;
const dbConfig = require('./config/db.config')

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(cors())
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token Origin, Content-Type, Accept"
  )
  next()
});
mongoose.connect(`mongodb+srv://hamodyadl52:mhmdadl52@cluster0.bj4sx.mongodb.net/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connect to MongoDB");
  initial()
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
       }).save(err => {
        if (err) {
          console.log("error", err);
        }   
       console.log("added 'admin' to roles collection");
      });
    }
  });
}




app.use('/api/product', require("./routes/product"))
app.use('/api/user', require("./routes/user"))
// if(process.env.NODE_ENV === 'production'){
// app.use(express.static(__dirname +  '/public/'))
// app.get(/.*/ , (req, res) => res.sendFile(__dirname + '/public/index.html') )

// }

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
//   socket.on('msg' , (msg)=>{
//     console.log('msg : ' , msg)
//   })
//   socket.emit('msg2' , 'hello from server')
// });

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

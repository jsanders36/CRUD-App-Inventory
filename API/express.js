//IMPORTS
const express = require("express");
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);
const cors = require("cors");
const port = 8080;
const app = express();

//EXPRESS MIDDLEWARE
app.use(express.json());
app.use(cors());

//TEST

app.get('/', (req, res) => {
    res.send('Application is up and running.')
})

//EXPRESS ENDPOINTS
app.get("/inventory", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  knex
    .select('*')
    .from('inventory_table')
    .then(data => res.status(200).send(data))
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    });
});

app.get("/users", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  knex
    .select('*')
    .from('user_table')
    .then(data => res.status(200).send(data))
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    });
});

//USER SIGNUP
app.post('/signup', (req,res) => {
  let user = req.body
  if(user.first_name && user.last_name && user.password && user.username){
    knex
      .insert(user)
      .into("user_table")
      .then(data => res.status(202).json({
        message:
          `POST Success with user: ${user.username}`
      }))
      .catch(err =>{
        console.log(err)
        res.status(404).json({
          message:
            'Problem with adding your new user account. Make sure you fill in all fields. If you did, change your username to something different. It\'s probably already taken.'
        })
      });
  }
})

//USER LOGIN
app.post("/signin", (req,res) => {
  let user = req.body
  knex
    .select('*')
    .from('user_table')
    .where("username", user.username)
    .then(userDb => {
      let userCompare = userDb[0]
      if(user.password === userCompare.password){
        res.setHeader("Content-Type", "application/json");
        res.status(202).send(JSON.stringify(userCompare))
      }
      else{
        res.status(406).json({
          message:
            'Authentication failed. If you have an account, try again. If not, create one using the sign up link: http://localhost:8080/signup'
        })
      }
    })
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
        'Authentication failed. If you have an account, try again. If not, create one using the sign up link: http://localhost:8080/signup'
      })
    });
})

//INVENTORY POST
app.post("/inventory", (req,res) => {
  let item = req.body
  knex.insert(item)
    .into("inventory_table")
    .then(data => res.status(202).json({
      message:
        `POST Success with item: ${item.item_name}`
    }))
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'Problem with adding new inventory. Better try something different my friend.'
      })
    });
})

//INVENTORY DELETE
app.delete("/inventory", (req,res) => {
  let item = req.body
  knex("inventory_table")
    .where("id", item.id)
    .del()
    .then(data => res.status(202).json({
      message:
        `DELETE Success with item: ${item.item_name}`
    }))
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'Problem with deleting this inventory item. If you thought that was it, it wasn\'t.'
      })
    });
})

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const username = req.params.username;
  knex("user_table")
    .where("id", id)
    .del()
    .then(() => res.json(`The asset with the id ${id} has been deleted.`))
    .catch(err =>{
      console.log(err)
      res.status(404).json({
        message:
          'Problem with deleting this user. Are you sure this user exists?'
      })
    });
})

//INVENTORY PUT
app.put("/inventory", (req,res) => {
  let item = req.body
  knex("inventory_table")
    .where("id", item.id)
    .update(item)
    .then(data => res.status(202).json({
      message: `PATCH Success with item id: ${item.item_name}`
    }))
    .catch(err => {
      console.log(err)
      res.status(404).json({
        message:
          'Problem with POST. idk what it is but you better figure it out'
      })
    })
})



app.listen(port, () => {
  console.log("Listening on port: ", port);
});
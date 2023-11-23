const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User = require("./model/UserSchema");
const dbURI =
  "mongodb+srv://kunalkuswah7480:8LZNiXcEmyYYtwSc@cluster0.l96cob0.mongodb.net/Redux-toolkit?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Successfully Connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
//**MIDDLEWARE */
app.options('*', cors())
app.use(bodyParser.json());
app.use(cors());



//**Api's */
app.get("/api", (req, res) => {
  res.status(200).send({ response: "api worked properly." });
});

app.get("/api/items", async (req, res) => {
  try {
    await User.find()
      .then((response) => {
        res.status(200).send({ response: response });
      })
      .catch((err) => {
        res.status(500).send({ response: err.message });
      });
  } catch (error) {
    res.status(500).send({ response: error.message });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const newItem = new User({
      name: req.body.name,
      position: req.body.position,
    });
    await newItem
      .save()
      .then((response) => {
        res.status(200).send({ response: response });
      })
      .catch((err) => {
        res.status(500).send({ response: err.message });
      });
  } catch (err) {
    res.status(500).send({ response: err.message });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const updateItem = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({ response: updateItem });
  } catch (err) {
    res.status(500).send({ response: err.message });
  }
});

// app.delete("/api/items/:id", async (req, res) => {
//   try {
//     await User.findByIdAndRemove(req.params.id).then((response) => {
//       res.status(200).send({ response: req.params.id });
//     });
//   } catch (err) {
//     res.status(500).send({ response: err.message });
//   }
// });
app.delete('/api/items/:id', async (req, res) => {
  try {
      const response = await User.findByIdAndDelete(req.params.id);
      res.status(200).send({ response: req.params.id });
  } catch (err) {
      res.status(500).send({ response: err.message });
  }
});

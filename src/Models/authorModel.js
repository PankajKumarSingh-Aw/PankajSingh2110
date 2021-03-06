const  mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({

       firstName: { type: String, required: true },
       lastName: { type: String, required: true },
       title: {
              type: String,
              required: true,
              enum: ["Mr", "Mrs", "Miss"]
       },
       email: {
              type: String,
              trim: true,
              lowercase: true,
              unique: true,
              validate: {
                     validator: function (v) {
                            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                     },
                     message: "Please enter a valid email"
              },
              required: [true, "Email required"]
       },


       password: { type: String, required: true } 

 }, { timestamps: true })

module.exports = mongoose.model("blogAuthor", authorSchema) //blogauthors



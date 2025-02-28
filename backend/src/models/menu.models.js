import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },

  price: { type: Number, required: true },
  category: {
    type: String,
    
    enum: ["starter", "mainCourse", "desert", "dinner", "lunch"],

    required: true,
  }, // e.g., 'Starter', 'Main Course'
  description:{
    type:String,
  },
  isVeg: { type: Boolean, required: true },
  image: { type: String ,required:true}, // Image URL
});


export const Menu = mongoose.model("Menu", MenuSchema);

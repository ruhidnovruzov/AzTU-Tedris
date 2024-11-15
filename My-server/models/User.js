const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin", "superadmin"] },
});

module.exports = mongoose.model("User", userSchema);

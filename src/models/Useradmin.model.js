import mongoose from "mongoose";

const userAdminSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
    mobile_No: {
      type: Number,
      unique: true,
      require: [true, "Mobile Number is required"],
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
}

);

const UserAdmin = mongoose.model("UserAdmin", userAdminSchema);

export default UserAdmin;

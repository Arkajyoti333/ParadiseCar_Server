import mongoose from "mongoose";

const userAdminSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default:false,
    },
    mobileNumber: {
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
    lastLogin: {
			type: Date,
			default: Date.now,
		},
    isVerified: {
			type: Boolean,
			default: false,
		},
    verificationToken:{
      type:String,
    },
		verificationTokenExpiresAt: Date,
    resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
  },
  {
    timestamps: true,
}

);

const UserAdmin = mongoose.model("UserAdmin", userAdminSchema);

export default UserAdmin;

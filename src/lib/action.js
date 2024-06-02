// lib/action.js
'use server';
import User from '@/models/user';
import connectMongoDB from "./mongodb";
import { Game } from "@/models/game";
import bcrypt from "bcryptjs";

export const createInitialgame = async (prevState, formData) => {
  const { name } = Object.fromEntries(formData);

  try {
    connectMongoDB();
    const newGame = new Game({
      name
    });

    await newGame.save().then(
      res => {console.log(res);}
    );
    console.log("saved to db");

  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const register = async (previousState, formData) => {
  const { name, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectMongoDB();

    const user = await User.findOne({ name });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

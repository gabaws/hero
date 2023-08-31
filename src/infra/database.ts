import mongoose from "mongoose";
import { keyMongo } from "../api/keyMongo";

export async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://gabrielterres199:${keyMongo}@heros-tickets.m2hggvf.mongodb.net/hero-tickets`
    );
    console.log("Connect database sucess.");
  } catch (error) {
    console.log(" ~ file:database.ts:5 ~ connect ~ error:", error);
  }
}

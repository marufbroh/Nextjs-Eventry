"use server";

import { revalidatePath } from "next/cache";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
  updateGoing,
} = require("@/db/queries");
const { redirect } = require("next/navigation");

const registerUser = async (formData) => {
  // console.log(formData);
  const user = Object.fromEntries(formData); // array of array/obj ke obj banay

  const created = await createUser(user);
  redirect("/login");
};

const performLogin = async (formData) => {
  try {
    const credentials = {};
    credentials.email = formData.get("email");
    credentials.password = formData.get("password");

    const user = await findUserByCredentials(credentials);
    return user;
  } catch (error) {
    throw error;
  }
};

const addInterestedEvent = async (eventId, authId) => {
  try {
    await updateInterest(eventId, authId);
  } catch (error) {
    throw error;
  }
  revalidatePath("/");
};

const addGoingEvent = async (eventId, user) => {
  try {
    await updateGoing(eventId, user?.id);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
  redirect("/")
};

export { registerUser, performLogin, addInterestedEvent, addGoingEvent };

"use server";

const { createUser, findUserByCredentials } = require("@/db/queries");
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

export { registerUser, performLogin };

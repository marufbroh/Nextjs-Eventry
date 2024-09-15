"use server";

const { createUser } = require("@/db/queries");
const { redirect } = require("next/navigation");

const registerUser = async (formData) => {
    // console.log(formData);
  const user = Object.fromEntries(formData); // array of array/obj ke obj banay

  const created = await createUser(user);
  redirect("/login");
};

export { registerUser };

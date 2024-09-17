"use server";

import EmailTemplate from "@/components/payments/EmailTemplate";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const {
  createUser,
  findUserByCredentials,
  updateInterest,
  updateGoing,
  getEventById,
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
    await sendEmail(eventId, user);
  } catch (error) {
    throw error;
  }

  revalidatePath("/");
  redirect("/");
};

const sendEmail = async (eventId, user) => {
  try {
    const event = await getEventById(eventId);
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;

    const sent = await resend.emails.send({
      from: "noreply@resend.com",
      to: user?.email,
      subject: "Successfully Registered for the event!",
      react: EmailTemplate({ message }),
    });
  } catch (error) {
    throw error;
  }
};

export { registerUser, performLogin, addInterestedEvent, addGoingEvent, sendEmail };

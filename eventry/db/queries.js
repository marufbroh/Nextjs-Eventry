import { eventModel } from "@/models/event-models";
import { userModel } from "@/models/user-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

const getAllEvents = async () => {
  const allEvents = await eventModel.find().lean();
  return replaceMongoIdInArray(allEvents);
};

const getEventById = async (eventId) => {
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
};

const createUser = async (user) => {
  return await userModel.create(user);
};

const findUserByCredentials = async (credentials) => {
  const user = await userModel.findOne(credentials).lean();

  if (user) {
    return replaceMongoIdInObject(user);
  }

  return null;
};

const updateInterest = async (eventId, authId) => {
  const event = await eventModel.findById(eventId);

  if (event) {
    const foundUsers = event.interested_ids.find(
      (id) => id.toString() === authId
    );

    if (foundUsers) {
      event.interested_ids.pull(new mongoose.ObjectId(authId));
    } else {
      event.interested_ids.push(new mongoose.ObjectId(authId));
    }

    event.save();
  }
};

export { getAllEvents, getEventById, createUser, findUserByCredentials, updateInterest };

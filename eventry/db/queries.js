import { eventModel } from "@/models/event-models";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";

const getAllEvents = async () => {
  const allEvents = await eventModel.find().lean();
  return replaceMongoIdInArray(allEvents);
};

const getEventById = async (eventId) => {
  const event = await eventModel.findById(eventId).lean();
  return replaceMongoIdInObject(event);
};

export { getAllEvents, getEventById };

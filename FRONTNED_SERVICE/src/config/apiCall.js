import api from "./api";

// API calls for authentication
export const loginUser = (data) => api.post("/user/signin", data);
export const signupUser = (data) => api.post("/user/", data);
export const getUser = () => api.get(`/user/me/`);

// API calls for events
export const createEvent = (data) => api.post("/event", data);
export const fetchEvents = (eventData) => api.get("/event", eventData);
export const deleteEvent = (eventId) => api.delete(`/event/${eventId}`);
export const fetchInvitationList = () => api.get(`event/invitationlist`);
export const updateEvent = (eventId, data) =>
  api.patch(`/event/${eventId}`, data);
export const updateInvitationStatus = (data) => api.post(`/event/invite`, data);

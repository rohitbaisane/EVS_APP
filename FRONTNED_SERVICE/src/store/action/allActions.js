import { AUTH, EVENTS, INVITATIONS } from "../constants";
import * as api from "../../config/apiCall";

// Action creator to show an error toast
export const showErrorToast = (error = "Something went wrong") => ({
  type: AUTH.ALERT,
  payload: { type: "error", message: error },
});

// Action creator to show a success toast
export const showSuccessToast = (message) => ({
  type: AUTH.ALERT,
  payload: { type: "success", message },
});

// Authentication actions
export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: AUTH.LOADING });
  try {
    const response = await api.loginUser(data);
    localStorage.setItem("access_token", response.data);
    dispatch({
      type: AUTH.LOGIN_SUCCESS,
      payload: { token: response.data },
    });
    dispatch(showSuccessToast("Login successful"));
  } catch (error) {
    dispatch(showErrorToast(error));
    dispatch({ type: AUTH.LOGIN_FAILURE, payload: error });
  }
};

export const signupUser = (data) => async (dispatch) => {
  dispatch({ type: AUTH.LOADING });
  try {
    const response = await api.signupUser(data);
    dispatch({
      type: AUTH.SIGNUP_SUCCESS,
      payload: { token: response.data },
    });
    dispatch(showSuccessToast("Signup successful"));
  } catch (error) {
    dispatch(showErrorToast(error));
    dispatch({ type: AUTH.SIGNUP_FAILURE, payload: error });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: AUTH.LOADING });
  try {
    const response = await api.getUser();
    dispatch({ type: AUTH.USER_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: AUTH.USER_DETAILS_FAILURE, payload: error });
  }
};

// Event actions
// Action creator to fetch user's created events
export const fetchUserEvents = () => async (dispatch) => {
  dispatch({ type: EVENTS.LOADING });
  try {
    const response = await api.fetchEvents();
    dispatch({
      type: EVENTS.FETCH_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(showErrorToast(error));
    dispatch({
      type: EVENTS.FETCH_FAILURE,
      payload: error.message,
    });
  }
};

// Action creator to create a new event
export const createEvent = (eventData) => async (dispatch) => {
  dispatch({ type: EVENTS.LOADING });
  try {
    const response = await api.createEvent(eventData);
    console.log(
      "🚀 ~ file: allActions.js:83 ~ createEvent ~ response:",
      response
    );

    dispatch({
      type: EVENTS.CREATE_SUCCESS,
      payload: response.data,
    });
    dispatch(showSuccessToast("Event created successfully"));
    dispatch(fetchUserEvents());
  } catch (error) {
    dispatch(showErrorToast(error.message));
    dispatch({
      type: EVENTS.CREATE_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  dispatch({ type: EVENTS.LOADING });
  try {
    await api.deleteEvent(eventId);
    dispatch({
      type: EVENTS.DELETE_SUCCESS,
      payload: eventId,
    });
    dispatch(showSuccessToast("Event deleted successfully"));
  } catch (error) {
    dispatch(showErrorToast(error.message));
    dispatch({
      type: EVENTS.DELETE_FAILURE,
      payload: error.message,
    });
  }
};

export const updateEvent = (eventId, updatedEvent) => {
  return (dispatch) => {
    dispatch({ type: EVENTS.LOADING });
    api
      .updateEvent(eventId, updatedEvent)
      .then((response) => {
        dispatch({
          type: EVENTS.UPDATE_SUCCESS,
          payload: response.data,
        });
        dispatch(showSuccessToast("Event Updated successfully"));
        dispatch(fetchUserEvents());
      })
      .catch((error) => {
        dispatch(showErrorToast(error.message));
        dispatch({
          type: EVENTS.UPDATE_FAILURE,
          payload: error.message,
        });
      });
  };
};

// Action creator to fetch invitation list
export const fetchInvitationList = () => {
  return (dispatch) => {
    dispatch({ type: INVITATIONS.FETCH_INVITATION_LIST });
    api
      .fetchInvitationList()
      .then((response) => {
        console.log(
          "🚀 ~ file: allActions.js:144 ~ .then ~ response:",
          response
        );

        dispatch({
          type: INVITATIONS.FETCH_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: INVITATIONS.FETCH_FAILURE,
          payload: error,
        });
      });
  };
};

// Action creator to accept invitation
export const acceptInvitation = ({ code, status }) => {
  console.log({ code, status });
  return (dispatch) => {
    api
      .updateInvitationStatus({ code, status })
      .then((response) => {
        dispatch({
          type: INVITATIONS.ACCEPT_INVITATION,
          payload: { code, status },
        });
        dispatch(showSuccessToast("Invitation accepted"));
        dispatch(fetchInvitationList());
      })
      .catch((error) => {
        dispatch(showErrorToast(error));
      });
  };
};

// Action creator to decline invitation
export const declineInvitation = ({ code, status }) => {
  return (dispatch) => {
    api
      .updateInvitationStatus({ code, status })
      .then((response) => {
        dispatch({
          type: INVITATIONS.DECLINE_INVITATION,
          payload: { code, status },
        });
        dispatch(showSuccessToast("Invitation declined"));
        dispatch(fetchInvitationList());
      })
      .catch((error) => {
        dispatch(showErrorToast(error));
      });
  };
};

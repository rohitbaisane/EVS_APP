import { combineReducers } from "redux";
import { AUTH, EVENTS, INVITATIONS } from "../constants";

const initialAuthState = {
  loading: false,
  error: "",
  user: null,
  token: localStorage.getItem("access_token") || null,
  alert: { type: "", message: "" },
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case AUTH.ALERT:
      return {
        ...state,
        alert: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    case AUTH.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
        alert: { type: "", message: "" },
      };
    case AUTH.LOGIN_SUCCESS:
      localStorage.setItem("access_token", action.payload.token);
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        error: "",
      };
    case AUTH.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
      };
    case AUTH.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
      };
    case AUTH.USER_DETAILS_FAILURE:
    case AUTH.LOGIN_FAILURE:
    case AUTH.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialEventsState = {
  loading: false,
  error: "",
  event: [],
  invitationList: [],
};

const eventsReducer = (state = initialEventsState, action) => {
  switch (action.type) {
    case EVENTS.LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case EVENTS.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        event: [...state.event, action.payload],
        error: "",
      };
    case EVENTS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload,
        error: "",
      };
    case EVENTS.CREATE_FAILURE:
    case EVENTS.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        event: [],
        error: action.payload,
      };
    case EVENTS.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        event: state.event.filter((event) => event._id !== action.payload),
        error: "",
      };
    case EVENTS.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EVENTS.UPDATE_SUCCESS:
      const updatedEvents = state.event.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        }
        return event;
      });

      return {
        ...state,
        event: updatedEvents,
        loading: false,
        error: null,
      };

    case EVENTS.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  invitationList: [],
  loading: false,
  error: null,
};

const invitationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVITATIONS.FETCH_INVITATION_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case INVITATIONS.FETCH_SUCCESS:
      return {
        ...state,
        invitationList: action.payload,
        loading: false,
        error: null,
      };
    case INVITATIONS.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case INVITATIONS.ACCEPT_INVITATION:
    case INVITATIONS.DECLINE_INVITATION:
      const updatedInvitationList = state.invitationList.map((invitation) => {
        if (invitation.code === action.payload.code) {
          return {
            ...invitation,
            status: action.payload.status,
          };
        }
        return invitation;
      });
      return {
        ...state,
        invitationList: updatedInvitationList,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  auth: authReducer,
  events: eventsReducer,
  invitations: invitationsReducer,
});

export default rootReducer;

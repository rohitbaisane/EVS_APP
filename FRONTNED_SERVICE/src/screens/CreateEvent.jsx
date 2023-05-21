import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventFormModal from "../components/EventFormModal";
import EventDetailModel from "../components/EventDetailModel";
import ConfirmationDialogue from "../components/ConfirmationDialogue";
import { deleteEvent } from "../store/action/allActions";

const CreateEvent = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOpenEventDetailModel, setIsOpenEventDetailModel] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const dispatch = useDispatch();

  const { event } = useSelector(({ events }) => ({
    event: events.event,
  }));

  const openFormModal = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  const closeFormModal = () => {
    setIsOpen(false);
  };

  const openEventDetailModel = (event) => {
    setSelectedEvent(event);
    setIsOpenEventDetailModel(true);
  };

  const closeEventDetailModel = () => {
    setSelectedEvent(null);
    setIsOpenEventDetailModel(false);
  };

  const openDeleteConfirmation = (event) => {
    setEventToDelete(event);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setEventToDelete(null);
    setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteEvent = () => {
    if (eventToDelete) {
      console.log(eventToDelete._id);
      dispatch(deleteEvent(eventToDelete._id));
      closeDeleteConfirmation();
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          flex: 0,
          width: "100%",
          display: "flex",
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          p: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<EditCalendarIcon />}
          onClick={() => openFormModal(null)}
          sx={{ borderRadius: "0", m: "auto" }}
        >
          Create Event
        </Button>
        {isOpen && (
          <EventFormModal
            isOpen={isOpen}
            closeFormModal={closeFormModal}
            event={selectedEvent}
          />
        )}
      </Paper>
      <Box sx={{ flex: 1, overflowY: "auto", mt: 2 }}>
        {event.length === 0 ? (
          <Typography variant="body1" align="center">
            No events created yet.
          </Typography>
        ) : (
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              borderRadius: "4px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {event.map((obj, ind) => (
              <React.Fragment key={obj.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => openEventDetailModel(obj)}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{obj.name}</Typography>
                    <Typography variant="body1">{obj.description}</Typography>
                    <Typography variant="body2">
                      {new Date(obj.startTime).toLocaleString()}
                    </Typography>
                  </Box>
                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    sx={{ ml: 2, borderRadius: "0" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteConfirmation(obj);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{ ml: 2, borderRadius: "0" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      openFormModal(obj);
                    }}
                  >
                    Update
                  </Button>
                </ListItem>
                {ind < event.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
      {isOpenEventDetailModel && (
        <EventDetailModel
          open={isOpenEventDetailModel}
          onClose={closeEventDetailModel}
          event={selectedEvent}
        />
      )}
      <ConfirmationDialogue
        open={isDeleteConfirmationOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDeleteEvent}
      />
    </Box>
  );
};

export default CreateEvent;

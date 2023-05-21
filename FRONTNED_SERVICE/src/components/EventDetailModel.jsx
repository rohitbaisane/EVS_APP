import {
  AccessTime,
  CheckCircleOutline,
  Close,
  DateRange,
  Event,
  Group,
  LocationOn,
  WatchLater,
  Cancel,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const EventDetailModel = ({ open, onClose, event }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const guestPendingList = [];
  const guestAcceptedList = [];
  const guestDeclinedList = [];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!event) {
    return null;
  }

  // Group guests into different lists based on their status
  event.invitedUsers.forEach((guest) => {
    switch (guest.status) {
      case "PENDING":
        guestPendingList.push(guest);
        break;
      case "ACCEPTED":
        guestAcceptedList.push(guest);
        break;
      case "REJECTED":
        guestDeclinedList.push(guest);
        break;
      default:
        break;
    }
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: isMobile ? 2 : 4,
          width: isMobile ? "80%" : "50%",
          maxWidth: 600,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <Typography variant="h4" mb={2}>
          {event.name}
        </Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <List sx={{ mt: 2 }}>
          <ListItem disablePadding>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="Event Name" secondary={event.name} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <DateRange />
            </ListItemIcon>
            <ListItemText
              primary="Event Date"
              secondary={formatDate(event.startTime)}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText
              primary="Event Time"
              secondary={formatTime(event.startTime)}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText
              primary="Guests"
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    Accepted Guests:
                  </Typography>
                  {guestAcceptedList.map((guest) => (
                    <Box key={guest.id} display="flex" alignItems="center">
                      <CheckCircleOutline sx={{ color: "success.main" }} />
                      <ListItemText
                        primary={guest?.user?.email}
                        secondary="Accepted"
                      />
                    </Box>
                  ))}
                  {guestAcceptedList.length === 0 && (
                    <Typography variant="body2" color="textSecondary">
                      No accepted guests.
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary" mt={2}>
                    Pending Guests:
                  </Typography>
                  {guestPendingList.map((guest) => (
                    <Box key={guest.id} display="flex" alignItems="center">
                      <WatchLater sx={{ color: "warning.main" }} />
                      <ListItemText
                        primary={guest?.user?.email}
                        secondary="Pending"
                      />
                    </Box>
                  ))}
                  {guestPendingList.length === 0 && (
                    <Typography variant="body2" color="textSecondary">
                      No pending guests.
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary" mt={2}>
                    Declined Guests:
                  </Typography>
                  {guestDeclinedList.map((guest) => (
                    <Box key={guest.id} display="flex" alignItems="center">
                      <Cancel sx={{ color: "error.main" }} />
                      <ListItemText
                        primary={guest?.user?.email}
                        secondary="Declined"
                      />
                    </Box>
                  ))}
                  {guestDeclinedList.length === 0 && (
                    <Typography variant="body2" color="textSecondary">
                      No declined guests.
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText primary="Venue" secondary={event.venue} />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
};

export default EventDetailModel;

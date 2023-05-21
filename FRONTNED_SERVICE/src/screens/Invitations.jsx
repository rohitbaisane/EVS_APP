import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar,
  Paper,
} from "@mui/material";
import EventDetailModel from "../components/EventDetailModel";
import {
  fetchInvitationList,
  acceptInvitation,
  declineInvitation,
} from "../store/action/allActions";

const Invitations = () => {
  const dispatch = useDispatch();
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { invitationList } = useSelector((state) => state.invitations);
  console.log("invitationlist", invitationList);
  useEffect(() => {
    dispatch(fetchInvitationList());
  }, [dispatch]);

  const handleAccept = (invitation) => {
    dispatch(acceptInvitation({ code: invitation.code, status: "ACCEPTED" }));
  };

  const handleDecline = (invitation) => {
    dispatch(declineInvitation({ code: invitation.code, status: "REJECTED" }));
  };

  const handleCardClick = (invitation, event) => {
    if (
      !event.target.closest("button") &&
      !event.target.closest("a") &&
      !event.target.closest("input") &&
      !event.target.closest("textarea")
    ) {
      setSelectedInvitation(invitation);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
          flex: 1,
          width: "100%",
          overflow: "auto",
          gap: 4,
          p: 2,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Event Invitations
        </Typography>
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {invitationList.length === 0 ? (
            <Typography variant="body1" align="center">
              No event invitations available.
            </Typography>
          ) : (
            <List>
              {invitationList.map((invitation, index) => (
                <React.Fragment key={invitation?.id}>
                  <ListItem
                    sx={{
                      mb: 2,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                    onClick={(event) => handleCardClick(invitation, event)}
                  >
                    <ListItemAvatar>
                      <Avatar>{invitation?.createdBy.email?.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={invitation?.name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {invitation?.description}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textSecondary"
                            sx={{ ml: 1 }}
                          >
                            Sent by: {invitation?.createdBy.email}
                          </Typography>
                        </>
                      }
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mr: 1 }}
                      >
                        {formatDate(invitation.startTime)}
                      </Typography>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAccept(invitation);
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDecline(invitation);
                        }}
                      >
                        Decline
                      </Button>
                    </Box>
                  </ListItem>
                  {index < invitationList.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
        <EventDetailModel
          open={openModal}
          onClose={handleCloseModal}
          event={selectedInvitation}
        />
      </Paper>
    </Box>
  );
};

export default Invitations;

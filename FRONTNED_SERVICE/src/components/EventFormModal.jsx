import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { AccountCircle } from "@mui/icons-material";
import { createEvent, updateEvent } from "../store/action/allActions";
import axios from "axios";

const EventFormModal = ({ isOpen, closeFormModal, event }) => {
  const dispatch = useDispatch();
  const initialValues = {
    name: event ? event.name : "",
    startTime: event && event.startTime ? event.startTime.slice(0, 16) : "",
    invitedUsers: event ? event.invitedUsers : [],
    venue: event ? event.venue : "",
    description: event ? event.description : "",
    maximumAllowedUsers: event ? event.maximumAllowedUsers : 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    startTime: Yup.string().required("Required"),
    invitedUsers: Yup.array(),
    maximumAllowedUsers: Yup.number().min(0, "Must be a positive number"),
    venue: Yup.string().required("Required"),
    description: Yup.string().required("Description is required"),
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/user", {
        headers: {
          "x-access-token": localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      });

      setUsers(response.data.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    const invitedUsers = values.invitedUsers.map((user) => ({
      user: user._id,
      status: "PENDING",
    }));

    try {
      if (event) {
        await dispatch(updateEvent(event._id, { ...values, invitedUsers }));
      } else {
        await dispatch(createEvent({ ...values, invitedUsers }));
      }

      resetForm();
      closeFormModal();
      fetchUsers();
    } catch (error) {
      console.log("Error creating/updating event:", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const formTitle = event ? "Update Event" : "Add Event";
  const buttonLabel = event ? "Update" : "Add";

  return (
    <Dialog
      open={isOpen}
      onClose={closeFormModal}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Event Name"
            type="text"
            fullWidth
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="dense"
            id="startTime"
            name="startTime"
            label="Event Date & Time"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            {...formik.getFieldProps("startTime")}
            error={formik.touched.startTime && Boolean(formik.errors.startTime)}
            helperText={formik.touched.startTime && formik.errors.startTime}
          />
          <Autocomplete
            multiple
            value={formik.values.invitedUsers}
            options={users || []}
            getOptionLabel={(user) => user.email}
            onChange={(event, value) =>
              formik.setFieldValue("invitedUsers", value)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                id="invitedUsers"
                name="invitedUsers"
                label="Select Guests"
                type="text"
                fullWidth
                value={formik.values.invitedUsers.map((user) => user.email)}
                error={
                  formik.touched.invitedUsers &&
                  Boolean(formik.errors.invitedUsers)
                }
                helperText={
                  formik.touched.invitedUsers && formik.errors.invitedUsers
                }
              />
            )}
            renderOption={(props, option) => (
              <li {...props}>
                <AccountCircle />
                {option.email}
              </li>
            )}
          />

          <TextField
            margin="dense"
            id="maximumAllowedUsers"
            name="maximumAllowedUsers"
            label="Max Allowed Guests"
            type="number"
            fullWidth
            {...formik.getFieldProps("maximumAllowedUsers")}
            error={
              formik.touched.maximumAllowedUsers &&
              Boolean(formik.errors.maximumAllowedUsers)
            }
            helperText={
              formik.touched.maximumAllowedUsers &&
              formik.errors.maximumAllowedUsers
            }
          />
          <TextField
            margin="dense"
            id="venue"
            name="venue"
            label="Event Venue"
            type="text"
            fullWidth
            {...formik.getFieldProps("venue")}
            error={formik.touched.venue && Boolean(formik.errors.venue)}
            helperText={formik.touched.venue && formik.errors.venue}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Event Description"
            type="text"
            fullWidth
            {...formik.getFieldProps("description")}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFormModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {buttonLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EventFormModal;

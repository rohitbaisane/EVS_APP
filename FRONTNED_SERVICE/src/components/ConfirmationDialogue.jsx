import { Box, Button, Dialog, DialogActions, Typography } from "@mui/material";

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">
          Are you sure you want to delete this event?
        </Typography>
      </Box>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

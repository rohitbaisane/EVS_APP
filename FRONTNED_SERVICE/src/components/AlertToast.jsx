import { Alert, Snackbar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "../store/constants";

const AlertToast = () => {
  const { alert } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert && alert.type) {
      setTimeout(() => {
        dispatch({ type: AUTH.ALERT, payload: { type: "" } });
      }, 1500);
    }
  }, [alert, dispatch]);

  if (alert && alert.type !== "" && alert.message !== "") {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alert.type !== ""}
      >
        <Alert severity={alert.type} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    );
  }
  return <></>;
};

export default AlertToast;

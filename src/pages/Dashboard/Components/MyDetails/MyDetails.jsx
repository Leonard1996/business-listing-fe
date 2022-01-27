import { Typography, CircularProgress, TextField, Box, Button } from "@mui/material";
import styles from "../../../Authenticate/Authenticate.module.scss";
import { useEffect, useState, useRef } from "react";
import { inputSx } from "../../../Authenticate/Authenticate";
import { fetchMe, changeMe } from "../../dashboard.service";
import { schema } from "../../../../Validation/UpdateProfile";
import Notification from "../../../../common/components/Notification/Notification";

export default function MyDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const firstTimeRef = useRef(0);
  const secondTimeRef = useRef(0);

  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notification, setNotification] = useState({
    message: "Profile updated successfully",
    severity: "success",
    handleClose: () => setNotification({ ...notification, open: false }),
    open: false,
  });

  const [error, setError] = useState({
    inputOrder: null,
    helperText: null,
  });

  const fetchProfile = async () => {
    const [me, error] = await fetchMe();
    if (error) {
      setIsLoading(false);
      return;
    }

    const {
      data: {
        data: { email, name, phoneNumber, surname },
      },
    } = me;

    setInputs((prevInputs) => ({
      ...prevInputs,
      email,
      name,
      phoneNumber,
      surname,
    }));

    setIsLoading(false);
  };

  useEffect(() => {
    // caches.keys().then((names) => {
    //   names.forEach((name) => {
    //     caches.delete(name);
    //   });

    // });
    fetchProfile();
    //fetchProfile();
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { name, surname, phoneNumber, newPassword, confirmPassword, email } = inputs;
    const formInput = {
      name,
      surname,
      phoneNumber,
      newPassword,
      confirmPassword,
    };

    const options = {
      strict: true,
      abortEarly: true,
      stripUnknown: false,
      recursive: true,
    };

    schema
      .validate(formInput, options)
      .then(async () => {
        setIsLoading(true);
        const [result, error] = await changeMe({ ...formInput, email });
        setIsLoading(false);
        if (error) {
          setNotification({
            ...notification,
            message: "Could not update profile",
            severity: "error",
            open: true,
          });

          return;
        }

        setNotification({
          ...notification,
          open: true,
        });
      })
      .catch((error) => {
        const [inputOrder, helperText] = error.errors[0].split(",");
        setError({
          inputOrder,
          helperText,
        });
      });
  };

  const handleInputChange = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {isLoading ? (
        <div style={{ height: `100%`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress color="warning" />
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <Box p={3} paddingBottom={0}>
            <TextField
              error={error.inputOrder === "1" ? true : false}
              helperText={error.inputOrder === "1" ? error.helperText : null}
              type="text"
              label="Name"
              variant="outlined"
              fullWidth
              sx={inputSx}
              value={inputs.name}
              onChange={handleInputChange}
              name="name"
            />
          </Box>
          <Box p={3} paddingBottom={0}>
            <TextField
              error={error.inputOrder === "2" ? true : false}
              helperText={error.inputOrder === "2" ? error.helperText : null}
              type="text"
              label="Last name"
              variant="outlined"
              fullWidth
              sx={inputSx}
              value={inputs.surname}
              onChange={handleInputChange}
              name="surname"
            />
          </Box>
          <Box p={3} paddingBottom={0}>
            <TextField
              type="text"
              label="Email"
              variant="outlined"
              fullWidth
              sx={inputSx}
              value={inputs.email}
              disabled
            />
          </Box>
          <Box p={3} paddingBottom={0}>
            <TextField
              type="text"
              label="Phone number"
              variant="outlined"
              fullWidth
              sx={inputSx}
              onChange={handleInputChange}
              name="phoneNumber"
              value={inputs.phoneNumber}
            />
          </Box>
          <Box p={3} paddingBottom={0}>
            <TextField
              error={error.inputOrder === "3" ? true : false}
              helperText={error.inputOrder === "3" ? error.helperText : null}
              type="password"
              label="New password"
              variant="outlined"
              fullWidth
              sx={inputSx}
              onChange={handleInputChange}
              name="newPassword"
              inputProps={{
                autoComplete: "newPassword",
                form: {
                  autoComplete: "off",
                },
              }}
            />
          </Box>
          <Box p={3} paddingBottom={0}>
            <TextField
              error={error.inputOrder === "4" ? true : false}
              helperText={error.inputOrder === "4" ? error.helperText : null}
              type="password"
              label="Confirm new password"
              variant="outlined"
              fullWidth
              sx={inputSx}
              onChange={handleInputChange}
              name="confirmPassword"
              inputProps={{
                autoComplete: "confirmPassword",
                form: {
                  autoComplete: "off",
                },
              }}
            />
          </Box>
          <Box p={3} sx={{ textAlign: "center" }}>
            <Button type="submit" variant="contained" className={styles["card__button"]}>
              <Typography variant="caption">Update profile</Typography>
            </Button>
          </Box>
        </form>
      )}
      {notification.open && <Notification {...notification} />}
    </>
  );
}

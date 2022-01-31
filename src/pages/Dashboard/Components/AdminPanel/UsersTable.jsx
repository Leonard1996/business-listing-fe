import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Grid, Modal } from "@mui/material";

import { Typography, CircularProgress, TextField, Box } from "@mui/material";
import styles from "../../../Authenticate/Authenticate.module.scss";
import { useEffect, useState } from "react";
import { fetchUserById, changeUser } from "../../dashboard.service";
import { schema } from "../../../../Validation/UpdateProfile";
import Notification from "../../../../common/components/Notification/Notification";
import { inputSx } from "../../../Authenticate/Authenticate";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "surname", label: "Surname", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "isVerified", label: "Status", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "phoneNumber", label: "phoneNumer", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

export default function UsersTable({ rows, toggleStatus, changeRole, loading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const paint = (column, value, user) => {
    switch (column.id) {
      case "isVerified":
        return (
          <Button
            disabled={loading}
            variant="outlined"
            color={value ? "error" : "success"}
            onClick={() => toggleStatus(user)}
          >
            {value ? "Deactivate" : "Activate"}
          </Button>
        );
      // case "actions":
      //   return (
      //     <Grid container>
      //       <Grid item xs={6}>
      //         <Button disabled={loading} variant="outlined" color="error" onClick={() => console.log("delete user")}>
      //           <p style={{ fontSize: "0.6rem" }}>Delete User</p>
      //         </Button>
      //       </Grid>
      //       <Grid item xs={6}>
      //         <Button disabled={loading} variant="outlined" color="warning" onClick={() => console.log("delete buss")}>
      //           <p style={{ fontSize: "0.6rem" }}>Delete businesses</p>
      //         </Button>
      //       </Grid>
      //     </Grid>
      //   );
      case "role":
        return (
          <select
            disabled={loading}
            style={{ padding: "8.6px 15px", borderRadius: "4px" }}
            onChange={(e) => changeRole(user, e.target.value)}
            value={value}
          >
            {["admin", "member", "qualified", "hc", "company"].map((role, _index) => (
              <option value={role} key={_index}>
                {role}
              </option>
            ))}
          </select>
        );
      case "actions":
        return (
          <Button variant="outlined" color="info" onClick={() => setSelectedUser(user.id)}>
            Edit
          </Button>
        );
      default:
        return value;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setSelectedUser(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedUser) {
      console.log(selectedUser);
      setIsOpen(true);
    }
  }, [selectedUser]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", margin: "1rem" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align="center" style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {paint(column, value, row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {isOpen && <UserDetails isOpen={isOpen} userId={selectedUser} handleClose={handleClose} />}
    </>
  );
}

// ######################################### User details ##################################################

function UserDetails({ handleClose, isOpen, userId }) {
  const [isLoading, setIsLoading] = useState(true);

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
    const [me, error] = await fetchUserById(userId);
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
        const [result, error] = await changeUser({ ...formInput, email }, userId);
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          {isLoading ? (
            <div style={{ height: `600px`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress color="warning" />
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} autoComplete="off" style={{ height: "600px" }}>
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
        </Box>
      </Modal>
      {notification.open && <Notification {...notification} />}
    </>
  );
}

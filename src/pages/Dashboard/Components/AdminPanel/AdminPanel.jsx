import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axiosApiInstance from "../../../../common/config/axios.instance";
import UsersTable from "./UsersTable";
import { Grid } from "@mui/material";
import Notification from "../../../../common/components/Notification/Notification";

export default function AdminPanel() {
  const checkIfAdmin = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user.role === "admin";
    } catch {
      return false;
    }
  };
  return <>{checkIfAdmin() ? <UsersTableContainer /> : <Redirect to="/" />}</>;
}

const UsersTableContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    try {
      const users = await axiosApiInstance.get(process.env.REACT_APP_API + "/users");
      setUsers(users.data.data.results);
    } catch (error) {
      alert("Could not fetch users");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (user) => {
    let { id, isVerified } = user;
    isVerified = isVerified == 1 ? true : false;
    try {
      setLoading(true);
      await axiosApiInstance.patch(process.env.REACT_APP_API + "/users/" + id, { isVerified: !isVerified });
      fetchUsers();
      setNotification((prevState) => ({
        ...prevState,
        open: true,
      }));
    } catch (error) {}
    setLoading(false);
  };

  const changeRole = async (user, role) => {
    try {
      setLoading(true);
      await axiosApiInstance.patch(process.env.REACT_APP_API + "/users/" + user.id, { ...user, role });
      setNotification((prevState) => ({
        ...prevState,
        open: true,
      }));
      fetchUsers();
    } catch (error) {}
    setLoading(false);
  };

  const [notification, setNotification] = useState({
    message: "User updated successfully",
    severity: "success",
    handleClose: () => setNotification({ ...notification, open: false }),
    open: false,
  });

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <UsersTable rows={users} toggleStatus={toggleStatus} changeRole={changeRole} loading={loading} />
        </Grid>
      </Grid>
      {notification.open && <Notification {...notification} />}
    </>
  );
};

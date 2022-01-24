import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Grid } from "@mui/material";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "surname", label: "Surname", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "isVerified", label: "Status", minWidth: 100 },
  { id: "role", label: "Role", minWidth: 100 },
  { id: "phoneNumber", label: "phoneNumer", minWidth: 100 },
];

export default function UsersTable({ rows, toggleStatus, changeRole, loading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
      case "actions":
        return (
          <Grid container>
            <Grid item xs={6}>
              <Button disabled={loading} variant="outlined" color="error" onClick={() => console.log("delete user")}>
                <p style={{ fontSize: "0.6rem" }}>Delete User</p>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button disabled={loading} variant="outlined" color="warning" onClick={() => console.log("delete buss")}>
                <p style={{ fontSize: "0.6rem" }}>Delete businesses</p>
              </Button>
            </Grid>
          </Grid>
        );
      case "role":
        return (
          <select
            disabled={loading}
            style={{ padding: "14.6px 15px", borderRadius: "4px" }}
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
      default:
        return value;
    }
  };

  return (
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
  );
}

import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useUsers from "../../../hooks/useUsers";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "img", label: "Image" },
  {
    id: "button",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

function createData(name, email, img) {
  return { name, email, img };
}

export function Tables() {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data, refetch } = useUsers();
  const axiosP = useAxiosPublic();
  console.log(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column?.id == "img" ? (
                            <img width={80} height={80} src={value} />
                          ) : column.id === "button" ? (
                            row?.role == "admin" ? (
                              <Button variant="text" color="orange">
                                Admin
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  Swal.fire({
                                    title: `Are you sure?`,
                                    text: `Your are going to add (${row.name}) as admin`,
                                    color: "teal",
                                    icon: "question",
                                    iconColor: "teal",
                                    background: "#bee6e1",
                                    showCancelButton: true,
                                    confirmButtonColor: "teal",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes! Sure",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      axiosP
                                        .put(`/admin/${row?._id}`)
                                        .then(() => {
                                          refetch();
                                        });
                                      Swal.fire({
                                        title: "Done!",
                                        text: `(${row.name}) added successfully as Admin`,
                                        color: "teal",
                                        confirmButtonColor: "teal",
                                        icon: "success",
                                        iconColor: "teal",
                                        background: "#bee6e1",
                                      });
                                    }
                                  });
                                }}
                                variant="gradient"
                                color="teal"
                              >
                                Make Admin
                              </Button>
                            )
                          ) : (
                            value
                          )}
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const DAllUsers = () => {
  return (
    <div>
      <Tables />
    </div>
  );
};

export default DAllUsers;

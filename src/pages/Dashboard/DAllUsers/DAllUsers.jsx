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
import Loading from "../../../components/Loading/Loading";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "img", label: "Image" },
  {
    id: "button",
    label: "Make Admin",
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

  const { data, refetch, isPending } = useUsers();
  const axiosP = useAxiosPublic();

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
            {isPending ? (
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  <Loading />
                </TableCell>
              </TableRow>
            ) : data ? (
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
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
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
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
                })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
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
  React.useEffect(() => {
    window.document.title = "PP Dashboard | All Users";
  }, []);
  return (
    <div>
      <h1
        style={{ textShadow: "2px 2px 1px black" }}
        className="mb-5 font-bold text-4xl text-white"
      >
        All Users
      </h1>
      <Tables />
    </div>
  );
};

export default DAllUsers;

import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MyArticles = () => {
  useEffect(() => {
    window.document.title = "PrimePress | My Articles";
  }, []);
  return (
    <div className="my-28">
      <h1 className="text-center mb-6 font-bold text-3xl">Your All Articles</h1>
      <Tables />
    </div>
  );
};

export default MyArticles;

const columns = [
  { id: "serial", label: "Sl No.", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "publish_date", label: "Posted Date", minWidth: 170 },
  { id: "status", label: "status" },
  { id: "category", label: "isPremium" },
  { id: "message", label: "Admin Message" },
  { id: "view", label: "View Details", align: "center" },
  { id: "Edit", label: "Edit", align: "center" },
  { id: "delete", label: "Delete", align: "center" },
];

export function Tables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const axiosS = UseAxiosSecure();
  const axiosP = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["myArticles", user?.email],
    queryFn: async () => {
      const res = await axiosS.get(`/myArticles/${user?.email}`);
      return res.data;
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
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
              <TableRow sx={{ alignItems: "center" }}>
                <TableCell align="center" colSpan={7}>
                  <Loading />
                </TableCell>
              </TableRow>
            ) : user && data.length ? (
              data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
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
                            {column.id === "image" || column.id === "Aimage" ? (
                              <img width={100} height={100} src={value} />
                            ) : column.id === "serial" ? (
                              (i + 1).toString().padStart(2, "0")
                            ) : column.id === "view" ? (
                              <Link to={`/article/details/${row._id}`}>
                                <Button
                                  onClick={() => {
                                    axiosP.put(`/viewArticle/${row._id}`);
                                  }}
                                  variant="contained"
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
                                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                  </svg>
                                </Button>
                              </Link>
                            ) : column.id === "Edit" ? (
                              <Button
                                onClick={() =>
                                  navigate(`/article/edit/${row._id}`)
                                }
                                disabled={row?.status === "declined"}
                                variant="contained"
                                color="green"
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </Button>
                            ) : column.id === "delete" ? (
                              <Button
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: "You won't be able to revert this!",
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
                                        .delete(`/deleteArticle/${row._id}`)
                                        .then(() => {
                                          refetch();
                                        });
                                      Swal.fire({
                                        title: "Deleted!",
                                        text: "Your article has been deleted.",
                                        icon: "success",
                                        color: "teal",
                                        confirmButtonColor: "teal",
                                        iconColor: "teal",
                                        background: "#bee6e1",
                                      });
                                    }
                                  });
                                }}
                                variant="filled"
                                color="red"
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </Button>
                            ) : (
                              <p>{value}</p>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100, 200]}
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

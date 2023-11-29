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
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading/Loading";
import { useEffect } from "react";

const columns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "Aemail", label: "Author Email", minWidth: 170 },

  { id: "Aname", label: "Name", minWidth: 130 },
  { id: "Aimage", label: "Image", minWidth: 100 },
  { id: "publish_date", label: "Posted Date", minWidth: 170 },
  { id: "status", label: "status" },
  { id: "publisher", label: "publisher" },
  { id: "approve", label: "Approve", align: "center" },
  { id: "decline", label: "Decline", align: "center" },
  { id: "delete", label: "Delete", align: "center" },
  {
    id: "premium",
    label: "Premium",
    align: "center",
  },
];

function createData(title, Aemail, Aname, Aimage, publish_date, status) {
  return { title, Aemail, Aname, Aimage, publish_date, status };
}

export function Tables() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const axiosP = useAxiosPublic();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosP.get(`/allarticles`);
      return res.data;
    },
  });
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
              <TableRow>
                <TableCell align="center" colSpan={11}>
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
                            {column.id === "image" || column.id === "Aimage" ? (
                              <img width={100} height={100} src={value} />
                            ) : column.id === "premium" ? (
                              <Button
                                disabled={
                                  row.category === "premium" ? true : false
                                }
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: `Your gonna make (${row.title}) to Premium.`,
                                    color: "teal",
                                    icon: "question",
                                    confirmButtonColor: "teal",
                                    iconColor: "teal",
                                    background: "#bee6e1",
                                    showCancelButton: true,
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      axiosP
                                        .put(`/updateCategory/${row._id}`)
                                        .then(() => {
                                          refetch();
                                        });
                                      Swal.fire({
                                        title: "Done!",
                                        text: `(${row.title}) is now Premium.`,
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
                                color="orange"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="black"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                  />
                                </svg>
                              </Button>
                            ) : column.id === "approve" ? (
                              <Button
                                disabled={
                                  row.status === "approved" ||
                                  row.status === "declined"
                                    ? true
                                    : false
                                }
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",
                                    color: "teal",
                                    icon: "question",
                                    confirmButtonColor: "teal",
                                    iconColor: "teal",
                                    background: "#bee6e1",
                                    showCancelButton: true,
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      axiosP
                                        .put(`/reason/${row._id}`, {
                                          message: "Excellent Work!",
                                          status: "approved",
                                        })
                                        .then(() => {
                                          refetch();
                                        });

                                      Swal.fire({
                                        title: "Approved!",
                                        icon: "success",
                                        color: "teal",
                                        confirmButtonColor: "teal",
                                        iconColor: "teal",
                                        background: "#bee6e1",
                                      });
                                    }
                                  });
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
                                    d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                                  />
                                </svg>
                              </Button>
                            ) : column.id === "decline" ? (
                              <Button
                                disabled={
                                  row.status === "approved" ||
                                  row.status === "declined"
                                    ? true
                                    : false
                                }
                                onClick={() => {
                                  Swal.fire({
                                    title: "Enter the reason",
                                    input: "textarea",
                                    color: "teal",
                                    confirmButtonColor: "teal",
                                    iconColor: "teal",
                                    showCancelButton: true,
                                    inputValidator: (value) => {
                                      if (!value) {
                                        return "You need to write something!";
                                      }
                                    },
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      const message = result.value;
                                      axiosP
                                        .put(`/reason/${row._id}`, {
                                          message,
                                          status: "declined",
                                        })
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
                                variant="contained"
                                color="blue"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="black"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
                                variant="contained"
                                color="red"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="black"
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
                <TableCell colSpan={11} align="center">
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

const DAllArticles = () => {
  useEffect(() => {
    window.document.title = "PP Dashboard | All Articles";
  }, []);
  return (
    <>
      <h1
        style={{ textShadow: "2px 2px 1px black" }}
        className="mb-5 font-bold text-4xl text-white"
      >
        All Articles
      </h1>
      <Tables />
    </>
  );
};

export default DAllArticles;

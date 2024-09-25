/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Modal,
} from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";
import CustomPagination from "../Pagination";
import EditUser from "./EditUser";

export default function UserActive() {
  const [userActive, setUserActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(50);
  const topRef = useRef(null);
  useEffect(() => {
    fetchUser();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers =
  userActive?userActive.length > 0
      ? userActive.slice(indexOfFirstUser, indexOfLastUser)
      : []:[];
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setShow(false);
    setSuccessMessage("");
    setErrorMessage("");
  };


  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };


  const fetchUser = async () => {
    try {
      const response = await axiosClient.get("get-all-user-bot");
      setUserActive(response.data.users);
      // console.log(response.data.users);
      if (window.location.search.includes("updated")) {
        setSuccessMessage("UserActive updated successfully");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("added")) {
        setSuccessMessage("UserActive added successfully");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
      } 
    } finally {
      UserActive;
      setLoading(false);
    }
  };
  const Loader = (props) => {
    const random = Math.random() * (1 - 0.7) + 0.7;
    return (
      <ContentLoader
        height={50}
        width={1060}
        speed={2}
        primarycolor="#333"
        secondarycolor="#999"
        {...props}
      >
        <rect x="10" y="13" rx="6" ry="6" width={120 * random} height="12" />
        <rect x="159" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="250" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="360" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="430" y="13" rx="6" ry="6" width={60 * random} height="12" />
        <rect x="530" y="13" rx="6" ry="6" width={100 * random} height="12" />
        <rect x="650" y="13" rx="6" ry="6" width={100 * random} height="12" />
  
        <rect x="0" y="39" rx="6" ry="6" width="1090" height=".3" />
      </ContentLoader>
    );
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.post(`update-bot-user`,id);
      setUserActive(userActive.filter((user) => user.id !== id));
      setSuccessMessage(response.data.Massage);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Failed to delete the user", err);
      setSuccessMessage("");
      console.log(err);
    }
  };

  const handleConfirmDelete = (id) => {
    setSelectedUser(id);
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setSelectedUser(null);
    setConfirmDelete(false);
  };


  return (
    <>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>show Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && <EditUser user={selectedUser} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}

      {loading ? (
       <div className="mt-[8rem]">
    {Array(10)
      .fill("")
      .map((e, i) => (
        <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </div> 
      ) : (
        <>
          

          <div className="table-responsive min-h-[100vh]">
            <table className="table table-borderless" ref={topRef}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Num_orders</th>
                  <th scope="col">Opened</th>
                  <th scope="col">Available</th>
                  <th scope="col">usdt</th>
                  <th scope="col">Money</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0
                  ? currentUsers.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.num_orders}</td>
                        <td>{user.open_orders}</td>
                        <td>{user.num_orders - user.open_orders}</td>
                        <td style={{ textAlign: "center" }}>
                          {user.orders_usdt}
                        </td>
                        {/* <td>
                          {user.plan
                            ? user.plan.name
                              ? user.plan.name
                              : "no plan name"
                            : "-"}
                        </td> */}
                        <td>{user.number_points ? user.number_points : 0}</td>
                        <td style={{ textAlign: "center" }}>
                          <DropdownButton
                            as={ButtonGroup}
                            title="Actions"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            <Dropdown.Item
                              className="flex justify-center hover:text-sky-500"
                              eventKey="1"
                              onClick={() => handleShow(user)}
                            >
                              Edit
                            </Dropdown.Item>
                            {!confirmDelete && (
                              <Dropdown.Item
                                className="flex justify-center hover:text-red-500"
                                eventKey="2"
                                onClick={() => handleConfirmDelete(user.id)}
                              >
                                Delete
                              </Dropdown.Item>
                            )}
                            {confirmDelete && selectedUser === user.id && (
                              <Modal
                                show={confirmDelete}
                                onHide={handleCancelDelete}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>Delete UserActive</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <p>
                                    Are you sure you want to delete this user?
                                  </p>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
                                    style={{
                                      width: "9rem",
                                      marginRight: "1rem",
                                      color: "white",
                                      backgroundColor: "red",
                                    }}
                                  >
                                    Confirm Delete
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    style={{
                                      width: "9rem",
                                      color: "white",
                                      backgroundColor: "black",
                                    }}
                                    onClick={handleCancelDelete}
                                  >
                                    Cancel
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            )}
                            {/* <Dropdown.Item
                              eventKey="3"
                              className="flex justify-center hover:text-yellow-500"
                              onClick={() => handleShowDetails(user)}
                            >
                              Show
                            </Dropdown.Item> */}
                            {/* <Dropdown.Item
                              eventKey="4"
                              className="flex justify-center hover:text-green-500"
                              onClick={() => handleConfirmPan(user)}
                            >
                              ban
                            </Dropdown.Item> */}
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  : // :
                    // userActive? userActive.length > 0
                    // ? userActive.map((user, index) => (
                    //     <tr key={user.id}>
                    //       <th scope="row">{index + 1}</th>
                    //       <td>{user.name}</td>
                    //       <td>{user.email}</td>
                    //       <td>{user.phone}</td>
                    //       <td style={{ textAlign: "center" }}>
                    //         {user.number_of_user}
                    //       </td>
                    //       <td>{user.plan ? user.plan.name : "No Plans"}</td>
                    //       <td>{user.money ? user.money : 0}</td>
                    //       <td style={{ textAlign: "center" }}>
                    //         <DropdownButton
                    //           as={ButtonGroup}
                    //           title="Actions"
                    //           id="dropdown-button-dark-example1"
                    //           menuVariant="dark"
                    //         >
                    //           <Dropdown.Item
                    //             className="flex justify-center hover:text-sky-500"
                    //             eventKey="1"
                    //             onClick={() => handleShow(user)}
                    //           >
                    //             Edit
                    //           </Dropdown.Item>
                    //           {!confirmDelete && (
                    //             <Dropdown.Item
                    //               className="flex justify-center hover:text-red-500"
                    //               eventKey="2"
                    //               onClick={() => handleConfirmDelete(user.id)}
                    //             >
                    //               Delete
                    //             </Dropdown.Item>
                    //           )}
                    //           {confirmDelete && selectedUser === user.id && (
                    //             <Modal
                    //               show={confirmDelete}
                    //               onHide={handleCancelDelete}
                    //             >
                    //               <Modal.Header closeButton>
                    //                 <Modal.Title>Delete UserActive</Modal.Title>
                    //               </Modal.Header>
                    //               <Modal.Body>
                    //                 <p>
                    //                   Are you sure you want to delete this user?
                    //                 </p>
                    //               </Modal.Body>
                    //               <Modal.Footer>
                    //                 <Button
                    //                   variant="danger"
                    //                   size="sm"
                    //                   onClick={() => handleDelete(user.id)}
                    //                   style={{
                    //                     width: "9rem",
                    //                     marginRight: "1rem",
                    //                     color: "white",
                    //                     backgroundColor: "red",
                    //                   }}
                    //                 >
                    //                   Confirm Delete
                    //                 </Button>
                    //                 <Button
                    //                   variant="secondary"
                    //                   size="sm"
                    //                   style={{
                    //                     width: "9rem",
                    //                     color: "white",
                    //                     backgroundColor: "black",
                    //                   }}
                    //                   onClick={handleCancelDelete}
                    //                 >
                    //                   Cancel
                    //                 </Button>
                    //               </Modal.Footer>
                    //             </Modal>
                    //           )}
                    //           <Dropdown.Item
                    //             eventKey="3"
                    //             className="flex justify-center hover:text-yellow-500"
                    //             onClick={() => handleShowDetails(user)}
                    //           >
                    //             Show
                    //           </Dropdown.Item>
                    //           <Dropdown.Item
                    //             eventKey="4"
                    //             className="flex justify-center hover:text-green-500"
                    //             onClick={() => handleConfirmPan(user)}
                    //           >
                    //             ban
                    //           </Dropdown.Item>
                    //         </DropdownButton>
                    //       </td>
                    //     </tr>
                    //   ))
                    // : null
                    null}
              </tbody>
            </table>
            <CustomPagination
              currentPage={currentPage}
              totalUsers={userActive?userActive.length:0} // or userActive.length
              usersPerPage={usersPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}

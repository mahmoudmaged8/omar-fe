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
import { Facebook } from "react-content-loader";
import { usePDF } from "react-to-pdf";
import axiosClient from "../../axiosClientOffline";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import UserDetailsModalBody from "./UserDetailsModalBody";

export default function UsersProfit() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showComingDetails, setShowComingDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [usersDetails, setUsersDetails] = useState(null);
  const handleCloseCreate = () => setShowCreate(false);
  const topRef = useRef(null);
  useEffect(() => {
    fetchUser();
  }, []);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const handleClose = () => {
    setShow(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleShowDetails = async (user) => {
    try {
      setShowDetails(true);
      const response = await axiosClient.get(`User/${user.id}`);
      setUserDetails(response.data.data);
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
    }
  };
  const handleShowDetailsWeb = async (user) => {
    window.location.href = `/dashboard/userloges?id=${user.id}`;
  };
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setUserDetails(null);
  };
  const handleCommingCloseDetails = () => {
    setShowComingDetails(false);
    setUsersDetails(null);
  };

  const fetchUser = async () => {
    try {
      const response = await axiosClient.post(`usersProfit`);
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching usersProfit : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUser
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            users={"user"}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
          <Button
            variant="secondary"
            onClick={() => handleShowDetails(selectedUser)}
          >
            Show
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>show Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserDetailsModalBody
            userDetails={userDetails}
            setShowDetails={setShowDetails}
            setShowComingDetails={setShowComingDetails}
            setUsersDetails={setUsersDetails}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showComingDetails}
        onHide={handleCommingCloseDetails}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usersDetails && (
            <>
              {usersDetails.map((user, index) => (
                <div id={index + 1} key={index}>
                  <p>id: {user.id}</p>
                  <p>Name: {user.name}</p>
                </div>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCommingCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          style={{ width: "max-content" }}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert
          variant="danger"
          onClose={() => setErrorMessage("")}
          style={{ width: "max-content" }}
          dismissible
        >
          {errorMessage}
        </Alert>
      )}

      {loading ? (
        <Facebook />
      ) : (
        <>
          <div
            className="d-flex flex-row justify-content-between mb-3"
            ref={topRef}
          >
              <Button onClick={() => toPDF()}>Download PDF</Button>
          </div>

          <div className="table-responsive min-h-[100vh]" ref={targetRef}>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Number Of User</th>
                  <th scope="col">Plan</th>
                  <th scope="col">Money</th>
                  <th scope="col">Fees</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users
                  ? users.length > 0
                    ? users.map((user, index) => (
                        <tr key={user.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td style={{ textAlign: "center" }}>
                            {user.number_of_user}
                          </td>
                          <td>
                            {user.plan_id == 1
                              ? "Free"
                              : user.plan_id == 4
                              ? "VIP1"
                              : user.plan_id == 5
                              ? "VIP2"
                              : user.plan_id == 6
                              ? "Diamond"
                              : null}
                          </td>
                          <td>{user.money ? user.money : 0}</td>
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
                              <Dropdown.Item
                                eventKey="3"
                                className="flex justify-center hover:text-yellow-500"
                                onClick={() => handleShowDetails(user)}
                              >
                                Show
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="3"
                                className="flex justify-center hover:text-yellow-500"
                                onClick={() => handleShowDetailsWeb(user)}
                              >
                                Show Details
                              </Dropdown.Item>
                            </DropdownButton>
                          </td>
                        </tr>
                      ))
                    : null
                  : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

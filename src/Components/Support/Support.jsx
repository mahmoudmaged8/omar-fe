/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import axiosClient from "../../axiosClientForaFront";
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
import AddUser from "../user/AddUser";
import EditUser from "../user/EditUser";
import UserDetailsModalBody from "../user/UserDetailsModalBody";

export default function Support() {
  const [supports, setSupports] = useState([]);
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
  const [usersDetailsFather, setUsersDetailsFather] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false); // State for confirming delete action
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);
  useEffect(() => {
    fetchArchive();
  }, []);
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setSuccessMessage("");
    setErrorMessage("");
  };
  const handleShowUserDetails = async (userDetails) => {
    setUsersDetailsFather(null);
    try {
      setShowDetails(false);
      setShowComingDetails(true);
      if (userDetails.affiliate_code) {
        const response = await axiosClient.get(
          `get_all_subscrib/${userDetails.affiliate_code}`
        );
        setUsersDetails(response.data.data);
        console.log(response.data);
        setShowDetails(false);
      }
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching details : ${err.message}`);
      }
    }
    try {
      setShowDetails(false);
      setShowComingDetails(true);
      if (userDetails.comming_afflite) {
        const response = await axiosClient.post(`get_user_parent`, {
          comming_afflite: userDetails.comming_afflite,
        });
        setUsersDetailsFather(response.data);
        console.log(response.data);
        setShowDetails(false);
      }
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching details : ${err.message}`);
      }
    }
  };
  const fetchArchive = async () => {
    try {
      const response = await axiosClient.post(`get_user`, {
        state: "support",
      });
      setSupports(response.data.data);
      if (window.location.search.includes("update")) {
        setSuccessMessage("Support updated successfully");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("added")) {
        setSuccessMessage("Support added successfully");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching support : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`User/${id}`);
      setSupports(supports.filter((support) => support.id !== id));
      setSuccessMessage(response.data.Massage);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(`Error fetching user : ${err.message}`);
      setSuccessMessage("");
      console.log(err);
    }
    setConfirmDelete(false); // Reset confirm delete state after action is performed
  };
  const handleConfirmDelete = (id) => {
    setSelectedUser(id);
    setConfirmDelete(true);
  };
  const handleCancelDelete = () => {
    setSelectedUser(null);
    setConfirmDelete(false);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
    setUserDetails(null);
  };

  const handleShowDetails = async (user) => {
    try {
      setShowDetails(true);
      const response = await axiosClient.get(`User/${user.id}`);
      setUserDetails(response.data.data);
    } catch (err) {
      console.log(err);
      setErrorMessage(`Error fetching user : ${err.message}`);
    }
  };

  const handleCommingCloseDetails = () => {
    setShowComingDetails(false);
    setUsersDetails(null);
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
  return (
    <>
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create Support</Modal.Title>
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
        <Modal.Body style={{direction:'ltr'}}>
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
          <p className="text-center text-lg">جاء من خلال</p>
          {usersDetailsFather && usersDetailsFather.length > 0 ? (
            <>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    {/* <th scope="col">plan</th> */}
                    {/* <th scope="col">Number Of User</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* <p>{userDetails}</p> */}
                  {usersDetailsFather.map((user, index) => (
                    <tr key={user.id}>
                      <td scope="row">{index + 1}</td>
                      <td>{user.name}</td>
                      {/* <td>{user.plan.name}</td> */}
                      {/* <td>
                            <Button
                              variant="primary"
                              size="sm"
                              className="ms-2"
                              onClick={() => {
                                setShowDetails(false);
                                handleShowFatherDetails(user);
                              }}
                            >
                              comming From
                            </Button>
                        </td> */}
                    </tr>
                  ))}
                  {/*<p>Email: {usersDetails.email}</p>
                <p>Phone: {usersDetails.phone}</p> 
                <p>Number Of User: <a href="" onClick={()=>handleShowUserDetails(usersDetails)}>{usersDetails.number_of_user}</a></p>
                <p>Plan: {usersDetails.plan}</p>
                <p>comming afflite: {usersDetails.comming_afflite}</p> */}
                  {/* Add more user details here */}
                </tbody>
              </table>
            </>
          ) : (
            <p>لم يأتي من هذا المستخدم من خلال أحد</p>
          )}
          <p className="text-center text-lg">التابعين له</p>
          {usersDetails && (
            <>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">plan</th>
                    <th scope="col">Number Of User</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <p>{userDetails}</p> */}
                  {usersDetails.map((user, index) => (
                    <tr key={user.id}>
                      <td scope="row">{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.plan.name}</td>
                      <td>
                        {user.number_of_user > 0 ? (
                          <Button
                            variant="primary"
                            size="sm"
                            className="ms-2"
                            onClick={() => {
                              setShowDetails(false);
                              handleShowUserDetails(user);
                            }}
                          >
                            {user.number_of_user}
                          </Button>
                        ) : (
                          user.number_of_user
                        )}
                      </td>
                    </tr>
                  ))}
                  {/*<p>Email: {usersDetails.email}</p>
                <p>Phone: {usersDetails.phone}</p> 
                <p>Number Of User: <a href="" onClick={()=>handleShowUserDetails(usersDetails)}>{usersDetails.number_of_user}</a></p>
                <p>Plan: {usersDetails.plan}</p>
                <p>comming afflite: {usersDetails.comming_afflite}</p> */}
                  {/* Add more user details here */}
                </tbody>
              </table>
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
       <div className="mt-[8rem]">
    {Array(10)
      .fill("")
      .map((e, i) => (
        <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </div> 
      ) : (
        <>
          <div className="d-flex flex-row justify-content-between mb-3">
            <Button onClick={handleShowCreate}>Add Support</Button>
          </div>
          <div className="table-responsive min-h-[100vh]">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Number Of User</th>
                  <th scope="col">Plan</th>
                  <th scope="col">expiry Plan</th>
                  {/* <th scope="col">Role</th> */}
                  <th scope="col">Money</th>
                  <th scope="col">Fees</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {supports
                  ? supports.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td style={{ textAlign: "center" }}>
                          {user.number_of_user != 0 ? (
                            <Button
                              variant="primary"
                              size="sm"
                              className="ms-2"
                              onClick={() => {
                                setShowDetails(false);
                                handleShowUserDetails(user);
                              }}
                            >
                              {user.number_of_user}
                            </Button>
                          ) : (
                            user.number_of_user
                          )}
                        </td>
                        <td>{user.plan ? user.plan.name : user.plan}</td>
                        <td>{user.end_plan ? user.end_plan : "-"}</td>
                        {/* <td>{user.Role ? user.Role.map((role)=>(<div key={role.id}>{role.name}</div>)) : null}</td> */}
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
                                  <Modal.Title>Delete User</Modal.Title>
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
                            <Dropdown.Item
                              eventKey="3"
                              className="flex justify-center hover:text-yellow-500"
                              onClick={() => handleShowDetails(user)}
                            >
                              Show
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

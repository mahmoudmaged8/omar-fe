/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";
import axiosClientF from "../../axiosClientFront";

export default function SuperAdmin() {
  const [pendingUsers, setPendingUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmActive, setConfirmActive] = useState(false);
  const [id, setId] = useState(null);
  const [post, setPost] = useState({
    user_id: "",
  });

  useEffect(() => {
    fetchArchive();
    fetchPusher_me();
  }, []);
  const fetchPusher_me = async () => {
    try {
      const response = await axiosClientF.post("me");
      setId(response.data.user.id);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching me : ${err.message}`);
      }
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
  const handleInputPost = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleConfirmUnPanned = (id) => {
    setSelectedUser(id);
    setConfirmActive(true);
    };
  const handleCancelActive = () => {
    setSelectedUser(null);
    setConfirmActive(false);
  };

  const fetchArchive = async () => {
    try {
      const response = await axiosClient.get("banned");
      setPendingUsers(response.data.data);
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
      setLoading(false);
    }
  };

  const handleActive = async (id) => {
    post.user_id = id;
    try {
      const response = await axiosClient.put(`banned/${id}`, post);
      setPendingUsers(pendingUsers.filter((user) => user.id !== post.id));
      setSuccessMessage(response.data.massage);
      setErrorMessage("");
      setConfirmActive(false);
    } catch (err) {
      setErrorMessage("Failed to activate the user");
      setSuccessMessage("");
      console.log(err);
    }
  };


  return (
    <>
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
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email Address</th>
                  {id != "682" ? (
                    <th scope="col" style={{ textAlign: "center" }}>
                      Action
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {pendingUsers.length > 0 ? (
                  pendingUsers.map((users, index) => (
                    <tr key={users.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{users.name}</td>
                      <td>{users.email}</td>
                      <td style={{ textAlign: "center" }}>
                      {id != "682" ? (
                          <Button
                            className="flex m-auto justify-center"
                            onClick={() => handleConfirmUnPanned(users.id)}
                          >
                            Un Panned
                          </Button>
                        ) :null}
                        {confirmActive && selectedUser === users.id && (
                          <Modal
                            show={confirmActive}
                            onHide={handleCancelActive}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Active User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ direction: "ltr" }}>
                              <p style={{ direction: "ltr" }}>
                                Are you sure you want to Active this user?
                              </p>
                              Name
                              <span className="text-sky-500"> {users.name}</span>
                              {/* <span className="text-sky-500"> {users.id}</span> */}
                              <Form.Control
                                type="text"
                                name="user_id"
                                readOnly
                                style={{
                                  width: "2rem",
                                  textAlign: "center",
                                  visibility: "hidden",
                                }}
                                value={users.id}
                                onKeyUp={handleInputPost}
                                onChange={handleInputPost}
                              />
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleActive(users.id)}
                                style={{
                                  width: "9rem",
                                  marginRight: "1rem",
                                  color: "white",
                                  backgroundColor: "red",
                                }}
                              >
                                Confirm Active
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                style={{
                                  width: "9rem",
                                  color: "white",
                                  backgroundColor: "black",
                                }}
                                onClick={handleCancelActive}
                              >
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      no pending users found
                      {/* <Spinner animation="border" /> */}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
// import Select from "react-select";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";
// import axiosClientImage from "../../axios_img_offline";
import axiosClientF from "../../axiosClientFront";

export default function UserDeleted() {
  const [pendingUsers, setPendingUsers] = useState({});
  // const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  // const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [confirmActive, setConfirmActive] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [post, setPost] = useState({
    user_id: "",
  });
  const [id, setId] = useState(null);


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
  const handleInputPost = (e) => {
    if (e.target && e.target.name) {
      setPost({ ...post, [e.target.name]: e.target.value });
    } else {
      setPost({ ...post, plan_id: e.value });
    }
  };

  const handleConfirmActive = (id) => {
    setSelectedUser(id);
    setConfirmActive(true);
  };
  const handleCancelActive = () => {
    setSelectedUser(null);
    setConfirmActive(false);
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
  const fetchArchive = async () => {
    try {
      const response = await axiosClient.get("softDeleteUser");
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
      const response = await axiosClient.put(`restoreSoftDeleteUser/${id}`);
      if (response.data.success == false) {
        setErrorMessage(response.data.message);
      }else {
      setPendingUsers(pendingUsers.filter((user) => user.id !== post.id));
      setSuccessMessage("Active successfully");
      window.location.href = "/dashboard/users";
      setErrorMessage("");
      setConfirmActive(false);
    }
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
                  <th scope="col">Money</th>
                  {/* <th scope="col">Price</th> */}
                  {/* <th scope="col">Discount</th> */}
                  {/* <th scope="col">Image Paying</th> */}
                  {/* <th scope="col">Is verified</th> */}
                  {id != "682" ? (
                    <th scope="col" style={{ textAlign: "center" }}>Action</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
  {pendingUsers.length> 0? (
    pendingUsers.map((users, index) => (
      users && (
        <tr key={users.id}>
          <th scope="row">{index + 1}</th>
          <td>{users.name}</td>
          <td>{users.email}</td>
          <td>{users.money }</td>
          {/* <td>{users.plan ? users.plan.price - users.plan.discount : null}</td> */}
          {/* <td>
            {users.image_payment ? (
              <img
                src={`${axiosClientImage.defaults.baseURL}ImagePayment/${users.image_payment}`}
                alt="No Photo"
                style={{ width: "10rem", cursor: "pointer" }}
                onClick={() =>
                  handleImageClick(
                    `${axiosClientImage.defaults.baseURL}ImagePayment/${users.image_payment}`
                  )
                }
              />
            ) : (
              "Not Uploaded"
            )}
          </td> */}
          <td style={{ textAlign: "center" }}>
          {id != "682" ? (
              <Button
                className="flex m-auto justify-center"
                onClick={() => handleConfirmActive(users.id)}
              >
                Restore
              </Button>
            ) : null}
            {confirmActive && selectedUser === users.id && (
              <Modal show={confirmActive} onHide={handleCancelActive}>
                <Modal.Header closeButton>
                  <Modal.Title>Restore User</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ direction: "ltr" }}>
                  {errorMessage && (
                    <Alert
                      variant="danger"
                      onClose={() => setErrorMessage("")}
                      dismissible
                    >
                      {errorMessage}
                    </Alert>
                  )}
                  <p style={{ direction: "ltr" }}>
                    Are you sure you want to Restore this user?
                  </p>
                  Name
                  <span className="text-sky-500"> {users.name}</span>
                  <br />
                  Email
                  <span className="text-sky-500"> {users.email}</span>
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
                      backgroundColor: "green",
                    }}
                  >
                    Restore
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
      )
    ))
  ) : (
    <tr>
      <td colSpan="9" className="text-center">
        no users Deleted
        {/* <Spinner animation="border" /> */}
      </td>
    </tr>
  )}
</tbody>
              {fullscreenImage && (
            <div
              className="fullscreen-image"
              onClick={() => setFullscreenImage(null)}
            >
              <button
                className="close-button"
                onClick={() => setFullscreenImage(null)}
              >
                Close
              </button>
              <img src={fullscreenImage} alt="Full Screen" />
            </div>
          )}
            </table>
          </div>
        </>
      )}
    </>
  );
}

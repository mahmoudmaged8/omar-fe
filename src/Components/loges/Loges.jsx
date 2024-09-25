/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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

export default function Loges() {
  const [loges, setLoges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedLoges, setSelectedLogs] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);


  useEffect(() => {
    fetchArchive();
  }, []);
  const handleCloseDetails = () => {
    setShowDetails(false);
    setUserDetails(null);
  };
  const handleShowDetails = (users) => {
    setShowDetails(true);
    setUserDetails(users.massageError);
};
  const handleConfirmDelete = (users) => {
    setSelectedUser(users.user.name);
    setSelectedLogs(users.id);
    setConfirmDelete(true);
  };
  const handleCancelDelete = () => {
    setSelectedUser(null);
    setConfirmDelete(false);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`loges/${id}`);
      setSuccessMessage(response.data.Massage);
      setErrorMessage("");
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      }else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
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
  const fetchArchive = async () => {
    try {
      const response = await axiosClient.get("loges");
      setLoges(response.data);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      }else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      }else if (err.message == "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
    <Modal.Title>show Errors</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {userDetails ?<h2 className="text-danger" style={{ direction: "ltr" ,fontSize:"1.2rem"}}>{userDetails}</h2>: null}
  </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      <Modal show={confirmDelete} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ direction: "ltr" }}>
            Are you sure you want to delete this loges?
          </p>
          {selectedUser}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(selectedLoges)}
            style={{
              width: "9rem",
              marginRight: "1rem",
              color: "white",
              backgroundColor: "red",
            }}
          >
            Delete
          </Button>
          <Button
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
          <>
          {Array(10)
            .fill("")
            .map((e, i) => (
              <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
            ))}
        </>
      ) : (
        <>
          <div className="table-responsive min-h-[100vh]">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">side</th>
                  <th scope="col">status</th>
                  <th scope="col">currency</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loges && Array.isArray(loges) && loges.length > 0? (
                    loges.slice().reverse().map((users, index) => (
                      <tr key={users.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{users.user ? users.user.name : ""}</td>
                        <td>{users.user ? users.user.email : ""}</td>
                        <td>{users.price}</td>
                        <td>{users.quantity}</td>
                        <td>{users.side == "BUY" ? <div className="text-primary">{users.side}</div> : <div className="text-success">{users.side}</div>}</td>
                        <td>{users.status == "NEW"? <div className="text-warning">Watting</div>  :users.status == "FILLED"? <div className="text-success">SUCCESS</div>:users.status == "CANCELED"? <div className="text-secondary">{users.status}</div>:<a href="#" className="text-danger" onClick={() => handleShowDetails(users)}>{users.status}</a>}</td>
                        <td>{users.symbol}</td>
                        <td style={{ textAlign: "center" }}>
                          <DropdownButton
                            as={ButtonGroup}
                            title="Actions"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            <Dropdown.Item
                              className="flex justify-center hover:text-red-500"
                              eventKey="2"
                              onClick={() => handleConfirmDelete(users)}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        no pending Logs found
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

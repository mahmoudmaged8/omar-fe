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

export default function Affiliate() {
  const [affiliates, setAffiliate] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBots, setSelectedBots] = useState(null);
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
  //   const handleShowDetails = (affiliate) => {
  //     setShowDetails(true);
  //     setUserDetails(affiliate.massageError);
  // };
  const handleConfirmDelete = (affiliate) => {
    setSelectedUser(affiliate.user.name);
    setSelectedBots(affiliate.id);
    setConfirmDelete(true);
  };
  const handleCancelDelete = () => {
    setSelectedUser(null);
    setConfirmDelete(false);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`affiliates/${id}`);
      setSuccessMessage(response.data.Massage);
      setErrorMessage("");
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else if (err.message == "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
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
      const response = await axiosClient.get("get-all-affiliates");
      setAffiliate(response.data);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else if (err.message == "Request failed with status code 404") {
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
          {userDetails ? (
            <h2
              className="text-danger"
              style={{ direction: "ltr", fontSize: "1.2rem" }}
            >
              {userDetails}
            </h2>
          ) : null}
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
            Are you sure you want to delete this affiliates?
          </p>
          {selectedUser}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(selectedBots)}
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
        // < Facebook
        //   height={260}
        //   width={1200}
        //   speed={2}
        //   backgroundColor={"#333"}
        //   foregroundColor={"#999"} />
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
                  {/* <th scope="col">email</th>
                  <th scope="col">price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">side</th>
                  <th scope="col">status</th>
                  <th scope="col">currency</th> */}
                  <th scope="col" style={{ textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {affiliates ? (
                  affiliates.length > 0 ? (
                    affiliates.map((affiliate, index) => (
                      <tr key={affiliate.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{affiliate.bot_name ? affiliate.bot_name : ""}</td>
                        {/* <td>{affiliate.user ? affiliate.user.email : ""}</td> */}
                        {/* <td>{affiliate.price}</td> */}
                        {/* <td>{affiliate.quantity}</td> */}
                        {/* <td>{affiliate.side == "BUY" ? <div className="text-primary">{affiliate.side}</div> : <div className="text-success">{affiliate.side}</div>}</td> */}
                        {/* <td>{affiliate.status == "NEW"? <div className="text-warning">Watting</div>  :affiliate.status == "FILLED"? <div className="text-success">SUCCESS</div>:affiliate.status == "CANCELED"? <div className="text-secondary">{affiliate.status}</div>:<a href="#" className="text-danger" onClick={() => handleShowDetails(affiliate)}>{affiliate.status}</a>}</td> */}
                        {/* <td>{affiliate.symbol}</td> */}
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
                              onClick={() => handleConfirmDelete(affiliate)}
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
                        no pending affiliate found
                        {/* <Spinner animation="border" /> */}
                      </td>
                    </tr>
                  )
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

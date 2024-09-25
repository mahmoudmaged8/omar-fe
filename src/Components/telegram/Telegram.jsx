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
import AddTelegram from "./AddTelegram";
import EditTelegram from "./EditTelegram";
export const Telegram = () => {
  const [telegrams, setTelegrams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlanDelete, setSelectedPlanDelete] = useState(null);
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("telegram");
      setTelegrams(response.data.data);
      if (window.location.search.includes("success")) {
        setSuccessMessage("telegram created successfully");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("title")) {
        setSuccessMessage("telegram updated successfully");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching telegram : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosClient.delete(`telegram/${selectedPlanDelete.id}`);
      setSuccessMessage("telegram deleted successfully");
    } catch (error) {
      setErrorMessage("Error deleting telegram");
    }
    setSelectedPlanDelete(null);
    fetchPlans();
  };

  const handleDelete = (recommendation) => {
    setSelectedPlanDelete(recommendation);
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
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTelegram, setSelectedPlan] = useState(null);

  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);

  const handleShow = (telegram) => {
    setSelectedPlan(telegram);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <>
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
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>ADD TELEGRAM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTelegram
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={selectedPlanDelete !== null}
        onHide={() => setSelectedPlanDelete(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Recommendation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the recommendation?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            style={{
              width: "10rem",
              backgroundColor: "red",
              borderColor: "#f0ad4e",
              margin: "auto",
            }}
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            style={{
              width: "10rem",
              backgroundColor: "black",
              borderColor: "#f0ad4e",
              margin: "auto",
              color: "white",
            }}
            onClick={() => setSelectedPlanDelete(null)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={handleShowCreate}>Add telegram</Button>
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
        <table className="table table-borderless   min-h-[100vh]">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Merchant</th>
              <th>Plans</th>
              <th>Token</th>
              <th style={{ width: "12rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {telegrams ? (
              telegrams.map((telegram, index) => (
                <tr key={telegram.id}>
                  <td>{index + 1}</td>
                  <td> {telegram.title}</td>
                  <td>{telegram.merchant}</td>
                  <td>
                    {telegram.plan
                      ? telegram.plan.map((myPlan) => myPlan.name + " ")
                      : "No paln"}
                  </td>
                  <td> {telegram.token}</td>
                  <td>
                    <DropdownButton
                      as={ButtonGroup}
                      title="Actions"
                      id="dropdown-button-dark-example1"
                      menuVariant="dark"
                    >
                      <Dropdown.Item
                        className="flex justify-center hover:text-green-500"
                        index={telegram.id}
                        onClick={() => handleShow(telegram)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="hover:text-red-500 flex justify-center"
                        onClick={() => handleDelete(telegram)}
                      >
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <div className="flex justify-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">No data...</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Telegram</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTelegram && <EditTelegram telegram={selectedTelegram} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Telegram;

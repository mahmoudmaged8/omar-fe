/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
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
import EditArchive from "./EditArchive";

export default function Archive() {
  const [archives, setArchive] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedArchive, setSelectedArchive] = useState(null);
  const [selectedArchiveEdit, setSelectedArchiveEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecomindationModal, setShowRecomindationModal] = useState(false);
  const [selectedRecomindation, setSelectedRecomindation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchArchive();
  }, []);

  const fetchArchive = async () => {
    try {
      const response = await axiosClient.get("archive");
      if (window.location.search.includes("success")) {
        setSuccessMessage("Archive Added successfully");
        window.history.replaceState(null, "", window.location.pathname);
      }
      setArchive(response.data.data);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching archive : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosClient.delete(
        `archive/${selectedArchive.id}`
      );
      setSelectedArchive(null);
      fetchArchive();
    } catch (err) {
      console.log(err);
      setErrorMessage("Error deleted:", err.message);
    }
  };

  const handleDelete = (archive) => {
    setSelectedArchive(archive);
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
  const handleClose = () => {
    setSelectedArchive(null);
    setShowEditModal(false);
    setShowRecomindationModal(false);
  };

  const handleEdit = (archive) => {
    setSelectedArchiveEdit(archive);
    setShowEditModal(true);
  };

  const handleRecomindationModal = (recomindation) => {
    setSelectedRecomindation(recomindation);
    setShowRecomindationModal(true);
  };

  return (
    <>
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
      <Modal
        show={selectedArchive !== null}
        onHide={() => setSelectedArchive(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Archive</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the Archive?</p>
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
            onClick={() => setSelectedArchive(null)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRecomindationModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recomindation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecomindation && (
            <>
              {selectedRecomindation.title ? (
                <p>Title: {selectedRecomindation.title}</p>
              ) : null}
              {selectedRecomindation.currency ? (
                <p>Currency: {selectedRecomindation.currency}</p>
              ) : null}
              {selectedRecomindation.desc ? (
                <p>
                  Description:{" "}
                  {selectedRecomindation.desc.split("\n").map((item, index) => (
                    <div key={index}>
                      {item}
                      <br />
                    </div>
                  ))}
                </p>
              ) : null}
              {selectedRecomindation.entry_price ? (
                <p>Entry Price: {selectedRecomindation.entry_price}</p>
              ) : null}
              {selectedRecomindation.stop_price ? (
                <p>Stop Price: {selectedRecomindation.stop_price}</p>
              ) : null}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
              <th>desc</th>
              <th>title</th>
              {/* <th>plan</th> */}
              <th>recommendation</th>
              <th>Archived by</th>
              <th style={{ width: "12rem", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {archives.length > 0
              ? archives.map((archive, index) => (
                  <tr key={archive.id}>
                    <td>{index + 1}</td>
                    <td>{archive.desc}</td>
                    <td>{archive.title}</td>
                    {/* <td>{archive.plan2}</td> */}
                    <td>
                      {archive.recomindation ? (
                        <Button
                          variant="link"
                          style={{ color: "#007aff" }}
                          onClick={() =>
                            handleRecomindationModal(archive.recomindation)
                          }
                        >
                          {archive.recomindation.title}
                        </Button>
                      ) : (
                        "Not found"
                      )}
                    </td>
                    <td>{archive.user ? archive.user.name : "Not found"}</td>
                    <td>
                      <DropdownButton
                        as={ButtonGroup}
                        title="Actions"
                        id="dropdown-button-dark-example1"
                        menuVariant="dark"
                      >
                        <Dropdown.Item
                          className="flex justify-center hover:text-green-500"
                          size="sm"
                          onClick={() => handleEdit(archive)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="hover:text-red-500 flex justify-center"
                          variant="danger"
                          onClick={() => handleDelete(archive)}
                          style={{ margin: "2px" }}
                        >
                          Delete
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      )}

      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Archive</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArchiveEdit && <EditArchive Archive={selectedArchiveEdit} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";
import AddGlobelPoll from "./AddGlobelPoll";
import { EditGlobelPoll } from "./EditGlobelPoll";

let GlobelPoll = () => {
  const [plans, setPlans] = useState([]);
  // const [adminPlans, setAdminPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [showDetails, setShowDetails] = useState(false);
  // const [userDetails, setUserDetails] = useState(null);
  const [state, setState] = useState([]);
  // const [user, setUser] = useState("");
  const [selectedPlanDelete, setSelectedPlanDelete] = useState(null);

  useEffect(() => {
    fetchPusher_me();
    fetchPlans();
  }, []);
  const fetchPusher_me = async () => {
    try {
      const response = await axiosClientF.post("me");
      setState(response.data.user.state);
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
  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("globel_poll");
      setPlans(response.data);
      console.log(response.data);
      if (window.location.search.includes("success")) {
        setSuccessMessage("تم الإضافة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("update")) {
        setSuccessMessage("تم التعديل بنجاح");
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
        // fetchPlans2();
        // setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  // const fetchPlans2 = async () => {
  //   try {
  //     const response = await axiosClient.get("adminPlan");
  //     setAdminPlans(response.data.data);
  //   } catch (err) {
  //     if (err.message == "Network Error") {
  //       setErrorMessage(`الانترنت لا يعمل`);
  //     } else if (err.message == "Request failed with status code 404") {
  //       setErrorMessage(`قريبأ ستعمل`);
  //     } else if (err.message == "Request failed with status code 500") {
  //       setErrorMessage(`لا استطيع الوصول للسيرفر`);
  //     } else {
  //       setErrorMessage(`Error fetching recommendation : ${err.message}`);
  //     }
  //   }
  // };

  const handleDeleteConfirm = async () => {
    try {
      await axiosClient.delete(`globel_poll/${selectedPlanDelete.id}`);
      setSuccessMessage("تم حذف الخطة بنجاح");
    } catch (error) {
      setErrorMessage("Error deleting globelPoll");
    }
    setSelectedPlanDelete(null);
    fetchPlans();
  };

  const handleDelete = (globelPoll) => {
    setSelectedPlanDelete(globelPoll);
  };

  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedGlobelPoll, setGlobelPoll] = useState(null);

  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);

  const handleShow = (globelPoll) => {
    setGlobelPoll(globelPoll);
    setShow(true);
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
    setShow(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // const handleShowDetails = (globelPoll) => {
  //   setShowDetails(true);
  //   setUserDetails(globelPoll.plan_desc);
  // };
  // const handleCloseDetails = () => {
  //   setShowDetails(false);
  //   setUserDetails(null);
  // };
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
          <Modal.Title>Add Globel Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddGlobelPoll
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
          <Modal.Title>Delete Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the Plan?</p>
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
      {/* <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>show Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userDetails
            ? userDetails.map((desc, index) => (
                <div key={desc.id} className="mb-3">
                  <>{index + 1}- </>
                  {desc.desc}
                  <br />
                </div>
              ))
            : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      {state === "support" ? null : plans ? (
        plans.length > 0 ? (
          <Button onClick={handleShowCreate}>Add Globel Poll</Button>
        ) : null
      ) : null}

      {loading ? (
        // <Facebook
        //   height={260}
        //   width={1200}
        //   speed={2}
        //   backgroundColor={"#333"}
        //   foregroundColor={"#999"}
        //   // viewBox="0 0 400 70"
        // />
        <div className="mt-[8rem]">
    {Array(10)
      .fill("")
      .map((e, i) => (
        <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </div>
      ) : (
        <div className="table-responsive min-h-[100vh]">
          <table className="table table-borderless  ">
            <thead>
              <tr>
                <th>#</th>
                <th>النسبة</th>
                <th>الجيل</th>
                <th>التفاصيل</th>
                {state === "super_admin" ? (
                  plans ? (
                    plans.length > 0 ? (
                      <th style={{ width: "12rem", textAlign: "center" }}>
                        Action
                      </th>
                    ) : null
                  ) : null
                ) : null}
              </tr>
            </thead>
            <tbody>
              {plans ? (
                plans.length > 0 ? (
                  plans.slice().reverse().map((globelPoll, index) => (
                    <tr key={globelPoll.id}>
                      <td>{index + 1}</td>
                      <td>{globelPoll.percentage}</td>
                      <td>
                        {globelPoll.percentage_rank}
                      </td>
                      <td>
                        {globelPoll.details}
                      </td>
                      {state === "super_admin" ? (
                        <td>
                          <DropdownButton
                            as={ButtonGroup}
                            title="Actions"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            <Dropdown.Item
                              className="flex justify-center hover:text-green-500"
                              index={globelPoll.id}
                              onClick={() => handleShow(globelPoll)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="hover:text-red-500 flex justify-center"
                              onClick={() => handleDelete(globelPoll)}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      ) : null}
                    </tr>
                  ))
                )  : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No data
                  </td>
                </tr>
              )
              ) : null}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Globel Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGlobelPoll && <EditGlobelPoll globelPoll={selectedGlobelPoll} />}
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

export default GlobelPoll;

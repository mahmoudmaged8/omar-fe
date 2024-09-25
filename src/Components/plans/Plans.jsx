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
import AddPlan from "./AddPlan";
import EditPlan from "./EditPlan";

let Plans = () => {
  const [plans, setPlans] = useState([]);
  const [adminPlans, setAdminPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [state, setState] = useState([]);
  // const [user, setUser] = useState("");
  const [selectedPlanDelete, setSelectedPlanDelete] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchPusher_me();
    fetchPlans();
  }, []);
  const fetchPusher_me = async () => {
    try {
      const response = await axiosClientF.post("me");
      setState(response.data.user.state);
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
  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("plan");
      setPlans(response.data.data);
      if (window.location.search.includes("success")) {
        setSuccessMessage("تم إضافة الخطة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("update")) {
        setSuccessMessage("تم تغيير الخطة بنجاح");
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
        fetchPlans2();
        // setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchPlans2 = async () => {
    try {
      const response = await axiosClient.get("adminPlan");
      setAdminPlans(response.data.data);
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

  const handleDeleteConfirm = async () => {
    try {
      await axiosClient.delete(`plan/${selectedPlanDelete.id}`);
      setSuccessMessage("تم حذف الخطة بنجاح");
    } catch (error) {
      setErrorMessage("Error deleting plan");
    }
    setSelectedPlanDelete(null);
    fetchPlans();
  };

  const handleDelete = (plan) => {
    setSelectedPlanDelete(plan);
  };

  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);

  const handleShow = (plan) => {
    setSelectedPlan(plan);
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

  const handleShowDetails = (plan) => {
    setShowDetails(true);
    setUserDetails(plan.plan_desc);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
    setUserDetails(null);
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
          <Modal.Title>Add Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPlan
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
      <Modal show={showDetails} onHide={handleCloseDetails} centered>
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
      </Modal>
      {state === "support" ? null : plans ? (
        plans.length > 0 ? (
          <Button onClick={handleShowCreate}>Add Plans</Button>
        ) : null
      ) : null}

      {loading && !id ? (
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
                <th>الإسم</th>
                <th>النسبة من الجيل الأول</th>
                <th>النسبة من الجيل الثاني</th>
                <th>النسبة من الجيل الثالث</th>
                <th>التفاصيل</th>
                <th>الخصم</th>
                <th>عدد البوتات المتاحة</th>
                {/* <th>Chat</th> */}
                <th>السعر</th>
                <th>قناة التليجرام</th>
                {state === "super_admin" && id != "682" ? (
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
                  plans.map((plan, index) => (
                    <tr key={plan.id}>
                      <td>{index + 1}</td>
                      <td>{plan.name}</td>
                      <td>
                        {plan.percentage1 > 0 ? `${plan.percentage1}%` : "0"}
                      </td>
                      <td>
                        {plan.percentage2 > 0 ? `${plan.percentage2}%` : "0"}
                      </td>
                      <td>
                        {plan.percentage3 > 0 ? `${plan.percentage3}%` : "0"}
                      </td>
                      <td>
                        {plan.plan_desc ? (
                          plan.plan_desc.length > 0 ? (
                            <a href="#" onClick={() => handleShowDetails(plan)}>
                              التفاصيل
                            </a>
                          ) : //  plan.plan_desc.map((desc, index) => <div key={desc.id} className='mb-3'><>{index+1}- </>{desc.desc}<br/></div>)
                          null
                        ) : null}
                      </td>
                      <td>{plan.discount ? plan.discount : 0}</td>
                      <td>{plan.number_bot}</td>
                   {/* <td>
                      {
                        <a
                          key={plan.id}
                          href={`/dashboard/groups?plan=${plan.nameChannel}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {plan.name}
                        </a>
                      }
                    </td>  */}
                     {/* <td>
                    <a href={`/dashboard/groups?plan=${plan.nameChannel}`} target="_blank" rel="noopener noreferrer">
                      {plan.name}
                    </a>
                  </td>  */}
                      <td>{plan.price > 0 ? `$${plan.price}` : "Free"}</td>
                      <td>
                        {plan.telegram_groups
                          ? plan.telegram_groups.length > 0
                            ? plan.telegram_groups.map(
                                (title) => title.title + "   "
                              )
                            : "No Channel"
                          : "No Channel"}
                      </td>
                      {state === "super_admin" && id != "682" ? (
                        <td>
                          <DropdownButton
                            as={ButtonGroup}
                            title="Actions"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            <Dropdown.Item
                              className="flex justify-center hover:text-green-500"
                              index={plan.id}
                              onClick={() => handleShow(plan)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="hover:text-red-500 flex justify-center"
                              onClick={() => handleDelete(plan)}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      ) : null}
                    </tr>
                  ))
                ) : adminPlans ? (
                  adminPlans.length > 0 ? (
                    adminPlans.map((plan, index) => (
                      <tr key={plan.id}>
                        <td>{index + 1}</td>
                        <td>{plan.name}</td>
                        <td>
                          {plan.percentage1 > 0 ? `${plan.percentage1}%` : "0"}
                        </td>
                        <td>
                          {plan.percentage2 > 0 ? `${plan.percentage2}%` : "0"}
                        </td>
                        <td>
                          {plan.percentage3 > 0 ? `${plan.percentage3}%` : "0"}
                        </td>
                        <td>
                          {plan.plan_desc ? (
                            plan.plan_desc.length > 0 ? (
                              <a
                                href="#"
                                onClick={() => handleShowDetails(plan)}
                              >
                                Description
                              </a>
                            ) : //  plan.plan_desc.map((desc, index) => <div key={desc.id} className='mb-3'><>{index+1}- </>{desc.desc}<br/></div>)
                            null
                          ) : null}
                        </td>
                        <td>{plan.discount ? plan.discount : 0}</td>
                        <td>{plan.number_bot}</td>
                        <td>
                          {
                            <a
                              key={plan.id}
                              href={`/dashboard/groups?plan=${plan.nameChannel}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {plan.name}
                            </a>
                          }
                        </td>
                        {/* <td>
                    <a href={`/dashboard/groups?plan=${plan.nameChannel}`} target="_blank" rel="noopener noreferrer">
                      {plan.name}
                    </a>
                  </td> */}
                        <td>{plan.price > 0 ? `$${plan.price}` : "Free"}</td>
                        <td>
                          {plan.telegram_groups
                            ? plan.telegram_groups.length > 0
                              ? plan.telegram_groups.map(
                                  (title) => title.title + "   "
                                )
                              : "No Channel"
                            : "No Channel"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No data
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No data
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlan && <EditPlan plan={selectedPlan} />}
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

export default Plans;

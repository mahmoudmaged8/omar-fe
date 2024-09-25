/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
} from "react-bootstrap";
// import * as XLSX from 'xlsx';
import * as XLSX from 'https://unpkg.com/xlsx/xlsx.mjs';
import ContentLoader, { Facebook } from "react-content-loader";
import Select from "react-select";
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";
import CustomPagination from "../Pagination";
import AddBotForNotification from "./AddBotForNotification";
import AddBotForUser from "./AddBotForUser";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import UserDetailsModalBody from "./UserDetailsModalBody";

export default function User() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [users, setUser] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showComingDetails, setShowComingDetails] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [usersSellCurrency, setUsersSellCurrency] = useState(null);
  const [userId, setUserId] = useState(null);
  const [usersCurrency, setUsersCurrency] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [usersDetails, setUsersDetails] = useState(null);
  const [usersDetailsFather, setUsersDetailsFather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showPanModal, setShowPanModal] = useState(false);
  const [confirmCurrency, setConfirmCurrency] = useState(false);
  const [selectedUserForPan, setSelectedUserForPan] = useState(null);
  const [showCreateBot, setShowCreateBot] = useState(false);
  const [showCreateNotification, setShowCreateNotification] = useState(false);
  const [selectedUserForBot, setSelectedUserForBot] = useState(null);
  const [selectedUserForNotification, setSelectedUserForNotification] = useState(null);
 const [selectedDate, setSelectedDate] = useState("");

  const handleCloseCreateBot = () => setShowCreateBot(false);
  const handleCloseCreateNotification = () => setShowCreateNotification(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);
  const [selectedPercentage, setSelectedPercentage] = useState('100');
  // const [finalPercentage, setFinalPercentage] = useState(null);
  const [usersPerPage, setUsersPerPage] = useState(null);
  // const [total, setTotal] = useState(null);
  const [state, setState] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [myCurrentPage, setMyCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  // id
  const [id, setId] = useState(null);
  // const [usersPerPage] = useState(50);
  const topRef = useRef(null);
  useEffect(() => {
    fetchUser();
    fetchPlans2();
    fetchMe();
  }, []);
  useEffect(() => {
    // Call handleSearch when selectedPlan changes
    handleSearch();
  }, [selectedPlan]);
  const fetchMe = async () => {
    try {
      const response = await axiosClientF.post("me");
      setState(response.data.user.state);
      setId(response.data.user.id);
      // console.log(response.data.user.state);
    } catch (err) {
      console.log(err);
      setErrorMessage("error", err.message);
    }
  };
  const fetchPlans2 = async () => {
    try {
      const response = await axiosClient.get("plan");
      // console.log(response.data.data);
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching plan : ${err.message}`);
      }
      fetchPlans();
    }
  };
  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("adminPlan");
      setPlans(response.data.data);
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching Users : ${err.message}`);
      }
    }
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    ? users.slice(indexOfFirstUser, indexOfLastUser)
    : users;
  // const currentUsersSearch = searchResults ? searchResults.slice(indexOfFirstUser, indexOfLastUser): searchResults;
  const handlePageChange = async (pageNumber) => {
    console.log(pageNumber);
    try {
      const response = await axiosClient.post(`get_user`, {
        state: "user",
        page: pageNumber,
      });
      // const response = await axiosClient.get(`get_user/?state=user`);
      // console.log(response.data.data);
      setUser(response.data.data);
      console.log(response.data);
      setUsersPerPage(response.data.data.length);
      //عدد الاجمالي
      // setTotal(response.data.meta.total);
      //عدد الصفحات
      setMyCurrentPage(response.data.meta.current_page);
      //الصفحة التالية
      // setNextPage(response.data.meta.next_page);
      //الصفحة السابقة
      // setPreviousPage(response.data.meta.previous_page);
      setLastPage(response.data.meta.last_page);
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching User : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
    setCurrentPage(1);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setShow(false);
    setSuccessMessage("");
    setErrorMessage("");
  };
  const handlePercentageChange = (event) => {
    // console.log(usersSellCurrency.free/100*event.target.value);
    setSelectedPercentage(event.target.value);
    // setFinalPercentage(usersSellCurrency.free/100*event.target.value);
  };
  const handleShowDetails = async (user) => {
    try {
      setShowDetails(true);
      const response = await axiosClient.get(`User/${user.id}`);
      setUserDetails(response.data.data);
      // console.log(response.data);
      // setShowDetails(true);
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
  // const handleShowDetailsAfiliate = async (user) => {
  //   window.location.href = `/dashboard/userAfiliate?id=${user.id}`;
  // };
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };
  const handleConfirmPan = (user) => {
    setSelectedUserForPan(user);
    setShowPanModal(true);
  };
  const handleConfirmBot = (user) => {
    setSelectedUserForBot(user);
    setShowCreateBot(true);
  };
  const handleConfirmNotification = (user) => {
    setSelectedUserForNotification(user);
    setShowCreateNotification(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setUserDetails(null);
  };
  const handleCommingCloseDetails = () => {
    setShowComingDetails(false);
    setUsersDetails(null);
  };
  const handleCurrencyCloseDetails = () => {
    setShowCurrency(false);
    setUsersCurrency(null);
    setUserId(null);
  };
  const handleConfirmCurrencyCloseDetails = () => {
    setConfirmCurrency(false);
    setUsersSellCurrency(null);
    // setUserId(null);
    setShowCurrency(true);
    setSelectedPercentage("100");
  };
  const setConfirmSellCurrency = async (user,userId) => {
    setUsersSellCurrency(user);
    setUserId(userId);
    setShowCurrency(false);
    setConfirmCurrency(true);

  };
  const setSellCurrency = async (user,userId) => {
    // console.log(user.asset);
    // console.log(userId);
    // console.log(selectedPercentage);
    // console.log(usersSellCurrency.free/100*selectedPercentage);
    const ticker = {
      symbol: user.asset + "USDT",
      quantity: usersSellCurrency.free/100*selectedPercentage,
      email: userId,
    };
    console.log(ticker);
    try {
      await axiosClient.post("sellNow", ticker).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          window.location.href = "/dashboard/users?Buy=1";
        }
        if (res.data.success == false) {
          setErrorMessage(res.data.message);
          console.log(res.data);
        }
      });
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  };
  const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(searchResults.length > 0 ?searchResults  :users);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "UsersData");
  XLSX.writeFile(wb, "UsersData.xlsx");
};

  const fetchUser = async () => {
    try {
      const response = await axiosClient.post(`get_user`, {
        state: "user",
      });
      // const response = await axiosClient.get(`get_user/?state=user`);
      // console.log(response.data.data);
      setUser(response.data.data);
      console.log(response.data);
      setUsersPerPage(response.data.data.length);
      //عدد الاجمالي
      // setTotal(response.data.meta.total);
      //عدد الصفحات
      setCurrentPage(response.data.meta.current_page);
      //الصفحة التالية
      // setNextPage(response.data.meta.next_page);
      //الصفحة السابقة
      // setPreviousPage(response.data.meta.previous_page);
      setLastPage(response.data.meta.last_page);
      if (window.location.search.includes("update")) {
        setSuccessMessage("تم تحديث المستخدم بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("added")) {
        setSuccessMessage("تم اضافة المستخدم بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      }else if (window.location.search.includes("Buy")) {
        setSuccessMessage("تم بيع العملة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      }else if (window.location.search.includes("notfi")) {
        setSuccessMessage("تم ارسال الاشعار بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching User : ${err.message}`);
      }
    } finally {
      User;
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`User/${id}`);
      setUser(users.filter((user) => user.id !== id));
      setSuccessMessage(response.data.Massage);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Failed to delete the user", err);
      setSuccessMessage("");
      console.log(err);
    }
  };
  const handlePan = async (id) => {
    try {
      const response = await axiosClient.post(`banned`, { user_id: id });
      setUser(users.filter((user) => user.id !== id));
      setSuccessMessage(response.data.Massage);
      setErrorMessage("");
      setShowPanModal(false);
    } catch (err) {
      setErrorMessage("Failed to delete the user", err);
      setSuccessMessage("");
      console.log(err);
    }
  };

  const handleConfirmDelete = (id) => {
    setSelectedUser(id);
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setSelectedUser(null);
    setConfirmDelete(false);
  };
  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchQuery.trim() !== "") {
        // Perform search with the provided query and selected plan
        const response = await axiosClient.get(`search/${searchQuery}`);
        setSearchResults(response.data);
        setUser("");
        console.log(response.data);
      } else if (selectedPlan !== null) {
        // Perform search with the provided query and selected plan
        const response = await axiosClient.get(
          `selectUserFromPlan/${selectedPlan}`
        );
        setSearchResults(response.data);
        setUser("");
        console.log(response.data);
      } else if (searchQuery.trim() === "" && selectedPlan == null) {
        setSearchResults(null);
        const response = await axiosClient.post(`get_user`, {
          state: "user",
        });
        // const response = await axiosClient.get("get_user/user");
        setUser(response.data.data);
        // console.log(response.data);
      }
    } catch (err) {
      console.log(err);
      // console.log(err.message);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching User : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleShowUserDetails = async (userDetails) => {
    setLoadingDetails(true);
    setUsersDetailsFather(null);
    try {
      setShowDetails(false);
      setShowComingDetails(true);
      if (userDetails.affiliate_code) {
        const response = await axiosClient.get(
          `get_all_subscrib/${userDetails.affiliate_code}`
        );
        setUsersDetails(response.data.data);
        console.log(response.data.data);
        setShowDetails(false);
      }
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching details : ${err.message}`);
      }
    } finally {
      setLoadingDetails(false);
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
    } finally {
      setLoadingDetails(false);
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
  const handleShowCurrency = async (userDetails) => {
    console.log(userDetails);
    setUserId(userDetails.email);
    try {
      setShowDetails(false);
      setShowCurrency(true);
      
      const response = await axiosClient.post(`getallcurrency`, {
        email: userDetails.email,
      });
      if (!response.data.success) {
        setErrorMessage(response.data.message);
      } else {
        setUsersCurrency(response.data.message);
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
const handleDateChange = async (e) => {
    setSelectedDate(e.target.value);
    if (e.target.value === "") {
      fetchUser();
    } else {
      try {
        const response = await axiosClient.post("userByDate", {
          date: e.target.value,
        });
        setSearchResults(response.data);
        if (response.data.meta == null) {
          setLastPage(1);
          setCurrentPage(1);
          // setNextPage(null);
          setUsersPerPage(null);
        }
        console.log(response.data);
        console.log(response);
      } catch (err) {
        if (err.message == "Network Error") {
          setErrorMessage(`الانترنت لا يعمل`);
        } else if (err.message == "Request failed with status code 500") {
          setErrorMessage(`لا استطيع الوصول للسيرفر`);
        } else {
          console.log(err);
          // setErrorMessage(`Error fetching recommendation : ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const filteredPlans = plans.filter((plan) => plan.id !== 7);
  return (
    <>
      <Modal show={showPanModal} onHide={() => setShowPanModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ban Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to perform pan action on user: </p>
          <p>{selectedUserForPan?.name}؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPanModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // Perform pan action here
              handlePan(selectedUserForPan.id);
            }}
          >
            Confirm ban
          </Button>
        </Modal.Footer>
      </Modal>

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
      
      <Modal show={showCreateNotification} onHide={handleCloseCreateNotification}>
        <Modal.Header closeButton>
          <Modal.Title>Create Notification for User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUserForNotification && (
            <AddBotForNotification
              user={selectedUserForNotification}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateNotification}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCreateBot} onHide={handleCloseCreateBot}>
        <Modal.Header closeButton>
          <Modal.Title>Create Bot for User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUserForBot && (
            <AddBotForUser
              user={selectedUserForBot}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateBot}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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

      <Modal show={showDetails} onHide={handleCloseDetails}  centered>
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
          {loadingDetails ? 
            <Facebook/>:
            <>
          <p className="text-center text-lg">جاء من خلال</p>
          {usersDetailsFather && usersDetailsFather.length > 0 ? (
            <>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {usersDetailsFather.map((user, index) => (
                    <tr key={user.id}>
                      <td scope="row">{index + 1}</td>
                      <td>{user.name}</td>
                    </tr>
                  ))}
              
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
                        {/* {user.number_of_user > 0 ? ( */}
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
                        {/* ) : ( */}
                          {/* user.number_of_user */}
                        {/* )} */}
                      </td>
                    </tr>
                  ))}
          
                </tbody>
              </table>
            </>
          )}
          </>
              }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCommingCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCurrency} onHide={handleCurrencyCloseDetails} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            
            عملات في بيناس
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
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usersCurrency && (
            <>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">اسم العملة</th>
                    <th scope="col">عدد العملة</th>
                    {state == "super_admin" && id != "682" ? (
                      <th scope="col">بيع</th>
                    ) : null}
                    
                    {/* <th scope="col">Number Of User</th> */}
                  </tr>
                </thead>
                <tbody>
                  {usersCurrency
                    .filter((user) => user.free >= 1)
                    .map((user, index) => (
                      <tr key={index + 1}>
                        <td scope="row">{index + 1}</td>
                        <td>{user.asset}</td>
                        <td>{user.free}</td>
                        <td>
                        
                          {state == "super_admin" && id != "682" && user.asset != "USDT" ? (
                            <Button
                              variant="primary"
                              onClick={() => setConfirmSellCurrency(user,userId)}
                            >
                              بيع
                            </Button>
                          ) : null}
                        </td>
                        {/* <td>{user.number_of_user}</td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCurrencyCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={confirmCurrency} onHide={handleConfirmCurrencyCloseDetails} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          عملات في بيناس
          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage('')}
              style={{ width: 'max-content' }}
              dismissible
            >
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert
              variant="danger"
              onClose={() => setErrorMessage('')}
              style={{ width: 'max-content' }}
              dismissible
            >
              {errorMessage}
            </Alert>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-center">
        <h3>هل أنت متأكد أنك تريد بيع عملة {usersSellCurrency ? usersSellCurrency.asset : ''} ؟</h3>
        <p>{usersSellCurrency&& selectedPercentage? usersSellCurrency.free/100*selectedPercentage : ''}</p>
        <Form.Group className="w-fit" >
          <Form.Check
            type="radio"
            label="50%"
            value="50"
            checked={selectedPercentage === '50'}
            onChange={handlePercentageChange}
          />
          <Form.Check
            type="radio"
            label="100%"
            value="100"
            checked={selectedPercentage === '100'}
            onChange={handlePercentageChange}
          />
        </Form.Group>

        <Button onClick={() => setSellCurrency(usersSellCurrency, userId)}>
          Confirm
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleConfirmCurrencyCloseDetails}>
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
      <div
        className="d-flex flex-row-reverse justify-content-between mt-3 mb-1"
        ref={topRef}
      >
        <div className="d-flex flex-row">
          <Button onClick={exportToExcel} variant="success" style={{width: "20rem",}}>Export to Excel</Button>
            <Form.Control
                type="date"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
                style={{
                  width: "15rem",
                  backgroundColor: "black",
                  color: "white",
                  colorScheme: "dark",
                  marginLeft: "1rem",

                }}
                // onClose={handleDateChangeoff}
              />
          {searchQuery ? null : (
            <Select
              options={
                filteredPlans
                  ? filteredPlans.map((plan) => ({
                      value: plan.id,
                      label: plan.name,
                    }))
                  : null
              }
              className="my-react-select-container w-100 ml-2"
            classNamePrefix="my-react-select"
              isClearable
              isSearchable
              placeholder="Select plan"
              onChange={(selectedOption) => {
                setSelectedPlan(selectedOption ? selectedOption.value : null);
              }}
            />
          )}
          <div className="inputs-container">
            <input
              type="text"
              className="inputs text-black"
              placeholder="Search..."
              // name="text"
              value={searchQuery}
              onKeyUp={handleSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon"
            >
              <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <rect fill="white"></rect>{" "}
                <path
                  d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>{" "}
              </g>
            </svg>
          </div>
          
        </div>
        {state == "super_admin" && id != "682" ? (
          <Button onClick={handleShowCreate}>Add User</Button>
        ) : null}
        {/* <Button onClick={handleShowCreate}>Add User</Button> */}
      </div>
      {loading && !id ? (
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
            <table className="table table-borderless pr-2">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">العنوان البريدي</th>
                  <th scope="col">التابعين له</th>
                  <th scope="col">العملات</th>
                  <th scope="col">الباقة</th>
                  <th scope="col">البوت</th>
                  <th scope="col">تاريخ الشراء</th>
                  <th scope="col">تاريخ الإنتهاء</th>
                  <th scope="col">الرصيد</th>
                  <th scope="col">الرسوم</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    الأوامر
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults && searchResults.length > 0
                  ? searchResults.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td style={{ textAlign: "center" }}>
                          {/* {user.number_of_user != 0 ? ( */}
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
                          {/* ) : ( */}
                            {/* user.number_of_user */}
                          {/* )} */}
                        </td>
                        <td>
                          {user.binanceApiKey == "0"?null:
                            <Button
                            variant="primary"
                            size="sm"
                            className="ms-2"
                            onClick={() => {
                              setShowDetails(false);
                              handleShowCurrency(user);
                            }}
                          >
                          <i className="bi bi-currency-bitcoin"></i>  
                          </Button>
                          }
                        </td>
                        <td>
                          {user.plan && user.plan.name ? user.plan.name : "-"}
                        </td>
                        <td>
                          {user.is_bot > 0 ? (
                            <Button size="sm">
                              <i className="bi bi-check"></i>
                            </Button>
                          ) : (
                            <i className="bi bi-x"></i>
                          )}
                        </td>
                        <td>{user.start_plan ? user.start_plan : "-"}</td>
                        <td>{user.end_plan ? user.end_plan : "-"}</td>
                        <td>{user.money ? user.money : 0}</td>
                        <td>{user.number_points ? user.number_points : 0}</td>
                        <td style={{ textAlign: "center" }}>
                          <DropdownButton
                            as={ButtonGroup}
                            title="أوامر"
                            align={{ lg: "start" }}
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            {state == "super_admin" && id != "682" ? (
                              <Dropdown.Item
                                className="flex justify-center hover:text-sky-500"
                                eventKey="1"
                                onClick={() => handleShow(user)}
                              >
                                Edit
                              </Dropdown.Item>
                            ) : null}

                            <Dropdown.Item
                              eventKey="3"
                              className="flex justify-center hover:text-yellow-500"
                              onClick={() => handleShowDetails(user)}
                            >
                              تفاصيله
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="3"
                              className="flex justify-center hover:text-yellow-500"
                              onClick={() => handleShowDetailsWeb(user)}
                            >
                              تفاصيل المعاملات
                            </Dropdown.Item>
                            {id != "682" ? (
                            <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmNotification(user)}
                                >
                                  ارسال اشعار
                                </Dropdown.Item>
                            ) : null}
                            {state == "super_admin" && id != "682" && !confirmDelete && (
                              <Dropdown.Item
                                className="flex justify-center hover:text-red-500"
                                eventKey="2"
                                onClick={() => handleConfirmDelete(user.id)}
                              >
                                Delete
                              </Dropdown.Item>
                            )}
                            {state == "super_admin" && id != "682" &&
                              confirmDelete &&
                              selectedUser === user.id && (
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
                            {state == "super_admin" && id != "682" ? (
                              <>
                                <Dropdown.Item
                                  eventKey="4"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmPan(user)}
                                >
                                  ban
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmBot(user)}
                                >
                                  Add Bot
                                </Dropdown.Item>
                              
                              </>
                            ) : null}
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  : currentUsers && currentUsers.length > 0
                  ? currentUsers.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td style={{ textAlign: "center" }}>
                          {/* {user.number_of_user != 0 ? ( */}
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
                          {/* ) : ( */}
                            {/* user.number_of_user */}
                          {/* )} */}
                        </td>
                        <td>
                          {user.binanceApiKey === "0"?null:
                            <Button
                            variant="primary"
                            className="ms-2"
                            onClick={() => {
                              setShowDetails(false);
                              handleShowCurrency(user);
                            }}
                          >
                          <i className="bi bi-currency-bitcoin"></i>    
                          </Button>
                          }
                        </td>
                        <td>{user.plan ? user.plan.name : "No Plans"}</td>
                        <td>
                          {user.is_bot > 0 ? (
                            <Button size="sm">
                              <i className="bi bi-check"></i>
                            </Button>
                          ) : (
                            <i className="bi bi-x"></i>
                          )}
                        </td>
                        <td>{user.start_plan ? user.start_plan : "-"}</td>
                        <td>{user.end_plan ? user.end_plan : "-"}</td>
                        <td>{user.money ? user.money : 0}</td>
                        <td>{user.number_points ? user.number_points : 0}</td>
                        <td style={{ textAlign: "center" }}>
                          <DropdownButton
                            as={ButtonGroup}
                            title="أوامر"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            {state == "super_admin" && id != "682" ? (
                              <>
                                <Dropdown.Item
                                  className="flex justify-center hover:text-sky-500"
                                  eventKey="1"
                                  onClick={() => handleShow(user)}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="flex justify-center hover:text-red-500"
                                  eventKey="2"
                                  onClick={() => handleConfirmDelete(user.id)}
                                >
                                  Delete
                                </Dropdown.Item>
                              </>
                            ) : null}
                            {state == "super_admin" && id != "682" &&
                              confirmDelete &&
                              selectedUser === user.id && (
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
                              تفاصيله
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="3"
                              className="flex justify-center hover:text-yellow-500"
                              onClick={() => handleShowDetailsWeb(user)}
                            >
                              تفاصيل المعاملات
                            </Dropdown.Item>
                            {id != "682" ? (
                            <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmNotification(user)}
                                >
                                ارسال اشعار  
                                </Dropdown.Item>
                            ) : null}
                            {state == "super_admin" && id != "682" ? (
                              <>
                                <Dropdown.Item
                                  eventKey="4"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmPan(user)}
                                >
                                  ban
                                </Dropdown.Item>
                                <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmBot(user)}
                                >
                                  Create Bot
                                </Dropdown.Item>
                                
                              </>
                            ) : null}
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
          {searchResults && searchResults.length > 0 ? null : (
            <CustomPagination
              currentPage={myCurrentPage}
              lastPage={lastPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
}

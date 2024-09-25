/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";
import DateSelector from "./DateSelector";
// import Select from "react-select";

// import axiosClientPython from "../../axiosClientPython";

export default function UserBufferExpire() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [showCreate, setShowCreate] = useState(false);
  // const [amount, setAmount] = useState("");
  // const [allMoney, setAllMoney] = useState("");
  // const [percentage, setPercentage] = useState("");
  // const [firstData, setFirstData] = useState(null);
  // const [secondData, setSecondData] = useState(null);
  // const [showSecondDataModal, setShowSecondDataModal] = useState(false);
  // const [showDetailsModal, setShowDetailsModal] = useState(false);
  // const [detailsData, setDetailsData] = useState(null);
  // const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
  // const [sendMoneyData, setSendMoneyData] = useState(null);
  const [finalDate, setFinalDate] = useState("");

  const topRef = useRef(null);
  useEffect(() => {
    fetchUser();
    // fetchMoney();
  }, []);
  const [emailSearch, setemailSearch] = useState("");

  const handleConfirmReturnMoneyBuffer = async (e) => {
    const data = {
      user_id: e.user_id,
      buffer_id: e.buffer_id,
      start_subscrip: e.start_subscrip,
    };
    console.log(data);
    // setSuccessMessage("تم إعادة الاموال للمستخدم بنجاح");
    // window.location.href = `/buffer/userloges?id=${e.user_id}&successMoney=successMoney`;
    try {
      const response = await axiosClient.post(`return-money-buffer`, data);
      console.log(response.data.message);
      if (response.data.success) {
        window.location.href = `/buffer/userloges?id=${e.user_id}&successMoney=successMoney`;
      }
      setSuccessMessage("تم تحديث المستخدم بنجاح");
      // window.history.replaceState(null, "", window.location.pathname);
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else {
        setErrorMessage(`Error fetching User : ${err.message}`);
      }
    }
  };
  const fetchUser = async () => {
    try {
      const response = await axiosClient.post(`get-expire-buffer`);
      console.log(response.data.message);
      setUser(response.data.message);
      // console.log(response.data);
      if (window.location.search.includes("update")) {
        setSuccessMessage("تم تحديث المستخدم بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("added")) {
        setSuccessMessage("تم اضافة المستخدم بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("Buy")) {
        setSuccessMessage("تم بيع العملة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("notfi")) {
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
      // User;
      setLoading(false);
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
  const handleShowDetailsWeb = async (user) => {
    window.location.href = `/buffer/userloges?id=${user.user_id}`;
  };

  function reverseDate(dateString) {
    const [year, month] = dateString.split("-");
    return `${month}-${year}`;
  }
  const handleDateChange = async (e) => {
    // setSelectedDate(e.target.value);
    // setSelectedDate(e);
    // console.log(e.target.value.slice(5, 10));
    // console.log(e.target.value , 'Ayman');
    // const reversedDate = reverseDate(e.target.value);
    const reversedDate = e;

    if (e === "") {
      fetchUser();
    } else {
      try {
        const response = await axiosClient.post("get-expire-buffer", {
          // date: e.target.value.slice(5, 10),
          // date: e.target.value,
          date: reversedDate,
        });
        setSearchResults(response.data.message);
        // if (response.data.meta == null) {
        //   setLastPage(1);
        //   setCurrentPage(1);
        //   // setNextPage(null);
        //   setUsersPerPage(null);
        // }
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
  const handleEmailSearch = async (e) => {
    // setSelectedDate(e.target.value);
    // setSelectedDate(e);
    // console.log(e.target.value.slice(5, 10));
    // console.log(e.target.value , 'Ayman');
    // const reversedDate = reverseDate(e.target.value);

    if (e === "") {
      fetchUser();
    } else {
      try {
        const response = await axiosClient.post("get-expire-buffer", {
          // date: e.target.value.slice(5, 10),
          // date: e.target.value,
          date: finalDate,
          email : e
        });
        setSearchResults(response.data.message);
        // if (response.data.meta == null) {
        //   setLastPage(1);
        //   setCurrentPage(1);
        //   // setNextPage(null);
        //   setUsersPerPage(null);
        // }
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
  const totalAmount = users.reduce(
    (acc, currentUser) => acc + (currentUser.amount || 0),
    0
  );
  // const totalAmountPlans = users.reduce(
  //   (acc, currentUser) => acc + (currentUser.plan_price || 0),
  //   0
  // );
  const calculateTotalAmountPlans = () => {
    const uniqueEmails = new Set();
    return users.reduce((acc, user) => {
      if (!uniqueEmails.has(user.email)) {
        uniqueEmails.add(user.email);
        return acc + (user.plan_price || 0);
      }
      return acc;
    }, 0);
  };
  const totalAmountPlans = calculateTotalAmountPlans();
  const formatAsMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };
  //   const formatAsUSDT = (amount) => {
  //   return `${amount.toFixed(2)} USDT`; // Formats the number to two decimal places and appends "USDT"
  // };
  useEffect(() => {
    handleDateChange(finalDate);
  }, [finalDate]);
  useEffect(() => {
    handleEmailSearch(emailSearch);
  }, [emailSearch]);
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
      <div
        className="d-flex flex-row justify-content-between mt-3 mb-1 align-items-center"
        ref={topRef}
      >
        <div className="d-flex flex-row">
          <DateSelector setFinalDate={(e) => setFinalDate(e)} />
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="ابحث بالايميل"
              name="email"
              value={emailSearch}
              required
              onChange={(e) => setemailSearch(e.target.value)}
            />
          </InputGroup>
        </div>
        {totalAmount > 0 ? (
          <div>
            <h4 className="text-white">
              Total Amount: {formatAsMoney(totalAmount)}
            </h4>
          </div>
        ) : null}
        {totalAmountPlans > 0 ? (
          <div>
            <h4 className="text-white">
              Total plans: {formatAsMoney(totalAmountPlans)}
            </h4>
          </div>
        ) : null}
      </div>

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
            <table className="table table-borderless pr-2">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">اسم المستخدم</th>
                  <th scope="col">الايميل</th>
                  <th scope="col">تاريخ البدء</th>
                  <th scope="col">تاريخ الانتهاء</th>
                  <th scope="col">plan_id</th>
                  <th scope="col">buffer_id</th>
                  <th scope="col">الرصيد</th>
                  <th scope="col">الحالة</th>
                  {/* <th scope="col">نوع الجزنة</th> */}
                  <th scope="col" style={{ textAlign: "center" }}>
                    الأوامر
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults && searchResults.length > 0
                  ? searchResults
                      .slice()
                      .reverse()
                      .map((user, index) => (
                        <tr key={index + 1}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.username}</td>
                          <td>{user.user && user.user.email}</td>

                          <td style={{ textAlign: "center" }}>
                            {user.start_subscrip ? user.start_subscrip : "-"}
                          </td>
                          <td>{user.end_subscrip ? user.end_subscrip : "-"}</td>
                          <td>{user.plan_id}</td>
                          <td>{user.buffer_id}</td>
                          <td>{user.amount ? user.amount : 0}</td>
                          <td>{user.active == 1 ? "Active" : "Inactive"}</td>
                          {/* <td>{user.buffer ? user.buffer : "-"}</td> */}
                          <td style={{ textAlign: "center" }}>
                            <DropdownButton
                              as={ButtonGroup}
                              title="أوامر"
                              id="dropdown-button-dark-example1"
                              menuVariant="dark"
                            >
                              {/* <>
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
                          </> */}

                              {/* <Dropdown.Item
                          eventKey="3"
                          className="flex justify-center hover:text-yellow-500"
                          onClick={() => handleShowDetails(user)}
                        >
                          تفاصيله
                        </Dropdown.Item>*/}
                              <Dropdown.Item
                                eventKey="3"
                                className="flex justify-center hover:text-yellow-500"
                                onClick={() => handleShowDetailsWeb(user)}
                              >
                                تفاصيل المعاملات
                              </Dropdown.Item>
                              {user.active == 1 && (
                                <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() =>
                                    handleConfirmReturnMoneyBuffer(user)
                                  }
                                >
                                  اعادة الفلوس
                                </Dropdown.Item>
                              )}
                              {/* {id != "682" ? (
                        <Dropdown.Item
                              eventKey="5"
                              className="flex justify-center hover:text-green-500"
                              onClick={() => handleConfirmNotification(user)}
                            >
                            ارسال اشعار  
                            </Dropdown.Item>
                        ) : null} */}
                              {/* {state == "super_admin" && id != "682" ? (
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
                        ) : null} */}
                            </DropdownButton>
                          </td>
                        </tr>
                      ))
                  : users && users.length > 0
                  ? users
                      .slice()
                      .reverse()
                      .map((user, index) => (
                        <tr key={index + 1}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.username}</td>
                          <td>{user.user && user.user.email}</td>
                          <td style={{ textAlign: "center" }}>
                            {user.start_subscrip ? user.start_subscrip : "-"}
                          </td>
                          <td>{user.end_subscrip ? user.end_subscrip : "-"}</td>
                          <td>{user.plan_id}</td>
                          <td>{user.buffer_id}</td>
                          <td>{user.amount ? user.amount : 0}</td>
                          <td>{user.active == 1 ? "Active" : "Inactive"}</td>
                          {/* <td>{user.buffer ? user.buffer : "-"}</td> */}
                          <td style={{ textAlign: "center" }}>
                            <DropdownButton
                              as={ButtonGroup}
                              title="أوامر"
                              id="dropdown-button-dark-example1"
                              menuVariant="dark"
                            >
                              {/* <>
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
                              </> */}

                              {/* <Dropdown.Item
                              eventKey="3"
                              className="flex justify-center hover:text-yellow-500"
                              onClick={() => handleShowDetails(user)}
                            >
                              تفاصيله
                            </Dropdown.Item>*/}
                              <Dropdown.Item
                                eventKey="3"
                                className="flex justify-center hover:text-yellow-500"
                                onClick={() => handleShowDetailsWeb(user)}
                              >
                                تفاصيل المعاملات
                              </Dropdown.Item>
                              {user.active == 1 && (
                                <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() =>
                                    handleConfirmReturnMoneyBuffer(user)
                                  }
                                >
                                  اعادة الفلوس
                                </Dropdown.Item>
                              )}
                              {/* {id != "682" ? (
                            <Dropdown.Item
                                  eventKey="5"
                                  className="flex justify-center hover:text-green-500"
                                  onClick={() => handleConfirmNotification(user)}
                                >
                                ارسال اشعار  
                                </Dropdown.Item>
                            ) : null} */}
                              {/* {state == "super_admin" && id != "682" ? (
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
                            ) : null} */}
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

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";
// import Select from "react-select";

// import axiosClientPython from "../../axiosClientPython";

export default function UserBufferUnActive() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
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

  const topRef = useRef(null);
  useEffect(() => {
    fetchUser();
    // fetchMoney();
  }, []);
  // const handleShowCreate = () => setShowCreate(true);
  // const handleCloseCreate = () => setShowCreate(false);

  // const filteredPlans = [
  //   {
  //     value: 1,
  //     label: "Buffer VIP1",
  //   },
  //   {
  //     value: 2,
  //     label: "Buffer VIP2",
  //   },
  //   {
  //     value: 3,
  //     label: "Buffer DIAMOND",
  //   },
  // ];

  // const handleConfirmReturnMoneyBuffer = async (e) => {
  //   const data = {
  //     user_id: e.user_id,
  //     buffer_id: e.buffer_id,
  //     start_subscrip: e.start_subscrip,
  //   };
  //   console.log(data);
  //   // setSuccessMessage("تم إعادة الاموال للمستخدم بنجاح");
  //   // window.location.href = `/buffer/userloges?id=${e.user_id}&successMoney=successMoney`;
  //   try {
  //     const response = await axiosClient.post(`return-money-buffer`, data);
  //     console.log(response.data.message);
  //     if (response.data.success) {
  //       window.location.href = `/buffer/userloges?id=${e.user_id}&successMoney=successMoney`;
  //     }
  //     setSuccessMessage("تم تحديث المستخدم بنجاح");
  //     // window.history.replaceState(null, "", window.location.pathname);
  //   } catch (err) {
  //     console.log(err);
  //     if (err.message == "Network Error") {
  //       setErrorMessage(`الانترنت لا يعمل`);
  //     } else {
  //       setErrorMessage(`Error fetching User : ${err.message}`);
  //     }
  //   }
  // };
  const fetchUser = async () => {
    try {
      const response = await axiosClient.post(`all-unActive-buffer`);
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
  // const fetchMoney = async () => {
  //   try {
  //     const response = await axiosClient.post(`all_mony_for_buffers`);
  //     console.log(response.data.message);
  //     setAllMoney(response.data.message);
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err);
  //     if (err.message == "Network Error") {
  //       setErrorMessage(`الانترنت لا يعمل`);
  //     } else {
  //       setErrorMessage(`Error fetching User : ${err.message}`);
  //     }
  //   } finally {
  //     // User;
  //     setLoading(false);
  //   }
  // };
  // const fetchUserSelected = async (id) => {
  //   console.log(id);
  //   try {
  //     const response = await axiosClient.post(`all_buffers_user`, {
  //       buffer_id: id,
  //     });
  //     console.log(response.data.data);
  //     setUser(response.data.data);
  //     console.log(response.data);
  //     if (window.location.search.includes("update")) {
  //       setSuccessMessage("تم تحديث المستخدم بنجاح");
  //       window.history.replaceState(null, "", window.location.pathname);
  //     } else if (window.location.search.includes("added")) {
  //       setSuccessMessage("تم اضافة المستخدم بنجاح");
  //       window.history.replaceState(null, "", window.location.pathname);
  //     } else if (window.location.search.includes("Buy")) {
  //       setSuccessMessage("تم بيع العملة بنجاح");
  //       window.history.replaceState(null, "", window.location.pathname);
  //     } else if (window.location.search.includes("notfi")) {
  //       setSuccessMessage("تم ارسال الاشعار بنجاح");
  //       window.history.replaceState(null, "", window.location.pathname);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     if (err.message == "Network Error") {
  //       setErrorMessage(`الانترنت لا يعمل`);
  //     } else {
  //       setErrorMessage(`Error fetching User : ${err.message}`);
  //     }
  //   } finally {
  //     // User;
  //     setLoading(false);
  //   }
  // };

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
  // const showCalculatedAmount = {totalAmount ?(percentage / 100) * totalAmount: 0};
  // const handleSubmitFirst = async (e) => {
  //   e.preventDefault(); // Prevent default form submission
  //   // setLoading(true); // Assuming you have a setLoading function to show loading state

  //   let payload = {};
  //   if (amount) {
  //     // If amount is filled, use it directly
  //     payload = { money: amount };
  //   } else if (percentage) {
  //     // If amount is empty, calculate based on percentage
  //     const calculatedAmount = (percentage / 100) * allMoney;
  //     payload = { money: calculatedAmount };
  //   } else {
  //     // Handle case where neither amount nor percentage is provided
  //     setErrorMessage("Please enter either an amount or a percentage.");
  //     setLoading(false);
  //     return;
  //   }

  //   // Here you can make your API call or whatever process you need with the payload
  //   console.log(payload);
  //   // Assuming axiosClient is your method of sending data to your backend
  //   try {
  //     const response = await axiosClient.post(
  //       "divit_precantage_buffer_index",
  //       payload
  //     );
  //     // Handle response
  //     console.log(response.data);
  //     setFirstData(response.data.message);
  //     console.log(firstData);
  //     // New request to get detailed data for the second modal
  //     const responseSecondData = await axiosClient.post(
  //       "divit_for_buffer"
  //     );
  //     setSecondData(responseSecondData.data.data); // Assuming you want to use firstData to store this
  //     console.log(responseSecondData.data.data);
  //     setShowSecondDataModal(true); // Open the second modal to show the results
  //   } catch (err) {
  //     console.log(err);
  //     setErrorMessage(`Error submitting data: ${err.message}`);
  //   } finally {
  //     // setLoading(false);
  //     handleCloseCreate(); // Close the modal
  //   }
  // };
  // const DetailsBuffer = async () => {
  //   // setShowSecondDataModal(false);
  //   try {
  //     // setLoading(true); // Show loading indicator
  //     const responseDetailsData = await axiosClient.post(
  //       "divite_for_user"
  //     );
  //     setDetailsData(responseDetailsData.data.data);
  //     console.log(responseDetailsData.data);
  //     setShowDetailsModal(true); // Show the modal after fetching data
  //   } catch (error) {
  //     console.error("Error fetching details data:", error);
  //     setErrorMessage("Error fetching details data.");
  //   } finally {
  //     // setLoading(false); // Hide loading indicator
  //   }
  // };

  // const sendMoney = async () => {
  //   setShowSecondDataModal(false);
  //   try {
  //     setLoading(true); // Show loading indicator
  //     const responseSendData = await axiosClient.post("push_profit_max");
  //     setSendMoneyData(responseSendData.data);
  //     setShowSendMoneyModal(true); // Show the modal after fetching data
  //   } catch (error) {
  //     console.error("Error sending money:", error);
  //     setErrorMessage("Error sending money.");
  //   } finally {
  //     setLoading(false); // Hide loading indicator
  //   }
  // };
  // const handleDateChange = async (e) => {
  //   setSelectedDate(e.target.value);
  //   console.log(e.target.value.slice(5, 10));
  //   console.log(e.target.value);
  //   if (e.target.value === "") {
  //     fetchUser();
  //   } else {
  //     try {
  //       const response = await axiosClient.post("get-expire-buffer", {
  //         date: e.target.value.slice(5, 10),
  //       });
  //       setSearchResults(response.data.message);
  //       // if (response.data.meta == null) {
  //       //   setLastPage(1);
  //       //   setCurrentPage(1);
  //       //   // setNextPage(null);
  //       //   setUsersPerPage(null);
  //       // }
  //       console.log(response.data);
  //       console.log(response);
  //     } catch (err) {
  //       if (err.message == "Network Error") {
  //         setErrorMessage(`الانترنت لا يعمل`);
  //       } else if (err.message == "Request failed with status code 500") {
  //         setErrorMessage(`لا استطيع الوصول للسيرفر`);
  //       } else {
  //         console.log(err);
  //         // setErrorMessage(`Error fetching recommendation : ${err.message}`);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };
  // const totalAmount = users.reduce(
  //   (acc, currentUser) => acc + (currentUser.amount || 0),
  //   0
  // );
  // const totalAmountPlans = users.reduce(
  //   (acc, currentUser) => acc + (currentUser.plan_price || 0),
  //   0
  // );
  // const calculateTotalAmountPlans = () => {
  //   const uniqueEmails = new Set();
  //   return users.reduce((acc, user) => {
  //     if (!uniqueEmails.has(user.email)) {
  //       uniqueEmails.add(user.email);
  //       return acc + (user.plan_price || 0);
  //     }
  //     return acc;
  //   }, 0);
  // };
  // const totalAmountPlans = calculateTotalAmountPlans();
  // const formatAsMoney = (amount) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //   }).format(amount);
  // };
  //   const formatAsUSDT = (amount) => {
  //   return `${amount.toFixed(2)} USDT`; // Formats the number to two decimal places and appends "USDT"
  // };
  return (
    <>
      {/* First modal for details data */}
      {/* <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Distribution of profits</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitFirst} className="sign-in-form">
            <div className="mb-3">
              <label htmlFor="amountInput" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="amountInput"
                name="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="percentageInput" className="form-label">
                Profit Percentage
              </label>
              <input
                type="number"
                className="form-control"
                id="percentageInput"
                name="percentage"
                placeholder="Enter percentage"
                step="0.01"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
            {/* Display the calculated amount based on the percentage */}
      {/*  {percentage && (
              <div className="mb-3">
                <strong>Price : </strong>
                {`${(percentage / 100) * allMoney} (Total : ${allMoney})`}
              </div>
            )}
            <Button variant="primary" type="submit">
              Next
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Second modal for details data */}
      {/*<Modal
        show={showSecondDataModal}
        onHide={() => setShowSecondDataModal(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Second Data Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Here you can format and display firstData as needed */}
      {/* <pre>{JSON.stringify(firstData, null, 2)}</pre> */}
      {/*  <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Total Money</th>
                <th>Buffer Name</th>
                <th>% from Total</th>
                <th>Money After Divide</th>
                <th>Is Active</th>
                <th>Count User</th>
                <th>After Divide on Count User</th>
                <th>% Buffer</th>
                <th>After % for 15 Days</th>
                <th>For Day</th>
              </tr>
            </thead>
            <tbody>
              {secondData &&
                secondData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.totle_money}</td>
                    <td>{data.buffer_name}</td>
                    <td>{data.precentage__from_totle}</td>
                    <td>{data.money_after_divite}</td>
                    <td>{data.is_active ? "Yes" : "No"}</td>
                    <td>{data.count_user}</td>
                    <td>{data.after_divite_on_count_user}</td>
                    <td>{data.precantage_buufer}</td>
                    <td>{data.after_diviate_precantage_for_15day}</td>
                    <td>{data.forday}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={DetailsBuffer}>
            تفاصيل
          </Button>
          <Button variant="secondary" onClick={sendMoney}>
            ارسال
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowSecondDataModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Details Modal */}
      {/*  <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Buffer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>User Name</th>
                <th>Buffer Name</th>
                <th>From Day</th>
                <th>Days Remaining</th>
                <th>Money for Day</th>
                <th>Money for 15 Days</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {detailsData &&
                detailsData.map((detail, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{detail.id}</td>
                    <td>{detail.username}</td>
                    <td>{detail.buffer_name}</td>
                    <td>{detail.from_day}</td>
                    <td>{detail.daysRemaining}</td>
                    <td>{detail.money_for_day}</td>
                    <td>{detail.mony_for_15day}</td>
                    <td>{detail.active == 1 ?<p style={{color: 'green'}}>Yes</p> : <p style={{color: 'red'}}>No</p> }</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Send Money Modal */}
      {/*  <Modal
        show={showSendMoneyModal}
        onHide={() => setShowSendMoneyModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Money Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display sendMoneyData here */}
      {/*  {sendMoneyData ? (
            <>
            <pre>تم تحويل الاموال بنجاح</pre>
          {/*  <pre>{JSON.stringify(sendMoneyData, null, 2)}</pre>  */}
      {/*  </>
          ): (
            <>
            <pre>لم يتم تحويل الاموال</pre>
            {/*  <pre>{JSON.stringify(sendMoneyData, null, 2)}</pre>  */}
      {/*    </>
          )}
        */}
      {/*  </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSendMoneyModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>*/}

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
        {/* <Button onClick={handleShowCreate}>Distribution of profits</Button> */}
        <div className="d-flex flex-row">
          {/* <Select
            options={filteredPlans}
            className="my-react-select-container w-100 ml-2"
            classNamePrefix="my-react-select"
            isClearable
            isSearchable
            placeholder="Select plan"
            onChange={(filteredPlans) => {
              fetchUserSelected(filteredPlans ? filteredPlans.value : null);
            }}
          /> */}
          {/* <Form.Control
            type="month"
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
          /> */}
        </div>
        {/* {totalAmount > 0 ? (
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
        ) : null} */}
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
                  <th scope="col">user_id</th>
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
                { users && users.length > 0
                  ? users.map((user, index) => (
                      <tr key={index + 1}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.username}</td>
                        <td>{user.user_id}</td>
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
                            {/* <Dropdown.Item
                              eventKey="5"
                              className="flex justify-center hover:text-green-500"
                              onClick={() =>
                                handleConfirmReturnMoneyBuffer(user)
                              }
                            >
                              اعادة الفلوس
                            </Dropdown.Item> */}
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

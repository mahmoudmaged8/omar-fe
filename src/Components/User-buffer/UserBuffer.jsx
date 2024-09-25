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
  Table,
} from "react-bootstrap";
import ContentLoader from "react-content-loader";
import Select from "react-select";
import axiosClient from "../../axiosClientOffline";
import formatNumber from "../../utils/utils ";
import AddBuffer from "./AddBuffer";
import axios from "axios";
// import axiosClientPython from "../../axiosClientPython";
import { API_BASE_URL } from "../../config";

export default function UserBuffer() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showCreateBuffer, setShowCreateBuffer] = useState(false);
  const [amount, setAmount] = useState("");
  const [allMoney, setAllMoney] = useState("");
  const [percentage, setPercentage] = useState("");
  const [firstData, setFirstData] = useState(null);
  const [secondData, setSecondData] = useState(null);
  const [showSecondDataModal, setShowSecondDataModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
  const [sendMoneyData, setSendMoneyData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const topRef = useRef(null);
  useEffect(() => {
    fetchUser();
    fetchMoney();
  }, []);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreateBuffer = () => setShowCreateBuffer(true);
  const handleCloseCreateBuffer = () => setShowCreateBuffer(false);

  const filteredPlans = [
    {
      value: 1,
      label: "Buffer VIP1",
    },
    {
      value: 2,
      label: "Buffer VIP2",
    },
    {
      value: 3,
      label: "Buffer DIAMOND",
    },
  ];
  const fetchUser = async () => {
    try {
      const response = await axiosClient.post(`all_buffers_user`);
      console.log(response.data.data);
      setUser(response.data.data);
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
  const fetchMoney = async () => {
    try {
      const response = await axiosClient.post(`all_mony_for_buffers`);
      console.log(response.data.message);
      setAllMoney(response.data.message);
      console.log(response.data);
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
  const fetchUserSelected = async (id) => {
    console.log(id);
    try {
      const response = await axiosClient.post(`all_buffers_user`, {
        buffer_id: id,
      });
      console.log(response.data.data);
      setUser(response.data.data);
      console.log(response.data);
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
  // const showCalculatedAmount = {totalAmount ?(percentage / 100) * totalAmount: 0};
  const handleSubmitFirst = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // setLoading(true); // Assuming you have a setLoading function to show loading state

    let payload = {};
    if (amount) {
      // If amount is filled, use it directly
      payload = { money: amount };
    } else if (percentage) {
      // If amount is empty, calculate based on percentage
      const calculatedAmount = (percentage / 100) * allMoney;
      payload = { money: calculatedAmount };
    } else {
      // Handle case where neither amount nor percentage is provided
      setErrorMessage("Please enter either an amount or a percentage.");
      setLoading(false);
      return;
    }

    // Here you can make your API call or whatever process you need with the payload
    console.log(payload);
    // Assuming axiosClient is your method of sending data to your backend
    try {
      const response = await axiosClient.post(
        "divit_precantage_buffer_index",
        payload
      );
      // Handle response
      console.log(response.data);
      setFirstData(response.data.message);
      console.log(firstData);
      // New request to get detailed data for the second modal
      const responseSecondData = await axiosClient.post("divit_for_buffer");
      setSecondData(responseSecondData.data.data); // Assuming you want to use firstData to store this
      console.log(responseSecondData.data.data);
      setShowSecondDataModal(true); // Open the second modal to show the results
    } catch (err) {
      console.log(err);
      setErrorMessage(`Error submitting data: ${err.message}`);
    } finally {
      // setLoading(false);
      handleCloseCreate(); // Close the modal
    }
  };
  const DetailsBuffer = async () => {
    // setShowSecondDataModal(false);
    try {
      // setLoading(true); // Show loading indicator
      const responseDetailsData = await axiosClient.post("divite_for_user");
      setDetailsData(responseDetailsData.data.data);
      console.log(responseDetailsData.data);
      setShowDetailsModal(true); // Show the modal after fetching data
    } catch (error) {
      console.error("Error fetching details data:", error);
      setErrorMessage("Error fetching details data.");
    } finally {
      // setLoading(false); // Hide loading indicator
    }
  };

  const sendMoney = async () => {
    setShowSecondDataModal(false);
    try {
      setLoading(true); // Show loading indicator
      const responseSendData = await axiosClient.post("push_profit_max");
      setSendMoneyData(responseSendData.data);
      setShowSendMoneyModal(true); // Show the modal after fetching data
    } catch (error) {
      console.error("Error sending money:", error);
      setErrorMessage("Error sending money.");
    } finally {
      setLoading(false); // Hide loading indicator
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
  const [modalData, setmodalData] = useState({
    email: "",
    buffer_id: "",
    start_subscrip: "",
    end_subscrip: "",
    amount: "",
    per_month: "",
  });
  const [modalType, setmodalType] = useState("");
  const handleOpenModalAsEdit = (user) => {
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    setmodalType("edit");
    setmodalData(user);
    handleShowCreateBuffer();
  };
  const [showDelModal, setshowDelModal] = useState(false);
  const handleOpenModalAsDelete = (user) => {
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    setmodalType("");
    setmodalData(user);
    setshowDelModal(true);
  };
  const handleOpenModalAsDeleteConfirm = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(
      API_BASE_URL + "/buffer/wifiBuffer/" + modalData.id,
      config
    );
    setshowDelModal(false);
    fetchUser();
    setSuccessMessage("تم حذف المستخدم بنجاح");
  };
  return (
    <>
      <Modal show={showDelModal} onHide={() => setshowDelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>delete Buffer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="relative p-4 text-center bg-wahite  rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="mb-4 text-gray-500 dark:text-gray-300">
              هل انت متاكد من حذف البيانات؟
            </p>
            <div className="flex justify-center items-center space-x-4" />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-between">
          <Button variant="danger" onClick={handleOpenModalAsDeleteConfirm}>
            نعم
          </Button>
          <Button variant="secondary" onClick={() => setshowDelModal(false)}>
            لا
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCreateBuffer} onHide={handleCloseCreateBuffer}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "edit" ? "Edit" : "Add"} Buffer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddBuffer
            handleCloseCreateBuffer={handleCloseCreateBuffer}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            users={"user"}
            fetchUser={fetchUser}
            modalType={modalType}
            modalData={modalData}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateBuffer}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* First modal for details data */}
      <Modal show={showCreate} onHide={handleCloseCreate}>
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
            {percentage && (
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
      </Modal>

      {/* Second modal for details data */}
      <Modal
        show={showSecondDataModal}
        onHide={() => setShowSecondDataModal(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Second Data Result</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" w-[70vw] overflow-y-auto ms-[-4vw]">
          {/* Here you can format and display firstData as needed */}
          {/* <pre>{JSON.stringify(firstData, null, 2)}</pre> */}
          <Table bordered>
            {/* <thead>
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
            </tbody> */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Total Money</th>
                {/* <th>Buffer Name</th> */}
                <th>% from Total</th>
                <th>Money After Divide</th>
                <th>Is Active</th>
                <th>Count User</th>
                <th>After Divide on Count User</th>
                <th>% per 1M</th>
                <th>After % per 1M</th>
                <th>For Day per 1M</th>
                <th>% per 3M</th>
                <th>After % per 3M</th>
                <th>For Day per 3M</th>
                <th>% per 6M</th>
                <th>After % per 6M</th>
                <th>For Day per 6M</th>
                <th>% per 12M</th>
                <th>After % per 12M</th>
                <th>For Day per 12M</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {secondData &&
                secondData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{formatNumber(data.totle_money ?? 0)}</td>
                    {/* <td>{data.buffer_name}</td> */}
                    <td>{data?.precentage__from_totle}</td>
                    <td>{formatNumber(data?.money_after_divite ?? 0)}</td>
                    <td>{data?.is_active ? "Yes" : "No"}</td>
                    <td>{formatNumber(data?.count_user ?? 0)}</td>
                    <td>
                      {formatNumber(data?.after_divite_on_count_user ?? 0)}
                    </td>
                    <td>{formatNumber(data?.precantage_per_1M ?? 0)}</td>
                    <td>
                      {formatNumber(data?.after_diviate_precantage_per_1M ?? 0)}
                    </td>
                    <td>{formatNumber(data?.forday_per_1M ?? 0)}</td>
                    <td>{formatNumber(data?.precantage_per_3M ?? 0)}</td>
                    <td>
                      {formatNumber(data?.after_diviate_precantage_per_3M ?? 0)}
                    </td>
                    <td>{formatNumber(data?.forday_per_3M ?? 0)}</td>
                    <td>{formatNumber(data?.precantage_per_6M ?? 0)}</td>
                    <td>
                      {formatNumber(data?.after_diviate_precantage_per_6M ?? 0)}
                    </td>
                    <td>{formatNumber(data?.forday_per_6M ?? 0)}</td>
                    <td>{formatNumber(data?.precantage_per_12M ?? 0)}</td>
                    <td>
                      {formatNumber(
                        data?.after_diviate_precantage_per_12M ?? 0
                      )}
                    </td>
                    <td>{formatNumber(data?.forday_per_12M ?? 0)}</td>
                    <td>{new Date(data.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="w-[69vw] bg-black flex justify-center ms-1a0 ms-[-72px]">
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
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="xl"
      >
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
                    <td>
                      {detail.active == 1 ? (
                        <p style={{ color: "green" }}>Yes</p>
                      ) : (
                        <p style={{ color: "red" }}>No</p>
                      )}
                    </td>
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
      <Modal
        show={showSendMoneyModal}
        onHide={() => setShowSendMoneyModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Money Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display sendMoneyData here */}
          {sendMoneyData ? (
            <>
              <pre>تم تحويل الاموال بنجاح</pre>
              {/*  <pre>{JSON.stringify(sendMoneyData, null, 2)}</pre>  */}
            </>
          ) : (
            <>
              <pre>لم يتم تحويل الاموال</pre>
              {/*  <pre>{JSON.stringify(sendMoneyData, null, 2)}</pre>  */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSendMoneyModal(false)}
          >
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
        className="d-flex flex-row justify-content-between mt-3 mb-1 align-items-center"
        ref={topRef}
      >
        <Button onClick={handleShowCreateBuffer}>create Buffer</Button>
        <Button onClick={handleShowCreate}>Distribution of profits</Button>
        <div className="d-flex flex-row">
          <Select
            options={filteredPlans}
            className="my-react-select-container w-100 ml-2 rounded-full focus:border-0"
            classNamePrefix="my-react-select"
            isClearable
            isSearchable
            placeholder="Select plan"
            onChange={(filteredPlans) => {
              fetchUserSelected(filteredPlans ? filteredPlans.value : null);
            }}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                  <th scope="col">الاسم</th>
                  <th scope="col">العنوان البريدي</th>
                  <th scope="col">الباقة</th>
                  <th scope="col">بمبلغ</th>
                  <th scope="col">تاريخ الشراء</th>
                  <th scope="col">تاريخ الإنتهاء</th>
                  <th scope="col">الرصيد</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">نوع الجزنة</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                    الأوامر
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0
                  ? users
                      .filter(
                        (user) =>
                          user.email &&
                          user.email
                            .toLowerCase()
                            .includes(searchTerm && searchTerm.toLowerCase())
                      )
                      .reverse()
                      .map((user, index) => (
                        <tr key={index + 1}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.UserName}</td>
                          <td>{user.email}</td>
                          <td>{user.plan_name}</td>
                          <td>{user.plan_price}</td>
                          <td style={{ textAlign: "center" }}>
                            {user.start_subscrip ? user.start_subscrip : "-"}
                          </td>
                          <td>{user.end_subscrip ? user.end_subscrip : "-"}</td>
                          <td>{user.amount ? user.amount : 0}</td>
                          <td>{user.active == 1 ? "Active" : "Inactive"}</td>
                          <td>{user.buffer ? user.buffer : "-"}</td>
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
                              <Dropdown.Item
                                eventKey="3"
                                className="flex justify-center hover:text-yellow-500"
                                onClick={() => handleOpenModalAsEdit(user)}
                              >
                                تعديل
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="3"
                                className="flex justify-center hover:text-yellow-500"
                                onClick={() => handleOpenModalAsDelete(user)}
                              >
                                حذف
                              </Dropdown.Item>
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

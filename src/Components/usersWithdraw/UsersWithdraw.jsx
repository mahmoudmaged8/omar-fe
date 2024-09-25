import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import Select from "react-select";
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";
import axiosClientMax from "../../axiosClientOfflineMax";

export default function UsersWithdraw() {
  const [pendingUsers, setPendingUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedtransaction, setSelectedtransaction] = useState(null);
  const [confirmActive, setConfirmActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [max, setMax] = useState("upvela");
  const [idTransfer, setIdTransfer] = useState(null);
  // const [showDetails, setShowDetails] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userDetailshistorypayment, setUserDetailshistorypayment] = useState(
    []
  );
  const [confirmAction, setConfirmAction] = useState(false);
  // const [combinedData, setCombinedData] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (window.location.search.includes("buffer")) {
      fetchArchiveMax();
    } else {
      fetchArchive();
    }
    fetchPusher_me();
  }, []);
  const fetchPusher_me = async () => {
    try {
      const response = await axiosClientF.post("me");
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
  const handleConfirmActive = (user) => {
    setIdTransfer(user.id);
    setSelectedUser(user.user.id);
    setSelectedtransaction(user.transaction_id);
    setConfirmActive(true);
  };

  const handleCancelActive = () => {
    setSelectedUser(null);
    setConfirmAction(false);
    setConfirmActive(false);
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
      const response = await axiosClientMax.post("order_withdraw", {
        type: "upvela",
      });
      setPendingUsers(response.data.data);
      setMax("upvela");
      console.log(response);
    } catch (err) {
      if (err.message === "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message === "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
      } else if (err.message === "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const fetchArchiveMax = async () => {
    try {
      const response = await axiosClientMax.post("order_withdraw", {
        type: "max",
      });
      setPendingUsers(response.data.data);
      setMax("max");
      console.log(response.data.data);
    } catch (err) {
      if (err.message === "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message === "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
      } else if (err.message === "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = async () => {
    setLoading(true);
    try {
      if (searchQuery.trim() !== "") {
        // Perform search with the provided query and selected plan
        const response = await axiosClientMax.post(`order_withdraw_serach`, {
          search: searchQuery,
        });
        setPendingUsers(response.data.data);
        // setUser("");
        console.log(response.data);
      } else {
        fetchArchive();
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
  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      if (selectedOption.value === "upvela") {
        fetchArchive();
      } else if (selectedOption.value === "max") {
        fetchArchiveMax();
      }
    } else {
      fetchArchive();
    }
  };
  const handleActive = async (status) => {
    setConfirmAction(true);
    try {
      const data = {
        user_id: selectedUser,
        transaction_id: selectedtransaction,
        status: status,
        type: max,
      };
      console.log(data);
      const response = await axiosClient.put(`withdraw/${selectedUser}`, data);
      console.log(response.data);
      if (response.data.success === false) {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
        setConfirmAction(false);
        setConfirmActive(false);
      } else {
        setPendingUsers((users) =>
          users.map((user) => {
            if (user.id === selectedUser) {
              return { ...user, status: status };
            }
            return user;
          })
        );
        setSuccessMessage("تم تحديث حالة المستخدم بنجاح");
        setErrorMessage("");
        setPendingUsers("");
        fetchArchive();
        setConfirmAction(false);
        setConfirmActive(false);
      }
    } catch (err) {
      setErrorMessage(`فشل تحديث حالة المستخدم ${err}`);
      setSuccessMessage("");
      console.log(err);
    }
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
      {/* <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>عرض التفاصيل</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {combinedData
            .slice()
            .sort((b, a) => new Date(a.created_at) - new Date(b.created_at))
            .map((item, index) => (
              <div key={index + 1} className="bg-gray-200 text-center">
                {item.amount ? (
                  <div className="mb-3">المبلغ: {item.amount}</div>
                  ) : null}
                {item.transaction_type ? (
                  <div className="mb-3">
                    نوع العملية: {item.transaction_type}
                  </div>
                ) : null}
                {item.send_name ? (
                  <div className="mb-3">
                    المرسل:{" "}
                    {item.send_name.name ? item.send_name.name : item.send_name}
                  </div>
                ) : null}
                {item.receiver_name ? (
                  <div className="mb-3">
                    المستلم:{" "}
                    {item.receiver_name.name
                      ? item.receiver_name.name
                      : item.receiver_name}
                  </div>
                ) : null}
                {item.money ? (
                  <div className="mb-3">المبلغ:  {item.money}$</div>
                ) : null}
                {item.status ? (
                  <div className="mb-3">الحالة: {item.status}</div>
                ) : null}
                {item.created_at ? (  
                  <div className="mb-3">
                    التاريخ: {item.created_at.slice(0,10)}  الساعة: {item.created_at.slice(11, 16)}
                  </div>
                  //hour: {item.created_at.slice(11, 19)}

                ) : null}
                {/* يمكنك إضافة المزيد من التفاصيل هنا إذا لزم الأمر 
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
       */}
      {loading ? (
        <div className="mt-[8rem]">
          {Array(10)
            .fill("")
            .map((e, i) => (
              <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
            ))}
        </div>
      ) : (
        <>
          <div className="table-responsive min-h-[100vh]">
            <div className="d-flex flex-row mb-4">
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
              <Select
                options={[
                  { value: "upvela", label: "upvela" },
                  { value: "max", label: "max" },
                ]}
                className="my-react-select-container w-max mr-2"
                classNamePrefix="my-react-select"
                isClearable
                isSearchable
                // defaultInputValue="upvela"
                onChange={handleSelectChange}
              />
            </div>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">البريد الإلكتروني</th>
                  <th scope="col">مبلغ التحويل</th>
                  <th scope="col"> متاح للسحب</th>
                  <th scope="col">مبلغ المتبقي</th>
                  <th scope="col">عدد الشركاء</th>
                  <th scope="col">رقم الفيزا</th>
                  <th scope="col">الخطة</th>
                  <th scope="col">الحالة</th>
                  <th scope="col">العملية</th>
                  {id != "682" ? (
                    <th scope="col" style={{ textAlign: "center" }}>
                      الإجراء
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {pendingUsers ? (
                  pendingUsers.length > 0 ? (
                    pendingUsers
                      .slice()
                      .reverse()
                      .map((user, index) => (
                        <tr key={user.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.user.name}</td>
                          <td>{user.user.email}</td>
                          <td>{user.money}</td>
                          <td>
                            {user.available == true ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#75FB4C"
                              >
                                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#EA3323"
                              >
                                <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
                              </svg>
                            )}
                          </td>
                          <td>{user.user.money}</td>
                          <td>{user.user.allsendandrecive.length}</td>
                          <td>
                            {user.Visa_number.length > 10
                              ? `....${user.Visa_number.slice(0, 10)}`
                              : user.Visa_number}
                          </td>
                          <td>{user.user.plan.name}</td>
                          <td>
                            <a href={`/dashboard/userloges?id=${user.user.id}`}>
                              التفاصيل
                            </a>
                            {/* <a href="#" onClick={() => handleShowDetails(user)}>
                            التفاصيل
                          </a> */}
                          </td>
                          <td>
                            {user.status == "pending"
                              ? "قيد المراجعة"
                              : user.status == "declined"
                              ? "مرفوض"
                              : user.status == "done"
                              ? "تم التحويل"
                              : null}
                          </td>
                          <td className="flex justify-center">
                            {id != "682" && user.status == "pending" ? (
                              <Button
                                className="flex justify-center hover:text-sky-500"
                                onClick={() => handleConfirmActive(user)}
                              >
                                تفعيل
                              </Button>
                            ) : null}

                            {confirmActive && selectedUser === user.user.id && (
                              <>
                                <Modal
                                  show={confirmActive}
                                  onHide={handleCancelActive}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>
                                      تحديث حالة المستخدم
                                    </Modal.Title>
                                  </Modal.Header>
                                  {confirmAction ? (
                                    <div className="mt-[8rem]">
                                      {Array(10)
                                        .fill("")
                                        .map((e, i) => (
                                          <Loader
                                            key={i}
                                            style={{
                                              opacity: Number(2 / i).toFixed(1),
                                            }}
                                          />
                                        ))}
                                    </div>
                                  ) : (
                                    <>
                                      <p>{max}</p>
                                      <p>{idTransfer}</p>
                                      <Modal.Body style={{ direction: "ltr" }}>
                                        <p style={{ direction: "ltr" }}>
                                          هل أنت متأكد أنك تريد تحديث حالة
                                          المستخدم؟
                                        </p>
                                        الاسم:{" "}
                                        <span className="text-sky-500">
                                          {user.user.name}
                                        </span>
                                        <br />
                                        رقم الفيزا:{" "}
                                        <span className="text-sky-500">
                                          {user.Visa_number}
                                        </span>
                                      </Modal.Body>
                                      <Modal.Footer
                                        style={{
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Button
                                          size="sm"
                                          onClick={() => {
                                            handleActive("success");
                                          }}
                                          style={{
                                            width: "8rem",
                                            marginRight: "1rem",
                                            color: "white",
                                            backgroundColor: "green",
                                          }}
                                        >
                                          نعم
                                        </Button>
                                        <Button
                                          variant="danger"
                                          size="sm"
                                          onClick={() => {
                                            handleActive("declined");
                                          }}
                                          style={{
                                            width: "8rem",
                                            marginRight: "1rem",
                                            color: "white",
                                            backgroundColor: "red",
                                          }}
                                        >
                                          لا
                                        </Button>
                                        <Button
                                          variant="secondary"
                                          size="sm"
                                          style={{
                                            width: "8rem",
                                            color: "white",
                                            backgroundColor: "black",
                                          }}
                                          onClick={handleCancelActive}
                                        >
                                          إلغاء
                                        </Button>
                                      </Modal.Footer>
                                    </>
                                  )}
                                </Modal>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        لا يوجد مستخدمين بانتظار السحب.
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

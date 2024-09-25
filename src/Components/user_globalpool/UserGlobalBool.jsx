/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";

export default function UserGlobalBool() {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [id, setId] = useState(null);
  // const handleShowCreate = true;
  const [currency, setCurrency] = useState({
    currency: 0,
  });
  const topRef = useRef(null);
  useEffect(() => {
    fetchUser();
    fetchPusher_me();
  }, []);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);
  const fetchUser = async () => {
    try {
      const response = await axiosClient.post(`get_poll_ranks`);

      setUser(response.data.data);
      console.log(response.data.data);
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
        setErrorMessage(`Error fetching Userglobalbool : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(currency);
    setSuccessMessage(currency.currency);
    setShowCreate(false);
    // try {
    //   e.preventDefault();
    //   await axiosClient.post("add-tickers", currency).then((res) => {
    //     if (res.data.message === "Ticker Added Successfully") {
    //       window.location.href = "/dashboard/tickers?success=1";
    //     }
    //     if (res.data.success == false) {
    //       setErrorMessage(res.data.message);

    //     }
    //   });
    // } catch (err) {
    //   console.log(err);
    //   setErrorMessage(err.message);
    // }
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
  const handleInputPost = (e) => {
    setCurrency({ ...currency, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة ارباح</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="sign-in-form">
            <InputGroup size="sm" className="mb-3">
              <Form.Control
                type="number"
                placeholder="currency"
                name="currency"
                onChange={handleInputPost}
              />
            </InputGroup>

            <Button type="submit">إضافة</Button>
          </Form>
          {/* <AddUser
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
            users={"user"}
          /> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
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
          <div className="table-responsive min-h-[25vh]">
            <div
              className="d-flex flex-row-reverse justify-content-between mt-3 mb-1"
              ref={topRef}
            >
              {id != "682" ? 
                <Button onClick={handleShowCreate}>ارباح الجيل الرابع</Button>
               : null
                }
            </div>
            <table className="table table-borderless pr-2">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">العنوان البريدي</th>
                  <th scope="col">التابعين له</th>
                  <th scope="col">العملات</th>
                  {/* <th scope="col">الباقة</th> */}
                  <th scope="col">البوت</th>
                  <th scope="col">تاريخ الشراء</th>
                  <th scope="col">تاريخ الإنتهاء</th>
                  <th scope="col">الرصيد</th>
                  <th scope="col">الرسوم</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                users.length > 0 &&
                users.find((user) => user.hisRank === 2)
                  ? users
                      .filter((user) => user.hisRank == 2)
                      .map((user, index) => (
                        <tr key={user.User.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.User.name}</td>
                          <td>{user.User.email}</td>
                          <td style={{ textAlign: "center" }}>
                            {user.User.number_of_user}
                          </td>
                          <td>{user.User.binanceApiKey.slice(0, 5)}</td>
                          {/* <td>{user.User.plan ? user.User.plan.name : "No Plans"}</td> */}
                          <td>
                            {user.User.is_bot > 0 ? (
                              <Button size="sm">
                                <i className="bi bi-check"></i>
                              </Button>
                            ) : (
                              <i className="bi bi-x"></i>
                            )}
                          </td>
                          <td>
                            {user.User.start_plan ? user.User.start_plan : "-"}
                          </td>
                          <td>
                            {user.User.end_plan ? user.User.end_plan : "-"}
                          </td>
                          <td>{user.User.money ? user.User.money : 0}</td>
                          <td>
                            {user.User.number_points
                              ? user.User.number_points
                              : 0}
                          </td>
                        </tr>
                      ))
                  : null}
              </tbody>
            </table>
          </div>
          <div className="table-responsive min-h-[25vh]">
            <div
              className="d-flex flex-row-reverse justify-content-between mt-3 mb-1"
              ref={topRef}
            >
                {id != "682" ? (
              <Button onClick={handleShowCreate}>ارباح الجيل الخامس</Button>
                ) : null
                }
            </div>
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
                  {/* <th scope="col" style={{ textAlign: "center" }}>
                    الأوامر
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {users &&
                users.length > 0 &&
                users.find((user) => user.hisRank === 5)
                  ? users
                      .filter((user) => user.hisRank == 5)
                      .map((user, index) => (
                        <tr key={user.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td style={{ textAlign: "center" }}>
                            {user.number_of_user}
                          </td>
                          <td>{user.binanceApiKey}</td>
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
                        </tr>
                      ))
                  : null}
              </tbody>
            </table>
          </div>
          <div className="table-responsive min-h-[25vh]">
            <div
              className="d-flex flex-row-reverse justify-content-between mt-3 mb-1"
              ref={topRef}
            >
                {id != "682" ? (
              <Button onClick={handleShowCreate}>ارباح الجيل السادس</Button>
                ) : null
                }
            </div>
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
                  {/* <th scope="col" style={{ textAlign: "center" }}>
                    الأوامر
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {users &&
                users.length > 0 &&
                users.find((user) => user.hisRank === 6)
                  ? users
                      .filter((user) => user.hisRank == 6)
                      .map((user, index) => (
                        <tr key={user.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td style={{ textAlign: "center" }}>
                            {user.number_of_user}
                          </td>
                          <td>{user.binanceApiKey}</td>
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
                        </tr>
                      ))
                  : null}
              </tbody>
            </table>
          </div>
          <div className="table-responsive min-h-[25vh]">
            <div
              className="d-flex flex-row-reverse justify-content-between mt-3 mb-1"
              ref={topRef}
            >
                {id != "682" ? (
              <Button onClick={handleShowCreate}>ارباح الجيل السابع</Button>
                ) : null
                }
            </div>
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
                  {/* <th scope="col" style={{ textAlign: "center" }}>
                    الأوامر
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {users &&
                users.length > 0 &&
                users.find((user) => user.hisRank === 7)
                  ? users
                      .filter((user) => user.hisRank == 7)
                      .map((user, index) => (
                        <tr key={user.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td style={{ textAlign: "center" }}>
                            {user.number_of_user}
                          </td>
                          <td>{user.binanceApiKey}</td>
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

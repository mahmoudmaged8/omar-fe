/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import * as XLSX from "xlsx";
import axiosClient from "../../axiosClientOffline";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function UserLogesBuffers() {
  const [userDeposite, setUserDeposite] = useState({});
  const [userWitdraw, setUserWitdraw] = useState({});
  const [userSubscription, setUserSubscription] = useState({});
  const [userBot, setUserBot] = useState({});
  const [userBotInfo, setUserBotInfo] = useState({});
  const [userAfflite, setUserAfflite] = useState({});
  const [userRank, setUserRank] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTable, setCurrentTable] = useState("");
  //setUserFees
  const [userFees, setUserFees] = useState({});
  //DataMax
  const [dataMax, setDataMax] = useState({});
  const [isActive, setIsActive] = useState("userDeposite");
  const [columnVisibility, setColumnVisibility] = useState({
    user_id: true,
    buffer_id: true,
    start_subscrip: true,
    end_subscrip: true,
    amount: true,
    active: true,
    plan_id: true,
    user_id_profit: true,
    buffer_id_profit: true,
    from_day: true,
    daysRemaining: true,
    money_for_day: true,
    columnVisibility: true,
    active_profit: true,
    created_at_profit: true,
    created_at: true,
    user_id_balance: true,
    balance: true,
    created_at_balance: true,
  });
  useEffect(() => {
    fetchArchive();
  }, []);
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
  const userDepositeData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responsedeposit = await axiosClient.post(
        `user_deposite?user_id=${idValue}`
      );
      console.log(responsedeposit.data);
      setUserDeposite(responsedeposit.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userWitdrawData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responseWithdraw = await axiosClient.post(
        `user_witdraw?user_id=${idValue}`
      );
      console.log(responseWithdraw.data);
      setUserWitdraw(responseWithdraw.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userSubscriptionData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responsewSubscription = await axiosClient.post(
        `user_subscription?user_id=${idValue}`
      );
      console.log(responsewSubscription.data);
      setUserSubscription(responsewSubscription.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userBotData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responseuserBot = await axiosClient.post(
        `user_bot?user_id=${idValue}`
      );
      console.log(responseuserBot.data);
      setUserBot(responseuserBot.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userBotInfoData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responseuserBotInfo = await axiosClient.post(
        `user_bot_info?user_id=${idValue}`
      );
      console.log(responseuserBotInfo.data);
      setUserBotInfo(responseuserBotInfo.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userAffliteData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responseuserAfflite = await axiosClient.post(
        `user_afflite?user_id=${idValue}`
      );
      console.log(responseuserAfflite.data);
      setUserAfflite(responseuserAfflite.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userRankData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responseuserRank = await axiosClient.post(
        `user_rank?user_id=${idValue}`
      );
      console.log(responseuserRank.data);
      setUserRank(responseuserRank.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userFeesData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responseuserFees = await axiosClient.post(
        `user_fess?user_id=${idValue}`
      );
      console.log(responseuserFees.data);
      setUserFees(responseuserFees.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userSubMaxData = async () => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("id");
    try {
      const responseuserFees = await axiosClient.post(
        `user_sub_max?user_id=${idValue}`
      );
      console.log(responseuserFees.data);
      setDataMax(responseuserFees.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchArchive = async () => {
    // التحقق مما إذا كانت معلمة البحث تحتوي على "id"
    if (window.location.search.includes("id")) {
      // استخراج قيمة معلمة "id" من عنوان URL
      const urlParams = new URLSearchParams(window.location.search);
      const idValue = urlParams.get("id");
      const massegeValue = urlParams.get("successMoney");
      if (massegeValue) {
        setSuccessMessage("تم إعادة الاموال لهذا المستخدم بنجاح");
      }
      try {
        const responsedeposit = await axiosClient.post(
          `user_deposite?user_id=${idValue}`
        );
        console.log(responsedeposit.data);
        setUserDeposite(responsedeposit.data.message);
      } catch (err) {
        if (err.message == "Network Error") {
          setErrorMessage(`الانترنت لا يعمل`);
        } else if (err.message == "Request failed with status code 500") {
          setErrorMessage(`لا استطيع الوصول للسيرفر`);
        } else if (err.message == "Request failed with status code 404") {
          setErrorMessage(`قريبأ ستعمل`);
        } else {
          setErrorMessage(`Error fetching recommendation : ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const handleColumnToggle = (column) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column], // Toggle the visibility for the specific column
    }));
  };
  const arrayToSheet = (data, opts) => {
    const ws = XLSX.utils.json_to_sheet(data, opts);
    return ws;
  };
  const downloadExcel = (data, fileName = "dataMax.xlsx") => {
    const ws = arrayToSheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admins");
    XLSX.writeFile(wb, fileName);
  };
  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    input.style.backgroundColor = "#000000";
    html2canvas(input, { scale: 1 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        // حساب النسبة المئوية لحجم الصورة مقارنة بحجم صفحة A4
        const imgWidth = 210; // عرض صفحة A4 بالمليمترات
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        pdf.save(`Recommendation_${formattedDate}.pdf`);
        input.style.backgroundColor = "";
      })
      .catch((err) => console.error(err));
  };
  const handleDownloadExcel = () => {
    // Assume 'dataMax' is the state variable holding the data to be exported
    downloadExcel(dataMax.buffer_subscrip, "الخزانات_المتاحة.xlsx");
    downloadExcel(dataMax.buffer_profit, "الارباح_المحولة.xlsx");
    downloadExcel([dataMax.balance], "الرصيد.xlsx");
  };
  return (
    <>
      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <div className="mb-3 d-flex">
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("userDeposite"),
              setIsActive("userDeposite"),
              userDepositeData();
          }}
          className={isActive === "userDeposite" ? "actives" : ""}
        >
          الخزانات المستخدم
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("userWitdraw"),
              setIsActive("userWitdraw"),
              userWitdrawData();
          }}
          className={isActive === "userWitdraw" ? "actives" : ""}
        >
          طلبات السحب
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("userSubscription"),
              setIsActive("userSubscription"),
              userSubscriptionData();
          }}
          className={isActive === "userSubscription" ? "actives" : ""}
        >
          اشتراكات المستخدم
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("userBot"), setIsActive("userBot"), userBotData();
          }}
          className={isActive === "userBot" ? "actives" : ""}
        >
          بوتات المستخدم
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("userBotInfo"),
              setIsActive("userBotInfo"),
              userBotInfoData();
          }}
          className={isActive === "userBotInfo" ? "actives" : ""}
        >
          userBotInfo
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("userAfflite"),
              setIsActive("userAfflite"),
              userAffliteData();
          }}
          className={isActive === "userAfflite" ? "actives" : ""}
        >
          الاحالات الخاصة يالمستخدم
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("userRank"),
              setIsActive("userRank"),
              userRankData();
          }}
          className={isActive === "userRank" ? "actives" : ""}
        >
          المرتبة الخاصة بالمستخدم
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("userFees"),
              setIsActive("userFees"),
              userFeesData();
          }}
          className={isActive === "userFees" ? "actives" : ""}
        >
          ارباح المستخدم من الاحالات
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("dataMax"),
              setIsActive("dataMax"),
              userSubMaxData();
          }}
          className={isActive === "dataMax" ? "actives" : ""}
        >
          dataMax
        </Button>
      </div>
      <div id="divToPrint">
        <div className="mb-3 d-flex justify-between"></div>
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
              {currentTable === "userDeposite" || currentTable == "" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">المبلغ</th>
                      <th scope="col">textId</th>
                      <th scope="col">الشبكة</th>
                      <th scope="col">الحالة</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDeposite.length > 0 ? (
                      userDeposite
                        .filter((users) => users.receiver_name !== "Me")
                        .map((users, index) => (
                          <tr key={index + 1}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.amount}</td>
                            <td>{users.textId}</td>
                            <td>{users.network}</td>
                            <td>{users.status}</td>
                            <td>
                              التاريخ: {users.created_at.slice(0, 10)}
                              {/* الساعة:{" "}
                              {users.created_at.slice(11, 16)} */}
                            </td>
                            <td>{users.symbol}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs userDeposite user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "userWitdraw" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">المبلغ</th>
                      <th scope="col">رقم المحفظة</th>
                      <th scope="col">الحالة</th>
                      {/* <th scope="col">transaction_id</th> */}
                      {/* <th scope="col">transaction_id_binance</th> */}
                      <th scope="col">check_otp</th>
                      <th scope="col">otp</th>
                      <th scope="col">ip_user</th>
                      <th scope="col">admin_id</th>
                      <th scope="col">النوع</th>
                      <th scope="col">حذف بتاريخ</th>
                      <th scope="col">بتاريخ</th>
                      {/* <th scope="col" style={{ textAlign: "center" }}>
                      Action
                    </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {userWitdraw.length > 0 ? (
                      userWitdraw
                        .slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.money}</td>
                            <td>
                              {users.Visa_number.length > 25
                                ? `....${users.Visa_number.slice(0, 25)}`
                                : users.Visa_number}
                            </td>
                            <td>{users.status}</td>
                            {/* <td>{users.transaction_id}</td> */}
                            {/* <td>{users.transaction_id_binance}</td> */}
                            <td>{users.check_otp}</td>
                            <td>{users.otp}</td>
                            <td>{users.ip_user}</td>
                            <td>{users.admin_id}</td>
                            <td>{users.type}</td>
                            <td>{users.deleted_at}</td>
                            <td>
                              التاريخ: {users.created_at.slice(0, 10)}
                              {/* الساعة:{" "}
                              {users.created_at.slice(11, 16)} */}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs userWitdraw user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "userSubscription" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">transaction_id</th>
                      {/* <th scope="col">الحالة</th> */}
                      <th scope="col">الحالة</th>
                      <th scope="col">اسم الباقة</th>
                      {/* <th scope="col">بتاريخ</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {userSubscription.length > 0 ? (
                      userSubscription
                        .slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.transaction_id}</td>
                            {/* <td>{users.status}</td> */}
                            <td>{users.status}</td>
                            <td>{users.plan_name}</td>
                            {/* <td>
                              {users.massageError ? (
                                <div className="text-danger">
                                  {users.massageError}
                                </div>
                              ) : null} 
                            </td>
                             <td>
                              {" "}
                              التاريخ: {users.created_at.slice(
                                0,
                                10
                              )} الساعة: {users.created_at.slice(11, 16)}
                            </td> */}
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs userSubscription user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "userBot" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">orders_usdt</th>
                      <th scope="col">Frist_orders_usdt</th>
                      <th scope="col">حالة البوت</th>
                      <th scope="col">اسم البوت</th>
                      <th scope="col">اجمالي المبلغ</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBot.length > 0 ? (
                      userBot.map((users, index) => (
                        <tr key={users.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{users.orders_usdt}</td>
                          <td>{users.Frist_orders_usdt}</td>
                          <td>{users.bot_status}</td>
                          <td>{users.bot_name}</td>
                          <td>{users.totle_profit}</td>
                          <td>
                            التاريخ: {users.created_at.slice(0, 10)}
                            {/* الساعة:{" "}
                            {users.created_at.slice(11, 16)} */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs userBot user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "userBotInfo" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">symbol</th>
                      <th scope="col">النوع</th>
                      <th scope="col">side</th>
                      <th scope="col">العدد</th>
                      <th scope="col">السعر</th>
                      <th scope="col">ايقاف عند سعر</th>
                      <th scope="col">الحالة</th>
                      <th scope="col">orderID</th>
                      <th scope="col">اسم البوت</th>
                      <th scope="col">عدد البوت</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userBotInfo.length > 0 ? (
                      userBotInfo
                        .slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.symbol}</td>
                            <td>{users.type}</td>
                            <td>{users.side}</td>
                            <td>{users.quantity}</td>
                            <td>{users.price}</td>
                            <td>{users.stop_price}</td>
                            <td>
                              {users.status == "NEW" ? (
                                <div className="text-warning">Watting</div>
                              ) : users.status == "FILLED" ? (
                                <div className="text-success">SUCCESS</div>
                              ) : users.status == "CANCELED" ? (
                                <div className="text-secondary">
                                  {users.status}
                                </div>
                              ) : (
                                <div className="text-danger">
                                  {users.status}
                                </div>
                              )}
                            </td>
                            <td>{users.orderID}</td>
                            <td>{users.bot_name}</td>
                            <td>{users.bot_num}</td>
                            <td>
                              {" "}
                              التاريخ: {users.created_at.slice(0, 10)}
                              {/* الساعة: {users.created_at.slice(11, 16)} */}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs userBotInfo user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "userAfflite" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">user_id_child</th>
                      <th scope="col">user_id_father</th>
                      <th scope="col">free_check</th>
                      <th scope="col">generation_id</th>
                      <th scope="col">father_money</th>
                      <th scope="col">child_plan_price</th>
                      <th scope="col">block_user</th>
                      <th scope="col">totle_profit</th>
                      <th scope="col">user_name</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAfflite.length > 0 ? (
                      userAfflite
                        .slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.user_id_child}</td>
                            <td>{users.user_id_father}</td>
                            <td>{users.free_check}</td>
                            <td>{users.generation_id}</td>
                            <td>{users.father_money}</td>
                            <td>{users.child_plan_price}</td>
                            <td>{users.block_user}</td>
                            <td>{users.totle_profit}</td>
                            <td>{users.user_name}</td>
                            <td>
                              التاريخ: {users.created_at.slice(0, 10)} الساعة:{" "}
                              {users.created_at.slice(11, 16)}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs userAfflite user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "userRank" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">user_id</th>
                      <th scope="col">rank_id</th>
                      <th scope="col">block_generation</th>
                      <th scope="col">globel_percentage</th>
                      <th scope="col">اجمالي عدد الفرعين</th>
                      <th scope="col">عدد الفرعين المباشرين</th>
                      <th scope="col">عددالفرعين المجاني</th>
                      {/* <th scope="col">من العميل</th> */}
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRank ? (
                      <tr>
                        <th scope="row">1</th>
                        <td>{userRank.user_id}</td>
                        <td>{userRank.rank_id}</td>
                        <td>{userRank.block_generation}</td>
                        <td>
                          {userRank.globel_percentage === null
                            ? "N/A"
                            : userRank.globel_percentage}
                        </td>
                        <td>{userRank.child_number}</td>
                        <td>{userRank.direct_child_number}</td>
                        <td>{userRank.child_free}</td>
                        <td>
                          التاريخ: {userRank.created_at.slice(0, 10)}
                          {/* الساعة: {userRank.created_at.slice(11, 16)} */}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs user Rank user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "userFees" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">markting_id</th>
                      <th scope="col">amount</th>
                      <th scope="col">bot_id</th>
                      <th scope="col">plan_id</th>
                      <th scope="col">profit_users</th>
                      <th scope="col">status</th>
                      <th scope="col">Generations</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userFees.length > 0 ? (
                      userFees
                        .filter((users) => users.amount !== 0) // تصفية الصفوف التي تحتوي على amount مختلف عن 0
                        .slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.markting_id}</td>
                            <td>{users.amount}</td>
                            <td>{users.bot_id}</td>
                            <td>{users.plan_id}</td>
                            <td>{users.profit_users}</td>
                            <td>{users.status}</td>
                            <td>{users.Generations}</td>
                            <td>
                              التاريخ: {users.created_at.slice(0, 10)}
                              {/* الساعة:{" "}
                              {users.created_at.slice(11, 16)} */}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs user Fees user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "dataMax" ? (
                <>
                  <Button variant="primary" onClick={handleDownloadExcel}>
                    Download Data to Excel
                  </Button>
                  <Button variant="primary" onClick={printDocument}>
              طباعة PDF
            </Button>
                  <p className="text-white text-center">الخزانات المتاحة</p>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th
                          onClick={() => handleColumnToggle("user_id")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {columnVisibility.user_id ? "user_id" : "U"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("buffer_id")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.buffer_id ? "buffer_id" : "B"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("start_subscrip")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {columnVisibility.start_subscrip
                            ? "start_subscrip"
                            : "S"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("end_subscrip")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.end_subscrip ? "end_subscrip" : "E"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("amount")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.amount ? "amount" : "Am"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("active")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.active ? "active" : "Ac"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("plan_id")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.plan_id ? "plan_id" : "P"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("created_at")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.created_at ? " بتاريخ" : "ب"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataMax.buffer_subscrip.length > 0 ? (
                        dataMax.buffer_subscrip
                          .filter((users) => users.amount !== 0) // تصفية الصفوف التي تحتوي على amount مختلف عن 0
                          .slice()
                          .reverse()
                          .map((users, index) => (
                            <tr key={users.id}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                {columnVisibility.user_id ? users.user_id : ""}
                              </td>
                              <td>
                                {columnVisibility.buffer_id
                                  ? users.buffer_id
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.start_subscrip
                                  ? users.start_subscrip
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.end_subscrip
                                  ? users.end_subscrip
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.amount ? users.amount : ""}
                              </td>
                              <td>
                                {columnVisibility.active ? users.active : ""}
                              </td>
                              <td>
                                {columnVisibility.plan_id ? users.plan_id : ""}
                              </td>
                              <td>
                                {columnVisibility.created_at
                                  ? ` تاريخ: ${users.created_at.slice(0, 10)}`
                                  : ""}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            no logs buffer subscrip user found
                            {/* <Spinner animation="border" /> */}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <p className="text-white text-center">الارباح المحولة</p>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th
                          onClick={() => handleColumnToggle("user_id_profit")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.user_id_profit ? "user_id" : "U"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("buffer_id_profit")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.buffer_id_profit
                            ? "buffer_id"
                            : "B"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("from_day")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.from_day ? "from_day" : "F"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("daysRemaining")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.daysRemaining
                            ? "daysRemaining"
                            : "D"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("money_for_day")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.money_for_day
                            ? "money_for_day"
                            : "M"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("mony_for_15day")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.mony_for_15day
                            ? "mony_for_15day"
                            : ""}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("active_profit")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.active_profit ? "active" : "Ac"}
                        </th>
                        <th
                          onClick={() =>
                            handleColumnToggle("created_at_profit")
                          }
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.created_at_profit ? " بتاريخ" : "ب"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataMax.buffer_profit.length > 0 ? (
                        dataMax.buffer_profit
                          .filter(
                            (users) => users.amount !== 0 && users.active > 0
                          ) // تصفية الصفوف التي تحتوي على amount مختلف عن 0
                          .slice()
                          .reverse()
                          .map((users, index) => (
                            <tr key={users.id}>
                              <th scope="row">{index + 1}</th>
                              <td>
                                {columnVisibility.user_id_profit
                                  ? users.user_id
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.buffer_id_profit
                                  ? users.buffer_id
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.from_day
                                  ? users.from_day
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.daysRemaining
                                  ? users.daysRemaining
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.money_for_day
                                  ? users.money_for_day
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.mony_for_15day
                                  ? users.mony_for_15day
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.active_profit
                                  ? users.active
                                  : ""}
                              </td>
                              <td>
                                {columnVisibility.created_at_profit
                                  ? ` تاريخ: ${users.created_at.slice(0, 10)}`
                                  : ""}
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            no logs buffer profit user found
                            {/* <Spinner animation="border" /> */}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <p className="text-white text-center">الرصيد</p>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th
                          onClick={() => handleColumnToggle("user_id_balance")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.user_id_balance ? "user_id" : "U"}
                        </th>
                        <th
                          onClick={() => handleColumnToggle("balance")}
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.balance ? "balance" : "B"}
                        </th>
                        {/* <th scope="col">active</th> */}
                        <th
                          onClick={() =>
                            handleColumnToggle("created_at_balance")
                          }
                          style={{ cursor: "pointer" }}
                          scope="col"
                        >
                          {" "}
                          {columnVisibility.created_at_balance
                            ? " بتاريخ"
                            : "ب"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataMax.balance ? (
                        // dataMax.balance
                        // .filter((users) => users.amount !== 0) // تصفية الصفوف التي تحتوي على amount مختلف عن 0
                        // .slice()
                        // .reverse()
                        // .map((users, index) => (
                        <tr>
                          <th scope="row">1</th>
                          <td>
                            {columnVisibility.user_id_balance
                              ? dataMax.balance.user_id
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.balance
                              ? dataMax.balance.blance
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.created_at_balance
                              ? ` تاريخ: ${dataMax.balance.created_at.slice(
                                  0,
                                  10
                                )}`
                              : ""}
                          </td>
                        </tr>
                      ) : (
                        // ))
                        <tr>
                          <td colSpan="9" className="text-center">
                            no logs balance user found
                            {/* <Spinner animation="border" /> */}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
}

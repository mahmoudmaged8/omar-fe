/* eslint-disable react-hooks/exhaustive-deps */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";

export default function UserLoges() {
  const [transactions, setTransactions] = useState({});
  const [historypayment, setHistorypayment] = useState({});
  const [BuySellBinance, setBuySellBinance] = useState({});
  const [DepositsBinance, setDepositsBinance] = useState({});
  const [binanceloges, setBinanceloges] = useState({});
  const [historyAllProfit, setHistoryAllProfit] = useState({});
  const [marktingAllProfit, setMarktingAllProfit] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTable, setCurrentTable] = useState("");
  const [wins, setWins] = useState("");
  const [loses, setLoses] = useState("");
  const [recmoCount, setRecmoCount] = useState("");
  const [totalFees, setTotalFees] = useState(0);
  const [totalFeesPlan, setTotalFeesPlan] = useState(0);
  const [totalFeesBoots, setTotalFeesBoots] = useState(0);
  const [moneyToday, setMoneyToday] = useState(0);
  const [moneyLastMonth, setMoneyLastMonth] = useState(0);
  const [moneyLastWeek, setMoneyLastWeek] = useState(0);
  const [isActive, setIsActive] = useState("transactions");

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
  const fetchArchive = async () => {
    // التحقق مما إذا كانت معلمة البحث تحتوي على "id"
    if (window.location.search.includes("id")) {
      // استخراج قيمة معلمة "id" من عنوان URL
      const urlParams = new URLSearchParams(window.location.search);
      const idValue = urlParams.get("id");

      try {
        const response = await axiosClient.post(
          `historyTransactionWeb?id=${idValue}`
        );
        console.log(response.data);
        setTransactions(response.data.transactions);
        //historypayment
        setHistorypayment(response.data.historypayment);
        //BuySellBinance
        setBuySellBinance(response.data.BuySellBinance);
        //DepositsBinance
        setDepositsBinance(response.data.DepositsBinance);
        // console.log(response.data.DepositsBinance);
        //binanceloges
        setBinanceloges(response.data.binanceloges);
        //historyAllProfit
        setHistoryAllProfit(response.data.historyAllProfit);
        //MarktingAllProfit
        setMarktingAllProfit(response.data.MarktingAllProfit);
        //Loses
        setLoses(response.data.Loses);
        // console.log(response.data.Loses);
        //Wins
        setWins(response.data.Wins);
        // console.log(response.data.Wins);
        //RecmoCount
        setRecmoCount(response.data.RecmoCount);
        //total today
        setMoneyToday(response.data.WinsToday);
        //total last month
        setMoneyLastMonth(response.data.WinsLastMonth);
        //total last week
        setMoneyLastWeek(response.data.WinsLastWeek);
        const feesTotal = response.data.DepositsBinance.reduce(
          (accumulator, current) => {
            // Ensure current.fees is a number before adding
            return accumulator + (Number(current.fees) || 0);
          },
          0
        );
        // Calculate total fees for 'plan'
        const feesTotalPlan = response.data.DepositsBinance.reduce(
          (accumulator, current) => {
            if (current.side === "plan") {
              return accumulator + (Number(current.fees) || 0);
            }
            return accumulator;
          },
          0
        );
        const feesTotalBoots = response.data.DepositsBinance.reduce(
          (accumulator, current) => {
            if (current.side != "plan") {
              return accumulator + (Number(current.fees) || 0);
            }
            return accumulator;
          },
          0
        );
        setTotalFeesBoots(feesTotalBoots);
        setTotalFeesPlan(feesTotalPlan);
        setTotalFees(feesTotal);
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
        pdf.save(`${isActive}_${formattedDate}.pdf`);
        input.style.backgroundColor = "";
      })
      .catch((err) => console.error(err));
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
            setCurrentTable("transactions"), setIsActive("transactions");
          }}
          className={isActive === "transactions" ? "actives" : ""}
        >
          التحويلات
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("historypayment"), setIsActive("historypayment");
          }}
          className={isActive === "historypayment" ? "actives" : ""}
        >
          طلبات السحب
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("BuySellBinance"), setIsActive("BuySellBinance");
          }}
          className={isActive === "BuySellBinance" ? "actives" : ""}
        >
          بيع وشراء بينانس
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("DepositsBinance"), setIsActive("DepositsBinance");
          }}
          className={isActive === "DepositsBinance" ? "actives" : ""}
        >
          خصمات البوت
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("binanceloges"), setIsActive("binanceloges");
          }}
          className={isActive === "binanceloges" ? "actives" : ""}
        >
          شراء بايننس
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("historyAllProfit"),
              setIsActive("historyAllProfit");
          }}
          className={isActive === "historyAllProfit" ? "actives" : ""}
        >
          مكاسب المحصلة بالمحفظة
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentTable("marktingAllProfit"),
              setIsActive("marktingAllProfit");
          }}
          className={isActive === "marktingAllProfit" ? "actives" : ""}
        >
          مكاسب المبيعات
        </Button>
        <Button variant="primary" onClick={printDocument}>
          تحويل إلى PDF
        </Button>
      </div>
      <div id="divToPrint">
        <div className="mb-3 d-flex justify-between">
          {wins ? (
            <div className="text-center text-white mx-1">
              الارياح
              <h1 dir="ltr"> {wins.toFixed(2)}</h1>
            </div>
          ) : null}
          {loses ? (
            <div className=" text-center text-white mx-1">
              الخسائر
              <h1 dir="ltr"> {loses.toFixed(2)}</h1>
            </div>
          ) : null}
          {wins && loses && wins + loses > 0 ? (
            <div className=" text-center text-green-500 mx-1">
              مجموع مكاسب
              <h1 dir="ltr"> {(wins + loses).toFixed(2)}</h1>
            </div>
          ) : wins && loses && wins + loses <= 0 ? (
            <div className=" text-center text-red-500 mx-1">
              مجموع الخسائر
              <h1 dir="ltr"> {(wins + loses).toFixed(2)}</h1>
            </div>
          ) : null}
          {moneyToday && moneyToday > 0 ? (
            <div className=" text-center text-green-500 mx-1">
              مجموع ارباح اليوم
              <h1 dir="ltr"> {moneyToday.toFixed(2)} </h1>
            </div>
          ) : moneyToday && moneyToday <= 0 ? (
            <div className=" text-center text-red-500 mx-1">
              مجموع خسائر اليوم
              <h1 dir="ltr"> {moneyToday.toFixed(2)} </h1>
            </div>
          ) : (
            <div className=" text-center text-white mx-1">
              لا يوجد ارباح اليوم
              <h1 dir="ltr"> {moneyToday.toFixed(2)} </h1>
            </div>
          )}
          {moneyLastWeek && moneyLastWeek > 0 ? (
            <div className=" text-center text-green-500 mx-1">
              مجموع ارباح الاسبوع
              <h1 dir="ltr"> {moneyLastWeek.toFixed(2)} </h1>
            </div>
          ) : moneyLastWeek && moneyLastWeek <= 0 ? (
            <div className=" text-center text-red-500 mx-1">
              مجموع خسائر الاسبوع
              <h1 dir="ltr"> {moneyLastWeek.toFixed(2)} </h1>
            </div>
          ) :  (
            <div className=" text-center text-white mx-1">
              لا يوجد ارباح هذا الاسبوع
              <h1 dir="ltr"> {moneyToday.toFixed(2)} </h1>
            </div>
          )}
          {moneyLastMonth && moneyLastMonth > 0 ? (
            <div className=" text-center text-green-500 mx-1">
              مجموع ارباح الشهر
              <h1 dir="ltr"> {moneyLastMonth.toFixed(2)} </h1>
            </div>
          ) : moneyLastMonth && moneyLastMonth <= 0 ? (
            <div className=" text-center text-red-500 mx-1">
              مجموع خسائر الشهر
              <h1 dir="ltr"> {moneyLastMonth.toFixed(2)} </h1>
            </div>
          ) :  (
            <div className=" text-center text-white mx-1">
              لا يوجد ارباح هذا الشهر
              <h1 dir="ltr"> {moneyToday.toFixed(2)} </h1>
            </div>
          )}
          {recmoCount && recmoCount > 0 ? (
            <div className=" text-center text-white mx-1">
              عدد الصفقات التي قمت بالدخول
              <h1 dir="ltr"> {recmoCount} </h1>
            </div>
          ) : null}
          {totalFeesPlan ? (
            <div className=" text-center text-white mx-1">
              رسوم الاشتراك
              <h1 dir="ltr"> {totalFeesPlan.toFixed(2)} </h1>
            </div>
          ) : null}
          {totalFeesBoots ? (
            <div className=" text-center text-white mx-1">
              رسوم التوصيات
              <h1 dir="ltr"> {totalFeesBoots.toFixed(2)} </h1>
            </div>
          ) : null}
          {totalFees ? (
            <div className=" text-center text-white mx-1">
              مجموع الرسوم
              <h1 dir="ltr"> {totalFees.toFixed(2)} </h1>
            </div>
          ) : null}
        </div>
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
              {currentTable === "transactions" || currentTable == "" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">الأموال</th>
                      <th scope="col">الحاله</th>
                      <th scope="col">التحويل لـ</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions
                        .filter((users) => users.receiver_name !== "Me")
                        .map((users, index) => (
                          <tr key={index + 1}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.amount}</td>
                            <td>
                              {users.transaction_type == "received" ? (
                                <div className="text-success">
                                  {users.transaction_type}
                                </div>
                              ) : (
                                <div className="text-primary">
                                  {users.transaction_type}
                                </div>
                              )}
                            </td>
                            <td>
                              {users.send_name ? (
                                users.send_name.name ? (
                                  users.send_name.name
                                ) : (
                                  <div className="text-secondary">
                                    {users.send_name}
                                  </div>
                                )
                              ) : users.receiver_name &&
                                users.receiver_name.name ? (
                                users.receiver_name.name
                              ) : null}
                            </td>
                            <td>
                              التاريخ: {users.created_at.slice(0, 10)} الساعة:{" "}
                              {users.created_at.slice(11, 16)}
                            </td>
                            <td>{users.symbol}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs transactions user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "historypayment" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">الأموال</th>
                      <th scope="col">رقم محفظة بايننس</th>
                      <th scope="col">الحالة</th>
                      <th scope="col">بتاريخ</th>
                      {/* <th scope="col">price</th> */}
                      {/* <th scope="col">quantity</th> */}
                      {/* <th scope="col">side</th> */}
                      {/* <th scope="col">currency</th> */}
                      {/* <th scope="col" style={{ textAlign: "center" }}>
                      Action
                    </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {historypayment.length > 0 ? (
                      historypayment
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
                            <td>
                              {users.status == "pending" ? (
                                <div className="text-primary">
                                  {users.status}
                                </div>
                              ) : users.status == "declined" ? (
                                <div className="text-danger">
                                  {users.status}
                                </div>
                              ) : (
                                <div className="text-success">
                                  {users.status}
                                </div>
                              )}
                            </td>
                            <td>
                              التاريخ: {users.created_at.slice(0, 10)} الساعة:{" "}
                              {users.created_at.slice(11, 16)}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs historypayment user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "BuySellBinance" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">العملة</th>
                      <th scope="col">الحالة</th>
                      <th scope="col">المبلغ</th>
                      <th scope="col">المشكلة</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BuySellBinance.length > 0 ? (
                      BuySellBinance.slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.symbol}</td>
                            <td>{users.side}</td>
                            <td>{users.price}</td>
                            <td>
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
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs BuySellBinance user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "DepositsBinance" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">الخصم</th>
                      <th scope="col">العملة</th>
                      <th scope="col">سعر الشراء</th>
                      <th scope="col">النوع</th>
                      <th scope="col">الحالة</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DepositsBinance.length > 0 ? (
                      DepositsBinance.map((users, index) => (
                        <tr key={users.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{users.fees}</td>
                          <td>{users.ticker}</td>
                          <td>{users.profusdt}</td>
                          <td>
                            {users.side == "plan" ? (
                              <div className="text-primary">{users.side}</div>
                            ) : (
                              <div className="text-success">{users.side}</div>
                            )}
                          </td>
                          <td>{users.status}</td>
                          <td>
                            التاريخ: {users.created_at.slice(0, 10)} الساعة:{" "}
                            {users.created_at.slice(11, 16)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs DepositsBinance user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "binanceloges" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">العملة</th>
                      <th scope="col">النوع</th>
                      {/* <th scope="col">side</th> */}
                      <th scope="col">الكمية</th>
                      <th scope="col">السعر</th>
                      <th scope="col">الحالة</th>
                      <th scope="col">عدد البوت</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {binanceloges.length > 0 ? (
                      binanceloges
                        .slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.symbol}</td>
                            {/* <td>{users.type}</td> */}
                            <td>{users.side}</td>
                            <td>{users.quantity}</td>
                            <td>{users.price}</td>
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
                            <td>{users.bot_num}</td>
                            <td>
                              {" "}
                              التاريخ: {users.created_at.slice(
                                0,
                                10
                              )} الساعة: {users.created_at.slice(11, 16)}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs binanceloges user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "historyAllProfit" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">الاسم</th>
                      <th scope="col">الجيل</th>
                      <th scope="col">المبلغ المستحق</th>
                      {/* <th scope="col">quantity</th> */}
                      {/* <th scope="col">side</th> */}
                      <th scope="col">الحالة</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyAllProfit.length > 0 ? (
                      historyAllProfit
                        .slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.bot_id}</td>
                            <td>{users.Generations}</td>
                            <td>{users.amount}</td>
                            <td>{users.status}</td>
                            <td>
                              التاريخ: {users.created_at.slice(0, 10)} الساعة:{" "}
                              {users.created_at.slice(11, 16)}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs historyAllProfit user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
              {currentTable === "marktingAllProfit" ? (
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">الاجيال</th>
                      <th scope="col">المبلغ المستحق</th>
                      <th scope="col">البوت رقم</th>
                      <th scope="col">العميل رقم</th>
                      <th scope="col">المبلغ المدفوع</th>
                      <th scope="col">الحالة</th>
                      <th scope="col">من العميل</th>
                      <th scope="col">بتاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marktingAllProfit.length > 0 ? (
                      marktingAllProfit
                        .filter((users) => users.amount !== 0) // تصفية الصفوف التي تحتوي على amount مختلف عن 0
                        .slice()
                        .reverse()
                        .map((users, index) => (
                          <tr key={users.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{users.Generations}</td>
                            <td>{users.amount}</td>
                            <td>{users.bot_id}</td>
                            <td>{users.markting_id}</td>
                            <td>{users.profit_users}</td>
                            <td>{users.status}</td>
                            <td>{users.user_id}</td>
                            <td>
                              التاريخ: {users.created_at.slice(0, 10)} الساعة:{" "}
                              {users.created_at.slice(11, 16)}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          no logs historyAllProfit user found
                          {/* <Spinner animation="border" /> */}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
}

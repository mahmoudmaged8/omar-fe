/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import "../assets/css/Dashboard.css";
import axiosClient from "../axiosClientOffline";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [advice, setAdvice] = useState([]);
  const [ban, setBan] = useState([]);
  const [allMoney, setAllMoney] = useState("");
  const [allWithdraw, setAllWithdraw] = useState("");
  const [payment, setPayment] = useState([]);
  // const [sum, setSum] = useState(0);
  // const [sumLastMonth, setSumLastMonth] = useState(0);
  const [adviceCount, setAdviceCount] = useState([]);
  // const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    fetchPusher();
    // console.log(message);
  }, []);

  // const handleChange = async (e) => {
  //   e.preventDefault();
  //   const responseBot = await axiosClient.post("bot-controller");
  //   // console.log(`post ${responseBot.data.botStatus}`);
  //   if (responseBot.data.botStatus == 1) {
  //     setIsBot(true);
  //   } else if (responseBot.data.botStatus == 0) {
  //     setIsBot(false);
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
  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };
  // const formattedNumber = numberWithCommas(parseFloat(sum));
  // const formattedNumberLastMonth = numberWithCommas(parseFloat(sumLastMonth));
  const formattedAllWithdraw = numberWithCommas(parseFloat(allWithdraw));
  const formattedAllMoney = numberWithCommas(parseFloat(allMoney));
  const formattedAdvice = numberWithCommas(parseFloat(advice));
  const data = [
    { id: 0, value: 40, label: "Free" },
    { id: 1, value: 30, label: "VIP 1" },
    { id: 2, value: 20, label: "VIP 2" },
    { id: 3, value: 10, label: "Diamond" },
  ];
  const fetchPusher = async () => {
    const yorState = localStorage.getItem("state");
    const yourId = localStorage.getItem("user_id");
    console.log(yourId);
    // console.log(yorState);
    if (yorState == "super_admin" && yourId != "682") {
      try {
        // const responseBot = await axiosClient.get("bot-controller");
        // // console.log(`get ${responseBot.data.botStatus}`);
        // if (responseBot.data.botStatus == 1) {
        //   setIsBot(true);
        // } else if (responseBot.data.botStatus == "off") {
        //   setIsBot(false);
        // }
        const response = await axiosClient.get("dataUserCount");
        setUserCount(response.data.data);
        // console.log(response.data.data);
        const responseAdmin = await axiosClient.get("dataAdminCount");
        setAdmin(responseAdmin.data.data);
        // console.log(responseAdmin.data.data);
        const responseAdvice = await axiosClient.get("dataAdvicesCount");
        setAdvice(responseAdvice.data.data);
        // console.log(responseAdvice.data.data);
        const responseBanned = await axiosClient.get("dataUserCountBanned");
        setBan(responseBanned.data.data);
        // console.log(responseBanned.data.data);
        const responseAllMoney = await axiosClient.post("getSumMoney");
        setAllMoney(responseAllMoney.data.sum);
        // console.log(responseAllMoney.data.sum);
        console.log(responseAllMoney);

        const responseAllWithdraw = await axiosClient.get("withdraw");
        setAllWithdraw(responseAllWithdraw.data.sumPendingUsers);
        // console.log(responseAllWithdraw.data.data);
        // console.log(responseAllWithdraw);

        // const responseMoneyTransaction = await axiosClient.post(
        //   "get_money_user_transaction"
        // );
        // setSum(responseMoneyTransaction.data.sum);
        // setSumLastMonth(responseMoneyTransaction.data.sumLastMonth);
        // console.log(responseAllWithdraw.data.data);
        // console.log(responseMoneyTransaction.data);

        const responseAdviceCount = await axiosClient.get(
          "dataLastAdviceCount"
        );
        setAdviceCount(responseAdviceCount.data.data);
        // console.log(responseAdviceCount.data.data);
        const responsePayment = await axiosClient.get("dataLastPaymentCount");
        setPayment(responsePayment.data.data);
        // setPlans(responsePayment.data.data);
        // setUsers(responsePayment.data.data);
        // console.log(responsePayment.data.data);
        // console.log(responsePayment.data.plans);
        // console.log(responsePayment.data.userNames);
      } catch (err) {
        console.log(err);
        // window.location.href = "/dashboard/recommendation";
        // if (err.message == "Request failed with status code 403") {
        // window.location.href = "/dashboard/recommendation";
        // }
      } finally {
        setLoading(false);
      }
    } else {
      // window.location.href = "/dashboard/recommendation";
    }
    // }
  };
  return (
    <>
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
          {/* <!-- ======= Header ======= --> */}

          <div className="pagetitle">
            {/* <h1>اهلا وسهلا بكم</h1> */}
            <nav>
              <ol className="breadcrumb">
                {/* <li className="breadcrumb-item active">to Upvela</li> */}
              </ol>
            </nav>
          </div>
          {/* <!-- End Page Title --> */}

          <section id="saad" className="section dashboard p-0 ">
            <div className="row flex-row md:flex-column">
              {/* <!-- Left side columns --> */}
              <div className="col-xxl-7 col-md-12 m-auto d-flex justify-between flex-wrap flex-row">
                {/* <div className="col-xxl-6 col-md-12 info-card d-flex flex-wrap justify-evenly"> */}
                {/* <!-- Sales Card --> */}
                <div className="col-xxl-3 col-md-10 info-card">
                  <div className="card info-card sales-card">
                    <Link to="/dashboard/users">
                      <div className="card-body">
                        <h2 className="card-title">عدد المستخدمين</h2>

                        <div className="d-flex align-items-center justify-content-center ">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                            {/* <Icon icon="pepicons-pop:people" /> */}
                          </div>
                          <div className="ps-3">
                            <h6>{userCount ? userCount : 0}</h6>
                            {/* <span className="text-muted small pt-1 fw-bold">
                                32.5%
                              </span>{" "}
                              <span className="text-muted small pt-2 ps-1">
                                increase
                              </span> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <!-- End Sales Card --> */}

                {/* <!-- Revenue Card --> */}
                <div className="col-xxl-3 col-md-10 info-card">
                  <div className="card info-card revenue-card">
                    <Link to="/dashboard/admins">
                      <div className="card-body">
                        <h5 className="card-title">عدد الادمن</h5>

                        <div className="d-flex align-items-center justify-content-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-person"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{admin ? admin : 0}</h6>
                            {/* <span className="text-muted small pt-1 fw-bold">
                                3.13%
                              </span>{" "}
                              <span className="text-muted small pt-2 ps-1">
                                increase
                              </span> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <!-- End Revenue Card --> */}

                {/* <!-- Customers Card --> */}
                <div className="col-xxl-3 col-md-10 info-card">
                  <div className="card info-card customers-card">
                    <Link to="/dashboard/captien">
                      <div className="card-body">
                        <h5 className="card-title">عدد النصائح</h5>

                        <div className="d-flex align-items-center justify-content-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-chat-right-text"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{formattedAdvice}</h6>
                            {/* <span className="text-muted small pt-1 fw-bold">
                                100%
                              </span>{" "}
                              <span className="text-muted small pt-2 ps-1">
                                Totel
                              </span> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <!-- End Customers Card --> */}

                {/* <!-- Sales Card --> */}
                <div className="col-xxl-3 col-md-10 info-card">
                  <div className="card info-card sales-card">
                    <Link to="/dashboard/panning">
                      <div className="card-body">
                        <h5 className="card-title">عدد الاكونتات المحظورة</h5>

                        <div className="d-flex align-items-center justify-content-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-person-dash"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{ban ? ban : 0}</h6>
                            {/* <span className="text-muted small pt-1 fw-bold">
                                3.13%
                              </span>{" "}
                              <span className="text-muted small pt-2 ps-1">
                                decrease
                              </span> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <!-- End Sales Card --> */}

                {/* <!-- allWithdraw Card --> */}
                <div className="col-xxl-3 col-md-10 info-card">
                  <div className="card info-card revenue-card">
                    <Link to="/dashboard/userswithdraw">
                      <div className="card-body">
                        <h5 className="card-title">اجمالي مبالغ السحب</h5>

                        <div className="d-flex align-items-center justify-content-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            {/* <i className="bi bi-currency-dollar"></i> */}
                            <Icon icon="mingcute:tether-usdt-line" />
                          </div>
                          <div className="ps-3">
                            <h6>{` ${formattedAllWithdraw} $`}</h6>
                            {/* <span className="text-muted small pt-1 fw-bold">
                                15.13%
                              </span>{" "}
                              <span className="text-muted small pt-2 ps-1">
                                increase
                              </span> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <!-- End allWithdraw Card --> */}
                {/* <!-- allMoney Card --> */}
                <div className="col-xxl-3 col-md-10 info-card">
                  <div className="card info-card revenue-card">
                    <Link to="/dashboard/usersprofit">
                      <div className="card-body">
                        <h5 className="card-title">الجرد الآن</h5>

                        <div className="d-flex align-items-center justify-content-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            {/* <i className="bi bi-currency-dollar"></i> */}
                            <Icon icon="mingcute:tether-usdt-line" />
                          </div>
                          <div className="ps-3">
                            <h6>{` ${formattedAllMoney} $`}</h6>
                            {/* <span className="text-muted small pt-1 fw-bold">
                                15.13%
                              </span>{" "}
                              <span className="text-muted small pt-2 ps-1">
                                increase
                              </span> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                {/* <!-- End allMoney Card --> */}
                  {/* <div className="col-xxl-3 col-md-10 info-card">
                  <div className="card info-card sales-card">
                    <Link to="/buffer/UserBuffer">
                      <div className="card-body">
                        <h5 className="card-title">الخزنة</h5>

                        <div className="d-flex align-items-center justify-content-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-file-lock"></i>
                          </div>
                          {/* <div className="ps-3"> */}
                            {/* <h6>{ban ? ban : 0}</h6> */}
                            {/* <span className="text-muted small pt-1 fw-bold">
                                3.13%
                              </span>{" "}
                              <span className="text-muted small pt-2 ps-1">
                                decrease
                              </span> */}
                          {/* </div> *
                        </div>
                      </div>
                    </Link>
                  </div>
                </div> */}
              </div>
              <div className="col-xxl-5 col-md-12 info-card">
                <div className="card info-card revenue-card align-items-center">
                  <PieChart
                    series={[
                      {
                        data,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    colors={["#FBD535", "#629BDD", "#84C25E", "#B5ADAD"]}
                    height={350}
                    width={550}
                    style={{
                      direction: "ltr",
                    }}
                  />
                </div>
              </div>
              {/* <!-- get_money_user_transaction_last_month Card --> */}
              {/* <div className="col-xxl-4 col-md-6">
                    <div className="card info-card money-card">
                    {/* <Link to="/dashboard/usersprofit">  
                      <div className="card-body">
                        <h2 className="card-title">
                          اجمالي مبالغ الايداع هذا الشهر
                        </h2>

                        <div className="d-flex align-items-center justify-content-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar"></i>
                          </div>
                          <div className="ps-3">
                            <h5>{` ${formattedNumberLastMonth} $`}</h5>
                            {/* <span className="text-success small pt-1 fw-bold">
                              32.5%
                            </span>{" "}
                            <span className="text-muted small pt-2 ps-1">
                              increase
                            </span> 
                          </div>
                        </div>
                      </div>
                       {/* </Link>  
                    </div>
                  </div> */}
              {/* <!-- End get_money_user_transaction_last_month Card --> */}

              {/* <!-- get_money_user_transaction Card --> */}
              {/* <div className="col-xxl-4 col-md-6"> 
                    <div className="card info-card money-card">
                      {/* <Link to="/dashboard/usersprofit"> 
                      <div className="card-body">
                        <h2 className="card-title">اجمالي مبالغ الايداع</h2>

                        <div className="d-flex align-items-center justify-content-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar"></i>
                          </div>
                          <div className="ps-1">
                            <h5>{` ${formattedNumber} $`}</h5>
                            {/* <span className="text-success small pt-1 fw-bold">
                              32.5%
                            </span>{" "}
                            <span className="text-muted small pt-2 ps-1">
                              increase
                            </span> 
                          </div>
                        </div>
                      </div>
                      {/* </Link> 
                    </div>
                  </div> */}
              {/* <!-- End get_money_user_transaction Card --> */}

              {/* <!-- bot Card --> */}
              {/* <div className="col-xxl-4 col-md-12">
                    <div className="card info-card sales-card">
                      <div className="card-body">
                        <h2 className="card-title">البوت</h2>
                        <div className="d-flex align-items-center justify-center">
                          <div className="fx-block">
                            <div className="toggle ">
                              <div className="cursor-pointer">
                                <input
                                  type="checkbox"
                                  id="toggles"
                                  className="cursor-pointer"
                                  checked={isBot}
                                  onChange={handleChange}
                                />
                                <div
                                  data-unchecked="On"
                                  data-checked="Off"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
              {/* <!-- End bot Card --> */}

              {/* <!-- Reports --> */}

              {/* <!-- End Reports --> */}

              {/* <!-- Recent Sales --> */}
              <Link to="/dashboard/users">
                <div className="col-12">
                  <div className="card table recent-sales overflow-auto">
                    <div className="card-body">
                      <h5 className="card-title">اخر عمليات الدفع</h5>

                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">رقم العملية</th>
                            <th scope="col">اسم المستخدم</th>
                            <th scope="col">الباقة</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        {payment.map((payment, key) => (
                          <tbody key={key}>
                            <tr>
                              <th scope="row">{key + 1}</th>
                              <td>{payment.transaction_id}</td>

                              <td>{payment.user ? payment.user.name : null}</td>
                              <td>{payment.plan.name}</td>
                              <td>
                                {payment.status == "success" ? (
                                  <span className="badge bg-success">
                                    {payment.status}
                                  </span>
                                ) : payment.status == "declined" ? (
                                  <span className="badge bg-danger">
                                    {payment.status}
                                  </span>
                                ) : (
                                  <span className="badge bg-warning">
                                    {payment.status}
                                  </span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </Link>
              {/* <!-- End Recent Sales --> */}

              {/* <!-- Top Selling --> */}
              <Link to="/dashboard/recommendation">
                <div className="col-12">
                  <div className="card table top-selling overflow-auto">
                    <div className="card-body pb-0">
                      <h5 className="card-title">اخر النصائح</h5>

                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            {/* <th scope="col">title</th> */}
                            <th scope="col">#</th>
                            {/* <th scope="col">By</th> */}
                            <th scope="col">العملة</th>
                            <th scope="col">الحالة</th>
                            <th scope="col">تاريخ الإنشاء</th>
                          </tr>
                        </thead>
                        {adviceCount.map((advice, key) => (
                          <tbody key={key}>
                            <tr>
                              {/* <th scope="row">
                            {advice.title}
                          </th> */}
                              <th>{key + 1}</th>
                              {/* <td>
                        {advice.user ? advice.user.name : ""}
                      </td> */}
                              <th scope="row">
                                <a href="#">{advice.currency}</a>
                              </th>
                              <td>
                                {advice.DoneBot ? (
                                  advice.DoneBot.status == 0 ? (
                                    <div className="text-green-500">
                                      Not begin
                                    </div>
                                  ) : advice.DoneBot.status > 0 ? (
                                    <>
                                      <div className="text-yellow-500">
                                        Active{" "}
                                      </div>
                                    </>
                                  ) : advice.DoneBot.status == -1 ? (
                                    advice.DoneBot.last_tp == null ? (
                                      <div className="text-red-500">
                                        stop lossed
                                      </div>
                                    ) : advice.DoneBot.last_tp == 0 ? (
                                      <div className="text-red-500">
                                        stop lossed
                                      </div>
                                    ) : (
                                      <div className="text-green-500">
                                        buy in target
                                        {advice.DoneBot.last_tp}
                                      </div>
                                    )
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>{advice.created_at}</td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              </Link>
              {/* <!-- End Top Selling --> */}
            </div>
            {/* </div> */}
            {/* <!-- End Left side columns --> */}

            {/* <!-- Right side columns --> */}

            {/* <!-- End Right side columns --> */}
            {/* </div> */}
          </section>

          {/* <!-- End #main --> */}
        </>
      )}
    </>
  );
}

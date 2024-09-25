/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";

export default function UserAfiliate() {
  // eslint-disable-next-line no-unused-vars
  const [transactions, setTransactions] = useState({});
    // eslint-disable-next-line no-unused-vars
  const [historypayment, setHistorypayment] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTable, setCurrentTable] = useState("");

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
          `child_fathers_generation?usr_id=${idValue}`
        );
        console.log(response);
        // setTransactions(response.data.transactions);
        //historypayment
        // setHistorypayment(response.data.historypayment);
        //BuySellBinance
        // setBuySellBinance(response.data.BuySellBinance);
        //DepositsBinance
        // setDepositsBinance(response.data.DepositsBinance);
        // console.log(response.data.DepositsBinance);
        //binanceloges
        // setBinanceloges(response.data.binanceloges);
        //historyAllProfit
        // setHistoryAllProfit(response.data.historyAllProfit);
        // MarktingAllProfit
        // setMarktingAllProfit(response.data.MarktingAllProfit);
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
      <div className="mb-3">
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
                    transactions.filter(users => users.receiver_name !== "Me").map((users, index) => (
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
                            ) : users.receiver_name && users.receiver_name.name ? (
                                users.receiver_name.name
                              ) : 
                             null}
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
                              <div className="text-primary">{users.status}</div>
                            ) : users.status == "declined" ? (
                              <div className="text-danger">{users.status}</div>
                            ) : (
                              <div className="text-success">{users.status}</div>
                            )}
                          </td>
                          <td>
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
                        no logs historypayment user found
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
    </>
  );
}

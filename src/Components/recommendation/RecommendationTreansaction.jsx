/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Form,
    Modal
} from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";

let RecommendationTreansaction = () => {
  const [buyTransactions, setBuyTransactions] = useState([]);
  const [sellTransactions, setSellTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shutdownBot, setShutdownBot] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showCurrency, setShowCurrency] = useState(false);
  const [usersCurrency, setUsersCurrency] = useState(null);
  const [usersSellCurrency, setUsersSellCurrency] = useState(null);
  const [confirmCurrency, setConfirmCurrency] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState('100');
  useEffect(() => {
    fetchPusher();
  }, []);
  const handleShowDetails = (recommendation) => {
    setShowDetails(true);
    setUserDetails(recommendation.massageError);
};
const handleCloseDetails = () => {
  setShowDetails(false);
  setUserDetails(null);
};
const handlePercentageChange = (event) => {
  // console.log(usersSellCurrency.free/100*event.target.value);
  setSelectedPercentage(event.target.value);
  // setFinalPercentage(usersSellCurrency.free/100*event.target.value);
};
  const handleShutdownBotConfirm = async () => {
    if (!shutdownBot) return;

    const { id } = shutdownBot;

    try {
      const archiveData = {
        recomondations_id: id,
        shutdown: shutdownBot.DoneBot.status == 0 ? -1 : 0,
      };
      const response = await axiosClient.post(
        "stopBotRecomindation",
        archiveData
      );

      if (response.data.success) {
        window.location.href = "/dashboard/recommendation?ShutdownBot";
      }
    } catch (error) {
      setErrorMessage("Error bot recommendation");
      console.log(error);
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
  const fetchPusher = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idValue = urlParams.get("recommendation_id");
    try {
      const response = await axiosClient.post("gettreansactionRecomindation", {
        recomondations_id: idValue,
      });
      setBuyTransactions(response.data.buyTransactions);
      setSellTransactions(response.data.sellTransactions);
      console.log(response.data);
      if (window.location.search.includes("ShutdownBot")) {
        setSuccessMessage("تم ايقاف الروبوت بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    }finally {
      setLoading(false);
    }
  };
  const handleCurrencyCloseDetails = () => {
    setShowCurrency(false);
    setUsersCurrency(null);
    setUserId(null);
  };
  const handleShowCurrency = async (userDetails) => {
    console.log(userDetails);
    setUserId(userDetails.email);
    try {
      setShowCurrency(true);
      
      const response = await axiosClient.post(`getallcurrency`, {
        email: userDetails.email,
      });
      if (!response.data.success) {
        setErrorMessage(response.data.message);
        // console.log(response.data);
      } else {
        setUsersCurrency(response.data.message);
        // console.log(response.data);
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
  
  return (
    <>
    <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>عرض التفاصيل</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userDetails
            ? userDetails.split("\n").map((item, index) => (
                <div key={index}>
                  {item}
                  <br />
                </div>
              ))
            : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={shutdownBot !== null} onHide={() => setShutdownBot(null)}>
        <Modal.Header closeButton>
          <Modal.Title>إيقاف تشغيل البوت</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>هل أنت متأكد أنك تريد إيقاف تشغيل البوت؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            style={{
              width: "10rem",
              margin: "auto",
            }}
            onClick={handleShutdownBotConfirm}
          >
            إيقاف تشغيل البوت
          </Button>
          <Button
            variant="secondary"
            style={{
              width: "10rem",
              backgroundColor: "black",
              borderColor: "#f0ad4e",
              margin: "auto",
              color: "white",
            }}
            onClick={() => setShutdownBot(null)}
          >
            إلغاء
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
                    <th scope="col">ييع</th>
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
                          {user.asset != "USDT" ? (
                            <Button
                              variant="primary"
                              onClick={() => setConfirmSellCurrency(user,userId)}
                            >
                              ييع
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
          <div className="table-borderless min-h-[100vh]">
            <div className="d-flex justify-around">
            <p className="text-white text-center text-lg col-lg-3">
              عدد الشراء الصحيح : <>{buyTransactions.slice().filter((recommendation) => recommendation.status == "FILLED").length}</>
            </p>
            <p className="text-white text-center text-lg col-lg-3">
              عدد البيع الصحيح : <>{sellTransactions.length}</>
            </p>
            <p className="text-white text-center text-lg col-lg-3">
              اسم العملة : <>{sellTransactions.length > 0?sellTransactions[0].symbol:buyTransactions.length > 0? buyTransactions[0].symbol:""}</>
            </p>
            </div>
            <div className="d-flex justify-around flex-wrap">
            <table className="table table-borderless w-[45%]">
              <thead>
              {buyTransactions ? (
                <tr>
                  {/* <th>#</th> */}
                  <th>الاسم</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>الحالة</th>
                  <th>العملات</th>
                </tr>
              ) : null}
              </thead>
              <tbody>
                {buyTransactions && buyTransactions.length > 0
                  ? buyTransactions.slice().filter((recommendation) => recommendation.status == "FILLED").sort((a, b) => a.user_id - b.user_id).map((recommendation, key) => (
                      <tr key={key + 1}>
                        {/* <td>{key + 1}</td> */}
                        <td>{recommendation.name}</td>
                        <td>{recommendation.price}</td>
                        <td>{String(recommendation.quantity).slice(0, 10)}</td>
                        <td>{recommendation.status == "NEW"? <div className="text-warning">Watting</div>  :recommendation.status == "FILLED"? <div className="text-success">SUCCESS</div>:recommendation.status == "CANCELED"? <div className="text-secondary">{recommendation.status}</div>:<a href="#" className="text-danger" onClick={() => handleShowDetails(recommendation)}>{recommendation.status}</a>}</td>
                        <td>
                            <Button
                            variant="primary"
                            className="ms-2"
                            onClick={() => {
                              setShowDetails(false);
                              handleShowCurrency(recommendation);
                            }}
                          >
                          <i className="bi bi-currency-bitcoin"></i>    
                          </Button>
                        </td>
                      </tr>
                    ))
                  : null}
              
              </tbody>
            </table>
            <table className="table table-borderless w-[48%]">
              <thead>
            
                {sellTransactions ? (
                <tr>
                  <th>الاسم</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>الرسوم</th>
                  <th>المكاسب</th>
                  {/* <th>المتبقي</th> */}
                  <th>الحالة</th>
                  {/* <th>ايقاف العملة</th> */}
                </tr>
              ) : null}
              </thead>
              <tbody>
                
                {sellTransactions && sellTransactions.length > 0
                  ? sellTransactions
                      .slice()
                      .sort((a, b) => a.user_id - b.user_id)
                      .map((recommendation, key) => (
                        <tr key={key + 1}>
                          <td>{recommendation.name}</td>
                          <td>{ recommendation.price }</td>
                          <td>{ recommendation.quantity }</td>
                          <td>{ String(recommendation.fees).slice(0, 10) }</td>
                          <td>{ String(recommendation.profit_usdt).slice(0, 10) }</td>
                          {/* <td>{ recommendation.profit_usdt }</td> */}
                          <td>{recommendation.status == "NEW"? <div className="text-warning">Watting</div>  :recommendation.status == "FILLED"? <div className="text-success">SUCCESS</div>:recommendation.status == "CANCELED"? <div className="text-secondary">{recommendation.status}</div>:<a href="#" className="text-danger" onClick={() => handleShowDetails(recommendation)}>{recommendation.status}</a>}</td>
                          {/* <td>
                          {recommendation.status != "FILLED"?
                          
                               <Button
                                className="hover:text-red-500 flex justify-center"
                                variant="success"
                                style={{ margin: "2px" }}
                                onClick={() => setSellCurrency(recommendation)}
                              >
                              بيع
                              </Button>
                          
                            :<div className="text-success">تم البيع</div>}
                          </td> */}
                        </tr>
                      ))
                  : null}
              </tbody>
            </table>
            <table className="table table-borderless w-[100%]">
              <thead>
              {buyTransactions ? (
                <tr>
                  <th>الاسم</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>الحالة</th>
                </tr>
              ) : null}
              </thead>
              <tbody>
                {buyTransactions && buyTransactions.length > 0
                  ? buyTransactions.slice().filter((recommendation) => recommendation.status != "FILLED").sort((a, b) => a.user_id - b.user_id).map((recommendation, key) => (
                      <tr key={key + 1}>
                        <td>{recommendation.name}</td>
                        <td>{ recommendation.price }</td>
                        <td>{ recommendation.quantity }</td>
                        <td>{recommendation.status == "NEW"? <div className="text-warning">Watting</div>  :recommendation.status == "FILLED"? <div className="text-success">SUCCESS</div>:recommendation.status == "CANCELED"? <div className="text-secondary">{recommendation.status}</div>:<a href="#" className="text-danger" onClick={() => handleShowDetails(recommendation)}>{recommendation.status}</a>}</td>
                      
                      </tr>
                    ))
                  : null}
              
              </tbody>
            </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecommendationTreansaction;

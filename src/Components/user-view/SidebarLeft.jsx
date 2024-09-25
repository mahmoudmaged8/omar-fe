import { useEffect, useState } from "react";
import axiosClient from "../../axiosClientFront";
import { Alert } from "react-bootstrap";

export default function SidebarLeft() {
  const [money, setMoney] = useState([]);
  const [points, setPoints] = useState([]);
  const [link, setLink] = useState([]);
  const [affiliate, setAffiliate] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPusher()
  })
  const fetchPusher = async () => {
    try {
      const response = await axiosClient.post("me");
      setMoney(response.data.user.money);
      setPoints(response.data.user.money);
      setLink(response.data.user.affiliate_link);
      setAffiliate(response.data.user.number_of_user);
    } catch (err) {
      console.log(err);
      if(err.message =="Network Error"){
        setErrorMessage(`الانترنت لا يعمل`);
      }else{
        setErrorMessage(`Error fetching me : ${err.message}`);
      }
    } 
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <div className="col-12 col-lg-12 col-xl-3 order-3 order-lg-3">
        <div className="card-body h-100">
          <div className="media">
            <img
              src="/src/assets/img/bitcoin (1).png"
              width="50"
              height="50"
              className="mr-2"
              alt="total Balnce"
            />
            <div className="media-body">
              <strong>Total Point</strong>
              <br />
              <strong>{points}</strong>
              <br />
            </div>
          </div>

          <div className="media">
            <img
              src="/src/assets/img/bitcoin.png"
              width="50"
              height="50"
              className="mr-2"
              alt="total Balnce"
            />
            <div className="media-body">
              <strong>Tatal balance</strong>
              <br />
              <strong>${money}</strong>
              <br />
            </div>
          </div>

          <div className="media">
            <img
              src="/src/assets/img/skills.png"
              width="50"
              height="50"
              className="mr-2"
              alt="total Balnce"
            />
            <div className="media-body">
              <strong>Affiliate Link</strong>
              <br />
              <a href={link}>
                <button
                  style={{color: 'azure' ,backgroundColor:'#2893c9', 
                    border: 'none',
                    borderRadius: '.25rem', 
                    fontSize: '20px',
                    width: '6rem',}}
                >
                  Copy{" "}
                </button>
              </a>
              <br />
            </div>
          </div>

          <div className="media">
            <img
              src="/src/assets/img/affiliate-marketing (2).png"
              width="50"
              height="50"
              className="mr-2"
              alt="total Balnce"
            />
            <div className="media-body">
              <strong>Incoming Affiliate</strong>
              <br />
              <strong>{affiliate}</strong>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

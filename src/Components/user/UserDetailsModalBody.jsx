/* eslint-disable react/prop-types */
import { useState } from "react"; // Import useState
import { Alert, Button } from "react-bootstrap";

const UserDetailsModalBody = ({ userDetails, setShowDetails }) => {
console.log(userDetails);
  // State variable to track whether binanceloges should be shown
  // const [showBinanceloges, setShowBinanceloges] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleShowUserDetails = async (userDetails) => {

      setShowDetails(false);
      window.location.href = `/dashboard/userAfiliate?id=${userDetails.id}`
  
  };

  return (
    <>
    
    {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      {userDetails && (
        <>
          <p>id: {userDetails.id}</p>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>
            {userDetails.number_of_user > 0 ? (
              <p>
                Number Of User:{" "}
                <Button
                  variant="primary"
                  size="sm"
                  className="ms-2"
                  onClick={() => {
                    setShowDetails(false);
                    handleShowUserDetails(userDetails);
                  }}
                >
                  {userDetails.number_of_user}
                </Button>
              </p>
            ) : (
              <p>Number Of User: {userDetails.number_of_user}</p>
            )}
          </p>
          <p>Plan: {userDetails.plan ? userDetails.plan.name : "No Plan"}</p>
          <p>comming afflite: {userDetails.comming_afflite ? userDetails.comming_afflite : userDetails.affiliate_code}</p>
          {userDetails.Role?userDetails.Role.length > 0?<p>Yor Role: { userDetails.Role.map((role)=>(<div key={role.id}>{role.name}</div>))} </p>: null:null}
          {/* <Button
            variant="primary"
            size="sm"
            className="mt-2"
            onClick={() => setShowBinanceloges(!showBinanceloges)}
          >
            {showBinanceloges ? "Hide Binanceloges" : "Show Binanceloges"}
          </Button>
          {showBinanceloges && userDetails.binanceloges ? (
            userDetails.binanceloges.map((binancelog) => (
              <ul key={binancelog.id}>
                {binancelog.symbol ? <li>currency:{binancelog.symbol}</li> : null}
                {binancelog.price ? <li>price:{binancelog.price}</li> : null}
                {binancelog.quantity ? <li>quantity:{binancelog.quantity}</li> : null}
                {binancelog.status ? <li>status:{binancelog.status}</li> : null}
                {binancelog.massageError ? <li className="text-danger">massageError:${binancelog.massageError}</li> : null}
                <br />
              </ul>
            ))
          ) : null} */}
        </>
      )}
    </>
  );
};

export default UserDetailsModalBody;

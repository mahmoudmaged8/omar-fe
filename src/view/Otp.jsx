import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import OtpInput from "react18-input-otp";
import axiosClient from "../axiosClientFront";
import { UserStateContext } from "../contexts/ContextProvider";
// import axiosClientOff from "../axios_offline";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  const [email] = useState(localStorage.getItem("email"));
  const [action] = useState("Activate");
  console.log(email);
  
  useEffect(() => {
    handleResend();
  })

    const handleResend = () => {
      axiosClient
      .post("resendOtp", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  const handleSubmit = () => {
    console.log({
      email: email,
      otp: otp,
      action: action,
    });
    axiosClient
      .post("checkOtp", {
        email: email,
        otp: otp,
        action: action,
      })
      .then((res) => {
        console.log(res.data);
        // console.log(res);
        if (res.data.success) {
          // localStorage.setItem("checkOtp", res.data.success);
          console.log(res.data.user);
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { currentUser } = UserStateContext();
  return (
    <>
    <div className="flex justify-center position-absolute" style={{right:"50%" ,bottom:"50%"}} id="otp">
      <div className=" w-md rounded overflow-hidden shadow-lg bg-sk">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold bg-white">Enter OTP</h1>
      <img src={currentUser.imageUrl} alt=""  width={"100px"}/>
          <OtpInput
            className="otp-field border-0 pe-[12px]"
            value={otp}
            onChange={handleChange}
            numInputs={6}
            isSucceeded={true}
            successStyle="success"
            separator={<span>-</span>}
            separateAfter={3}
            onSubmit={handleSubmit}
          />
          <div>
          <Button type="submit" onClick={handleSubmit} className="btn text-sky-600 text-2xl font-bold">
            Enter
          </Button>
          <Button type="submit" onClick={handleResend} className="btn text-sky-600 text-2xl font-bold">
            Resend OTP
          </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Otp;

/* eslint-disable react-hooks/exhaustive-deps */
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientFront";
import { ChatMessage } from "./ChatMessage";

const Recommendation = () => {
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const bottomRef = useRef(null);
  const requestDelay = 5000; // Adjust this value to set the delay between consecutive requests (in milliseconds)


  const fetchme = async () => {
    try {
      const response = await axiosClient.post("me");
      localStorage.setItem("plan", response.data.user.plan.nameChannel);
    } catch (err) {
      console.log(err);
      if(err.message =="Network Error"){
        setErrorMessage(`الانترنت لا يعمل`);
      }else{
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } 
  };

  useEffect(() => {
    fetchPusher();
    fetchme();
    const plan = localStorage.getItem("plan");
    Pusher.logToConsole = true;
    var pusher = new Pusher('b2636ae7a9413d9bf90b', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe(`recommendation_${plan}`);
    channel.bind(`recommendation_${plan}`, function (data) {
    
      const recommendation = data;
      setMessages((prevMessages) => [recommendation, ...prevMessages]);
      fetchPusherWithDelay(); // Fetch new data after receiving a Pusher event
    });

    return () => {
      channel.unbind();
      pusher.unsubscribe(`recommendation_${plan}`);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchPusher = async () => {
    try {
      const response = await axiosClient.post("advice");
      setMessages(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
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
  const fetchPusherWithDelay = () => {
    setTimeout(fetchPusher, requestDelay); // Delay before making the next request
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
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
          {messages
            ? messages.map((advice) => (
                <ChatMessage key={advice.id} message={advice} />
              ))
            :  <>
    {Array(10)
      .fill("")
      .map((e, i) => (
        <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </> }
        </>
      )}
    </>
  );
};

export default Recommendation;

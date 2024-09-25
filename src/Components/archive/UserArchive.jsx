import { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientFront";
import { ChatMessageArchive } from "./ChatMessageArchive";

export default function UserArchive() {
  const [archives, setArchive] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const bottomRef = useRef(null);

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
    try {
      const response = await axiosClient.get("archive");
      setArchive(response.data.data);
    } catch (err) {
      console.log(err);
      if(err.message =="Network Error"){
        setErrorMessage(`الانترنت لا يعمل`);
      }else{
        setErrorMessage(`Error fetching archive : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [archives]);

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
          <>
          {Array(10)
            .fill("")
            .map((e, i) => (
              <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
            ))}
        </>
      ) : (
        <>
          {archives >0 ?archives.map((archive) => (
            <ChatMessageArchive key={archive.id} message={archive} />
          ))
            :   <>
            {Array(10)
              .fill("")
              .map((e, i) => (
                <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
              ))}
          </>}
          <div ref={bottomRef}></div>
        </>
      )}
    </>
  );
}
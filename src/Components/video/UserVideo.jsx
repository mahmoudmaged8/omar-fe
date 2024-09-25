import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import { BsPlayCircleFill } from "react-icons/bs";
import axiosClient from "../../axiosClientOffline";
import axiosClientImage from "../../axios_img_offline";


export default function Video() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axiosClient.get("video");
      setVideos(response.data.data);
      // console.log(response.data.data);
      if (response.data.data[0].video != null) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if(error.message =="Network Error"){
        setErrorMessage(`الانترنت لا يعمل`);
      }else{
        setErrorMessage(`Error fetching videos : ${error.message}`);
      }

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
  const handleVideoToggle = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  return (
    <>
      <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
        <Modal show={showVideoModal} onHide={handleCloseVideoModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedVideo?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>{selectedVideo?.title}</strong>
            <video
              src={`${axiosClientImage.defaults.baseURL}Videos/${selectedVideo?.video}`}
              controls
              style={{
                width: "100%",
              }}
            />
            <p>{selectedVideo?.desc}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseVideoModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        
      </>

      {loading ? (
        <div className="mt-[8rem]">
    {Array(10)
      .fill("")
      .map((e, i) => (
        <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </div> 
      ) : (
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {videos.map((video) => (
            <li key={video.id} className="flex flex-col col-12 items-center my-4">
              <div style={{ position: "relative" }}>
                <img
                  src={`${axiosClientImage.defaults.baseURL}videosthumbnails/${video.img}`}
                  alt={video.title}
                  onClick={() => handleVideoToggle(video)}
                  style={{ cursor: "pointer", margin: "0" ,maxWidth: "250px"}}
                />
                <BsPlayCircleFill
                  className="play-icon"
                  onClick={() => handleVideoToggle(video)}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <video
                  id={`video-${video.id}`}
                  src={`${axiosClientImage.defaults.baseURL}Videos/${video.video}`}
                  controls
                  style={{
                    display: "none",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 999,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

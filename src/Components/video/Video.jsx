/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
    Alert,
    Button,
    ButtonGroup,
    Dropdown,
    DropdownButton,
    Modal,
} from "react-bootstrap";
import ContentLoader from "react-content-loader";
import YouTube from "react-youtube";
import axiosClient from "../../axiosClientOffline";
import axiosClientImage from "../../axios_img_offline";
import AddVideo from "./AddVideo";
import EditVideo from "./EditVideo";
import axiosClientF from "../../axiosClientFront";

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchVideos();
    fetchPusher_me();
  }, []);
  const fetchPusher_me = async () => {
    try {
      const response = await axiosClientF.post("me");
      setId(response.data.user.id);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching me : ${err.message}`);
      }
    }
  };
  const fetchVideos = async () => {
    try {
      const response = await axiosClient.get("video");
      setVideos(response.data.data);
      console.log(response.data.data);
      if (window.location.search.includes("success")) {
        setSuccessMessage("Video updated successfully");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("update")) {
        setSuccessMessage("Video update successfully");
        window.history.replaceState(null, "", window.location.pathname);
      }
      if (response.data.data) {
        setLoading(false);
      }
    } catch (error) {
      if (error.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (error.message == "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
      } else if (error.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${error.message}`);
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
  const deleteVideo = async (id) => {
    try {
      await axiosClient.delete(`video/${id}`);
      setVideos(videos.filter((video) => video.id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(`Error fetching videos : ${error.message}`);
    }
  };

  const handleVideoToggle = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const handleImageToggle = (video) => {
    setSelectedImage(video);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  const handleShowCreate = () => {
    setShowCreate(true);
  };

  const handleCloseCreate = () => {
    setShowCreate(false);
  };

  const handleShowDeleteModal = (id) => {
    setSelectedVideoId(id);
    setShowDeleteModal(true);
  };

  const handleShowEditModal = (id) => {
    setSelectedVideo(id);
    // console.log(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
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
      <div>
        <Modal show={showCreate} onHide={handleCloseCreate}>
          <Modal.Header closeButton>
            <Modal.Title>Add Video</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" text-center">
            <AddVideo />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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
        <Modal show={showImageModal} onHide={handleCloseImageModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedImage?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong>{selectedImage?.title}</strong>
            <img
              src={`${axiosClientImage.defaults.baseURL}videosthumbnails/${selectedImage?.img}`}
              style={{
                width: "100%",
              }}
            />
            <p>{selectedImage?.desc}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseVideoModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this video?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteVideo(selectedVideoId)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Video</Modal.Title>
          </Modal.Header>
          <Modal.Body className=" text-center">
            <EditVideo video={selectedVideo} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreate}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="flex justify-center mb-3">
        {id != "682" ? (
          <Button onClick={handleShowCreate}>Add Video</Button>
          ) : null}
        </div>
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
        <table className="table table-borderless   min-h-[100vh]">
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>description</th>
              <th>Image</th>
              <th>Video</th>
              {id != "682" ? (
              <th style={{ width: "12rem", textAlign: "center" }}>Action</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={video.id}>
                <td>{index + 1}</td>
                <td>{video.title}</td>
                <td>{video.desc}</td>
                <td>
                  {video.img ? (
                    <img
                      src={`${axiosClientImage.defaults.baseURL}videosthumbnails/${video.img}`}
                      alt={video.title}
                      onClick={() => handleImageToggle(video)}
                      style={{
                        cursor: "pointer",
                        margin: "0",
                        maxWidth: "100px",
                      }}
                    />
                  ) : null}
                </td>
                <td>
                  {video.video_link?.includes("youtube") ? (
                    <>
                      {video.video_link.includes("youtube.com/watch") ? (
                        <YouTube
                          videoId={video.video_link.split("v=")[1]} // Extract the video ID from the YouTube URL
                          opts={{
                            height: "315",
                            width: "560",
                            playerVars: {
                              autoplay: 0, // Set to 1 for autoplay
                            },
                          }}
                        />
                      ) : (
                        // Handle YouTube Shorts links separately
                        <iframe
                          width="560"
                          height="315"
                          src={`https://www.youtube.com/embed/${
                            video.video_link.split("/shorts/")[1]
                          }?autoplay=0`}
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      )}
                    </>
                  ) :  video.video?.includes("mp4") ? (
                    <video
                      id={`video-${video.id}`}
                      src={`${axiosClientImage.defaults.baseURL}Videos/${video.video}`}
                      onClick={() => handleVideoToggle(video)}
                      style={{
                        top: 0,
                        left: 0,
                        width: "100px",
                        zIndex: 999,
                        cursor: "pointer",
                      }}
                    />
                  ) : null}
                
                </td>
                {id != "682" ? (
                <td>
                  <DropdownButton
                    as={ButtonGroup}
                    title="Actions"
                    id="dropdown-button-dark-example1"
                    menuVariant="dark"
                  >
                    <Dropdown.Item
                      className="flex justify-center hover:text-green-500"
                      size="sm"
                      onClick={() => handleShowEditModal(video)}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="hover:text-red-500 flex justify-center"
                      variant="danger"
                      onClick={() => handleShowDeleteModal(video.id)}
                      style={{ margin: "2px" }}
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

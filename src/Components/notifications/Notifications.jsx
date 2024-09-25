/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";
import AddPost from "./AddNotifications";
import axiosClientF from "../../axiosClientFront";

export const Notifications = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [selectedPostDelete, setSelectedPostDelete] = useState(null);
  useEffect(() => {
    fetchPosts();
    fetchPusher_me();
  }, []);
  const [id, setId] = useState(null);
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
  const fetchPosts = async () => {
    try {
      const response = await axiosClient.get("NotificationPlans");
      setPosts(response.data.data);
      if (window.location.search.includes("success")) {
        setSuccessMessage("تم إضافة مقال بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("update")) {
        setSuccessMessage("تم تغيير مقال بنجاح");
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
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosClient.delete(
        `NotificationPlans/${selectedPostDelete.id}`
      );
      if (response.data.message == "Notification deleted successfully") {
        setSuccessMessage("المقالة حذفت بنجاح");
      }
    } catch (error) {
      setErrorMessage("Error deleting post");
    }
    setSelectedPostDelete(null);
    fetchPosts();
  };

  const handleDelete = (post) => {

    setSelectedPostDelete(post);
  };

  const [showCreate, setShowCreate] = useState(false);


  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);
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

  return (
    <>
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
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Add Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPost
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={selectedPostDelete !== null}
        onHide={() => setSelectedPostDelete(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the Plan?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            style={{
              width: "10rem",
              backgroundColor: "red",
              borderColor: "#f0ad4e",
              margin: "auto",
            }}
            onClick={handleDeleteConfirm}
          >
            Delete
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
            onClick={() => setSelectedPostDelete(null)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {id != "682" ? (
      <Button onClick={handleShowCreate}>Add Notifications</Button>
      ) : null}

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
              {/* <th>title</th> */}
              {/* <th>image</th> */}
              {/* <th>notifications</th> */}
              <th>text</th>
              {id != "682" ? (
              <th style={{ width: "12rem", textAlign: "center" }}>Action</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {posts ? (
              posts
                .slice()
                .reverse()
                .map((post, index) => (
                  <tr key={post.id}>
                    <td>{index + 1}</td>
                    {/* <td> {post.title}</td> */}
                    {/* <td>{post.img?
                      <img
                      src={`${axiosClientImage.defaults.baseURL}videosthumbnails/${post.img}`}
                      alt={"No Photo"}
                      style={{ width: "10rem", cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(
                          `${axiosClientImage.defaults.baseURL}videosthumbnails/${post.img}`
                        )
                      }
                    />
                   :''}</td> */}
                    {/* <td>{post.status? post.status == 'is_advice'? 'النصائح':'الارشيف':''}</td> */}
                    <td>{post.text ? post.text : ""}</td>
                    {id != "682" ? (
                    <td>
                      {/* <DropdownButton
                        as={ButtonGroup}
                        title="Actions"
                        id="dropdown-button-dark-example1"
                        menuVariant="dark"
                      > */}
                      {/* <Dropdown.Item
                    className="flex justify-center hover:text-green-500"
                      index={post.id}
                      onClick={() => handleShow(post)}
                    >
                      Edit
                    </Dropdown.Item> */}
                      <Button
                        variant="danger"
                        className="flex justify-center"
                        onClick={() => handleDelete(post)}
                      >
                        Delete
                      </Button>
                      {/* </DropdownButton> */}
                    </td>
                    ) : null}
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No data
                </td>
              </tr>
            )}
          </tbody>
          {fullscreenImage && (
            <div
              className="fullscreen-image"
              onClick={() => setFullscreenImage(null)}
            >
              <button
                className="close-button"
                onClick={() => setFullscreenImage(null)}
              >
                Close
              </button>
              <img src={fullscreenImage} alt="Full Screen" />
            </div>
          )}
        </table>
      )}
    </>
  );
};
export default Notifications;

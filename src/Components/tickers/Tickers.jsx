/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Modal,
} from "react-bootstrap";
import { Facebook } from "react-content-loader";
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";
import AddTicker from "./AddTicker";
import BuyTicker from "./BuyTicker";
import EditTicker from "./EditTicker";

export const Tickers = () => {
  const [ticker, setTicker] = useState([]);
  const [adminTicker, setAdminTicker] = useState([]);
  const [marged, setMarged] = useState([]);
  const [margedSearch, setMargedSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const [email, setEmail] = useState('');
  const [selectedPostDelete, setSelectedPostDelete] = useState(null);

  const [state, setState] = useState(null);
  const topRef = useRef(null);
  useEffect(() => {
    fetchPosts();
    fetchPusher_me();
  }, []);
  useEffect(() => {
    mergeTransactions();
  }, [ticker, adminTicker]);
  useEffect(() => {
    handleSearch();
    console.log(searchQuery);
  }, [searchQuery]);
  const fetchPusher_me = async () => {
    try {
      const response = await axiosClientF.post("me");
      setState(response.data.user.state);
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
      const response = await axiosClient.get("all-tickers");
      setTicker(response.data.allticker);
      setAdminTicker(response.data.adminticker);
      console.log(response.data);
      if (window.location.search.includes("success")) {
        setSuccessMessage("تم إضافة العملة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("update")) {
        setSuccessMessage("تم تغيير العملة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("buy")) {
        setSuccessMessage("تم شراء العملة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("ShutdownBot")) {
        setSuccessMessage("تم بيع العملة بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err) {
      console.log(err);
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers =
  //   ticker.length > 0 ? ticker.slice(indexOfFirstUser, indexOfLastUser) : [];
  const mergeTransactions = () => {
    const mergedTransactions = [];

    if (adminTicker.length > 0 || ticker.length > 0) {
      ticker.forEach((tickers) => {
        const userId = tickers.ticker;

        const adminTickers = adminTicker
          .sort((a, b) => b.id - a.id)
          .find((adminTicker) => adminTicker.ticker === userId);

        if (adminTickers) {
          // created_at
          // id
          // recomindation_id
          // ticker
          // type
          // updated_at
          // user_id

          // price
          // ticker
          // time
          mergedTransactions.push({
            adminTicker: adminTickers.ticker,
            user_id: adminTickers.user_id,
            user_Rank: adminTickers.type == "buy" ? 2 : 1,
            type: adminTickers.type,
            id: adminTickers.recomindation_id,
            ticker: tickers.ticker,
            price: tickers.price,
            time: tickers.time,
          });
        } else {
          mergedTransactions.push({
            ticker: tickers.ticker,
            price: tickers.price,
            time: tickers.time,
            user_Rank: 0,
          });
        }
      });

      setMarged(mergedTransactions);
      console.log(mergedTransactions);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const handleDeleteConfirm = async () => {
    try {
      await axiosClient.post(`delete-tickers`, {
        ticker: selectedPostDelete.ticker,
      });
      setSuccessMessage("العملة حذفت بنجاح");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error deleting post");
    }
    setSelectedPostDelete(null);
    fetchPosts();
  };

  const handleDelete = (post) => {
    setSelectedPostDelete(post);
  };

  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [shutdownBot, setShutdownBot] = useState(null);
  const handleShowCreate = () => setShowCreate(true);
  const handleShowBuy = (post) => {
    setShowBuy(true);
    setSelectedPost(post);
  };
  const handleCloseCreate = () => setShowCreate(false);
  const handleCloseBuy = () => setShowBuy(false);

  const handleShow = (post) => {
    setSelectedPost(post);
    setShow(true);
  };
  const handleSearch = async () => {
    setLoading(true);
    const finallySearchQuery = searchQuery.toUpperCase().trim();

    if (finallySearchQuery == "") {
      setMarged(ticker);
      setMargedSearch(null);
      setLoading(false);
    } else {
      const filteredPosts = marged.filter((post) =>
        post.ticker.includes(finallySearchQuery)
      );
      setMargedSearch(filteredPosts);
      setLoading(false);
    }
  };
  const handleClose = () => {
    setShow(false);
    setSuccessMessage("");
    setErrorMessage("");
  };
  const handleShutdownBot = (recommendation) => {
    setShutdownBot(recommendation);
    console.log(recommendation);
  };
  const handleShutdownBotConfirm = async () => {
    if (!shutdownBot) return;

    const { id } = shutdownBot;

    try {
      const archiveData = {
        recomondations_id: id,
        shutdown: -1,
      };
      const response = await axiosClient.post(
        "stopBotRecomindation",
        archiveData
      );

      if (response.data.success) {
        window.location.href = "/dashboard/tickers?ShutdownBot";
      }
    } catch (error) {
      setErrorMessage("Error bot recommendation");
      console.log(error);
    }
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
          <Modal.Title>Add Ticker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTicker
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showBuy} onHide={handleCloseBuy}>
        <Modal.Header closeButton>
          <Modal.Title>Buy Ticker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BuyTicker
            selectedPost={selectedPost}
            setSuccessMessage={setSuccessMessage}
            setErrorMessage={setErrorMessage}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBuy}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={shutdownBot !== null} onHide={() => setShutdownBot(null)}>
        <Modal.Header closeButton>
          <Modal.Title>إيقاف تشغيل البوت</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            هل أنت متأكد أنك تريد إيقاف تشغيل البوت لعملة{shutdownBot?.ticker}؟
          </p>
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
      <Modal
        show={selectedPostDelete !== null}
        onHide={() => setSelectedPostDelete(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Ticker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the tickers?</p>
          {selectedPostDelete && <h1>{selectedPostDelete.ticker}</h1>}
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
      <div className="d-flex justify-between mb-4">
      {state && state === "super_admin" ? (
        <Button onClick={handleShowCreate}>Add Ticker</Button>
      ) : null}
      
        <input
          type="text"
          className=""
          placeholder="Search..."
          // name="text"
          value={searchQuery}
          onKeyUp={handleSearch}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
</div>
      {loading ? (
        <Facebook />
      ) : (
        <>
          <table className="table table-borderless" ref={topRef}>
            <thead>
              <tr>
                <th>#</th>
                <th>اسم العملة كامل</th>
                <th>اسم العملة المختصر</th>
                <th>الوقت</th>
                <th>السعر</th>
                <th>شراء أو بيع</th>
                {state && state === "super_admin" ? (
                  <th style={{ width: "12rem", textAlign: "center" }}>
                    Action
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {margedSearch ? (
                margedSearch
                  .slice()
                  .sort((a, b) => b.user_Rank - a.user_Rank)
                  .map((post, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td> {post.ticker}</td>
                      <td> {post.ticker.slice(0, -4)}</td>
                      <td> {post.time}</td>
                      <td> {post.price}</td>
                      <td>
                        {" "}
                        {
                        // post.type && post.type === "buys" ? (
                        //   <Button onClick={() => handleShutdownBot(post)}>
                        //     sell
                        //   </Button>
                        // ) : (
                          <Button onClick={() => handleShowBuy(post)}>
                            buy
                          </Button>
                        // )
                        }
                      </td>
                      {state && state === "super_admin" ? (
                        <td>
                          <DropdownButton
                            as={ButtonGroup}
                            title="Actions"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            <Dropdown.Item
                              className="flex justify-center hover:text-green-500"
                              index={post.id}
                              onClick={() => handleShow(post)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="hover:text-red-500 flex justify-center"
                              onClick={() => handleDelete(post)}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      ) : null}
                    </tr>
                  ))
              ) : marged ? (
                marged
                  .slice()
                  .sort((a, b) => b.user_Rank - a.user_Rank)
                  .map((post, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td> {post.ticker}</td>
                      <td> {post.ticker.slice(0, -4)}</td>
                      <td> {post.time}</td>
                      <td> {post.price}</td>
                      <td>
                        {" "}
                        {
                        post.type && post.type == "buys" ? (
                          <Button onClick={() => handleShutdownBot(post)}>
                            sell
                          </Button>
                        ) : (
                          <Button onClick={() => handleShowBuy(post)}>
                            buy
                          </Button>
                        )}
                      </td>
                      {state && state === "super_admin" ? (
                        <td>
                          <DropdownButton
                            as={ButtonGroup}
                            title="Actions"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            <Dropdown.Item
                              className="flex justify-center hover:text-green-500"
                              index={post.id}
                              onClick={() => handleShow(post)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="hover:text-red-500 flex justify-center"
                              onClick={() => handleDelete(post)}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      ) : null}
                    </tr>
                  ))
              ) : (
                <></>
              )}
              {/* {currentUsers ? (
                currentUsers.map((post, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td> {post.ticker}</td>
                    <td> {post.ticker.slice(0, -4)}</td>
                    <td> {post.time}</td>
                    <td> {post.price}</td>
                    <td> {post.type?post.type == "buy"? <Button>sell</Button>:<Button>buy</Button>:"-"}</td>
                    <td>
                      <DropdownButton
                        as={ButtonGroup}
                        title="Actions"
                        id="dropdown-button-dark-example1"
                        menuVariant="dark"
                      >
                        <Dropdown.Item
                          className="flex justify-center hover:text-green-500"
                          index={post.id}
                          onClick={() => handleShow(post)}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="hover:text-red-500 flex justify-center"
                          onClick={() => handleDelete(post)}
                        >
                          Delete
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                ))
              ) 
              :(
                <></>
              )} */}
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
      
        </>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && <EditTicker post={selectedPost} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Tickers;

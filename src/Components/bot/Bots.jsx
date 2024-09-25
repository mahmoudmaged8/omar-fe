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
import axiosClient from "../../axiosClientOffline";

export default function Bots() {
  const [bots, setBots] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBots, setSelectedBots] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchBot();
  }, []);
  const handleCloseDetails = () => {
    setShowDetails(false);
    setUserDetails(null);
  };

  const handleConfirmDelete = (bot) => {
    setSelectedUser(bot.user.name);
    setSelectedBots(bot.id);
    setConfirmDelete(true);
  };
  const handleCancelDelete = () => {
    setSelectedUser(null);
    setConfirmDelete(false);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`bots/${id}`);
      setSuccessMessage(response.data.Massage);
      setErrorMessage("");
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else if (err.message == "Request failed with status code 404") {
        setErrorMessage(`قريبأ ستعمل`);
      } else {
        setErrorMessage(`Error fetching recommendation : ${err.message}`);
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
  const fetchBot = async () => {
    try {
        const botsResponse = await axiosClient.get("get-all-bots");
        let updatedBots = botsResponse.data.bots;

        // Fetch profet data only if bots are found
        if (updatedBots && updatedBots.length > 0) {
            const profetResponse = await axiosClient.post("get_bots_calculations");
            const profets = profetResponse.data;

            // Append profet data to bots
            updatedBots = updatedBots.map(bot => {
                const profetData = profets.find(profet => profet.name === bot.bot_name);
                return profetData ? { ...bot, profet: profetData } : bot;
            });
        }

        setBots(updatedBots);
        console.log(updatedBots);
    } catch (err) {
        // Error handling remains the same
        // ...
    } finally {
        setLoading(false);
    }
};

  return (
    <>
      <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>show Errors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userDetails ? (
            <h2
              className="text-danger"
              style={{ direction: "ltr", fontSize: "1.2rem" }}
            >
              {userDetails}
            </h2>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={confirmDelete} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ direction: "ltr" }}>
            Are you sure you want to delete this bots?
          </p>
          {selectedUser}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(selectedBots)}
            style={{
              width: "9rem",
              marginRight: "1rem",
              color: "white",
              backgroundColor: "red",
            }}
          >
            Delete
          </Button>
          <Button
            size="sm"
            style={{
              width: "9rem",
              color: "white",
              backgroundColor: "black",
            }}
            onClick={handleCancelDelete}
          >
            Cancel
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
        <>
        {Array(10)
          .fill("")
          .map((e, i) => (
            <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
          ))}
      </>
      ) : (
        <>
          <div className="table-responsive min-h-[100vh]">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">اسم البوت</th>
                  <th scope="col">عدد المستخدمين</th>
                  <th scope="col">المكاسب</th>
                  <th scope="col">الخسائر</th>
                  <th scope="col">الاجمالي</th>
                  <th scope="col" style={{ textAlign: "center" }}>
                  الأوامر
                  </th>
                </tr>
              </thead>
              <tbody>
                {bots ? (
                  bots.length > 0 ? (
                    bots.map((bot, index) => (
                      <tr key={bot.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{bot.bot_name ? bot.bot_name : ""}</td>
                        <td dir="ltr">{bot.profet ? bot.profet.number_user_used : ""}</td>
                        <td dir="ltr">{bot.profet ? bot.profet.wins : ""}</td>
                        <td dir="ltr">{bot.profet ? bot.profet.losses : ""}</td>
                        <td dir="ltr">{bot.profet ? bot.profet.wins + bot.profet.losses >0 ? <p style={{color:"green"}}> {bot.profet.wins + bot.profet.losses}</p>:<p style={{color:"red"}}> {bot.profet.wins + bot.profet.losses}</p> : ""}</td>
                        <td style={{ textAlign: "center" }}>
                          <DropdownButton
                            as={ButtonGroup}
                            title="Actions"
                            id="dropdown-button-dark-example1"
                            menuVariant="dark"
                          >
                            <Dropdown.Item
                              className="flex justify-center hover:text-red-500"
                              eventKey="2"
                              onClick={() => handleConfirmDelete(bot)}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        no pending bot found
                        {/* <Spinner animation="border" /> */}
                      </td>
                    </tr>
                  )
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

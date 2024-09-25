/* eslint-disable react-hooks/exhaustive-deps */
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import ContentLoader, { Facebook } from "react-content-loader";
import Select from "react-select";
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";
import CustomPagination from "../Pagination";
import AddRecommendation from "./AddRecommendation";
// import axiosClientPython from "../../axiosClientPython";

let Recommendation = () => {
  const [message, setMessage] = useState([]);
  const [messageAdmin, setMessageAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [captienId, setCaptienId] = useState(null);
  const [ticker, setTicker] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [plans, setPlans] = useState([]);
  const [captien, setCaptien] = useState([]);
  const [carancy, setCarancy] = useState([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [archive, setArchive] = useState(null);
  const [shutdownBot, setShutdownBot] = useState(null);
  const [pauseBot, setPauseBot] = useState(false);
  const [plusBot, setPlusBot] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [title, setTitle] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [state, setState] = useState(null);
  const [email, setEmail] = useState("");
  const [plusData, setPlusData] = useState(null);
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [myCurrentPage, setMyCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentFilter, setCurrentFilter] = useState({
    type: null,
    value: null,
  });
  //setUserName
  const [userName, setUserName] = useState("");
  const [id, setId] = useState(null);
  //countRecommendation
  const [countRecommendation, setCountRecommendation] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(null);
  const [total, setTotal] = useState(null);
  const topRef = useRef(null);
  const [columnVisibility, setColumnVisibility] = useState({
    by: true,
    buy: true,
    sell: true,
    entry: true,
    target: true,
    stop: true,
    amount: true,
    plan: true,
    bot: true,
    status: true,
    total: true,
    created_at: true,
    pause: true,
    plus: true,
  });

  const fetchPlans = async () => {
    try {
      const response = await axiosClient.get("plan");
      setPlans(response.data.data);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCaptiens = async () => {
    try {
      const response = await axiosClient.post("get-all-user-admin");
      setCaptien(response.data.users);
      // console.log(response.data.users);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCarancy = async () => {
    try {
      const response = await axiosClient.get("all-tickers");
      setCarancy(response.data.allticker);
      // console.log(response.data.users);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleImageClick = (imageUrl) => {
  //   setFullscreenImage(imageUrl);
  // };

  const handleDelete = (recommendation) => {
    setSelectedRecommendation(recommendation);
  };
  const handleArchive = (recommendation) => {
    setArchive(recommendation);
  };
  // const handleTreansaction = (recommendation) => {
  //   window.open(
  //     "/dashboard/recommendation/treansaction?recommendation_id=" + recommendation.id,
  //     '_blank' // يفتح الرابط في تبويب جديد
  //   );
  // };
  const handlepauseBot = (recommendation) => {
    setPauseBot(recommendation);
  };
  const handleplusBot = async (recommendation) => {
    // setLoading(true)
    setPlusBot(recommendation);
    console.log(recommendation.id);
    try {
      const response = await axiosClient.post("count_all_blance_user_sub", {
        recommendation_id: recommendation.id,
      });
      setPlusData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShutdownBot = (recommendation) => {
    setShutdownBot(recommendation);
  };

  const handleShowCreate = () => setShowCreate(true);
  const handleCloseCreate = () => setShowCreate(false);

  useEffect(() => {
    const toggleParent = document.getElementById("d-main");
    toggleParent.classList.add("main");
    fetchPlans();
    fetchCaptiens();
    fetchCarancy();
    fetchPusher_me();
    fetchPusher();
    if (state) {
      const plan = state;
      Pusher.logToConsole = true;
      var pusher = new Pusher("b2636ae7a9413d9bf90b", {
        cluster: "ap2",
      });

      const channel = pusher.subscribe(`recommendation.${plan}`);
      channel.bind(`recommendation.${plan}`, function () {
        fetchPusher();
      });

      return () => {
        channel.unbind();
        pusher.unsubscribe(`recommendation.${plan}`);
      };
    }
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await axiosClient.delete(`Recommendation/${selectedRecommendation.id}`);
      setSuccessMessage("Recommendation deleted successfully");
    } catch (error) {
      setErrorMessage("Error deleting recommendation");
    }
    setSelectedRecommendation(null);
    fetchPusher();
  };

  const fetchPusher_me = async () => {
    try {
      const response = await axiosClientF.post("me");
      setState(response.data.user.state);
      setId(response.data.user.id);
      setEmail(response.data.user.email);
      setUser(response.data.user.id);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        // setErrorMessage(`Error fetching me : ${err.message}`);
        console.log("Error fetching me : " + err.message);
      }
    }
  };

  const handleArchiveConfirm = async () => {
    if (!archive) return;

    const { id } = archive;

    try {
      const archiveData = {
        recomondation_id: id,
        user_id: user,
        title: title,
        desc: description,
      };

      const response = await axiosClient.post("archive", archiveData);
      if (response.data.success) {
        setErrorMessage(response.data.message);
      }
      if (
        response.data.message === "The conversion was completed successfully"
      ) {
        window.location.href = "/dashboard/archive?success";
      } else {
        setErrorMessage("Error archiving recommendation");
      }
    } catch (error) {
      setErrorMessage("Error archiving recommendation");
      console.log(error);
    }

    setArchive(null);
  };

  const printDocument = () => {
    const input = document.getElementById("divToPrint");
    input.style.backgroundColor = "#000000";
    html2canvas(input, { scale: 1 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        // حساب النسبة المئوية لحجم الصورة مقارنة بحجم صفحة A4
        const imgWidth = 210; // عرض صفحة A4 بالمليمترات
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        pdf.save(`Recommendation_${formattedDate}.pdf`);
        input.style.backgroundColor = "";
      })
      .catch((err) => console.error(err));
  };

  const handleDateChange = async (e) => {
    setSelectedDate(e.target.value);
    if (e.target.value === "") {
      fetchPusher();
    } else {
      try {
        const response = await axiosClient.post("filterByDate", {
          date: e.target.value,
        });
        setMessageAdmin(response.data.data);
        if (response.data.meta == null) {
          console.log("meta==null");
          setLastPage(1);
          setCurrentPage(1);
          setNextPage(null);
          setTotal(null);
        }
        console.log(response.data.data);
        console.log(response);
      } catch (err) {
        if (err.message == "Network Error") {
          setErrorMessage(`الانترنت لا يعمل`);
        } else if (err.message == "Request failed with status code 500") {
          setErrorMessage(`لا استطيع الوصول للسيرفر`);
        } else {
          console.log(err);
          // setErrorMessage(`Error fetching recommendation : ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // const handleDateChangeoff = () => {
  //   setSelectedDate("");
  //   fetchPusher();
  // };
  const handlePauseConfirm = async () => {
    if (!pauseBot) return;
    console.log(pauseBot);
    const { id } = pauseBot;
    console.log(id);
    try {
      const archiveData = {
        recomindationId: id,
        // shutdown: pauseBot.DoneBot.status == 0 ? -1 : 0,
      };
      const response = await axiosClient.post(
        "StopRecomindationStillWorks",
        archiveData
      );

      if (response.data.success) {
        window.location.href = "/dashboard/recommendation?Pause";
      }
    } catch (error) {
      setErrorMessage("Error Pause recommendation");
      console.log(error);
    }
  };

  const handleShutdownBotConfirm = async () => {
    if (!shutdownBot) return;

    const { id } = shutdownBot;

    try {
      const archiveData = {
        recomondations_id: id,
        shutdown: shutdownBot.DoneBot.status == 0 ? -1 : 0,
      };
      const response = await axiosClient.post(
        "stopBotRecomindation",
        archiveData
      );

      if (response.data.success) {
        window.location.href = "/dashboard/recommendation?ShutdownBot";
      }
    } catch (error) {
      setErrorMessage("Error bot recommendation");
      console.log(error);
    }
  };

  const fetchPusher = async () => {
    try {
      const response = await axiosClient.get("Recommendation");
      if (window.location.search.includes("updated")) {
        setSuccessMessage("تم تحديث التوصية بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("added")) {
        setSuccessMessage("تم إضافة التوصية بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("ShutdownBot")) {
        setSuccessMessage("تم ايقاف الروبوت بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("Pause")) {
        setSuccessMessage("تم ايقاف الاهداف بنجاح");
        window.history.replaceState(null, "", window.location.pathname);
      }
      setMessage(response.data.data);
      console.log(response.data.data);
      console.log(response);
      setItemsPerPage(response.data.data.length);
      if (response.data.meta == null) {
        setLastPage(1);
        setCurrentPage(1);
        setNextPage(null);
        setTotal(null);
      }
      //عدد الاجمالي
      setTotal(response.data.meta.total);
      //عدد الصفحات
      setCurrentPage(response.data.meta.current_page);
      let nextPageUrl = response.data.meta.next_page;
      let adminIndex = nextPageUrl.indexOf("Recommendation");
      if (adminIndex !== -1) {
        let modifiedUrl = nextPageUrl.substring(adminIndex);
        console.log(modifiedUrl);
        setNextPage(modifiedUrl);
      } else {
        // Handle the case where "Admin/" is not found in the URL
        console.error("The string 'Admin/' was not found in the URL.");
      }

      // setPreviousPage(response.data.meta.previous_page);
      setLastPage(response.data.meta.last_page);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        console.log(err);
        // setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page) => {
    setLoading(true);
    // if (selectedOptions == null ) {
    try {
      const response = await axiosClient.get(`Recommendation?page=${page}`);
      setMessage(response.data.data);
      console.log(response.data);
      setItemsPerPage(response.data.data.length);
      if (response.data.meta == null) {
        setLastPage(1);
        setCurrentPage(1);
        setNextPage(null);
        setTotal(null);
      }
      //عدد الاجمالي
      setTotal(response.data.meta.total);
      //عدد الصفحات
      setMyCurrentPage(response.data.meta.current_page);
      setNextPage(response.data.meta.next_page);
      // setPreviousPage(response.data.meta.previous_page);
      setLastPage(response.data.meta.last_page);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        console.log(err);
        // setErrorMessage(`Error fetching recommendation : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
    setCurrentPage(1);
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = message.slice(firstItemIndex, lastItemIndex);
  // const totalPages = Math.ceil(total / itemsPerPage);

  const handleCloseDetails = () => {
    setShowDetails(false);
    setUserDetails(null);
  };
  const filteredPlans = plans.filter((plan) => plan.id !== 7);

  const options = filteredPlans.map((plan) => ({
    value: plan.id,
    label: plan.name,
  }));

  const options_Captien =
    captien &&
    captien.map((plan) => ({
      value: plan.id,
      label: plan.name,
    }));
  const options_Carancy =
    carancy &&
    carancy.map((plan) => ({
      value: plan.ticker.slice(0, -4),
      label: plan.ticker.slice(0, -4),
    }));

  const handleSelectCaptienChange = async (selectedOptions, page = 1) => {
    console.log(captienId + " captien");
    console.log(ticker + " captien");
    // console.log(selectedOptions);
    // console.log(selectedOptions.value);
    setLoading(true);
    if (selectedOptions !== null) {
      setCurrentFilter({ type: "captain", value: selectedOptions });
      setCaptienId(
        selectedOptions.value ? selectedOptions.value : selectedOptions
      );
      const plan = selectedOptions.value
        ? selectedOptions.value
        : selectedOptions;
      console.log(plan);
      console.log(ticker, plan);
      try {
        const response = await axiosClient.post(`SearchTicker`, {
          ticker: ticker,
          admin_id: plan,
          page,
        });
        setMessageAdmin(response.data.data);
        console.log("response_captian", response.data.data);
        console.log(response);
        setCountRecommendation(response.data.countRecommendation);
        setUserName(response.data.userName);
        if (response.data.meta == null) {
          setLastPage(1);
          setCurrentPage(1);
          setNextPage(null);
          setTotal(null);
        }
        setLastPage(response.data.meta.last_page);
        setCurrentPage(response.data.meta.current_page);
        // console.log(response.data.meta.next_page);
        let nextPageUrl = response.data.meta.next_page;
        let adminIndex = nextPageUrl.indexOf("SearchTicker");
        if (adminIndex !== -1) {
          let modifiedUrl = nextPageUrl.substring(adminIndex);
          console.log(modifiedUrl);
          setNextPage(modifiedUrl);
        } else {
          // Handle the case where "Admin/" is not found in the URL
          console.error("The string 'Admin/' was not found in the URL.");
        }
        // setItemsPerPage(response.data.data.length);
        //عدد الاجمالي
        setTotal(response.data.meta.total);
        //عدد الصفحات
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("null-captien");
      setCaptienId(null);
      if (ticker) {
        console.log("ticker", ticker);
        handleSelectCarancyChange(ticker);
      } else {
        setMessageAdmin(null);
      }
      setCountRecommendation(null);
      setUserName(null);
      fetchPusher();
    }
  };

  const handleSelectCarancyChange = async (selectedOptions, page = 1) => {
    setLoading(true);
    // console.log(selectedOptions);
    // console.log(selectedOptions.value);
    console.log(captienId + " Crancy");
    console.log(ticker + " Crancy");
    if (selectedOptions !== null) {
      setCurrentFilter({ type: "currency", value: selectedOptions });
      setTicker(
        selectedOptions.value ? selectedOptions.value : selectedOptions
      );
      const ticker = selectedOptions.value
        ? selectedOptions.value
        : selectedOptions;
      console.log(ticker);
      console.log(ticker, captienId);
      try {
        const response = await axiosClient.post(`SearchTicker`, {
          ticker: ticker,
          admin_id: captienId,
          page,
        });
        setMessageAdmin(response.data.data);
        console.log("response_crancy", response.data.data);
        // console.log(response);
        setCountRecommendation(response.data.countRecommendation);
        if (response.data.meta == null) {
          setLastPage(1);
          setCurrentPage(1);
          setNextPage(null);
          setTotal(null);
        }
        setLastPage(response.data.meta.last_page);
        setCurrentPage(response.data.meta.current_page);
        setUserName(response.data.userName);
        console.log(response.data.meta.next_page);
        let nextPageUrl = response.data.meta.next_page;
        let adminIndex = nextPageUrl.indexOf("SearchTicker");
        if (adminIndex !== -1) {
          let modifiedUrl = nextPageUrl.substring(adminIndex);
          console.log(modifiedUrl);
          setNextPage(modifiedUrl);
        } else {
          // Handle the case where "Admin/" is not found in the URL
          console.error("The string 'Admin/' was not found in the URL.");
        }
        // setItemsPerPage(response.data.data.length);
        //عدد الاجمالي
        setTotal(response.data.meta.total);
        //عدد الصفحات
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("null-crancy");
      setTicker(null);
      if (captienId) {
        console.log("captienId", captienId);
        handleSelectCaptienChange;
      } else {
        setMessageAdmin(null);
      }
      // setMessageAdmin(null);
      setCountRecommendation(null);
      setUserName(null);
      fetchPusher();
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

  const handleColumnToggle = (column) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column], // Toggle the visibility for the specific column
    }));
  };

  const handleSelectChangeStutes = async (selectedOptions) => {
    // setLoading(true);

    if (selectedOptions !== null) {
      const id = selectedOptions.value;
      console.log(id);
      try {
        const response = await axiosClient.post(`searchrecomindation`, {
          status: id,
        });
        if (response.data.data) {
          setMessageAdmin(response.data.data);
          console.log(response.data.data);
          console.log(response);
          setItemsPerPage(response.data.data.length);
          //عدد الاجمالي
          setTotal(response.data.meta.total);
          //عدد الصفحات
          setCurrentPage(response.data.meta.current_page);
          setLastPage(response.data.meta.last_page);

          let nextPageUrl = response.data.meta.next_page;
          let adminIndex = nextPageUrl.indexOf("searchrecomindation");
          if (adminIndex !== -1) {
            let modifiedUrl = nextPageUrl.substring(adminIndex);
            console.log(modifiedUrl);
            setNextPage(modifiedUrl);
          } else {
            // Handle the case where "Admin/" is not found in the URL
            console.error("The string 'Admin/' was not found in the URL.");
          }
        }
        // setItemsPerPage(response.data.data.length);
        //عدد الاجمالي
        setTotal(response.data.meta.total);
        //عدد الصفحات
        // setCurrentPage(response.data.meta.current_page);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      // console.log("null");
      fetchPusher();
    }
  };

  const handleSelectChange = async (selectedOptions, page = 1) => {
    setLoading(true);

    if (selectedOptions !== null) {
      setCurrentFilter({ type: "plan", value: selectedOptions });
      const plan = selectedOptions.value;
      console.log(plan);
      try {
        const response = await axiosClient.post(
          `get-all-recomendation_plan/${plan}`,
          { page }
        );
        setMessageAdmin(response.data.data);

        setItemsPerPage(response.data.data.length);
        //عدد الاجمالي
        setTotal(response.data.meta.total);
        //عدد الصفحات
        setCurrentPage(response.data.meta.current_page);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      // console.log("null");
      fetchPusher();
    }
  };

  const handlePageChangeUnified = async (page) => {
    switch (currentFilter.type) {
      case "plan":
        await handleSelectChange(currentFilter.value, page);
        break;
      case "currency":
        await handleSelectCarancyChange(currentFilter.value, page);
        break;
      case "captain":
        await handleSelectCaptienChange(currentFilter.value, page);
        break;
      default:
        // Default action if no filter is applied
        await handlePageChange(page); // Assuming you have a function to fetch without filters
    }
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة توصية</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddRecommendation />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            غلق النافذة
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={archive !== null} onHide={() => setArchive(null)}>
        <Modal.Header closeButton>
          <Modal.Title>أرشفة التوصية</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>هل أنت متأكد أنك تريد حذف التوصية؟</p>

          <InputGroup size="sm" className="mb-3">
            <Form.Control
              type="text"
              placeholder="عنوان النصيحة"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="الوصف"
              name="desc"
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            style={{
              width: "10rem",
              backgroundColor: "blue",
              borderColor: "#f0ad4e",
              margin: "auto",
            }}
            onClick={handleArchiveConfirm}
          >
            أرشفة
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
            onClick={() => setArchive(null)}
          >
            إلغاء
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={pauseBot} onHide={() => setPauseBot(null)}>
        <Modal.Header closeButton>
          <Modal.Title>إيقاف تشغيل الهدف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>هل أنت متأكد أنك تريد إيقاف الهدف؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            style={{
              width: "10rem",
              margin: "auto",
            }}
            onClick={handlePauseConfirm}
          >
            إيقاف الهدف
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
            onClick={() => setPauseBot(null)}
          >
            إلغاء
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={plusBot}
        onHide={() => {
          setPlusBot(null);
          setPlusData(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>تعزيز الهدف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ textAlign: "left" }}>
            {plusData ? `count is : ${plusData.count}` : <Facebook />}
          </p>
          {/* <p style={{ textAlign: "left" }}>{plusData?`elapsed_time is : ${plusData.elapsed_time}`:0}</p> */}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            variant="danger"
            style={{
              width: "10rem",
              margin: "auto",
            }}
            onClick={handlePauseConfirm}
          >
            إيقاف الهدف
          </Button> */}
          <Button
            variant="secondary"
            style={{
              width: "10rem",
              backgroundColor: "black",
              borderColor: "#f0ad4e",
              margin: "auto",
              color: "white",
            }}
            onClick={() => {
              setPlusBot(null);
              setPlusData(null);
            }}
          >
            إلغاء
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={shutdownBot !== null} onHide={() => setShutdownBot(null)}>
        <Modal.Header closeButton>
          <Modal.Title>إيقاف تشغيل البوت</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>هل أنت متأكد أنك تريد إيقاف تشغيل البوت؟</p>
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
        show={selectedRecommendation !== null}
        onHide={() => setSelectedRecommendation(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>حذف التوصية</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>هل أنت متأكد أنك تريد حذف التوصية؟</p>
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
            حذف
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
            onClick={() => setSelectedRecommendation(null)}
          >
            إلغاء
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetails} onHide={handleCloseDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>عرض التفاصيل</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userDetails
            ? userDetails.split("\n").map((item, index) => (
                <div key={index}>
                  {item}
                  <br />
                </div>
              ))
            : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            إغلاق
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
      {state != "support" && id != "682" ? (
        <div className="relative" ref={topRef}>
          <Button onClick={handleShowCreate} size="lg">
            إضافة توصية
          </Button>
          {userName && (
            <div className="w-100 text-center text-white">
              <h1>اسم الكابتين {userName}</h1>
            </div>
          )}
          {countRecommendation && (
            <div className="w-100 text-center text-white">
              <h1>عدد التوصياته {countRecommendation}</h1>
            </div>
          )}
        </div>
      ) : null}
      <InputGroup size="sm" className="mb-3 justify-end">
        {state != "support" && id != "682" ? (
          <>
            <div className="d-flex align-items-center ml-4">
              <p className="text-white text-center text-lg m-0">
                {total ? `عدد التوصيات  ${total} ` : null}
              </p>
            </div>
            <div>
              <Form.Control
                type="date"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
                style={{
                  width: "10rem",
                  backgroundColor: "black",
                  color: "white",
                  colorScheme: "dark",
                }}
                // onClose={handleDateChangeoff}
              />
              {/* <p className=" text-white">Selected Date: {selectedDate}</p> */}
            </div>
            <Select
              options={[
                { value: 0, label: "لم يبدأ بعد" },
                { value: 1, label: "يعمل" },
                { value: 2, label: "يعمل و حقق هدف" },
                { value: -1, label: "انتهي" },
              ]}
              onChange={handleSelectChangeStutes}
              isClearable={true}
              className="my-react-select-container px-2"
              classNamePrefix="my-react-select"
              placeholder="اختر الحالة"
            />
          </>
        ) : null}

        {state === "super_admin" && id != "682" ? (
          <>
            <Select
              options={options}
              onChange={handleSelectChange}
              isClearable={true}
              className="my-react-select-container px-2"
              classNamePrefix="my-react-select"
              placeholder="اختر الخطط"
            />
            <Select
              options={options_Carancy}
              onChange={handleSelectCarancyChange}
              isClearable={true}
              className="my-react-select-container px-2 w-44"
              classNamePrefix="my-react-select"
              placeholder="اختر العملة"
            />
            <Select
              options={options_Captien.concat({
                value: 520,
                label: "توصيات البوت",
              })}
              onChange={handleSelectCaptienChange}
              isClearable={true}
              className="my-react-select-container px-2 w-44"
              classNamePrefix="my-react-select"
              placeholder="اختر الكابتين"
            />

            <Button variant="primary" onClick={printDocument}>
              طباعة PDF
            </Button>
          </>
        ) : null}
      </InputGroup>
      {loading && !state && !id ? (
        <>
          {Array(10)
            .fill("")
            .map((e, i) => (
              <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
            ))}
        </>
      ) : (
        <>
          <div className="table-borderless min-h-[100vh] mt-2" id="divToPrint">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>#</th>
                  <th
                    onClick={() => handleColumnToggle("by")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.by ? "بواسطة" : "ب"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("buy")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.buy ? "اشترى" : "ا"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("sell")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.sell ? "باع" : "ب"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("entry")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.entry ? "سعر الدخول" : "س"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("target")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.target ? "الهدف" : "ه"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("stop")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.stop ? "وقف الخسارة" : "و"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("amount")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.amount ? "المبلغ" : "م"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("plan")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.plan ? "الخطط" : "خ"}
                  </th>
                  {state === "super_admin" && id !== "682" && (
                    <th
                      onClick={() => handleColumnToggle("pause")}
                      style={{ cursor: "pointer" }}
                    >
                      {columnVisibility.pause ? "ايقاف الهدف" : "اه"}
                    </th>
                  )}
                  {state !== "suport" && id !== "682" && (
                    <>
                      <th
                        onClick={() => handleColumnToggle("plus")}
                        style={{ cursor: "pointer" }}
                      >
                        {columnVisibility.plus ? "تعزيز" : "ت"}
                      </th>
                      <th
                        onClick={() => handleColumnToggle("bot")}
                        style={{ cursor: "pointer" }}
                      >
                        {columnVisibility.bot ? "بوت" : "ب"}
                      </th>
                    </>
                  )}

                  <th
                    onClick={() => handleColumnToggle("status")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.status ? "الحالة" : "ح"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("total")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.total ? "المكاسب" : "م"}
                  </th>
                  <th
                    onClick={() => handleColumnToggle("created_at")}
                    style={{ cursor: "pointer" }}
                  >
                    {columnVisibility.created_at ? "التاريخ" : "ت"}
                  </th>

                  {state === "super_admin" || state === "support" ? (
                    <th style={{ width: "12rem", textAlign: "center" }}>
                      الإجراءات
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {messageAdmin && messageAdmin.length > 0
                  ? messageAdmin.map((recommendation, key) => (
                      <tr key={recommendation.id}>
                        <td>{(currentPage - 1) * itemsPerPage + key + 1}</td>
                        <td>
                          {columnVisibility.by
                            ? recommendation.user
                              ? recommendation.user.name
                              : ""
                            : ""}
                        </td>
                        <td style={{ direction: "ltr" }}>
                          {columnVisibility.buy ? recommendation.buy : ""}
                        </td>
                        <td style={{ direction: "ltr" }}>
                          {columnVisibility.sell ? recommendation.sell : ""}
                        </td>
                        <td>
                          {columnVisibility.entry
                            ? recommendation.entry_price
                            : ""}
                        </td>
                        <td
                          style={{ direction: "ltr" }}
                          className="text-base text-green-600"
                        >
                          {columnVisibility.target
                            ? recommendation.tragetsRecmo
                              ? recommendation.tragetsRecmo.map(
                                  (item, index) => (
                                    <div key={index}>
                                      {item.target} <br />
                                    </div>
                                  )
                                )
                              : null
                            : ""}
                        </td>
                        <td>
                          {columnVisibility.stop
                            ? recommendation.stop_price
                            : ""}
                        </td>
                        <td>
                          {columnVisibility.amount
                            ? recommendation.currency
                            : ""}
                        </td>

                        <td>
                          {columnVisibility.plan
                            ? recommendation.plan
                              ? recommendation.plan.map((item, index) => (
                                  <div key={index + 1}>
                                    {item.name}
                                    <br />
                                  </div>
                                ))
                              : ""
                            : ""}
                        </td>

                        <td>
                          {columnVisibility.pause &&
                          state === "super_admin" &&
                          id != "682" &&
                          recommendation.DoneBot &&
                          recommendation.DoneBot.status &&
                          // recommendation.DoneBot.status >= 0 &&
                          recommendation.DoneBot.status_btc == 0 ? (
                            <>
                              <Button
                                size="sm"
                                className="text-amber-300	"
                                onClick={() => handlepauseBot(recommendation)}
                              >
                                <i className="bi bi-pause-btn-fill"></i>
                              </Button>
                            </>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          {columnVisibility.plus ?
                          id != "682" &&
                          recommendation.DoneBot &&
                          recommendation.DoneBot.status &&
                          recommendation.DoneBot.status >= 0 ? (
                            <>
                              <Button
                                size="sm"
                                className="text-amber-300	"
                                onClick={() => handleplusBot(recommendation)}
                              >
                                <i className="bi bi-plus-circle"></i>
                              </Button>
                            </>
                          ) : (
                            ""
                          )
                          : ""
                        }
                        </td>
                        <td>
                          {columnVisibility.bot ? (
                            state === "super_admin" &&
                            id != "682" &&
                            recommendation.DoneBot &&
                            recommendation.DoneBot.status &&
                            recommendation.DoneBot.status >= 0 ? (
                              <>
                                <Button
                                  size="sm"
                                  className="text-amber-300	"
                                  onClick={() =>
                                    handleShutdownBot(recommendation)
                                  }
                                >
                                  <i className="bi bi-check"></i>
                                </Button>
                              </>
                            ) : recommendation.DoneBot.status &&
                              recommendation.DoneBot.status == -1 &&
                              recommendation.DoneBot.status_btc == 1 ? (
                              <>
                                <Button
                                  size="sm"
                                  className="text-amber-300	"
                                  onClick={() =>
                                    handleShutdownBot(recommendation)
                                  }
                                >
                                  <i className="bi bi-check"></i>
                                </Button>
                              </>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )
                          }
                        </td>
                        <td>
                          {columnVisibility.status ? (
                            recommendation.DoneBot ? (
                              recommendation.DoneBot.status == 0 ? (
                                <div className="text-amber-300">
                                  لم يبدأ بعد
                                </div>
                              ) : recommendation.DoneBot.status > 0 ? (
                                <div className="text-amber-300">
                                  {recommendation.DoneBot.last_tp
                                    ? recommendation.DoneBot.last_tp == 1
                                      ? "حقق أول هدف"
                                      : recommendation.DoneBot.last_tp == 2
                                      ? "حقق ثاني هدف"
                                      : "لم يصل لهدف"
                                    : "لم يصل لهدف"}
                                </div>
                              ) : recommendation.DoneBot.status == -1 ? (
                                recommendation.DoneBot.status_btc == 1 ? (
                                  <div className="text-green-300">
                                    تم ايقاف الهدف
                                  </div>
                                ) : recommendation.DoneBot.last_tp == null ? (
                                  <div className="text-red-500">
                                    وقف الخسارة
                                  </div>
                                ) : recommendation.DoneBot.last_tp == 0 &&
                                  recommendation.totalSell <= 0 ? (
                                  <div className="text-red-500">
                                    وقف الخسارة
                                  </div>
                                ) : recommendation.DoneBot.last_tp == 0 &&
                                  recommendation.totalSell > 0 ? (
                                  <div className="text-yellow-500">
                                    ايقاف كابتن
                                  </div>
                                ) : (
                                  <div className="text-green-500">
                                    {recommendation.DoneBot.last_tp == 1
                                      ? "إغلاق علي الهدف الأول"
                                      : recommendation.DoneBot.last_tp == 2
                                      ? "إغلاق علي الهدف الثاني"
                                      : recommendation.DoneBot.last_tp}
                                  </div>
                                )
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </td>

                        <td>
                          {columnVisibility.total
                            ? recommendation.totalSell
                            : ""}
                        </td>
                        <td>
                          {columnVisibility.created_at
                            ? recommendation.created_at
                            : ""}
                        </td>
                        {state === "super_admin" && id != "682" ? (
                          <td>
                            <DropdownButton
                              as={ButtonGroup}
                              title="أوامر"
                              id="dropdown-button-dark-example1"
                              menuVariant="dark"
                            >
                              <Dropdown.Item
                                className="hover:text-sky-500 flex justify-center"
                                variant="danger"
                                onClick={() => handleArchive(recommendation)}
                                style={{ margin: "2px" }}
                              >
                                أرشيف
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="hover:text-red-500 flex justify-center"
                                variant="danger"
                                onClick={() => handleDelete(recommendation)}
                                style={{ margin: "2px" }}
                              >
                                حذف
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="hover:text-sky-500 flex justify-center"
                                variant="danger"
                                href={`/dashboard/recommendation/treansaction?recommendation_id=${recommendation.id}`}
                                target="_blank"
                                style={{ margin: "2px" }}
                              >
                                تفاصيل
                              </Dropdown.Item>
                            </DropdownButton>
                          </td>
                        ) : state === "support" ? (
                          <td>
                            <DropdownButton
                              as={ButtonGroup}
                              title="أوامر"
                              id="dropdown-button-dark-example1"
                              menuVariant="dark"
                            >
                              <Dropdown.Item
                                className="hover:text-sky-500 flex justify-center"
                                variant="danger"
                                href={`/dashboard/recommendation/treansaction?recommendation_id=${recommendation.id}`}
                                target="_blank"
                                style={{ margin: "2px" }}
                              >
                                تفاصيل
                              </Dropdown.Item>
                            </DropdownButton>
                          </td>
                        ) : null}
                      </tr>
                    ))
                  : currentItems.map((recommendation, key) =>
                      state == "super_admin" || state == "support" ? (
                        <tr key={recommendation.id}>
                          <td>{(currentPage - 1) * itemsPerPage + key + 1}</td>
                          <td>
                            {columnVisibility.by
                              ? recommendation.user
                                ? recommendation.user.name
                                : ""
                              : ""}
                          </td>
                          <td style={{ direction: "ltr" }}>
                            {columnVisibility.buy ? recommendation.buy : ""}
                          </td>
                          <td style={{ direction: "ltr" }}>
                            {columnVisibility.sell ? recommendation.sell : ""}
                          </td>
                          <td>
                            {columnVisibility.entry
                              ? recommendation.entry_price
                              : ""}
                          </td>
                          <td
                            style={{ direction: "ltr" }}
                            className="text-base text-green-600"
                          >
                            {columnVisibility.target
                              ? recommendation.tragetsRecmo
                                ? recommendation.tragetsRecmo.map(
                                    (item, index) => (
                                      <div key={index}>
                                        {item.target} <br />
                                      </div>
                                    )
                                  )
                                : null
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.stop
                              ? recommendation.stop_price
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.amount
                              ? recommendation.currency
                              : ""}
                          </td>

                          <td>
                            {columnVisibility.plan
                              ? recommendation.plan
                                ? recommendation.plan.map((item, index) => (
                                    <div key={index + 1}>
                                      {item.name}
                                      <br />
                                    </div>
                                  ))
                                : ""
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.pause &&
                            state === "super_admin" &&
                            id != "682" &&
                            recommendation.DoneBot &&
                            recommendation.DoneBot.status >= 0 &&
                            recommendation.DoneBot.status_btc == 0 ? (
                              <>
                                <Button
                                  size="sm"
                                  className="text-amber-300	"
                                  onClick={() => handlepauseBot(recommendation)}
                                >
                                  <i className="bi bi-pause-btn-fill"></i>
                                </Button>
                              </>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {columnVisibility.plus &&
                            id != "682" &&
                            recommendation.DoneBot &&
                            recommendation.DoneBot.status &&
                            recommendation.DoneBot.status >= 0 ? (
                              <>
                                <Button
                                  size="sm"
                                  className="text-amber-300	"
                                  onClick={() => handleplusBot(recommendation)}
                                >
                                  <i className="bi bi-plus-circle"></i>
                                </Button>
                              </>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {columnVisibility.bot ? (
                              state === "super_admin" &&
                              id != "682" &&
                              recommendation.DoneBot &&
                              recommendation.DoneBot.status >= 0 ? (
                                <>
                                  <Button
                                    size="sm"
                                    className="text-amber-300	"
                                    onClick={() =>
                                      handleShutdownBot(recommendation)
                                    }
                                  >
                                    <i className="bi bi-check"></i>
                                  </Button>
                                </>
                              ) : recommendation.DoneBot &&
                                recommendation.DoneBot.status ? (
                                recommendation.DoneBot.status == -1 &&
                                recommendation.DoneBot.status_btc == 1 ? (
                                  <>
                                    <Button
                                      size="sm"
                                      className="text-amber-300	"
                                      onClick={() =>
                                        handleShutdownBot(recommendation)
                                      }
                                    >
                                      <i className="bi bi-check"></i>
                                    </Button>
                                  </>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </td>

                          <td>
                            {columnVisibility.status ? (
                              recommendation.DoneBot ? (
                                recommendation.DoneBot.status == 0 ? (
                                  <div className="text-amber-300">
                                    لم يبدأ بعد
                                  </div>
                                ) : recommendation.DoneBot.status > 0 ? (
                                  <div className="text-amber-300">
                                    {recommendation.DoneBot.last_tp
                                      ? recommendation.DoneBot.last_tp == 1
                                        ? "حقق أول هدف"
                                        : recommendation.DoneBot.last_tp == 2
                                        ? "حقق ثاني هدف"
                                        : "لم يصل لهدف"
                                      : "لم يصل لهدف"}
                                  </div>
                                ) : recommendation.DoneBot.status == -1 ? (
                                  recommendation.DoneBot.status_btc == 1 ? (
                                    <div className="text-green-300">
                                      تم ايقاف الهدف
                                    </div>
                                  ) : recommendation.DoneBot.last_tp == null ? (
                                    <div className="text-red-500">
                                      وقف الخسارة
                                    </div>
                                  ) : recommendation.DoneBot.last_tp == 0 &&
                                    recommendation.totalSell <= 0 ? (
                                    <div className="text-red-500">
                                      وقف الخسارة
                                    </div>
                                  ) : recommendation.DoneBot.last_tp == 0 &&
                                    recommendation.totalSell > 0 ? (
                                    <div className="text-yellow-500">
                                      ايقاف كابتن
                                    </div>
                                  ) : (
                                    <div className="text-green-500">
                                      {recommendation.DoneBot.last_tp == 1
                                        ? "إغلاق علي الهدف الأول"
                                        : recommendation.DoneBot.last_tp == 2
                                        ? "إغلاق علي الهدف الثاني"
                                        : recommendation.DoneBot.last_tp}
                                    </div>
                                  )
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </td>

                          <td>
                            {columnVisibility.total
                              ? recommendation.totalSell
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.created_at
                              ? recommendation.created_at
                              : ""}
                          </td>
                          {state === "super_admin" && id != "682" ? (
                            <td>
                              <DropdownButton
                                as={ButtonGroup}
                                title="أوامر"
                                id="dropdown-button-dark-example1"
                                menuVariant="dark"
                              >
                                <Dropdown.Item
                                  className="hover:text-sky-500 flex justify-center"
                                  variant="danger"
                                  onClick={() => handleArchive(recommendation)}
                                  style={{ margin: "2px" }}
                                >
                                  أرشيف
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="hover:text-red-500 flex justify-center"
                                  variant="danger"
                                  onClick={() => handleDelete(recommendation)}
                                  style={{ margin: "2px" }}
                                >
                                  حذف
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="hover:text-sky-500 flex justify-center"
                                  variant="danger"
                                  href={`/dashboard/recommendation/treansaction?recommendation_id=${recommendation.id}`}
                                  target="_blank"
                                  style={{ margin: "2px" }}
                                >
                                  تفاصيل
                                </Dropdown.Item>
                              </DropdownButton>
                            </td>
                          ) : state === "support" ? (
                            <td>
                              <DropdownButton
                                as={ButtonGroup}
                                title="أوامر"
                                id="dropdown-button-dark-example1"
                                menuVariant="dark"
                              >
                                <Dropdown.Item
                                  className="hover:text-sky-500 flex justify-center"
                                  variant="danger"
                                  href={`/dashboard/recommendation/treansaction?recommendation_id=${recommendation.id}`}
                                  target="_blank"
                                  style={{ margin: "2px" }}
                                >
                                  تفاصيل
                                </Dropdown.Item>
                              </DropdownButton>
                            </td>
                          ) : null}
                        </tr>
                      ) : email === recommendation.user.email ? (
                        <tr key={recommendation.id}>
                          <td>{(currentPage - 1) * itemsPerPage + key + 1}</td>
                          <td>
                            {columnVisibility.by
                              ? recommendation.user
                                ? recommendation.user.name
                                : ""
                              : ""}
                          </td>
                          <td style={{ direction: "ltr" }}>
                            {columnVisibility.buy ? recommendation.buy : ""}
                          </td>
                          <td style={{ direction: "ltr" }}>
                            {columnVisibility.sell ? recommendation.sell : ""}
                          </td>
                          <td>
                            {columnVisibility.entry
                              ? recommendation.entry_price
                              : ""}
                          </td>
                          <td
                            style={{ direction: "ltr" }}
                            className="text-base text-green-600"
                          >
                            {columnVisibility.target
                              ? recommendation.tragetsRecmo
                                ? recommendation.tragetsRecmo.map(
                                    (item, index) => (
                                      <div key={index}>
                                        {item.target} <br />
                                      </div>
                                    )
                                  )
                                : null
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.stop
                              ? recommendation.stop_price
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.amount
                              ? recommendation.currency
                              : ""}
                          </td>

                          <td>
                            {columnVisibility.plan
                              ? recommendation.plan
                                ? recommendation.plan.map((item, index) => (
                                    <div key={index + 1}>
                                      {item.name}
                                      <br />
                                    </div>
                                  ))
                                : ""
                              : ""}
                          </td>
                          {/* <td>
                          {columnVisibility.pause &&
                          state === "super_admin" &&
                          id != "682" &&
                          recommendation.DoneBot &&
                          recommendation.DoneBot.status &&
                          recommendation.DoneBot.status >= 0 &&
                          recommendation.DoneBot.status_btc == 0 ? (
                            <>
                              <Button
                                size="sm"
                                className="text-amber-300	"
                                onClick={() => handlepauseBot(recommendation)}
                              >
                                <i className="bi bi-pause-btn-fill"></i>
                              </Button>
                            </>
                          ) : (
                            ""
                          )}
                        </td> */}
                          <td>
                            {columnVisibility.plus &&
                            id != "682" &&
                            recommendation.DoneBot &&
                            recommendation.DoneBot.status &&
                            recommendation.DoneBot.status >= 0 ? (
                              <>
                                <Button
                                  size="sm"
                                  className="text-amber-300	"
                                  onClick={() => handleplusBot(recommendation)}
                                >
                                  <i className="bi bi-plus-circle"></i>
                                </Button>
                              </>
                            ) : (
                              ""
                            )}
                          </td>

                          <td>
                            {columnVisibility.bot ? (
                              recommendation.DoneBot &&
                              recommendation.DoneBot.status &&
                              recommendation.DoneBot.status >= 0 ? (
                                <>
                                  <Button
                                    size="sm"
                                    className="text-amber-300	"
                                    onClick={() =>
                                      handleShutdownBot(recommendation)
                                    }
                                  >
                                    <i className="bi bi-check"></i>
                                  </Button>
                                </>
                              ) : recommendation.DoneBot.status &&
                                recommendation.DoneBot.status == -1 &&
                                recommendation.DoneBot.status_btc == 1 ? (
                                <>
                                  <Button
                                    size="sm"
                                    className="text-amber-300	"
                                    onClick={() =>
                                      handleShutdownBot(recommendation)
                                    }
                                  >
                                    <i className="bi bi-check"></i>
                                  </Button>
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </td>

                          <td>
                            {columnVisibility.status ? (
                              recommendation.DoneBot ? (
                                recommendation.DoneBot.status == 0 ? (
                                  <div className="text-amber-300">
                                    لم يبدأ بعد
                                  </div>
                                ) : recommendation.DoneBot.status > 0 ? (
                                  <div className="text-amber-300">
                                    {recommendation.DoneBot.last_tp
                                      ? recommendation.DoneBot.last_tp == 1
                                        ? "حقق أول هدف"
                                        : recommendation.DoneBot.last_tp == 2
                                        ? "حقق ثاني هدف"
                                        : "لم يصل لهدف"
                                      : "لم يصل لهدف"}
                                  </div>
                                ) : recommendation.DoneBot.status == -1 ? (
                                  recommendation.DoneBot.status_btc == 1 ? (
                                    <div className="text-green-300">
                                      تم ايقاف الهدف
                                    </div>
                                  ) : recommendation.DoneBot.last_tp == null ? (
                                    <div className="text-red-500">
                                      وقف الخسارة
                                    </div>
                                  ) : recommendation.DoneBot.last_tp == 0 &&
                                    recommendation.totalSell <= 0 ? (
                                    <div className="text-red-500">
                                      وقف الخسارة
                                    </div>
                                  ) : recommendation.DoneBot.last_tp == 0 &&
                                    recommendation.totalSell > 0 ? (
                                    <div className="text-yellow-500">
                                      ايقاف كابتن
                                    </div>
                                  ) : (
                                    <div className="text-green-500">
                                      {recommendation.DoneBot.last_tp == 1
                                        ? "إغلاق علي الهدف الأول"
                                        : recommendation.DoneBot.last_tp == 2
                                        ? "إغلاق علي الهدف الثاني"
                                        : recommendation.DoneBot.last_tp}
                                    </div>
                                  )
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </td>

                          <td>
                            {columnVisibility.total
                              ? recommendation.totalSell
                              : ""}
                          </td>
                          <td>
                            {columnVisibility.created_at
                              ? recommendation.created_at
                              : ""}
                          </td>
                          {state === "super_admin" && id != "682" ? (
                            <td>
                              <DropdownButton
                                as={ButtonGroup}
                                title="أوامر"
                                id="dropdown-button-dark-example1"
                                menuVariant="dark"
                              >
                                <Dropdown.Item
                                  className="hover:text-sky-500 flex justify-center"
                                  variant="danger"
                                  onClick={() => handleArchive(recommendation)}
                                  style={{ margin: "2px" }}
                                >
                                  أرشيف
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="hover:text-red-500 flex justify-center"
                                  variant="danger"
                                  onClick={() => handleDelete(recommendation)}
                                  style={{ margin: "2px" }}
                                >
                                  حذف
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="hover:text-sky-500 flex justify-center"
                                  variant="danger"
                                  href={`/dashboard/recommendation/treansaction?recommendation_id=${recommendation.id}`}
                                  target="_blank"
                                  style={{ margin: "2px" }}
                                >
                                  تفاصيل
                                </Dropdown.Item>
                              </DropdownButton>
                            </td>
                          ) : state === "support" ? (
                            <td>
                              <DropdownButton
                                as={ButtonGroup}
                                title="أوامر"
                                id="dropdown-button-dark-example1"
                                menuVariant="dark"
                              >
                                <Dropdown.Item
                                  className="hover:text-sky-500 flex justify-center"
                                  variant="danger"
                                  href={`/dashboard/recommendation/treansaction?recommendation_id=${recommendation.id}`}
                                  target="_blank"
                                  style={{ margin: "2px" }}
                                >
                                  تفاصيل
                                </Dropdown.Item>
                              </DropdownButton>
                            </td>
                          ) : null}
                        </tr>
                      ) : null
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
            <div className="d-flex justify-content-center mt-4 px-1">
              {/* <ButtonGroup>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant="secondary"
                      onClick={() => {
                        handlePageChange(page); // Handle page change as usual
                        topRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the top
                      }}
                    >
                      {page}
                    </Button>
                  )
                )}
              </ButtonGroup> */}
              {nextPage ? (
                <CustomPagination
                  currentPage={myCurrentPage}
                  lastPage={lastPage}
                  onPageChange={handlePageChangeUnified}
                />
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Recommendation;

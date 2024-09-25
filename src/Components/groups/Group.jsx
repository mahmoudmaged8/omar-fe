/* eslint-disable react-hooks/exhaustive-deps */
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { Alert, Nav, NavDropdown } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";
import axiosClientImage from "../../axios_img_offline";
import "/src/assets/css/Group.css";
export default function Group() {
  // const chatContainerRef = useRef(null);
  const [chats, setChat] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [name, setName] = useState(null);
  const [plan, setPlan] = useState(null);
  // const [state, setState] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(null);
  const [massage, setMassage] = useState({
    massage: "",
  });

  const fetchPusher = async () => {
    try {
      const response = await axiosClientF.post("me");
      setEmail(response.data.user.email);
      setName(response.data.user.name);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      }else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching me : ${err.message}`);
      }
    } 
  };
 
  useEffect(() => {
    fetchChat();
    fetchPusher();
    const params = new URLSearchParams(window.location.search);
      const plan = params.get("plan");
      setPlan(plan);
      Pusher.logToConsole = true;
      var pusher = new Pusher("b2636ae7a9413d9bf90b", {
        cluster: "ap2",
      });
      
      const channel = pusher.subscribe(`chat.${plan}`);
 
      channel.bind(`chat.${plan}`, function (data) {
        appendDataToChat(data.massage);
        if(data.massage== 0){
          window.location.href = `/dashboard/groups?plan=${plan}`;
        } 
      });
      return () => {
        channel.unbind();
        pusher.unsubscribe(`chat.${plan}`);
      };

  }, []);

  const handleDeleteConfirm = async (id) => {
    try {

      await axiosClient.delete(`messageSuper/${id}`);
      setSuccessMessage("massage deleted successfully");
      window.location.href = `/dashboard/groups?plan=${plan}`;
    } catch (error) {
      setErrorMessage("Error deleting recommendation");
    }
  };
  const handleDeleteConfirmPlan = async (plan) => {
    try {
      await axiosClient.post('messagePlan',{nameChannel:plan});
      window.location.href = `/dashboard/groups?plan=${plan}`;
      setSuccessMessage("chat deleted successfully");
    } catch (error) {
      setErrorMessage("Error deleting recommendation");
      console.log(error);
    }
  };
  const handleBanPlanConfirm = async (plan) => {
    try {
      const response = await axiosClient.post('banPlan',{nameChannel:plan});
      if (response.data.success) {
        setSuccessMessage("chat Ban successfully");
      window.location.href = `/dashboard/groups?plan=${plan}`;
      }
      
    } catch (error) {
      setErrorMessage("Error deleting recommendation");
    }
  };
  const handleUnBanPlanConfirm = async (plan) => {
    try {
      const response = await axiosClient.post('unbanPlan',{nameChannel:plan});
      if (response.data.success) {
      setSuccessMessage("chat open successfully");
      window.location.href = `/dashboard/groups?plan=${plan}`;
      }
    } catch (error) {
      setErrorMessage("Error deleting recommendation");
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
  const appendDataToChat = (data) => {
    setChatData((prevData) => [...prevData, data]);
  };
  const handleChange = (e) => {
    setMassage({ ...massage, [e.target.name]: e.target.value });
  };
  const handleAddMassage = async () => {
    if (massage.massage !== "") {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get("plan");
      setPlan(plan);
      try {
       await axiosClient.post("adminChatPlan", {nameChannel: plan, massage: massage.massage});
        setMassage({ massage: "" });
      } catch (err) {
        if (err.message == "Network Error") {
          setErrorMessage(`الانترنت لا يعمل`);
        }else if (err.message == "Request failed with status code 500") {
          setErrorMessage(`لا استطيع الوصول للسيرفر`);
        } else {
          setErrorMessage(`Error fetching adminChatPlan : ${err.message}`);
        }
      }
    }
   
  };
  const fetchChat = async () => {
    // setIsLoading(true);
  // setError(null);
    try {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get("plan");
      setPlan(plan);
      const response = await axiosClient.post(`chatAdmin`, { nameChannel: plan });
      setChat(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
      if(error.message =="Network Error"){
        setErrorMessage(`الانترنت لا يعمل`);
      }else{
        setErrorMessage(`Error fetching chatAdmin : ${error.message}`);
      }
    }
  };

  return (
    <>
     {successMessage ? <Alert variant="success" style={{ width: "max-content" }}>{successMessage}</Alert>:null}
     {errorMessage ? <Alert variant="danger" style={{ width: "max-content" }}>{errorMessage}</Alert>:null}
      {chats ? (
        <>
          <div className="table-responsive min-h-[100vh]">
            <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[200vh]">
              <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                  <div className="relative">
                    <span className="absolute text-green-500 right-0 bottom-0">
                      <svg width="20" height="20">
                        <circle
                          cx="8"
                          cy="8"
                          r="8"
                          fill="currentColor"
                        ></circle>
                      </svg>
                    </span>
                    <div className="w10 sm:w-16 h10 rounded-full sm:h-16 bg-slate-400 d-flex items-center justify-center" style={{fontSize: "xxx-large"}}>
                      {name ?name.slice(0, 1).toUpperCase():""}
                    </div>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <div className="text-2xl mt-1 flex items-center">
                      <span className="text-gray-700 mr-3">
                      {name}
                     
                      </span>
                    </div>
                    <span className="text-lg text-gray-600">
                    {email}
                    </span>
                    <span className="text-lg text-sky-600 pr-10">
                    {plan}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border h-10 w-20 transition duration-500 ease-in-out text-red-400 hover:bg-red-300 focus:outline-none"
                    onClick={() => handleDeleteConfirmPlan(plan)}
                  >
                    <i className="bi bi-trash"></i>حذف
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border h-10 w-20 transition duration-500 ease-in-out text-gray-400 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleBanPlanConfirm(plan)}
                  >
                    <i className="bi bi-door-closed-fill"></i>غلق
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border h-10 w-20 transition duration-500 ease-in-out text-gray-400 hover:bg-gray-300 focus:outline-none"
                    onClick={() => handleUnBanPlanConfirm(plan)}
                  >
                    <i className="bi bi-door-open-fill"></i>فتح
                  </button>
                </div>
              </div>
              <div
                id="messages"
                className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              >
                {chats.slice().reverse().map((chat, index) => (
                  <div key={index}>
                  {chat.user && chat.user.email != email ? (
                    <div className="chat-message" id={index + 1} key={index+1}>
                    <div className="flex items-start">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-100 text-gray-600">
                        <div className="d-flex justify-between">
                          <div className=" text-blue-600">
                          {chat.user.name}
                          </div>
                          <Nav style={{ padding: "0",right: "0" }}>
            <NavDropdown
              id="dropdown-button-drop-end"
              title=""
              // style={{ color: randomColor() }}
              menuVariant="dark"
            >
              <NavDropdown.Item href="#" style={{ textAlign: "center",padding: "0",width: "max-content"}} onClick={() => handleDeleteConfirm(chat.id)}>
                delete 2
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav> 
                        </div>
                          
          <span>
            
                            {chat.massage ? (
                              chat.massage
                            ) :chat.media? 
                            ( chat.media.audio ? (
                              <audio src={`${axiosClientImage.defaults.baseURL}media/${chat.media.audio}`} controls />
                            ) : chat.media.img ? (
                              <img
                                src={`${axiosClientImage.defaults.baseURL}media/${chat.media.img}`}
                                style={{
                                  cursor: "pointer",
                                  margin: "0",
                                  maxWidth: "250px",
                                }}
                              />
                            ) : chat.media.video ? (
                              <video
                                id={`video-${chat.id}`}
                                src={`${axiosClientImage.defaults.baseURL}media/${chat.media.video}`}
                                controls
                                style={{
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  zIndex: 999,
                                }}
                              />
                            ) : (
                              ""
                            )
                            ) : (
                              ""
                            )}
                           </span> 
                        
                          </span>
                          
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-slate-400 d-flex items-center justify-center">
                      {chat.user.name ?chat.user.name.slice(0, 1).toUpperCase():"-"}
                    </div>
                      
                    </div>
                  </div>
                  )
                  :
                  (
                    <div key={index + 1}>
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                      {/* <div className="w-6 h-6 rounded-full bg-slate-400 d-flex items-center justify-center">
                      {chat.user.name ?chat.user.name.slice(0, 1).toUpperCase():"-"}
                    </div> */}
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-green-400 text-gray-600">
                          <div className="d-flex justify-between">
                          {/* {chat.user.name} */}
                          <Nav style={{display: "inline-block" , padding: "0",}}>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title=""
              menuVariant="dark"
            >
              <NavDropdown.Item href="#" style={{ padding: "0",textAlign: "right",marginRight: "10px"}} onClick={() => handleDeleteConfirm(chat.id)}>
                delete 3
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav> 
                        </div>
                            {chat.massage ? (
                             
                                chat.massage
                            ) :  chat.media ?(chat.media.audio ? (
                              <audio src={`${axiosClientImage.defaults.baseURL}media/${chat.media.audio}`} controls />
                            ) : chat.media.img ? (
                              <img
                                src={`${axiosClientImage.defaults.baseURL}media/${chat.media.img}`}
                                style={{
                                  cursor: "pointer",
                                  margin: "0",
                                  maxWidth: "250px",
                                }}
                              />
                            ) : chat.media.video ? (
                              <video
                                id={`video-${chat.id}`}
                                src={`${axiosClientImage.defaults.baseURL}media/${chat.media.video}`}
                                controls
                                style={{
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  zIndex: 999,
                                }}
                              />
                            ) : (
                              ""
                            )
                            ) : (
                              ""
                            )}
                          </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                }
                  </div>
                ))}
                {chatData.slice().map((chat, index) => (
                  <>
                  {chat.user?chat.user.email != email ? (
                    <div className="chat-message" id={index + 1} key={index+1}>
                    <div className="flex items-start">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                        <div className="d-flex justify-between">
                          <div className=" text-blue-400">
                          {chat.user.name}
                          </div>
                          <Nav style={{display: "inline-block" , padding: "0" }}>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title=""
              menuVariant="dark"
            >
              <NavDropdown.Item href="#" style={{ padding: "0",width: "max-content"}}>
                delete 4
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav> 
                        </div>
                          
          <span>
            
                            {chat.massage ? (
                              chat.massage
                            ) :chat.media? 
                            ( chat.media.audio ? (
                              <audio src={`${axiosClientImage.defaults.baseURL}media/${chat.media.audio}`} controls />
                            ) : chat.media.img ? (
                              <img
                                src={`${axiosClientImage.defaults.baseURL}media/${chat.media.img}`}
                                style={{
                                  cursor: "pointer",
                                  margin: "0",
                                  maxWidth: "250px",
                                }}
                              />
                            ) : chat.media.video ? (
                              <video
                                id={`video-${chat.id}`}
                                src={`${axiosClientImage.defaults.baseURL}media/${chat.media.video}`}
                                controls
                                style={{
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  zIndex: 999,
                                }}
                              />
                            ) : (
                              ""
                            )
                            ) : (
                              ""
                            )}
                           </span> 
                        
                          </span>
                          
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-slate-400 d-flex items-center justify-center">
                      {chat.user.name ?chat.user.name.slice(0, 1).toUpperCase():"-"}
                    </div>
                      
                    </div>
                  </div>
                  )
                  :
                  (
                    <div key={index + 1}>
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                      {/* <div className="w-6 h-6 rounded-full bg-slate-400 d-flex items-center justify-center">
                      {chat.user.name ?chat.user.name.slice(0, 1).toUpperCase():"-"}
                    </div> */}
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-green-300 text-gray-600">
                          <div className="d-flex justify-between">
                          {/* {chat.user.name} */}
                          <Nav style={{display: "inline-block" , padding: "0" }}>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title=""
              menuVariant="dark"
            >
              <NavDropdown.Item href="#" style={{ padding: "0" , textAlign: "center",direction: "ltr"}} onClick={() => handleDeleteConfirm(chat.id)}>
                delete 5
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav> 
                        </div>
                            {chat.massage ? (
                              chat.massage
                            ) :  chat.media ?(chat.media.audio ? (
                              <audio src={`${axiosClientImage.defaults.baseURL}media/${chat.media.audio}`} controls />
                            ) : chat.media.img ? (
                              <img
                                src={`${axiosClientImage.defaults.baseURL}media/${chat.media.img}`}
                                style={{
                                  cursor: "pointer",
                                  margin: "0",
                                  maxWidth: "250px",
                                }}
                              />
                            ) : chat.media.video ? (
                              <video
                                id={`video-${chat.id}`}
                                src={`${axiosClientImage.defaults.baseURL}media/${chat.media.video}`}
                                controls
                                style={{
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  zIndex: 999,
                                }}
                              />
                            ) : (
                              ""
                            )
                            ) : (
                              ""
                            )}
                          </span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  )
                :(
                  null
                )
                }
                 
                  </>
                ))}
                {/* <div ref={chatContainerRef}></div> */}
              </div>
              <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                {/* {error && <p>Error: {error.message}</p>} */}
                {/* {isLoading && <Spinner animation="grow" />} */}
              
                <div className="relative flex  justify-end">
                 
                  <input
                    type="text"
                    placeholder="Write your message!"
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3"
                    name="massage"
                    onChange={handleChange}
                    value={massage.massage}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddMassage();
                      }
                    }}
                    style={{ direction: "ltr" }}
                  />
                  <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                      onClick={handleAddMassage}
                    >
                      <span className="font-bold">Send</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6 ml-2 transform rotate-90"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                      <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                  </span>
                  <img
                    src="/src/assets/img/profile-img.jpg"
                    alt=""
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">Anderson Vanhron</span>
                  </div>
                  <span className="text-lg text-gray-600">
                    Junior Developer
                  </span>
                </div>
              </div>
            
            </div>
            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
              <div className="chat-message">
           <div className="mt-[8rem]">
    {Array(10)
      .fill("")
      .map((e, i) => (
        <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
      ))}
  </div>
              </div>
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex  justify-end">
                <span className="absolute inset-y-0 flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="text"
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                  style={{ direction: "ltr" }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

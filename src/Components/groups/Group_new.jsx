/* eslint-disable react-hooks/exhaustive-deps */
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { Alert, Nav, NavDropdown } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClientF from "../../axiosClientFront";
import axiosClient from "../../axiosClientOffline";
import axiosClientImage from "../../axios_img_offline";
import "/src/assets/css/Group.css";
export default function Group() {
  const chatContainerRef = useRef(null);
  const [chats, setChat] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [plan, setPlan] = useState(null);
  const [name, setName] = useState(null);
  // const [state, setState] = useState(null);
  const [email, setEmail] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [massage, setMassage] = useState({
    massage: "",
  });

  const fetchPusher = async () => {
    try {
      const response = await axiosClientF.post("me");
      setEmail(response.data.user.email);
      setName(response.data.user.name);
    } catch (err) {
      console.log(err);
      if(err.message =="Network Error"){
        setErrorMessage(`الانترنت لا يعمل`);
      }else{
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
  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  };
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
  const handleBanPlanConfirm = async (plan) => {
    try {
      const response = await axiosClient.post('banPlan',{nameChannel:plan});
      if (response.data.success) {
        setSuccessMessage("chat Ban successfully");
      window.location.href = `/dashboard/groups?plan=${plan}`;
      }
      
    } catch (error) {
      setErrorMessage("Error deleting recommendation",error.massage);
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
  const appendDataToChat = (data) => {
    setChatData((prevData) => [...prevData, data]);
  };
  const handleChange = (e) => {
    setMassage({ ...massage, [e.target.name]: e.target.value });
  };
  const handleAddMassage = async () => {
    if (massage.massage !== "") {
      try {
         await axiosClient.post("adminChatPlan", {nameChannel: plan, massage: massage.massage});
        // console.log(response.data);
        setMassage({ massage: "" });
      } catch (err) {
        console.log(err);
        setErrorMessage("Error fetching adminChatPlan:",err.massage);
      }
    }
   
  };
  const fetchChat = async () => {
    // setIsLoading(true);
  // setError(null);
    try {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get("plan");
      const response = await axiosClient.post(`chatAdmin`, { nameChannel: plan });
      // const response = await axiosClient.post(`chatAdmin?page${page}`, { nameChannel: plan });
      setChat(response.data.data);
      scrollChatToBottom();
      // setChat(prevChat => [...prevChat,...response.data.data]);
      // setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(error);
    // }finally {
      // setIsLoading(false);
    }
  };
  return (
    <>
     {successMessage ? <Alert variant="success" className="w-content">{successMessage}</Alert>:null}
     {errorMessage ? <Alert variant="danger" className="w-content">{errorMessage}</Alert>:null}
      {chats ? (
        <>
          <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden" style={{direction: "ltr"}}>
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full" style={{direction: "ltr"}}>
          <div
            className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div className="ml-2 font-bold text-2xl">Plans Chat</div>
        </div>
        <div
          className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
        >
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src="https://avatars3.githubusercontent.com/u/2763884?s=128"
              alt="Avatar"
              className="h-full w-full"
            />
          </div>
          <div className="text-sm font-semibold mt-2">{name}</div>
          <div className="text-xs text-gray-500">{email}</div>
          <div className="flex flex-row items-center mt-3" style={{direction: "ltr"}}>
            <div className="d-flex" id="banPlan" style={{direction: "ltr"}}>
            <div
              className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full cursor-pointer"
            >
              <div className="h-3 w-3 bg-white rounded-full self-end mr-1 ">
                <button className="visibility-hidden" onClick={handleBanPlanConfirm}></button>
              </div>
            </div>
              <div className="leading-none ml-1 text-xs">Active</div>
            </div>
            <div className="d-flex d-none" id="unbanPlan" style={{direction: "ltr"}}>
            <div
              className="flex flex-col justify-center h-4 w-8 bg-slate-400 rounded-full cursor-pointer" id="banPlan"
            >
              <div className="h-3 w-3 bg-white rounded-full self-start mr-1 ">
                <button className="visibility-hidden" onClick={handleUnBanPlanConfirm}></button>
              </div>
            </div>
            <div className="leading-none ml-1 text-xs">Disactive</div>
            </div>
          <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg border h-5 w-5 transition duration-500 ease-in-out text-red-300 hover:text-red-600 focus:outline-none"
                    onClick={() => handleDeleteConfirmPlan(plan)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">Active Conversations</span>
            <span
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >4</span
            >
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-52 overflow-y-auto">
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              style={{direction: "ltr"}}
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                F
              </div>
              <div className="ml-2 text-sm font-semibold">Free</div>
            </button>
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              style={{direction: "ltr"}}
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"
              >
                V
              </div>
              <div className="ml-2 text-sm font-semibold">VIP 1</div>
              <div
                className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
              >
                2
              </div>
            </button>
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              style={{direction: "ltr"}}
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full"
              >
                V
              </div>
              <div className="ml-2 text-sm font-semibold">VIP 2</div>
            </button>
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              style={{direction: "ltr"}}
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-pink-200 rounded-full"
              >
                V
              </div>
              <div className="ml-2 text-sm font-semibold">VIP 3</div>
            </button>
          </div>
          <div className="flex flex-row items-center justify-between text-xs mt-6">
            <span className="font-bold">Archivied</span>
            <span
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >7</span
            >
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2">
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              style={{direction: "ltr"}}
            >
              <div
                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
              >
                H
              </div>
              <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto h-full p-6">
        <div
          className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
        >
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
            {chats ? (
              <div className="grid grid-cols-12 gap-y-2">
                {chats.slice().reverse().map((chat, index) => (
                <>
                {chat.user.email != email ? (
                  <>
                {/* send to me */}
                <div className="col-start-1 col-end-8 p-3 rounded-lg" id={index + 1} key={index+1}>
                  <div className="flex flex-row items-start">
                    <div
                      className="flex items-center justify-center ml-1 h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                     {chat.user.name ?chat.user.name.slice(0, 1).toUpperCase():""}
                    </div>
                    <div
                      className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div className=" text-blue-600 d-flex justify-between">
                          {chat.user.name}
                      <Nav style={{ padding: "0",right: "0" }}>
            <NavDropdown
              id="dropdown-button-drop-end"
              title=""
              // style={{ color: randomColor() }}
              menuVariant="dark"
            >
              <NavDropdown.Item href="#" style={{ textAlign: "center",padding: "0"}} onClick={() => handleDeleteConfirm(chat.id)}>
                delete
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav> 
                          </div>
                      <div > 
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
                            )}</div>
                    </div>
                  </div>
                </div>
                </>
                ) : (
               <>
              {/* i sended */}
                <div className="col-start-6 col-end-13 p-3 rounded-lg" key={index + 1}>
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div
                      className="flex items-center justify-center ml-1 h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>I m ok what about you?</div>
                    </div>
                  </div>
                </div>
                </>
                 )
                }
                </>
                ))}
                {chatData.slice().reverse().map((chat, index) => (
                <>
                {chat.user.email != email ? (
                  <>
                {/* send to me */}
                <div className="col-start-1 col-end-8 p-3 rounded-lg" id={index + 1} key={index+1}>
                  <div className="flex flex-row items-start">
                    <div
                      className="flex items-center justify-center ml-1 h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                     {/* {name ?name.slice(0, 1).toUpperCase():""} */}
                    </div>
                    <div
                      className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div className=" text-blue-600 d-flex">
                          {chat.user.name}
                          </div>
                      <div > {chat.massage ? (
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
                            )}</div>
                    </div>
                  </div>
                </div>
                </>
                ) : (
               <>
              {/* i sended */}
                <div className="col-start-6 col-end-13 p-3 rounded-lg" key={index + 1}>
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div
                      className="flex items-center justify-center ml-1 h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                    >
                      <div>I m ok what about you?</div>
                    </div>
                  </div>
                </div>
                </>
                 )
                }
                </>
                ))}
                  <div ref={chatContainerRef}></div>
              </div>
            ) : (
              null
            )}
            </div>
          </div>
          <div
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            style={{direction: "ltr"}}
          >
            <div>
              <button
                className="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                {/* <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg> */}
              </button>
            </div>
            <div className="flex-grow ml-4">
              <div className="relative w-full">
                <input
                  type="text"
                  onChange={handleChange}
                //   placeholder="Type a message..."
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddMassage();
                    }
                  }}
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                  onClick={handleAddMassage}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
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

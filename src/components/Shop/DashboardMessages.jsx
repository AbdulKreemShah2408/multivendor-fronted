import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import styles from "../../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = "https://multivendor-socket-code-production.up.railway.app";

const DashboardMessages = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const socketId = useRef(null);

  // Connection Setup
  useEffect(() => {
    socketId.current = socketIO(ENDPOINT, { 
      transports: ["websocket", "polling"],
      forceNew: true 
    });

    socketId.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    return () => {
      socketId.current.disconnect();
    };
  }, []);

  // Identity logic - Green Dot FIX
  useEffect(() => {
    if (seller?._id && socketId.current) {
      socketId.current.emit("addUser", seller._id);
      socketId.current.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller, socketId.current]);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
          { withCredentials: true }
        );
        setConversations(response.data.conversations);
      } catch (error) { console.log(error); }
    };
    if (seller) getConversation();
  }, [seller, messages]);

  // Updated onlineCheck Logic
  const onlineCheck = (chat) => {
    const remoteMemberId = chat.members.find((member) => member !== seller?._id);
    const isOnline = onlineUsers.some((user) => user.userId === remoteMemberId);
    return isOnline;
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(`${server}/message/get-all-messages/${currentChat?._id}`);
        setMessages(response.data.messages);
      } catch (error) { console.log(error); }
    };
    if (currentChat) getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const receiverId = currentChat.members.find((member) => member !== seller._id);

    socketId.current.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios.post(`${server}/message/create-new-message`, {
          sender: seller._id,
          text: newMessage,
          conversationId: currentChat._id,
        }).then((res) => {
          setMessages([...messages, res.data.message]);
          updateLastMessage();
        });
      }
    } catch (error) { console.log(error); }
  };

  const updateLastMessage = async () => {
    socketId.current.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });
    await axios.put(`${server}/conversation/update-last-message/${currentChat._id}`, {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    }).then(() => setNewMessage(""));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(reader.result);
          imageSendingHandler(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const imageSendingHandler = async (e) => {
    const receiverId = currentChat.members.find((member) => member !== seller._id);
    socketId.current.emit("sendMessage", { senderId: seller._id, receiverId, images: e });
    try {
      await axios.post(`${server}/message/create-new-message`, {
        images: e,
        sender: seller._id,
        text: newMessage,
        conversationId: currentChat._id,
      }).then((res) => {
        setImages();
        setMessages([...messages, res.data.message]);
      });
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">All Messages</h1>
          {conversations && conversations.map((item, index) => (
            <MessageList
              data={item} key={index} index={index}
              setOpen={setOpen} setCurrentChat={setCurrentChat}
              me={seller._id} setUserData={setUserData}
              online={onlineCheck(item)} setActiveStatus={setActiveStatus}
              isLoading={isLoading}
            />
          ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen} newMessage={newMessage} setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler} messages={messages}
          sellerId={seller._id} userData={userData} activeStatus={activeStatus}
          scrollRef={scrollRef} handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data, index, setOpen, setCurrentChat, me, setUserData, online, setActiveStatus, isLoading,
}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const userId = data.members.find((u) => u !== me);
    const getUserData = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) { console.log(error); }
    };
    getUserData();
  }, [me, data]);

  const handleClick = (id) => {
    navigate(`/dashboard-messages?${id}`);
    setOpen(true);
  };

  return (
    <div
      className={`w-full flex p-3 px-3 ${active === index ? "bg-[#00000010]" : "bg-transparent"} cursor-pointer`}
      onClick={() => {
        setActive(index);
        handleClick(data._id);
        setCurrentChat(data);
        setUserData(user);
        setActiveStatus(online);
      }}
    >
      <div className="relative">
        <img src={user?.avatar?.url} alt="" className="w-[50px] h-[50px] rounded-full" />
        {/* Updated Green Dot logic */}
        <div className={`w-[12px] h-[12px] rounded-full absolute top-[2px] right-[2px] ${online ? "bg-green-400" : "bg-gray-400"}`} />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {!isLoading && data?.lastMessageId !== user?._id ? "You: " : user?.name.split(" ")[0] + ": "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  scrollRef, setOpen, newMessage, setNewMessage, sendMessageHandler, messages, sellerId, userData, activeStatus, handleImageUpload,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img src={userData?.avatar?.url} alt="" className="w-[60px] h-[60px] rounded-full" />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "Active Now" : ""}</h1>
          </div>
        </div>
        <AiOutlineArrowRight size={20} className="cursor-pointer" onClick={() => setOpen(false)} />
      </div>
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        {messages && messages.map((item, index) => (
          <div key={index} className={`flex w-full my-2 ${item.sender === sellerId ? "justify-end" : "justify-start"}`} ref={scrollRef}>
            {item.sender !== sellerId && (
              <img src={userData?.avatar?.url} className="w-[40px] h-[40px] rounded-full mr-3" alt="" />
            )}
            {item.images && (
              <img src={item.images?.url || item.images} className="w-[300px] h-[300px] object-cover rounded-[10px] mr-2" alt="sent" />
            )}
            {item.text !== "" && (
              <div>
                <div className={`w-max p-2 rounded ${item.sender === sellerId ? "bg-[#000]" : "bg-[#38c776]"} text-[#fff] h-min`}>
                  <p>{item.text}</p>
                </div>
                <p className="text-[12px] text-[#000000d3] pt-1">{format(item.createdAt)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <form className="p-3 relative w-full flex justify-between items-center" onSubmit={sendMessageHandler}>
        <div className="w-[30px]">
          <input type="file" name="" id="image" className="hidden" onChange={handleImageUpload} />
          <label htmlFor="image"><TfiGallery className="cursor-pointer" size={20} /></label>
        </div>
        <div className="w-full">
          <input type="text" required placeholder="Enter your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className={`${styles.input}`} />
          <button type="submit" className="hidden" id="send"></button>
          <label htmlFor="send"><AiOutlineSend size={20} className="absolute right-4 top-5 cursor-pointer" /></label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
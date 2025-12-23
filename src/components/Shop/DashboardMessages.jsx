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
    socketId.current = socketIO(ENDPOINT, { transports: ["websocket", "polling"] });

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

  // Online Status Handler - FIX: Stable event emission
  useEffect(() => {
    if (seller && socketId.current) {
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

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
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

// ... Rest of the components (MessageList, SellerInbox) same as before ...
// (Note: In components, use 'online' prop to show the green dot)

export default DashboardMessages;
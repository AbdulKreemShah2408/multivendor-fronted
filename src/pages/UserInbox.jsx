import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import socketIo from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
import { format } from "timeago.js";
import { server } from "../server";

const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessages] = useState("");
  const [open, setOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState(false);
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-user/${user?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.conversations,"fff");

        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user,messages]);

  useEffect(() => {
    if (user) {
      const userId = user._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);
  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member != user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  // get  messages
  useEffect(() => {
    const getMessage = async () => {
      if (!currentChat) return;
      try {
        const res = await axios.get(
          `${server}/message/get-all-messages/${currentChat._id}`
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member.id !== user.id
    );
    socketId.emit("sendMessage", {
      sender: user._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message, {
            withCredentials: true,
          })
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessages("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      <Header />
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All Messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}
    </div>
  );
};
const MessageList = ({data, index, setOpen, setCurrentChat,me,setUserData,userData,online,setActiveStatus}) => {
  const [user,setUser]=useState([]);
  const [active,setActive]=useState(0);
   const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  useEffect(() => {
  setActiveStatus(online);
  const userId=data.members.find((user)=>user !=me);
 
  const getUser=async()=>{
    try {
      const res=await axios.get(`${server}/user/user-info/${userId}`)
      setUser(res.data.user);
    } catch (error) {
      console.log(error)
    }
  };
  getUser();
}, [me,data])
  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      } cursor-pointer `}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setCurrentChat(data)  || setUserData(user) || setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${user?.avatar?.url}`}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        {online ? (
          <div className="w-[12px] h-[12px]  bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
        ) : (
          <div className="w-[12px] h-[12px]  bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]"></div>
        )}
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessage !== user._id
            ? "You:"
            : user.name.split("")[0] + ":"}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default UserInbox;

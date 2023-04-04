import React, {useContext} from 'react';
import style from './Chat.module.css';
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import {ChatContext} from "../../context/ChatContext";

const Chat = () => {

    const {data} = useContext(ChatContext);


    return (
        <div className={style.chat} >
          <div className={style.info} >
              <span>{data.user.displayName}</span>
          </div>
          <Messages />
          <Input />
        </div>
    );
};

export default Chat;
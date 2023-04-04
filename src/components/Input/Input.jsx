import React, {useContext, useState} from 'react';
import style from './Input.module.css';
import img from '../../images/img.png';
import clip from '../../images/pclip.png';
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";
import {updateDoc, doc, arrayUnion, Timestamp, setDoc, collection, serverTimestamp} from "firebase/firestore";
import {db, storage} from "../../firebase/firebase";
import {v4 as uuid} from "uuid";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

const Input = () => {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const handle = async() => {
        if(img){
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error)=> {

                },
                () => {
                    // get download URL and update user profile
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id:uuid(),
                                text,
                                senderId: currentUser.uid,
                                date:Timestamp.now(),
                                img:downloadURL
                            })
                        })
                    });
                }
            );
        } else{
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id:uuid(),
                    text,
                    senderId: currentUser.uid,
                    date:Timestamp.now()
                })
            })
        }
        await updateDoc(doc(db, "userChat", currentUser.uid), {
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userChat", data.user.uid), {
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId+".date"]: serverTimestamp()
        })

        setText("");
        setImg(null);
    }
    return (
        <div className={style.input} >
           <input
               type='text'
               placeholder='Type something...'
               value={text}
               onChange={e => setText(e.target.value)}
           />
           <div className={style.send} >
               <input
                   type='file'
                   style={{display:'none'}}
                   id='file'
                   onChange={e => setImg(e.target.files[0])}
               />
               <label htmlFor='file' >
                   <img src={clip} />
               </label>
               <button onClick={handle} >Send</button>
           </div>
        </div>
    );
};

export default Input;
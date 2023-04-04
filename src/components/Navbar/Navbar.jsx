import React, {useContext, useState} from 'react';
import Search from "../Search/Search";
import Contacts from "../Contacts/Contacts";
import './Navbar.css';
import {collection, serverTimestamp, getDoc, getDocs, updateDoc, query, setDoc, where, doc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {

    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const {currentUser} = useContext(AuthContext);

    const handle = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName", "==", userName)
        );
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(item => {
                setUser(item.data());
            })
        } catch (err){
            setErr(true);
        }
    }

    const handleKey = e => {
        e.code === "Enter" && handle();
    }

    const selectChat = async() => {
        const mixedId = currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try{
            const res = await getDoc(doc(db, "chats", mixedId));
            if(!res.exists()){
                //create new chat
                await setDoc(doc(db, "chats", mixedId), {messages: []});
                await updateDoc(doc(db, "userChat", currentUser.uid), {
                    [mixedId+'.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [mixedId+'.date']: serverTimestamp()
                });
                await updateDoc(doc(db, "userChat", user.uid), {
                    [mixedId+'.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [mixedId+'.date']: serverTimestamp()
                });
            }
        }catch(err){
            setErr(true);
        }
    }

    return (
        <div className='navbar' >
            <Search
                userName={userName}
                setUserName={setUserName}
                handleKey={handleKey}
                user={user} err={err}
                selectChat={selectChat} />
            <Contacts />
        </div>
    );
};

export default Navbar;

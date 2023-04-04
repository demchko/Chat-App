import React, {useState} from 'react';
import style from './Search.module.css';


const Search = ({userName, setUserName, handleKey, user, err, selectChat}) => {
    return (
        <div className={style.search} >
            <input
                type='text'
                placeholder='search...'
                value={userName}
                onChange={e => setUserName(e.target.value)}
                onKeyDown={handleKey}
            />
            <div className={style.list} >
                {err && <p>User not found!</p>}
                {user && <div className={style.block} onClick={selectChat} >
                    <img src={user.photoURL} />
                    <div>
                        <span>{user.displayName}</span>
                        <p style={{fontSize: '12px'}} >Hello</p>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default Search;
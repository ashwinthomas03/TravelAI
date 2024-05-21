import React from 'react';
import styles from '@/app/home/(components)/itineraryItem.module.scss';
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import deleteUser from "@/api/deleteUser";

function UserItem({username, name}:{username: string, name: string}) {
    return (
            <div className={styles.container}>
                <div className={styles.label}>
                    <h2>@{username}</h2>
                    <h1>{name}</h1>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteUser(username).then(r => {
                        if (r) {
                            window.location.reload();
                        } else {
                            alert("Failed to delete")
                        }
                    })
                }}>
                    <FaTrashCan/>
                </button>
            </div>
    );
}

export default UserItem;
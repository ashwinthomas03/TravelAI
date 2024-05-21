"use client";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from "@/app/home/page.module.scss";
import Link from "next/link";
import getAdmin, {AdminData} from "@/api/getAdmin";
import loginAdmin from "@/api/loginAdmin";
import {useRouter} from "next/navigation";
import UserItem from "@/app/admin/(components)/UserItem";
import {listUsers, UsersListType} from "@/api/listUsers";

function Page() {
    const router = useRouter();
    const [admin, setAdmin] = useState<AdminData | null>(null);
    const [users, setUsers] = useState<UsersListType>([]);
    useLayoutEffect(() => {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (!password || !username) {
            router.push("/auth/admin");
        } else {
            loginAdmin(username, password).then(r => {
                if (!r) {
                    router.push("/auth/admin");
                } else {
                    getAdmin(username).then(admin => {
                        if (!admin) {
                            router.push("/auth/admin");
                        }
                        setAdmin(admin);
                    })
                }
            });
        }
    }, [router]);

    useEffect(() => {
        if (!admin){
            return
        }
        listUsers().then(r => {
            setUsers(r);
        });
    }, [admin]);

    if (!admin) {
        return <main className={styles.main}/>
    }

    return (
        <div className={styles.main}>
            <nav>
                <Link href={"/auth/login"}>{admin.name}</Link>
            </nav>
            <div className={styles.history}>
                {users.map((itin, i) => (
                    <UserItem key={itin.id} username={itin.id} name={itin.name}/>
                ))}
            </div>
        </div>
    );
}

export default Page;
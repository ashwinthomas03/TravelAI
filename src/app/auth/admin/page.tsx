'use client';
import React, {useEffect, useRef} from 'react';
import {useRouter} from "next/navigation";
import styles from "../page.module.scss";
import Link from "next/link";
import verifyAdminHash from "@/api/verifyAdminHash";
import loginAdmin from "@/api/loginAdmin";

export default function Home() {
    let usernameRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let router = useRouter();

    useEffect(()=>{
        let adminID = localStorage.getItem("adminID");
        let adminHash = localStorage.getItem("adminHash");
        if (adminID && adminHash){
            verifyAdminHash(adminID, adminHash).then(r => {
                if (r){
                    window.location.href = "localhost:3000/home";
                }
            })
        }
    }, []);
  return (
    <main className={styles.main}>
      <form>
        <h1>Admin Access</h1>
        <input ref={usernameRef} type="text" placeholder={"Enter username..."}/>
        <input ref={passwordRef} type="password" placeholder={"Enter password..."}/>
            <button type={"button"} onClick={()=>{
                if (usernameRef.current && passwordRef.current){
                    let username = usernameRef.current.value;
                    let password = passwordRef.current.value;
                    loginAdmin(username, password).then(r => {
                        if (!r){
                            alert("Failed to login")
                        } else {
                            localStorage.setItem("username", username);
                            localStorage.setItem("password", password);
                            router.push("/admin");
                        }
                    })
                }
            }}>Login</button>
        <Link href={"/auth/login"}>Login as an user</Link>
        <Link href={"/auth/signup"}>Sign up as an user</Link>
      </form>
    </main>
  );
}
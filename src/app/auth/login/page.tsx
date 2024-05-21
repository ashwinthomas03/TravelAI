'use client';
import React, {useEffect, useRef} from 'react';
import {useRouter} from "next/navigation";
import styles from "../page.module.scss";
import Link from "next/link";
import verifyUserHash from "@/api/verifyUserHash";
import loginUser from "@/api/loginUser";

export default function Home() {
    let usernameRef = useRef<HTMLInputElement>(null);
    let passwordRef = useRef<HTMLInputElement>(null);
    let router = useRouter();

    useEffect(()=>{
        let userID = localStorage.getItem("userID");
        let userHash = localStorage.getItem("userHash");
        if (userID && userHash){
            verifyUserHash(userID, userHash).then(r => {
                if (r){
                    window.location.href = "localhost:3000/home";
                }
            })
        }
    }, []);
  return (
    <main className={styles.main}>
      <form>
        <h1>Travel AI</h1>
        <input ref={usernameRef} type="text" placeholder={"Enter username..."}/>
        <input ref={passwordRef} type="password" placeholder={"Enter password..."}/>
            <button type={"button"} onClick={()=>{
                if (usernameRef.current && passwordRef.current){
                    let username = usernameRef.current.value;
                    let password = passwordRef.current.value;
                    loginUser(username, password).then(r => {
                        if (!r){
                            alert("Failed to login")
                        } else {
                            localStorage.setItem("username", username);
                            localStorage.setItem("password", password);
                            router.push("/home");
                        }
                    })
                }
            }}>Login</button>
        <Link href={"/auth/signup"}>Sign up if you don&apos;t have an account</Link>
        <Link href={"/auth/admin"}>Login as an admin</Link>
      </form>
    </main>
  );
}
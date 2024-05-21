"use client";
import styles from "../page.module.scss";
import Link from "next/link";
import {useRef} from "react";
import {createUser} from "@/api/createUser";

export default function Home() {
    const name = useRef<HTMLInputElement>(null);
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    return (
        <main className={styles.main}>
            <form>
                <h1>Registration</h1>
                <input ref={name} type="text" placeholder={"Enter name..."}/>
                <input ref={username} type="text" placeholder={"Enter username..."}/>
                <input ref={password} type="password" placeholder={"Enter password..."}/>
                <button type={"button"} onClick={() => {
                    if (username.current && password.current && name.current) {
                        createUser(username.current.value, password.current.value, name.current.value).then(r => {
                            if (r) {
                                alert("Success");
                            } else {
                                alert("Failed");
                            }
                        })
                    } else {
                        alert("Something not defined!");
                    }
                }}>Sign up
                </button>
                <Link href={"/auth/login"}>Login if you have an account</Link>
            </form>
        </main>
    );
}

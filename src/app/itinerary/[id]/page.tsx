"use client";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import getItinerary, {ItineraryData} from "@/api/getItinerary";
import {useRouter} from "next/navigation";
import styles from "./page.module.scss";
import Link from "next/link";
import Day from "@/app/itinerary/(components)/Day";
import ActionButtons from "@/app/itinerary/(components)/ActionButtons";
import loginUser from "@/api/loginUser";
import getUser, {UserData} from "@/api/getUser";

function Page({params: {id}}: {params: {id: string}}) {
    const router = useRouter();

    const [user, setUser] = useState<UserData | null>(null);
    const [itinerary, setItinerary] = useState<null | ItineraryData>(null);

    useLayoutEffect(() => {
        let username = localStorage.getItem("username");
        let password = localStorage.getItem("password");
        if (!password || !username) {
            router.push("/auth/login");
        } else {
            loginUser(username, password).then(r => {
                if (!r) {
                    router.push("/auth/login");
                } else {
                    getUser(username).then(user => {
                        if (!user) {
                            router.push("/auth/login");
                        }
                        setUser(user);
                    })
                }
            });
        }
    }, [router]);


    useEffect(() => {
        let username = localStorage.getItem("username");
        if (!username) {
            router.push("/auth/login")
        } else {
            getItinerary(username, id).then(r => {
                if (r){
                    setItinerary(r);
                } else {
                    router.push("/home");
                }
            });
        }
    }, [id, router]);

    if (!itinerary || !user){
        return  <main className={styles.main}></main>
    }

    return (
        <main className={styles.main}>
            <nav>
                <Link href={"/auth/login"}>{user.name}</Link>
            </nav>
            <div className={styles.container}>
                {
                    Object.entries(itinerary.days).map(([day, activities], i) => (
                        <Day key={day} date={day} activities={activities}/>
                    ))
                }
            </div>
            <ActionButtons/>
        </main>
    );
}

export default Page;
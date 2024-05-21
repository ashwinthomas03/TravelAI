"use client";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from './page.module.scss';
import Link from "next/link";
import ItineraryItem from "@/app/home/(components)/ItineraryItem";
import getUser, {UserData} from "@/api/getUser";
import loginUser from "@/api/loginUser";
import {useRouter} from "next/navigation";
import {ItinerariesListType, listUserItineraries} from "@/api/listUserItineraries";

function Page() {
    const router = useRouter();

    const [user, setUser] = useState<UserData | null>(null);
    const [itineraries, setItineraries] = useState<ItinerariesListType>([]);

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
        const username = localStorage.getItem("username") as string;
        listUserItineraries(username).then(r => {
            setItineraries(r);
        });
    }, []);

    if (!user) {
        return <main className={styles.main}/>
    }

    return (
        <main className={styles.main}>
            <nav>
                <Link href={"/auth/login"}>{user.name}</Link>
            </nav>
            <div className={styles.history}>
                {itineraries.map((itin, i) => (
                    <ItineraryItem key={itin.id} id={itin.id} number={i + 1} location={itin.destination}/>
                ))}
            </div>
            <div className={styles.generate}>
                <Link href={"/questionnaire"}>START NEW ITINERARY</Link>
            </div>
        </main>
    );
}

export default Page;
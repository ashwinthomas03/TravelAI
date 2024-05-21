'use client'

import React, {useState, ChangeEvent, FormEvent, useLayoutEffect} from 'react';
import styles from "./page.module.scss";
import Link from "next/link";
// @ts-ignore
import {generate} from "@/api/generate";
import {v4} from "uuid";
import putItinerary from "@/api/putItinerary";
import getUser, {UserData} from "@/api/getUser";
import loginUser from "@/api/loginUser";
import {useRouter} from "next/navigation";

function Page() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);

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

    const [formData, setFormData] = useState({
        destination: "",
        transport: "",
        hobbies: "",
        activityPreference: "",
        interests: "",
        time: "",
        dates: "",
        area: "",
        budget: "",
        company: "",
        food: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            generate(formData).then((data: string) => {
                if (!user){
                    return
                }
                try {
                    let days = JSON.parse(data);
                    let uuid = v4();
                    putItinerary({
                        id: uuid,
                        userID: user.id,
                        createdAt: Math.floor(new Date().getTime() / 1000),
                        days: days,
                        cost: parseInt(formData.budget),
                        destination: formData.destination,
                        questionnaire: formData,
                    }).then(r => {
                        if (r){
                            router.push("/home");
                        }
                        console.log(r);
                    })
                } catch (e) {
                    console.error("Failed to parse JSON data: ", e);
                    alert("Failed to process data!");
                }
            });
        } catch {
            alert("Failed to generate itinerary!")
        }

    };


    return (
        <main className={styles.main}>
            <nav>
                <Link href={"/auth/login"}>QUESTIONNAIRE</Link>
            </nav>
            <form className={styles.questionnaire} onSubmit={handleSubmit}>
                <div className={styles.question}>
                    <h2>1. Where are you traveling to?</h2>
                    <input type="text" name="destination" value={formData.destination} onChange={handleInputChange}/>
                </div>

                <div className={styles.question}>
                    <h2>2. Dates of stay? Example: 2/25-2/27</h2>
                    <input type="text" name="dates" value={formData.dates} onChange={handleInputChange}/>
                </div>
                <div className={styles.question}>
                    <h2>3. Where are you going to stay?</h2>
                    <input type="text" name="area" value={formData.area} onChange={handleInputChange}/>
                </div>
                <div className={styles.question}>
                    <h2>4. Start and end time of schedule for the day? Example: 11am-7pm</h2>
                    <input type="text" name="time" value={formData.time} onChange={handleInputChange}/>
                </div>

                <div className={styles.question}>
                    <h2>5. How do you like to move around?</h2>
                    <input type="text" name="transport" value={formData.transport} onChange={handleInputChange}/>
                </div>
                <div className={styles.question}>
                    <h2>6. List down any specific locations/spots you want to visit?</h2>
                    <input type="text" name="hobbies" value={formData.hobbies} onChange={handleInputChange}/>
                </div>
                <div className={styles.question}>
                    <h2>7. Do you like to do active or chill activities?</h2>
                    <input type="text" name="activityPreference" value={formData.activityPreference}
                           onChange={handleInputChange}/>
                </div>
                <div className={styles.question}>
                    <h2>8. Are you interested by history, art, etc?</h2>
                    <input type="text" name="interests" value={formData.interests} onChange={handleInputChange}/>
                </div>
                <div className={styles.question}>
                    <h2>9. What is your daily budget?</h2>
                    <input type="text" name="budget" value={formData.budget} onChange={handleInputChange}/>
                </div>
                <div className={styles.question}>
                    <h2>10. Are you by yourself or with other people?</h2>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange}/>
                </div>
                <div className={styles.question}>
                    <h2>11. What type of food you prefer?</h2>
                    <input type="text" name="food" value={formData.food} onChange={handleInputChange}/>
                </div>

                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );
}

export default Page;

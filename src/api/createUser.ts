"use server";
import {hash} from "argon2";

export async function createUser(username: string, password: string, name: string) {
    const passwordHash = await hash(password);

    let res = await fetch("https://shams.cyruscloud.io/db/put/NYIT-TravelAI.Users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic TllJVC1UcmF2ZWxBSS5XZWJzaXRlOjA2MTZmM2RlOTQ2MjkxYTc1MGJkMzRmZjc0OTNjZjZkYWY0ZmYyMDk2NjI3NjMyMzQ4YjRiM2RjYjYzZTFkZjk="
        },
        body: JSON.stringify({
            id: username,
            password: passwordHash,
            name
        }),
        cache: "no-cache"
    });
    if (res.status != 200){
        console.log(await res.text())
    }
    return res.status == 200;
}
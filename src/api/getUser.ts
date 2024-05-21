"use server";

export interface UserData {
    id: string;
    name: string;
    password: string;
}
export default async function getUser(userID: string): Promise<UserData|null> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic TllJVC1UcmF2ZWxBSS5XZWJzaXRlOjA2MTZmM2RlOTQ2MjkxYTc1MGJkMzRmZjc0OTNjZjZkYWY0ZmYyMDk2NjI3NjMyMzQ4YjRiM2RjYjYzZTFkZjk=");
    myHeaders.append("ApplicationID", "TravelAI");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": userID
    });

    let x = await fetch("https://shams.cyruscloud.io/db/get/NYIT-TravelAI.Users", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        cache: "no-cache",
    });
    if (x.status === 200) {
        let text = await x.text();
        if (!text){
            return null;
        }
        let js = JSON.parse(text);
        return js as UserData;

    } else {
        return null;
    }
}

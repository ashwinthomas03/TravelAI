"use server";

export default async function deleteUser(userID: string): Promise<boolean> {

    let x = await fetch("https://shams.cyruscloud.io/db/delete/NYIT-TravelAI.Users", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic TllJVC1UcmF2ZWxBSS5XZWJzaXRlOjA2MTZmM2RlOTQ2MjkxYTc1MGJkMzRmZjc0OTNjZjZkYWY0ZmYyMDk2NjI3NjMyMzQ4YjRiM2RjYjYzZTFkZjk="
        },
        body: JSON.stringify({
            "id": userID,
        }),
        cache: "no-cache"
    });
    console.log(x.status, await x.text());
    return x.status == 200;
}

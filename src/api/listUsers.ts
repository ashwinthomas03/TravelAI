"use server";
export type UsersListType = {
    id: string,
    name: string
}[];

export async function listUsers(): Promise<UsersListType> {
    const res = await fetch("https://shams.cyruscloud.io/db/scan/NYIT-TravelAI.Users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic TllJVC1UcmF2ZWxBSS5XZWJzaXRlOjA2MTZmM2RlOTQ2MjkxYTc1MGJkMzRmZjc0OTNjZjZkYWY0ZmYyMDk2NjI3NjMyMzQ4YjRiM2RjYjYzZTFkZjk="
        },
        cache: "no-cache"
    });
    if (res.status != 200){
        console.log(await res.text());
        return [];
    }
    let js = await res.json();
    console.log(js);
    return js;
}
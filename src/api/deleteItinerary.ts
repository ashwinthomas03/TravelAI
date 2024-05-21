"use server";

export default async function deleteItinerary(userID: string, itineraryID: string): Promise<boolean> {

    let x = await fetch("https://shams.cyruscloud.io/db/delete/NYIT-TravelAI.Itineraries", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic TllJVC1UcmF2ZWxBSS5XZWJzaXRlOjA2MTZmM2RlOTQ2MjkxYTc1MGJkMzRmZjc0OTNjZjZkYWY0ZmYyMDk2NjI3NjMyMzQ4YjRiM2RjYjYzZTFkZjk="
        },
        body: JSON.stringify({
            "userID": userID,
            "id": itineraryID
        }),
        cache: "no-cache"
    });
    return x.status == 200;
}

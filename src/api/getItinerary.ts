"use server";

export interface Activity {
    activity: string;
    startTime: string;
    endTime: string;
    description: string;
    cost: number;
}

export interface ItineraryData {
    userID: string;
    id: string;
    createdAt: number;
    days: {[key: string]: Activity[]};
}



export default async function getItinerary(userID: string, itineraryID: string): Promise<ItineraryData|null> {
    let x = await fetch("https://shams.cyruscloud.io/db/get/NYIT-TravelAI.Itineraries", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic TllJVC1UcmF2ZWxBSS5XZWJzaXRlOjA2MTZmM2RlOTQ2MjkxYTc1MGJkMzRmZjc0OTNjZjZkYWY0ZmYyMDk2NjI3NjMyMzQ4YjRiM2RjYjYzZTFkZjk="
        },
        body: JSON.stringify({
            userID,
            id: itineraryID
        }),
        redirect: 'follow',
        cache: "no-cache"
    });
    if (x.status == 200){
        let text = await x.text();
        if (!text){
            return null;
        }
        return JSON.parse(text) as ItineraryData;
    } else {
        return null;
    }
}

"use server";

export interface Activity {
    activity: string;
    startTime: string;
    endTime: string;
    description: string;
    cost: number;
}

export interface ItineraryData {
    userID: string,
    id: string,
    createdAt: number,
    days: {[key: string]: Activity[]},
    questionnaire: any,
    destination: string
    cost: number;
}

export default async function putItinerary(itinerary: ItineraryData): Promise<boolean> {
    let x = await fetch("https://shams.cyruscloud.io/db/put/NYIT-TravelAI.Itineraries", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic TllJVC1UcmF2ZWxBSS5XZWJzaXRlOjA2MTZmM2RlOTQ2MjkxYTc1MGJkMzRmZjc0OTNjZjZkYWY0ZmYyMDk2NjI3NjMyMzQ4YjRiM2RjYjYzZTFkZjk="
        },
        body: JSON.stringify(itinerary),
        redirect: 'follow',
        cache: "no-cache"
    });
    console.log(await x.text());
    return x.status == 200;
}

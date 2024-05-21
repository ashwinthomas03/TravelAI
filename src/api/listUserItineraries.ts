"use server";
export type ItinerariesListType = {
    id: string,
    destination: string,
}[];

export async function listUserItineraries(username: string): Promise<ItinerariesListType> {
    const res = await fetch("https://shams.cyruscloud.io/db/QueryRecords", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic TllJVC1UcmF2ZWxBSS5XZWJzaXRlOjA2MTZmM2RlOTQ2MjkxYTc1MGJkMzRmZjc0OTNjZjZkYWY0ZmYyMDk2NjI3NjMyMzQ4YjRiM2RjYjYzZTFkZjk="
        },
        body: JSON.stringify({
            "TableName": "NYIT-TravelAI.Itineraries",
            "KeyConditionExpression": "#id = :id",
            "ExpressionAttributeNames": {
                "#id": "userID"
            },
            "ExpressionAttributeValues": {
                ":id": {
                    "S": username
                }
            }
        }),
        cache: "no-cache"
    });
    if (res.status != 200){
        console.log(await res.text());
        return [];
    }
    let js = await res.json();
    return js.Items.map((i: any) => ({id: i.id.S, destination: i.destination.S}));
}
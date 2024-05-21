"use server";
import {verify} from "argon2";
import getUser from "@/api/getUser";

export default async function verifyUserHash(userID: string, userHash: string): Promise<boolean> {
    let user = await getUser(userID);
    if (!user){
        return false;
    }

    return await verify(userHash, user.password);
}
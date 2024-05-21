"use server";
import {verify} from "argon2";
import getUser from "@/api/getUser";

export default async function loginUser(username: string, password: string): Promise<boolean> {
    let user = await getUser(username);
    if (!user){
        console.log("User not found");
        return false;
    }
    return await verify(user.password, password);

}
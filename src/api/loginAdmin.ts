"use server";
import {verify} from "argon2";
import getAdmin from "@/api/getAdmin";

export default async function loginAdmin(username: string, password: string): Promise<boolean> {
    let admin = await getAdmin(username);
    if (!admin){
        console.log("User not found");
        return false;
    }
    return await verify(admin.password, password);

}
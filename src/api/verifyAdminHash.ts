"use server";
import {verify} from "argon2";
import getAdmin from "@/api/getAdmin";

export default async function verifyAdminHash(adminID: string, adminHash: string): Promise<boolean> {
    let admin = await getAdmin(adminID);
    if (!admin){
        return false;
    }

    return await verify(adminHash, admin.password);
}
import {v4 as createUUID} from "uuid";
import {seed} from "drizzle-seed";
import {db} from "@/database/drizzle";
import {users} from "@/database/schema";
import {GENDERS} from "@/constants/constants";
import {notInArray} from "drizzle-orm/sql/expressions/conditions";


export const generateUUID = () => {
    return new Array(10).fill(0).map(() => createUUID())
}

export const generateAdminId = () => {
    return new Array(10).fill(0).map((_, idx) => (107710 + idx).toString())
}

const RESERVED_ID = ["b9426b2d-5fd5-475d-97d2-c34bfcd6e85d", "bf8fb0ca-2b61-4885-bd3e-64525b141ee6", "0180aa3d-2999-467d-93f7-30954c509dd0", "c6d9c75e-9c16-4ce1-9b28-ad7553caf02c"]

async function main() {
    // clear the users table
    await db.delete(users).where(notInArray(users.id, RESERVED_ID));
    // seed the users table
    await seed(db, {users}).refine((f) => ({
        users: {
            columns: {
                id: f.uuid(),
                password: f.default({defaultValue: "$2a$10$eMpQdntHDNewRfktsueC8.98tjG8EIEv/l71cFWwfAdS3AfAKhoDC"}),
                userName: f.fullName(),
                firstName: f.firstName(),
                lastName: f.lastName(),
                email: f.email(),
                address: f.streetAddress(),
                state: f.state(),
                phoneNumber: f.phoneNumber(),
                gender: f.valuesFromArray({
                    values: [...GENDERS],
                }),
                postalCode: f.postcode(),
                township: f.city(),
                profileImage: f.string(),
            },
            count: 5,
        }
    }))
}


await main();
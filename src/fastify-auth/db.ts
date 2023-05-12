import { connectDb } from "#utils/mongodb.js";
import { AccountBase } from "#types/account.js";

const db = connectDb("account");

// mongodb account shcema
export const AccountModel = db.collection<AccountBase>("accounts");

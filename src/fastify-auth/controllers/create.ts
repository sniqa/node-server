import { AccountBase } from "#types/account.js";
import { isExistInMongodb, Joi, validate } from "#utils/process.js";
import { AccountModel } from "../db.js";

const validSchema = Joi.object({
  account: Joi.string().required(),
  password: Joi.string().required(),
});

export const create_account = async (query: AccountBase) => {
  validate(validSchema, query);

  await isExistInMongodb(AccountModel, { account: query.account });
};

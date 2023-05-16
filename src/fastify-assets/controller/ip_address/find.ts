import { IpAddressModel } from "../../db.js";
import { QeuryOptions, defaultQueryOptions } from "#types/common.js";

type FindNetworkGrounpParams = [any, QeuryOptions];

export const find_ip_address = async (
  { fuzzy }: { fuzzy: string },
  { length, page } = defaultQueryOptions
) => {
  const skip = page <= 0 ? 0 : length * (page - 1);

  const regex = new RegExp(fuzzy, "i");

  const query = {
    $or: [{ ip_address: { $regex: regex } }],
  };

  const res = await IpAddressModel.find(query, {
    projection: {},
  })
    .limit(length)
    .skip(skip)
    .toArray();

  const total = await IpAddressModel.countDocuments(query);

  return { data: res, total };
};

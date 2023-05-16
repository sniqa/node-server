import { NetworkGroupModel } from "../../db.js";
import { defaultQueryOptions } from "#types/common.js";

export const find_network_group = async (
  { fuzzy }: { fuzzy: string },
  { length, page } = defaultQueryOptions
) => {
  const skip = page <= 0 ? 0 : length * (page - 1);

  const regex = new RegExp(fuzzy, "i");

  const query = {
    $or: [{ group: { $regex: regex } }],
  };

  const res = await NetworkGroupModel.find(query, {
    projection: {},
  })
    .limit(length)
    .skip(skip)
    .toArray();

  const total = await NetworkGroupModel.countDocuments(query);

  return { data: res, total };
};

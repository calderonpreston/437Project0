// src/services/profile-svc.ts
import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "models/profile";


const ProfileSchema = new Schema<Profile>(
    {
      userid: { type: String, required: true, trim: true },
      name: { type: String, required: true, trim: true },
    },
    { collection: "user_profiles" }
  );

const ProfileModel = model<Profile>("Profile", ProfileSchema);

// in-memory DB
let profiles: Array<Profile> = [
  {
    userid: "blaze",
    name: "Blaze Pasquale",
  }
  // add a few more profile objects here
];

function index(): Promise<Profile[]> {
  return ProfileModel.find();
}

function get(userid: String): Promise<Profile> {
  console.log(ProfileModel.find({ userid }))
  return ProfileModel.find({ userid })
    .then((list) => list[0])
    .catch((err) => {
      throw `${userid} Not Found`;
    });
}

function create(profile: Profile): Promise<Profile> {
  const p = new ProfileModel(profile);
  return p.save();
}

function update(
  userid: String,
  profile: Profile
): Promise<Profile> {
  return ProfileModel.findOne({ userid })
    .then((found) => {
      if (!found) throw `${userid} Not Found`;
      else
        return ProfileModel.findByIdAndUpdate(
          found._id,
          profile,
          {
            new: true
          }
        );
    })
    .then((updated) => {
      if (!updated) throw `${userid} not updated`;
      else return updated as Profile;
    });
}
export default { index, get, create, update };
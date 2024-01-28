import {Schema , model} from "mongoose";

const parkingSchema = new Schema(
    {
        name: String,
        state: String,
        nbPlaces: Number,
        nbFreePlaces: Number,
    },
    {
        timestamps: true
    }
);

export default model("parking", parkingSchema);
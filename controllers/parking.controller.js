import { validationResult } from "express-validator";
import Parking from "../models/parking.js";

export const addParking = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({
            validationError: validationResult(req).array()
        });
    }
    try {
        const parking = new Parking(req.body);
        parking.nbFreePlaces = parking.nbPlaces;

        await parking.save();
        const response = await Parking.findById(parking._id).select('name -_id').exec();
        res.status(201).json(response)
        
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}

export const getParkings = async (req, res) => {
    try {
        const parkings = await Parking.find()
            .where("nbFreePlaces").gt(0)
            .select("_id name state nbFreePlaces")
            .exec();

        res.status(200).json(parkings)
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}
export const getParkingById = async (req, res) => {
    try {
        const { id } = req.params;

        const parking = await Parking.findById(id);

        res.status(200).json(parking)
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}


export const patchParkingById = async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({
            validationError: validationResult(req).array()
        });
    }
    
    try {
        const { id } = req.params;

        const parking = await Parking.findByIdAndUpdate(id, { name: req.body.name }, { new: true });

        res.status(200).json(parking)
    } catch (e) {
        console.log(e);
        res.status(500).end("Internal Server Error")
    }
}

export const deleteParkingById = async (req, res) => {
    try {
        const id = req.query.id;

        // Validate id or handle it appropriately based on your use case

        const deletedParking = await Parking.findByIdAndDelete(id);

        if (!deletedParking) {
            return res.status(404).json({
                message: "Parking not found"
            });
        }

        res.status(200).json(deletedParking);
    } catch (e) {
        console.error(e);
        res.status(500).end("Internal Server Error");
    }
}
export const deleteAllParkings = async (req, res) => {
    try {
        // Perform the deletion of all parkings
        const result = await Parking.deleteMany({});

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "No parkings found to delete"
            });
        }

        res.status(200).json({
            message: "All parkings deleted successfully",
            deletedCount: result.deletedCount
        });
    } catch (e) {
        console.error(e);
        res.status(500).end("Internal Server Error");
    }
}
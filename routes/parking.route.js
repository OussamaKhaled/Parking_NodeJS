import { Router } from "express";
import { addParking, getParkingById, getParkings, patchParkingById,deleteParkingById,deleteAllParkings } from "../controllers/parking.controller.js";
import { body,param,query } from "express-validator";

const router = Router();


router.post("/",
    body("name").isLength({ min: 5 }),
    body("state").isLength({ min: 5 }),
    body("nbPlaces").isNumeric(),
    addParking);

router.get("/", getParkings)
router.get("/:id", getParkingById)
router.patch("/:id",
    body("name").isLength({ min: 5 }),
    patchParkingById)

router.delete("/",
    query("id").isMongoId(), // Validate that the 'id' query parameter is a valid MongoDB ObjectId
    deleteParkingById)

router.delete("/delete-all",
    deleteAllParkings
);

export default router;
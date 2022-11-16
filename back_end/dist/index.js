"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 5000);
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
const router = express_1.default.Router();
//user api calls
console.log(router, "router");
router.get("/users/:id", (req, res, next) => {
    try {
        res.send(req.params.id);
    }
    catch (error) { }
});
router.delete("/users", (req, res, next) => {
    // try {
    // } catch (error) {
    // }
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middleware_1 = __importDefault(require("../Middlewares/middleware"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = 3000;
process.env.IMAGE_DIRECTORY = path_1.default.resolve(__dirname, "../../images");
app.use(express_1.default.static(__dirname + "/../../images"));
app.get("/", function (req, res, next) {
    res.redirect("/api/images");
    next();
});
app.get("/api/images", middleware_1.default);
app.listen(port, function () {
    console.log("Server started at port " + port);
});
exports.default = app;

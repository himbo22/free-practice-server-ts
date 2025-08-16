"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var expresskpop_1 = require("@himbo22/expresskpop");
var node_postgres_1 = require("drizzle-orm/node-postgres");
var fs = require("fs");
var ejs = require("ejs");
var schema_1 = require("./drizzle/schema");
var app = new expresskpop_1.default();
var db = (0, node_postgres_1.drizzle)("postgres://postgres:hoanglon@localhost:5432/8_7_2025");
var items = [
    { email: "alice@example.com", content: "Hello, world!" },
    { email: "bob@example.com", content: "This is a test" },
    { email: "carol@example.com", content: "Nice landing page" },
];
app.get("/public/style.css", function (req, res) {
    var css = fs.readFileSync("./src/public/style.css", "utf8");
    res.setHeader("Content-Type", "text/css");
    res.end(css);
});
app.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var template, items, html;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                template = fs.readFileSync("./src/views/index.ejs", "utf8");
                return [4 /*yield*/, db.select().from(schema_1.Feedback)];
            case 1:
                items = _a.sent();
                console.log(items);
                html = ejs.render(template, { items: items });
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(html);
                return [2 /*return*/];
        }
    });
}); });
app.get("/contact", function (req, res) {
    var template = fs.readFileSync("./src/views/contact.ejs", "utf8");
    var html = ejs.render(template, { items: items });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
});
app.post("/api/contact", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, content, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, content = _a.content;
                console.log(email, content);
                if (!(email && content)) return [3 /*break*/, 2];
                return [4 /*yield*/, db
                        .insert(schema_1.Feedback)
                        .values({ email: email, content: content })
                        .returning()];
            case 1:
                result = _b.sent();
                res.status(200).json({ status: result[0] });
                return [3 /*break*/, 3];
            case 2:
                res.status(400).json({ status: "not ok" });
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
app.run(3000);

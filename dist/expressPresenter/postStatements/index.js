"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidContentType_1 = require("../../errors/InvalidContentType");
var catchErrors_1 = require("../utils/catchErrors");
var getClient_1 = require("../utils/getClient");
var alternateRequest_1 = require("./alternateRequest");
var storeStatements_1 = require("./storeStatements");
var storeWithAttachments_1 = require("./storeWithAttachments");
exports.default = function (config) {
    return catchErrors_1.default(config, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var method, contentType, client, body, attachments;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    method = req.query.method;
                    contentType = req.header('Content-Type') || '';
                    if (method === undefined && /multipart\/mixed/.test(contentType)) {
                        return [2 /*return*/, storeWithAttachments_1.default({ config: config, req: req, res: res })];
                    }
                    if (!(method === undefined && contentType === 'application/json')) return [3 /*break*/, 2];
                    return [4 /*yield*/, getClient_1.default(config, req.header('Authorization') || '')];
                case 1:
                    client = _a.sent();
                    body = req.body;
                    attachments = [];
                    return [2 /*return*/, storeStatements_1.default({ config: config, client: client, body: body, attachments: attachments, res: res })];
                case 2:
                    if (method !== undefined && contentType === 'application/x-www-form-urlencoded') {
                        return [2 /*return*/, alternateRequest_1.default({ config: config, method: method, req: req, res: res })];
                    }
                    throw new InvalidContentType_1.default(contentType);
            }
        });
    }); });
};
//# sourceMappingURL=index.js.map
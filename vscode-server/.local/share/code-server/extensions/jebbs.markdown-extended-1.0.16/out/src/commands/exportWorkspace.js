"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const exportUri_1 = require("./exportUri");
class CommandExportWorkSpace extends command_1.Command {
    execute(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return exportUri_1.exportUri(uri);
        });
    }
    constructor() {
        super("markdownExtended.exportWorkspace");
    }
}
exports.CommandExportWorkSpace = CommandExportWorkSpace;
//# sourceMappingURL=exportWorkspace.js.map
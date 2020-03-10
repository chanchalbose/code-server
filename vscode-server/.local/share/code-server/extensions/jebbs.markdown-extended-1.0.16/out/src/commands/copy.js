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
const vscode = require("vscode");
const clip = require("clipboardy");
const shared_1 = require("../services/exporter/shared");
const markdownDocument_1 = require("../services/common/markdownDocument");
class CommandCopy extends command_1.Command {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            clip.write(yield renderMarkdown(false))
                .then(() => vscode.window.showInformationMessage("Copy success."));
        });
    }
    constructor() {
        super("markdownExtended.copy");
    }
}
exports.CommandCopy = CommandCopy;
class CommandCopyWithStyles extends command_1.Command {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            return clip.write(yield renderMarkdown(true))
                .then(() => vscode.window.showInformationMessage("Copy success."));
        });
    }
    constructor() {
        super("markdownExtended.copyWithStyle");
    }
}
exports.CommandCopyWithStyles = CommandCopyWithStyles;
function renderMarkdown(style) {
    return __awaiter(this, void 0, void 0, function* () {
        yield shared_1.ensureMarkdownEngine();
        let document = vscode.window.activeTextEditor.document;
        let selection = vscode.window.activeTextEditor.selection;
        let rendered = "";
        let doc;
        if (selection.isEmpty)
            doc = new markdownDocument_1.MarkdownDocument(document);
        else
            doc = new markdownDocument_1.MarkdownDocument(document, document.getText(selection));
        if (style)
            rendered = shared_1.renderPage(doc);
        else
            rendered = shared_1.renderHTML(doc);
        return rendered;
    });
}
//# sourceMappingURL=copy.js.map
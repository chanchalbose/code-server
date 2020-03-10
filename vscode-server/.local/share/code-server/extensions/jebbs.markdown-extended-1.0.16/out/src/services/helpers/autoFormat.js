"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const editTextDocument_1 = require("../common/editTextDocument");
const documentTables_1 = require("../table/documentTables");
class AutoFormatter extends vscode.Disposable {
    constructor() {
        super(() => this.dispose());
        this._disposables = [];
        this.register();
    }
    dispose() {
        this._disposables && this._disposables.length && this._disposables.map(d => d.dispose());
    }
    register() {
        //register watcher
        let lastTimestamp = new Date().getTime();
        let disposable = vscode.window.onDidChangeTextEditorSelection(e => {
            if (!e || !e.textEditor || !e.textEditor.document || !e.textEditor.document.uri)
                return;
            if (e.textEditor.document.uri.scheme == "markdown")
                return;
            lastTimestamp = new Date().getTime();
            setTimeout(() => {
                if (new Date().getTime() - lastTimestamp >= 150) {
                    this.doFormat(e.textEditor.document, e.selections);
                }
            }, 200);
        });
        this._disposables.push(disposable);
    }
    doFormat(document, changes) {
        let tables = documentTables_1.tablesOf(document);
        let edits = [];
        tables.map(t => {
            if (changes.reduce((p, c) => {
                return p || !!t.range.intersection(c);
            }, false)) {
                edits.push({
                    range: t.range,
                    replace: t.table.stringify(),
                });
            }
        });
        return editTextDocument_1.editTextDocument(document, edits);
    }
}
exports.AutoFormatter = AutoFormatter;
//# sourceMappingURL=autoFormat.js.map
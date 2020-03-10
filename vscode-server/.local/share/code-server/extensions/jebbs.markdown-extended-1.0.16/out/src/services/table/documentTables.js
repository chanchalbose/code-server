"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mdTableParse_1 = require("./mdTableParse");
function tablesOf(document) {
    let tables = [];
    for (let i = 0; i < document.lineCount; i++) {
        let t = findTable(document, i);
        if (t) {
            tables.push(t);
            i = t.range.end.line;
        }
    }
    return tables;
}
exports.tablesOf = tablesOf;
function findTable(document, pos) {
    if (pos < 0 || pos > document.lineCount - 1)
        return undefined;
    let i = 0, flag = false, start = 0, end = 0;
    for (i = pos; i < document.lineCount; i++) {
        if (document.lineAt(i).text.indexOf('|') < 0) {
            if (flag)
                break;
        }
        else {
            if (!flag) {
                flag = true;
                start = i;
            }
        }
    }
    end = i - 1;
    if (!flag)
        return undefined;
    let rang = document.lineAt(start).range.union(document.lineAt(end).range);
    let table = mdTableParse_1.parseMDTAble(document.getText(rang));
    if (table)
        return { range: rang, table: table };
    else
        return undefined;
}
//# sourceMappingURL=documentTables.js.map
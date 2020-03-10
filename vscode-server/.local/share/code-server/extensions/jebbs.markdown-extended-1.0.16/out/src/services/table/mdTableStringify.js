"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mdTable_1 = require("./mdTable");
const monospace_1 = require("./monospace");
function stringifyMDTable(table, compact, padding) {
    padding = padding || 1;
    let rows = table.data.map((row, i) => stringifyRow(row, table.columnWidths, table.aligns, table.rowMergeFlags[i], compact, padding));
    let Sep = stringifyHeaderSeperator(table, compact, padding);
    rows.splice(table.headerRowCount, 0, Sep);
    return rows.join('\n');
}
exports.stringifyMDTable = stringifyMDTable;
function stringifyHeaderSeperator(table, compact, padding) {
    let colCount = table.data[0].length;
    return [...Array(colCount).keys()].reduce((p, i) => p + formatHeaderCell(table.aligns[i], table.columnWidths[i], compact, padding) + "|", "|");
}
function stringifyRow(row, columnWidths, aligns, merged, compact, padding) {
    return row.reduce((p, c, i) => {
        let splittor = (i == row.length - 1 && merged) ? '\\' : '|';
        if (c === null)
            return p + splittor;
        // current col width
        let width = columnWidths[i];
        let idx = i + 1;
        // try to add merged cells' width
        while (row[idx] === null) {
            width += columnWidths[idx] + padding * 2;
            idx++;
        }
        return p + (compact ? c : formatCell(c, width, aligns[i], padding)) + splittor;
    }, "|");
}
function formatHeaderCell(align, columnWidth, compact, padding) {
    switch (align) {
        case mdTable_1.TableAlign.center:
            if (compact)
                return ":-:";
            return addPadding(":" + "-".repeat(columnWidth - 2) + ":", padding, padding);
        case mdTable_1.TableAlign.left:
            if (compact)
                return ":-";
            return addPadding(":" + "-".repeat(columnWidth - 1), padding, padding);
        case mdTable_1.TableAlign.right:
            if (compact)
                return "-:";
            return addPadding("-".repeat(columnWidth - 1) + ":", padding, padding);
        case mdTable_1.TableAlign.auto:
        default:
            if (compact)
                return "-";
            return addPadding("-".repeat(columnWidth), padding, padding);
    }
}
function formatCell(cell, width, align, padding) {
    let leftPadding = padding;
    let rightPadding = padding;
    switch (align) {
        case mdTable_1.TableAlign.center:
            leftPadding += ~~((width - monospace_1.MonoSpaceLength(cell)) / 2);
            rightPadding += ~~((width - monospace_1.MonoSpaceLength(cell)) / 2);
            if (leftPadding + rightPadding != width - monospace_1.MonoSpaceLength(cell) + padding * 2)
                rightPadding += 1;
            break;
        case mdTable_1.TableAlign.left:
            rightPadding += (width - monospace_1.MonoSpaceLength(cell));
            break;
        case mdTable_1.TableAlign.right:
            leftPadding += (width - monospace_1.MonoSpaceLength(cell));
            break;
        case mdTable_1.TableAlign.auto:
        default:
            rightPadding += (width - monospace_1.MonoSpaceLength(cell));
            break;
    }
    return addPadding(cell.trim(), leftPadding, rightPadding);
}
function addPadding(cell, left, right) {
    const SPACE = " ";
    return SPACE.repeat(left) + cell.trim() + SPACE.repeat(right);
}
//# sourceMappingURL=mdTableStringify.js.map
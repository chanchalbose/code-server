"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
class MetaData {
    constructor(data, uri) {
        this._uri = uri;
        this._meta = yaml.load(data) || {};
    }
    get puppeteerPDF() {
        if (!this._meta.puppeteer)
            return {};
        return this._meta.puppeteer.pdf || {};
    }
    get puppeteerImage() {
        if (!this._meta.puppeteer)
            return {};
        return this._meta.puppeteer.image || {};
    }
    get raw() {
        return this._meta || {};
    }
}
exports.MetaData = MetaData;
//# sourceMappingURL=meta.js.map
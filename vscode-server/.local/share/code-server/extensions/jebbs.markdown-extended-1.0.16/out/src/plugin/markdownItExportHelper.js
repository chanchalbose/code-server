"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const dataUri_1 = require("../services/common/dataUri");
function MarkdownItExportHelper(md) {
    md.core.ruler.push("exportHelper", exportHelperWorker);
}
exports.MarkdownItExportHelper = MarkdownItExportHelper;
function exportHelperWorker(state) {
    let env = state.env.htmlExporter;
    if (!env)
        return;
    enumTokens(state.tokens, env);
}
function enumTokens(tokens, env) {
    tokens.map(t => {
        if (t.type == "image") {
            removeVsUri(t, env);
            if (env.embedImage)
                embedImage(t, env);
        }
        if (t.children)
            enumTokens(t.children, env);
    });
}
function removeVsUri(token, env) {
    let index = 0;
    let src = "";
    for (let i = 0; i < token.attrs.length; i++) {
        if (token.attrs[i][0] == "src") {
            index = i;
            src = token.attrs[i][1];
        }
    }
    token.attrs[index][1] = decodeURIComponent(src.replace(env.vsUri, ""));
}
function embedImage(token, env) {
    let index = 0;
    let src = "";
    for (let i = 0; i < token.attrs.length; i++) {
        if (token.attrs[i][0] == "src") {
            index = i;
            src = token.attrs[i][1];
            break;
        }
    }
    token.attrs[index][1] = image2Base64(src, env);
}
function image2Base64(src, env) {
    let paths = [
        path.dirname(env.uri.fsPath),
        env.workspaceFolder.fsPath,
    ].filter(v => !!v);
    let file = searchFile(src, paths);
    if (!file)
        return src;
    return dataUri_1.fileToDataUri(file);
}
function searchFile(name, paths) {
    if (path.isAbsolute(name))
        return name;
    for (let p of paths) {
        let file = path.join(p, name);
        if (fs.existsSync(file))
            return file;
    }
    return undefined;
}
//# sourceMappingURL=markdownItExportHelper.js.map
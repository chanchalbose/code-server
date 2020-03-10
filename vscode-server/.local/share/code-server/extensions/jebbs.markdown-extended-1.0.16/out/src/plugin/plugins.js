"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdownItTOC_1 = require("./markdownItTOC");
const markdownItContainer_1 = require("./markdownItContainer");
const markdownItAnchorLink_1 = require("./markdownItAnchorLink");
const markdownItExportHelper_1 = require("./markdownItExportHelper");
const markdownItAdmonition_1 = require("./markdownItAdmonition");
const config_1 = require("../services/common/config");
let myPlugins = {
    'markdown-it-toc': markdownItTOC_1.MarkdownItTOC,
    'markdown-it-container': markdownItContainer_1.MarkdownItContainer,
    'markdown-it-admonition': markdownItAdmonition_1.MarkdownItAdmonition,
    'markdown-it-anchor': markdownItAnchorLink_1.MarkdownItAnchorLink,
    'markdown-it-helper': markdownItExportHelper_1.MarkdownItExportHelper,
};
exports.plugins = [
    $('markdown-it-toc'),
    $('markdown-it-anchor'),
    $('markdown-it-container'),
    $('markdown-it-admonition'),
    $('markdown-it-footnote'),
    $('markdown-it-abbr'),
    $('markdown-it-sup'),
    $('markdown-it-sub'),
    $('markdown-it-checkbox'),
    $('markdown-it-attrs'),
    $('markdown-it-kbd'),
    $('markdown-it-underline'),
    $('markdown-it-mark'),
    $('markdown-it-deflist'),
    $('markdown-it-emoji'),
    $('markdown-it-multimd-table', { enableMultilineRows: true, enableRowspan: true }),
    $('markdown-it-html5-embed', { html5embed: { useImageSyntax: true, useLinkSyntax: true } }),
    $('markdown-it-helper')
].filter(p => !!p);
function $(name, ...args) {
    for (let d of config_1.config.disabledPlugins) {
        if ('markdown-it-' + d == name)
            return undefined;
    }
    let plugin = myPlugins[name];
    if (!plugin)
        plugin = require(name);
    if (!plugin)
        return undefined;
    return {
        plugin: plugin,
        args: args,
    };
}
//# sourceMappingURL=plugins.js.map
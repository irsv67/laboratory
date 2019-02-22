"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ts = require("typescript");
class Parser {
    constructor() {
        this.syntaxKind = {};
        this.FILENAME = 'astExplorer.ts';
        for (const name of Object.keys(_ts.SyntaxKind).filter(x => isNaN(parseInt(x)))) {
            const value = _ts.SyntaxKind[name];
            if (!this.syntaxKind[value]) {
                this.syntaxKind[value] = name;
            }
        }
    }
    parse(ts, code, options) {
        const compilerHost /*: ts.CompilerHost*/ = {
            fileExists: () => true,
            getCanonicalFileName: filename => filename,
            getCurrentDirectory: () => '',
            getDefaultLibFileName: () => 'lib.d.ts',
            getNewLine: () => '\n',
            getSourceFile: filename => {
                return ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true);
            },
            readFile: () => null,
            useCaseSensitiveFileNames: () => true,
            writeFile: () => null,
        };
        const filename = this.FILENAME + (options.jsx ? 'x' : '');
        const program = ts.createProgram([filename], {
            noResolve: true,
            target: ts.ScriptTarget.Latest,
            experimentalDecorators: options.experimentalDecorators,
            experimentalAsyncFunctions: options.experimentalAsyncFunctions,
            jsx: options.jsx ? 'preserve' : undefined,
        }, compilerHost);
        const sourceFile = program.getSourceFile(filename);
        this.getComments = (node, isTrailing) => {
            if (node.parent) {
                const nodePos = isTrailing ? node.end : node.pos;
                const parentPos = isTrailing ? node.parent.end : node.parent.pos;
                if (node.parent.kind === ts.SyntaxKind.SourceFile || nodePos !== parentPos) {
                    let comments = isTrailing ?
                        ts.getTrailingCommentRanges(sourceFile.text, nodePos) :
                        ts.getLeadingCommentRanges(sourceFile.text, nodePos);
                    if (Array.isArray(comments)) {
                        comments.forEach((comment) => {
                            comment.type = this.syntaxKind[comment.kind];
                            comment.text = sourceFile.text.substring(comment.pos, comment.end);
                        });
                        return comments;
                    }
                }
            }
        };
        return sourceFile;
    }
    init() {
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map
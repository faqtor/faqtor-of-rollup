const { roll } = require("../dist/index");
const { cmd, seq } = require("faqtor");
const typescript = require("rollup-plugin-typescript2");
const resolve = require("rollup-plugin-node-resolve");

const input = "./test.ts";
const output = "./test.js";

const options = {
    input,
    output: {
      file: output,
      format: 'iife'
    },
    plugins: [
        typescript({
            typescript: require('typescript'),
            tsconfig: "../tsconfig.json",
            tsconfigOverride: {
                include: [
                    "./**/*.ts"
                ],            
            }
        }),
        resolve(),
    ]
}

const build = roll(options).factor(input, output);
const run = cmd(`node ${output}`).factor(output);
const clean = cmd(`rimraf ${output} ./test`).factor(output);

module.exports = {
    build,
    run,
    clean,
    all: seq(build, run, clean)
}
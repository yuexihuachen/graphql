require("@babel/register")({
    extensions: ['.tsx', '.ts', '.js'],
    babelrc: true,
    presets:  ["@babel/preset-env"]
})

module.exports = require("./app")
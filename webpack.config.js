const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        alerts: path.resolve('src/alerts/alerts.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background/background.ts'),
        content: path.resolve('src/content/content.ts')
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader','css-loader'],
                test: /\.css$/i,
            },
            {
                type: 'asset/resource',
                test: /\.(jpg|jpeg|png|svg)$/,
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist')
                }
            ]
        }),
        ...getHTMLPlugins([
            'alerts',
            'options'
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}

function getHTMLPlugins(chunks){
    return chunks.map(chunk => new HtmlPlugin({
        title: 'Pomoroo',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}
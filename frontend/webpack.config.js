var Encore = require('@symfony/webpack-encore');

Encore
    // the directory where compiled assets will be stored
    .setOutputPath('../public/build')

    // public path used by the web server to access the output path
    .setPublicPath('/build')

    // only needed for CDN's or sub-directory deploy
    // .setManifestKeyPrefix('build/')

    // Copy some static images to your -> https://symfony.com/doc/current/frontend/encore/copy-files.html

    /*
    .copyFiles({
        from: './src/images',
        // Optional target path, relative to the output dir
        to: 'images/[path][name].[ext]',
        includeSubdirectories: false,
        // if versioning is enabled, add the file hash too
        to: 'images/[path][name].[hash:8].[ext]',
        // only copy files matching this pattern
        pattern: /\.(png|jpg|jpeg)$/
    })
    */

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry('main', './assets/main/main.js')
    .addEntry('portfolio', './assets/portfolio/portfolio.js')

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())

    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // uncomment if you use TypeScript -> https://symfony.com/doc/current/frontend/encore/typescript.html
    // .enableTypeScriptLoader()

    // uncomment if you are using Sass/SCSS files -> https://symfony.com/doc/current/frontend/encore/css-preprocessors.html
    .enableSassLoader()

    // uncomment if you're having problems with a jQuery plugin -> https://symfony.com/doc/current/frontend/encore/legacy-applications.html
    // .autoProvidejQuery()

    // uncomment if you use the postcss -> https://symfony.com/doc/current/frontend/encore/postcss.html
    // .enablePostCssLoader()


    // uncomment if you want to use vue -> https://symfony.com/doc/current/frontend/encore/vuejs.html
    // .enableVueLoader()

    // uncomment if you´re want to lint your sources
    // .enableEslintLoader()

    // uncomment if you´re want to have integrity hashes for your script tags, the extension takes care of it
    // .enableIntegrityHashes()

    // uncomment if you´re want to share general code for the different entries -> https://symfony.com/doc/current/frontend/encore/split-chunks.html
    // .splitEntryChunks()
    ;

// Uncomment if you are going to use a CDN -> https://symfony.com/doc/current/frontend/encore/cdn.html
// if (Encore.isProduction()) {
    //Encore.setPublicPath('https://my-cool-app.com.global.prod.fastly.net');

    // guarantee that the keys in manifest.json are *still*
    // prefixed with build/
    // (e.g. "build/dashboard.js": "https://my-cool-app.com.global.prod.fastly.net/dashboard.js")
    // Encore.setManifestKeyPrefix('build/');
// }

module.exports = Encore.getWebpackConfig();

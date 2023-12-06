import browserSync from "browser-sync";


const bs = browserSync.create();

// .init starts the server
bs.init({
    server: "./src"
});

// Now call methods on bs instead of the
// main browserSync module export
bs.reload("*.{html,js}");
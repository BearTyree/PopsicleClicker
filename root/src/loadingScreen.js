console.log('loading screen');

setTimeout(() => {
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "loader" */
    './loader'
  ).then((loader) => {
    loader.startLoader();
  });
}, 3000);

import path from 'path';

export default {
  // Server port address
  PORT: process.env.SERVER_PORT || 3000,

  /*
   * Specifiy here the source folder of all static asset files.
   * By default it is set to 'src/static' folder.
   */
  STATIC_SOURCE_DIR: path.join(__dirname, 'src', 'static'),

  /*
   * Specify here the base url for serving the static asset files.
   * By default it is set to '/public'
   */
  STATIC_BASE_URL: '/public'
};

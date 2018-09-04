module.exports = {
  /** Name of the mongoDb collection */
  collection: process.env.DB_NAME,

  /** Database host name */
  host: process.env.DB_HOST || "localhost",

  /** Database port */
  port: process.env.DB_PORT || 27017,
};

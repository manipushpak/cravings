"use strict";
var cfg = {};
// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;
cfg.projectId = process.env.GOOGLE_CLOUD_PROJECT;
// Export configuration object
module.exports = cfg;

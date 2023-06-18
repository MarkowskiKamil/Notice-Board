const fs = require("fs");

const noticeBoardMiddleware = (req, res, next) => {
  if (process.argv.includes("debug")) {
    const logData = `${new Date().toISOString()} | Method: ${req.method} | URL: ${req.url}\n`;
    fs.appendFile("requests.log", logData, (error) => {
      if (error) console.error("Error writing to log file:", error);
    });
  }
  next();
};

module.exports = noticeBoardMiddleware;
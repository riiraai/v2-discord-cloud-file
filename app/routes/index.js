const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  const getUrl = req.protocol + "://" + req.get("host");
  res.render("index", { base_url : getUrl+"/api/upload", response_data: null, raw_file: null });
});

module.exports = router;

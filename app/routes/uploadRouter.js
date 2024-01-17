const fs = require("node:fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const convertBytesToData = require("../utils/convertBytesToData");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./app/public/storage/files");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s/g, ""));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {

  const url_webhook = process.env.WEBHOOK_URL;
  try {
    if (!req.file) {
      res.status(400).json({
        code: 400,
        success: false,
        message: "Please upload a file.",
      });
    }

    const pathImg = req.file.originalname.replace(/\s/g, "");
    const getUserAgent = req.headers["user-agent"];
    const getHost = req.headers["host"];

    const data = new FormData();
    const owner = `<@${process.env.OWNER}>`
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Information File Uploaded",
      description: `Heyooo ${owner} !\n User Agent : **${getUserAgent}** \n Host : **${getHost}**`,
      fields: [
        {
          name: "File Name",
          value: req.file.originalname,
        },
        {
          name: "File Path",
          value: req.file.path,
        },
        {
          name: "File Size",
          value: convertBytesToData(req.file.size),
          inline: true,
        },
        {
          name: "File Type",
          value: req.file.mimetype,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
    };

    data.append(
      "file",
      fs.createReadStream("./app/public/storage/files/" + pathImg)
    );
    data.append(
      "payload_json",
      JSON.stringify({
        embeds: [exampleEmbed],
      })
    );

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url_webhook,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        return res.status(200).json({
          code: 200,
          success: true,
          message: "File uploaded successfully.",
          response: response.data.attachments,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.error(err.message, err);

    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
});

router.post("/upload-result", upload.single("file"), async (req, res) => {
  const url_webhook = process.env.WEBHOOK_URL;
  try {
    if (!req.file) {
      res.status(400).json({
        code: 400,
        success: false,
        message: "Please upload a file.",
      });
    }

    const pathImg = req.file.originalname.replace(/\s/g, "");
    const getUserAgent = req.headers["user-agent"];
    const getHost = req.headers["host"];

    const data = new FormData();
    const owner = `<@${process.env.OWNER}>`
    const exampleEmbed = {
      color: 0x0099ff,
      title: "Information File Uploaded",
      description: `Heyooo ${owner} !\n User Agent : **${getUserAgent}** \n Host : **${getHost}**`,
      fields: [
        {
          name: "File Name",
          value: req.file.originalname,
        },
        {
          name: "File Path",
          value: req.file.path,
        },
        {
          name: "File Size",
          value: convertBytesToData(req.file.size),
          inline: true,
        },
        {
          name: "File Type",
          value: req.file.mimetype,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
    };

    data.append(
      "file",
      fs.createReadStream("./app/public/storage/files/" + pathImg)
    );
    data.append(
      "payload_json",
      JSON.stringify({
        embeds: [exampleEmbed],
      })
    );

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url_webhook,
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // return res.status(200).json({
        //   code: 200,
        //   success: true,
        //   message: "File uploaded successfully.",
        //   data: req.file,
        //   response: response.data,
        // });
        return res.render("index", { base_url : getHost+"/api/upload", raw_file: req.file, response_data: JSON.stringify(response.data.attachments, null, 2) });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.error(err.message, err);

    return res.status(500).json({
      message: err.message,
      error: err,
    });
  }
});

module.exports = router;

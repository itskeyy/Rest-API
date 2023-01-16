const express = require("express");
const router = express.Router();
const dataMahasiswas = require("../services/mahasiswa_service");

/* GET Data Mahasiswa. */
router.get("/", async function (req, res, next) {
  try {
    // res.json(await dataMahasiswas.getMultiple(req.query.page));
    if (req.query.npm != undefined) {
      res.header("Content-Type", "application/json");
      res.send(
        JSON.stringify(await dataMahasiswas.getDataById(req.query.npm), null, 4)
      );
    } else {
      res.header("Content-Type", "application/json");
      res.send(
        JSON.stringify(
          await dataMahasiswas.getMultiple(req.query.page),
          null,
          4
        )
      );
    }
  } catch (err) {
    console.error(`Error: gagal saat mengambil data mahasiswa `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await dataMahasiswas.create(req.body));
  } catch (err) {
    console.error(`Error: saat membuat data mahasiswa`, err.message);
    next(err);
  }
});

module.exports = router;

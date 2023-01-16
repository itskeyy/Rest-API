const express = require("express");
const app = express();
const port = 3000;
const dataMahasiswasRouter = require("./routes/mahasiswa_route");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify({ message: "REST API Data Mahasiswa" }));
});
app.use("/mahasiswa", dataMahasiswasRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`REST API Mahasiswa listening at http://localhost:${port}`);
});

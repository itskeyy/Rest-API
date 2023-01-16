const db = require("./db_connection");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT npm, nama_mahasiswa, jurusan, kelas 
    FROM mahasiswas LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getDataById(npm) {
  const rows = await db.query(
    `SELECT npm, nama_mahasiswa, jurusan, kelas 
      FROM mahasiswas WHERE npm=${npm}`
  );
  const rows2 = await db.query(
    `SELECT mata_kuliah.mata_kuliah, nilai.nilai_uts,nilai.nilai_uas, nilai.nilai_kuis, nilai.nilai_tugas FROM mahasiswas INNER JOIN nilai ON mahasiswas.id=nilai.id_mahasiswa INNER JOIN mata_kuliah ON mata_kuliah.id=nilai.id_mata_kuliah WHERE npm=${npm}`
  );
  const data = helper.emptyOrRows(rows);
  const nilai = helper.emptyOrRows(rows2);

  return {
    data,
    nilai,
  };
}

async function create(dataMahasiswa) {
  const result = await db.query(
    `INSERT INTO mahasiswas (npm,nama_mahasiswa,jurusan,kelas) VALUES (${dataMahasiswa.npm},${dataMahasiswa.nama_mahasiswa},${dataMahasiswa.jurusan},${dataMahasiswa.kelas});`
  );

  let message = "Error in creating data mahasiswa";

  if (result.affectedRows) {
    message = "Data Mahasiswa created successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  getDataById,
  create,
};

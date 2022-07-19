const notes = require('./notes');
const { nanoid } = require('nanoid');

// # Handler Untuk Menambahkan Data Catatan
const addNoteHandler = (request, h) => {

    // Mendapatkan body request di Hapi
    // Body yang diambil title, tags, dan body
    const {title, tags, body} = request.payload;

    // Generate ID (Using NanoID Library)
    const id = nanoid(16);

    // Tambahkan createdAt dan updatedAt
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // Simpan properti kedalam array notes
    const newNote = {
        id, title, tags, body, createdAt, updatedAt
    }
    notes.push(newNote);

    // Untuk mengetahui apakah variable newNote sudah masuk ke notes[]
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    // Cek Response:
    // 1. Jika isSuccess == true (berhasil)
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    } 
    // 2. Jika isSuccess == false (gagal)
    else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal ditambahkan',
        });
        response.code(500);
        return response;
    }

};

// # Handler Untuk Menampilkan Seluruh Catatan
const getAllNotesHandler = () => ({

    status: 'success',
    data: {
        notes,
    },

});

// # Handler Untuk Menampilkan Detail Catatan
const getNoteByIdHandler = (request, h) => {

    // dapatkan id dari properti request.params
    const { id } = request.params;

    // cari id yang dicari menggunakan array filter
    const note = notes.filter((n) => n.id === id)[0];

    // Kondisi jika note != undefined
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    }
    // Kondisi jika data tidak ada 
    else {
        const response = h.response({
            status: 'fail',
            message: `Catatan dengan ${note.id} tidak ditemukan`,
        });
        response.code(404); // 404 (Not Found / Tidak Ditemukan)
        return response;
    }

}

// # Handler Untuk Mengubah Data Note 
const editNoteByIdHandler = (request, h) => {

    // Dapatkan id dari properti request.params
    const { id } = request.params;

    // Mendapatkan data notes terbaru
    // Melalui body request menggunakan static property "request.payload"
    const { title, tags, body } = request.payload;

    // Update data updateAt
    const updateAt = new Date().toISOString();

    // Dapatkan id didalam array
    const index = notes.findIndex((note) => note.id === id);

    // Jika data didalam array notes ditemukan (tidak bernilai -1)
    if (index !== -1) {
        // Update data objek didalam array
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };

        // response bila berhasil update data
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbaharui',
        });
        response.code(200);
        return response;
    } 
    // Jika data id didalam array notes tidak ditemukan (-1)
    else {
        const response = h.response({
            status: 'fail', 
            message: 'Gagal memperbarui catatan. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

};

// # Handler Untuk Menghapus Catatan
const deleteNoteByIdHandler = (request, h) => {

    // Dapatkan id menggunakan properties request.params
    const { id } = request.params;

    // Dapatkan index dari id yang didapat
    const index = notes.findIndex((note) => note.id === id);

    // Pengecekan index
    // Jika index != -1 (undefined)
    if (index !== undefined) {
        // hapus data array notes 
        notes.splice(index, 1);

        // response bila berhasil hapus data 
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
    } 
    // Bila nilai index = -1
    else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal dihapus, Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
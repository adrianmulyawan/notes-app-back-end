const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

const routes = [
    // Menambahkan Data Catatan Baru
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    // Menampilkan Seluruh Catatan
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    // Menampilkan Detail Catatan
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    // Mengedit Catatan
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    // Menghapus Catatan
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
];

module.exports = routes;
import http from "../http-common";



class NotesDataService {
  getAll() {
    return http.get("/notes");
  }

  get(id) {
    return http.get(`/notes/${id}`);
  }

  create(data) {
    var temp = http.post("/notes", data);
    console.log(temp)
    return temp;
  }

  update(id, data) {
    return http.put(`/notes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/notes/${id}`);
  }

  deleteAll() {
    return http.delete(`/notes`);
  }

  findByTitle(title) {
    return http.get(`/notes?title=${title}`);
  }
}

export default new NotesDataService();
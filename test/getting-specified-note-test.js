// Getting Specified Note Test

// 1.Pastikan response memiliki status code 200.
pm.test("Pastikan response memiliki status code 200", () => {
  pm.response.to.have.status(200);
});

// 2.Pastikan header response Content-Type memiliki nilai application/json value
pm.test(
  "response Content-Type header should have application/json value",
  () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.equals(
      "application/json; charset=utf-8"
    );
  }
);

// 3.Pastikan body response merupakan object.
pm.test("response body should be an object", () => {
  const responseJson = pm.response.json();
  pm.expect(responseJson).to.be.an("object");
});

// 4.Pastikan body response memiliki properti dan nilai atau tipe data yang sesuai.
pm.test("response body should have the correct property and value", () => {
  const responseJson = pm.response.json();

  pm.expect(responseJson).to.have.ownProperty("status");
  pm.expect(responseJson.status).to.equals("success");

  pm.expect(responseJson).to.have.ownProperty("data");
  pm.expect(responseJson.data).to.be.an("object");
});

// 5.Pastikan data pada response body memiliki properti note yang merupakan sebuah objek.
pm.test("response body data should contain note object", () => {
  const responseJson = pm.response.json();
  const { data } = responseJson;

  pm.expect(data).to.have.ownProperty("note");
  pm.expect(data.note).to.be.an("object");
});

// 6.Pastikan objek note di dalam data memiliki properti id, title, body, dan tags dengan nilai yang sesuai.
pm.test(
  "note object should contain correct value for id, title, body, and tags property",
  () => {
    const responseJson = pm.response.json();
    const {
      data: { note },
    } = responseJson;

    const expectedId = pm.environment.get("noteId");
    const expectedTitle = "Catatan A";
    const expectedTags = ["Android", "Web"];
    const expectedBody = "Isi dari catatan A";

    pm.expect(note).to.have.ownProperty("id");
    pm.expect(note.id).to.equals(expectedId);

    pm.expect(note).to.have.ownProperty("title");
    pm.expect(note.title).to.equals(expectedTitle);

    pm.expect(note).to.have.ownProperty("tags");
    pm.expect(note.tags).to.eql(expectedTags);

    pm.expect(note).to.have.ownProperty("body");
    pm.expect(note.body).to.equals(expectedBody);
  }
);

// Skenario 1: Adding Notes
// 1.Pastikan response memiliki status code 201.
// 2.Pastikan header response Content-Type memiliki nilai application/json.
// 3.Pastikan body response adalah object.
// 4.Pastikan body response memiliki properti dan nilai yang sesuai.
// 5.Pastikan data pada response body memiliki noteId dan nilainya tidak kosong.

// 1.Pastikan response memiliki status code 201.
pm.test("response status code should have 201 value", () => {
  pm.response.to.have.status(201);
});

// 2.Pastikan header response Content-Type memiliki nilai application/json.
pm.test(
  "response Content-Type header should have application/json value",
  () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.equals(
      "application/json"
    );
  }
);

// 3.Pastikan body response adalah object.
pm.test("response body should an object", () => {
  const responseJson = pm.response.json();
  pm.expect(responseJson).to.be.an("object");
});

// 4.Pastikan body response memiliki properti dan nilai yang sesuai.
pm.test("response body should have correct property and value", () => {
  const responseJson = pm.response.json();

  pm.expect(responseJson).to.ownProperty("status");
  pm.expect(responseJson.status).to.equals("success");

  pm.expect(responseJson).to.ownProperty("message");
  pm.expect(responseJson.message).to.equals("Catatan berhasil ditambahkan");

  pm.expect(responseJson).to.ownProperty("data");
  pm.expect(responseJson.data).to.be.an("object");
});

// 5.Pastikan data pada response body memiliki noteId dan nilainya tidak kosong.
pm.test(
  "response body data should have noteId property and not equal to empty",
  () => {
    const responseJson = pm.response.json();
    const { data } = responseJson;

    pm.expect(data).to.ownProperty("noteId");
    pm.expect(data.noteId).to.not.equals("");

    pm.environment.set("noteId", data.noteId);
  }
);

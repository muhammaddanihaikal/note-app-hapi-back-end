// Skenario Getting All Notes

// 1.Pastikan response memiliki status code 200.
pm.test("response status code should have 200 value", () => {
  pm.response.to.have.status(200);
});

// 2.Pastikan header response Content-Type memiliki nilai application/json.
pm.test(
  "response Content-Type header should have application/json value",
  () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.equals(
      "application/json; charset=utf-8"
    );
  }
);

// 3.Pastikan body response adalah object.
pm.test("response body should an object", () => {
  const responseJson = pm.response.json();

  pm.expect(responseJson).to.be.an("object");
});

// 4.Pastikan body response memiliki properti dan nilai atau tipe data yang sesuai.
pm.test("response body should have the correct property and value", () => {
  const responseJson = pm.response.json();

  pm.expect(responseJson).to.ownProperty("status");
  pm.expect(responseJson.status).to.equals("success");

  pm.expect(responseJson).to.ownProperty("data");
  pm.expect(responseJson.data).to.be.an("object");
});

// 5.Pastikan data pada response body memiliki array notes dan terdapat minimal 1 item di dalamnya.
pm.test(
  "response body data should have a notes array and contain at least 1 item",
  () => {
    const responseJson = pm.response.json();
    const { data } = responseJson;

    pm.expect(data).to.have.ownProperty("notes");
    pm.expect(data.notes).to.be.an("array");
    pm.expect(data.notes).lengthOf.at.least(1);
  }
);

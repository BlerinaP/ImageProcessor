import path from "path";
import supertest from "supertest";
import app from "../Routes/index";

const port = 3001;
process.env.IMAGE_DIRECTORY = path.resolve(__dirname, "../../images");

const request = supertest(app);
const file = "santamonica";
const width = "900";
const height = "900";
// const imageDimensions = file.split(".")[0] + `-${width}x${height}.jpg`;
// const thumb = path.join(
//   process.env.IMAGE_DIRECTORY as string,
//   "thumbnails",
//   file
// );
// const thumbDimensions = path.join(
//   process.env.IMAGE_DIRECTORY as string,
//   "thumbnails",
//   imageDimensions
// );

describe("api", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get(
      `/api/images/?name=${file}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200);
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

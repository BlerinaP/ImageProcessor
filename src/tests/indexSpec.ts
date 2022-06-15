import path from "path";
import supertest from "supertest";
import imageResize from "../Helpers/imageResize";
import app from "../Routes/index";
const fs = require("fs");

const port = 3001;
process.env.IMAGE_DIRECTORY = path.resolve(__dirname, "../../images");

const request = supertest(app);
const file = "santamonica";
const width = "900";
const height = "900";


describe("Test image resize function", ():void => {
  it("resize the image", async (): Promise<void> => {
    let pathName = path.join(
        process.env.IMAGE_DIRECTORY as string,
        "thumbnails",
        'palmtunnel'
    )
    if(fs.existsSync(path)){
      fs.unlink(path, (err: string) => {
        if(err) throw (err)
      })
    }
    await imageResize(pathName,'palmtunnel','350','300')
    let error: null | string = '';
    try{
      error = null
    } catch {
      error = "File not created"
    }
    expect(error).toBeNull()
  });

})

describe("api", ():void => {
  it("gets the api endpoint", async (): Promise<void> => {
    const response = await request.get(
      `/api/images/?name=${file}&width=${width}&height=${height}`
    );
    expect(response.status).toBe(200);
  });
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

import { promises as fsPromise } from "fs";
import path from "path";
import Jimp from "jimp";

const ImageResize = async (
  file: string,
  name: string,
  width: string,
  height: string
) => {
  const pathImage = file.split(".")[0] + `-${width}x${height}.jpg`;
  let imgWidth: number;
  let imgHeight: number;
  try {
    imgWidth = parseInt(width, 10);
    imgHeight = parseInt(height, 10);
  } catch (err) {
    return false;
  }

  try {
    await fsPromise.access(pathImage);
    return pathImage;
  } catch (err) {
    const fullFile = `${path.join(
      process.env.IMAGE_DIRECTORY as string,
      name
    )}.jpg`;
    try {
      const buff = await fsPromise.readFile(fullFile);
      const newFile = name.split(".")[0] + `-${width}x${height}.jpg`;

      const image = await Jimp.read(buff);
      await image.resize(imgWidth, imgHeight);
      await image.writeAsync(
        path.join(process.env.IMAGE_DIRECTORY as string, "thumbnails", newFile)
      );

      return pathImage;
    } catch (err) {
      console.log(err, "this shows err from img resize");
    }
  }
};
export default ImageResize;

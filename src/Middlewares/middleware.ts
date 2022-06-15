import { NextFunction, Request, Response } from "express";
import path from "path";
import ImageResize from "../Helpers/imageResize";

const ProcessImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<false | string | undefined> => {
  const { name, width, height } = req.query;

  if (!(name && width && height)) {
    res.send("You need to add name, width and height to process image");
    return false;
  }

  const imagePath = path.join(
    process.env.IMAGE_DIRECTORY as string,
    "thumbnails",
    name as string
  );

  const file = await ImageResize(
    imagePath,
    name as string,
    width as string,
    height as string
  );

  if (!file) {
    res.send("Error on resizing image");
    return false;
  }

  if (file) {
    res.sendFile(file as string, (err) => {
      if (err) {
        res.send("Error processing img");
      } else {
        next();
      }
    });
  }
};

export default ProcessImage;

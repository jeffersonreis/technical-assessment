const lineReader = require("line-reader");
import axios from "axios";
const fs = require("fs");

// url to validate the images
const urlPath = "http://localhost:3000";

export async function verifyImage(image: String): Promise<boolean> {
  try {
    let link = urlPath + "/images/" + image;
    await axios.get(link);
    return true; // status 200
  } catch (e) {
    return false; // others status
  }
}

function writeFile(list: any): void {
  interface IObject {
    userId: string;
    images: Array<string>;
  }

  // function to convert object to string for write file
  function objToString(obj: IObject) {
    return `{"userId":"${obj.userId}, "images":[${obj.images.map((img) => `"${img}"`)}]}\n`;
  }

  var fileOut = fs.createWriteStream("output-dump");
  JSON.stringify(list);
  list.forEach((value) => fileOut.write(objToString(value))); // write line by line
  fileOut.end();
  console.log("Finished file!");
}

function filterDump(inputDump: String): void {
  var finalUserArray = []; // final array with users and their images
  console.log("Start");

  // return position of user in finalUserArray
  function positionArray(userId: String): any {
    for (let i = 0; i < finalUserArray.length; i++) {
      if (finalUserArray[i].userId === userId) {
        if (finalUserArray[i].images?.length < 3) {
          return i; // current position if imagens < 3
        } else {
          return -1; // if images == 3
        }
      }
    }
    return null; // if did not find the user
  }

  // read line by line from file
  try {
    lineReader.eachLine(inputDump, function (line, last) {
      let objInput = JSON.parse(line);
      let positionUserArray = positionArray(objInput.userId);

      // if there is space for the image
      if (positionUserArray !== -1) {
        let imageStatus = verifyImage(objInput.image.split("/").slice(-1)[0]); // verify status 200 of image
        if (imageStatus) {
          if (positionUserArray !== null) {
            finalUserArray[positionUserArray].images.push(objInput.image); // add to user images
          } else {
            finalUserArray.push({ userId: objInput.userId, images: [objInput.image] }); // create new user and images
          }
        }
      }

      // finish the file and call the function
      if (last) writeFile(finalUserArray);
    });
  } catch (e) {
    console.log(e);
  }
}

// input file
filterDump("input-dump");

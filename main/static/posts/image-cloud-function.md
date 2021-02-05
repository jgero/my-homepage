---
title: Firebase image resizing cloud function
description: How I created a image resizing cloud function to create thumbnails and a uniform image format on user uploads.
pubdate: 2021-01-24T15:30:55.516Z
---

# Firebase image resizing cloud function

In a Firebase project of mine users have the option to upload images they take. This would result in a set of images that are very different from each other regarding size, format and quality. This is not optimal because coming up with layouts for images with unknown aspect ratios is annoying.

So I looked at the cloud function and storage docs how to do such a function and came up with following:

```typescript
export const cropImage = functions
  .region("europe-west1")
  .storage.object()
  .onFinalize(async (object) => {
    // ...
    await spawn("convert", [
      tempFilePath,
      "-resize",
      "800x550^",
      "-gravity",
      "center",
      "-extent",
      "800x550",
      tempFilePath,
    ]);
    // ...
  });
```

This function spawns a new process and calls the image magick command line tool which is already installed on the default cloud function runner to crop the images. Even though I used this function for a while I wasn't really happy with it. Just cropping the image like this can still result in pretty large images because the format of the image is kept. Especially on the overview pages this is a problem, because on mobile connections it can take between 5 and 10 seconds until you can see something. Additionally it is not necessary to fetch a 1mb image to display it in a thumbnail size.

To speed up loading times I changed the function to store the image in different sizes and the webp format for faster data transfer.

```typescript
// ...
for (const target of targetSizes) {
  const imgName = getFilenameForTarget(target, fileName);
  // add random id to end of filename to avoid weird file overwrite bug
  const imgPathFunction = join(
    workingDir,
    imgName + "_" + Math.random().toString(36).substr(2, 9)
  );
  const imgPathBucket = join(target.dir, imgName);

  // resize source image
  await sharp(tmpFilePath)
    .resize(target.width, target.height)
    .webp({ quality: target.quality })
    .toFile(imgPathFunction);

  // Upload to storage
  // ...
}
// ...
```

Spawning processes and using a command line tool felt very bad to use so I switched to sharp to convert images. I created a config with the target sizes, qualities and storage directory, which is importet in the function. Then i loop over it and create the new images and upload them to the buckets they belong to. This worked immediately... for the first one or two function invocations...

The problem I encountered was, that after a few invocations after fresh deployment of the function it converted the image of the previous invocation. This was especially weird because all the temporary files I created in the function were in the `tmp` directory and I even explicitly deleted them all before terminating the function. On the search for the possible error I checked my cleanup in the end of the function and so many other things until I saw no other way than to contact firebase support. I did this because I spent so much time reviewing my code that I was sure it was not a stupid mistake.

Firebase support responded after not even an entire business day and because I provided the link to the code in my public GitHub repository he was able to reproduce it immediately. He encountered the error as well and was confused about it just like me. We checked if the correct image was downloaded from the storage location that triggered the function and after a while we figured out it had something to do with how Firebase reuses function instances when the function is invoked multiple times at once. This means somehow the output of the sharp call was overwritten or not updated. Like you can see in the code snippet above the solution to that was to give the temporary files a unique name with the random numbers at the end of the filename.

This feels more like a workaround than a solution to the problem because I still don't really understand what the problem is there, but it works and I'm fine with that. I also am very thankful for the quick and helpful responses from the Firebase support team!

## Convert already existing images and save them in the new location

The next thing I had to deal with was, that users already had uploaded some images with the old function. Already existing files would just stay as they are and brake in the frontend when I start moving to the new image paths in the requests. The plan was to convert the old images as well, but because it were over 150 already doing it manually was no option.

```typescript
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { tmpdir } from "os";
import { join } from "path";

import * as fs from "fs-extra";

const runtimeOpts = {
  timeoutSeconds: 300,
};

export const imageRefactoring = functions
  .runWith(runtimeOpts)
  .region("europe-west1")
  .pubsub.schedule("0 2 * * *")
  .timeZone("Europe/Berlin")
  .onRun(async (_) => {
    // default storage bucket
    const bucket = admin.storage().bucket();
    // get all images
    const images = await admin.firestore().collection("images").get();
    console.log(`refactoring ${images.size} images`);
    // create workdir and wait for it
    const workingDir = join(tmpdir(), "images");
    await fs.ensureDir(workingDir);
    // put all files in the same temp file
    const tmpFilePath = join(workingDir, "source");

    // move all the images by downloading and reuploading
    const ids: string[] = [];
    images.forEach((img) => ids.push(img.id));
    for (let i = 0; i < ids.length; i++) {
      try {
        // download source image
        console.log(`downloading ${ids[i]}`);
        const destinationFilePath = join("tmp", ids[i]);
        const file = bucket.file(join("uploads", `${ids[i]}_cropped`));
        const [metadata] = await file.getMetadata();
        await file.download({ destination: tmpFilePath });
        // upload it again in the tmp dir
        console.log(`uploading ${ids[i]}`);
        await bucket.upload(tmpFilePath, {
          destination: destinationFilePath,
          metadata: { contentType: metadata.contentType },
        });
        console.log(`${ids[i]} done.`);
      } catch (e) {
        console.log(`${ids[i]} failed. error: ${JSON.stringify(e)}`);
      }
    }

    // cleanup remove the tmp/images from the filesystem
    return fs.remove(workingDir);
  });
```

With this temporary scheduled function I requested all the image Ids from some firestore documents, downloaded each image and uploaded again in the correct directory, so it would trigger the new conversion function. After I migrated all the images to the new locations I swapped the request and upload paths in the frontend and the swich was done.

Now the overview pages load instantly even on mobile connections and higher quality images are still available when needed.

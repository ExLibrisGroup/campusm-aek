import React, { useCallback, useState } from "react";
import { has } from "lodash";
import { ImagePicker } from "@ombiel/aek-lib";
import {
  BannerHeader,
  BasicSegment,
  Button,
  Container,
  VBox,
} from "@ombiel/cm-lib";

export function ImagePickerExample() {
  const [imageData, setImageData] = useState(null);
  const [image, setImage] = useState(null);

  const onClick = useCallback(() => {
    const imagePicker = new ImagePicker({
      width: 200,
      height: 300,
      format: "jpg",
      quality: 50,
      camera: "front",
      save: "yes",
      sizing: "cover",
      overlay: "http://myimage.com/silhouette.png",
    });

    imagePicker.on("complete", (data) => {
      const img = new Image();
      img.src = `data:image/${data.format};base64,${data.imageData}`;

      setImage(img);
      setImageData(data);
    });

    imagePicker.on("error", (message, details) => {
      console.error(message, details);
    });

    imagePicker.on("cancel", () => {
      console.warning("You must choose an image");
    });
  }, []);

  const buttonLabel = has(imageData, "meta.filename")
    ? imageData.meta.filename
    : null;

  let imageContent = null;
  if (has(imageData, "imageData") && imageData.imageData) {
    imageContent = <img src={image.src} alt="selected" />;
  }

  return (
    <Container>
      <VBox>
        <BannerHeader
          level={2}
          style={{
            backgroundColor: "#286DC0",
            color: "#ffffff",
            paddingLeft: 0,
            paddingRight: 0,
          }}
          key="header"
        >
          Image Picker
        </BannerHeader>

        <BasicSegment style={{ paddingLeft: "1.5em", paddingRight: "1.5em" }}>
          <p> Select an image. </p>
          <Button onClick={onClick} icon="photo" fluid>
            {buttonLabel}
          </Button>

          <div style={{ textAlign: "center" }}>{imageContent}</div>
        </BasicSegment>
      </VBox>
    </Container>
  );
}

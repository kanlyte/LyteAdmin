import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Alert as MuiAlert, Slide, Button, Snackbar } from "@mui/material";
import FormsApi from "./api";

export default ({ product, confirming }) => {
  const nav = useNavigate();
  const fileInput = useRef();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [images_sent, set_images_sent] = useState(false);
  const [mui, setMui] = useState({
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarStatus: "info",
    snackBarPosition: { vertical: "top", horizontal: "right" },
  });

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    setMui({
      ...mui,
      snackBarMessage: `Uploading Images....`,
      snackBarStatus: "info",
      snackBarOpen: true,
    });
    const promises = [];
    images.map((image) => {
      //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
      const storageRef = ref(storage, `/images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
            setUrls((prevState) => [...prevState, urls]);
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        // alert("All images uploaded");
      })
      .catch((err) => console.log(err));
  };

  useEffect(async () => {
    if (urls.length === images.length && urls.length !== 0) {
      let res = await new FormsApi().put(`/product/edit/${product}`, {
        product_images: urls,
      });
      if (res !== "Error") {
        if (res.status === true) {
          setMui({
            ...mui,
            snackBarMessage: "Product Images Added.....",
            snackBarStatus: "success",
            snackBarOpen: true,
          });
          if (confirming) {
            window.location.reload();
          } else {
            setTimeout(() => {
              nav("/products");
            }, 3000);
          }
        } else {
          setMui({
            ...mui,
            snackBarMessage: "Some Error Occurred, Try again later...",
            snackBarStatus: "error",
            snackBarOpen: true,
          });
        }
      } else {
        setMui({
          ...mui,
          snackBarMessage: "Unable to Reach Server, Try again later...",
          snackBarStatus: "error",
          snackBarOpen: true,
        });
      }
    }
  }, [urls]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  /**
   *
   * Method below handles closing of the MUI alert
   */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMui({
      ...mui,
      snackBarMessage: "",
      snackBarOpen: false,
      snackBarStatus: "info",
    });
  };

  return (
    <>
      <Snackbar
        open={mui.snackBarOpen}
        anchorOrigin={mui.snackBarPosition}
        onClose={handleClose}
        message={mui.snackBarMessage}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={handleClose}
          severity={mui.snackBarStatus}
          sx={{ width: "100%" }}
        >
          {mui.snackBarMessage}
        </Alert>
      </Snackbar>
      <div className="inputs_ctr">
        <div style={{ marginBlock: 10, fontWeight: "bold" }}>
          Product Images
        </div>
        <div className="inputs_ctr_border">
          <div className="new_pdt_btn_refs_ctr">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fileInput.current.click()}
            >
              Select Images
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setImages([])}
            >
              Clear Selection
            </Button>
          </div>
          <span style={{ marginLeft: 10 }}>Select Up to 5 images</span>
          <input
            ref={fileInput}
            type="file"
            multiple
            max={5}
            hidden
            onChange={handleChange}
          />
          <div className="images__preview_ctr">
            {images.length === 0
              ? "No Files Chosen"
              : images.map((v, i) => {
                  let src = URL.createObjectURL(v);
                  return (
                    <div key={i}>
                      <img src={src} alt="PlusProductImage" />
                    </div>
                  );
                })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 20,
          }}
        >
          <Button variant="outlined" color="primary" onClick={handleUpload}>
            Submit Images
          </Button>
        </div>
      </div>
    </>
  );
};

export const UploadSingle = ({ type, onSuccess, image_url }) => {
  const fileInput = useRef();
  const [url, setUrl] = useState(image_url);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    const image = e.target.files[0];
    const storageRef = ref(storage, `/images/${type}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(p);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          onSuccess(type, url);
        });
      }
    );
  };

  return (
    <>
      <div className="inputs_ctr">
        <div style={{ marginBlock: 10, fontWeight: "bold" }}></div>
        <div className="inputs_ctr_border">
          <div className="new_pdt_btn_refs_ctr">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fileInput.current.click()}
            >
              Select Image
            </Button>
          </div>
          <input ref={fileInput} type="file" hidden onChange={handleUpload} />
          <div className="images__preview_ctr">
            <div>
              {url ? (
                <img src={url} alt="PlusCategoryImage" />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {progress === 0 ? "No Image" : `${progress}% Uploaded`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

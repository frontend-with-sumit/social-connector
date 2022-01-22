import React, { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import FormikControl from "./Form/FormikControl";
import Banner from "./Banner";
import uid from "short-uuid";
import domtoimage from "dom-to-image";
import { fileStorage } from "../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import "../styles/advertisementForm.css";

// Images
import food1 from "../assets/banners/Food 1.jpg";
import food2 from "../assets/banners/Food 2.jpg";
import gadget1 from "../assets/banners/Gadget 1.jpg";
import gadget2 from "../assets/banners/Gadget 2.jpg";
import photos1 from "../assets/banners/Photos 1.jpg";
import photos2 from "../assets/banners/Photos 2.jpg";
import travel1 from "../assets/banners/Travel 1.jpg";
import travel2 from "../assets/banners/Travel 2.jpg";
import Share from "./Share";

const bannerOptions = [
  { key: "Choose banner", value: "" },
  { key: "Dinner Party", value: food1 },
  { key: "Ice Cream", value: food2 },
  { key: "Laptop", value: gadget1 },
  { key: "Camera", value: gadget2 },
  { key: "Axe in Grass", value: photos1 },
  { key: "Girl in forest", value: photos2 },
  { key: "Map", value: travel1 },
  { key: "Market", value: travel2 },
];

let initialValues = {
  saleType: "",
  banner: "",
  tagline: "",
  message: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.saleType) errors.saleType = "Sale type is mandatory";
  if (!values.banner) errors.banner = "Please choose a banner";
  if (!values.message) errors.message = "Message is mandatory";

  return errors;
};

function AdvertisementForm() {
  const [disabled, setDisabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const shareCredentials = {
    baseURL: "https://graph.facebook.com/v12.0/17841447319601472", // change the ig_user_id
    access_token:
      "EAAp2nNLlZBCcBANbgq05MKm2LjUxjhyVNWUBnM5WqZACMvI30dZBIZCLIGiDzatX5WKSdvYgocGyykCAo5U0siC32epOU0IcQJOWEmbzAmPTj0jQzVaBIhp1wZBVjG1M2j84XtaH1fJHwvgObuTqFnoisGmosusxyOCGE6ZBntC8NpSJFBEjFZB2H17Si64B796Hn3UzZA278HrwOZCaKDIFws3mmk8LLzfAZD", // update the access_token after 1 hour
  };

  const shareToInstagram = async (adURL) => {
    const { baseURL, access_token } = shareCredentials;
    // create IG Media container
    try {
      setUploading(true);
      const { data: containerId } = await axios.post(
        `${baseURL}/media?image_url=${adURL}&caption=Get the coupon code at http://localhost:3000/payments&access_token=${access_token}`
      );

      // Publish container
      const { data } = await axios.post(
        `${baseURL}/media_publish?creation_id=${containerId.id}&access_token=${access_token}`
      );

      if (data.id) {
        setUploading(false);
        alert("Your advertisement is shared successfully");
        window.open("https://www.instagram.com/");
      }
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const submit = () => {
    setDisabled(true);
    domtoimage
      .toJpeg(document.getElementsByClassName("banner-container")[0], {
        quality: 0.95,
      })
      .then(async (dataURL) => {
        const storageRef = ref(fileStorage, `${uid.generate()}.jpg`);
        uploadString(storageRef, dataURL, "data_url").then(() => {
          getDownloadURL(storageRef).then((url) => {
            setImageURL(url);
            alert("Your image is ready. Please proceed to share");
          });
        });
      });
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
      {({ values }) => {
        return (
          <div className="advertise-container">
            <div className="left">
              <Form className="form-container">
                <div className="form-group">
                  <FormikControl
                    control="select"
                    className="select"
                    name="banner"
                    options={bannerOptions}
                  />
                  <FormikControl
                    control="input"
                    className="group-inp"
                    type="text"
                    name="saleType"
                    placeholder="Sale Type"
                  />
                </div>
                <FormikControl
                  control="input"
                  className="input"
                  type="text"
                  name="tagline"
                  placeholder="Tagline (Optional)"
                />
                <FormikControl
                  control="input"
                  className="input"
                  type="text"
                  name="message"
                  placeholder="Message"
                />
                <button
                  type="submit"
                  className="btn"
                  disabled={!values.saleType || disabled}
                >
                  Finalize
                </button>
              </Form>
            </div>
            <div className="right">
              <Banner
                sale={values.saleType}
                banner={values.banner}
                tagline={values.tagline}
                message={values.message}
              />
              {values.banner && (
                <Share
                  share={() => shareToInstagram(imageURL)}
                  uploading={uploading}
                />
              )}
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default AdvertisementForm;

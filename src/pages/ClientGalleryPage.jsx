import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SidebarShort from "../components/SidebarShort";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { deleteClientImage, getClientImages } from "../api/clientApi";
import Gallery from "../components/misc/Gallery";
import { Button } from "react-bootstrap";
import UploadImageModal from "../components/clients/UploadImageModal";
import ImageComparator from "../components/misc/ImageComparator";

function ClientGalleryPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [clientImages, setClientImages] = useState([]);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showComparatorModal, setShowComparatorModal] = useState(false);
  const loginDetails = useSelector((state) => state.auth.value);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectImage = (image) => {
    setSelectedImages((prevSelected) => {
      console.log(image);
      if (prevSelected.includes(image)) {
        return prevSelected.filter((url) => url !== image);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, image];
      } else {
        return prevSelected;
      }
    });
  };

  const handleCompare = () => {
    if (selectedImages.length === 2) {
      console.log(selectedImages);
      setShowComparatorModal(true);
    } else {
      console.log("Please select exactly two images to compare.");
    }
  };

  const handleDelete = () => {
    if (selectedImages.length === 1) {
      const imageId = selectedImages[0].id;
      console.log("Deleting");
      try {
        deleteClientImage(clientId, imageId, loginDetails.token).then(() => {
          fetchClientImages();
          setSelectedImages([]);
        });
      } catch (error) {
        console.log(error);
      }
      // Implement delete logic here
    } else {
      console.log("Please select exactly one image to delete.");
    }
  };

  // Function to fetch client images
  const fetchClientImages = () => {
    getClientImages(clientId, loginDetails.token)
      .then((response) => {
        setClientImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching client images:", error);
      });
  };

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item.imageUrl);
    console.log(clickedImg);
  };

  const handelRotationRight = () => {
    const totalLength = clientImages.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = clientImages[0].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = clientImages.filter((item) => {
      return clientImages.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = clientImages.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = clientImages[totalLength - 1].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = clientImages.filter((item) => {
      return clientImages.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    fetchClientImages();
    console.log(clientImages);
  }, []);

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div className="flex flex-col">
        <div className="flex flex-row items-start p-5 w-full">
          <button
            onClick={() => navigate(`/client/${clientId}`)}
            className="mr-3"
          >
            <ChevronLeft size={35} />
          </button>
          <h2>Client Gallery</h2>
        </div>
        <div className="flex flex-row">
          <Button
            className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white w-40 m-3"
            onClick={() => {
              setShowImageUploadModal(true);
              console.log(showImageUploadModal);
            }}
          >
            Upload Image
          </Button>
          <Button
            className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white w-40 m-3"
            onClick={handleCompare}
          >
            Compare
          </Button>
          <RotateCcw
            size={38}
            className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white m-3 p-1.5 rounded-xl"
            onClick={() => setSelectedImages([])}
          />
          <Button
            className="text-dark bg-gradient-to-tr from-red-500 to-red-400 border-white w-40 m-3"
            onClick={handleDelete}
          >
            Delete Image
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 p-3">
          {clientImages.map((item, index) => (
            <div
              key={index}
              className="relative rounded overflow-hidden shadow-lg"
              style={{ width: "200px", height: "200px" }}
            >
              <input
                type="checkbox"
                className="absolute top-2 left-2 w-5 h-5"
                checked={selectedImages.includes(item)}
                onChange={() => handleSelectImage(item)}
              />
              <img
                width={200}
                height={200}
                loading="lazy"
                src={item.imageUrl}
                alt={item.fileName.split(".")[0]}
                className="h-full w-full object-cover cursor-pointer"
                onClick={() => handleClick(item, index)}
              />
            </div>
          ))}
        </div>

        <div>
          {clickedImg && (
            <Gallery
              clickedImg={clickedImg}
              handelRotationRight={handelRotationRight}
              setClickedImg={setClickedImg}
              handelRotationLeft={handelRotationLeft}
            />
          )}
        </div>
        <UploadImageModal
          showImageUploadModal={showImageUploadModal}
          setShowImageUploadModal={setShowImageUploadModal}
          clientId={clientId}
          loginDetails={loginDetails}
          fetchClientImages={fetchClientImages}
        />
        <ImageComparator
          showComparatorModal={showComparatorModal}
          setShowComparatorModal={setShowComparatorModal}
          firstImage={selectedImages[0] ? selectedImages[0].imageUrl : ""}
          secondImage={selectedImages[1] ? selectedImages[1].imageUrl : ""}
        />
      </div>
    </div>
  );
}

export default ClientGalleryPage;

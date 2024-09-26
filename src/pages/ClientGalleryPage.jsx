import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SidebarShort from "../components/SidebarShort";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { deleteClientImage, getClientImages } from "../api/clientApi";
import Gallery from "../components/misc/Gallery";
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
      setShowComparatorModal(true);
    } else {
      console.log("Please select exactly two images to compare.");
    }
  };

  const handleDelete = () => {
    if (selectedImages.length === 1) {
      const imageId = selectedImages[0].id;
      try {
        deleteClientImage(clientId, imageId, loginDetails.token).then(() => {
          fetchClientImages();
          setSelectedImages([]);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please select exactly one image to delete.");
    }
  };

  // Function to fetch client images
  const fetchClientImages = () => {
    getClientImages(clientId, loginDetails.token)
      .then((response) => {
        setClientImages(response.data); // Update clientImages state with fetched data
        setCurrentIndex(null); // Reset currentIndex when fetching new images
        setClickedImg(null); // Clear clickedImg when fetching new images
      })
      .catch((error) => {
        console.error("Error fetching client images:", error);
      });
  };

  useEffect(() => {
    fetchClientImages(); // Initial fetch when component mounts
  }, [clientId]);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item.imageUrl);
  };

  const handelRotationRight = () => {
    if (clientImages.length === 0) return;

    let newIndex = currentIndex === null ? 0 : currentIndex + 1;
    if (newIndex >= clientImages.length) {
      newIndex = 0;
    }

    const newUrl = clientImages[newIndex].imageUrl;
    setClickedImg(newUrl);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    if (clientImages.length === 0) return;

    let newIndex = currentIndex === null ? 0 : currentIndex - 1;
    if (newIndex < 0) {
      newIndex = clientImages.length - 1;
    }

    const newUrl = clientImages[newIndex].imageUrl;
    setClickedImg(newUrl);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="bg-pink-50 h-screen flex flex-row">
      <SidebarShort dashboard={false} clients={true} addClient={false} />
      <div
        className="flex p-6 bg-white shadow-lg rounded-lg 
                      m-6 flex-col w-full max-h-screen"
      >
        {" "}
        <div className="flex flex-row items-start ">
          <button
            onClick={() => navigate(`/client/${clientId}`)}
            className="mr-3"
          >
            <ChevronLeft size={35} />
          </button>
          <h2>Kundengalerie</h2>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="custom-button"
            onClick={() => {
              setShowImageUploadModal(true);
            }}
          >
            Bild hochladen
          </button>

          <button className="custom-button" onClick={handleCompare}>
            Vergleichen
          </button>

          <button className="custom-button-negative" onClick={handleDelete}>
            Bild Löschen
          </button>

          <RotateCcw
            className="shadow-md shadow-pink-700 text-dark bg-gradient-to-tr from-pink-200 to-pink-100 border-white m-1 p-1.5 rounded-xl
                        hover:bg-gradient-to-tr hover:from-pink-300 hover:to-pink-200"
            size={38}
            color="#831843"
            onClick={() => setSelectedImages([])}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-3">
          {clientImages.map((item, index) => (
            <div
              key={index}
              className="relative rounded overflow-hidden shadow-lg"
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
                className="w-full h-full object-cover cursor-pointer"
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

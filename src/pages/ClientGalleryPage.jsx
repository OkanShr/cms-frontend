import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SidebarShort from "../components/SidebarShort";
import { ChevronLeft, GalleryHorizontal } from "lucide-react";
import { getClientImages } from "../api/clientApi";
import Gallery from "../components/misc/Gallery";
import { Button } from "react-bootstrap";
import UploadImageModal from "../components/clients/UploadImageModal";

function ClientGalleryPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [clientImages, setClientImages] = useState([]);
  const [showImageUploadModal, setShowImageUploadModal] = useState([]);
  const loginDetails = useSelector((state) => state.auth.value);

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
      <SidebarShort
        dashboard={false}
        clients={false}
        addClient={false}
        calendar={true}
      />
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
        <Button
          className="text-dark bg-gradient-to-tr from-teal-200 to-teal-100 border-white w-40 m-3"
          onClick={() => {
            setShowImageUploadModal(true);
            console.log(showImageUploadModal);
          }}
        >
          Upload Image
        </Button>
        <div className="grid grid-cols-3 gap-4 p-3">
          {clientImages.map((item, index) => (
            <div key={index} className="rounded overflow-hidden shadow-lg">
              <img
                src={item.imageUrl}
                alt={item.fileName.split(".")[0]}
                className="w-full h-auto cursor-pointer"
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
      </div>
    </div>
  );
}

export default ClientGalleryPage;

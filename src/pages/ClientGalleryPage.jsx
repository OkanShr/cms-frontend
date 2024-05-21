import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SidebarShort from "../components/SidebarShort";
import { ChevronLeft, GalleryHorizontal } from "lucide-react";
import { getClientImages } from "../api/clientApi";
import Gallery from "../components/misc/Gallery";
function ClientGalleryPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();

  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [clientImages, setClientImages] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const loginDetails = useSelector((state) => state.auth.value);
  const [pdfUrl, setPdfUrl] = useState("");

  // Function to handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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

  const handleClientIdChange = (event) => {
    setClientId(event.target.value);
  };

  // Function to handle image upload
  const handleImageUpload = () => {
    if (!file || !clientId || !loginDetails.token) {
      console.error("File, client ID, or token missing");
      return;
    }

    uploadClientImage(clientId, file, loginDetails.token)
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        fetchClientImages();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  // Function to handle PDF file change
  const handlePdfFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle PDF file upload
  const handleFileUpload = () => {
    if (!selectedFile || !clientId || !loginDetails.token) {
      console.error("File, client ID, or token missing");
      return;
    }

    uploadClientPdf(clientId, selectedFile, loginDetails.token)
      .then((response) => {
        console.log("PDF uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading PDF:", error);
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
          <button onClick={() => navigate("/clients")} className="mr-3">
            <ChevronLeft size={35} />
          </button>
          <h2>Client Gallery</h2>
        </div>
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
      </div>
    </div>
  );
}

export default ClientGalleryPage;
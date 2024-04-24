// https://www.telerik.com/kendo-react-ui/components/scheduler/views/week/
import React, { useState } from "react";
import { getClientImages, uploadClientImage } from "../api/clientApi"; // Import the API functions
import SidebarShort from "../components/SidebarShort";
import { useSelector } from "react-redux";
function TestPage() {
  const [clientImages, setClientImages] = useState([]);
  const [file, setFile] = useState(null);
  const [clientId, setClientId] = useState("");
  const loginDetails = useSelector((state) => state.auth.value);

  // Function to handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to fetch client images
  const fetchClientImages = () => {
    getClientImages(clientId, loginDetails.token)
      .then((response) => {
        setClientImages(response.data);
        console.log(clientImages);
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

  return (
    <div className="bg-white-100 h-screen flex flex-row">
      <SidebarShort
        dashboard={false}
        clients={false}
        addClient={false}
        calendar={true}
      />
      <div className="flex flex-col p-5 w-full">
        <h2>Calendar</h2>
        <div>
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Client ID"
            value={clientId}
            onChange={handleClientIdChange}
          />
          {/* Manual call for testing purposes */}
          <button onClick={handleImageUpload}>Upload Image</button>

          <button onClick={fetchClientImages}>Get Client Images</button>

          <div>
            {clientImages.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={`Client Image ${image.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestPage;

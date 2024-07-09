import { useEffect } from "react";

const ExternalRedirect = () => {
  useEffect(() => {
    window.location.href = "https://google.com";
  }, []);

  return null;
};

export default ExternalRedirect;

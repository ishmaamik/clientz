import React, { useState } from "react";
import Certificate from "./Certificate"; // Adjust the import path if needed

const CertificatePage = () => {
  const [showCertificate, setShowCertificate] = useState(true);

  // Function to handle closing the certificate
  const handleClose = () => {
    setShowCertificate(false); // This will hide the certificate when "Close" is clicked
  };

  return <div>{showCertificate && <Certificate onClose={handleClose} />}</div>;
};

export default CertificatePage;

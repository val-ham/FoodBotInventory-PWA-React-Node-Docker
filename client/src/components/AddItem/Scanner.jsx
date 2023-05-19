import React, { useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import CropFreeIcon from "@mui/icons-material/CropFree";
import Button from "@mui/material/Button";

const Scanner = ({ showScanner, toggleScanner, onScanSuccess }) => {
  useEffect(() => {
    if (!showScanner) return;

    const onScanSuccessCallback = (decodedText, decodedResult) => {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      onScanSuccess(decodedText);
    };

    const onScanFailure = (error) => {
      // Handle scan failure
    };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [Html5QrcodeSupportedFormats.EAN_13],
      },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccessCallback, onScanFailure);

    // Cleanup on unmount
    return () => {
      html5QrcodeScanner.clear();
    };
  }, [showScanner]);

  return (
    <>
      {!showScanner && (
        <Button variant="contained" startIcon={<CropFreeIcon />} onClick={toggleScanner} size="large">
          Scan Items
        </Button>
      )}
      {showScanner && (
        <>
          <div id="reader" width="600px"></div>
          <Button variant="outlined" onClick={toggleScanner} sx={{ mt: 1 }}>
            Close Scanner
          </Button>
        </>
      )}
    </>
  );
};

export default Scanner;

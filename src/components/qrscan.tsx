import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const qrCode = () => {
  return (
    <Scanner
      onResult={(text, result) => console.log(text, result)}
      onError={(error) => console.log(error?.message)}
    />
  );
};
export default qrCode;

import React, { useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const Scan = () => {
  return (
    <Scanner
      onResult={(text, result) => console.log(text, result)}
      onError={(error) => console.log(error?.message)}
    />
  );
};
export default Scan;

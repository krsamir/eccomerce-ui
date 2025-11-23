import { useEffect, useMemo, useState } from "react";

const useBarcodeScan = (barcodeChanged) => {
  const [barCodeDisplay, setBarCodeDisplay] = useState("");

  useEffect(() => {
    let barcodeScan = "";
    const handleKeyDown = (e) => {
      // if keycode is 13 (enter) then check if there are barcode scan keys and if there are handle barcode scan
      // @ts-ignore
      if (e.keyCode === 13 && barcodeScan?.length > 3) {
        // @ts-ignore
        setBarCodeDisplay(barcodeScan);
        // @ts-ignore
        barcodeChanged(barcodeScan);
        return;
      }
      // skip if pressed key is shift
      // @ts-ignore
      if (e.keyCode === 16) {
        return;
      }
      // push keyCode to barcode scan variable
      //   @ts-ignore
      barcodeScan += e.key;
      // setTimeout to clear variable
      setTimeout(() => {
        barcodeScan = "";
      }, 100);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [barcodeChanged]);

  return useMemo(
    () => ({ barCodeDisplay, setBarCodeDisplay }),
    [barCodeDisplay]
  );
};

export default useBarcodeScan;

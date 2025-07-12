import { Loader } from "@ecom/ui";
import React, { lazy, Suspense } from "react";
import { useMaster } from "@hooks";
const CreateMaster = lazy(() => import("./CreateMaster"));
const MasterGrid = lazy(() => import("./Master.grid"));

function Master() {
  const { masterData } = useMaster();
  return (
    <>
      <Suspense fallback={<Loader />}>
        <CreateMaster />
        <MasterGrid data={masterData} />
      </Suspense>
    </>
  );
}

export default Master;

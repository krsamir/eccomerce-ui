import { useQuery } from "@tanstack/react-query";

import { masterApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useMemo } from "react";

const useMaster = () => {
  const { data } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_MASTER],
    queryFn: masterApi.getAllUserData,
  });

  return useMemo(() => ({ masterData: data }), [data?.data?.data]);
};

export default useMaster;

import { useQuery } from "@tanstack/react-query";

import { templatesApi } from "@api";
import CONSTANTS from "@ecom/ui/constants";
import { useMemo } from "react";

const useTemplates = ({ enabled = false }) => {
  const { data: { data: { data: templates = [] } = {} } = {} } = useQuery({
    queryKey: [CONSTANTS.QUERY_KEYS.GET_ALL_TEMPLATES],
    queryFn: templatesApi.getAllTemplates,
    enabled,
  });
  return useMemo(() => ({ templates }), [templates]);
};

export default useTemplates;

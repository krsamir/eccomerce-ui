import CONSTANTS from "@ecom/ui/constants";

export const getConfig = () => {
  return {
    host: `${window.location.protocol}//${window.location.hostname}:5051`,
    token: `65dbbc603f362ce82b8e7e7572cf3f7c5e70c45894cf7a469d5ac326e6aa932c`,
  };
};

export const getStatusColor = (status) => {
  if (CONSTANTS.PRODUCT_WORKFLOW.INITIALIZED === status) {
    return "yellow";
  }
  if (CONSTANTS.PRODUCT_WORKFLOW.COMPLETED === status) {
    return "green";
  }
  if (CONSTANTS.PRODUCT_WORKFLOW.FAILED === status) {
    return "red";
  }
  if (CONSTANTS.PRODUCT_WORKFLOW.PENDING === status) {
    return "blue";
  }
  return "red";
};

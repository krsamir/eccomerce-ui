// Convert camelCase to snake_case
export const toSnakeCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase);
  }
  if (obj instanceof Date) {
    return obj;
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      );
      acc[snakeKey] = toSnakeCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

// Convert snake_case to camelCase
export const toCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }
  if (obj instanceof Date) {
    return obj;
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      acc[camelKey] = toCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

export const tranformCamelCasetoSpaceSeparated = (str) => {
  if (!str) return "";
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const capitalize = (str) => {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
};

export const getDirtyFormFields = (data, dirty) => {
  if (Array.isArray(dirty)) {
    return dirty.map((d, index) => getDirtyFormFields(data[index], d));
  }

  if (typeof dirty === "object" && dirty !== null) {
    const result = {};
    for (const key in dirty) {
      if (dirty[key] === true) {
        result[key] = data[key];
      } else if (typeof dirty[key] === "object") {
        result[key] = getDirtyFormFields(data[key], dirty[key]);
      }
    }
    return result;
  }

  if (dirty === true) return data;

  return undefined;
};

// export const isFilterActive = (filter, params) => {
//   if (filter.key === "attributes") {
//     return Boolean(params[`attribute_${filter.id}`]);
//   }

//   return Boolean(params[filter.key]);
// };

export const isFilterActive = (filter, params, key) => {
  if (key === "attributes") {
    return Boolean(params[`attributes[${filter.id}]`]);
  }

  if (filter.key === "attributes") {
    return Boolean(params[`attributes[${filter.id}]`]);
  }

  return Boolean(params[filter.key]);
};

export const sortFilters = (filters = [], params) => {
  return [...filters].sort((a, b) => {
    return (
      Number(isFilterActive(b, params)) - Number(isFilterActive(a, params))
    );
  });
};

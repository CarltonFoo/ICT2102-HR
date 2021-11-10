import StaffAvailability from "../../data/staffAvailability.json";

const filterData = (data) => (formatter) =>
  data.map((item) => ({
    text: formatter(item),
    value: formatter(item),
  }));

export const Filter = {
  FILTEREDDATA: filterData,
};

export default Filter;

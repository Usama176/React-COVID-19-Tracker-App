import numeral from 'numeral';

// sorting the data acccording to the number of cases
export const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a.cases > b.cases) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
  };

// changing the format eg 10000 to 10k using numeral js
export const changeStatFormat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";
// May be used in another life 🥴
const supportedExperienceYearsOptions = SUPPORTED_EXPERIENCE_YEARS.map(
  (year) => {
    if (year < 2) {
      return {
        value: year,
        label: `${year} Year`,
      };
    } else if (year === 31) {
      return {
        value: year,
        label: "30+ Years",
      };
    }
    return {
      value: year,
      label: `${year} Years`,
    };
  }
);

const supportedExperienceMonthsOptions = SUPPORTED_EXPERIENCE_MONTHS.map(
  (month) => {
    if (month < 2) {
      return {
        value: month,
        label: `${month} Month`,
      };
    }
    return {
      value: month,
      label: `${month} Months`,
    };
  }
);
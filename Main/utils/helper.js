module.exports = {
    format_date: (date) => {
      // Format date as MMM DD, YYYY
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  };
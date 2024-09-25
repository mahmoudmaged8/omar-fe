// utils/formatNumber.js

/**
 * Formats a number to 5 decimal places.
 *
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number as a string.
 */
const formatNumber = (number) => {
  if (Number.isInteger(number)) {
    return number.toString();
  }

  const [integerPart, decimalPart] = number.toString().split(".");
  if (decimalPart && decimalPart.length <= 5) {
    return number.toString();
  }

  const truncatedDecimal = decimalPart ? decimalPart.substring(0, 5) : "";
  return `${integerPart}.${truncatedDecimal}`;
};

export default formatNumber;

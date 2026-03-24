import capitalizeLetters from "./capitalizeLetters";

/**
 * Extracts the first name from a full name string.
 *
 * @param {string} fullName - The full name to extract from.
 * @returns {string} - The first name only.
 */
const getFirstName = (fullName: any) => {
  if (typeof fullName !== "string") return "";

  const trimmed = fullName.trim();
  const spaceIndex = trimmed.indexOf(" ");

  const firstName = spaceIndex === -1 ? trimmed : trimmed.slice(0, spaceIndex);

  return capitalizeLetters(firstName);
};

export default getFirstName;

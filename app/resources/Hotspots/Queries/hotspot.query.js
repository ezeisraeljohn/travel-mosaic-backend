const getOSMQuery = (latitude, longitude, categoryString, around = 100000) => {
  const conditions = categoryString
    .split("|") // Split into individual filters
    .map((pair) => {
      const [key, value] = pair.split("="); // Extract key and value
      return `
              node["${key}"="${value}"](around: ${around}, ${latitude}, ${longitude});
              way["${key}"="${value}"](around:${around}, ${latitude}, ${longitude});
              relation["${key}"="${value}"](around:${around}, ${latitude}, ${longitude});
            `;
    })
    .join("\n"); // Join all queries into a single string

  return `[out:json];
              (
              ${conditions}
              );
              out center;
              `;
};

// Example usage:

module.exports = { getOSMQuery };

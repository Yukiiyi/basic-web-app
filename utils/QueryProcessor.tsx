// Helper function to extract numbers from a query
function extractNumbers(query: string): number[] {
  // This regex captures sequences of digits (including negatives if needed)
  const regex = /-?\d+/g;
  const matches = query.match(regex) || [];
  return matches.map(Number);
}

// Helper function to identify the operation requested
function identifyOperation(query: string): string {
  const lowerQ = query.toLowerCase();
  if (lowerQ.includes("prime")) return "prime_check";
  if (lowerQ.includes("multiplied by")) return "multiplication";
  if (lowerQ.includes("minus")) return "subtraction";
  if (lowerQ.includes("power of")) return "exponent";
  // Add more rules/keywords if needed
  return "unknown";
}

// Main QueryProcessor function
export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();

  // 1. Handle simpler queries (like your original example)
  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language."
    );
  }

  if (lowerQuery.includes("name")) {
    return "Rohan";
  }
  
  if (lowerQuery.includes("andrew id")) {
    return "yuqizou"; // Replace with your Andrew ID
  }

  // 2. Handle numeric/arithmetic queries
  //    Extract the numbers and determine the operation
  const numbers = extractNumbers(query);
  const operation = identifyOperation(query);

  // If you want to return a JSON-like string for an API call:
  if (operation !== "unknown" && numbers.length > 0) {
    // Example: returning a payload string
    return JSON.stringify({
      operation,
      numbers,
      // optionally: originalQuery: query
    });
  }

  // 3. No recognized keywords or operations
  return "I’m not sure how to handle that query.";
}

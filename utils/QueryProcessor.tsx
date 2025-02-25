// 1. Helper: Extract numbers from a query (regex)
function extractNumbers(query: string): number[] {
  const regex = /-?\d+/g;
  const matches = query.match(regex) || [];
  return matches.map(Number);
}

// 2. Helper: Identify the operation from the query text
function identifyOperation(query: string): string {
  const lowerQ = query.toLowerCase();

  if (lowerQ.includes("prime")) return "prime_check";
  if (lowerQ.includes("multiplied by")) return "multiplication";
  if (lowerQ.includes("minus")) return "subtraction";
  if (lowerQ.includes("plus")) return "addition";
  if (lowerQ.includes("power of")) return "exponent";

  return "unknown";
}

// 3. Helper: Check if a number is prime
function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// 4. Perform the actual calculation or prime check
function performOperation(operation: string, numbers: number[]): string {
  switch (operation) {
    case "prime_check": {
      // For prime-check queries, we might return which are prime
      // Example: "89, 19 are prime. 94, 16, 78 are not."
      const primes: number[] = [];
      const nonPrimes: number[] = [];

      for (const n of numbers) {
        if (isPrime(n)) primes.push(n);
        else nonPrimes.push(n);
      }

      if (primes.length === 0) {
        return `None of the numbers [${numbers.join(", ")}] are prime.`;
      } else if (nonPrimes.length === 0) {
        return `All of the numbers [${numbers.join(", ")}] are prime.`;
      } else {
        return `Primes: ${primes.join(", ")}. Non-primes: ${nonPrimes.join(", ")}.`;
      }
    }

    case "addition": {
      // Add all numbers
      const sum = numbers.reduce((acc, val) => acc + val, 0);
      // For a nice textual result, we could show the expression + the result:
      // e.g. "93 + 59 + 45 = 197"
      const expr = numbers.join(" + ");
      return `${expr} = ${sum}`;
    }

    case "subtraction": {
      // Subtract in sequence. e.g. [37, 45, 10] => 37 - 45 - 10 = -18
      if (numbers.length === 1) {
        return `Only one number provided: ${numbers[0]}. There's nothing to subtract.`;
      }
      const result = numbers.slice(1).reduce((acc, val) => acc - val, numbers[0]);
      // Create an expression string
      const expr = numbers.join(" - ");
      return `${expr} = ${result}`;
    }

    case "multiplication": {
      // Multiply in sequence
      const product = numbers.reduce((acc, val) => acc * val, 1);
      const expr = numbers.join(" * ");
      return `${expr} = ${product}`;
    }

    case "exponent": {
      // Typically, exponent queries are "What is x to the power of y?"
      // If multiple numbers appear, we'll just use the first two
      // but you can handle them however you see fit.
      if (numbers.length < 2) {
        return `Not enough numbers to perform exponent (need at least 2).`;
      }
      const base = numbers[0];
      const exp = numbers[1];
      // For large exponents, JavaScript might return Infinity or do weird things,
      // but let's do this straightforwardly:
      // (You could use BigInt if you need extremely large integers)
      const result = Math.pow(base, exp);
      return `${base} ^ ${exp} = ${result}`;
    }

    default:
      return "I’m not sure how to handle that operation.";
  }
}

// 5. Main QueryProcessor function
export default function QueryProcessor(query: string): string {
  const lowerQuery = query.toLowerCase();

  // Simple text-based keywords first
  if (lowerQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (lowerQuery.includes("name")) {
    return "Rohan";
  }

  if (lowerQuery.includes("andrew id")) {
    return "yuqizou"; // Replace with your actual Andrew ID
  }

  // Now handle numeric queries
  const numbers = extractNumbers(query);
  const operation = identifyOperation(query);

  // If we found an operation and at least one number:
  if (operation !== "unknown" && numbers.length > 0) {
    return performOperation(operation, numbers);
  }

  // Fallback
  return "I’m not sure how to handle that query.";
}

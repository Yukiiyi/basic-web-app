// QueryProcessor.test.ts
import QueryProcessor from "./QueryProcessor";

describe("QueryProcessor", () => {
  test("handles 'Shakespeare' query", () => {
    const query = "Tell me about Shakespeare.";
    const result = QueryProcessor(query);
    expect(result).toMatch(/William Shakespeare/i);
  });

  test("handles 'name' query", () => {
    const query = "What's your name?";
    const result = QueryProcessor(query);
    expect(result).toBe("Rohan");
  });

  test("handles 'andrew id' query", () => {
    const query = "What's your Andrew ID?";
    const result = QueryProcessor(query);
    // Replace 'yuqizou' below if you used a different Andrew ID
    expect(result).toBe("yuqizou");
  });

  test("handles prime checking query with multiple numbers", () => {
    const query = "Which of the following are primes: 94, 16, 78, 89, 19?";
    const result = QueryProcessor(query);
    // We expect a JSON string with operation='prime_check' and numbers=[94,16,78,89,19]
    const parsed = JSON.parse(result);
    expect(parsed.operation).toBe("prime_check");
    expect(parsed.numbers).toEqual([94, 16, 78, 89, 19]);
  });

  test("handles a multiplication query", () => {
    const query = "What is 59 multiplied by 22?";
    const result = QueryProcessor(query);
    // Expect a JSON string with operation='multiplication' and numbers=[59,22]
    const parsed = JSON.parse(result);
    expect(parsed.operation).toBe("multiplication");
    expect(parsed.numbers).toEqual([59, 22]);
  });

  test("handles a minus query", () => {
    const query = "What is 11 minus 37?";
    const result = QueryProcessor(query);
    const parsed = JSON.parse(result);
    expect(parsed.operation).toBe("subtraction");
    expect(parsed.numbers).toEqual([11, 37]);
  });

  test("handles an exponent query", () => {
    const query = "What is 3 to the power of 4?";
    const result = QueryProcessor(query);
    const parsed = JSON.parse(result);
    expect(parsed.operation).toBe("exponent");
    expect(parsed.numbers).toEqual([3, 4]);
  });

  test("handles unrecognized query", () => {
    const query = "Can you decipher this cryptic message?!";
    const result = QueryProcessor(query);
    // Because there's no recognized keyword and no numbers:
    expect(result).toBe("I’m not sure how to handle that query.");
  });

  test("handles numeric query without recognized operation", () => {
    const query = "You have 42";
    const result = QueryProcessor(query);
    // We expect "unknown" operation but we do have a number
    // So depending on how you structured your code, you may:
    // 1. Return a JSON payload with operation="unknown", or
    // 2. Return the fallback "I'm not sure..."
    // Adjust this test to match your actual implementation.
    const parsedOrString = (() => {
      try {
        return JSON.parse(result);
      } catch {
        return result;
      }
    })();

    if (typeof parsedOrString === "object") {
      // If you're returning JSON in all numeric cases
      expect(parsedOrString.operation).toBe("unknown");
      expect(parsedOrString.numbers).toEqual([42]);
    } else {
      // If you're returning fallback message
      expect(parsedOrString).toBe("I’m not sure how to handle that query.");
    }
  });
});

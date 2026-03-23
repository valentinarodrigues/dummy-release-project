const { add, subtract, multiply, divide, modulo, power, squareRoot, clamp } = require("../src/index");

describe("add", () => {
  test("adds two positive numbers", () => expect(add(2, 3)).toBe(5));
  test("adds negative numbers", () => expect(add(-1, -2)).toBe(-3));
});

describe("subtract", () => {
  test("subtracts two numbers", () => expect(subtract(5, 3)).toBe(2));
});

describe("multiply", () => {
  test("multiplies two numbers", () => expect(multiply(3, 4)).toBe(12));
});

describe("divide", () => {
  test("divides two numbers", () => expect(divide(10, 2)).toBe(5));
  test("throws on division by zero", () => {
    expect(() => divide(1, 0)).toThrow("Division by zero");
  });
});

describe("power", () => {
  test("raises base to exponent", () => expect(power(2, 10)).toBe(1024));
  test("any number to the power of 0 is 1", () => expect(power(99, 0)).toBe(1));
  test("supports fractional exponents", () => expect(power(4, 0.5)).toBe(2));
});

describe("squareRoot", () => {
  test("returns square root", () => expect(squareRoot(9)).toBe(3));
  test("throws on negative input", () => {
    expect(() => squareRoot(-1)).toThrow("Cannot take square root of a negative number");
  });
});

describe("clamp", () => {
  test("returns value when within range", () => expect(clamp(5, 1, 10)).toBe(5));
  test("clamps to min when below range", () => expect(clamp(-5, 0, 10)).toBe(0));
  test("clamps to max when above range", () => expect(clamp(15, 0, 10)).toBe(10));
  test("throws when min > max", () => {
    expect(() => clamp(5, 10, 0)).toThrow("min cannot be greater than max");
  });
});

describe("modulo", () => {
  test("returns remainder", () => expect(modulo(10, 3)).toBe(1));
  test("throws on division by zero", () => {
    expect(() => modulo(1, 0)).toThrow("Division by zero");
  });
});

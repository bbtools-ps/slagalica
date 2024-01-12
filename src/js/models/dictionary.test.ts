import { describe, expect, it, vi } from "vitest";
import { getDictionary } from "./dictionary";

const testResponseData = { data: "dictionary of words" };

const testFetch = vi.fn(
  (url, options) =>
    new Promise((resolve, reject) => {
      const testResponse = {
        ok: true,
        json() {
          return new Promise((resolve, reject) => resolve(testResponseData));
        },
      };
      resolve(testResponse);
    })
);

vi.stubGlobal("fetch", testFetch);

describe("getDictionary()", () => {
  it("should return any available response data", async () => {
    let errorMessage: undefined | string;

    try {
      const response = await getDictionary();
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage).toBeUndefined();
  });
  it("should throw error if response is not ok", async () => {
    testFetch.mockImplementationOnce(
      (url, options) =>
        new Promise((resolve, reject) => {
          const testResponse = {
            ok: false,
            json() {
              return new Promise((resolve, reject) => resolve(testResponseData));
            },
          };
          resolve(testResponse);
        })
    );

    let errorMessage: undefined | string;

    try {
      const response = await getDictionary();
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage).toBeDefined();
  });
});

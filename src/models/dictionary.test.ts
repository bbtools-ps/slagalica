import { describe, expect, it, vi } from "vitest";
import { getDictionary } from "./dictionary";

const testResponseData = { data: "dictionary of words" };

const testFetch = vi.fn(
  (_url, _options) =>
    new Promise((resolve, _reject) => {
      const testResponse = {
        ok: true,
        json() {
          return new Promise((resolve, _reject) => resolve(testResponseData));
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
      await getDictionary();
    } catch (error) {
      errorMessage = error as string;
    }

    expect(errorMessage).toBeUndefined();
  });
  it("should throw error if response is not ok", async () => {
    testFetch.mockImplementationOnce(
      (_url, _options) =>
        new Promise((resolve, _reject) => {
          const testResponse = {
            ok: false,
            json() {
              return new Promise((resolve, _reject) =>
                resolve(testResponseData)
              );
            },
          };
          resolve(testResponse);
        })
    );

    let errorMessage: undefined | string;

    try {
      await getDictionary();
    } catch (error) {
      errorMessage = error as string;
    }

    expect(errorMessage).toBeDefined();
  });
});

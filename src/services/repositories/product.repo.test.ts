import { ProductsRepo } from "./product.repo";

describe("Given the product repo", () => {
  let repo: ProductsRepo;

  beforeEach(() => {
    repo = new ProductsRepo();
  });

  describe("When we call the readFilteredGallery method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.readFilteredGallery("mockToken", "/test", {});
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.readFilteredGallery("mockToken", "/test", {});
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the readFilteredCount method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.readFilteredCount("mockToken", "/test", {});
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.readFilteredCount("mockToken", "/test", {});
      await expect(result).rejects.toThrow();
    });
  });
  describe("When we call the readDetail method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.readDetail("mockToken", "/test");
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.readDetail("mockToken", "/test");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the readGroupsByField method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.readGroupsByField(
        "mockToken",
        "/test",
        "mockField"
      );
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.readGroupsByField("mockToken", "/test", "mockField");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the create method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.create("mockToken", {});
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.create("mockToken", {});
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the deleteByKey method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.deleteByKey(
        "mockToken",
        "mockKey",
        "mockValue"
      );
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.deleteByKey("mockToken", "mockKey", "mockValue");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the deleteById method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.deleteById("mockToken", "mockId");
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.deleteById("mockToken", "mockId");
      await expect(result).rejects.toThrow();
    });
  });
});

import { ProductMovementsRepo } from "./productmovement.repo";

describe("Given the product repo", () => {
  let repo: ProductMovementsRepo;

  beforeEach(() => {
    repo = new ProductMovementsRepo();
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

  describe("When we call the readAnalytics method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.readAnalytics("mockToken");
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.readAnalytics("mockToken");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the addProductMovement method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.addProductMovement("mockToken", {});
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.addProductMovement("mockToken", {});
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the stockBySku method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.stockBySku("mockToken", "mockSku");
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.stockBySku("mockToken", "mockSku");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the stock method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.stock("mockToken");
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.stock("mockToken");
      await expect(result).rejects.toThrow();
    });
  });
});

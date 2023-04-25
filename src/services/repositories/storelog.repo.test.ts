import { StoreLogRepo } from "./storelog.repo";

describe("Given the product repo", () => {
  let repo: StoreLogRepo;

  beforeEach(() => {
    repo = new StoreLogRepo();
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
});

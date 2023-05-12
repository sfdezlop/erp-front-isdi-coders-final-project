import { QueryInputCollectionStructure } from "../../models/collections.model";
import { CollectionsRepo } from "./collection.repo";

describe("Given the collection repo", () => {
  let repo: CollectionsRepo;

  beforeEach(() => {
    repo = new CollectionsRepo();
  });

  describe("When we call the read method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.readRecords(
        {} as QueryInputCollectionStructure,
        "mockToken",
        "mockControlInfo"
      );
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.readRecords(
        {} as QueryInputCollectionStructure,
        "mockToken",
        "mockControlInfo"
      );
      await expect(result).rejects.toThrow();
    });
  });
});

import { UsersRepo } from "./user.repo";

describe("Given the users repo", () => {
  let repo: UsersRepo;

  beforeEach(() => {
    repo = new UsersRepo();
  });

  describe("When we call the readTokenAndUser method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.readTokenAndUser({}, "/test");
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.readTokenAndUser({ id: "1" }, "/test");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the readGallery method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.readGallery("mockToken", "/test");
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.readGallery("mockToken", "/test");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When we call the loginWithToken method", () => {
    test("Then if the fetch is OK it should return the data", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });
      const result = await repo.loginWithToken("mockToken", "/test");
      expect(result).toEqual(mockValue);
    });
    test("then if the fetch is NOT OK it throw error", async () => {
      global.fetch = jest.fn().mockResolvedValue("Error test");
      const result = repo.loginWithToken("mockToken", "/test");
      await expect(result).rejects.toThrow();
    });
  });
});

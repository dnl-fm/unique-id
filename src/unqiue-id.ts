/**
 * A utility class for generating unique identifiers.
 */
export class UniqueId {
  /** The character set used for generating random parts of the ID. */
  private static readonly CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

  /**
   * Creates a unique identifier.
   *
   * @param options - An object containing options for ID creation.
   * @param options.length - The total length of the ID (including prefix). Defaults to 26.
   * @param options.prefix - A string to prepend to the random part of the ID. Defaults to an empty string.
   * @returns A string containing the unique identifier.
   *
   * @example
   * // Generate a default ID (26 characters, no prefix)
   * const id1 = UniqueId.create();
   *
   * @example
   * // Generate an ID with custom length and prefix
   * const id2 = UniqueId.create({ length: 20, prefix: "user_" });
   */
  static create(options?: { length?: number; prefix?: string }): string {
    const length = options?.length ?? 26;
    const prefix = options?.prefix ?? "";

    const randomPart = UniqueId.CHARS.padEnd(length, UniqueId.CHARS)
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
      .slice(0, length - prefix.length);

    return prefix + randomPart;
  }
}

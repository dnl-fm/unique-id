import { assertEquals, assertMatch } from "jsr:@std/assert";
import { UniqueId } from "../src/unique-id.ts";

Deno.test("UniqueId.create - default parameters", () => {
  const id = UniqueId.create();
  assertEquals(id.length, 26);
  assertMatch(id, /^[a-z0-9]{26}$/);
});

Deno.test("UniqueId.create - custom length", () => {
  const id = UniqueId.create({ length: 15 });
  assertEquals(id.length, 15);
  assertMatch(id, /^[a-z0-9]{15}$/);
});

Deno.test("UniqueId.create - custom prefix", () => {
  const id = UniqueId.create({ prefix: "user_" });
  assertEquals(id.length, 26);
  assertMatch(id, /^user_[a-z0-9]{21}$/);
});

Deno.test("UniqueId.create - custom length and prefix", () => {
  const id = UniqueId.create({ length: 20, prefix: "item_" });
  assertEquals(id.length, 20);
  assertMatch(id, /^item_[a-z0-9]{15}$/);
});

Deno.test("UniqueId.create - uniqueness", () => {
  const ids = new Set();
  const size = 1_000_000;
  for (let i = 0; i < size; i++) {
    ids.add(UniqueId.create());
  }
  assertEquals(ids.size, size);
});

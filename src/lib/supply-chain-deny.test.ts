import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  DENIED_PACKAGE_NAMES,
  findDeniedDependencies,
  isDeniedPackageName,
  type NpmLockfile,
  type NpmManifest,
} from "./supply-chain-deny";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function readJson<T>(file: string): T {
  return JSON.parse(readFileSync(join(root, file), "utf8")) as T;
}

describe("supply-chain deny list", () => {
  it("flags the Sep 2026 indexed-btree family and dforge-mcp, not sorted-btree", () => {
    for (const name of DENIED_PACKAGE_NAMES) {
      assert.equal(isDeniedPackageName(name), true, name);
    }
    assert.equal(isDeniedPackageName("@attacker/indexed-btree"), true);
    assert.equal(isDeniedPackageName("@other/dforge-mcp"), true);
    assert.equal(isDeniedPackageName("sorted-btree"), false);
    assert.equal(isDeniedPackageName("next"), false);
  });

  it("fails a lockfile that grows a denied dependency", () => {
    const denied = findDeniedDependencies(
      { dependencies: { "indexed-btree": "1.0.0" } },
      {
        packages: {
          "node_modules/indexed-btree": { name: "indexed-btree", version: "1.0.0" } as NpmManifest,
          "node_modules/@dforge-core/dforge-mcp": { name: "@dforge-core/dforge-mcp" },
        },
      },
    );
    assert.deepEqual(denied, ["@dforge-core/dforge-mcp", "indexed-btree"]);
  });

  it("keeps package.json and package-lock.json free of denied names", () => {
    const denied = findDeniedDependencies(
      readJson<NpmManifest>("package.json"),
      readJson<NpmLockfile>("package-lock.json"),
    );
    assert.deepEqual(denied, []);
  });
});

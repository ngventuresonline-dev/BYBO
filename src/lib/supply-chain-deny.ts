/**
 * Sep 2026 npm supply-chain deny list.
 *
 * indexed-btree family (Checkmarx Zero, 17 Sep 2026): typosquat of the
 * legitimate `sorted-btree` library. The loader lives in
 * BTree.prototype.set (key === 100), not in install scripts. Host
 * telemetry goes out over Slack/Telegram; C2 and the second stage use
 * an Ethereum Sepolia contract. Checkmarx also pulled the sibling
 * packages listed below. `ordered-btree` is the same family
 * (Corgea MAL-2026-6193). `sorted-btree` itself is legitimate and is
 * not denied.
 *
 * @dforge-core/dforge-mcp: GHAPPIER remote-code loader shipped as
 * 0.2.21 on 9 Sep 2026 (valid npm provenance). This marketing site has
 * no MCP dependency; block the name so a bump cannot add it silently.
 */
export const DENIED_PACKAGE_NAMES = [
  "indexed-btree",
  "ordered-btree",
  "ordered-kv-index",
  "btree-leaderboard",
  "priority-slot-queue",
  "btree-range-store",
  "btree-core",
  "btree-time-index",
  "btree-lru-cache",
  "neighbor-key-map",
  "sliding-score-window",
  "@dforge-core/dforge-mcp",
] as const;

const DENIED_EXACT = new Set(DENIED_PACKAGE_NAMES.map((name) => name.toLowerCase()));

const DEPENDENCY_FIELDS = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
] as const;

type ManifestMap = Record<string, string> | undefined;

export type NpmManifest = {
  name?: string;
  dependencies?: ManifestMap;
  devDependencies?: ManifestMap;
  optionalDependencies?: ManifestMap;
  peerDependencies?: ManifestMap;
  overrides?: Record<string, unknown>;
};

export type NpmLockfile = {
  packages?: Record<string, NpmManifest & { name?: string }>;
  dependencies?: Record<string, unknown>;
};

function unscopedName(name: string): string {
  const slash = name.lastIndexOf("/");
  return slash === -1 ? name : name.slice(slash + 1);
}

export function isDeniedPackageName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return false;
  if (DENIED_EXACT.has(normalized)) return true;
  if (DENIED_EXACT.has(unscopedName(normalized))) return true;
  return normalized === "dforge-mcp" || normalized.endsWith("/dforge-mcp");
}

function nameFromLockPath(lockPath: string): string | null {
  if (!lockPath) return null;
  const marker = "node_modules/";
  const index = lockPath.lastIndexOf(marker);
  if (index === -1) return null;
  const name = lockPath.slice(index + marker.length);
  return name || null;
}

export function collectDependencyNames(packageJson: NpmManifest, lockfile: NpmLockfile): string[] {
  const names = new Set<string>();

  const add = (name: string | undefined) => {
    if (name) names.add(name);
  };

  add(packageJson.name);
  for (const field of DEPENDENCY_FIELDS) {
    for (const name of Object.keys(packageJson[field] ?? {})) add(name);
  }
  for (const name of Object.keys(packageJson.overrides ?? {})) add(name);

  for (const [lockPath, entry] of Object.entries(lockfile.packages ?? {})) {
    add(nameFromLockPath(lockPath) ?? undefined);
    add(entry?.name);
    for (const field of DEPENDENCY_FIELDS) {
      for (const name of Object.keys(entry?.[field] ?? {})) add(name);
    }
  }

  for (const name of Object.keys(lockfile.dependencies ?? {})) add(name);

  return [...names];
}

export function findDeniedDependencies(packageJson: NpmManifest, lockfile: NpmLockfile): string[] {
  return collectDependencyNames(packageJson, lockfile)
    .filter(isDeniedPackageName)
    .sort();
}

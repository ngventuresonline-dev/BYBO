import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const srcRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

function hasKnownExt(specifier) {
  return /\.(?:[cm]?[jt]sx?|json)$/.test(specifier);
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const abs = join(srcRoot, specifier.slice(2));
    const file = hasKnownExt(abs) ? abs : `${abs}.ts`;
    if (existsSync(file)) {
      return { url: pathToFileURL(file).href, shortCircuit: true };
    }
  }

  if (specifier.startsWith(".") && !hasKnownExt(specifier)) {
    try {
      return await nextResolve(specifier, context);
    } catch (error) {
      if (error?.code === "ERR_MODULE_NOT_FOUND") {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  }

  return nextResolve(specifier, context);
}

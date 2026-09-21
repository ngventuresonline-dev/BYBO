import assert from "node:assert/strict";
import { describe, it } from "node:test";
import nextConfig from "../../next.config.ts";
import { SITE } from "./seo";

describe("security headers", () => {
  it("keeps the existing hardening headers and never grants wildcard CORS", async () => {
    assert.equal(typeof nextConfig.headers, "function");
    const rules = await nextConfig.headers!();
    const headers = rules.flatMap((rule) => rule.headers ?? []);
    const byKey = new Map(headers.map((header) => [header.key.toLowerCase(), header.value]));

    assert.equal(byKey.get("x-content-type-options"), "nosniff");
    assert.equal(byKey.get("x-frame-options"), "SAMEORIGIN");
    assert.equal(byKey.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert.equal(
      byKey.get("permissions-policy"),
      "camera=(), microphone=(), geolocation=(), payment=()",
    );
    assert.equal(
      byKey.get("strict-transport-security"),
      "max-age=63072000; includeSubDomains; preload",
    );

    const acao = byKey.get("access-control-allow-origin");
    assert.notEqual(acao, "*");
    if (acao !== undefined) {
      assert.equal(acao, SITE.url);
      assert.equal(acao.includes("*"), false);
    }
  });
});

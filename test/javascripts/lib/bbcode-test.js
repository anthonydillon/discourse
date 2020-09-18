import { parseBBCodeTag } from "pretty-text/engines/discourse-markdown/bbcode-block";

QUnit.module("lib:pretty-text:bbcode");

QUnit.test("block with multiple quoted attributes", (assert) => {
  const parsed = parseBBCodeTag(`[test one="foo" two='bar bar']`, 0, 30);

  assert.equal(parsed.tag, "test");
  assert.equal(parsed.attrs.one, "foo");
  assert.equal(parsed.attrs.two, "bar bar");
});

QUnit.test("default attribute value", (assert) => {
  const parsed = parseBBCodeTag("[test='foobar']", 0, 15);

  assert.equal(parsed.tag, "test");
  assert.equal(parsed.attrs._default, "foobar");
});

QUnit.test("default and additional attributes", (assert) => {
  const parsed = parseBBCodeTag(
    `[date=2018-09-17 time=01:39:00 format="LLL"]`,
    0,
    44
  );

  assert.equal(parsed.tag, "date");
  assert.equal(parsed.attrs._default, "2018-09-17");
  assert.equal(parsed.attrs.time, "01:39:00");
  assert.equal(parsed.attrs.format, "LLL");
});

QUnit.test("quote characters inside a another quotes", (assert) => {
  const parsed = parseBBCodeTag(
    `[test one="foo's" two='“bar”' three=“"abc's"”]`,
    0,
    46
  );

  assert.equal(parsed.tag, "test");
  assert.equal(parsed.attrs.one, "foo's");
  assert.equal(parsed.attrs.two, "“bar”");
  assert.equal(parsed.attrs.three, `"abc's"`);
});

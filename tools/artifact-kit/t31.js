/* ---------- supply chain diagram ---------- */
const NODES = {
  farm: { x: 10, y: 140, t: "Wheat farm" }, mill: { x: 195, y: 140, t: "Flour mill" },
  us: { x: 380, y: 140, t: "Our bakery chain" }, shop: { x: 565, y: 140, t: "Supermarket" },
  rival: { x: 380, y: 30, t: "Rival bakery" }, other: { x: 380, y: 250, t: "Software firm" },
};
function box(k, hi, op) {
  const n = NODES[k], w = 150, h = 50;
  return SV.rect(n.x, n.y, w, h, hi ? "f4" : "f1", { rx: 8, opacity: op === undefined ? 1 : op }) + SV.rect(n.x, n.y, w, h, "", { rx: 8, fill: "none", stroke: hi ? "var(--warn)" : "var(--accent)", "stroke-width": hi ? 3 : 1.5, opacity: op === undefined ? 1 : op })
    + SV.text(n.x + w / 2, n.y + 30, n.t, "lbl bd", { "text-anchor": "middle", opacity: op === undefined ? 1 : op });
}
function arrow(a, b, op, cls = "c3") {
  const A = NODES[a], B = NODES[b];
  let x1, y1, x2, y2;
  if (A.y === B.y) { x1 = A.x + (B.x > A.x ? 150 : 0); y1 = A.y + 25; x2 = B.x + (B.x > A.x ? 0 : 150); y2 = y1; }
  else { x1 = A.x + 75; y1 = A.y + (B.y > A.y ? 50 : 0); x2 = x1; y2 = B.y + (B.y > A.y ? 0 : 50); }
  return `<g opacity="${op}">` + SV.line(x1, y1, x2, y2, cls) + SV.arrowHead(x2, y2, x2 > x1 ? "r" : x2 < x1 ? "l" : y2 > y1 ? "d" : "u", cls === "c3" ? "dot3" : "dot2") + "</g>";
}
const flow = () => SV.text(10, 112, "Supply chain: materials  →  production  →  retail", "sm");
function chainDraw(s) {
  let o = flow();
    ["farm", "mill", "shop"].forEach((k) => (o += box(k, false)));
  o += box("us", true);
  o += box("rival", false, 0.25 + 0.75 * Math.max(s.h, 0)) + box("other", false, 0.25 + 0.75 * Math.max(s.c, 0));
  o += arrow("us", "mill", s.b); o += arrow("us", "shop", s.f); o += arrow("us", "rival", s.h); o += arrow("us", "other", s.c);
  o += SV.text(380 + 75, 14, "SAME stage", "sm bd t3", { "text-anchor": "middle", opacity: s.h });
  o += SV.text(380 + 75, 326, "UNRELATED industry", "sm bd t3", { "text-anchor": "middle", opacity: s.c });
  o += SV.text(195 + 75, 126, "BACKWARD", "sm bd t3", { "text-anchor": "middle", opacity: s.b });
  o += SV.text(565 + 75, 126, "FORWARD", "sm bd t3", { "text-anchor": "middle", opacity: s.f });
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 330, label: "Four directions of integration", base: { b: 0, f: 0, h: 0, c: 0 }, tween: 700, draw: chainDraw, steps: [
  { cap: "Our bakery chain sits in the <b>middle of a supply chain</b>: it buys flour from a mill (which buys wheat from farms) and sells bread through supermarkets. It also has rivals and could buy firms in unrelated industries.", s: { b: 0, f: 0, h: 0, c: 0 } },
  { cap: "<b>Backward vertical integration</b>: buy the flour mill. The firm moves <b>towards raw materials</b>, securing supply and quality and cutting out the supplier's profit margin.", s: { b: 1, f: 0, h: 0, c: 0 } },
  { cap: "<b>Forward vertical integration</b>: buy the retailer. The firm moves <b>towards the consumer</b>, securing outlets and keeping the retail margin.", s: { b: 0, f: 1, h: 0, c: 0 } },
  { cap: "<b>Horizontal integration</b>: merge with a rival bakery at the <b>same stage</b>. This brings economies of scale and a bigger market share, but may attract the competition authority.", s: { b: 0, f: 0, h: 1, c: 0 } },
  { cap: "<b>Conglomerate integration</b>: buy a firm in an <b>unrelated</b> industry. It spreads risk, but there is little cost saving and managers may lack expertise.", s: { b: 0, f: 0, h: 0, c: 1 } },
] });

/* ---------- principal-agent ---------- */
function paDraw(s) {
  let o = "";
  const b = (x, y, w, h, t1, t2, cls, op) => SV.rect(x, y, w, h, cls, { rx: 10, opacity: op }) + SV.text(x + w / 2, y + 28, t1, "lbl bd", { "text-anchor": "middle", opacity: op }) + SV.text(x + w / 2, y + 50, t2, "sm", { "text-anchor": "middle", opacity: op });
  o += b(40, 40, 220, 80, "Shareholders", "PRINCIPALS: the owners", "f1", 1);
  o += b(500, 40, 220, 80, "Managers", "AGENTS: run the firm", "f4", 1);
  o += SV.line(260, 80, 500, 80, "c1") + SV.arrowHead(500, 80, "r", "dot1") + SV.text(380, 70, "hire and pay", "sm", { "text-anchor": "middle" });
  o += SV.text(40, 150, "Owners want:", "lbl bd t1", { opacity: s.a }) + SV.text(40, 172, "profit and a rising share price", "lbl", { opacity: s.a });
  o += SV.text(720, 150, "Managers may want:", "lbl bd t4", { "text-anchor": "end", opacity: s.b }) + SV.text(720, 172, "pay, status, job security, a bigger firm", "lbl", { "text-anchor": "end", opacity: s.b });
  o += SV.rect(250, 190, 260, 60, "f2", { rx: 10, opacity: s.c }) + SV.text(380, 215, "Information gap", "lbl bd t2", { "text-anchor": "middle", opacity: s.c }) + SV.text(380, 236, "managers know more than owners", "sm", { "text-anchor": "middle", opacity: s.c });
  o += SV.text(380, 285, "Result: revenue or sales maximisation instead of profit", "lbl bd t2", { "text-anchor": "middle", opacity: s.d });
  o += SV.text(380, 325, "Fix: bonuses, share options, non-executive directors, audits, takeover threat", "lbl bd t3", { "text-anchor": "middle", opacity: s.e });
  return o;
}
Lib.stepper($("#stB"), { w: 760, h: 350, label: "The principal-agent problem", base: { a: 0, b: 0, c: 0, d: 0, e: 0 }, tween: 700, draw: paDraw, steps: [
  { cap: "In a large company the <b>owners (principals)</b> are not the people running it. They hire <b>managers (agents)</b> to make decisions on their behalf. This is the <b>divorce of ownership from control</b>.", s: { a: 0, b: 0, c: 0, d: 0, e: 0 } },
  { cap: "Shareholders usually want <b>profit and a rising share price</b>.", s: { a: 1, b: 0, c: 0, d: 0, e: 0 } },
  { cap: "Managers may care more about their own <b>pay, status and security</b>, which often rise with the size of the firm.", s: { a: 1, b: 1, c: 0, d: 0, e: 0 } },
  { cap: "Managers know much more about the firm than shareholders do: <b>asymmetric information</b>. They are hard to monitor.", s: { a: 1, b: 1, c: 1, d: 0, e: 0 } },
  { cap: "The firm may therefore pursue <b>revenue or sales maximisation</b> or risky takeovers, rather than the profit shareholders want.", s: { a: 1, b: 1, c: 1, d: 1, e: 0 } },
  { cap: "Shareholders can narrow the gap by <b>linking pay to profit or share price</b>, appointing non-executive directors, requiring audits and, as a last resort, selling shares so a takeover becomes likely.", s: { a: 1, b: 1, c: 1, d: 1, e: 1 } },
] });

/* ---------- explore: route chooser ---------- */
const ROUTES = {
  organic: { n: "Organic growth", hi: [], arrows: [], note: "The chain opens new branches itself.", gain: "<ul><li>Low risk, keeps control and culture</li><li>No integration costs</li><li>Funded by retained profit</li></ul>", risk: "<ul><li>Slow; rivals may grow faster</li><li>Limited by finance and market size</li></ul>" },
  backward: { n: "Backward vertical integration: buy the flour mill", arrows: ["mill"], gain: "<ul><li>Secures supply and quality</li><li>May lower input costs and protect against supplier price rises</li><li>Can deny rivals supplies</li></ul>", risk: "<ul><li>Needs milling expertise</li><li>May be costly to buy</li><li>Locked into one source even if it stops being cheapest</li></ul>" },
  forward: { n: "Forward vertical integration: buy the supermarket", arrows: ["shop"], gain: "<ul><li>Guaranteed outlet</li><li>Keeps the retailer's margin</li><li>More control over display and customer data</li></ul>", risk: "<ul><li>Retail skills are different</li><li>Other supermarkets may stop stocking the bread</li><li>Large investment</li></ul>" },
  horizontal: { n: "Horizontal integration: merge with a rival bakery", arrows: ["rival"], gain: "<ul><li>Economies of scale</li><li>Bigger market share and market power</li><li>Removes a competitor</li></ul>", risk: "<ul><li>Competition authority may investigate or block it</li><li>Culture clash, job losses</li><li>Diseconomies of scale if the firm becomes too big</li></ul>" },
  conglomerate: { n: "Conglomerate integration: buy a software firm", arrows: ["other"], gain: "<ul><li>Spreads risk across unrelated markets</li><li>Uses spare cash</li><li>Less likely to be blocked by competition rules</li></ul>", risk: "<ul><li>No expertise in the new market</li><li>Little cost saving</li><li>Managers stretched; shareholders could diversify themselves</li></ul>" },
};
function route(k) {
  const r = ROUTES[k];
  let o = flow() + ["farm", "mill", "shop", "rival", "other"].map((n) => box(n, false, 0.5)).join("") + box("us", true);
  if (r.arrows[0]) {
    o += box(r.arrows[0], true) + arrow("us", r.arrows[0], 1);
  } else {
    o += SV.text(380 + 75, 218, "grows from its own resources:", "sm bd t3", { "text-anchor": "middle" }) + SV.text(380 + 75, 234, "new shops, new products", "sm bd t3", { "text-anchor": "middle" });
  }
  $("#routeSvg").innerHTML = o;
  $("#routeName").textContent = r.n + (r.note ? ". " + r.note : "");
  $("#routeGain").innerHTML = r.gain; $("#routeRisk").innerHTML = r.risk;
  $$("#routeBtns button").forEach((b) => b.classList.toggle("pri", b.dataset.k === k));
}
Object.entries(ROUTES).forEach(([k, r]) => {
  const b = document.createElement("button"); b.className = "b"; b.dataset.k = k; b.textContent = r.n.split(":")[0]; b.onclick = () => route(k); $("#routeBtns").appendChild(b);
});
route("organic");

const CONS = [
  ["A bespoke tailor in a market town wants to open ten shops.", "Size of the market", "Demand for hand-made suits is small and local. More shops would split the same customers, so extra revenue may not cover extra costs. A better route could be online sales or a higher-priced niche."],
  ["A successful ice-cream maker wants to buy a rival but has little spare cash.", "Access to finance", "A takeover needs large funds. Options include a share issue, bank loans or private equity, each with costs: lost control, interest payments, or tougher conditions."],
  ["The owner of a family garage says: 'I do not want to answer to anyone.'", "Owner objectives", "Taking outside investors or borrowing heavily means giving up some control. If the owner values independence over profit, growth may be deliberately limited."],
  ["Two of the four biggest online retailers announce a merger.", "Regulation", "The competition authority (CMA in the UK) could investigate because it would reduce competition, and may block the deal or require some businesses to be sold."],
];
$("#constraints").innerHTML = CONS.map((c, i) => `<details class="eq"><summary>${c[0]}</summary><div class="body"><p><b>Constraint:</b> <span class="kw">${c[1]}</span></p><p>${c[2]}</p></div></details>`).join("");

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Place each case in the right group.", buckets: [{ label: "Organic" }, { label: "Forward vertical" }, { label: "Backward vertical" }, { label: "Horizontal" }, { label: "Conglomerate" }], done: "Remember the test: same stage, towards the consumer, towards the supplier, or unrelated.", items: [
  { text: "A bakery opens a new shop paid for from retained profit", b: 0 }, { text: "A restaurant chain launches a delivery app of its own", b: 0 },
  { text: "A brewer buys a chain of pubs", b: 1 }, { text: "A film studio buys a cinema chain", b: 1 },
  { text: "A car maker buys a steel producer", b: 2 }, { text: "A coffee chain buys coffee plantations", b: 2 },
  { text: "Two supermarket chains merge", b: 3 }, { text: "An airline buys a rival airline", b: 3 },
  { text: "A tobacco company buys a food company", b: 4 }, { text: "A software firm buys a clothing brand", b: 4 },
] });
Lib.classify($("#cl2"), { prompt: "Which type of organisation?", buckets: [{ label: "Private sector, profit-making" }, { label: "Public sector" }, { label: "Not-for-profit" }], items: [
  { text: "Barclays plc", b: 0 }, { text: "Self-employed plumber", b: 0 }, { text: "Unilever", b: 0 },
  { text: "A local council leisure centre", b: 1 }, { text: "A state-run hospital", b: 1 }, { text: "A state school", b: 1 },
  { text: "Cancer Research UK", b: 2 }, { text: "A social enterprise reinvesting profit in homeless support", b: 2 }, { text: "A village hall run by volunteers", b: 2 },
] });
Lib.match($("#m1"), { prompt: "Match each term to its meaning.", pairs: [
  ["Principal", "The owner who hires someone to act for them (a shareholder)"],
  ["Agent", "The person who makes decisions on the owners' behalf (a manager)"],
  ["Asymmetric information", "One party knows more than the other"],
  ["Demerger", "Splitting a firm into separate businesses"],
  ["Takeover", "One firm buying control of another"],
  ["Organic growth", "Expansion from the firm's own resources"],
] });
Lib.order($("#o1"), { prompt: "Order the chain of reasoning.", items: [
  "Shareholders (principals) hire managers (agents) to run the company",
  "Managers know more about the firm than shareholders do",
  "Managers pursue pay, status and size rather than profit",
  "The firm moves towards revenue or sales maximisation",
  "Profit and shareholder returns are lower than they could be",
], done: "A clear chain: each step causes the next." });
Lib.quiz($("#qz1"), { qs: [
  { q: "A brewer buys a chain of pubs. This is:", opts: ["Backward vertical integration", "Forward vertical integration", "Horizontal integration", "Conglomerate integration"], a: 1, why: "Pubs are nearer the consumer in the supply chain." },
  { q: "A bakery chain buys a flour mill. This is:", opts: ["Forward vertical", "Backward vertical", "Horizontal", "Organic growth"], a: 1, why: "Millers are suppliers, nearer the raw materials." },
  { q: "Which is a likely drawback of conglomerate integration?", opts: ["It makes the firm less risky", "Managers may lack expertise in the new industry", "It always removes a competitor", "It always lowers unit costs"], a: 1, why: "Unrelated businesses give little cost saving and need different skills." },
  { q: "The principal-agent problem exists because:", opts: ["Shareholders run the firm", "Managers and shareholders may have different objectives", "Firms cannot make profit", "Regulators control managers"], a: 1, why: "Owners and managers can want different things, and managers know more." },
  { q: "Which would be a constraint on growth?", opts: ["A growing market", "Easy access to cheap finance", "An owner who prefers control to expansion", "Economies of scale"], a: 2, why: "Owner objectives can limit growth." },
  { q: "Which is a reason for a demerger?", opts: ["To gain economies of scale", "To refocus on the core business", "To take over a rival", "To increase diversification"], a: 1, why: "Demergers often follow diseconomies of scale or lost focus." },
  { q: "A charity that reinvests surplus in its cause is best described as:", opts: ["Public sector", "Not-for-profit", "A monopoly", "A conglomerate"], a: 1, why: "It is private-sector but not-for-profit." },
  { q: "Which is a merger between a firm and a direct competitor?", opts: ["Horizontal", "Forward vertical", "Conglomerate", "Backward vertical"], a: 0, why: "Same stage, same industry." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Organic growth", "Expansion using the firm's own resources, such as new products or outlets."],
  ["Merger", "Two firms agree to combine into one."],
  ["Takeover (acquisition)", "One firm buys control of another, sometimes against its wishes."],
  ["Horizontal integration", "Joining with a firm at the same stage of production in the same industry."],
  ["Forward vertical integration", "Joining with a firm nearer the consumer in the supply chain."],
  ["Backward vertical integration", "Joining with a firm nearer the raw materials, such as a supplier."],
  ["Conglomerate integration", "Joining with a firm in an unrelated industry."],
  ["Principal", "The owner (shareholder) who hires someone to act on their behalf."],
  ["Agent", "The manager who acts on behalf of the owners."],
  ["Principal-agent problem", "Agents may pursue their own aims rather than the owners' aims."],
  ["Asymmetric information", "One party in a transaction knows more than the other."],
  ["Demerger", "A firm splits into two or more separate businesses."],
  ["Private sector", "Businesses owned and run by individuals or shareholders."],
  ["Public sector", "Organisations owned and controlled by the government."],
  ["Not-for-profit", "Organisations that reinvest any surplus in their aims, such as charities."],
  ["Core business", "The main activity a firm is best at and most dependent on."],
] });

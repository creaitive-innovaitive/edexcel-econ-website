const op = (v) => ({ style: "opacity:" + v });
/* AR = 40 - 2Q, MR = 40 - 4Q, MC = 4 + 2Q, TC = F + 4Q + Q^2 so AC = 4 + Q + F/Q. Profit max Q = 6, revenue max Q = 10, sales max (F = 20) Q = 11.42. */
const P2 = Plot({ xmax: 20, ymax: 42 });
const ARo = (q) => 40 - 2 * q, MRo = (q) => 40 - 4 * q, MCo = (q) => 4 + 2 * q, ACo = (F) => (q) => 4 + q + F / q;
const qSales = (F) => (36 + Math.sqrt(Math.max(0, 1296 - 12 * F))) / 6;
function curves(F, cost) {
  return P2.axes() + P2.curve(ARo, "c1", 0, 20) + P2.curve(MRo, "c3", 0, 10) + P2.label(19.5, ARo(19.5) + 2, "AR", "lbl bd t1", "end") + P2.label(9.7, 1.8, "MR", "lbl bd t3", "end")
    + P2.curve(MCo, "c4", 0, 18, op(cost)) + P2.curve(ACo(F), "c2", 1.2, 20, op(cost)) + SV.text(P2.X(17.5), P2.Y(MCo(17.5)) - 8, "MC", "lbl bd t4", { "text-anchor": "end", style: "opacity:" + cost })
    + SV.text(P2.X(19.5), P2.Y(ACo(F)(19.5)) + 22, "AC", "lbl bd t2", { "text-anchor": "end", style: "opacity:" + cost });
}
function objDraw(s) {
  const F = 20, q = s.q, p = ARo(q), c = ACo(F)(q), prof = (p - c) * q;
  let o = curves(F, s.c);
  o += `<g style="opacity:${s.e}">` + P2.rect(0, Math.min(c, p), q, Math.max(c, p), "f3", { style: "opacity:" + (prof > 1 ? 0.3 : 0) }) + P2.guide(q, p) + P2.dot(q, p) + P2.dot(q, c, "dot2", 5) + P2.ty(p, "£" + Lib.fmtN(p, 2)) + P2.tx(q, Lib.fmtN(q, 1)) + SV.text(P2.X(11), P2.Y(40), "Profit = £" + Lib.fmtN(prof, 0), "lbl bd t3", { style: "font-size:16px" }) + "</g>";
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 400, label: "Profit, revenue and sales maximisation", base: { c: 0, e: 0, q: 6 }, tween: 900, draw: objDraw, steps: [
  { cap: "A firm faces the demand curve <b>AR</b>. <b>MR</b> lies below it and is twice as steep.", s: { c: 0, e: 0, q: 6 } },
  { cap: "Add the cost curves: <b>MC</b> and <b>AC</b>. MC cuts AC at its lowest point.", s: { c: 1, e: 0, q: 6 } },
  { cap: "<b>Profit maximisation: MC = MR.</b> Output <b>6</b>, price <b>£28</b>, average cost about £13.33. Profit = (28 − 13.33) × 6 ≈ <b>£88</b>, the largest rectangle.", s: { c: 1, e: 1, q: 6 } },
  { cap: "<b>Revenue maximisation: MR = 0.</b> Output <b>10</b>, price <b>£20</b>. Total revenue is £200, but average cost is £16 so profit falls to <b>£40</b>.", s: { c: 1, e: 1, q: 10 } },
  { cap: "<b>Sales maximisation: AR = AC.</b> Output about <b>11.4</b>, price about <b>£17.20</b>. Profit is <b>zero supernormal</b> (normal profit only). This is the most the firm can sell without making a loss.", s: { c: 1, e: 1, q: qSales(20) } },
] });

/* ---------- total revenue and total cost ---------- */
const P3 = Plot({ xmax: 20, ymax: 220, xl: "Output (Q)", yl: "£" });
const TRo = (q) => 40 * q - 2 * q * q, TCo = (F) => (q) => F + 4 * q + q * q;
function trDraw(s) {
  const q = s.q, tr = TRo(q), tc = TCo(20)(q);
  let o = P3.axes() + P3.curve(TRo, "c1", 0, 20) + P3.curve(TCo(20), "c2", 0, 14.5) + P3.label(19.6, TRo(19.6) + 8, "TR", "lbl bd t1", "end") + P3.label(12.4, 210, "TC", "lbl bd t2");
  o += `<g style="opacity:${s.e}">` + P3.seg(q, 0, q, Math.max(tr, tc), "gr") + P3.seg(q, Math.min(tr, tc), q, Math.max(tr, tc), "c3", { "stroke-width": 6 }) + P3.dot(q, tr, "dot1") + P3.dot(q, tc, "dot2", 5) + P3.tx(q, Lib.fmtN(q, 1))
    + SV.text(P3.X(0.5), P3.Y(215), "TR = £" + Lib.fmtN(tr, 0) + "   TC = £" + Lib.fmtN(tc, 0) + "   Profit = £" + Lib.fmtN(tr - tc, 0), "lbl bd t3", { style: "font-size:16px" }) + "</g>";
  return o;
}
Lib.stepper($("#stB"), { w: 760, h: 400, label: "Total revenue and total cost", base: { e: 0, q: 6 }, tween: 900, draw: trDraw, steps: [
  { cap: "Total revenue (TR) rises, peaks, then falls. Total cost (TC) rises steadily. Profit is the vertical gap between them.", s: { e: 0, q: 6 } },
  { cap: "<b>Profit maximisation:</b> the gap is widest at <b>Q = 6</b> (where MC = MR). Profit £88.", s: { e: 1, q: 6 } },
  { cap: "<b>Revenue maximisation:</b> TR is highest at <b>Q = 10</b> (where MR = 0). TR is £200 but the gap to TC has narrowed to £40.", s: { e: 1, q: 10 } },
  { cap: "<b>Sales maximisation:</b> output keeps rising until TR meets TC at <b>Q ≈ 11.4</b> (AR = AC). Beyond this the firm would make a loss.", s: { e: 1, q: qSales(20) } },
] });

/* ---------- lab 1 ---------- */
function lab1() {
  if (!$("#lq")) return;
  const q = +$("#lq").value, p = ARo(q), tr = TRo(q), tc = TCo(20)(q), pr = tr - tc;
  $("#a1").textContent = "£" + Lib.fmtN(p, 2); $("#a2").textContent = "£" + Lib.fmtN(tr, 0); $("#a3").textContent = "£" + Lib.fmtN(tc, 0); $("#a4").textContent = (pr >= 0 ? "£" : "−£") + Lib.fmtN(Math.abs(pr), 0);
  const near = (x) => Math.abs(q - x) < 0.3;
  $("#av").textContent = near(6) ? "This is profit maximisation (MC = MR): the widest gap between TR and TC." : near(10) ? "This is revenue maximisation (MR = 0): TR is at its peak, but profit is lower." : near(11.4) ? "This is sales maximisation (AR = AC): TR = TC, so only normal profit." : pr < 0 ? "Beyond sales maximisation the firm makes a loss." : q < 6 ? "Below the profit-maximising output: more output would raise profit." : "Above profit maximisation: extra output now adds more to cost than to revenue.";
  $("#lab1").innerHTML = P3.axes() + P3.curve(TRo, "c1", 0, 20) + P3.curve(TCo(20), "c2", 0, 14.5) + P3.seg(q, 0, q, Math.max(tr, tc), "gr") + P3.seg(q, Math.min(tr, tc), q, Math.max(tr, tc), pr >= 0 ? "c3" : "c2", { "stroke-width": 6 }) + P3.dot(q, tr, "dot1") + P3.dot(q, tc, "dot2", 5) + P3.tx(q, Lib.fmtN(q, 1))
    + P3.label(19.6, TRo(19.6) + 8, "TR", "lbl bd t1", "end") + P3.label(12.4, 210, "TC", "lbl bd t2");
}
Lib.slider($("#g1"), { id: "lq", label: "Output (Q)", min: 1, max: 16, step: 0.5, value: 6, fmt: (v) => v, onInput: lab1 });

/* ---------- lab 2 ---------- */
function lab2() {
  if (!$("#lf")) return;
  const F = +$("#lf").value, pm = 108 - F, qs = qSales(F), ok = 1296 - 12 * F >= 0, rv = 60 - F;
  $("#b1").textContent = "6"; $("#b2").textContent = (pm >= 0 ? "£" : "−£") + Lib.fmtN(Math.abs(pm), 0); $("#b3").textContent = ok ? Lib.fmtN(qs, 1) : "none"; $("#b4").textContent = (rv >= 0 ? "£" : "−£") + Lib.fmtN(Math.abs(rv), 0);
  $("#bv").textContent = !ok ? "Fixed costs are so high that AC never meets AR: the firm cannot break even at any output." : F === 20 ? "Starting point: profit max £88, sales max output 11.4." : "Higher fixed costs lower profit at every output but leave MC and the profit-maximising output (6) unchanged. The sales-maximising output falls as AC shifts up.";
  $("#lab2").innerHTML = curves(F, 1) + P2.dot(6, ARo(6)) + P2.tx(6, "6", "sm bd t3") + (ok ? P2.dot(qs, ARo(qs), "dot2", 6) + P2.tx(qs, Lib.fmtN(qs, 1), "sm bd t2") : "");
}
Lib.slider($("#g2"), { id: "lf", label: "Fixed costs (£)", min: 0, max: 100, step: 5, value: 20, fmt: (v) => "£" + v, onInput: lab2 });

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Which objective does each statement describe?", buckets: [{ label: "Profit maximisation" }, { label: "Revenue maximisation" }, { label: "Sales maximisation" }, { label: "Satisficing" }], items: [
  { text: "Output where MC = MR", b: 0 }, { text: "Highest price of the three objectives", b: 0 },
  { text: "Output where MR = 0", b: 1 }, { text: "Manager's pay is linked to turnover", b: 1 },
  { text: "Output where AR = AC", b: 2 }, { text: "Lowest price without making a loss", b: 2 },
  { text: "A small-business owner content with enough income", b: 3 }, { text: "A manager balancing profit with staff and community aims", b: 3 },
] });
Lib.match($("#m1"), { prompt: "Match the objective to its rule.", pairs: [
  ["Profit maximisation", "MC = MR"],
  ["Revenue maximisation", "MR = 0"],
  ["Sales maximisation", "AR = AC"],
  ["Normal profit", "AR = AC, the minimum to stay in the industry"],
  ["Supernormal profit", "AR > AC"],
  ["Satisficing", "Aiming for a satisfactory, not maximum, profit"],
] });
Lib.order($("#o1"), { prompt: "Order the steps for showing profit maximisation on a diagram.", items: [
  "Draw AR and MR (MR twice as steep)",
  "Add MC and AC (MC cuts AC at its minimum)",
  "Find output where MC = MR",
  "Go up to AR to read the price",
  "Read AC at that output",
  "Shade profit = (AR − AC) × Q",
], done: "MC = MR gives output; AR gives price; AC gives cost." });
Lib.calc($("#c1"), { qs: [
  { q: "A firm sells 6 units at £28 with average cost £13.33. Calculate profit to the nearest pound (£).", a: 88, tol: 0.6, sol: "(28 − 13.33) × 6 ≈ <b>£88</b>." },
  { q: "At revenue maximisation the firm sells 10 units at £20 with average cost £16. Calculate profit (£).", a: 40, sol: "(20 − 16) × 10 = <b>£40</b>." },
  { q: "Demand is AR = 40 − 2Q. Calculate MR at Q = 5 using MR = 40 − 4Q (£).", a: 20, sol: "MR = 40 − 20 = <b>£20</b>." },
  { q: "Demand is AR = 40 − 2Q. At what output is total revenue maximised? (MR = 0)", a: 10, sol: "40 − 4Q = 0, so Q = <b>10</b>." },
  { q: "Fixed costs rise by £30. By how much does profit at the profit-maximising output change (£)? Enter the change as a number (a fall is negative).", a: -30, sol: "Fixed costs do not affect MC or output, so profit falls by exactly <b>£30</b>." },
] });
Lib.quiz($("#qz1"), { qs: [
  { q: "Profit is maximised where:", opts: ["MR = 0", "MC = MR", "AR = AC", "MC = AC"], a: 1, why: "MC = MR." },
  { q: "Total revenue is maximised where:", opts: ["MC = MR", "MR = 0", "AR = AC", "AC is lowest"], a: 1, why: "When MR is zero, extra sales add no revenue." },
  { q: "A sales-maximising firm (with no loss) produces where:", opts: ["MR = 0", "MC = MR", "AR = AC", "MC = 0"], a: 2, why: "AR = AC: only normal profit." },
  { q: "Compared with profit maximisation, sales maximisation gives:", opts: ["Higher price, lower output", "Lower price, higher output", "Higher price, higher output", "Same output"], a: 1, why: "The firm moves down the demand curve." },
  { q: "Why might managers prefer revenue maximisation?", opts: ["Their pay and status may rise with firm size", "It always maximises profit", "Shareholders demand it", "It reduces costs"], a: 0, why: "A principal-agent problem." },
  { q: "Satisficing means aiming for:", opts: ["Maximum profit", "A satisfactory level of profit", "Maximum revenue", "Zero profit"], a: 1, why: "Enough profit to keep owners content." },
  { q: "A revenue-maximising firm operates on the part of demand that is:", opts: ["Inelastic", "Elastic or unit elastic", "Perfectly inelastic", "Perfectly elastic only"], a: 1, why: "MR ≥ 0 means PED ≥ 1." },
  { q: "A rise in fixed costs, with MC unchanged, will:", opts: ["Change the profit-maximising output", "Reduce profit but leave the profit-maximising output unchanged", "Shift MC up", "Raise price"], a: 1, why: "Fixed costs shift AC, not MC." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Profit maximisation", "Producing where MC = MR to earn the largest gap between revenue and cost."],
  ["Revenue maximisation", "Producing where MR = 0 so that total revenue is highest."],
  ["Sales (output) maximisation", "Selling as much as possible without making a loss: AR = AC."],
  ["Satisficing", "Aiming for a satisfactory rather than maximum profit."],
  ["Normal profit", "Minimum profit to keep the firm in the industry: AR = AC."],
  ["Supernormal profit", "Profit above normal profit: AR > AC."],
  ["Principal-agent problem", "Managers (agents) may pursue aims different from owners (principals)."],
  ["Marginal revenue", "Extra revenue from selling one more unit."],
  ["Marginal cost", "Extra cost of producing one more unit."],
  ["Corporate social responsibility", "A firm's attention to social and environmental aims as well as profit."],
  ["Stakeholder", "Anyone affected by a firm: owners, workers, customers, suppliers, the community."],
] });
lab1(); lab2();

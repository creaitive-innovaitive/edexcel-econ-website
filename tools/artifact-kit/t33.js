const op = (v) => ({ style: "opacity:" + v });
/* Short-run costs with fixed cost F = 60: AVC = 0.05Q^2 - Q + 11 (min £6 at Q = 10), MC = 0.15Q^2 - 2Q + 11, AFC = 60/Q, AC = AVC + AFC. */
const F0 = 60;
const AVCf = (q) => 0.05 * q * q - q + 11, MCf = (q) => 0.15 * q * q - 2 * q + 11, AFCf = (q) => F0 / q, ACf = (q) => AVCf(q) + F0 / q;
let QMIN = 13; for (let q = 5; q < 24; q += 0.01) if (ACf(q) < ACf(QMIN)) QMIN = q;
const ACMIN = ACf(QMIN);
const PC = Plot({ xmax: 24, ymax: 24 });
const qFor = (p) => (p < 4.34 ? 0 : (2 + Math.sqrt(Math.max(0, 4 - 0.6 * (11 - p)))) / 0.3);

/* ---------- 1. cost curves ---------- */
function costDraw(s) {
  let o = PC.axes();
  o += PC.curve(MCf, "c4", 0, 24, op(s.mc)) + SV.text(PC.X(17.6), PC.Y(MCf(17.6)) - 6, "MC", "lbl bd t4", { "text-anchor": "end", style: "opacity:" + s.mc });
  o += PC.curve(AVCf, "c3", 0, 24, op(s.avc)) + SV.text(PC.X(23.5), PC.Y(AVCf(23.5)) + 20, "AVC", "lbl bd t3", { "text-anchor": "end", style: "opacity:" + s.avc });
  o += PC.curve(AFCf, "c1", 3, 24, op(s.afc)) + SV.text(PC.X(8), PC.Y(AFCf(8)) - 8, "AFC", "lbl bd t1", { style: "opacity:" + s.afc });
  o += PC.curve(ACf, "c2", 4, 24, op(s.ac)) + SV.text(PC.X(23.5), PC.Y(ACf(23.5)) - 8, "AC", "lbl bd t2", { "text-anchor": "end", style: "opacity:" + s.ac });
  o += `<g style="opacity:${s.d1}">` + PC.dot(10, 6, "dot3") + PC.ty(6, "£6") + PC.tx(10, "10") + "</g>";
  o += `<g style="opacity:${s.d2}">` + PC.dot(QMIN, ACMIN, "dot2") + PC.ty(ACMIN, "£" + Lib.fmtN(ACMIN, 2)) + PC.tx(QMIN, Lib.fmtN(QMIN, 1)) + "</g>";
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 400, label: "Short-run cost curves", base: { mc: 0, avc: 0, afc: 0, ac: 0, d1: 0, d2: 0 }, tween: 800, draw: costDraw, steps: [
  { cap: "In the short run one factor is fixed. At first extra workers add more and more output (specialisation): <b>marginal cost falls</b>. Then <b>diminishing marginal productivity</b> sets in: <b>marginal cost rises</b>. MC is U-shaped.", s: { mc: 1, avc: 0, afc: 0, ac: 0, d1: 0, d2: 0 } },
  { cap: "<b>Average variable cost (AVC)</b> is U-shaped too. <b>MC cuts AVC at its lowest point</b> (output 10, £6): below it MC pulls the average down, above it MC drags it up.", s: { mc: 1, avc: 1, afc: 0, ac: 0, d1: 1, d2: 0 } },
  { cap: "<b>Average fixed cost (AFC)</b> = fixed cost ÷ output. It falls all the way as fixed costs are spread over more units.", s: { mc: 1, avc: 1, afc: 1, ac: 0, d1: 1, d2: 0 } },
  { cap: "<b>Average cost (AC) = AVC + AFC.</b> The gap between AC and AVC is AFC, which shrinks as output rises. MC cuts AC at its minimum (about £11.06 at output 13.4), to the right of AVC's minimum.", s: { mc: 1, avc: 1, afc: 1, ac: 1, d1: 1, d2: 1 } },
] });

/* ---------- 2. long-run average cost ---------- */
const PLr = Plot({ xmax: 60, ymax: 16, xl: "Output (Q)", yl: "Cost per unit (£)" });
const SR = [[10, 12, 0.07], [22, 9, 0.035], [34, 7.2, 0.025], [46, 7, 0.02], [58, 7.6, 0.02]];
const srac = (k) => (q) => SR[k][1] + SR[k][2] * (q - SR[k][0]) ** 2;
const lrac = (q) => Math.min(...SR.map((_, k) => srac(k)(q)));
function lrDraw(s) {
  let o = PLr.axes();
  SR.forEach((_, k) => { o += PLr.curve(srac(k), "c1", Math.max(0, SR[k][0] - 18), SR[k][0] + 18, op(clamp01(s.k - k) * 0.7)); });
  o += PLr.curve(lrac, "c2", 0, 60, { style: "opacity:" + s.l, "stroke-width": 5 });
  o += SV.text(PLr.X(13), PLr.Y(15.5), "SRAC curves (each one fixed scale)", "sm", { style: "opacity:" + clamp01(s.k) });
  o += `<g style="opacity:${s.m}">` + PLr.dot(46, 7, "dot2", 7) + PLr.tx(46, "MES", "sm bd t2") + PLr.ty(7, "£7", "sm bd t2") + SV.text(PLr.X(10), PLr.Y(6.2), "Economies of scale", "lbl bd t3", { "text-anchor": "middle" }) + SV.text(PLr.X(56), PLr.Y(9.2), "Diseconomies", "lbl bd t2", { "text-anchor": "middle" }) + "</g>";
  o += SV.text(PLr.X(59), PLr.Y(lrac(59)) - 10, "LRAC", "lbl bd t2", { "text-anchor": "end", style: "opacity:" + s.l });
  return o;
}
function clamp01(v) { return Math.max(0, Math.min(1, v)); }
Lib.stepper($("#stB"), { w: 760, h: 400, label: "Long-run average cost", base: { k: 1, l: 0, m: 0 }, tween: 900, draw: lrDraw, steps: [
  { cap: "A firm with a small plant has the <b>short-run average cost curve</b> SRAC₁. Its scale of capital is fixed.", s: { k: 1, l: 0, m: 0 } },
  { cap: "In the long run the firm can build a bigger plant, which gives a new SRAC, with lower costs at higher output.", s: { k: 2, l: 0, m: 0 } },
  { cap: "Each scale of plant has its own SRAC curve. Larger plants allow lower costs at higher output, up to a point.", s: { k: 5, l: 0, m: 0 } },
  { cap: "The <b>long-run average cost curve (LRAC)</b> is the <b>lower envelope</b>: the cheapest way to produce each output when every factor can change.", s: { k: 5, l: 1, m: 0 } },
  { cap: "LRAC falls (<b>economies of scale</b>) until the <b>minimum efficient scale (MES)</b>, then flattens and rises (<b>diseconomies of scale</b>) as the firm becomes too big to manage well.", s: { k: 5, l: 1, m: 1 } },
] });

/* ---------- 3. shut-down ---------- */
function sdDraw(s) {
  const p = s.p, q = qFor(p), c = ACf(Math.max(q, 0.1)), v = AVCf(q);
  let o = PC.axes() + PC.curve(MCf, "c4", 0, 24) + PC.curve(AVCf, "c3", 0, 24) + PC.curve(ACf, "c2", 4, 24)
    + PC.label(17.6, MCf(17.6) + 0.7, "MC", "lbl bd t4", "end") + PC.label(23.5, AVCf(23.5) - 1.6, "AVC", "lbl bd t3", "end") + PC.label(23.5, ACf(23.5) + 0.8, "AC", "lbl bd t2", "end");
  o += PC.seg(0, p, 24, p, "c1") + PC.label(24, p + 0.8, "AR = MR = P", "lbl bd t1", "end");
  if (p >= 6 && q > 0) {
    o += PC.rect(0, Math.min(p, c), q, Math.max(p, c), p >= c ? "f3" : "f2", { style: "opacity:.3" }) + PC.guide(q, p) + PC.dot(q, p) + PC.tx(q, Lib.fmtN(q, 1)) + PC.ty(p, "£" + Lib.fmtN(p, 2));
    o += SV.text(PC.X(1), PC.Y(23), p >= c - 0.02 ? (p > c + 0.02 ? "Supernormal profit" : "Normal profit") : "Loss, but AR ≥ AVC: keep producing", "lbl bd " + (p >= c - 0.02 ? "t3" : "t2"), { style: "font-size:16px" });
  } else o += SV.text(PC.X(1), PC.Y(23), "AR < AVC: shut down in the short run", "lbl bd t2", { style: "font-size:16px" });
  return o;
}
Lib.stepper($("#stC"), { w: 760, h: 400, label: "Profit, loss and shut-down", base: { p: 14 }, tween: 900, draw: sdDraw, steps: [
  { cap: "The market price is <b>£14</b>. The firm sets <b>MC = MR</b> and produces about 15 units. Price is above AC, so it earns <b>supernormal profit</b>.", s: { p: 14 } },
  { cap: "Price falls to <b>£11.06</b>, the minimum of AC. AR = AC: only <b>normal profit</b>. The firm covers all costs including the owner's minimum reward.", s: { p: ACMIN } },
  { cap: "Price falls to <b>£8.50</b>. AR is below AC (a loss) but above AVC. The firm covers all <b>variable</b> costs and part of its <b>fixed</b> costs, so in the <b>short run it keeps producing</b>. In the long run it would leave.", s: { p: 8.5 } },
  { cap: "At <b>£6</b> price equals the minimum of AVC: the <b>short-run shut-down point</b>. Any lower and the firm loses more by producing than by closing.", s: { p: 6 } },
  { cap: "At <b>£5</b> AR is below AVC. The firm <b>shuts down</b> in the short run: it loses only its fixed costs (£60) instead of more.", s: { p: 5 } },
] });

/* ---------- lab 1: revenue ---------- */
const P1 = Plot({ xmax: 20, ymax: 42 });
function lab1() {
  if (!$("#lq")) return;
  const q = +$("#lq").value, p = 40 - 2 * q, tr = p * q, mr = 40 - 4 * q, ped = q === 0 ? Infinity : p / (2 * q);
  $("#a1").textContent = "£" + Lib.fmtN(p, 1); $("#a2").textContent = "£" + Lib.fmtN(tr, 0); $("#a3").textContent = (mr < 0 ? "−£" : "£") + Lib.fmtN(Math.abs(mr), 0); $("#a4").textContent = Lib.fmtN(ped, 2);
  $("#av").textContent = mr > 0.01 ? "MR is positive: demand is elastic (PED > 1). Cutting price raises total revenue." : Math.abs(mr) <= 0.01 ? "MR = 0: demand is unit elastic (PED = 1). Total revenue is at its maximum." : "MR is negative: demand is inelastic (PED < 1). Cutting price lowers total revenue.";
  $("#lab1").innerHTML = P1.axes() + P1.curve((x) => 40 - 2 * x, "c1", 0, 20) + P1.curve((x) => 40 - 4 * x, "c3", 0, 10) + P1.label(19.6, 3, "AR = D", "lbl bd t1", "end") + P1.label(9.7, 1.8, "MR", "lbl bd t3", "end")
    + P1.rect(0, 0, q, p, "f1", { style: "opacity:.15" }) + P1.guide(q, p) + P1.dot(q, p) + (mr >= 0 ? P1.dot(q, mr, "dot3", 5) : "") + P1.ty(p, "£" + Lib.fmtN(p, 1)) + P1.tx(q, Lib.fmtN(q, 1))
    + SV.text(P1.X(11), P1.Y(40), "Total revenue = £" + Lib.fmtN(tr, 0), "lbl bd t1", { style: "font-size:16px" });
}
Lib.slider($("#g1"), { id: "lq", label: "Quantity (Q)", min: 1, max: 19, step: 1, value: 5, fmt: (v) => v, onInput: lab1 });

/* ---------- lab 2: shut-down ---------- */
function lab2() {
  if (!$("#lp")) return;
  const p = +$("#lp").value, q = qFor(p), shut = p < 6 || q === 0, c = ACf(Math.max(q, 0.1)), v = AVCf(q), prof = shut ? -F0 : (p - c) * q;
  $("#b1").textContent = shut ? "0 (shut down)" : Lib.fmtN(q, 1); $("#b2").textContent = (prof >= 0 ? "£" : "−£") + Lib.fmtN(Math.abs(prof), 1);
  $("#b3").textContent = shut ? "AR < AVC" : p >= v ? "AR ≥ AVC" : "AR < AVC"; $("#b4").textContent = shut ? "AR < AC" : p > c + 0.02 ? "AR > AC" : p >= c - 0.02 ? "AR = AC" : "AR < AC";
  $("#bv").textContent = shut ? "Price is below the minimum AVC (£6). Producing would lose more than the fixed costs, so the firm shuts down in the short run and loses only £60." : p > c + 0.02 ? "Supernormal profit. In a competitive market this attracts entry in the long run." : p >= c - 0.02 ? "Normal profit: AR = AC." : "A loss, but price covers AVC, so the firm keeps producing in the short run to reduce its loss. In the long run it would leave.";
  const c2 = shut ? 0 : q;
  $("#lab2").innerHTML = PC.axes() + PC.curve(MCf, "c4", 0, 24) + PC.curve(AVCf, "c3", 0, 24) + PC.curve(ACf, "c2", 4, 24) + PC.seg(0, p, 24, p, "c1") + PC.label(24, p + 0.8, "P", "lbl bd t1", "end")
    + (shut ? "" : PC.rect(0, Math.min(p, c), c2, Math.max(p, c), p >= c ? "f3" : "f2", { style: "opacity:.3" }) + PC.guide(c2, p) + PC.dot(c2, p) + PC.tx(c2, Lib.fmtN(c2, 1)))
    + PC.label(17.6, MCf(17.6) + 0.7, "MC", "lbl bd t4", "end") + PC.label(23.5, AVCf(23.5) - 1.6, "AVC", "lbl bd t3", "end") + PC.label(23.5, ACf(23.5) + 0.8, "AC", "lbl bd t2", "end");
}
Lib.slider($("#g2"), { id: "lp", label: "Price (£)", min: 3, max: 14, step: 0.25, value: 9, fmt: (v) => "£" + v.toFixed(2), onInput: lab2 });

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Fixed or variable cost for a bakery?", buckets: [{ label: "Fixed cost" }, { label: "Variable cost" }], items: [
  { text: "Rent of the shop", b: 0 }, { text: "Insurance", b: 0 }, { text: "Loan repayments on the oven", b: 0 },
  { text: "Flour and sugar", b: 1 }, { text: "Energy used for baking", b: 1 }, { text: "Hourly wages of bakers", b: 1 }, { text: "Packaging", b: 1 },
] });
Lib.classify($("#cl2"), { prompt: "Economy or diseconomy of scale?", buckets: [{ label: "Economy of scale" }, { label: "Diseconomy of scale" }], items: [
  { text: "Bulk-buying discounts", b: 0 }, { text: "Large machines only worth buying at high output", b: 0 }, { text: "Cheaper borrowing for a large firm", b: 0 }, { text: "A cluster of specialist suppliers near the firm", b: 0 },
  { text: "Communication breaks down in a very large firm", b: 1 }, { text: "Workers feel remote and motivation falls", b: 1 }, { text: "Congestion and rising rents in a crowded industrial area", b: 1 },
] });
Lib.match($("#m1"), { prompt: "Match the condition to what it means.", pairs: [
  ["AR = AC", "Normal profit"],
  ["AR > AC", "Supernormal profit"],
  ["AR < AC but AR ≥ AVC", "Loss, but keep producing in the short run"],
  ["AR < AVC", "Shut down in the short run"],
  ["AR < AC in the long run", "Leave the industry"],
  ["MC = MR", "Profit-maximising output"],
] });
Lib.order($("#o1"), { prompt: "Order the logic of a short-run shut-down decision.", items: [
  "Find the output where MC = MR",
  "Compare AR with AC at that output",
  "AR is below AC: the firm is making a loss",
  "Compare AR with AVC",
  "AR is above AVC: it covers variable costs and part of fixed costs, so keep producing",
], done: "Compare with AVC in the short run; compare with AC in the long run." });
Lib.calc($("#c1"), { qs: [
  { q: "A firm sells 50 units at £12 each. Calculate total revenue (£).", a: 600, sol: "TR = P × Q = 12 × 50 = <b>£600</b>." },
  { q: "Total cost is £480 for 40 units. Calculate average cost (£).", a: 12, sol: "AC = 480 ÷ 40 = <b>£12</b>." },
  { q: "TFC is £60 and TVC is £180 at an output of 30. Calculate average total cost (£).", a: 8, sol: "TC = 240, so AC = 240 ÷ 30 = <b>£8</b>." },
  { q: "Total cost rises from £500 to £530 when output rises from 100 to 102 units. Calculate marginal cost (£).", a: 15, sol: "MC = 30 ÷ 2 = <b>£15</b>." },
  { q: "A firm sells 80 units at £9 with average cost £7.50. Calculate profit (£).", a: 120, sol: "(9 − 7.50) × 80 = <b>£120</b>." },
  { q: "A firm's AVC is £6, AFC is £4 and price is £9. Calculate profit per unit (£). A negative answer means a loss.", a: -1, sol: "AC = 10, so profit per unit = 9 − 10 = <b>−£1</b>. Price exceeds AVC, so it should keep producing in the short run." },
] });
Lib.quiz($("#qz1"), { qs: [
  { q: "For a firm facing a downward-sloping demand curve, MR is:", opts: ["Equal to AR", "Below AR", "Above AR", "Always zero"], a: 1, why: "Cutting price applies to all units, so MR is below AR." },
  { q: "Total revenue is at its maximum where:", opts: ["MR = MC", "MR = 0", "AR = AC", "MC = AC"], a: 1, why: "At MR = 0 demand is unit elastic." },
  { q: "AC = ", opts: ["AVC − AFC", "AVC + AFC", "TC × Q", "MC + AFC"], a: 1, why: "Average cost is the sum of average variable and average fixed cost." },
  { q: "MC cuts AC at:", opts: ["Its maximum", "Its minimum", "Any point", "Never"], a: 1, why: "MC pulls the average down when below and up when above." },
  { q: "The U-shape of MC is caused by:", opts: ["Economies of scale", "Diminishing marginal productivity", "Fixed costs", "Inflation"], a: 1, why: "More workers eventually add less to output." },
  { q: "The long-run average cost curve is:", opts: ["The upper envelope of SRACs", "The lower envelope of SRACs", "Always flat", "The same as MC"], a: 1, why: "It shows the lowest cost of each output when all factors can vary." },
  { q: "Which is an external economy of scale?", opts: ["Bulk buying by one firm", "A pool of skilled workers near an industry cluster", "A larger machine", "A bigger marketing budget"], a: 1, why: "External economies depend on the size of the industry." },
  { q: "In the short run a firm should shut down if:", opts: ["AR < AC", "AR < AVC", "AR < MC", "AR = AC"], a: 1, why: "It then fails to cover even its variable costs." },
  { q: "Normal profit occurs where:", opts: ["AR > AC", "AR = AC", "AR < AC", "MC = MR"], a: 1, why: "AR = AC." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Total revenue (TR)", "Price × quantity."],
  ["Average revenue (AR)", "TR ÷ Q; equal to price and the firm's demand curve."],
  ["Marginal revenue (MR)", "Extra revenue from selling one more unit."],
  ["Total fixed cost (TFC)", "Costs that do not change with output, such as rent."],
  ["Total variable cost (TVC)", "Costs that change with output, such as materials."],
  ["Average cost (AC)", "Total cost ÷ output: AVC + AFC."],
  ["Marginal cost (MC)", "Extra cost of producing one more unit."],
  ["Diminishing marginal productivity", "Beyond a point, extra workers add less to output when another factor is fixed."],
  ["Short run", "A period in which at least one factor is fixed."],
  ["Long run", "A period in which all factors can be varied."],
  ["Economies of scale", "A fall in long-run average cost as output rises."],
  ["Diseconomies of scale", "A rise in long-run average cost as output rises."],
  ["Minimum efficient scale (MES)", "The lowest output at which LRAC is at its minimum."],
  ["Normal profit", "The minimum profit needed to keep the firm in the industry: AR = AC."],
  ["Supernormal profit", "Profit above normal profit: AR > AC."],
  ["Shut-down point", "Short run: AR < AVC. Long run: AR < AC."],
] });
lab1(); lab2();

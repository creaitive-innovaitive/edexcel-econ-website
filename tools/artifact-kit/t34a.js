/* Cost model: AC = 0.05(q-10)^2 + 6 (min 6 at q=10); MC = 0.15q^2 - 2q + 11 cuts AC at its minimum. */
const AC = (q) => 0.05 * (q - 10) ** 2 + 6, MC = (q) => 0.15 * q * q - 2 * q + 11;
const PL = Plot({ xmax: 24, ymax: 16 });
const base = () => PL.axes() + PL.curve(AC, "c2", 0.5, 24) + PL.curve(MC, "c4", 0.5, 24)
  + PL.label(22.2, 15.2, "AC", "lbl bd t2", "end") + PL.label(14.4, 15.2, "MC", "lbl bd t4", "end");
const qPC = (p) => (2 + Math.sqrt(Math.max(0, 4 - 0.6 * (11 - p)))) / 0.3;

/* ---------- 1. perfect competition ---------- */
function pcDraw(s) {
  const p = s.p, q = qPC(p), c = AC(q), prof = (p - c) * q;
  let o = base();
  o += PL.rect(0, c, q, p, prof >= 0 ? "f3" : "f2", { style: "opacity:" + 0.2 * s.pr });
  o += PL.seg(0, p, 24, p, "c1") + PL.label(24, p + 0.5, "AR = MR = P", "lbl bd t1", "end");
  o += PL.guide(q, p) + PL.dot(q, p, "dot1") + PL.dot(q, c, "dot2", 5);
  o += PL.ty(p, "£" + Lib.fmtN(p, 2)) + PL.tx(q, Lib.fmtN(q, 1)) + PL.ty(c, "£" + Lib.fmtN(c, 2));
  if (s.pr > 0.5 && prof > 0.5) o += SV.text(PL.X(q / 2), PL.Y((p + c) / 2) + 5, "Supernormal profit", "lbl bd t3", { "text-anchor": "middle" });
  if (s.pr > 0.5 && Math.abs(prof) < 0.5) o += SV.text(PL.X(q) + 6, PL.Y(c) - 30, "Normal profit: P = MC = min AC", "lbl bd t3");
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 400, label: "Perfect competition, short run to long run", base: { p: 9, pr: 0 }, tween: 1300, draw: pcDraw, steps: [
  { cap: "A perfectly competitive firm takes the <b>market price</b> (£9). Its demand curve is horizontal, so <b>AR = MR = P</b>. It maximises profit where <b>MC = MR</b>.", s: { p: 9, pr: 0 } },
  { cap: "At that output (about 12) price is above average cost (about £6.25). The shaded rectangle, (AR − AC) × Q, is <b>supernormal profit</b>.", s: { p: 9, pr: 1 } },
  { cap: "There are <b>no barriers to entry</b> and information is perfect. New firms enter, <b>market supply shifts right</b>, and the market price falls. The firm's AR = MR line drops.", s: { p: 7.5, pr: 1 } },
  { cap: "Entry continues until price equals the <b>minimum of AC</b> (£6). Only <b>normal profit</b> is earned. At output 10: <b>P = MC = AC</b>, so the firm is <b>allocatively and productively efficient</b>.", s: { p: 6, pr: 1 } },
  { cap: "If price fell <b>below</b> AC the firm would make a <b>loss</b>; firms would leave, supply would shift left and price would rise back to £6.", s: { p: 5, pr: 1 } },
] });

/* ---------- 2. monopolistic competition ---------- */
const qMC = (a) => (1 + Math.sqrt(Math.max(0, 1 - 0.6 * (11 - a)))) / 0.3;
function mcDraw(s) {
  const a = s.a, q = qMC(a), p = a - 0.5 * q, c = AC(q), prof = (p - c) * q;
  const AR = (x) => a - 0.5 * x, MR = (x) => a - x;
  let o = base();
  o += PL.rect(0, c, q, p, "f3", { style: "opacity:" + 0.2 * s.pr * (prof > 0.3 ? 1 : 0) });
  o += PL.curve(AR, "c1", 0, 24) + PL.curve(MR, "c3", 0, 24) + PL.label(Math.min(22, 2 * a - 1), AR(Math.min(22, 2 * a - 1)) + 0.7, "AR", "lbl bd t1", "end") + PL.label(Math.min(a - 1.5, 22), 0.8, "MR", "lbl bd t3", "end");
  o += PL.guide(q, p) + PL.dot(q, p, "dot1") + PL.dot(q, c, "dot2", 5) + PL.ty(p, "£" + Lib.fmtN(p, 2)) + PL.ty(c, "£" + Lib.fmtN(c, 2)) + PL.tx(q, Lib.fmtN(q, 1));
  if (s.pr > 0.5 && prof > 0.3) o += SV.text(PL.X(q / 2), PL.Y((p + c) / 2) + 5, "Supernormal profit", "lbl bd t3", { "text-anchor": "middle" });
  if (a < 10) o += SV.text(PL.X(q) + 12, PL.Y(c) - 16, "AR tangent to AC", "lbl bd t3");
  return o;
}
Lib.stepper($("#stB"), { w: 760, h: 400, label: "Monopolistic competition, entry erodes profit", base: { a: 15, pr: 1 }, tween: 1300, draw: mcDraw, steps: [
  { cap: "A firm with a <b>differentiated</b> product faces a <b>downward-sloping AR</b>, with MR below it. It produces where <b>MC = MR</b> (about 9.5 units) and reads price off AR.", s: { a: 15, pr: 1 } },
  { cap: "Price (about £10.30) is well above AC (£6), so the firm earns <b>supernormal profit</b>. Because barriers to entry are low, other firms notice.", s: { a: 15, pr: 1 } },
  { cap: "New firms enter with similar (but differentiated) products. Each firm loses some customers, so <b>AR and MR shift left</b> and become more elastic.", s: { a: 12.5, pr: 1 } },
  { cap: "Entry stops when AR just <b>touches AC</b> (tangent) at output 5 and price £7.25: <b>normal profit</b>. Price is above MC and output is below the minimum-AC output of 10.", s: { a: 9.75, pr: 1 } },
  { cap: "<b>Conclusion:</b> neither <b>allocatively</b> (P &gt; MC) nor <b>productively</b> efficient (excess capacity), but consumers get <b>variety</b> and firms may innovate to differentiate.", s: { a: 9.75, pr: 1 } },
] });

/* ---------- labs ---------- */
function lab1() {
  if (!$("#lp")) return;
  const p = +$("#lp").value, q = qPC(p), c = AC(q), pu = p - c;
  $("#a1").textContent = Lib.fmtN(q, 1); $("#a2").textContent = "£" + Lib.fmtN(pu, 2); $("#a3").textContent = "£" + Lib.fmtN(pu * q, 1);
  $("#av").textContent = Math.abs(pu) < 0.02 ? "Price = MC = minimum AC: normal profit, allocative and productive efficiency. This is the long-run equilibrium." : pu > 0 ? "Supernormal profit. In the long run new firms enter and push the price down." : "A loss. In the long run firms leave and push the price up.";
  let o = base() + PL.rect(0, c, q, p, pu >= 0 ? "f3" : "f2") + PL.seg(0, p, 24, p, "c1") + PL.label(24, p + 0.5, "AR = MR = P", "lbl bd t1", "end") + PL.guide(q, p) + PL.dot(q, p) + PL.ty(p, "£" + Lib.fmtN(p, 2)) + PL.tx(q, Lib.fmtN(q, 1));
  $("#lab1").innerHTML = o;
}
Lib.slider($("#g1"), { id: "lp", label: "Market price (£)", min: 5, max: 10, step: 0.25, value: 8, fmt: (v) => "£" + v.toFixed(2), onInput: lab1 });
function lab2() {
  if (!$("#la")) return;
  const a = +$("#la").value, q = qMC(a), p = a - 0.5 * q, c = AC(q), pu = p - c;
  $("#b1").textContent = Lib.fmtN(q, 1); $("#b2").textContent = "£" + Lib.fmtN(p, 2); $("#b3").textContent = "£" + Lib.fmtN(pu, 2);
  $("#bv").textContent = pu < 0.03 ? "AR is tangent to AC: normal profit. Price is above MC and output is below the minimum-AC output of 10, so there is excess capacity." : "Supernormal profit, so new firms are attracted in. Demand for each firm will shift left.";
  const AR = (x) => a - 0.5 * x, MR = (x) => a - x;
  $("#lab2").innerHTML = base() + PL.rect(0, c, q, p, pu > 0.03 ? "f3" : "f1", { style: "opacity:" + (pu > 0.03 ? 0.2 : 0) }) + PL.curve(AR, "c1", 0, 24) + PL.curve(MR, "c3", 0, 24) + PL.guide(q, p) + PL.dot(q, p) + PL.ty(p, "£" + Lib.fmtN(p, 2)) + PL.tx(q, Lib.fmtN(q, 1));
}
Lib.slider($("#g2"), { id: "la", label: "Demand (AR intercept)", min: 9.75, max: 15, step: 0.25, value: 13, fmt: (v) => v.toFixed(2) + (v <= 9.76 ? " (tangency)" : ""), onInput: lab2 });

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Place each statement under the efficiency it describes.", buckets: [{ label: "Allocative" }, { label: "Productive" }, { label: "Dynamic" }, { label: "X-inefficiency" }], done: "P = MC, MC = AC, over time, and wasted costs.", items: [
  { text: "Price equals marginal cost", b: 0 }, { text: "Resources go to the products consumers most want", b: 0 },
  { text: "Output at the lowest point of the AC curve", b: 1 }, { text: "MC = AC", b: 1 },
  { text: "A firm invests profit in R&D that cuts future costs", b: 2 }, { text: "New technology is introduced over time", b: 2 },
  { text: "Costs are above the AC curve because managers face no pressure to cut waste", b: 3 }, { text: "Overstaffing in a firm protected from competition", b: 3 },
] });
Lib.classify($("#cl2"), { prompt: "Perfect or monopolistic competition?", buckets: [{ label: "Perfect competition" }, { label: "Monopolistic competition" }], items: [
  { text: "Identical products", b: 0 }, { text: "Differentiated products and branding", b: 1 }, { text: "Horizontal AR = MR", b: 0 }, { text: "Downward-sloping AR with MR below it", b: 1 },
  { text: "Firm is a price taker", b: 0 }, { text: "Long-run AR tangent to AC", b: 1 }, { text: "Long-run P = MC = minimum AC", b: 0 }, { text: "Excess capacity in the long run", b: 1 },
  { text: "Small wheat farmers", b: 0 }, { text: "Independent restaurants in a town", b: 1 },
] });
Lib.order($("#o1"), { prompt: "Order the long-run adjustment in perfect competition.", items: [
  "Firms are making supernormal profit",
  "New firms enter because there are no barriers to entry",
  "Market supply shifts right",
  "The market price falls",
  "Each firm's AR = MR falls to the minimum of AC",
  "Only normal profit is earned and entry stops",
], done: "Entry shifts market supply and price falls until profit is normal." });
Lib.calc($("#c1"), { qs: [
  { q: "A firm sells 400 units at £5 each. Average cost is £4.20. Calculate total profit (£).", a: 320, sol: "Profit = (AR − AC) × Q = (5 − 4.20) × 400 = <b>£320</b>." },
  { q: "A firm sells 50 units at £12 each and has average cost of £9. Calculate total profit (£).", a: 150, sol: "(12 − 9) × 50 = <b>£150</b>." },
  { q: "A firm produces 200 units. Average cost is £15 and price is £14. Calculate the total loss (£).", a: 200, sol: "Loss per unit £1 × 200 = <b>£200</b>." },
  { q: "A monopolistically competitive firm sells 120 units at £10 with AC of £8. Calculate supernormal profit (£).", a: 240, sol: "(10 − 8) × 120 = <b>£240</b>." },
  { q: "Total revenue is £600 from selling 50 units. What is the price (£)? (AR = TR ÷ Q)", a: 12, sol: "AR = 600 ÷ 50 = <b>£12</b>, which is the price." },
] });
Lib.quiz($("#qz1"), { qs: [
  { q: "Allocative efficiency is achieved where:", opts: ["MC = AC", "P = MC", "TR is maximised", "AC is at its minimum"], a: 1, why: "Price equals marginal cost." },
  { q: "Productive efficiency occurs where:", opts: ["P = MC", "Output is at the lowest point of AC", "MR = 0", "Profit is zero"], a: 1, why: "Minimum AC, where MC = AC." },
  { q: "A firm in perfect competition faces a demand curve that is:", opts: ["Downward-sloping", "Perfectly inelastic", "Horizontal at the market price", "Kinked"], a: 2, why: "It is a price taker: AR = MR = P." },
  { q: "In the long run a perfectly competitive firm earns:", opts: ["Supernormal profit", "Normal profit", "A loss", "Maximum revenue"], a: 1, why: "Entry removes supernormal profit." },
  { q: "Which is a characteristic of monopolistic competition?", opts: ["Homogeneous products", "High barriers to entry", "Differentiated products", "A single seller"], a: 2, why: "Branding and differentiation." },
  { q: "In long-run equilibrium in monopolistic competition:", opts: ["P = MC", "AR is tangent to AC", "Supernormal profit is earned", "Output is at minimum AC"], a: 1, why: "AR touches AC at one point: normal profit." },
  { q: "X-inefficiency refers to:", opts: ["Producing at minimum AC", "Costs above those necessary for a given output", "Efficient use of resources over time", "Charging P = MC"], a: 1, why: "Lack of competitive pressure leads to slack." },
  { q: "Which is a likely reason perfect competition may not be dynamically efficient?", opts: ["Too many barriers", "Only normal profit, so little to invest", "High prices", "Product differentiation"], a: 1, why: "Little surplus to fund R&D." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Allocative efficiency", "Resources are allocated to goods consumers most want; P = MC."],
  ["Productive efficiency", "Output produced at the lowest average cost; MC = AC."],
  ["Dynamic efficiency", "Efficiency over time through investment and innovation."],
  ["X-inefficiency", "Costs higher than necessary for a given output, because of lack of competitive pressure."],
  ["Price taker", "A firm with no power to affect the market price."],
  ["Homogeneous product", "Identical products from all firms."],
  ["Perfect information", "Buyers and sellers know all prices and qualities."],
  ["Barrier to entry", "A factor that makes it hard for new firms to enter a market."],
  ["Supernormal profit", "Profit above the minimum needed to keep the firm in the industry: AR > AC."],
  ["Normal profit", "Minimum profit to stay in the industry: AR = AC."],
  ["Product differentiation", "Making a product seem different from rivals through branding, quality or service."],
  ["Non-price competition", "Competing through quality, branding, service or advertising rather than price."],
  ["Excess capacity", "Producing below the output at which average cost is lowest."],
  ["Tangency", "AR touches AC at one point, so only normal profit is earned."],
] });
lab1(); lab2();

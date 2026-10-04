/* AR = 20 - Q, MR = 20 - 2Q, MC = 4 + 0.5Q, AC = 4 + 0.25Q */
const PM = Plot({ xmax: 22, ymax: 22 });
const ARf = (q) => 20 - q, MRf = (q) => 20 - 2 * q, MCf = (q) => 4 + 0.5 * q, ACf = (q) => 4 + 0.25 * q;
const op = (v) => ({ style: "opacity:" + v });
const QM = 6.4, PMN = 13.6, QC = 32 / 3, PCm = 28 / 3;

function monoDraw(s) {
  let o = PM.axes() + PM.curve(ARf, "c1", 0, 20) + PM.curve(MRf, "c3", 0, 10);
  o += PM.label(19.8, ARf(19.8) + 1.2, "AR = D", "lbl bd t1", "end") + PM.label(9.8, 1.6, "MR", "lbl bd t3", "end");
  o += PM.curve(MCf, "c4", 0, 22, op(s.mc)) + PM.curve(ACf, "c2", 0, 22, op(s.mc)) + SV.text(PM.X(21.9), PM.Y(MCf(21.9)) - 6, "MC", "lbl bd t4", { "text-anchor": "end", style: "opacity:" + s.mc });
  o += SV.text(PM.X(21.9), PM.Y(ACf(21.9)) + 18, "AC", "lbl bd t2", { "text-anchor": "end", style: "opacity:" + s.mc });
  o += PM.rect(0, ACf(QM), QM, PMN, "f3", { style: "opacity:" + 0.25 * s.pr });
  o += SV.text(PM.X(0.4), PM.Y((PMN + ACf(QM)) / 2) + 5, "Supernormal profit", "lbl bd t3", { "text-anchor": "start", style: "opacity:" + s.pr });
  const tri = [[PM.X(QM), PM.Y(PMN)], [PM.X(QM), PM.Y(MCf(QM))], [PM.X(QC), PM.Y(PCm)]];
  o += SV.poly(tri, "f2", { style: "opacity:" + 0.45 * s.cmp }) + SV.text(PM.X(QM + 1.6), PM.Y(PMN - 1.5), "Deadweight loss", "lbl bd t2", { "text-anchor": "start", style: "opacity:" + s.cmp });
  o += `<g style="opacity:${s.eq}">` + PM.guide(QM, PMN) + PM.dot(QM, PMN) + PM.dot(QM, MCf(QM), "dot4", 5) + PM.ty(PMN, "£13.60") + PM.tx(QM, "6.4") + "</g>";
  o += `<g style="opacity:${s.cmp}">` + PM.guide(QC, PCm, { "stroke-dasharray": "2 3" }) + PM.dot(QC, PCm, "dot2", 6) + PM.tx(QC, "10.7", "sm bd t2") + PM.ty(PCm, "£9.33", "sm bd t2") + "</g>";
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 400, label: "Monopoly equilibrium", base: { mc: 0, eq: 0, pr: 0, cmp: 0 }, tween: 800, draw: monoDraw, steps: [
  { cap: "A monopolist faces the <b>whole market demand curve</b> (AR). To sell more it must cut price on <b>every</b> unit, so <b>MR lies below AR</b> and is twice as steep.", s: { mc: 0, eq: 0, pr: 0, cmp: 0 } },
  { cap: "Add costs: <b>MC</b> and <b>AC</b>. The firm maximises profit where <b>MC = MR</b>.", s: { mc: 1, eq: 0, pr: 0, cmp: 0 } },
  { cap: "MC = MR at <b>Q = 6.4</b>. Go <b>up to AR</b> to read the price: <b>£13.60</b>. Price is well above MC (£7.20) at this output.", s: { mc: 1, eq: 1, pr: 0, cmp: 0 } },
  { cap: "AC at Q = 6.4 is £5.60. <b>Profit = (13.60 − 5.60) × 6.4 = £51.20</b>. Barriers to entry stop new firms eroding it.", s: { mc: 1, eq: 1, pr: 1, cmp: 0 } },
  { cap: "A competitive market would produce where <b>P = MC</b>: Q = 10.7 at £9.33. The monopolist <b>restricts output and raises price</b>. The triangle is the <b>deadweight loss</b>: welfare that nobody gets.", s: { mc: 1, eq: 1, pr: 1, cmp: 1 } },
] });

/* ---------- price discrimination, two panels ---------- */
const PA = Plot({ W: 380, H: 430, xmax: 20, ymax: 22, l: 52, r: 14, yl: " " });
function twoMarkets(pa, pb, b, extraA, extraB) {
  const qa = 20 - pa, qb = b - pb;
  const panel = (P, aInt, p, q, title) =>
    P.axes() + P.curve((x) => aInt - x, "c1", 0, aInt) + P.seg(0, 4, 20, 4, "c4") + P.rect(0, 4, q, p, "f3", { style: "opacity:.3" }) + P.guide(q, p) + P.dot(q, p) + P.ty(p, "£" + Lib.fmtN(p, 2)) + P.tx(q, Lib.fmtN(q, 1))
    + SV.text(P.X(10), 20, title, "lbl bd", { "text-anchor": "middle" }) + P.label(19.5, 5.4, "MC = £4", "sm bd t4", "end");
  return [panel(PA, 20, pa, qa, "Adults (less elastic)"), panel(PA, b, pb, qb, "Students (more elastic)"), (pa - 4) * qa + (pb - 4) * qb];
}
function pdDraw(s) {
  const [a, bb, tot] = twoMarkets(s.pa, s.pb, 14);
  return a + `<g transform="translate(380,0)">${bb}</g>` + SV.text(380, 424, "Total profit = £" + Lib.fmtN(tot, 1), "lbl bd t3", { "text-anchor": "middle", style: "font-size:16px" });
}
Lib.stepper($("#stB"), { w: 760, h: 430, label: "Third-degree price discrimination", base: { pa: 10.5, pb: 10.5 }, tween: 1000, draw: pdDraw, steps: [
  { cap: "Two groups buy the same product (MC = £4). Adults have demand P = 20 − Q; students have lower, more elastic demand P = 14 − Q. With <b>one price</b> the best the firm can do is <b>£10.50</b>: adults buy 9.5, students 3.5, total profit <b>£84.50</b>.", s: { pa: 10.5, pb: 10.5 } },
  { cap: "Treat the markets <b>separately</b>. For adults, MR = MC gives Q = 8 and a price of <b>£12</b>. Profit from adults rises to (12 − 4) × 8 = £64.", s: { pa: 12, pb: 10.5 } },
  { cap: "For students, MR = MC gives Q = 5 and a price of <b>£9</b>. Profit from students is (9 − 4) × 5 = £25. Total profit is <b>£89</b>, higher than £84.50.", s: { pa: 12, pb: 9 } },
  { cap: "The group with <b>less elastic demand pays more</b>. Some students now buy who would not have bought at £10.50, but adults lose consumer surplus.", s: { pa: 12, pb: 9 } },
] });

/* ---------- labs ---------- */
function lab1() {
  if (!$("#la")) return;
  const a = +$("#la").value, qm = (a - 4) / 2.5, pm = a - qm, acm = ACf(qm), prof = (pm - acm) * qm, qc = (a - 4) / 1.5, dwl = 0.5 * (pm - MCf(qm)) * (qc - qm);
  $("#a1").textContent = Lib.fmtN(qm, 1); $("#a2").textContent = "£" + Lib.fmtN(pm, 2); $("#a3").textContent = "£" + Lib.fmtN(prof, 1); $("#a4").textContent = Lib.fmtN(qc, 1); $("#a5").textContent = "£" + Lib.fmtN(dwl, 1);
  $("#av").textContent = `At a = ${a}, the monopolist produces ${Lib.fmtN(qm, 1)} units at £${Lib.fmtN(pm, 2)}. A competitive market would produce ${Lib.fmtN(qc, 1)}. The deadweight loss is £${Lib.fmtN(dwl, 1)}.`;
  const P = Plot({ xmax: 26, ymax: 28 });
  const tri = [[P.X(qm), P.Y(pm)], [P.X(qm), P.Y(MCf(qm))], [P.X(qc), P.Y(a - qc)]];
  $("#lab1").innerHTML = P.axes() + P.curve((q) => a - q, "c1", 0, a) + P.curve((q) => a - 2 * q, "c3", 0, a / 2) + P.curve(MCf, "c4", 0, 26) + P.curve(ACf, "c2", 0, 26)
    + P.rect(0, acm, qm, pm, "f3", { style: "opacity:.25" }) + SV.poly(tri, "f2", { style: "opacity:.45" }) + P.guide(qm, pm) + P.dot(qm, pm) + P.dot(qc, a - qc, "dot2", 5) + P.ty(pm, "£" + Lib.fmtN(pm, 1)) + P.tx(qm, Lib.fmtN(qm, 1))
    + P.label(25.5, MCf(25.5) + 0.8, "MC", "lbl bd t4", "end") + P.label(25.5, ACf(25.5) - 1.8, "AC", "lbl bd t2", "end") + P.label(a - 1, 1.8, "AR", "lbl bd t1", "end");
}
Lib.slider($("#g1"), { id: "la", label: "Demand strength, a", min: 14, max: 26, step: 1, value: 20, fmt: (v) => v, onInput: lab1 });
function lab2() {
  if (!$("#lb")) return;
  const b = +$("#lb").value, pa = 12, qa = 8, pb = (b + 4) / 2, qb = (b - 4) / 2, pd = (pa - 4) * qa + (pb - 4) * qb;
  const pu = (28 + b) / 4, uBoth = pu <= b ? (pu - 4) * (20 + b - 2 * pu) : 0, uA = 64, single = uBoth >= uA ? uBoth : uA, sp = uBoth >= uA ? pu : 12;
  $("#b1").textContent = `£${pa} / ${qa}`; $("#b2").textContent = `£${Lib.fmtN(pb, 2)} / ${Lib.fmtN(qb, 1)}`; $("#b3").textContent = "£" + Lib.fmtN(pd, 1); $("#b4").textContent = "£" + Lib.fmtN(sp, 2); $("#b5").textContent = "£" + Lib.fmtN(single, 1);
  $("#bv").textContent = pd > single + 0.01 ? `Discrimination raises profit by £${Lib.fmtN(pd - single, 1)}. The lower price in the more elastic market lets the firm sell to students it would otherwise lose.` : "No gain: it is best to charge one price.";
  const [A, B] = twoMarkets(pa, pb, b);
  $("#lab2").innerHTML = A + `<g transform="translate(380,0)">${B}</g>`;
}
Lib.slider($("#g2"), { id: "lb", label: "Students' demand intercept, b", min: 8, max: 18, step: 1, value: 14, fmt: (v) => v, onInput: lab2 });

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Place each point as a likely cost or benefit of monopoly.", buckets: [{ label: "Cost" }, { label: "Benefit" }], items: [
  { text: "Higher price and lower output than competition", b: 0 }, { text: "Deadweight loss and allocative inefficiency", b: 0 }, { text: "X-inefficiency without competitive pressure", b: 0 }, { text: "May squeeze suppliers and hold down wages", b: 0 },
  { text: "Economies of scale that could lower prices", b: 1 }, { text: "Supernormal profit funds R&D (dynamic efficiency)", b: 1 }, { text: "Stable, large employer offering job security", b: 1 }, { text: "Natural monopoly avoids wasteful duplication", b: 1 },
] });
Lib.classify($("#cl2"), { prompt: "Could the firm use third-degree price discrimination?", buckets: [{ label: "Yes, conditions met" }, { label: "No, a condition fails" }], items: [
  { text: "A train operator with different peak and off-peak fares", b: 0 }, { text: "A cinema selling named student tickets", b: 0 }, { text: "An airline charging more for late bookings", b: 0 },
  { text: "A seller of a resalable product with identical customers", b: 1 }, { text: "A firm in perfect competition (price taker)", b: 1 }, { text: "A firm that cannot tell groups apart and cannot stop resale", b: 1 },
] });
Lib.order($("#o1"), { prompt: "Order the steps for reading a monopoly diagram.", items: [
  "Draw AR (demand) and MR (twice as steep)",
  "Add MC and AC",
  "Find output where MC = MR",
  "Go up to AR to read the price",
  "Read AC at that output",
  "Shade supernormal profit = (P − AC) × Q",
], done: "MC = MR gives output; AR gives price; AC gives profit." });
Lib.calc($("#c1"), { qs: [
  { q: "A monopolist faces AR = 20 − 2Q, so MR = 20 − 4Q. Calculate MR at Q = 3 (£).", a: 8, sol: "MR = 20 − 4 × 3 = <b>£8</b>." },
  { q: "A monopolist sells 50 units at £30. AC is £22. Calculate supernormal profit (£).", a: 400, sol: "(30 − 22) × 50 = <b>£400</b>." },
  { q: "A cinema sells 200 adult tickets at £10 and 150 student tickets at £6. Calculate total revenue (£).", a: 2900, sol: "2,000 + 900 = <b>£2,900</b>." },
  { q: "The deadweight loss is a triangle with base 4 units and height £6. Calculate its area (£).", a: 12, sol: "½ × 4 × 6 = <b>£12</b>." },
  { q: "A market has a single price of £10.50 with profit of £84.50. Discrimination raises profit to £89. By how much does profit rise (£)?", a: 4.5, tol: 0.01, sol: "89 − 84.50 = <b>£4.50</b>." },
] });
Lib.quiz($("#qz1"), { qs: [
  { q: "A monopolist maximises profit where:", opts: ["P = MC", "MC = MR", "MR = 0", "AC is minimum"], a: 1, why: "Profit is maximised where MC = MR." },
  { q: "For a monopolist, price is read from:", opts: ["MR", "MC", "AR (demand)", "AC"], a: 2, why: "Go up from the output to the AR curve." },
  { q: "The deadweight loss of monopoly is:", opts: ["Supernormal profit", "Lost welfare from restricting output below the competitive level", "Producer surplus", "The area under MC"], a: 1, why: "It is the triangle of welfare no one receives." },
  { q: "Which is a condition for price discrimination?", opts: ["Perfect competition", "Same price elasticity in all groups", "Ability to prevent resale", "Falling prices"], a: 2, why: "Otherwise low-price buyers could resell." },
  { q: "In price discrimination the group with less elastic demand is charged:", opts: ["A lower price", "A higher price", "The same price", "Marginal cost"], a: 1, why: "Less elastic groups respond less to price, so a higher price raises revenue." },
  { q: "A natural monopoly exists where:", opts: ["Firms collude", "LRAC falls over the whole market demand", "The government owns the firm", "There are many firms"], a: 1, why: "Economies of scale are so large that one firm is cheapest." },
  { q: "Which is a possible benefit of monopoly?", opts: ["Lower output", "Economies of scale and R&D from supernormal profit", "Deadweight loss", "X-inefficiency"], a: 1, why: "Scale economies and dynamic efficiency." },
  { q: "A firm is likely to be treated as having monopoly power in the UK if its market share is about:", opts: ["5%", "10%", "25% or more", "100% only"], a: 2, why: "The competition authorities use about 25% as a guide." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Monopoly", "A market with one dominant seller, high barriers to entry and price-making power."],
  ["Price maker", "A firm with the power to set its own price."],
  ["Barrier to entry", "Anything that makes it hard for new firms to enter a market."],
  ["Deadweight loss", "Welfare lost when output is below the allocatively efficient level."],
  ["Natural monopoly", "A market where LRAC falls over the whole range of demand, so one firm is cheapest."],
  ["Third-degree price discrimination", "Charging different groups different prices for the same product."],
  ["Arbitrage (resale)", "Buying at a low price and selling at a higher price; prevented by the discriminating firm."],
  ["Consumer surplus", "The gap between what consumers are willing to pay and what they pay."],
  ["X-inefficiency", "Costs above the minimum because of lack of competitive pressure."],
  ["Dynamic efficiency", "Efficiency over time through investment and innovation."],
  ["Supernormal profit", "Profit above normal profit: AR > AC."],
  ["Marginal revenue", "Extra revenue from selling one more unit."],
] });
lab1(); lab2();

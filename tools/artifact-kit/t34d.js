const op = (v) => ({ style: "opacity:" + v });
/* Labour: MRP = 20 - 0.1L, supply S = 4 + 0.1L, MCL = 4 + 0.2L. Monopsony L = 53.3, W = 9.33; competitive L = 80, W = 12. */
const PLb = Plot({ xmax: 160, ymax: 22, xl: "Workers (L)", yl: "Wage (£ per hour)" });
const MRPf = (l) => 20 - 0.1 * l, Sf = (l) => 4 + 0.1 * l, MCLf = (l) => 4 + 0.2 * l;
const LM = 160 / 3, WM = 4 + LM * 0.1, MRPM = MRPf(LM);
function labourDraw(s) {
  let o = PLb.axes() + PLb.curve(MRPf, "c1", 0, 160) + PLb.label(158, MRPf(158) + 1.2, "MRP = D", "lbl bd t1", "end");
  o += PLb.curve(Sf, "c3", 0, 160, op(s.sup)) + SV.text(PLb.X(158), PLb.Y(Sf(158)) - 6, "S = ACL", "lbl bd t3", { "text-anchor": "end", style: "opacity:" + s.sup });
  o += PLb.curve(MCLf, "c4", 0, 80, op(s.mcl)) + SV.text(PLb.X(79), PLb.Y(MCLf(79)) - 8, "MCL", "lbl bd t4", { "text-anchor": "end", style: "opacity:" + s.mcl });
  o += PLb.rect(0, WM, LM, MRPM, "f2", { style: "opacity:" + 0.3 * s.mono }) + SV.text(PLb.X(2), PLb.Y((WM + MRPM) / 2) + 4, "Exploitation", "lbl bd t2", { style: "opacity:" + s.mono });
  o += `<g style="opacity:${s.mono}">` + PLb.seg(LM, 0, LM, MRPM, "gr") + PLb.seg(0, WM, LM, WM, "gr") + PLb.dot(LM, MRPM, "dot4", 5) + PLb.dot(LM, WM, "dot3") + PLb.ty(WM, "£9.33") + PLb.tx(LM, "53.3") + SV.text(PLb.X(LM) + 8, PLb.Y(MRPM) - 6, "MCL = MRP", "sm bd t4") + "</g>";
  o += `<g style="opacity:${s.comp}">` + PLb.seg(80, 0, 80, 12, "gr") + PLb.seg(0, 12, 80, 12, "gr") + PLb.dot(80, 12, "dot2") + PLb.ty(12, "£12", "sm bd t2") + PLb.tx(80, "80", "sm bd t2") + "</g>";
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 400, label: "Monopsony in a labour market", base: { sup: 0, mcl: 0, mono: 0, comp: 0 }, tween: 800, draw: labourDraw, steps: [
  { cap: "The firm's demand for labour is its <b>marginal revenue product (MRP)</b>: the extra revenue from one more worker.", s: { sup: 0, mcl: 0, mono: 0, comp: 0 } },
  { cap: "Workers' supply to this firm slopes up. Because the firm is the <b>main employer</b>, this is the supply curve it faces, and it is also the <b>average cost of labour</b> (the wage).", s: { sup: 1, mcl: 0, mono: 0, comp: 0 } },
  { cap: "To hire an extra worker the firm must raise the wage for <b>all</b> workers, so the <b>marginal cost of labour (MCL)</b> lies <b>above</b> the supply curve.", s: { sup: 1, mcl: 1, mono: 0, comp: 0 } },
  { cap: "The firm hires where <b>MCL = MRP</b>: <b>53 workers</b>. It pays only the wage on the <b>supply</b> curve: <b>£9.33</b>, well below the £14.67 the last worker adds to revenue.", s: { sup: 1, mcl: 1, mono: 1, comp: 0 } },
  { cap: "In a competitive market the wage would be £12 and employment 80 (where MRP = supply). The monopsony pays <b>less</b> and employs <b>fewer</b> workers.", s: { sup: 1, mcl: 1, mono: 1, comp: 1 } },
] });

/* ---------- contestability ---------- */
const PCt = Plot({ xmax: 250, ymax: 22, xl: "Quantity", yl: "Price / cost (£)" });
const Dc = (q) => 20 - 0.08 * q;
function contDraw(s) {
  const p = s.p, q = (20 - p) / 0.08, prof = (p - 6) * q;
  let o = PCt.axes() + PCt.curve(Dc, "c1", 0, 250) + PCt.seg(0, 6, 250, 6, "c4") + PCt.label(249, 7.2, "AC = £6 (incl. normal profit)", "lbl bd t4", "end") + PCt.label(250, Dc(250) + 1.2, "D", "lbl bd t1", "end");
  o += PCt.rect(0, 6, q, p, "f3", { style: "opacity:" + (prof > 1 ? 0.3 : 0) });
  o += PCt.guide(q, p) + PCt.dot(q, p) + PCt.ty(p, "£" + Lib.fmtN(p, 2)) + PCt.tx(q, Lib.fmtN(q, 0));
  o += SV.text(PCt.X(130), PCt.Y(20.8), "Supernormal profit = £" + Lib.fmtN(prof, 0), "lbl bd t3", { "text-anchor": "start", style: "font-size:16px" });
  o += `<g style="opacity:${s.t}">` + SV.text(PCt.X(130), PCt.Y(18.2), "Hit-and-run entrant: can enter and leave at no cost", "lbl bd t2", { "text-anchor": "start" }) + "</g>";
  return o;
}
Lib.stepper($("#stB"), { w: 760, h: 400, label: "A contestable market", base: { p: 13, t: 0 }, tween: 1000, draw: contDraw, steps: [
  { cap: "An incumbent has the market to itself. At the profit-maximising price (£13) it earns <b>supernormal profit</b>. If barriers were high, it could keep it.", s: { p: 13, t: 0 } },
  { cap: "But the market is <b>contestable</b>: entry costs are low, there are <b>no sunk costs</b> and entrants have the same technology. A rival could enter, undercut, and leave if things go wrong: <b>hit-and-run entry</b>.", s: { p: 13, t: 1 } },
  { cap: "To deter entry the incumbent cuts price towards cost (<b>limit pricing</b>). Output rises and profit shrinks.", s: { p: 9, t: 1 } },
  { cap: "At <b>P = AC (£6)</b> the incumbent earns only normal profit. There is nothing for an entrant to gain, so entry does not happen: <b>competitive outcome, without competitors</b>.", s: { p: 6, t: 1 } },
  { cap: "<b>Contrast:</b> if entry needed large <b>sunk costs</b>, the threat would not be credible and the incumbent could keep the higher price.", s: { p: 13, t: 0 } },
] });

/* ---------- lab 1: minimum wage ---------- */
function lab1() {
  if (!$("#lw")) return;
  const w = +$("#lw").value;
  let L, W;
  if (w <= WM) { L = LM; W = WM; } else if (w <= 12) { L = (w - 4) / 0.1; W = w; } else { L = (20 - w) / 0.1; W = w; }
  $("#a1").textContent = Lib.fmtN(L, 1); $("#a2").textContent = "£" + Lib.fmtN(W, 2); $("#a3").textContent = (L - LM >= 0 ? "+" : "") + Lib.fmtN(L - LM, 1) + " jobs";
  $("#av").textContent = w <= WM ? "Below the monopsony wage: the minimum wage does not bind. Employment stays at 53." : w <= 12 ? "Between £9.33 and £12: the minimum wage raises both wages and employment, because the firm no longer has to raise everyone's wage to hire another worker." : "Above £12 (the competitive wage): employment falls below the competitive level, and below the monopsony level once the wage is high enough. A minimum wage that is too high causes unemployment.";
  const lines = PLb.axes() + PLb.curve(MRPf, "c1", 0, 160) + PLb.curve(Sf, "c3", 0, 160) + PLb.curve(MCLf, "c4", 0, 80) + PLb.seg(0, w, 160, w, "c2", { "stroke-dasharray": "6 5" });
  $("#lab1").innerHTML = lines + PLb.guide(L, W) + PLb.dot(L, W, "dot1", 7) + PLb.ty(W, "£" + Lib.fmtN(W, 2)) + PLb.tx(L, Lib.fmtN(L, 0))
    + PLb.label(158, w + 0.7, "Minimum wage", "lbl bd t2", "end") + PLb.label(158, MRPf(158) + 1.2, "MRP", "lbl bd t1", "end") + PLb.label(158, Sf(158) - 1.6, "S", "lbl bd t3", "end") + PLb.label(79, MCLf(79) - 1.8, "MCL", "lbl bd t4", "end");
}
Lib.slider($("#g1"), { id: "lw", label: "Minimum wage (£ per hour)", min: 4, max: 16, step: 0.5, value: 4, fmt: (v) => "£" + v.toFixed(2), onInput: lab1 });

/* ---------- lab 2: contestable cases ---------- */
const CASES = [
  ["A city taxi market where licences are easy to get and cars can be leased", "Highly contestable", "Barriers and sunk costs are low, so new drivers can enter and leave quickly. Existing firms cannot hold prices well above cost."],
  ["A drug protected by a 20-year patent", "Not contestable", "A legal barrier blocks rivals completely until the patent expires. The firm can keep price well above cost."],
  ["Mobile networks: spectrum licences, masts and nationwide coverage needed", "Low contestability", "Very high sunk costs and regulation make entry risky and slow. Existing firms face little threat of hit-and-run entry."],
  ["A budget airline route where airport slots are available and planes are leased", "Fairly contestable", "Aircraft can be redeployed, so sunk costs are low. If slots are scarce, contestability falls sharply."],
];
$("#contest").innerHTML = CASES.map((c) => `<details class="eq"><summary>${c[0]}</summary><div class="body"><p><b>Verdict:</b> <span class="kw">${c[1]}</span></p><p>${c[2]}</p></div></details>`).join("");

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Which type of barrier to entry?", buckets: [{ label: "Legal" }, { label: "Structural / cost" }, { label: "Strategic (incumbent behaviour)" }], items: [
  { text: "A patent", b: 0 }, { text: "A government licence", b: 0 }, { text: "Economies of scale", b: 1 }, { text: "High start-up costs", b: 1 }, { text: "Strong brand loyalty", b: 1 },
  { text: "Control of a key resource", b: 1 }, { text: "Predatory pricing", b: 2 }, { text: "Limit pricing", b: 2 }, { text: "Exclusive contracts with retailers", b: 2 },
] });
Lib.classify($("#cl2"), { prompt: "Monopsony or contestable market?", buckets: [{ label: "Monopsony" }, { label: "Contestable market" }], items: [
  { text: "A single dominant buyer", b: 0 }, { text: "Sellers have few alternative buyers", b: 0 }, { text: "MCL lies above the supply curve", b: 0 }, { text: "Wage paid below the competitive level", b: 0 },
  { text: "Hit-and-run entry is possible", b: 1 }, { text: "Low sunk costs", b: 1 }, { text: "Incumbents keep price close to average cost for fear of entry", b: 1 }, { text: "Entrants have access to the same technology as incumbents", b: 1 },
] });
Lib.match($("#m1"), { prompt: "Match each term to its meaning.", pairs: [
  ["Monopsony", "A market with one dominant buyer"],
  ["Marginal cost of labour", "The extra cost of hiring one more worker, including higher pay to existing workers"],
  ["Sunk cost", "A cost that cannot be recovered on leaving the market"],
  ["Hit-and-run entry", "Entering a profitable market, taking profit, then leaving quickly"],
  ["Contestable market", "One where the threat of entry disciplines firms"],
  ["Exit barrier", "A cost or obstacle that makes leaving a market difficult"],
] });
Lib.calc($("#c1"), { qs: [
  { q: "MRP = 20 − 0.1L. Calculate MRP when 50 workers are employed (£).", a: 15, sol: "20 − 0.1 × 50 = <b>£15</b>." },
  { q: "Labour supply is W = 4 + 0.1L. Calculate the wage when 60 workers are employed (£).", a: 10, sol: "4 + 0.1 × 60 = <b>£10</b>." },
  { q: "MCL = 4 + 0.2L. Calculate the marginal cost of labour at 50 workers (£).", a: 14, sol: "4 + 0.2 × 50 = <b>£14</b>." },
  { q: "The competitive wage is £12 and the monopsony wage is £9.33. How much lower is the monopsony wage (£)?", a: 2.67, tol: 0.05, sol: "12 − 9.33 = <b>£2.67</b>." },
  { q: "An incumbent sells 87.5 units at £13 with average cost £6. Calculate supernormal profit (£).", a: 612.5, tol: 0.1, sol: "(13 − 6) × 87.5 = <b>£612.50</b>." },
] });
Lib.quiz($("#qz1"), { qs: [
  { q: "A monopsony is a market with:", opts: ["One seller", "One dominant buyer", "Two sellers", "Many buyers and sellers"], a: 1, why: "A single or dominant buyer." },
  { q: "A monopsony employer hires where:", opts: ["MRP = supply", "MCL = MRP", "MR = MC", "MRP = 0"], a: 1, why: "It sets marginal cost of labour equal to marginal revenue product." },
  { q: "Compared with a competitive labour market, a monopsony pays:", opts: ["A higher wage and employs more", "A lower wage and employs fewer", "A lower wage and employs more", "The same wage"], a: 1, why: "It restricts employment and pays the supply-curve wage." },
  { q: "A minimum wage between the monopsony wage and the competitive wage is likely to:", opts: ["Reduce employment", "Increase wages and employment", "Have no effect", "Reduce wages"], a: 1, why: "MCL becomes flat at the minimum wage up to the supply curve." },
  { q: "Sunk costs are:", opts: ["Costs of production", "Costs that cannot be recovered on exit", "Fixed costs only", "Marginal costs"], a: 1, why: "Spent and unrecoverable." },
  { q: "Which makes a market more contestable?", opts: ["High sunk costs", "Strong brand loyalty", "Low barriers to entry and exit", "Patents"], a: 2, why: "Low barriers allow hit-and-run entry." },
  { q: "In a contestable market incumbents are likely to:", opts: ["Raise prices", "Keep price close to average cost", "Reduce output", "Ignore rivals"], a: 1, why: "To discourage entry." },
  { q: "Which is a strategic barrier to entry?", opts: ["A patent", "Economies of scale", "Predatory pricing", "A government licence"], a: 2, why: "Behaviour of incumbents designed to deter entry." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Monopsony", "A market with a single or dominant buyer."],
  ["Monopsony power", "The ability of a dominant buyer to influence the price it pays."],
  ["Marginal revenue product (MRP)", "The extra revenue from employing one more worker."],
  ["Marginal cost of labour (MCL)", "The addition to total labour cost from hiring one more worker."],
  ["Contestable market", "A market where the threat of entry disciplines firms."],
  ["Barrier to entry", "Something that makes entering a market harder."],
  ["Barrier to exit", "Something that makes leaving a market costly."],
  ["Sunk cost", "A cost that cannot be recovered if the firm leaves the market."],
  ["Hit-and-run entry", "Entering a market to take profit then leaving quickly."],
  ["Limit pricing", "Setting price low enough to deter new entrants."],
  ["Predatory pricing", "Pricing below cost to drive out rivals."],
  ["Potential competition", "The threat of entry from firms not yet in the market."],
] });
lab1();

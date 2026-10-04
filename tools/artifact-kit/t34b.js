const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------- 1. concentration ratio bars ---------- */
const SHARES = [["A", 30], ["B", 25], ["C", 15], ["D", 10], ["E", 8], ["F", 5], ["G", 4], ["H", 3]];
function crDraw(s) {
  const W = 760, base = 300, sc = 7.5, bw = 62, gap = 28, x0 = 60;
  let o = SV.line(40, base, 740, base, "ax");
  const n = Math.round(s.n);
  SHARES.forEach(([nm, v], i) => {
    const x = x0 + i * (bw + gap), h = v * sc, on = i < s.n ? 1 : i < s.n + 0.999 ? s.n - Math.floor(s.n) : 0, op = 0.3 + 0.7 * clamp(s.n - i, 0, 1);
    o += SV.rect(x, base - h, bw, h, "", { fill: i < n ? "var(--accent)" : "var(--muted)", style: "opacity:" + op, rx: 4 });
    o += SV.text(x + bw / 2, base - h - 8, v + "%", "lbl bd", { "text-anchor": "middle" }) + SV.text(x + bw / 2, base + 20, "Firm " + nm, "sm", { "text-anchor": "middle" });
  });
  const tot = SHARES.slice(0, n).reduce((a, b) => a + b[1], 0);
  o += SV.text(380, 50, n === 0 ? "Market shares of eight firms (they add to 100%)" : `CR${n} = ${SHARES.slice(0, n).map((x) => x[1]).join(" + ")} = ${tot}%`, "lbl bd t1", { "text-anchor": "middle", style: "font-size:20px" });
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 340, label: "Building concentration ratios from market shares", base: { n: 0 }, tween: 600, draw: crDraw, steps: [
  { cap: "These are the market shares of the eight firms in a market. A concentration ratio adds up the shares of the <b>largest n firms</b>.", s: { n: 0 } },
  { cap: "<b>CR1 = 30%.</b> The largest firm alone has nearly a third of the market.", s: { n: 1 } },
  { cap: "<b>CR3 = 70%.</b> Three firms hold seven tenths of the market.", s: { n: 3 } },
  { cap: "<b>CR4 = 80%.</b> This is a <b>high concentration ratio</b>, typical of an oligopoly. The four firms are likely to be interdependent.", s: { n: 4 } },
  { cap: "<b>Evaluate:</b> CR4 of 80% does not by itself prove weak competition. Check whether firms compete on price, how easily new firms can enter, and how the market is defined.", s: { n: 4 } },
] });

/* ---------- 2. cartel diagram ---------- */
const PO = Plot({ xmax: 260, ymax: 22, xl: "Industry output (Q)", yl: "Price / cost (£)" });
const Dm = (q) => 20 - 0.08 * q, MRm = (q) => 20 - 0.16 * q;
function cartelDraw(s) {
  const q = s.q, p = Dm(q), prof = (p - 4) * q;
  let o = PO.axes() + PO.curve(Dm, "c1", 0, 250) + PO.curve(MRm, "c3", 0, 125) + PO.seg(0, 4, 260, 4, "c4");
  o += PO.label(250, Dm(250) + 1.2, "D = AR", "lbl bd t1", "end") + PO.label(112, 2.2, "MR", "lbl bd t3", "end") + PO.label(259, 5.2, "MC = AC = £4", "lbl bd t4", "end");
  o += PO.rect(0, 4, q, p, "f3", { style: "opacity:" + (prof > 1 ? 0.25 : 0) });
  o += PO.guide(q, p) + PO.dot(q, p) + PO.ty(p, "£" + Lib.fmtN(p, 2)) + PO.tx(q, Lib.fmtN(q, 0));
  o += SV.text(PO.X(130), PO.Y(20.8), "Industry profit = £" + Lib.fmtN(prof, 0), "lbl bd t3", { "text-anchor": "start", style: "font-size:16px" });
  return o;
}
Lib.stepper($("#stB"), { w: 760, h: 400, label: "Cartel output, price and profit", base: { q: 200 }, tween: 1100, draw: cartelDraw, steps: [
  { cap: "Two firms share a market. If they <b>compete fiercely</b> output rises to where <b>price = marginal cost</b> (Q = 200, P = £4). Price just covers cost: <b>no supernormal profit</b>.", s: { q: 200 } },
  { cap: "If the firms <b>collude</b> and act like a monopolist, they produce where <b>MR = MC</b> (Q = 100). Price rises to <b>£12</b> and industry profit is (12 − 4) × 100 = <b>£800</b>, so £400 each.", s: { q: 100 } },
  { cap: "<b>Temptation:</b> one firm secretly raises output from 50 to 70. Industry output is 120, price falls to <b>£10.40</b>. The cheat earns 6.40 × 70 = <b>£448</b>, the loyal firm only 6.40 × 50 = <b>£320</b>.", s: { q: 120 } },
  { cap: "If <b>both</b> cheat, each produces 70, industry output is 140 and price falls to <b>£8.80</b>. Each earns 4.80 × 70 = <b>£336</b>: <b>less than the £400</b> they earned by complying. This is the prisoner's dilemma.", s: { q: 140 } },
] });

/* ---------- lab 1: payoff matrix ---------- */
const OUT = [50, 70], NAMES = ["Comply (50)", "Cheat (70)"];
const payoff = (a, b) => { const p = 20 - 0.08 * (a + b); return [(p - 4) * a, (p - 4) * b]; };
let ia = 0, ib = 0, showBest = false;
function pdRender() {
  const cell = (r, c) => { const [pa, pb] = payoff(OUT[r], OUT[c]);
    const bestA = payoff(OUT[r], OUT[c])[0] >= payoff(OUT[1 - r], OUT[c])[0], bestB = payoff(OUT[r], OUT[c])[1] >= payoff(OUT[r], OUT[1 - c])[1];
    const f = (v, best) => `<span style="${showBest && best ? "font-weight:800;text-decoration:underline;color:var(--good)" : ""}">${Lib.fmtN(v, 0)}</span>`;
    return `<td style="${r === ia && c === ib ? "background:var(--accent-soft);outline:2px solid var(--accent)" : ""};text-align:center;font-size:1.05rem">£${f(pa, bestA)}, £${f(pb, bestB)}${showBest && bestA && bestB ? '<br><b class="kw">Nash equilibrium</b>' : ""}</td>`; };
  $("#pdTable").innerHTML = `<tr><th></th>${NAMES.map((n) => `<th>Firm B: ${n}</th>`).join("")}</tr>` + [0, 1].map((r) => `<tr><th>Firm A: ${NAMES[r]}</th>${cell(r, 0)}${cell(r, 1)}</tr>`).join("");
  const [pa, pb] = payoff(OUT[ia], OUT[ib]), p = 20 - 0.08 * (OUT[ia] + OUT[ib]);
  $("#pdOut").innerHTML = `Industry output ${OUT[ia] + OUT[ib]}, price £${Lib.fmtN(p, 2)}. Firm A earns £${Lib.fmtN(pa, 0)} and Firm B earns £${Lib.fmtN(pb, 0)}. ` + (ia === 1 && ib === 1 ? "Both cheated: each is worse off than if both had complied (£400 each)." : ia === 0 && ib === 0 ? "Both comply: the best joint outcome, but each firm can gain by cheating." : "The cheat gains and the loyal firm loses.");
  $("#pdBest").textContent = showBest ? "Hide best responses" : "Show best responses";
}
[["#pdA", (i) => (ia = i)], ["#pdB", (i) => (ib = i)]].forEach(([id, set]) => {
  NAMES.forEach((n, i) => { const b = document.createElement("button"); b.className = "b"; b.textContent = n; b.onclick = () => { set(i); $$(id + " button").forEach((x, k) => x.classList.toggle("pri", k === i)); pdRender(); }; $(id).appendChild(b); });
  $$(id + " button")[0].classList.add("pri");
});
$("#pdBest").onclick = () => { showBest = !showBest; pdRender(); };
pdRender();

/* ---------- lab 2: concentration calculator ---------- */
const crv = [28, 22, 15, 10, 6];
crv.forEach((v, i) => { const d = document.createElement("div"); $("#crSliders").appendChild(d);
  Lib.slider(d, { id: "cs" + i, label: "Firm " + "ABCDE"[i] + " share", min: 0, max: 40, step: 1, value: v, fmt: (x) => x + "%", onInput: crCalc }); });
function crCalc() {
  if (!$("#cs4")) return;
  const v = [0, 1, 2, 3, 4].map((i) => +$("#cs" + i).value).sort((a, b) => b - a), tot = v.reduce((a, b) => a + b, 0);
  $("#cr3").textContent = v.slice(0, 3).reduce((a, b) => a + b, 0) + "%"; $("#cr4").textContent = v.slice(0, 4).reduce((a, b) => a + b, 0) + "%"; $("#crRest").textContent = Math.max(0, 100 - tot) + "%";
  const cr4 = v.slice(0, 4).reduce((a, b) => a + b, 0);
  $("#crV").textContent = tot > 100 ? "The shares add to more than 100%. Reduce one." : cr4 >= 60 ? "High concentration: a few firms dominate, consistent with an oligopoly." : cr4 >= 40 ? "Moderate concentration. Competition from smaller firms is likely to matter." : "Low concentration: closer to a competitive market.";
}
crCalc();

/* ---------- lab 3: limit pricing ---------- */
function lab3() {
  if (!$("#lm")) return;
  const p = +$("#lm").value, q = (20 - p) / 0.08, prof = (p - 4) * q, entry = p > 9;
  $("#lq").textContent = Lib.fmtN(q, 0); $("#lp").textContent = "£" + Lib.fmtN(prof, 0); $("#le").textContent = entry ? "Attractive" : "Deterred";
  $("#lv").textContent = entry ? `At £${p.toFixed(2)} a new firm could earn profit (its cost is £9), so entry is likely.` : p === 12 ? "" : `At £${p.toFixed(2)} an entrant cannot make a profit, so entry is deterred. The incumbent earns £${Lib.fmtN(prof, 0)}, below the monopoly profit of £800 at £12: this is the price of limit pricing.`;
  let o = PO.axes() + PO.curve(Dm, "c1", 0, 250) + PO.seg(0, 4, 260, 4, "c4") + PO.seg(0, 9, 260, 9, "c2", { "stroke-dasharray": "6 5" });
  o += PO.label(259, 10.2, "Entrant's cost £9", "lbl bd t2", "end") + PO.label(259, 5.2, "Incumbent's cost £4", "lbl bd t4", "end") + PO.label(250, Dm(250) + 1.2, "D", "lbl bd t1", "end");
  o += PO.rect(0, 4, q, p, "f3", { style: "opacity:.25" }) + PO.guide(q, p) + PO.dot(q, p) + PO.ty(p, "£" + Lib.fmtN(p, 2)) + PO.tx(q, Lib.fmtN(q, 0));
  $("#lab3").innerHTML = o;
}
Lib.slider($("#g3"), { id: "lm", label: "Incumbent's price (£)", min: 5, max: 14, step: 0.5, value: 12, fmt: (v) => "£" + v.toFixed(2), onInput: lab3 });

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Price competition or non-price competition?", buckets: [{ label: "Price competition" }, { label: "Non-price competition" }], items: [
  { text: "Supermarkets repeatedly cut prices to win customers", b: 0 }, { text: "Selling below cost to force a rival out of the market", b: 0 }, { text: "Setting a price just low enough to deter new entrants", b: 0 },
  { text: "A loyalty card scheme", b: 1 }, { text: "Heavy TV advertising of a brand", b: 1 }, { text: "Launching a new model with better features", b: 1 }, { text: "Free delivery and after-sales service", b: 1 },
] });
Lib.classify($("#cl2"), { prompt: "Overt or tacit collusion?", buckets: [{ label: "Overt (formal)" }, { label: "Tacit (informal)" }], items: [
  { text: "Firms meet in secret to agree prices (a cartel)", b: 0 }, { text: "Oil producers agree output quotas", b: 0 }, { text: "A written agreement to share out the market", b: 0 },
  { text: "A dominant firm raises price and rivals follow", b: 1 }, { text: "Petrol stations in a town keep similar prices with no discussion", b: 1 }, { text: "Firms avoid advertising wars through an unspoken understanding", b: 1 },
] });
Lib.match($("#m1"), { prompt: "Match each term to its meaning.", pairs: [
  ["Interdependence", "A firm's decisions depend on how rivals will react"],
  ["Cartel", "Firms formally agree to fix price or output"],
  ["Price leadership", "A dominant firm sets the price and others follow"],
  ["Predatory pricing", "Pricing below cost to drive out a rival"],
  ["Limit pricing", "A price set low enough to make entry unprofitable"],
  ["Dominant strategy", "The best choice whatever the rival does"],
] });
Lib.calc($("#c1"), { qs: [
  { q: "Four largest firms have market shares of 30%, 25%, 15% and 10%. Calculate the four-firm concentration ratio (%).", a: 80, sol: "30 + 25 + 15 + 10 = <b>80%</b>." },
  { q: "Shares of the five largest firms: 25%, 20%, 15%, 12% and 10%. Calculate the three-firm concentration ratio (%).", a: 60, sol: "CR3 = 25 + 20 + 15 = <b>60%</b>." },
  { q: "Two colluding firms, each producing 50 units, sell at £12 with marginal cost £4. Calculate the profit of each firm (£).", a: 400, sol: "(12 − 4) × 50 = <b>£400</b>." },
  { q: "Demand is P = 20 − 0.08Q. Firm A produces 70 and Firm B produces 50. Calculate the market price (£).", a: 10.4, tol: 0.01, sol: "Q = 120, so P = 20 − 0.08 × 120 = <b>£10.40</b>." },
  { q: "In the same market (MC = £4), if Firm A produces 70 and Firm B 50, calculate Firm A's profit (£).", a: 448, sol: "(10.40 − 4) × 70 = <b>£448</b>." },
] });
Lib.quiz($("#qz1"), { qs: [
  { q: "Which is a key characteristic of oligopoly?", opts: ["Many small firms", "Interdependence between firms", "No barriers to entry", "A single seller"], a: 1, why: "Each firm's decisions depend on rivals' reactions." },
  { q: "The three-firm concentration ratio adds:", opts: ["The three smallest shares", "The three largest shares", "All shares", "Profits of three firms"], a: 1, why: "It is the combined share of the three largest firms." },
  { q: "A cartel is:", opts: ["A merger", "A formal agreement between firms to fix price or output", "A type of price war", "A government regulator"], a: 1, why: "Overt collusion." },
  { q: "In the prisoner's dilemma, why do firms end up cheating?", opts: ["Cheating is dominant: it pays whatever the other does", "Cheating is legal", "Cheating raises price", "Firms cannot count"], a: 0, why: "Each firm gains by cheating whatever its rival does." },
  { q: "Pricing below cost to force a rival out is:", opts: ["Limit pricing", "Predatory pricing", "Price leadership", "Tacit collusion"], a: 1, why: "It is intended to eliminate a competitor." },
  { q: "Which is non-price competition?", opts: ["A price war", "Advertising and branding", "Predatory pricing", "Price fixing"], a: 1, why: "Branding, advertising, quality and service." },
  { q: "Which makes collusion harder?", opts: ["Few firms", "Strong barriers to entry", "Many firms with different costs", "Similar products"], a: 2, why: "More and different firms find agreement harder to reach and monitor." },
  { q: "Limit pricing means:", opts: ["Pricing to maximise profit", "Pricing low enough to deter entry", "Fixing price with rivals", "Pricing above rivals"], a: 1, why: "Sacrificing some profit to keep rivals out." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Oligopoly", "A market dominated by a few large, interdependent firms with high barriers to entry."],
  ["Interdependence", "A firm's best decision depends on how its rivals will react."],
  ["Concentration ratio", "Combined market share of the largest n firms."],
  ["Collusion", "Firms acting together to restrict competition."],
  ["Overt collusion", "Formal, open agreement between firms, such as a cartel."],
  ["Tacit collusion", "Informal, unspoken coordination, such as following a price leader."],
  ["Cartel", "A group of firms that agree to fix price or restrict output."],
  ["Price leadership", "One dominant firm sets the price and others follow."],
  ["Prisoner's dilemma", "A game in which rivals each do best by cheating but end up worse off than if both had cooperated."],
  ["Dominant strategy", "A strategy that gives the best payoff whatever the rival does."],
  ["Payoff matrix", "A table showing the outcomes for each combination of choices."],
  ["Price war", "Rivals repeatedly cut prices to win market share."],
  ["Predatory pricing", "Setting price below cost to force rivals out."],
  ["Limit pricing", "Setting a price to deter new firms from entering."],
  ["Non-price competition", "Competing on branding, quality, advertising or service rather than price."],
] });
lab3();

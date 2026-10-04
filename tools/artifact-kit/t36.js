const op = (v) => ({ style: "opacity:" + v });
/* Natural monopoly: AR = 20 - 0.8Q, MR = 20 - 1.6Q, MC = 2, AC = 2 + 40/Q. */
const PN = Plot({ xmax: 30, ymax: 22 });
const ARn = (q) => 20 - 0.8 * q, MRn = (q) => 20 - 1.6 * q, ACn = (q) => 2 + 40 / q;
function nmDraw(s) {
  const q = s.q, p = ARn(q), c = ACn(q), prof = (p - c) * q;
  let o = PN.axes() + PN.curve(ARn, "c1", 0, 25) + PN.curve(MRn, "c3", 0, 12.5) + PN.curve(ACn, "c2", 2, 30, op(s.c)) + PN.seg(0, 2, 30, 2, "c4", op(s.c));
  o += PN.label(24.6, ARn(24.6) + 1.3, "AR = D", "lbl bd t1", "end") + PN.label(12.3, 2.9, "MR", "lbl bd t3", "end");
  o += SV.text(PN.X(29.6), PN.Y(ACn(29.6)) - 8, "AC", "lbl bd t2", { "text-anchor": "end", style: "opacity:" + s.c }) + SV.text(PN.X(29.6), PN.Y(2) + 18, "MC = £2", "lbl bd t4", { "text-anchor": "end", style: "opacity:" + s.c });
  o += `<g style="opacity:${s.e}">` + PN.rect(0, Math.min(p, c), q, Math.max(p, c), prof >= 0 ? "f3" : "f2", { style: "opacity:.3" }) + PN.guide(q, p) + PN.dot(q, p) + PN.dot(q, c, "dot2", 5) + PN.ty(p, "£" + Lib.fmtN(p, 2)) + PN.ty(c, "£" + Lib.fmtN(c, 2), "sm bd t2") + PN.tx(q, Lib.fmtN(q, 1))
    + SV.text(PN.X(20), PN.Y(20.8), (prof >= 0 ? "Profit = £" : "Loss = £") + Lib.fmtN(Math.abs(prof), 0), "lbl bd " + (prof >= 0 ? "t3" : "t2"), { style: "font-size:16px" }) + "</g>";
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 400, label: "Regulating a natural monopoly", base: { c: 1, q: 11.25, e: 0 }, tween: 1000, draw: nmDraw, steps: [
  { cap: "A <b>natural monopoly</b>: average cost <b>falls over the whole market</b> because fixed costs are huge (AC = 2 + 40/Q) and MC is low (£2). One firm is cheapest, but it can exploit its position.", s: { c: 1, q: 11.25, e: 0 } },
  { cap: "<b>Unregulated:</b> MR = MC at Q = 11.25. Price is <b>£11</b>, far above MC. Profit is (11 − 5.56) × 11.25 ≈ <b>£61</b>. Output is low and price high: allocative inefficiency.", s: { c: 1, q: 11.25, e: 1 } },
  { cap: "<b>Price cap at P = AC</b> (£4): output rises to <b>20</b>, price falls to £4, and the firm earns <b>only normal profit</b>. A good compromise: lower price, more output, firm still viable.", s: { c: 1, q: 20, e: 1 } },
  { cap: "<b>Price cap at P = MC</b> (£2): output <b>22.5</b>, the allocatively efficient level. But AC (£3.78) is above price, so the firm makes a <b>loss</b> of about £40 and needs a <b>subsidy</b>.", s: { c: 1, q: 22.5, e: 1 } },
  { cap: "<b>Limits:</b> the regulator needs to know the firm's true costs (<b>asymmetric information</b>) and may be influenced by the firm (<b>regulatory capture</b>), so the cap may end up too high or too low.", s: { c: 1, q: 20, e: 1 } },
] });

/* ---------- lab 1: price cap ---------- */
function lab1() {
  if (!$("#lc")) return;
  const cap = +$("#lc").value, mono = cap >= 11, q = mono ? 11.25 : (20 - cap) / 0.8, p = mono ? 11 : cap, c = ACn(q), prof = (p - c) * q;
  $("#a1").textContent = Lib.fmtN(q, 1); $("#a2").textContent = "£" + Lib.fmtN(c, 2); $("#a3").textContent = (prof >= 0 ? "£" : "−£") + Lib.fmtN(Math.abs(prof), 1);
  $("#av").textContent = mono ? "The cap is above the monopoly price, so it does not bind. The firm earns about £61 and consumers pay £11."
    : Math.abs(p - 2) < 0.13 ? "P = MC: allocatively efficient, but the firm makes a loss and needs a subsidy."
    : Math.abs(prof) < 1.5 ? "P ≈ AC: normal profit. Lower price and more output, with a viable firm."
    : prof > 0 ? "A loose cap: the firm keeps supernormal profit and output is below the efficient level."
    : "A tight cap: the firm makes a loss. It may cut quality, under-invest or leave unless subsidised.";
  const pq = mono ? 11 : cap;
  $("#lab1").innerHTML = PN.axes() + PN.curve(ARn, "c1", 0, 25) + PN.curve(ACn, "c2", 2, 30) + PN.seg(0, 2, 30, 2, "c4") + PN.seg(0, pq, 30, pq, "c2", { "stroke-dasharray": "6 5" })
    + PN.rect(0, Math.min(pq, c), q, Math.max(pq, c), prof >= 0 ? "f3" : "f2", { style: "opacity:.3" }) + PN.guide(q, pq) + PN.dot(q, pq) + PN.ty(pq, "£" + Lib.fmtN(pq, 2)) + PN.tx(q, Lib.fmtN(q, 1))
    + PN.label(24.6, ARn(24.6) + 1.3, "AR", "lbl bd t1", "end") + PN.label(29.6, ACn(29.6) + 1.4, "AC", "lbl bd t2", "end");
}
Lib.slider($("#g1"), { id: "lc", label: "Price cap (£)", min: 2, max: 11, step: 0.25, value: 4, fmt: (v) => "£" + v.toFixed(2) + (v >= 11 ? " (no cap)" : ""), onInput: lab1 });

/* ---------- lab 2: policy comparison ---------- */
const POL = [
  { k: "Merger control", d: "A competition authority can block or condition mergers.", price: "↔ or ↓ (stops price rises)", profit: "↔", eff: "↑ pressure maintained, but scale economies may be lost", q: "↔", ch: "↑ rivals stay in the market", pro: "Stops market power building up before it harms consumers.", con: "May block mergers that would cut costs; slow and costly." },
  { k: "Price cap (CPI − X)", d: "A regulator limits annual price rises to inflation minus an efficiency target.", price: "↓", profit: "↓ (capped)", eff: "↑ firms keep savings beyond X", q: "↓ risk: firms may cut quality", ch: "↔", pro: "Lower prices and a built-in incentive to cut costs.", con: "Cap may be set wrongly; risk of falling quality and low investment." },
  { k: "Profit regulation", d: "Limit profit, e.g. a maximum rate of return on capital.", price: "↓", profit: "↓ (limited)", eff: "↓ little incentive to cut costs; gold-plating", q: "↔ or ↑ (firm may overspend on quality)", ch: "↔", pro: "Directly limits supernormal profit.", con: "Weak cost-cutting incentive; hard to monitor." },
  { k: "Quality standards and targets", d: "Minimum standards and performance targets with penalties.", price: "↑ (compliance costs)", profit: "↓", eff: "↔", q: "↑", ch: "↔", pro: "Protects consumers from cost-cutting.", con: "Costly to monitor; firms may focus on the target not the service." },
  { k: "Promoting small business", d: "Grants, loans, tax breaks and advice for start-ups.", price: "↓", profit: "↓ for incumbents", eff: "↑ competitive pressure", q: "↑ (competition)", ch: "↑", pro: "More competition and innovation.", con: "Taxpayer cost; many small firms fail." },
  { k: "Deregulation", d: "Remove licences and legal barriers to entry.", price: "↓", profit: "↓ for incumbents", eff: "↑", q: "↔ or ↓ (safety risk)", ch: "↑", pro: "Lower barriers make markets more contestable.", con: "May reduce safety, quality or investment." },
  { k: "Competitive tendering", d: "Private firms bid to deliver public services.", price: "↓ (for the council)", profit: "↔ (competed away at bid)", eff: "↑", q: "↓ risk if costs are cut", ch: "↔", pro: "Competition for the contract lowers costs.", con: "Quality risk; costs of tendering; bid-rigging." },
  { k: "Privatisation", d: "Transfer of a public-sector firm to private owners.", price: "↑ if a monopoly is unregulated; ↓ if competition follows", profit: "↑", eff: "↑ profit motive", q: "↑ or ↓", ch: "↑ if competition is introduced", pro: "Efficiency, investment, government revenue.", con: "Private monopoly; neglects social aims; needs regulation." },
  { k: "Nationalisation", d: "Government takes ownership of a private firm.", price: "↓ (social pricing)", profit: "↓ (not the main aim)", eff: "↓ risk of X-inefficiency", q: "↔", ch: "↔", pro: "Pursues social aims; avoids private monopoly exploitation.", con: "Taxpayer cost; political interference; weak cost control." },
  { k: "Restricting monopsony power", d: "Rules on unfair terms, late payment and buyer dominance; minimum wages.", price: "↑ for suppliers' prices; consumer prices may rise", profit: "↓ for the dominant buyer", eff: "↔", q: "↑ (suppliers survive)", ch: "↑ (suppliers stay in business)", pro: "Protects suppliers and workers from being squeezed.", con: "Higher costs may be passed to consumers; enforcement difficult." },
];
function pol(i) {
  const p = POL[i];
  $("#polName").textContent = p.k + ": " + p.d;
  $("#polTable").innerHTML = `<tr><th>Price</th><th>Profit</th><th>Efficiency</th><th>Quality</th><th>Choice</th></tr><tr><td>${p.price}</td><td>${p.profit}</td><td>${p.eff}</td><td>${p.q}</td><td>${p.ch}</td></tr>`;
  $("#polPro").textContent = p.pro; $("#polCon").textContent = p.con;
  $$("#polBtns button").forEach((b, k) => b.classList.toggle("pri", k === i));
}
POL.forEach((p, i) => { const b = document.createElement("button"); b.className = "b"; b.textContent = p.k; b.onclick = () => pol(i); $("#polBtns").appendChild(b); });
pol(1);

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Place each policy under its heading.", buckets: [{ label: "Controlling monopoly" }, { label: "Promoting competition" }, { label: "Protecting suppliers / employees" }], items: [
  { text: "Price cap (CPI − X)", b: 0 }, { text: "Rate-of-return regulation", b: 0 }, { text: "Performance targets", b: 0 },
  { text: "Deregulation", b: 1 }, { text: "Competitive tendering", b: 1 }, { text: "Privatisation", b: 1 }, { text: "Support for small businesses", b: 1 },
  { text: "A code limiting buyers' unfair terms", b: 2 }, { text: "Nationalisation", b: 2 }, { text: "Minimum wage", b: 2 },
] });
Lib.classify($("#cl2"), { prompt: "Strength or weakness of price cap regulation?", buckets: [{ label: "Strength" }, { label: "Weakness" }], items: [
  { text: "Firm keeps savings beyond X, so it cuts costs", b: 0 }, { text: "Prices rise more slowly for consumers", b: 0 }, { text: "Easy for consumers to understand", b: 0 },
  { text: "Regulator may set X wrongly (asymmetric information)", b: 1 }, { text: "Firm may cut quality to protect profit", b: 1 }, { text: "Regulatory capture could weaken the cap", b: 1 },
] });
Lib.match($("#m1"), { prompt: "Match each term to its meaning.", pairs: [
  ["Regulatory capture", "The regulator acts in the industry's interests rather than consumers'"],
  ["Privatisation", "Transfer of ownership from public to private sector"],
  ["Nationalisation", "Government takes ownership of a private firm"],
  ["Deregulation", "Removal of rules that restrict entry or behaviour"],
  ["Competitive tendering", "Firms bid to deliver a public service"],
  ["CPI − X", "A price-cap formula: inflation minus an efficiency target"],
] });
Lib.calc($("#c1"), { qs: [
  { q: "A regulator caps price rises at CPI − X. CPI is 4% and X is 1.5%. By what percentage may the price rise?", a: 2.5, tol: 0.01, sol: "4 − 1.5 = <b>2.5%</b>." },
  { q: "The price is £200. It is allowed to rise by CPI − X = 3%. What is the maximum new price (£)?", a: 206, sol: "200 × 1.03 = <b>£206</b>." },
  { q: "A natural monopoly sells 20 units at £4 with average cost £4. Calculate its profit (£).", a: 0, sol: "(4 − 4) × 20 = <b>£0</b>: normal profit." },
  { q: "A firm sells 22.5 units at £2 with average cost £3.78. Calculate its loss, to the nearest pound (£).", a: 40, tol: 0.6, sol: "(3.78 − 2) × 22.5 ≈ <b>£40</b>." },
  { q: "Unregulated, a monopolist sells 11.25 units at £11 with AC £5.56. Calculate profit to the nearest pound (£).", a: 61, tol: 0.6, sol: "(11 − 5.56) × 11.25 ≈ <b>£61</b>." },
] });
Lib.quiz($("#qz1"), { qs: [
  { q: "CPI − X regulation is a form of:", opts: ["Merger control", "Price regulation", "Nationalisation", "Deregulation"], a: 1, why: "It limits price rises." },
  { q: "A potential drawback of price caps is:", opts: ["Higher prices", "Firms may cut quality", "More monopoly", "Less competition for contracts"], a: 1, why: "Firms protect profit by cutting costs, possibly including quality." },
  { q: "Regulatory capture occurs when:", opts: ["A regulator is too strict", "A regulator favours the industry it regulates", "A firm leaves the market", "Competition increases"], a: 1, why: "The regulator acts in firms' interests." },
  { q: "Which is an example of deregulation?", opts: ["Introducing a price cap", "Removing licensing requirements to enter a market", "Nationalising a railway", "Blocking a merger"], a: 1, why: "It lowers barriers to entry." },
  { q: "Competitive tendering is:", opts: ["Selling public firms to shareholders", "Firms bidding for contracts to deliver services", "Capping prices", "Regulating profit"], a: 1, why: "Competition for the contract." },
  { q: "Nationalisation involves:", opts: ["Selling a firm to the private sector", "Government ownership of a firm", "Breaking up a monopoly", "A price cap"], a: 1, why: "The state takes ownership." },
  { q: "Asymmetric information limits regulation because:", opts: ["Firms know more about their costs than the regulator", "Regulators know more than firms", "Consumers know everything", "Prices are fixed"], a: 0, why: "The regulator may set the cap wrongly." },
  { q: "Which policy aims to protect suppliers from a dominant buyer?", opts: ["Price cap on a monopolist", "Restrictions on monopsony power", "Privatisation", "Performance targets"], a: 1, why: "It limits unfair buyer power." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Competition authority (CMA)", "UK body that investigates mergers and anti-competitive behaviour."],
  ["Merger control", "Government powers to block or condition mergers."],
  ["Price cap (CPI − X)", "Limit on price rises set by a regulator, equal to inflation minus an efficiency factor."],
  ["Profit regulation", "Limits on a firm's profit, such as a maximum rate of return."],
  ["Quality standards", "Minimum standards of service or safety."],
  ["Performance targets", "Targets for service quality, with penalties if missed."],
  ["Deregulation", "Removing rules that restrict competition or entry."],
  ["Competitive tendering", "Firms bid for the right to provide a public service."],
  ["Privatisation", "Transfer of ownership from the public to the private sector."],
  ["Nationalisation", "Transfer of ownership from the private to the public sector."],
  ["Regulatory capture", "A regulator acting in the interests of the industry it regulates."],
  ["Asymmetric information", "One party knows more than the other, such as a firm knowing its costs better than the regulator."],
  ["Government failure", "Intervention that leads to a worse outcome than the market."],
] });
lab1();

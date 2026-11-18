/* Illustrative: LRAC = 20 + 800/Q (large fixed cost, constant marginal cost of 20), D: P = 80 - 0.5Q */
const PN = Plot({ xmax: 135, ymax: 90, xl: "Quantity of passenger journeys" });
const LR = (q) => 20 + 800 / q, DM = (q) => 80 - 0.5 * q;
const Q1 = (120 + Math.sqrt(120 * 120 - 4 * 1600)) / 2, Q2 = Q1 / 2, QMC = 120;
const op = (v) => ({ style: "opacity:" + v });

function railDraw(s) {
  let o = PN.axes() + PN.curve(LR, "c2", 16, 132) + PN.label(70, LR(70) + 4, "LRAC", "lbl bd t2");
  o += PN.seg(8, 20, 132, 20, "c4", op(s.mc)) + SV.text(PN.X(48), PN.Y(20) + 18, "LRMC", "lbl bd t4", { "text-anchor": "middle", style: "opacity:" + s.mc });
  o += PN.curve(DM, "c1", 8, 128, op(s.d)) + SV.text(PN.X(10), PN.Y(DM(10)) - 6, "D", "lbl bd t1", { style: "opacity:" + s.d });
  o += `<g style="opacity:${s.one}">` + PN.guide(Q1, LR(Q1)) + PN.dot(Q1, LR(Q1)) + SV.text(PN.X(Q1), PN.Y(0) + 18, "Q₁", "sm bd", { "text-anchor": "middle" }) + SV.text(PN.X(0) - 8, PN.Y(LR(Q1)) + 4, "C₁", "sm bd", { "text-anchor": "end" }) + "</g>";
  o += `<g style="opacity:${s.two}">` + PN.guide(Q2, LR(Q2)) + PN.dot(Q2, LR(Q2), "dot2") + SV.text(PN.X(Q2), PN.Y(0) + 18, "Q₁/2", "sm bd t2", { "text-anchor": "middle" }) + SV.text(PN.X(0) - 8, PN.Y(LR(Q2)) + 4, "C₂", "sm bd t2", { "text-anchor": "end" }) + "</g>";
  o += `<g style="opacity:${s.mc2}">` + PN.dot(QMC, 20, "dot4", 6) + PN.dot(QMC, LR(QMC), "dot2", 6) + SV.text(PN.X(QMC) - 10, PN.Y(20) + 20, "P = MC", "sm bd t4", { "text-anchor": "end" }) + SV.text(PN.X(QMC) - 10, PN.Y(LR(QMC)) - 12, "AC above price", "sm bd t2", { "text-anchor": "end" }) + "</g>";
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 400, label: "Natural monopoly: LRAC, LRMC and demand", base: { mc: 0, d: 0, one: 0, two: 0, mc2: 0 }, tween: 800, draw: railDraw, steps: [
  { cap: "<b>LRAC</b> falls across the whole range. Laying track and building stations are huge fixed costs, spread over more passengers as output rises.", s: {} },
  { cap: "<b>LRMC</b> is low and constant: one more passenger or train adds little cost. Because MC stays below AC, AC keeps falling.", s: { mc: 1 } },
  { cap: "<b>Demand (D)</b> cuts LRAC while LRAC is still falling. This is what makes it a natural monopoly: the market is too small for the cost curve to turn up.", s: { mc: 1, d: 1 } },
  { cap: "<b>One network</b> supplies Q₁ at average cost C₁, using all the economies of scale.", s: { mc: 1, d: 1, one: 1 } },
  { cap: "<b>Two networks</b> would each supply Q₁/2, where average cost (C₂) is higher. Duplicated track pushes average cost up, so fares may have to rise.", s: { mc: 1, d: 1, one: 1, two: 1 } },
  { cap: "<b>Allocative efficiency</b> (P = MC) is at a quantity where price is below average cost, so the network could make a loss and need a subsidy to fund off-peak services.", s: { mc: 1, d: 1, one: 1, two: 1, mc2: 1 } },
] });

Lib.classify($("#cl1"), { prompt: "Does each point support or challenge the view that the rail network is a natural monopoly?", buckets: [{ label: "Supports (natural monopoly)" }, { label: "Challenges (not a natural monopoly)" }], items: [
  { text: "Huge fixed cost of 32,000 km of track and 2,500 stations", b: 0 }, { text: "Two networks would duplicate fixed costs and raise fares", b: 0 }, { text: "Only one operator can use all the economies of scale", b: 0 }, { text: "Efficient pricing needs large subsidies, so one network is cheaper overall", b: 0 },
  { text: "Government wants companies to bid to build new lines", b: 1 }, { text: "Train operating companies already compete on the track", b: 1 }, { text: "Lines and stations could be leased to rivals", b: 1 }, { text: "Possible managerial slack and closure of lines (diseconomies of scale)", b: 1 },
] });
Lib.order($("#o1"), { prompt: "Order the chain of reasoning for the case that rail is a natural monopoly.", items: [
  "The network has 32,000 km of track and 2,500 stations, so fixed costs are enormous",
  "One more passenger or train adds very little cost",
  "Fixed costs are spread over more passengers as output rises",
  "LRAC keeps falling over the range of market demand",
  "One firm supplies the market at lower average cost than two",
], done: "Fixed costs → low marginal cost → falling LRAC → one firm is cheapest." });
Lib.quiz($("#qz1"), { qs: [
  { q: "Which is the best definition of a natural monopoly?", opts: ["A firm owned by the state", "One firm can supply the whole market at a lower average cost than two or more because LRAC keeps falling over the range of demand", "A firm protected by legal barriers", "A firm with a large market share"], a: 1, why: "It is about the cost structure, not ownership, barriers or share." },
  { q: "Why might two rail networks raise average cost?", opts: ["Higher wages", "Fixed costs of track and stations are duplicated and spread over fewer passengers each", "Higher marginal cost per passenger", "Lower demand"], a: 1, why: "Duplicated fixed costs over less output push average cost up, so fares may rise." },
  { q: "How should the transport secretary's support for private sector involvement be used?", opts: ["As proof competition lowers costs", "As a viewpoint from someone with a stake, showing government sees part of the network as contestable", "It should be ignored", "As evidence the network is a natural monopoly"], a: 1, why: "Evaluation marks reward recognising viewpoints and being critical of the evidence." },
  { q: "Which part of the rail industry fits the natural monopoly definition least well?", opts: ["The track", "The stations", "Train operating companies", "The whole network"], a: 2, why: "Train operators already compete to run services; the infrastructure is where the cost structure applies." },
  { q: "On the diagram, what makes the market a natural monopoly?", opts: ["Demand cuts LRAC where LRAC is rising", "Demand cuts LRAC where LRAC is still falling", "MC is above AC", "Demand is perfectly elastic"], a: 1, why: "The market is too small for the cost curve to turn up, so one firm is the cheapest supplier." },
] });

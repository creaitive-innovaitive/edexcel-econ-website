const op = (v) => ({ style: "opacity:" + v });
const PLb = Plot({ xmax: 160, ymax: 22, xl: "Workers (L)", yl: "Wage (£ per hour)" });
const Dl = (a) => (l) => a - 0.1 * l, Sl = (c) => (l) => c + 0.1 * l;
const eqL = (a, c) => { const L = (a - c) / 0.2; return [L, c + 0.1 * L]; };

/* ---------- 1. competitive shifts ---------- */
function shiftDraw(s) {
  const [L, W] = eqL(s.a, s.c), [L0, W0] = eqL(20, 4);
  let o = PLb.axes() + PLb.curve(Dl(20), "c1", 0, 160, op(s.a > 20.1 ? 0.35 : 1)) + PLb.curve(Sl(4), "c3", 0, 160, op(s.c < 3.9 ? 0.35 : 1));
  if (s.a > 20.1) o += PLb.curve(Dl(s.a), "c1", 0, 160) + PLb.label(158, s.a - 15.8 + 1.2, "D₁", "lbl bd t1", "end");
  if (s.c < 3.9) o += PLb.curve(Sl(s.c), "c3", 0, 160) + PLb.label(158, s.c + 15.8 - 1.6, "S₁", "lbl bd t3", "end");
  o += PLb.label(158, 20 - 15.8 + 1.2, "D", "lbl bd t1", "end") + PLb.label(158, 4 + 15.8 + 0.9, "S", "lbl bd t3", "end");
  o += PLb.guide(L, W) + PLb.dot(L, W) + PLb.ty(W, "£" + Lib.fmtN(W, 2)) + PLb.tx(L, Lib.fmtN(L, 0));
  if (s.a > 20.1 || s.c < 3.9) o += PLb.dot(L0, W0, "dot4", 5, op(0.7));
  return o;
}
Lib.stepper($("#stA"), { w: 760, h: 400, label: "Shifts in a competitive labour market", base: { a: 20, c: 4 }, tween: 1100, draw: shiftDraw, steps: [
  { cap: "Labour demand (MRP) slopes down and labour supply slopes up. They meet at <b>£12 and 80 workers</b>: the market clears.", s: { a: 20, c: 4 } },
  { cap: "Demand for the <b>product</b> rises. Because labour demand is <b>derived</b> from product demand, firms want more workers at every wage: <b>D shifts right</b>. Wage rises to £14 and employment to 100.", s: { a: 24, c: 4 } },
  { cap: "Now <b>labour supply increases</b> (for example through migration or more people entering the occupation): S shifts right. The wage falls back to £13 and employment rises to 110.", s: { a: 24, c: 2 } },
  { cap: "<b>Remember:</b> wage changes cause <b>movements along</b> the curves. Anything else (product demand, productivity, training, population) shifts them.", s: { a: 24, c: 2 } },
] });

/* ---------- 2. minimum wage ---------- */
function mwDraw(s) {
  const w = s.w, Ld = (20 - w) / 0.1, Ls = (w - 4) / 0.1, un = Math.max(0, Ls - Ld);
  let o = PLb.axes() + PLb.curve(Dl(20), "c1", 0, 160) + PLb.curve(Sl(4), "c3", 0, 160) + PLb.label(158, 2.8, "D = MRP", "lbl bd t1", "end") + PLb.label(158, 18.2, "S", "lbl bd t3", "end");
  o += PLb.dot(80, 12, "dot4", 5) + PLb.ty(12, "£12") + PLb.tx(80, "80");
  if (w > 12.01) {
    o += PLb.seg(0, w, 160, w, "c2", { "stroke-dasharray": "6 5", style: "opacity:" + s.f }) + SV.text(PLb.X(158), PLb.Y(w) - 8, "Minimum wage", "lbl bd t2", { "text-anchor": "end", style: "opacity:" + s.f });
    o += `<g style="opacity:${s.q}">` + PLb.seg(Ld, 0, Ld, w, "gr") + PLb.seg(Ls, 0, Ls, w, "gr") + PLb.dot(Ld, w, "dot1", 5) + PLb.dot(Ls, w, "dot3", 5) + PLb.tx(Ld, "Ld = " + Lib.fmtN(Ld, 0)) + PLb.tx(Ls, "Ls = " + Lib.fmtN(Ls, 0)) + "</g>";
    o += PLb.rect(Ld, w, Ls, w + 1.4, "f2", { style: "opacity:" + 0.5 * s.u }) + SV.text(PLb.X((Ld + Ls) / 2), PLb.Y(w + 2.4), "Unemployment = " + Lib.fmtN(un, 0), "lbl bd t2", { "text-anchor": "middle", style: "opacity:" + s.u });
  }
  return o;
}
Lib.stepper($("#stB"), { w: 760, h: 400, label: "Minimum wage in a competitive market", base: { w: 14, f: 0, q: 0, u: 0 }, tween: 900, draw: mwDraw, steps: [
  { cap: "In a <b>competitive</b> market the wage is £12 and 80 workers are employed.", s: { w: 14, f: 0, q: 0, u: 0 } },
  { cap: "The government sets a <b>minimum wage of £14</b>, above the equilibrium. It is a <b>price floor</b>.", s: { w: 14, f: 1, q: 0, u: 0 } },
  { cap: "At £14 firms demand only <b>60 workers</b> (a movement up the demand curve) while <b>100 people</b> want to work (a movement up the supply curve).", s: { w: 14, f: 1, q: 1, u: 0 } },
  { cap: "The result is a <b>surplus of labour: 40 unemployed</b>. Workers who keep their jobs gain; the 20 who lose theirs lose out.", s: { w: 14, f: 1, q: 1, u: 1 } },
  { cap: "<b>Evaluate:</b> the job loss is bigger if demand for labour is <b>elastic</b>. If the employer has <b>monopsony power</b> (3.4.6), a minimum wage could raise employment instead.", s: { w: 14, f: 1, q: 1, u: 1 } },
] });

/* ---------- labs ---------- */
function lab1() {
  if (!$("#la") || !$("#lc")) return;
  const a = +$("#la").value, c = +$("#lc").value, [L, W] = eqL(a, c), [L0, W0] = eqL(20, 4);
  $("#a1").textContent = "£" + Lib.fmtN(W, 2); $("#a2").textContent = Lib.fmtN(L, 0);
  const dw = W - W0, dl = L - L0;
  $("#av").textContent = a === 20 && c === 4 ? "Starting point: £12 and 80 workers." : `Compared with the start: wage ${dw >= 0 ? "up" : "down"} £${Lib.fmtN(Math.abs(dw), 2)}, employment ${dl >= 0 ? "up" : "down"} ${Lib.fmtN(Math.abs(dl), 0)}.` + (a > 20 && c === 4 ? " Demand has risen, so both rise." : c < 4 && a === 20 ? " Supply has risen: wage falls, employment rises." : "");
  $("#lab1").innerHTML = PLb.axes() + PLb.curve(Dl(20), "c1", 0, 160, op(0.3)) + PLb.curve(Sl(4), "c3", 0, 160, op(0.3)) + PLb.curve(Dl(a), "c1", 0, 160) + PLb.curve(Sl(c), "c3", 0, 160)
    + PLb.guide(L, W) + PLb.dot(L, W) + PLb.ty(W, "£" + Lib.fmtN(W, 2)) + PLb.tx(L, Lib.fmtN(L, 0)) + PLb.label(158, a - 15.8 + 1.2, "D", "lbl bd t1", "end") + PLb.label(158, c + 15.8 - 1.6, "S", "lbl bd t3", "end");
}
Lib.slider($("#g1"), { id: "la", label: "Demand (intercept a)", min: 14, max: 26, step: 1, value: 20, fmt: (v) => v, onInput: lab1 });
Lib.slider($("#g2"), { id: "lc", label: "Supply (intercept c; lower = more supply)", min: 0, max: 8, step: 0.5, value: 4, fmt: (v) => v.toFixed(1), onInput: lab1 });
function lab2() {
  if (!$("#lk")) return;
  const k = +$("#lk").value, Ld = 80 - 2 / k, Ls = 100, un = Ls - Ld;
  $("#b1").textContent = Lib.fmtN(Math.max(0, Ld), 1); $("#b2").textContent = Lib.fmtN(80 - Math.max(0, Ld), 1); $("#b3").textContent = Ls; $("#b4").textContent = Lib.fmtN(Ls - Math.max(0, Ld), 1);
  $("#bv").textContent = k <= 0.08 ? "Elastic demand for labour: a flat demand curve means the wage floor destroys many jobs." : k >= 0.25 ? "Inelastic demand for labour: a steep demand curve means few jobs are lost, so low-paid workers gain more." : "Moderately elastic demand: some jobs lost, but wage gains for those who remain.";
  const D = (l) => 12 - k * (l - 80);
  $("#lab2").innerHTML = PLb.axes() + PLb.curve(D, "c1", 0, 160) + PLb.curve(Sl(4), "c3", 0, 160) + PLb.seg(0, 14, 160, 14, "c2", { "stroke-dasharray": "6 5" })
    + PLb.dot(Math.max(0, Ld), 14, "dot1", 6) + PLb.dot(Ls, 14, "dot3", 6) + PLb.rect(Math.max(0, Ld), 14, Ls, 15.4, "f2", { style: "opacity:.5" }) + PLb.tx(Math.max(0, Ld), Lib.fmtN(Math.max(0, Ld), 0)) + PLb.tx(Ls, "100")
    + PLb.label(158, 18.2, "S", "lbl bd t3", "end") + PLb.label(158, 14.8, "Minimum wage £14", "lbl bd t2", "end");
}
Lib.slider($("#g3"), { id: "lk", label: "Steepness of labour demand (higher = less elastic)", min: 0.05, max: 0.4, step: 0.01, value: 0.1, fmt: (v) => v.toFixed(2), onInput: lab2 });

/* ---------- practise ---------- */
Lib.classify($("#cl1"), { prompt: "Does it affect the demand for labour or the supply of labour?", buckets: [{ label: "Demand for labour" }, { label: "Supply of labour" }], items: [
  { text: "Rise in demand for the product", b: 0 }, { text: "Improved productivity of workers", b: 0 }, { text: "Fall in the price of machinery", b: 0 }, { text: "Higher employer taxes on hiring", b: 0 },
  { text: "Longer training needed for the occupation", b: 1 }, { text: "Increase in migration", b: 1 }, { text: "Better working conditions", b: 1 }, { text: "Higher retirement age", b: 1 },
] });
Lib.classify($("#cl2"), { prompt: "Place each item.", buckets: [{ label: "Geographical immobility (cause)" }, { label: "Occupational immobility (cause)" }, { label: "Policy to reduce immobility" }], items: [
  { text: "High house prices in job-rich areas", b: 0 }, { text: "Family and community ties", b: 0 }, { text: "Skills no longer match the jobs available", b: 1 }, { text: "Lack of qualifications for a new career", b: 1 },
  { text: "Retraining and apprenticeship schemes", b: 2 }, { text: "Relocation grants", b: 2 }, { text: "Affordable housing in growth regions", b: 2 },
] });
Lib.order($("#o1"), { prompt: "Order the chain of reasoning for a minimum wage above equilibrium in a competitive market.", items: [
  "Government sets a minimum wage above the equilibrium wage",
  "Firms' labour costs rise",
  "Quantity of labour demanded falls (movement along demand)",
  "Quantity of labour supplied rises (movement along supply)",
  "A surplus of labour: unemployment",
], done: "A price floor creates a surplus." });
Lib.calc($("#c1"), { qs: [
  { q: "A worker's marginal physical product is 5 units and each unit sells for £8 (price taker). Calculate MRP (£).", a: 40, sol: "MRP = MPP × MR = 5 × 8 = <b>£40</b>." },
  { q: "Wage rises by 10% and employment falls by 5%. Calculate the elasticity of demand for labour (ignore the sign).", a: 0.5, tol: 0.01, sol: "5 ÷ 10 = <b>0.5</b>: inelastic." },
  { q: "At a minimum wage firms demand 60 workers and 100 want to work. How many are unemployed?", a: 40, sol: "100 − 60 = <b>40</b>." },
  { q: "A firm employs 100 workers at £12 an hour for 40 hours a week. Calculate the weekly wage bill (£).", a: 48000, sol: "100 × 12 × 40 = <b>£48,000</b>." },
  { q: "Employment falls from 80 to 60 after a wage floor. Calculate the percentage fall in employment.", a: 25, sol: "20 ÷ 80 × 100 = <b>25%</b>." },
] });
Lib.quiz($("#qz1"), { qs: [
  { q: "Demand for labour is a derived demand because it depends on:", opts: ["The wage rate only", "Demand for the product workers produce", "Government spending", "Union power"], a: 1, why: "Firms hire labour to produce goods people want." },
  { q: "MRP is calculated as:", opts: ["MPP ÷ MR", "MPP × MR", "Wage × employment", "Price ÷ MPP"], a: 1, why: "MRP = marginal physical product × marginal revenue." },
  { q: "Which would shift the demand for labour to the right?", opts: ["Higher wages", "A rise in product demand", "More migration", "Longer training"], a: 1, why: "Derived demand rises." },
  { q: "Demand for labour is likely to be less elastic when:", opts: ["Labour is a large share of costs", "Capital is a close substitute", "Labour is a small share of costs", "The time period is long"], a: 2, why: "A wage rise has little effect on total costs." },
  { q: "A minimum wage set above equilibrium in a competitive market causes:", opts: ["A shortage of labour", "A surplus of labour", "No change", "Lower supply"], a: 1, why: "Quantity supplied exceeds quantity demanded." },
  { q: "Geographical immobility is most likely caused by:", opts: ["Skills mismatch", "High house prices in job-rich areas", "A lack of qualifications", "Automation"], a: 1, why: "House prices and family ties stop people moving." },
  { q: "A policy to reduce occupational immobility is:", opts: ["Raising the minimum wage", "Retraining and apprenticeship schemes", "Cutting the housing supply", "Raising interest rates"], a: 1, why: "It builds the skills needed to change jobs." },
  { q: "Public sector pay caps below the market wage are likely to cause:", opts: ["Recruitment and retention problems", "Higher productivity", "Lower government spending only", "A surplus of workers"], a: 0, why: "Staff may leave or not apply." },
] });
Lib.cards($("#fc1"), { cards: [
  ["Derived demand", "Demand for a factor of production that depends on demand for the product it makes."],
  ["Marginal revenue product (MRP)", "The extra revenue from employing one more worker: MPP × MR."],
  ["Marginal physical product (MPP)", "The extra output from one more worker."],
  ["Elasticity of demand for labour", "Responsiveness of employment to a change in the wage rate."],
  ["Elasticity of supply of labour", "Responsiveness of labour supplied to a change in the wage rate."],
  ["Geographical immobility", "Workers cannot or will not move to where jobs are."],
  ["Occupational immobility", "Workers cannot easily switch from one type of job to another."],
  ["Structural unemployment", "Unemployment caused by a mismatch of skills or location."],
  ["Wage differential", "A difference in pay between occupations or groups."],
  ["Minimum wage", "A legal wage floor set by the government."],
  ["Maximum wage", "A legal cap on pay."],
  ["Public sector pay setting", "Government (or pay review bodies) sets wages for public employees."],
  ["Participation rate", "The proportion of the working-age population in work or seeking work."],
  ["Trade union", "A group of workers that bargain together for pay and conditions."],
] });
lab1(); lab2();

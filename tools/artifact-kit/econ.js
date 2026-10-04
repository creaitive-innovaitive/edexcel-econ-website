/* Generic axes-and-curves helper for micro diagrams. Plot({xmax,ymax,xl,yl}) returns mapping and drawing functions that build SVG strings. */
function Plot(o) {
  const W = o.W || 760, H = o.H || 400, l = o.l || 66, r = o.r || 36, t = o.t || 26, b = o.b || 50;
  const X = (x) => l + (x / o.xmax) * (W - l - r), Y = (y) => H - b - (y / o.ymax) * (H - t - b);
  const P = { W, H, X, Y };
  P.axes = () => SV.line(X(0), Y(o.ymax), X(0), Y(0)) + SV.line(X(0), Y(0), X(o.xmax), Y(0))
    + SV.text(X(0) + 8, t - 6, o.yl || "Price / costs (£)", "sm") + SV.text(X(o.xmax), Y(0) + 34, o.xl || "Quantity", "sm", { "text-anchor": "end" });
  P.curve = (f, cls = "c1", x0 = 0, x1 = o.xmax, extra) => {
    const pts = [];
    for (let i = 0; i <= 80; i++) { const x = x0 + (x1 - x0) * i / 80, y = f(x); if (isFinite(y) && y >= -0.001 && y <= o.ymax) pts.push([X(x), Y(y)]); }
    return pts.length > 1 ? SV.path(ptsPath(pts), cls, extra) : "";
  };
  P.seg = (xa, ya, xb, yb, cls = "c1", extra) => SV.line(X(xa), Y(ya), X(xb), Y(yb), cls, extra);
  P.label = (x, y, txt, cls = "lbl bd t1", anchor = "start") => SV.text(X(x) + 4, Y(y) + 4, txt, cls, { "text-anchor": anchor });
  P.guide = (x, y, extra) => SV.line(X(0), Y(y), X(x), Y(y), "gr", extra) + SV.line(X(x), Y(y), X(x), Y(0), "gr", extra);
  P.dot = (x, y, cls = "dot1", r = 6, extra) => SV.circle(X(x), Y(y), r, cls, extra);
  P.tx = (x, txt, cls = "sm") => SV.text(X(x), Y(0) + 18, txt, cls, { "text-anchor": "middle" });
  P.ty = (y, txt, cls = "sm") => SV.text(X(0) - 8, Y(y) + 4, txt, cls, { "text-anchor": "end" });
  P.rect = (xa, ya, xb, yb, cls = "f1", extra) => SV.rect(X(xa), Y(yb), X(xb) - X(xa), Y(ya) - Y(yb), cls, extra);
  return P;
}

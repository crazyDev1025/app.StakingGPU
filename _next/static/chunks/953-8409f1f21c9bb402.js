(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [953],
  {
    3466: function (t) {
      "use strict";
      t.exports = function (t) {
        if (t.length >= 255) throw TypeError("Alphabet too long");
        for (var e = new Uint8Array(256), n = 0; n < e.length; n++) e[n] = 255;
        for (var r = 0; r < t.length; r++) {
          var i = t.charAt(r),
            a = i.charCodeAt(0);
          if (255 !== e[a]) throw TypeError(i + " is ambiguous");
          e[a] = r;
        }
        var s = t.length,
          o = t.charAt(0),
          c = Math.log(s) / Math.log(256),
          l = Math.log(256) / Math.log(s);
        function u(t) {
          if ("string" != typeof t) throw TypeError("Expected String");
          if (0 === t.length) return new Uint8Array();
          for (var n = 0, r = 0, i = 0; t[n] === o; ) r++, n++;
          for (
            var a = ((t.length - n) * c + 1) >>> 0, l = new Uint8Array(a);
            t[n];

          ) {
            var u = e[t.charCodeAt(n)];
            if (255 === u) return;
            for (var d = 0, h = a - 1; (0 !== u || d < i) && -1 !== h; h--, d++)
              (u += (s * l[h]) >>> 0),
                (l[h] = u % 256 >>> 0),
                (u = (u / 256) >>> 0);
            if (0 !== u) throw Error("Non-zero carry");
            (i = d), n++;
          }
          for (var f = a - i; f !== a && 0 === l[f]; ) f++;
          for (var w = new Uint8Array(r + (a - f)), p = r; f !== a; )
            w[p++] = l[f++];
          return w;
        }
        return {
          encode: function (e) {
            if (
              (e instanceof Uint8Array ||
                (ArrayBuffer.isView(e)
                  ? (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength))
                  : Array.isArray(e) && (e = Uint8Array.from(e))),
              !(e instanceof Uint8Array))
            )
              throw TypeError("Expected Uint8Array");
            if (0 === e.length) return "";
            for (var n = 0, r = 0, i = 0, a = e.length; i !== a && 0 === e[i]; )
              i++, n++;
            for (
              var c = ((a - i) * l + 1) >>> 0, u = new Uint8Array(c);
              i !== a;

            ) {
              for (
                var d = e[i], h = 0, f = c - 1;
                (0 !== d || h < r) && -1 !== f;
                f--, h++
              )
                (d += (256 * u[f]) >>> 0),
                  (u[f] = d % s >>> 0),
                  (d = (d / s) >>> 0);
              if (0 !== d) throw Error("Non-zero carry");
              (r = h), i++;
            }
            for (var w = c - r; w !== c && 0 === u[w]; ) w++;
            for (var p = o.repeat(n); w < c; ++w) p += t.charAt(u[w]);
            return p;
          },
          decodeUnsafe: u,
          decode: function (t) {
            var e = u(t);
            if (e) return e;
            throw Error("Non-base" + s + " character");
          },
        };
      };
    },
    5180: function (t, e, n) {
      let r = n(3466);
      t.exports = r(
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      );
    },
    4677: function (t, e, n) {
      "use strict";
      n.d(e, {
        ZP: function () {
          return tI;
        },
      });
      var r,
        i,
        a,
        s,
        o,
        c,
        l,
        u,
        d,
        h,
        f,
        w = n(1964),
        p = {},
        y = 180 / Math.PI,
        g = Math.PI / 180,
        M = Math.atan2,
        m = /([A-Z])/g,
        v = /(left|right|width|margin|padding|x)/i,
        L = /[\s,\(]\S/,
        j = {
          autoAlpha: "opacity,visibility",
          scale: "scaleX,scaleY",
          alpha: "opacity",
        },
        N = function (t, e) {
          return e.set(
            e.t,
            e.p,
            Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u,
            e
          );
        },
        I = function (t, e) {
          return e.set(
            e.t,
            e.p,
            1 === t ? e.e : Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u,
            e
          );
        },
        E = function (t, e) {
          return e.set(
            e.t,
            e.p,
            t ? Math.round((e.s + e.c * t) * 1e4) / 1e4 + e.u : e.b,
            e
          );
        },
        S = function (t, e) {
          var n = e.s + e.c * t;
          e.set(e.t, e.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + e.u, e);
        },
        T = function (t, e) {
          return e.set(e.t, e.p, t ? e.e : e.b, e);
        },
        b = function (t, e) {
          return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        },
        x = function (t, e, n) {
          return (t.style[e] = n);
        },
        O = function (t, e, n) {
          return t.style.setProperty(e, n);
        },
        D = function (t, e, n) {
          return (t._gsap[e] = n);
        },
        A = function (t, e, n) {
          return (t._gsap.scaleX = t._gsap.scaleY = n);
        },
        z = function (t, e, n, r, i) {
          var a = t._gsap;
          (a.scaleX = a.scaleY = n), a.renderTransform(i, a);
        },
        _ = function (t, e, n, r, i) {
          var a = t._gsap;
          (a[e] = n), a.renderTransform(i, a);
        },
        C = "transform",
        R = C + "Origin",
        k = function t(e, n) {
          var r = this,
            i = this.target,
            a = i.style,
            s = i._gsap;
          if (e in p && a) {
            if (((this.tfm = this.tfm || {}), "transform" === e))
              return j.transform.split(",").forEach(function (e) {
                return t.call(r, e, n);
              });
            if (
              (~(e = j[e] || e).indexOf(",")
                ? e.split(",").forEach(function (t) {
                    return (r.tfm[t] = te(i, t));
                  })
                : (this.tfm[e] = s.x ? s[e] : te(i, e)),
              e === R && (this.tfm.zOrigin = s.zOrigin),
              this.props.indexOf(C) >= 0)
            )
              return;
            s.svg &&
              ((this.svgo = i.getAttribute("data-svg-origin")),
              this.props.push(R, n, "")),
              (e = C);
          }
          (a || n) && this.props.push(e, n, a[e]);
        },
        P = function (t) {
          t.translate &&
            (t.removeProperty("translate"),
            t.removeProperty("scale"),
            t.removeProperty("rotate"));
        },
        U = function () {
          var t,
            e,
            n = this.props,
            r = this.target,
            i = r.style,
            a = r._gsap;
          for (t = 0; t < n.length; t += 3)
            n[t + 1]
              ? (r[n[t]] = n[t + 2])
              : n[t + 2]
              ? (i[n[t]] = n[t + 2])
              : i.removeProperty(
                  "--" === n[t].substr(0, 2)
                    ? n[t]
                    : n[t].replace(m, "-$1").toLowerCase()
                );
          if (this.tfm) {
            for (e in this.tfm) a[e] = this.tfm[e];
            a.svg &&
              (a.renderTransform(),
              r.setAttribute("data-svg-origin", this.svgo || "")),
              ((t = h()) && t.isStart) ||
                i[C] ||
                (P(i),
                a.zOrigin &&
                  i[R] &&
                  ((i[R] += " " + a.zOrigin + "px"),
                  (a.zOrigin = 0),
                  a.renderTransform()),
                (a.uncache = 1));
          }
        },
        W = function (t, e) {
          var n = { target: t, props: [], revert: U, save: k };
          return (
            t._gsap || w.p8.core.getCache(t),
            e &&
              e.split(",").forEach(function (t) {
                return n.save(t);
              }),
            n
          );
        },
        Y = function (t, e) {
          var n = o.createElementNS
            ? o.createElementNS(
                (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
                t
              )
            : o.createElement(t);
          return n && n.style ? n : o.createElement(t);
        },
        B = function t(e, n, r) {
          var i = getComputedStyle(e);
          return (
            i[n] ||
            i.getPropertyValue(n.replace(m, "-$1").toLowerCase()) ||
            i.getPropertyValue(n) ||
            (!r && t(e, Z(n) || n, 1)) ||
            ""
          );
        },
        Q = "O,Moz,ms,Ms,Webkit".split(","),
        Z = function (t, e, n) {
          var r = (e || u).style,
            i = 5;
          if (t in r && !n) return t;
          for (
            t = t.charAt(0).toUpperCase() + t.substr(1);
            i-- && !(Q[i] + t in r);

          );
          return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? Q[i] : "") + t;
        },
        G = function () {
          "undefined" != typeof window &&
            window.document &&
            ((c = (o = window.document).documentElement),
            (u = Y("div") || { style: {} }),
            Y("div"),
            (R = (C = Z(C)) + "Origin"),
            (u.style.cssText =
              "border-width:0;line-height:0;position:absolute;padding:0"),
            (f = !!Z("perspective")),
            (h = w.p8.core.reverting),
            (l = 1));
        },
        F = function t(e) {
          var n,
            r = Y(
              "svg",
              (this.ownerSVGElement &&
                this.ownerSVGElement.getAttribute("xmlns")) ||
                "http://www.w3.org/2000/svg"
            ),
            i = this.parentNode,
            a = this.nextSibling,
            s = this.style.cssText;
          if (
            (c.appendChild(r),
            r.appendChild(this),
            (this.style.display = "block"),
            e)
          )
            try {
              (n = this.getBBox()),
                (this._gsapBBox = this.getBBox),
                (this.getBBox = t);
            } catch (t) {}
          else this._gsapBBox && (n = this._gsapBBox());
          return (
            i && (a ? i.insertBefore(this, a) : i.appendChild(this)),
            c.removeChild(r),
            (this.style.cssText = s),
            n
          );
        },
        H = function (t, e) {
          for (var n = e.length; n--; )
            if (t.hasAttribute(e[n])) return t.getAttribute(e[n]);
        },
        V = function (t) {
          var e;
          try {
            e = t.getBBox();
          } catch (n) {
            e = F.call(t, !0);
          }
          return (
            (e && (e.width || e.height)) ||
              t.getBBox === F ||
              (e = F.call(t, !0)),
            !e || e.width || e.x || e.y
              ? e
              : {
                  x: +H(t, ["x", "cx", "x1"]) || 0,
                  y: +H(t, ["y", "cy", "y1"]) || 0,
                  width: 0,
                  height: 0,
                }
          );
        },
        K = function (t) {
          return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && V(t));
        },
        $ = function (t, e) {
          if (e) {
            var n,
              r = t.style;
            e in p && e !== R && (e = C),
              r.removeProperty
                ? (("ms" === (n = e.substr(0, 2)) ||
                    "webkit" === e.substr(0, 6)) &&
                    (e = "-" + e),
                  r.removeProperty(
                    "--" === n ? e : e.replace(m, "-$1").toLowerCase()
                  ))
                : r.removeAttribute(e);
          }
        },
        X = function (t, e, n, r, i, a) {
          var s = new w.Fo(t._pt, e, n, 0, 1, a ? b : T);
          return (t._pt = s), (s.b = r), (s.e = i), t._props.push(n), s;
        },
        J = { deg: 1, rad: 1, turn: 1 },
        q = { grid: 1, flex: 1 },
        tt = function t(e, n, r, i) {
          var a,
            s,
            c,
            l,
            d = parseFloat(r) || 0,
            h = (r + "").trim().substr((d + "").length) || "px",
            f = u.style,
            y = v.test(n),
            g = "svg" === e.tagName.toLowerCase(),
            M = (g ? "client" : "offset") + (y ? "Width" : "Height"),
            m = "px" === i,
            L = "%" === i;
          if (i === h || !d || J[i] || J[h]) return d;
          if (
            ("px" === h || m || (d = t(e, n, r, "px")),
            (l = e.getCTM && K(e)),
            (L || "%" === h) && (p[n] || ~n.indexOf("adius")))
          )
            return (
              (a = l ? e.getBBox()[y ? "width" : "height"] : e[M]),
              (0, w.Pr)(L ? (d / a) * 100 : (d / 100) * a)
            );
          if (
            ((f[y ? "width" : "height"] = 100 + (m ? h : i)),
            (s =
              ~n.indexOf("adius") || ("em" === i && e.appendChild && !g)
                ? e
                : e.parentNode),
            l && (s = (e.ownerSVGElement || {}).parentNode),
            (s && s !== o && s.appendChild) || (s = o.body),
            (c = s._gsap) &&
              L &&
              c.width &&
              y &&
              c.time === w.xr.time &&
              !c.uncache)
          )
            return (0, w.Pr)((d / c.width) * 100);
          if (L && ("height" === n || "width" === n)) {
            var j = e.style[n];
            (e.style[n] = 100 + i), (a = e[M]), j ? (e.style[n] = j) : $(e, n);
          } else
            (L || "%" === h) &&
              !q[B(s, "display")] &&
              (f.position = B(e, "position")),
              s === e && (f.position = "static"),
              s.appendChild(u),
              (a = u[M]),
              s.removeChild(u),
              (f.position = "absolute");
          return (
            y && L && (((c = (0, w.DY)(s)).time = w.xr.time), (c.width = s[M])),
            (0, w.Pr)(m ? (a * d) / 100 : a && d ? (100 / a) * d : 0)
          );
        },
        te = function (t, e, n, r) {
          var i;
          return (
            l || G(),
            e in j &&
              "transform" !== e &&
              ~(e = j[e]).indexOf(",") &&
              (e = e.split(",")[0]),
            p[e] && "transform" !== e
              ? ((i = tf(t, r)),
                (i =
                  "transformOrigin" !== e
                    ? i[e]
                    : i.svg
                    ? i.origin
                    : tw(B(t, R)) + " " + i.zOrigin + "px"))
              : (!(i = t.style[e]) ||
                  "auto" === i ||
                  r ||
                  ~(i + "").indexOf("calc(")) &&
                (i =
                  (ts[e] && ts[e](t, e, n)) ||
                  B(t, e) ||
                  (0, w.Ok)(t, e) ||
                  ("opacity" === e ? 1 : 0)),
            n && !~(i + "").trim().indexOf(" ") ? tt(t, e, i, n) + n : i
          );
        },
        tn = function (t, e, n, r) {
          if (!n || "none" === n) {
            var i = Z(e, t, 1),
              a = i && B(t, i, 1);
            a && a !== n
              ? ((e = i), (n = a))
              : "borderColor" === e && (n = B(t, "borderTopColor"));
          }
          var s,
            o,
            c,
            l,
            u,
            d,
            h,
            f,
            p,
            y,
            g,
            M = new w.Fo(this._pt, t.style, e, 0, 1, w.Ks),
            m = 0,
            v = 0;
          if (
            ((M.b = n),
            (M.e = r),
            (n += ""),
            "auto" == (r += "") &&
              ((d = t.style[e]),
              (t.style[e] = r),
              (r = B(t, e) || r),
              d ? (t.style[e] = d) : $(t, e)),
            (s = [n, r]),
            (0, w.kr)(s),
            (n = s[0]),
            (r = s[1]),
            (c = n.match(w.d4) || []),
            (r.match(w.d4) || []).length)
          ) {
            for (; (o = w.d4.exec(r)); )
              (h = o[0]),
                (p = r.substring(m, o.index)),
                u
                  ? (u = (u + 1) % 5)
                  : ("rgba(" === p.substr(-5) || "hsla(" === p.substr(-5)) &&
                    (u = 1),
                h !== (d = c[v++] || "") &&
                  ((l = parseFloat(d) || 0),
                  (g = d.substr((l + "").length)),
                  "=" === h.charAt(1) && (h = (0, w.cy)(l, h) + g),
                  (f = parseFloat(h)),
                  (y = h.substr((f + "").length)),
                  (m = w.d4.lastIndex - y.length),
                  y ||
                    ((y = y || w.Fc.units[e] || g),
                    m !== r.length || ((r += y), (M.e += y))),
                  g !== y && (l = tt(t, e, d, y) || 0),
                  (M._pt = {
                    _next: M._pt,
                    p: p || 1 === v ? p : ",",
                    s: l,
                    c: f - l,
                    m: (u && u < 4) || "zIndex" === e ? Math.round : 0,
                  }));
            M.c = m < r.length ? r.substring(m, r.length) : "";
          } else M.r = "display" === e && "none" === r ? b : T;
          return w.bQ.test(r) && (M.e = 0), (this._pt = M), M;
        },
        tr = {
          top: "0%",
          bottom: "100%",
          left: "0%",
          right: "100%",
          center: "50%",
        },
        ti = function (t) {
          var e = t.split(" "),
            n = e[0],
            r = e[1] || "50%";
          return (
            ("top" === n || "bottom" === n || "left" === r || "right" === r) &&
              ((t = n), (n = r), (r = t)),
            (e[0] = tr[n] || n),
            (e[1] = tr[r] || r),
            e.join(" ")
          );
        },
        ta = function (t, e) {
          if (e.tween && e.tween._time === e.tween._dur) {
            var n,
              r,
              i,
              a = e.t,
              s = a.style,
              o = e.u,
              c = a._gsap;
            if ("all" === o || !0 === o) (s.cssText = ""), (r = 1);
            else
              for (i = (o = o.split(",")).length; --i > -1; )
                p[(n = o[i])] &&
                  ((r = 1), (n = "transformOrigin" === n ? R : C)),
                  $(a, n);
            r &&
              ($(a, C),
              c &&
                (c.svg && a.removeAttribute("transform"),
                tf(a, 1),
                (c.uncache = 1),
                P(s)));
          }
        },
        ts = {
          clearProps: function (t, e, n, r, i) {
            if ("isFromStart" !== i.data) {
              var a = (t._pt = new w.Fo(t._pt, e, n, 0, 0, ta));
              return (
                (a.u = r), (a.pr = -10), (a.tween = i), t._props.push(n), 1
              );
            }
          },
        },
        to = [1, 0, 0, 1, 0, 0],
        tc = {},
        tl = function (t) {
          return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
        },
        tu = function (t) {
          var e = B(t, C);
          return tl(e) ? to : e.substr(7).match(w.SI).map(w.Pr);
        },
        td = function (t, e) {
          var n,
            r,
            i,
            a,
            s = t._gsap || (0, w.DY)(t),
            o = t.style,
            l = tu(t);
          return s.svg && t.getAttribute("transform")
            ? "1,0,0,1,0,0" ===
              (l = [
                (i = t.transform.baseVal.consolidate().matrix).a,
                i.b,
                i.c,
                i.d,
                i.e,
                i.f,
              ]).join(",")
              ? to
              : l
            : (l !== to ||
                t.offsetParent ||
                t === c ||
                s.svg ||
                ((i = o.display),
                (o.display = "block"),
                ((n = t.parentNode) && t.offsetParent) ||
                  ((a = 1), (r = t.nextElementSibling), c.appendChild(t)),
                (l = tu(t)),
                i ? (o.display = i) : $(t, "display"),
                a &&
                  (r
                    ? n.insertBefore(t, r)
                    : n
                    ? n.appendChild(t)
                    : c.removeChild(t))),
              e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
        },
        th = function (t, e, n, r, i, a) {
          var s,
            o,
            c,
            l,
            u = t._gsap,
            d = i || td(t, !0),
            h = u.xOrigin || 0,
            f = u.yOrigin || 0,
            w = u.xOffset || 0,
            p = u.yOffset || 0,
            y = d[0],
            g = d[1],
            M = d[2],
            m = d[3],
            v = d[4],
            L = d[5],
            j = e.split(" "),
            N = parseFloat(j[0]) || 0,
            I = parseFloat(j[1]) || 0;
          n
            ? d !== to &&
              (o = y * m - g * M) &&
              ((c = (m / o) * N + (-M / o) * I + (M * L - m * v) / o),
              (l = (-g / o) * N + (y / o) * I - (y * L - g * v) / o),
              (N = c),
              (I = l))
            : ((N =
                (s = V(t)).x + (~j[0].indexOf("%") ? (N / 100) * s.width : N)),
              (I =
                s.y +
                (~(j[1] || j[0]).indexOf("%") ? (I / 100) * s.height : I))),
            r || (!1 !== r && u.smooth)
              ? ((v = N - h),
                (L = I - f),
                (u.xOffset = w + (v * y + L * M) - v),
                (u.yOffset = p + (v * g + L * m) - L))
              : (u.xOffset = u.yOffset = 0),
            (u.xOrigin = N),
            (u.yOrigin = I),
            (u.smooth = !!r),
            (u.origin = e),
            (u.originIsAbsolute = !!n),
            (t.style[R] = "0px 0px"),
            a &&
              (X(a, u, "xOrigin", h, N),
              X(a, u, "yOrigin", f, I),
              X(a, u, "xOffset", w, u.xOffset),
              X(a, u, "yOffset", p, u.yOffset)),
            t.setAttribute("data-svg-origin", N + " " + I);
        },
        tf = function (t, e) {
          var n = t._gsap || new w.l1(t);
          if ("x" in n && !e && !n.uncache) return n;
          var r,
            i,
            a,
            s,
            o,
            c,
            l,
            u,
            d,
            h,
            p,
            m,
            v,
            L,
            j,
            N,
            I,
            E,
            S,
            T,
            b,
            x,
            O,
            D,
            A,
            z,
            _,
            k,
            P,
            U,
            W,
            Y,
            Q = t.style,
            Z = n.scaleX < 0,
            G = getComputedStyle(t),
            F = B(t, R) || "0";
          return (
            (r = i = a = c = l = u = d = h = p = 0),
            (s = o = 1),
            (n.svg = !!(t.getCTM && K(t))),
            G.translate &&
              (("none" !== G.translate ||
                "none" !== G.scale ||
                "none" !== G.rotate) &&
                (Q[C] =
                  ("none" !== G.translate
                    ? "translate3d(" +
                      (G.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                      ") "
                    : "") +
                  ("none" !== G.rotate ? "rotate(" + G.rotate + ") " : "") +
                  ("none" !== G.scale
                    ? "scale(" + G.scale.split(" ").join(",") + ") "
                    : "") +
                  ("none" !== G[C] ? G[C] : "")),
              (Q.scale = Q.rotate = Q.translate = "none")),
            (L = td(t, n.svg)),
            n.svg &&
              (n.uncache
                ? ((A = t.getBBox()),
                  (F = n.xOrigin - A.x + "px " + (n.yOrigin - A.y) + "px"),
                  (D = ""))
                : (D = !e && t.getAttribute("data-svg-origin")),
              th(t, D || F, !!D || n.originIsAbsolute, !1 !== n.smooth, L)),
            (m = n.xOrigin || 0),
            (v = n.yOrigin || 0),
            L !== to &&
              ((E = L[0]),
              (S = L[1]),
              (T = L[2]),
              (b = L[3]),
              (r = x = L[4]),
              (i = O = L[5]),
              6 === L.length
                ? ((s = Math.sqrt(E * E + S * S)),
                  (o = Math.sqrt(b * b + T * T)),
                  (c = E || S ? M(S, E) * y : 0),
                  (d = T || b ? M(T, b) * y + c : 0) &&
                    (o *= Math.abs(Math.cos(d * g))),
                  n.svg &&
                    ((r -= m - (m * E + v * T)), (i -= v - (m * S + v * b))))
                : ((Y = L[6]),
                  (U = L[7]),
                  (_ = L[8]),
                  (k = L[9]),
                  (P = L[10]),
                  (W = L[11]),
                  (r = L[12]),
                  (i = L[13]),
                  (a = L[14]),
                  (l = (j = M(Y, P)) * y),
                  j &&
                    ((D = x * (N = Math.cos(-j)) + _ * (I = Math.sin(-j))),
                    (A = O * N + k * I),
                    (z = Y * N + P * I),
                    (_ = -(x * I) + _ * N),
                    (k = -(O * I) + k * N),
                    (P = -(Y * I) + P * N),
                    (W = -(U * I) + W * N),
                    (x = D),
                    (O = A),
                    (Y = z)),
                  (u = (j = M(-T, P)) * y),
                  j &&
                    ((D = E * (N = Math.cos(-j)) - _ * (I = Math.sin(-j))),
                    (A = S * N - k * I),
                    (z = T * N - P * I),
                    (W = b * I + W * N),
                    (E = D),
                    (S = A),
                    (T = z)),
                  (c = (j = M(S, E)) * y),
                  j &&
                    ((D = E * (N = Math.cos(j)) + S * (I = Math.sin(j))),
                    (A = x * N + O * I),
                    (S = S * N - E * I),
                    (O = O * N - x * I),
                    (E = D),
                    (x = A)),
                  l &&
                    Math.abs(l) + Math.abs(c) > 359.9 &&
                    ((l = c = 0), (u = 180 - u)),
                  (s = (0, w.Pr)(Math.sqrt(E * E + S * S + T * T))),
                  (o = (0, w.Pr)(Math.sqrt(O * O + Y * Y))),
                  (d = Math.abs((j = M(x, O))) > 2e-4 ? j * y : 0),
                  (p = W ? 1 / (W < 0 ? -W : W) : 0)),
              n.svg &&
                ((D = t.getAttribute("transform")),
                (n.forceCSS = t.setAttribute("transform", "") || !tl(B(t, C))),
                D && t.setAttribute("transform", D))),
            Math.abs(d) > 90 &&
              270 > Math.abs(d) &&
              (Z
                ? ((s *= -1),
                  (d += c <= 0 ? 180 : -180),
                  (c += c <= 0 ? 180 : -180))
                : ((o *= -1), (d += d <= 0 ? 180 : -180))),
            (e = e || n.uncache),
            (n.x =
              r -
              ((n.xPercent =
                r &&
                ((!e && n.xPercent) ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-r) ? -50 : 0)))
                ? (t.offsetWidth * n.xPercent) / 100
                : 0) +
              "px"),
            (n.y =
              i -
              ((n.yPercent =
                i &&
                ((!e && n.yPercent) ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-i)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * n.yPercent) / 100
                : 0) +
              "px"),
            (n.z = a + "px"),
            (n.scaleX = (0, w.Pr)(s)),
            (n.scaleY = (0, w.Pr)(o)),
            (n.rotation = (0, w.Pr)(c) + "deg"),
            (n.rotationX = (0, w.Pr)(l) + "deg"),
            (n.rotationY = (0, w.Pr)(u) + "deg"),
            (n.skewX = d + "deg"),
            (n.skewY = h + "deg"),
            (n.transformPerspective = p + "px"),
            (n.zOrigin =
              parseFloat(F.split(" ")[2]) || (!e && n.zOrigin) || 0) &&
              (Q[R] = tw(F)),
            (n.xOffset = n.yOffset = 0),
            (n.force3D = w.Fc.force3D),
            (n.renderTransform = n.svg ? tm : f ? tM : ty),
            (n.uncache = 0),
            n
          );
        },
        tw = function (t) {
          return (t = t.split(" "))[0] + " " + t[1];
        },
        tp = function (t, e, n) {
          var r = (0, w.Wy)(e);
          return (
            (0, w.Pr)(parseFloat(e) + parseFloat(tt(t, "x", n + "px", r))) + r
          );
        },
        ty = function (t, e) {
          (e.z = "0px"),
            (e.rotationY = e.rotationX = "0deg"),
            (e.force3D = 0),
            tM(t, e);
        },
        tg = "0deg",
        tM = function (t, e) {
          var n = e || this,
            r = n.xPercent,
            i = n.yPercent,
            a = n.x,
            s = n.y,
            o = n.z,
            c = n.rotation,
            l = n.rotationY,
            u = n.rotationX,
            d = n.skewX,
            h = n.skewY,
            f = n.scaleX,
            w = n.scaleY,
            p = n.transformPerspective,
            y = n.force3D,
            M = n.target,
            m = n.zOrigin,
            v = "",
            L = ("auto" === y && t && 1 !== t) || !0 === y;
          if (m && (u !== tg || l !== tg)) {
            var j,
              N = parseFloat(l) * g,
              I = Math.sin(N),
              E = Math.cos(N);
            (a = tp(M, a, -(I * (j = Math.cos((N = parseFloat(u) * g))) * m))),
              (s = tp(M, s, -(-Math.sin(N) * m))),
              (o = tp(M, o, -(E * j * m) + m));
          }
          "0px" !== p && (v += "perspective(" + p + ") "),
            (r || i) && (v += "translate(" + r + "%, " + i + "%) "),
            (L || "0px" !== a || "0px" !== s || "0px" !== o) &&
              (v +=
                "0px" !== o || L
                  ? "translate3d(" + a + ", " + s + ", " + o + ") "
                  : "translate(" + a + ", " + s + ") "),
            c !== tg && (v += "rotate(" + c + ") "),
            l !== tg && (v += "rotateY(" + l + ") "),
            u !== tg && (v += "rotateX(" + u + ") "),
            (d !== tg || h !== tg) && (v += "skew(" + d + ", " + h + ") "),
            (1 !== f || 1 !== w) && (v += "scale(" + f + ", " + w + ") "),
            (M.style[C] = v || "translate(0, 0)");
        },
        tm = function (t, e) {
          var n,
            r,
            i,
            a,
            s,
            o = e || this,
            c = o.xPercent,
            l = o.yPercent,
            u = o.x,
            d = o.y,
            h = o.rotation,
            f = o.skewX,
            p = o.skewY,
            y = o.scaleX,
            M = o.scaleY,
            m = o.target,
            v = o.xOrigin,
            L = o.yOrigin,
            j = o.xOffset,
            N = o.yOffset,
            I = o.forceCSS,
            E = parseFloat(u),
            S = parseFloat(d);
          (h = parseFloat(h)),
            (f = parseFloat(f)),
            (p = parseFloat(p)) && ((f += p = parseFloat(p)), (h += p)),
            h || f
              ? ((h *= g),
                (f *= g),
                (n = Math.cos(h) * y),
                (r = Math.sin(h) * y),
                (i = -(Math.sin(h - f) * M)),
                (a = Math.cos(h - f) * M),
                f &&
                  ((p *= g),
                  (i *= s = Math.sqrt(1 + (s = Math.tan(f - p)) * s)),
                  (a *= s),
                  p &&
                    ((n *= s = Math.sqrt(1 + (s = Math.tan(p)) * s)),
                    (r *= s))),
                (n = (0, w.Pr)(n)),
                (r = (0, w.Pr)(r)),
                (i = (0, w.Pr)(i)),
                (a = (0, w.Pr)(a)))
              : ((n = y), (a = M), (r = i = 0)),
            ((E && !~(u + "").indexOf("px")) ||
              (S && !~(d + "").indexOf("px"))) &&
              ((E = tt(m, "x", u, "px")), (S = tt(m, "y", d, "px"))),
            (v || L || j || N) &&
              ((E = (0, w.Pr)(E + v - (v * n + L * i) + j)),
              (S = (0, w.Pr)(S + L - (v * r + L * a) + N))),
            (c || l) &&
              ((s = m.getBBox()),
              (E = (0, w.Pr)(E + (c / 100) * s.width)),
              (S = (0, w.Pr)(S + (l / 100) * s.height))),
            (s =
              "matrix(" +
              n +
              "," +
              r +
              "," +
              i +
              "," +
              a +
              "," +
              E +
              "," +
              S +
              ")"),
            m.setAttribute("transform", s),
            I && (m.style[C] = s);
        },
        tv = function (t, e, n, r, i) {
          var a,
            s,
            o = (0, w.r9)(i),
            c = parseFloat(i) * (o && ~i.indexOf("rad") ? y : 1) - r,
            l = r + c + "deg";
          return (
            o &&
              ("short" === (a = i.split("_")[1]) &&
                (c %= 360) != c % 180 &&
                (c += c < 0 ? 360 : -360),
              "cw" === a && c < 0
                ? (c = ((c + 36e9) % 360) - 360 * ~~(c / 360))
                : "ccw" === a &&
                  c > 0 &&
                  (c = ((c - 36e9) % 360) - 360 * ~~(c / 360))),
            (t._pt = s = new w.Fo(t._pt, e, n, r, c, I)),
            (s.e = l),
            (s.u = "deg"),
            t._props.push(n),
            s
          );
        },
        tL = function (t, e) {
          for (var n in e) t[n] = e[n];
          return t;
        },
        tj = function (t, e, n) {
          var r,
            i,
            a,
            s,
            o,
            c,
            l,
            u = tL({}, n._gsap),
            d = n.style;
          for (i in (u.svg
            ? ((a = n.getAttribute("transform")),
              n.setAttribute("transform", ""),
              (d[C] = e),
              (r = tf(n, 1)),
              $(n, C),
              n.setAttribute("transform", a))
            : ((a = getComputedStyle(n)[C]),
              (d[C] = e),
              (r = tf(n, 1)),
              (d[C] = a)),
          p))
            (a = u[i]) !== (s = r[i]) &&
              0 > "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) &&
              ((o =
                (0, w.Wy)(a) !== (l = (0, w.Wy)(s))
                  ? tt(n, i, a, l)
                  : parseFloat(a)),
              (c = parseFloat(s)),
              (t._pt = new w.Fo(t._pt, r, i, o, c - o, N)),
              (t._pt.u = l || 0),
              t._props.push(i));
          tL(r, u);
        };
      (0, w.fS)("padding,margin,Width,Radius", function (t, e) {
        var n = "Right",
          r = "Bottom",
          i = "Left",
          a = (
            e < 3 ? ["Top", n, r, i] : ["Top" + i, "Top" + n, r + n, r + i]
          ).map(function (n) {
            return e < 2 ? t + n : "border" + n + t;
          });
        ts[e > 1 ? "border" + t : t] = function (t, e, n, r, i) {
          var s, o;
          if (arguments.length < 4)
            return 5 ===
              (o = (s = a.map(function (e) {
                return te(t, e, n);
              })).join(" ")).split(s[0]).length
              ? s[0]
              : o;
          (s = (r + "").split(" ")),
            (o = {}),
            a.forEach(function (t, e) {
              return (o[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
            }),
            t.init(e, o, i);
        };
      });
      var tN = {
        name: "css",
        register: G,
        targetTest: function (t) {
          return t.style && t.nodeType;
        },
        init: function (t, e, n, r, i) {
          var a,
            s,
            o,
            c,
            u,
            d,
            h,
            f,
            y,
            g,
            M,
            m,
            v,
            I,
            T,
            b,
            x = this._props,
            O = t.style,
            D = n.vars.startAt;
          for (h in (l || G(),
          (this.styles = this.styles || W(t)),
          (b = this.styles.props),
          (this.tween = n),
          e))
            if (
              "autoRound" !== h &&
              ((s = e[h]), !(w.$i[h] && (0, w.if)(h, e, n, r, t, i)))
            ) {
              if (
                ((u = typeof s),
                (d = ts[h]),
                "function" === u && (u = typeof (s = s.call(n, r, t, i))),
                "string" === u && ~s.indexOf("random(") && (s = (0, w.UI)(s)),
                d)
              )
                d(this, t, h, s, n) && (T = 1);
              else if ("--" === h.substr(0, 2))
                (a = (getComputedStyle(t).getPropertyValue(h) + "").trim()),
                  (s += ""),
                  (w.GN.lastIndex = 0),
                  w.GN.test(a) || ((f = (0, w.Wy)(a)), (y = (0, w.Wy)(s))),
                  y ? f !== y && (a = tt(t, h, a, y) + y) : f && (s += f),
                  this.add(O, "setProperty", a, s, r, i, 0, 0, h),
                  x.push(h),
                  b.push(h, 0, O[h]);
              else if ("undefined" !== u) {
                if (
                  (D && h in D
                    ? ((a =
                        "function" == typeof D[h]
                          ? D[h].call(n, r, t, i)
                          : D[h]),
                      (0, w.r9)(a) &&
                        ~a.indexOf("random(") &&
                        (a = (0, w.UI)(a)),
                      (0, w.Wy)(a + "") ||
                        "auto" === a ||
                        (a += w.Fc.units[h] || (0, w.Wy)(te(t, h)) || ""),
                      "=" === (a + "").charAt(1) && (a = te(t, h)))
                    : (a = te(t, h)),
                  (c = parseFloat(a)),
                  (g =
                    "string" === u && "=" === s.charAt(1) && s.substr(0, 2)) &&
                    (s = s.substr(2)),
                  (o = parseFloat(s)),
                  h in j &&
                    ("autoAlpha" === h &&
                      (1 === c &&
                        "hidden" === te(t, "visibility") &&
                        o &&
                        (c = 0),
                      b.push("visibility", 0, O.visibility),
                      X(
                        this,
                        O,
                        "visibility",
                        c ? "inherit" : "hidden",
                        o ? "inherit" : "hidden",
                        !o
                      )),
                    "scale" !== h &&
                      "transform" !== h &&
                      ~(h = j[h]).indexOf(",") &&
                      (h = h.split(",")[0])),
                  (M = h in p))
                ) {
                  if (
                    (this.styles.save(h),
                    m ||
                      (((v = t._gsap).renderTransform && !e.parseTransform) ||
                        tf(t, e.parseTransform),
                      (I = !1 !== e.smoothOrigin && v.smooth),
                      ((m = this._pt =
                        new w.Fo(
                          this._pt,
                          O,
                          C,
                          0,
                          1,
                          v.renderTransform,
                          v,
                          0,
                          -1
                        )).dep = 1)),
                    "scale" === h)
                  )
                    (this._pt = new w.Fo(
                      this._pt,
                      v,
                      "scaleY",
                      v.scaleY,
                      (g ? (0, w.cy)(v.scaleY, g + o) : o) - v.scaleY || 0,
                      N
                    )),
                      (this._pt.u = 0),
                      x.push("scaleY", h),
                      (h += "X");
                  else if ("transformOrigin" === h) {
                    b.push(R, 0, O[R]),
                      (s = ti(s)),
                      v.svg
                        ? th(t, s, 0, I, 0, this)
                        : ((y = parseFloat(s.split(" ")[2]) || 0) !==
                            v.zOrigin && X(this, v, "zOrigin", v.zOrigin, y),
                          X(this, O, h, tw(a), tw(s)));
                    continue;
                  } else if ("svgOrigin" === h) {
                    th(t, s, 1, I, 0, this);
                    continue;
                  } else if (h in tc) {
                    tv(this, v, h, c, g ? (0, w.cy)(c, g + s) : s);
                    continue;
                  } else if ("smoothOrigin" === h) {
                    X(this, v, "smooth", v.smooth, s);
                    continue;
                  } else if ("force3D" === h) {
                    v[h] = s;
                    continue;
                  } else if ("transform" === h) {
                    tj(this, s, t);
                    continue;
                  }
                } else h in O || (h = Z(h) || h);
                if (
                  M ||
                  ((o || 0 === o) && (c || 0 === c) && !L.test(s) && h in O)
                )
                  (f = (a + "").substr((c + "").length)),
                    o || (o = 0),
                    (y = (0, w.Wy)(s) || (h in w.Fc.units ? w.Fc.units[h] : f)),
                    f !== y && (c = tt(t, h, a, y)),
                    (this._pt = new w.Fo(
                      this._pt,
                      M ? v : O,
                      h,
                      c,
                      (g ? (0, w.cy)(c, g + o) : o) - c,
                      M || ("px" !== y && "zIndex" !== h) || !1 === e.autoRound
                        ? N
                        : S
                    )),
                    (this._pt.u = y || 0),
                    f !== y &&
                      "%" !== y &&
                      ((this._pt.b = a), (this._pt.r = E));
                else if (h in O) tn.call(this, t, h, a, g ? g + s : s);
                else if (h in t) this.add(t, h, a || t[h], g ? g + s : s, r, i);
                else if ("parseTransform" !== h) {
                  (0, w.lC)(h, s);
                  continue;
                }
                M || (h in O ? b.push(h, 0, O[h]) : b.push(h, 1, a || t[h])),
                  x.push(h);
              }
            }
          T && (0, w.JV)(this);
        },
        render: function (t, e) {
          if (e.tween._time || !h())
            for (var n = e._pt; n; ) n.r(t, n.d), (n = n._next);
          else e.styles.revert();
        },
        get: te,
        aliases: j,
        getSetter: function (t, e, n) {
          var r = j[e];
          return (
            r && 0 > r.indexOf(",") && (e = r),
            e in p && e !== R && (t._gsap.x || te(t, "x"))
              ? n && d === n
                ? "scale" === e
                  ? A
                  : D
                : ((d = n || {}), "scale" === e ? z : _)
              : t.style && !(0, w.m2)(t.style[e])
              ? x
              : ~e.indexOf("-")
              ? O
              : (0, w.S5)(t, e)
          );
        },
        core: { _removeProperty: $, _getMatrix: td },
      };
      (w.p8.utils.checkPrefix = Z),
        (w.p8.core.getStyleSaver = W),
        (r = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent"),
        (i = "rotation,rotationX,rotationY,skewX,skewY"),
        (a =
          "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),
        (s = (0, w.fS)(
          r +
            "," +
            i +
            ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
          function (t) {
            p[t] = 1;
          }
        )),
        (0, w.fS)(i, function (t) {
          (w.Fc.units[t] = "deg"), (tc[t] = 1);
        }),
        (j[s[13]] = r + "," + i),
        (0, w.fS)(a, function (t) {
          var e = t.split(":");
          j[e[1]] = s[e[0]];
        }),
        (0, w.fS)(
          "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
          function (t) {
            w.Fc.units[t] = "px";
          }
        ),
        w.p8.registerPlugin(tN);
      var tI = w.p8.registerPlugin(tN) || w.p8;
      tI.core.Tween;
    },
    8e3: function (t, e, n) {
      "use strict";
      n.d(e, {
        default: function () {
          return i.a;
        },
      });
      var r = n(9150),
        i = n.n(r);
    },
    1419: function () {},
    8863: function (t) {
      t.exports = {
        style: {
          fontFamily: "'__Inter_80f60f', '__Inter_Fallback_80f60f'",
          fontStyle: "normal",
        },
        className: "__className_80f60f",
        variable: "__variable_80f60f",
      };
    },
    4602: function (t) {
      t.exports = {
        style: {
          fontFamily: "'__Roboto_3e2280', '__Roboto_Fallback_3e2280'",
          fontStyle: "normal",
        },
        className: "__className_3e2280",
        variable: "__variable_3e2280",
      };
    },
    3461: function (t, e, n) {
      "use strict";
      n.d(e, {
        H: function () {
          return l;
        },
        i1: function () {
          return i;
        },
        mI: function () {
          return o;
        },
        su: function () {
          return c;
        },
      });
      var r,
        i,
        a = n(6153),
        s = n(9216);
      ((r = i || (i = {})).Installed = "Installed"),
        (r.NotDetected = "NotDetected"),
        (r.Loadable = "Loadable"),
        (r.Unsupported = "Unsupported");
      class o extends a {
        get connected() {
          return !!this.publicKey;
        }
        async autoConnect() {
          await this.connect();
        }
        async prepareTransaction(t, e, n = {}) {
          let r = this.publicKey;
          if (!r) throw new s.oS();
          return (
            (t.feePayer = t.feePayer || r),
            (t.recentBlockhash =
              t.recentBlockhash ||
              (
                await e.getLatestBlockhash({
                  commitment: n.preflightCommitment,
                  minContextSlot: n.minContextSlot,
                })
              ).blockhash),
            t
          );
        }
      }
      function c(t) {
        if ("undefined" == typeof window || "undefined" == typeof document)
          return;
        let e = [];
        function n() {
          if (t()) for (let t of e) t();
        }
        let r = setInterval(n, 1e3);
        e.push(() => clearInterval(r)),
          "loading" === document.readyState &&
            (document.addEventListener("DOMContentLoaded", n, { once: !0 }),
            e.push(() => document.removeEventListener("DOMContentLoaded", n))),
          "complete" !== document.readyState &&
            (window.addEventListener("load", n, { once: !0 }),
            e.push(() => window.removeEventListener("load", n))),
          n();
      }
      function l() {
        if (!navigator) return !1;
        let t = navigator.userAgent.toLowerCase(),
          e = t.includes("iphone") || t.includes("ipad"),
          n = t.includes("safari");
        return e && n;
      }
    },
    9216: function (t, e, n) {
      "use strict";
      n.d(e, {
        $w: function () {
          return o;
        },
        IW: function () {
          return f;
        },
        Nx: function () {
          return d;
        },
        OZ: function () {
          return i;
        },
        PY: function () {
          return w;
        },
        UG: function () {
          return l;
        },
        W8: function () {
          return a;
        },
        at: function () {
          return c;
        },
        bD: function () {
          return y;
        },
        cO: function () {
          return u;
        },
        fk: function () {
          return p;
        },
        lj: function () {
          return r;
        },
        oS: function () {
          return h;
        },
        p6: function () {
          return s;
        },
      });
      class r extends Error {
        constructor(t, e) {
          super(t), (this.error = e);
        }
      }
      class i extends r {
        constructor() {
          super(...arguments), (this.name = "WalletNotReadyError");
        }
      }
      class a extends r {
        constructor() {
          super(...arguments), (this.name = "WalletLoadError");
        }
      }
      class s extends r {
        constructor() {
          super(...arguments), (this.name = "WalletConfigError");
        }
      }
      class o extends r {
        constructor() {
          super(...arguments), (this.name = "WalletConnectionError");
        }
      }
      class c extends r {
        constructor() {
          super(...arguments), (this.name = "WalletDisconnectedError");
        }
      }
      class l extends r {
        constructor() {
          super(...arguments), (this.name = "WalletDisconnectionError");
        }
      }
      class u extends r {
        constructor() {
          super(...arguments), (this.name = "WalletAccountError");
        }
      }
      class d extends r {
        constructor() {
          super(...arguments), (this.name = "WalletPublicKeyError");
        }
      }
      class h extends r {
        constructor() {
          super(...arguments), (this.name = "WalletNotConnectedError");
        }
      }
      class f extends r {
        constructor() {
          super(...arguments), (this.name = "WalletSendTransactionError");
        }
      }
      class w extends r {
        constructor() {
          super(...arguments), (this.name = "WalletSignTransactionError");
        }
      }
      class p extends r {
        constructor() {
          super(...arguments), (this.name = "WalletSignMessageError");
        }
      }
      class y extends r {
        constructor() {
          super(...arguments), (this.name = "WalletSignInError");
        }
      }
    },
    4641: function (t, e, n) {
      "use strict";
      n.d(e, {
        eC: function () {
          return o;
        },
        qz: function () {
          return c;
        },
      });
      var r = n(3461),
        i = n(9216),
        a = n(5543);
      class s extends r.mI {
        async sendTransaction(t, e, n = {}) {
          let r = !0;
          try {
            if ((0, a.W)(t)) {
              if (!this.supportedTransactionVersions)
                throw new i.IW(
                  "Sending versioned transactions isn't supported by this wallet"
                );
              if (!this.supportedTransactionVersions.has(t.version))
                throw new i.IW(
                  `Sending transaction version ${t.version} isn't supported by this wallet`
                );
              try {
                let r = (t = await this.signTransaction(t)).serialize();
                return await e.sendRawTransaction(r, n);
              } catch (t) {
                if (t instanceof i.PY) throw ((r = !1), t);
                throw new i.IW(t?.message, t);
              }
            } else
              try {
                let { signers: r, ...i } = n;
                (t = await this.prepareTransaction(t, e, i)),
                  r?.length && t.partialSign(...r);
                let a = (t = await this.signTransaction(t)).serialize();
                return await e.sendRawTransaction(a, i);
              } catch (t) {
                if (t instanceof i.PY) throw ((r = !1), t);
                throw new i.IW(t?.message, t);
              }
          } catch (t) {
            throw (r && this.emit("error", t), t);
          }
        }
        async signAllTransactions(t) {
          for (let e of t)
            if ((0, a.W)(e)) {
              if (!this.supportedTransactionVersions)
                throw new i.PY(
                  "Signing versioned transactions isn't supported by this wallet"
                );
              if (!this.supportedTransactionVersions.has(e.version))
                throw new i.PY(
                  `Signing transaction version ${e.version} isn't supported by this wallet`
                );
            }
          let e = [];
          for (let n of t) e.push(await this.signTransaction(n));
          return e;
        }
      }
      class o extends s {}
      class c extends o {}
    },
    5543: function (t, e, n) {
      "use strict";
      function r(t) {
        return "version" in t;
      }
      n.d(e, {
        W: function () {
          return r;
        },
      });
    },
    9782: function (t, e, n) {
      "use strict";
      var r, i;
      n.d(e, {
        Q: function () {
          return r;
        },
      }),
        ((i = r || (r = {})).Mainnet = "mainnet-beta"),
        (i.Testnet = "testnet"),
        (i.Devnet = "devnet");
    },
    5714: function (t, e, n) {
      "use strict";
      n.d(e, {
        s: function () {
          return y;
        },
      });
      var r = n(5789);
      let i = {
        setVisible(t) {
          console.error(a("call", "setVisible"));
        },
        visible: !1,
      };
      function a(t, e) {
        return `You have tried to  ${t} "${e}" on a WalletModalContext without providing one. Make sure to render a WalletModalProvider as an ancestor of the component that uses WalletModalContext`;
      }
      Object.defineProperty(i, "visible", {
        get: () => (console.error(a("read", "visible")), !1),
      });
      let s = (0, r.createContext)(i);
      var o = n(3461),
        c = n(4723),
        l = n(1968);
      let u = ({ id: t, children: e, expanded: n = !1 }) => {
          let i = (0, r.useRef)(null),
            a = (0, r.useRef)(!0),
            s = () => {
              let t = i.current;
              t &&
                requestAnimationFrame(() => {
                  t.style.height = t.scrollHeight + "px";
                });
            },
            o = () => {
              let t = i.current;
              t &&
                requestAnimationFrame(() => {
                  (t.style.height = t.offsetHeight + "px"),
                    (t.style.overflow = "hidden"),
                    requestAnimationFrame(() => {
                      t.style.height = "0";
                    });
                });
            };
          return (
            (0, r.useLayoutEffect)(() => {
              n ? s() : o();
            }, [n]),
            (0, r.useLayoutEffect)(() => {
              let t = i.current;
              if (t)
                return (
                  a.current && (e(), (a.current = !1)),
                  t.addEventListener("transitionend", r),
                  () => t.removeEventListener("transitionend", r)
                );
              function e() {
                t &&
                  ((t.style.overflow = n ? "initial" : "hidden"),
                  n && (t.style.height = "auto"));
              }
              function r(n) {
                t && n.target === t && "height" === n.propertyName && e();
              }
            }, [n]),
            r.createElement(
              "div",
              {
                className: "wallet-adapter-collapse",
                id: t,
                ref: i,
                role: "region",
                style: {
                  height: 0,
                  transition: a.current ? void 0 : "height 250ms ease-out",
                },
              },
              e
            )
          );
        },
        d = (t) =>
          r.createElement(
            "button",
            {
              className: `wallet-adapter-button ${t.className || ""}`,
              disabled: t.disabled,
              style: t.style,
              onClick: t.onClick,
              tabIndex: t.tabIndex || 0,
              type: "button",
            },
            t.startIcon &&
              r.createElement(
                "i",
                { className: "wallet-adapter-button-start-icon" },
                t.startIcon
              ),
            t.children,
            t.endIcon &&
              r.createElement(
                "i",
                { className: "wallet-adapter-button-end-icon" },
                t.endIcon
              )
          ),
        h = ({ wallet: t, ...e }) =>
          t &&
          r.createElement("img", {
            src: t.adapter.icon,
            alt: `${t.adapter.name} icon`,
            ...e,
          }),
        f = ({ handleClick: t, tabIndex: e, wallet: n }) =>
          r.createElement(
            "li",
            null,
            r.createElement(
              d,
              {
                onClick: t,
                startIcon: r.createElement(h, { wallet: n }),
                tabIndex: e,
              },
              n.adapter.name,
              n.readyState === o.i1.Installed &&
                r.createElement("span", null, "Detected")
            )
          ),
        w = () =>
          r.createElement(
            "svg",
            {
              width: "97",
              height: "96",
              viewBox: "0 0 97 96",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            r.createElement("circle", {
              cx: "48.5",
              cy: "48",
              r: "48",
              fill: "url(#paint0_linear_880_5115)",
              fillOpacity: "0.1",
            }),
            r.createElement("circle", {
              cx: "48.5",
              cy: "48",
              r: "47",
              stroke: "url(#paint1_linear_880_5115)",
              strokeOpacity: "0.4",
              strokeWidth: "2",
            }),
            r.createElement(
              "g",
              { clipPath: "url(#clip0_880_5115)" },
              r.createElement("path", {
                d: "M65.5769 28.1523H31.4231C27.6057 28.1523 24.5 31.258 24.5 35.0754V60.9215C24.5 64.7389 27.6057 67.8446 31.4231 67.8446H65.5769C69.3943 67.8446 72.5 64.7389 72.5 60.9215V35.0754C72.5 31.258 69.3943 28.1523 65.5769 28.1523ZM69.7308 52.1523H59.5769C57.2865 52.1523 55.4231 50.289 55.4231 47.9985C55.4231 45.708 57.2864 43.8446 59.5769 43.8446H69.7308V52.1523ZM69.7308 41.0754H59.5769C55.7595 41.0754 52.6539 44.1811 52.6539 47.9985C52.6539 51.8159 55.7595 54.9215 59.5769 54.9215H69.7308V60.9215C69.7308 63.2119 67.8674 65.0754 65.5769 65.0754H31.4231C29.1327 65.0754 27.2692 63.212 27.2692 60.9215V35.0754C27.2692 32.785 29.1326 30.9215 31.4231 30.9215H65.5769C67.8673 30.9215 69.7308 32.7849 69.7308 35.0754V41.0754Z",
                fill: "url(#paint2_linear_880_5115)",
              }),
              r.createElement("path", {
                d: "M61.4231 46.6172H59.577C58.8123 46.6172 58.1924 47.2371 58.1924 48.0018C58.1924 48.7665 58.8123 49.3863 59.577 49.3863H61.4231C62.1878 49.3863 62.8077 48.7664 62.8077 48.0018C62.8077 47.2371 62.1878 46.6172 61.4231 46.6172Z",
                fill: "url(#paint3_linear_880_5115)",
              })
            ),
            r.createElement(
              "defs",
              null,
              r.createElement(
                "linearGradient",
                {
                  id: "paint0_linear_880_5115",
                  x1: "3.41664",
                  y1: "98.0933",
                  x2: "103.05",
                  y2: "8.42498",
                  gradientUnits: "userSpaceOnUse",
                },
                r.createElement("stop", { stopColor: "#9945FF" }),
                r.createElement("stop", {
                  offset: "0.14",
                  stopColor: "#8A53F4",
                }),
                r.createElement("stop", {
                  offset: "0.42",
                  stopColor: "#6377D6",
                }),
                r.createElement("stop", {
                  offset: "0.79",
                  stopColor: "#24B0A7",
                }),
                r.createElement("stop", {
                  offset: "0.99",
                  stopColor: "#00D18C",
                }),
                r.createElement("stop", { offset: "1", stopColor: "#00D18C" })
              ),
              r.createElement(
                "linearGradient",
                {
                  id: "paint1_linear_880_5115",
                  x1: "3.41664",
                  y1: "98.0933",
                  x2: "103.05",
                  y2: "8.42498",
                  gradientUnits: "userSpaceOnUse",
                },
                r.createElement("stop", { stopColor: "#9945FF" }),
                r.createElement("stop", {
                  offset: "0.14",
                  stopColor: "#8A53F4",
                }),
                r.createElement("stop", {
                  offset: "0.42",
                  stopColor: "#6377D6",
                }),
                r.createElement("stop", {
                  offset: "0.79",
                  stopColor: "#24B0A7",
                }),
                r.createElement("stop", {
                  offset: "0.99",
                  stopColor: "#00D18C",
                }),
                r.createElement("stop", { offset: "1", stopColor: "#00D18C" })
              ),
              r.createElement(
                "linearGradient",
                {
                  id: "paint2_linear_880_5115",
                  x1: "25.9583",
                  y1: "68.7101",
                  x2: "67.2337",
                  y2: "23.7879",
                  gradientUnits: "userSpaceOnUse",
                },
                r.createElement("stop", { stopColor: "#9945FF" }),
                r.createElement("stop", {
                  offset: "0.14",
                  stopColor: "#8A53F4",
                }),
                r.createElement("stop", {
                  offset: "0.42",
                  stopColor: "#6377D6",
                }),
                r.createElement("stop", {
                  offset: "0.79",
                  stopColor: "#24B0A7",
                }),
                r.createElement("stop", {
                  offset: "0.99",
                  stopColor: "#00D18C",
                }),
                r.createElement("stop", { offset: "1", stopColor: "#00D18C" })
              ),
              r.createElement(
                "linearGradient",
                {
                  id: "paint3_linear_880_5115",
                  x1: "58.3326",
                  y1: "49.4467",
                  x2: "61.0002",
                  y2: "45.4453",
                  gradientUnits: "userSpaceOnUse",
                },
                r.createElement("stop", { stopColor: "#9945FF" }),
                r.createElement("stop", {
                  offset: "0.14",
                  stopColor: "#8A53F4",
                }),
                r.createElement("stop", {
                  offset: "0.42",
                  stopColor: "#6377D6",
                }),
                r.createElement("stop", {
                  offset: "0.79",
                  stopColor: "#24B0A7",
                }),
                r.createElement("stop", {
                  offset: "0.99",
                  stopColor: "#00D18C",
                }),
                r.createElement("stop", { offset: "1", stopColor: "#00D18C" })
              ),
              r.createElement(
                "clipPath",
                { id: "clip0_880_5115" },
                r.createElement("rect", {
                  width: "48",
                  height: "48",
                  fill: "white",
                  transform: "translate(24.5 24)",
                })
              )
            )
          ),
        p = ({ className: t = "", container: e = "body" }) => {
          let n = (0, r.useRef)(null),
            { wallets: i, select: a } = (0, c.O)(),
            { setVisible: d } = (0, r.useContext)(s),
            [h, p] = (0, r.useState)(!1),
            [y, g] = (0, r.useState)(!1),
            [M, m] = (0, r.useState)(null),
            [v, L] = (0, r.useMemo)(() => {
              let t = [],
                e = [];
              for (let n of i)
                n.readyState === o.i1.Installed ? t.push(n) : e.push(n);
              return t.length ? [t, e] : [e, []];
            }, [i]),
            j = (0, r.useCallback)(() => {
              g(!1), setTimeout(() => d(!1), 150);
            }, [d]),
            N = (0, r.useCallback)(
              (t) => {
                t.preventDefault(), j();
              },
              [j]
            ),
            I = (0, r.useCallback)(
              (t, e) => {
                a(e), N(t);
              },
              [a, N]
            ),
            E = (0, r.useCallback)(() => p(!h), [h]),
            S = (0, r.useCallback)(
              (t) => {
                let e = n.current;
                if (!e) return;
                let r = e.querySelectorAll("button"),
                  i = r[0],
                  a = r[r.length - 1];
                t.shiftKey
                  ? document.activeElement === i &&
                    (a.focus(), t.preventDefault())
                  : document.activeElement === a &&
                    (i.focus(), t.preventDefault());
              },
              [n]
            );
          return (
            (0, r.useLayoutEffect)(() => {
              let t = (t) => {
                  "Escape" === t.key ? j() : "Tab" === t.key && S(t);
                },
                { overflow: e } = window.getComputedStyle(document.body);
              return (
                setTimeout(() => g(!0), 0),
                (document.body.style.overflow = "hidden"),
                window.addEventListener("keydown", t, !1),
                () => {
                  (document.body.style.overflow = e),
                    window.removeEventListener("keydown", t, !1);
                }
              );
            }, [j, S]),
            (0, r.useLayoutEffect)(() => m(document.querySelector(e)), [e]),
            M &&
              (0, l.createPortal)(
                r.createElement(
                  "div",
                  {
                    "aria-labelledby": "wallet-adapter-modal-title",
                    "aria-modal": "true",
                    className: `wallet-adapter-modal ${
                      y && "wallet-adapter-modal-fade-in"
                    } ${t}`,
                    ref: n,
                    role: "dialog",
                  },
                  r.createElement(
                    "div",
                    { className: "wallet-adapter-modal-container" },
                    r.createElement(
                      "div",
                      { className: "wallet-adapter-modal-wrapper" },
                      r.createElement(
                        "button",
                        {
                          onClick: N,
                          className: "wallet-adapter-modal-button-close",
                        },
                        r.createElement(
                          "svg",
                          { width: "14", height: "14" },
                          r.createElement("path", {
                            d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z",
                          })
                        )
                      ),
                      v.length
                        ? r.createElement(
                            r.Fragment,
                            null,
                            r.createElement(
                              "h1",
                              { className: "wallet-adapter-modal-title" },
                              "Connect a wallet on BSC to continue"
                            ),
                            r.createElement(
                              "ul",
                              { className: "wallet-adapter-modal-list" },
                              v.map((t) =>
                                r.createElement(f, {
                                  key: t.adapter.name,
                                  handleClick: (e) => I(e, t.adapter.name),
                                  wallet: t,
                                })
                              ),
                              L.length
                                ? r.createElement(
                                    u,
                                    {
                                      expanded: h,
                                      id: "wallet-adapter-modal-collapse",
                                    },
                                    L.map((t) =>
                                      r.createElement(f, {
                                        key: t.adapter.name,
                                        handleClick: (e) =>
                                          I(e, t.adapter.name),
                                        tabIndex: h ? 0 : -1,
                                        wallet: t,
                                      })
                                    )
                                  )
                                : null
                            ),
                            L.length
                              ? r.createElement(
                                  "button",
                                  {
                                    className: "wallet-adapter-modal-list-more",
                                    onClick: E,
                                    tabIndex: 0,
                                  },
                                  r.createElement(
                                    "span",
                                    null,
                                    h ? "Less " : "More ",
                                    "options"
                                  ),
                                  r.createElement(
                                    "svg",
                                    {
                                      width: "13",
                                      height: "7",
                                      viewBox: "0 0 13 7",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      className: `${
                                        h
                                          ? "wallet-adapter-modal-list-more-icon-rotate"
                                          : ""
                                      }`,
                                    },
                                    r.createElement("path", {
                                      d: "M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z",
                                    })
                                  )
                                )
                              : null
                          )
                        : r.createElement(
                            r.Fragment,
                            null,
                            r.createElement(
                              "h1",
                              { className: "wallet-adapter-modal-title" },
                              "You'll need a wallet on BSC to continue"
                            ),
                            r.createElement(
                              "div",
                              { className: "wallet-adapter-modal-middle" },
                              r.createElement(w, null)
                            ),
                            L.length
                              ? r.createElement(
                                  r.Fragment,
                                  null,
                                  r.createElement(
                                    "button",
                                    {
                                      className:
                                        "wallet-adapter-modal-list-more",
                                      onClick: E,
                                      tabIndex: 0,
                                    },
                                    r.createElement(
                                      "span",
                                      null,
                                      h
                                        ? "Hide "
                                        : "Already have a wallet? View ",
                                      "options"
                                    ),
                                    r.createElement(
                                      "svg",
                                      {
                                        width: "13",
                                        height: "7",
                                        viewBox: "0 0 13 7",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className: `${
                                          h
                                            ? "wallet-adapter-modal-list-more-icon-rotate"
                                            : ""
                                        }`,
                                      },
                                      r.createElement("path", {
                                        d: "M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z",
                                      })
                                    )
                                  ),
                                  r.createElement(
                                    u,
                                    {
                                      expanded: h,
                                      id: "wallet-adapter-modal-collapse",
                                    },
                                    r.createElement(
                                      "ul",
                                      {
                                        className: "wallet-adapter-modal-list",
                                      },
                                      L.map((t) =>
                                        r.createElement(f, {
                                          key: t.adapter.name,
                                          handleClick: (e) =>
                                            I(e, t.adapter.name),
                                          tabIndex: h ? 0 : -1,
                                          wallet: t,
                                        })
                                      )
                                    )
                                  )
                                )
                              : null
                          )
                    )
                  ),
                  r.createElement("div", {
                    className: "wallet-adapter-modal-overlay",
                    onMouseDown: N,
                  })
                ),
                M
              )
          );
        },
        y = ({ children: t, ...e }) => {
          let [n, i] = (0, r.useState)(!1);
          return r.createElement(
            s.Provider,
            { value: { visible: n, setVisible: i } },
            t,
            n && r.createElement(p, { ...e })
          );
        };
    },
    1488: function (t, e, n) {
      "use strict";
      n.d(e, {
        U: function () {
          return s;
        },
      });
      var r = n(4482),
        i = n(5789),
        a = n(3496);
      let s = ({
        children: t,
        endpoint: e,
        config: n = { commitment: "confirmed" },
      }) => {
        let s = (0, i.useMemo)(() => new r.Connection(e, n), [e, n]);
        return i.createElement(a.h.Provider, { value: { connection: s } }, t);
      };
    },
    8913: function (t, e, n) {
      "use strict";
      let r, i, a;
      n.d(e, {
        n: function () {
          return tk;
        },
      });
      var s,
        o,
        c,
        l,
        u,
        d,
        h,
        f,
        w,
        p,
        y,
        g,
        M,
        m,
        v,
        L,
        j,
        N,
        I,
        E,
        S,
        T = n(4641),
        b = n(3461),
        x = n(9216),
        O = n(4482);
      let D = `(?:\\nURI: (?<uri>[^\\n]+))?(?:\\nVersion: (?<version>[^\\n]+))?(?:\\nChain ID: (?<chainId>[^\\n]+))?(?:\\nNonce: (?<nonce>[^\\n]+))?(?:\\nIssued At: (?<issuedAt>[^\\n]+))?(?:\\nExpiration Time: (?<expirationTime>[^\\n]+))?(?:\\nNot Before: (?<notBefore>[^\\n]+))?(?:\\nRequest ID: (?<requestId>[^\\n]+))?(?:\\nResources:(?<resources>(?:\\n- [^\\n]+)*))?`;
      RegExp(
        `^(?<domain>[^\\n]+?) wants you to sign in with your BSC account:\\n(?<address>[^\\n]+)(?:\\n|$)(?:\\n(?<statement>[\\S\\s]*?)(?:\\n|$))??${D}\\n*$`
      );
      let A = {
        ERROR_ASSOCIATION_PORT_OUT_OF_RANGE:
          "ERROR_ASSOCIATION_PORT_OUT_OF_RANGE",
        ERROR_FORBIDDEN_WALLET_BASE_URL: "ERROR_FORBIDDEN_WALLET_BASE_URL",
        ERROR_SECURE_CONTEXT_REQUIRED: "ERROR_SECURE_CONTEXT_REQUIRED",
        ERROR_SESSION_CLOSED: "ERROR_SESSION_CLOSED",
        ERROR_SESSION_TIMEOUT: "ERROR_SESSION_TIMEOUT",
        ERROR_WALLET_NOT_FOUND: "ERROR_WALLET_NOT_FOUND",
        ERROR_INVALID_PROTOCOL_VERSION: "ERROR_INVALID_PROTOCOL_VERSION",
      };
      class z extends Error {
        constructor(...t) {
          let [e, n, r] = t;
          super(n),
            (this.code = e),
            (this.data = r),
            (this.name = "SolanaMobileWalletAdapterError");
        }
      }
      class _ extends Error {
        constructor(...t) {
          let [e, n, r, i] = t;
          super(r),
            (this.code = n),
            (this.data = i),
            (this.jsonRpcMessageId = e),
            (this.name = "SolanaMobileWalletAdapterProtocolError");
        }
      }
      function C(t, e, n, r) {
        return new (n || (n = Promise))(function (i, a) {
          function s(t) {
            try {
              c(r.next(t));
            } catch (t) {
              a(t);
            }
          }
          function o(t) {
            try {
              c(r.throw(t));
            } catch (t) {
              a(t);
            }
          }
          function c(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value) instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })
                ).then(s, o);
          }
          c((r = r.apply(t, e || [])).next());
        });
      }
      let R = "solana:cloneAuthorization";
      function k(t, e) {
        return C(this, void 0, void 0, function* () {
          let n = t.slice(0, 4),
            i = t.slice(4, 16),
            a = t.slice(16),
            s = yield crypto.subtle.decrypt(P(n, i), e, a);
          return (void 0 === r && (r = new TextDecoder("utf-8")), r).decode(s);
        });
      }
      function P(t, e) {
        return { additionalData: t, iv: e, name: "AES-GCM", tagLength: 128 };
      }
      function U(t) {
        if (t < 49152 || t > 65535)
          throw new z(
            A.ERROR_ASSOCIATION_PORT_OUT_OF_RANGE,
            `Association port number must be between 49152 and 65535. ${t} given.`,
            { port: t }
          );
        return t;
      }
      function W(t) {
        return t.replace(/(^\/+|\/+$)/g, "").split("/");
      }
      let Y = { Firefox: 0, Other: 1 },
        B = null,
        Q = [150, 150, 200, 500, 500, 750, 750, 1e3];
      function Z(t) {
        return new DataView(t).getUint32(0, !1);
      }
      var G = n(5180);
      function F(t, e) {
        var n = {};
        for (var r in t)
          Object.prototype.hasOwnProperty.call(t, r) &&
            0 > e.indexOf(r) &&
            (n[r] = t[r]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols)
          for (
            var i = 0, r = Object.getOwnPropertySymbols(t);
            i < r.length;
            i++
          )
            0 > e.indexOf(r[i]) &&
              Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
              (n[r[i]] = t[r[i]]);
        return n;
      }
      function H(t, e, n, r) {
        return new (n || (n = Promise))(function (i, a) {
          function s(t) {
            try {
              c(r.next(t));
            } catch (t) {
              a(t);
            }
          }
          function o(t) {
            try {
              c(r.throw(t));
            } catch (t) {
              a(t);
            }
          }
          function c(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value) instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })
                ).then(s, o);
          }
          c((r = r.apply(t, e || [])).next());
        });
      }
      function V(t) {
        return window.btoa(String.fromCharCode.call(null, ...t));
      }
      function K(t) {
        return new Uint8Array(
          window
            .atob(t)
            .split("")
            .map((t) => t.charCodeAt(0))
        );
      }
      function $(t) {
        return V(
          "version" in t
            ? t.serialize()
            : t.serialize({ requireAllSignatures: !1, verifySignatures: !1 })
        );
      }
      function X(t) {
        let e = t[0] * O.SIGNATURE_LENGTH_IN_BYTES + 1;
        return "legacy" ===
          O.VersionedMessage.deserializeMessageVersion(t.slice(e, t.length))
          ? O.Transaction.from(t)
          : O.VersionedTransaction.deserialize(t);
      }
      function J(t, e, n, r) {
        return new (n || (n = Promise))(function (i, a) {
          function s(t) {
            try {
              c(r.next(t));
            } catch (t) {
              a(t);
            }
          }
          function o(t) {
            try {
              c(r.throw(t));
            } catch (t) {
              a(t);
            }
          }
          function c(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value) instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })
                ).then(s, o);
          }
          c((r = r.apply(t, e || [])).next());
        });
      }
      function q(t) {
        return new Uint8Array(
          window
            .atob(t)
            .split("")
            .map((t) => t.charCodeAt(0))
        );
      }
      let tt = "Mobile Wallet Adapter";
      function te(t) {
        return "version" in t;
      }
      class tn extends T.qz {
        constructor(t) {
          var e;
          super(),
            (this.supportedTransactionVersions = new Set(["legacy", 0])),
            (this.name = tt),
            (this.url = "https://solanamobile.com/wallets"),
            (this.icon =
              "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI4IiB3aWR0aD0iMjgiIHZpZXdCb3g9Ii0zIDAgMjggMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI0RDQjhGRiI+PHBhdGggZD0iTTE3LjQgMTcuNEgxNXYyLjRoMi40di0yLjRabTEuMi05LjZoLTIuNHYyLjRoMi40VjcuOFoiLz48cGF0aCBkPSJNMjEuNiAzVjBoLTIuNHYzaC0zLjZWMGgtMi40djNoLTIuNHY2LjZINC41YTIuMSAyLjEgMCAxIDEgMC00LjJoMi43VjNINC41QTQuNSA0LjUgMCAwIDAgMCA3LjVWMjRoMjEuNnYtNi42aC0yLjR2NC4ySDIuNFYxMS41Yy41LjMgMS4yLjQgMS44LjVoNy41QTYuNiA2LjYgMCAwIDAgMjQgOVYzaC0yLjRabTAgNS43YTQuMiA0LjIgMCAxIDEtOC40IDBWNS40aDguNHYzLjNaIi8+PC9nPjwvc3ZnPg=="),
            (this._connecting = !1),
            (this._connectionGeneration = 0),
            (this._readyState =
              "undefined" != typeof window &&
              window.isSecureContext &&
              "undefined" != typeof document &&
              /android/i.test(navigator.userAgent)
                ? b.i1.Loadable
                : b.i1.Unsupported),
            (this._authorizationResultCache = t.authorizationResultCache),
            (this._addressSelector = t.addressSelector),
            (this._appIdentity = t.appIdentity),
            (this._chain =
              null !== (e = t.chain) && void 0 !== e ? e : t.cluster),
            (this._onWalletNotFound = t.onWalletNotFound),
            this._readyState !== b.i1.Unsupported &&
              this._authorizationResultCache.get().then((t) => {
                t && this.declareWalletAsInstalled();
              });
        }
        get publicKey() {
          if (null == this._publicKey && null != this._selectedAddress)
            try {
              this._publicKey = (function (t) {
                let e = q(t);
                return new O.PublicKey(e);
              })(this._selectedAddress);
            } catch (t) {
              throw new x.Nx(
                (t instanceof Error && (null == t ? void 0 : t.message)) ||
                  "Unknown error",
                t
              );
            }
          return this._publicKey ? this._publicKey : null;
        }
        get connected() {
          return !!this._authorizationResult;
        }
        get connecting() {
          return this._connecting;
        }
        get readyState() {
          return this._readyState;
        }
        declareWalletAsInstalled() {
          this._readyState !== b.i1.Installed &&
            this.emit("readyStateChange", (this._readyState = b.i1.Installed));
        }
        runWithGuard(t) {
          return J(this, void 0, void 0, function* () {
            try {
              return yield t();
            } catch (t) {
              throw (this.emit("error", t), t);
            }
          });
        }
        autoConnect_DO_NOT_USE_OR_YOU_WILL_BE_FIRED() {
          return J(this, void 0, void 0, function* () {
            return yield this.autoConnect();
          });
        }
        autoConnect() {
          return J(this, void 0, void 0, function* () {
            if (!this.connecting && !this.connected)
              return yield this.runWithGuard(() =>
                J(this, void 0, void 0, function* () {
                  if (
                    this._readyState !== b.i1.Installed &&
                    this._readyState !== b.i1.Loadable
                  )
                    throw new x.OZ();
                  this._connecting = !0;
                  try {
                    let t = yield this._authorizationResultCache.get();
                    t && this.handleAuthorizationResult(t);
                  } catch (t) {
                    throw new x.$w(
                      (t instanceof Error && t.message) || "Unknown error",
                      t
                    );
                  } finally {
                    this._connecting = !1;
                  }
                })
              );
          });
        }
        connect() {
          return J(this, void 0, void 0, function* () {
            if (!this.connecting && !this.connected)
              return yield this.runWithGuard(() =>
                J(this, void 0, void 0, function* () {
                  if (
                    this._readyState !== b.i1.Installed &&
                    this._readyState !== b.i1.Loadable
                  )
                    throw new x.OZ();
                  this._connecting = !0;
                  try {
                    yield this.performAuthorization();
                  } catch (t) {
                    throw new x.$w(
                      (t instanceof Error && t.message) || "Unknown error",
                      t
                    );
                  } finally {
                    this._connecting = !1;
                  }
                })
              );
          });
        }
        performAuthorization(t) {
          return J(this, void 0, void 0, function* () {
            try {
              let e = yield this._authorizationResultCache.get();
              if (e) return this.handleAuthorizationResult(e), e;
              return yield this.transact((e) =>
                J(this, void 0, void 0, function* () {
                  let n = yield e.authorize({
                    chain: this._chain,
                    identity: this._appIdentity,
                    sign_in_payload: t,
                  });
                  return (
                    Promise.all([
                      this._authorizationResultCache.set(n),
                      this.handleAuthorizationResult(n),
                    ]),
                    n
                  );
                })
              );
            } catch (t) {
              throw new x.$w(
                (t instanceof Error && t.message) || "Unknown error",
                t
              );
            }
          });
        }
        handleAuthorizationResult(t) {
          var e;
          return J(this, void 0, void 0, function* () {
            let n =
              null == this._authorizationResult ||
              (null === (e = this._authorizationResult) || void 0 === e
                ? void 0
                : e.accounts.length) !== t.accounts.length ||
              this._authorizationResult.accounts.some(
                (e, n) => e.address !== t.accounts[n].address
              );
            if (
              ((this._authorizationResult = t),
              this.declareWalletAsInstalled(),
              n)
            ) {
              let e = yield this._addressSelector.select(
                t.accounts.map(({ address: t }) => t)
              );
              e !== this._selectedAddress &&
                ((this._selectedAddress = e),
                delete this._publicKey,
                this.emit("connect", this.publicKey));
            }
          });
        }
        performReauthorization(t, e) {
          return J(this, void 0, void 0, function* () {
            try {
              let n = yield t.authorize({
                auth_token: e,
                identity: this._appIdentity,
              });
              Promise.all([
                this._authorizationResultCache.set(n),
                this.handleAuthorizationResult(n),
              ]);
            } catch (t) {
              throw (
                (this.disconnect(),
                new x.at(
                  (t instanceof Error && (null == t ? void 0 : t.message)) ||
                    "Unknown error",
                  t
                ))
              );
            }
          });
        }
        disconnect() {
          return J(this, void 0, void 0, function* () {
            this._authorizationResultCache.clear(),
              (this._connecting = !1),
              this._connectionGeneration++,
              delete this._authorizationResult,
              delete this._publicKey,
              delete this._selectedAddress,
              this.emit("disconnect");
          });
        }
        transact(t) {
          var e;
          return J(this, void 0, void 0, function* () {
            let n =
                null === (e = this._authorizationResult) || void 0 === e
                  ? void 0
                  : e.wallet_uri_base,
              r = this._connectionGeneration;
            try {
              return yield (function (t, e) {
                return H(this, void 0, void 0, function* () {
                  return yield (function (t, e) {
                    return C(this, void 0, void 0, function* () {
                      let n;
                      !(function () {
                        if (
                          "undefined" == typeof window ||
                          !0 !== window.isSecureContext
                        )
                          throw new z(
                            A.ERROR_SECURE_CONTEXT_REQUIRED,
                            "The mobile wallet adapter protocol must be used in a secure context (`https`)."
                          );
                      })();
                      let r = yield (function () {
                          return C(this, void 0, void 0, function* () {
                            return yield crypto.subtle.generateKey(
                              { name: "ECDSA", namedCurve: "P-256" },
                              !1,
                              ["sign"]
                            );
                          });
                        })(),
                        i = yield (function (t, e) {
                          return C(this, void 0, void 0, function* () {
                            let n = U(
                                49152 + Math.floor(16384 * Math.random())
                              ),
                              r = yield (function (t, e, n, r = ["v1"]) {
                                return C(this, void 0, void 0, function* () {
                                  let i = U(e),
                                    a = (function (t) {
                                      let e = "",
                                        n = new Uint8Array(t),
                                        r = n.byteLength;
                                      for (let t = 0; t < r; t++)
                                        e += String.fromCharCode(n[t]);
                                      return window.btoa(e);
                                    })(yield crypto.subtle.exportKey("raw", t)),
                                    s = (function (t, e) {
                                      let n = null;
                                      if (e) {
                                        try {
                                          n = new URL(e);
                                        } catch (t) {}
                                        if (
                                          (null == n ? void 0 : n.protocol) !==
                                          "https:"
                                        )
                                          throw new z(
                                            A.ERROR_FORBIDDEN_WALLET_BASE_URL,
                                            "Base URLs supplied by wallets must be valid `https` URLs"
                                          );
                                      }
                                      return (
                                        n || (n = new URL("solana-wallet:/")),
                                        new URL(
                                          t.startsWith("/")
                                            ? t
                                            : [...W(n.pathname), ...W(t)].join(
                                                "/"
                                              ),
                                          n
                                        )
                                      );
                                    })("v1/associate/local", n);
                                  return (
                                    s.searchParams.set(
                                      "association",
                                      a.replace(
                                        /[/+=]/g,
                                        (t) =>
                                          ({ "/": "_", "+": "-", "=": "." }[t])
                                      )
                                    ),
                                    s.searchParams.set("port", `${i}`),
                                    r.forEach((t) => {
                                      s.searchParams.set("v", t);
                                    }),
                                    s
                                  );
                                });
                              })(t, n, e);
                            if ("https:" === r.protocol)
                              window.location.assign(r);
                            else
                              try {
                                switch (
                                  -1 !== navigator.userAgent.indexOf("Firefox/")
                                    ? Y.Firefox
                                    : Y.Other
                                ) {
                                  case Y.Firefox:
                                    null == B &&
                                      (((B =
                                        document.createElement(
                                          "iframe"
                                        )).style.display = "none"),
                                      document.body.appendChild(B)),
                                      (B.contentWindow.location.href =
                                        r.toString());
                                    break;
                                  case Y.Other: {
                                    let t = new Promise((t, e) => {
                                      function n() {
                                        clearTimeout(i),
                                          window.removeEventListener("blur", r);
                                      }
                                      function r() {
                                        n(), t();
                                      }
                                      window.addEventListener("blur", r);
                                      let i = setTimeout(() => {
                                        n(), e();
                                      }, 2e3);
                                    });
                                    window.location.assign(r), yield t;
                                  }
                                }
                              } catch (t) {
                                throw new z(
                                  A.ERROR_WALLET_NOT_FOUND,
                                  "Found no installed wallet that supports the mobile wallet protocol."
                                );
                              }
                            return n;
                          });
                        })(r.publicKey, null == e ? void 0 : e.baseUri),
                        a = `ws://localhost:${i}/solana-wallet`,
                        s = (() => {
                          let t = [...Q];
                          return () => (t.length > 1 ? t.shift() : t[0]);
                        })(),
                        o = 1,
                        c = 0,
                        l = { __type: "disconnected" };
                      return new Promise((e, u) => {
                        let d, h, f;
                        let w = {},
                          p = () =>
                            C(this, void 0, void 0, function* () {
                              if ("connecting" !== l.__type) {
                                console.warn(
                                  `Expected adapter state to be \`connecting\` at the moment the websocket opens. Got \`${l.__type}\`.`
                                );
                                return;
                              }
                              let { associationKeypair: t } = l;
                              d.removeEventListener("open", p);
                              let e = yield (function () {
                                return C(this, void 0, void 0, function* () {
                                  return yield crypto.subtle.generateKey(
                                    { name: "ECDH", namedCurve: "P-256" },
                                    !1,
                                    ["deriveKey", "deriveBits"]
                                  );
                                });
                              })();
                              d.send(
                                yield (function (t, e) {
                                  return C(this, void 0, void 0, function* () {
                                    let n = yield crypto.subtle.exportKey(
                                        "raw",
                                        t
                                      ),
                                      r = yield crypto.subtle.sign(
                                        { hash: "SHA-256", name: "ECDSA" },
                                        e,
                                        n
                                      ),
                                      i = new Uint8Array(
                                        n.byteLength + r.byteLength
                                      );
                                    return (
                                      i.set(new Uint8Array(n), 0),
                                      i.set(new Uint8Array(r), n.byteLength),
                                      i
                                    );
                                  });
                                })(e.publicKey, t.privateKey)
                              ),
                                (l = {
                                  __type: "hello_req_sent",
                                  associationPublicKey: t.publicKey,
                                  ecdhPrivateKey: e.privateKey,
                                });
                            }),
                          y = (t) => {
                            t.wasClean
                              ? (l = { __type: "disconnected" })
                              : u(
                                  new z(
                                    A.ERROR_SESSION_CLOSED,
                                    `The wallet session dropped unexpectedly (${t.code}: ${t.reason}).`,
                                    { closeEvent: t }
                                  )
                                ),
                              h();
                          },
                          g = (t) =>
                            C(this, void 0, void 0, function* () {
                              h(),
                                Date.now() - n >= 3e4
                                  ? u(
                                      new z(
                                        A.ERROR_SESSION_TIMEOUT,
                                        `Failed to connect to the wallet websocket on port ${i}.`
                                      )
                                    )
                                  : (yield new Promise((t) => {
                                      let e = s();
                                      f = window.setTimeout(t, e);
                                    }),
                                    m());
                            }),
                          M = (n) =>
                            C(this, void 0, void 0, function* () {
                              let r = yield n.data.arrayBuffer();
                              switch (l.__type) {
                                case "connected":
                                  try {
                                    let t = r.slice(0, 4),
                                      e = Z(t);
                                    if (e !== c + 1)
                                      throw Error(
                                        "Encrypted message has invalid sequence number"
                                      );
                                    c = e;
                                    let n = yield (function (t, e) {
                                        return C(
                                          this,
                                          void 0,
                                          void 0,
                                          function* () {
                                            let n = JSON.parse(yield k(t, e));
                                            if (
                                              Object.hasOwnProperty.call(
                                                n,
                                                "error"
                                              )
                                            )
                                              throw new _(
                                                n.id,
                                                n.error.code,
                                                n.error.message
                                              );
                                            return n;
                                          }
                                        );
                                      })(r, l.sharedSecret),
                                      i = w[n.id];
                                    delete w[n.id], i.resolve(n.result);
                                  } catch (t) {
                                    if (t instanceof _) {
                                      let e = w[t.jsonRpcMessageId];
                                      delete w[t.jsonRpcMessageId], e.reject(t);
                                    } else throw t;
                                  }
                                  break;
                                case "hello_req_sent": {
                                  var i, a;
                                  let n = yield (function (t, e, n) {
                                      return C(
                                        this,
                                        void 0,
                                        void 0,
                                        function* () {
                                          let [r, i] = yield Promise.all([
                                              crypto.subtle.exportKey("raw", e),
                                              crypto.subtle.importKey(
                                                "raw",
                                                t.slice(0, 65),
                                                {
                                                  name: "ECDH",
                                                  namedCurve: "P-256",
                                                },
                                                !1,
                                                []
                                              ),
                                            ]),
                                            a = yield crypto.subtle.deriveBits(
                                              { name: "ECDH", public: i },
                                              n,
                                              256
                                            ),
                                            s = yield crypto.subtle.importKey(
                                              "raw",
                                              a,
                                              "HKDF",
                                              !1,
                                              ["deriveKey"]
                                            );
                                          return yield crypto.subtle.deriveKey(
                                            {
                                              name: "HKDF",
                                              hash: "SHA-256",
                                              salt: new Uint8Array(r),
                                              info: new Uint8Array(),
                                            },
                                            s,
                                            { name: "AES-GCM", length: 128 },
                                            !1,
                                            ["encrypt", "decrypt"]
                                          );
                                        }
                                      );
                                    })(
                                      r,
                                      l.associationPublicKey,
                                      l.ecdhPrivateKey
                                    ),
                                    s = r.slice(65),
                                    f =
                                      0 !== s.byteLength
                                        ? yield C(
                                            this,
                                            void 0,
                                            void 0,
                                            function* () {
                                              let t = Z(s.slice(0, 4));
                                              if (t !== c + 1)
                                                throw Error(
                                                  "Encrypted message has invalid sequence number"
                                                );
                                              return (
                                                (c = t),
                                                (function (t, e) {
                                                  return C(
                                                    this,
                                                    void 0,
                                                    void 0,
                                                    function* () {
                                                      let n = JSON.parse(
                                                          yield k(t, e)
                                                        ),
                                                        r = "legacy";
                                                      if (
                                                        Object.hasOwnProperty.call(
                                                          n,
                                                          "v"
                                                        )
                                                      )
                                                        switch (n.v) {
                                                          case 1:
                                                          case "1":
                                                          case "v1":
                                                            r = "v1";
                                                            break;
                                                          case "legacy":
                                                            r = "legacy";
                                                            break;
                                                          default:
                                                            throw new z(
                                                              A.ERROR_INVALID_PROTOCOL_VERSION,
                                                              `Unknown/unsupported protocol version: ${n.v}`
                                                            );
                                                        }
                                                      return {
                                                        protocol_version: r,
                                                      };
                                                    }
                                                  );
                                                })(s, n)
                                              );
                                            }
                                          )
                                        : { protocol_version: "legacy" };
                                  l = {
                                    __type: "connected",
                                    sharedSecret: n,
                                    sessionProperties: f,
                                  };
                                  let p =
                                    ((i = f.protocol_version),
                                    (a = (t, e) =>
                                      C(this, void 0, void 0, function* () {
                                        let r = o++;
                                        return (
                                          d.send(
                                            yield (function (t, e) {
                                              return C(
                                                this,
                                                void 0,
                                                void 0,
                                                function* () {
                                                  let n = JSON.stringify(t);
                                                  return (function (t, e, n) {
                                                    return C(
                                                      this,
                                                      void 0,
                                                      void 0,
                                                      function* () {
                                                        let r = (function (t) {
                                                            if (t >= 4294967296)
                                                              throw Error(
                                                                "Outbound sequence number overflow. The maximum sequence number is 32-bytes."
                                                              );
                                                            let e =
                                                              new ArrayBuffer(
                                                                4
                                                              );
                                                            return (
                                                              new DataView(
                                                                e
                                                              ).setUint32(
                                                                0,
                                                                t,
                                                                !1
                                                              ),
                                                              new Uint8Array(e)
                                                            );
                                                          })(e),
                                                          i = new Uint8Array(
                                                            12
                                                          );
                                                        crypto.getRandomValues(
                                                          i
                                                        );
                                                        let a =
                                                            yield crypto.subtle.encrypt(
                                                              P(r, i),
                                                              n,
                                                              new TextEncoder().encode(
                                                                t
                                                              )
                                                            ),
                                                          s = new Uint8Array(
                                                            r.byteLength +
                                                              i.byteLength +
                                                              a.byteLength
                                                          );
                                                        return (
                                                          s.set(
                                                            new Uint8Array(r),
                                                            0
                                                          ),
                                                          s.set(
                                                            new Uint8Array(i),
                                                            r.byteLength
                                                          ),
                                                          s.set(
                                                            new Uint8Array(a),
                                                            r.byteLength +
                                                              i.byteLength
                                                          ),
                                                          s
                                                        );
                                                      }
                                                    );
                                                  })(n, t.id, e);
                                                }
                                              );
                                            })(
                                              {
                                                id: r,
                                                jsonrpc: "2.0",
                                                method: t,
                                                params: null != e ? e : {},
                                              },
                                              n
                                            )
                                          ),
                                          new Promise((e, n) => {
                                            w[r] = {
                                              resolve(r) {
                                                switch (t) {
                                                  case "authorize":
                                                  case "reauthorize": {
                                                    let { wallet_uri_base: t } =
                                                      r;
                                                    if (null != t)
                                                      try {
                                                        !(function (t) {
                                                          let e;
                                                          try {
                                                            e = new URL(t);
                                                          } catch (t) {
                                                            throw new z(
                                                              A.ERROR_FORBIDDEN_WALLET_BASE_URL,
                                                              "Invalid base URL supplied by wallet"
                                                            );
                                                          }
                                                          if (
                                                            "https:" !==
                                                            e.protocol
                                                          )
                                                            throw new z(
                                                              A.ERROR_FORBIDDEN_WALLET_BASE_URL,
                                                              "Base URLs supplied by wallets must be valid `https` URLs"
                                                            );
                                                        })(t);
                                                      } catch (t) {
                                                        n(t);
                                                        return;
                                                      }
                                                  }
                                                }
                                                e(r);
                                              },
                                              reject: n,
                                            };
                                          })
                                        );
                                      })),
                                    new Proxy(
                                      {},
                                      {
                                        get: (t, e) => (
                                          null == t[e] &&
                                            (t[e] = function (t) {
                                              return C(
                                                this,
                                                void 0,
                                                void 0,
                                                function* () {
                                                  let { method: n, params: r } =
                                                      (function (t, e, n) {
                                                        let r = e,
                                                          i = t
                                                            .toString()
                                                            .replace(
                                                              /[A-Z]/g,
                                                              (t) =>
                                                                `_${t.toLowerCase()}`
                                                            )
                                                            .toLowerCase();
                                                        switch (t) {
                                                          case "authorize": {
                                                            let { chain: t } =
                                                              r;
                                                            if (
                                                              "legacy" === n
                                                            ) {
                                                              switch (t) {
                                                                case "solana:testnet":
                                                                  t = "testnet";
                                                                  break;
                                                                case "solana:devnet":
                                                                  t = "devnet";
                                                                  break;
                                                                case "solana:mainnet":
                                                                  t =
                                                                    "mainnet-beta";
                                                                  break;
                                                                default:
                                                                  t = r.cluster;
                                                              }
                                                              r.cluster = t;
                                                            } else {
                                                              switch (t) {
                                                                case "testnet":
                                                                case "devnet":
                                                                  t = `solana:${t}`;
                                                                  break;
                                                                case "mainnet-beta":
                                                                  t =
                                                                    "solana:mainnet";
                                                              }
                                                              r.chain = t;
                                                            }
                                                          }
                                                          case "reauthorize": {
                                                            let {
                                                              auth_token: t,
                                                              identity: e,
                                                            } = r;
                                                            t &&
                                                              ("legacy" === n
                                                                ? ((i =
                                                                    "reauthorize"),
                                                                  (r = {
                                                                    auth_token:
                                                                      t,
                                                                    identity: e,
                                                                  }))
                                                                : (i =
                                                                    "authorize"));
                                                          }
                                                        }
                                                        return {
                                                          method: i,
                                                          params: r,
                                                        };
                                                      })(e, t, i),
                                                    s = yield a(n, r);
                                                  return (
                                                    "authorize" === n &&
                                                      r.sign_in_payload &&
                                                      !s.sign_in_result &&
                                                      (s.sign_in_result =
                                                        yield (function (
                                                          t,
                                                          e,
                                                          n
                                                        ) {
                                                          var r;
                                                          return C(
                                                            this,
                                                            void 0,
                                                            void 0,
                                                            function* () {
                                                              var i, a;
                                                              let s =
                                                                  null !==
                                                                    (r =
                                                                      t.domain) &&
                                                                  void 0 !== r
                                                                    ? r
                                                                    : window
                                                                        .location
                                                                        .host,
                                                                o =
                                                                  e.accounts[0]
                                                                    .address,
                                                                c =
                                                                  ((i =
                                                                    Object.assign(
                                                                      Object.assign(
                                                                        {},
                                                                        t
                                                                      ),
                                                                      {
                                                                        domain:
                                                                          s,
                                                                        address:
                                                                          o,
                                                                      }
                                                                    )),
                                                                  (a =
                                                                    (function (
                                                                      t
                                                                    ) {
                                                                      let e = `${t.domain} wants you to sign in with your BSC account:
`;
                                                                      (e += `${t.address}`),
                                                                        t.statement &&
                                                                          (e += `

${t.statement}`);
                                                                      let n =
                                                                        [];
                                                                      if (
                                                                        (t.uri &&
                                                                          n.push(
                                                                            `URI: ${t.uri}`
                                                                          ),
                                                                        t.version &&
                                                                          n.push(
                                                                            `Version: ${t.version}`
                                                                          ),
                                                                        t.chainId &&
                                                                          n.push(
                                                                            `Chain ID: ${t.chainId}`
                                                                          ),
                                                                        t.nonce &&
                                                                          n.push(
                                                                            `Nonce: ${t.nonce}`
                                                                          ),
                                                                        t.issuedAt &&
                                                                          n.push(
                                                                            `Issued At: ${t.issuedAt}`
                                                                          ),
                                                                        t.expirationTime &&
                                                                          n.push(
                                                                            `Expiration Time: ${t.expirationTime}`
                                                                          ),
                                                                        t.notBefore &&
                                                                          n.push(
                                                                            `Not Before: ${t.notBefore}`
                                                                          ),
                                                                        t.requestId &&
                                                                          n.push(
                                                                            `Request ID: ${t.requestId}`
                                                                          ),
                                                                        t.resources)
                                                                      )
                                                                        for (let e of (n.push(
                                                                          "Resources:"
                                                                        ),
                                                                        t.resources))
                                                                          n.push(
                                                                            `- ${e}`
                                                                          );
                                                                      return (
                                                                        n.length &&
                                                                          (e += `

${n.join("\n")}`),
                                                                        e
                                                                      );
                                                                    })(i)),
                                                                  window.btoa(
                                                                    a
                                                                  )),
                                                                l = yield n(
                                                                  "sign_messages",
                                                                  {
                                                                    addresses: [
                                                                      o,
                                                                    ],
                                                                    payloads: [
                                                                      c,
                                                                    ],
                                                                  }
                                                                );
                                                              return {
                                                                address: o,
                                                                signed_message:
                                                                  c,
                                                                signature:
                                                                  l.signed_payloads[0].slice(
                                                                    c.length
                                                                  ),
                                                              };
                                                            }
                                                          );
                                                        })(
                                                          r.sign_in_payload,
                                                          s,
                                                          a
                                                        )),
                                                    (function (t, e, n) {
                                                      if (
                                                        "getCapabilities" === t
                                                      )
                                                        switch (n) {
                                                          case "legacy": {
                                                            let t = [
                                                              "solana:signTransactions",
                                                            ];
                                                            return (
                                                              !0 ===
                                                                e.supports_clone_authorization &&
                                                                t.push(R),
                                                              Object.assign(
                                                                Object.assign(
                                                                  {},
                                                                  e
                                                                ),
                                                                { features: t }
                                                              )
                                                            );
                                                          }
                                                          case "v1":
                                                            return Object.assign(
                                                              Object.assign(
                                                                {},
                                                                e
                                                              ),
                                                              {
                                                                supports_sign_and_send_transactions:
                                                                  !0,
                                                                supports_clone_authorization:
                                                                  e.features.includes(
                                                                    R
                                                                  ),
                                                              }
                                                            );
                                                        }
                                                      return e;
                                                    })(e, s, i)
                                                  );
                                                }
                                              );
                                            }),
                                          t[e]
                                        ),
                                        defineProperty: () => !1,
                                        deleteProperty: () => !1,
                                      }
                                    ));
                                  try {
                                    e(yield t(p));
                                  } catch (t) {
                                    u(t);
                                  } finally {
                                    h(), d.close();
                                  }
                                }
                              }
                            }),
                          m = () => {
                            h && h(),
                              (l = {
                                __type: "connecting",
                                associationKeypair: r,
                              }),
                              void 0 === n && (n = Date.now()),
                              (d = new WebSocket(a, [
                                "com.solana.mobilewalletadapter.v1",
                              ])).addEventListener("open", p),
                              d.addEventListener("close", y),
                              d.addEventListener("error", g),
                              d.addEventListener("message", M),
                              (h = () => {
                                window.clearTimeout(f),
                                  d.removeEventListener("open", p),
                                  d.removeEventListener("close", y),
                                  d.removeEventListener("error", g),
                                  d.removeEventListener("message", M);
                              });
                          };
                        m();
                      });
                    });
                  })(
                    (e) =>
                      t(
                        new Proxy(
                          {},
                          {
                            get(t, n) {
                              if (null == t[n])
                                switch (n) {
                                  case "signAndSendTransactions":
                                    t[n] = function (t) {
                                      var {
                                          minContextSlot: n,
                                          commitment: r,
                                          skipPreflight: i,
                                          maxRetries: a,
                                          waitForCommitmentToSendNextTransaction:
                                            s,
                                          transactions: o,
                                        } = t,
                                        c = F(t, [
                                          "minContextSlot",
                                          "commitment",
                                          "skipPreflight",
                                          "maxRetries",
                                          "waitForCommitmentToSendNextTransaction",
                                          "transactions",
                                        ]);
                                      return H(
                                        this,
                                        void 0,
                                        void 0,
                                        function* () {
                                          let t = o.map($),
                                            l = {
                                              min_context_slot: n,
                                              commitment: r,
                                              skip_preflight: i,
                                              max_retries: a,
                                              wait_for_commitment_to_send_next_transaction:
                                                s,
                                            },
                                            { signatures: u } =
                                              yield e.signAndSendTransactions(
                                                Object.assign(
                                                  Object.assign(
                                                    Object.assign({}, c),
                                                    Object.values(l).some(
                                                      (t) => null != t
                                                    )
                                                      ? { options: l }
                                                      : null
                                                  ),
                                                  { payloads: t }
                                                )
                                              );
                                          return u.map(K).map(G.encode);
                                        }
                                      );
                                    };
                                    break;
                                  case "signMessages":
                                    t[n] = function (t) {
                                      var { payloads: n } = t,
                                        r = F(t, ["payloads"]);
                                      return H(
                                        this,
                                        void 0,
                                        void 0,
                                        function* () {
                                          let t = n.map(V),
                                            { signed_payloads: i } =
                                              yield e.signMessages(
                                                Object.assign(
                                                  Object.assign({}, r),
                                                  { payloads: t }
                                                )
                                              );
                                          return i.map(K);
                                        }
                                      );
                                    };
                                    break;
                                  case "signTransactions":
                                    t[n] = function (t) {
                                      var { transactions: n } = t,
                                        r = F(t, ["transactions"]);
                                      return H(
                                        this,
                                        void 0,
                                        void 0,
                                        function* () {
                                          let t = n.map($),
                                            { signed_payloads: i } =
                                              yield e.signTransactions(
                                                Object.assign(
                                                  Object.assign({}, r),
                                                  { payloads: t }
                                                )
                                              );
                                          return i.map(K).map(X);
                                        }
                                      );
                                    };
                                    break;
                                  default:
                                    t[n] = e[n];
                                }
                              return t[n];
                            },
                            defineProperty: () => !1,
                            deleteProperty: () => !1,
                          }
                        )
                      ),
                    e
                  );
                });
              })(t, n ? { baseUri: n } : void 0);
            } catch (t) {
              throw (
                (this._connectionGeneration !== r &&
                  (yield new Promise(() => {})),
                t instanceof Error &&
                  "SolanaMobileWalletAdapterError" === t.name &&
                  "ERROR_WALLET_NOT_FOUND" === t.code &&
                  (yield this._onWalletNotFound(this)),
                t)
              );
            }
          });
        }
        assertIsAuthorized() {
          if (!this._authorizationResult || !this._selectedAddress)
            throw new x.oS();
          return {
            authToken: this._authorizationResult.auth_token,
            selectedAddress: this._selectedAddress,
          };
        }
        performSignTransactions(t) {
          return J(this, void 0, void 0, function* () {
            let { authToken: e } = this.assertIsAuthorized();
            try {
              return yield this.transact((n) =>
                J(this, void 0, void 0, function* () {
                  return (
                    yield this.performReauthorization(n, e),
                    yield n.signTransactions({ transactions: t })
                  );
                })
              );
            } catch (t) {
              throw new x.PY(null == t ? void 0 : t.message, t);
            }
          });
        }
        sendTransaction(t, e, n) {
          return J(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              J(this, void 0, void 0, function* () {
                let { authToken: r } = this.assertIsAuthorized(),
                  i = null == n ? void 0 : n.minContextSlot;
                try {
                  return yield this.transact((a) =>
                    J(this, void 0, void 0, function* () {
                      function s() {
                        let t, r;
                        switch (e.commitment) {
                          case "confirmed":
                          case "finalized":
                          case "processed":
                            t = e.commitment;
                            break;
                          default:
                            t = "finalized";
                        }
                        switch (null == n ? void 0 : n.preflightCommitment) {
                          case "confirmed":
                          case "finalized":
                          case "processed":
                            r = n.preflightCommitment;
                            break;
                          case void 0:
                            r = t;
                            break;
                          default:
                            r = "finalized";
                        }
                        let i =
                            "finalized" === r ? 2 : "confirmed" === r ? 1 : 0,
                          a = "finalized" === t ? 2 : "confirmed" === t ? 1 : 0;
                        return i < a ? r : t;
                      }
                      let [o, c, l] = yield Promise.all([
                        a.getCapabilities(),
                        this.performReauthorization(a, r),
                        te(t)
                          ? null
                          : J(this, void 0, void 0, function* () {
                              var n;
                              if (
                                (t.feePayer ||
                                  (t.feePayer =
                                    null !== (n = this.publicKey) &&
                                    void 0 !== n
                                      ? n
                                      : void 0),
                                null == t.recentBlockhash)
                              ) {
                                let { blockhash: n } =
                                  yield e.getLatestBlockhash({
                                    commitment: s(),
                                  });
                                t.recentBlockhash = n;
                              }
                            }),
                      ]);
                      if (o.supports_sign_and_send_transactions)
                        return (yield a.signAndSendTransactions({
                          minContextSlot: i,
                          transactions: [t],
                        }))[0];
                      {
                        let [r] = yield a.signTransactions({
                          transactions: [t],
                        });
                        if (te(r)) return yield e.sendTransaction(r);
                        {
                          let t = r.serialize();
                          return yield e.sendRawTransaction(
                            t,
                            Object.assign(Object.assign({}, n), {
                              preflightCommitment: s(),
                            })
                          );
                        }
                      }
                    })
                  );
                } catch (t) {
                  throw new x.IW(null == t ? void 0 : t.message, t);
                }
              })
            );
          });
        }
        signTransaction(t) {
          return J(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              J(this, void 0, void 0, function* () {
                let [e] = yield this.performSignTransactions([t]);
                return e;
              })
            );
          });
        }
        signAllTransactions(t) {
          return J(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              J(this, void 0, void 0, function* () {
                return yield this.performSignTransactions(t);
              })
            );
          });
        }
        signMessage(t) {
          return J(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              J(this, void 0, void 0, function* () {
                let { authToken: e, selectedAddress: n } =
                  this.assertIsAuthorized();
                try {
                  return yield this.transact((r) =>
                    J(this, void 0, void 0, function* () {
                      yield this.performReauthorization(r, e);
                      let [i] = yield r.signMessages({
                        addresses: [n],
                        payloads: [t],
                      });
                      return i.slice(-64);
                    })
                  );
                } catch (t) {
                  throw new x.fk(null == t ? void 0 : t.message, t);
                }
              })
            );
          });
        }
        signIn(t) {
          return J(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              J(this, void 0, void 0, function* () {
                var e, n;
                if (
                  this._readyState !== b.i1.Installed &&
                  this._readyState !== b.i1.Loadable
                )
                  throw new x.OZ();
                this._connecting = !0;
                try {
                  let r = yield this.performAuthorization(
                    Object.assign(Object.assign({}, t), {
                      domain:
                        null !== (e = null == t ? void 0 : t.domain) &&
                        void 0 !== e
                          ? e
                          : window.location.host,
                    })
                  );
                  if (!r.sign_in_result)
                    throw Error(
                      "Sign in failed, no sign in result returned by wallet"
                    );
                  let i = r.sign_in_result.address;
                  return {
                    account: Object.assign(
                      Object.assign(
                        {},
                        null !== (n = r.accounts.find((t) => t.address == i)) &&
                          void 0 !== n
                          ? n
                          : { address: i }
                      ),
                      { publicKey: q(i) }
                    ),
                    signedMessage: q(r.sign_in_result.signed_message),
                    signature: q(r.sign_in_result.signature),
                  };
                } catch (t) {
                  throw new x.$w(
                    (t instanceof Error && t.message) || "Unknown error",
                    t
                  );
                } finally {
                  this._connecting = !1;
                }
              })
            );
          });
        }
      }
      let tr = "SolanaMobileWalletAdapterDefaultAuthorizationCache";
      function ti(t) {
        return J(this, void 0, void 0, function* () {
          "undefined" != typeof window && window.location.assign(t.url);
        });
      }
      var ta = n(8909),
        ts = n(4348),
        to = n(8712),
        tc = n(6826);
      let tl = function (t) {
        return (
          to.V in t.features &&
          tc.k in t.features &&
          (ta.G in t.features || ts.R in t.features)
        );
      };
      var tu = n(5543),
        td = n(2864);
      let th = "solana:signIn";
      var tf = n(296);
      function tw(t) {
        switch (t) {
          case "processed":
          case "confirmed":
          case "finalized":
          case void 0:
            return t;
          case "recent":
            return "processed";
          case "single":
          case "singleGossip":
            return "confirmed";
          case "max":
          case "root":
            return "finalized";
          default:
            return;
        }
      }
      var tp = n(8129);
      new WeakMap(),
        new WeakMap(),
        new WeakMap(),
        new WeakMap(),
        new WeakMap(),
        new WeakMap();
      var ty = n(8561),
        tg = function (t, e, n, r, i) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof e ? t !== e || !i : !e.has(t))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        },
        tM = function (t, e, n, r) {
          if ("a" === n && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof e ? t !== e || !r : !e.has(t))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        };
      class tm extends b.mI {
        constructor({ wallet: t }) {
          super(),
            o.add(this),
            c.set(this, void 0),
            l.set(this, void 0),
            u.set(this, void 0),
            d.set(this, void 0),
            h.set(this, void 0),
            f.set(this, void 0),
            w.set(this, void 0),
            p.set(
              this,
              "undefined" == typeof window || "undefined" == typeof document
                ? b.i1.Unsupported
                : b.i1.Installed
            ),
            v.set(this, (t) => {
              if ("accounts" in t) {
                let t = tM(this, w, "f").accounts[0];
                tM(this, c, "f") &&
                  !tM(this, d, "f") &&
                  t !== tM(this, c, "f") &&
                  (t
                    ? tM(this, o, "m", g).call(this, t)
                    : (this.emit("error", new x.at()),
                      tM(this, o, "m", M).call(this)));
              }
              "features" in t && tM(this, o, "m", m).call(this);
            }),
            tg(this, w, t, "f"),
            tg(this, c, null, "f"),
            tg(this, l, null, "f"),
            tg(this, u, !1, "f"),
            tg(this, d, !1, "f"),
            tg(
              this,
              h,
              tM(this, w, "f").features[tc.k].on("change", tM(this, v, "f")),
              "f"
            ),
            tM(this, o, "m", m).call(this);
        }
        get name() {
          return tM(this, w, "f").name;
        }
        get url() {
          return "https://github.com/solana-labs/wallet-standard";
        }
        get icon() {
          return tM(this, w, "f").icon;
        }
        get readyState() {
          return tM(this, p, "f");
        }
        get publicKey() {
          return tM(this, l, "f");
        }
        get connecting() {
          return tM(this, u, "f");
        }
        get supportedTransactionVersions() {
          return tM(this, f, "f");
        }
        get wallet() {
          return tM(this, w, "f");
        }
        get standard() {
          return !0;
        }
        destroy() {
          tg(this, c, null, "f"),
            tg(this, l, null, "f"),
            tg(this, u, !1, "f"),
            tg(this, d, !1, "f");
          let t = tM(this, h, "f");
          t && (tg(this, h, null, "f"), t());
        }
        async autoConnect() {
          return tM(this, o, "m", y).call(this, { silent: !0 });
        }
        async connect() {
          return tM(this, o, "m", y).call(this);
        }
        async disconnect() {
          if (tp.R in tM(this, w, "f").features)
            try {
              tg(this, d, !0, "f"),
                await tM(this, w, "f").features[tp.R].disconnect();
            } catch (t) {
              this.emit("error", new x.UG(t?.message, t));
            } finally {
              tg(this, d, !1, "f");
            }
          tM(this, o, "m", M).call(this);
        }
        async sendTransaction(t, e, n = {}) {
          try {
            var r;
            let i;
            let a = tM(this, c, "f");
            if (!a) throw new x.oS();
            if (ta.G in tM(this, w, "f").features) {
              if (a.features.includes(ta.G)) i = ta.G;
              else if (
                ts.R in tM(this, w, "f").features &&
                a.features.includes(ts.R)
              )
                i = ts.R;
              else throw new x.cO();
            } else if (ts.R in tM(this, w, "f").features) {
              if (!a.features.includes(ts.R)) throw new x.cO();
              i = ts.R;
            } else throw new x.p6();
            let s = (r = e.rpcEndpoint).includes(
              "https://api.mainnet-beta.solana.com"
            )
              ? tf.aI
              : /\bdevnet\b/i.test(r)
              ? tf.BR
              : /\btestnet\b/i.test(r)
              ? tf.gv
              : /\blocalhost\b/i.test(r) || /\b127\.0\.0\.1\b/.test(r)
              ? tf.l1
              : tf.aI;
            if (!a.chains.includes(s)) throw new x.IW();
            try {
              let r;
              let { signers: o, ...c } = n;
              if (
                ((0, tu.W)(t)
                  ? (o?.length && t.sign(o), (r = t.serialize()))
                  : ((t = await this.prepareTransaction(t, e, c)),
                    o?.length && t.partialSign(...o),
                    (r = new Uint8Array(
                      t.serialize({
                        requireAllSignatures: !1,
                        verifySignatures: !1,
                      })
                    ))),
                i === ta.G)
              ) {
                let [t] = await tM(this, w, "f").features[
                  ta.G
                ].signAndSendTransaction({
                  account: a,
                  chain: s,
                  transaction: r,
                  options: {
                    preflightCommitment: tw(
                      c.preflightCommitment || e.commitment
                    ),
                    skipPreflight: c.skipPreflight,
                    maxRetries: c.maxRetries,
                    minContextSlot: c.minContextSlot,
                  },
                });
                return ty.encode(t.signature);
              }
              {
                let [t] = await tM(this, w, "f").features[ts.R].signTransaction(
                  {
                    account: a,
                    chain: s,
                    transaction: r,
                    options: {
                      preflightCommitment: tw(
                        c.preflightCommitment || e.commitment
                      ),
                      minContextSlot: c.minContextSlot,
                    },
                  }
                );
                return await e.sendRawTransaction(t.signedTransaction, {
                  ...c,
                  preflightCommitment: tw(
                    c.preflightCommitment || e.commitment
                  ),
                });
              }
            } catch (t) {
              if (t instanceof x.lj) throw t;
              throw new x.IW(t?.message, t);
            }
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        }
      }
      (c = new WeakMap()),
        (l = new WeakMap()),
        (u = new WeakMap()),
        (d = new WeakMap()),
        (h = new WeakMap()),
        (f = new WeakMap()),
        (w = new WeakMap()),
        (p = new WeakMap()),
        (v = new WeakMap()),
        (o = new WeakSet()),
        (y = async function (t) {
          try {
            if (this.connected || this.connecting) return;
            if (tM(this, p, "f") !== b.i1.Installed) throw new x.OZ();
            if ((tg(this, u, !0, "f"), !tM(this, w, "f").accounts.length))
              try {
                await tM(this, w, "f").features[to.V].connect(t);
              } catch (t) {
                throw new x.$w(t?.message, t);
              }
            let e = tM(this, w, "f").accounts[0];
            if (!e) throw new x.cO();
            tM(this, o, "m", g).call(this, e);
          } catch (t) {
            throw (this.emit("error", t), t);
          } finally {
            tg(this, u, !1, "f");
          }
        }),
        (g = function (t) {
          let e;
          try {
            e = new O.PublicKey(t.address);
          } catch (t) {
            throw new x.Nx(t?.message, t);
          }
          tg(this, c, t, "f"),
            tg(this, l, e, "f"),
            tM(this, o, "m", m).call(this),
            this.emit("connect", e);
        }),
        (M = function () {
          tg(this, c, null, "f"),
            tg(this, l, null, "f"),
            tM(this, o, "m", m).call(this),
            this.emit("disconnect");
        }),
        (m = function () {
          let t =
            ta.G in tM(this, w, "f").features
              ? tM(this, w, "f").features[ta.G].supportedTransactionVersions
              : tM(this, w, "f").features[ts.R].supportedTransactionVersions;
          tg(
            this,
            f,
            !(function (t, e) {
              if (t === e) return !0;
              let n = t.length;
              if (n !== e.length) return !1;
              for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
              return !0;
            })(t, ["legacy"])
              ? new Set(t)
              : null,
            "f"
          ),
            ts.R in tM(this, w, "f").features &&
            tM(this, c, "f")?.features.includes(ts.R)
              ? ((this.signTransaction = tM(this, o, "m", L)),
                (this.signAllTransactions = tM(this, o, "m", j)))
              : (delete this.signTransaction, delete this.signAllTransactions),
            td.g in tM(this, w, "f").features &&
            tM(this, c, "f")?.features.includes(td.g)
              ? (this.signMessage = tM(this, o, "m", N))
              : delete this.signMessage,
            th in tM(this, w, "f").features
              ? (this.signIn = tM(this, o, "m", I))
              : delete this.signIn;
        }),
        (L = async function (t) {
          try {
            let e = tM(this, c, "f");
            if (!e) throw new x.oS();
            if (!(ts.R in tM(this, w, "f").features)) throw new x.p6();
            if (!e.features.includes(ts.R)) throw new x.cO();
            try {
              let n = (
                await tM(this, w, "f").features[ts.R].signTransaction({
                  account: e,
                  transaction: (0, tu.W)(t)
                    ? t.serialize()
                    : new Uint8Array(
                        t.serialize({
                          requireAllSignatures: !1,
                          verifySignatures: !1,
                        })
                      ),
                })
              )[0].signedTransaction;
              return (0, tu.W)(t)
                ? O.VersionedTransaction.deserialize(n)
                : O.Transaction.from(n);
            } catch (t) {
              if (t instanceof x.lj) throw t;
              throw new x.PY(t?.message, t);
            }
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        }),
        (j = async function (t) {
          try {
            let e = tM(this, c, "f");
            if (!e) throw new x.oS();
            if (!(ts.R in tM(this, w, "f").features)) throw new x.p6();
            if (!e.features.includes(ts.R)) throw new x.cO();
            try {
              let n = await tM(this, w, "f").features[ts.R].signTransaction(
                ...t.map((t) => ({
                  account: e,
                  transaction: (0, tu.W)(t)
                    ? t.serialize()
                    : new Uint8Array(
                        t.serialize({
                          requireAllSignatures: !1,
                          verifySignatures: !1,
                        })
                      ),
                }))
              );
              return t.map((t, e) => {
                let r = n[e].signedTransaction;
                return (0, tu.W)(t)
                  ? O.VersionedTransaction.deserialize(r)
                  : O.Transaction.from(r);
              });
            } catch (t) {
              throw new x.PY(t?.message, t);
            }
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        }),
        (N = async function (t) {
          try {
            let e = tM(this, c, "f");
            if (!e) throw new x.oS();
            if (!(td.g in tM(this, w, "f").features)) throw new x.p6();
            if (!e.features.includes(td.g)) throw new x.cO();
            try {
              return (
                await tM(this, w, "f").features[td.g].signMessage({
                  account: e,
                  message: t,
                })
              )[0].signature;
            } catch (t) {
              throw new x.fk(t?.message, t);
            }
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        }),
        (I = async function (t = {}) {
          try {
            let e;
            if (!(th in tM(this, w, "f").features)) throw new x.p6();
            try {
              [e] = await tM(this, w, "f").features[th].signIn(t);
            } catch (t) {
              throw new x.bD(t?.message, t);
            }
            if (!e) throw new x.bD();
            return tM(this, o, "m", g).call(this, e.account), e;
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        });
      var tv = function (t, e, n, r, i) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof e ? t !== e || !i : !e.has(t))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        },
        tL = function (t, e, n, r) {
          if ("a" === n && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof e ? t !== e || !r : !e.has(t))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        };
      let tj = new Set(),
        tN = {};
      function tI(...t) {
        return (t = t.filter((t) => !tj.has(t))).length
          ? (t.forEach((t) => tj.add(t)),
            tN.register?.forEach((e) => tT(() => e(...t))),
            function () {
              t.forEach((t) => tj.delete(t)),
                tN.unregister?.forEach((e) => tT(() => e(...t)));
            })
          : () => {};
      }
      function tE() {
        return [...tj];
      }
      function tS(t, e) {
        return (
          tN[t]?.push(e) || (tN[t] = [e]),
          function () {
            tN[t] = tN[t]?.filter((t) => e !== t);
          }
        );
      }
      function tT(t) {
        try {
          t();
        } catch (t) {
          console.error(t);
        }
      }
      class tb extends Event {
        constructor(t) {
          super("wallet-standard:app-ready", {
            bubbles: !1,
            cancelable: !1,
            composed: !1,
          }),
            E.set(this, void 0),
            tv(this, E, t, "f");
        }
        get detail() {
          return tL(this, E, "f");
        }
        get type() {
          return "wallet-standard:app-ready";
        }
        preventDefault() {
          throw Error("preventDefault cannot be called");
        }
        stopImmediatePropagation() {
          throw Error("stopImmediatePropagation cannot be called");
        }
        stopPropagation() {
          throw Error("stopPropagation cannot be called");
        }
      }
      E = new WeakMap();
      var tx = n(5789);
      function tO(t) {
        let e = (0, tx.useRef)();
        return e.current || (e.current = { value: t() }), e.current.value;
      }
      function tD(t) {
        return t.filter(tl).map((t) => new tm({ wallet: t }));
      }
      ((s = S || (S = {}))[(s.DESKTOP_WEB = 0)] = "DESKTOP_WEB"),
        (s[(s.MOBILE_WEB = 1)] = "MOBILE_WEB");
      var tA = n(3496);
      class tz extends x.lj {
        constructor() {
          super(...arguments), (this.name = "WalletNotSelectedError");
        }
      }
      var t_ = n(4723);
      function tC({
        children: t,
        wallets: e,
        adapter: n,
        isUnloadingRef: r,
        onAutoConnectRequest: i,
        onConnectError: a,
        onError: s,
        onSelectWallet: o,
      }) {
        let c = (0, tx.useRef)(!1),
          [l, u] = (0, tx.useState)(!1),
          d = (0, tx.useRef)(!1),
          [h, f] = (0, tx.useState)(!1),
          [w, p] = (0, tx.useState)(() => n?.publicKey ?? null),
          [y, g] = (0, tx.useState)(() => n?.connected ?? !1),
          M = (0, tx.useRef)(s);
        (0, tx.useEffect)(
          () => (
            (M.current = s),
            () => {
              M.current = void 0;
            }
          ),
          [s]
        );
        let m = (0, tx.useRef)(
            (t, e) => (
              !r.current &&
                (M.current
                  ? M.current(t, e)
                  : (console.error(t, e),
                    t instanceof x.OZ &&
                      "undefined" != typeof window &&
                      e &&
                      window.open(e.url, "_blank"))),
              t
            )
          ),
          [v, L] = (0, tx.useState)(() =>
            e
              .map((t) => ({ adapter: t, readyState: t.readyState }))
              .filter(({ readyState: t }) => t !== b.i1.Unsupported)
          );
        (0, tx.useEffect)(() => {
          function t(t) {
            L((e) => {
              let n = e.findIndex(({ adapter: t }) => t === this);
              if (-1 === n) return e;
              let { adapter: r } = e[n];
              return [
                ...e.slice(0, n),
                { adapter: r, readyState: t },
                ...e.slice(n + 1),
              ].filter(({ readyState: t }) => t !== b.i1.Unsupported);
            });
          }
          return (
            L((t) =>
              e
                .map((e, n) => {
                  let r = t[n];
                  return r && r.adapter === e && r.readyState === e.readyState
                    ? r
                    : { adapter: e, readyState: e.readyState };
                })
                .filter(({ readyState: t }) => t !== b.i1.Unsupported)
            ),
            e.forEach((e) => e.on("readyStateChange", t, e)),
            () => {
              e.forEach((e) => e.off("readyStateChange", t, e));
            }
          );
        }, [n, e]);
        let j = (0, tx.useMemo)(
          () => v.find((t) => t.adapter === n) ?? null,
          [n, v]
        );
        (0, tx.useEffect)(() => {
          if (!n) return;
          let t = (t) => {
              p(t), (c.current = !1), u(!1), g(!0), (d.current = !1), f(!1);
            },
            e = () => {
              r.current ||
                (p(null),
                (c.current = !1),
                u(!1),
                g(!1),
                (d.current = !1),
                f(!1));
            },
            i = (t) => {
              m.current(t, n);
            };
          return (
            n.on("connect", t),
            n.on("disconnect", e),
            n.on("error", i),
            () => {
              n.off("connect", t),
                n.off("disconnect", e),
                n.off("error", i),
                e();
            }
          );
        }, [n, r]);
        let N = (0, tx.useRef)(!1);
        (0, tx.useEffect)(
          () => () => {
            N.current = !1;
          },
          [n]
        ),
          (0, tx.useEffect)(() => {
            N.current ||
              c.current ||
              y ||
              !i ||
              (j?.readyState !== b.i1.Installed &&
                j?.readyState !== b.i1.Loadable) ||
              ((c.current = !0),
              u(!0),
              (N.current = !0),
              (async function () {
                try {
                  await i();
                } catch {
                  a();
                } finally {
                  u(!1), (c.current = !1);
                }
              })());
          }, [y, i, a, j]);
        let I = (0, tx.useCallback)(
            async (t, e, r) => {
              if (!n) throw m.current(new tz());
              if (!y) throw m.current(new x.oS(), n);
              return await n.sendTransaction(t, e, r);
            },
            [n, y]
          ),
          E = (0, tx.useMemo)(
            () =>
              n && "signTransaction" in n
                ? async (t) => {
                    if (!y) throw m.current(new x.oS(), n);
                    return await n.signTransaction(t);
                  }
                : void 0,
            [n, y]
          ),
          S = (0, tx.useMemo)(
            () =>
              n && "signAllTransactions" in n
                ? async (t) => {
                    if (!y) throw m.current(new x.oS(), n);
                    return await n.signAllTransactions(t);
                  }
                : void 0,
            [n, y]
          ),
          T = (0, tx.useMemo)(
            () =>
              n && "signMessage" in n
                ? async (t) => {
                    if (!y) throw m.current(new x.oS(), n);
                    return await n.signMessage(t);
                  }
                : void 0,
            [n, y]
          ),
          O = (0, tx.useMemo)(
            () =>
              n && "signIn" in n ? async (t) => await n.signIn(t) : void 0,
            [n]
          ),
          D = (0, tx.useCallback)(async () => {
            if (c.current || d.current || j?.adapter.connected) return;
            if (!j) throw m.current(new tz());
            let { adapter: t, readyState: e } = j;
            if (!(e === b.i1.Installed || e === b.i1.Loadable))
              throw m.current(new x.OZ(), t);
            (c.current = !0), u(!0);
            try {
              await t.connect();
            } catch (t) {
              throw (a(), t);
            } finally {
              u(!1), (c.current = !1);
            }
          }, [a, j]),
          A = (0, tx.useCallback)(async () => {
            if (!d.current && n) {
              (d.current = !0), f(!0);
              try {
                await n.disconnect();
              } finally {
                f(!1), (d.current = !1);
              }
            }
          }, [n]);
        return tx.createElement(
          t_.z.Provider,
          {
            value: {
              autoConnect: !!i,
              wallets: v,
              wallet: j,
              publicKey: w,
              connected: y,
              connecting: l,
              disconnecting: h,
              select: o,
              connect: D,
              disconnect: A,
              sendTransaction: I,
              signTransaction: E,
              signAllTransactions: S,
              signMessage: T,
              signIn: O,
            },
          },
          t
        );
      }
      function tR(t) {
        return (
          (function ({ adapters: t, userAgentString: e }) {
            return t.some(
              (t) => t.name !== tt && t.readyState === b.i1.Installed
            )
              ? S.DESKTOP_WEB
              : e &&
                /android/i.test(e) &&
                !/(WebView|Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+))/i.test(
                  e
                )
              ? S.MOBILE_WEB
              : S.DESKTOP_WEB;
          })({
            adapters: t,
            userAgentString:
              (void 0 === i && (i = globalThis.navigator?.userAgent ?? null),
              i),
          }) === S.MOBILE_WEB
        );
      }
      function tk({
        children: t,
        wallets: e,
        autoConnect: n,
        localStorageKey: r = "walletName",
        onError: i,
      }) {
        let { connection: s } = (0, tA.R)(),
          o = (function (t) {
            let e = tO(() => new Set()),
              { get: n, on: r } = tO(() =>
                (function () {
                  if (
                    a ||
                    ((a = (function () {
                      if (
                        a ||
                        ((a = Object.freeze({ register: tI, get: tE, on: tS })),
                        "undefined" == typeof window)
                      )
                        return a;
                      let t = Object.freeze({ register: tI });
                      try {
                        window.addEventListener(
                          "wallet-standard:register-wallet",
                          ({ detail: e }) => e(t)
                        );
                      } catch (t) {
                        console.error(
                          "wallet-standard:register-wallet event listener could not be added\n",
                          t
                        );
                      }
                      try {
                        window.dispatchEvent(new tb(t));
                      } catch (t) {
                        console.error(
                          "wallet-standard:app-ready event could not be dispatched\n",
                          t
                        );
                      }
                      return a;
                    })()),
                    "undefined" == typeof window)
                  )
                    return a;
                  let t = window.navigator.wallets || [];
                  if (!Array.isArray(t))
                    return (
                      console.error("window.navigator.wallets is not an array"),
                      a
                    );
                  let { register: e } = a,
                    n = (...t) =>
                      t.forEach((t) => tT(() => t({ register: e })));
                  try {
                    Object.defineProperty(window.navigator, "wallets", {
                      value: Object.freeze({ push: n }),
                    });
                  } catch (t) {
                    return (
                      console.error(
                        "window.navigator.wallets could not be set"
                      ),
                      a
                    );
                  }
                  return n(...t), a;
                })()
              ),
              [i, s] = (0, tx.useState)(() => tD(n()));
            (0, tx.useEffect)(() => {
              let t = [
                r("register", (...t) => s((e) => [...e, ...tD(t)])),
                r("unregister", (...t) =>
                  s((e) => e.filter((e) => t.some((t) => t === e.wallet)))
                ),
              ];
              return () => t.forEach((t) => t());
            }, [r]);
            let o = (function (t) {
              let e = (0, tx.useRef)();
              return (
                (0, tx.useEffect)(() => {
                  e.current = t;
                }),
                e.current
              );
            })(i);
            return (
              (0, tx.useEffect)(() => {
                if (!o) return;
                let t = new Set(i);
                new Set(o.filter((e) => !t.has(e))).forEach((t) => t.destroy());
              }, [o, i]),
              (0, tx.useEffect)(() => () => i.forEach((t) => t.destroy()), []),
              (0, tx.useMemo)(
                () => [
                  ...i,
                  ...t.filter(
                    ({ name: t }) =>
                      !i.some((e) => e.name === t) ||
                      (e.has(t) ||
                        (e.add(t),
                        console.warn(
                          `${t} was registered as a Standard Wallet. The Wallet Adapter for ${t} can be removed from your app.`
                        )),
                      !1)
                  ),
                ],
                [i, t, e]
              )
            );
          })(e),
          c = (0, tx.useMemo)(() => {
            var t;
            if (!tR(o)) return null;
            let e = o.find((t) => t.name === tt);
            return (
              e ||
              new tn({
                addressSelector: {
                  select(t) {
                    return J(this, void 0, void 0, function* () {
                      return t[0];
                    });
                  },
                },
                appIdentity: {
                  uri: (function () {
                    let t = globalThis.location;
                    if (t) return `${t.protocol}//${t.host}`;
                  })(),
                },
                authorizationResultCache: (function () {
                  let t;
                  try {
                    t = window.localStorage;
                  } catch (t) {}
                  return {
                    clear() {
                      return J(this, void 0, void 0, function* () {
                        if (t)
                          try {
                            t.removeItem(tr);
                          } catch (t) {}
                      });
                    },
                    get() {
                      return J(this, void 0, void 0, function* () {
                        if (t)
                          try {
                            return JSON.parse(t.getItem(tr)) || void 0;
                          } catch (t) {}
                      });
                    },
                    set(e) {
                      return J(this, void 0, void 0, function* () {
                        if (t)
                          try {
                            t.setItem(tr, JSON.stringify(e));
                          } catch (t) {}
                      });
                    },
                  };
                })(),
                cluster: (t = s?.rpcEndpoint)
                  ? /devnet/i.test(t)
                    ? "devnet"
                    : /testnet/i.test(t)
                    ? "testnet"
                    : "mainnet-beta"
                  : "mainnet-beta",
                onWalletNotFound: ti,
              })
            );
          }, [o, s?.rpcEndpoint]),
          l = (0, tx.useMemo)(
            () => (null == c || -1 !== o.indexOf(c) ? o : [c, ...o]),
            [o, c]
          ),
          [u, d] = (function (t, e) {
            let n = (0, tx.useState)(() => {
                try {
                  let e = localStorage.getItem(t);
                  if (e) return JSON.parse(e);
                } catch (t) {
                  "undefined" != typeof window && console.error(t);
                }
                return e;
              }),
              r = n[0],
              i = (0, tx.useRef)(!0);
            return (
              (0, tx.useEffect)(() => {
                if (i.current) {
                  i.current = !1;
                  return;
                }
                try {
                  null === r
                    ? localStorage.removeItem(t)
                    : localStorage.setItem(t, JSON.stringify(r));
                } catch (t) {
                  "undefined" != typeof window && console.error(t);
                }
              }, [r, t]),
              n
            );
          })(r, tR(o) ? tt : null),
          h = (0, tx.useMemo)(
            () => l.find((t) => t.name === u) ?? null,
            [l, u]
          ),
          f = (0, tx.useCallback)(
            (t) => {
              u !== t && (h && h.name !== tt && h.disconnect(), d(t));
            },
            [h, d, u]
          );
        (0, tx.useEffect)(() => {
          if (h)
            return (
              h.on("disconnect", t),
              () => {
                h.off("disconnect", t);
              }
            );
          function t() {
            !y.current && ((u === tt && tR(o)) || d(null));
          }
        }, [h, o, d, u]);
        let w = (0, tx.useRef)(!1),
          p = (0, tx.useMemo)(() => {
            if (n && h)
              return async () => {
                (!0 === n || (await n(h))) &&
                  (w.current ? await h.connect() : await h.autoConnect());
              };
          }, [n, h]),
          y = (0, tx.useRef)(!1);
        (0, tx.useEffect)(() => {
          if (u === tt && tR(o)) {
            y.current = !1;
            return;
          }
          function t() {
            y.current = !0;
          }
          return (
            window.addEventListener("beforeunload", t),
            () => {
              window.removeEventListener("beforeunload", t);
            }
          );
        }, [o, u]);
        let g = (0, tx.useCallback)(() => {
            h && h.name !== tt && f(null);
          }, [h, f]),
          M = (0, tx.useCallback)(
            (t) => {
              (w.current = !0), f(t);
            },
            [f]
          );
        return tx.createElement(
          tC,
          {
            wallets: l,
            adapter: h,
            isUnloadingRef: y,
            onAutoConnectRequest: p,
            onConnectError: g,
            onError: i,
            onSelectWallet: M,
          },
          t
        );
      }
    },
    3496: function (t, e, n) {
      "use strict";
      n.d(e, {
        R: function () {
          return a;
        },
        h: function () {
          return i;
        },
      });
      var r = n(5789);
      let i = (0, r.createContext)({});
      function a() {
        return (0, r.useContext)(i);
      }
    },
    4573: function (t, e, n) {
      "use strict";
      n.d(e, {
        e: function () {
          return P;
        },
      });
      var r,
        i,
        a,
        s,
        o,
        c,
        l,
        u,
        d,
        h,
        f,
        w,
        p,
        y,
        g,
        M = n(4641),
        m = n(3461),
        v = n(9216),
        L = n(5543),
        j = n(4482),
        N = function (t, e, n, r, i) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof e ? t !== e || !i : !e.has(t))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        },
        I = function (t, e, n, r) {
          if ("a" === n && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof e ? t !== e || !r : !e.has(t))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        };
      class E extends Event {
        constructor(t) {
          super("wallet-standard:register-wallet", {
            bubbles: !1,
            cancelable: !1,
            composed: !1,
          }),
            r.set(this, void 0),
            N(this, r, t, "f");
        }
        get detail() {
          return I(this, r, "f");
        }
        get type() {
          return "wallet-standard:register-wallet";
        }
        preventDefault() {
          throw Error("preventDefault cannot be called");
        }
        stopImmediatePropagation() {
          throw Error("stopImmediatePropagation cannot be called");
        }
        stopPropagation() {
          throw Error("stopPropagation cannot be called");
        }
      }
      r = new WeakMap();
      var S = n(296),
        T = n(8909),
        b = n(4348),
        x = n(2864),
        O = n(8712),
        D = n(8129),
        A = n(6826),
        z = function (t, e, n, r) {
          if ("a" === n && !r)
            throw TypeError("Private accessor was defined without a getter");
          if ("function" == typeof e ? t !== e || !r : !e.has(t))
            throw TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        },
        _ = function (t, e, n, r, i) {
          if ("m" === r) throw TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw TypeError("Private accessor was defined without a setter");
          if ("function" == typeof e ? t !== e || !i : !e.has(t))
            throw TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        };
      class C {
        constructor() {
          i.add(this),
            a.set(this, {}),
            s.set(this, "1.0.0"),
            o.set(this, "MetaMask"),
            c.set(
              this,
              "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIwLjI1IiB4Mj0iMjYuNTcxIiB5MT0iMjcuMTczIiB5Mj0iMTkuODU4Ij48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzk5NDVmZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiM4NzUyZjMiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTQ5N2Q1Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzQzYjRjYSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdG9wLWNvbG9yPSIjMjhlMGI5Ii8+PHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiMxOWZiOWIiLz48L2xpbmVhckdyYWRpZW50PjxnIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjA5NCI+PHBhdGggZD0ibTI2LjEwOSAzLjY0My05LjM2OSA2Ljk1OSAxLjczMy00LjEwNSA3LjYzNy0yLjg1M3oiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZT0iI2UyNzYxYiIvPjxnIGZpbGw9IiNlNDc2MWIiIHN0cm9rZT0iI2U0NzYxYiI+PHBhdGggZD0ibTQuNDgxIDMuNjQzIDkuMjk0IDcuMDI0LTEuNjQ4LTQuMTcxem0xOC4yNTggMTYuMTMtMi40OTUgMy44MjMgNS4zMzkgMS40NjkgMS41MzUtNS4yMDctNC4zNzgtLjA4NXptLTE5LjI0Ny4wODUgMS41MjUgNS4yMDcgNS4zMzktMS40NjktMi40OTUtMy44MjN6Ii8+PHBhdGggZD0ibTEwLjA1NSAxMy4zMTMtMS40ODggMi4yNTEgNS4zMDEuMjM1LS4xODgtNS42OTd6bTEwLjQ4IDAtMy42NzItMy4yNzctLjEyMiA1Ljc2MyA1LjI5Mi0uMjM1LTEuNDk3LTIuMjUxem0tMTAuMTc4IDEwLjI4MyAzLjE4My0xLjU1NC0yLjc0OS0yLjE0Ny0uNDMzIDMuNzAxem02LjY5NS0xLjU1NCAzLjE5MiAxLjU1NC0uNDQzLTMuNzAxeiIvPjwvZz48cGF0aCBkPSJtMjAuMjQ0IDIzLjU5Ni0zLjE5Mi0xLjU1NC4yNTQgMi4wODEtLjAyOC44NzZ6bS05Ljg4NyAwIDIuOTY2IDEuNDAzLS4wMTktLjg3Ni4yMzUtMi4wODEtMy4xODMgMS41NTR6IiBmaWxsPSIjZDdjMWIzIiBzdHJva2U9IiNkN2MxYjMiLz48cGF0aCBkPSJtMTMuMzY5IDE4LjUyMS0yLjY1NS0uNzgxIDEuODc0LS44NTd6bTMuODUxIDAgLjc4MS0xLjYzOCAxLjg4My44NTctMi42NjUuNzgxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEwLjM1NyAyMy41OTYuNDUyLTMuODIzLTIuOTQ3LjA4NXptOS40MzUtMy44MjMuNDUyIDMuODIzIDIuNDk1LTMuNzM4em0yLjI0MS00LjIwOS01LjI5Mi4yMzUuNDkgMi43MjEuNzgyLTEuNjM4IDEuODgzLjg1N3ptLTExLjMxOCAyLjE3NSAxLjg4My0uODU3Ljc3MiAxLjYzOC40OTktMi43MjEtNS4zMDEtLjIzNXoiIGZpbGw9IiNjZDYxMTYiIHN0cm9rZT0iI2NkNjExNiIvPjxwYXRoIGQ9Im04LjU2NyAxNS41NjQgMi4yMjIgNC4zMzEtLjA3NS0yLjE1NnptMTEuMzI4IDIuMTc1LS4wOTQgMi4xNTYgMi4yMzItNC4zMzEtMi4xMzcgMi4xNzV6bS02LjAyNi0xLjk0LS40OTkgMi43MjEuNjIxIDMuMjExLjE0MS00LjIyOC0uMjY0LTEuNzA0em0yLjg3MiAwLS4yNTQgMS42OTUuMTEzIDQuMjM3LjYzMS0zLjIxMXoiIGZpbGw9IiNlNDc1MWYiIHN0cm9rZT0iI2U0NzUxZiIvPjxwYXRoIGQ9Im0xNy4yMyAxOC41Mi0uNjMxIDMuMjExLjQ1Mi4zMTEgMi43NS0yLjE0Ny4wOTQtMi4xNTZ6bS02LjUxNi0uNzgxLjA3NSAyLjE1NiAyLjc1IDIuMTQ3LjQ1Mi0uMzExLS42MjItMy4yMTF6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48cGF0aCBkPSJtMTcuMjc3IDI0Ljk5OS4wMjgtLjg3Ni0uMjM1LS4yMDdoLTMuNTVsLS4yMTcuMjA3LjAxOS44NzYtMi45NjYtMS40MDMgMS4wMzYuODQ4IDIuMSAxLjQ1OWgzLjYwNmwyLjEwOS0xLjQ1OSAxLjAzNi0uODQ4eiIgZmlsbD0iI2MwYWQ5ZSIgc3Ryb2tlPSIjYzBhZDllIi8+PHBhdGggZD0ibTE3LjA1MSAyMi4wNDItLjQ1Mi0uMzExaC0yLjYwOGwtLjQ1Mi4zMTEtLjIzNSAyLjA4MS4yMTctLjIwN2gzLjU1bC4yMzUuMjA3LS4yNTQtMi4wODF6IiBmaWxsPSIjMTYxNjE2IiBzdHJva2U9IiMxNjE2MTYiLz48cGF0aCBkPSJtMjYuNTA1IDExLjA1My44LTMuODQyLTEuMTk2LTMuNTY5LTkuMDU4IDYuNzIzIDMuNDg0IDIuOTQ3IDQuOTI1IDEuNDQxIDEuMDkyLTEuMjcxLS40NzEtLjMzOS43NTMtLjY4Ny0uNTg0LS40NTIuNzUzLS41NzQtLjQ5OS0uMzc3em0tMjMuMjExLTMuODQxLjggMy44NDItLjUwOC4zNzcuNzUzLjU3NC0uNTc0LjQ1Mi43NTMuNjg3LS40NzEuMzM5IDEuMDgzIDEuMjcxIDQuOTI1LTEuNDQxIDMuNDg0LTIuOTQ3LTkuMDU5LTYuNzIzeiIgZmlsbD0iIzc2M2QxNiIgc3Ryb2tlPSIjNzYzZDE2Ii8+PHBhdGggZD0ibTI1LjQ2IDE0Ljc1NC00LjkyNS0xLjQ0MSAxLjQ5NyAyLjI1MS0yLjIzMiA0LjMzMSAyLjkzOC0uMDM4aDQuMzc4bC0xLjY1Ny01LjEwNHptLTE1LjQwNS0xLjQ0MS00LjkyNSAxLjQ0MS0xLjYzOCA1LjEwNGg0LjM2OWwyLjkyOC4wMzgtMi4yMjItNC4zMzEgMS40ODgtMi4yNTF6bTYuNjg1IDIuNDg2LjMxMS01LjQzMyAxLjQzMS0zLjg3aC02LjM1NmwxLjQxMyAzLjg3LjMyOSA1LjQzMy4xMTMgMS43MTQuMDA5IDQuMjE5aDIuNjFsLjAxOS00LjIxOS4xMjItMS43MTR6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48L2c+PGNpcmNsZSBjeD0iMjMuNSIgY3k9IjIzLjUiIGZpbGw9IiMwMDAiIHI9IjYuNSIvPjxwYXRoIGQ9Im0yNy40NzMgMjUuNTQ1LTEuMzEgMS4zNjhjLS4wMjkuMDMtLjA2My4wNTMtLjEwMS4wN2EuMzEuMzEgMCAwIDEgLS4xMjEuMDI0aC02LjIwOWMtLjAzIDAtLjA1OS0uMDA4LS4wODMtLjAyNGEuMTUuMTUgMCAwIDEgLS4wNTYtLjA2NWMtLjAxMi0uMDI2LS4wMTUtLjA1Ni0uMDEtLjA4NHMuMDE4LS4wNTUuMDM5LS4wNzZsMS4zMTEtMS4zNjhjLjAyOC0uMDMuMDYzLS4wNTMuMTAxLS4wNjlhLjMxLjMxIDAgMCAxIC4xMjEtLjAyNWg2LjIwOGMuMDMgMCAuMDU5LjAwOC4wODMuMDI0YS4xNS4xNSAwIDAgMSAuMDU2LjA2NWMuMDEyLjAyNi4wMTUuMDU2LjAxLjA4NHMtLjAxOC4wNTUtLjAzOS4wNzZ6bS0xLjMxLTIuNzU2Yy0uMDI5LS4wMy0uMDYzLS4wNTMtLjEwMS0uMDdhLjMxLjMxIDAgMCAwIC0uMTIxLS4wMjRoLTYuMjA5Yy0uMDMgMC0uMDU5LjAwOC0uMDgzLjAyNHMtLjA0NC4wMzgtLjA1Ni4wNjUtLjAxNS4wNTYtLjAxLjA4NC4wMTguMDU1LjAzOS4wNzZsMS4zMTEgMS4zNjhjLjAyOC4wMy4wNjMuMDUzLjEwMS4wNjlhLjMxLjMxIDAgMCAwIC4xMjEuMDI1aDYuMjA4Yy4wMyAwIC4wNTktLjAwOC4wODMtLjAyNGEuMTUuMTUgMCAwIDAgLjA1Ni0uMDY1Yy4wMTItLjAyNi4wMTUtLjA1Ni4wMS0uMDg0cy0uMDE4LS4wNTUtLjAzOS0uMDc2em0tNi40MzEtLjk4M2g2LjIwOWEuMzEuMzEgMCAwIDAgLjEyMS0uMDI0Yy4wMzgtLjAxNi4wNzMtLjA0LjEwMS0uMDdsMS4zMS0xLjM2OGMuMDItLjAyMS4wMzQtLjA0Ny4wMzktLjA3NnMuMDAxLS4wNTgtLjAxLS4wODRhLjE1LjE1IDAgMCAwIC0uMDU2LS4wNjVjLS4wMjUtLjAxNi0uMDU0LS4wMjQtLjA4My0uMDI0aC02LjIwOGEuMzEuMzEgMCAwIDAgLS4xMjEuMDI1Yy0uMDM4LjAxNi0uMDcyLjA0LS4xMDEuMDY5bC0xLjMxIDEuMzY4Yy0uMDIuMDIxLS4wMzQuMDQ3LS4wMzkuMDc2cy0uMDAxLjA1OC4wMS4wODQuMDMxLjA0OS4wNTYuMDY1LjA1NC4wMjQuMDgzLjAyNHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4="
            ),
            l.set(this, null),
            u.set(
              this,
              (t, e) => (
                z(this, a, "f")[t]?.push(e) || (z(this, a, "f")[t] = [e]),
                () => z(this, i, "m", h).call(this, t, e)
              )
            ),
            f.set(this, async () => {
              if (!z(this, l, "f")) {
                let t;
                try {
                  t = (await n.e(956).then(n.bind(n, 7956))).default;
                } catch (t) {
                  throw Error("Unable to load Solflare MetaMask SDK");
                }
                _(this, l, new t(), "f"),
                  z(this, l, "f").on("standard_change", (t) =>
                    z(this, i, "m", d).call(this, "change", t)
                  );
              }
              return (
                this.accounts.length || (await z(this, l, "f").connect()),
                { accounts: this.accounts }
              );
            }),
            w.set(this, async () => {
              z(this, l, "f") && (await z(this, l, "f").disconnect());
            }),
            p.set(this, async (...t) => {
              if (!z(this, l, "f")) throw new v.oS();
              return await z(this, l, "f").standardSignAndSendTransaction(...t);
            }),
            y.set(this, async (...t) => {
              if (!z(this, l, "f")) throw new v.oS();
              return await z(this, l, "f").standardSignTransaction(...t);
            }),
            g.set(this, async (...t) => {
              if (!z(this, l, "f")) throw new v.oS();
              return await z(this, l, "f").standardSignMessage(...t);
            });
        }
        get version() {
          return z(this, s, "f");
        }
        get name() {
          return z(this, o, "f");
        }
        get icon() {
          return z(this, c, "f");
        }
        get chains() {
          return [S.aI, S.BR, S.gv];
        }
        get features() {
          return {
            [O.V]: { version: "1.0.0", connect: z(this, f, "f") },
            [D.R]: { version: "1.0.0", disconnect: z(this, w, "f") },
            [A.k]: { version: "1.0.0", on: z(this, u, "f") },
            [T.G]: {
              version: "1.0.0",
              supportedTransactionVersions: ["legacy", 0],
              signAndSendTransaction: z(this, p, "f"),
            },
            [b.R]: {
              version: "1.0.0",
              supportedTransactionVersions: ["legacy", 0],
              signTransaction: z(this, y, "f"),
            },
            [x.g]: { version: "1.0.0", signMessage: z(this, g, "f") },
          };
        }
        get accounts() {
          return z(this, l, "f") ? z(this, l, "f").standardAccounts : [];
        }
      }
      (a = new WeakMap()),
        (s = new WeakMap()),
        (o = new WeakMap()),
        (c = new WeakMap()),
        (l = new WeakMap()),
        (u = new WeakMap()),
        (f = new WeakMap()),
        (w = new WeakMap()),
        (p = new WeakMap()),
        (y = new WeakMap()),
        (g = new WeakMap()),
        (i = new WeakSet()),
        (d = function (t, ...e) {
          z(this, a, "f")[t]?.forEach((t) => t.apply(null, e));
        }),
        (h = function (t, e) {
          z(this, a, "f")[t] = z(this, a, "f")[t]?.filter((t) => e !== t);
        });
      let R = !1;
      async function k() {
        let t = "solflare-detect-metamask";
        function e() {
          window.postMessage(
            {
              target: "metamask-contentscript",
              data: {
                name: "metamask-provider",
                data: { id: t, jsonrpc: "2.0", method: "wallet_getSnaps" },
              },
            },
            window.location.origin
          );
        }
        function n(r) {
          let i = r.data;
          i?.target === "metamask-inpage" &&
            i.data?.name === "metamask-provider" &&
            (i.data.data?.id === t
              ? (window.removeEventListener("message", n),
                !i.data.data.error &&
                  (R ||
                    ((function (t) {
                      let e = ({ register: e }) => e(t);
                      try {
                        window.dispatchEvent(new E(e));
                      } catch (t) {
                        console.error(
                          "wallet-standard:register-wallet event could not be dispatched\n",
                          t
                        );
                      }
                      try {
                        window.addEventListener(
                          "wallet-standard:app-ready",
                          ({ detail: t }) => e(t)
                        );
                      } catch (t) {
                        console.error(
                          "wallet-standard:app-ready event listener could not be added\n",
                          t
                        );
                      }
                    })(new C()),
                    (R = !0))))
              : e());
        }
        window.addEventListener("message", n),
          window.setTimeout(
            () => window.removeEventListener("message", n),
            5e3
          ),
          e();
      }
      class P extends M.eC {
        constructor(t = {}) {
          super(),
            (this.name = "Solflare"),
            (this.url = "https://solflare.com"),
            (this.icon =
              "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+"),
            (this.supportedTransactionVersions = new Set(["legacy", 0])),
            (this._readyState =
              "undefined" == typeof window || "undefined" == typeof document
                ? m.i1.Unsupported
                : m.i1.Loadable),
            (this._disconnected = () => {
              let t = this._wallet;
              t &&
                (t.off("disconnect", this._disconnected),
                (this._wallet = null),
                (this._publicKey = null),
                this.emit("error", new v.at()),
                this.emit("disconnect"));
            }),
            (this._accountChanged = (t) => {
              if (!t) return;
              let e = this._publicKey;
              if (e) {
                try {
                  t = new j.PublicKey(t.toBytes());
                } catch (t) {
                  this.emit("error", new v.Nx(t?.message, t));
                  return;
                }
                e.equals(t) || ((this._publicKey = t), this.emit("connect", t));
              }
            }),
            (this._connecting = !1),
            (this._publicKey = null),
            (this._wallet = null),
            (this._config = t),
            this._readyState !== m.i1.Unsupported &&
              ((0, m.su)(
                () =>
                  (!!window.solflare?.isSolflare || !!window.SolflareApp) &&
                  ((this._readyState = m.i1.Installed),
                  this.emit("readyStateChange", this._readyState),
                  !0)
              ),
              k());
        }
        get publicKey() {
          return this._publicKey;
        }
        get connecting() {
          return this._connecting;
        }
        get connected() {
          return !!this._wallet?.connected;
        }
        get readyState() {
          return this._readyState;
        }
        async autoConnect() {
          (this.readyState === m.i1.Loadable && (0, m.H)()) ||
            (await this.connect());
        }
        async connect() {
          try {
            let t, e, r;
            if (this.connected || this.connecting) return;
            if (
              this._readyState !== m.i1.Loadable &&
              this._readyState !== m.i1.Installed
            )
              throw new v.OZ();
            if (this.readyState === m.i1.Loadable && (0, m.H)()) {
              let t = encodeURIComponent(window.location.href),
                e = encodeURIComponent(window.location.origin);
              window.location.href = `https://solflare.com/ul/v1/browse/${t}?ref=${e}`;
              return;
            }
            try {
              t = (await n.e(944).then(n.bind(n, 9944))).default;
            } catch (t) {
              throw new v.W8(t?.message, t);
            }
            try {
              e = new t({ network: this._config.network });
            } catch (t) {
              throw new v.p6(t?.message, t);
            }
            if (((this._connecting = !0), !e.connected))
              try {
                await e.connect();
              } catch (t) {
                throw new v.$w(t?.message, t);
              }
            if (!e.publicKey) throw new v.$w();
            try {
              r = new j.PublicKey(e.publicKey.toBytes());
            } catch (t) {
              throw new v.Nx(t?.message, t);
            }
            e.on("disconnect", this._disconnected),
              e.on("accountChanged", this._accountChanged),
              (this._wallet = e),
              (this._publicKey = r),
              this.emit("connect", r);
          } catch (t) {
            throw (this.emit("error", t), t);
          } finally {
            this._connecting = !1;
          }
        }
        async disconnect() {
          let t = this._wallet;
          if (t) {
            t.off("disconnect", this._disconnected),
              t.off("accountChanged", this._accountChanged),
              (this._wallet = null),
              (this._publicKey = null);
            try {
              await t.disconnect();
            } catch (t) {
              this.emit("error", new v.UG(t?.message, t));
            }
          }
          this.emit("disconnect");
        }
        async sendTransaction(t, e, n = {}) {
          try {
            let r = this._wallet;
            if (!r) throw new v.oS();
            try {
              let { signers: i, ...a } = n;
              return (
                (0, L.W)(t)
                  ? i?.length && t.sign(i)
                  : ((t = await this.prepareTransaction(t, e, a)),
                    i?.length && t.partialSign(...i)),
                (a.preflightCommitment = a.preflightCommitment || e.commitment),
                await r.signAndSendTransaction(t, a)
              );
            } catch (t) {
              if (t instanceof v.lj) throw t;
              throw new v.IW(t?.message, t);
            }
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        }
        async signTransaction(t) {
          try {
            let e = this._wallet;
            if (!e) throw new v.oS();
            try {
              return (await e.signTransaction(t)) || t;
            } catch (t) {
              throw new v.PY(t?.message, t);
            }
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        }
        async signAllTransactions(t) {
          try {
            let e = this._wallet;
            if (!e) throw new v.oS();
            try {
              return (await e.signAllTransactions(t)) || t;
            } catch (t) {
              throw new v.PY(t?.message, t);
            }
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        }
        async signMessage(t) {
          try {
            let e = this._wallet;
            if (!e) throw new v.oS();
            try {
              return await e.signMessage(t, "utf8");
            } catch (t) {
              throw new v.fk(t?.message, t);
            }
          } catch (t) {
            throw (this.emit("error", t), t);
          }
        }
      }
    },
    296: function (t, e, n) {
      "use strict";
      n.d(e, {
        BR: function () {
          return i;
        },
        aI: function () {
          return r;
        },
        gv: function () {
          return a;
        },
        l1: function () {
          return s;
        },
      });
      let r = "solana:mainnet",
        i = "solana:devnet",
        a = "solana:testnet",
        s = "solana:localnet";
    },
    8909: function (t, e, n) {
      "use strict";
      n.d(e, {
        G: function () {
          return r;
        },
      });
      let r = "solana:signAndSendTransaction";
    },
    2864: function (t, e, n) {
      "use strict";
      n.d(e, {
        g: function () {
          return r;
        },
      });
      let r = "solana:signMessage";
    },
    4348: function (t, e, n) {
      "use strict";
      n.d(e, {
        R: function () {
          return r;
        },
      });
      let r = "solana:signTransaction";
    },
    8712: function (t, e, n) {
      "use strict";
      n.d(e, {
        V: function () {
          return r;
        },
      });
      let r = "standard:connect";
    },
    8129: function (t, e, n) {
      "use strict";
      n.d(e, {
        R: function () {
          return r;
        },
      });
      let r = "standard:disconnect";
    },
    6826: function (t, e, n) {
      "use strict";
      n.d(e, {
        k: function () {
          return r;
        },
      });
      let r = "standard:events";
    },
  },
]);

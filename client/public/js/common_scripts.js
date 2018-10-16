/*
POPPER.MIN.JS
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */ (function(
  e,
  t
) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define(t)
      : (e.Popper = t());
})(this, function() {
  "use strict";
  function e(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = window.getComputedStyle(e, null);
    return t ? o[t] : o;
  }
  function o(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function n(e) {
    if (!e || -1 !== ["HTML", "BODY", "#document"].indexOf(e.nodeName))
      return window.document.body;
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll)/.test(r + s + p) ? e : n(o(e));
  }
  function r(e) {
    var o = e && e.offsetParent,
      i = o && o.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TD", "TABLE"].indexOf(o.nodeName) &&
        "static" === t(o, "position")
        ? r(o)
        : o
      : window.document.documentElement;
  }
  function p(e) {
    var t = e.nodeName;
    return "BODY" !== t && ("HTML" === t || r(e.firstElementChild) === e);
  }
  function s(e) {
    return null === e.parentNode ? e : s(e.parentNode);
  }
  function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType)
      return window.document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      i = o ? e : t,
      n = o ? t : e,
      a = document.createRange();
    a.setStart(i, 0), a.setEnd(n, 0);
    var f = a.commonAncestorContainer;
    if ((e !== f && t !== f) || i.contains(n)) return p(f) ? f : r(f);
    var l = s(e);
    return l.host ? d(l.host, t) : d(e, s(t).host);
  }
  function a(e) {
    var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
      o = "top" === t ? "scrollTop" : "scrollLeft",
      i = e.nodeName;
    if ("BODY" === i || "HTML" === i) {
      var n = window.document.documentElement,
        r = window.document.scrollingElement || n;
      return r[o];
    }
    return e[o];
  }
  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      i = a(t, "top"),
      n = a(t, "left"),
      r = o ? -1 : 1;
    return (
      (e.top += i * r),
      (e.bottom += i * r),
      (e.left += n * r),
      (e.right += n * r),
      e
    );
  }
  function l(e, t) {
    var o = "x" === t ? "Left" : "Top",
      i = "Left" == o ? "Right" : "Bottom";
    return (
      +e["border" + o + "Width"].split("px")[0] +
      +e["border" + i + "Width"].split("px")[0]
    );
  }
  function m(e, t, o, i) {
    return _(
      t["offset" + e],
      o["client" + e],
      o["offset" + e],
      ie()
        ? o["offset" + e] +
          i["margin" + ("Height" === e ? "Top" : "Left")] +
          i["margin" + ("Height" === e ? "Bottom" : "Right")]
        : 0
    );
  }
  function h() {
    var e = window.document.body,
      t = window.document.documentElement,
      o = ie() && window.getComputedStyle(t);
    return { height: m("Height", e, t, o), width: m("Width", e, t, o) };
  }
  function c(e) {
    return se({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function g(e) {
    var o = {};
    if (ie())
      try {
        o = e.getBoundingClientRect();
        var i = a(e, "top"),
          n = a(e, "left");
        (o.top += i), (o.left += n), (o.bottom += i), (o.right += n);
      } catch (e) {}
    else o = e.getBoundingClientRect();
    var r = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top
      },
      p = "HTML" === e.nodeName ? h() : {},
      s = p.width || e.clientWidth || r.right - r.left,
      d = p.height || e.clientHeight || r.bottom - r.top,
      f = e.offsetWidth - s,
      m = e.offsetHeight - d;
    if (f || m) {
      var g = t(e);
      (f -= l(g, "x")), (m -= l(g, "y")), (r.width -= f), (r.height -= m);
    }
    return c(r);
  }
  function u(e, o) {
    var i = ie(),
      r = "HTML" === o.nodeName,
      p = g(e),
      s = g(o),
      d = n(e),
      a = t(o),
      l = +a.borderTopWidth.split("px")[0],
      m = +a.borderLeftWidth.split("px")[0],
      h = c({
        top: p.top - s.top - l,
        left: p.left - s.left - m,
        width: p.width,
        height: p.height
      });
    if (((h.marginTop = 0), (h.marginLeft = 0), !i && r)) {
      var u = +a.marginTop.split("px")[0],
        b = +a.marginLeft.split("px")[0];
      (h.top -= l - u),
        (h.bottom -= l - u),
        (h.left -= m - b),
        (h.right -= m - b),
        (h.marginTop = u),
        (h.marginLeft = b);
    }
    return (
      (i ? o.contains(d) : o === d && "BODY" !== d.nodeName) && (h = f(h, o)), h
    );
  }
  function b(e) {
    var t = window.document.documentElement,
      o = u(e, t),
      i = _(t.clientWidth, window.innerWidth || 0),
      n = _(t.clientHeight, window.innerHeight || 0),
      r = a(t),
      p = a(t, "left"),
      s = {
        top: r - o.top + o.marginTop,
        left: p - o.left + o.marginLeft,
        width: i,
        height: n
      };
    return c(s);
  }
  function y(e) {
    var i = e.nodeName;
    return "BODY" === i || "HTML" === i
      ? !1
      : "fixed" === t(e, "position") || y(o(e));
  }
  function w(e, t, i, r) {
    var p = { top: 0, left: 0 },
      s = d(e, t);
    if ("viewport" === r) p = b(s);
    else {
      var a;
      "scrollParent" === r
        ? ((a = n(o(e))),
          "BODY" === a.nodeName && (a = window.document.documentElement))
        : "window" === r
          ? (a = window.document.documentElement)
          : (a = r);
      var f = u(a, s);
      if ("HTML" === a.nodeName && !y(s)) {
        var l = h(),
          m = l.height,
          c = l.width;
        (p.top += f.top - f.marginTop),
          (p.bottom = m + f.top),
          (p.left += f.left - f.marginLeft),
          (p.right = c + f.left);
      } else p = f;
    }
    return (p.left += i), (p.top += i), (p.right -= i), (p.bottom -= i), p;
  }
  function v(e) {
    var t = e.width,
      o = e.height;
    return t * o;
  }
  function E(e, t, o, i, n) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var p = w(o, i, r, n),
      s = {
        top: { width: p.width, height: t.top - p.top },
        right: { width: p.right - t.right, height: p.height },
        bottom: { width: p.width, height: p.bottom - t.bottom },
        left: { width: t.left - p.left, height: p.height }
      },
      d = Object.keys(s)
        .map(function(e) {
          return se({ key: e }, s[e], { area: v(s[e]) });
        })
        .sort(function(e, t) {
          return t.area - e.area;
        }),
      a = d.filter(function(e) {
        var t = e.width,
          i = e.height;
        return t >= o.clientWidth && i >= o.clientHeight;
      }),
      f = 0 < a.length ? a[0].key : d[0].key,
      l = e.split("-")[1];
    return f + (l ? "-" + l : "");
  }
  function x(e, t, o) {
    var i = d(t, o);
    return u(o, i);
  }
  function O(e) {
    var t = window.getComputedStyle(e),
      o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
      n = { width: e.offsetWidth + i, height: e.offsetHeight + o };
    return n;
  }
  function L(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function(e) {
      return t[e];
    });
  }
  function S(e, t, o) {
    o = o.split("-")[0];
    var i = O(e),
      n = { width: i.width, height: i.height },
      r = -1 !== ["right", "left"].indexOf(o),
      p = r ? "top" : "left",
      s = r ? "left" : "top",
      d = r ? "height" : "width",
      a = r ? "width" : "height";
    return (
      (n[p] = t[p] + t[d] / 2 - i[d] / 2),
      (n[s] = o === s ? t[s] - i[a] : t[L(s)]),
      n
    );
  }
  function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function C(e, t, o) {
    if (Array.prototype.findIndex)
      return e.findIndex(function(e) {
        return e[t] === o;
      });
    var i = T(e, function(e) {
      return e[t] === o;
    });
    return e.indexOf(i);
  }
  function N(t, o, i) {
    var n = void 0 === i ? t : t.slice(0, C(t, "name", i));
    return (
      n.forEach(function(t) {
        t.function &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var i = t.function || t.fn;
        t.enabled &&
          e(i) &&
          ((o.offsets.popper = c(o.offsets.popper)),
          (o.offsets.reference = c(o.offsets.reference)),
          (o = i(o, t)));
      }),
      o
    );
  }
  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        attributes: {},
        flipped: !1,
        offsets: {}
      };
      (e.offsets.reference = x(this.state, this.popper, this.reference)),
        (e.placement = E(
          this.options.placement,
          e.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (e.originalPlacement = e.placement),
        (e.offsets.popper = S(this.popper, e.offsets.reference, e.placement)),
        (e.offsets.popper.position = "absolute"),
        (e = N(this.modifiers, e)),
        this.state.isCreated
          ? this.options.onUpdate(e)
          : ((this.state.isCreated = !0), this.options.onCreate(e));
    }
  }
  function W(e, t) {
    return e.some(function(e) {
      var o = e.name,
        i = e.enabled;
      return i && o === t;
    });
  }
  function B(e) {
    for (
      var t = [!1, "ms", "Webkit", "Moz", "O"],
        o = e.charAt(0).toUpperCase() + e.slice(1),
        n = 0;
      n < t.length - 1;
      n++
    ) {
      var i = t[n],
        r = i ? "" + i + o : e;
      if ("undefined" != typeof window.document.body.style[r]) return r;
    }
    return null;
  }
  function D() {
    return (
      (this.state.isDestroyed = !0),
      W(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.left = ""),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style[B("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function H(e, t, o, i) {
    var r = "BODY" === e.nodeName,
      p = r ? window : e;
    p.addEventListener(t, o, { passive: !0 }),
      r || H(n(p.parentNode), t, o, i),
      i.push(p);
  }
  function P(e, t, o, i) {
    (o.updateBound = i),
      window.addEventListener("resize", o.updateBound, { passive: !0 });
    var r = n(e);
    return (
      H(r, "scroll", o.updateBound, o.scrollParents),
      (o.scrollElement = r),
      (o.eventsEnabled = !0),
      o
    );
  }
  function A() {
    this.state.eventsEnabled ||
      (this.state = P(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }
  function M(e, t) {
    return (
      window.removeEventListener("resize", t.updateBound),
      t.scrollParents.forEach(function(e) {
        e.removeEventListener("scroll", t.updateBound);
      }),
      (t.updateBound = null),
      (t.scrollParents = []),
      (t.scrollElement = null),
      (t.eventsEnabled = !1),
      t
    );
  }
  function I() {
    this.state.eventsEnabled &&
      (window.cancelAnimationFrame(this.scheduleUpdate),
      (this.state = M(this.reference, this.state)));
  }
  function R(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function U(e, t) {
    Object.keys(t).forEach(function(o) {
      var i = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(o) &&
        R(t[o]) &&
        (i = "px"),
        (e.style[o] = t[o] + i);
    });
  }
  function Y(e, t) {
    Object.keys(t).forEach(function(o) {
      var i = t[o];
      !1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }
  function F(e, t, o) {
    var i = T(e, function(e) {
        var o = e.name;
        return o === t;
      }),
      n =
        !!i &&
        e.some(function(e) {
          return e.name === o && e.enabled && e.order < i.order;
        });
    if (!n) {
      var r = "`" + t + "`";
      console.warn(
        "`" +
          o +
          "`" +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return n;
  }
  function j(e) {
    return "end" === e ? "start" : "start" === e ? "end" : e;
  }
  function K(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = ae.indexOf(e),
      i = ae.slice(o + 1).concat(ae.slice(0, o));
    return t ? i.reverse() : i;
  }
  function q(e, t, o, i) {
    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +n[1],
      p = n[2];
    if (!r) return e;
    if (0 === p.indexOf("%")) {
      var s;
      switch (p) {
        case "%p":
          s = o;
          break;
        case "%":
        case "%r":
        default:
          s = i;
      }
      var d = c(s);
      return (d[t] / 100) * r;
    }
    if ("vh" === p || "vw" === p) {
      var a;
      return (
        (a =
          "vh" === p
            ? _(document.documentElement.clientHeight, window.innerHeight || 0)
            : _(document.documentElement.clientWidth, window.innerWidth || 0)),
        (a / 100) * r
      );
    }
    return r;
  }
  function G(e, t, o, i) {
    var n = [0, 0],
      r = -1 !== ["right", "left"].indexOf(i),
      p = e.split(/(\+|\-)/).map(function(e) {
        return e.trim();
      }),
      s = p.indexOf(
        T(p, function(e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    p[s] &&
      -1 === p[s].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var d = /\s*,\s*|\s+/,
      a =
        -1 === s
          ? [p]
          : [
              p.slice(0, s).concat([p[s].split(d)[0]]),
              [p[s].split(d)[1]].concat(p.slice(s + 1))
            ];
    return (
      (a = a.map(function(e, i) {
        var n = (1 === i ? !r : r) ? "height" : "width",
          p = !1;
        return e
          .reduce(function(e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
              ? ((e[e.length - 1] = t), (p = !0), e)
              : p
                ? ((e[e.length - 1] += t), (p = !1), e)
                : e.concat(t);
          }, [])
          .map(function(e) {
            return q(e, n, t, o);
          });
      })),
      a.forEach(function(e, t) {
        e.forEach(function(o, i) {
          R(o) && (n[t] += o * ("-" === e[i - 1] ? -1 : 1));
        });
      }),
      n
    );
  }
  for (
    var z = Math.min,
      V = Math.floor,
      _ = Math.max,
      X = ["native code", "[object MutationObserverConstructor]"],
      Q = function(e) {
        return X.some(function(t) {
          return -1 < (e || "").toString().indexOf(t);
        });
      },
      J = "undefined" != typeof window,
      Z = ["Edge", "Trident", "Firefox"],
      $ = 0,
      ee = 0;
    ee < Z.length;
    ee += 1
  )
    if (J && 0 <= navigator.userAgent.indexOf(Z[ee])) {
      $ = 1;
      break;
    }
  var i,
    te = J && Q(window.MutationObserver),
    oe = te
      ? function(e) {
          var t = !1,
            o = 0,
            i = document.createElement("span"),
            n = new MutationObserver(function() {
              e(), (t = !1);
            });
          return (
            n.observe(i, { attributes: !0 }),
            function() {
              t || ((t = !0), i.setAttribute("x-index", o), ++o);
            }
          );
        }
      : function(e) {
          var t = !1;
          return function() {
            t ||
              ((t = !0),
              setTimeout(function() {
                (t = !1), e();
              }, $));
          };
        },
    ie = function() {
      return (
        void 0 == i && (i = -1 !== navigator.appVersion.indexOf("MSIE 10")), i
      );
    },
    ne = function(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    re = (function() {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++)
          (o = t[n]),
            (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
      }
      return function(t, o, i) {
        return o && e(t.prototype, o), i && e(t, i), t;
      };
    })(),
    pe = function(e, t, o) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: o,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = o),
        e
      );
    },
    se =
      Object.assign ||
      function(e) {
        for (var t, o = 1; o < arguments.length; o++)
          for (var i in ((t = arguments[o]), t))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      },
    de = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start"
    ],
    ae = de.slice(3),
    fe = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise"
    },
    le = (function() {
      function t(o, i) {
        var n = this,
          r =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        ne(this, t),
          (this.scheduleUpdate = function() {
            return requestAnimationFrame(n.update);
          }),
          (this.update = oe(this.update.bind(this))),
          (this.options = se({}, t.Defaults, r)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = o.jquery ? o[0] : o),
          (this.popper = i.jquery ? i[0] : i),
          (this.options.modifiers = {}),
          Object.keys(se({}, t.Defaults.modifiers, r.modifiers)).forEach(
            function(e) {
              n.options.modifiers[e] = se(
                {},
                t.Defaults.modifiers[e] || {},
                r.modifiers ? r.modifiers[e] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function(e) {
              return se({ name: e }, n.options.modifiers[e]);
            })
            .sort(function(e, t) {
              return e.order - t.order;
            })),
          this.modifiers.forEach(function(t) {
            t.enabled &&
              e(t.onLoad) &&
              t.onLoad(n.reference, n.popper, n.options, t, n.state);
          }),
          this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), (this.state.eventsEnabled = p);
      }
      return (
        re(t, [
          {
            key: "update",
            value: function() {
              return k.call(this);
            }
          },
          {
            key: "destroy",
            value: function() {
              return D.call(this);
            }
          },
          {
            key: "enableEventListeners",
            value: function() {
              return A.call(this);
            }
          },
          {
            key: "disableEventListeners",
            value: function() {
              return I.call(this);
            }
          }
        ]),
        t
      );
    })();
  return (
    (le.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
    (le.placements = de),
    (le.Defaults = {
      placement: "bottom",
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function() {},
      onUpdate: function() {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function(e) {
            var t = e.placement,
              o = t.split("-")[0],
              i = t.split("-")[1];
            if (i) {
              var n = e.offsets,
                r = n.reference,
                p = n.popper,
                s = -1 !== ["bottom", "top"].indexOf(o),
                d = s ? "left" : "top",
                a = s ? "width" : "height",
                f = {
                  start: pe({}, d, r[d]),
                  end: pe({}, d, r[d] + r[a] - p[a])
                };
              e.offsets.popper = se({}, p, f[i]);
            }
            return e;
          }
        },
        offset: {
          order: 200,
          enabled: !0,
          fn: function(e, t) {
            var o,
              i = t.offset,
              n = e.placement,
              r = e.offsets,
              p = r.popper,
              s = r.reference,
              d = n.split("-")[0];
            return (
              (o = R(+i) ? [+i, 0] : G(i, p, s, d)),
              "left" === d
                ? ((p.top += o[0]), (p.left -= o[1]))
                : "right" === d
                  ? ((p.top += o[0]), (p.left += o[1]))
                  : "top" === d
                    ? ((p.left += o[0]), (p.top -= o[1]))
                    : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
              (e.popper = p),
              e
            );
          },
          offset: 0
        },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function(e, t) {
            var o = t.boundariesElement || r(e.instance.popper);
            e.instance.reference === o && (o = r(o));
            var i = w(e.instance.popper, e.instance.reference, t.padding, o);
            t.boundaries = i;
            var n = t.priority,
              p = e.offsets.popper,
              s = {
                primary: function(e) {
                  var o = p[e];
                  return (
                    p[e] < i[e] &&
                      !t.escapeWithReference &&
                      (o = _(p[e], i[e])),
                    pe({}, e, o)
                  );
                },
                secondary: function(e) {
                  var o = "right" === e ? "left" : "top",
                    n = p[o];
                  return (
                    p[e] > i[e] &&
                      !t.escapeWithReference &&
                      (n = z(
                        p[o],
                        i[e] - ("right" === e ? p.width : p.height)
                      )),
                    pe({}, o, n)
                  );
                }
              };
            return (
              n.forEach(function(e) {
                var t =
                  -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                p = se({}, p, s[t](e));
              }),
              (e.offsets.popper = p),
              e
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent"
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function(e) {
            var t = e.offsets,
              o = t.popper,
              i = t.reference,
              n = e.placement.split("-")[0],
              r = V,
              p = -1 !== ["top", "bottom"].indexOf(n),
              s = p ? "right" : "bottom",
              d = p ? "left" : "top",
              a = p ? "width" : "height";
            return (
              o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]),
              o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])),
              e
            );
          }
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function(e, t) {
            if (!F(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var o = t.element;
            if ("string" == typeof o) {
              if (((o = e.instance.popper.querySelector(o)), !o)) return e;
            } else if (!e.instance.popper.contains(o))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                e
              );
            var i = e.placement.split("-")[0],
              n = e.offsets,
              r = n.popper,
              p = n.reference,
              s = -1 !== ["left", "right"].indexOf(i),
              d = s ? "height" : "width",
              a = s ? "top" : "left",
              f = s ? "left" : "top",
              l = s ? "bottom" : "right",
              m = O(o)[d];
            p[l] - m < r[a] && (e.offsets.popper[a] -= r[a] - (p[l] - m)),
              p[a] + m > r[l] && (e.offsets.popper[a] += p[a] + m - r[l]);
            var h = p[a] + p[d] / 2 - m / 2,
              g = h - c(e.offsets.popper)[a];
            return (
              (g = _(z(r[d] - m, g), 0)),
              (e.arrowElement = o),
              (e.offsets.arrow = {}),
              (e.offsets.arrow[a] = Math.round(g)),
              (e.offsets.arrow[f] = ""),
              e
            );
          },
          element: "[x-arrow]"
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function(e, t) {
            if (W(e.instance.modifiers, "inner")) return e;
            if (e.flipped && e.placement === e.originalPlacement) return e;
            var o = w(
                e.instance.popper,
                e.instance.reference,
                t.padding,
                t.boundariesElement
              ),
              i = e.placement.split("-")[0],
              n = L(i),
              r = e.placement.split("-")[1] || "",
              p = [];
            switch (t.behavior) {
              case fe.FLIP:
                p = [i, n];
                break;
              case fe.CLOCKWISE:
                p = K(i);
                break;
              case fe.COUNTERCLOCKWISE:
                p = K(i, !0);
                break;
              default:
                p = t.behavior;
            }
            return (
              p.forEach(function(s, d) {
                if (i !== s || p.length === d + 1) return e;
                (i = e.placement.split("-")[0]), (n = L(i));
                var a = e.offsets.popper,
                  f = e.offsets.reference,
                  l = V,
                  m =
                    ("left" === i && l(a.right) > l(f.left)) ||
                    ("right" === i && l(a.left) < l(f.right)) ||
                    ("top" === i && l(a.bottom) > l(f.top)) ||
                    ("bottom" === i && l(a.top) < l(f.bottom)),
                  h = l(a.left) < l(o.left),
                  c = l(a.right) > l(o.right),
                  g = l(a.top) < l(o.top),
                  u = l(a.bottom) > l(o.bottom),
                  b =
                    ("left" === i && h) ||
                    ("right" === i && c) ||
                    ("top" === i && g) ||
                    ("bottom" === i && u),
                  y = -1 !== ["top", "bottom"].indexOf(i),
                  w =
                    !!t.flipVariations &&
                    ((y && "start" === r && h) ||
                      (y && "end" === r && c) ||
                      (!y && "start" === r && g) ||
                      (!y && "end" === r && u));
                (m || b || w) &&
                  ((e.flipped = !0),
                  (m || b) && (i = p[d + 1]),
                  w && (r = j(r)),
                  (e.placement = i + (r ? "-" + r : "")),
                  (e.offsets.popper = se(
                    {},
                    e.offsets.popper,
                    S(e.instance.popper, e.offsets.reference, e.placement)
                  )),
                  (e = N(e.instance.modifiers, e, "flip")));
              }),
              e
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport"
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function(e) {
            var t = e.placement,
              o = t.split("-")[0],
              i = e.offsets,
              n = i.popper,
              r = i.reference,
              p = -1 !== ["left", "right"].indexOf(o),
              s = -1 === ["top", "left"].indexOf(o);
            return (
              (n[p ? "left" : "top"] =
                r[t] - (s ? n[p ? "width" : "height"] : 0)),
              (e.placement = L(t)),
              (e.offsets.popper = c(n)),
              e
            );
          }
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function(e) {
            if (!F(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
              o = T(e.instance.modifiers, function(e) {
                return "preventOverflow" === e.name;
              }).boundaries;
            if (
              t.bottom < o.top ||
              t.left > o.right ||
              t.top > o.bottom ||
              t.right < o.left
            ) {
              if (!0 === e.hide) return e;
              (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === e.hide) return e;
              (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
            }
            return e;
          }
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function(e, t) {
            var o = t.x,
              i = t.y,
              n = e.offsets.popper,
              p = T(e.instance.modifiers, function(e) {
                return "applyStyle" === e.name;
              }).gpuAcceleration;
            void 0 !== p &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s,
              d,
              a = void 0 === p ? t.gpuAcceleration : p,
              f = r(e.instance.popper),
              l = g(f),
              m = { position: n.position },
              h = {
                left: V(n.left),
                top: V(n.top),
                bottom: V(n.bottom),
                right: V(n.right)
              },
              c = "bottom" === o ? "top" : "bottom",
              u = "right" === i ? "left" : "right",
              b = B("transform");
            if (
              ((d = "bottom" == c ? -l.height + h.bottom : h.top),
              (s = "right" == u ? -l.width + h.right : h.left),
              a && b)
            )
              (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                (m[c] = 0),
                (m[u] = 0),
                (m.willChange = "transform");
            else {
              var y = "bottom" == c ? -1 : 1,
                w = "right" == u ? -1 : 1;
              (m[c] = d * y), (m[u] = s * w), (m.willChange = c + ", " + u);
            }
            var v = { "x-placement": e.placement };
            return (
              (e.attributes = se({}, v, e.attributes)),
              (e.styles = se({}, m, e.styles)),
              e
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right"
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function(e) {
            return (
              U(e.instance.popper, e.styles),
              Y(e.instance.popper, e.attributes),
              e.offsets.arrow && U(e.arrowElement, e.offsets.arrow),
              e
            );
          },
          onLoad: function(e, t, o, i, n) {
            var r = x(n, t, e),
              p = E(
                o.placement,
                r,
                t,
                e,
                o.modifiers.flip.boundariesElement,
                o.modifiers.flip.padding
              );
            return (
              t.setAttribute("x-placement", p),
              U(t, { position: "absolute" }),
              o
            );
          },
          gpuAcceleration: void 0
        }
      }
    }),
    le
  );
});
//# sourceMappingURL=popper.min.js.map

/*!
 * Bootstrap v4.0.0-beta (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery)
  throw new Error(
    "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
  );
!(function(t) {
  var e = jQuery.fn.jquery.split(" ")[0].split(".");
  if (
    (e[0] < 2 && e[1] < 9) ||
    (1 == e[0] && 9 == e[1] && e[2] < 1) ||
    e[0] >= 4
  )
    throw new Error(
      "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
    );
})(),
  (function() {
    function t(t, e) {
      if (!t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
    }
    function e(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof e
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        e &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(t, e)
            : (t.__proto__ = e));
    }
    function n(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    var i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function(t) {
              return typeof t;
            }
          : function(t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            },
      o = (function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(t, i.key, i);
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e;
        };
      })(),
      r = (function(t) {
        function e(t) {
          return {}.toString
            .call(t)
            .match(/\s([a-zA-Z]+)/)[1]
            .toLowerCase();
        }
        function n(t) {
          return (t[0] || t).nodeType;
        }
        function i() {
          return {
            bindType: s.end,
            delegateType: s.end,
            handle: function(e) {
              if (t(e.target).is(this))
                return e.handleObj.handler.apply(this, arguments);
            }
          };
        }
        function o() {
          if (window.QUnit) return !1;
          var t = document.createElement("bootstrap");
          for (var e in a) if (void 0 !== t.style[e]) return { end: a[e] };
          return !1;
        }
        function r(e) {
          var n = this,
            i = !1;
          return (
            t(this).one(l.TRANSITION_END, function() {
              i = !0;
            }),
            setTimeout(function() {
              i || l.triggerTransitionEnd(n);
            }, e),
            this
          );
        }
        var s = !1,
          a = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
          },
          l = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function(t) {
              do {
                t += ~~(1e6 * Math.random());
              } while (document.getElementById(t));
              return t;
            },
            getSelectorFromElement: function(e) {
              var n = e.getAttribute("data-target");
              (n && "#" !== n) || (n = e.getAttribute("href") || "");
              try {
                return t(n).length > 0 ? n : null;
              } catch (t) {
                return null;
              }
            },
            reflow: function(t) {
              return t.offsetHeight;
            },
            triggerTransitionEnd: function(e) {
              t(e).trigger(s.end);
            },
            supportsTransitionEnd: function() {
              return Boolean(s);
            },
            typeCheckConfig: function(t, i, o) {
              for (var r in o)
                if (o.hasOwnProperty(r)) {
                  var s = o[r],
                    a = i[r],
                    l = a && n(a) ? "element" : e(a);
                  if (!new RegExp(s).test(l))
                    throw new Error(
                      t.toUpperCase() +
                        ': Option "' +
                        r +
                        '" provided type "' +
                        l +
                        '" but expected type "' +
                        s +
                        '".'
                    );
                }
            }
          };
        return (
          (s = o()),
          (t.fn.emulateTransitionEnd = r),
          l.supportsTransitionEnd() &&
            (t.event.special[l.TRANSITION_END] = i()),
          l
        );
      })(jQuery),
      s = ((function(t) {
        var e = "alert",
          i = t.fn[e],
          s = { DISMISS: '[data-dismiss="alert"]' },
          a = {
            CLOSE: "close.bs.alert",
            CLOSED: "closed.bs.alert",
            CLICK_DATA_API: "click.bs.alert.data-api"
          },
          l = { ALERT: "alert", FADE: "fade", SHOW: "show" },
          h = (function() {
            function e(t) {
              n(this, e), (this._element = t);
            }
            return (
              (e.prototype.close = function(t) {
                t = t || this._element;
                var e = this._getRootElement(t);
                this._triggerCloseEvent(e).isDefaultPrevented() ||
                  this._removeElement(e);
              }),
              (e.prototype.dispose = function() {
                t.removeData(this._element, "bs.alert"), (this._element = null);
              }),
              (e.prototype._getRootElement = function(e) {
                var n = r.getSelectorFromElement(e),
                  i = !1;
                return (
                  n && (i = t(n)[0]),
                  i || (i = t(e).closest("." + l.ALERT)[0]),
                  i
                );
              }),
              (e.prototype._triggerCloseEvent = function(e) {
                var n = t.Event(a.CLOSE);
                return t(e).trigger(n), n;
              }),
              (e.prototype._removeElement = function(e) {
                var n = this;
                t(e).removeClass(l.SHOW),
                  r.supportsTransitionEnd() && t(e).hasClass(l.FADE)
                    ? t(e)
                        .one(r.TRANSITION_END, function(t) {
                          return n._destroyElement(e, t);
                        })
                        .emulateTransitionEnd(150)
                    : this._destroyElement(e);
              }),
              (e.prototype._destroyElement = function(e) {
                t(e)
                  .detach()
                  .trigger(a.CLOSED)
                  .remove();
              }),
              (e._jQueryInterface = function(n) {
                return this.each(function() {
                  var i = t(this),
                    o = i.data("bs.alert");
                  o || ((o = new e(this)), i.data("bs.alert", o)),
                    "close" === n && o[n](this);
                });
              }),
              (e._handleDismiss = function(t) {
                return function(e) {
                  e && e.preventDefault(), t.close(this);
                };
              }),
              o(e, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                }
              ]),
              e
            );
          })();
        t(document).on(a.CLICK_DATA_API, s.DISMISS, h._handleDismiss(new h())),
          (t.fn[e] = h._jQueryInterface),
          (t.fn[e].Constructor = h),
          (t.fn[e].noConflict = function() {
            return (t.fn[e] = i), h._jQueryInterface;
          });
      })(jQuery),
      (function(t) {
        var e = "button",
          i = t.fn[e],
          r = { ACTIVE: "active", BUTTON: "btn", FOCUS: "focus" },
          s = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: "input",
            ACTIVE: ".active",
            BUTTON: ".btn"
          },
          a = {
            CLICK_DATA_API: "click.bs.button.data-api",
            FOCUS_BLUR_DATA_API:
              "focus.bs.button.data-api blur.bs.button.data-api"
          },
          l = (function() {
            function e(t) {
              n(this, e), (this._element = t);
            }
            return (
              (e.prototype.toggle = function() {
                var e = !0,
                  n = !0,
                  i = t(this._element).closest(s.DATA_TOGGLE)[0];
                if (i) {
                  var o = t(this._element).find(s.INPUT)[0];
                  if (o) {
                    if ("radio" === o.type)
                      if (o.checked && t(this._element).hasClass(r.ACTIVE))
                        e = !1;
                      else {
                        var a = t(i).find(s.ACTIVE)[0];
                        a && t(a).removeClass(r.ACTIVE);
                      }
                    if (e) {
                      if (
                        o.hasAttribute("disabled") ||
                        i.hasAttribute("disabled") ||
                        o.classList.contains("disabled") ||
                        i.classList.contains("disabled")
                      )
                        return;
                      (o.checked = !t(this._element).hasClass(r.ACTIVE)),
                        t(o).trigger("change");
                    }
                    o.focus(), (n = !1);
                  }
                }
                n &&
                  this._element.setAttribute(
                    "aria-pressed",
                    !t(this._element).hasClass(r.ACTIVE)
                  ),
                  e && t(this._element).toggleClass(r.ACTIVE);
              }),
              (e.prototype.dispose = function() {
                t.removeData(this._element, "bs.button"),
                  (this._element = null);
              }),
              (e._jQueryInterface = function(n) {
                return this.each(function() {
                  var i = t(this).data("bs.button");
                  i || ((i = new e(this)), t(this).data("bs.button", i)),
                    "toggle" === n && i[n]();
                });
              }),
              o(e, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                }
              ]),
              e
            );
          })();
        t(document)
          .on(a.CLICK_DATA_API, s.DATA_TOGGLE_CARROT, function(e) {
            e.preventDefault();
            var n = e.target;
            t(n).hasClass(r.BUTTON) || (n = t(n).closest(s.BUTTON)),
              l._jQueryInterface.call(t(n), "toggle");
          })
          .on(a.FOCUS_BLUR_DATA_API, s.DATA_TOGGLE_CARROT, function(e) {
            var n = t(e.target).closest(s.BUTTON)[0];
            t(n).toggleClass(r.FOCUS, /^focus(in)?$/.test(e.type));
          }),
          (t.fn[e] = l._jQueryInterface),
          (t.fn[e].Constructor = l),
          (t.fn[e].noConflict = function() {
            return (t.fn[e] = i), l._jQueryInterface;
          });
      })(jQuery),
      (function(t) {
        var e = "carousel",
          s = "bs.carousel",
          a = "." + s,
          l = t.fn[e],
          h = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0
          },
          c = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean"
          },
          u = { NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right" },
          d = {
            SLIDE: "slide" + a,
            SLID: "slid" + a,
            KEYDOWN: "keydown" + a,
            MOUSEENTER: "mouseenter" + a,
            MOUSELEAVE: "mouseleave" + a,
            TOUCHEND: "touchend" + a,
            LOAD_DATA_API: "load.bs.carousel.data-api",
            CLICK_DATA_API: "click.bs.carousel.data-api"
          },
          f = {
            CAROUSEL: "carousel",
            ACTIVE: "active",
            SLIDE: "slide",
            RIGHT: "carousel-item-right",
            LEFT: "carousel-item-left",
            NEXT: "carousel-item-next",
            PREV: "carousel-item-prev",
            ITEM: "carousel-item"
          },
          p = {
            ACTIVE: ".active",
            ACTIVE_ITEM: ".active.carousel-item",
            ITEM: ".carousel-item",
            NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
            INDICATORS: ".carousel-indicators",
            DATA_SLIDE: "[data-slide], [data-slide-to]",
            DATA_RIDE: '[data-ride="carousel"]'
          },
          _ = (function() {
            function l(e, i) {
              n(this, l),
                (this._items = null),
                (this._interval = null),
                (this._activeElement = null),
                (this._isPaused = !1),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this._config = this._getConfig(i)),
                (this._element = t(e)[0]),
                (this._indicatorsElement = t(this._element).find(
                  p.INDICATORS
                )[0]),
                this._addEventListeners();
            }
            return (
              (l.prototype.next = function() {
                this._isSliding || this._slide(u.NEXT);
              }),
              (l.prototype.nextWhenVisible = function() {
                document.hidden || this.next();
              }),
              (l.prototype.prev = function() {
                this._isSliding || this._slide(u.PREV);
              }),
              (l.prototype.pause = function(e) {
                e || (this._isPaused = !0),
                  t(this._element).find(p.NEXT_PREV)[0] &&
                    r.supportsTransitionEnd() &&
                    (r.triggerTransitionEnd(this._element), this.cycle(!0)),
                  clearInterval(this._interval),
                  (this._interval = null);
              }),
              (l.prototype.cycle = function(t) {
                t || (this._isPaused = !1),
                  this._interval &&
                    (clearInterval(this._interval), (this._interval = null)),
                  this._config.interval &&
                    !this._isPaused &&
                    (this._interval = setInterval(
                      (document.visibilityState
                        ? this.nextWhenVisible
                        : this.next
                      ).bind(this),
                      this._config.interval
                    ));
              }),
              (l.prototype.to = function(e) {
                var n = this;
                this._activeElement = t(this._element).find(p.ACTIVE_ITEM)[0];
                var i = this._getItemIndex(this._activeElement);
                if (!(e > this._items.length - 1 || e < 0))
                  if (this._isSliding)
                    t(this._element).one(d.SLID, function() {
                      return n.to(e);
                    });
                  else {
                    if (i === e) return this.pause(), void this.cycle();
                    var o = e > i ? u.NEXT : u.PREV;
                    this._slide(o, this._items[e]);
                  }
              }),
              (l.prototype.dispose = function() {
                t(this._element).off(a),
                  t.removeData(this._element, s),
                  (this._items = null),
                  (this._config = null),
                  (this._element = null),
                  (this._interval = null),
                  (this._isPaused = null),
                  (this._isSliding = null),
                  (this._activeElement = null),
                  (this._indicatorsElement = null);
              }),
              (l.prototype._getConfig = function(n) {
                return (n = t.extend({}, h, n)), r.typeCheckConfig(e, n, c), n;
              }),
              (l.prototype._addEventListeners = function() {
                var e = this;
                this._config.keyboard &&
                  t(this._element).on(d.KEYDOWN, function(t) {
                    return e._keydown(t);
                  }),
                  "hover" === this._config.pause &&
                    (t(this._element)
                      .on(d.MOUSEENTER, function(t) {
                        return e.pause(t);
                      })
                      .on(d.MOUSELEAVE, function(t) {
                        return e.cycle(t);
                      }),
                    "ontouchstart" in document.documentElement &&
                      t(this._element).on(d.TOUCHEND, function() {
                        e.pause(),
                          e.touchTimeout && clearTimeout(e.touchTimeout),
                          (e.touchTimeout = setTimeout(function(t) {
                            return e.cycle(t);
                          }, 500 + e._config.interval));
                      }));
              }),
              (l.prototype._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName))
                  switch (t.which) {
                    case 37:
                      t.preventDefault(), this.prev();
                      break;
                    case 39:
                      t.preventDefault(), this.next();
                      break;
                    default:
                      return;
                  }
              }),
              (l.prototype._getItemIndex = function(e) {
                return (
                  (this._items = t.makeArray(
                    t(e)
                      .parent()
                      .find(p.ITEM)
                  )),
                  this._items.indexOf(e)
                );
              }),
              (l.prototype._getItemByDirection = function(t, e) {
                var n = t === u.NEXT,
                  i = t === u.PREV,
                  o = this._getItemIndex(e),
                  r = this._items.length - 1;
                if (((i && 0 === o) || (n && o === r)) && !this._config.wrap)
                  return e;
                var s = (o + (t === u.PREV ? -1 : 1)) % this._items.length;
                return -1 === s
                  ? this._items[this._items.length - 1]
                  : this._items[s];
              }),
              (l.prototype._triggerSlideEvent = function(e, n) {
                var i = this._getItemIndex(e),
                  o = this._getItemIndex(
                    t(this._element).find(p.ACTIVE_ITEM)[0]
                  ),
                  r = t.Event(d.SLIDE, {
                    relatedTarget: e,
                    direction: n,
                    from: o,
                    to: i
                  });
                return t(this._element).trigger(r), r;
              }),
              (l.prototype._setActiveIndicatorElement = function(e) {
                if (this._indicatorsElement) {
                  t(this._indicatorsElement)
                    .find(p.ACTIVE)
                    .removeClass(f.ACTIVE);
                  var n = this._indicatorsElement.children[
                    this._getItemIndex(e)
                  ];
                  n && t(n).addClass(f.ACTIVE);
                }
              }),
              (l.prototype._slide = function(e, n) {
                var i = this,
                  o = t(this._element).find(p.ACTIVE_ITEM)[0],
                  s = this._getItemIndex(o),
                  a = n || (o && this._getItemByDirection(e, o)),
                  l = this._getItemIndex(a),
                  h = Boolean(this._interval),
                  c = void 0,
                  _ = void 0,
                  g = void 0;
                if (
                  (e === u.NEXT
                    ? ((c = f.LEFT), (_ = f.NEXT), (g = u.LEFT))
                    : ((c = f.RIGHT), (_ = f.PREV), (g = u.RIGHT)),
                  a && t(a).hasClass(f.ACTIVE))
                )
                  this._isSliding = !1;
                else if (
                  !this._triggerSlideEvent(a, g).isDefaultPrevented() &&
                  o &&
                  a
                ) {
                  (this._isSliding = !0),
                    h && this.pause(),
                    this._setActiveIndicatorElement(a);
                  var m = t.Event(d.SLID, {
                    relatedTarget: a,
                    direction: g,
                    from: s,
                    to: l
                  });
                  r.supportsTransitionEnd() &&
                  t(this._element).hasClass(f.SLIDE)
                    ? (t(a).addClass(_),
                      r.reflow(a),
                      t(o).addClass(c),
                      t(a).addClass(c),
                      t(o)
                        .one(r.TRANSITION_END, function() {
                          t(a)
                            .removeClass(c + " " + _)
                            .addClass(f.ACTIVE),
                            t(o).removeClass(f.ACTIVE + " " + _ + " " + c),
                            (i._isSliding = !1),
                            setTimeout(function() {
                              return t(i._element).trigger(m);
                            }, 0);
                        })
                        .emulateTransitionEnd(600))
                    : (t(o).removeClass(f.ACTIVE),
                      t(a).addClass(f.ACTIVE),
                      (this._isSliding = !1),
                      t(this._element).trigger(m)),
                    h && this.cycle();
                }
              }),
              (l._jQueryInterface = function(e) {
                return this.each(function() {
                  var n = t(this).data(s),
                    o = t.extend({}, h, t(this).data());
                  "object" === (void 0 === e ? "undefined" : i(e)) &&
                    t.extend(o, e);
                  var r = "string" == typeof e ? e : o.slide;
                  if (
                    (n || ((n = new l(this, o)), t(this).data(s, n)),
                    "number" == typeof e)
                  )
                    n.to(e);
                  else if ("string" == typeof r) {
                    if (void 0 === n[r])
                      throw new Error('No method named "' + r + '"');
                    n[r]();
                  } else o.interval && (n.pause(), n.cycle());
                });
              }),
              (l._dataApiClickHandler = function(e) {
                var n = r.getSelectorFromElement(this);
                if (n) {
                  var i = t(n)[0];
                  if (i && t(i).hasClass(f.CAROUSEL)) {
                    var o = t.extend({}, t(i).data(), t(this).data()),
                      a = this.getAttribute("data-slide-to");
                    a && (o.interval = !1),
                      l._jQueryInterface.call(t(i), o),
                      a &&
                        t(i)
                          .data(s)
                          .to(a),
                      e.preventDefault();
                  }
                }
              }),
              o(l, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                },
                {
                  key: "Default",
                  get: function() {
                    return h;
                  }
                }
              ]),
              l
            );
          })();
        t(document).on(d.CLICK_DATA_API, p.DATA_SLIDE, _._dataApiClickHandler),
          t(window).on(d.LOAD_DATA_API, function() {
            t(p.DATA_RIDE).each(function() {
              var e = t(this);
              _._jQueryInterface.call(e, e.data());
            });
          }),
          (t.fn[e] = _._jQueryInterface),
          (t.fn[e].Constructor = _),
          (t.fn[e].noConflict = function() {
            return (t.fn[e] = l), _._jQueryInterface;
          });
      })(jQuery),
      (function(t) {
        var e = "collapse",
          s = "bs.collapse",
          a = t.fn[e],
          l = { toggle: !0, parent: "" },
          h = { toggle: "boolean", parent: "string" },
          c = {
            SHOW: "show.bs.collapse",
            SHOWN: "shown.bs.collapse",
            HIDE: "hide.bs.collapse",
            HIDDEN: "hidden.bs.collapse",
            CLICK_DATA_API: "click.bs.collapse.data-api"
          },
          u = {
            SHOW: "show",
            COLLAPSE: "collapse",
            COLLAPSING: "collapsing",
            COLLAPSED: "collapsed"
          },
          d = { WIDTH: "width", HEIGHT: "height" },
          f = {
            ACTIVES: ".show, .collapsing",
            DATA_TOGGLE: '[data-toggle="collapse"]'
          },
          p = (function() {
            function a(e, i) {
              n(this, a),
                (this._isTransitioning = !1),
                (this._element = e),
                (this._config = this._getConfig(i)),
                (this._triggerArray = t.makeArray(
                  t(
                    '[data-toggle="collapse"][href="#' +
                      e.id +
                      '"],[data-toggle="collapse"][data-target="#' +
                      e.id +
                      '"]'
                  )
                ));
              for (var o = t(f.DATA_TOGGLE), s = 0; s < o.length; s++) {
                var l = o[s],
                  h = r.getSelectorFromElement(l);
                null !== h &&
                  t(h).filter(e).length > 0 &&
                  this._triggerArray.push(l);
              }
              (this._parent = this._config.parent ? this._getParent() : null),
                this._config.parent ||
                  this._addAriaAndCollapsedClass(
                    this._element,
                    this._triggerArray
                  ),
                this._config.toggle && this.toggle();
            }
            return (
              (a.prototype.toggle = function() {
                t(this._element).hasClass(u.SHOW) ? this.hide() : this.show();
              }),
              (a.prototype.show = function() {
                var e = this;
                if (
                  !this._isTransitioning &&
                  !t(this._element).hasClass(u.SHOW)
                ) {
                  var n = void 0,
                    i = void 0;
                  if (
                    (this._parent &&
                      ((n = t.makeArray(
                        t(this._parent)
                          .children()
                          .children(f.ACTIVES)
                      )).length ||
                        (n = null)),
                    !(n && (i = t(n).data(s)) && i._isTransitioning))
                  ) {
                    var o = t.Event(c.SHOW);
                    if (
                      (t(this._element).trigger(o), !o.isDefaultPrevented())
                    ) {
                      n &&
                        (a._jQueryInterface.call(t(n), "hide"),
                        i || t(n).data(s, null));
                      var l = this._getDimension();
                      t(this._element)
                        .removeClass(u.COLLAPSE)
                        .addClass(u.COLLAPSING),
                        (this._element.style[l] = 0),
                        this._triggerArray.length &&
                          t(this._triggerArray)
                            .removeClass(u.COLLAPSED)
                            .attr("aria-expanded", !0),
                        this.setTransitioning(!0);
                      var h = function() {
                        t(e._element)
                          .removeClass(u.COLLAPSING)
                          .addClass(u.COLLAPSE)
                          .addClass(u.SHOW),
                          (e._element.style[l] = ""),
                          e.setTransitioning(!1),
                          t(e._element).trigger(c.SHOWN);
                      };
                      if (r.supportsTransitionEnd()) {
                        var d = "scroll" + (l[0].toUpperCase() + l.slice(1));
                        t(this._element)
                          .one(r.TRANSITION_END, h)
                          .emulateTransitionEnd(600),
                          (this._element.style[l] = this._element[d] + "px");
                      } else h();
                    }
                  }
                }
              }),
              (a.prototype.hide = function() {
                var e = this;
                if (
                  !this._isTransitioning &&
                  t(this._element).hasClass(u.SHOW)
                ) {
                  var n = t.Event(c.HIDE);
                  if ((t(this._element).trigger(n), !n.isDefaultPrevented())) {
                    var i = this._getDimension();
                    if (
                      ((this._element.style[i] =
                        this._element.getBoundingClientRect()[i] + "px"),
                      r.reflow(this._element),
                      t(this._element)
                        .addClass(u.COLLAPSING)
                        .removeClass(u.COLLAPSE)
                        .removeClass(u.SHOW),
                      this._triggerArray.length)
                    )
                      for (var o = 0; o < this._triggerArray.length; o++) {
                        var s = this._triggerArray[o],
                          a = r.getSelectorFromElement(s);
                        null !== a &&
                          (t(a).hasClass(u.SHOW) ||
                            t(s)
                              .addClass(u.COLLAPSED)
                              .attr("aria-expanded", !1));
                      }
                    this.setTransitioning(!0);
                    var l = function() {
                      e.setTransitioning(!1),
                        t(e._element)
                          .removeClass(u.COLLAPSING)
                          .addClass(u.COLLAPSE)
                          .trigger(c.HIDDEN);
                    };
                    (this._element.style[i] = ""),
                      r.supportsTransitionEnd()
                        ? t(this._element)
                            .one(r.TRANSITION_END, l)
                            .emulateTransitionEnd(600)
                        : l();
                  }
                }
              }),
              (a.prototype.setTransitioning = function(t) {
                this._isTransitioning = t;
              }),
              (a.prototype.dispose = function() {
                t.removeData(this._element, s),
                  (this._config = null),
                  (this._parent = null),
                  (this._element = null),
                  (this._triggerArray = null),
                  (this._isTransitioning = null);
              }),
              (a.prototype._getConfig = function(n) {
                return (
                  (n = t.extend({}, l, n)),
                  (n.toggle = Boolean(n.toggle)),
                  r.typeCheckConfig(e, n, h),
                  n
                );
              }),
              (a.prototype._getDimension = function() {
                return t(this._element).hasClass(d.WIDTH) ? d.WIDTH : d.HEIGHT;
              }),
              (a.prototype._getParent = function() {
                var e = this,
                  n = t(this._config.parent)[0],
                  i =
                    '[data-toggle="collapse"][data-parent="' +
                    this._config.parent +
                    '"]';
                return (
                  t(n)
                    .find(i)
                    .each(function(t, n) {
                      e._addAriaAndCollapsedClass(a._getTargetFromElement(n), [
                        n
                      ]);
                    }),
                  n
                );
              }),
              (a.prototype._addAriaAndCollapsedClass = function(e, n) {
                if (e) {
                  var i = t(e).hasClass(u.SHOW);
                  n.length &&
                    t(n)
                      .toggleClass(u.COLLAPSED, !i)
                      .attr("aria-expanded", i);
                }
              }),
              (a._getTargetFromElement = function(e) {
                var n = r.getSelectorFromElement(e);
                return n ? t(n)[0] : null;
              }),
              (a._jQueryInterface = function(e) {
                return this.each(function() {
                  var n = t(this),
                    o = n.data(s),
                    r = t.extend(
                      {},
                      l,
                      n.data(),
                      "object" === (void 0 === e ? "undefined" : i(e)) && e
                    );
                  if (
                    (!o && r.toggle && /show|hide/.test(e) && (r.toggle = !1),
                    o || ((o = new a(this, r)), n.data(s, o)),
                    "string" == typeof e)
                  ) {
                    if (void 0 === o[e])
                      throw new Error('No method named "' + e + '"');
                    o[e]();
                  }
                });
              }),
              o(a, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                },
                {
                  key: "Default",
                  get: function() {
                    return l;
                  }
                }
              ]),
              a
            );
          })();
        t(document).on(c.CLICK_DATA_API, f.DATA_TOGGLE, function(e) {
          /input|textarea/i.test(e.target.tagName) || e.preventDefault();
          var n = t(this),
            i = r.getSelectorFromElement(this);
          t(i).each(function() {
            var e = t(this),
              i = e.data(s) ? "toggle" : n.data();
            p._jQueryInterface.call(e, i);
          });
        }),
          (t.fn[e] = p._jQueryInterface),
          (t.fn[e].Constructor = p),
          (t.fn[e].noConflict = function() {
            return (t.fn[e] = a), p._jQueryInterface;
          });
      })(jQuery),
      (function(t) {
        if ("undefined" == typeof Popper)
          throw new Error(
            "Bootstrap dropdown require Popper.js (https://popper.js.org)"
          );
        var e = "dropdown",
          s = "bs.dropdown",
          a = "." + s,
          l = t.fn[e],
          h = new RegExp("38|40|27"),
          c = {
            HIDE: "hide" + a,
            HIDDEN: "hidden" + a,
            SHOW: "show" + a,
            SHOWN: "shown" + a,
            CLICK: "click" + a,
            CLICK_DATA_API: "click.bs.dropdown.data-api",
            KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api",
            KEYUP_DATA_API: "keyup.bs.dropdown.data-api"
          },
          u = {
            DISABLED: "disabled",
            SHOW: "show",
            DROPUP: "dropup",
            MENURIGHT: "dropdown-menu-right",
            MENULEFT: "dropdown-menu-left"
          },
          d = {
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: ".dropdown form",
            MENU: ".dropdown-menu",
            NAVBAR_NAV: ".navbar-nav",
            VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)"
          },
          f = {
            TOP: "top-start",
            TOPEND: "top-end",
            BOTTOM: "bottom-start",
            BOTTOMEND: "bottom-end"
          },
          p = { placement: f.BOTTOM, offset: 0, flip: !0 },
          _ = {
            placement: "string",
            offset: "(number|string)",
            flip: "boolean"
          },
          g = (function() {
            function l(t, e) {
              n(this, l),
                (this._element = t),
                (this._popper = null),
                (this._config = this._getConfig(e)),
                (this._menu = this._getMenuElement()),
                (this._inNavbar = this._detectNavbar()),
                this._addEventListeners();
            }
            return (
              (l.prototype.toggle = function() {
                if (
                  !this._element.disabled &&
                  !t(this._element).hasClass(u.DISABLED)
                ) {
                  var e = l._getParentFromElement(this._element),
                    n = t(this._menu).hasClass(u.SHOW);
                  if ((l._clearMenus(), !n)) {
                    var i = { relatedTarget: this._element },
                      o = t.Event(c.SHOW, i);
                    if ((t(e).trigger(o), !o.isDefaultPrevented())) {
                      var r = this._element;
                      t(e).hasClass(u.DROPUP) &&
                        (t(this._menu).hasClass(u.MENULEFT) ||
                          t(this._menu).hasClass(u.MENURIGHT)) &&
                        (r = e),
                        (this._popper = new Popper(
                          r,
                          this._menu,
                          this._getPopperConfig()
                        )),
                        "ontouchstart" in document.documentElement &&
                          !t(e).closest(d.NAVBAR_NAV).length &&
                          t("body")
                            .children()
                            .on("mouseover", null, t.noop),
                        this._element.focus(),
                        this._element.setAttribute("aria-expanded", !0),
                        t(this._menu).toggleClass(u.SHOW),
                        t(e)
                          .toggleClass(u.SHOW)
                          .trigger(t.Event(c.SHOWN, i));
                    }
                  }
                }
              }),
              (l.prototype.dispose = function() {
                t.removeData(this._element, s),
                  t(this._element).off(a),
                  (this._element = null),
                  (this._menu = null),
                  null !== this._popper && this._popper.destroy(),
                  (this._popper = null);
              }),
              (l.prototype.update = function() {
                (this._inNavbar = this._detectNavbar()),
                  null !== this._popper && this._popper.scheduleUpdate();
              }),
              (l.prototype._addEventListeners = function() {
                var e = this;
                t(this._element).on(c.CLICK, function(t) {
                  t.preventDefault(), t.stopPropagation(), e.toggle();
                });
              }),
              (l.prototype._getConfig = function(n) {
                var i = t(this._element).data();
                return (
                  void 0 !== i.placement &&
                    (i.placement = f[i.placement.toUpperCase()]),
                  (n = t.extend(
                    {},
                    this.constructor.Default,
                    t(this._element).data(),
                    n
                  )),
                  r.typeCheckConfig(e, n, this.constructor.DefaultType),
                  n
                );
              }),
              (l.prototype._getMenuElement = function() {
                if (!this._menu) {
                  var e = l._getParentFromElement(this._element);
                  this._menu = t(e).find(d.MENU)[0];
                }
                return this._menu;
              }),
              (l.prototype._getPlacement = function() {
                var e = t(this._element).parent(),
                  n = this._config.placement;
                return (
                  e.hasClass(u.DROPUP) || this._config.placement === f.TOP
                    ? ((n = f.TOP),
                      t(this._menu).hasClass(u.MENURIGHT) && (n = f.TOPEND))
                    : t(this._menu).hasClass(u.MENURIGHT) && (n = f.BOTTOMEND),
                  n
                );
              }),
              (l.prototype._detectNavbar = function() {
                return t(this._element).closest(".navbar").length > 0;
              }),
              (l.prototype._getPopperConfig = function() {
                var t = {
                  placement: this._getPlacement(),
                  modifiers: {
                    offset: { offset: this._config.offset },
                    flip: { enabled: this._config.flip }
                  }
                };
                return (
                  this._inNavbar &&
                    (t.modifiers.applyStyle = { enabled: !this._inNavbar }),
                  t
                );
              }),
              (l._jQueryInterface = function(e) {
                return this.each(function() {
                  var n = t(this).data(s),
                    o =
                      "object" === (void 0 === e ? "undefined" : i(e))
                        ? e
                        : null;
                  if (
                    (n || ((n = new l(this, o)), t(this).data(s, n)),
                    "string" == typeof e)
                  ) {
                    if (void 0 === n[e])
                      throw new Error('No method named "' + e + '"');
                    n[e]();
                  }
                });
              }),
              (l._clearMenus = function(e) {
                if (
                  !e ||
                  (3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                )
                  for (
                    var n = t.makeArray(t(d.DATA_TOGGLE)), i = 0;
                    i < n.length;
                    i++
                  ) {
                    var o = l._getParentFromElement(n[i]),
                      r = t(n[i]).data(s),
                      a = { relatedTarget: n[i] };
                    if (r) {
                      var h = r._menu;
                      if (
                        t(o).hasClass(u.SHOW) &&
                        !(
                          e &&
                          (("click" === e.type &&
                            /input|textarea/i.test(e.target.tagName)) ||
                            ("keyup" === e.type && 9 === e.which)) &&
                          t.contains(o, e.target)
                        )
                      ) {
                        var f = t.Event(c.HIDE, a);
                        t(o).trigger(f),
                          f.isDefaultPrevented() ||
                            ("ontouchstart" in document.documentElement &&
                              t("body")
                                .children()
                                .off("mouseover", null, t.noop),
                            n[i].setAttribute("aria-expanded", "false"),
                            t(h).removeClass(u.SHOW),
                            t(o)
                              .removeClass(u.SHOW)
                              .trigger(t.Event(c.HIDDEN, a)));
                      }
                    }
                  }
              }),
              (l._getParentFromElement = function(e) {
                var n = void 0,
                  i = r.getSelectorFromElement(e);
                return i && (n = t(i)[0]), n || e.parentNode;
              }),
              (l._dataApiKeydownHandler = function(e) {
                if (
                  !(
                    !h.test(e.which) ||
                    (/button/i.test(e.target.tagName) && 32 === e.which) ||
                    /input|textarea/i.test(e.target.tagName) ||
                    (e.preventDefault(),
                    e.stopPropagation(),
                    this.disabled || t(this).hasClass(u.DISABLED))
                  )
                ) {
                  var n = l._getParentFromElement(this),
                    i = t(n).hasClass(u.SHOW);
                  if (
                    (i || (27 === e.which && 32 === e.which)) &&
                    (!i || (27 !== e.which && 32 !== e.which))
                  ) {
                    var o = t(n)
                      .find(d.VISIBLE_ITEMS)
                      .get();
                    if (o.length) {
                      var r = o.indexOf(e.target);
                      38 === e.which && r > 0 && r--,
                        40 === e.which && r < o.length - 1 && r++,
                        r < 0 && (r = 0),
                        o[r].focus();
                    }
                  } else {
                    if (27 === e.which) {
                      var s = t(n).find(d.DATA_TOGGLE)[0];
                      t(s).trigger("focus");
                    }
                    t(this).trigger("click");
                  }
                }
              }),
              o(l, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                },
                {
                  key: "Default",
                  get: function() {
                    return p;
                  }
                },
                {
                  key: "DefaultType",
                  get: function() {
                    return _;
                  }
                }
              ]),
              l
            );
          })();
        t(document)
          .on(c.KEYDOWN_DATA_API, d.DATA_TOGGLE, g._dataApiKeydownHandler)
          .on(c.KEYDOWN_DATA_API, d.MENU, g._dataApiKeydownHandler)
          .on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, g._clearMenus)
          .on(c.CLICK_DATA_API, d.DATA_TOGGLE, function(e) {
            e.preventDefault(),
              e.stopPropagation(),
              g._jQueryInterface.call(t(this), "toggle");
          })
          .on(c.CLICK_DATA_API, d.FORM_CHILD, function(t) {
            t.stopPropagation();
          }),
          (t.fn[e] = g._jQueryInterface),
          (t.fn[e].Constructor = g),
          (t.fn[e].noConflict = function() {
            return (t.fn[e] = l), g._jQueryInterface;
          });
      })(jQuery),
      (function(t) {
        var e = "modal",
          s = ".bs.modal",
          a = t.fn[e],
          l = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
          h = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
          },
          c = {
            HIDE: "hide.bs.modal",
            HIDDEN: "hidden.bs.modal",
            SHOW: "show.bs.modal",
            SHOWN: "shown.bs.modal",
            FOCUSIN: "focusin.bs.modal",
            RESIZE: "resize.bs.modal",
            CLICK_DISMISS: "click.dismiss.bs.modal",
            KEYDOWN_DISMISS: "keydown.dismiss.bs.modal",
            MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal",
            MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal",
            CLICK_DATA_API: "click.bs.modal.data-api"
          },
          u = {
            SCROLLBAR_MEASURER: "modal-scrollbar-measure",
            BACKDROP: "modal-backdrop",
            OPEN: "modal-open",
            FADE: "fade",
            SHOW: "show"
          },
          d = {
            DIALOG: ".modal-dialog",
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
            NAVBAR_TOGGLER: ".navbar-toggler"
          },
          f = (function() {
            function a(e, i) {
              n(this, a),
                (this._config = this._getConfig(i)),
                (this._element = e),
                (this._dialog = t(e).find(d.DIALOG)[0]),
                (this._backdrop = null),
                (this._isShown = !1),
                (this._isBodyOverflowing = !1),
                (this._ignoreBackdropClick = !1),
                (this._originalBodyPadding = 0),
                (this._scrollbarWidth = 0);
            }
            return (
              (a.prototype.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t);
              }),
              (a.prototype.show = function(e) {
                var n = this;
                if (!this._isTransitioning) {
                  r.supportsTransitionEnd() &&
                    t(this._element).hasClass(u.FADE) &&
                    (this._isTransitioning = !0);
                  var i = t.Event(c.SHOW, { relatedTarget: e });
                  t(this._element).trigger(i),
                    this._isShown ||
                      i.isDefaultPrevented() ||
                      ((this._isShown = !0),
                      this._checkScrollbar(),
                      this._setScrollbar(),
                      t(document.body).addClass(u.OPEN),
                      this._setEscapeEvent(),
                      this._setResizeEvent(),
                      t(this._element).on(
                        c.CLICK_DISMISS,
                        d.DATA_DISMISS,
                        function(t) {
                          return n.hide(t);
                        }
                      ),
                      t(this._dialog).on(c.MOUSEDOWN_DISMISS, function() {
                        t(n._element).one(c.MOUSEUP_DISMISS, function(e) {
                          t(e.target).is(n._element) &&
                            (n._ignoreBackdropClick = !0);
                        });
                      }),
                      this._showBackdrop(function() {
                        return n._showElement(e);
                      }));
                }
              }),
              (a.prototype.hide = function(e) {
                var n = this;
                if (
                  (e && e.preventDefault(),
                  !this._isTransitioning && this._isShown)
                ) {
                  var i =
                    r.supportsTransitionEnd() &&
                    t(this._element).hasClass(u.FADE);
                  i && (this._isTransitioning = !0);
                  var o = t.Event(c.HIDE);
                  t(this._element).trigger(o),
                    this._isShown &&
                      !o.isDefaultPrevented() &&
                      ((this._isShown = !1),
                      this._setEscapeEvent(),
                      this._setResizeEvent(),
                      t(document).off(c.FOCUSIN),
                      t(this._element).removeClass(u.SHOW),
                      t(this._element).off(c.CLICK_DISMISS),
                      t(this._dialog).off(c.MOUSEDOWN_DISMISS),
                      i
                        ? t(this._element)
                            .one(r.TRANSITION_END, function(t) {
                              return n._hideModal(t);
                            })
                            .emulateTransitionEnd(300)
                        : this._hideModal());
                }
              }),
              (a.prototype.dispose = function() {
                t.removeData(this._element, "bs.modal"),
                  t(window, document, this._element, this._backdrop).off(s),
                  (this._config = null),
                  (this._element = null),
                  (this._dialog = null),
                  (this._backdrop = null),
                  (this._isShown = null),
                  (this._isBodyOverflowing = null),
                  (this._ignoreBackdropClick = null),
                  (this._scrollbarWidth = null);
              }),
              (a.prototype.handleUpdate = function() {
                this._adjustDialog();
              }),
              (a.prototype._getConfig = function(n) {
                return (n = t.extend({}, l, n)), r.typeCheckConfig(e, n, h), n;
              }),
              (a.prototype._showElement = function(e) {
                var n = this,
                  i =
                    r.supportsTransitionEnd() &&
                    t(this._element).hasClass(u.FADE);
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
                  document.body.appendChild(this._element),
                  (this._element.style.display = "block"),
                  this._element.removeAttribute("aria-hidden"),
                  (this._element.scrollTop = 0),
                  i && r.reflow(this._element),
                  t(this._element).addClass(u.SHOW),
                  this._config.focus && this._enforceFocus();
                var o = t.Event(c.SHOWN, { relatedTarget: e }),
                  s = function() {
                    n._config.focus && n._element.focus(),
                      (n._isTransitioning = !1),
                      t(n._element).trigger(o);
                  };
                i
                  ? t(this._dialog)
                      .one(r.TRANSITION_END, s)
                      .emulateTransitionEnd(300)
                  : s();
              }),
              (a.prototype._enforceFocus = function() {
                var e = this;
                t(document)
                  .off(c.FOCUSIN)
                  .on(c.FOCUSIN, function(n) {
                    document === n.target ||
                      e._element === n.target ||
                      t(e._element).has(n.target).length ||
                      e._element.focus();
                  });
              }),
              (a.prototype._setEscapeEvent = function() {
                var e = this;
                this._isShown && this._config.keyboard
                  ? t(this._element).on(c.KEYDOWN_DISMISS, function(t) {
                      27 === t.which && (t.preventDefault(), e.hide());
                    })
                  : this._isShown || t(this._element).off(c.KEYDOWN_DISMISS);
              }),
              (a.prototype._setResizeEvent = function() {
                var e = this;
                this._isShown
                  ? t(window).on(c.RESIZE, function(t) {
                      return e.handleUpdate(t);
                    })
                  : t(window).off(c.RESIZE);
              }),
              (a.prototype._hideModal = function() {
                var e = this;
                (this._element.style.display = "none"),
                  this._element.setAttribute("aria-hidden", !0),
                  (this._isTransitioning = !1),
                  this._showBackdrop(function() {
                    t(document.body).removeClass(u.OPEN),
                      e._resetAdjustments(),
                      e._resetScrollbar(),
                      t(e._element).trigger(c.HIDDEN);
                  });
              }),
              (a.prototype._removeBackdrop = function() {
                this._backdrop &&
                  (t(this._backdrop).remove(), (this._backdrop = null));
              }),
              (a.prototype._showBackdrop = function(e) {
                var n = this,
                  i = t(this._element).hasClass(u.FADE) ? u.FADE : "";
                if (this._isShown && this._config.backdrop) {
                  var o = r.supportsTransitionEnd() && i;
                  if (
                    ((this._backdrop = document.createElement("div")),
                    (this._backdrop.className = u.BACKDROP),
                    i && t(this._backdrop).addClass(i),
                    t(this._backdrop).appendTo(document.body),
                    t(this._element).on(c.CLICK_DISMISS, function(t) {
                      n._ignoreBackdropClick
                        ? (n._ignoreBackdropClick = !1)
                        : t.target === t.currentTarget &&
                          ("static" === n._config.backdrop
                            ? n._element.focus()
                            : n.hide());
                    }),
                    o && r.reflow(this._backdrop),
                    t(this._backdrop).addClass(u.SHOW),
                    !e)
                  )
                    return;
                  if (!o) return void e();
                  t(this._backdrop)
                    .one(r.TRANSITION_END, e)
                    .emulateTransitionEnd(150);
                } else if (!this._isShown && this._backdrop) {
                  t(this._backdrop).removeClass(u.SHOW);
                  var s = function() {
                    n._removeBackdrop(), e && e();
                  };
                  r.supportsTransitionEnd() && t(this._element).hasClass(u.FADE)
                    ? t(this._backdrop)
                        .one(r.TRANSITION_END, s)
                        .emulateTransitionEnd(150)
                    : s();
                } else e && e();
              }),
              (a.prototype._adjustDialog = function() {
                var t =
                  this._element.scrollHeight >
                  document.documentElement.clientHeight;
                !this._isBodyOverflowing &&
                  t &&
                  (this._element.style.paddingLeft =
                    this._scrollbarWidth + "px"),
                  this._isBodyOverflowing &&
                    !t &&
                    (this._element.style.paddingRight =
                      this._scrollbarWidth + "px");
              }),
              (a.prototype._resetAdjustments = function() {
                (this._element.style.paddingLeft = ""),
                  (this._element.style.paddingRight = "");
              }),
              (a.prototype._checkScrollbar = function() {
                (this._isBodyOverflowing =
                  document.body.clientWidth < window.innerWidth),
                  (this._scrollbarWidth = this._getScrollbarWidth());
              }),
              (a.prototype._setScrollbar = function() {
                var e = this;
                if (this._isBodyOverflowing) {
                  t(d.FIXED_CONTENT).each(function(n, i) {
                    var o = t(i)[0].style.paddingRight,
                      r = t(i).css("padding-right");
                    t(i)
                      .data("padding-right", o)
                      .css(
                        "padding-right",
                        parseFloat(r) + e._scrollbarWidth + "px"
                      );
                  }),
                    t(d.NAVBAR_TOGGLER).each(function(n, i) {
                      var o = t(i)[0].style.marginRight,
                        r = t(i).css("margin-right");
                      t(i)
                        .data("margin-right", o)
                        .css(
                          "margin-right",
                          parseFloat(r) + e._scrollbarWidth + "px"
                        );
                    });
                  var n = document.body.style.paddingRight,
                    i = t("body").css("padding-right");
                  t("body")
                    .data("padding-right", n)
                    .css(
                      "padding-right",
                      parseFloat(i) + this._scrollbarWidth + "px"
                    );
                }
              }),
              (a.prototype._resetScrollbar = function() {
                t(d.FIXED_CONTENT).each(function(e, n) {
                  var i = t(n).data("padding-right");
                  void 0 !== i &&
                    t(n)
                      .css("padding-right", i)
                      .removeData("padding-right");
                }),
                  t(d.NAVBAR_TOGGLER).each(function(e, n) {
                    var i = t(n).data("margin-right");
                    void 0 !== i &&
                      t(n)
                        .css("margin-right", i)
                        .removeData("margin-right");
                  });
                var e = t("body").data("padding-right");
                void 0 !== e &&
                  t("body")
                    .css("padding-right", e)
                    .removeData("padding-right");
              }),
              (a.prototype._getScrollbarWidth = function() {
                var t = document.createElement("div");
                (t.className = u.SCROLLBAR_MEASURER),
                  document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e;
              }),
              (a._jQueryInterface = function(e, n) {
                return this.each(function() {
                  var o = t(this).data("bs.modal"),
                    r = t.extend(
                      {},
                      a.Default,
                      t(this).data(),
                      "object" === (void 0 === e ? "undefined" : i(e)) && e
                    );
                  if (
                    (o || ((o = new a(this, r)), t(this).data("bs.modal", o)),
                    "string" == typeof e)
                  ) {
                    if (void 0 === o[e])
                      throw new Error('No method named "' + e + '"');
                    o[e](n);
                  } else r.show && o.show(n);
                });
              }),
              o(a, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                },
                {
                  key: "Default",
                  get: function() {
                    return l;
                  }
                }
              ]),
              a
            );
          })();
        t(document).on(c.CLICK_DATA_API, d.DATA_TOGGLE, function(e) {
          var n = this,
            i = void 0,
            o = r.getSelectorFromElement(this);
          o && (i = t(o)[0]);
          var s = t(i).data("bs.modal")
            ? "toggle"
            : t.extend({}, t(i).data(), t(this).data());
          ("A" !== this.tagName && "AREA" !== this.tagName) ||
            e.preventDefault();
          var a = t(i).one(c.SHOW, function(e) {
            e.isDefaultPrevented() ||
              a.one(c.HIDDEN, function() {
                t(n).is(":visible") && n.focus();
              });
          });
          f._jQueryInterface.call(t(i), s, this);
        }),
          (t.fn[e] = f._jQueryInterface),
          (t.fn[e].Constructor = f),
          (t.fn[e].noConflict = function() {
            return (t.fn[e] = a), f._jQueryInterface;
          });
      })(jQuery),
      (function(t) {
        var e = "scrollspy",
          s = t.fn[e],
          a = { offset: 10, method: "auto", target: "" },
          l = {
            offset: "number",
            method: "string",
            target: "(string|element)"
          },
          h = {
            ACTIVATE: "activate.bs.scrollspy",
            SCROLL: "scroll.bs.scrollspy",
            LOAD_DATA_API: "load.bs.scrollspy.data-api"
          },
          c = {
            DROPDOWN_ITEM: "dropdown-item",
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active"
          },
          u = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: ".active",
            NAV_LIST_GROUP: ".nav, .list-group",
            NAV_LINKS: ".nav-link",
            LIST_ITEMS: ".list-group-item",
            DROPDOWN: ".dropdown",
            DROPDOWN_ITEMS: ".dropdown-item",
            DROPDOWN_TOGGLE: ".dropdown-toggle"
          },
          d = { OFFSET: "offset", POSITION: "position" },
          f = (function() {
            function s(e, i) {
              var o = this;
              n(this, s),
                (this._element = e),
                (this._scrollElement = "BODY" === e.tagName ? window : e),
                (this._config = this._getConfig(i)),
                (this._selector =
                  this._config.target +
                  " " +
                  u.NAV_LINKS +
                  "," +
                  this._config.target +
                  " " +
                  u.LIST_ITEMS +
                  "," +
                  this._config.target +
                  " " +
                  u.DROPDOWN_ITEMS),
                (this._offsets = []),
                (this._targets = []),
                (this._activeTarget = null),
                (this._scrollHeight = 0),
                t(this._scrollElement).on(h.SCROLL, function(t) {
                  return o._process(t);
                }),
                this.refresh(),
                this._process();
            }
            return (
              (s.prototype.refresh = function() {
                var e = this,
                  n =
                    this._scrollElement !== this._scrollElement.window
                      ? d.POSITION
                      : d.OFFSET,
                  i = "auto" === this._config.method ? n : this._config.method,
                  o = i === d.POSITION ? this._getScrollTop() : 0;
                (this._offsets = []),
                  (this._targets = []),
                  (this._scrollHeight = this._getScrollHeight()),
                  t
                    .makeArray(t(this._selector))
                    .map(function(e) {
                      var n = void 0,
                        s = r.getSelectorFromElement(e);
                      if ((s && (n = t(s)[0]), n)) {
                        var a = n.getBoundingClientRect();
                        if (a.width || a.height) return [t(n)[i]().top + o, s];
                      }
                      return null;
                    })
                    .filter(function(t) {
                      return t;
                    })
                    .sort(function(t, e) {
                      return t[0] - e[0];
                    })
                    .forEach(function(t) {
                      e._offsets.push(t[0]), e._targets.push(t[1]);
                    });
              }),
              (s.prototype.dispose = function() {
                t.removeData(this._element, "bs.scrollspy"),
                  t(this._scrollElement).off(".bs.scrollspy"),
                  (this._element = null),
                  (this._scrollElement = null),
                  (this._config = null),
                  (this._selector = null),
                  (this._offsets = null),
                  (this._targets = null),
                  (this._activeTarget = null),
                  (this._scrollHeight = null);
              }),
              (s.prototype._getConfig = function(n) {
                if ("string" != typeof (n = t.extend({}, a, n)).target) {
                  var i = t(n.target).attr("id");
                  i || ((i = r.getUID(e)), t(n.target).attr("id", i)),
                    (n.target = "#" + i);
                }
                return r.typeCheckConfig(e, n, l), n;
              }),
              (s.prototype._getScrollTop = function() {
                return this._scrollElement === window
                  ? this._scrollElement.pageYOffset
                  : this._scrollElement.scrollTop;
              }),
              (s.prototype._getScrollHeight = function() {
                return (
                  this._scrollElement.scrollHeight ||
                  Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight
                  )
                );
              }),
              (s.prototype._getOffsetHeight = function() {
                return this._scrollElement === window
                  ? window.innerHeight
                  : this._scrollElement.getBoundingClientRect().height;
              }),
              (s.prototype._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                  e = this._getScrollHeight(),
                  n = this._config.offset + e - this._getOffsetHeight();
                if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
                  var i = this._targets[this._targets.length - 1];
                  this._activeTarget !== i && this._activate(i);
                } else {
                  if (
                    this._activeTarget &&
                    t < this._offsets[0] &&
                    this._offsets[0] > 0
                  )
                    return (this._activeTarget = null), void this._clear();
                  for (var o = this._offsets.length; o--; )
                    this._activeTarget !== this._targets[o] &&
                      t >= this._offsets[o] &&
                      (void 0 === this._offsets[o + 1] ||
                        t < this._offsets[o + 1]) &&
                      this._activate(this._targets[o]);
                }
              }),
              (s.prototype._activate = function(e) {
                (this._activeTarget = e), this._clear();
                var n = this._selector.split(",");
                n = n.map(function(t) {
                  return (
                    t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                  );
                });
                var i = t(n.join(","));
                i.hasClass(c.DROPDOWN_ITEM)
                  ? (i
                      .closest(u.DROPDOWN)
                      .find(u.DROPDOWN_TOGGLE)
                      .addClass(c.ACTIVE),
                    i.addClass(c.ACTIVE))
                  : (i.addClass(c.ACTIVE),
                    i
                      .parents(u.NAV_LIST_GROUP)
                      .prev(u.NAV_LINKS + ", " + u.LIST_ITEMS)
                      .addClass(c.ACTIVE)),
                  t(this._scrollElement).trigger(h.ACTIVATE, {
                    relatedTarget: e
                  });
              }),
              (s.prototype._clear = function() {
                t(this._selector)
                  .filter(u.ACTIVE)
                  .removeClass(c.ACTIVE);
              }),
              (s._jQueryInterface = function(e) {
                return this.each(function() {
                  var n = t(this).data("bs.scrollspy"),
                    o = "object" === (void 0 === e ? "undefined" : i(e)) && e;
                  if (
                    (n ||
                      ((n = new s(this, o)), t(this).data("bs.scrollspy", n)),
                    "string" == typeof e)
                  ) {
                    if (void 0 === n[e])
                      throw new Error('No method named "' + e + '"');
                    n[e]();
                  }
                });
              }),
              o(s, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                },
                {
                  key: "Default",
                  get: function() {
                    return a;
                  }
                }
              ]),
              s
            );
          })();
        t(window).on(h.LOAD_DATA_API, function() {
          for (var e = t.makeArray(t(u.DATA_SPY)), n = e.length; n--; ) {
            var i = t(e[n]);
            f._jQueryInterface.call(i, i.data());
          }
        }),
          (t.fn[e] = f._jQueryInterface),
          (t.fn[e].Constructor = f),
          (t.fn[e].noConflict = function() {
            return (t.fn[e] = s), f._jQueryInterface;
          });
      })(jQuery),
      (function(t) {
        var e = t.fn.tab,
          i = {
            HIDE: "hide.bs.tab",
            HIDDEN: "hidden.bs.tab",
            SHOW: "show.bs.tab",
            SHOWN: "shown.bs.tab",
            CLICK_DATA_API: "click.bs.tab.data-api"
          },
          s = {
            DROPDOWN_MENU: "dropdown-menu",
            ACTIVE: "active",
            DISABLED: "disabled",
            FADE: "fade",
            SHOW: "show"
          },
          a = {
            DROPDOWN: ".dropdown",
            NAV_LIST_GROUP: ".nav, .list-group",
            ACTIVE: ".active",
            DATA_TOGGLE:
              '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
            DROPDOWN_TOGGLE: ".dropdown-toggle",
            DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active"
          },
          l = (function() {
            function e(t) {
              n(this, e), (this._element = t);
            }
            return (
              (e.prototype.show = function() {
                var e = this;
                if (
                  !(
                    (this._element.parentNode &&
                      this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                      t(this._element).hasClass(s.ACTIVE)) ||
                    t(this._element).hasClass(s.DISABLED)
                  )
                ) {
                  var n = void 0,
                    o = void 0,
                    l = t(this._element).closest(a.NAV_LIST_GROUP)[0],
                    h = r.getSelectorFromElement(this._element);
                  l &&
                    ((o = t.makeArray(t(l).find(a.ACTIVE))),
                    (o = o[o.length - 1]));
                  var c = t.Event(i.HIDE, { relatedTarget: this._element }),
                    u = t.Event(i.SHOW, { relatedTarget: o });
                  if (
                    (o && t(o).trigger(c),
                    t(this._element).trigger(u),
                    !u.isDefaultPrevented() && !c.isDefaultPrevented())
                  ) {
                    h && (n = t(h)[0]), this._activate(this._element, l);
                    var d = function() {
                      var n = t.Event(i.HIDDEN, { relatedTarget: e._element }),
                        r = t.Event(i.SHOWN, { relatedTarget: o });
                      t(o).trigger(n), t(e._element).trigger(r);
                    };
                    n ? this._activate(n, n.parentNode, d) : d();
                  }
                }
              }),
              (e.prototype.dispose = function() {
                t.removeData(this._element, "bs.tab"), (this._element = null);
              }),
              (e.prototype._activate = function(e, n, i) {
                var o = this,
                  l = t(n).find(a.ACTIVE)[0],
                  h =
                    i &&
                    r.supportsTransitionEnd() &&
                    l &&
                    t(l).hasClass(s.FADE),
                  c = function() {
                    return o._transitionComplete(e, l, h, i);
                  };
                l && h
                  ? t(l)
                      .one(r.TRANSITION_END, c)
                      .emulateTransitionEnd(150)
                  : c(),
                  l && t(l).removeClass(s.SHOW);
              }),
              (e.prototype._transitionComplete = function(e, n, i, o) {
                if (n) {
                  t(n).removeClass(s.ACTIVE);
                  var l = t(n.parentNode).find(a.DROPDOWN_ACTIVE_CHILD)[0];
                  l && t(l).removeClass(s.ACTIVE),
                    n.setAttribute("aria-expanded", !1);
                }
                if (
                  (t(e).addClass(s.ACTIVE),
                  e.setAttribute("aria-expanded", !0),
                  i
                    ? (r.reflow(e), t(e).addClass(s.SHOW))
                    : t(e).removeClass(s.FADE),
                  e.parentNode && t(e.parentNode).hasClass(s.DROPDOWN_MENU))
                ) {
                  var h = t(e).closest(a.DROPDOWN)[0];
                  h &&
                    t(h)
                      .find(a.DROPDOWN_TOGGLE)
                      .addClass(s.ACTIVE),
                    e.setAttribute("aria-expanded", !0);
                }
                o && o();
              }),
              (e._jQueryInterface = function(n) {
                return this.each(function() {
                  var i = t(this),
                    o = i.data("bs.tab");
                  if (
                    (o || ((o = new e(this)), i.data("bs.tab", o)),
                    "string" == typeof n)
                  ) {
                    if (void 0 === o[n])
                      throw new Error('No method named "' + n + '"');
                    o[n]();
                  }
                });
              }),
              o(e, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                }
              ]),
              e
            );
          })();
        t(document).on(i.CLICK_DATA_API, a.DATA_TOGGLE, function(e) {
          e.preventDefault(), l._jQueryInterface.call(t(this), "show");
        }),
          (t.fn.tab = l._jQueryInterface),
          (t.fn.tab.Constructor = l),
          (t.fn.tab.noConflict = function() {
            return (t.fn.tab = e), l._jQueryInterface;
          });
      })(jQuery),
      (function(t) {
        if ("undefined" == typeof Popper)
          throw new Error(
            "Bootstrap tooltips require Popper.js (https://popper.js.org)"
          );
        var e = "tooltip",
          s = ".bs.tooltip",
          a = t.fn[e],
          l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
          h = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)"
          },
          c = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
          },
          u = {
            animation: !0,
            template:
              '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip"
          },
          d = { SHOW: "show", OUT: "out" },
          f = {
            HIDE: "hide" + s,
            HIDDEN: "hidden" + s,
            SHOW: "show" + s,
            SHOWN: "shown" + s,
            INSERTED: "inserted" + s,
            CLICK: "click" + s,
            FOCUSIN: "focusin" + s,
            FOCUSOUT: "focusout" + s,
            MOUSEENTER: "mouseenter" + s,
            MOUSELEAVE: "mouseleave" + s
          },
          p = { FADE: "fade", SHOW: "show" },
          _ = {
            TOOLTIP: ".tooltip",
            TOOLTIP_INNER: ".tooltip-inner",
            ARROW: ".arrow"
          },
          g = {
            HOVER: "hover",
            FOCUS: "focus",
            CLICK: "click",
            MANUAL: "manual"
          },
          m = (function() {
            function a(t, e) {
              n(this, a),
                (this._isEnabled = !0),
                (this._timeout = 0),
                (this._hoverState = ""),
                (this._activeTrigger = {}),
                (this._popper = null),
                (this.element = t),
                (this.config = this._getConfig(e)),
                (this.tip = null),
                this._setListeners();
            }
            return (
              (a.prototype.enable = function() {
                this._isEnabled = !0;
              }),
              (a.prototype.disable = function() {
                this._isEnabled = !1;
              }),
              (a.prototype.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled;
              }),
              (a.prototype.toggle = function(e) {
                if (e) {
                  var n = this.constructor.DATA_KEY,
                    i = t(e.currentTarget).data(n);
                  i ||
                    ((i = new this.constructor(
                      e.currentTarget,
                      this._getDelegateConfig()
                    )),
                    t(e.currentTarget).data(n, i)),
                    (i._activeTrigger.click = !i._activeTrigger.click),
                    i._isWithActiveTrigger()
                      ? i._enter(null, i)
                      : i._leave(null, i);
                } else {
                  if (t(this.getTipElement()).hasClass(p.SHOW))
                    return void this._leave(null, this);
                  this._enter(null, this);
                }
              }),
              (a.prototype.dispose = function() {
                clearTimeout(this._timeout),
                  t.removeData(this.element, this.constructor.DATA_KEY),
                  t(this.element).off(this.constructor.EVENT_KEY),
                  t(this.element)
                    .closest(".modal")
                    .off("hide.bs.modal"),
                  this.tip && t(this.tip).remove(),
                  (this._isEnabled = null),
                  (this._timeout = null),
                  (this._hoverState = null),
                  (this._activeTrigger = null),
                  null !== this._popper && this._popper.destroy(),
                  (this._popper = null),
                  (this.element = null),
                  (this.config = null),
                  (this.tip = null);
              }),
              (a.prototype.show = function() {
                var e = this;
                if ("none" === t(this.element).css("display"))
                  throw new Error("Please use show on visible elements");
                var n = t.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                  t(this.element).trigger(n);
                  var i = t.contains(
                    this.element.ownerDocument.documentElement,
                    this.element
                  );
                  if (n.isDefaultPrevented() || !i) return;
                  var o = this.getTipElement(),
                    s = r.getUID(this.constructor.NAME);
                  o.setAttribute("id", s),
                    this.element.setAttribute("aria-describedby", s),
                    this.setContent(),
                    this.config.animation && t(o).addClass(p.FADE);
                  var l =
                      "function" == typeof this.config.placement
                        ? this.config.placement.call(this, o, this.element)
                        : this.config.placement,
                    h = this._getAttachment(l);
                  this.addAttachmentClass(h);
                  var c =
                    !1 === this.config.container
                      ? document.body
                      : t(this.config.container);
                  t(o).data(this.constructor.DATA_KEY, this),
                    t.contains(
                      this.element.ownerDocument.documentElement,
                      this.tip
                    ) || t(o).appendTo(c),
                    t(this.element).trigger(this.constructor.Event.INSERTED),
                    (this._popper = new Popper(this.element, o, {
                      placement: h,
                      modifiers: {
                        offset: { offset: this.config.offset },
                        flip: { behavior: this.config.fallbackPlacement },
                        arrow: { element: _.ARROW }
                      },
                      onCreate: function(t) {
                        t.originalPlacement !== t.placement &&
                          e._handlePopperPlacementChange(t);
                      },
                      onUpdate: function(t) {
                        e._handlePopperPlacementChange(t);
                      }
                    })),
                    t(o).addClass(p.SHOW),
                    "ontouchstart" in document.documentElement &&
                      t("body")
                        .children()
                        .on("mouseover", null, t.noop);
                  var u = function() {
                    e.config.animation && e._fixTransition();
                    var n = e._hoverState;
                    (e._hoverState = null),
                      t(e.element).trigger(e.constructor.Event.SHOWN),
                      n === d.OUT && e._leave(null, e);
                  };
                  r.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE)
                    ? t(this.tip)
                        .one(r.TRANSITION_END, u)
                        .emulateTransitionEnd(a._TRANSITION_DURATION)
                    : u();
                }
              }),
              (a.prototype.hide = function(e) {
                var n = this,
                  i = this.getTipElement(),
                  o = t.Event(this.constructor.Event.HIDE),
                  s = function() {
                    n._hoverState !== d.SHOW &&
                      i.parentNode &&
                      i.parentNode.removeChild(i),
                      n._cleanTipClass(),
                      n.element.removeAttribute("aria-describedby"),
                      t(n.element).trigger(n.constructor.Event.HIDDEN),
                      null !== n._popper && n._popper.destroy(),
                      e && e();
                  };
                t(this.element).trigger(o),
                  o.isDefaultPrevented() ||
                    (t(i).removeClass(p.SHOW),
                    "ontouchstart" in document.documentElement &&
                      t("body")
                        .children()
                        .off("mouseover", null, t.noop),
                    (this._activeTrigger[g.CLICK] = !1),
                    (this._activeTrigger[g.FOCUS] = !1),
                    (this._activeTrigger[g.HOVER] = !1),
                    r.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE)
                      ? t(i)
                          .one(r.TRANSITION_END, s)
                          .emulateTransitionEnd(150)
                      : s(),
                    (this._hoverState = ""));
              }),
              (a.prototype.update = function() {
                null !== this._popper && this._popper.scheduleUpdate();
              }),
              (a.prototype.isWithContent = function() {
                return Boolean(this.getTitle());
              }),
              (a.prototype.addAttachmentClass = function(e) {
                t(this.getTipElement()).addClass("bs-tooltip-" + e);
              }),
              (a.prototype.getTipElement = function() {
                return (this.tip = this.tip || t(this.config.template)[0]);
              }),
              (a.prototype.setContent = function() {
                var e = t(this.getTipElement());
                this.setElementContent(
                  e.find(_.TOOLTIP_INNER),
                  this.getTitle()
                ),
                  e.removeClass(p.FADE + " " + p.SHOW);
              }),
              (a.prototype.setElementContent = function(e, n) {
                var o = this.config.html;
                "object" === (void 0 === n ? "undefined" : i(n)) &&
                (n.nodeType || n.jquery)
                  ? o
                    ? t(n)
                        .parent()
                        .is(e) || e.empty().append(n)
                    : e.text(t(n).text())
                  : e[o ? "html" : "text"](n);
              }),
              (a.prototype.getTitle = function() {
                var t = this.element.getAttribute("data-original-title");
                return (
                  t ||
                    (t =
                      "function" == typeof this.config.title
                        ? this.config.title.call(this.element)
                        : this.config.title),
                  t
                );
              }),
              (a.prototype._getAttachment = function(t) {
                return c[t.toUpperCase()];
              }),
              (a.prototype._setListeners = function() {
                var e = this;
                this.config.trigger.split(" ").forEach(function(n) {
                  if ("click" === n)
                    t(e.element).on(
                      e.constructor.Event.CLICK,
                      e.config.selector,
                      function(t) {
                        return e.toggle(t);
                      }
                    );
                  else if (n !== g.MANUAL) {
                    var i =
                        n === g.HOVER
                          ? e.constructor.Event.MOUSEENTER
                          : e.constructor.Event.FOCUSIN,
                      o =
                        n === g.HOVER
                          ? e.constructor.Event.MOUSELEAVE
                          : e.constructor.Event.FOCUSOUT;
                    t(e.element)
                      .on(i, e.config.selector, function(t) {
                        return e._enter(t);
                      })
                      .on(o, e.config.selector, function(t) {
                        return e._leave(t);
                      });
                  }
                  t(e.element)
                    .closest(".modal")
                    .on("hide.bs.modal", function() {
                      return e.hide();
                    });
                }),
                  this.config.selector
                    ? (this.config = t.extend({}, this.config, {
                        trigger: "manual",
                        selector: ""
                      }))
                    : this._fixTitle();
              }),
              (a.prototype._fixTitle = function() {
                var t = i(this.element.getAttribute("data-original-title"));
                (this.element.getAttribute("title") || "string" !== t) &&
                  (this.element.setAttribute(
                    "data-original-title",
                    this.element.getAttribute("title") || ""
                  ),
                  this.element.setAttribute("title", ""));
              }),
              (a.prototype._enter = function(e, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || t(e.currentTarget).data(i)) ||
                  ((n = new this.constructor(
                    e.currentTarget,
                    this._getDelegateConfig()
                  )),
                  t(e.currentTarget).data(i, n)),
                  e &&
                    (n._activeTrigger[
                      "focusin" === e.type ? g.FOCUS : g.HOVER
                    ] = !0),
                  t(n.getTipElement()).hasClass(p.SHOW) ||
                  n._hoverState === d.SHOW
                    ? (n._hoverState = d.SHOW)
                    : (clearTimeout(n._timeout),
                      (n._hoverState = d.SHOW),
                      n.config.delay && n.config.delay.show
                        ? (n._timeout = setTimeout(function() {
                            n._hoverState === d.SHOW && n.show();
                          }, n.config.delay.show))
                        : n.show());
              }),
              (a.prototype._leave = function(e, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || t(e.currentTarget).data(i)) ||
                  ((n = new this.constructor(
                    e.currentTarget,
                    this._getDelegateConfig()
                  )),
                  t(e.currentTarget).data(i, n)),
                  e &&
                    (n._activeTrigger[
                      "focusout" === e.type ? g.FOCUS : g.HOVER
                    ] = !1),
                  n._isWithActiveTrigger() ||
                    (clearTimeout(n._timeout),
                    (n._hoverState = d.OUT),
                    n.config.delay && n.config.delay.hide
                      ? (n._timeout = setTimeout(function() {
                          n._hoverState === d.OUT && n.hide();
                        }, n.config.delay.hide))
                      : n.hide());
              }),
              (a.prototype._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                  if (this._activeTrigger[t]) return !0;
                return !1;
              }),
              (a.prototype._getConfig = function(n) {
                return (
                  (n = t.extend(
                    {},
                    this.constructor.Default,
                    t(this.element).data(),
                    n
                  )).delay &&
                    "number" == typeof n.delay &&
                    (n.delay = { show: n.delay, hide: n.delay }),
                  n.title &&
                    "number" == typeof n.title &&
                    (n.title = n.title.toString()),
                  n.content &&
                    "number" == typeof n.content &&
                    (n.content = n.content.toString()),
                  r.typeCheckConfig(e, n, this.constructor.DefaultType),
                  n
                );
              }),
              (a.prototype._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                  for (var e in this.config)
                    this.constructor.Default[e] !== this.config[e] &&
                      (t[e] = this.config[e]);
                return t;
              }),
              (a.prototype._cleanTipClass = function() {
                var e = t(this.getTipElement()),
                  n = e.attr("class").match(l);
                null !== n && n.length > 0 && e.removeClass(n.join(""));
              }),
              (a.prototype._handlePopperPlacementChange = function(t) {
                this._cleanTipClass(),
                  this.addAttachmentClass(this._getAttachment(t.placement));
              }),
              (a.prototype._fixTransition = function() {
                var e = this.getTipElement(),
                  n = this.config.animation;
                null === e.getAttribute("x-placement") &&
                  (t(e).removeClass(p.FADE),
                  (this.config.animation = !1),
                  this.hide(),
                  this.show(),
                  (this.config.animation = n));
              }),
              (a._jQueryInterface = function(e) {
                return this.each(function() {
                  var n = t(this).data("bs.tooltip"),
                    o = "object" === (void 0 === e ? "undefined" : i(e)) && e;
                  if (
                    (n || !/dispose|hide/.test(e)) &&
                    (n || ((n = new a(this, o)), t(this).data("bs.tooltip", n)),
                    "string" == typeof e)
                  ) {
                    if (void 0 === n[e])
                      throw new Error('No method named "' + e + '"');
                    n[e]();
                  }
                });
              }),
              o(a, null, [
                {
                  key: "VERSION",
                  get: function() {
                    return "4.0.0-beta";
                  }
                },
                {
                  key: "Default",
                  get: function() {
                    return u;
                  }
                },
                {
                  key: "NAME",
                  get: function() {
                    return e;
                  }
                },
                {
                  key: "DATA_KEY",
                  get: function() {
                    return "bs.tooltip";
                  }
                },
                {
                  key: "Event",
                  get: function() {
                    return f;
                  }
                },
                {
                  key: "EVENT_KEY",
                  get: function() {
                    return s;
                  }
                },
                {
                  key: "DefaultType",
                  get: function() {
                    return h;
                  }
                }
              ]),
              a
            );
          })();
        return (
          (t.fn[e] = m._jQueryInterface),
          (t.fn[e].Constructor = m),
          (t.fn[e].noConflict = function() {
            return (t.fn[e] = a), m._jQueryInterface;
          }),
          m
        );
      })(jQuery));
    !(function(r) {
      var a = "popover",
        l = ".bs.popover",
        h = r.fn[a],
        c = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        u = r.extend({}, s.Default, {
          placement: "right",
          trigger: "click",
          content: "",
          template:
            '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        d = r.extend({}, s.DefaultType, {
          content: "(string|element|function)"
        }),
        f = { FADE: "fade", SHOW: "show" },
        p = { TITLE: ".popover-header", CONTENT: ".popover-body" },
        _ = {
          HIDE: "hide" + l,
          HIDDEN: "hidden" + l,
          SHOW: "show" + l,
          SHOWN: "shown" + l,
          INSERTED: "inserted" + l,
          CLICK: "click" + l,
          FOCUSIN: "focusin" + l,
          FOCUSOUT: "focusout" + l,
          MOUSEENTER: "mouseenter" + l,
          MOUSELEAVE: "mouseleave" + l
        },
        g = (function(s) {
          function h() {
            return n(this, h), t(this, s.apply(this, arguments));
          }
          return (
            e(h, s),
            (h.prototype.isWithContent = function() {
              return this.getTitle() || this._getContent();
            }),
            (h.prototype.addAttachmentClass = function(t) {
              r(this.getTipElement()).addClass("bs-popover-" + t);
            }),
            (h.prototype.getTipElement = function() {
              return (this.tip = this.tip || r(this.config.template)[0]);
            }),
            (h.prototype.setContent = function() {
              var t = r(this.getTipElement());
              this.setElementContent(t.find(p.TITLE), this.getTitle()),
                this.setElementContent(t.find(p.CONTENT), this._getContent()),
                t.removeClass(f.FADE + " " + f.SHOW);
            }),
            (h.prototype._getContent = function() {
              return (
                this.element.getAttribute("data-content") ||
                ("function" == typeof this.config.content
                  ? this.config.content.call(this.element)
                  : this.config.content)
              );
            }),
            (h.prototype._cleanTipClass = function() {
              var t = r(this.getTipElement()),
                e = t.attr("class").match(c);
              null !== e && e.length > 0 && t.removeClass(e.join(""));
            }),
            (h._jQueryInterface = function(t) {
              return this.each(function() {
                var e = r(this).data("bs.popover"),
                  n =
                    "object" === (void 0 === t ? "undefined" : i(t)) ? t : null;
                if (
                  (e || !/destroy|hide/.test(t)) &&
                  (e || ((e = new h(this, n)), r(this).data("bs.popover", e)),
                  "string" == typeof t)
                ) {
                  if (void 0 === e[t])
                    throw new Error('No method named "' + t + '"');
                  e[t]();
                }
              });
            }),
            o(h, null, [
              {
                key: "VERSION",
                get: function() {
                  return "4.0.0-beta";
                }
              },
              {
                key: "Default",
                get: function() {
                  return u;
                }
              },
              {
                key: "NAME",
                get: function() {
                  return a;
                }
              },
              {
                key: "DATA_KEY",
                get: function() {
                  return "bs.popover";
                }
              },
              {
                key: "Event",
                get: function() {
                  return _;
                }
              },
              {
                key: "EVENT_KEY",
                get: function() {
                  return l;
                }
              },
              {
                key: "DefaultType",
                get: function() {
                  return d;
                }
              }
            ]),
            h
          );
        })(s);
      (r.fn[a] = g._jQueryInterface),
        (r.fn[a].Constructor = g),
        (r.fn[a].noConflict = function() {
          return (r.fn[a] = h), g._jQueryInterface;
        });
    })(jQuery);
  })();

/*! WOW - v1.1.3 - 2016-05-06
* Copyright (c) 2016 Matthieu Aussaguel;*/ (function() {
  var a,
    b,
    c,
    d,
    e,
    f = function(a, b) {
      return function() {
        return a.apply(b, arguments);
      };
    },
    g =
      [].indexOf ||
      function(a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  (b = (function() {
    function a() {}
    return (
      (a.prototype.extend = function(a, b) {
        var c, d;
        for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
        return a;
      }),
      (a.prototype.isMobile = function(a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          a
        );
      }),
      (a.prototype.createEvent = function(a, b, c, d) {
        var e;
        return (
          null == b && (b = !1),
          null == c && (c = !1),
          null == d && (d = null),
          null != document.createEvent
            ? ((e = document.createEvent("CustomEvent")),
              e.initCustomEvent(a, b, c, d))
            : null != document.createEventObject
              ? ((e = document.createEventObject()), (e.eventType = a))
              : (e.eventName = a),
          e
        );
      }),
      (a.prototype.emitEvent = function(a, b) {
        return null != a.dispatchEvent
          ? a.dispatchEvent(b)
          : b in (null != a)
            ? a[b]()
            : "on" + b in (null != a)
              ? a["on" + b]()
              : void 0;
      }),
      (a.prototype.addEvent = function(a, b, c) {
        return null != a.addEventListener
          ? a.addEventListener(b, c, !1)
          : null != a.attachEvent
            ? a.attachEvent("on" + b, c)
            : (a[b] = c);
      }),
      (a.prototype.removeEvent = function(a, b, c) {
        return null != a.removeEventListener
          ? a.removeEventListener(b, c, !1)
          : null != a.detachEvent
            ? a.detachEvent("on" + b, c)
            : delete a[b];
      }),
      (a.prototype.innerHeight = function() {
        return "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.clientHeight;
      }),
      a
    );
  })()),
    (c =
      this.WeakMap ||
      this.MozWeakMap ||
      (c = (function() {
        function a() {
          (this.keys = []), (this.values = []);
        }
        return (
          (a.prototype.get = function(a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
              if (((c = f[b]), c === a)) return this.values[b];
          }),
          (a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
              if (((d = g[c]), d === a)) return void (this.values[c] = b);
            return this.keys.push(a), this.values.push(b);
          }),
          a
        );
      })())),
    (a =
      this.MutationObserver ||
      this.WebkitMutationObserver ||
      this.MozMutationObserver ||
      (a = (function() {
        function a() {
          "undefined" != typeof console &&
            null !== console &&
            console.warn("MutationObserver is not supported by your browser."),
            "undefined" != typeof console &&
              null !== console &&
              console.warn(
                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
              );
        }
        return (a.notSupported = !0), (a.prototype.observe = function() {}), a;
      })())),
    (d =
      this.getComputedStyle ||
      function(a, b) {
        return (
          (this.getPropertyValue = function(b) {
            var c;
            return (
              "float" === b && (b = "styleFloat"),
              e.test(b) &&
                b.replace(e, function(a, b) {
                  return b.toUpperCase();
                }),
              (null != (c = a.currentStyle) ? c[b] : void 0) || null
            );
          }),
          this
        );
      }),
    (e = /(\-([a-z]){1})/g),
    (this.WOW = (function() {
      function e(a) {
        null == a && (a = {}),
          (this.scrollCallback = f(this.scrollCallback, this)),
          (this.scrollHandler = f(this.scrollHandler, this)),
          (this.resetAnimation = f(this.resetAnimation, this)),
          (this.start = f(this.start, this)),
          (this.scrolled = !0),
          (this.config = this.util().extend(a, this.defaults)),
          null != a.scrollContainer &&
            (this.config.scrollContainer = document.querySelector(
              a.scrollContainer
            )),
          (this.animationNameCache = new c()),
          (this.wowEvent = this.util().createEvent(this.config.boxClass));
      }
      return (
        (e.prototype.defaults = {
          boxClass: "wow",
          animateClass: "animated",
          offset: 0,
          mobile: !0,
          live: !0,
          callback: null,
          scrollContainer: null
        }),
        (e.prototype.init = function() {
          var a;
          return (
            (this.element = window.document.documentElement),
            "interactive" === (a = document.readyState) || "complete" === a
              ? this.start()
              : this.util().addEvent(document, "DOMContentLoaded", this.start),
            (this.finished = [])
          );
        }),
        (e.prototype.start = function() {
          var b, c, d, e;
          if (
            ((this.stopped = !1),
            (this.boxes = function() {
              var a, c, d, e;
              for (
                d = this.element.querySelectorAll("." + this.config.boxClass),
                  e = [],
                  a = 0,
                  c = d.length;
                c > a;
                a++
              )
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            (this.all = function() {
              var a, c, d, e;
              for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                (b = d[a]), e.push(b);
              return e;
            }.call(this)),
            this.boxes.length)
          )
            if (this.disabled()) this.resetStyle();
            else
              for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                (b = e[c]), this.applyStyle(b, !0);
          return (
            this.disabled() ||
              (this.util().addEvent(
                this.config.scrollContainer || window,
                "scroll",
                this.scrollHandler
              ),
              this.util().addEvent(window, "resize", this.scrollHandler),
              (this.interval = setInterval(this.scrollCallback, 50))),
            this.config.live
              ? new a(
                  (function(a) {
                    return function(b) {
                      var c, d, e, f, g;
                      for (g = [], c = 0, d = b.length; d > c; c++)
                        (f = b[c]),
                          g.push(
                            function() {
                              var a, b, c, d;
                              for (
                                c = f.addedNodes || [],
                                  d = [],
                                  a = 0,
                                  b = c.length;
                                b > a;
                                a++
                              )
                                (e = c[a]), d.push(this.doSync(e));
                              return d;
                            }.call(a)
                          );
                      return g;
                    };
                  })(this)
                ).observe(document.body, { childList: !0, subtree: !0 })
              : void 0
          );
        }),
        (e.prototype.stop = function() {
          return (
            (this.stopped = !0),
            this.util().removeEvent(
              this.config.scrollContainer || window,
              "scroll",
              this.scrollHandler
            ),
            this.util().removeEvent(window, "resize", this.scrollHandler),
            null != this.interval ? clearInterval(this.interval) : void 0
          );
        }),
        (e.prototype.sync = function(b) {
          return a.notSupported ? this.doSync(this.element) : void 0;
        }),
        (e.prototype.doSync = function(a) {
          var b, c, d, e, f;
          if ((null == a && (a = this.element), 1 === a.nodeType)) {
            for (
              a = a.parentNode || a,
                e = a.querySelectorAll("." + this.config.boxClass),
                f = [],
                c = 0,
                d = e.length;
              d > c;
              c++
            )
              (b = e[c]),
                g.call(this.all, b) < 0
                  ? (this.boxes.push(b),
                    this.all.push(b),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(b, !0),
                    f.push((this.scrolled = !0)))
                  : f.push(void 0);
            return f;
          }
        }),
        (e.prototype.show = function(a) {
          return (
            this.applyStyle(a),
            (a.className = a.className + " " + this.config.animateClass),
            null != this.config.callback && this.config.callback(a),
            this.util().emitEvent(a, this.wowEvent),
            this.util().addEvent(a, "animationend", this.resetAnimation),
            this.util().addEvent(a, "oanimationend", this.resetAnimation),
            this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation),
            this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
            a
          );
        }),
        (e.prototype.applyStyle = function(a, b) {
          var c, d, e;
          return (
            (d = a.getAttribute("data-wow-duration")),
            (c = a.getAttribute("data-wow-delay")),
            (e = a.getAttribute("data-wow-iteration")),
            this.animate(
              (function(f) {
                return function() {
                  return f.customStyle(a, b, d, c, e);
                };
              })(this)
            )
          );
        }),
        (e.prototype.animate = (function() {
          return "requestAnimationFrame" in window
            ? function(a) {
                return window.requestAnimationFrame(a);
              }
            : function(a) {
                return a();
              };
        })()),
        (e.prototype.resetStyle = function() {
          var a, b, c, d, e;
          for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), e.push((a.style.visibility = "visible"));
          return e;
        }),
        (e.prototype.resetAnimation = function(a) {
          var b;
          return a.type.toLowerCase().indexOf("animationend") >= 0
            ? ((b = a.target || a.srcElement),
              (b.className = b.className
                .replace(this.config.animateClass, "")
                .trim()))
            : void 0;
        }),
        (e.prototype.customStyle = function(a, b, c, d, e) {
          return (
            b && this.cacheAnimationName(a),
            (a.style.visibility = b ? "hidden" : "visible"),
            c && this.vendorSet(a.style, { animationDuration: c }),
            d && this.vendorSet(a.style, { animationDelay: d }),
            e && this.vendorSet(a.style, { animationIterationCount: e }),
            this.vendorSet(a.style, {
              animationName: b ? "none" : this.cachedAnimationName(a)
            }),
            a
          );
        }),
        (e.prototype.vendors = ["moz", "webkit"]),
        (e.prototype.vendorSet = function(a, b) {
          var c, d, e, f;
          d = [];
          for (c in b)
            (e = b[c]),
              (a["" + c] = e),
              d.push(
                function() {
                  var b, d, g, h;
                  for (
                    g = this.vendors, h = [], b = 0, d = g.length;
                    d > b;
                    b++
                  )
                    (f = g[b]),
                      h.push(
                        (a[
                          "" + f + c.charAt(0).toUpperCase() + c.substr(1)
                        ] = e)
                      );
                  return h;
                }.call(this)
              );
          return d;
        }),
        (e.prototype.vendorCSS = function(a, b) {
          var c, e, f, g, h, i;
          for (
            h = d(a),
              g = h.getPropertyCSSValue(b),
              f = this.vendors,
              c = 0,
              e = f.length;
            e > c;
            c++
          )
            (i = f[c]), (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
          return g;
        }),
        (e.prototype.animationName = function(a) {
          var b;
          try {
            b = this.vendorCSS(a, "animation-name").cssText;
          } catch (c) {
            b = d(a).getPropertyValue("animation-name");
          }
          return "none" === b ? "" : b;
        }),
        (e.prototype.cacheAnimationName = function(a) {
          return this.animationNameCache.set(a, this.animationName(a));
        }),
        (e.prototype.cachedAnimationName = function(a) {
          return this.animationNameCache.get(a);
        }),
        (e.prototype.scrollHandler = function() {
          return (this.scrolled = !0);
        }),
        (e.prototype.scrollCallback = function() {
          var a;
          return !this.scrolled ||
            ((this.scrolled = !1),
            (this.boxes = function() {
              var b, c, d, e;
              for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
              return e;
            }.call(this)),
            this.boxes.length || this.config.live)
            ? void 0
            : this.stop();
        }),
        (e.prototype.offsetTop = function(a) {
          for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
          for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
          return b;
        }),
        (e.prototype.isVisible = function(a) {
          var b, c, d, e, f;
          return (
            (c = a.getAttribute("data-wow-offset") || this.config.offset),
            (f =
              (this.config.scrollContainer &&
                this.config.scrollContainer.scrollTop) ||
              window.pageYOffset),
            (e =
              f +
              Math.min(this.element.clientHeight, this.util().innerHeight()) -
              c),
            (d = this.offsetTop(a)),
            (b = d + a.clientHeight),
            e >= d && b >= f
          );
        }),
        (e.prototype.util = function() {
          return null != this._util ? this._util : (this._util = new b());
        }),
        (e.prototype.disabled = function() {
          return (
            !this.config.mobile && this.util().isMobile(navigator.userAgent)
          );
        }),
        e
      );
    })());
}.call(this));

/* ============================================================
 * retina-replace.min.js v1.0
 * http://github.com/leonsmith/retina-replace-js
 * ============================================================
 * Author: Leon Smith
 * Twitter: @nullUK
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
(function(a) {
  var e = function(d, c) {
    this.options = c;
    var b = a(d),
      g = b.is("img"),
      f = g ? b.attr("src") : b.backgroundImageUrl(),
      f = this.options.generateUrl(b, f);
    a("<img/>")
      .attr("src", f)
      .load(function() {
        g
          ? b.attr("src", a(this).attr("src"))
          : (b.backgroundImageUrl(a(this).attr("src")),
            b.backgroundSize(a(this)[0].width, a(this)[0].height));
        b.attr("data-retina", "complete");
      });
  };
  e.prototype = { constructor: e };
  a.fn.retinaReplace = function(d) {
    var c;
    c = void 0 === window.devicePixelRatio ? 1 : window.devicePixelRatio;
    return 1 >= c
      ? this
      : this.each(function() {
          var b = a(this),
            c = b.data("retinaReplace"),
            f = a.extend(
              {},
              a.fn.retinaReplace.defaults,
              b.data(),
              "object" == typeof d && d
            );
          c || b.data("retinaReplace", (c = new e(this, f)));
          if ("string" == typeof d) c[d]();
        });
  };
  a.fn.retinaReplace.defaults = {
    suffix: "_2x",
    generateUrl: function(a, c) {
      var b = c.lastIndexOf("."),
        e = c.substr(b + 1);
      return c.substr(0, b) + this.suffix + "." + e;
    }
  };
  a.fn.retinaReplace.Constructor = e;
  a.fn.backgroundImageUrl = function(d) {
    return d
      ? this.each(function() {
          a(this).css("background-image", 'url("' + d + '")');
        })
      : a(this)
          .css("background-image")
          .replace(/url\(|\)|"|'/g, "");
  };
  a.fn.backgroundSize = function(d, c) {
    var b = Math.floor(d / 2) + "px " + Math.floor(c / 2) + "px";
    a(this).css("background-size", b);
    a(this).css("-webkit-background-size", b);
  };
  a(function() {
    a("[data-retina='true']").retinaReplace();
  });
})(window.jQuery);

/**
 * Owl Carousel v2.2.1
 * Copyright 2013-2017 David Deutsch
 * Licensed under  ()
 */
!(function(a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"]
        }
      }),
      a.each(
        ["onResize", "onThrottledResize"],
        a.proxy(function(b, c) {
          this._handlers[c] = a.proxy(this[c], this);
        }, this)
      ),
      a.each(
        e.Plugins,
        a.proxy(function(a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Workers,
        a.proxy(function(b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
  }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Type = { Event: "event", State: "state" }),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ["width", "settings"],
        run: function() {
          this._width = this.$element.width();
        }
      },
      {
        filter: ["width", "items", "settings"],
        run: function(a) {
          a.current = this._items && this._items[this.relative(this._current)];
        }
      },
      {
        filter: ["items", "settings"],
        run: function() {
          this.$stage.children(".cloned").remove();
        }
      },
      {
        filter: ["width", "items", "settings"],
        run: function(a) {
          var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
              width: "auto",
              "margin-left": d ? b : "",
              "margin-right": d ? "" : b
            };
          !c && this.$stage.children().css(e), (a.css = e);
        }
      },
      {
        filter: ["width", "items", "settings"],
        run: function(a) {
          var b =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
          for (a.items = { merge: !1, width: b }; d--; )
            (c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width());
          this._widths = f;
        }
      },
      {
        filter: ["items", "settings"],
        run: function() {
          var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
            h = "",
            i = "";
          for (g /= 2; g--; )
            b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i);
          (this._clones = b),
            a(h)
              .addClass("cloned")
              .appendTo(this.$stage),
            a(i)
              .addClass("cloned")
              .prependTo(this.$stage);
        }
      },
      {
        filter: ["width", "items", "settings"],
        run: function() {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          )
            (d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a);
          this._coordinates = f;
        }
      },
      {
        filter: ["width", "items", "settings"],
        run: function() {
          var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
              width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
              "padding-left": a || "",
              "padding-right": a || ""
            };
          this.$stage.css(c);
        }
      },
      {
        filter: ["width", "items", "settings"],
        run: function(a) {
          var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
          if (c && a.items.merge)
            for (; b--; )
              (a.css.width = this._widths[this.relative(b)]),
                d.eq(b).css(a.css);
          else c && ((a.css.width = a.items.width), d.css(a.css));
        }
      },
      {
        filter: ["items"],
        run: function() {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        }
      },
      {
        filter: ["width", "items", "settings"],
        run: function(a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current);
        }
      },
      {
        filter: ["position"],
        run: function() {
          this.animate(this.coordinates(this._current));
        }
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function() {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass("active"),
            this.settings.center &&
              (this.$stage.children(".center").removeClass("center"),
              this.$stage
                .children()
                .eq(this.current())
                .addClass("center"));
        }
      }
    ]),
    (e.prototype.initialize = function() {
      if (
        (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading"))
      ) {
        var b, c, e;
        (b = this.$element.find("img")),
          (c = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (e = this.$element.children(c).width()),
          b.length && e <= 0 && this.preloadAutoWidthImages(b);
      }
      this.$element.addClass(this.options.loadingClass),
        (this.$stage = a(
          "<" +
            this.settings.stageElement +
            ' class="' +
            this.settings.stageClass +
            '"/>'
        ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
        this.$element.append(this.$stage.parent()),
        this.replace(this.$element.children().not(this.$stage.parent())),
        this.$element.is(":visible")
          ? this.refresh()
          : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (e.prototype.setup = function() {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          "function" == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + d
                )
            ))
        : (e = a.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: e } }),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings }
        });
    }),
    (e.prototype.optionsLogic = function() {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function(b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function() {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function(a) {
            return this[a];
          }, this._invalidated),
          e = {};
        b < c;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (e.prototype.width = function(a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function() {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (e.prototype.onThrottledResize = function() {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function() {
      return (
        !!this._items.length &&
        (this._width !== this.$element.width() &&
          (!!this.$element.is(":visible") &&
            (this.enter("resizing"),
            this.trigger("resize").isDefaultPrevented()
              ? (this.leave("resizing"), !1)
              : (this.invalidate("width"),
                this.refresh(),
                this.leave("resizing"),
                void this.trigger("resized")))))
      );
    }),
    (e.prototype.registerEventHandlers = function() {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + ".owl.core",
          a.proxy(this.onTransitionEnd, this)
        ),
        this.settings.responsive !== !1 &&
          this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
          this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
            return !1;
          })),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            a.proxy(this.onDragEnd, this)
          ));
    }),
    (e.prototype.onDragStart = function(b) {
      var d = null;
      3 !== b.which &&
        (a.support.transform
          ? ((d = this.$stage
              .css("transform")
              .replace(/.*\(|\)| /g, "")
              .split(",")),
            (d = {
              x: d[16 === d.length ? 12 : 4],
              y: d[16 === d.length ? 13 : 5]
            }))
          : ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl
                ? d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : d.left,
              y: d.top
            })),
        this.is("animating") &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === b.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function(b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) ||
                (b.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (e.prototype.onDragMove = function(a) {
      var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
      this.is("dragging") &&
        (a.preventDefault(),
        this.settings.loop
          ? ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b))
          : ((b = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (c = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x));
    }),
    (e.prototype.onDragEnd = function(b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function() {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (e.prototype.closest = function(b, c) {
      var d = -1,
        e = 30,
        f = this.width(),
        g = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            g,
            a.proxy(function(a, h) {
              return (
                "left" === c && b > h - e && b < h + e
                  ? (d = a)
                  : "right" === c && b > h - f - e && b < h - f + e
                    ? (d = a + 1)
                    : this.op(b, "<", h) &&
                      this.op(b, ">", g[a + 1] || h - f) &&
                      (d = "left" === c ? a + 1 : a),
                d === -1
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", g[this.minimum()])
            ? (d = b = this.minimum())
            : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum())),
        d
      );
    }),
    (e.prototype.animate = function(b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px,0px)",
              transition: this.speed() / 1e3 + "s"
            })
          : c
            ? this.$stage.animate(
                { left: b + "px" },
                this.speed(),
                this.settings.fallbackEasing,
                a.proxy(this.onTransitionEnd, this)
              )
            : this.$stage.css({ left: b + "px" });
    }),
    (e.prototype.is = function(a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (e.prototype.current = function(a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a }
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current }
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function(b) {
      return (
        "string" === a.type(b) &&
          ((this._invalidated[b] = !0),
          this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function(a, b) {
          return b;
        })
      );
    }),
    (e.prototype.reset = function(a) {
      (a = this.normalize(a)),
        a !== d &&
          ((this._speed = 0),
          (this._current = a),
          this.suppress(["translate", "translated"]),
          this.animate(this.coordinates(a)),
          this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function(a, b) {
      var c = this._items.length,
        e = b ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || c < 1
          ? (a = d)
          : (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      );
    }),
    (e.prototype.relative = function(a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (e.prototype.maximum = function(a) {
      var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
        for (
          b = this._items.length,
            c = this._items[--b].width(),
            d = this.$element.width();
          b-- &&
          ((c += this._items[b].width() + this.settings.margin), !(c > d));

        );
        f = b + 1;
      } else
        f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }),
    (e.prototype.minimum = function(a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function(a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function(a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function(b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function(a) {
          return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function(a, b) {
            return f(b);
          })
        : a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function(a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function(b) {
      var c,
        e = 1,
        f = b - 1;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function(a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)));
    }),
    (e.prototype.duration = function(a, b, c) {
      return 0 === c
        ? 0
        : Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed);
    }),
    (e.prototype.to = function(a, b) {
      var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += f * -1 * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h),
          d !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c)))
        : this.settings.rewind
          ? ((i += 1), (a = ((a % i) + i) % i))
          : (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.$element.is(":visible") && this.update();
    }),
    (e.prototype.next = function(a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function(a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.onTransitionEnd = function(a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1;
      this.leave("animating"), this.trigger("translated");
    }),
    (e.prototype.viewport = function() {
      var d;
      return (
        this.options.responsiveBaseElement !== b
          ? (d = a(this.options.responsiveBaseElement).width())
          : b.innerWidth
            ? (d = b.innerWidth)
            : c.documentElement && c.documentElement.clientWidth
              ? (d = c.documentElement.clientWidth)
              : console.warn("Can not detect viewport width."),
        d
      );
    }),
    (e.prototype.replace = function(b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function() {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function(a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function(b, c) {
      var e = this.relative(this._current);
      (c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger("add", { content: b, position: c }),
        (b = this.prepare(b)),
        0 === this._items.length || c === this._items.length
          ? (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", { content: b, position: c });
    }),
    (e.prototype.remove = function(a) {
      (a = this.normalize(a, !0)),
        a !== d &&
          (this.trigger("remove", { content: this._items[a], position: a }),
          this._items[a].remove(),
          this._items.splice(a, 1),
          this._mergers.splice(a, 1),
          this.invalidate("items"),
          this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.preloadAutoWidthImages = function(b) {
      b.each(
        a.proxy(function(b, c) {
          this.enter("pre-loading"),
            (c = a(c)),
            a(new Image())
              .one(
                "load",
                a.proxy(function(a) {
                  c.attr("src", a.target.src),
                    c.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (e.prototype.destroy = function() {
      this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        this.settings.responsive !== !1 &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, "resize", this._handlers.onThrottledResize));
      for (var d in this._plugins) this._plugins[d].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage
          .children()
          .contents()
          .unwrap(),
        this.$stage.children().unwrap(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (e.prototype.op = function(a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : a < c;
        case ">":
          return d ? a < c : a > c;
        case ">=":
          return d ? a <= c : a >= c;
        case "<=":
          return d ? a >= c : a <= c;
      }
    }),
    (e.prototype.on = function(a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function(a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function(b, c, d, f, g) {
      var h = { item: { count: this._items.length, index: this.current() } },
        i = a.camelCase(
          a
            .grep(["on", b, d], function(a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        j = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, h, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j);
          }),
          this.register({ type: e.Type.Event, name: b }),
          this.$element.trigger(j),
          this.settings &&
            "function" == typeof this.settings[i] &&
            this.settings[i].call(this, j)),
        j
      );
    }),
    (e.prototype.enter = function(b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function(a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++;
        }, this)
      );
    }),
    (e.prototype.leave = function(b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function(a, b) {
          this._states.current[b]--;
        }, this)
      );
    }),
    (e.prototype.register = function(b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          var c = a.event.special[b.name]._default;
          (a.event.special[b.name]._default = function(a) {
            return !c ||
              !c.apply ||
              (a.namespace && a.namespace.indexOf("owl") !== -1)
              ? a.namespace && a.namespace.indexOf("owl") > -1
              : c.apply(this, arguments);
          }),
            (a.event.special[b.name].owl = !0);
        }
      } else
        b.type === e.Type.State &&
          (this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function(c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this)
          )));
    }),
    (e.prototype.suppress = function(b) {
      a.each(
        b,
        a.proxy(function(a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function(b) {
      a.each(
        b,
        a.proxy(function(a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.pointer = function(a) {
      var c = { x: null, y: null };
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
              ? a.changedTouches[0]
              : a),
        a.pageX
          ? ((c.x = a.pageX), (c.y = a.pageY))
          : ((c.x = a.clientX), (c.y = a.clientY)),
        c
      );
    }),
    (e.prototype.isNumeric = function(a) {
      return !isNaN(parseFloat(a));
    }),
    (e.prototype.difference = function(a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }),
    (a.fn.owlCarousel = function(b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function() {
        var d = a(this),
          f = d.data("owl.carousel");
        f ||
          ((f = new e(this, "object" == typeof b && b)),
          d.data("owl.carousel", f),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove"
            ],
            function(b, c) {
              f.register({ type: e.Type.Event, name: c }),
                f.$element.on(
                  c + ".owl.carousel.core",
                  a.proxy(function(a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]));
                  }, f)
                );
            }
          )),
          "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this)
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (e.prototype.watch = function() {
        this._interval ||
          ((this._visible = this._core.$element.is(":visible")),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (e.prototype.refresh = function() {
        this._core.$element.is(":visible") !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (e.prototype.destroy = function() {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(
            function(b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && "position" == b.property.name) ||
                  "initialized" == b.type)
              )
                for (
                  var c = this._core.settings,
                    e = (c.center && Math.ceil(c.items / 2)) || c.items,
                    f = (c.center && e * -1) || 0,
                    g =
                      (b.property && b.property.value !== d
                        ? b.property.value
                        : this._core.current()) + f,
                    h = this._core.clones().length,
                    i = a.proxy(function(a, b) {
                      this.load(b);
                    }, this);
                  f++ < e;

                )
                  this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++;
            },
            this
          )
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { lazyLoad: !1 }),
      (e.prototype.load = function(c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function(c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function() {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function() {
                      f.css({
                        "background-image": 'url("' + g + '")',
                        opacity: "1"
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function(
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              "position" == a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function(a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this)
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (e.prototype.update = function() {
        var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.$stage
            .children()
            .toArray()
            .slice(b, c),
          e = [],
          f = 0;
        a.each(d, function(b, c) {
          e.push(a(c).height());
        }),
          (f = Math.max.apply(null, e)),
          this._core.$stage
            .parent()
            .height(f)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (e.prototype.destroy = function() {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"]
              });
          }, this),
          "resize.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refreshed.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              "position" === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function(b) {
            if (b.namespace) {
              var c = a(b.content).find(".owl-video");
              c.length &&
                (c.css("display", "none"), this.fetch(c, a(b.content)));
            }
          }, this)
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function(a) {
            this.play(a);
          }, this)
        );
    };
    (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (e.prototype.fetch = function(a, b) {
        var c = (function() {
            return a.attr("data-vimeo-id")
              ? "vimeo"
              : a.attr("data-vzaar-id")
                ? "vzaar"
                : "youtube";
          })(),
          d =
            a.attr("data-vimeo-id") ||
            a.attr("data-youtube-id") ||
            a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
          if (!(d[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          c = "vzaar";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (e.prototype.thumbnail = function(b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"'
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function(a) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? '<div class="owl-video-tn ' +
                  j +
                  '" ' +
                  i +
                  '="' +
                  a +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  a +
                  ')"></div>'),
              b.after(d),
              b.after(e);
          };
        if (
          (b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length)
        )
          return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type
          ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
          : "vimeo" === c.type
            ? a.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + c.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(a) {
                  (f = a[0].thumbnail_large), l(f);
                }
              })
            : "vzaar" === c.type &&
              a.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + c.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(a) {
                  (f = a.framegrab_url), l(f);
                }
              });
      }),
      (e.prototype.stop = function() {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (e.prototype.play = function(b) {
        var c,
          d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          "youtube" === f.type
            ? (c =
                '<iframe width="' +
                g +
                '" height="' +
                h +
                '" src="//www.youtube.com/embed/' +
                f.id +
                "?autoplay=1&rel=0&v=" +
                f.id +
                '" frameborder="0" allowfullscreen></iframe>')
            : "vimeo" === f.type
              ? (c =
                  '<iframe src="//player.vimeo.com/video/' +
                  f.id +
                  '?autoplay=1" width="' +
                  g +
                  '" height="' +
                  h +
                  '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
              : "vzaar" === f.type &&
                (c =
                  '<iframe frameborder="0"height="' +
                  h +
                  '"width="' +
                  g +
                  '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                  f.id +
                  '/player?autoplay=true"></iframe>'),
          a('<div class="owl-video-frame">' + c + "</div>").insertAfter(
            e.find(".owl-video")
          ),
          (this._playing = e.addClass("owl-video-playing")));
      }),
      (e.prototype.isInFullScreen = function() {
        var b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return (
          b &&
          a(b)
            .parent()
            .hasClass("owl-video-frame")
        );
      }),
      (e.prototype.destroy = function() {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(
            function(a) {
              a.namespace && (this.swapping = "translated" == a.type);
            },
            this
          ),
          "translate.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this)
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function() {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass("animated owl-animated-in")
                .addClass(f));
        }
      }),
      (e.prototype.clear = function(b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function() {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._timeout = null),
        (this._paused = !1),
        (this._handlers = {
          "changed.owl.carousel": a.proxy(function(a) {
            a.namespace && "settings" === a.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                "position" === a.property.name &&
                this._core.settings.autoplay &&
                this._setAutoPlayInterval();
          }, this),
          "initialized.owl.carousel": a.proxy(function(a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": a.proxy(function(a, b, c) {
            a.namespace && this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function(a) {
            a.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function() {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function() {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": a.proxy(function() {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": a.proxy(function() {
            this._core.settings.autoplayHoverPause && this.play();
          }, this)
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options));
    };
    (e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1
    }),
      (e.prototype.play = function(a, b) {
        (this._paused = !1),
          this._core.is("rotating") ||
            (this._core.enter("rotating"), this._setAutoPlayInterval());
      }),
      (e.prototype._getNextTimeout = function(d, e) {
        return (
          this._timeout && b.clearTimeout(this._timeout),
          b.setTimeout(
            a.proxy(function() {
              this._paused ||
                this._core.is("busy") ||
                this._core.is("interacting") ||
                c.hidden ||
                this._core.next(e || this._core.settings.autoplaySpeed);
            }, this),
            d || this._core.settings.autoplayTimeout
          )
        );
      }),
      (e.prototype._setAutoPlayInterval = function() {
        this._timeout = this._getNextTimeout();
      }),
      (e.prototype.stop = function() {
        this._core.is("rotating") &&
          (b.clearTimeout(this._timeout), this._core.leave("rotating"));
      }),
      (e.prototype.pause = function() {
        this._core.is("rotating") && (this._paused = !0);
      }),
      (e.prototype.destroy = function() {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    "use strict";
    var e = function(b) {
      (this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function(b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "changed.owl.carousel": a.proxy(function(a) {
            a.namespace && "position" == a.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": a.proxy(function(a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this)
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: ["prev", "next"],
      navSpeed: !1,
      navElement: "div",
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1
    }),
      (e.prototype.initialize = function() {
        var b,
          c = this._core.settings;
        (this._controls.$relative = (c.navContainer
          ? a(c.navContainer)
          : a("<div>")
              .addClass(c.navContainerClass)
              .appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = a("<" + c.navElement + ">")
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function(a) {
                this.prev(c.navSpeed);
              }, this)
            )),
          (this._controls.$next = a("<" + c.navElement + ">")
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function(a) {
                this.next(c.navSpeed);
              }, this)
            )),
          c.dotsData ||
            (this._templates = [
              a("<div>")
                .addClass(c.dotClass)
                .append(a("<span>"))
                .prop("outerHTML")
            ]),
          (this._controls.$absolute = (c.dotsContainer
            ? a(c.dotsContainer)
            : a("<div>")
                .addClass(c.dotsClass)
                .appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "div",
            a.proxy(function(b) {
              var d = a(b.target)
                .parent()
                .is(this._controls.$absolute)
                ? a(b.target).index()
                : a(b.target)
                    .parent()
                    .index();
              b.preventDefault(), this.to(d, c.dotsSpeed);
            }, this)
          );
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
      }),
      (e.prototype.destroy = function() {
        var a, b, c, d;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (e.prototype.update = function() {
        var a,
          b,
          c,
          d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if (
          ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || "page" == g.slideBy)
        )
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1
                }),
                Math.min(f, a - d) === f)
              )
                break;
              (b = 0), ++c;
            }
            b += this._core.mergers(this._core.relative(a));
          }
      }),
      (e.prototype.draw = function() {
        var b,
          c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !f && e <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !f && e >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && 0 !== b
              ? this._controls.$absolute.html(this._templates.join(""))
              : b > 0
                ? this._controls.$absolute.append(
                    new Array(b + 1).join(this._templates[0])
                  )
                : b < 0 &&
                  this._controls.$absolute
                    .children()
                    .slice(b)
                    .remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (e.prototype.onTrigger = function(b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
        };
      }),
      (e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function(a, c) {
              return a.start <= b && a.end >= b;
            }, this)
          )
          .pop();
      }),
      (e.prototype.getPosition = function(b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (e.prototype.to = function(b, c, d) {
        var e;
        !d && this._pages.length
          ? ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ))
          : a.proxy(this._overrides.to, this._core)(b, c);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    "use strict";
    var e = function(c) {
      (this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function(c) {
            c.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function(b) {
            if (b.namespace) {
              var c = a(b.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!c) return;
              this._hashes[c] = b.content;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function(c) {
            if (c.namespace && "position" === c.property.name) {
              var d = this._core.items(
                  this._core.relative(this._core.current())
                ),
                e = a
                  .map(this._hashes, function(a, b) {
                    return a === d ? b : null;
                  })
                  .join();
              if (!e || b.location.hash.slice(1) === e) return;
              b.location.hash = e;
            }
          }, this)
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function(a) {
            var c = b.location.hash.substring(1),
              e = this._core.$stage.children(),
              f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0);
          }, this)
        );
    };
    (e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function() {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    function e(b, c) {
      var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
      return (
        a.each((b + " " + h.join(f + " ") + f).split(" "), function(a, b) {
          if (g[b] !== d) return (e = !c || b), !1;
        }),
        e
      );
    }
    function f(a) {
      return e(a, !0);
    }
    var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend"
          }
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend"
          }
        }
      },
      j = {
        csstransforms: function() {
          return !!e("transform");
        },
        csstransforms3d: function() {
          return !!e("perspective");
        },
        csstransitions: function() {
          return !!e("transition");
        },
        cssanimations: function() {
          return !!e("animation");
        }
      };
    j.csstransitions() &&
      ((a.support.transition = new String(f("transition"))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f("animation"))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f("transform"))),
        (a.support.transform3d = j.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */
!(function(s) {
  "use strict";
  function e(s) {
    return new RegExp("(^|\\s+)" + s + "(\\s+|$)");
  }
  function n(s, e) {
    (a(s, e) ? c : t)(s, e);
  }
  var a, t, c;
  "classList" in document.documentElement
    ? ((a = function(s, e) {
        return s.classList.contains(e);
      }),
      (t = function(s, e) {
        s.classList.add(e);
      }),
      (c = function(s, e) {
        s.classList.remove(e);
      }))
    : ((a = function(s, n) {
        return e(n).test(s.className);
      }),
      (t = function(s, e) {
        a(s, e) || (s.className = s.className + " " + e);
      }),
      (c = function(s, n) {
        s.className = s.className.replace(e(n), " ");
      }));
  var i = {
    hasClass: a,
    addClass: t,
    removeClass: c,
    toggleClass: n,
    has: a,
    add: t,
    remove: c,
    toggle: n
  };
  "function" == typeof define && define.amd ? define(i) : (s.classie = i);
})(window);

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!(function(a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function(a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function() {},
    u = !!window.jQuery,
    v = a(window),
    w = function(a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function(b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function(c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function(c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function() {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function() {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function() {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function(c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function() {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function(a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function(a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function() {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function() {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function() {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function() {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function() {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function(a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function() {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function(a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function(c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function(a, c) {
      var d = function(d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function(c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function(a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function(a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function(c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function(a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function(a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function(a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function() {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function(c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function(b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function(c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                  ? f.is("img")
                    ? f.attr("src", d)
                    : f.replaceWith(
                        a("<img>")
                          .attr("src", d)
                          .attr("class", f.attr("class"))
                      )
                  : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function() {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    }
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function(b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function() {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function(b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0
      }
    }),
    (a.fn.magnificPopup = function(c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function() {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function() {
        b.types.push(F),
          w(h + "." + F, function() {
            G();
          });
      },
      getInline: function(c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f
                .after(D)
                .detach()
                .removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      }
    }
  });
  var H,
    I = "ajax",
    J = function() {
      H && a(document.body).removeClass(H);
    },
    K = function() {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function() {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function(c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function(d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function() {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function() {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            }
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      }
    }
  });
  var L,
    M = function(c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function() {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function() {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function() {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function() {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function(a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function(a) {
        var c = 0,
          d = a.img[0],
          e = function(f) {
            L && clearInterval(L),
              (L = setInterval(function() {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                        ? e(50)
                        : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function(c, d) {
        var e = 0,
          f = function() {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function() {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j)
              .on("load.mfploader", f)
              .on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      }
    }
  });
  var N,
    O = function() {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function(a) {
        return a.is("img") ? a : a.find("img");
      }
    },
    proto: {
      initZoom: function() {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function(a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden"
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function() {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function() {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function() {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function() {
                      k(),
                        setTimeout(function() {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function() {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function() {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function() {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function() {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function() {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function(c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      }
    }
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function(a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" }
      }
    },
    proto: {
      initIframe: function() {
        b.types.push(P),
          w("BeforeChange", function(a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function() {
            R();
          });
      },
      getIframe: function(c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function() {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      }
    }
  });
  var S = function(a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function(a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function() {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function() {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function() {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function(a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function(a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function(a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function() {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function() {
                    b.prev();
                  }),
                    f.click(function() {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function() {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function() {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function() {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function() {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function() {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function(a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function() {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function(c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function() {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function() {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      }
    }
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function(a) {
        return a.src.replace(/\.\w+$/, function(a) {
          return "@2x" + a;
        });
      },
      ratio: 1
    },
    proto: {
      initRetina: function() {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function(a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%"
                });
              }),
              w("ElementParse." + U, function(b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      }
    }
  }),
    A();
});

/**
RESIZESENSOR.JS
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
!(function() {
  var e = function(t, i) {
    function s() {
      (this.q = []),
        (this.add = function(e) {
          this.q.push(e);
        });
      var e, t;
      this.call = function() {
        for (e = 0, t = this.q.length; e < t; e++) this.q[e].call();
      };
    }
    function o(e, t) {
      return e.currentStyle
        ? e.currentStyle[t]
        : window.getComputedStyle
          ? window.getComputedStyle(e, null).getPropertyValue(t)
          : e.style[t];
    }
    function n(e, t) {
      if (e.resizedAttached) {
        if (e.resizedAttached) return void e.resizedAttached.add(t);
      } else (e.resizedAttached = new s()), e.resizedAttached.add(t);
      (e.resizeSensor = document.createElement("div")),
        (e.resizeSensor.className = "resize-sensor");
      var i =
          "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;",
        n = "position: absolute; left: 0; top: 0; transition: 0s;";
      (e.resizeSensor.style.cssText = i),
        (e.resizeSensor.innerHTML =
          '<div class="resize-sensor-expand" style="' +
          i +
          '"><div style="' +
          n +
          '"></div></div><div class="resize-sensor-shrink" style="' +
          i +
          '"><div style="' +
          n +
          ' width: 200%; height: 200%"></div></div>'),
        e.appendChild(e.resizeSensor),
        { fixed: 1, absolute: 1 }[o(e, "position")] ||
          (e.style.position = "relative");
      var d,
        r,
        l = e.resizeSensor.childNodes[0],
        c = l.childNodes[0],
        h = e.resizeSensor.childNodes[1],
        a = (h.childNodes[0],
        function() {
          (c.style.width = l.offsetWidth + 10 + "px"),
            (c.style.height = l.offsetHeight + 10 + "px"),
            (l.scrollLeft = l.scrollWidth),
            (l.scrollTop = l.scrollHeight),
            (h.scrollLeft = h.scrollWidth),
            (h.scrollTop = h.scrollHeight),
            (d = e.offsetWidth),
            (r = e.offsetHeight);
        });
      a();
      var f = function() {
          e.resizedAttached && e.resizedAttached.call();
        },
        u = function(e, t, i) {
          e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i);
        },
        p = function() {
          (e.offsetWidth == d && e.offsetHeight == r) || f(), a();
        };
      u(l, "scroll", p), u(h, "scroll", p);
    }
    var d = Object.prototype.toString.call(t),
      r =
        "[object Array]" === d ||
        "[object NodeList]" === d ||
        "[object HTMLCollection]" === d ||
        ("undefined" != typeof jQuery && t instanceof jQuery) ||
        ("undefined" != typeof Elements && t instanceof Elements);
    if (r) for (var l = 0, c = t.length; l < c; l++) n(t[l], i);
    else n(t, i);
    this.detach = function() {
      if (r) for (var i = 0, s = t.length; i < s; i++) e.detach(t[i]);
      else e.detach(t);
    };
  };
  (e.detach = function(e) {
    e.resizeSensor &&
      (e.removeChild(e.resizeSensor),
      delete e.resizeSensor,
      delete e.resizedAttached);
  }),
    "undefined" != typeof module && "undefined" != typeof module.exports
      ? (module.exports = e)
      : (window.ResizeSensor = e);
})();
//# sourceMappingURL=maps/ResizeSensor.min.js.map

/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */
/*!
 * Theia Sticky Sidebar v1.7.0
 * https://github.com/WeCodePixels/theia-sticky-sidebar
 *
 * Glues your website's sidebars, making them permanently visible while scrolling.
 *
 * Copyright 2013-2016 WeCodePixels and other contributors
 * Released under the MIT license
 */

!(function(i) {
  i.fn.theiaStickySidebar = function(t) {
    function e(t, e) {
      return (
        !0 === t.initialized ||
        (!(i("body").width() < t.minWidth) && (o(t, e), !0))
      );
    }
    function o(t, e) {
      (t.initialized = !0),
        0 === i("#theia-sticky-sidebar-stylesheet-" + t.namespace).length &&
          i("head").append(
            i(
              '<style id="theia-sticky-sidebar-stylesheet-' +
                t.namespace +
                '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'
            )
          ),
        e.each(function() {
          function e() {
            (n.fixedScrollTop = 0),
              n.sidebar.css({ "min-height": "1px" }),
              n.stickySidebar.css({
                position: "static",
                width: "",
                transform: "none"
              });
          }
          function o(t) {
            var e = t.height();
            return (
              t.children().each(function() {
                e = Math.max(e, i(this).height());
              }),
              e
            );
          }
          var n = {};
          if (
            ((n.sidebar = i(this)),
            (n.options = t || {}),
            (n.container = i(n.options.containerSelector)),
            0 == n.container.length && (n.container = n.sidebar.parent()),
            n.sidebar
              .parents(":not(.theia-exception)")
              .css("-webkit-transform", "none"),
            n.sidebar.css({
              position: n.options.defaultPosition,
              overflow: "visible",
              "-webkit-box-sizing": "border-box",
              "-moz-box-sizing": "border-box",
              "box-sizing": "border-box"
            }),
            (n.stickySidebar = n.sidebar.find(".theiaStickySidebar")),
            0 == n.stickySidebar.length)
          ) {
            var s = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
            n.sidebar
              .find("script")
              .filter(function(i, t) {
                return 0 === t.type.length || t.type.match(s);
              })
              .remove(),
              (n.stickySidebar = i("<div>")
                .addClass("theiaStickySidebar")
                .append(n.sidebar.children())),
              n.sidebar.append(n.stickySidebar);
          }
          (n.marginBottom = parseInt(n.sidebar.css("margin-bottom"))),
            (n.paddingTop = parseInt(n.sidebar.css("padding-top"))),
            (n.paddingBottom = parseInt(n.sidebar.css("padding-bottom")));
          var d = n.stickySidebar.offset().top,
            r = n.stickySidebar.outerHeight();
          n.stickySidebar.css("padding-top", 1),
            n.stickySidebar.css("padding-bottom", 1),
            (d -= n.stickySidebar.offset().top),
            (r = n.stickySidebar.outerHeight() - r - d),
            0 == d
              ? (n.stickySidebar.css("padding-top", 0),
                (n.stickySidebarPaddingTop = 0))
              : (n.stickySidebarPaddingTop = 1),
            0 == r
              ? (n.stickySidebar.css("padding-bottom", 0),
                (n.stickySidebarPaddingBottom = 0))
              : (n.stickySidebarPaddingBottom = 1),
            (n.previousScrollTop = null),
            (n.fixedScrollTop = 0),
            e(),
            (n.onScroll = function(n) {
              if (n.stickySidebar.is(":visible"))
                if (i("body").width() < n.options.minWidth) e();
                else if (
                  n.options.disableOnResponsiveLayouts &&
                  n.sidebar.outerWidth("none" == n.sidebar.css("float")) + 50 >
                    n.container.width()
                )
                  e();
                else {
                  var s = i(document).scrollTop(),
                    d = "static";
                  if (
                    s >=
                    n.sidebar.offset().top +
                      (n.paddingTop - n.options.additionalMarginTop)
                  ) {
                    var r,
                      c = n.paddingTop + t.additionalMarginTop,
                      p =
                        n.paddingBottom +
                        n.marginBottom +
                        t.additionalMarginBottom,
                      b = n.sidebar.offset().top,
                      l = n.sidebar.offset().top + o(n.container),
                      f = 0 + t.additionalMarginTop;
                    r =
                      n.stickySidebar.outerHeight() + c + p < i(window).height()
                        ? f + n.stickySidebar.outerHeight()
                        : i(window).height() -
                          n.marginBottom -
                          n.paddingBottom -
                          t.additionalMarginBottom;
                    var h = b - s + n.paddingTop,
                      g = l - s - n.paddingBottom - n.marginBottom,
                      u = n.stickySidebar.offset().top - s,
                      S = n.previousScrollTop - s;
                    "fixed" == n.stickySidebar.css("position") &&
                      "modern" == n.options.sidebarBehavior &&
                      (u += S),
                      "stick-to-top" == n.options.sidebarBehavior &&
                        (u = t.additionalMarginTop),
                      "stick-to-bottom" == n.options.sidebarBehavior &&
                        (u = r - n.stickySidebar.outerHeight()),
                      (u =
                        S > 0
                          ? Math.min(u, f)
                          : Math.max(u, r - n.stickySidebar.outerHeight())),
                      (u = Math.max(u, h)),
                      (u = Math.min(u, g - n.stickySidebar.outerHeight()));
                    var m =
                      n.container.height() == n.stickySidebar.outerHeight();
                    d =
                      (m || u != f) &&
                      (m || u != r - n.stickySidebar.outerHeight())
                        ? s + u - n.sidebar.offset().top - n.paddingTop <=
                          t.additionalMarginTop
                          ? "static"
                          : "absolute"
                        : "fixed";
                  }
                  if ("fixed" == d) {
                    var y = i(document).scrollLeft();
                    n.stickySidebar.css({
                      position: "fixed",
                      width: a(n.stickySidebar) + "px",
                      transform: "translateY(" + u + "px)",
                      left:
                        n.sidebar.offset().left +
                        parseInt(n.sidebar.css("padding-left")) -
                        y +
                        "px",
                      top: "0px"
                    });
                  } else if ("absolute" == d) {
                    var k = {};
                    "absolute" != n.stickySidebar.css("position") &&
                      ((k.position = "absolute"),
                      (k.transform =
                        "translateY(" +
                        (s +
                          u -
                          n.sidebar.offset().top -
                          n.stickySidebarPaddingTop -
                          n.stickySidebarPaddingBottom) +
                        "px)"),
                      (k.top = "0px")),
                      (k.width = a(n.stickySidebar) + "px"),
                      (k.left = ""),
                      n.stickySidebar.css(k);
                  } else "static" == d && e();
                  "static" != d &&
                    1 == n.options.updateSidebarHeight &&
                    n.sidebar.css({
                      "min-height":
                        n.stickySidebar.outerHeight() +
                        n.stickySidebar.offset().top -
                        n.sidebar.offset().top +
                        n.paddingBottom
                    }),
                    (n.previousScrollTop = s);
                }
            }),
            n.onScroll(n),
            i(document).on(
              "scroll." + n.options.namespace,
              (function(i) {
                return function() {
                  i.onScroll(i);
                };
              })(n)
            ),
            i(window).on(
              "resize." + n.options.namespace,
              (function(i) {
                return function() {
                  i.stickySidebar.css({ position: "static" }), i.onScroll(i);
                };
              })(n)
            ),
            "undefined" != typeof ResizeSensor &&
              new ResizeSensor(
                n.stickySidebar[0],
                (function(i) {
                  return function() {
                    i.onScroll(i);
                  };
                })(n)
              );
        });
    }
    function a(i) {
      var t;
      try {
        t = i[0].getBoundingClientRect().width;
      } catch (i) {}
      return void 0 === t && (t = i.width()), t;
    }
    var n = {
      containerSelector: "",
      additionalMarginTop: 0,
      additionalMarginBottom: 0,
      updateSidebarHeight: !0,
      minWidth: 0,
      disableOnResponsiveLayouts: !0,
      sidebarBehavior: "modern",
      defaultPosition: "relative",
      namespace: "TSS"
    };
    return (
      (t = i.extend(n, t)),
      (t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0),
      (t.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0),
      (function(t, o) {
        e(t, o) ||
          (console.log(
            "TSS: Body width smaller than options.minWidth. Init is delayed."
          ),
          i(document).on(
            "scroll." + t.namespace,
            (function(t, o) {
              return function(a) {
                e(t, o) && i(this).unbind(a);
              };
            })(t, o)
          ),
          i(window).on(
            "resize." + t.namespace,
            (function(t, o) {
              return function(a) {
                e(t, o) && i(this).unbind(a);
              };
            })(t, o)
          ));
      })(t, this),
      this
    );
  };
})(jQuery);
//# sourceMappingURL=maps/theia-sticky-sidebar.min.js.map

/*!
 * jQuery Selectbox plugin 0.2
 *
 * Copyright 2011-2012, Dimitar Ivanov (http://www.bulgaria-web-developers.com/projects/javascript/selectbox/)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 *
 * Date: Tue Jul 17 19:58:36 2012 +0300
 */
!(function(e, s) {
  function t() {
    (this._state = []),
      (this._defaults = {
        classHolder: "sbHolder",
        classHolderDisabled: "sbHolderDisabled",
        classSelector: "sbSelector",
        classOptions: "sbOptions",
        classGroup: "sbGroup",
        classSub: "sbSub",
        classDisabled: "sbDisabled",
        classToggleOpen: "sbToggleOpen",
        classToggle: "sbToggle",
        classFocus: "sbFocus",
        speed: 200,
        effect: "slide",
        onChange: null,
        onOpen: null,
        onClose: null
      });
  }
  var i = !0;
  e.extend(t.prototype, {
    _isOpenSelectbox: function(e) {
      return !!e && this._getInst(e).isOpen;
    },
    _isDisabledSelectbox: function(e) {
      return !!e && this._getInst(e).isDisabled;
    },
    _attachSelectbox: function(s, t) {
      function a() {
        var s,
          t,
          i = this.attr("id").split("_")[1];
        for (s in u._state)
          s !== i &&
            u._state.hasOwnProperty(s) &&
            (t = e("select[sb='" + s + "']")[0]) &&
            u._closeSelectbox(t);
      }
      function n() {
        var t = !(!arguments[1] || !arguments[1].sub),
          a = !(!arguments[1] || !arguments[1].disabled);
        arguments[0].each(function(n) {
          var l,
            r = e(this),
            g = e("<li>");
          r.is(":selected") && (o.text(r.text()), (p = i)),
            n === f - 1 && g.addClass("last"),
            r.is(":disabled") || a
              ? ((l = e("<span>", { text: r.text() }).addClass(
                  b.settings.classDisabled
                )),
                t && l.addClass(b.settings.classSub),
                l.appendTo(g))
              : ((l = e("<a>", { href: "#" + r.val(), rel: r.val() })
                  .text(r.text())
                  .bind("click.sb", function(t) {
                    t && t.preventDefault && t.preventDefault();
                    var i = c,
                      a = e(this);
                    i.attr("id").split("_")[1];
                    u._changeSelectbox(s, a.attr("rel"), a.text()),
                      u._closeSelectbox(s);
                  })
                  .bind("mouseover.sb", function() {
                    var s = e(this);
                    s
                      .parent()
                      .siblings()
                      .find("a")
                      .removeClass(b.settings.classFocus),
                      s.addClass(b.settings.classFocus);
                  })
                  .bind("mouseout.sb", function() {
                    e(this).removeClass(b.settings.classFocus);
                  })),
                t && l.addClass(b.settings.classSub),
                r.is(":selected") && l.addClass(b.settings.classFocus),
                l.appendTo(g)),
            g.appendTo(d);
        });
      }
      if (this._getInst(s)) return !1;
      var l,
        o,
        c,
        d,
        r = e(s),
        u = this,
        b = u._newInst(r),
        p = !1,
        g = (r.find("optgroup"), r.find("option")),
        f = g.length;
      r.attr("sb", b.uid),
        e.extend(b.settings, u._defaults, t),
        (u._state[b.uid] = !1),
        r.hide(),
        (l = e("<div>", {
          id: "sbHolder_" + b.uid,
          class: b.settings.classHolder,
          tabindex: r.attr("tabindex")
        })),
        (o = e("<a>", {
          id: "sbSelector_" + b.uid,
          href: "#",
          class: b.settings.classSelector,
          click: function(t) {
            t.preventDefault(), a.apply(e(this), []);
            var i = e(this)
              .attr("id")
              .split("_")[1];
            u._state[i] ? u._closeSelectbox(s) : u._openSelectbox(s);
          }
        })),
        (c = e("<a>", {
          id: "sbToggle_" + b.uid,
          href: "#",
          class: b.settings.classToggle,
          click: function(t) {
            t.preventDefault(), a.apply(e(this), []);
            var i = e(this)
              .attr("id")
              .split("_")[1];
            u._state[i] ? u._closeSelectbox(s) : u._openSelectbox(s);
          }
        })).appendTo(l),
        (d = e("<ul>", {
          id: "sbOptions_" + b.uid,
          class: b.settings.classOptions,
          css: { display: "none" }
        })),
        r.children().each(function(s) {
          var t,
            i = e(this),
            a = {};
          i.is("option")
            ? n(i)
            : i.is("optgroup") &&
              ((t = e("<li>")),
              e("<span>", { text: i.attr("label") })
                .addClass(b.settings.classGroup)
                .appendTo(t),
              t.appendTo(d),
              i.is(":disabled") && (a.disabled = !0),
              (a.sub = !0),
              n(i.find("option"), a));
        }),
        p || o.text(g.first().text()),
        e.data(s, "selectbox", b),
        l
          .data("uid", b.uid)
          .bind("keydown.sb", function(s) {
            var t = s.charCode ? s.charCode : s.keyCode ? s.keyCode : 0,
              i = e(this),
              a = i.data("uid"),
              n = i.siblings("select[sb='" + a + "']").data("selectbox"),
              l = i.siblings(["select[sb='", a, "']"].join("")).get(0),
              o = i.find("ul").find("a." + n.settings.classFocus);
            switch (t) {
              case 37:
              case 38:
                if (o.length > 0) {
                  e("a", i).removeClass(n.settings.classFocus),
                    (c = o
                      .parent()
                      .prevAll("li:has(a)")
                      .eq(0)
                      .find("a")).length > 0 &&
                      (c.addClass(n.settings.classFocus).focus(),
                      e("#sbSelector_" + a).text(c.text()));
                }
                break;
              case 39:
              case 40:
                var c;
                e("a", i).removeClass(n.settings.classFocus),
                  (c =
                    o.length > 0
                      ? o
                          .parent()
                          .nextAll("li:has(a)")
                          .eq(0)
                          .find("a")
                      : i
                          .find("ul")
                          .find("a")
                          .eq(0)).length > 0 &&
                    (c.addClass(n.settings.classFocus).focus(),
                    e("#sbSelector_" + a).text(c.text()));
                break;
              case 13:
                o.length > 0 && u._changeSelectbox(l, o.attr("rel"), o.text()),
                  u._closeSelectbox(l);
                break;
              case 9:
                l &&
                  (n = u._getInst(l)) &&
                  (o.length > 0 &&
                    u._changeSelectbox(l, o.attr("rel"), o.text()),
                  u._closeSelectbox(l));
                var d = parseInt(i.attr("tabindex"), 10);
                s.shiftKey ? d-- : d++, e("*[tabindex='" + d + "']").focus();
                break;
              case 27:
                u._closeSelectbox(l);
            }
            return s.stopPropagation(), !1;
          })
          .delegate("a", "mouseover", function(s) {
            e(this).addClass(b.settings.classFocus);
          })
          .delegate("a", "mouseout", function(s) {
            e(this).removeClass(b.settings.classFocus);
          }),
        o.appendTo(l),
        d.appendTo(l),
        l.insertAfter(r),
        e(
          [".", b.settings.classHolder, ", .", b.settings.classSelector].join(
            ""
          )
        ).mousedown(function(e) {
          e.stopPropagation();
        });
    },
    _detachSelectbox: function(s) {
      var t = this._getInst(s);
      if (!t) return !1;
      e("#sbHolder_" + t.uid).remove(),
        e.data(s, "selectbox", null),
        e(s).show();
    },
    _changeSelectbox: function(s, t, a) {
      var n,
        l = this._getInst(s);
      l && ((n = this._get(l, "onChange")), e("#sbSelector_" + l.uid).text(a)),
        (t = t.replace(/\'/g, "\\'")),
        e(s)
          .find("option[value='" + t + "']")
          .attr("selected", i),
        l && n
          ? n.apply(l.input ? l.input[0] : null, [t, l])
          : l && l.input && l.input.trigger("change");
    },
    _enableSelectbox: function(s) {
      var t = this._getInst(s);
      if (!t || !t.isDisabled) return !1;
      e("#sbHolder_" + t.uid).removeClass(t.settings.classHolderDisabled),
        (t.isDisabled = !1),
        e.data(s, "selectbox", t);
    },
    _disableSelectbox: function(s) {
      var t = this._getInst(s);
      if (!t || t.isDisabled) return !1;
      e("#sbHolder_" + t.uid).addClass(t.settings.classHolderDisabled),
        (t.isDisabled = i),
        e.data(s, "selectbox", t);
    },
    _optionSelectbox: function(s, t, i) {
      var a = this._getInst(s);
      if (!a) return !1;
      (a[t] = i), e.data(s, "selectbox", a);
    },
    _openSelectbox: function(s) {
      var t = this._getInst(s);
      if (t && !t.isOpen && !t.isDisabled) {
        var a = e("#sbOptions_" + t.uid),
          n = parseInt(e(window).height(), 10),
          l = e("#sbHolder_" + t.uid).offset(),
          o = e(window).scrollTop(),
          c = a.prev().height(),
          d = n - (l.top - o) - c / 2,
          r = this._get(t, "onOpen");
        a.css({ top: c + "px", maxHeight: d - c + "px" }),
          "fade" === t.settings.effect
            ? a.fadeIn(t.settings.speed)
            : a.slideDown(t.settings.speed),
          e("#sbToggle_" + t.uid).addClass(t.settings.classToggleOpen),
          (this._state[t.uid] = i),
          (t.isOpen = i),
          r && r.apply(t.input ? t.input[0] : null, [t]),
          e.data(s, "selectbox", t);
      }
    },
    _closeSelectbox: function(s) {
      var t = this._getInst(s);
      if (t && t.isOpen) {
        var i = this._get(t, "onClose");
        "fade" === t.settings.effect
          ? e("#sbOptions_" + t.uid).fadeOut(t.settings.speed)
          : e("#sbOptions_" + t.uid).slideUp(t.settings.speed),
          e("#sbToggle_" + t.uid).removeClass(t.settings.classToggleOpen),
          (this._state[t.uid] = !1),
          (t.isOpen = !1),
          i && i.apply(t.input ? t.input[0] : null, [t]),
          e.data(s, "selectbox", t);
      }
    },
    _newInst: function(e) {
      return {
        id: e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
        input: e,
        uid: Math.floor(99999999 * Math.random()),
        isOpen: !1,
        isDisabled: !1,
        settings: {}
      };
    },
    _getInst: function(s) {
      try {
        return e.data(s, "selectbox");
      } catch (e) {
        throw "Missing instance data for this selectbox";
      }
    },
    _get: function(e, s) {
      return void 0 !== e.settings[s] ? e.settings[s] : this._defaults[s];
    }
  }),
    (e.fn.selectbox = function(s) {
      var t = Array.prototype.slice.call(arguments, 1);
      return "string" == typeof s && "isDisabled" == s
        ? e.selectbox["_" + s + "Selectbox"].apply(
            e.selectbox,
            [this[0]].concat(t)
          )
        : "option" == s &&
          2 == arguments.length &&
          "string" == typeof arguments[1]
          ? e.selectbox["_" + s + "Selectbox"].apply(
              e.selectbox,
              [this[0]].concat(t)
            )
          : this.each(function() {
              "string" == typeof s
                ? e.selectbox["_" + s + "Selectbox"].apply(
                    e.selectbox,
                    [this].concat(t)
                  )
                : e.selectbox._attachSelectbox(this, s);
            });
    }),
    (e.selectbox = new t()),
    (e.selectbox.version = "0.2");
})(jQuery);

/*
 Sticky-kit v1.1.3 | MIT | Leaf Corcoran 2015 | http://leafo.net
*/
(function() {
  var c, f;
  c = window.jQuery;
  f = c(window);
  c.fn.stick_in_parent = function(b) {
    var A, w, J, n, B, K, p, q, L, k, E, t;
    null == b && (b = {});
    t = b.sticky_class;
    B = b.inner_scrolling;
    E = b.recalc_every;
    k = b.parent;
    q = b.offset_top;
    p = b.spacer;
    w = b.bottoming;
    null == q && (q = 0);
    null == k && (k = void 0);
    null == B && (B = !0);
    null == t && (t = "is_stuck");
    A = c(document);
    null == w && (w = !0);
    L = function(a) {
      var b;
      return window.getComputedStyle
        ? ((a = window.getComputedStyle(a[0])),
          (b =
            parseFloat(a.getPropertyValue("width")) +
            parseFloat(a.getPropertyValue("margin-left")) +
            parseFloat(a.getPropertyValue("margin-right"))),
          "border-box" !== a.getPropertyValue("box-sizing") &&
            (b +=
              parseFloat(a.getPropertyValue("border-left-width")) +
              parseFloat(a.getPropertyValue("border-right-width")) +
              parseFloat(a.getPropertyValue("padding-left")) +
              parseFloat(a.getPropertyValue("padding-right"))),
          b)
        : a.outerWidth(!0);
    };
    J = function(a, b, n, C, F, u, r, G) {
      var v, H, m, D, I, d, g, x, y, z, h, l;
      if (!a.data("sticky_kit")) {
        a.data("sticky_kit", !0);
        I = A.height();
        g = a.parent();
        null != k && (g = g.closest(k));
        if (!g.length) throw "failed to find stick parent";
        v = m = !1;
        (h = null != p ? p && a.closest(p) : c("<div />")) &&
          h.css("position", a.css("position"));
        x = function() {
          var d, f, e;
          if (
            !G &&
            ((I = A.height()),
            (d = parseInt(g.css("border-top-width"), 10)),
            (f = parseInt(g.css("padding-top"), 10)),
            (b = parseInt(g.css("padding-bottom"), 10)),
            (n = g.offset().top + d + f),
            (C = g.height()),
            m &&
              ((v = m = !1),
              null == p && (a.insertAfter(h), h.detach()),
              a
                .css({ position: "", top: "", width: "", bottom: "" })
                .removeClass(t),
              (e = !0)),
            (F = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - q),
            (u = a.outerHeight(!0)),
            (r = a.css("float")),
            h &&
              h.css({
                width: L(a),
                height: u,
                display: a.css("display"),
                "vertical-align": a.css("vertical-align"),
                float: r
              }),
            e)
          )
            return l();
        };
        x();
        if (u !== C)
          return (
            (D = void 0),
            (d = q),
            (z = E),
            (l = function() {
              var c, l, e, k;
              if (
                !G &&
                ((e = !1),
                null != z && (--z, 0 >= z && ((z = E), x(), (e = !0))),
                e || A.height() === I || x(),
                (e = f.scrollTop()),
                null != D && (l = e - D),
                (D = e),
                m
                  ? (w &&
                      ((k = e + u + d > C + n),
                      v &&
                        !k &&
                        ((v = !1),
                        a
                          .css({ position: "fixed", bottom: "", top: d })
                          .trigger("sticky_kit:unbottom"))),
                    e < F &&
                      ((m = !1),
                      (d = q),
                      null == p &&
                        (("left" !== r && "right" !== r) || a.insertAfter(h),
                        h.detach()),
                      (c = { position: "", width: "", top: "" }),
                      a
                        .css(c)
                        .removeClass(t)
                        .trigger("sticky_kit:unstick")),
                    B &&
                      ((c = f.height()),
                      u + q > c &&
                        !v &&
                        ((d -= l),
                        (d = Math.max(c - u, d)),
                        (d = Math.min(q, d)),
                        m && a.css({ top: d + "px" }))))
                  : e > F &&
                    ((m = !0),
                    (c = { position: "fixed", top: d }),
                    (c.width =
                      "border-box" === a.css("box-sizing")
                        ? a.outerWidth() + "px"
                        : a.width() + "px"),
                    a.css(c).addClass(t),
                    null == p &&
                      (a.after(h),
                      ("left" !== r && "right" !== r) || h.append(a)),
                    a.trigger("sticky_kit:stick")),
                m && w && (null == k && (k = e + u + d > C + n), !v && k))
              )
                return (
                  (v = !0),
                  "static" === g.css("position") &&
                    g.css({ position: "relative" }),
                  a
                    .css({ position: "absolute", bottom: b, top: "auto" })
                    .trigger("sticky_kit:bottom")
                );
            }),
            (y = function() {
              x();
              return l();
            }),
            (H = function() {
              G = !0;
              f.off("touchmove", l);
              f.off("scroll", l);
              f.off("resize", y);
              c(document.body).off("sticky_kit:recalc", y);
              a.off("sticky_kit:detach", H);
              a.removeData("sticky_kit");
              a.css({ position: "", bottom: "", top: "", width: "" });
              g.position("position", "");
              if (m)
                return (
                  null == p &&
                    (("left" !== r && "right" !== r) || a.insertAfter(h),
                    h.remove()),
                  a.removeClass(t)
                );
            }),
            f.on("touchmove", l),
            f.on("scroll", l),
            f.on("resize", y),
            c(document.body).on("sticky_kit:recalc", y),
            a.on("sticky_kit:detach", H),
            setTimeout(l, 0)
          );
      }
    };
    n = 0;
    for (K = this.length; n < K; n++) (b = this[n]), J(c(b));
    return this;
  };
}.call(this));

/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(f) {
  function A(a, b, d) {
    var c = a[0],
      g = /er/.test(d) ? _indeterminate : /bl/.test(d) ? n : k,
      e =
        d == _update
          ? {
              checked: c[k],
              disabled: c[n],
              indeterminate:
                "true" == a.attr(_indeterminate) ||
                "false" == a.attr(_determinate)
            }
          : c[g];
    if (/^(ch|di|in)/.test(d) && !e) x(a, g);
    else if (/^(un|en|de)/.test(d) && e) q(a, g);
    else if (d == _update) for (var f in e) e[f] ? x(a, f, !0) : q(a, f, !0);
    else if (!b || "toggle" == d) {
      if (!b) a[_callback]("ifClicked");
      e ? c[_type] !== r && q(a, g) : x(a, g);
    }
  }
  function x(a, b, d) {
    var c = a[0],
      g = a.parent(),
      e = b == k,
      u = b == _indeterminate,
      v = b == n,
      s = u ? _determinate : e ? y : "enabled",
      F = l(a, s + t(c[_type])),
      B = l(a, b + t(c[_type]));
    if (!0 !== c[b]) {
      if (!d && b == k && c[_type] == r && c.name) {
        var w = a.closest("form"),
          p = 'input[name="' + c.name + '"]',
          p = w.length ? w.find(p) : f(p);
        p.each(function() {
          this !== c && f(this).data(m) && q(f(this), b);
        });
      }
      u
        ? ((c[b] = !0), c[k] && q(a, k, "force"))
        : (d || (c[b] = !0),
          e && c[_indeterminate] && q(a, _indeterminate, !1));
      D(a, e, b, d);
    }
    c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "default");
    g[_add](B || l(a, b) || "");
    g.attr("role") && !u && g.attr("aria-" + (v ? n : k), "true");
    g[_remove](F || l(a, s) || "");
  }
  function q(a, b, d) {
    var c = a[0],
      g = a.parent(),
      e = b == k,
      f = b == _indeterminate,
      m = b == n,
      s = f ? _determinate : e ? y : "enabled",
      q = l(a, s + t(c[_type])),
      r = l(a, b + t(c[_type]));
    if (!1 !== c[b]) {
      if (f || !d || "force" == d) c[b] = !1;
      D(a, e, s, d);
    }
    !c[n] && l(a, _cursor, !0) && g.find("." + C).css(_cursor, "pointer");
    g[_remove](r || l(a, b) || "");
    g.attr("role") && !f && g.attr("aria-" + (m ? n : k), "false");
    g[_add](q || l(a, s) || "");
  }
  function E(a, b) {
    if (a.data(m)) {
      a.parent().html(a.attr("style", a.data(m).s || ""));
      if (b) a[_callback](b);
      a.off(".i").unwrap();
      f(_label + '[for="' + a[0].id + '"]')
        .add(a.closest(_label))
        .off(".i");
    }
  }
  function l(a, b, f) {
    if (a.data(m)) return a.data(m).o[b + (f ? "" : "Class")];
  }
  function t(a) {
    return a.charAt(0).toUpperCase() + a.slice(1);
  }
  function D(a, b, f, c) {
    if (!c) {
      if (b) a[_callback]("ifToggled");
      a[_callback]("ifChanged")[_callback]("if" + t(f));
    }
  }
  var m = "iCheck",
    C = m + "-helper",
    r = "radio",
    k = "checked",
    y = "un" + k,
    n = "disabled";
  _determinate = "determinate";
  _indeterminate = "in" + _determinate;
  _update = "update";
  _type = "type";
  _click = "click";
  _touch = "touchbegin.i touchend.i";
  _add = "addClass";
  _remove = "removeClass";
  _callback = "trigger";
  _label = "label";
  _cursor = "cursor";
  _mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(
    navigator.userAgent
  );
  f.fn[m] = function(a, b) {
    var d = 'input[type="checkbox"], input[type="' + r + '"]',
      c = f(),
      g = function(a) {
        a.each(function() {
          var a = f(this);
          c = a.is(d) ? c.add(a) : c.add(a.find(d));
        });
      };
    if (
      /^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(
        a
      )
    )
      return (
        (a = a.toLowerCase()),
        g(this),
        c.each(function() {
          var c = f(this);
          "destroy" == a ? E(c, "ifDestroyed") : A(c, !0, a);
          f.isFunction(b) && b();
        })
      );
    if ("object" != typeof a && a) return this;
    var e = f.extend(
        {
          checkedClass: k,
          disabledClass: n,
          indeterminateClass: _indeterminate,
          labelHover: !0
        },
        a
      ),
      l = e.handle,
      v = e.hoverClass || "hover",
      s = e.focusClass || "focus",
      t = e.activeClass || "active",
      B = !!e.labelHover,
      w = e.labelHoverClass || "hover",
      p = ("" + e.increaseArea).replace("%", "") | 0;
    if ("checkbox" == l || l == r) d = 'input[type="' + l + '"]';
    -50 > p && (p = -50);
    g(this);
    return c.each(function() {
      var a = f(this);
      E(a);
      var c = this,
        b = c.id,
        g = -p + "%",
        d = 100 + 2 * p + "%",
        d = {
          position: "absolute",
          top: g,
          left: g,
          display: "block",
          width: d,
          height: d,
          margin: 0,
          padding: 0,
          background: "#fff",
          border: 0,
          opacity: 0
        },
        g = _mobile
          ? { position: "absolute", visibility: "hidden" }
          : p
            ? d
            : { position: "absolute", opacity: 0 },
        l =
          "checkbox" == c[_type]
            ? e.checkboxClass || "icheckbox"
            : e.radioClass || "i" + r,
        z = f(_label + '[for="' + b + '"]').add(a.closest(_label)),
        u = !!e.aria,
        y =
          m +
          "-" +
          Math.random()
            .toString(36)
            .substr(2, 6),
        h = '<div class="' + l + '" ' + (u ? 'role="' + c[_type] + '" ' : "");
      u &&
        z.each(function() {
          h += 'aria-labelledby="';
          this.id ? (h += this.id) : ((this.id = y), (h += y));
          h += '"';
        });
      h = a
        .wrap(h + "/>")
        [_callback]("ifCreated")
        .parent()
        .append(e.insert);
      d = f('<ins class="' + C + '"/>')
        .css(d)
        .appendTo(h);
      a.data(m, { o: e, s: a.attr("style") }).css(g);
      e.inheritClass && h[_add](c.className || "");
      e.inheritID && b && h.attr("id", m + "-" + b);
      "static" == h.css("position") && h.css("position", "relative");
      A(a, !0, _update);
      if (z.length)
        z.on(_click + ".i mouseover.i mouseout.i " + _touch, function(b) {
          var d = b[_type],
            e = f(this);
          if (!c[n]) {
            if (d == _click) {
              if (f(b.target).is("a")) return;
              A(a, !1, !0);
            } else
              B &&
                (/ut|nd/.test(d)
                  ? (h[_remove](v), e[_remove](w))
                  : (h[_add](v), e[_add](w)));
            if (_mobile) b.stopPropagation();
            else return !1;
          }
        });
      a.on(_click + ".i focus.i blur.i keyup.i keydown.i keypress.i", function(
        b
      ) {
        var d = b[_type];
        b = b.keyCode;
        if (d == _click) return !1;
        if ("keydown" == d && 32 == b)
          return (c[_type] == r && c[k]) || (c[k] ? q(a, k) : x(a, k)), !1;
        if ("keyup" == d && c[_type] == r) !c[k] && x(a, k);
        else if (/us|ur/.test(d)) h["blur" == d ? _remove : _add](s);
      });
      d.on(_click + " mousedown mouseup mouseover mouseout " + _touch, function(
        b
      ) {
        var d = b[_type],
          e = /wn|up/.test(d) ? t : v;
        if (!c[n]) {
          if (d == _click) A(a, !1, !0);
          else {
            if (/wn|er|in/.test(d)) h[_add](e);
            else h[_remove](e + " " + t);
            if (z.length && B && e == v) z[/ut|nd/.test(d) ? _remove : _add](w);
          }
          if (_mobile) b.stopPropagation();
          else return !1;
        }
      });
    });
  };
})(window.jQuery || window.Zepto);

/*
 Search overlay
*/
$(".search-overlay-menu-btn").on("click", function(a) {
  $(".search-overlay-menu").addClass("open"),
    $('.search-overlay-menu > form > input[type="search"]').focus();
}),
  $(".search-overlay-close").on("click", function(a) {
    $(".search-overlay-menu").removeClass("open");
  }),
  $(".search-overlay-menu, .search-overlay-menu .search-overlay-close").on(
    "click keyup",
    function(a) {
      (a.target == this ||
        "search-overlay-close" == a.target.className ||
        27 == a.keyCode) &&
        $(this).removeClass("open");
    }
  );

/*
 * jQuery mmenu v6.1.8
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"));
  } else {
    root.jquery_mmenu_all_js = factory(root.jQuery);
  }
})(this, function(jQuery) {
  !(function(e) {
    function t() {
      e[n].glbl ||
        ((r = {
          $wndw: e(window),
          $docu: e(document),
          $html: e("html"),
          $body: e("body")
        }),
        (s = {}),
        (a = {}),
        (o = {}),
        e.each([s, a, o], function(e, t) {
          t.add = function(e) {
            e = e.split(" ");
            for (var n = 0, i = e.length; n < i; n++) t[e[n]] = t.mm(e[n]);
          };
        }),
        (s.mm = function(e) {
          return "mm-" + e;
        }),
        s.add(
          "wrapper menu panels panel nopanel highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen noanimation"
        ),
        (s.umm = function(e) {
          return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e;
        }),
        (a.mm = function(e) {
          return "mm-" + e;
        }),
        a.add("parent child"),
        (o.mm = function(e) {
          return e + ".mm";
        }),
        o.add(
          "transitionend webkitTransitionEnd click scroll resize keydown mousedown mouseup touchstart touchmove touchend orientationchange"
        ),
        (e[n]._c = s),
        (e[n]._d = a),
        (e[n]._e = o),
        (e[n].glbl = r));
    }
    var n = "mmenu",
      i = "6.1.8";
    if (!(e[n] && e[n].version > i)) {
      (e[n] = function(e, t, n) {
        return (
          (this.$menu = e),
          (this._api = [
            "bind",
            "getInstance",
            "initPanels",
            "openPanel",
            "closePanel",
            "closeAllPanels",
            "setSelected"
          ]),
          (this.opts = t),
          (this.conf = n),
          (this.vars = {}),
          (this.cbck = {}),
          (this.mtch = {}),
          "function" == typeof this.___deprecated && this.___deprecated(),
          this._initAddons(),
          this._initExtensions(),
          this._initMenu(),
          this._initPanels(),
          this._initOpened(),
          this._initAnchors(),
          this._initMatchMedia(),
          "function" == typeof this.___debug && this.___debug(),
          this
        );
      }),
        (e[n].version = i),
        (e[n].addons = {}),
        (e[n].uniqueId = 0),
        (e[n].defaults = {
          extensions: [],
          initMenu: function() {},
          initPanels: function() {},
          navbar: { add: !0, title: "Menu", titleLink: "parent" },
          onClick: { setSelected: !0 },
          slidingSubmenus: !0
        }),
        (e[n].configuration = {
          classNames: {
            divider: "Divider",
            inset: "Inset",
            nolistview: "NoListview",
            nopanel: "NoPanel",
            panel: "Panel",
            selected: "Selected",
            spacer: "Spacer",
            vertical: "Vertical"
          },
          clone: !1,
          openingInterval: 25,
          panelNodetype: "ul, ol, div",
          transitionDuration: 400
        }),
        (e[n].prototype = {
          getInstance: function() {
            return this;
          },
          initPanels: function(e) {
            this._initPanels(e);
          },
          openPanel: function(t, i) {
            if (
              (this.trigger("openPanel:before", t),
              t &&
                t.length &&
                (t.is("." + s.panel) || (t = t.closest("." + s.panel)),
                t.is("." + s.panel)))
            ) {
              var o = this;
              if (("boolean" != typeof i && (i = !0), t.hasClass(s.vertical)))
                t
                  .add(t.parents("." + s.vertical))
                  .removeClass(s.hidden)
                  .parent("li")
                  .addClass(s.opened),
                  this.openPanel(
                    t
                      .parents("." + s.panel)
                      .not("." + s.vertical)
                      .first()
                  ),
                  this.trigger("openPanel:start", t),
                  this.trigger("openPanel:finish", t);
              else {
                if (t.hasClass(s.opened)) return;
                var r = this.$pnls.children("." + s.panel),
                  l = r.filter("." + s.opened);
                if (!e[n].support.csstransitions)
                  return (
                    l.addClass(s.hidden).removeClass(s.opened),
                    t.removeClass(s.hidden).addClass(s.opened),
                    this.trigger("openPanel:start", t),
                    void this.trigger("openPanel:finish", t)
                  );
                r.not(t).removeClass(s.subopened);
                for (var d = t.data(a.parent); d; )
                  (d = d.closest("." + s.panel)),
                    d.is("." + s.vertical) || d.addClass(s.subopened),
                    (d = d.data(a.parent));
                r
                  .removeClass(s.highest)
                  .not(l)
                  .not(t)
                  .addClass(s.hidden),
                  t.removeClass(s.hidden),
                  (this.openPanelStart = function() {
                    l.removeClass(s.opened),
                      t.addClass(s.opened),
                      t.hasClass(s.subopened)
                        ? (l.addClass(s.highest), t.removeClass(s.subopened))
                        : (l.addClass(s.subopened), t.addClass(s.highest)),
                      this.trigger("openPanel:start", t);
                  }),
                  (this.openPanelFinish = function() {
                    l.removeClass(s.highest).addClass(s.hidden),
                      t.removeClass(s.highest),
                      this.trigger("openPanel:finish", t);
                  }),
                  i && !t.hasClass(s.noanimation)
                    ? setTimeout(function() {
                        o.__transitionend(
                          t,
                          function() {
                            o.openPanelFinish.call(o);
                          },
                          o.conf.transitionDuration
                        ),
                          o.openPanelStart.call(o);
                      }, o.conf.openingInterval)
                    : (this.openPanelStart.call(this),
                      this.openPanelFinish.call(this));
              }
              this.trigger("openPanel:after", t);
            }
          },
          closePanel: function(e) {
            this.trigger("closePanel:before", e);
            var t = e.parent();
            t.hasClass(s.vertical) &&
              (t.removeClass(s.opened), this.trigger("closePanel", e)),
              this.trigger("closePanel:after", e);
          },
          closeAllPanels: function(e) {
            this.trigger("closeAllPanels:before"),
              this.$pnls
                .find("." + s.listview)
                .children()
                .removeClass(s.selected)
                .filter("." + s.vertical)
                .removeClass(s.opened);
            var t = this.$pnls.children("." + s.panel),
              n = e && e.length ? e : t.first();
            this.$pnls
              .children("." + s.panel)
              .not(n)
              .removeClass(s.subopened)
              .removeClass(s.opened)
              .removeClass(s.highest)
              .addClass(s.hidden),
              this.openPanel(n, !1),
              this.trigger("closeAllPanels:after");
          },
          togglePanel: function(e) {
            var t = e.parent();
            t.hasClass(s.vertical) &&
              this[t.hasClass(s.opened) ? "closePanel" : "openPanel"](e);
          },
          setSelected: function(e) {
            this.trigger("setSelected:before", e),
              this.$menu
                .find("." + s.listview)
                .children("." + s.selected)
                .removeClass(s.selected),
              e.addClass(s.selected),
              this.trigger("setSelected:after", e);
          },
          bind: function(e, t) {
            (this.cbck[e] = this.cbck[e] || []), this.cbck[e].push(t);
          },
          trigger: function() {
            var e = this,
              t = Array.prototype.slice.call(arguments),
              n = t.shift();
            if (this.cbck[n])
              for (var i = 0, s = this.cbck[n].length; i < s; i++)
                this.cbck[n][i].apply(e, t);
          },
          matchMedia: function(e, t, n) {
            var i = { yes: t, no: n };
            (this.mtch[e] = this.mtch[e] || []), this.mtch[e].push(i);
          },
          _initAddons: function() {
            this.trigger("initAddons:before");
            var t;
            for (t in e[n].addons)
              e[n].addons[t].add.call(this),
                (e[n].addons[t].add = function() {});
            for (t in e[n].addons) e[n].addons[t].setup.call(this);
            this.trigger("initAddons:after");
          },
          _initExtensions: function() {
            this.trigger("initExtensions:before");
            var e = this;
            this.opts.extensions.constructor === Array &&
              (this.opts.extensions = { all: this.opts.extensions });
            for (var t in this.opts.extensions)
              (this.opts.extensions[t] = this.opts.extensions[t].length
                ? "mm-" + this.opts.extensions[t].join(" mm-")
                : ""),
                this.opts.extensions[t] &&
                  !(function(t) {
                    e.matchMedia(
                      t,
                      function() {
                        this.$menu.addClass(this.opts.extensions[t]);
                      },
                      function() {
                        this.$menu.removeClass(this.opts.extensions[t]);
                      }
                    );
                  })(t);
            this.trigger("initExtensions:after");
          },
          _initMenu: function() {
            this.trigger("initMenu:before");
            this.conf.clone &&
              ((this.$orig = this.$menu),
              (this.$menu = this.$orig.clone()),
              this.$menu
                .add(this.$menu.find("[id]"))
                .filter("[id]")
                .each(function() {
                  e(this).attr("id", s.mm(e(this).attr("id")));
                })),
              this.opts.initMenu.call(this, this.$menu, this.$orig),
              this.$menu.attr(
                "id",
                this.$menu.attr("id") || this.__getUniqueId()
              ),
              (this.$pnls = e('<div class="' + s.panels + '" />')
                .append(this.$menu.children(this.conf.panelNodetype))
                .prependTo(this.$menu));
            var t = [s.menu];
            this.opts.slidingSubmenus || t.push(s.vertical),
              this.$menu
                .addClass(t.join(" "))
                .parent()
                .addClass(s.wrapper),
              this.trigger("initMenu:after");
          },
          _initPanels: function(t) {
            this.trigger("initPanels:before", t),
              (t = t || this.$pnls.children(this.conf.panelNodetype));
            var n = e(),
              i = this,
              a = function(t) {
                t.filter(this.conf.panelNodetype).each(function() {
                  var t = i._initPanel(e(this));
                  if (t) {
                    i._initNavbar(t), i._initListview(t), (n = n.add(t));
                    var o = t
                      .children("." + s.listview)
                      .children("li")
                      .children(i.conf.panelNodeType)
                      .add(t.children("." + i.conf.classNames.panel));
                    o.length && a.call(i, o);
                  }
                });
              };
            a.call(this, t),
              this.opts.initPanels.call(this, n),
              this.trigger("initPanels:after", n);
          },
          _initPanel: function(e) {
            this.trigger("initPanel:before", e);
            if (e.hasClass(s.panel)) return e;
            if (
              (this.__refactorClass(e, this.conf.classNames.panel, "panel"),
              this.__refactorClass(e, this.conf.classNames.nopanel, "nopanel"),
              this.__refactorClass(
                e,
                this.conf.classNames.vertical,
                "vertical"
              ),
              this.__refactorClass(e, this.conf.classNames.inset, "inset"),
              e.filter("." + s.inset).addClass(s.nopanel),
              e.hasClass(s.nopanel))
            )
              return !1;
            var t = e.hasClass(s.vertical) || !this.opts.slidingSubmenus;
            e.removeClass(s.vertical);
            var n = e.attr("id") || this.__getUniqueId();
            e.removeAttr("id"),
              e.is("ul, ol") && (e.wrap("<div />"), (e = e.parent())),
              e.addClass(s.panel + " " + s.hidden).attr("id", n);
            var i = e.parent("li");
            return (
              t ? e.add(i).addClass(s.vertical) : e.appendTo(this.$pnls),
              i.length && (i.data(a.child, e), e.data(a.parent, i)),
              this.trigger("initPanel:after", e),
              e
            );
          },
          _initNavbar: function(t) {
            if (
              (this.trigger("initNavbar:before", t),
              !t.children("." + s.navbar).length)
            ) {
              var i = t.data(a.parent),
                o = e('<div class="' + s.navbar + '" />'),
                r = e[n].i18n(this.opts.navbar.title),
                l = "";
              if (i && i.length) {
                if (i.hasClass(s.vertical)) return;
                if (i.parent().is("." + s.listview))
                  var d = i.children("a, span").not("." + s.next);
                else
                  var d = i
                    .closest("." + s.panel)
                    .find('a[href="#' + t.attr("id") + '"]');
                (d = d.first()), (i = d.closest("." + s.panel));
                var c = i.attr("id");
                switch (((r = d.text()), this.opts.navbar.titleLink)) {
                  case "anchor":
                    l = d.attr("href");
                    break;
                  case "parent":
                    l = "#" + c;
                }
                o.append(
                  '<a class="' + s.btn + " " + s.prev + '" href="#' + c + '" />'
                );
              } else if (!this.opts.navbar.title) return;
              this.opts.navbar.add && t.addClass(s.hasnavbar),
                o
                  .append(
                    '<a class="' +
                      s.title +
                      '"' +
                      (l.length ? ' href="' + l + '"' : "") +
                      ">" +
                      r +
                      "</a>"
                  )
                  .prependTo(t),
                this.trigger("initNavbar:after", t);
            }
          },
          _initListview: function(t) {
            this.trigger("initListview:before", t);
            var n = this.__childAddBack(t, "ul, ol");
            this.__refactorClass(
              n,
              this.conf.classNames.nolistview,
              "nolistview"
            ),
              n.filter("." + this.conf.classNames.inset).addClass(s.nolistview);
            var i = n
              .not("." + s.nolistview)
              .addClass(s.listview)
              .children();
            this.__refactorClass(i, this.conf.classNames.selected, "selected"),
              this.__refactorClass(i, this.conf.classNames.divider, "divider"),
              this.__refactorClass(i, this.conf.classNames.spacer, "spacer");
            var o = t.data(a.parent);
            if (
              o &&
              o.parent().is("." + s.listview) &&
              !o.children("." + s.next).length
            ) {
              var r = o.children("a, span").first(),
                l = e(
                  '<a class="' + s.next + '" href="#' + t.attr("id") + '" />'
                ).insertBefore(r);
              r.is("span") && l.addClass(s.fullsubopen);
            }
            this.trigger("initListview:after", t);
          },
          _initOpened: function() {
            this.trigger("initOpened:before");
            var e = this.$pnls
                .find("." + s.listview)
                .children("." + s.selected)
                .removeClass(s.selected)
                .last()
                .addClass(s.selected),
              t = e.length
                ? e.closest("." + s.panel)
                : this.$pnls.children("." + s.panel).first();
            this.openPanel(t, !1), this.trigger("initOpened:after");
          },
          _initAnchors: function() {
            var t = this;
            r.$body.on(o.click + "-oncanvas", "a[href]", function(i) {
              var a = e(this),
                o = !1,
                r = t.$menu.find(a).length;
              for (var l in e[n].addons)
                if (e[n].addons[l].clickAnchor.call(t, a, r)) {
                  o = !0;
                  break;
                }
              var d = a.attr("href");
              if (!o && r && d.length > 1 && "#" == d.slice(0, 1))
                try {
                  var c = e(d, t.$menu);
                  c.is("." + s.panel) &&
                    ((o = !0),
                    t[
                      a.parent().hasClass(s.vertical)
                        ? "togglePanel"
                        : "openPanel"
                    ](c));
                } catch (h) {}
              if (
                (o && i.preventDefault(),
                !o &&
                  r &&
                  a.is("." + s.listview + " > li > a") &&
                  !a.is('[rel="external"]') &&
                  !a.is('[target="_blank"]'))
              ) {
                t.__valueOrFn(t.opts.onClick.setSelected, a) &&
                  t.setSelected(e(i.target).parent());
                var f = t.__valueOrFn(
                  t.opts.onClick.preventDefault,
                  a,
                  "#" == d.slice(0, 1)
                );
                f && i.preventDefault(),
                  t.__valueOrFn(t.opts.onClick.close, a, f) &&
                    t.opts.offCanvas &&
                    "function" == typeof t.close &&
                    t.close();
              }
            });
          },
          _initMatchMedia: function() {
            var e = this;
            this._fireMatchMedia(),
              r.$wndw.on(o.resize, function(t) {
                e._fireMatchMedia();
              });
          },
          _fireMatchMedia: function() {
            for (var e in this.mtch)
              for (
                var t =
                    window.matchMedia && window.matchMedia(e).matches
                      ? "yes"
                      : "no",
                  n = 0;
                n < this.mtch[e].length;
                n++
              )
                this.mtch[e][n][t].call(this);
          },
          _getOriginalMenuId: function() {
            var e = this.$menu.attr("id");
            return this.conf.clone && e && e.length && (e = s.umm(e)), e;
          },
          __api: function() {
            var t = this,
              n = {};
            return (
              e.each(this._api, function(e) {
                var i = this;
                n[i] = function() {
                  var e = t[i].apply(t, arguments);
                  return "undefined" == typeof e ? n : e;
                };
              }),
              n
            );
          },
          __valueOrFn: function(e, t, n) {
            return "function" == typeof e
              ? e.call(t[0])
              : "undefined" == typeof e && "undefined" != typeof n
                ? n
                : e;
          },
          __refactorClass: function(e, t, n) {
            return e
              .filter("." + t)
              .removeClass(t)
              .addClass(s[n]);
          },
          __findAddBack: function(e, t) {
            return e.find(t).add(e.filter(t));
          },
          __childAddBack: function(e, t) {
            return e.children(t).add(e.filter(t));
          },
          __filterListItems: function(e) {
            return e.not("." + s.divider).not("." + s.hidden);
          },
          __filterListItemAnchors: function(e) {
            return this.__filterListItems(e)
              .children("a")
              .not("." + s.next);
          },
          __transitionend: function(e, t, n) {
            var i = !1,
              s = function(n) {
                ("undefined" != typeof n && n.target != e[0]) ||
                  (i ||
                    (e.off(o.transitionend),
                    e.off(o.webkitTransitionEnd),
                    t.call(e[0])),
                  (i = !0));
              };
            e.on(o.transitionend, s),
              e.on(o.webkitTransitionEnd, s),
              setTimeout(s, 1.1 * n);
          },
          __getUniqueId: function() {
            return s.mm(e[n].uniqueId++);
          }
        }),
        (e.fn[n] = function(i, s) {
          t(),
            (i = e.extend(!0, {}, e[n].defaults, i)),
            (s = e.extend(!0, {}, e[n].configuration, s));
          var a = e();
          return (
            this.each(function() {
              var t = e(this);
              if (!t.data(n)) {
                var o = new e[n](t, i, s);
                o.$menu.data(n, o.__api()), (a = a.add(o.$menu));
              }
            }),
            a
          );
        }),
        (e[n].i18n = (function() {
          var t = {};
          return function(n) {
            switch (typeof n) {
              case "object":
                return e.extend(t, n), t;
              case "string":
                return t[n] || n;
              case "undefined":
              default:
                return t;
            }
          };
        })()),
        (e[n].support = {
          touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
          csstransitions: (function() {
            return (
              "undefined" == typeof Modernizr ||
              "undefined" == typeof Modernizr.csstransitions ||
              Modernizr.csstransitions
            );
          })(),
          csstransforms: (function() {
            return (
              "undefined" == typeof Modernizr ||
              "undefined" == typeof Modernizr.csstransforms ||
              Modernizr.csstransforms
            );
          })(),
          csstransforms3d: (function() {
            return (
              "undefined" == typeof Modernizr ||
              "undefined" == typeof Modernizr.csstransforms3d ||
              Modernizr.csstransforms3d
            );
          })()
        });
      var s, a, o, r;
    }
  })(
    jQuery
  ) /*
 * jQuery mmenu offCanvas add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "offCanvas";
      (e[t].addons[n] = {
        setup: function() {
          if (this.opts[n]) {
            var s = this,
              a = this.opts[n],
              r = this.conf[n];
            (o = e[t].glbl),
              (this._api = e.merge(this._api, ["open", "close", "setPage"])),
              "object" != typeof a && (a = {}),
              ("top" != a.position && "bottom" != a.position) ||
                (a.zposition = "front"),
              (a = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], a)),
              "string" != typeof r.pageSelector &&
                (r.pageSelector = "> " + r.pageNodetype),
              (this.vars.opened = !1);
            var l = [i.offcanvas];
            "left" != a.position && l.push(i.mm(a.position)),
              "back" != a.zposition && l.push(i.mm(a.zposition)),
              e[t].support.csstransforms || l.push(i["no-csstransforms"]),
              e[t].support.csstransforms3d || l.push(i["no-csstransforms3d"]),
              this.bind("initMenu:after", function() {
                var e = this;
                this.setPage(o.$page),
                  this._initBlocker(),
                  this["_initWindow_" + n](),
                  this.$menu
                    .addClass(l.join(" "))
                    .parent("." + i.wrapper)
                    .removeClass(i.wrapper),
                  this.$menu[r.menuInsertMethod](r.menuInsertSelector);
                var t = window.location.hash;
                if (t) {
                  var s = this._getOriginalMenuId();
                  s &&
                    s == t.slice(1) &&
                    setTimeout(function() {
                      e.open();
                    }, 1e3);
                }
              }),
              this.bind("initExtensions:after", function() {
                for (
                  var e = [i.mm("widescreen"), i.mm("iconbar")], t = 0;
                  t < e.length;
                  t++
                )
                  for (var n in this.opts.extensions)
                    if (this.opts.extensions[n].indexOf(e[t]) > -1) {
                      !(function(t, n) {
                        s.matchMedia(
                          t,
                          function() {
                            o.$html.addClass(e[n]);
                          },
                          function() {
                            o.$html.removeClass(e[n]);
                          }
                        );
                      })(n, t);
                      break;
                    }
              }),
              this.bind("open:start:sr-aria", function() {
                this.__sr_aria(this.$menu, "hidden", !1);
              }),
              this.bind("close:finish:sr-aria", function() {
                this.__sr_aria(this.$menu, "hidden", !0);
              }),
              this.bind("initMenu:after:sr-aria", function() {
                this.__sr_aria(this.$menu, "hidden", !0);
              });
          }
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add(
              "offcanvas slideout blocking modal background opening blocker page no-csstransforms3d"
            ),
            s.add("style");
        },
        clickAnchor: function(e, t) {
          var s = this;
          if (this.opts[n]) {
            var a = this._getOriginalMenuId();
            if (a && e.is('[href="#' + a + '"]')) {
              if (t) return !0;
              var r = e.closest("." + i.menu);
              if (r.length) {
                var l = r.data("mmenu");
                if (l && l.close)
                  return (
                    l.close(),
                    s.__transitionend(
                      r,
                      function() {
                        s.open();
                      },
                      s.conf.transitionDuration
                    ),
                    !0
                  );
              }
              return this.open(), !0;
            }
            if (o.$page)
              return (
                (a = o.$page.first().attr("id")),
                a && e.is('[href="#' + a + '"]') ? (this.close(), !0) : void 0
              );
          }
        }
      }),
        (e[t].defaults[n] = {
          position: "left",
          zposition: "back",
          blockUI: !0,
          moveBackground: !0
        }),
        (e[t].configuration[n] = {
          pageNodetype: "div",
          pageSelector: null,
          noPageSelector: [],
          wrapPageIfNeeded: !0,
          menuInsertMethod: "prependTo",
          menuInsertSelector: "body"
        }),
        (e[t].prototype.open = function() {
          if ((this.trigger("open:before"), !this.vars.opened)) {
            var e = this;
            this._openSetup(),
              setTimeout(function() {
                e._openFinish();
              }, this.conf.openingInterval),
              this.trigger("open:after");
          }
        }),
        (e[t].prototype._openSetup = function() {
          var t = this,
            r = this.opts[n];
          this.closeAllOthers(),
            o.$page.each(function() {
              e(this).data(s.style, e(this).attr("style") || "");
            }),
            o.$wndw.trigger(a.resize + "-" + n, [!0]);
          var l = [i.opened];
          r.blockUI && l.push(i.blocking),
            "modal" == r.blockUI && l.push(i.modal),
            r.moveBackground && l.push(i.background),
            "left" != r.position && l.push(i.mm(this.opts[n].position)),
            "back" != r.zposition && l.push(i.mm(this.opts[n].zposition)),
            o.$html.addClass(l.join(" ")),
            setTimeout(function() {
              t.vars.opened = !0;
            }, this.conf.openingInterval),
            this.$menu.addClass(i.opened);
        }),
        (e[t].prototype._openFinish = function() {
          var e = this;
          this.__transitionend(
            o.$page.first(),
            function() {
              e.trigger("open:finish");
            },
            this.conf.transitionDuration
          ),
            this.trigger("open:start"),
            o.$html.addClass(i.opening);
        }),
        (e[t].prototype.close = function() {
          if ((this.trigger("close:before"), this.vars.opened)) {
            var t = this;
            this.__transitionend(
              o.$page.first(),
              function() {
                t.$menu.removeClass(i.opened);
                var a = [
                  i.opened,
                  i.blocking,
                  i.modal,
                  i.background,
                  i.mm(t.opts[n].position),
                  i.mm(t.opts[n].zposition)
                ];
                o.$html.removeClass(a.join(" ")),
                  o.$page.each(function() {
                    e(this).attr("style", e(this).data(s.style));
                  }),
                  (t.vars.opened = !1),
                  t.trigger("close:finish");
              },
              this.conf.transitionDuration
            ),
              this.trigger("close:start"),
              o.$html.removeClass(i.opening),
              this.trigger("close:after");
          }
        }),
        (e[t].prototype.closeAllOthers = function() {
          o.$body
            .find("." + i.menu + "." + i.offcanvas)
            .not(this.$menu)
            .each(function() {
              var n = e(this).data(t);
              n && n.close && n.close();
            });
        }),
        (e[t].prototype.setPage = function(t) {
          this.trigger("setPage:before", t);
          var s = this,
            a = this.conf[n];
          (t && t.length) ||
            ((t = o.$body.find(a.pageSelector)),
            a.noPageSelector.length && (t = t.not(a.noPageSelector.join(", "))),
            t.length > 1 &&
              a.wrapPageIfNeeded &&
              (t = t
                .wrapAll("<" + this.conf[n].pageNodetype + " />")
                .parent())),
            t.each(function() {
              e(this).attr("id", e(this).attr("id") || s.__getUniqueId());
            }),
            t.addClass(i.page + " " + i.slideout),
            (o.$page = t),
            this.trigger("setPage:after", t);
        }),
        (e[t].prototype["_initWindow_" + n] = function() {
          o.$wndw.off(a.keydown + "-" + n).on(a.keydown + "-" + n, function(e) {
            if (o.$html.hasClass(i.opened) && 9 == e.keyCode)
              return e.preventDefault(), !1;
          });
          var e = 0;
          o.$wndw
            .off(a.resize + "-" + n)
            .on(a.resize + "-" + n, function(t, n) {
              if (1 == o.$page.length && (n || o.$html.hasClass(i.opened))) {
                var s = o.$wndw.height();
                (n || s != e) && ((e = s), o.$page.css("minHeight", s));
              }
            });
        }),
        (e[t].prototype._initBlocker = function() {
          var t = this;
          this.opts[n].blockUI &&
            (o.$blck ||
              (o.$blck = e(
                '<div id="' + i.blocker + '" class="' + i.slideout + '" />'
              )),
            o.$blck
              .appendTo(o.$body)
              .off(a.touchstart + "-" + n + " " + a.touchmove + "-" + n)
              .on(
                a.touchstart + "-" + n + " " + a.touchmove + "-" + n,
                function(e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    o.$blck.trigger(a.mousedown + "-" + n);
                }
              )
              .off(a.mousedown + "-" + n)
              .on(a.mousedown + "-" + n, function(e) {
                e.preventDefault(),
                  o.$html.hasClass(i.modal) || (t.closeAllOthers(), t.close());
              }));
        });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu scrollBugFix add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "scrollBugFix";
      (e[t].addons[n] = {
        setup: function() {
          var s = this.opts[n];
          this.conf[n];
          (o = e[t].glbl),
            e[t].support.touch &&
              this.opts.offCanvas &&
              this.opts.offCanvas.blockUI &&
              ("boolean" == typeof s && (s = { fix: s }),
              "object" != typeof s && (s = {}),
              (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
              s.fix &&
                (this.bind("open:start", function() {
                  this.$pnls.children("." + i.opened).scrollTop(0);
                }),
                this.bind("initMenu:after", function() {
                  this["_initWindow_" + n]();
                })));
        },
        add: function() {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e);
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { fix: !0 }),
        (e[t].prototype["_initWindow_" + n] = function() {
          var t = this;
          o.$docu
            .off(a.touchmove + "-" + n)
            .on(a.touchmove + "-" + n, function(e) {
              o.$html.hasClass(i.opened) && e.preventDefault();
            });
          var s = !1;
          o.$body
            .off(a.touchstart + "-" + n)
            .on(
              a.touchstart + "-" + n,
              "." + i.panels + "> ." + i.panel,
              function(e) {
                o.$html.hasClass(i.opened) &&
                  (s ||
                    ((s = !0),
                    0 === e.currentTarget.scrollTop
                      ? (e.currentTarget.scrollTop = 1)
                      : e.currentTarget.scrollHeight ===
                          e.currentTarget.scrollTop +
                            e.currentTarget.offsetHeight &&
                        (e.currentTarget.scrollTop -= 1),
                    (s = !1)));
              }
            )
            .off(a.touchmove + "-" + n)
            .on(
              a.touchmove + "-" + n,
              "." + i.panels + "> ." + i.panel,
              function(t) {
                o.$html.hasClass(i.opened) &&
                  e(this)[0].scrollHeight > e(this).innerHeight() &&
                  t.stopPropagation();
              }
            ),
            o.$wndw
              .off(a.orientationchange + "-" + n)
              .on(a.orientationchange + "-" + n, function() {
                t.$pnls
                  .children("." + i.opened)
                  .scrollTop(0)
                  .css({ "-webkit-overflow-scrolling": "auto" })
                  .css({ "-webkit-overflow-scrolling": "touch" });
              });
        });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu screenReader add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "screenReader";
      (e[t].addons[n] = {
        setup: function() {
          var a = this,
            r = this.opts[n],
            l = this.conf[n];
          (o = e[t].glbl),
            "boolean" == typeof r && (r = { aria: r, text: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            r.aria &&
              (this.bind("initAddons:after", function() {
                this.bind("initMenu:after", function() {
                  this.trigger("initMenu:after:sr-aria");
                }),
                  this.bind("initNavbar:after", function() {
                    this.trigger("initNavbar:after:sr-aria", arguments[0]);
                  }),
                  this.bind("openPanel:start", function() {
                    this.trigger("openPanel:start:sr-aria", arguments[0]);
                  }),
                  this.bind("close:start", function() {
                    this.trigger("close:start:sr-aria");
                  }),
                  this.bind("close:finish", function() {
                    this.trigger("close:finish:sr-aria");
                  }),
                  this.bind("open:start", function() {
                    this.trigger("open:start:sr-aria");
                  }),
                  this.bind("open:finish", function() {
                    this.trigger("open:finish:sr-aria");
                  });
              }),
              this.bind("updateListview", function() {
                this.$pnls
                  .find("." + i.listview)
                  .children()
                  .each(function() {
                    a.__sr_aria(e(this), "hidden", e(this).is("." + i.hidden));
                  });
              }),
              this.bind("openPanel:start", function(e) {
                var t = this.$menu
                    .find("." + i.panel)
                    .not(e)
                    .not(e.parents("." + i.panel)),
                  n = e.add(
                    e
                      .find("." + i.vertical + "." + i.opened)
                      .children("." + i.panel)
                  );
                this.__sr_aria(t, "hidden", !0),
                  this.__sr_aria(n, "hidden", !1);
              }),
              this.bind("closePanel", function(e) {
                this.__sr_aria(e, "hidden", !0);
              }),
              this.bind("initPanels:after", function(t) {
                var n = t.find("." + i.prev + ", ." + i.next).each(function() {
                  a.__sr_aria(
                    e(this),
                    "owns",
                    e(this)
                      .attr("href")
                      .replace("#", "")
                  );
                });
                this.__sr_aria(n, "haspopup", !0);
              }),
              this.bind("initNavbar:after", function(e) {
                var t = e.children("." + i.navbar);
                this.__sr_aria(t, "hidden", !e.hasClass(i.hasnavbar));
              }),
              r.text &&
                (this.bind("initlistview:after", function(e) {
                  var t = e
                    .find("." + i.listview)
                    .find("." + i.fullsubopen)
                    .parent()
                    .children("span");
                  this.__sr_aria(t, "hidden", !0);
                }),
                "parent" == this.opts.navbar.titleLink &&
                  this.bind("initNavbar:after", function(e) {
                    var t = e.children("." + i.navbar),
                      n = !!t.children("." + i.prev).length;
                    this.__sr_aria(t.children("." + i.title), "hidden", n);
                  }))),
            r.text &&
              (this.bind("initAddons:after", function() {
                this.bind("setPage:after", function() {
                  this.trigger("setPage:after:sr-text", arguments[0]);
                });
              }),
              this.bind("initNavbar:after", function(n) {
                var s = n.children("." + i.navbar),
                  a = s.children("." + i.title).text(),
                  o = e[t].i18n(l.text.closeSubmenu);
                a && (o += " (" + a + ")"),
                  s.children("." + i.prev).html(this.__sr_text(o));
              }),
              this.bind("initListview:after", function(n) {
                var o = n.data(s.parent);
                if (o && o.length) {
                  var r = o.children("." + i.next),
                    d = r
                      .nextAll("span, a")
                      .first()
                      .text(),
                    c = e[t].i18n(
                      l.text[
                        r.parent().is("." + i.vertical)
                          ? "toggleSubmenu"
                          : "openSubmenu"
                      ]
                    );
                  d && (c += " (" + d + ")"), r.html(a.__sr_text(c));
                }
              }));
        },
        add: function() {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("sronly");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { aria: !0, text: !0 }),
        (e[t].configuration[n] = {
          text: {
            closeMenu: "Close menu",
            closeSubmenu: "Close submenu",
            openSubmenu: "Open submenu",
            toggleSubmenu: "Toggle submenu"
          }
        }),
        (e[t].prototype.__sr_aria = function(e, t, n) {
          e.prop("aria-" + t, n)[n ? "attr" : "removeAttr"]("aria-" + t, n);
        }),
        (e[t].prototype.__sr_text = function(e) {
          return '<span class="' + i.sronly + '">' + e + "</span>";
        });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu autoHeight add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "autoHeight";
      (e[t].addons[n] = {
        setup: function() {
          var s = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof s && s && (s = { height: "auto" }),
            "string" == typeof s && (s = { height: s }),
            "object" != typeof s && (s = {}),
            (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
            "auto" == s.height || "highest" == s.height)
          ) {
            this.bind("initMenu:after", function() {
              this.$menu.addClass(i.autoheight);
            });
            var a = function(t) {
              if (!this.opts.offCanvas || this.vars.opened) {
                var n = Math.max(parseInt(this.$pnls.css("top"), 10), 0) || 0,
                  a = Math.max(parseInt(this.$pnls.css("bottom"), 10), 0) || 0,
                  o = 0;
                this.$menu.addClass(i.measureheight),
                  "auto" == s.height
                    ? ((t = t || this.$pnls.children("." + i.opened)),
                      t.is("." + i.vertical) &&
                        (t = t.parents("." + i.panel).not("." + i.vertical)),
                      t.length || (t = this.$pnls.children("." + i.panel)),
                      (o = t.first().outerHeight()))
                    : "highest" == s.height &&
                      this.$pnls.children().each(function() {
                        var t = e(this);
                        t.is("." + i.vertical) &&
                          (t = t
                            .parents("." + i.panel)
                            .not("." + i.vertical)
                            .first()),
                          (o = Math.max(o, t.outerHeight()));
                      }),
                  this.$menu.height(o + n + a).removeClass(i.measureheight);
              }
            };
            this.opts.offCanvas && this.bind("open:start", a),
              "highest" == s.height && this.bind("initPanels:after", a),
              "auto" == s.height &&
                (this.bind("updateListview", a),
                this.bind("openPanel:start", a),
                this.bind("closePanel", a));
          }
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("autoheight measureheight"),
            a.add("resize");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { height: "default" });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu backButton add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "backButton";
      (e[t].addons[n] = {
        setup: function() {
          if (this.opts.offCanvas) {
            var s = this,
              a = this.opts[n];
            this.conf[n];
            if (
              ((o = e[t].glbl),
              "boolean" == typeof a && (a = { close: a }),
              "object" != typeof a && (a = {}),
              (a = e.extend(!0, {}, e[t].defaults[n], a)),
              a.close)
            ) {
              var r = "#" + s.$menu.attr("id");
              this.bind("open:finish", function(e) {
                location.hash != r &&
                  history.pushState(null, document.title, r);
              }),
                e(window).on("popstate", function(e) {
                  o.$html.hasClass(i.opened)
                    ? (e.stopPropagation(), s.close())
                    : location.hash == r && (e.stopPropagation(), s.open());
                });
            }
          }
        },
        add: function() {
          return window.history && window.history.pushState
            ? ((i = e[t]._c), (s = e[t]._d), void (a = e[t]._e))
            : void (e[t].addons[n].setup = function() {});
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { close: !1 });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu counters add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "counters";
      (e[t].addons[n] = {
        setup: function() {
          var a = this,
            r = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof r && (r = { add: r, update: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            this.bind("initListview:after", function(t) {
              this.__refactorClass(
                e("em", t),
                this.conf.classNames[n].counter,
                "counter"
              );
            }),
            r.add &&
              this.bind("initListview:after", function(t) {
                var n;
                switch (r.addTo) {
                  case "panels":
                    n = t;
                    break;
                  default:
                    n = t.filter(r.addTo);
                }
                n.each(function() {
                  var t = e(this).data(s.parent);
                  t &&
                    (t.children("em." + i.counter).length ||
                      t.prepend(e('<em class="' + i.counter + '" />')));
                });
              }),
            r.update)
          ) {
            var l = function(t) {
              (t = t || this.$pnls.children("." + i.panel)),
                t.each(function() {
                  var t = e(this),
                    n = t.data(s.parent);
                  if (n) {
                    var o = n.children("em." + i.counter);
                    o.length &&
                      ((t = t.children("." + i.listview)),
                      t.length &&
                        o.html(a.__filterListItems(t.children()).length));
                  }
                });
            };
            this.bind("initListview:after", l), this.bind("updateListview", l);
          }
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("counter search noresultsmsg");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { add: !1, addTo: "panels", count: !1 }),
        (e[t].configuration.classNames[n] = { counter: "Counter" });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu columns add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "columns";
      (e[t].addons[n] = {
        setup: function() {
          var s = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof s && (s = { add: s }),
            "number" == typeof s && (s = { add: !0, visible: s }),
            "object" != typeof s && (s = {}),
            "number" == typeof s.visible &&
              (s.visible = { min: s.visible, max: s.visible }),
            (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
            s.add)
          ) {
            (s.visible.min = Math.max(1, Math.min(6, s.visible.min))),
              (s.visible.max = Math.max(
                s.visible.min,
                Math.min(6, s.visible.max)
              ));
            for (
              var a = this.opts.offCanvas
                  ? this.$menu.add(o.$html)
                  : this.$menu,
                r = "",
                l = 0;
              l <= s.visible.max;
              l++
            )
              r += " " + i.columns + "-" + l;
            r.length && (r = r.slice(1));
            var d = function(e) {
                var t = this.$pnls.children("." + i.subopened).length;
                e && !e.hasClass(i.subopened) && t++,
                  (t = Math.min(s.visible.max, Math.max(s.visible.min, t))),
                  a.removeClass(r).addClass(i.columns + "-" + t);
              },
              c = function(t) {
                (t = t || this.$pnls.children("." + i.opened)),
                  this.$pnls
                    .children("." + i.panel)
                    .removeClass(r)
                    .filter("." + i.subopened)
                    .add(t)
                    .slice(-s.visible.max)
                    .each(function(t) {
                      e(this).addClass(i.columns + "-" + t);
                    });
              };
            this.bind("initMenu:after", function() {
              this.$menu.addClass(i.columns);
            }),
              this.bind("openPanel:start", d),
              this.bind("openPanel:start", c);
          }
        },
        add: function() {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("columns");
        },
        clickAnchor: function(t, s) {
          if (!this.opts[n].add) return !1;
          if (s) {
            var a = t.attr("href");
            if (a.length > 1 && "#" == a.slice(0, 1))
              try {
                var o = e(a, this.$menu);
                if (o.is("." + i.panel))
                  for (
                    var r =
                      parseInt(
                        t
                          .closest("." + i.panel)
                          .attr("class")
                          .split(i.columns + "-")[1]
                          .split(" ")[0],
                        10
                      ) + 1;
                    r > 0;

                  ) {
                    var l = this.$pnls.children("." + i.columns + "-" + r);
                    if (!l.length) {
                      r = -1;
                      break;
                    }
                    r++,
                      l
                        .removeClass(i.subopened)
                        .removeClass(i.opened)
                        .removeClass(i.highest)
                        .addClass(i.hidden);
                  }
              } catch (d) {}
          }
        }
      }),
        (e[t].defaults[n] = { add: !1, visible: { min: 1, max: 3 } });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu dividers add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "dividers";
      (e[t].addons[n] = {
        setup: function() {
          var s = this,
            r = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof r && (r = { add: r, fixed: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            this.bind("initListview:after", function(e) {
              this.__refactorClass(
                e.find("li"),
                this.conf.classNames[n].collapsed,
                "collapsed"
              );
            }),
            r.add &&
              this.bind("initListview:after", function(t) {
                var n;
                switch (r.addTo) {
                  case "panels":
                    n = t;
                    break;
                  default:
                    n = t.filter(r.addTo);
                }
                n.length &&
                  n
                    .find("." + i.listview)
                    .find("." + i.divider)
                    .remove()
                    .end()
                    .each(function() {
                      var t = "";
                      s.__filterListItems(e(this).children()).each(function() {
                        var n = e
                          .trim(
                            e(this)
                              .children("a, span")
                              .text()
                          )
                          .slice(0, 1)
                          .toLowerCase();
                        n != t &&
                          n.length &&
                          ((t = n),
                          e(
                            '<li class="' + i.divider + '">' + n + "</li>"
                          ).insertBefore(this));
                      });
                    });
              }),
            r.collapse &&
              this.bind("initListview:after", function(t) {
                t.find("." + i.divider).each(function() {
                  var t = e(this),
                    n = t.nextUntil("." + i.divider, "." + i.collapsed);
                  n.length &&
                    (t.children("." + i.next).length ||
                      (t.wrapInner("<span />"),
                      t.prepend(
                        '<a href="#" class="' +
                          i.next +
                          " " +
                          i.fullsubopen +
                          '" />'
                      )));
                });
              }),
            r.fixed)
          ) {
            this.bind("initPanels:after", function() {
              "undefined" == typeof this.$fixeddivider &&
                (this.$fixeddivider = e(
                  '<ul class="' +
                    i.listview +
                    " " +
                    i.fixeddivider +
                    '"><li class="' +
                    i.divider +
                    '"></li></ul>'
                )
                  .prependTo(this.$pnls)
                  .children());
            });
            var l = function(t) {
              if (
                ((t = t || this.$pnls.children("." + i.opened)),
                !t.is(":hidden"))
              ) {
                var n = t
                    .children("." + i.listview)
                    .children("." + i.divider)
                    .not("." + i.hidden),
                  s = t.scrollTop() || 0,
                  a = "";
                n.each(function() {
                  e(this).position().top + s < s + 1 && (a = e(this).text());
                }),
                  this.$fixeddivider.text(a),
                  this.$pnls[a.length ? "addClass" : "removeClass"](
                    i.hasdividers
                  );
              }
            };
            this.bind("open:start", l),
              this.bind("openPanel:start", l),
              this.bind("updateListview", l),
              this.bind("initPanel:after", function(e) {
                e.off(a.scroll + "-" + n + " " + a.touchmove + "-" + n).on(
                  a.scroll + "-" + n + " " + a.touchmove + "-" + n,
                  function(t) {
                    l.call(s, e);
                  }
                );
              });
          }
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("collapsed uncollapsed fixeddivider hasdividers"),
            a.add("scroll");
        },
        clickAnchor: function(e, t) {
          if (this.opts[n].collapse && t) {
            var s = e.parent();
            if (s.is("." + i.divider)) {
              var a = s.nextUntil("." + i.divider, "." + i.collapsed);
              return (
                s.toggleClass(i.opened),
                a[s.hasClass(i.opened) ? "addClass" : "removeClass"](
                  i.uncollapsed
                ),
                !0
              );
            }
          }
          return !1;
        }
      }),
        (e[t].defaults[n] = {
          add: !1,
          addTo: "panels",
          fixed: !1,
          collapse: !1
        }),
        (e[t].configuration.classNames[n] = { collapsed: "Collapsed" });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu drag add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      function t(e, t, n) {
        return e < t && (e = t), e > n && (e = n), e;
      }
      function n(n, i, s) {
        var r,
          l,
          d,
          c = this,
          h = {
            events: "panleft panright",
            typeLower: "x",
            typeUpper: "X",
            open_dir: "right",
            close_dir: "left",
            negative: !1
          },
          f = "width",
          u = h.open_dir,
          p = function(e) {
            e <= n.maxStartPos && (m = 1);
          },
          v = function() {
            return e("." + o.slideout);
          },
          m = 0,
          b = 0,
          g = 0;
        switch (this.opts.offCanvas.position) {
          case "top":
          case "bottom":
            (h.events = "panup pandown"),
              (h.typeLower = "y"),
              (h.typeUpper = "Y"),
              (f = "height");
        }
        switch (this.opts.offCanvas.position) {
          case "right":
          case "bottom":
            (h.negative = !0),
              (p = function(e) {
                e >= s.$wndw[f]() - n.maxStartPos && (m = 1);
              });
        }
        switch (this.opts.offCanvas.position) {
          case "left":
            break;
          case "right":
            (h.open_dir = "left"), (h.close_dir = "right");
            break;
          case "top":
            (h.open_dir = "down"), (h.close_dir = "up");
            break;
          case "bottom":
            (h.open_dir = "up"), (h.close_dir = "down");
        }
        switch (this.opts.offCanvas.zposition) {
          case "front":
            v = function() {
              return this.$menu;
            };
        }
        var _ = this.__valueOrFn(n.node, this.$menu, s.$page);
        "string" == typeof _ && (_ = e(_));
        var y = new Hammer(_[0], this.opts[a].vendors.hammer);
        y.on("panstart", function(e) {
          p(e.center[h.typeLower]), (s.$slideOutNodes = v()), (u = h.open_dir);
        }),
          y.on(h.events + " panend", function(e) {
            m > 0 && e.preventDefault();
          }),
          y.on(h.events, function(e) {
            if (
              ((r = e["delta" + h.typeUpper]),
              h.negative && (r = -r),
              r != b && (u = r >= b ? h.open_dir : h.close_dir),
              (b = r),
              b > n.threshold && 1 == m)
            ) {
              if (s.$html.hasClass(o.opened)) return;
              (m = 2),
                c._openSetup(),
                c.trigger("open:start"),
                s.$html.addClass(o.dragging),
                (g = t(s.$wndw[f]() * i[f].perc, i[f].min, i[f].max));
            }
            2 == m &&
              ((l =
                t(b, 10, g) - ("front" == c.opts.offCanvas.zposition ? g : 0)),
              h.negative && (l = -l),
              (d = "translate" + h.typeUpper + "(" + l + "px )"),
              s.$slideOutNodes.css({
                "-webkit-transform": "-webkit-" + d,
                transform: d
              }));
          }),
          y.on("panend", function(e) {
            2 == m &&
              (s.$html.removeClass(o.dragging),
              s.$slideOutNodes.css("transform", ""),
              c[u == h.open_dir ? "_openFinish" : "close"]()),
              (m = 0);
          });
      }
      function i(e, t, n, i) {
        var s = this,
          l = e.data(r.parent);
        if (l) {
          l = l.closest("." + o.panel);
          var d = new Hammer(e[0], s.opts[a].vendors.hammer),
            c = null;
          d.on("panright", function(e) {
            c ||
              (s.openPanel(l),
              (c = setTimeout(function() {
                clearTimeout(c), (c = null);
              }, s.conf.openingInterval + s.conf.transitionDuration)));
          });
        }
      }
      var s = "mmenu",
        a = "drag";
      (e[s].addons[a] = {
        setup: function() {
          if (this.opts.offCanvas) {
            var t = this.opts[a],
              o = this.conf[a];
            (d = e[s].glbl),
              "boolean" == typeof t && (t = { menu: t, panels: t }),
              "object" != typeof t && (t = {}),
              "boolean" == typeof t.menu && (t.menu = { open: t.menu }),
              "object" != typeof t.menu && (t.menu = {}),
              "boolean" == typeof t.panels && (t.panels = { close: t.panels }),
              "object" != typeof t.panels && (t.panels = {}),
              (t = this.opts[a] = e.extend(!0, {}, e[s].defaults[a], t)),
              t.menu.open &&
                this.bind("setPage:after", function() {
                  n.call(this, t.menu, o.menu, d);
                }),
              t.panels.close &&
                this.bind("initPanel:after", function(e) {
                  i.call(this, e, t.panels, o.panels, d);
                });
          }
        },
        add: function() {
          return "function" != typeof Hammer || Hammer.VERSION < 2
            ? ((e[s].addons[a].add = function() {}),
              void (e[s].addons[a].setup = function() {}))
            : ((o = e[s]._c),
              (r = e[s]._d),
              (l = e[s]._e),
              void o.add("dragging"));
        },
        clickAnchor: function(e, t) {}
      }),
        (e[s].defaults[a] = {
          menu: { open: !1, maxStartPos: 100, threshold: 50 },
          panels: { close: !1 },
          vendors: { hammer: {} }
        }),
        (e[s].configuration[a] = {
          menu: {
            width: { perc: 0.8, min: 140, max: 440 },
            height: { perc: 0.8, min: 140, max: 880 }
          },
          panels: {}
        });
      var o, r, l, d;
    })(
      jQuery
    ) /*
 * jQuery mmenu dropdown add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "dropdown";
      (e[t].addons[n] = {
        setup: function() {
          if (this.opts.offCanvas) {
            var r = this,
              l = this.opts[n],
              d = this.conf[n];
            if (
              ((o = e[t].glbl),
              "boolean" == typeof l && l && (l = { drop: l }),
              "object" != typeof l && (l = {}),
              "string" == typeof l.position &&
                (l.position = { of: l.position }),
              (l = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], l)),
              l.drop)
            ) {
              var c;
              this.bind("initMenu:after", function() {
                if (
                  (this.$menu.addClass(i.dropdown),
                  l.tip && this.$menu.addClass(i.tip),
                  "string" != typeof l.position.of)
                ) {
                  var t = this._getOriginalMenuId();
                  t && t.length && (l.position.of = '[href="#' + t + '"]');
                }
                "string" == typeof l.position.of &&
                  ((c = e(l.position.of)),
                  (l.event = l.event.split(" ")),
                  1 == l.event.length && (l.event[1] = l.event[0]),
                  "hover" == l.event[0] &&
                    c.on(a.mouseenter + "-" + n, function() {
                      r.open();
                    }),
                  "hover" == l.event[1] &&
                    this.$menu.on(a.mouseleave + "-" + n, function() {
                      r.close();
                    }));
              }),
                this.bind("open:start", function() {
                  this.$menu.data(s.style, this.$menu.attr("style") || ""),
                    o.$html.addClass(i.dropdown);
                }),
                this.bind("close:finish", function() {
                  this.$menu.attr("style", this.$menu.data(s.style)),
                    o.$html.removeClass(i.dropdown);
                });
              var h = function(e, t) {
                  var n = t[0],
                    s = t[1],
                    a = "x" == e ? "scrollLeft" : "scrollTop",
                    r = "x" == e ? "outerWidth" : "outerHeight",
                    h = "x" == e ? "left" : "top",
                    f = "x" == e ? "right" : "bottom",
                    u = "x" == e ? "width" : "height",
                    p = "x" == e ? "maxWidth" : "maxHeight",
                    v = null,
                    m = o.$wndw[a](),
                    b = (c.offset()[h] -= m),
                    g = b + c[r](),
                    _ = o.$wndw[u](),
                    y = d.offset.button[e] + d.offset.viewport[e];
                  if (l.position[e])
                    switch (l.position[e]) {
                      case "left":
                      case "bottom":
                        v = "after";
                        break;
                      case "right":
                      case "top":
                        v = "before";
                    }
                  null === v &&
                    (v = b + (g - b) / 2 < _ / 2 ? "after" : "before");
                  var C, w;
                  return (
                    "after" == v
                      ? ((C = "x" == e ? b : g),
                        (w = _ - (C + y)),
                        (n[h] = C + d.offset.button[e]),
                        (n[f] = "auto"),
                        s.push(i["x" == e ? "tipleft" : "tiptop"]))
                      : ((C = "x" == e ? g : b),
                        (w = C - y),
                        (n[f] =
                          "calc( 100% - " + (C - d.offset.button[e]) + "px )"),
                        (n[h] = "auto"),
                        s.push(i["x" == e ? "tipright" : "tipbottom"])),
                    (n[p] = Math.min(d[u].max, w)),
                    [n, s]
                  );
                },
                f = function(e) {
                  if (this.vars.opened) {
                    this.$menu.attr("style", this.$menu.data(s.style));
                    var t = [{}, []];
                    (t = h.call(this, "y", t)),
                      (t = h.call(this, "x", t)),
                      this.$menu.css(t[0]),
                      l.tip &&
                        this.$menu
                          .removeClass(
                            i.tipleft +
                              " " +
                              i.tipright +
                              " " +
                              i.tiptop +
                              " " +
                              i.tipbottom
                          )
                          .addClass(t[1].join(" "));
                  }
                };
              this.bind("open:start", f),
                o.$wndw.on(a.resize + "-" + n, function(e) {
                  f.call(r);
                }),
                this.opts.offCanvas.blockUI ||
                  o.$wndw.on(a.scroll + "-" + n, function(e) {
                    f.call(r);
                  });
            }
          }
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("dropdown tip tipleft tipright tiptop tipbottom"),
            a.add("mouseenter mouseleave resize scroll");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = {
          drop: !1,
          event: "click",
          position: {},
          tip: !0
        }),
        (e[t].configuration[n] = {
          offset: { button: { x: -10, y: 10 }, viewport: { x: 20, y: 20 } },
          height: { max: 880 },
          width: { max: 440 }
        });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu fixedElements add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "fixedElements";
      (e[t].addons[n] = {
        setup: function() {
          if (this.opts.offCanvas) {
            var s = (this.opts[n], this.conf[n]);
            o = e[t].glbl;
            var a = function(t) {
              var a = this.conf.classNames[n].fixed,
                r = t.find("." + a);
              this.__refactorClass(r, a, "slideout"),
                r[s.elemInsertMethod](s.elemInsertSelector);
              var l = this.conf.classNames[n].sticky,
                d = t.find("." + l);
              this.__refactorClass(d, l, "sticky"),
                (d = t.find("." + i.sticky)),
                d.length &&
                  (this.bind("open:before", function() {
                    var t = o.$wndw.scrollTop() + s.sticky.offset;
                    d.each(function() {
                      e(this).css("top", parseInt(e(this).css("top"), 10) + t);
                    });
                  }),
                  this.bind("close:finish", function() {
                    d.css("top", "");
                  }));
            };
            this.bind("setPage:after", a);
          }
        },
        add: function() {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("sticky");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].configuration[n] = {
          sticky: { offset: 0 },
          elemInsertMethod: "appendTo",
          elemInsertSelector: "body"
        }),
        (e[t].configuration.classNames[n] = {
          fixed: "Fixed",
          sticky: "Sticky"
        });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu iconPanels add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "iconPanels";
      (e[t].addons[n] = {
        setup: function() {
          var s = this,
            a = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof a && (a = { add: a }),
            "number" == typeof a && (a = { add: !0, visible: a }),
            "object" != typeof a && (a = {}),
            (a = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], a)),
            a.visible++,
            a.add)
          ) {
            for (var r = "", l = 0; l <= a.visible; l++)
              r += " " + i.iconpanel + "-" + l;
            r.length && (r = r.slice(1));
            var d = function(t) {
              t.hasClass(i.vertical) ||
                s.$pnls
                  .children("." + i.panel)
                  .removeClass(r)
                  .filter("." + i.subopened)
                  .removeClass(i.hidden)
                  .add(t)
                  .not("." + i.vertical)
                  .slice(-a.visible)
                  .each(function(t) {
                    e(this).addClass(i.iconpanel + "-" + t);
                  });
            };
            this.bind("initMenu:after", function() {
              this.$menu.addClass(i.iconpanel);
            }),
              this.bind("openPanel:start", d),
              this.bind("initPanels:after", function(e) {
                d.call(s, s.$pnls.children("." + i.opened));
              }),
              this.bind("initListview:after", function(e) {
                e.hasClass(i.vertical) ||
                  e.children("." + i.subblocker).length ||
                  e.prepend(
                    '<a href="#' +
                      e.closest("." + i.panel).attr("id") +
                      '" class="' +
                      i.subblocker +
                      '" />'
                  );
              });
          }
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("iconpanel subblocker");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { add: !1, visible: 3 });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu keyboardNavigation add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      function t(t, n) {
        t = t || this.$pnls.children("." + a.opened);
        var i = e(),
          s = this.$menu
            .children(
              "." + a.mm("navbars-top") + ", ." + a.mm("navbars-bottom")
            )
            .children("." + a.navbar);
        s.find(d).filter(":focus").length ||
          ("default" == n &&
            ((i = t
              .children("." + a.listview)
              .find("a[href]")
              .not("." + a.hidden)),
            i.length || (i = t.find(d).not("." + a.hidden)),
            i.length || (i = s.find(d).not("." + a.hidden))),
          i.length || (i = this.$menu.children("." + a.tabstart)),
          i.first().focus());
      }
      function n(e) {
        e || (e = this.$pnls.children("." + a.opened));
        var t = this.$pnls.children("." + a.panel),
          n = t.not(e);
        n.find(d).attr("tabindex", -1),
          e.find(d).attr("tabindex", 0),
          e
            .find("." + a.mm("toggle") + ", ." + a.mm("check"))
            .attr("tabindex", -1),
          e
            .children("." + a.navbar)
            .children("." + a.title)
            .attr("tabindex", -1);
      }
      var i = "mmenu",
        s = "keyboardNavigation";
      (e[i].addons[s] = {
        setup: function() {
          if (!e[i].support.touch) {
            var o = this.opts[s];
            this.conf[s];
            if (
              ((l = e[i].glbl),
              ("boolean" != typeof o && "string" != typeof o) ||
                (o = { enable: o }),
              "object" != typeof o && (o = {}),
              (o = this.opts[s] = e.extend(!0, {}, e[i].defaults[s], o)),
              o.enable)
            ) {
              var r = e(
                  '<button class="' +
                    a.tabstart +
                    '" tabindex="0" type="button" />'
                ),
                d = e(
                  '<button class="' +
                    a.tabend +
                    '" tabindex="0" type="button" />'
                );
              this.bind("initMenu:after", function() {
                o.enhance && this.$menu.addClass(a.keyboardfocus),
                  this["_initWindow_" + s](o.enhance);
              }),
                this.bind("initOpened:before", function() {
                  this.$menu
                    .prepend(r)
                    .append(d)
                    .children(
                      "." + a.mm("navbars-top") + ", ." + a.mm("navbars-bottom")
                    )
                    .children("." + a.navbar)
                    .children("a." + a.title)
                    .attr("tabindex", -1);
                }),
                this.bind("open:start", function() {
                  n.call(this);
                }),
                this.bind("open:finish", function() {
                  t.call(this, null, o.enable);
                }),
                this.bind("openPanel:start", function(e) {
                  n.call(this, e);
                }),
                this.bind("openPanel:finish", function(e) {
                  t.call(this, e, o.enable);
                }),
                this.bind("initOpened:after", function() {
                  this.__sr_aria(
                    this.$menu.children(
                      "." + a.mm("tabstart") + ", ." + a.mm("tabend")
                    ),
                    "hidden",
                    !0
                  );
                });
            }
          }
        },
        add: function() {
          (a = e[i]._c),
            (o = e[i]._d),
            (r = e[i]._e),
            a.add("tabstart tabend keyboardfocus"),
            r.add("focusin keydown");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[i].defaults[s] = { enable: !1, enhance: !1 }),
        (e[i].configuration[s] = {}),
        (e[i].prototype["_initWindow_" + s] = function(t) {
          l.$wndw.off(r.keydown + "-offCanvas"),
            l.$wndw
              .off(r.focusin + "-" + s)
              .on(r.focusin + "-" + s, function(t) {
                if (l.$html.hasClass(a.opened)) {
                  var n = e(t.target);
                  n.is("." + a.tabend) &&
                    n
                      .parent()
                      .find("." + a.tabstart)
                      .focus();
                }
              }),
            l.$wndw
              .off(r.keydown + "-" + s)
              .on(r.keydown + "-" + s, function(t) {
                var n = e(t.target),
                  i = n.closest("." + a.menu);
                if (i.length) {
                  i.data("mmenu");
                  if (n.is("input, textarea"));
                  else
                    switch (t.keyCode) {
                      case 13:
                        (n.is(".mm-toggle") || n.is(".mm-check")) &&
                          n.trigger(r.click);
                        break;
                      case 32:
                      case 37:
                      case 38:
                      case 39:
                      case 40:
                        t.preventDefault();
                    }
                }
              }),
            t &&
              l.$wndw
                .off(r.keydown + "-" + s)
                .on(r.keydown + "-" + s, function(t) {
                  var n = e(t.target),
                    i = n.closest("." + a.menu);
                  if (i.length) {
                    var s = i.data("mmenu");
                    if (n.is("input, textarea"))
                      switch (t.keyCode) {
                        case 27:
                          n.val("");
                      }
                    else
                      switch (t.keyCode) {
                        case 8:
                          var r = n.closest("." + a.panel).data(o.parent);
                          r &&
                            r.length &&
                            s.openPanel(r.closest("." + a.panel));
                          break;
                        case 27:
                          i.hasClass(a.offcanvas) && s.close();
                      }
                  }
                });
        });
      var a,
        o,
        r,
        l,
        d = "input, select, textarea, button, label, a[href]";
    })(
      jQuery
    ) /*
 * jQuery mmenu lazySubmenus add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "lazySubmenus";
      (e[t].addons[n] = {
        setup: function() {
          var s = this.opts[n];
          this.conf[n];
          (o = e[t].glbl),
            "boolean" == typeof s && (s = { load: s }),
            "object" != typeof s && (s = {}),
            (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
            s.load &&
              (this.bind("initMenu:after", function() {
                this.$pnls
                  .find("li")
                  .children(this.conf.panelNodetype)
                  .not("." + i.inset)
                  .not("." + i.nolistview)
                  .not("." + i.nopanel)
                  .addClass(
                    i.lazysubmenu + " " + i.nolistview + " " + i.nopanel
                  );
              }),
              this.bind("initPanels:before", function(e) {
                (e = e || this.$pnls.children(this.conf.panelNodetype)),
                  this.__findAddBack(e, "." + i.lazysubmenu)
                    .not("." + i.lazysubmenu + " ." + i.lazysubmenu)
                    .removeClass(
                      i.lazysubmenu + " " + i.nolistview + " " + i.nopanel
                    );
              }),
              this.bind("initOpened:before", function() {
                var e = this.$pnls
                  .find("." + this.conf.classNames.selected)
                  .parents("." + i.lazysubmenu);
                e.length &&
                  (e.removeClass(
                    i.lazysubmenu + " " + i.nolistview + " " + i.nopanel
                  ),
                  this.initPanels(e.last()));
              }),
              this.bind("openPanel:before", function(e) {
                var t = this.__findAddBack(e, "." + i.lazysubmenu).not(
                  "." + i.lazysubmenu + " ." + i.lazysubmenu
                );
                t.length && this.initPanels(t);
              }));
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("lazysubmenu"),
            s.add("lazysubmenu");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { load: !1 }),
        (e[t].configuration[n] = {});
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu navbar add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "navbars";
      (e[t].addons[n] = {
        setup: function() {
          var s = this,
            a = this.opts[n],
            r = this.conf[n];
          if (((o = e[t].glbl), "undefined" != typeof a)) {
            a instanceof Array || (a = [a]);
            var l = {},
              d = {};
            a.length &&
              (e.each(a, function(o) {
                var c = a[o];
                "boolean" == typeof c && c && (c = {}),
                  "object" != typeof c && (c = {}),
                  "undefined" == typeof c.content &&
                    (c.content = ["prev", "title"]),
                  c.content instanceof Array || (c.content = [c.content]),
                  (c = e.extend(!0, {}, s.opts.navbar, c));
                var h = e('<div class="' + i.navbar + '" />'),
                  f = c.height;
                "number" != typeof f && (f = 1),
                  (f = Math.min(4, Math.max(1, f))),
                  h.addClass(i.navbar + "-size-" + f);
                var u = c.position;
                "bottom" != u && (u = "top"),
                  l[u] || (l[u] = 0),
                  (l[u] += f),
                  d[u] ||
                    (d[u] = e('<div class="' + i.navbars + "-" + u + '" />')),
                  d[u].append(h);
                for (var p = 0, v = 0, m = c.content.length; v < m; v++) {
                  var b = e[t].addons[n][c.content[v]] || !1;
                  b
                    ? (p += b.call(s, h, c, r))
                    : ((b = c.content[v]),
                      b instanceof e || (b = e(c.content[v])),
                      h.append(b));
                }
                (p += Math.ceil(h.children().not("." + i.btn).length / f)),
                  p > 1 && h.addClass(i.navbar + "-content-" + p),
                  h.children("." + i.btn).length && h.addClass(i.hasbtns);
              }),
              this.bind("initMenu:after", function() {
                for (var e in l)
                  this.$menu.addClass(i.hasnavbar + "-" + e + "-" + l[e]),
                    this.$menu["bottom" == e ? "append" : "prepend"](d[e]);
              }));
          }
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("navbars close hasbtns");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].configuration[n] = { breadcrumbSeparator: "/" }),
        (e[t].configuration.classNames[n] = {});
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu navbar add-on breadcrumbs content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "navbars",
        i = "breadcrumbs";
      e[t].addons[n][i] = function(n, i, s) {
        var a = this,
          o = e[t]._c,
          r = e[t]._d;
        o.add("breadcrumbs separator");
        var l = e('<span class="' + o.breadcrumbs + '" />').appendTo(n);
        return (
          this.bind("initNavbar:after", function(t) {
            t.removeClass(o.hasnavbar);
            for (
              var n = [],
                i = e('<span class="' + o.breadcrumbs + '"></span>'),
                a = t,
                l = !0;
              a && a.length;

            ) {
              if (
                (a.is("." + o.panel) || (a = a.closest("." + o.panel)),
                !a.hasClass(o.vertical))
              ) {
                var d = a
                  .children("." + o.navbar)
                  .children("." + o.title)
                  .text();
                n.unshift(
                  l
                    ? "<span>" + d + "</span>"
                    : '<a href="#' + a.attr("id") + '">' + d + "</a>"
                ),
                  (l = !1);
              }
              a = a.data(r.parent);
            }
            i.append(
              n.join(
                '<span class="' +
                  o.separator +
                  '">' +
                  s.breadcrumbSeparator +
                  "</span>"
              )
            ).appendTo(t.children("." + o.navbar));
          }),
          this.bind("openPanel:start", function(e) {
            l.html(
              e
                .children("." + o.navbar)
                .children("." + o.breadcrumbs)
                .html() || ""
            );
          }),
          this.bind("initNavbar:after:sr-aria", function(t) {
            t.children("." + o.navbar)
              .children("." + o.breadcrumbs)
              .children("a")
              .each(function() {
                a.__sr_aria(
                  e(this),
                  "owns",
                  e(this)
                    .attr("href")
                    .slice(1)
                );
              });
          }),
          0
        );
      };
    })(
      jQuery
    ) /*
 * jQuery mmenu navbar add-on close content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "navbars",
        i = "close";
      e[t].addons[n][i] = function(n, i) {
        var s = e[t]._c,
          a = (e[t].glbl,
          e('<a class="' + s.close + " " + s.btn + '" href="#" />').appendTo(
            n
          ));
        return (
          this.bind("setPage:after", function(e) {
            a.attr("href", "#" + e.attr("id"));
          }),
          this.bind("setPage:after:sr-text", function(n) {
            a.html(
              this.__sr_text(e[t].i18n(this.conf.screenReader.text.closeMenu))
            ),
              this.__sr_aria(a, "owns", a.attr("href").slice(1));
          }),
          -1
        );
      };
    })(
      jQuery
    ) /*
 * jQuery mmenu navbar add-on next content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "navbars",
        i = "next";
      (e[t].addons[n][i] = function(i, s) {
        var a,
          o,
          r,
          l = e[t]._c,
          d = e('<a class="' + l.next + " " + l.btn + '" href="#" />').appendTo(
            i
          );
        return (
          this.bind("openPanel:start", function(e) {
            (a = e.find("." + this.conf.classNames[n].panelNext)),
              (o = a.attr("href")),
              (r = a.html()),
              o ? d.attr("href", o) : d.removeAttr("href"),
              d[o || r ? "removeClass" : "addClass"](l.hidden),
              d.html(r);
          }),
          this.bind("openPanel:start:sr-aria", function(e) {
            this.__sr_aria(d, "hidden", d.hasClass(l.hidden)),
              this.__sr_aria(d, "owns", (d.attr("href") || "").slice(1));
          }),
          -1
        );
      }),
        (e[t].configuration.classNames[n].panelNext = "Next");
    })(
      jQuery
    ) /*
 * jQuery mmenu navbar add-on prev content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "navbars",
        i = "prev";
      (e[t].addons[n][i] = function(i, s) {
        var a = e[t]._c,
          o = e('<a class="' + a.prev + " " + a.btn + '" href="#" />').appendTo(
            i
          );
        this.bind("initNavbar:after", function(e) {
          e.removeClass(a.hasnavbar);
        });
        var r, l, d;
        return (
          this.bind("openPanel:start", function(e) {
            e.hasClass(a.vertical) ||
              ((r = e.find("." + this.conf.classNames[n].panelPrev)),
              r.length ||
                (r = e.children("." + a.navbar).children("." + a.prev)),
              (l = r.attr("href")),
              (d = r.html()),
              l ? o.attr("href", l) : o.removeAttr("href"),
              o[l || d ? "removeClass" : "addClass"](a.hidden),
              o.html(d));
          }),
          this.bind("initNavbar:after:sr-aria", function(e) {
            var t = e.children("." + a.navbar);
            this.__sr_aria(t, "hidden", !0);
          }),
          this.bind("openPanel:start:sr-aria", function(e) {
            this.__sr_aria(o, "hidden", o.hasClass(a.hidden)),
              this.__sr_aria(o, "owns", (o.attr("href") || "").slice(1));
          }),
          -1
        );
      }),
        (e[t].configuration.classNames[n].panelPrev = "Prev");
    })(
      jQuery
    ) /*
 * jQuery mmenu navbar add-on searchfield content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "navbars",
        i = "searchfield";
      e[t].addons[n][i] = function(n, i) {
        var s = e[t]._c,
          a = e('<div class="' + s.search + '" />').appendTo(n);
        return (
          "object" != typeof this.opts.searchfield &&
            (this.opts.searchfield = {}),
          (this.opts.searchfield.add = !0),
          (this.opts.searchfield.addTo = a),
          0
        );
      };
    })(
      jQuery
    ) /*
 * jQuery mmenu navbar add-on title content
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "navbars",
        i = "title";
      (e[t].addons[n][i] = function(i, s) {
        var a,
          o,
          r,
          l = e[t]._c,
          d = e('<a class="' + l.title + '" />').appendTo(i);
        this.bind("openPanel:start", function(e) {
          e.hasClass(l.vertical) ||
            ((r = e.find("." + this.conf.classNames[n].panelTitle)),
            r.length ||
              (r = e.children("." + l.navbar).children("." + l.title)),
            (a = r.attr("href")),
            (o = r.html() || s.title),
            a ? d.attr("href", a) : d.removeAttr("href"),
            d[a || o ? "removeClass" : "addClass"](l.hidden),
            d.html(o));
        });
        var c;
        return (
          this.bind("openPanel:start:sr-aria", function(e) {
            if (
              this.opts.screenReader.text &&
              (c ||
                (c = this.$menu
                  .children("." + l.navbars + "-top, ." + l.navbars + "-bottom")
                  .children("." + l.navbar)
                  .children("." + l.prev)),
              c.length)
            ) {
              var t = !0;
              "parent" == this.opts.navbar.titleLink &&
                (t = !c.hasClass(l.hidden)),
                this.__sr_aria(d, "hidden", t);
            }
          }),
          0
        );
      }),
        (e[t].configuration.classNames[n].panelTitle = "Title");
    })(
      jQuery
    ) /*
 * jQuery mmenu pageScroll add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      function t(e) {
        d &&
          d.length &&
          d.is(":visible") &&
          l.$html.add(l.$body).animate({ scrollTop: d.offset().top + e }),
          (d = !1);
      }
      function n(e) {
        try {
          return !("#" == e || "#" != e.slice(0, 1) || !l.$page.find(e).length);
        } catch (t) {
          return !1;
        }
      }
      var i = "mmenu",
        s = "pageScroll";
      (e[i].addons[s] = {
        setup: function() {
          var o = this,
            d = this.opts[s],
            c = this.conf[s];
          if (
            ((l = e[i].glbl),
            "boolean" == typeof d && (d = { scroll: d }),
            (d = this.opts[s] = e.extend(!0, {}, e[i].defaults[s], d)),
            d.scroll &&
              this.bind("close:finish", function() {
                t(c.scrollOffset);
              }),
            d.update)
          ) {
            var o = this,
              h = [],
              f = [];
            o.bind("initListview:after", function(t) {
              o
                .__filterListItemAnchors(
                  t.find("." + a.listview).children("li")
                )
                .each(function() {
                  var t = e(this).attr("href");
                  n(t) && h.push(t);
                }),
                (f = h.reverse());
            });
            var u = -1;
            l.$wndw.on(r.scroll + "-" + s, function(t) {
              for (var n = l.$wndw.scrollTop(), i = 0; i < f.length; i++)
                if (e(f[i]).offset().top < n + c.updateOffset) {
                  u !== i &&
                    ((u = i),
                    o.setSelected(
                      o
                        .__filterListItemAnchors(
                          o.$pnls
                            .children("." + a.opened)
                            .find("." + a.listview)
                            .children("li")
                        )
                        .filter('[href="' + f[i] + '"]')
                        .parent()
                    ));
                  break;
                }
            });
          }
        },
        add: function() {
          (a = e[i]._c), (o = e[i]._d), (r = e[i]._e);
        },
        clickAnchor: function(i, o) {
          if (
            ((d = !1),
            o &&
              this.opts[s].scroll &&
              this.opts.offCanvas &&
              l.$page &&
              l.$page.length)
          ) {
            var r = i.attr("href");
            n(r) &&
              ((d = e(r)),
              l.$html.hasClass(a.mm("widescreen")) &&
                t(this.conf[s].scrollOffset));
          }
        }
      }),
        (e[i].defaults[s] = { scroll: !1, update: !1 }),
        (e[i].configuration[s] = { scrollOffset: 0, updateOffset: 50 });
      var a,
        o,
        r,
        l,
        d = !1;
    })(
      jQuery
    ) /*
 * jQuery mmenu RTL add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "rtl";
      (e[t].addons[n] = {
        setup: function() {
          var s = this.opts[n];
          this.conf[n];
          (o = e[t].glbl),
            "object" != typeof s && (s = { use: s }),
            (s = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], s)),
            "boolean" != typeof s.use &&
              (s.use = "rtl" == (o.$html.attr("dir") || "").toLowerCase()),
            s.use &&
              this.bind("initMenu:after", function() {
                this.$menu.addClass(i.rtl);
              });
        },
        add: function() {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("rtl");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { use: "detect" });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu searchfield add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      function t(e) {
        switch (e) {
          case 9:
          case 16:
          case 17:
          case 18:
          case 37:
          case 38:
          case 39:
          case 40:
            return !0;
        }
        return !1;
      }
      var n = "mmenu",
        i = "searchfield";
      (e[n].addons[i] = {
        setup: function() {
          var l = this,
            d = this.opts[i],
            c = this.conf[i];
          (r = e[n].glbl),
            "boolean" == typeof d && (d = { add: d }),
            "object" != typeof d && (d = {}),
            "boolean" == typeof d.resultsPanel &&
              (d.resultsPanel = { add: d.resultsPanel }),
            (d = this.opts[i] = e.extend(!0, {}, e[n].defaults[i], d)),
            (c = this.conf[i] = e.extend(!0, {}, e[n].configuration[i], c)),
            this.bind("close:start", function() {
              this.$menu
                .find("." + s.search)
                .find("input")
                .blur();
            }),
            this.bind("initPanels:after", function(r) {
              if (d.add) {
                var h;
                switch (d.addTo) {
                  case "panels":
                    h = r;
                    break;
                  default:
                    h = this.$menu.find(d.addTo);
                }
                if (
                  (h.each(function() {
                    var t = e(this);
                    if (!t.is("." + s.panel) || !t.is("." + s.vertical)) {
                      if (!t.children("." + s.search).length) {
                        var i = l.__valueOrFn(c.clear, t),
                          a = l.__valueOrFn(c.form, t),
                          r = l.__valueOrFn(c.input, t),
                          h = l.__valueOrFn(c.submit, t),
                          f = e(
                            "<" +
                              (a ? "form" : "div") +
                              ' class="' +
                              s.search +
                              '" />'
                          ),
                          u = e(
                            '<input placeholder="' +
                              e[n].i18n(d.placeholder) +
                              '" type="text" autocomplete="off" />'
                          );
                        f.append(u);
                        var p;
                        if (r) for (p in r) u.attr(p, r[p]);
                        if (
                          (i &&
                            e(
                              '<a class="' +
                                s.btn +
                                " " +
                                s.clear +
                                '" href="#" />'
                            )
                              .appendTo(f)
                              .on(o.click + "-searchfield", function(e) {
                                e.preventDefault(),
                                  u.val("").trigger(o.keyup + "-searchfield");
                              }),
                          a)
                        ) {
                          for (p in a) f.attr(p, a[p]);
                          h &&
                            !i &&
                            e(
                              '<a class="' +
                                s.btn +
                                " " +
                                s.next +
                                '" href="#" />'
                            )
                              .appendTo(f)
                              .on(o.click + "-searchfield", function(e) {
                                e.preventDefault(), f.submit();
                              });
                        }
                        t.hasClass(s.search)
                          ? t.replaceWith(f)
                          : t.prepend(f).addClass(s.hassearch);
                      }
                      if (d.noResults) {
                        var v = t.closest("." + s.panel).length;
                        if (
                          (v || (t = l.$pnls.children("." + s.panel).first()),
                          !t.children("." + s.noresultsmsg).length)
                        ) {
                          var m = t.children("." + s.listview).first(),
                            b = e(
                              '<div class="' +
                                s.noresultsmsg +
                                " " +
                                s.hidden +
                                '" />'
                            );
                          b.append(e[n].i18n(d.noResults))[
                            m.length ? "insertAfter" : "prependTo"
                          ](m.length ? m : t);
                        }
                      }
                    }
                  }),
                  d.search)
                ) {
                  if (d.resultsPanel.add) {
                    d.showSubPanels = !1;
                    var f = this.$pnls.children("." + s.resultspanel);
                    f.length ||
                      ((f = e(
                        '<div class="' +
                          s.resultspanel +
                          " " +
                          s.noanimation +
                          " " +
                          s.hidden +
                          '" />'
                      )
                        .appendTo(this.$pnls)
                        .append(
                          '<div class="' +
                            s.navbar +
                            " " +
                            s.hidden +
                            '"><a class="' +
                            s.title +
                            '">' +
                            e[n].i18n(d.resultsPanel.title) +
                            "</a></div>"
                        )
                        .append('<ul class="' + s.listview + '" />')
                        .append(
                          this.$pnls
                            .find("." + s.noresultsmsg)
                            .first()
                            .clone()
                        )),
                      this._initPanel(f));
                  }
                  this.$menu.find("." + s.search).each(function() {
                    var n,
                      r,
                      c = e(this),
                      h = c.closest("." + s.panel).length;
                    h
                      ? ((n = c.closest("." + s.panel)), (r = n))
                      : ((n = l.$pnls.find("." + s.panel)), (r = l.$menu)),
                      d.resultsPanel.add && (n = n.not(f));
                    var u = c.children("input"),
                      p = l.__findAddBack(n, "." + s.listview).children("li"),
                      v = p.filter("." + s.divider),
                      m = l.__filterListItems(p),
                      b = "a",
                      g = b + ", span",
                      _ = "",
                      y = function() {
                        var t = u.val().toLowerCase();
                        if (t != _) {
                          if (
                            ((_ = t),
                            d.resultsPanel.add &&
                              f.children("." + s.listview).empty(),
                            n.scrollTop(0),
                            m
                              .add(v)
                              .addClass(s.hidden)
                              .find("." + s.fullsubopensearch)
                              .removeClass(
                                s.fullsubopen + " " + s.fullsubopensearch
                              ),
                            m.each(function() {
                              var t = e(this),
                                n = b;
                              (d.showTextItems ||
                                (d.showSubPanels && t.find("." + s.next))) &&
                                (n = g);
                              var i =
                                t.data(a.searchtext) ||
                                t
                                  .children(n)
                                  .not("." + s.next)
                                  .text();
                              i.toLowerCase().indexOf(_) > -1 &&
                                t
                                  .add(t.prevAll("." + s.divider).first())
                                  .removeClass(s.hidden);
                            }),
                            d.showSubPanels &&
                              n.each(function(t) {
                                var n = e(this);
                                l.__filterListItems(
                                  n.find("." + s.listview).children()
                                ).each(function() {
                                  var t = e(this),
                                    n = t.data(a.child);
                                  t.removeClass(s.nosubresults),
                                    n &&
                                      n
                                        .find("." + s.listview)
                                        .children()
                                        .removeClass(s.hidden);
                                });
                              }),
                            d.resultsPanel.add)
                          )
                            if ("" === _)
                              this.closeAllPanels(
                                this.$pnls.children("." + s.subopened).last()
                              );
                            else {
                              var i = e();
                              n.each(function() {
                                var t = l
                                  .__filterListItems(
                                    e(this)
                                      .find("." + s.listview)
                                      .children()
                                  )
                                  .not("." + s.hidden)
                                  .clone(!0);
                                t.length &&
                                  (d.resultsPanel.dividers &&
                                    (i = i.add(
                                      '<li class="' +
                                        s.divider +
                                        '">' +
                                        e(this)
                                          .children("." + s.navbar)
                                          .children("." + s.title)
                                          .text() +
                                        "</li>"
                                    )),
                                  t
                                    .children(
                                      "." +
                                        s.mm("toggle") +
                                        ", ." +
                                        s.mm("check")
                                    )
                                    .remove(),
                                  (i = i.add(t)));
                              }),
                                i.find("." + s.next).remove(),
                                f.children("." + s.listview).append(i),
                                this.openPanel(f);
                            }
                          else
                            e(n.get().reverse()).each(function(t) {
                              var n = e(this),
                                i = n.data(a.parent);
                              i &&
                                (l.__filterListItems(
                                  n.find("." + s.listview).children()
                                ).length
                                  ? (i.hasClass(s.hidden) &&
                                      i
                                        .children("." + s.next)
                                        .not("." + s.fullsubopen)
                                        .addClass(s.fullsubopen)
                                        .addClass(s.fullsubopensearch),
                                    i
                                      .removeClass(s.hidden)
                                      .removeClass(s.nosubresults)
                                      .prevAll("." + s.divider)
                                      .first()
                                      .removeClass(s.hidden))
                                  : h ||
                                    ((n.hasClass(s.opened) ||
                                      n.hasClass(s.subopened)) &&
                                      setTimeout(function() {
                                        l.openPanel(i.closest("." + s.panel));
                                      }, (t + 1) *
                                        (1.5 * l.conf.openingInterval)),
                                    i.addClass(s.nosubresults)));
                            });
                          r
                            .find("." + s.noresultsmsg)
                            [
                              m.not("." + s.hidden).length
                                ? "addClass"
                                : "removeClass"
                            ](s.hidden),
                            this.trigger("updateListview");
                        }
                      };
                    u.off(o.keyup + "-" + i + " " + o.change + "-" + i)
                      .on(o.keyup + "-" + i, function(e) {
                        t(e.keyCode) || y.call(l);
                      })
                      .on(o.change + "-" + i, function(e) {
                        y.call(l);
                      });
                    var C = c.children("." + s.btn);
                    C.length &&
                      u.on(o.keyup + "-" + i, function(e) {
                        C[u.val().length ? "removeClass" : "addClass"](
                          s.hidden
                        );
                      }),
                      u.trigger(o.keyup + "-" + i);
                  });
                }
              }
            });
        },
        add: function() {
          (s = e[n]._c),
            (a = e[n]._d),
            (o = e[n]._e),
            s.add(
              "clear search hassearch resultspanel noresultsmsg noresults nosubresults fullsubopensearch"
            ),
            a.add("searchtext"),
            o.add("change keyup");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[n].defaults[i] = {
          add: !1,
          addTo: "panels",
          placeholder: "Search",
          noResults: "No results found.",
          resultsPanel: { add: !1, dividers: !0, title: "Search results" },
          search: !0,
          showTextItems: !1,
          showSubPanels: !0
        }),
        (e[n].configuration[i] = {
          clear: !1,
          form: !1,
          input: !1,
          submit: !1
        });
      var s, a, o, r;
    })(
      jQuery
    ) /*
 * jQuery mmenu sectionIndexer add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "sectionIndexer";
      (e[t].addons[n] = {
        setup: function() {
          var s = this,
            r = this.opts[n];
          this.conf[n];
          (o = e[t].glbl),
            "boolean" == typeof r && (r = { add: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            this.bind("initPanels:after", function(t) {
              if (r.add) {
                var o;
                switch (r.addTo) {
                  case "panels":
                    o = t;
                    break;
                  default:
                    o = e(r.addTo, this.$menu).filter("." + i.panel);
                }
                o
                  .find("." + i.divider)
                  .closest("." + i.panel)
                  .addClass(i.hasindexer),
                  this.$indexer ||
                    ((this.$indexer = e('<div class="' + i.indexer + '" />')
                      .prependTo(this.$pnls)
                      .append(
                        '<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>'
                      )),
                    this.$indexer
                      .children()
                      .on(
                        a.mouseover + "-" + n + " " + a.touchstart + "-" + n,
                        function(t) {
                          var n = e(this)
                              .attr("href")
                              .slice(1),
                            a = s.$pnls.children("." + i.opened),
                            o = a.find("." + i.listview),
                            r = -1,
                            l = a.scrollTop();
                          a.scrollTop(0),
                            o
                              .children("." + i.divider)
                              .not("." + i.hidden)
                              .each(function() {
                                r < 0 &&
                                  n ==
                                    e(this)
                                      .text()
                                      .slice(0, 1)
                                      .toLowerCase() &&
                                  (r = e(this).position().top);
                              }),
                            a.scrollTop(r > -1 ? r : l);
                        }
                      ));
                var l = function(e) {
                  (e = e || this.$pnls.children("." + i.opened)),
                    this.$menu[
                      (e.hasClass(i.hasindexer) ? "add" : "remove") + "Class"
                    ](i.hasindexer);
                };
                this.bind("openPanel:start", l),
                  this.bind("initPanels:after", l);
              }
            });
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("indexer hasindexer"),
            a.add("mouseover");
        },
        clickAnchor: function(e, t) {
          if (e.parent().is("." + i.indexer)) return !0;
        }
      }),
        (e[t].defaults[n] = { add: !1, addTo: "panels" });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu setSelected add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "setSelected";
      (e[t].addons[n] = {
        setup: function() {
          var a = this,
            r = this.opts[n];
          this.conf[n];
          if (
            ((o = e[t].glbl),
            "boolean" == typeof r && (r = { hover: r, parent: r }),
            "object" != typeof r && (r = {}),
            (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)),
            "detect" == r.current)
          ) {
            var l = function(e) {
              e = e.split("?")[0].split("#")[0];
              var t = a.$menu.find('a[href="' + e + '"], a[href="' + e + '/"]');
              t.length
                ? a.setSelected(t.parent(), !0)
                : ((e = e.split("/").slice(0, -1)), e.length && l(e.join("/")));
            };
            this.bind("initMenu:after", function() {
              l(window.location.href);
            });
          } else
            r.current ||
              this.bind("initListview:after", function(e) {
                this.$pnls
                  .find("." + i.listview)
                  .children("." + i.selected)
                  .removeClass(i.selected);
              });
          r.hover &&
            this.bind("initMenu:after", function() {
              this.$menu.addClass(i.hoverselected);
            }),
            r.parent &&
              (this.bind("openPanel:finish", function(e) {
                this.$pnls
                  .find("." + i.listview)
                  .find("." + i.next)
                  .removeClass(i.selected);
                for (var t = e.data(s.parent); t; )
                  t
                    .not("." + i.vertical)
                    .children("." + i.next)
                    .addClass(i.selected),
                    (t = t.closest("." + i.panel).data(s.parent));
              }),
              this.bind("initMenu:after", function() {
                this.$menu.addClass(i.parentselected);
              }));
        },
        add: function() {
          (i = e[t]._c),
            (s = e[t]._d),
            (a = e[t]._e),
            i.add("hoverselected parentselected");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].defaults[n] = { current: !0, hover: !1, parent: !1 });
      var i, s, a, o;
    })(
      jQuery
    ) /*
 * jQuery mmenu toggles add-on
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */,
    (function(e) {
      var t = "mmenu",
        n = "toggles";
      (e[t].addons[n] = {
        setup: function() {
          var s = this;
          this.opts[n], this.conf[n];
          (o = e[t].glbl),
            this.bind("initListview:after", function(t) {
              this.__refactorClass(
                t.find("input"),
                this.conf.classNames[n].toggle,
                "toggle"
              ),
                this.__refactorClass(
                  t.find("input"),
                  this.conf.classNames[n].check,
                  "check"
                ),
                t
                  .find("input." + i.toggle + ", input." + i.check)
                  .each(function() {
                    var t = e(this),
                      n = t.closest("li"),
                      a = t.hasClass(i.toggle) ? "toggle" : "check",
                      o = t.attr("id") || s.__getUniqueId();
                    n.children('label[for="' + o + '"]').length ||
                      (t.attr("id", o),
                      n.prepend(t),
                      e(
                        '<label for="' + o + '" class="' + i[a] + '"></label>'
                      ).insertBefore(n.children("a, span").last()));
                  });
            });
        },
        add: function() {
          (i = e[t]._c), (s = e[t]._d), (a = e[t]._e), i.add("toggle check");
        },
        clickAnchor: function(e, t) {}
      }),
        (e[t].configuration.classNames[n] = {
          toggle: "Toggle",
          check: "Check"
        });
      var i, s, a, o;
    })(jQuery);
  return true;
});

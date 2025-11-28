function a(a, e) {
    var o = Object.keys(a);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(a);
        e &&
            (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(a, e).enumerable;
            })),
            o.push.apply(o, r);
    }
    return o;
}
function e(a, e, o, r, i, t, n) {
    try {
        var s = a[t](n),
            u = s.value;
    } catch (a) {
        return void o(a);
    }
    s.done ? e(u) : Promise.resolve(u).then(r, i);
}
function o(a) {
    return function () {
        var o = this,
            r = arguments;
        return new Promise(function (i, t) {
            var n = a.apply(o, r);
            function s(a) {
                e(n, i, t, s, u, "next", a);
            }
            function u(a) {
                e(n, i, t, s, u, "throw", a);
            }
            s(void 0);
        });
    };
}
function r(a, e) {
    if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function i(a, e) {
    for (var o = 0; o < e.length; o++) {
        var r = e[o];
        (r.enumerable = r.enumerable || 0),
            (r.configurable = 1),
            "value" in r && (r.writable = 1),
            Object.defineProperty(a, r.key, r);
    }
}
function t(a, e, o) {
    return e && i(a.prototype, e), o && i(a, o), Object.defineProperty(a, "prototype", { writable: 0 }), a;
}
function n(a, e, o) {
    return (
        e in a ? Object.defineProperty(a, e, { value: o, enumerable: 1, configurable: 1, writable: 1 }) : (a[e] = o), a
    );
}
function s(a, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    (a.prototype = Object.create(e && e.prototype, { constructor: { value: a, writable: 1, configurable: 1 } })),
        Object.defineProperty(a, "prototype", { writable: 0 }),
        e && c(a, e);
}
function u(a) {
    return (
        (u = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (a) {
                  return a.__proto__ || Object.getPrototypeOf(a);
              }),
        u(a)
    );
}
function c(a, e) {
    return (
        (c =
            Object.setPrototypeOf ||
            function (a, e) {
                return (a.__proto__ = e), a;
            }),
        c(a, e)
    );
}
function l() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return 0;
    if (Reflect.construct.sham) return 0;
    if ("function" == typeof Proxy) return 1;
    try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), 1;
    } catch (a) {
        return 0;
    }
}
function m(a, e, o) {
    return (
        (m = l()
            ? Reflect.construct
            : function (a, e, o) {
                  var r = [null];
                  r.push.apply(r, e);
                  var i = new (Function.bind.apply(a, r))();
                  return o && c(i, o.prototype), i;
              }),
        m.apply(null, arguments)
    );
}
function A(a) {
    var e = "function" == typeof Map ? new Map() : void 0;
    return (
        (A = function (a) {
            if (null === a || ((o = a), -1 === Function.toString.call(o).indexOf("[native code]"))) return a;
            var o;
            if ("function" != typeof a) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== e) {
                if (e.has(a)) return e.get(a);
                e.set(a, r);
            }
            function r() {
                return m(a, arguments, u(this).constructor);
            }
            return (
                (r.prototype = Object.create(a.prototype, {
                    constructor: { value: r, enumerable: 0, writable: 1, configurable: 1 },
                })),
                c(r, a)
            );
        }),
        A(a)
    );
}
function g(a) {
    if (void 0 === a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return a;
}
function d(a, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return g(a);
}
function p(a) {
    var e = l();
    return function () {
        var o,
            r = u(a);
        if (e) {
            var i = u(this).constructor;
            o = Reflect.construct(r, arguments, i);
        } else o = r.apply(this, arguments);
        return d(this, o);
    };
}
function f(a, e) {
    return e || (e = a.slice(0)), Object.freeze(Object.defineProperties(a, { raw: { value: Object.freeze(e) } }));
}
function b(a, e) {
    return (
        (function (a) {
            if (Array.isArray(a)) return a;
        })(a) ||
        (function (a, e) {
            var o = null == a ? null : ("undefined" != typeof Symbol && a[Symbol.iterator]) || a["@@iterator"];
            if (null != o) {
                var r,
                    i,
                    t = [],
                    n = 1,
                    s = 0;
                try {
                    for (o = o.call(a); !(n = (r = o.next()).done) && (t.push(r.value), !e || t.length !== e); n = 1);
                } catch (a) {
                    (s = 1), (i = a);
                } finally {
                    try {
                        n || null == o.return || o.return();
                    } finally {
                        if (s) throw i;
                    }
                }
                return t;
            }
        })(a, e) ||
        h(a, e) ||
        (function () {
            throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
        })()
    );
}
function v(a) {
    return (
        (function (a) {
            if (Array.isArray(a)) return w(a);
        })(a) ||
        (function (a) {
            if (("undefined" != typeof Symbol && null != a[Symbol.iterator]) || null != a["@@iterator"])
                return Array.from(a);
        })(a) ||
        h(a) ||
        (function () {
            throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
        })()
    );
}
function h(a, e) {
    if (a) {
        if ("string" == typeof a) return w(a, e);
        var o = Object.prototype.toString.call(a).slice(8, -1);
        return (
            "Object" === o && a.constructor && (o = a.constructor.name),
            "Map" === o || "Set" === o
                ? Array.from(a)
                : "Arguments" === o || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)
                  ? w(a, e)
                  : void 0
        );
    }
}
function w(a, e) {
    (null == e || e > a.length) && (e = a.length);
    for (var o = 0, r = new Array(e); o < e; o++) r[o] = a[o];
    return r;
}
function B(a, e) {
    var o = ("undefined" != typeof Symbol && a[Symbol.iterator]) || a["@@iterator"];
    if (!o) {
        if (Array.isArray(a) || (o = h(a)) || (e && a && "number" == typeof a.length)) {
            o && (a = o);
            var r = 0,
                i = function () {};
            return {
                s: i,
                n: function () {
                    return r >= a.length ? { done: 1 } : { done: 0, value: a[r++] };
                },
                e: function (a) {
                    throw a;
                },
                f: i,
            };
        }
        throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
    }
    var t,
        n = 1,
        s = 0;
    return {
        s: function () {
            o = o.call(a);
        },
        n: function () {
            var a = o.next();
            return (n = a.done), a;
        },
        e: function (a) {
            (s = 1), (t = a);
        },
        f: function () {
            try {
                n || null == o.return || o.return();
            } finally {
                if (s) throw t;
            }
        },
    };
}
function y(a, e) {
    return (function (a, e) {
        return e.get ? e.get.call(a) : e.value;
    })(a, D(a, e, "get"));
}
function E(a, e, o) {
    return (
        (function (a, e, o) {
            if (e.set) e.set.call(a, o);
            else {
                if (!e.writable) throw new TypeError("attempted to set read only private field");
                e.value = o;
            }
        })(a, D(a, e, "set"), o),
        o
    );
}
function D(a, e, o) {
    if (!e.has(a)) throw new TypeError("attempted to " + o + " private field on non-instance");
    return e.get(a);
}
function Q(a, e, o) {
    if (!e.has(a)) throw new TypeError("attempted to get private field on non-instance");
    return o;
}
function x(a, e) {
    if (e.has(a)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function j(a, e, o) {
    x(a, e), e.set(a, o);
}
function M(a, e) {
    x(a, e), e.add(a);
}
var z =
    "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : {};
!(function () {
    var a = (function (a) {
        var e,
            o = Object.prototype,
            r = o.hasOwnProperty,
            i = "function" == typeof Symbol ? Symbol : {},
            t = i.iterator || "@@iterator",
            n = i.asyncIterator || "@@asyncIterator",
            s = i.toStringTag || "@@toStringTag";
        function u(a, e, o) {
            return Object.defineProperty(a, e, { value: o, enumerable: 1, configurable: 1, writable: 1 }), a[e];
        }
        try {
            u({}, "");
        } catch (a) {
            u = function (a, e, o) {
                return (a[e] = o);
            };
        }
        function c(a, e, o, r) {
            var i = e && e.prototype instanceof f ? e : f,
                t = Object.create(i.prototype),
                n = new M(r || []);
            return (
                (t._invoke = (function (a, e, o) {
                    var r = m;
                    return function (i, t) {
                        if (r === g) throw new Error("Generator is already running");
                        if (r === d) {
                            if ("throw" === i) throw t;
                            return I();
                        }
                        for (o.method = i, o.arg = t; ; ) {
                            var n = o.delegate;
                            if (n) {
                                var s = Q(n, o);
                                if (s) {
                                    if (s === p) continue;
                                    return s;
                                }
                            }
                            if ("next" === o.method) o.sent = o._sent = o.arg;
                            else if ("throw" === o.method) {
                                if (r === m) throw ((r = d), o.arg);
                                o.dispatchException(o.arg);
                            } else "return" === o.method && o.abrupt("return", o.arg);
                            r = g;
                            var u = l(a, e, o);
                            if ("normal" === u.type) {
                                if (((r = o.done ? d : A), u.arg === p)) continue;
                                return { value: u.arg, done: o.done };
                            }
                            "throw" === u.type && ((r = d), (o.method = "throw"), (o.arg = u.arg));
                        }
                    };
                })(a, o, n)),
                t
            );
        }
        function l(a, e, o) {
            try {
                return { type: "normal", arg: a.call(e, o) };
            } catch (a) {
                return { type: "throw", arg: a };
            }
        }
        a.wrap = c;
        var m = "suspendedStart",
            A = "suspendedYield",
            g = "executing",
            d = "completed",
            p = {};
        function f() {}
        function b() {}
        function v() {}
        var h = {};
        u(h, t, function () {
            return this;
        });
        var w = Object.getPrototypeOf,
            B = w && w(w(z([])));
        B && B !== o && r.call(B, t) && (h = B);
        var y = (v.prototype = f.prototype = Object.create(h));
        function E(a) {
            ["next", "throw", "return"].forEach(function (e) {
                u(a, e, function (a) {
                    return this._invoke(e, a);
                });
            });
        }
        function D(a, e) {
            function o(i, t, n, s) {
                var u = l(a[i], a, t);
                if ("throw" !== u.type) {
                    var c = u.arg,
                        m = c.value;
                    return m && "object" == typeof m && r.call(m, "__await")
                        ? e.resolve(m.__await).then(
                              function (a) {
                                  o("next", a, n, s);
                              },
                              function (a) {
                                  o("throw", a, n, s);
                              }
                          )
                        : e.resolve(m).then(
                              function (a) {
                                  (c.value = a), n(c);
                              },
                              function (a) {
                                  return o("throw", a, n, s);
                              }
                          );
                }
                s(u.arg);
            }
            var i;
            this._invoke = function (a, r) {
                function t() {
                    return new e(function (e, i) {
                        o(a, r, e, i);
                    });
                }
                return (i = i ? i.then(t, t) : t());
            };
        }
        function Q(a, o) {
            var r = a.iterator[o.method];
            if (r === e) {
                if (((o.delegate = null), "throw" === o.method)) {
                    if (a.iterator.return && ((o.method = "return"), (o.arg = e), Q(a, o), "throw" === o.method))
                        return p;
                    (o.method = "throw"), (o.arg = new TypeError("The iterator does not provide a 'throw' method"));
                }
                return p;
            }
            var i = l(r, a.iterator, o.arg);
            if ("throw" === i.type) return (o.method = "throw"), (o.arg = i.arg), (o.delegate = null), p;
            var t = i.arg;
            return t
                ? t.done
                    ? ((o[a.resultName] = t.value),
                      (o.next = a.nextLoc),
                      "return" !== o.method && ((o.method = "next"), (o.arg = e)),
                      (o.delegate = null),
                      p)
                    : t
                : ((o.method = "throw"),
                  (o.arg = new TypeError("iterator result is not an object")),
                  (o.delegate = null),
                  p);
        }
        function x(a) {
            var e = { tryLoc: a[0] };
            1 in a && (e.catchLoc = a[1]),
                2 in a && ((e.finallyLoc = a[2]), (e.afterLoc = a[3])),
                this.tryEntries.push(e);
        }
        function j(a) {
            var e = a.completion || {};
            (e.type = "normal"), delete e.arg, (a.completion = e);
        }
        function M(a) {
            (this.tryEntries = [{ tryLoc: "root" }]), a.forEach(x, this), this.reset(1);
        }
        function z(a) {
            if (a) {
                var o = a[t];
                if (o) return o.call(a);
                if ("function" == typeof a.next) return a;
                if (!isNaN(a.length)) {
                    var i = -1,
                        n = function o() {
                            for (; ++i < a.length; ) if (r.call(a, i)) return (o.value = a[i]), (o.done = 0), o;
                            return (o.value = e), (o.done = 1), o;
                        };
                    return (n.next = n);
                }
            }
            return { next: I };
        }
        function I() {
            return { value: e, done: 1 };
        }
        return (
            (b.prototype = v),
            u(y, "constructor", v),
            u(v, "constructor", b),
            (b.displayName = u(v, s, "GeneratorFunction")),
            (a.isGeneratorFunction = function (a) {
                var e = "function" == typeof a && a.constructor;
                return e ? e === b || "GeneratorFunction" === (e.displayName || e.name) : 0;
            }),
            (a.mark = function (a) {
                return (
                    Object.setPrototypeOf
                        ? Object.setPrototypeOf(a, v)
                        : ((a.__proto__ = v), u(a, s, "GeneratorFunction")),
                    (a.prototype = Object.create(y)),
                    a
                );
            }),
            (a.awrap = function (a) {
                return { __await: a };
            }),
            E(D.prototype),
            u(D.prototype, n, function () {
                return this;
            }),
            (a.AsyncIterator = D),
            (a.async = function (e, o, r, i, t) {
                void 0 === t && (t = Promise);
                var n = new D(c(e, o, r, i), t);
                return a.isGeneratorFunction(o)
                    ? n
                    : n.next().then(function (a) {
                          return a.done ? a.value : n.next();
                      });
            }),
            E(y),
            u(y, s, "Generator"),
            u(y, t, function () {
                return this;
            }),
            u(y, "toString", function () {
                return "[object Generator]";
            }),
            (a.keys = function (a) {
                var e = [];
                for (var o in a) e.push(o);
                return (
                    e.reverse(),
                    function o() {
                        for (; e.length; ) {
                            var r = e.pop();
                            if (r in a) return (o.value = r), (o.done = 0), o;
                        }
                        return (o.done = 1), o;
                    }
                );
            }),
            (a.values = z),
            (M.prototype = {
                constructor: M,
                reset: function (a) {
                    if (
                        ((this.prev = 0),
                        (this.next = 0),
                        (this.sent = this._sent = e),
                        (this.done = 0),
                        (this.delegate = null),
                        (this.method = "next"),
                        (this.arg = e),
                        this.tryEntries.forEach(j),
                        !a)
                    )
                        for (var o in this)
                            "t" === o.charAt(0) && r.call(this, o) && !isNaN(+o.slice(1)) && (this[o] = e);
                },
                stop: function () {
                    this.done = 1;
                    var a = this.tryEntries[0].completion;
                    if ("throw" === a.type) throw a.arg;
                    return this.rval;
                },
                dispatchException: function (a) {
                    if (this.done) throw a;
                    var o = this;
                    function i(r, i) {
                        return (
                            (s.type = "throw"), (s.arg = a), (o.next = r), i && ((o.method = "next"), (o.arg = e)), !!i
                        );
                    }
                    for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                        var n = this.tryEntries[t],
                            s = n.completion;
                        if ("root" === n.tryLoc) return i("end");
                        if (n.tryLoc <= this.prev) {
                            var u = r.call(n, "catchLoc"),
                                c = r.call(n, "finallyLoc");
                            if (u && c) {
                                if (this.prev < n.catchLoc) return i(n.catchLoc, 1);
                                if (this.prev < n.finallyLoc) return i(n.finallyLoc);
                            } else if (u) {
                                if (this.prev < n.catchLoc) return i(n.catchLoc, 1);
                            } else {
                                if (!c) throw new Error("try statement without catch or finally");
                                if (this.prev < n.finallyLoc) return i(n.finallyLoc);
                            }
                        }
                    }
                },
                abrupt: function (a, e) {
                    for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                        var i = this.tryEntries[o];
                        if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                            var t = i;
                            break;
                        }
                    }
                    t && ("break" === a || "continue" === a) && t.tryLoc <= e && e <= t.finallyLoc && (t = null);
                    var n = t ? t.completion : {};
                    return (
                        (n.type = a),
                        (n.arg = e),
                        t ? ((this.method = "next"), (this.next = t.finallyLoc), p) : this.complete(n)
                    );
                },
                complete: function (a, e) {
                    if ("throw" === a.type) throw a.arg;
                    return (
                        "break" === a.type || "continue" === a.type
                            ? (this.next = a.arg)
                            : "return" === a.type
                              ? ((this.rval = this.arg = a.arg), (this.method = "return"), (this.next = "end"))
                              : "normal" === a.type && e && (this.next = e),
                        p
                    );
                },
                finish: function (a) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var o = this.tryEntries[e];
                        if (o.finallyLoc === a) return this.complete(o.completion, o.afterLoc), j(o), p;
                    }
                },
                catch: function (a) {
                    for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                        var o = this.tryEntries[e];
                        if (o.tryLoc === a) {
                            var r = o.completion;
                            if ("throw" === r.type) {
                                var i = r.arg;
                                j(o);
                            }
                            return i;
                        }
                    }
                    throw new Error("illegal catch attempt");
                },
                delegateYield: function (a, o, r) {
                    return (
                        (this.delegate = { iterator: z(a), resultName: o, nextLoc: r }),
                        "next" === this.method && (this.arg = e),
                        p
                    );
                },
            }),
            a
        );
    })({});
    try {
        regeneratorRuntime = a;
    } catch (e) {
        "object" == typeof globalThis
            ? (globalThis.regeneratorRuntime = a)
            : Function("r", "regeneratorRuntime = r")(a);
    }
})();
var I = function (a) {
        return a && a.Math == Math && a;
    },
    C =
        I("object" == typeof globalThis && globalThis) ||
        I("object" == typeof window && window) ||
        I("object" == typeof self && self) ||
        I("object" == typeof z && z) ||
        (function () {
            return this;
        })() ||
        Function("return this")(),
    N = {},
    k = function (a) {
        try {
            return !!a();
        } catch (a) {
            return 1;
        }
    },
    F = !k(function () {
        return (
            7 !=
            Object.defineProperty({}, 1, {
                get: function () {
                    return 7;
                },
            })[1]
        );
    }),
    O = !k(function () {
        var a = function () {}.bind();
        return "function" != typeof a || a.hasOwnProperty("prototype");
    }),
    T = O,
    S = Function.prototype.call,
    L = T
        ? S.bind(S)
        : function () {
              return S.apply(S, arguments);
          },
    U = {},
    R = {}.propertyIsEnumerable,
    Y = Object.getOwnPropertyDescriptor,
    P = Y && !R.call({ 1: 2 }, 1);
U.f = P
    ? function (a) {
          var e = Y(this, a);
          return !!e && e.enumerable;
      }
    : R;
var G,
    q,
    H = function (a, e) {
        return { enumerable: !(1 & a), configurable: !(2 & a), writable: !(4 & a), value: e };
    },
    J = O,
    V = Function.prototype,
    W = V.bind,
    K = V.call,
    X = J && W.bind(K, K),
    Z = J
        ? function (a) {
              return a && X(a);
          }
        : function (a) {
              return (
                  a &&
                  function () {
                      return K.apply(a, arguments);
                  }
              );
          },
    _ = Z,
    $ = _({}.toString),
    aa = _("".slice),
    ea = function (a) {
        return aa($(a), 8, -1);
    },
    oa = Z,
    ra = k,
    ia = ea,
    ta = C.Object,
    na = oa("".split),
    sa = ra(function () {
        return !ta("z").propertyIsEnumerable(0);
    })
        ? function (a) {
              return "String" == ia(a) ? na(a, "") : ta(a);
          }
        : ta,
    ua = C.TypeError,
    ca = function (a) {
        if (null == a) throw ua("Can't call method on " + a);
        return a;
    },
    la = sa,
    ma = ca,
    Aa = function (a) {
        return la(ma(a));
    },
    ga = function (a) {
        return "function" == typeof a;
    },
    da = ga,
    pa = function (a) {
        return "object" == typeof a ? null !== a : da(a);
    },
    fa = C,
    ba = ga,
    va = function (a) {
        return ba(a) ? a : void 0;
    },
    ha = function (a, e) {
        return arguments.length < 2 ? va(fa[a]) : fa[a] && fa[a][e];
    },
    wa = Z({}.isPrototypeOf),
    Ba = ha("navigator", "userAgent") || "",
    ya = C,
    Ea = Ba,
    Da = ya.process,
    Qa = ya.Deno,
    xa = (Da && Da.versions) || (Qa && Qa.version),
    ja = xa && xa.v8;
ja && (q = (G = ja.split("."))[0] > 0 && G[0] < 4 ? 1 : +(G[0] + G[1])),
    !q && Ea && (!(G = Ea.match(/Edge\/(\d+)/)) || G[1] >= 74) && (G = Ea.match(/Chrome\/(\d+)/)) && (q = +G[1]);
var Ma = q,
    za = Ma,
    Ia = k,
    Ca =
        !!Object.getOwnPropertySymbols &&
        !Ia(function () {
            var a = Symbol();
            return !String(a) || !(Object(a) instanceof Symbol) || (!Symbol.sham && za && za < 41);
        }),
    Na = Ca && !Symbol.sham && "symbol" == typeof Symbol.iterator,
    ka = ha,
    Fa = ga,
    Oa = wa,
    Ta = Na,
    Sa = C.Object,
    La = Ta
        ? function (a) {
              return "symbol" == typeof a;
          }
        : function (a) {
              var e = ka("Symbol");
              return Fa(e) && Oa(e.prototype, Sa(a));
          },
    Ua = C.String,
    Ra = function (a) {
        try {
            return Ua(a);
        } catch (a) {
            return "Object";
        }
    },
    Ya = ga,
    Pa = Ra,
    Ga = C.TypeError,
    qa = function (a) {
        if (Ya(a)) return a;
        throw Ga(Pa(a) + " is not a function");
    },
    Ha = qa,
    Ja = function (a, e) {
        var o = a[e];
        return null == o ? void 0 : Ha(o);
    },
    Va = L,
    Wa = ga,
    Ka = pa,
    Xa = C.TypeError,
    Za = { exports: {} },
    _a = C,
    $a = Object.defineProperty,
    ae = function (a, e) {
        try {
            $a(_a, a, { value: e, configurable: 1, writable: 1 });
        } catch (o) {
            _a[a] = e;
        }
        return e;
    },
    ee = ae,
    oe = C["__core-js_shared__"] || ee("__core-js_shared__", {}),
    re = oe;
(Za.exports = function (a, e) {
    return re[a] || (re[a] = void 0 !== e ? e : {});
})("versions", []).push({
    version: "3.21.1",
    mode: "global",
    copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE",
    source: "https://github.com/zloirock/core-js",
});
var ie = ca,
    te = C.Object,
    ne = function (a) {
        return te(ie(a));
    },
    se = ne,
    ue = Z({}.hasOwnProperty),
    ce =
        Object.hasOwn ||
        function (a, e) {
            return ue(se(a), e);
        },
    le = Z,
    me = 0,
    Ae = Math.random(),
    ge = le((1).toString),
    de = function (a) {
        return "Symbol(" + (void 0 === a ? "" : a) + ")_" + ge(++me + Ae, 36);
    },
    pe = C,
    fe = Za.exports,
    be = ce,
    ve = de,
    he = Ca,
    we = Na,
    Be = fe("wks"),
    ye = pe.Symbol,
    Ee = ye && ye.for,
    De = we ? ye : (ye && ye.withoutSetter) || ve,
    Qe = function (a) {
        if (!be(Be, a) || (!he && "string" != typeof Be[a])) {
            var e = "Symbol." + a;
            he && be(ye, a) ? (Be[a] = ye[a]) : (Be[a] = we && Ee ? Ee(e) : De(e));
        }
        return Be[a];
    },
    xe = L,
    je = pa,
    Me = La,
    ze = Ja,
    Ie = Qe,
    Ce = C.TypeError,
    Ne = Ie("toPrimitive"),
    ke = function (a, e) {
        if (!je(a) || Me(a)) return a;
        var o,
            r = ze(a, Ne);
        if (r) {
            if ((void 0 === e && (e = "default"), (o = xe(r, a, e)), !je(o) || Me(o))) return o;
            throw Ce("Can't convert object to primitive value");
        }
        return (
            void 0 === e && (e = "number"),
            (function (a, e) {
                var o, r;
                if ("string" === e && Wa((o = a.toString)) && !Ka((r = Va(o, a)))) return r;
                if (Wa((o = a.valueOf)) && !Ka((r = Va(o, a)))) return r;
                if ("string" !== e && Wa((o = a.toString)) && !Ka((r = Va(o, a)))) return r;
                throw Xa("Can't convert object to primitive value");
            })(a, e)
        );
    },
    Fe = ke,
    Oe = La,
    Te = function (a) {
        var e = Fe(a, "string");
        return Oe(e) ? e : e + "";
    },
    Se = pa,
    Le = C.document,
    Ue = Se(Le) && Se(Le.createElement),
    Re = function (a) {
        return Ue ? Le.createElement(a) : {};
    },
    Ye = Re,
    Pe =
        !F &&
        !k(function () {
            return (
                7 !=
                Object.defineProperty(Ye("div"), "a", {
                    get: function () {
                        return 7;
                    },
                }).a
            );
        }),
    Ge = F,
    qe = L,
    He = U,
    Je = H,
    Ve = Aa,
    We = Te,
    Ke = ce,
    Xe = Pe,
    Ze = Object.getOwnPropertyDescriptor;
N.f = Ge
    ? Ze
    : function (a, e) {
          if (((a = Ve(a)), (e = We(e)), Xe))
              try {
                  return Ze(a, e);
              } catch (a) {}
          if (Ke(a, e)) return Je(!qe(He.f, a, e), a[e]);
      };
var _e = {},
    $e =
        F &&
        k(function () {
            return 42 != Object.defineProperty(function () {}, "prototype", { value: 42, writable: 0 }).prototype;
        }),
    ao = C,
    eo = pa,
    oo = ao.String,
    ro = ao.TypeError,
    io = function (a) {
        if (eo(a)) return a;
        throw ro(oo(a) + " is not an object");
    },
    to = F,
    no = Pe,
    so = $e,
    uo = io,
    co = Te,
    lo = C.TypeError,
    mo = Object.defineProperty,
    Ao = Object.getOwnPropertyDescriptor;
_e.f = to
    ? so
        ? function (a, e, o) {
              if (
                  (uo(a),
                  (e = co(e)),
                  uo(o),
                  "function" == typeof a && "prototype" === e && "value" in o && "writable" in o && !o.writable)
              ) {
                  var r = Ao(a, e);
                  r &&
                      r.writable &&
                      ((a[e] = o.value),
                      (o = {
                          configurable: "configurable" in o ? o.configurable : r.configurable,
                          enumerable: "enumerable" in o ? o.enumerable : r.enumerable,
                          writable: 0,
                      }));
              }
              return mo(a, e, o);
          }
        : mo
    : function (a, e, o) {
          if ((uo(a), (e = co(e)), uo(o), no))
              try {
                  return mo(a, e, o);
              } catch (a) {}
          if ("get" in o || "set" in o) throw lo("Accessors not supported");
          return "value" in o && (a[e] = o.value), a;
      };
var go = _e,
    po = H,
    fo = F
        ? function (a, e, o) {
              return go.f(a, e, po(1, o));
          }
        : function (a, e, o) {
              return (a[e] = o), a;
          },
    bo = { exports: {} },
    vo = ga,
    ho = oe,
    wo = Z(Function.toString);
vo(ho.inspectSource) ||
    (ho.inspectSource = function (a) {
        return wo(a);
    });
var Bo,
    yo,
    Eo,
    Do = ho.inspectSource,
    Qo = ga,
    xo = Do,
    jo = C.WeakMap,
    Mo = Qo(jo) && /native code/.test(xo(jo)),
    zo = Za.exports,
    Io = de,
    Co = zo("keys"),
    No = function (a) {
        return Co[a] || (Co[a] = Io(a));
    },
    ko = {},
    Fo = Mo,
    Oo = C,
    To = Z,
    So = pa,
    Lo = fo,
    Uo = ce,
    Ro = oe,
    Yo = No,
    Po = ko,
    Go = Oo.TypeError,
    qo = Oo.WeakMap;
if (Fo || Ro.state) {
    var Ho = Ro.state || (Ro.state = new qo()),
        Jo = To(Ho.get),
        Vo = To(Ho.has),
        Wo = To(Ho.set);
    (Bo = function (a, e) {
        if (Vo(Ho, a)) throw new Go("Object already initialized");
        return (e.facade = a), Wo(Ho, a, e), e;
    }),
        (yo = function (a) {
            return Jo(Ho, a) || {};
        }),
        (Eo = function (a) {
            return Vo(Ho, a);
        });
} else {
    var Ko = Yo("state");
    (Po[Ko] = 1),
        (Bo = function (a, e) {
            if (Uo(a, Ko)) throw new Go("Object already initialized");
            return (e.facade = a), Lo(a, Ko, e), e;
        }),
        (yo = function (a) {
            return Uo(a, Ko) ? a[Ko] : {};
        }),
        (Eo = function (a) {
            return Uo(a, Ko);
        });
}
var Xo = {
        set: Bo,
        get: yo,
        has: Eo,
        enforce: function (a) {
            return Eo(a) ? yo(a) : Bo(a, {});
        },
        getterFor: function (a) {
            return function (e) {
                var o;
                if (!So(e) || (o = yo(e)).type !== a) throw Go("Incompatible receiver, " + a + " required");
                return o;
            };
        },
    },
    Zo = F,
    _o = ce,
    $o = Function.prototype,
    ar = Zo && Object.getOwnPropertyDescriptor,
    er = _o($o, "name"),
    or = {
        EXISTS: er,
        PROPER: er && "something" === function () {}.name,
        CONFIGURABLE: er && (!Zo || (Zo && ar($o, "name").configurable)),
    },
    rr = C,
    ir = ga,
    tr = ce,
    nr = fo,
    sr = ae,
    ur = Do,
    cr = or.CONFIGURABLE,
    lr = Xo.get,
    mr = Xo.enforce,
    Ar = String(String).split("String");
(bo.exports = function (a, e, o, r) {
    var i,
        t = r ? !!r.unsafe : 0,
        n = r ? !!r.enumerable : 0,
        s = r ? !!r.noTargetGet : 0,
        u = r && void 0 !== r.name ? r.name : e;
    ir(o) &&
        ("Symbol(" === String(u).slice(0, 7) && (u = "[" + String(u).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
        (!tr(o, "name") || (cr && o.name !== u)) && nr(o, "name", u),
        (i = mr(o)).source || (i.source = Ar.join("string" == typeof u ? u : ""))),
        a !== rr ? (t ? !s && a[e] && (n = 1) : delete a[e], n ? (a[e] = o) : nr(a, e, o)) : n ? (a[e] = o) : sr(e, o);
})(Function.prototype, "toString", function () {
    return (ir(this) && lr(this).source) || ur(this);
});
var gr = {},
    dr = Math.ceil,
    pr = Math.floor,
    fr = function (a) {
        var e = +a;
        return e != e || 0 === e ? 0 : (e > 0 ? pr : dr)(e);
    },
    br = fr,
    vr = Math.max,
    hr = Math.min,
    wr = function (a, e) {
        var o = br(a);
        return o < 0 ? vr(o + e, 0) : hr(o, e);
    },
    Br = fr,
    yr = Math.min,
    Er = function (a) {
        return a > 0 ? yr(Br(a), 9007199254740991) : 0;
    },
    Dr = Er,
    Qr = function (a) {
        return Dr(a.length);
    },
    xr = Aa,
    jr = wr,
    Mr = Qr,
    zr = function (a) {
        return function (e, o, r) {
            var i,
                t = xr(e),
                n = Mr(t),
                s = jr(r, n);
            if (a && o != o) {
                for (; n > s; ) if ((i = t[s++]) != i) return 1;
            } else for (; n > s; s++) if ((a || s in t) && t[s] === o) return a || s || 0;
            return !a && -1;
        };
    },
    Ir = { includes: zr(1), indexOf: zr(0) },
    Cr = ce,
    Nr = Aa,
    kr = Ir.indexOf,
    Fr = ko,
    Or = Z([].push),
    Tr = function (a, e) {
        var o,
            r = Nr(a),
            i = 0,
            t = [];
        for (o in r) !Cr(Fr, o) && Cr(r, o) && Or(t, o);
        for (; e.length > i; ) Cr(r, (o = e[i++])) && (~kr(t, o) || Or(t, o));
        return t;
    },
    Sr = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
    ],
    Lr = Tr,
    Ur = Sr.concat("length", "prototype");
gr.f =
    Object.getOwnPropertyNames ||
    function (a) {
        return Lr(a, Ur);
    };
var Rr = {};
Rr.f = Object.getOwnPropertySymbols;
var Yr = ha,
    Pr = gr,
    Gr = Rr,
    qr = io,
    Hr = Z([].concat),
    Jr =
        Yr("Reflect", "ownKeys") ||
        function (a) {
            var e = Pr.f(qr(a)),
                o = Gr.f;
            return o ? Hr(e, o(a)) : e;
        },
    Vr = ce,
    Wr = Jr,
    Kr = N,
    Xr = _e,
    Zr = function (a, e, o) {
        for (var r = Wr(e), i = Xr.f, t = Kr.f, n = 0; n < r.length; n++) {
            var s = r[n];
            Vr(a, s) || (o && Vr(o, s)) || i(a, s, t(e, s));
        }
    },
    _r = k,
    $r = ga,
    ai = /#|\.prototype\./,
    ei = function (a, e) {
        var o = ri[oi(a)];
        return o == ti ? 1 : o == ii ? 0 : $r(e) ? _r(e) : !!e;
    },
    oi = (ei.normalize = function (a) {
        return String(a).replace(ai, ".").toLowerCase();
    }),
    ri = (ei.data = {}),
    ii = (ei.NATIVE = "N"),
    ti = (ei.POLYFILL = "P"),
    ni = ei,
    si = C,
    ui = N.f,
    ci = fo,
    li = bo.exports,
    mi = ae,
    Ai = Zr,
    gi = ni,
    di = function (a, e) {
        var o,
            r,
            i,
            t,
            n,
            s = a.target,
            u = a.global,
            c = a.stat;
        if ((o = u ? si : c ? si[s] || mi(s, {}) : (si[s] || {}).prototype))
            for (r in e) {
                if (
                    ((t = e[r]),
                    (i = a.noTargetGet ? (n = ui(o, r)) && n.value : o[r]),
                    !gi(u ? r : s + (c ? "." : "#") + r, a.forced) && void 0 !== i)
                ) {
                    if (typeof t == typeof i) continue;
                    Ai(t, i);
                }
                (a.sham || (i && i.sham)) && ci(t, "sham", 1), li(o, r, t, a);
            }
    },
    pi = ea,
    fi =
        Array.isArray ||
        function (a) {
            return "Array" == pi(a);
        },
    bi = Te,
    vi = _e,
    hi = H,
    wi = function (a, e, o) {
        var r = bi(e);
        r in a ? vi.f(a, r, hi(0, o)) : (a[r] = o);
    },
    Bi = {};
Bi[Qe("toStringTag")] = "z";
var yi = "[object z]" === String(Bi),
    Ei = C,
    Di = yi,
    Qi = ga,
    xi = ea,
    ji = Qe("toStringTag"),
    Mi = Ei.Object,
    zi =
        "Arguments" ==
        xi(
            (function () {
                return arguments;
            })()
        ),
    Ii = Di
        ? xi
        : function (a) {
              var e, o, r;
              return void 0 === a
                  ? "Undefined"
                  : null === a
                    ? "Null"
                    : "string" ==
                        typeof (o = (function (a, e) {
                            try {
                                return a[e];
                            } catch (a) {}
                        })((e = Mi(a)), ji))
                      ? o
                      : zi
                        ? xi(e)
                        : "Object" == (r = xi(e)) && Qi(e.callee)
                          ? "Arguments"
                          : r;
          },
    Ci = Z,
    Ni = k,
    ki = ga,
    Fi = Ii,
    Oi = Do,
    Ti = function () {},
    Si = [],
    Li = ha("Reflect", "construct"),
    Ui = /^\s*(?:class|function)\b/,
    Ri = Ci(Ui.exec),
    Yi = !Ui.exec(Ti),
    Pi = function (a) {
        if (!ki(a)) return 0;
        try {
            return Li(Ti, Si, a), 1;
        } catch (a) {
            return 0;
        }
    },
    Gi = function (a) {
        if (!ki(a)) return 0;
        switch (Fi(a)) {
            case "AsyncFunction":
            case "GeneratorFunction":
            case "AsyncGeneratorFunction":
                return 0;
        }
        try {
            return Yi || !!Ri(Ui, Oi(a));
        } catch (a) {
            return 1;
        }
    };
Gi.sham = 1;
var qi =
        !Li ||
        Ni(function () {
            var a;
            return (
                Pi(Pi.call) ||
                !Pi(Object) ||
                !Pi(function () {
                    a = 1;
                }) ||
                a
            );
        })
            ? Gi
            : Pi,
    Hi = C,
    Ji = fi,
    Vi = qi,
    Wi = pa,
    Ki = Qe("species"),
    Xi = Hi.Array,
    Zi = function (a, e) {
        return new ((function (a) {
            var e;
            return (
                Ji(a) &&
                    ((e = a.constructor),
                    ((Vi(e) && (e === Xi || Ji(e.prototype))) || (Wi(e) && null === (e = e[Ki]))) && (e = void 0)),
                void 0 === e ? Xi : e
            );
        })(a))(0 === e ? 0 : e);
    },
    _i = k,
    $i = Ma,
    at = Qe("species"),
    et = function (a) {
        return (
            $i >= 51 ||
            !_i(function () {
                var e = [];
                return (
                    ((e.constructor = {})[at] = function () {
                        return { foo: 1 };
                    }),
                    1 !== e[a](Boolean).foo
                );
            })
        );
    },
    ot = di,
    rt = C,
    it = k,
    tt = fi,
    nt = pa,
    st = ne,
    ut = Qr,
    ct = wi,
    lt = Zi,
    mt = et,
    At = Ma,
    gt = Qe("isConcatSpreadable"),
    dt = rt.TypeError,
    pt =
        At >= 51 ||
        !it(function () {
            var a = [];
            return (a[gt] = 0), a.concat()[0] !== a;
        }),
    ft = mt("concat"),
    bt = function (a) {
        if (!nt(a)) return 0;
        var e = a[gt];
        return void 0 !== e ? !!e : tt(a);
    };
ot(
    { target: "Array", proto: 1, forced: !pt || !ft },
    {
        concat: function (a) {
            var e,
                o,
                r,
                i,
                t,
                n = st(this),
                s = lt(n, 0),
                u = 0;
            for (e = -1, r = arguments.length; e < r; e++)
                if (bt((t = -1 === e ? n : arguments[e]))) {
                    if (u + (i = ut(t)) > 9007199254740991) throw dt("Maximum allowed index exceeded");
                    for (o = 0; o < i; o++, u++) o in t && ct(s, u, t[o]);
                } else {
                    if (u >= 9007199254740991) throw dt("Maximum allowed index exceeded");
                    ct(s, u++, t);
                }
            return (s.length = u), s;
        },
    }
);
var vt = Ii,
    ht = yi
        ? {}.toString
        : function () {
              return "[object " + vt(this) + "]";
          },
    wt = yi,
    Bt = bo.exports,
    yt = ht;
wt || Bt(Object.prototype, "toString", yt, { unsafe: 1 });
var Et = Tr,
    Dt = Sr,
    Qt =
        Object.keys ||
        function (a) {
            return Et(a, Dt);
        },
    xt = ne,
    jt = Qt;
di(
    {
        target: "Object",
        stat: 1,
        forced: k(function () {
            jt(1);
        }),
    },
    {
        keys: function (a) {
            return jt(xt(a));
        },
    }
);
var Mt = qa,
    zt = O,
    It = Z(Z.bind),
    Ct = function (a, e) {
        return (
            Mt(a),
            void 0 === e
                ? a
                : zt
                  ? It(a, e)
                  : function () {
                        return a.apply(e, arguments);
                    }
        );
    },
    Nt = Ct,
    kt = sa,
    Ft = ne,
    Ot = Qr,
    Tt = Zi,
    St = Z([].push),
    Lt = function (a) {
        var e = 1 == a,
            o = 2 == a,
            r = 3 == a,
            i = 4 == a,
            t = 6 == a,
            n = 7 == a,
            s = 5 == a || t;
        return function (u, c, l, m) {
            for (
                var A,
                    g,
                    d = Ft(u),
                    p = kt(d),
                    f = Nt(c, l),
                    b = Ot(p),
                    v = 0,
                    h = m || Tt,
                    w = e ? h(u, b) : o || n ? h(u, 0) : void 0;
                b > v;
                v++
            )
                if ((s || v in p) && ((g = f((A = p[v]), v, d)), a))
                    if (e) w[v] = g;
                    else if (g)
                        switch (a) {
                            case 3:
                                return 1;
                            case 5:
                                return A;
                            case 6:
                                return v;
                            case 2:
                                St(w, A);
                        }
                    else
                        switch (a) {
                            case 4:
                                return 0;
                            case 7:
                                St(w, A);
                        }
            return t ? -1 : r || i ? i : w;
        };
    },
    Ut = {
        forEach: Lt(0),
        map: Lt(1),
        filter: Lt(2),
        some: Lt(3),
        every: Lt(4),
        find: Lt(5),
        findIndex: Lt(6),
        filterReject: Lt(7),
    },
    Rt = Ut.map;
di(
    { target: "Array", proto: 1, forced: !et("map") },
    {
        map: function (a) {
            return Rt(this, a, arguments.length > 1 ? arguments[1] : void 0);
        },
    }
);
var Yt = Ut.filter;
di(
    { target: "Array", proto: 1, forced: !et("filter") },
    {
        filter: function (a) {
            return Yt(this, a, arguments.length > 1 ? arguments[1] : void 0);
        },
    }
);
var Pt = Ii,
    Gt = C.String,
    qt = function (a) {
        if ("Symbol" === Pt(a)) throw TypeError("Cannot convert a Symbol value to a string");
        return Gt(a);
    },
    Ht = io,
    Jt = function () {
        var a = Ht(this),
            e = "";
        return (
            a.global && (e += "g"),
            a.ignoreCase && (e += "i"),
            a.multiline && (e += "m"),
            a.dotAll && (e += "s"),
            a.unicode && (e += "u"),
            a.sticky && (e += "y"),
            e
        );
    },
    Vt = k,
    Wt = C.RegExp,
    Kt = Vt(function () {
        var a = Wt("a", "y");
        return (a.lastIndex = 2), null != a.exec("abcd");
    }),
    Xt =
        Kt ||
        Vt(function () {
            return !Wt("a", "y").sticky;
        }),
    Zt =
        Kt ||
        Vt(function () {
            var a = Wt("^r", "gy");
            return (a.lastIndex = 2), null != a.exec("str");
        }),
    _t = { BROKEN_CARET: Zt, MISSED_STICKY: Xt, UNSUPPORTED_Y: Kt },
    $t = {},
    an = F,
    en = $e,
    on = _e,
    rn = io,
    tn = Aa,
    nn = Qt;
$t.f =
    an && !en
        ? Object.defineProperties
        : function (a, e) {
              rn(a);
              for (var o, r = tn(e), i = nn(e), t = i.length, n = 0; t > n; ) on.f(a, (o = i[n++]), r[o]);
              return a;
          };
var sn,
    un = ha("document", "documentElement"),
    cn = io,
    ln = $t,
    mn = Sr,
    An = ko,
    gn = un,
    dn = Re,
    pn = No("IE_PROTO"),
    fn = function () {},
    bn = function (a) {
        return "<script>" + a + "</script>";
    },
    vn = function (a) {
        a.write(bn("")), a.close();
        var e = a.parentWindow.Object;
        return (a = null), e;
    },
    hn = function () {
        try {
            sn = new ActiveXObject("htmlfile");
        } catch (a) {}
        var a, e;
        hn =
            "undefined" != typeof document
                ? document.domain && sn
                    ? vn(sn)
                    : (((e = dn("iframe")).style.display = "none"),
                      gn.appendChild(e),
                      (e.src = String("javascript:")),
                      (a = e.contentWindow.document).open(),
                      a.write(bn("document.F=Object")),
                      a.close(),
                      a.F)
                : vn(sn);
        for (var o = mn.length; o--; ) delete hn.prototype[mn[o]];
        return hn();
    };
An[pn] = 1;
var wn,
    Bn,
    yn =
        Object.create ||
        function (a, e) {
            var o;
            return (
                null !== a ? ((fn.prototype = cn(a)), (o = new fn()), (fn.prototype = null), (o[pn] = a)) : (o = hn()),
                void 0 === e ? o : ln.f(o, e)
            );
        },
    En = k,
    Dn = C.RegExp,
    Qn = En(function () {
        var a = Dn(".", "s");
        return !(a.dotAll && a.exec("\n") && "s" === a.flags);
    }),
    xn = k,
    jn = C.RegExp,
    Mn = xn(function () {
        var a = jn("(?<a>b)", "g");
        return "b" !== a.exec("b").groups.a || "bc" !== "b".replace(a, "$<a>c");
    }),
    zn = L,
    In = Z,
    Cn = qt,
    Nn = Jt,
    kn = _t,
    Fn = Za.exports,
    On = yn,
    Tn = Xo.get,
    Sn = Qn,
    Ln = Mn,
    Un = Fn("native-string-replace", String.prototype.replace),
    Rn = RegExp.prototype.exec,
    Yn = Rn,
    Pn = In("".charAt),
    Gn = In("".indexOf),
    qn = In("".replace),
    Hn = In("".slice),
    Jn = ((Bn = /b*/g), zn(Rn, (wn = /a/), "a"), zn(Rn, Bn, "a"), 0 !== wn.lastIndex || 0 !== Bn.lastIndex),
    Vn = kn.BROKEN_CARET,
    Wn = void 0 !== /()??/.exec("")[1];
(Jn || Wn || Vn || Sn || Ln) &&
    (Yn = function (a) {
        var e,
            o,
            r,
            i,
            t,
            n,
            s,
            u = this,
            c = Tn(u),
            l = Cn(a),
            m = c.raw;
        if (m) return (m.lastIndex = u.lastIndex), (e = zn(Yn, m, l)), (u.lastIndex = m.lastIndex), e;
        var A = c.groups,
            g = Vn && u.sticky,
            d = zn(Nn, u),
            p = u.source,
            f = 0,
            b = l;
        if (
            (g &&
                ((d = qn(d, "y", "")),
                -1 === Gn(d, "g") && (d += "g"),
                (b = Hn(l, u.lastIndex)),
                u.lastIndex > 0 &&
                    (!u.multiline || (u.multiline && "\n" !== Pn(l, u.lastIndex - 1))) &&
                    ((p = "(?: " + p + ")"), (b = " " + b), f++),
                (o = new RegExp("^(?:" + p + ")", d))),
            Wn && (o = new RegExp("^" + p + "$(?!\\s)", d)),
            Jn && (r = u.lastIndex),
            (i = zn(Rn, g ? o : u, b)),
            g
                ? i
                    ? ((i.input = Hn(i.input, f)),
                      (i[0] = Hn(i[0], f)),
                      (i.index = u.lastIndex),
                      (u.lastIndex += i[0].length))
                    : (u.lastIndex = 0)
                : Jn && i && (u.lastIndex = u.global ? i.index + i[0].length : r),
            Wn &&
                i &&
                i.length > 1 &&
                zn(Un, i[0], o, function () {
                    for (t = 1; t < arguments.length - 2; t++) void 0 === arguments[t] && (i[t] = void 0);
                }),
            i && A)
        )
            for (i.groups = n = On(null), t = 0; t < A.length; t++) n[(s = A[t])[0]] = i[s[1]];
        return i;
    });
var Kn = Yn;
di({ target: "RegExp", proto: 1, forced: /./.exec !== Kn }, { exec: Kn });
var Xn = O,
    Zn = Function.prototype,
    _n = Zn.apply,
    $n = Zn.call,
    as =
        ("object" == typeof Reflect && Reflect.apply) ||
        (Xn
            ? $n.bind(_n)
            : function () {
                  return $n.apply(_n, arguments);
              }),
    es = Z,
    os = bo.exports,
    rs = Kn,
    is = k,
    ts = Qe,
    ns = fo,
    ss = ts("species"),
    us = RegExp.prototype,
    cs = function (a, e, o, r) {
        var i = ts(a),
            t = !is(function () {
                var e = {};
                return (
                    (e[i] = function () {
                        return 7;
                    }),
                    7 != ""[a](e)
                );
            }),
            n =
                t &&
                !is(function () {
                    var e = 0,
                        o = /a/;
                    return (
                        "split" === a &&
                            (((o = {}).constructor = {}),
                            (o.constructor[ss] = function () {
                                return o;
                            }),
                            (o.flags = ""),
                            (o[i] = /./[i])),
                        (o.exec = function () {
                            return (e = 1), null;
                        }),
                        o[i](""),
                        !e
                    );
                });
        if (!t || !n || o) {
            var s = es(/./[i]),
                u = e(i, ""[a], function (a, e, o, r, i) {
                    var n = es(a),
                        u = e.exec;
                    return u === rs || u === us.exec
                        ? t && !i
                            ? { done: 1, value: s(e, o, r) }
                            : { done: 1, value: n(o, e, r) }
                        : { done: 0 };
                });
            os(String.prototype, a, u[0]), os(us, i, u[1]);
        }
        r && ns(us[i], "sham", 1);
    },
    ls = pa,
    ms = ea,
    As = Qe("match"),
    gs = function (a) {
        var e;
        return ls(a) && (void 0 !== (e = a[As]) ? !!e : "RegExp" == ms(a));
    },
    ds = qi,
    ps = Ra,
    fs = C.TypeError,
    bs = io,
    vs = Qe("species"),
    hs = function (a, e) {
        var o,
            r = bs(a).constructor;
        return void 0 === r || null == (o = bs(r)[vs])
            ? e
            : (function (a) {
                  if (ds(a)) return a;
                  throw fs(ps(a) + " is not a constructor");
              })(o);
    },
    ws = Z,
    Bs = fr,
    ys = qt,
    Es = ca,
    Ds = ws("".charAt),
    Qs = ws("".charCodeAt),
    xs = ws("".slice),
    js = function (a) {
        return function (e, o) {
            var r,
                i,
                t = ys(Es(e)),
                n = Bs(o),
                s = t.length;
            return n < 0 || n >= s
                ? a
                    ? ""
                    : void 0
                : (r = Qs(t, n)) < 55296 || r > 56319 || n + 1 === s || (i = Qs(t, n + 1)) < 56320 || i > 57343
                  ? a
                      ? Ds(t, n)
                      : r
                  : a
                    ? xs(t, n, n + 2)
                    : i - 56320 + ((r - 55296) << 10) + 65536;
        };
    },
    Ms = { codeAt: js(0), charAt: js(1) },
    zs = Ms.charAt,
    Is = function (a, e, o) {
        return e + (o ? zs(a, e).length : 1);
    },
    Cs = wr,
    Ns = Qr,
    ks = wi,
    Fs = C.Array,
    Os = Math.max,
    Ts = function (a, e, o) {
        for (var r = Ns(a), i = Cs(e, r), t = Cs(void 0 === o ? r : o, r), n = Fs(Os(t - i, 0)), s = 0; i < t; i++, s++)
            ks(n, s, a[i]);
        return (n.length = s), n;
    },
    Ss = L,
    Ls = io,
    Us = ga,
    Rs = ea,
    Ys = Kn,
    Ps = C.TypeError,
    Gs = function (a, e) {
        var o = a.exec;
        if (Us(o)) {
            var r = Ss(o, a, e);
            return null !== r && Ls(r), r;
        }
        if ("RegExp" === Rs(a)) return Ss(Ys, a, e);
        throw Ps("RegExp#exec called on incompatible receiver");
    },
    qs = as,
    Hs = L,
    Js = Z,
    Vs = cs,
    Ws = gs,
    Ks = io,
    Xs = ca,
    Zs = hs,
    _s = Is,
    $s = Er,
    au = qt,
    eu = Ja,
    ou = Ts,
    ru = Gs,
    iu = Kn,
    tu = k,
    nu = _t.UNSUPPORTED_Y,
    su = Math.min,
    uu = [].push,
    cu = Js(/./.exec),
    lu = Js(uu),
    mu = Js("".slice),
    Au = !tu(function () {
        var a = /(?:)/,
            e = a.exec;
        a.exec = function () {
            return e.apply(this, arguments);
        };
        var o = "ab".split(a);
        return 2 !== o.length || "a" !== o[0] || "b" !== o[1];
    });
Vs(
    "split",
    function (a, e, o) {
        var r;
        return (
            (r =
                "c" == "abbc".split(/(b)*/)[1] ||
                4 != "test".split(/(?:)/, -1).length ||
                2 != "ab".split(/(?:ab)*/).length ||
                4 != ".".split(/(.?)(.?)/).length ||
                ".".split(/()()/).length > 1 ||
                "".split(/.?/).length
                    ? function (a, o) {
                          var r = au(Xs(this)),
                              i = void 0 === o ? 4294967295 : o >>> 0;
                          if (0 === i) return [];
                          if (void 0 === a) return [r];
                          if (!Ws(a)) return Hs(e, r, a, i);
                          for (
                              var t,
                                  n,
                                  s,
                                  u = [],
                                  c =
                                      (a.ignoreCase ? "i" : "") +
                                      (a.multiline ? "m" : "") +
                                      (a.unicode ? "u" : "") +
                                      (a.sticky ? "y" : ""),
                                  l = 0,
                                  m = new RegExp(a.source, c + "g");
                              (t = Hs(iu, m, r)) &&
                              !(
                                  (n = m.lastIndex) > l &&
                                  (lu(u, mu(r, l, t.index)),
                                  t.length > 1 && t.index < r.length && qs(uu, u, ou(t, 1)),
                                  (s = t[0].length),
                                  (l = n),
                                  u.length >= i)
                              );

                          )
                              m.lastIndex === t.index && m.lastIndex++;
                          return (
                              l === r.length ? (!s && cu(m, "")) || lu(u, "") : lu(u, mu(r, l)),
                              u.length > i ? ou(u, 0, i) : u
                          );
                      }
                    : "0".split(void 0, 0).length
                      ? function (a, o) {
                            return void 0 === a && 0 === o ? [] : Hs(e, this, a, o);
                        }
                      : e),
            [
                function (e, o) {
                    var i = Xs(this),
                        t = null == e ? void 0 : eu(e, a);
                    return t ? Hs(t, e, i, o) : Hs(r, au(i), e, o);
                },
                function (a, i) {
                    var t = Ks(this),
                        n = au(a),
                        s = o(r, t, n, i, r !== e);
                    if (s.done) return s.value;
                    var u = Zs(t, RegExp),
                        c = t.unicode,
                        l =
                            (t.ignoreCase ? "i" : "") +
                            (t.multiline ? "m" : "") +
                            (t.unicode ? "u" : "") +
                            (nu ? "g" : "y"),
                        m = new u(nu ? "^(?:" + t.source + ")" : t, l),
                        A = void 0 === i ? 4294967295 : i >>> 0;
                    if (0 === A) return [];
                    if (0 === n.length) return null === ru(m, n) ? [n] : [];
                    for (var g = 0, d = 0, p = []; d < n.length; ) {
                        m.lastIndex = nu ? 0 : d;
                        var f,
                            b = ru(m, nu ? mu(n, d) : n);
                        if (null === b || (f = su($s(m.lastIndex + (nu ? d : 0)), n.length)) === g) d = _s(n, d, c);
                        else {
                            if ((lu(p, mu(n, g, d)), p.length === A)) return p;
                            for (var v = 1; v <= b.length - 1; v++) if ((lu(p, b[v]), p.length === A)) return p;
                            d = g = f;
                        }
                    }
                    return lu(p, mu(n, g)), p;
                },
            ]
        );
    },
    !Au,
    nu
);
var gu = ca,
    du = qt,
    pu = Z("".replace),
    fu = "[\t\n\v\f\r                　\u2028\u2029\ufeff]",
    bu = RegExp("^" + fu + fu + "*"),
    vu = RegExp(fu + fu + "*$"),
    hu = function (a) {
        return function (e) {
            var o = du(gu(e));
            return 1 & a && (o = pu(o, bu, "")), 2 & a && (o = pu(o, vu, "")), o;
        };
    },
    wu = { start: hu(1), end: hu(2), trim: hu(3) },
    Bu = C,
    yu = k,
    Eu = Z,
    Du = qt,
    Qu = wu.trim,
    xu = Bu.parseInt,
    ju = Bu.Symbol,
    Mu = ju && ju.iterator,
    zu = /^[+-]?0x/i,
    Iu = Eu(zu.exec),
    Cu =
        8 !== xu("\t\n\v\f\r                　\u2028\u2029\ufeff08") ||
        22 !== xu("\t\n\v\f\r                　\u2028\u2029\ufeff0x16") ||
        (Mu &&
            !yu(function () {
                xu(Object(Mu));
            }))
            ? function (a, e) {
                  var o = Qu(Du(a));
                  return xu(o, e >>> 0 || (Iu(zu, o) ? 16 : 10));
              }
            : xu;
di({ target: "Number", stat: 1, forced: Number.parseInt != Cu }, { parseInt: Cu });
var Nu = C,
    ku = ga,
    Fu = Nu.String,
    Ou = Nu.TypeError,
    Tu = Z,
    Su = io,
    Lu =
        Object.setPrototypeOf ||
        ("__proto__" in {}
            ? (function () {
                  var a,
                      e = 0,
                      o = {};
                  try {
                      (a = Tu(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set))(o, []),
                          (e = o instanceof Array);
                  } catch (a) {}
                  return function (o, r) {
                      return (
                          Su(o),
                          (function (a) {
                              if ("object" == typeof a || ku(a)) return a;
                              throw Ou("Can't set " + Fu(a) + " as a prototype");
                          })(r),
                          e ? a(o, r) : (o.__proto__ = r),
                          o
                      );
                  };
              })()
            : void 0),
    Uu = ga,
    Ru = pa,
    Yu = Lu,
    Pu = function (a, e, o) {
        var r, i;
        return Yu && Uu((r = e.constructor)) && r !== o && Ru((i = r.prototype)) && i !== o.prototype && Yu(a, i), a;
    },
    Gu = Z((1).valueOf),
    qu = F,
    Hu = C,
    Ju = Z,
    Vu = ni,
    Wu = bo.exports,
    Ku = ce,
    Xu = Pu,
    Zu = wa,
    _u = La,
    $u = ke,
    ac = k,
    ec = gr.f,
    oc = N.f,
    rc = _e.f,
    ic = Gu,
    tc = wu.trim,
    nc = Hu.Number,
    sc = nc.prototype,
    uc = Hu.TypeError,
    cc = Ju("".slice),
    lc = Ju("".charCodeAt),
    mc = function (a) {
        var e = $u(a, "number");
        return "bigint" == typeof e ? e : Ac(e);
    },
    Ac = function (a) {
        var e,
            o,
            r,
            i,
            t,
            n,
            s,
            u,
            c = $u(a, "number");
        if (_u(c)) throw uc("Cannot convert a Symbol value to a number");
        if ("string" == typeof c && c.length > 2)
            if (((c = tc(c)), 43 === (e = lc(c, 0)) || 45 === e)) {
                if (88 === (o = lc(c, 2)) || 120 === o) return NaN;
            } else if (48 === e) {
                switch (lc(c, 1)) {
                    case 66:
                    case 98:
                        (r = 2), (i = 49);
                        break;
                    case 79:
                    case 111:
                        (r = 8), (i = 55);
                        break;
                    default:
                        return +c;
                }
                for (n = (t = cc(c, 2)).length, s = 0; s < n; s++) if ((u = lc(t, s)) < 48 || u > i) return NaN;
                return parseInt(t, r);
            }
        return +c;
    };
if (Vu("Number", !nc(" 0o1") || !nc("0b1") || nc("+0x1"))) {
    for (
        var gc,
            dc = function (a) {
                var e = arguments.length < 1 ? 0 : nc(mc(a)),
                    o = this;
                return Zu(sc, o) &&
                    ac(function () {
                        ic(o);
                    })
                    ? Xu(Object(e), o, dc)
                    : e;
            },
            pc = qu
                ? ec(nc)
                : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(
                      ","
                  ),
            fc = 0;
        pc.length > fc;
        fc++
    )
        Ku(nc, (gc = pc[fc])) && !Ku(dc, gc) && rc(dc, gc, oc(nc, gc));
    (dc.prototype = sc), (sc.constructor = dc), Wu(Hu, "Number", dc);
}
var bc = (function () {
        var a = document.location.pathname.split("/").filter(function (a) {
            return a.length;
        });
        if (0 == a.length) return 1;
        var e = Number.parseInt(a[a.length - 1]);
        return isNaN(e) ? 1 : e;
    })(),
    vc = b({ 4: ["quatro", "Quarteto", 9], 2: ["duo", "Dueto", 7], 1: ["termo", "Termo", 6] }[bc], 3),
    hc = vc[0],
    wc = vc[1],
    Bc = vc[2],
    yc = { 2: { palavras: "Palavras" }, 4: { palavras: "Palavras" }, 1: { palavras: "palavra certa" } }[bc],
    Ec = C.Promise,
    Dc = bo.exports,
    Qc = function (a, e, o) {
        for (var r in e) Dc(a, r, e[r], o);
        return a;
    },
    xc = _e.f,
    jc = ce,
    Mc = Qe("toStringTag"),
    zc = function (a, e, o) {
        a && !o && (a = a.prototype), a && !jc(a, Mc) && xc(a, Mc, { configurable: 1, value: e });
    },
    Ic = ha,
    Cc = _e,
    Nc = F,
    kc = Qe("species"),
    Fc = function (a) {
        var e = Ic(a),
            o = Cc.f;
        Nc &&
            e &&
            !e[kc] &&
            o(e, kc, {
                configurable: 1,
                get: function () {
                    return this;
                },
            });
    },
    Oc = wa,
    Tc = C.TypeError,
    Sc = function (a, e) {
        if (Oc(e, a)) return a;
        throw Tc("Incorrect invocation");
    },
    Lc = {},
    Uc = Lc,
    Rc = Qe("iterator"),
    Yc = Array.prototype,
    Pc = function (a) {
        return void 0 !== a && (Uc.Array === a || Yc[Rc] === a);
    },
    Gc = Ii,
    qc = Ja,
    Hc = Lc,
    Jc = Qe("iterator"),
    Vc = function (a) {
        if (null != a) return qc(a, Jc) || qc(a, "@@iterator") || Hc[Gc(a)];
    },
    Wc = L,
    Kc = qa,
    Xc = io,
    Zc = Ra,
    _c = Vc,
    $c = C.TypeError,
    al = function (a, e) {
        var o = arguments.length < 2 ? _c(a) : e;
        if (Kc(o)) return Xc(Wc(o, a));
        throw $c(Zc(a) + " is not iterable");
    },
    el = L,
    ol = io,
    rl = Ja,
    il = function (a, e, o) {
        var r, i;
        ol(a);
        try {
            if (!(r = rl(a, "return"))) {
                if ("throw" === e) throw o;
                return o;
            }
            r = el(r, a);
        } catch (a) {
            (i = 1), (r = a);
        }
        if ("throw" === e) throw o;
        if (i) throw r;
        return ol(r), o;
    },
    tl = Ct,
    nl = L,
    sl = io,
    ul = Ra,
    cl = Pc,
    ll = Qr,
    ml = wa,
    Al = al,
    gl = Vc,
    dl = il,
    pl = C.TypeError,
    fl = function (a, e) {
        (this.stopped = a), (this.result = e);
    },
    bl = fl.prototype,
    vl = function (a, e, o) {
        var r,
            i,
            t,
            n,
            s,
            u,
            c,
            l = o && o.that,
            m = !(!o || !o.AS_ENTRIES),
            A = !(!o || !o.IS_ITERATOR),
            g = !(!o || !o.INTERRUPTED),
            d = tl(e, l),
            p = function (a) {
                return r && dl(r, "normal", a), new fl(1, a);
            },
            f = function (a) {
                return m ? (sl(a), g ? d(a[0], a[1], p) : d(a[0], a[1])) : g ? d(a, p) : d(a);
            };
        if (A) r = a;
        else {
            if (!(i = gl(a))) throw pl(ul(a) + " is not iterable");
            if (cl(i)) {
                for (t = 0, n = ll(a); n > t; t++) if ((s = f(a[t])) && ml(bl, s)) return s;
                return new fl(0);
            }
            r = Al(a, i);
        }
        for (u = r.next; !(c = nl(u, r)).done; ) {
            try {
                s = f(c.value);
            } catch (a) {
                dl(r, "throw", a);
            }
            if ("object" == typeof s && s && ml(bl, s)) return s;
        }
        return new fl(0);
    },
    hl = Qe("iterator"),
    wl = 0;
try {
    var Bl = 0,
        yl = {
            next: function () {
                return { done: !!Bl++ };
            },
            return: function () {
                wl = 1;
            },
        };
    (yl[hl] = function () {
        return this;
    }),
        Array.from(yl, function () {
            throw 2;
        });
} catch (a) {}
var El,
    Dl,
    Ql,
    xl,
    jl = function (a, e) {
        if (!e && !wl) return 0;
        var o = 0;
        try {
            var r = {};
            (r[hl] = function () {
                return {
                    next: function () {
                        return { done: (o = 1) };
                    },
                };
            }),
                a(r);
        } catch (a) {}
        return o;
    },
    Ml = Z([].slice),
    zl = C.TypeError,
    Il = /(?:ipad|iphone|ipod).*applewebkit/i.test(Ba),
    Cl = "process" == ea(C.process),
    Nl = C,
    kl = as,
    Fl = Ct,
    Ol = ga,
    Tl = ce,
    Sl = k,
    Ll = un,
    Ul = Ml,
    Rl = Re,
    Yl = function (a, e) {
        if (a < e) throw zl("Not enough arguments");
        return a;
    },
    Pl = Il,
    Gl = Cl,
    ql = Nl.setImmediate,
    Hl = Nl.clearImmediate,
    Jl = Nl.process,
    Vl = Nl.Dispatch,
    Wl = Nl.Function,
    Kl = Nl.MessageChannel,
    Xl = Nl.String,
    Zl = 0,
    _l = {};
try {
    El = Nl.location;
} catch (a) {}
var $l = function (a) {
        if (Tl(_l, a)) {
            var e = _l[a];
            delete _l[a], e();
        }
    },
    am = function (a) {
        return function () {
            $l(a);
        };
    },
    em = function (a) {
        $l(a.data);
    },
    om = function (a) {
        Nl.postMessage(Xl(a), El.protocol + "//" + El.host);
    };
(ql && Hl) ||
    ((ql = function (a) {
        Yl(arguments.length, 1);
        var e = Ol(a) ? a : Wl(a),
            o = Ul(arguments, 1);
        return (
            (_l[++Zl] = function () {
                kl(e, void 0, o);
            }),
            Dl(Zl),
            Zl
        );
    }),
    (Hl = function (a) {
        delete _l[a];
    }),
    Gl
        ? (Dl = function (a) {
              Jl.nextTick(am(a));
          })
        : Vl && Vl.now
          ? (Dl = function (a) {
                Vl.now(am(a));
            })
          : Kl && !Pl
            ? ((xl = (Ql = new Kl()).port2), (Ql.port1.onmessage = em), (Dl = Fl(xl.postMessage, xl)))
            : Nl.addEventListener && Ol(Nl.postMessage) && !Nl.importScripts && El && "file:" !== El.protocol && !Sl(om)
              ? ((Dl = om), Nl.addEventListener("message", em, 0))
              : (Dl =
                    "onreadystatechange" in Rl("script")
                        ? function (a) {
                              Ll.appendChild(Rl("script")).onreadystatechange = function () {
                                  Ll.removeChild(this), $l(a);
                              };
                          }
                        : function (a) {
                              setTimeout(am(a), 0);
                          }));
var rm,
    im,
    tm,
    nm,
    sm,
    um,
    cm,
    lm,
    mm = { set: ql, clear: Hl },
    Am = C,
    gm = /ipad|iphone|ipod/i.test(Ba) && void 0 !== Am.Pebble,
    dm = /web0s(?!.*chrome)/i.test(Ba),
    pm = C,
    fm = Ct,
    bm = N.f,
    vm = mm.set,
    hm = Il,
    wm = gm,
    Bm = dm,
    ym = Cl,
    Em = pm.MutationObserver || pm.WebKitMutationObserver,
    Dm = pm.document,
    Qm = pm.process,
    xm = pm.Promise,
    jm = bm(pm, "queueMicrotask"),
    Mm = jm && jm.value;
Mm ||
    ((rm = function () {
        var a, e;
        for (ym && (a = Qm.domain) && a.exit(); im; ) {
            (e = im.fn), (im = im.next);
            try {
                e();
            } catch (a) {
                throw (im ? nm() : (tm = void 0), a);
            }
        }
        (tm = void 0), a && a.enter();
    }),
    hm || ym || Bm || !Em || !Dm
        ? !wm && xm && xm.resolve
            ? (((cm = xm.resolve(void 0)).constructor = xm),
              (lm = fm(cm.then, cm)),
              (nm = function () {
                  lm(rm);
              }))
            : ym
              ? (nm = function () {
                    Qm.nextTick(rm);
                })
              : ((vm = fm(vm, pm)),
                (nm = function () {
                    vm(rm);
                }))
        : ((sm = 1),
          (um = Dm.createTextNode("")),
          new Em(rm).observe(um, { characterData: 1 }),
          (nm = function () {
              um.data = sm = !sm;
          })));
var zm =
        Mm ||
        function (a) {
            var e = { fn: a, next: void 0 };
            tm && (tm.next = e), im || ((im = e), nm()), (tm = e);
        },
    Im = {},
    Cm = qa,
    Nm = function (a) {
        var e, o;
        (this.promise = new a(function (a, r) {
            if (void 0 !== e || void 0 !== o) throw TypeError("Bad Promise constructor");
            (e = a), (o = r);
        })),
            (this.resolve = Cm(e)),
            (this.reject = Cm(o));
    };
Im.f = function (a) {
    return new Nm(a);
};
var km = io,
    Fm = pa,
    Om = Im,
    Tm = C,
    Sm = function () {
        (this.head = null), (this.tail = null);
    };
Sm.prototype = {
    add: function (a) {
        var e = { item: a, next: null };
        this.head ? (this.tail.next = e) : (this.head = e), (this.tail = e);
    },
    get: function () {
        var a = this.head;
        if (a) return (this.head = a.next), this.tail === a && (this.tail = null), a.item;
    },
};
var Lm,
    Um,
    Rm,
    Ym,
    Pm = Sm,
    Gm = "object" == typeof window,
    qm = di,
    Hm = C,
    Jm = ha,
    Vm = L,
    Wm = Ec,
    Km = bo.exports,
    Xm = Qc,
    Zm = Lu,
    _m = zc,
    $m = Fc,
    aA = qa,
    eA = ga,
    oA = pa,
    rA = Sc,
    iA = Do,
    tA = vl,
    nA = jl,
    sA = hs,
    uA = mm.set,
    cA = zm,
    lA = Im,
    mA = function (a) {
        try {
            return { error: 0, value: a() };
        } catch (a) {
            return { error: 1, value: a };
        }
    },
    AA = Pm,
    gA = Xo,
    dA = ni,
    pA = Gm,
    fA = Cl,
    bA = Ma,
    vA = Qe("species"),
    hA = "Promise",
    wA = gA.getterFor(hA),
    BA = gA.set,
    yA = gA.getterFor(hA),
    EA = Wm && Wm.prototype,
    DA = Wm,
    QA = EA,
    xA = Hm.TypeError,
    jA = Hm.document,
    MA = Hm.process,
    zA = lA.f,
    IA = zA,
    CA = !!(jA && jA.createEvent && Hm.dispatchEvent),
    NA = eA(Hm.PromiseRejectionEvent),
    kA = 0,
    FA = dA(hA, function () {
        var a = iA(DA),
            e = a !== String(DA);
        if (!e && 66 === bA) return 1;
        if (bA >= 51 && /native code/.test(a)) return 0;
        var o = new DA(function (a) {
                a(1);
            }),
            r = function (a) {
                a(
                    function () {},
                    function () {}
                );
            };
        return ((o.constructor = {})[vA] = r), (kA = o.then(function () {}) instanceof r) ? !e && pA && !NA : 1;
    }),
    OA =
        FA ||
        !nA(function (a) {
            DA.all(a).catch(function () {});
        }),
    TA = function (a) {
        var e;
        return oA(a) && eA((e = a.then)) ? e : 0;
    },
    SA = function (a, e) {
        var o,
            r,
            i,
            t = e.value,
            n = 1 == e.state,
            s = n ? a.ok : a.fail,
            u = a.resolve,
            c = a.reject,
            l = a.domain;
        try {
            s
                ? (n || (2 === e.rejection && PA(e), (e.rejection = 1)),
                  1 == s ? (o = t) : (l && l.enter(), (o = s(t)), l && (l.exit(), (i = 1))),
                  o === a.promise ? c(xA("Promise-chain cycle")) : (r = TA(o)) ? Vm(r, o, u, c) : u(o))
                : c(t);
        } catch (a) {
            l && !i && l.exit(), c(a);
        }
    },
    LA = function (a, e) {
        a.notified ||
            ((a.notified = 1),
            cA(function () {
                for (var o, r = a.reactions; (o = r.get()); ) SA(o, a);
                (a.notified = 0), e && !a.rejection && RA(a);
            }));
    },
    UA = function (a, e, o) {
        var r, i;
        CA
            ? (((r = jA.createEvent("Event")).promise = e), (r.reason = o), r.initEvent(a, 0, 1), Hm.dispatchEvent(r))
            : (r = { promise: e, reason: o }),
            !NA && (i = Hm["on" + a])
                ? i(r)
                : "unhandledrejection" === a &&
                  (function () {
                      var a = Tm.console;
                      a && a.error;
                  })();
    },
    RA = function (a) {
        Vm(uA, Hm, function () {
            var e,
                o = a.facade,
                r = a.value;
            if (
                YA(a) &&
                ((e = mA(function () {
                    fA ? MA.emit("unhandledRejection", r, o) : UA("unhandledrejection", o, r);
                })),
                (a.rejection = fA || YA(a) ? 2 : 1),
                e.error)
            )
                throw e.value;
        });
    },
    YA = function (a) {
        return 1 !== a.rejection && !a.parent;
    },
    PA = function (a) {
        Vm(uA, Hm, function () {
            var e = a.facade;
            fA ? MA.emit("rejectionHandled", e) : UA("rejectionhandled", e, a.value);
        });
    },
    GA = function (a, e, o) {
        return function (r) {
            a(e, r, o);
        };
    },
    qA = function (a, e, o) {
        a.done || ((a.done = 1), o && (a = o), (a.value = e), (a.state = 2), LA(a, 1));
    },
    HA = function (a, e, o) {
        if (!a.done) {
            (a.done = 1), o && (a = o);
            try {
                if (a.facade === e) throw xA("Promise can't be resolved itself");
                var r = TA(e);
                r
                    ? cA(function () {
                          var o = { done: 0 };
                          try {
                              Vm(r, e, GA(HA, o, a), GA(qA, o, a));
                          } catch (e) {
                              qA(o, e, a);
                          }
                      })
                    : ((a.value = e), (a.state = 1), LA(a, 0));
            } catch (e) {
                qA({ done: 0 }, e, a);
            }
        }
    };
if (
    FA &&
    ((QA = (DA = function (a) {
        rA(this, QA), aA(a), Vm(Lm, this);
        var e = wA(this);
        try {
            a(GA(HA, e), GA(qA, e));
        } catch (a) {
            qA(e, a);
        }
    }).prototype),
    ((Lm = function () {
        BA(this, {
            type: hA,
            done: 0,
            notified: 0,
            parent: 0,
            reactions: new AA(),
            rejection: 0,
            state: 0,
            value: void 0,
        });
    }).prototype = Xm(QA, {
        then: function (a, e) {
            var o = yA(this),
                r = zA(sA(this, DA));
            return (
                (o.parent = 1),
                (r.ok = eA(a) ? a : 1),
                (r.fail = eA(e) && e),
                (r.domain = fA ? MA.domain : void 0),
                0 == o.state
                    ? o.reactions.add(r)
                    : cA(function () {
                          SA(r, o);
                      }),
                r.promise
            );
        },
        catch: function (a) {
            return this.then(void 0, a);
        },
    })),
    (Um = function () {
        var a = new Lm(),
            e = wA(a);
        (this.promise = a), (this.resolve = GA(HA, e)), (this.reject = GA(qA, e));
    }),
    (lA.f = zA =
        function (a) {
            return a === DA || a === Rm ? new Um(a) : IA(a);
        }),
    eA(Wm) && EA !== Object.prototype)
) {
    (Ym = EA.then),
        kA ||
            (Km(
                EA,
                "then",
                function (a, e) {
                    var o = this;
                    return new DA(function (a, e) {
                        Vm(Ym, o, a, e);
                    }).then(a, e);
                },
                { unsafe: 1 }
            ),
            Km(EA, "catch", QA.catch, { unsafe: 1 }));
    try {
        delete EA.constructor;
    } catch (a) {}
    Zm && Zm(EA, QA);
}
qm({ global: 1, wrap: 1, forced: FA }, { Promise: DA }),
    _m(DA, hA, 0),
    $m(hA),
    (Rm = Jm(hA)),
    qm(
        { target: hA, stat: 1, forced: FA },
        {
            reject: function (a) {
                var e = zA(this);
                return Vm(e.reject, void 0, a), e.promise;
            },
        }
    ),
    qm(
        { target: hA, stat: 1, forced: FA },
        {
            resolve: function (a) {
                return (function (a, e) {
                    if ((km(a), Fm(e) && e.constructor === a)) return e;
                    var o = Om.f(a);
                    return (0, o.resolve)(e), o.promise;
                })(this, a);
            },
        }
    ),
    qm(
        { target: hA, stat: 1, forced: OA },
        {
            all: function (a) {
                var e = this,
                    o = zA(e),
                    r = o.resolve,
                    i = o.reject,
                    t = mA(function () {
                        var o = aA(e.resolve),
                            t = [],
                            n = 0,
                            s = 1;
                        tA(a, function (a) {
                            var u = n++,
                                c = 0;
                            s++,
                                Vm(o, e, a).then(function (a) {
                                    c || ((c = 1), (t[u] = a), --s || r(t));
                                }, i);
                        }),
                            --s || r(t);
                    });
                return t.error && i(t.value), o.promise;
            },
            race: function (a) {
                var e = this,
                    o = zA(e),
                    r = o.reject,
                    i = mA(function () {
                        var i = aA(e.resolve);
                        tA(a, function (a) {
                            Vm(i, e, a).then(o.resolve, r);
                        });
                    });
                return i.error && r(i.value), o.promise;
            },
        }
    );
var JA = di,
    VA = ha,
    WA = as,
    KA = Z,
    XA = k,
    ZA = C.Array,
    _A = VA("JSON", "stringify"),
    $A = KA(/./.exec),
    ag = KA("".charAt),
    eg = KA("".charCodeAt),
    og = KA("".replace),
    rg = KA((1).toString),
    ig = /[\uD800-\uDFFF]/g,
    tg = /^[\uD800-\uDBFF]$/,
    ng = /^[\uDC00-\uDFFF]$/,
    sg = function (a, e, o) {
        var r = ag(o, e - 1),
            i = ag(o, e + 1);
        return ($A(tg, a) && !$A(ng, i)) || ($A(ng, a) && !$A(tg, r)) ? "\\u" + rg(eg(a, 0), 16) : a;
    },
    ug = XA(function () {
        return '"\\udf06\\ud834"' !== _A("\udf06\ud834") || '"\\udead"' !== _A("\udead");
    });
_A &&
    JA(
        { target: "JSON", stat: 1, forced: ug },
        {
            stringify: function (a, e, o) {
                for (var r = 0, i = arguments.length, t = ZA(i); r < i; r++) t[r] = arguments[r];
                var n = WA(_A, null, t);
                return "string" == typeof n ? og(n, ig, sg) : n;
            },
        }
    );
var cg = "https://term.ooo/event",
    lg = "none";
function mg(a) {
    return Ag.apply(this, arguments);
}
function Ag() {
    return (Ag = o(
        regeneratorRuntime.mark(function a(e) {
            return regeneratorRuntime.wrap(
                function (a) {
                    for (;;)
                        switch ((a.prev = a.next)) {
                            case 0:
                                if (((e.v = "811eb29"), -1 == "811eb29".indexOf("build"))) {
                                    a.next = 4;
                                    break;
                                }
                                return a.abrupt("return");
                            case 4:
                                return (
                                    (a.prev = 4),
                                    (a.next = 7),
                                    fetch(cg, {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(e),
                                    })
                                );
                            case 7:
                                a.next = 11;
                                break;
                            case 9:
                                (a.prev = 9), (a.t0 = a.catch(4));
                            case 11:
                            case "end":
                                return a.stop();
                        }
                },
                a,
                null,
                [[4, 9]]
            );
        })
    )).apply(this, arguments);
}
function gg(a, e) {
    return dg.apply(this, arguments);
}
function dg() {
    return (dg = o(
        regeneratorRuntime.mark(function a(e, o) {
            var r, i, t;
            return regeneratorRuntime.wrap(function (a) {
                for (;;)
                    switch ((a.prev = a.next)) {
                        case 0:
                            return (
                                (t =
                                    null !==
                                        (r =
                                            null !== (i = navigator.userAgent) && void 0 !== i
                                                ? i
                                                : navigator.vendor) && void 0 !== r
                                        ? r
                                        : window.opera),
                                (a.next = 3),
                                mg({ type: "error", ua: t, msg: e, stack: o, game: lg })
                            );
                        case 3:
                        case "end":
                            return a.stop();
                    }
            }, a);
        })
    )).apply(this, arguments);
}
var pg = yn,
    fg = _e,
    bg = Qe("unscopables"),
    vg = Array.prototype;
null == vg[bg] && fg.f(vg, bg, { configurable: 1, value: pg(null) });
var hg,
    wg,
    Bg,
    yg = function (a) {
        vg[bg][a] = 1;
    },
    Eg = !k(function () {
        function a() {}
        return (a.prototype.constructor = null), Object.getPrototypeOf(new a()) !== a.prototype;
    }),
    Dg = C,
    Qg = ce,
    xg = ga,
    jg = ne,
    Mg = Eg,
    zg = No("IE_PROTO"),
    Ig = Dg.Object,
    Cg = Ig.prototype,
    Ng = Mg
        ? Ig.getPrototypeOf
        : function (a) {
              var e = jg(a);
              if (Qg(e, zg)) return e[zg];
              var o = e.constructor;
              return xg(o) && e instanceof o ? o.prototype : e instanceof Ig ? Cg : null;
          },
    kg = k,
    Fg = ga,
    Og = Ng,
    Tg = bo.exports,
    Sg = Qe("iterator"),
    Lg = 0;
[].keys && ("next" in (Bg = [].keys()) ? (wg = Og(Og(Bg))) !== Object.prototype && (hg = wg) : (Lg = 1));
var Ug =
    null == hg ||
    kg(function () {
        var a = {};
        return hg[Sg].call(a) !== a;
    });
Ug && (hg = {}),
    Fg(hg[Sg]) ||
        Tg(hg, Sg, function () {
            return this;
        });
var Rg = { IteratorPrototype: hg, BUGGY_SAFARI_ITERATORS: Lg },
    Yg = Rg.IteratorPrototype,
    Pg = yn,
    Gg = H,
    qg = zc,
    Hg = Lc,
    Jg = function () {
        return this;
    },
    Vg = di,
    Wg = L,
    Kg = or,
    Xg = ga,
    Zg = Ng,
    _g = Lu,
    $g = zc,
    ad = fo,
    ed = bo.exports,
    od = Lc,
    rd = Kg.PROPER,
    id = Kg.CONFIGURABLE,
    td = Rg.IteratorPrototype,
    nd = Rg.BUGGY_SAFARI_ITERATORS,
    sd = Qe("iterator"),
    ud = function () {
        return this;
    },
    cd = function (a, e, o, r, i, t, n) {
        !(function (a, e, o) {
            var r = e + " Iterator";
            (a.prototype = Pg(Yg, { next: Gg(1, o) })), qg(a, r, 0), (Hg[r] = Jg);
        })(o, e, r);
        var s,
            u,
            c,
            l = function (a) {
                if (a === i && p) return p;
                if (!nd && a in g) return g[a];
                switch (a) {
                    case "keys":
                    case "values":
                    case "entries":
                        return function () {
                            return new o(this, a);
                        };
                }
                return function () {
                    return new o(this);
                };
            },
            m = e + " Iterator",
            A = 0,
            g = a.prototype,
            d = g[sd] || g["@@iterator"] || (i && g[i]),
            p = (!nd && d) || l(i),
            f = ("Array" == e && g.entries) || d;
        if (
            (f &&
                (s = Zg(f.call(new a()))) !== Object.prototype &&
                s.next &&
                (Zg(s) !== td && (_g ? _g(s, td) : Xg(s[sd]) || ed(s, sd, ud)), $g(s, m, 1)),
            rd &&
                "values" == i &&
                d &&
                "values" !== d.name &&
                (id
                    ? ad(g, "name", "values")
                    : ((A = 1),
                      (p = function () {
                          return Wg(d, this);
                      }))),
            i)
        )
            if (((u = { values: l("values"), keys: t ? p : l("keys"), entries: l("entries") }), n))
                for (c in u) (nd || A || !(c in g)) && ed(g, c, u[c]);
            else Vg({ target: e, proto: 1, forced: nd || A }, u);
        return g[sd] !== p && ed(g, sd, p, { name: i }), (od[e] = p), u;
    },
    ld = Aa,
    md = yg,
    Ad = Lc,
    gd = Xo,
    dd = _e.f,
    pd = cd,
    fd = F,
    bd = gd.set,
    vd = gd.getterFor("Array Iterator"),
    hd = pd(
        Array,
        "Array",
        function (a, e) {
            bd(this, { type: "Array Iterator", target: ld(a), index: 0, kind: e });
        },
        function () {
            var a = vd(this),
                e = a.target,
                o = a.kind,
                r = a.index++;
            return !e || r >= e.length
                ? ((a.target = void 0), { value: void 0, done: 1 })
                : "keys" == o
                  ? { value: r, done: 0 }
                  : "values" == o
                    ? { value: e[r], done: 0 }
                    : { value: [r, e[r]], done: 0 };
        },
        "values"
    ),
    wd = (Ad.Arguments = Ad.Array);
if ((md("keys"), md("values"), md("entries"), fd && "values" !== wd.name))
    try {
        dd(wd, "name", { value: "values" });
    } catch (a) {}
var Bd = { exports: {} },
    yd = {},
    Ed = ea,
    Dd = Aa,
    Qd = gr.f,
    xd = Ts,
    jd = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
yd.f = function (a) {
    return jd && "Window" == Ed(a)
        ? (function (a) {
              try {
                  return Qd(a);
              } catch (a) {
                  return xd(jd);
              }
          })(a)
        : Qd(Dd(a));
};
var Md = k(function () {
        if ("function" == typeof ArrayBuffer) {
            var a = new ArrayBuffer(8);
            Object.isExtensible(a) && Object.defineProperty(a, "a", { value: 8 });
        }
    }),
    zd = k,
    Id = pa,
    Cd = ea,
    Nd = Md,
    kd = Object.isExtensible,
    Fd =
        zd(function () {
            kd(1);
        }) || Nd
            ? function (a) {
                  return Id(a) ? (Nd && "ArrayBuffer" == Cd(a) ? 0 : kd ? kd(a) : 1) : 0;
              }
            : kd,
    Od = !k(function () {
        return Object.isExtensible(Object.preventExtensions({}));
    }),
    Td = di,
    Sd = Z,
    Ld = ko,
    Ud = pa,
    Rd = ce,
    Yd = _e.f,
    Pd = gr,
    Gd = yd,
    qd = Fd,
    Hd = Od,
    Jd = 0,
    Vd = de("meta"),
    Wd = 0,
    Kd = function (a) {
        Yd(a, Vd, { value: { objectID: "O" + Wd++, weakData: {} } });
    },
    Xd = (Bd.exports = {
        enable: function () {
            (Xd.enable = function () {}), (Jd = 1);
            var a = Pd.f,
                e = Sd([].splice),
                o = {};
            (o[Vd] = 1),
                a(o).length &&
                    ((Pd.f = function (o) {
                        for (var r = a(o), i = 0, t = r.length; i < t; i++)
                            if (r[i] === Vd) {
                                e(r, i, 1);
                                break;
                            }
                        return r;
                    }),
                    Td({ target: "Object", stat: 1, forced: 1 }, { getOwnPropertyNames: Gd.f }));
        },
        fastKey: function (a, e) {
            if (!Ud(a)) return "symbol" == typeof a ? a : ("string" == typeof a ? "S" : "P") + a;
            if (!Rd(a, Vd)) {
                if (!qd(a)) return "F";
                if (!e) return "E";
                Kd(a);
            }
            return a[Vd].objectID;
        },
        getWeakData: function (a, e) {
            if (!Rd(a, Vd)) {
                if (!qd(a)) return 1;
                if (!e) return 0;
                Kd(a);
            }
            return a[Vd].weakData;
        },
        onFreeze: function (a) {
            return Hd && Jd && qd(a) && !Rd(a, Vd) && Kd(a), a;
        },
    });
Ld[Vd] = 1;
var Zd = di,
    _d = C,
    $d = Z,
    ap = ni,
    ep = bo.exports,
    op = Bd.exports,
    rp = vl,
    ip = Sc,
    tp = ga,
    np = pa,
    sp = k,
    up = jl,
    cp = zc,
    lp = Pu,
    mp = function (a, e, o) {
        var r = -1 !== a.indexOf("Map"),
            i = -1 !== a.indexOf("Weak"),
            t = r ? "set" : "add",
            n = _d[a],
            s = n && n.prototype,
            u = n,
            c = {},
            l = function (a) {
                var e = $d(s[a]);
                ep(
                    s,
                    a,
                    "add" == a
                        ? function (a) {
                              return e(this, 0 === a ? 0 : a), this;
                          }
                        : "delete" == a
                          ? function (a) {
                                return i && !np(a) ? 0 : e(this, 0 === a ? 0 : a);
                            }
                          : "get" == a
                            ? function (a) {
                                  return i && !np(a) ? void 0 : e(this, 0 === a ? 0 : a);
                              }
                            : "has" == a
                              ? function (a) {
                                    return i && !np(a) ? 0 : e(this, 0 === a ? 0 : a);
                                }
                              : function (a, o) {
                                    return e(this, 0 === a ? 0 : a, o), this;
                                }
                );
            };
        if (
            ap(
                a,
                !tp(n) ||
                    !(
                        i ||
                        (s.forEach &&
                            !sp(function () {
                                new n().entries().next();
                            }))
                    )
            )
        )
            (u = o.getConstructor(e, a, r, t)), op.enable();
        else if (ap(a, 1)) {
            var m = new u(),
                A = m[t](i ? {} : -0, 1) != m,
                g = sp(function () {
                    m.has(1);
                }),
                d = up(function (a) {
                    new n(a);
                }),
                p =
                    !i &&
                    sp(function () {
                        for (var a = new n(), e = 5; e--; ) a[t](e, e);
                        return !a.has(-0);
                    });
            d ||
                (((u = e(function (a, e) {
                    ip(a, s);
                    var o = lp(new n(), a, u);
                    return null != e && rp(e, o[t], { that: o, AS_ENTRIES: r }), o;
                })).prototype = s),
                (s.constructor = u)),
                (g || p) && (l("delete"), l("has"), r && l("get")),
                (p || A) && l(t),
                i && s.clear && delete s.clear;
        }
        return (c[a] = u), Zd({ global: 1, forced: u != n }, c), cp(u, a), i || o.setStrong(u, a, r), u;
    },
    Ap = _e.f,
    gp = yn,
    dp = Qc,
    pp = Ct,
    fp = Sc,
    bp = vl,
    vp = cd,
    hp = Fc,
    wp = F,
    Bp = Bd.exports.fastKey,
    yp = Xo.set,
    Ep = Xo.getterFor,
    Dp = {
        getConstructor: function (a, e, o, r) {
            var i = a(function (a, i) {
                    fp(a, t),
                        yp(a, { type: e, index: gp(null), first: void 0, last: void 0, size: 0 }),
                        wp || (a.size = 0),
                        null != i && bp(i, a[r], { that: a, AS_ENTRIES: o });
                }),
                t = i.prototype,
                n = Ep(e),
                s = function (a, e, o) {
                    var r,
                        i,
                        t = n(a),
                        s = u(a, e);
                    return (
                        s
                            ? (s.value = o)
                            : ((t.last = s =
                                  {
                                      index: (i = Bp(e, 1)),
                                      key: e,
                                      value: o,
                                      previous: (r = t.last),
                                      next: void 0,
                                      removed: 0,
                                  }),
                              t.first || (t.first = s),
                              r && (r.next = s),
                              wp ? t.size++ : a.size++,
                              "F" !== i && (t.index[i] = s)),
                        a
                    );
                },
                u = function (a, e) {
                    var o,
                        r = n(a),
                        i = Bp(e);
                    if ("F" !== i) return r.index[i];
                    for (o = r.first; o; o = o.next) if (o.key == e) return o;
                };
            return (
                dp(t, {
                    clear: function () {
                        for (var a = n(this), e = a.index, o = a.first; o; )
                            (o.removed = 1),
                                o.previous && (o.previous = o.previous.next = void 0),
                                delete e[o.index],
                                (o = o.next);
                        (a.first = a.last = void 0), wp ? (a.size = 0) : (this.size = 0);
                    },
                    delete: function (a) {
                        var e = this,
                            o = n(e),
                            r = u(e, a);
                        if (r) {
                            var i = r.next,
                                t = r.previous;
                            delete o.index[r.index],
                                (r.removed = 1),
                                t && (t.next = i),
                                i && (i.previous = t),
                                o.first == r && (o.first = i),
                                o.last == r && (o.last = t),
                                wp ? o.size-- : e.size--;
                        }
                        return !!r;
                    },
                    forEach: function (a) {
                        for (
                            var e, o = n(this), r = pp(a, arguments.length > 1 ? arguments[1] : void 0);
                            (e = e ? e.next : o.first);

                        )
                            for (r(e.value, e.key, this); e && e.removed; ) e = e.previous;
                    },
                    has: function (a) {
                        return !!u(this, a);
                    },
                }),
                dp(
                    t,
                    o
                        ? {
                              get: function (a) {
                                  var e = u(this, a);
                                  return e && e.value;
                              },
                              set: function (a, e) {
                                  return s(this, 0 === a ? 0 : a, e);
                              },
                          }
                        : {
                              add: function (a) {
                                  return s(this, (a = 0 === a ? 0 : a), a);
                              },
                          }
                ),
                wp &&
                    Ap(t, "size", {
                        get: function () {
                            return n(this).size;
                        },
                    }),
                i
            );
        },
        setStrong: function (a, e, o) {
            var r = e + " Iterator",
                i = Ep(e),
                t = Ep(r);
            vp(
                a,
                e,
                function (a, e) {
                    yp(this, { type: r, target: a, state: i(a), kind: e, last: void 0 });
                },
                function () {
                    for (var a = t(this), e = a.kind, o = a.last; o && o.removed; ) o = o.previous;
                    return a.target && (a.last = o = o ? o.next : a.state.first)
                        ? "keys" == e
                            ? { value: o.key, done: 0 }
                            : "values" == e
                              ? { value: o.value, done: 0 }
                              : { value: [o.key, o.value], done: 0 }
                        : ((a.target = void 0), { value: void 0, done: 1 });
                },
                o ? "entries" : "values",
                !o,
                1
            ),
                hp(e);
        },
    };
mp(
    "Set",
    function (a) {
        return function () {
            return a(this, arguments.length ? arguments[0] : void 0);
        };
    },
    Dp
);
var Qp = Ms.charAt,
    xp = qt,
    jp = Xo,
    Mp = cd,
    zp = jp.set,
    Ip = jp.getterFor("String Iterator");
Mp(
    String,
    "String",
    function (a) {
        zp(this, { type: "String Iterator", string: xp(a), index: 0 });
    },
    function () {
        var a,
            e = Ip(this),
            o = e.string,
            r = e.index;
        return r >= o.length
            ? { value: void 0, done: 1 }
            : ((a = Qp(o, r)), (e.index += a.length), { value: a, done: 0 });
    }
);
var Cp = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0,
    },
    Np = Re("span").classList,
    kp = Np && Np.constructor && Np.constructor.prototype,
    Fp = kp === Object.prototype ? void 0 : kp,
    Op = C,
    Tp = Cp,
    Sp = Fp,
    Lp = hd,
    Up = fo,
    Rp = Qe,
    Yp = Rp("iterator"),
    Pp = Rp("toStringTag"),
    Gp = Lp.values,
    qp = function (a, e) {
        if (a) {
            if (a[Yp] !== Gp)
                try {
                    Up(a, Yp, Gp);
                } catch (e) {
                    a[Yp] = Gp;
                }
            if ((a[Pp] || Up(a, Pp, e), Tp[e]))
                for (var o in Lp)
                    if (a[o] !== Lp[o])
                        try {
                            Up(a, o, Lp[o]);
                        } catch (e) {
                            a[o] = Lp[o];
                        }
        }
    };
for (var Hp in Tp) qp(Op[Hp] && Op[Hp].prototype, Hp);
qp(Sp, "DOMTokenList");
var Jp = Z,
    Vp = Qc,
    Wp = Bd.exports.getWeakData,
    Kp = io,
    Xp = pa,
    Zp = Sc,
    _p = vl,
    $p = ce,
    af = Xo.set,
    ef = Xo.getterFor,
    of = Ut.find,
    rf = Ut.findIndex,
    tf = Jp([].splice),
    nf = 0,
    sf = function (a) {
        return a.frozen || (a.frozen = new uf());
    },
    uf = function () {
        this.entries = [];
    },
    cf = function (a, e) {
        return of(a.entries, function (a) {
            return a[0] === e;
        });
    };
uf.prototype = {
    get: function (a) {
        var e = cf(this, a);
        if (e) return e[1];
    },
    has: function (a) {
        return !!cf(this, a);
    },
    set: function (a, e) {
        var o = cf(this, a);
        o ? (o[1] = e) : this.entries.push([a, e]);
    },
    delete: function (a) {
        var e = rf(this.entries, function (e) {
            return e[0] === a;
        });
        return ~e && tf(this.entries, e, 1), !!~e;
    },
};
var lf = {
    getConstructor: function (a, e, o, r) {
        var i = a(function (a, i) {
                Zp(a, t),
                    af(a, { type: e, id: nf++, frozen: void 0 }),
                    null != i && _p(i, a[r], { that: a, AS_ENTRIES: o });
            }),
            t = i.prototype,
            n = ef(e),
            s = function (a, e, o) {
                var r = n(a),
                    i = Wp(Kp(e), 1);
                return 1 == i ? sf(r).set(e, o) : (i[r.id] = o), a;
            };
        return (
            Vp(t, {
                delete: function (a) {
                    var e = n(this);
                    if (!Xp(a)) return 0;
                    var o = Wp(a);
                    return 1 == o ? sf(e).delete(a) : o && $p(o, e.id) && delete o[e.id];
                },
                has: function (a) {
                    var e = n(this);
                    if (!Xp(a)) return 0;
                    var o = Wp(a);
                    return 1 == o ? sf(e).has(a) : o && $p(o, e.id);
                },
            }),
            Vp(
                t,
                o
                    ? {
                          get: function (a) {
                              var e = n(this);
                              if (Xp(a)) {
                                  var o = Wp(a);
                                  return 1 == o ? sf(e).get(a) : o ? o[e.id] : void 0;
                              }
                          },
                          set: function (a, e) {
                              return s(this, a, e);
                          },
                      }
                    : {
                          add: function (a) {
                              return s(this, a, 1);
                          },
                      }
            ),
            i
        );
    },
};
mp(
    "WeakSet",
    function (a) {
        return function () {
            return a(this, arguments.length ? arguments[0] : void 0);
        };
    },
    lf
);
var mf = or.PROPER,
    Af = wu.trim;
di(
    {
        target: "String",
        proto: 1,
        forced: k(function () {
            return (
                !!"\t\n\v\f\r                　\u2028\u2029\ufeff".trim() ||
                "​᠎" !== "​᠎".trim() ||
                (mf && "trim" !== "\t\n\v\f\r                　\u2028\u2029\ufeff".trim.name)
            );
        }),
    },
    {
        trim: function () {
            return Af(this);
        },
    }
);
var gf,
    df,
    pf = C,
    ff = Z,
    bf = Qc,
    vf = Bd.exports,
    hf = mp,
    wf = lf,
    Bf = pa,
    yf = Fd,
    Ef = Xo.enforce,
    Df = Mo,
    Qf = !pf.ActiveXObject && "ActiveXObject" in pf,
    xf = function (a) {
        return function () {
            return a(this, arguments.length ? arguments[0] : void 0);
        };
    },
    jf = hf("WeakMap", xf, wf);
if (Df && Qf) {
    (gf = wf.getConstructor(xf, "WeakMap", 1)), vf.enable();
    var Mf = jf.prototype,
        zf = ff(Mf.delete),
        If = ff(Mf.has),
        Cf = ff(Mf.get),
        Nf = ff(Mf.set);
    bf(Mf, {
        delete: function (a) {
            if (Bf(a) && !yf(a)) {
                var e = Ef(this);
                return e.frozen || (e.frozen = new gf()), zf(this, a) || e.frozen.delete(a);
            }
            return zf(this, a);
        },
        has: function (a) {
            if (Bf(a) && !yf(a)) {
                var e = Ef(this);
                return e.frozen || (e.frozen = new gf()), If(this, a) || e.frozen.has(a);
            }
            return If(this, a);
        },
        get: function (a) {
            if (Bf(a) && !yf(a)) {
                var e = Ef(this);
                return e.frozen || (e.frozen = new gf()), If(this, a) ? Cf(this, a) : e.frozen.get(a);
            }
            return Cf(this, a);
        },
        set: function (a, e) {
            if (Bf(a) && !yf(a)) {
                var o = Ef(this);
                o.frozen || (o.frozen = new gf()), If(this, a) ? Nf(this, a, e) : o.frozen.set(a, e);
            } else Nf(this, a, e);
            return this;
        },
    });
}
function kf(a) {
    var e = document.createElement("template");
    return (e.innerHTML = a.trim()), e.content;
}
function Ff(a, e) {
    (a.style.animation = null), a.getClientRects(), (a.style.animation = e);
}
function Of(a) {
    for (var e = [], o = arguments.length, r = new Array(o > 1 ? o - 1 : 0), i = 1; i < o; i++) r[i - 1] = arguments[i];
    for (var t = 0; t < a.length; ++t) e.push(a[t]), void 0 !== r[t] && e.push(r[t]);
    return e.join("");
}
var Tf = new WeakMap(),
    Sf = new WeakMap(),
    Lf = (function () {
        s(e, A(HTMLElement));
        var a = p(e);
        function e() {
            var o;
            return (
                r(this, e),
                j(g((o = a.call(this))), Tf, { writable: 1, value: null }),
                j(g(o), Sf, { writable: 1, value: 0 }),
                o.attachShadow({ mode: "open" }),
                E(g(o), Tf, document.createElement("style")),
                (y(g(o), Tf).type = "text/css"),
                (y(g(o), Tf).textContent = o.stylesheet()),
                (o._template = kf(o.html())),
                o
            );
        }
        return (
            t(
                e,
                [
                    {
                        key: "attributeChangedCallback",
                        value: function () {
                            y(this, Sf) && this.update();
                        },
                    },
                    {
                        key: "connectedCallback",
                        value: function () {
                            for (E(this, Sf, 1); this.shadowRoot.firstChild; )
                                this.shadowRoot.removeChild(this.shadowRoot.firstChild);
                            this.shadowRoot.append(y(this, Tf)),
                                this._template && this.shadowRoot.append(this._template.cloneNode(1)),
                                this.connect(),
                                this.update();
                        },
                    },
                    {
                        key: "disconnectedCallback",
                        value: function () {
                            E(this, Sf, 0), this.disconnect();
                        },
                    },
                    { key: "connect", value: function () {} },
                    { key: "disconnect", value: function () {} },
                    { key: "update", value: function () {} },
                    {
                        key: "html",
                        value: function () {
                            return "";
                        },
                    },
                    {
                        key: "stylesheet",
                        value: function () {
                            return Of(df || (df = f([""])));
                        },
                    },
                ],
                [
                    {
                        key: "observedAttributes",
                        get: function () {
                            return this.attr;
                        },
                    },
                ]
            ),
            e
        );
    })();
n(Lf, "attr", []);
var Uf,
    Rf = new Set([
        "ababa",
        "abacá",
        "abada",
        "abade",
        "abado",
        "abafa",
        "abafe",
        "abafo",
        "abaju",
        "abala",
        "abale",
        "abalo",
        "abama",
        "abana",
        "abane",
        "abapo",
        "abará",
        "abaré",
        "abata",
        "abate",
        "abati",
        "abato",
        "abdal",
        "abebé",
        "abecê",
        "abedo",
        "abedê",
        "abeta",
        "abete",
        "abeto",
        "abexi",
        "abibe",
        "abicô",
        "abilo",
        "abita",
        "abito",
        "ablua",
        "ablui",
        "abluo",
        "aboar",
        "abobó",
        "aboca",
        "abofé",
        "abohm",
        "aboio",
        "aboiz",
        "abola",
        "abole",
        "aboli",
        "aboma",
        "abona",
        "abone",
        "aboço",
        "abram",
        "abras",
        "abrem",
        "abres",
        "abreu",
        "abria",
        "abris",
        "abriu",
        "abube",
        "abudo",
        "abuna",
        "abusa",
        "abuse",
        "abuta",
        "abuxó",
        "acaba",
        "acabe",
        "acabo",
        "acada",
        "acaia",
        "acaio",
        "acaju",
        "acajá",
        "acalo",
        "acama",
        "acana",
        "acapu",
        "acari",
        "acará",
        "acata",
        "acate",
        "acato",
        "acauã",
        "acaçá",
        "acaém",
        "aceca",
        "aceda",
        "acede",
        "acefe",
        "acelo",
        "acena",
        "acene",
        "acero",
        "aceso",
        "aceto",
        "achai",
        "acham",
        "achas",
        "achei",
        "achem",
        "aches",
        "achim",
        "achou",
        "acibe",
        "acica",
        "acila",
        "acioa",
        "aclia",
        "acnes",
        "acoar",
        "acode",
        "aconá",
        "acori",
        "acral",
        "acres",
        "acrol",
        "acroá",
        "acréu",
        "acuai",
        "acuam",
        "acuar",
        "acuas",
        "acuda",
        "acudi",
        "acudo",
        "acuei",
        "acuem",
        "acues",
        "acume",
        "acumã",
        "acuna",
        "acuou",
        "acura",
        "acuri",
        "acuré",
        "acusa",
        "acuse",
        "acuso",
        "acuta",
        "acuti",
        "adaca",
        "adage",
        "adail",
        "adali",
        "adama",
        "adamo",
        "adejo",
        "adela",
        "adele",
        "adelo",
        "adema",
        "adere",
        "aderi",
        "adeso",
        "adiai",
        "adiam",
        "adias",
        "adibe",
        "adica",
        "adido",
        "adiei",
        "adiem",
        "adies",
        "adino",
        "adiou",
        "adira",
        "adiro",
        "adita",
        "adite",
        "adito",
        "adixá",
        "adoba",
        "adobe",
        "adobo",
        "adoce",
        "adogã",
        "adoli",
        "adolo",
        "adora",
        "adore",
        "adoro",
        "adota",
        "adote",
        "adoto",
        "adova",
        "adoxa",
        "adoxo",
        "adoça",
        "adoço",
        "aduar",
        "aduba",
        "adube",
        "adubo",
        "adufa",
        "adufe",
        "adufo",
        "adula",
        "adule",
        "adulo",
        "aduro",
        "advim",
        "advém",
        "adíon",
        "aerar",
        "afaga",
        "afana",
        "afane",
        "afano",
        "afear",
        "afefé",
        "afegã",
        "afere",
        "aferi",
        "afeta",
        "afete",
        "afiai",
        "afiam",
        "afiar",
        "afias",
        "afiei",
        "afiem",
        "afies",
        "afilo",
        "afina",
        "afine",
        "afino",
        "afiou",
        "afira",
        "afiro",
        "afito",
        "afixa",
        "afixe",
        "afixo",
        "aflar",
        "aflua",
        "aflui",
        "afluo",
        "afoba",
        "afobe",
        "afobo",
        "afofa",
        "afofe",
        "afofo",
        "afoga",
        "afogo",
        "afono",
        "afora",
        "afore",
        "aforo",
        "afoxé",
        "afros",
        "aftas",
        "afurá",
        "agabe",
        "agacé",
        "agadá",
        "agala",
        "agama",
        "agami",
        "agara",
        "agaré",
        "agati",
        "agave",
        "ageia",
        "agema",
        "agiam",
        "agiar",
        "agias",
        "agido",
        "agira",
        "agita",
        "agite",
        "agito",
        "aglia",
        "agnal",
        "agnus",
        "agoge",
        "agogô",
        "agrar",
        "agraz",
        "agror",
        "agrão",
        "agrém",
        "aguar",
        "aguaí",
        "aguce",
        "aguda",
        "agude",
        "aguei",
        "aguem",
        "aguou",
        "aguti",
        "aguça",
        "aguço",
        "aiaia",
        "aiala",
        "aiará",
        "aiaçá",
        "aidro",
        "aigue",
        "ainsa",
        "aiocá",
        "aiola",
        "aioro",
        "aipim",
        "aipos",
        "airar",
        "aires",
        "airol",
        "airão",
        "aitão",
        "aiuba",
        "aiucá",
        "aiuiú",
        "aivão",
        "aixes",
        "ajabó",
        "ajacu",
        "ajais",
        "ajaja",
        "ajapá",
        "ajará",
        "ajaré",
        "ajeru",
        "ajobó",
        "ajuba",
        "ajude",
        "ajudo",
        "ajuga",
        "ajupe",
        "ajupá",
        "ajuri",
        "ajuru",
        "alabá",
        "alabê",
        "alada",
        "alafé",
        "alaga",
        "alago",
        "alalá",
        "alano",
        "alara",
        "alaus",
        "albor",
        "albói",
        "alcaz",
        "alcei",
        "alcem",
        "alces",
        "alcis",
        "aldeã",
        "aldol",
        "alear",
        "alefe",
        "alega",
        "alego",
        "aleia",
        "aleli",
        "alelo",
        "alemã",
        "alepo",
        "aleta",
        "aleto",
        "alfar",
        "alfas",
        "alfil",
        "alfim",
        "alfir",
        "alfol",
        "alfoz",
        "alfur",
        "algar",
        "algas",
        "algaz",
        "alger",
        "algia",
        "algol",
        "algor",
        "algur",
        "alhal",
        "alhas",
        "alhos",
        "aliai",
        "aliam",
        "aliei",
        "aliem",
        "alies",
        "alija",
        "alije",
        "alijo",
        "alila",
        "alilo",
        "alime",
        "alina",
        "aliou",
        "alisa",
        "alise",
        "aliso",
        "alita",
        "aljuz",
        "almez",
        "almuz",
        "aloca",
        "aloco",
        "alodê",
        "alofe",
        "aloja",
        "aloje",
        "alojo",
        "alose",
        "alote",
        "aloés",
        "alpes",
        "alpão",
        "alsol",
        "altas",
        "alter",
        "alteá",
        "altor",
        "aluar",
        "aluda",
        "alude",
        "aludi",
        "aludo",
        "alufá",
        "aluga",
        "alugo",
        "aluir",
        "alujá",
        "alume",
        "aluna",
        "alvar",
        "alvas",
        "alvor",
        "alvos",
        "alvão",
        "alçai",
        "alçam",
        "alças",
        "alçou",
        "alçuz",
        "amaci",
        "amado",
        "amadu",
        "amaga",
        "amais",
        "amalá",
        "amame",
        "amamu",
        "amaná",
        "amapá",
        "amara",
        "amare",
        "amaro",
        "amato",
        "amava",
        "ambel",
        "ambia",
        "ambom",
        "ambre",
        "ambuá",
        "ambuí",
        "ambão",
        "amear",
        "ameei",
        "ameia",
        "ameis",
        "ameju",
        "amela",
        "amelo",
        "amelê",
        "amena",
        "ameça",
        "amial",
        "amiba",
        "amida",
        "amiga",
        "amigo",
        "amila",
        "amilo",
        "amima",
        "amime",
        "amimo",
        "amina",
        "amino",
        "amite",
        "amito",
        "amojo",
        "amola",
        "amole",
        "amolo",
        "amomo",
        "amoré",
        "amota",
        "amuar",
        "amura",
        "amuri",
        "amurê",
        "amuso",
        "anabi",
        "anaco",
        "anacã",
        "anacé",
        "anafa",
        "anafe",
        "anais",
        "anaiá",
        "anajá",
        "anajé",
        "aname",
        "anani",
        "anano",
        "ananá",
        "anata",
        "anati",
        "anato",
        "anauê",
        "ancas",
        "ancho",
        "ancil",
        "anciã",
        "andai",
        "andam",
        "andas",
        "andei",
        "andem",
        "andes",
        "andim",
        "andoa",
        "andor",
        "andou",
        "andua",
        "aneel",
        "anejo",
        "anela",
        "anele",
        "anelo",
        "anema",
        "anesa",
        "anete",
        "aneto",
        "anexa",
        "anexe",
        "angaú",
        "angel",
        "anglo",
        "angor",
        "aniba",
        "anibu",
        "anido",
        "anima",
        "anime",
        "anina",
        "anita",
        "anixi",
        "anixo",
        "anião",
        "anjão",
        "anojo",
        "anona",
        "anori",
        "anoso",
        "anota",
        "anote",
        "anoto",
        "ansar",
        "antal",
        "antar",
        "antas",
        "antia",
        "antre",
        "antão",
        "anuam",
        "anuas",
        "anuaí",
        "anuem",
        "anuir",
        "anuis",
        "anuiu",
        "anujá",
        "anula",
        "anule",
        "anulo",
        "anuri",
        "anuro",
        "anuía",
        "anãos",
        "aoqui",
        "aorta",
        "apaga",
        "apago",
        "apapá",
        "apara",
        "apare",
        "aparo",
        "apeai",
        "apear",
        "apecu",
        "apeei",
        "apega",
        "apego",
        "apeia",
        "apeie",
        "apeio",
        "apela",
        "apele",
        "apena",
        "apene",
        "apeno",
        "apeou",
        "apero",
        "apicu",
        "apiol",
        "apita",
        "apite",
        "apitu",
        "apião",
        "apodo",
        "apoia",
        "apoie",
        "apois",
        "apojo",
        "apolo",
        "apota",
        "apraz",
        "apreá",
        "aptar",
        "aptas",
        "aptos",
        "apuar",
        "apupo",
        "apura",
        "apure",
        "apuro",
        "aqueu",
        "aquém",
        "arabi",
        "arabu",
        "arabá",
        "aracu",
        "arada",
        "arado",
        "arais",
        "araiá",
        "araió",
        "araiú",
        "arale",
        "aramo",
        "aramã",
        "arara",
        "arari",
        "aratu",
        "aratá",
        "araué",
        "arava",
        "araxá",
        "araçá",
        "arbim",
        "arcai",
        "arcal",
        "arcam",
        "arcas",
        "arcaz",
        "archa",
        "arcou",
        "ardam",
        "ardas",
        "ardei",
        "ardem",
        "ardes",
        "ardeu",
        "ardia",
        "ardil",
        "ardis",
        "ardra",
        "arear",
        "areca",
        "aredê",
        "areio",
        "areis",
        "areja",
        "areje",
        "arejo",
        "areou",
        "arepa",
        "arerê",
        "areão",
        "arfai",
        "arfam",
        "arfar",
        "arfas",
        "arfei",
        "arfem",
        "arfes",
        "arfil",
        "arfir",
        "arfou",
        "argal",
        "argas",
        "argau",
        "argel",
        "argol",
        "argos",
        "argot",
        "argua",
        "argui",
        "arguo",
        "argão",
        "ariar",
        "aribé",
        "aricu",
        "aricá",
        "aricó",
        "arife",
        "arigó",
        "arila",
        "arilo",
        "arimo",
        "arimã",
        "ariná",
        "aripo",
        "ariri",
        "ariti",
        "aritá",
        "arjão",
        "armai",
        "armam",
        "armas",
        "armei",
        "armem",
        "armes",
        "armim",
        "armou",
        "armur",
        "armão",
        "arméu",
        "arnal",
        "arnaz",
        "arnês",
        "arocá",
        "arola",
        "arpar",
        "arpoa",
        "arpoe",
        "arpoo",
        "arpão",
        "arpéu",
        "arque",
        "arqui",
        "arral",
        "arras",
        "arreu",
        "arria",
        "arrie",
        "arrio",
        "arruá",
        "arses",
        "artão",
        "aruaí",
        "arubé",
        "aruca",
        "aruga",
        "arujo",
        "arumã",
        "aruru",
        "arurá",
        "arval",
        "arxar",
        "arção",
        "aréus",
        "asada",
        "asado",
        "asana",
        "ascii",
        "aselo",
        "asila",
        "asile",
        "asilo",
        "asnal",
        "asnas",
        "asnil",
        "asnis",
        "asnos",
        "aspar",
        "aspes",
        "aspre",
        "assai",
        "assam",
        "assas",
        "assaz",
        "assei",
        "assem",
        "asses",
        "assoa",
        "assoe",
        "assoo",
        "assou",
        "assuã",
        "astil",
        "astim",
        "astre",
        "ataca",
        "ataco",
        "atada",
        "atado",
        "atais",
        "atalá",
        "atana",
        "atapu",
        "atara",
        "atarê",
        "atava",
        "ateai",
        "atear",
        "ateei",
        "ateia",
        "ateie",
        "ateio",
        "ateis",
        "atela",
        "ateou",
        "aterá",
        "ateus",
        "ateve",
        "atice",
        "atico",
        "atido",
        "atina",
        "atine",
        "atino",
        "atira",
        "atire",
        "atiro",
        "atito",
        "ativa",
        "ative",
        "ativo",
        "atiça",
        "atiçu",
        "atled",
        "atoar",
        "atobá",
        "atola",
        "atole",
        "atolo",
        "atora",
        "atotô",
        "atrai",
        "atril",
        "atroo",
        "atuai",
        "atuam",
        "atuas",
        "atuei",
        "atuem",
        "atues",
        "atuir",
        "atuou",
        "atura",
        "ature",
        "aturo",
        "atxim",
        "aténs",
        "atóis",
        "auari",
        "auati",
        "auaçu",
        "audaz",
        "aueti",
        "augar",
        "auges",
        "augir",
        "auiba",
        "aulir",
        "aunar",
        "auras",
        "aurir",
        "ausia",
        "ausio",
        "autua",
        "autue",
        "autuo",
        "auuva",
        "aução",
        "avano",
        "avant",
        "avara",
        "avari",
        "avaré",
        "avati",
        "aveal",
        "aveio",
        "avena",
        "aveão",
        "aviai",
        "aviam",
        "aviar",
        "avias",
        "aviei",
        "aviem",
        "avier",
        "avies",
        "avios",
        "aviou",
        "avirá",
        "avisa",
        "avise",
        "avito",
        "aviva",
        "avive",
        "avivo",
        "avoar",
        "avoei",
        "avéns",
        "axabó",
        "axexê",
        "axial",
        "axoxô",
        "axura",
        "azado",
        "azalá",
        "azara",
        "azare",
        "azaro",
        "azeda",
        "azede",
        "azera",
        "azeri",
        "aziar",
        "azibó",
        "azida",
        "azina",
        "azoar",
        "azola",
        "azote",
        "azoto",
        "azuis",
        "azula",
        "azule",
        "azulo",
        "açacu",
        "açalá",
        "açame",
        "açamo",
        "açubá",
        "açulo",
        "açumi",
        "aïoli",
        "aônio",
        "aúste",
        "babai",
        "babal",
        "babam",
        "babas",
        "babau",
        "babei",
        "babel",
        "babem",
        "babes",
        "bable",
        "babou",
        "babul",
        "babuí",
        "babão",
        "bacar",
        "bacen",
        "bachi",
        "bacio",
        "badal",
        "badil",
        "badio",
        "badém",
        "baeco",
        "baenã",
        "baeta",
        "bafar",
        "bafio",
        "bafum",
        "bagar",
        "bagas",
        "bagem",
        "bagos",
        "bagre",
        "baguá",
        "bahia",
        "baiar",
        "baias",
        "baila",
        "bailo",
        "bairu",
        "baite",
        "baixe",
        "baixo",
        "baião",
        "bajar",
        "balar",
        "balbo",
        "balda",
        "baldo",
        "balem",
        "bales",
        "balha",
        "balho",
        "balia",
        "balim",
        "balio",
        "balir",
        "balis",
        "baliu",
        "balso",
        "balça",
        "bambo",
        "bambê",
        "banem",
        "banes",
        "banga",
        "bango",
        "bangu",
        "banha",
        "banhe",
        "bania",
        "banis",
        "baniu",
        "banja",
        "banti",
        "banto",
        "bantu",
        "bantá",
        "banza",
        "banzo",
        "banzé",
        "baobá",
        "baraú",
        "barbo",
        "barca",
        "barda",
        "bardo",
        "barga",
        "baria",
        "baris",
        "baroa",
        "barra",
        "barré",
        "barém",
        "basal",
        "basca",
        "bases",
        "basic",
        "basim",
        "basso",
        "bassê",
        "baste",
        "basto",
        "batam",
        "batas",
        "batch",
        "batei",
        "batel",
        "batem",
        "bates",
        "bateu",
        "batia",
        "batim",
        "batmo",
        "batos",
        "batão",
        "baumê",
        "bauru",
        "baxim",
        "baíra",
        "baúle",
        "baúna",
        "beabá",
        "bebam",
        "bebas",
        "bebei",
        "bebem",
        "bebeu",
        "bebra",
        "bebum",
        "bebês",
        "becas",
        "beche",
        "becos",
        "bedel",
        "bedro",
        "bedum",
        "beduí",
        "bedém",
        "begue",
        "begum",
        "beija",
        "beije",
        "beiju",
        "beire",
        "beiro",
        "beiru",
        "beisa",
        "beiça",
        "beiço",
        "belaz",
        "belfa",
        "belfo",
        "belga",
        "belho",
        "beliz",
        "belão",
        "bemba",
        "bembé",
        "bemol",
        "bendi",
        "bendé",
        "bengo",
        "benim",
        "benta",
        "bento",
        "benza",
        "benze",
        "benzi",
        "benzo",
        "bença",
        "beque",
        "berba",
        "berma",
        "berna",
        "berne",
        "berno",
        "berol",
        "beroé",
        "berra",
        "berre",
        "berta",
        "berça",
        "beréu",
        "berós",
        "bespa",
        "bespe",
        "bessi",
        "betar",
        "betas",
        "betle",
        "betol",
        "betre",
        "betão",
        "bezar",
        "biaba",
        "biana",
        "biari",
        "biaro",
        "biata",
        "bibes",
        "bibió",
        "biblá",
        "bibói",
        "bicai",
        "bical",
        "bicam",
        "bicar",
        "bicas",
        "bicha",
        "bicos",
        "bicou",
        "bicão",
        "bidão",
        "biela",
        "bieno",
        "bifar",
        "bifes",
        "bigla",
        "bigle",
        "biguá",
        "bijou",
        "bijus",
        "bijuí",
        "bilha",
        "bilhó",
        "bilro",
        "bimar",
        "bimba",
        "bimbo",
        "binar",
        "binda",
        "binga",
        "binha",
        "biniú",
        "bioba",
        "bioco",
        "biose",
        "biota",
        "bipar",
        "bique",
        "birba",
        "birmã",
        "birre",
        "birro",
        "bisar",
        "bisbi",
        "bisca",
        "bisco",
        "bisel",
        "bisou",
        "bispa",
        "bisso",
        "bisão",
        "bitar",
        "bitas",
        "bitre",
        "biurá",
        "black",
        "blast",
        "blasé",
        "blata",
        "blefa",
        "blefe",
        "blefo",
        "blend",
        "bleso",
        "blini",
        "blitz",
        "blogs",
        "bluco",
        "blues",
        "bluff",
        "blufo",
        "blush",
        "bndes",
        "boaba",
        "boana",
        "boava",
        "bobal",
        "bobar",
        "bobas",
        "bobes",
        "bobos",
        "bobão",
        "bocar",
        "bocel",
        "bocha",
        "boche",
        "bocim",
        "bocué",
        "bocão",
        "bodar",
        "bodas",
        "bodes",
        "bodum",
        "boeta",
        "bofar",
        "bofas",
        "bofes",
        "bogar",
        "bogue",
        "boiai",
        "boiam",
        "boias",
        "boibi",
        "boiei",
        "boiem",
        "boies",
        "boiga",
        "boiil",
        "boimé",
        "boiou",
        "boiru",
        "boita",
        "boite",
        "boião",
        "boiça",
        "boiçu",
        "bojar",
        "bojuí",
        "bolai",
        "bolam",
        "bolar",
        "bolas",
        "bolbo",
        "bolco",
        "boldo",
        "bolei",
        "bolem",
        "boles",
        "bolhó",
        "bolim",
        "bolor",
        "bolos",
        "bolou",
        "bolão",
        "boléu",
        "bombo",
        "bonda",
        "bonga",
        "bongô",
        "bonho",
        "bonza",
        "bonzo",
        "bonés",
        "boque",
        "boral",
        "borco",
        "borde",
        "borga",
        "borgo",
        "borla",
        "borne",
        "borno",
        "bornu",
        "boroa",
        "boros",
        "borra",
        "borre",
        "borro",
        "bosca",
        "bosta",
        "bosão",
        "botai",
        "botam",
        "botas",
        "botei",
        "botem",
        "botes",
        "botim",
        "botos",
        "botou",
        "bouba",
        "bouga",
        "bouri",
        "bouça",
        "bouço",
        "boxar",
        "boxes",
        "braba",
        "brabo",
        "brada",
        "brade",
        "brado",
        "braga",
        "brala",
        "brama",
        "brame",
        "brami",
        "bramo",
        "braça",
        "break",
        "breal",
        "brear",
        "breba",
        "breca",
        "breco",
        "bredo",
        "brefo",
        "breia",
        "breio",
        "breja",
        "brema",
        "brete",
        "bretã",
        "breza",
        "brial",
        "briba",
        "brica",
        "brida",
        "bride",
        "brigo",
        "briol",
        "brios",
        "brise",
        "brita",
        "brito",
        "briza",
        "broas",
        "broco",
        "broma",
        "bromo",
        "brota",
        "brote",
        "broto",
        "broxa",
        "broxo",
        "bruar",
        "bruaá",
        "bruco",
        "brugo",
        "bruma",
        "brumo",
        "bruna",
        "bruno",
        "bruta",
        "bríon",
        "buama",
        "buara",
        "buase",
        "bubão",
        "buchu",
        "bucim",
        "bucle",
        "bucre",
        "bucuí",
        "bufai",
        "bufam",
        "bufas",
        "bufei",
        "bufem",
        "bufes",
        "bufir",
        "bufos",
        "bufou",
        "buggy",
        "bugia",
        "bugio",
        "bugle",
        "bugra",
        "bugre",
        "bujão",
        "bulam",
        "bular",
        "bulas",
        "bulbo",
        "bules",
        "bulha",
        "bulho",
        "bulia",
        "bulir",
        "bulis",
        "buliu",
        "bumba",
        "bumbo",
        "bunda",
        "bundo",
        "bunga",
        "bungo",
        "bunho",
        "buquê",
        "burca",
        "burdo",
        "burel",
        "burgo",
        "buril",
        "burla",
        "burle",
        "burlo",
        "burnu",
        "bursa",
        "burço",
        "busca",
        "busco",
        "busil",
        "butes",
        "butil",
        "butim",
        "butir",
        "butiá",
        "butre",
        "butua",
        "buvar",
        "buxal",
        "buído",
        "buílo",
        "bádur",
        "báfer",
        "báfia",
        "bágoa",
        "bário",
        "básio",
        "básis",
        "bátis",
        "bâmbi",
        "bécua",
        "bélis",
        "bétel",
        "bétis",
        "bíduo",
        "bíter",
        "bívio",
        "bócio",
        "bófia",
        "bórax",
        "bóson",
        "bóton",
        "bóxer",
        "búteo",
        "bútio",
        "búzio",
        "caaba",
        "caacó",
        "caaeé",
        "caama",
        "caami",
        "caapi",
        "caaxi",
        "caaçu",
        "cabal",
        "cabaz",
        "cabaú",
        "cabei",
        "cabem",
        "cabes",
        "cabia",
        "cabiú",
        "cable",
        "caboz",
        "cabre",
        "cabro",
        "cacei",
        "cacem",
        "caces",
        "cacha",
        "cache",
        "cachu",
        "cacim",
        "caciz",
        "cacre",
        "cacto",
        "cadai",
        "cadoz",
        "caeté",
        "cafiz",
        "cafra",
        "cafre",
        "cafta",
        "cafua",
        "cafus",
        "cafuz",
        "cafés",
        "cagai",
        "cagam",
        "cagar",
        "cagas",
        "cagom",
        "cagou",
        "cagoã",
        "cague",
        "cagão",
        "caiai",
        "caiam",
        "caiar",
        "caias",
        "caiba",
        "caibo",
        "caicó",
        "caide",
        "caiei",
        "caiem",
        "caies",
        "caiou",
        "caipa",
        "cairi",
        "cairo",
        "cairá",
        "cairé",
        "caité",
        "caiçu",
        "caiçá",
        "cajus",
        "cajuá",
        "cajuí",
        "cajás",
        "cajão",
        "calai",
        "calam",
        "calas",
        "calau",
        "calce",
        "calei",
        "calem",
        "cales",
        "calha",
        "calhe",
        "calho",
        "calim",
        "caliz",
        "calom",
        "calos",
        "calou",
        "calpa",
        "calta",
        "calum",
        "calão",
        "calço",
        "camal",
        "camas",
        "camaá",
        "camba",
        "cambo",
        "camol",
        "campa",
        "campi",
        "campé",
        "camuá",
        "camão",
        "canas",
        "canaz",
        "cancã",
        "canda",
        "cande",
        "cando",
        "canez",
        "canga",
        "cango",
        "canha",
        "canho",
        "canis",
        "canos",
        "canoé",
        "cansa",
        "canse",
        "canso",
        "canta",
        "cante",
        "canzo",
        "canzá",
        "caoba",
        "capai",
        "capam",
        "capar",
        "capas",
        "capei",
        "capem",
        "capes",
        "capiá",
        "capom",
        "capot",
        "capou",
        "capro",
        "capsa",
        "capta",
        "capte",
        "capto",
        "caput",
        "capão",
        "caras",
        "carda",
        "cardo",
        "carel",
        "caria",
        "caril",
        "cario",
        "cariz",
        "carií",
        "cariú",
        "carme",
        "carna",
        "caroá",
        "caroé",
        "carpe",
        "carpi",
        "carpo",
        "carrê",
        "carte",
        "carto",
        "caruá",
        "carva",
        "carão",
        "caréu",
        "casai",
        "casam",
        "casas",
        "casbá",
        "casei",
        "casem",
        "cases",
        "casou",
        "cassa",
        "casse",
        "casso",
        "casti",
        "casão",
        "catai",
        "catam",
        "catas",
        "catau",
        "catch",
        "catei",
        "catem",
        "cates",
        "catou",
        "catre",
        "catur",
        "catuá",
        "catão",
        "caubi",
        "cauim",
        "caumã",
        "cauna",
        "caupi",
        "cauri",
        "cauré",
        "cause",
        "causo",
        "cauto",
        "cauxi",
        "cavai",
        "cavam",
        "cavas",
        "cavei",
        "cavem",
        "caves",
        "cavou",
        "cavão",
        "caxim",
        "cazol",
        "caçai",
        "caçam",
        "caças",
        "caçoa",
        "caçoe",
        "caçoo",
        "caçou",
        "caçuá",
        "caído",
        "caíva",
        "caúba",
        "caúno",
        "ceado",
        "ceais",
        "ceará",
        "ceata",
        "ceava",
        "cecal",
        "cecém",
        "cedam",
        "cedas",
        "cedei",
        "cedem",
        "cedes",
        "cedeu",
        "cedia",
        "ceeis",
        "cefeu",
        "cegai",
        "cegam",
        "cegar",
        "cegas",
        "cegos",
        "cegou",
        "cegue",
        "ceiam",
        "ceias",
        "ceiba",
        "ceiem",
        "ceies",
        "ceifa",
        "ceife",
        "ceifo",
        "ceira",
        "ceita",
        "ceiva",
        "ceive",
        "celas",
        "celga",
        "celha",
        "cello",
        "celso",
        "celte",
        "cenho",
        "cenra",
        "ceote",
        "cepas",
        "cerar",
        "ceras",
        "cerce",
        "cerda",
        "cerdo",
        "ceres",
        "cerna",
        "cerni",
        "cerol",
        "cerra",
        "cerre",
        "cerro",
        "cerva",
        "cerzi",
        "cessa",
        "cesse",
        "cesso",
        "cetil",
        "cetol",
        "cetra",
        "cevar",
        "cevão",
        "chabu",
        "chabã",
        "chabó",
        "chaco",
        "chada",
        "chaga",
        "chago",
        "chajá",
        "chala",
        "chalo",
        "chama",
        "chame",
        "chamo",
        "chana",
        "chape",
        "chapo",
        "chara",
        "charo",
        "chaté",
        "chauá",
        "chavo",
        "chaça",
        "chaém",
        "chebê",
        "checa",
        "checo",
        "cheda",
        "chede",
        "chefa",
        "chega",
        "chego",
        "chela",
        "chena",
        "chesf",
        "cheta",
        "chevá",
        "chiai",
        "chiam",
        "chias",
        "chiba",
        "chibo",
        "chibé",
        "chica",
        "chico",
        "chiei",
        "chiem",
        "chies",
        "chifu",
        "chila",
        "chile",
        "chili",
        "china",
        "chinó",
        "chiou",
        "chipa",
        "chipe",
        "chipo",
        "chips",
        "chira",
        "chiru",
        "chita",
        "chião",
        "choca",
        "choco",
        "chogó",
        "chola",
        "cholo",
        "chona",
        "choné",
        "chopa",
        "chope",
        "chopp",
        "chora",
        "chore",
        "choto",
        "chova",
        "chove",
        "chovi",
        "chovo",
        "chuca",
        "chufa",
        "chula",
        "chulé",
        "chuna",
        "chupa",
        "chupe",
        "chupo",
        "churi",
        "chuta",
        "chute",
        "chuto",
        "chuxo",
        "chuço",
        "chués",
        "chãos",
        "ciado",
        "ciano",
        "ciara",
        "ciato",
        "cibar",
        "ciber",
        "cicas",
        "cicia",
        "cicie",
        "cicio",
        "cidno",
        "cidra",
        "cidró",
        "ciena",
        "ciese",
        "cifar",
        "cifre",
        "cifro",
        "cigas",
        "cigno",
        "cilha",
        "cimba",
        "cimol",
        "cinca",
        "cinda",
        "cinde",
        "cindi",
        "cindo",
        "cinge",
        "cingi",
        "cinja",
        "cinjo",
        "cinor",
        "cioba",
        "cioco",
        "cioso",
        "cioto",
        "cipós",
        "cirpo",
        "cirro",
        "cirza",
        "cirze",
        "cirzo",
        "cisar",
        "cisca",
        "cisco",
        "cisel",
        "cisma",
        "cisme",
        "cismo",
        "cisso",
        "cista",
        "cisto",
        "citai",
        "citam",
        "citas",
        "citei",
        "citem",
        "cites",
        "citou",
        "citro",
        "ciúro",
        "clade",
        "clado",
        "clama",
        "clame",
        "clamo",
        "clava",
        "clean",
        "clear",
        "clica",
        "clico",
        "clina",
        "cline",
        "clino",
        "clips",
        "clise",
        "clivo",
        "clona",
        "clono",
        "clora",
        "clori",
        "close",
        "clown",
        "cluva",
        "cnute",
        "coada",
        "coado",
        "coage",
        "coagi",
        "coais",
        "coaja",
        "coajo",
        "coara",
        "coati",
        "coato",
        "coatá",
        "coava",
        "coaxa",
        "coaxe",
        "coaxi",
        "coaxo",
        "cobol",
        "cobri",
        "cobro",
        "cocal",
        "cocei",
        "cocem",
        "coces",
        "cocha",
        "coche",
        "cocho",
        "cocos",
        "cocre",
        "cocta",
        "cocto",
        "cocão",
        "coeis",
        "coesa",
        "coevo",
        "cofió",
        "coibi",
        "coifa",
        "coima",
        "coino",
        "coiné",
        "coiol",
        "coira",
        "coiro",
        "coiso",
        "coita",
        "coito",
        "coité",
        "colai",
        "colam",
        "colas",
        "colau",
        "colei",
        "colem",
        "coles",
        "colga",
        "colha",
        "colhe",
        "colhi",
        "colho",
        "colim",
        "colir",
        "colma",
        "colmo",
        "colom",
        "color",
        "colos",
        "colou",
        "colpo",
        "colza",
        "comam",
        "comas",
        "comba",
        "combi",
        "combo",
        "comei",
        "comem",
        "comes",
        "comeu",
        "comia",
        "comua",
        "comão",
        "conas",
        "conca",
        "condi",
        "condo",
        "cones",
        "confa",
        "conga",
        "congo",
        "conha",
        "conho",
        "conio",
        "conja",
        "conte",
        "copal",
        "copar",
        "copel",
        "copie",
        "copio",
        "copla",
        "copos",
        "copra",
        "copta",
        "copto",
        "coque",
        "corai",
        "coram",
        "coras",
        "cordo",
        "corei",
        "corem",
        "cores",
        "coreu",
        "corga",
        "corgo",
        "corla",
        "cormo",
        "corna",
        "corne",
        "coroe",
        "coroo",
        "coros",
        "corou",
        "corra",
        "corre",
        "corri",
        "corro",
        "corsa",
        "corso",
        "corta",
        "corte",
        "corto",
        "corva",
        "corão",
        "corça",
        "corço",
        "cosam",
        "cosas",
        "cosca",
        "cosco",
        "cosei",
        "cosem",
        "coser",
        "coses",
        "coseu",
        "cosia",
        "cosmo",
        "cospe",
        "cossa",
        "cosso",
        "costo",
        "cotai",
        "cotam",
        "cotar",
        "cotas",
        "cotei",
        "cotem",
        "cotes",
        "cotia",
        "cotil",
        "cotim",
        "cotio",
        "cotos",
        "cotou",
        "cotra",
        "cotão",
        "coube",
        "couce",
        "couco",
        "couma",
        "coupé",
        "coura",
        "court",
        "cousa",
        "couso",
        "couto",
        "couça",
        "coval",
        "covas",
        "covil",
        "covoá",
        "covão",
        "coxal",
        "coxia",
        "coxim",
        "coxos",
        "cozam",
        "cozas",
        "cozei",
        "cozem",
        "cozer",
        "cozes",
        "cozeu",
        "cozia",
        "coçai",
        "coçam",
        "coças",
        "coçou",
        "coíba",
        "coíbe",
        "coíbo",
        "craca",
        "crack",
        "crapô",
        "crato",
        "crauá",
        "crava",
        "crave",
        "crawl",
        "creca",
        "crede",
        "creem",
        "crega",
        "creia",
        "creio",
        "creié",
        "crejé",
        "crela",
        "crema",
        "cremo",
        "crena",
        "crera",
        "creta",
        "creto",
        "creve",
        "criai",
        "criam",
        "crias",
        "crica",
        "crico",
        "crido",
        "criei",
        "criem",
        "cries",
        "crila",
        "crina",
        "crino",
        "criou",
        "criso",
        "criva",
        "crive",
        "crivo",
        "croco",
        "croia",
        "croma",
        "crome",
        "cromo",
        "crono",
        "cross",
        "croça",
        "cruas",
        "cruca",
        "crude",
        "cruga",
        "crume",
        "cruor",
        "crupe",
        "cruta",
        "cruza",
        "cruze",
        "cruzo",
        "cuaca",
        "cuada",
        "cuaga",
        "cuatá",
        "cubar",
        "cubas",
        "cubeo",
        "cubié",
        "cubiú",
        "cubla",
        "cubra",
        "cubre",
        "cubro",
        "cucar",
        "cucas",
        "cucha",
        "cucho",
        "cuchê",
        "cudzu",
        "cuera",
        "cuias",
        "cuida",
        "cuide",
        "cuido",
        "cuini",
        "cuipé",
        "cuitá",
        "cuité",
        "cuitó",
        "cuião",
        "cujas",
        "cujus",
        "culpa",
        "culpe",
        "culpo",
        "cumaí",
        "cumba",
        "cumbe",
        "cumbo",
        "cumbu",
        "cumes",
        "cumim",
        "cunau",
        "cunca",
        "cunco",
        "cunha",
        "cunhe",
        "cunho",
        "cupaí",
        "cupez",
        "cupio",
        "cupão",
        "cuque",
        "curai",
        "curam",
        "curas",
        "curau",
        "curda",
        "curdo",
        "curei",
        "curem",
        "cures",
        "curie",
        "curió",
        "curos",
        "curou",
        "curra",
        "curro",
        "curry",
        "cursa",
        "curse",
        "curta",
        "curte",
        "curti",
        "curto",
        "curul",
        "curuá",
        "curve",
        "curvo",
        "curão",
        "cusca",
        "cusco",
        "cuspa",
        "cuspi",
        "cuspo",
        "cusso",
        "custa",
        "custe",
        "cutia",
        "cuxiú",
        "cuíca",
        "cuíra",
        "cácea",
        "cádis",
        "cálix",
        "cápea",
        "cárus",
        "cávea",
        "cávia",
        "cândi",
        "cânon",
        "cébus",
        "cécum",
        "célio",
        "céomo",
        "céreo",
        "cério",
        "césar",
        "césio",
        "cíamo",
        "círio",
        "cível",
        "cóana",
        "cóano",
        "cóbio",
        "códeo",
        "códex",
        "códio",
        "códon",
        "códão",
        "cófea",
        "cógia",
        "cóleo",
        "cólio",
        "cório",
        "côdea",
        "cúbio",
        "cúcio",
        "cúfea",
        "cúfia",
        "cúlex",
        "cúmel",
        "cúmis",
        "cúneo",
        "cúnia",
        "cúria",
        "cúter",
        "dabom",
        "dabua",
        "dacar",
        "dacha",
        "dacma",
        "dacos",
        "dadas",
        "dador",
        "dafne",
        "daime",
        "dairo",
        "daião",
        "dalai",
        "dalém",
        "damba",
        "damos",
        "danai",
        "danam",
        "danar",
        "danas",
        "dance",
        "danda",
        "dando",
        "danei",
        "danem",
        "danes",
        "danou",
        "dante",
        "dança",
        "danço",
        "daraf",
        "darei",
        "darem",
        "dares",
        "darga",
        "daria",
        "darma",
        "darto",
        "darás",
        "darão",
        "datai",
        "datal",
        "datam",
        "datar",
        "datas",
        "datei",
        "datem",
        "dates",
        "datil",
        "datou",
        "davam",
        "davas",
        "dação",
        "dbase",
        "deado",
        "debar",
        "debye",
        "decai",
        "decil",
        "dedal",
        "dedar",
        "deduz",
        "dedéu",
        "degas",
        "deita",
        "deite",
        "deito",
        "deixa",
        "deixe",
        "deixo",
        "dejua",
        "delas",
        "delem",
        "deles",
        "delir",
        "delis",
        "deliu",
        "dembe",
        "dembo",
        "demos",
        "demão",
        "dendi",
        "dendo",
        "dendê",
        "dengo",
        "dento",
        "depus",
        "depós",
        "depõe",
        "deque",
        "deram",
        "deras",
        "derby",
        "derem",
        "deres",
        "derma",
        "derme",
        "desar",
        "desce",
        "desci",
        "desnu",
        "despe",
        "despi",
        "dessa",
        "desse",
        "desta",
        "deste",
        "desça",
        "desço",
        "detém",
        "devam",
        "devas",
        "devei",
        "devem",
        "deves",
        "deveu",
        "devia",
        "devim",
        "devir",
        "dewar",
        "diaba",
        "diabo",
        "diafa",
        "diale",
        "diana",
        "diate",
        "diazo",
        "dicar",
        "dicaz",
        "dicha",
        "didal",
        "didot",
        "dieco",
        "dieno",
        "diese",
        "digam",
        "digar",
        "digas",
        "digna",
        "digne",
        "dilua",
        "dilui",
        "diluo",
        "dimba",
        "dinar",
        "dinca",
        "dinda",
        "dindo",
        "dinga",
        "dingo",
        "diogo",
        "dioma",
        "dioso",
        "diple",
        "diplo",
        "direi",
        "diria",
        "dirrã",
        "dirás",
        "dirão",
        "dirém",
        "disca",
        "disco",
        "disga",
        "disna",
        "dispo",
        "disse",
        "dista",
        "diste",
        "disto",
        "ditai",
        "ditam",
        "ditas",
        "ditei",
        "ditem",
        "dites",
        "ditou",
        "ditua",
        "dizei",
        "dizem",
        "dizes",
        "dizia",
        "dição",
        "diúla",
        "doada",
        "doado",
        "doais",
        "doara",
        "doava",
        "dobar",
        "dobla",
        "doble",
        "dobre",
        "docas",
        "docto",
        "docém",
        "dodói",
        "doeis",
        "doera",
        "dogal",
        "dogre",
        "dogue",
        "doida",
        "doilo",
        "doiro",
        "dolly",
        "dolor",
        "domai",
        "domam",
        "domas",
        "domei",
        "domem",
        "domes",
        "domou",
        "donas",
        "donde",
        "dondo",
        "dongo",
        "dopai",
        "dopam",
        "dopar",
        "dopas",
        "dopei",
        "dopem",
        "dopes",
        "dopou",
        "doque",
        "dorme",
        "dormi",
        "dorna",
        "dosai",
        "dosam",
        "dosas",
        "dosei",
        "dosem",
        "dosou",
        "dotai",
        "dotal",
        "dotam",
        "dotas",
        "dotei",
        "dotem",
        "dotes",
        "dotou",
        "douda",
        "doudo",
        "doula",
        "doura",
        "doure",
        "douro",
        "douta",
        "douto",
        "dozão",
        "doçal",
        "doçar",
        "doíam",
        "doías",
        "draft",
        "draga",
        "drago",
        "drapê",
        "drena",
        "drene",
        "drias",
        "dribo",
        "drink",
        "drive",
        "driça",
        "drofa",
        "droga",
        "drogo",
        "dromo",
        "drope",
        "drops",
        "drupa",
        "drusa",
        "druso",
        "druvá",
        "duala",
        "duana",
        "dubla",
        "dublo",
        "dublê",
        "ducal",
        "duche",
        "ducto",
        "duela",
        "duele",
        "dugão",
        "dulia",
        "dumas",
        "dunar",
        "dundu",
        "dunfa",
        "dunga",
        "dunha",
        "durai",
        "dural",
        "duram",
        "duras",
        "duraz",
        "durei",
        "durem",
        "dures",
        "durex",
        "durez",
        "durgá",
        "durma",
        "durmo",
        "durou",
        "durão",
        "dutos",
        "duzir",
        "duíta",
        "dzeta",
        "dácio",
        "dália",
        "dâmar",
        "dânae",
        "dândi",
        "dânio",
        "début",
        "décor",
        "délia",
        "délio",
        "dérbi",
        "dévio",
        "díada",
        "díade",
        "dídia",
        "dífia",
        "dínio",
        "díope",
        "díxis",
        "dólmã",
        "dória",
        "dório",
        "dóris",
        "dúbia",
        "dúbio",
        "dúrio",
        "ebiri",
        "ebola",
        "ebome",
        "ecese",
        "ecler",
        "ecoai",
        "ecoam",
        "ecoas",
        "ecoei",
        "ecoem",
        "ecoes",
        "ecoou",
        "ecuru",
        "edace",
        "edema",
        "ederé",
        "edita",
        "edite",
        "edito",
        "edoma",
        "educa",
        "educo",
        "edule",
        "edulo",
        "eduto",
        "efebo",
        "efuso",
        "egipã",
        "egito",
        "eguar",
        "eidos",
        "eiras",
        "eirós",
        "eivar",
        "eixar",
        "eixos",
        "eiçar",
        "ejeta",
        "ejete",
        "ejeto",
        "elafá",
        "elami",
        "elche",
        "eledá",
        "eledê",
        "elege",
        "elegi",
        "eleja",
        "elejo",
        "elemi",
        "elena",
        "elepê",
        "eleto",
        "eleva",
        "eleve",
        "elevo",
        "elfos",
        "elida",
        "elide",
        "eluir",
        "eluro",
        "eléis",
        "email",
        "emana",
        "emane",
        "emano",
        "embaí",
        "embiá",
        "embiú",
        "emboá",
        "embuá",
        "embuí",
        "emexo",
        "emfim",
        "emita",
        "emite",
        "emiti",
        "emito",
        "emoji",
        "empar",
        "empós",
        "emula",
        "emule",
        "enana",
        "enano",
        "enase",
        "encha",
        "enche",
        "enchi",
        "enchó",
        "endes",
        "endez",
        "endro",
        "endua",
        "enema",
        "enfia",
        "enfie",
        "enfio",
        "engar",
        "engas",
        "engos",
        "engra",
        "enibu",
        "enito",
        "enjoa",
        "enjoe",
        "enodo",
        "enoja",
        "enoje",
        "enojo",
        "enora",
        "enque",
        "enter",
        "entes",
        "enteu",
        "entoa",
        "entoe",
        "entoo",
        "entra",
        "entre",
        "entro",
        "envia",
        "envie",
        "envio",
        "envés",
        "enxuí",
        "enxós",
        "eoípo",
        "epodo",
        "epuxa",
        "epóxi",
        "equeu",
        "erado",
        "eramá",
        "erato",
        "erbia",
        "ereta",
        "ereto",
        "ergam",
        "ergas",
        "ergol",
        "ergue",
        "ergui",
        "erice",
        "erige",
        "erigi",
        "erija",
        "erijo",
        "erino",
        "ermar",
        "ermos",
        "eroca",
        "eroda",
        "erode",
        "erodi",
        "erodo",
        "eroso",
        "errai",
        "erram",
        "erras",
        "errei",
        "errem",
        "erres",
        "error",
        "errou",
        "eruca",
        "eruga",
        "eruir",
        "eruru",
        "erval",
        "ervar",
        "ervão",
        "escoa",
        "escoe",
        "escol",
        "escoo",
        "eserê",
        "esfex",
        "esgar",
        "esmar",
        "espia",
        "espie",
        "espim",
        "espio",
        "espru",
        "essas",
        "esses",
        "estai",
        "estas",
        "estau",
        "ester",
        "estia",
        "estio",
        "estol",
        "estou",
        "estra",
        "estro",
        "estuo",
        "estão",
        "esvai",
        "esvão",
        "etano",
        "eteno",
        "ethos",
        "etila",
        "etilo",
        "etino",
        "etite",
        "etusa",
        "eubeu",
        "evada",
        "evade",
        "evadi",
        "evado",
        "evasê",
        "evita",
        "evite",
        "evito",
        "evoca",
        "evoco",
        "exala",
        "exale",
        "exalo",
        "exara",
        "exare",
        "exaro",
        "exata",
        "exiba",
        "exibe",
        "exibi",
        "exibo",
        "exido",
        "exige",
        "exigi",
        "exija",
        "exijo",
        "exila",
        "exile",
        "exilo",
        "exima",
        "exime",
        "eximi",
        "eximo",
        "exina",
        "expia",
        "expie",
        "expio",
        "expus",
        "expôs",
        "expõe",
        "extar",
        "exuma",
        "exume",
        "exumo",
        "eólia",
        "eólio",
        "fabro",
        "faces",
        "facha",
        "fachi",
        "facho",
        "facie",
        "facto",
        "fadar",
        "fadas",
        "fados",
        "fagar",
        "faial",
        "faiar",
        "faido",
        "faina",
        "faire",
        "faião",
        "fajau",
        "falai",
        "falam",
        "falas",
        "falaz",
        "falca",
        "falco",
        "falda",
        "falei",
        "falem",
        "fales",
        "falha",
        "falhe",
        "falho",
        "falia",
        "falis",
        "faliu",
        "falou",
        "false",
        "falta",
        "falte",
        "falto",
        "falua",
        "faluz",
        "fanal",
        "fanar",
        "fanca",
        "fanfa",
        "fanga",
        "fanha",
        "fanho",
        "fanta",
        "fante",
        "fanão",
        "faqui",
        "farad",
        "farar",
        "faraz",
        "farei",
        "farel",
        "fareu",
        "faria",
        "farne",
        "farno",
        "farro",
        "farta",
        "farte",
        "farum",
        "farás",
        "fasco",
        "fasma",
        "fasor",
        "fasta",
        "fasto",
        "fatia",
        "fatie",
        "fatio",
        "fatão",
        "fauce",
        "fauno",
        "fauta",
        "faval",
        "favar",
        "favas",
        "favos",
        "faxes",
        "fazei",
        "fazem",
        "fazes",
        "fazia",
        "façam",
        "faúla",
        "febeu",
        "febra",
        "fecal",
        "fecha",
        "feche",
        "fecho",
        "fedam",
        "fedas",
        "fedei",
        "fedem",
        "feder",
        "fedes",
        "fedeu",
        "fedia",
        "feila",
        "feito",
        "feião",
        "felga",
        "felpa",
        "felpo",
        "feléu",
        "fenam",
        "fenar",
        "fende",
        "fendi",
        "fendo",
        "fenil",
        "fenol",
        "fento",
        "feofó",
        "feral",
        "feraz",
        "ferem",
        "feres",
        "ferga",
        "feria",
        "feris",
        "feriu",
        "fermi",
        "feros",
        "ferpa",
        "ferra",
        "ferre",
        "ferry",
        "ferto",
        "ferva",
        "ferve",
        "fervi",
        "fervo",
        "festo",
        "fetos",
        "fevra",
        "fezes",
        "fiada",
        "fiais",
        "fiara",
        "fiava",
        "ficai",
        "ficam",
        "ficas",
        "fiche",
        "ficho",
        "fichu",
        "ficou",
        "ficta",
        "ficto",
        "ficão",
        "fidéu",
        "fieza",
        "figas",
        "figle",
        "figos",
        "filai",
        "filam",
        "filar",
        "filas",
        "filei",
        "filem",
        "files",
        "filia",
        "filie",
        "filio",
        "filma",
        "filmo",
        "filos",
        "filou",
        "filão",
        "fimbo",
        "finar",
        "finas",
        "finca",
        "finco",
        "finda",
        "finde",
        "findo",
        "finfa",
        "finge",
        "fingi",
        "finja",
        "finjo",
        "finta",
        "finte",
        "finto",
        "finês",
        "fiofó",
        "fiota",
        "fiote",
        "fioto",
        "fique",
        "firam",
        "firas",
        "firme",
        "firmo",
        "fisga",
        "fisgo",
        "fisio",
        "fitai",
        "fitam",
        "fitar",
        "fitas",
        "fitei",
        "fitem",
        "fites",
        "fitol",
        "fitos",
        "fitou",
        "fitão",
        "fixai",
        "fixam",
        "fixas",
        "fixei",
        "fixem",
        "fixes",
        "fixou",
        "fizer",
        "fiéis",
        "fiúsa",
        "fiúza",
        "flaco",
        "flama",
        "flame",
        "flape",
        "flare",
        "flash",
        "flate",
        "flato",
        "flava",
        "flavo",
        "flema",
        "fleme",
        "flete",
        "flexo",
        "flint",
        "flirt",
        "flori",
        "flosa",
        "flosô",
        "floxo",
        "flozô",
        "fluam",
        "fluas",
        "fluem",
        "fluis",
        "fluiu",
        "flume",
        "flush",
        "fluta",
        "fluía",
        "flûte",
        "fobar",
        "fobos",
        "focai",
        "focam",
        "focas",
        "focou",
        "focus",
        "fodam",
        "fodas",
        "fodem",
        "foder",
        "fodeu",
        "foeta",
        "fofar",
        "fofos",
        "fofão",
        "fogal",
        "fogar",
        "fogem",
        "foges",
        "foila",
        "foina",
        "foito",
        "folar",
        "foles",
        "folgo",
        "folho",
        "folão",
        "fomes",
        "fomos",
        "fones",
        "fonia",
        "fonjo",
        "foque",
        "foral",
        "foram",
        "foras",
        "force",
        "forde",
        "fordo",
        "forem",
        "fores",
        "foria",
        "forja",
        "forje",
        "forjo",
        "forme",
        "formi",
        "formo",
        "foros",
        "forra",
        "forre",
        "forró",
        "forço",
        "fosia",
        "fosse",
        "foste",
        "fotão",
        "fouce",
        "foyer",
        "foção",
        "fraga",
        "frago",
        "frama",
        "frapê",
        "freai",
        "freei",
        "frega",
        "frege",
        "freia",
        "freie",
        "freme",
        "fremi",
        "freon",
        "freou",
        "fresa",
        "frese",
        "freso",
        "freta",
        "frete",
        "freto",
        "frial",
        "friez",
        "frigi",
        "frija",
        "frijo",
        "frila",
        "frima",
        "frino",
        "frisa",
        "frise",
        "friso",
        "frita",
        "frite",
        "frito",
        "friul",
        "froca",
        "froco",
        "frolo",
        "front",
        "fruem",
        "fruir",
        "fruis",
        "fruiu",
        "fruxu",
        "fruía",
        "fucei",
        "fucem",
        "fuces",
        "fueta",
        "fugar",
        "fugas",
        "fugia",
        "fugis",
        "fugiu",
        "fujam",
        "fujas",
        "fujão",
        "fular",
        "fulas",
        "fulda",
        "fulge",
        "fulgi",
        "fulha",
        "fulos",
        "fulvo",
        "fulão",
        "fumai",
        "fumal",
        "fumam",
        "fumas",
        "fumei",
        "fumem",
        "fumes",
        "fumos",
        "fumou",
        "fumão",
        "funca",
        "funce",
        "funda",
        "funde",
        "fundi",
        "funel",
        "funga",
        "fungu",
        "funho",
        "funje",
        "funéu",
        "furai",
        "fural",
        "furam",
        "furas",
        "furco",
        "furda",
        "furei",
        "furem",
        "fures",
        "furna",
        "furou",
        "furta",
        "furte",
        "furto",
        "furão",
        "fusca",
        "fusco",
        "fusos",
        "fusta",
        "fuste",
        "fusto",
        "futre",
        "futum",
        "fuzil",
        "fuzis",
        "fuçai",
        "fuçam",
        "fuças",
        "fuçou",
        "fábia",
        "fálum",
        "fálus",
        "fásia",
        "fátuo",
        "fânio",
        "fânti",
        "fécio",
        "féleo",
        "félis",
        "fêmeo",
        "fêmur",
        "fênix",
        "fêtão",
        "fíala",
        "fícea",
        "fíceo",
        "fícis",
        "fícus",
        "fídia",
        "fífia",
        "fíler",
        "fócio",
        "fódia",
        "fólio",
        "fólis",
        "fóton",
        "fóvea",
        "fônon",
        "fúcea",
        "fúfia",
        "fúfio",
        "fúmeo",
        "fúsel",
        "fúsil",
        "gabai",
        "gabam",
        "gabar",
        "gabas",
        "gabei",
        "gabem",
        "gabes",
        "gabou",
        "gabro",
        "gabão",
        "gabéu",
        "gacha",
        "gacho",
        "gados",
        "gadão",
        "gaeta",
        "gafar",
        "gafes",
        "gafém",
        "gagau",
        "gagos",
        "gague",
        "gagão",
        "gaial",
        "gaiar",
        "gaias",
        "gaipa",
        "gaipo",
        "gairo",
        "gaiva",
        "gajar",
        "gajas",
        "gajos",
        "gajão",
        "galar",
        "galas",
        "galbo",
        "galem",
        "gales",
        "galga",
        "galgo",
        "galha",
        "galos",
        "galra",
        "gamam",
        "gamar",
        "gamas",
        "gambo",
        "gamei",
        "games",
        "gamão",
        "ganas",
        "ganau",
        "ganda",
        "gando",
        "ganem",
        "ganga",
        "gango",
        "ganha",
        "ganhe",
        "gania",
        "ganir",
        "ganis",
        "ganiu",
        "ganja",
        "gansa",
        "ganta",
        "ganza",
        "ganzi",
        "ganzé",
        "gança",
        "ganço",
        "ganês",
        "garbo",
        "garfa",
        "garfe",
        "garis",
        "garna",
        "garoa",
        "garoe",
        "garoo",
        "garro",
        "garua",
        "garão",
        "garço",
        "gaspa",
        "gasta",
        "gaste",
        "gatal",
        "gatar",
        "gatil",
        "gatos",
        "gatum",
        "gatão",
        "gauda",
        "gaudó",
        "gauge",
        "gaulo",
        "gaura",
        "gauro",
        "gauss",
        "gavar",
        "gazal",
        "gazel",
        "gazes",
        "gazeu",
        "gazia",
        "gazil",
        "gazua",
        "gazão",
        "geado",
        "geais",
        "geara",
        "geava",
        "gebar",
        "gebre",
        "geeis",
        "geena",
        "geiam",
        "geias",
        "geiem",
        "geies",
        "gelai",
        "gelam",
        "gelas",
        "gelba",
        "gelei",
        "gelem",
        "geles",
        "gelfa",
        "gelha",
        "gelmo",
        "gelos",
        "gelou",
        "gelva",
        "gemam",
        "gemar",
        "gemas",
        "gemei",
        "gemem",
        "gemes",
        "gemeu",
        "gemia",
        "genal",
        "genes",
        "genia",
        "genra",
        "geode",
        "geodo",
        "geoso",
        "gerai",
        "geram",
        "geras",
        "gerbo",
        "gerei",
        "geres",
        "geria",
        "geris",
        "geriu",
        "germo",
        "gerou",
        "gerra",
        "gerém",
        "gesta",
        "getas",
        "geteu",
        "giaur",
        "gibis",
        "gibão",
        "giclê",
        "gicão",
        "gigas",
        "gimbo",
        "ginco",
        "ginge",
        "gingo",
        "ginja",
        "giota",
        "gipso",
        "girai",
        "giram",
        "giras",
        "girei",
        "girem",
        "gires",
        "giros",
        "girou",
        "girão",
        "gizar",
        "glacê",
        "gleba",
        "glena",
        "glial",
        "glide",
        "glifo",
        "globa",
        "glomo",
        "glosa",
        "glose",
        "gloso",
        "glote",
        "gluma",
        "glute",
        "gluão",
        "glúon",
        "gneto",
        "gnoma",
        "gnose",
        "goano",
        "gocha",
        "gocho",
        "godes",
        "godos",
        "godão",
        "goete",
        "gofer",
        "gofre",
        "goiar",
        "goiti",
        "goiva",
        "goivo",
        "goiás",
        "golar",
        "golas",
        "golda",
        "goles",
        "golfe",
        "golga",
        "gomal",
        "gomar",
        "gomas",
        "gomba",
        "gombô",
        "gomes",
        "gomia",
        "gomil",
        "gomor",
        "gomos",
        "gonda",
        "gonde",
        "gondo",
        "gonga",
        "gongo",
        "gonzo",
        "gorai",
        "goral",
        "goram",
        "gorar",
        "goras",
        "goraz",
        "gorda",
        "gorei",
        "gorem",
        "gores",
        "gorga",
        "gorja",
        "gorne",
        "gorou",
        "gorra",
        "gosta",
        "goste",
        "gotas",
        "gotra",
        "gotri",
        "gouda",
        "gouli",
        "gouve",
        "gozai",
        "gozam",
        "gozas",
        "gozei",
        "gozem",
        "gozes",
        "gozos",
        "gozou",
        "gozão",
        "graal",
        "grado",
        "grafa",
        "grafe",
        "grafo",
        "grane",
        "grani",
        "grano",
        "grapa",
        "grava",
        "grave",
        "gravo",
        "graxo",
        "grebe",
        "greco",
        "greda",
        "grede",
        "green",
        "grege",
        "grejó",
        "grela",
        "grelo",
        "grená",
        "grepo",
        "greta",
        "greva",
        "grias",
        "grifa",
        "grife",
        "grifo",
        "grijó",
        "grila",
        "grile",
        "grill",
        "grima",
        "gripa",
        "grise",
        "griso",
        "grisu",
        "grita",
        "grite",
        "grode",
        "groir",
        "groló",
        "groma",
        "groom",
        "grosa",
        "grota",
        "gruas",
        "gruau",
        "gruda",
        "grude",
        "grudo",
        "gruim",
        "gruir",
        "gruja",
        "grumo",
        "gruna",
        "grupa",
        "grãos",
        "guaco",
        "guacá",
        "guaia",
        "guaiú",
        "guajá",
        "guano",
        "guaná",
        "guapo",
        "guare",
        "guari",
        "guaru",
        "guará",
        "guató",
        "guaxe",
        "guaxi",
        "guaxo",
        "guaçu",
        "gueba",
        "guebo",
        "guedé",
        "gueja",
        "guere",
        "gueri",
        "gueta",
        "guete",
        "guexa",
        "guiai",
        "guiam",
        "guias",
        "guibo",
        "guibá",
        "guida",
        "guiei",
        "guiem",
        "guies",
        "guiga",
        "guigó",
        "guina",
        "guino",
        "guiné",
        "guiou",
        "guipá",
        "guira",
        "guisa",
        "guita",
        "guito",
        "guizo",
        "guião",
        "guiço",
        "gulag",
        "gular",
        "gumbo",
        "gumes",
        "gunda",
        "gundu",
        "gunga",
        "gurde",
        "guris",
        "gurma",
        "gurus",
        "gusla",
        "gusta",
        "guste",
        "guyot",
        "gábia",
        "gábio",
        "gáfio",
        "gálax",
        "gálea",
        "gália",
        "gálio",
        "gávea",
        "gázeo",
        "gázio",
        "gâmia",
        "gêmea",
        "gígia",
        "gília",
        "gírio",
        "góbio",
        "gódia",
        "gônio",
        "gônis",
        "habés",
        "hacer",
        "hacos",
        "hadji",
        "haiku",
        "hajam",
        "hajas",
        "hajul",
        "hakka",
        "hango",
        "hansa",
        "haras",
        "harda",
        "harlo",
        "harpe",
        "harto",
        "harém",
        "hashi",
        "hasta",
        "haure",
        "hauri",
        "hauçá",
        "havei",
        "havia",
        "hedge",
        "hedra",
        "hemal",
        "henry",
        "hepta",
        "herda",
        "herde",
        "herdo",
        "heril",
        "herma",
        "heroo",
        "hertz",
        "heréu",
        "heteu",
        "hetol",
        "hexil",
        "hexol",
        "hialo",
        "hiava",
        "hidra",
        "hidro",
        "higgs",
        "higra",
        "hilar",
        "himba",
        "hindu",
        "hinir",
        "hiper",
        "hirco",
        "hirto",
        "histo",
        "hobby",
        "holão",
        "hombo",
        "homos",
        "homum",
        "homus",
        "homão",
        "honor",
        "honre",
        "honro",
        "horal",
        "horar",
        "horda",
        "horrá",
        "horsa",
        "hosco",
        "hoste",
        "houve",
        "hovas",
        "huari",
        "huido",
        "hulha",
        "hungo",
        "hunos",
        "hurra",
        "husky",
        "háden",
        "hálux",
        "hápax",
        "hélas",
        "hélia",
        "hélio",
        "hélix",
        "hépia",
        "hévea",
        "híala",
        "hímen",
        "híndi",
        "hóvea",
        "húmil",
        "húmus",
        "iacas",
        "iaguá",
        "iambo",
        "ianam",
        "iande",
        "iansã",
        "iaque",
        "iataí",
        "iates",
        "ibaró",
        "ibeji",
        "ibere",
        "ibero",
        "ibira",
        "ibiri",
        "iboga",
        "ibope",
        "icaco",
        "icaçu",
        "iceis",
        "ichão",
        "icica",
        "icipó",
        "idear",
        "idrol",
        "ieixa",
        "ienes",
        "iento",
        "ietim",
        "igaci",
        "igapó",
        "igara",
        "igbim",
        "iguar",
        "igupá",
        "iiabá",
        "ijebu",
        "ijexá",
        "ilama",
        "ileal",
        "ilesa",
        "ilhai",
        "ilhal",
        "ilham",
        "ilhar",
        "ilhas",
        "ilhei",
        "ilhem",
        "ilhes",
        "ilhoa",
        "ilhou",
        "ilhéu",
        "ilhós",
        "ilita",
        "ilota",
        "iluda",
        "ilude",
        "iludi",
        "iludo",
        "iluso",
        "imago",
        "imame",
        "imamo",
        "imane",
        "imano",
        "imbua",
        "imbuí",
        "imene",
        "imida",
        "imido",
        "imigo",
        "imina",
        "imita",
        "imite",
        "imito",
        "imola",
        "imole",
        "imolo",
        "imoto",
        "impim",
        "impol",
        "impus",
        "impôs",
        "impõe",
        "inaiá",
        "inajá",
        "inajé",
        "inala",
        "inale",
        "inalo",
        "inama",
        "inamu",
        "inana",
        "inane",
        "inata",
        "incas",
        "incha",
        "inche",
        "incho",
        "incoa",
        "incoe",
        "incoo",
        "indas",
        "index",
        "indez",
        "indol",
        "induz",
        "infla",
        "infle",
        "inflo",
        "ingaí",
        "ingre",
        "inhor",
        "iniba",
        "inibe",
        "inibi",
        "inibo",
        "inite",
        "inoma",
        "inova",
        "inove",
        "inovo",
        "input",
        "insta",
        "inste",
        "insto",
        "inter",
        "intra",
        "intua",
        "intui",
        "intuo",
        "inube",
        "inuit",
        "invar",
        "inçar",
        "iodar",
        "iodol",
        "iogue",
        "ionte",
        "ipadu",
        "ipeca",
        "ipecu",
        "ipetê",
        "ippar",
        "ipres",
        "ipsis",
        "ipuca",
        "irada",
        "irade",
        "irara",
        "iraçu",
        "irdes",
        "ireis",
        "irene",
        "ireno",
        "irerê",
        "irial",
        "iriam",
        "iriar",
        "irias",
        "irino",
        "irirá",
        "irite",
        "iriva",
        "irmos",
        "iroco",
        "irona",
        "irone",
        "iroso",
        "iruri",
        "iruçu",
        "isaro",
        "iscar",
        "iscas",
        "islão",
        "isola",
        "isole",
        "isolo",
        "issei",
        "istmo",
        "istro",
        "isuro",
        "itano",
        "itapu",
        "itauá",
        "itens",
        "itera",
        "itere",
        "itero",
        "itobi",
        "itral",
        "itrol",
        "iuane",
        "iudjá",
        "iurta",
        "iurte",
        "ixode",
        "ixodo",
        "ixora",
        "içado",
        "içais",
        "içara",
        "içava",
        "iótio",
        "iônio",
        "jabre",
        "jabão",
        "jacra",
        "jacre",
        "jacuí",
        "jagas",
        "jagra",
        "jagre",
        "jaicó",
        "jaina",
        "jalde",
        "jalne",
        "jalão",
        "jamba",
        "jambo",
        "jambu",
        "jambé",
        "janal",
        "janaú",
        "janda",
        "janga",
        "jango",
        "janja",
        "jante",
        "janto",
        "japas",
        "japim",
        "japoa",
        "japué",
        "japuí",
        "japão",
        "jaque",
        "jarda",
        "jardo",
        "jaspe",
        "jatar",
        "jataí",
        "jator",
        "jatos",
        "jauna",
        "javaé",
        "javre",
        "jazam",
        "jazas",
        "jazei",
        "jazem",
        "jazer",
        "jazes",
        "jazeu",
        "jazia",
        "jeans",
        "jegra",
        "jegre",
        "jeicó",
        "jeira",
        "jejua",
        "jejue",
        "jejuo",
        "jembê",
        "jemiá",
        "jeová",
        "jepiá",
        "jepió",
        "jeque",
        "jequi",
        "jerra",
        "jesus",
        "jetaí",
        "jetom",
        "jeton",
        "jicão",
        "jigue",
        "jihad",
        "jimbe",
        "jimbo",
        "jinga",
        "jingo",
        "jipes",
        "jipio",
        "jipão",
        "jique",
        "jiqui",
        "jirau",
        "jiroé",
        "jitsu",
        "jiçui",
        "joane",
        "jocos",
        "jogai",
        "jogam",
        "jogas",
        "jogou",
        "jogue",
        "jogão",
        "joina",
        "joiça",
        "jolda",
        "joliz",
        "jongo",
        "jorge",
        "jorna",
        "jorne",
        "jorra",
        "jorre",
        "joule",
        "jouça",
        "joçal",
        "joíba",
        "juami",
        "juari",
        "juati",
        "jubaí",
        "jubão",
        "judas",
        "judeu",
        "judia",
        "judie",
        "judio",
        "jugal",
        "jugar",
        "juina",
        "julga",
        "julgo",
        "jumas",
        "jumbo",
        "junco",
        "jundu",
        "jungo",
        "junta",
        "junte",
        "junça",
        "jupiá",
        "jupuá",
        "jupão",
        "juqui",
        "jurai",
        "juram",
        "juras",
        "jurei",
        "jurem",
        "jures",
        "juris",
        "jurou",
        "jurão",
        "jusão",
        "jutaí",
        "juuna",
        "jácea",
        "jápix",
        "jônia",
        "jônio",
        "júvia",
        "kanji",
        "kansa",
        "karma",
        "kayak",
        "kebab",
        "kendo",
        "khmer",
        "kispo",
        "kraft",
        "krill",
        "kyrie",
        "labor",
        "labro",
        "labéu",
        "lacei",
        "lacem",
        "laces",
        "lacha",
        "lacol",
        "lacra",
        "lacro",
        "lacta",
        "ladim",
        "ladra",
        "ladre",
        "ladro",
        "ladão",
        "lagar",
        "lages",
        "lagão",
        "laica",
        "laitu",
        "laiva",
        "laivo",
        "lajem",
        "lajes",
        "lajão",
        "lalau",
        "lamas",
        "lamba",
        "lambe",
        "lambi",
        "lambo",
        "lambu",
        "lamel",
        "lampa",
        "lampo",
        "lanar",
        "landa",
        "lande",
        "landi",
        "landó",
        "lango",
        "lanha",
        "lanho",
        "lanti",
        "lanço",
        "lapas",
        "lapes",
        "lapim",
        "lapiá",
        "lapuz",
        "lapão",
        "laquê",
        "lardo",
        "larga",
        "largo",
        "larim",
        "laroz",
        "laréu",
        "lasca",
        "lasco",
        "laser",
        "lassa",
        "lasso",
        "latam",
        "latem",
        "later",
        "lates",
        "latia",
        "latis",
        "latiu",
        "laude",
        "laulé",
        "lauro",
        "lauto",
        "lavai",
        "lavam",
        "lavas",
        "lavei",
        "lavem",
        "laves",
        "lavor",
        "lavou",
        "lavra",
        "lavre",
        "lavro",
        "laxar",
        "lazzo",
        "lazão",
        "laçai",
        "laçam",
        "laçar",
        "laças",
        "laçou",
        "lação",
        "laúza",
        "leais",
        "lecre",
        "ledes",
        "ledor",
        "legai",
        "legam",
        "legar",
        "legas",
        "legba",
        "legis",
        "legou",
        "legra",
        "legre",
        "legue",
        "legão",
        "leiam",
        "leias",
        "leiga",
        "leila",
        "leino",
        "leira",
        "leita",
        "leiva",
        "leixa",
        "lemas",
        "lemba",
        "lemes",
        "lemna",
        "lemos",
        "lempa",
        "lendo",
        "leneu",
        "lenga",
        "lenho",
        "lenir",
        "lenão",
        "leoas",
        "leoba",
        "leone",
        "lepas",
        "lepes",
        "lepra",
        "lepto",
        "leram",
        "leras",
        "lerca",
        "lerda",
        "lerei",
        "lerem",
        "leres",
        "leria",
        "lerna",
        "lerpe",
        "leruê",
        "lerão",
        "lesai",
        "lesam",
        "lesas",
        "lesei",
        "lesem",
        "leses",
        "lesim",
        "lesou",
        "lesse",
        "lesto",
        "leteu",
        "letro",
        "letão",
        "leuco",
        "levai",
        "levam",
        "levas",
        "levei",
        "levem",
        "leves",
        "levez",
        "levou",
        "lexia",
        "lhama",
        "lhano",
        "liabo",
        "liame",
        "liana",
        "liase",
        "liaça",
        "libar",
        "libau",
        "libro",
        "libré",
        "libua",
        "liceu",
        "lichi",
        "licne",
        "licra",
        "lidai",
        "lidam",
        "lidas",
        "lidei",
        "lidem",
        "lides",
        "lidou",
        "ligai",
        "ligal",
        "ligam",
        "ligas",
        "ligeu",
        "light",
        "ligou",
        "ligue",
        "limai",
        "limam",
        "limar",
        "limas",
        "limei",
        "limem",
        "limes",
        "limou",
        "limpa",
        "limpe",
        "lince",
        "linde",
        "linfa",
        "linga",
        "links",
        "lipes",
        "liral",
        "liras",
        "lirão",
        "lisas",
        "lisim",
        "lisma",
        "lismo",
        "lisol",
        "lissa",
        "lista",
        "liste",
        "listo",
        "litar",
        "litor",
        "litão",
        "livel",
        "livor",
        "livra",
        "lixai",
        "lixam",
        "lixas",
        "lixei",
        "lixem",
        "lixes",
        "lixos",
        "lixou",
        "lixão",
        "lizar",
        "loasa",
        "lobal",
        "lobar",
        "lobaz",
        "lobby",
        "lobão",
        "locai",
        "locam",
        "locar",
        "locas",
        "locou",
        "locro",
        "lodos",
        "loess",
        "logar",
        "login",
        "logon",
        "logos",
        "logra",
        "logre",
        "logro",
        "logue",
        "loisa",
        "loiça",
        "lonas",
        "lonca",
        "londo",
        "lonja",
        "lopes",
        "loque",
        "lorca",
        "lorga",
        "lorpa",
        "lorto",
        "losna",
        "lotai",
        "lotam",
        "lotas",
        "lotei",
        "lotem",
        "lotes",
        "lotos",
        "lotou",
        "louro",
        "louva",
        "louve",
        "louvo",
        "luada",
        "luado",
        "luana",
        "lucas",
        "luchã",
        "lucra",
        "lucre",
        "lucão",
        "ludro",
        "luena",
        "lueta",
        "lufar",
        "lugre",
        "luita",
        "luito",
        "lulas",
        "lulão",
        "lumbo",
        "lumen",
        "lumes",
        "lumia",
        "lunda",
        "lundu",
        "lunga",
        "lupar",
        "lupas",
        "luque",
        "lurar",
        "lurda",
        "lurgo",
        "lurta",
        "lusas",
        "lusco",
        "lusos",
        "lutai",
        "lutam",
        "lutas",
        "lutei",
        "lutem",
        "lutes",
        "lutou",
        "luxar",
        "luxos",
        "luzam",
        "luzas",
        "luzem",
        "luzia",
        "luzio",
        "luzir",
        "luzis",
        "luziu",
        "luziê",
        "luína",
        "lycra",
        "lábil",
        "lácio",
        "lácon",
        "lájea",
        "lária",
        "lárix",
        "lásia",
        "láteo",
        "látex",
        "lâmia",
        "lâmio",
        "lâneo",
        "lânio",
        "légua",
        "lélia",
        "lépis",
        "léxis",
        "lêmur",
        "lêneo",
        "líber",
        "líbio",
        "lícia",
        "lício",
        "lídio",
        "líeis",
        "lígeo",
        "lígio",
        "lílio",
        "líneo",
        "líria",
        "lísio",
        "lítia",
        "lítio",
        "lítuo",
        "lívia",
        "lócus",
        "lódão",
        "lófio",
        "lógea",
        "lólio",
        "lóris",
        "lósia",
        "lóxia",
        "lúcio",
        "lúdio",
        "lúpia",
        "lúpus",
        "lúria",
        "lúteo",
        "mabiú",
        "macau",
        "macaá",
        "macaé",
        "macha",
        "machê",
        "macis",
        "macla",
        "macua",
        "macus",
        "madre",
        "maeta",
        "mafaú",
        "mafra",
        "mafua",
        "magal",
        "magda",
        "magma",
        "magno",
        "magné",
        "magoe",
        "magoo",
        "magra",
        "maias",
        "mailo",
        "maino",
        "mainá",
        "maios",
        "maire",
        "mairu",
        "maita",
        "maião",
        "majus",
        "malar",
        "malas",
        "malga",
        "malha",
        "malhe",
        "malho",
        "malim",
        "malta",
        "malto",
        "malva",
        "malvo",
        "mamai",
        "mamal",
        "mamam",
        "mamas",
        "mamba",
        "mambo",
        "mamei",
        "mamem",
        "mames",
        "mamoa",
        "mamou",
        "mamua",
        "mamum",
        "mamão",
        "manao",
        "manar",
        "manas",
        "manau",
        "manaí",
        "manca",
        "manda",
        "mande",
        "mandi",
        "mandu",
        "manel",
        "manes",
        "mango",
        "mangu",
        "manho",
        "manir",
        "manja",
        "manje",
        "manjo",
        "manju",
        "manos",
        "mantê",
        "manul",
        "manuê",
        "maona",
        "maori",
        "mapas",
        "maple",
        "mapuá",
        "mapão",
        "maque",
        "maqui",
        "marar",
        "maras",
        "marau",
        "marca",
        "marco",
        "marel",
        "mares",
        "marfi",
        "marga",
        "marge",
        "margo",
        "maria",
        "marim",
        "marma",
        "marmo",
        "marna",
        "marno",
        "marra",
        "marso",
        "marta",
        "marto",
        "maruá",
        "maruí",
        "marão",
        "masca",
        "masco",
        "maser",
        "masto",
        "matai",
        "matal",
        "matam",
        "matas",
        "match",
        "matei",
        "matem",
        "mater",
        "mates",
        "matia",
        "matis",
        "matou",
        "matsé",
        "matão",
        "matéu",
        "maula",
        "maura",
        "mauro",
        "maués",
        "mauís",
        "maxim",
        "mazar",
        "mazia",
        "maçal",
        "maçar",
        "maçom",
        "maços",
        "mação",
        "maíra",
        "maíça",
        "maúba",
        "maújo",
        "meaco",
        "meada",
        "meado",
        "meago",
        "meana",
        "meano",
        "meari",
        "meato",
        "meaça",
        "mecha",
        "meche",
        "mecru",
        "medem",
        "medes",
        "medis",
        "mediu",
        "medol",
        "medos",
        "medra",
        "medre",
        "medro",
        "megas",
        "meiri",
        "meião",
        "melai",
        "melam",
        "melar",
        "melas",
        "melca",
        "melei",
        "melem",
        "meles",
        "melez",
        "melfa",
        "melfo",
        "melga",
        "melgo",
        "meloa",
        "melou",
        "melra",
        "melro",
        "membi",
        "membé",
        "menar",
        "menas",
        "menga",
        "mengo",
        "menha",
        "menim",
        "menir",
        "mensa",
        "menso",
        "mente",
        "menti",
        "mento",
        "menus",
        "meolo",
        "meote",
        "meras",
        "merca",
        "merda",
        "merió",
        "merlo",
        "merlu",
        "merma",
        "mermo",
        "merua",
        "meruí",
        "mesas",
        "messa",
        "messe",
        "mesto",
        "mesão",
        "metam",
        "metas",
        "metei",
        "metem",
        "metes",
        "meteu",
        "metia",
        "metil",
        "metim",
        "metiê",
        "mexam",
        "mexas",
        "mexei",
        "mexem",
        "mexes",
        "mexeu",
        "mexia",
        "mexão",
        "mezzo",
        "meçam",
        "meças",
        "meúle",
        "miada",
        "miado",
        "miais",
        "miana",
        "miara",
        "miava",
        "micar",
        "micas",
        "micha",
        "micho",
        "michê",
        "micos",
        "micra",
        "micro",
        "micto",
        "midas",
        "mieis",
        "mielo",
        "migar",
        "migas",
        "migma",
        "migra",
        "migre",
        "migro",
        "miina",
        "miite",
        "mijai",
        "mijam",
        "mijar",
        "mijas",
        "mijei",
        "mijem",
        "mijes",
        "mijos",
        "mijou",
        "mijuí",
        "mijão",
        "milde",
        "mimai",
        "mimam",
        "mimas",
        "mimei",
        "mimem",
        "mimes",
        "mimos",
        "mimou",
        "minai",
        "minam",
        "minar",
        "minas",
        "minaz",
        "minei",
        "minem",
        "mines",
        "minga",
        "mingo",
        "mingu",
        "minie",
        "minis",
        "minor",
        "minou",
        "minta",
        "minto",
        "mioma",
        "miose",
        "mioto",
        "mique",
        "mirai",
        "miram",
        "miras",
        "mirei",
        "mirem",
        "mires",
        "mirou",
        "mirra",
        "mirro",
        "mirto",
        "mirzá",
        "mirão",
        "misgo",
        "misse",
        "missô",
        "miste",
        "mites",
        "mitis",
        "mitra",
        "mitro",
        "mitua",
        "mixar",
        "mixer",
        "mixia",
        "mixió",
        "mixná",
        "mixto",
        "miúda",
        "miúde",
        "miúfa",
        "miúlo",
        "miúra",
        "miúro",
        "miúva",
        "miúça",
        "mnese",
        "moado",
        "moafa",
        "moais",
        "mocar",
        "mocha",
        "moche",
        "mocho",
        "mocoa",
        "mocsa",
        "mocuí",
        "modal",
        "modem",
        "modus",
        "moega",
        "moeis",
        "moera",
        "moeta",
        "mofai",
        "mofam",
        "mofar",
        "mofas",
        "mofei",
        "mofem",
        "mofes",
        "mofos",
        "mofou",
        "mogno",
        "mogol",
        "mogor",
        "mogão",
        "moico",
        "moina",
        "moira",
        "moiro",
        "moiré",
        "moito",
        "moião",
        "mojar",
        "molal",
        "molar",
        "molda",
        "molde",
        "moldo",
        "moles",
        "molha",
        "molhe",
        "molim",
        "monas",
        "monco",
        "monda",
        "mondo",
        "mondé",
        "mongi",
        "mongo",
        "mongu",
        "monha",
        "monho",
        "monhé",
        "monir",
        "monja",
        "monos",
        "monso",
        "monta",
        "monto",
        "moque",
        "moqui",
        "morai",
        "moram",
        "moras",
        "morbo",
        "morca",
        "morda",
        "morde",
        "mordi",
        "mordo",
        "morei",
        "morem",
        "mores",
        "morfe",
        "morfo",
        "moria",
        "moril",
        "morim",
        "mormo",
        "morou",
        "morra",
        "morre",
        "morri",
        "morsa",
        "morse",
        "morso",
        "morta",
        "morte",
        "morão",
        "mosbá",
        "mosco",
        "mossa",
        "mossi",
        "mosto",
        "motes",
        "motos",
        "motum",
        "mouco",
        "moura",
        "mouro",
        "mouse",
        "mouta",
        "movam",
        "movas",
        "movei",
        "movem",
        "moves",
        "moveu",
        "movia",
        "moxar",
        "moádi",
        "moças",
        "moços",
        "moção",
        "moíam",
        "moías",
        "moído",
        "muaca",
        "muafa",
        "muafo",
        "muaje",
        "muana",
        "muane",
        "muave",
        "mucha",
        "mucol",
        "mucor",
        "mucro",
        "mucuí",
        "mudai",
        "mudam",
        "mudas",
        "mudei",
        "mudem",
        "mudes",
        "mudez",
        "mudir",
        "mudos",
        "mudou",
        "mudra",
        "muela",
        "muele",
        "muene",
        "muere",
        "mufla",
        "muflo",
        "mufti",
        "mufuí",
        "mugem",
        "muges",
        "mugia",
        "mugir",
        "mugis",
        "mugiu",
        "mugre",
        "mujam",
        "mujas",
        "mulas",
        "mulei",
        "muleu",
        "mulme",
        "mulsa",
        "mulso",
        "multe",
        "multi",
        "multo",
        "mulum",
        "mumbé",
        "munda",
        "mundé",
        "munem",
        "munes",
        "munga",
        "mungo",
        "mungu",
        "munha",
        "munho",
        "munia",
        "munir",
        "munis",
        "muniu",
        "munto",
        "muolo",
        "muque",
        "murai",
        "muram",
        "murar",
        "muras",
        "murco",
        "murei",
        "murem",
        "mures",
        "murou",
        "murra",
        "murso",
        "murta",
        "murua",
        "muruí",
        "murzá",
        "murça",
        "musal",
        "musca",
        "musco",
        "musmé",
        "musse",
        "mussó",
        "mutia",
        "mutom",
        "mutra",
        "mutum",
        "muuba",
        "muviú",
        "muári",
        "muçum",
        "mácea",
        "mádia",
        "mágis",
        "mároo",
        "mátri",
        "mávia",
        "mécia",
        "médão",
        "méleo",
        "mélia",
        "méloe",
        "mésio",
        "méson",
        "mésua",
        "mício",
        "míleo",
        "mínio",
        "míris",
        "móbil",
        "módio",
        "mólio",
        "móqua",
        "múcua",
        "múgil",
        "múleo",
        "múndi",
        "múnus",
        "múrex",
        "múria",
        "múzua",
        "müsli",
        "naali",
        "nabal",
        "nabla",
        "nablo",
        "nabos",
        "nacho",
        "nacos",
        "nacre",
        "nadai",
        "nadam",
        "nadas",
        "nadei",
        "nadem",
        "nades",
        "nadir",
        "nados",
        "nadou",
        "nafil",
        "nafir",
        "nafta",
        "nagar",
        "nagoa",
        "nagor",
        "nagul",
        "nagão",
        "naibe",
        "naide",
        "naifa",
        "naife",
        "naifo",
        "naira",
        "naire",
        "najas",
        "nakfa",
        "nalga",
        "nalgo",
        "namaz",
        "nambi",
        "nambu",
        "nanai",
        "nanal",
        "nanam",
        "nanar",
        "nanas",
        "nandi",
        "nando",
        "nandu",
        "nanei",
        "nanem",
        "nanes",
        "nanga",
        "nanja",
        "nanou",
        "nanós",
        "naraz",
        "narco",
        "nardo",
        "narlo",
        "narra",
        "narre",
        "narro",
        "nasce",
        "nasci",
        "nassa",
        "nasso",
        "nasça",
        "nasço",
        "natas",
        "natio",
        "natos",
        "natro",
        "nauas",
        "nauro",
        "nauta",
        "navaó",
        "navim",
        "nazis",
        "nebri",
        "necas",
        "necra",
        "necro",
        "necto",
        "nefas",
        "nefro",
        "negai",
        "negam",
        "negas",
        "negou",
        "negra",
        "negue",
        "negus",
        "negão",
        "nelas",
        "neldo",
        "neles",
        "nemba",
        "nembo",
        "nemeu",
        "nende",
        "nendi",
        "nenho",
        "nente",
        "neque",
        "neres",
        "nerol",
        "nerto",
        "nesga",
        "nessa",
        "nesse",
        "nesta",
        "neste",
        "netas",
        "netos",
        "neuma",
        "neura",
        "neuri",
        "neuro",
        "nevai",
        "nevam",
        "nevas",
        "nevei",
        "nevem",
        "neves",
        "nevou",
        "nevri",
        "nevão",
        "nexos",
        "ngola",
        "nhaca",
        "nhati",
        "nhato",
        "nhele",
        "niaia",
        "niboé",
        "nicam",
        "nicar",
        "nicas",
        "nicha",
        "nicol",
        "nicto",
        "nidor",
        "nielo",
        "nifão",
        "nigra",
        "nilas",
        "nilgó",
        "nimas",
        "nimbo",
        "ninai",
        "ninam",
        "ninas",
        "ninei",
        "ninem",
        "nines",
        "ninha",
        "ninou",
        "niopó",
        "niple",
        "nipão",
        "nique",
        "nisca",
        "nisco",
        "nisei",
        "nitro",
        "nobel",
        "nocha",
        "nodal",
        "nodar",
        "nodos",
        "noema",
        "noese",
        "noete",
        "nogai",
        "nogal",
        "nogão",
        "noira",
        "noise",
        "noive",
        "noivo",
        "nomeá",
        "nonal",
        "nonas",
        "nonde",
        "nondo",
        "nones",
        "nonga",
        "nopal",
        "noque",
        "noras",
        "norso",
        "norça",
        "nosco",
        "nosso",
        "notai",
        "notal",
        "notam",
        "notas",
        "notei",
        "notem",
        "notes",
        "notou",
        "noute",
        "noval",
        "novar",
        "novel",
        "noves",
        "noxal",
        "nozul",
        "nucal",
        "nuelo",
        "nueza",
        "nulas",
        "numas",
        "numbu",
        "numes",
        "nundo",
        "nunes",
        "nurse",
        "nuruz",
        "nutar",
        "nutra",
        "nutre",
        "nutri",
        "nutro",
        "nução",
        "nylon",
        "nábão",
        "nácar",
        "nágua",
        "násio",
        "nássi",
        "násua",
        "nátia",
        "návia",
        "náxia",
        "náxio",
        "názir",
        "nègre",
        "nébel",
        "nédio",
        "nélia",
        "néons",
        "néper",
        "népia",
        "néria",
        "nério",
        "nênia",
        "nênio",
        "níger",
        "nígua",
        "nílio",
        "nímio",
        "níton",
        "níveo",
        "nódio",
        "nódoa",
        "nóias",
        "nómos",
        "nória",
        "nório",
        "nóvea",
        "nóxio",
        "nônio",
        "núbil",
        "núbio",
        "núcio",
        "núfar",
        "númen",
        "núveo",
        "núxia",
        "obeba",
        "obesa",
        "oboaz",
        "obori",
        "obrar",
        "obsia",
        "obsta",
        "obste",
        "obsto",
        "obtém",
        "obvie",
        "obvim",
        "obvir",
        "obvém",
        "ocado",
        "ocapi",
        "ocara",
        "ocaso",
        "ocelo",
        "ochas",
        "ocrem",
        "octal",
        "octil",
        "ocupa",
        "ocupe",
        "ocupo",
        "odara",
        "odeia",
        "odeie",
        "odeio",
        "odeom",
        "odeão",
        "odiai",
        "odiei",
        "odila",
        "odina",
        "odiou",
        "odito",
        "odoro",
        "odres",
        "odéon",
        "ofaié",
        "ofega",
        "ofego",
        "ofeso",
        "ofira",
        "ofita",
        "ofite",
        "ofito",
        "ogamo",
        "ogano",
        "ogiva",
        "ogros",
        "oiara",
        "oigar",
        "oirar",
        "oitão",
        "oiçam",
        "olada",
        "olaia",
        "olaré",
        "olear",
        "oleno",
        "oleol",
        "olhai",
        "olhal",
        "olham",
        "olhas",
        "olhei",
        "olhem",
        "olhes",
        "olhou",
        "olhão",
        "oligo",
        "olina",
        "olira",
        "oliva",
        "olivo",
        "olori",
        "omado",
        "omalá",
        "omani",
        "omaso",
        "ombrã",
        "omelê",
        "omiri",
        "omita",
        "omite",
        "omiti",
        "omito",
        "omnes",
        "omolu",
        "ondar",
        "ondim",
        "onera",
        "onere",
        "onero",
        "oneta",
        "onfra",
        "onfuá",
        "onixe",
        "onças",
        "oonim",
        "opaba",
        "opaca",
        "opado",
        "opala",
        "opere",
        "opero",
        "opiar",
        "opilo",
        "opimo",
        "opina",
        "opine",
        "opino",
        "oporá",
        "optai",
        "optam",
        "optas",
        "optei",
        "optem",
        "optes",
        "optou",
        "opõem",
        "opões",
        "oqueá",
        "oquim",
        "oraca",
        "orada",
        "orado",
        "orago",
        "orais",
        "orara",
        "orate",
        "orava",
        "orcas",
        "orcei",
        "orcem",
        "orces",
        "orear",
        "oreia",
        "oreis",
        "oribi",
        "orite",
        "orixá",
        "orlai",
        "orlam",
        "orlar",
        "orlas",
        "orlei",
        "orlem",
        "orles",
        "orleã",
        "orlom",
        "orlou",
        "ornai",
        "ornam",
        "ornar",
        "ornas",
        "ornei",
        "ornem",
        "ornes",
        "ornis",
        "ornou",
        "orobó",
        "oropa",
        "orqui",
        "orucó",
        "orçai",
        "orçam",
        "orçar",
        "orçaz",
        "orçou",
        "oscar",
        "oscos",
        "osmia",
        "osmol",
        "ostai",
        "ostro",
        "otelo",
        "otita",
        "otite",
        "otona",
        "otoni",
        "otose",
        "ototó",
        "ougar",
        "ourar",
        "ouros",
        "ourém",
        "ousai",
        "ousam",
        "ousas",
        "ousei",
        "ousem",
        "ouses",
        "ousia",
        "ousio",
        "ousou",
        "outar",
        "outas",
        "outão",
        "ouvem",
        "ouves",
        "ouvia",
        "ouvis",
        "ouviu",
        "ouçam",
        "ouças",
        "oução",
        "ovada",
        "ovado",
        "ovais",
        "ovala",
        "oveva",
        "ovino",
        "ovula",
        "oxeol",
        "oxida",
        "oxide",
        "oxima",
        "oxina",
        "oxoce",
        "oxura",
        "ozena",
        "ozone",
        "ozono",
        "oçãim",
        "oídio",
        "paari",
        "pacas",
        "pacau",
        "pacaí",
        "pacho",
        "pachã",
        "pacol",
        "pacta",
        "pacto",
        "pacão",
        "padeu",
        "padês",
        "paetê",
        "pagai",
        "pagas",
        "pagel",
        "pagem",
        "pager",
        "pagou",
        "pague",
        "pagão",
        "paica",
        "paigc",
        "paina",
        "paios",
        "paira",
        "paire",
        "pairo",
        "paivo",
        "paixa",
        "paião",
        "pajem",
        "pajeú",
        "pajão",
        "pajés",
        "palar",
        "palas",
        "palau",
        "paleo",
        "palio",
        "palop",
        "palor",
        "palpo",
        "palra",
        "palão",
        "pamas",
        "pambo",
        "pamoá",
        "pampo",
        "panal",
        "panar",
        "panca",
        "panco",
        "pando",
        "panes",
        "panga",
        "pango",
        "panha",
        "panja",
        "panri",
        "panró",
        "pantó",
        "panão",
        "paolu",
        "papai",
        "papal",
        "papam",
        "papar",
        "papas",
        "papei",
        "papem",
        "paper",
        "papes",
        "papos",
        "papou",
        "papua",
        "papus",
        "papão",
        "paqui",
        "paquã",
        "paquê",
        "parai",
        "paral",
        "param",
        "paras",
        "parau",
        "parca",
        "parei",
        "parem",
        "pares",
        "parga",
        "pargo",
        "paria",
        "paris",
        "pariu",
        "parka",
        "parla",
        "parné",
        "parol",
        "parou",
        "parra",
        "parro",
        "parse",
        "parta",
        "parti",
        "parum",
        "paruí",
        "parva",
        "parvi",
        "parvu",
        "parão",
        "pasep",
        "pasma",
        "pasme",
        "pasmo",
        "passa",
        "passe",
        "paste",
        "patau",
        "pataz",
        "pataí",
        "patel",
        "patim",
        "patos",
        "patoá",
        "patuá",
        "patão",
        "patém",
        "patês",
        "paual",
        "pauda",
        "pauis",
        "paula",
        "paulo",
        "pause",
        "pauso",
        "paute",
        "pauto",
        "pavia",
        "pavoa",
        "pavês",
        "paxaú",
        "pazes",
        "pazão",
        "paços",
        "paíba",
        "paúna",
        "paúra",
        "pcdob",
        "peado",
        "pealo",
        "peaça",
        "pecai",
        "pecha",
        "pecou",
        "pecém",
        "pedem",
        "pedes",
        "pedia",
        "pedis",
        "pediu",
        "pegai",
        "pegam",
        "pegas",
        "pegma",
        "pegos",
        "pegou",
        "pegue",
        "pegão",
        "peias",
        "peida",
        "peide",
        "peido",
        "peina",
        "peita",
        "peite",
        "peito",
        "pejar",
        "pelai",
        "pelam",
        "pelar",
        "pelas",
        "pelei",
        "peles",
        "pelma",
        "pelor",
        "pelou",
        "pelta",
        "pelve",
        "pelão",
        "pelém",
        "pemba",
        "pemom",
        "penai",
        "penam",
        "penas",
        "penca",
        "pence",
        "penco",
        "penda",
        "pende",
        "pendi",
        "pendo",
        "penei",
        "penem",
        "penes",
        "pengó",
        "penha",
        "penia",
        "penol",
        "penou",
        "pensa",
        "pense",
        "penso",
        "penão",
        "peona",
        "pepel",
        "peplo",
        "peque",
        "pequi",
        "peral",
        "peras",
        "perau",
        "perca",
        "perce",
        "perco",
        "perde",
        "perdi",
        "peres",
        "pereá",
        "perla",
        "perno",
        "perné",
        "perol",
        "peroá",
        "perra",
        "perro",
        "perum",
        "perus",
        "pesai",
        "pesam",
        "pesas",
        "pesei",
        "pesem",
        "peses",
        "pesga",
        "pesos",
        "pesou",
        "pesto",
        "petal",
        "petar",
        "petim",
        "petiz",
        "petiá",
        "petiú",
        "petra",
        "petum",
        "petão",
        "petém",
        "pexão",
        "pezão",
        "peçam",
        "peças",
        "peúco",
        "peúga",
        "peúle",
        "peúva",
        "piaba",
        "piado",
        "piafé",
        "piaga",
        "piais",
        "pialo",
        "piana",
        "piapé",
        "piara",
        "piauí",
        "piava",
        "piaçá",
        "piaçó",
        "picai",
        "pical",
        "picam",
        "picas",
        "picaú",
        "picha",
        "piche",
        "pichi",
        "picho",
        "picoa",
        "picos",
        "picou",
        "picto",
        "picum",
        "picuá",
        "picuí",
        "picão",
        "pidão",
        "piego",
        "pieis",
        "piela",
        "pielo",
        "piese",
        "piezo",
        "pifai",
        "pifam",
        "pifar",
        "pifas",
        "pifei",
        "pifem",
        "pifes",
        "pifou",
        "pifre",
        "pifão",
        "pigal",
        "pigar",
        "pigma",
        "pigro",
        "piina",
        "pilas",
        "pilau",
        "pilhe",
        "pilho",
        "pilim",
        "pilra",
        "pilão",
        "piléu",
        "pimba",
        "pimbo",
        "pinar",
        "pinas",
        "pince",
        "pinda",
        "pindi",
        "pinel",
        "pinha",
        "pinhé",
        "pinte",
        "pinto",
        "pinço",
        "pinéu",
        "pioca",
        "pioié",
        "piola",
        "piona",
        "piora",
        "piore",
        "pioró",
        "piose",
        "pipal",
        "pipar",
        "pipas",
        "pipes",
        "pipia",
        "pipio",
        "pipiu",
        "pipra",
        "pique",
        "piqui",
        "piraí",
        "piraú",
        "pirca",
        "pirei",
        "pireu",
        "pirex",
        "pirgo",
        "piria",
        "piriz",
        "pirou",
        "piroá",
        "piruá",
        "pisai",
        "pisam",
        "pisas",
        "pisca",
        "pisco",
        "pisei",
        "pisem",
        "pises",
        "pisos",
        "pisou",
        "pisão",
        "pitar",
        "pitiú",
        "pitom",
        "pituã",
        "pituí",
        "pitão",
        "pitém",
        "pitéu",
        "pivôs",
        "pixel",
        "pixuá",
        "pixéu",
        "piões",
        "piúba",
        "piúca",
        "piúgo",
        "piúna",
        "piúva",
        "placê",
        "plaga",
        "plana",
        "plane",
        "plani",
        "plano",
        "platô",
        "plexo",
        "plica",
        "ploce",
        "plomo",
        "plota",
        "plote",
        "ploto",
        "pluga",
        "plugo",
        "plumo",
        "plush",
        "pluto",
        "poaia",
        "poare",
        "poaçu",
        "pobra",
        "pocar",
        "pocha",
        "poche",
        "pocho",
        "podai",
        "podal",
        "podam",
        "podas",
        "podei",
        "podem",
        "podes",
        "podia",
        "podoa",
        "podou",
        "podão",
        "podói",
        "poejo",
        "poial",
        "poiar",
        "poisa",
        "poise",
        "poiso",
        "poita",
        "pojar",
        "polau",
        "polca",
        "polem",
        "poleá",
        "polha",
        "polho",
        "polia",
        "poliu",
        "polje",
        "polme",
        "polmo",
        "polos",
        "polpo",
        "polui",
        "polés",
        "pombe",
        "pomes",
        "pomos",
        "poncã",
        "poncó",
        "ponde",
        "pondo",
        "ponga",
        "pongó",
        "ponha",
        "ponho",
        "ponis",
        "ponjé",
        "ponom",
        "popiã",
        "popão",
        "poque",
        "porei",
        "pores",
        "poria",
        "porno",
        "porra",
        "porro",
        "porte",
        "porto",
        "porás",
        "porão",
        "posai",
        "posam",
        "posas",
        "posca",
        "posei",
        "posem",
        "poses",
        "posou",
        "possa",
        "posso",
        "posta",
        "potes",
        "potin",
        "potra",
        "potro",
        "poula",
        "poule",
        "poulo",
        "poupa",
        "poupe",
        "poupo",
        "pousa",
        "pouse",
        "pouta",
        "povoe",
        "povoo",
        "povão",
        "poçal",
        "poças",
        "prais",
        "prajá",
        "prama",
        "prana",
        "prase",
        "pravo",
        "prear",
        "prega",
        "preia",
        "prelo",
        "prema",
        "preme",
        "premi",
        "preso",
        "previ",
        "prevê",
        "preza",
        "preze",
        "prezo",
        "prima",
        "prime",
        "prino",
        "prior",
        "prise",
        "priva",
        "prive",
        "privo",
        "prião",
        "proar",
        "proas",
        "proba",
        "probo",
        "proco",
        "procá",
        "profs",
        "proiz",
        "prono",
        "proso",
        "proto",
        "prove",
        "provi",
        "provo",
        "pruca",
        "pruga",
        "pruir",
        "pruma",
        "pruno",
        "préon",
        "príon",
        "psaro",
        "pseca",
        "psico",
        "psila",
        "psilo",
        "psoas",
        "psoco",
        "psora",
        "ptdob",
        "ptena",
        "ptero",
        "ptose",
        "puada",
        "puado",
        "puava",
        "puaço",
        "puaçu",
        "pubar",
        "pucha",
        "pucho",
        "puctó",
        "puder",
        "puela",
        "puera",
        "pugna",
        "pujar",
        "pulai",
        "pulam",
        "pulas",
        "pulei",
        "pulem",
        "pules",
        "pulgo",
        "pulha",
        "pulim",
        "pulos",
        "pulou",
        "pulsa",
        "pulse",
        "pulão",
        "pumba",
        "punam",
        "punas",
        "pundé",
        "punem",
        "punes",
        "punga",
        "punha",
        "punia",
        "punis",
        "puniu",
        "pupas",
        "pural",
        "puras",
        "purga",
        "purgo",
        "puris",
        "puros",
        "puruí",
        "puser",
        "putal",
        "putas",
        "putos",
        "putto",
        "puviá",
        "puxai",
        "puxam",
        "puxas",
        "puxei",
        "puxem",
        "puxes",
        "puxou",
        "puíam",
        "puías",
        "puído",
        "puíra",
        "puíta",
        "pádoa",
        "pádua",
        "páfia",
        "páfio",
        "pálea",
        "párea",
        "pário",
        "pársi",
        "páteo",
        "páter",
        "pânax",
        "pânus",
        "pélio",
        "péone",
        "pépia",
        "pênis",
        "pícea",
        "píceo",
        "píero",
        "pífio",
        "píjin",
        "píleo",
        "píneo",
        "pínus",
        "píper",
        "píqua",
        "píseo",
        "písin",
        "pítia",
        "pítio",
        "píton",
        "pódex",
        "pólex",
        "pólio",
        "pólis",
        "pólux",
        "pório",
        "pótea",
        "póvoa",
        "púbis",
        "púgil",
        "púlex",
        "quado",
        "quaga",
        "qualé",
        "quark",
        "quart",
        "quaró",
        "quasa",
        "quati",
        "quatá",
        "queba",
        "queca",
        "quecé",
        "quede",
        "quedo",
        "quela",
        "quelé",
        "quemi",
        "quena",
        "queno",
        "quepe",
        "quera",
        "queri",
        "quero",
        "querê",
        "queto",
        "queza",
        "quiaz",
        "quiba",
        "quicé",
        "quija",
        "quile",
        "quili",
        "quimo",
        "quimé",
        "quino",
        "quios",
        "quipo",
        "quipá",
        "quipé",
        "quiri",
        "quiro",
        "quita",
        "quite",
        "quiti",
        "quito",
        "quiuí",
        "quivi",
        "quixa",
        "quixó",
        "quiza",
        "quiço",
        "quote",
        "quépi",
        "rabal",
        "rabaz",
        "rabdo",
        "rabel",
        "rabia",
        "rabil",
        "rabos",
        "rabão",
        "racha",
        "rache",
        "racho",
        "racle",
        "racum",
        "radia",
        "radie",
        "radão",
        "rafar",
        "raglã",
        "raiai",
        "raial",
        "raiam",
        "raias",
        "raide",
        "raiei",
        "raiem",
        "raies",
        "raiom",
        "raiou",
        "raivó",
        "raião",
        "rajai",
        "rajam",
        "rajar",
        "rajas",
        "rajei",
        "rajem",
        "rajes",
        "rajou",
        "rajão",
        "ralai",
        "ralam",
        "ralas",
        "ralei",
        "ralem",
        "rales",
        "ralha",
        "ralhe",
        "ralho",
        "rally",
        "ralos",
        "ralou",
        "ralão",
        "ramal",
        "ramas",
        "rambo",
        "ramno",
        "ranca",
        "ranfo",
        "range",
        "rangi",
        "rango",
        "ranha",
        "ranho",
        "ranja",
        "ranjo",
        "ranço",
        "rapai",
        "rapam",
        "rapar",
        "rapas",
        "rapei",
        "rapel",
        "rapem",
        "rapes",
        "rapou",
        "rapta",
        "rapte",
        "rapto",
        "rapão",
        "raque",
        "rarar",
        "raros",
        "rasar",
        "rasas",
        "rasca",
        "rasco",
        "rasga",
        "rasgo",
        "rasos",
        "raspa",
        "raspe",
        "raspo",
        "rasta",
        "raste",
        "rasto",
        "rasão",
        "ratan",
        "ratar",
        "ratas",
        "ratel",
        "rates",
        "ratim",
        "ratio",
        "ratos",
        "ratão",
        "rausa",
        "rauso",
        "razia",
        "raças",
        "raíta",
        "reage",
        "reagi",
        "reaja",
        "reajo",
        "reame",
        "reata",
        "reate",
        "reato",
        "reaça",
        "rebar",
        "rebel",
        "reboa",
        "reboe",
        "reboo",
        "rebém",
        "recai",
        "recar",
        "rechã",
        "rechô",
        "recru",
        "recta",
        "recto",
        "recua",
        "recue",
        "recão",
        "recém",
        "redar",
        "redil",
        "redox",
        "redra",
        "reduz",
        "redém",
        "refaz",
        "refez",
        "refia",
        "refil",
        "refis",
        "refiz",
        "refle",
        "regai",
        "regal",
        "regam",
        "regas",
        "regei",
        "regem",
        "reges",
        "regeu",
        "regma",
        "regou",
        "regre",
        "regro",
        "regue",
        "reich",
        "reide",
        "reima",
        "reina",
        "reine",
        "reira",
        "reivó",
        "reixa",
        "rejam",
        "rejas",
        "rejão",
        "relar",
        "relax",
        "releu",
        "relfa",
        "relha",
        "relho",
        "relia",
        "relou",
        "reluz",
        "relão",
        "remai",
        "remam",
        "remas",
        "remei",
        "remel",
        "remem",
        "remes",
        "remia",
        "remir",
        "remis",
        "remiu",
        "remix",
        "remoa",
        "remoo",
        "remos",
        "remou",
        "remói",
        "renal",
        "renas",
        "rende",
        "rendi",
        "rendo",
        "renga",
        "renge",
        "rengo",
        "renhi",
        "renta",
        "renui",
        "renão",
        "repes",
        "repte",
        "repto",
        "repus",
        "repôs",
        "repõe",
        "reque",
        "reses",
        "resma",
        "respe",
        "respo",
        "ressa",
        "resta",
        "reste",
        "retal",
        "retar",
        "retor",
        "retos",
        "retre",
        "retém",
        "reuma",
        "reuni",
        "revel",
        "revez",
        "revia",
        "revim",
        "revir",
        "reviu",
        "revoo",
        "revém",
        "rexio",
        "rezai",
        "rezam",
        "rezas",
        "rezei",
        "rezem",
        "rezes",
        "rezou",
        "rezão",
        "reúna",
        "reúne",
        "reúno",
        "riais",
        "riana",
        "ribar",
        "ribas",
        "ribes",
        "ricas",
        "ricto",
        "rides",
        "ridor",
        "rifai",
        "rifam",
        "rifar",
        "rifas",
        "rifei",
        "rifem",
        "rifes",
        "rifle",
        "rifou",
        "rifte",
        "rifão",
        "rigol",
        "rijal",
        "rijar",
        "rijos",
        "rijão",
        "rilha",
        "rimai",
        "rimam",
        "rimas",
        "rimei",
        "rimem",
        "rimes",
        "rimos",
        "rimou",
        "rinal",
        "rindo",
        "rinha",
        "rinto",
        "ripal",
        "ripar",
        "ripas",
        "ripia",
        "rique",
        "riram",
        "riras",
        "rirei",
        "rirem",
        "rires",
        "riria",
        "rirão",
        "risca",
        "risse",
        "risso",
        "risão",
        "ritão",
        "rixar",
        "rixas",
        "rizar",
        "rizes",
        "riçar",
        "riçol",
        "riúta",
        "roais",
        "robaz",
        "roble",
        "robot",
        "rocal",
        "rocaz",
        "rocei",
        "rocem",
        "roces",
        "rocim",
        "rocló",
        "rocão",
        "rodai",
        "rodal",
        "rodam",
        "rodas",
        "rodei",
        "rodem",
        "rodes",
        "rodim",
        "rodos",
        "rodou",
        "rodão",
        "roeis",
        "roera",
        "rogai",
        "rogal",
        "rogam",
        "rogar",
        "rogas",
        "rogou",
        "rogue",
        "rojar",
        "rojão",
        "rolai",
        "rolam",
        "rolas",
        "rolda",
        "rolei",
        "rolem",
        "roles",
        "rolho",
        "rolim",
        "rolou",
        "rolão",
        "romeu",
        "rompa",
        "rompe",
        "rompi",
        "rompo",
        "romão",
        "romãs",
        "ronca",
        "ronco",
        "ronda",
        "ronde",
        "rondó",
        "ronga",
        "rongó",
        "ronha",
        "rontó",
        "roque",
        "rorar",
        "rosal",
        "rosar",
        "roses",
        "rosna",
        "rosne",
        "rosno",
        "rosti",
        "rosão",
        "rotam",
        "rotar",
        "rotas",
        "rotim",
        "rotor",
        "rotos",
        "rouba",
        "roube",
        "rouge",
        "round",
        "roxas",
        "roxos",
        "roçai",
        "roçam",
        "roças",
        "roçou",
        "roíam",
        "roías",
        "roído",
        "ruano",
        "ruaça",
        "rubim",
        "rubis",
        "rublo",
        "rubra",
        "ruche",
        "rudes",
        "rudez",
        "rufai",
        "rufam",
        "rufar",
        "rufas",
        "rufei",
        "rufem",
        "rufes",
        "rufia",
        "ruflo",
        "rufos",
        "rufou",
        "rugai",
        "rugam",
        "rugar",
        "rugas",
        "rugby",
        "rugem",
        "ruges",
        "rugia",
        "rugis",
        "rugiu",
        "rugou",
        "rugue",
        "ruins",
        "ruirá",
        "rujam",
        "rujas",
        "rular",
        "rules",
        "rumai",
        "rumam",
        "rumar",
        "rumas",
        "rumba",
        "rumbo",
        "rumei",
        "rumem",
        "rumes",
        "rumou",
        "rumpi",
        "runas",
        "runcó",
        "rundo",
        "ruolz",
        "rupar",
        "rupia",
        "rupul",
        "rusco",
        "rusga",
        "rusma",
        "russa",
        "ruste",
        "rusto",
        "rutim",
        "ruçar",
        "ruíam",
        "ruías",
        "ruído",
        "rácio",
        "rádon",
        "ráfia",
        "rágio",
        "ráqui",
        "râmeo",
        "rébus",
        "récio",
        "rédia",
        "régia",
        "régie",
        "régio",
        "rénio",
        "révoa",
        "réxia",
        "rício",
        "ríeis",
        "rígel",
        "rípio",
        "rítio",
        "ríton",
        "róber",
        "róbur",
        "rócio",
        "ródio",
        "rópia",
        "rósea",
        "róseo",
        "rótia",
        "rúbeo",
        "rúbia",
        "rúfio",
        "rúgbi",
        "rúgio",
        "rúmen",
        "sabal",
        "sabat",
        "sabei",
        "sabem",
        "sabes",
        "sabeu",
        "sabin",
        "sabir",
        "sabiú",
        "sable",
        "sabra",
        "sabre",
        "sacal",
        "sacam",
        "sacas",
        "sacaí",
        "sacha",
        "sacho",
        "sachê",
        "sacia",
        "sacie",
        "sacio",
        "sacos",
        "sacou",
        "sacre",
        "sacta",
        "sacuê",
        "sacão",
        "sadrá",
        "sadão",
        "saeta",
        "safai",
        "safam",
        "safar",
        "safas",
        "safei",
        "safem",
        "safes",
        "safio",
        "safou",
        "safre",
        "safro",
        "safão",
        "sagas",
        "sages",
        "sagez",
        "sagra",
        "sagre",
        "sagro",
        "sagui",
        "sagum",
        "saguá",
        "saial",
        "saiam",
        "saias",
        "saiba",
        "saibo",
        "saide",
        "saiga",
        "saijé",
        "saino",
        "sainé",
        "saipé",
        "sairi",
        "sairá",
        "sairé",
        "saivá",
        "saixê",
        "saião",
        "salaz",
        "salda",
        "salde",
        "saldo",
        "salga",
        "salgo",
        "salol",
        "salpa",
        "salso",
        "salta",
        "salte",
        "salva",
        "salve",
        "salvo",
        "salém",
        "sambe",
        "sambo",
        "samos",
        "sampa",
        "samur",
        "samão",
        "sanai",
        "sanam",
        "sanas",
        "sanca",
        "sanco",
        "sande",
        "sanei",
        "sanem",
        "sanes",
        "sanga",
        "sango",
        "sanja",
        "sanou",
        "sansa",
        "sanza",
        "sapal",
        "sapam",
        "sapar",
        "sapos",
        "sapro",
        "sapuá",
        "sapão",
        "saqui",
        "sarai",
        "saram",
        "saran",
        "saras",
        "sarco",
        "sardo",
        "sarei",
        "sarem",
        "sares",
        "sarga",
        "sargo",
        "saria",
        "sarin",
        "sarja",
        "sarné",
        "saros",
        "sarou",
        "saroé",
        "sarra",
        "sarta",
        "saruá",
        "saruê",
        "sarão",
        "sarça",
        "sassa",
        "sauim",
        "sauiá",
        "sauni",
        "saupé",
        "saurá",
        "saval",
        "saviá",
        "saxão",
        "sazão",
        "saíco",
        "saído",
        "saíta",
        "saúba",
        "saúco",
        "saúda",
        "saúdo",
        "saúva",
        "scone",
        "scope",
        "score",
        "seada",
        "sebel",
        "sebes",
        "sebos",
        "secai",
        "secam",
        "secas",
        "secos",
        "secou",
        "secta",
        "secto",
        "sedal",
        "sedan",
        "sedar",
        "sedas",
        "seder",
        "sedes",
        "sedia",
        "sedie",
        "sedio",
        "seduz",
        "sedão",
        "sedém",
        "sefia",
        "segar",
        "segue",
        "segui",
        "segão",
        "seibo",
        "seice",
        "seima",
        "seios",
        "seira",
        "seive",
        "seivo",
        "seixa",
        "seixo",
        "seiça",
        "sejam",
        "sejas",
        "selai",
        "selam",
        "selas",
        "selei",
        "selem",
        "seles",
        "selha",
        "selou",
        "selão",
        "semba",
        "semel",
        "senal",
        "senas",
        "senda",
        "sendo",
        "senga",
        "sengo",
        "senho",
        "senil",
        "senis",
        "senra",
        "sensu",
        "senta",
        "sente",
        "senti",
        "sento",
        "sepse",
        "septa",
        "septo",
        "seque",
        "seral",
        "serei",
        "serem",
        "seres",
        "serfo",
        "seria",
        "seriú",
        "serja",
        "serna",
        "serpa",
        "serpe",
        "serra",
        "serre",
        "serro",
        "sertã",
        "serva",
        "serve",
        "servi",
        "serás",
        "serão",
        "serós",
        "sesgo",
        "sesma",
        "sesmo",
        "sesso",
        "sesta",
        "setar",
        "setas",
        "setes",
        "setia",
        "setra",
        "sevar",
        "sevas",
        "sexar",
        "sexos",
        "sezão",
        "share",
        "sheik",
        "short",
        "shows",
        "shunt",
        "sialo",
        "siame",
        "sibar",
        "sicaf",
        "siclo",
        "sidos",
        "sidra",
        "siena",
        "sifão",
        "sigam",
        "sigas",
        "siglo",
        "sigmó",
        "signa",
        "sigro",
        "silas",
        "silfa",
        "silfo",
        "silha",
        "silho",
        "silos",
        "silte",
        "silva",
        "silve",
        "silvo",
        "simum",
        "simão",
        "sinai",
        "sinar",
        "sindi",
        "sindo",
        "singa",
        "sinhá",
        "sinhô",
        "sinos",
        "sinta",
        "sinto",
        "sinxó",
        "sinão",
        "sioba",
        "siote",
        "sioux",
        "sipai",
        "sipia",
        "sique",
        "sirfo",
        "sirga",
        "sirgo",
        "siris",
        "siriú",
        "sirma",
        "sirte",
        "sirva",
        "sirvo",
        "sisal",
        "sisar",
        "sisgo",
        "sisma",
        "sisor",
        "sisos",
        "sissó",
        "sisão",
        "sitar",
        "sites",
        "sitia",
        "sitie",
        "sitos",
        "situa",
        "situe",
        "situo",
        "siusi",
        "sivan",
        "sivom",
        "sizau",
        "siões",
        "siúba",
        "skate",
        "slack",
        "slide",
        "snipe",
        "snobe",
        "soada",
        "soado",
        "soais",
        "soaje",
        "soala",
        "soara",
        "soava",
        "sobem",
        "sobes",
        "sobeu",
        "sobpé",
        "sobro",
        "socai",
        "socam",
        "socas",
        "soclo",
        "socos",
        "socou",
        "socoí",
        "socão",
        "sodar",
        "sodra",
        "soeis",
        "sofra",
        "sofre",
        "sofri",
        "sofro",
        "sofás",
        "sogar",
        "soguá",
        "soila",
        "soito",
        "solai",
        "solam",
        "solas",
        "solau",
        "solaz",
        "solda",
        "solde",
        "solei",
        "solem",
        "soles",
        "solfa",
        "solha",
        "solho",
        "solia",
        "solos",
        "solou",
        "solta",
        "solte",
        "solão",
        "somai",
        "somam",
        "somas",
        "somei",
        "somem",
        "somes",
        "somiê",
        "somos",
        "somou",
        "sonda",
        "sonde",
        "sondo",
        "songa",
        "sonha",
        "sonhe",
        "sonho",
        "sonos",
        "sonsa",
        "sonso",
        "soplo",
        "sopor",
        "sopra",
        "sopre",
        "sopro",
        "sopão",
        "soque",
        "soral",
        "sorar",
        "sorda",
        "sorgo",
        "sorna",
        "soros",
        "sorri",
        "sorro",
        "sorti",
        "sorva",
        "sorve",
        "sorvi",
        "sorvo",
        "sorça",
        "sosso",
        "sotam",
        "sotas",
        "sotaã",
        "sotia",
        "sotil",
        "soube",
        "sousa",
        "souto",
        "souza",
        "sovai",
        "sovam",
        "sovas",
        "sovei",
        "sovem",
        "soves",
        "sovou",
        "sovéu",
        "sozal",
        "soído",
        "split",
        "spray",
        "squid",
        "stafe",
        "staff",
        "stand",
        "steno",
        "stent",
        "stick",
        "stilb",
        "still",
        "stock",
        "stoma",
        "stops",
        "suada",
        "suais",
        "suara",
        "suava",
        "suazi",
        "suaçu",
        "subam",
        "subas",
        "subia",
        "subis",
        "subiu",
        "sucar",
        "sucho",
        "sucre",
        "sucto",
        "sudam",
        "sudra",
        "sudro",
        "sueca",
        "suede",
        "sueis",
        "sueto",
        "suevo",
        "suflé",
        "sugai",
        "sugam",
        "sugar",
        "sugas",
        "sugou",
        "sugue",
        "sujai",
        "sujam",
        "sujas",
        "sujei",
        "sujem",
        "sujes",
        "sujou",
        "sular",
        "sulca",
        "sulco",
        "sulfa",
        "sulia",
        "sulão",
        "sumam",
        "sumas",
        "sumbo",
        "sumia",
        "sumis",
        "sumiu",
        "sumos",
        "sundo",
        "sunfa",
        "sunto",
        "supra",
        "supre",
        "supri",
        "supro",
        "supus",
        "supôs",
        "supõe",
        "sural",
        "surfa",
        "surfo",
        "surge",
        "surgi",
        "surim",
        "surja",
        "surjo",
        "surre",
        "surro",
        "surta",
        "surte",
        "surça",
        "susep",
        "susta",
        "suste",
        "susão",
        "sutar",
        "sutra",
        "suxar",
        "sução",
        "suína",
        "suíça",
        "suíço",
        "suômi",
        "swing",
        "sáfeo",
        "ságio",
        "sálio",
        "sálix",
        "sápia",
        "sável",
        "sáxeo",
        "sâmio",
        "sândi",
        "sânie",
        "sécia",
        "sécio",
        "sélio",
        "sépia",
        "sépio",
        "séqui",
        "sérum",
        "sésea",
        "sésia",
        "séter",
        "sêmea",
        "sêmen",
        "sêmis",
        "sênio",
        "sícon",
        "síler",
        "sílex",
        "símel",
        "símia",
        "símil",
        "sínus",
        "sírio",
        "sócia",
        "sólea",
        "sóleo",
        "sólio",
        "sórex",
        "sória",
        "sóror",
        "súber",
        "súcia",
        "súcio",
        "súrio",
        "tabes",
        "tabla",
        "taboa",
        "tabus",
        "tabão",
        "tacai",
        "tacam",
        "tacar",
        "tacha",
        "tache",
        "tacho",
        "tacos",
        "tacou",
        "tacus",
        "tacuá",
        "tacão",
        "tafiá",
        "taful",
        "tagal",
        "tagaz",
        "tagma",
        "tagna",
        "tagra",
        "taguá",
        "taibu",
        "taico",
        "taifa",
        "taifó",
        "taiga",
        "taina",
        "taino",
        "taipa",
        "taira",
        "taita",
        "taixi",
        "tajal",
        "talar",
        "talas",
        "tales",
        "talha",
        "talhe",
        "talho",
        "talim",
        "talma",
        "talol",
        "talos",
        "talpa",
        "talão",
        "tamba",
        "tambi",
        "tambo",
        "tambu",
        "tamis",
        "tampe",
        "tampo",
        "tamuz",
        "tamão",
        "tanar",
        "tanas",
        "tancá",
        "tando",
        "tange",
        "tangi",
        "tanha",
        "tanho",
        "tanja",
        "tanjo",
        "tanoa",
        "tanso",
        "tanta",
        "taoca",
        "tapai",
        "tapam",
        "tapas",
        "tapei",
        "tapem",
        "tapes",
        "tapir",
        "tapiz",
        "tapiá",
        "tapií",
        "tapiú",
        "tapou",
        "tapua",
        "tapão",
        "taque",
        "taqui",
        "tarar",
        "taras",
        "tarau",
        "tarca",
        "tardo",
        "taria",
        "tarim",
        "tarol",
        "tarot",
        "tarpa",
        "tarro",
        "tarte",
        "tartã",
        "tarós",
        "tasca",
        "tasco",
        "tasna",
        "tasto",
        "tatos",
        "tatua",
        "tatue",
        "tatuo",
        "tatus",
        "tatuí",
        "tatzé",
        "taura",
        "tauro",
        "tavuá",
        "tavão",
        "taxai",
        "taxam",
        "taxar",
        "taxas",
        "taxei",
        "taxem",
        "taxes",
        "taxia",
        "taxou",
        "teada",
        "teale",
        "teame",
        "tease",
        "teate",
        "tebas",
        "tebeu",
        "tecal",
        "tecar",
        "tecei",
        "tecem",
        "teces",
        "teceu",
        "tecia",
        "tecle",
        "teclo",
        "tecno",
        "tecto",
        "tecum",
        "tedor",
        "tedéu",
        "tegme",
        "tegui",
        "tegão",
        "teiga",
        "teigo",
        "teima",
        "teime",
        "teimo",
        "teipe",
        "teira",
        "teiru",
        "teiró",
        "teité",
        "teixe",
        "teixo",
        "telar",
        "teles",
        "telex",
        "telho",
        "telim",
        "teliz",
        "telso",
        "temam",
        "temas",
        "temba",
        "tembé",
        "temei",
        "temem",
        "temer",
        "temes",
        "temeu",
        "temia",
        "temné",
        "temos",
        "tempe",
        "temão",
        "tenar",
        "tenaz",
        "tende",
        "tendi",
        "tendo",
        "tenha",
        "tenho",
        "tenra",
        "tenro",
        "tense",
        "tenta",
        "tente",
        "tença",
        "teoro",
        "teose",
        "tepor",
        "teque",
        "terei",
        "terem",
        "teres",
        "tergo",
        "teria",
        "terma",
        "terna",
        "terne",
        "terol",
        "terso",
        "terás",
        "terão",
        "tesar",
        "tesbi",
        "tesla",
        "tesse",
        "teste",
        "testo",
        "tesum",
        "tetar",
        "tetas",
        "tetim",
        "tetos",
        "tetra",
        "tetro",
        "tetéu",
        "teuto",
        "tevet",
        "teçam",
        "teças",
        "teína",
        "teúba",
        "teúdo",
        "tiara",
        "tiatã",
        "tibar",
        "tibel",
        "tibes",
        "tibum",
        "tical",
        "ticar",
        "ticas",
        "ticos",
        "ticum",
        "tidas",
        "tidor",
        "tidos",
        "tieta",
        "tiete",
        "tiflo",
        "tifão",
        "tiito",
        "tilar",
        "tilda",
        "tiles",
        "tilha",
        "tilho",
        "tilim",
        "timba",
        "timbu",
        "timbé",
        "timbó",
        "timer",
        "timia",
        "timol",
        "timor",
        "timão",
        "tinca",
        "tinem",
        "tines",
        "tinga",
        "tinge",
        "tingi",
        "tinha",
        "tinhó",
        "tinia",
        "tinir",
        "tinis",
        "tiniu",
        "tinja",
        "tinjo",
        "tinor",
        "tinte",
        "tioca",
        "tioco",
        "tiotê",
        "tipar",
        "tipió",
        "tiple",
        "tipão",
        "tipói",
        "tique",
        "tiqui",
        "tirai",
        "tiram",
        "tiras",
        "tiraz",
        "tirei",
        "tirem",
        "tireo",
        "tires",
        "tirió",
        "tirou",
        "tirso",
        "tirão",
        "tisca",
        "tisco",
        "tisna",
        "tisne",
        "tisso",
        "titim",
        "titio",
        "titor",
        "titão",
        "titãs",
        "tiupá",
        "tiver",
        "tizio",
        "tiziu",
        "tição",
        "tiúba",
        "tiúva",
        "tlaco",
        "tlena",
        "tmema",
        "tmese",
        "toaca",
        "toado",
        "tocai",
        "tocam",
        "tocas",
        "tocho",
        "tocos",
        "tocou",
        "toesa",
        "tofel",
        "togar",
        "togas",
        "toira",
        "toiro",
        "toita",
        "toiça",
        "toiço",
        "tojal",
        "tolar",
        "tolas",
        "tolaz",
        "tolda",
        "tolde",
        "toler",
        "tolha",
        "tolhe",
        "tolhi",
        "tolho",
        "tolos",
        "tolão",
        "tomai",
        "tomam",
        "tomba",
        "tombe",
        "tombo",
        "tomei",
        "tomem",
        "tomes",
        "tomia",
        "tomim",
        "tomos",
        "tomou",
        "tomás",
        "tomão",
        "tonal",
        "tonar",
        "tonca",
        "tonel",
        "toner",
        "tonga",
        "tongo",
        "tonia",
        "tonoa",
        "toona",
        "topai",
        "topam",
        "topas",
        "topaz",
        "topei",
        "topem",
        "topes",
        "topos",
        "topou",
        "toral",
        "torar",
        "toras",
        "toraí",
        "torba",
        "torce",
        "torci",
        "torda",
        "tordo",
        "torga",
        "torgo",
        "torna",
        "torne",
        "torno",
        "toros",
        "torra",
        "torro",
        "torvo",
        "torão",
        "torça",
        "torço",
        "torém",
        "tosai",
        "tosam",
        "tosas",
        "tosei",
        "tosem",
        "toses",
        "tosga",
        "tosou",
        "tossi",
        "tosso",
        "tosta",
        "toste",
        "tosto",
        "tosão",
        "touco",
        "toura",
        "touri",
        "touta",
        "toxia",
        "trace",
        "trade",
        "trado",
        "traem",
        "traga",
        "trago",
        "traia",
        "train",
        "traio",
        "trais",
        "traiu",
        "traja",
        "trajo",
        "trale",
        "tramo",
        "trans",
        "trapa",
        "trape",
        "trará",
        "trata",
        "trate",
        "trato",
        "travo",
        "traze",
        "traça",
        "tredo",
        "trefo",
        "trema",
        "treme",
        "tremi",
        "tremo",
        "trepa",
        "trepe",
        "trepo",
        "treso",
        "treva",
        "trial",
        "triar",
        "trias",
        "trica",
        "tridi",
        "triga",
        "trilo",
        "trina",
        "trino",
        "trios",
        "tripo",
        "trips",
        "trito",
        "troar",
        "troce",
        "trofa",
        "troge",
        "troia",
        "trole",
        "troll",
        "trona",
        "tropo",
        "trota",
        "troto",
        "trova",
        "truca",
        "trude",
        "trudo",
        "truxu",
        "truão",
        "tróis",
        "tsela",
        "tuaca",
        "tuaiá",
        "tubar",
        "tubas",
        "tubel",
        "tubim",
        "tubos",
        "tucho",
        "tucum",
        "tucão",
        "tudel",
        "tudum",
        "tufar",
        "tufos",
        "tugir",
        "tugue",
        "tuias",
        "tuita",
        "tulha",
        "tumbo",
        "tumor",
        "tunal",
        "tunar",
        "tunas",
        "tunco",
        "tunda",
        "tundo",
        "tunes",
        "tunga",
        "tupia",
        "tupir",
        "tupis",
        "tuque",
        "turar",
        "turba",
        "turbe",
        "turbo",
        "turca",
        "turdo",
        "turfa",
        "turfe",
        "turna",
        "turnê",
        "turra",
        "turva",
        "turve",
        "tusco",
        "tussa",
        "tusso",
        "tusta",
        "tusto",
        "tutar",
        "tutia",
        "tutti",
        "tutum",
        "tutão",
        "tuíra",
        "tweed",
        "twist",
        "tácia",
        "táfio",
        "táler",
        "tália",
        "tálio",
        "tálus",
        "tásio",
        "táxon",
        "tâmia",
        "tâmil",
        "tâmul",
        "télio",
        "télos",
        "tério",
        "tésio",
        "tésis",
        "tétio",
        "tétis",
        "tétum",
        "têmio",
        "tênia",
        "tíade",
        "tíbio",
        "tício",
        "tífia",
        "tílea",
        "tília",
        "tímio",
        "tínea",
        "tíner",
        "tíris",
        "tóino",
        "tólia",
        "tória",
        "tório",
        "tômio",
        "tônus",
        "túber",
        "túlio",
        "túnis",
        "tútsi",
        "uabuí",
        "uaicá",
        "uaipi",
        "uaitá",
        "uaiua",
        "ualua",
        "uambé",
        "uamói",
        "uanga",
        "uanhi",
        "uaniá",
        "uapés",
        "uariá",
        "uassu",
        "uaupé",
        "uaurá",
        "uauçu",
        "uaxuá",
        "uaçaí",
        "uaíba",
        "ubaia",
        "ubari",
        "ubatã",
        "ubeba",
        "ubira",
        "ubuçu",
        "uchão",
        "ucila",
        "ucimá",
        "ucola",
        "ucubu",
        "udora",
        "ufana",
        "ufane",
        "ufano",
        "ufpel",
        "ufrgs",
        "ufrrj",
        "uiapé",
        "uiara",
        "uigur",
        "uiqué",
        "uivai",
        "uivam",
        "uivar",
        "uivas",
        "uivei",
        "uivem",
        "uives",
        "uivos",
        "uivou",
        "ujará",
        "ujica",
        "ulano",
        "uleda",
        "ulema",
        "uliia",
        "ulite",
        "ulnal",
        "ulnar",
        "uloma",
        "ulose",
        "ulrei",
        "ultor",
        "ultra",
        "uluco",
        "ulula",
        "ulule",
        "ululo",
        "umari",
        "umauá",
        "umbla",
        "umblo",
        "umbra",
        "umbro",
        "umiri",
        "unais",
        "unani",
        "undai",
        "undar",
        "ungem",
        "unges",
        "ungia",
        "ungir",
        "ungis",
        "ungiu",
        "ungui",
        "unhar",
        "unhão",
        "uniam",
        "unias",
        "unido",
        "unira",
        "unita",
        "unona",
        "untai",
        "untam",
        "untas",
        "untei",
        "untem",
        "untes",
        "untou",
        "untué",
        "unção",
        "upado",
        "upema",
        "uperu",
        "upupa",
        "uraca",
        "urago",
        "urali",
        "urato",
        "uraçu",
        "urbes",
        "urdam",
        "urdas",
        "urdem",
        "urdes",
        "urdia",
        "urdir",
        "urdis",
        "urdiu",
        "uredo",
        "ureia",
        "urgem",
        "urges",
        "urgia",
        "urgir",
        "urgiu",
        "urina",
        "urine",
        "urino",
        "urjam",
        "urose",
        "urrai",
        "urram",
        "urrar",
        "urras",
        "urrei",
        "urrem",
        "urres",
        "urros",
        "urrou",
        "urubá",
        "urumi",
        "urumã",
        "urupá",
        "urupê",
        "urutu",
        "uruxi",
        "uruçu",
        "urzal",
        "urzes",
        "usado",
        "usais",
        "usara",
        "usava",
        "useis",
        "usmar",
        "usque",
        "ussia",
        "ustir",
        "ustão",
        "utata",
        "utena",
        "utota",
        "uvada",
        "uvaia",
        "uvaça",
        "uvaçu",
        "uveal",
        "uíste",
        "vaali",
        "vacal",
        "vacar",
        "vacum",
        "vacuá",
        "vacão",
        "vades",
        "vadia",
        "vadie",
        "vadio",
        "vafro",
        "vagai",
        "vagal",
        "vagam",
        "vagas",
        "vagem",
        "vagia",
        "vagir",
        "vagis",
        "vagiu",
        "vagos",
        "vagou",
        "vague",
        "vaiai",
        "vaiam",
        "vaias",
        "vaiei",
        "vaiem",
        "vaies",
        "vaiou",
        "vaipe",
        "vaixá",
        "valar",
        "valas",
        "valdo",
        "valei",
        "valem",
        "vales",
        "valeu",
        "valgo",
        "valha",
        "valho",
        "valia",
        "valva",
        "valão",
        "vamos",
        "vampe",
        "vampi",
        "vancê",
        "vanda",
        "vante",
        "varai",
        "varam",
        "varar",
        "varas",
        "varei",
        "varem",
        "vares",
        "varga",
        "varge",
        "varia",
        "varie",
        "varig",
        "vario",
        "variz",
        "varja",
        "varoa",
        "varou",
        "varra",
        "varre",
        "varri",
        "varro",
        "varve",
        "vasca",
        "vasco",
        "vasol",
        "vassá",
        "vatel",
        "vaurá",
        "vazai",
        "vazam",
        "vazas",
        "vazei",
        "vazem",
        "vazes",
        "vazou",
        "veada",
        "veado",
        "vedai",
        "vedam",
        "vedar",
        "vedas",
        "vedei",
        "vedem",
        "vedes",
        "vedor",
        "vedou",
        "vedro",
        "veeme",
        "veiar",
        "veiga",
        "veios",
        "veiro",
        "vejam",
        "vejas",
        "velai",
        "velam",
        "velar",
        "velas",
        "velei",
        "velem",
        "veles",
        "velou",
        "vemos",
        "venal",
        "vence",
        "venci",
        "vende",
        "vendi",
        "vendo",
        "venha",
        "venho",
        "venta",
        "vente",
        "vença",
        "venço",
        "vepsa",
        "veras",
        "veraz",
        "verei",
        "verem",
        "veres",
        "verga",
        "vergê",
        "veria",
        "veril",
        "verna",
        "verno",
        "versa",
        "verse",
        "verta",
        "verte",
        "verti",
        "verto",
        "verve",
        "verça",
        "vesco",
        "vesga",
        "vesta",
        "vesti",
        "vetai",
        "vetam",
        "vetas",
        "vetei",
        "vetem",
        "vetes",
        "vetos",
        "vetou",
        "vetão",
        "vexai",
        "vexam",
        "vexar",
        "vexas",
        "vexei",
        "vexem",
        "vexes",
        "vexou",
        "vezar",
        "viado",
        "viaja",
        "viaje",
        "viajo",
        "viana",
        "vibal",
        "vibra",
        "vibre",
        "vibro",
        "vices",
        "vichi",
        "vicia",
        "vicie",
        "victo",
        "vidar",
        "vides",
        "vidra",
        "vidre",
        "vidão",
        "viela",
        "vielo",
        "viera",
        "vigar",
        "vigas",
        "viger",
        "vigia",
        "vigie",
        "vigio",
        "vigna",
        "vilar",
        "vilas",
        "vileu",
        "viloa",
        "vilta",
        "vimar",
        "vimba",
        "vimos",
        "vinca",
        "vinco",
        "vinde",
        "vindo",
        "vinga",
        "vingo",
        "vinha",
        "viole",
        "violo",
        "virai",
        "viram",
        "viras",
        "virei",
        "virem",
        "vires",
        "virga",
        "virge",
        "virgo",
        "viria",
        "viris",
        "virol",
        "virou",
        "virte",
        "virão",
        "visai",
        "visam",
        "visas",
        "visco",
        "visei",
        "visem",
        "vises",
        "visgo",
        "visom",
        "vison",
        "visos",
        "visou",
        "visse",
        "viste",
        "visto",
        "vitae",
        "vitre",
        "vitro",
        "vivam",
        "vivar",
        "vivas",
        "vivaz",
        "vivei",
        "vivem",
        "vives",
        "viveu",
        "vivia",
        "vivió",
        "viviú",
        "vixit",
        "vixnu",
        "vizir",
        "viçar",
        "viúva",
        "viúve",
        "viúvo",
        "voada",
        "voado",
        "voais",
        "voara",
        "voava",
        "voaço",
        "vodca",
        "vodka",
        "vodum",
        "voeis",
        "voejo",
        "vogar",
        "vogue",
        "vogul",
        "voile",
        "volar",
        "volta",
        "volte",
        "volto",
        "volts",
        "volva",
        "volve",
        "volvi",
        "volvo",
        "voncê",
        "vonda",
        "vosco",
        "vossa",
        "votai",
        "votam",
        "votas",
        "votei",
        "votem",
        "votes",
        "votou",
        "vouvê",
        "vovós",
        "vozão",
        "vreia",
        "vulva",
        "vunda",
        "vunje",
        "vurmo",
        "válea",
        "vátio",
        "vélea",
        "vélia",
        "vélum",
        "vério",
        "vênia",
        "vícoa",
        "vídia",
        "víeis",
        "vígil",
        "vímea",
        "vínea",
        "víneo",
        "vítex",
        "vítis",
        "vômer",
        "watts",
        "weber",
        "whist",
        "xabéu",
        "xacra",
        "xador",
        "xaile",
        "xales",
        "xalma",
        "xamãs",
        "xangó",
        "xanto",
        "xaorô",
        "xaque",
        "xarau",
        "xarda",
        "xarel",
        "xaria",
        "xarém",
        "xaréu",
        "xaual",
        "xauim",
        "xaxim",
        "xebre",
        "xelim",
        "xelma",
        "xeque",
        "xereu",
        "xerez",
        "xerga",
        "xerox",
        "xerva",
        "xerém",
        "xeura",
        "xexéu",
        "xibio",
        "xibiu",
        "xiita",
        "xilol",
        "ximbo",
        "ximbé",
        "ximão",
        "xinga",
        "xingo",
        "xintó",
        "xiraz",
        "xiris",
        "xisto",
        "xocar",
        "xogum",
        "xorca",
        "xordo",
        "xotar",
        "xuatê",
        "xucro",
        "xénon",
        "xênia",
        "xênio",
        "xífio",
        "xílon",
        "zabra",
        "zabro",
        "zacum",
        "zagal",
        "zagre",
        "zagão",
        "zaida",
        "zaimo",
        "zaina",
        "zaino",
        "zaira",
        "zaire",
        "zambi",
        "zambo",
        "zambê",
        "zanga",
        "zango",
        "zanho",
        "zanni",
        "zante",
        "zanza",
        "zanze",
        "zanzo",
        "zarca",
        "zarco",
        "zargo",
        "zarpa",
        "zarpe",
        "zarpo",
        "zarra",
        "zarro",
        "zarza",
        "zarão",
        "zavar",
        "zavra",
        "zebro",
        "zefir",
        "zegri",
        "zelai",
        "zelam",
        "zelas",
        "zelei",
        "zelem",
        "zeles",
        "zelha",
        "zelos",
        "zelou",
        "zenda",
        "zende",
        "zenir",
        "zerai",
        "zeram",
        "zeras",
        "zerbo",
        "zerei",
        "zerem",
        "zeres",
        "zeros",
        "zerou",
        "zesto",
        "zeugo",
        "zicha",
        "zicho",
        "zimbo",
        "zines",
        "zinga",
        "zinha",
        "zinho",
        "zinir",
        "zipar",
        "zirbo",
        "zirro",
        "zizia",
        "zizio",
        "zloty",
        "zoada",
        "zoado",
        "zoais",
        "zoara",
        "zoava",
        "zoeis",
        "zogue",
        "zoica",
        "zoico",
        "zoide",
        "zoilo",
        "zoina",
        "zomba",
        "zombe",
        "zombo",
        "zonai",
        "zonal",
        "zonam",
        "zonar",
        "zonei",
        "zonem",
        "zones",
        "zonou",
        "zonza",
        "zoose",
        "zorra",
        "zorro",
        "zoupo",
        "zoura",
        "zuate",
        "zuavo",
        "zucar",
        "zuche",
        "zulus",
        "zumba",
        "zumbe",
        "zumbi",
        "zumbo",
        "zunam",
        "zunar",
        "zunas",
        "zunda",
        "zunem",
        "zunes",
        "zunga",
        "zungo",
        "zungu",
        "zunhi",
        "zunia",
        "zunir",
        "zunis",
        "zuniu",
        "zupar",
        "zurpa",
        "zurra",
        "zurre",
        "zurro",
        "zuruó",
        "zuído",
        "zãibo",
        "zínia",
        "ábaco",
        "ábavo",
        "ábies",
        "ábiga",
        "ábrus",
        "ábsis",
        "ácade",
        "ácare",
        "ácave",
        "ácavo",
        "ácida",
        "ácino",
        "áclis",
        "ácope",
        "ácopo",
        "ácoro",
        "ácron",
        "áctia",
        "ádipe",
        "ádipo",
        "áfodo",
        "ágamo",
        "ágapa",
        "ágape",
        "ágaro",
        "ágata",
        "ágate",
        "ágeno",
        "ágino",
        "ágios",
        "ágono",
        "ágria",
        "águam",
        "águas",
        "águes",
        "álalo",
        "álamo",
        "álcea",
        "álemo",
        "álhia",
        "álica",
        "álife",
        "álpea",
        "álula",
        "álveo",
        "ápage",
        "ápios",
        "ápira",
        "ápiro",
        "ápoca",
        "ápode",
        "áporo",
        "ápoto",
        "áqueo",
        "árcio",
        "árdea",
        "árgio",
        "árgon",
        "árias",
        "árida",
        "ársis",
        "árula",
        "ásaro",
        "áscio",
        "áscon",
        "áscua",
        "áspis",
        "áster",
        "ástur",
        "átele",
        "átila",
        "átimo",
        "átipo",
        "átona",
        "átono",
        "átrio",
        "áurea",
        "ávida",
        "ávila",
        "áxilo",
        "áxone",
        "ázigo",
        "ázimo",
        "âmnio",
        "ânion",
        "ânodo",
        "ébano",
        "ébeno",
        "ébulo",
        "écano",
        "écope",
        "écran",
        "écula",
        "éculo",
        "édico",
        "édipo",
        "éfeta",
        "éfira",
        "éfode",
        "éfodo",
        "éforo",
        "égide",
        "égrio",
        "éguas",
        "élafo",
        "élate",
        "énula",
        "épica",
        "épura",
        "équio",
        "érbio",
        "érebo",
        "éreis",
        "érgio",
        "érica",
        "érico",
        "érina",
        "ésipo",
        "ésoce",
        "ésula",
        "étego",
        "étigo",
        "étimo",
        "évano",
        "êider",
        "êmero",
        "êmese",
        "êmico",
        "êmulo",
        "êxule",
        "íamos",
        "ícaro",
        "ícore",
        "íctis",
        "íctus",
        "ídola",
        "ígneo",
        "íleon",
        "ílion",
        "ímpia",
        "ímpio",
        "ínaco",
        "índia",
        "índri",
        "índua",
        "íngua",
        "ínion",
        "ínsua",
        "ínubo",
        "ínula",
        "ínvio",
        "ísate",
        "ítaca",
        "ítalo",
        "ítria",
        "ítrio",
        "óbelo",
        "óbice",
        "óbito",
        "óbolo",
        "óbulo",
        "óbvia",
        "ócimo",
        "ócrea",
        "óculo",
        "ódios",
        "ófrio",
        "ófris",
        "óleos",
        "óleum",
        "ómnia",
        "ópalo",
        "ópido",
        "órfia",
        "órfãs",
        "órgio",
        "ósido",
        "ósmio",
        "óstio",
        "óvalo",
        "óvano",
        "óvnis",
        "úbere",
        "úbero",
        "úmero",
        "úmida",
        "úncia",
        "úncus",
        "úngue",
        "únsia",
        "úraco",
        "úrano",
        "úrceo",
        "úrico",
        "úropo",
        "úsnea",
        "úvico",
        "úvido",
        "úvula",
    ]),
    Yf = {
        abaca: "abacá",
        abara: "abará",
        abare: "abaré",
        abebe: "abebé",
        abece: "abecê",
        abede: "abedê",
        abico: "abicô",
        abobo: "abobó",
        abofe: "abofé",
        aboco: "aboço",
        abuxo: "abuxó",
        acaja: "acajá",
        acara: "acará",
        acaua: "acauã",
        acaca: "acaçá",
        acaem: "acaém",
        acola: "acolá",
        acona: "aconá",
        acroa: "acroá",
        acreu: "acréu",
        acuma: "acumã",
        acure: "acuré",
        adixa: "adixá",
        adoga: "adogã",
        adoca: "adoça",
        adoco: "adoço",
        advem: "advém",
        adion: "adíon",
        afefe: "afefé",
        afega: "afegã",
        afoxe: "afoxé",
        afura: "afurá",
        agace: "agacé",
        agada: "agadá",
        agare: "agaré",
        agogo: "agogô",
        agrao: "agrão",
        agrem: "agrém",
        aguai: "aguaí",
        aguca: "aguça",
        aguco: "aguço",
        aiara: "aiará",
        aiaca: "aiaçá",
        aioca: "aiocá",
        airao: "airão",
        aitao: "aitão",
        aiuca: "aiucá",
        aiuiu: "aiuiú",
        aivao: "aivão",
        ajabo: "ajabó",
        ajapa: "ajapá",
        ajara: "ajará",
        ajare: "ajaré",
        ajobo: "ajobó",
        ajupa: "ajupá",
        alaba: "alabá",
        alabe: "alabê",
        alafe: "alafé",
        alala: "alalá",
        alboi: "albói",
        aldea: "aldeã",
        alema: "alemã",
        alias: "aliás",
        alode: "alodê",
        aloes: "aloés",
        alpao: "alpão",
        altea: "alteá",
        alufa: "alufá",
        aluja: "alujá",
        alvao: "alvão",
        alcai: "alçai",
        alcam: "alçam",
        alcar: "alçar",
        alcas: "alças",
        alcou: "alçou",
        alcuz: "alçuz",
        amala: "amalá",
        amana: "amaná",
        amapa: "amapá",
        ambua: "ambuá",
        ambui: "ambuí",
        ambao: "ambão",
        amele: "amelê",
        ameca: "ameça",
        amore: "amoré",
        amure: "amurê",
        anaca: "anacã",
        anace: "anacé",
        anaia: "anaiá",
        anaja: "anajá",
        anaje: "anajé",
        anana: "ananá",
        anaue: "anauê",
        ancia: "anciã",
        angau: "angaú",
        aniao: "anião",
        anjao: "anjão",
        antao: "antão",
        anuai: "anuaí",
        anuja: "anujá",
        anuia: "anuía",
        anaos: "anãos",
        aneis: "anéis",
        anoes: "anões",
        apapa: "apapá",
        apiao: "apião",
        aprea: "apreá",
        aquem: "aquém",
        araba: "arabá",
        araia: "araiá",
        araio: "araió",
        araiu: "araiú",
        arama: "aramã",
        arata: "aratá",
        araue: "araué",
        araxa: "araxá",
        araca: "araçá",
        arede: "aredê",
        arere: "arerê",
        areao: "areão",
        argao: "argão",
        aribe: "aribé",
        arica: "aricá",
        arico: "aricó",
        arigo: "arigó",
        arima: "arimã",
        arina: "ariná",
        arita: "aritá",
        arjao: "arjão",
        armao: "armão",
        armeu: "arméu",
        arnes: "arnês",
        aroca: "arocá",
        arpao: "arpão",
        arpeu: "arpéu",
        arrua: "arruá",
        artao: "artão",
        aruai: "aruaí",
        arube: "arubé",
        aruma: "arumã",
        arura: "arurá",
        arcao: "arção",
        areus: "aréus",
        assua: "assuã",
        atala: "atalá",
        atare: "atarê",
        atera: "aterá",
        atica: "atiça",
        aticu: "atiçu",
        atoba: "atobá",
        atoto: "atotô",
        atras: "atrás",
        atens: "aténs",
        atois: "atóis",
        auacu: "auaçu",
        aucao: "aução",
        avare: "avaré",
        avela: "avelã",
        aveao: "aveão",
        avira: "avirá",
        aviao: "avião",
        avens: "avéns",
        axabo: "axabó",
        axexe: "axexê",
        axoxo: "axoxô",
        azala: "azalá",
        azibo: "azibó",
        acacu: "açacu",
        acala: "açalá",
        acame: "açame",
        acamo: "açamo",
        acuba: "açubá",
        acude: "açude",
        aculo: "açulo",
        acumi: "açumi",
        acoes: "ações",
        aerea: "aérea",
        aereo: "aéreo",
        aioli: "aïoli",
        aonio: "aônio",
        auste: "aúste",
        babui: "babuí",
        babao: "babão",
        badem: "badém",
        baena: "baenã",
        bagua: "baguá",
        baiao: "baião",
        balao: "balão",
        balca: "balça",
        bambe: "bambê",
        banta: "bantá",
        banze: "banzé",
        baoba: "baobá",
        barau: "baraú",
        barre: "barré",
        barao: "barão",
        barem: "barém",
        basse: "bassê",
        batao: "batão",
        baume: "baumê",
        baira: "baíra",
        baule: "baúle",
        bauna: "baúna",
        beaba: "beabá",
        bebes: "bebês",
        bedui: "beduí",
        bedem: "bedém",
        beica: "beiça",
        beico: "beiço",
        belao: "belão",
        bembe: "bembé",
        bende: "bendé",
        benca: "bença",
        beroe: "beroé",
        berca: "berça",
        berco: "berço",
        bereu: "beréu",
        beros: "berós",
        betao: "betão",
        bibio: "bibió",
        bibla: "biblá",
        biboi: "bibói",
        bicao: "bicão",
        bidao: "bidão",
        bigua: "biguá",
        bijui: "bijuí",
        bilho: "bilhó",
        biniu: "biniú",
        birma: "birmã",
        bisao: "bisão",
        biura: "biurá",
        blase: "blasé",
        bobao: "bobão",
        bocue: "bocué",
        bocao: "bocão",
        boime: "boimé",
        boiao: "boião",
        boica: "boiça",
        boicu: "boiçu",
        bojui: "bojuí",
        bolho: "bolhó",
        bolao: "bolão",
        boleu: "boléu",
        bongo: "bongô",
        bones: "bonés",
        bosao: "bosão",
        botao: "botão",
        bouca: "bouça",
        bouco: "bouço",
        braca: "braça",
        braco: "braço",
        breta: "bretã",
        bruaa: "bruaá",
        brion: "bríon",
        bubao: "bubão",
        bucui: "bucuí",
        bufao: "bufão",
        bujao: "bujão",
        buque: "buquê",
        burco: "burço",
        butia: "butiá",
        buido: "buído",
        builo: "buílo",
        badur: "bádur",
        bafer: "báfer",
        bafia: "báfia",
        bagoa: "bágoa",
        bario: "bário",
        basio: "básio",
        basis: "básis",
        batis: "bátis",
        bambi: "bâmbi",
        becua: "bécua",
        belis: "bélis",
        betel: "bétel",
        betis: "bétis",
        biduo: "bíduo",
        bilis: "bílis",
        biter: "bíter",
        bivio: "bívio",
        bocio: "bócio",
        bofia: "bófia",
        borax: "bórax",
        boson: "bóson",
        boton: "bóton",
        boxer: "bóxer",
        bonus: "bônus",
        buteo: "búteo",
        butio: "bútio",
        buzio: "búzio",
        caaco: "caacó",
        caaee: "caaeé",
        caacu: "caaçu",
        cabau: "cabaú",
        cabiu: "cabiú",
        caete: "caeté",
        cafes: "cafés",
        cagoa: "cagoã",
        cagao: "cagão",
        caico: "caicó",
        caira: "cairá",
        caire: "cairé",
        caite: "caité",
        caicu: "caiçu",
        caica: "caiçá",
        cajua: "cajuá",
        cajui: "cajuí",
        cajas: "cajás",
        cajao: "cajão",
        calao: "calão",
        calca: "calça",
        calco: "calço",
        camaa: "camaá",
        campe: "campé",
        camua: "camuá",
        camao: "camão",
        canca: "cancã",
        canoe: "canoé",
        canza: "canzá",
        capia: "capiá",
        capao: "capão",
        carii: "carií",
        cariu: "cariú",
        caroa: "caroá",
        caroe: "caroé",
        carre: "carrê",
        carua: "caruá",
        carao: "carão",
        careu: "caréu",
        casba: "casbá",
        casao: "casão",
        catua: "catuá",
        catao: "catão",
        cauma: "caumã",
        caure: "cauré",
        cavao: "cavão",
        cacai: "caçai",
        cacam: "caçam",
        cacar: "caçar",
        cacas: "caças",
        cacoa: "caçoa",
        cacoe: "caçoe",
        cacoo: "caçoo",
        cacou: "caçou",
        cacua: "caçuá",
        cacao: "cação",
        caida: "caída",
        caido: "caído",
        caiva: "caíva",
        cauba: "caúba",
        cauno: "caúno",
        ceara: "ceará",
        cecem: "cecém",
        cevao: "cevão",
        chaba: "chabã",
        chabo: "chabó",
        chaja: "chajá",
        chale: "chalé",
        chate: "chaté",
        chaua: "chauá",
        chaca: "chaça",
        chaem: "chaém",
        chebe: "chebê",
        cheva: "chevá",
        chibe: "chibé",
        chino: "chinó",
        chiao: "chião",
        chogo: "chogó",
        chone: "choné",
        chule: "chulé",
        chuco: "chuço",
        chues: "chués",
        chaos: "chãos",
        cidro: "cidró",
        cipos: "cipós",
        cisao: "cisão",
        ciume: "ciúme",
        ciuro: "ciúro",
        coata: "coatá",
        cocao: "cocão",
        cofio: "cofió",
        coine: "coiné",
        coite: "coité",
        comao: "comão",
        corao: "corão",
        corca: "corça",
        corco: "corço",
        cotao: "cotão",
        coupe: "coupé",
        couca: "couça",
        covoa: "covoá",
        covao: "covão",
        coxao: "coxão",
        cocai: "coçai",
        cocam: "coçam",
        cocar: "coçar",
        cocas: "coças",
        cocou: "coçou",
        coiba: "coíba",
        coibe: "coíbe",
        coibo: "coíbo",
        crapo: "crapô",
        craua: "crauá",
        creie: "creié",
        creje: "crejé",
        croca: "croça",
        cuata: "cuatá",
        cubie: "cubié",
        cubiu: "cubiú",
        cuche: "cuchê",
        cuipe: "cuipé",
        cuita: "cuitá",
        cuite: "cuité",
        cuito: "cuitó",
        cuiao: "cuião",
        cumai: "cumaí",
        cupai: "cupaí",
        cupao: "cupão",
        curio: "curió",
        curua: "curuá",
        curao: "curão",
        cuxiu: "cuxiú",
        cuica: "cuíca",
        cuira: "cuíra",
        cacea: "cácea",
        cadis: "cádis",
        calix: "cálix",
        capea: "cápea",
        carie: "cárie",
        carus: "cárus",
        cavea: "cávea",
        cavia: "cávia",
        candi: "cândi",
        canon: "cânon",
        cebus: "cébus",
        cecum: "cécum",
        celio: "célio",
        ceomo: "céomo",
        cereo: "céreo",
        cerio: "cério",
        cesar: "césar",
        cesio: "césio",
        ciamo: "cíamo",
        cilio: "cílio",
        cirio: "círio",
        civel: "cível",
        coana: "cóana",
        coano: "cóano",
        cobio: "cóbio",
        codeo: "códeo",
        codex: "códex",
        codio: "códio",
        codon: "códon",
        codao: "códão",
        cofea: "cófea",
        cogia: "cógia",
        coleo: "cóleo",
        colio: "cólio",
        colon: "cólon",
        copia: "cópia",
        corio: "cório",
        codea: "côdea",
        cubio: "cúbio",
        cucio: "cúcio",
        cufea: "cúfea",
        cufia: "cúfia",
        culex: "cúlex",
        cumel: "cúmel",
        cumis: "cúmis",
        cuneo: "cúneo",
        cunia: "cúnia",
        curia: "cúria",
        cuter: "cúter",
        cutis: "cútis",
        daiao: "daião",
        dalem: "dalém",
        danca: "dança",
        danco: "danço",
        daras: "darás",
        darao: "darão",
        dacao: "dação",
        dedao: "dedão",
        dedeu: "dedéu",
        demao: "demão",
        dende: "dendê",
        depos: "depós",
        depoe: "depõe",
        desca: "desça",
        desco: "desço",
        detem: "detém",
        dirra: "dirrã",
        diras: "dirás",
        dirao: "dirão",
        direm: "dirém",
        dicao: "dição",
        diula: "diúla",
        docem: "docém",
        dodoi: "dodói",
        dozao: "dozão",
        docal: "doçal",
        docar: "doçar",
        doiam: "doíam",
        doias: "doías",
        drape: "drapê",
        drica: "driça",
        druva: "druvá",
        duble: "dublê",
        dugao: "dugão",
        durga: "durgá",
        durao: "durão",
        duita: "duíta",
        dacio: "dácio",
        dalia: "dália",
        damar: "dâmar",
        danae: "dânae",
        dandi: "dândi",
        danio: "dânio",
        debil: "débil",
        debut: "début",
        decor: "décor",
        delia: "délia",
        delio: "délio",
        derbi: "dérbi",
        devio: "dévio",
        diada: "díada",
        diade: "díade",
        didia: "dídia",
        difia: "dífia",
        dinio: "dínio",
        diope: "díope",
        dixis: "díxis",
        docil: "dócil",
        dolar: "dólar",
        dolma: "dólmã",
        doria: "dória",
        dorio: "dório",
        doris: "dóris",
        dubia: "dúbia",
        dubio: "dúbio",
        durio: "dúrio",
        duzia: "dúzia",
        edere: "ederé",
        egipa: "egipã",
        eiros: "eirós",
        eicar: "eiçar",
        elafa: "elafá",
        eleda: "eledá",
        elede: "eledê",
        elepe: "elepê",
        eleis: "eléis",
        embai: "embaí",
        embia: "embiá",
        embiu: "embiú",
        emboa: "emboá",
        embua: "embuá",
        embui: "embuí",
        empos: "empós",
        encho: "enchó",
        entao: "então",
        enves: "envés",
        enxui: "enxuí",
        enxos: "enxós",
        eoipo: "eoípo",
        epoxi: "epóxi",
        erama: "eramá",
        ervao: "ervão",
        esere: "eserê",
        estao: "estão",
        esvao: "esvão",
        evase: "evasê",
        expos: "expôs",
        expoe: "expõe",
        eolia: "eólia",
        eolio: "eólio",
        facao: "facão",
        faiao: "faião",
        fanao: "fanão",
        farao: "faraó",
        faras: "farás",
        fatao: "fatão",
        facam: "façam",
        faula: "faúla",
        feiao: "feião",
        feleu: "feléu",
        feofo: "feofó",
        ficao: "ficão",
        fideu: "fidéu",
        filao: "filão",
        fines: "finês",
        fiofo: "fiofó",
        fitao: "fitão",
        fieis: "fiéis",
        fiusa: "fiúsa",
        fiuza: "fiúza",
        floso: "flosô",
        flozo: "flozô",
        fluia: "fluía",
        fluor: "flúor",
        flute: "flûte",
        fofao: "fofão",
        fogao: "fogão",
        folao: "folão",
        forro: "forró",
        forca: "força",
        forco: "forço",
        fotao: "fotão",
        focao: "foção",
        frape: "frapê",
        fruia: "fruía",
        fujao: "fujão",
        fulao: "fulão",
        fumao: "fumão",
        funeu: "funéu",
        furao: "furão",
        fusao: "fusão",
        fuzue: "fuzuê",
        fucai: "fuçai",
        fucam: "fuçam",
        fucar: "fuçar",
        fucas: "fuças",
        fucou: "fuçou",
        fabia: "fábia",
        facil: "fácil",
        falum: "fálum",
        falus: "fálus",
        fasia: "fásia",
        fatuo: "fátuo",
        fanio: "fânio",
        fanti: "fânti",
        fecio: "fécio",
        feleo: "féleo",
        felis: "félis",
        femea: "fêmea",
        femeo: "fêmeo",
        femur: "fêmur",
        fenix: "fênix",
        fetao: "fêtão",
        fiala: "fíala",
        ficea: "fícea",
        ficeo: "fíceo",
        ficis: "fícis",
        ficus: "fícus",
        fidia: "fídia",
        fifia: "fífia",
        filer: "fíler",
        focio: "fócio",
        fodia: "fódia",
        folio: "fólio",
        folis: "fólis",
        forum: "fórum",
        foton: "fóton",
        fovea: "fóvea",
        fonon: "fônon",
        fucea: "fúcea",
        fufia: "fúfia",
        fufio: "fúfio",
        fumeo: "fúmeo",
        furia: "fúria",
        fusel: "fúsel",
        fusil: "fúsil",
        futil: "fútil",
        gabao: "gabão",
        gabeu: "gabéu",
        gadao: "gadão",
        gafem: "gafém",
        gagao: "gagão",
        gajao: "gajão",
        galao: "galão",
        gamba: "gambá",
        gamao: "gamão",
        ganze: "ganzé",
        ganca: "gança",
        ganco: "ganço",
        ganes: "ganês",
        garao: "garão",
        garca: "garça",
        garco: "garço",
        gatao: "gatão",
        gaudo: "gaudó",
        gazao: "gazão",
        gerem: "gerém",
        gibao: "gibão",
        gicle: "giclê",
        gicao: "gicão",
        girao: "girão",
        glace: "glacê",
        gluao: "gluão",
        gluon: "glúon",
        godao: "godão",
        goias: "goiás",
        gombo: "gombô",
        gozao: "gozão",
        graca: "graça",
        grejo: "grejó",
        grena: "grená",
        grijo: "grijó",
        grolo: "groló",
        graos: "grãos",
        guaca: "guacá",
        guaiu: "guaiú",
        guaja: "guajá",
        guana: "guaná",
        guara: "guará",
        guato: "guató",
        guacu: "guaçu",
        guede: "guedé",
        guiba: "guibá",
        guigo: "guigó",
        guine: "guiné",
        guipa: "guipá",
        guiao: "guião",
        guico: "guiço",
        gabia: "gábia",
        gabio: "gábio",
        gafio: "gáfio",
        galax: "gálax",
        galea: "gálea",
        galia: "gália",
        galio: "gálio",
        gavea: "gávea",
        gazeo: "gázeo",
        gazio: "gázio",
        gamia: "gâmia",
        gemea: "gêmea",
        gemeo: "gêmeo",
        genio: "gênio",
        gigia: "gígia",
        gilia: "gília",
        giria: "gíria",
        girio: "gírio",
        gobio: "góbio",
        godia: "gódia",
        gonio: "gônio",
        gonis: "gônis",
        habes: "habés",
        harem: "harém",
        hauca: "hauçá",
        hereu: "heréu",
        heroi: "herói",
        holao: "holão",
        homao: "homão",
        horra: "horrá",
        habil: "hábil",
        haden: "háden",
        halux: "hálux",
        hapax: "hápax",
        helas: "hélas",
        helia: "hélia",
        helio: "hélio",
        helix: "hélix",
        hepia: "hépia",
        hevea: "hévea",
        hiala: "híala",
        hifen: "hífen",
        himen: "hímen",
        hindi: "híndi",
        hovea: "hóvea",
        humil: "húmil",
        humus: "húmus",
        iagua: "iaguá",
        iansa: "iansã",
        iatai: "iataí",
        ibaro: "ibaró",
        icacu: "icaçu",
        ichao: "ichão",
        icipo: "icipó",
        ideia: "idéia",
        igapo: "igapó",
        igupa: "igupá",
        iiaba: "iiabá",
        ijexa: "ijexá",
        ilheu: "ilhéu",
        ilhos: "ilhós",
        imbui: "imbuí",
        impos: "impôs",
        impoe: "impõe",
        inaia: "inaiá",
        inaja: "inajá",
        inaje: "inajé",
        ingai: "ingaí",
        inves: "invés",
        incar: "inçar",
        ipete: "ipetê",
        iracu: "iraçu",
        irere: "irerê",
        irira: "irirá",
        irmao: "irmão",
        irmas: "irmãs",
        irucu: "iruçu",
        islao: "islão",
        itaua: "itauá",
        iudja: "iudjá",
        icado: "içado",
        icais: "içais",
        icara: "içara",
        icava: "içava",
        iotio: "iótio",
        ionio: "iônio",
        jabao: "jabão",
        jacui: "jacuí",
        jaico: "jaicó",
        jalao: "jalão",
        jambe: "jambé",
        janau: "janaú",
        japue: "japué",
        japui: "japuí",
        japao: "japão",
        jatai: "jataí",
        javae: "javaé",
        jeico: "jeicó",
        jembe: "jembê",
        jemia: "jemiá",
        jeova: "jeová",
        jepia: "jepiá",
        jepio: "jepió",
        jetai: "jetaí",
        jicao: "jicão",
        jipao: "jipão",
        jiroe: "jiroé",
        jicui: "jiçui",
        jogao: "jogão",
        joica: "joiça",
        jouca: "jouça",
        jocal: "joçal",
        joiba: "joíba",
        jubai: "jubaí",
        jubao: "jubão",
        junca: "junça",
        jupia: "jupiá",
        jupua: "jupuá",
        jupao: "jupão",
        jurao: "jurão",
        jusao: "jusão",
        jutai: "jutaí",
        juiza: "juíza",
        juizo: "juízo",
        jacea: "jácea",
        japix: "jápix",
        joias: "jóias",
        jonia: "jônia",
        jonio: "jônio",
        juvia: "júvia",
        labeu: "labéu",
        ladao: "ladão",
        lagao: "lagão",
        lajao: "lajão",
        lando: "landó",
        lanca: "lança",
        lanco: "lanço",
        lapia: "lapiá",
        lapao: "lapão",
        laque: "laquê",
        lareu: "laréu",
        latao: "latão",
        laule: "laulé",
        lazao: "lazão",
        lacai: "laçai",
        lacam: "laçam",
        lacar: "laçar",
        lacas: "laças",
        lacos: "laços",
        lacou: "laçou",
        lacao: "lação",
        lauza: "laúza",
        legao: "legão",
        lenao: "lenão",
        lenco: "lenço",
        lerue: "leruê",
        lerao: "lerão",
        lesao: "lesão",
        letao: "letão",
        leoes: "leões",
        liaca: "liaça",
        libre: "libré",
        lilas: "lilás",
        limao: "limão",
        lirao: "lirão",
        litao: "litão",
        lixao: "lixão",
        licao: "lição",
        lobao: "lobão",
        loica: "loiça",
        locao: "loção",
        lucha: "luchã",
        lucao: "lucão",
        lulao: "lulão",
        luzie: "luziê",
        luina: "luína",
        labia: "lábia",
        labil: "lábil",
        labio: "lábio",
        lacio: "lácio",
        lacon: "lácon",
        lajea: "lájea",
        lapis: "lápis",
        laria: "lária",
        larix: "lárix",
        lasia: "lásia",
        lateo: "láteo",
        latex: "látex",
        lamia: "lâmia",
        lamio: "lâmio",
        laneo: "lâneo",
        lanio: "lânio",
        legua: "légua",
        lelia: "lélia",
        lepis: "lépis",
        lexis: "léxis",
        lemur: "lêmur",
        leneo: "lêneo",
        liber: "líber",
        libio: "líbio",
        licia: "lícia",
        licio: "lício",
        lider: "líder",
        lidio: "lídio",
        lieis: "líeis",
        ligeo: "lígeo",
        ligio: "lígio",
        lilio: "lílio",
        lineo: "líneo",
        liria: "líria",
        lirio: "lírio",
        lisio: "lísio",
        litia: "lítia",
        litio: "lítio",
        lituo: "lítuo",
        livia: "lívia",
        locus: "lócus",
        lodao: "lódão",
        lofio: "lófio",
        logea: "lógea",
        lolio: "lólio",
        loris: "lóris",
        losia: "lósia",
        lotus: "lótus",
        loxia: "lóxia",
        lucio: "lúcio",
        ludio: "lúdio",
        lupia: "lúpia",
        lupus: "lúpus",
        luria: "lúria",
        luteo: "lúteo",
        mabiu: "mabiú",
        macaa: "macaá",
        macae: "macaé",
        mache: "machê",
        mafau: "mafaú",
        magne: "magné",
        maina: "mainá",
        maiao: "maião",
        mamae: "mamãe",
        mamao: "mamão",
        manai: "manaí",
        manha: "manhã",
        mante: "mantê",
        manue: "manuê",
        mapua: "mapuá",
        mapao: "mapão",
        marua: "maruá",
        marui: "maruí",
        marao: "marão",
        matse: "matsé",
        matao: "matão",
        mateu: "matéu",
        maues: "maués",
        mauis: "mauís",
        macal: "maçal",
        macar: "maçar",
        macom: "maçom",
        macos: "maços",
        macao: "mação",
        macas: "maçãs",
        maira: "maíra",
        maica: "maíça",
        mauba: "maúba",
        maujo: "maújo",
        meaca: "meaça",
        meiao: "meião",
        melao: "melão",
        membe: "membé",
        merce: "mercê",
        merio: "merió",
        merui: "meruí",
        mesao: "mesão",
        metie: "metiê",
        mexao: "mexão",
        mecam: "meçam",
        mecas: "meças",
        meule: "meúle",
        miche: "michê",
        mijui: "mijuí",
        mijao: "mijão",
        mirza: "mirzá",
        mirao: "mirão",
        misso: "missô",
        mixio: "mixió",
        mixna: "mixná",
        miuda: "miúda",
        miude: "miúde",
        miudo: "miúdo",
        miufa: "miúfa",
        miulo: "miúlo",
        miura: "miúra",
        miuro: "miúro",
        miuva: "miúva",
        miuca: "miúça",
        mocui: "mocuí",
        mogao: "mogão",
        moire: "moiré",
        moiao: "moião",
        monde: "mondé",
        monhe: "monhé",
        morao: "morão",
        mosba: "mosbá",
        moadi: "moádi",
        mocas: "moças",
        mocos: "moços",
        mocao: "moção",
        moiam: "moíam",
        moias: "moías",
        moida: "moída",
        moido: "moído",
        mucui: "mucuí",
        mufui: "mufuí",
        mumbe: "mumbé",
        munde: "mundé",
        murui: "muruí",
        murza: "murzá",
        murca: "murça",
        musme: "musmé",
        musso: "mussó",
        muviu: "muviú",
        muari: "muári",
        mucum: "muçum",
        macea: "mácea",
        madia: "mádia",
        mafia: "máfia",
        magis: "mágis",
        magoa: "mágoa",
        maroo: "mároo",
        matri: "mátri",
        mavia: "mávia",
        mecia: "mécia",
        media: "média",
        medio: "médio",
        medao: "médão",
        meleo: "méleo",
        melia: "mélia",
        meloe: "méloe",
        mesio: "mésio",
        meson: "méson",
        mesua: "mésua",
        micio: "mício",
        midia: "mídia",
        mileo: "míleo",
        minio: "mínio",
        miope: "míope",
        miris: "míris",
        mobil: "móbil",
        modio: "módio",
        molio: "mólio",
        moqua: "móqua",
        movel: "móvel",
        mucua: "múcua",
        mugil: "múgil",
        muleo: "múleo",
        mumia: "múmia",
        mundi: "múndi",
        munus: "múnus",
        murex: "múrex",
        muria: "múria",
        mutua: "mútua",
        mutuo: "mútuo",
        muzua: "múzua",
        musli: "müsli",
        nagao: "nagão",
        nanos: "nanós",
        nasca: "nasça",
        nasco: "nasço",
        navao: "navaó",
        nacao: "nação",
        negao: "negão",
        nenem: "neném",
        nevao: "nevão",
        niboe: "niboé",
        nifao: "nifão",
        nilgo: "nilgó",
        niopo: "niopó",
        nipao: "nipão",
        nogao: "nogão",
        nomea: "nomeá",
        norca: "norça",
        nocao: "noção",
        nucao: "nução",
        nabao: "nábão",
        nacar: "nácar",
        nagua: "nágua",
        nasio: "násio",
        nassi: "nássi",
        nasua: "násua",
        natia: "nátia",
        navia: "návia",
        naxia: "náxia",
        naxio: "náxio",
        nazir: "názir",
        negre: "nègre",
        nebel: "nébel",
        nedio: "nédio",
        nelia: "nélia",
        neons: "néons",
        neper: "néper",
        nepia: "népia",
        neria: "néria",
        nerio: "nério",
        nevoa: "névoa",
        nenia: "nênia",
        nenio: "nênio",
        niger: "níger",
        nigua: "nígua",
        nilio: "nílio",
        nimio: "nímio",
        niton: "níton",
        nivel: "nível",
        niveo: "níveo",
        nodio: "nódio",
        nodoa: "nódoa",
        noias: "nóias",
        nomos: "nómos",
        noria: "nória",
        norio: "nório",
        novea: "nóvea",
        noxio: "nóxio",
        nonio: "nônio",
        nubil: "núbil",
        nubio: "núbio",
        nucio: "núcio",
        nufar: "núfar",
        numen: "númen",
        nuveo: "núveo",
        nuxia: "núxia",
        obtem: "obtém",
        obvem: "obvém",
        odeao: "odeão",
        odeon: "odéon",
        ofaie: "ofaié",
        oitao: "oitão",
        oicam: "oiçam",
        olare: "olaré",
        olhao: "olhão",
        omala: "omalá",
        ombra: "ombrã",
        omele: "omelê",
        onfua: "onfuá",
        oncas: "onças",
        opora: "oporá",
        opcao: "opção",
        opoem: "opõem",
        opoes: "opões",
        oquea: "oqueá",
        orixa: "orixá",
        orlea: "orleã",
        orobo: "orobó",
        oruco: "orucó",
        orcai: "orçai",
        orcam: "orçam",
        orcar: "orçar",
        orcaz: "orçaz",
        orcou: "orçou",
        ototo: "ototó",
        ourem: "ourém",
        outao: "outão",
        oucam: "ouçam",
        oucas: "ouças",
        oucao: "oução",
        oxala: "oxalá",
        oasis: "oásis",
        ocaim: "oçãim",
        oidio: "oídio",
        pacai: "pacaí",
        pacha: "pachã",
        pacao: "pacão",
        pades: "padês",
        paete: "paetê",
        pagao: "pagão",
        paiao: "paião",
        pajeu: "pajeú",
        pajao: "pajão",
        pajes: "pajés",
        palao: "palão",
        pamoa: "pamoá",
        panro: "panró",
        panto: "pantó",
        panao: "panão",
        papao: "papão",
        paqua: "paquã",
        paque: "paquê",
        parne: "parné",
        parui: "paruí",
        parao: "parão",
        patai: "pataí",
        patoa: "patoá",
        patua: "patuá",
        patao: "patão",
        patem: "patém",
        pates: "patês",
        pavao: "pavão",
        paves: "pavês",
        paxau: "paxaú",
        pazao: "pazão",
        pacos: "paços",
        paiba: "paíba",
        pauna: "paúna",
        paura: "paúra",
        peaca: "peaça",
        pecem: "pecém",
        pegao: "pegão",
        pelao: "pelão",
        pelem: "pelém",
        pengo: "pengó",
        penao: "penão",
        perea: "pereá",
        perne: "perné",
        peroa: "peroá",
        petia: "petiá",
        petiu: "petiú",
        petao: "petão",
        petem: "petém",
        pexao: "pexão",
        pezao: "pezão",
        pecam: "peçam",
        pecas: "peças",
        peoes: "peões",
        peuco: "peúco",
        peuga: "peúga",
        peule: "peúle",
        peuva: "peúva",
        piafe: "piafé",
        piape: "piapé",
        piaui: "piauí",
        piaca: "piaçá",
        piaco: "piaçó",
        picau: "picaú",
        picua: "picuá",
        picui: "picuí",
        picao: "picão",
        pidao: "pidão",
        pifao: "pifão",
        pilao: "pilão",
        pileu: "piléu",
        pinhe: "pinhé",
        pinca: "pinça",
        pinco: "pinço",
        pineu: "pinéu",
        pioie: "pioié",
        pioro: "pioró",
        pirai: "piraí",
        pirau: "piraú",
        piroa: "piroá",
        pirua: "piruá",
        pirao: "pirão",
        pisao: "pisão",
        pitiu: "pitiú",
        pitua: "pituã",
        pitui: "pituí",
        pitao: "pitão",
        pitem: "pitém",
        piteu: "pitéu",
        pivos: "pivôs",
        pixua: "pixuá",
        pixeu: "pixéu",
        pioes: "piões",
        piuba: "piúba",
        piuca: "piúca",
        piugo: "piúgo",
        piuna: "piúna",
        piuva: "piúva",
        place: "placê",
        plato: "platô",
        poacu: "poaçu",
        podao: "podão",
        podoi: "podói",
        polea: "poleá",
        poles: "polés",
        ponca: "poncã",
        ponco: "poncó",
        pongo: "pongó",
        ponje: "ponjé",
        popia: "popiã",
        popao: "popão",
        poras: "porás",
        porao: "porão",
        porem: "porém",
        povao: "povão",
        pocal: "poçal",
        pocas: "poças",
        pocos: "poços",
        pocao: "poção",
        praja: "prajá",
        praca: "praça",
        preve: "prevê",
        preco: "preço",
        priao: "prião",
        proca: "procá",
        preon: "préon",
        prion: "príon",
        puaco: "puaço",
        puacu: "puaçu",
        pucto: "puctó",
        pulao: "pulão",
        punde: "pundé",
        purui: "puruí",
        puvia: "puviá",
        puxao: "puxão",
        puiam: "puíam",
        puias: "puías",
        puido: "puído",
        puira: "puíra",
        puita: "puíta",
        padoa: "pádoa",
        padua: "pádua",
        pafia: "páfia",
        pafio: "páfio",
        palea: "pálea",
        parea: "párea",
        pareo: "páreo",
        pario: "pário",
        parsi: "pársi",
        pateo: "páteo",
        pater: "páter",
        patio: "pátio",
        panax: "pânax",
        panus: "pânus",
        pelio: "pélio",
        peone: "péone",
        pepia: "pépia",
        penis: "pênis",
        picea: "pícea",
        piceo: "píceo",
        piero: "píero",
        pifio: "pífio",
        pijin: "píjin",
        pileo: "píleo",
        pineo: "píneo",
        pinus: "pínus",
        piper: "píper",
        piqua: "píqua",
        piseo: "píseo",
        pisin: "písin",
        pitia: "pítia",
        pitio: "pítio",
        piton: "píton",
        podex: "pódex",
        podio: "pódio",
        polen: "pólen",
        polex: "pólex",
        polio: "pólio",
        polis: "pólis",
        polux: "pólux",
        porio: "pório",
        potea: "pótea",
        povoa: "póvoa",
        ponei: "pônei",
        pubis: "púbis",
        pugil: "púgil",
        pulex: "púlex",
        quale: "qualé",
        quaro: "quaró",
        quata: "quatá",
        quece: "quecé",
        quele: "quelé",
        quere: "querê",
        quice: "quicé",
        quime: "quimé",
        quipa: "quipá",
        quipe: "quipé",
        quiui: "quiuí",
        quixo: "quixó",
        quico: "quiço",
        quica: "quiçá",
        quepi: "quépi",
        rabao: "rabão",
        radao: "radão",
        ragla: "raglã",
        raivo: "raivó",
        raiao: "raião",
        rajao: "rajão",
        ralao: "ralão",
        ranco: "ranço",
        rapao: "rapão",
        rasao: "rasão",
        ratao: "ratão",
        razao: "razão",
        racas: "raças",
        racao: "ração",
        raita: "raíta",
        reaca: "reaça",
        rebem: "rebém",
        recha: "rechã",
        recho: "rechô",
        recao: "recão",
        recem: "recém",
        redem: "redém",
        refem: "refém",
        reivo: "reivó",
        rejao: "rejão",
        relao: "relão",
        remoi: "remói",
        renao: "renão",
        repos: "repôs",
        repoe: "repõe",
        retem: "retém",
        revem: "revém",
        reves: "revés",
        rezao: "rezão",
        reuna: "reúna",
        reune: "reúne",
        reuno: "reúno",
        reuso: "reúso",
        rifao: "rifão",
        rijao: "rijão",
        rirao: "rirão",
        risao: "risão",
        ritao: "ritão",
        ricar: "riçar",
        ricol: "riçol",
        riuta: "riúta",
        robos: "robôs",
        roclo: "rocló",
        rocao: "rocão",
        rodao: "rodão",
        rojao: "rojão",
        rolao: "rolão",
        romao: "romão",
        romas: "romãs",
        rondo: "rondó",
        rongo: "rongó",
        ronto: "rontó",
        rosao: "rosão",
        rocai: "roçai",
        rocam: "roçam",
        rocar: "roçar",
        rocas: "roças",
        rocou: "roçou",
        roiam: "roíam",
        roias: "roías",
        roido: "roído",
        ruaca: "ruaça",
        ruira: "ruirá",
        runco: "runcó",
        rucar: "ruçar",
        ruiam: "ruíam",
        ruias: "ruías",
        ruido: "ruído",
        ruina: "ruína",
        racio: "rácio",
        radio: "rádio",
        radon: "rádon",
        rafia: "ráfia",
        ragio: "rágio",
        raqui: "ráqui",
        rameo: "râmeo",
        rebus: "rébus",
        recio: "récio",
        redea: "rédea",
        redia: "rédia",
        regia: "régia",
        regie: "régie",
        regio: "régio",
        regua: "régua",
        renio: "rénio",
        revoa: "révoa",
        rexia: "réxia",
        ricio: "rício",
        rieis: "ríeis",
        rigel: "rígel",
        rimel: "rímel",
        ripio: "rípio",
        ritio: "rítio",
        riton: "ríton",
        rober: "róber",
        robur: "róbur",
        rocio: "rócio",
        rodio: "ródio",
        ropia: "rópia",
        rosea: "rósea",
        roseo: "róseo",
        rotia: "rótia",
        rubeo: "rúbeo",
        rubia: "rúbia",
        rufio: "rúfio",
        rugbi: "rúgbi",
        rugio: "rúgio",
        rumen: "rúmen",
        sabia: "sabiá",
        sabiu: "sabiú",
        sabao: "sabão",
        sacai: "sacaí",
        sache: "sachê",
        sacue: "sacuê",
        sacao: "sacão",
        sadra: "sadrá",
        sadao: "sadão",
        safao: "safão",
        sagua: "saguá",
        saije: "saijé",
        saine: "sainé",
        saipe: "saipé",
        saira: "sairá",
        saire: "sairé",
        saiva: "saivá",
        saixe: "saixê",
        saiao: "saião",
        salao: "salão",
        salem: "salém",
        samao: "samão",
        sapua: "sapuá",
        sapao: "sapão",
        sarne: "sarné",
        saroe: "saroé",
        sarua: "saruá",
        sarue: "saruê",
        sarao: "sarão",
        sarca: "sarça",
        sauia: "sauiá",
        saupe: "saupé",
        saura: "saurá",
        savia: "saviá",
        saxao: "saxão",
        sazao: "sazão",
        saico: "saíco",
        saida: "saída",
        saido: "saído",
        saita: "saíta",
        sauba: "saúba",
        sauco: "saúco",
        sauda: "saúda",
        saude: "saúde",
        saudo: "saúdo",
        sauva: "saúva",
        sedao: "sedão",
        sedem: "sedém",
        segao: "segão",
        seica: "seiça",
        selao: "selão",
        senao: "senão",
        seriu: "seriú",
        serta: "sertã",
        seras: "serás",
        serao: "serão",
        seros: "serós",
        sezao: "sezão",
        secao: "seção",
        sifao: "sifão",
        sigmo: "sigmó",
        simao: "simão",
        sinha: "sinhá",
        sinho: "sinhô",
        sinxo: "sinxó",
        sinao: "sinão",
        siriu: "siriú",
        sisso: "sissó",
        sisao: "sisão",
        sioes: "siões",
        siuba: "siúba",
        sobpe: "sobpé",
        socoi: "socoí",
        socao: "socão",
        sofas: "sofás",
        sogua: "soguá",
        solao: "solão",
        somie: "somiê",
        sopao: "sopão",
        sorca: "sorça",
        sotaa: "sotaã",
        soveu: "sovéu",
        soido: "soído",
        suacu: "suaçu",
        sufle: "suflé",
        sulao: "sulão",
        supos: "supôs",
        supoe: "supõe",
        surca: "surça",
        susao: "susão",
        sutia: "sutiã",
        sucao: "sução",
        suina: "suína",
        suino: "suíno",
        suite: "suíte",
        suica: "suíça",
        suico: "suíço",
        suomi: "suômi",
        sabio: "sábio",
        safeo: "sáfeo",
        sagio: "ságio",
        salio: "sálio",
        salix: "sálix",
        sapia: "sápia",
        savel: "sável",
        saxeo: "sáxeo",
        samio: "sâmio",
        sandi: "sândi",
        sanie: "sânie",
        secia: "sécia",
        secio: "sécio",
        selio: "sélio",
        sepia: "sépia",
        sepio: "sépio",
        sequi: "séqui",
        serie: "série",
        serio: "sério",
        serum: "sérum",
        sesea: "sésea",
        sesia: "sésia",
        seter: "séter",
        semea: "sêmea",
        semen: "sêmen",
        semis: "sêmis",
        senio: "sênio",
        sicon: "sícon",
        siler: "síler",
        silex: "sílex",
        simel: "símel",
        simia: "símia",
        simil: "símil",
        simio: "símio",
        sinus: "sínus",
        sirio: "sírio",
        sitio: "sítio",
        socia: "sócia",
        socio: "sócio",
        sodio: "sódio",
        solea: "sólea",
        soleo: "sóleo",
        solio: "sólio",
        sorex: "sórex",
        soria: "sória",
        soror: "sóror",
        sosia: "sósia",
        sotao: "sótão",
        suber: "súber",
        sucia: "súcia",
        sucio: "súcio",
        surio: "súrio",
        tabao: "tabão",
        tacua: "tacuá",
        tacao: "tacão",
        tafia: "tafiá",
        tagua: "taguá",
        taifo: "taifó",
        talao: "talão",
        tamao: "tamão",
        tanca: "tancá",
        tapia: "tapiá",
        tapii: "tapií",
        tapiu: "tapiú",
        tapao: "tapão",
        tarta: "tartã",
        taros: "tarós",
        tatui: "tatuí",
        tatze: "tatzé",
        tavua: "tavuá",
        tavao: "tavão",
        tacas: "taças",
        tedeu: "tedéu",
        tegao: "tegão",
        teiro: "teiró",
        teite: "teité",
        telao: "telão",
        tembe: "tembé",
        temne: "temné",
        temao: "temão",
        tenca: "tença",
        teras: "terás",
        terao: "terão",
        terca: "terça",
        terco: "terço",
        tesao: "tesão",
        teteu: "tetéu",
        tecam: "teçam",
        tecas: "teças",
        teina: "teína",
        teuba: "teúba",
        teudo: "teúdo",
        tiata: "tiatã",
        tifao: "tifão",
        timbe: "timbé",
        timbo: "timbó",
        timao: "timão",
        tinho: "tinhó",
        tiote: "tiotê",
        tipio: "tipió",
        tipao: "tipão",
        tipoi: "tipói",
        tirio: "tirió",
        tirao: "tirão",
        titao: "titão",
        titas: "titãs",
        tiupa: "tiupá",
        ticao: "tição",
        tiuba: "tiúba",
        tiuva: "tiúva",
        toica: "toiça",
        toico: "toiço",
        tolao: "tolão",
        tomas: "tomás",
        tomao: "tomão",
        torai: "toraí",
        torao: "torão",
        torca: "torça",
        torco: "torço",
        torem: "torém",
        tosao: "tosão",
        trara: "trará",
        traca: "traça",
        traco: "traço",
        treno: "trenó",
        trico: "tricô",
        tripe: "tripé",
        truao: "truão",
        trois: "tróis",
        tuaia: "tuaiá",
        tucao: "tucão",
        tufao: "tufão",
        turne: "turnê",
        tutao: "tutão",
        tuira: "tuíra",
        tabua: "tábua",
        tacia: "tácia",
        tafio: "táfio",
        taler: "táler",
        talia: "tália",
        talio: "tálio",
        talus: "tálus",
        tasio: "tásio",
        tatil: "tátil",
        taxis: "táxis",
        taxon: "táxon",
        tamia: "tâmia",
        tamil: "tâmil",
        tamul: "tâmul",
        tedio: "tédio",
        telio: "télio",
        telos: "télos",
        terio: "tério",
        tesio: "tésio",
        tesis: "tésis",
        tetio: "tétio",
        tetis: "tétis",
        tetum: "tétum",
        temio: "têmio",
        tenia: "tênia",
        tenis: "tênis",
        tenue: "tênue",
        tiade: "tíade",
        tibia: "tíbia",
        tibio: "tíbio",
        ticio: "tício",
        tifia: "tífia",
        tilea: "tílea",
        tilia: "tília",
        timio: "tímio",
        tinea: "tínea",
        tiner: "tíner",
        tiris: "tíris",
        toino: "tóino",
        tolia: "tólia",
        torax: "tórax",
        toria: "tória",
        torio: "tório",
        tomio: "tômio",
        tonus: "tônus",
        tuber: "túber",
        tulio: "túlio",
        tunel: "túnel",
        tunis: "túnis",
        tutsi: "tútsi",
        uabui: "uabuí",
        uaica: "uaicá",
        uaita: "uaitá",
        uambe: "uambé",
        uamoi: "uamói",
        uania: "uaniá",
        uapes: "uapés",
        uaria: "uariá",
        uaupe: "uaupé",
        uaura: "uaurá",
        uaucu: "uauçu",
        uaxua: "uaxuá",
        uacai: "uaçaí",
        uaiba: "uaíba",
        ubata: "ubatã",
        ubucu: "ubuçu",
        uchao: "uchão",
        ucima: "ucimá",
        uiape: "uiapé",
        uique: "uiqué",
        ujara: "ujará",
        umaua: "umauá",
        unhao: "unhão",
        uniao: "união",
        untue: "untué",
        uncao: "unção",
        uracu: "uraçu",
        uruba: "urubá",
        uruma: "urumã",
        urupa: "urupá",
        urupe: "urupê",
        urucu: "uruçu",
        ustao: "ustão",
        uvaca: "uvaça",
        uvacu: "uvaçu",
        uiste: "uíste",
        vacua: "vacuá",
        vacao: "vacão",
        vagao: "vagão",
        vaixa: "vaixá",
        valao: "valão",
        vance: "vancê",
        varao: "varão",
        vassa: "vassá",
        vaura: "vaurá",
        vazao: "vazão",
        venca: "vença",
        venco: "venço",
        verge: "vergê",
        verao: "verão",
        verca: "verça",
        vetao: "vetão",
        vidao: "vidão",
        vilao: "vilão",
        virao: "virão",
        visao: "visão",
        vivio: "vivió",
        viviu: "viviú",
        vicar: "viçar",
        viuva: "viúva",
        viuve: "viúve",
        viuvo: "viúvo",
        voaco: "voaço",
        voces: "vocês",
        vonce: "voncê",
        vouve: "vouvê",
        vovos: "vovós",
        vozao: "vozão",
        vacuo: "vácuo",
        valea: "válea",
        vatio: "vátio",
        velea: "vélea",
        velia: "vélia",
        velum: "vélum",
        verio: "vério",
        venia: "vênia",
        venus: "vênus",
        vicio: "vício",
        vicoa: "vícoa",
        video: "vídeo",
        vidia: "vídia",
        vieis: "víeis",
        vigil: "vígil",
        vimea: "vímea",
        vinea: "vínea",
        vineo: "víneo",
        virus: "vírus",
        vitex: "vítex",
        vitis: "vítis",
        volei: "vôlei",
        vomer: "vômer",
        xabeu: "xabéu",
        xamas: "xamãs",
        xango: "xangó",
        xaoro: "xaorô",
        xarem: "xarém",
        xareu: "xaréu",
        xerem: "xerém",
        xexeu: "xexéu",
        ximbe: "ximbé",
        ximao: "ximão",
        xinto: "xintó",
        xuate: "xuatê",
        xenon: "xénon",
        xenia: "xênia",
        xenio: "xênio",
        xifio: "xífio",
        xilon: "xílon",
        zagao: "zagão",
        zambe: "zambê",
        zarao: "zarão",
        zuruo: "zuruó",
        zuido: "zuído",
        zaibo: "zãibo",
        zinia: "zínia",
        ziper: "zíper",
        abaco: "ábaco",
        abavo: "ábavo",
        abies: "ábies",
        abiga: "ábiga",
        abrus: "ábrus",
        absis: "ábsis",
        acade: "ácade",
        acare: "ácare",
        acaro: "ácaro",
        acave: "ácave",
        acavo: "ácavo",
        acida: "ácida",
        acido: "ácido",
        acino: "ácino",
        aclis: "áclis",
        acope: "ácope",
        acopo: "ácopo",
        acoro: "ácoro",
        acron: "ácron",
        actia: "áctia",
        adipe: "ádipe",
        adipo: "ádipo",
        afodo: "áfodo",
        agamo: "ágamo",
        agapa: "ágapa",
        agape: "ágape",
        agaro: "ágaro",
        agata: "ágata",
        agate: "ágate",
        ageis: "ágeis",
        ageno: "ágeno",
        agino: "ágino",
        agios: "ágios",
        agono: "ágono",
        agria: "ágria",
        aguam: "águam",
        aguas: "águas",
        agues: "águes",
        aguia: "águia",
        alalo: "álalo",
        alamo: "álamo",
        album: "álbum",
        alcea: "álcea",
        alemo: "álemo",
        alhia: "álhia",
        alibi: "álibi",
        alica: "álica",
        alife: "álife",
        alpea: "álpea",
        alula: "álula",
        alveo: "álveo",
        apage: "ápage",
        apice: "ápice",
        apios: "ápios",
        apira: "ápira",
        apiro: "ápiro",
        apoca: "ápoca",
        apode: "ápode",
        aporo: "áporo",
        apoto: "ápoto",
        aqueo: "áqueo",
        arabe: "árabe",
        arcio: "árcio",
        ardea: "árdea",
        ardua: "árdua",
        arduo: "árduo",
        areas: "áreas",
        argio: "árgio",
        argon: "árgon",
        arias: "árias",
        arida: "árida",
        arido: "árido",
        aries: "áries",
        arsis: "ársis",
        arula: "árula",
        asaro: "ásaro",
        ascio: "áscio",
        ascon: "áscon",
        ascua: "áscua",
        aspis: "áspis",
        aster: "áster",
        astur: "ástur",
        atele: "átele",
        atila: "átila",
        atimo: "átimo",
        atipo: "átipo",
        atomo: "átomo",
        atona: "átona",
        atono: "átono",
        atrio: "átrio",
        audio: "áudio",
        aurea: "áurea",
        aureo: "áureo",
        avida: "ávida",
        avido: "ávido",
        avila: "ávila",
        axilo: "áxilo",
        axone: "áxone",
        azigo: "ázigo",
        azimo: "ázimo",
        amago: "âmago",
        ambar: "âmbar",
        amnio: "âmnio",
        animo: "ânimo",
        anion: "ânion",
        anodo: "ânodo",
        ansia: "ânsia",
        ebano: "ébano",
        ebeno: "ébeno",
        ebrio: "ébrio",
        ebulo: "ébulo",
        ecano: "écano",
        ecope: "écope",
        ecran: "écran",
        ecula: "écula",
        eculo: "éculo",
        edico: "édico",
        edipo: "édipo",
        efeta: "éfeta",
        efira: "éfira",
        efode: "éfode",
        efodo: "éfodo",
        eforo: "éforo",
        egide: "égide",
        egrio: "égrio",
        eguas: "éguas",
        elafo: "élafo",
        elate: "élate",
        enula: "énula",
        epica: "épica",
        epico: "épico",
        epoca: "época",
        epura: "épura",
        equio: "équio",
        erbio: "érbio",
        erebo: "érebo",
        ereis: "éreis",
        ergio: "érgio",
        erica: "érica",
        erico: "érico",
        erina: "érina",
        esipo: "ésipo",
        esoce: "ésoce",
        esula: "ésula",
        etego: "étego",
        etica: "ética",
        etico: "ético",
        etigo: "étigo",
        etimo: "étimo",
        evano: "évano",
        eider: "êider",
        emero: "êmero",
        emese: "êmese",
        emico: "êmico",
        emulo: "êmulo",
        exito: "êxito",
        exodo: "êxodo",
        exule: "êxule",
        iamos: "íamos",
        icaro: "ícaro",
        icone: "ícone",
        icore: "ícore",
        ictis: "íctis",
        ictus: "íctus",
        idola: "ídola",
        idolo: "ídolo",
        igneo: "ígneo",
        ileon: "íleon",
        ilion: "ílion",
        impar: "ímpar",
        impia: "ímpia",
        impio: "ímpio",
        inaco: "ínaco",
        india: "índia",
        indio: "índio",
        indri: "índri",
        indua: "índua",
        ingua: "íngua",
        inion: "ínion",
        insua: "ínsua",
        inubo: "ínubo",
        inula: "ínula",
        invio: "ínvio",
        isate: "ísate",
        itaca: "ítaca",
        italo: "ítalo",
        itria: "ítria",
        itrio: "ítrio",
        obelo: "óbelo",
        obice: "óbice",
        obito: "óbito",
        obolo: "óbolo",
        obulo: "óbulo",
        obvia: "óbvia",
        obvio: "óbvio",
        ocimo: "ócimo",
        ocrea: "ócrea",
        oculo: "óculo",
        odios: "ódios",
        ofrio: "ófrio",
        ofris: "ófris",
        oleos: "óleos",
        oleum: "óleum",
        omnia: "ómnia",
        opalo: "ópalo",
        opera: "ópera",
        opido: "ópido",
        orfia: "órfia",
        orfao: "órfão",
        orfas: "órfãs",
        orgio: "órgio",
        orgao: "órgão",
        osido: "ósido",
        osmio: "ósmio",
        ossea: "óssea",
        osseo: "ósseo",
        ostio: "óstio",
        otica: "ótica",
        otico: "ótico",
        otima: "ótima",
        otimo: "ótimo",
        ovalo: "óvalo",
        ovano: "óvano",
        ovnis: "óvnis",
        ovulo: "óvulo",
        oxido: "óxido",
        omega: "ômega",
        ubere: "úbere",
        ubero: "úbero",
        umero: "úmero",
        umida: "úmida",
        umido: "úmido",
        uncia: "úncia",
        uncus: "úncus",
        ungue: "úngue",
        unica: "única",
        unico: "único",
        unsia: "únsia",
        uraco: "úraco",
        urano: "úrano",
        urceo: "úrceo",
        urico: "úrico",
        uropo: "úropo",
        usnea: "úsnea",
        uteis: "úteis",
        utero: "útero",
        uvico: "úvico",
        uvido: "úvido",
        uvula: "úvula",
    },
    Pf = [
        "termo",
        "suíte",
        "ávido",
        "festa",
        "bebia",
        "honra",
        "ouvir",
        "pesco",
        "fungo",
        "pagam",
        "ginga",
        "pinta",
        "poder",
        "útero",
        "pilha",
        "sarar",
        "fruta",
        "piano",
        "notar",
        "musgo",
        "tensa",
        "melão",
        "feliz",
        "miojo",
        "pagos",
        "texto",
        "mamãe",
        "ameno",
        "chuva",
        "coral",
        "forte",
        "tonta",
        "temor",
        "ligar",
        "rolar",
        "navio",
        "limbo",
        "calvo",
        "fedor",
        "balde",
        "oxalá",
        "talco",
        "lábia",
        "crime",
        "grade",
        "carta",
        "flora",
        "comum",
        "fatal",
        "pecar",
        "feroz",
        "vírus",
        "armar",
        "couro",
        "êxito",
        "ecoar",
        "balão",
        "falir",
        "tecer",
        "arena",
        "justo",
        "árido",
        "ruiva",
        "múmia",
        "fogão",
        "dupla",
        "touca",
        "sogro",
        "ósseo",
        "treta",
        "átomo",
        "sadio",
        "cólon",
        "pátio",
        "molas",
        "certo",
        "risco",
        "bossa",
        "porre",
        "tigre",
        "vocal",
        "treze",
        "sueco",
        "verbo",
        "latim",
        "povos",
        "longo",
        "lotar",
        "depor",
        "cento",
        "trava",
        "latão",
        "ditos",
        "tórax",
        "polir",
        "cacos",
        "túnel",
        "lindo",
        "pegar",
        "pilar",
        "passo",
        "piada",
        "puxar",
        "taças",
        "manta",
        "barba",
        "subir",
        "tosse",
        "adega",
        "veias",
        "mesma",
        "mirim",
        "mansa",
        "nobre",
        "grama",
        "ritmo",
        "samba",
        "ardor",
        "daqui",
        "bravo",
        "surfe",
        "tanto",
        "imune",
        "lucro",
        "finos",
        "bocas",
        "toldo",
        "major",
        "cabos",
        "estar",
        "focal",
        "ações",
        "queda",
        "juros",
        "elite",
        "burro",
        "fundo",
        "duelo",
        "breve",
        "bolso",
        "linha",
        "parir",
        "furar",
        "quina",
        "pasta",
        "suíno",
        "dosar",
        "cervo",
        "sujar",
        "corda",
        "macia",
        "reler",
        "musas",
        "verme",
        "focar",
        "maçãs",
        "noção",
        "anual",
        "aérea",
        "cerco",
        "sócio",
        "porca",
        "fraco",
        "punho",
        "acima",
        "varão",
        "bolha",
        "tanga",
        "globo",
        "rampa",
        "goela",
        "reais",
        "cheio",
        "fosso",
        "pouco",
        "danos",
        "salas",
        "mimar",
        "sanha",
        "óxido",
        "suave",
        "época",
        "antro",
        "total",
        "jóias",
        "polvo",
        "jejum",
        "atriz",
        "recuo",
        "ágeis",
        "trenó",
        "fluir",
        "muito",
        "ópera",
        "ficar",
        "bucha",
        "magro",
        "frota",
        "série",
        "ácido",
        "ápice",
        "líder",
        "idoso",
        "multa",
        "primo",
        "garça",
        "banal",
        "juíza",
        "jorro",
        "sismo",
        "mercê",
        "pônei",
        "etapa",
        "modas",
        "colar",
        "muita",
        "papel",
        "ruela",
        "meias",
        "gripe",
        "causa",
        "menor",
        "nulos",
        "caule",
        "rubor",
        "optar",
        "redor",
        "nação",
        "galho",
        "roubo",
        "parto",
        "cenas",
        "pódio",
        "lesar",
        "telão",
        "reúso",
        "odiar",
        "usual",
        "latir",
        "altos",
        "livre",
        "vosso",
        "geada",
        "etnia",
        "trevo",
        "rezar",
        "bucal",
        "vetor",
        "filho",
        "miolo",
        "ordem",
        "valor",
        "filha",
        "antes",
        "vetar",
        "surra",
        "prata",
        "ceder",
        "pirão",
        "frear",
        "quilo",
        "rombo",
        "lomba",
        "praia",
        "urnas",
        "aveia",
        "picar",
        "arcar",
        "única",
        "mágoa",
        "jaula",
        "gerar",
        "trena",
        "gemer",
        "riste",
        "lábio",
        "busto",
        "visar",
        "velha",
        "aéreo",
        "adaga",
        "crase",
        "feras",
        "missa",
        "cobra",
        "idéia",
        "briga",
        "dardo",
        "berço",
        "palmo",
        "ralar",
        "reles",
        "blusa",
        "super",
        "grata",
        "longa",
        "tarso",
        "vulto",
        "lenda",
        "grego",
        "pinos",
        "flúor",
        "obeso",
        "sauna",
        "assim",
        "troco",
        "úteis",
        "infra",
        "pudor",
        "cofre",
        "prece",
        "junho",
        "manco",
        "pisar",
        "posse",
        "copas",
        "ninfa",
        "gruta",
        "regra",
        "citar",
        "mural",
        "gíria",
        "ruína",
        "fases",
        "faraó",
        "míope",
        "mando",
        "frios",
        "gelar",
        "chave",
        "sobra",
        "opaco",
        "lagos",
        "corpo",
        "doses",
        "basco",
        "caída",
        "vinda",
        "sujos",
        "igual",
        "lápis",
        "julho",
        "acaso",
        "dados",
        "favor",
        "pente",
        "beata",
        "chulo",
        "rumos",
        "cubos",
        "tento",
        "toque",
        "polpa",
        "ombro",
        "raras",
        "pneus",
        "canil",
        "funil",
        "perto",
        "coala",
        "amplo",
        "orgia",
        "doces",
        "sobre",
        "tédio",
        "pinça",
        "motel",
        "trufa",
        "voraz",
        "azedo",
        "coeso",
        "ácaro",
        "calmo",
        "enfim",
        "mitos",
        "feios",
        "palha",
        "andar",
        "crepe",
        "pingo",
        "avelã",
        "malte",
        "saída",
        "monge",
        "salto",
        "lótus",
        "rímel",
        "lauda",
        "damas",
        "sadia",
        "truco",
        "sério",
        "oeste",
        "selva",
        "reter",
        "bolsa",
        "anexo",
        "renda",
        "lobos",
        "vício",
        "zebra",
        "modos",
        "praxe",
        "pudim",
        "birra",
        "praça",
        "pedra",
        "olhar",
        "pizza",
        "banho",
        "bucho",
        "afins",
        "maior",
        "cabra",
        "visão",
        "irado",
        "razão",
        "macio",
        "troca",
        "salmo",
        "casta",
        "mídia",
        "trupe",
        "morna",
        "falso",
        "lidar",
        "afeto",
        "verso",
        "belos",
        "páreo",
        "vídeo",
        "denso",
        "herói",
        "moeda",
        "vaiar",
        "cópia",
        "coçar",
        "aulas",
        "ganho",
        "chapa",
        "jarra",
        "velho",
        "grilo",
        "sigma",
        "farsa",
        "sigla",
        "clone",
        "cesta",
        "anjos",
        "rugir",
        "luzes",
        "árdua",
        "parvo",
        "censo",
        "virar",
        "apito",
        "gosto",
        "casto",
        "fraca",
        "agudo",
        "sovar",
        "fatos",
        "torso",
        "tumba",
        "veste",
        "leões",
        "secar",
        "berro",
        "sutis",
        "bispo",
        "loção",
        "pesar",
        "digno",
        "bamba",
        "broca",
        "hiato",
        "clube",
        "totem",
        "prumo",
        "meios",
        "vulgo",
        "esqui",
        "épico",
        "minha",
        "ainda",
        "remar",
        "manso",
        "ousar",
        "viral",
        "óvulo",
        "trote",
        "artes",
        "facas",
        "brava",
        "meiga",
        "campo",
        "levar",
        "preta",
        "lebre",
        "pobre",
        "gesso",
        "sabiá",
        "freio",
        "marte",
        "clara",
        "magos",
        "reino",
        "murro",
        "calar",
        "prosa",
        "feita",
        "folga",
        "terço",
        "patas",
        "vogal",
        "zíper",
        "divas",
        "borda",
        "penar",
        "errar",
        "névoa",
        "morto",
        "forma",
        "áureo",
        "vapor",
        "circo",
        "faixa",
        "beijo",
        "bufão",
        "pedir",
        "tropa",
        "vital",
        "vento",
        "cárie",
        "vespa",
        "negro",
        "pardo",
        "local",
        "beato",
        "quais",
        "frase",
        "sucos",
        "botão",
        "balsa",
        "foice",
        "nozes",
        "dente",
        "cedro",
        "aceno",
        "repor",
        "leque",
        "drama",
        "forno",
        "tarde",
        "sarro",
        "certa",
        "trama",
        "milho",
        "dreno",
        "carma",
        "poeta",
        "máfia",
        "lenço",
        "nunca",
        "ficha",
        "ótica",
        "molho",
        "barão",
        "cútis",
        "toada",
        "trens",
        "chalé",
        "ciclo",
        "leigo",
        "golpe",
        "haver",
        "varal",
        "ritos",
        "fibra",
        "nervo",
        "irmãs",
        "sagaz",
        "gente",
        "pombo",
        "zinco",
        "pavor",
        "feixe",
        "pular",
        "titia",
        "deter",
        "axila",
        "brejo",
        "rever",
        "naipe",
        "arder",
        "então",
        "pleno",
        "parma",
        "juízo",
        "noite",
        "seiva",
        "furor",
        "janta",
        "mover",
        "vidro",
        "votar",
        "brasa",
        "areal",
        "jarro",
        "poços",
        "ninja",
        "nossa",
        "boiar",
        "outra",
        "pires",
        "regar",
        "boato",
        "sumir",
        "lenta",
        "loira",
        "cinza",
        "fisco",
        "agora",
        "lazer",
        "pista",
        "pulga",
        "fosca",
        "males",
        "conto",
        "tocha",
        "retas",
        "cuspe",
        "persa",
        "gêmeo",
        "tenda",
        "águia",
        "meros",
        "robôs",
        "lados",
        "areia",
        "impor",
        "vigor",
        "médio",
        "matiz",
        "órgão",
        "senso",
        "novas",
        "turco",
        "densa",
        "balas",
        "bicho",
        "galão",
        "atual",
        "monte",
        "tribo",
        "tarda",
        "baita",
        "ampla",
        "floco",
        "banjo",
        "olhos",
        "gasto",
        "fácil",
        "acesa",
        "torto",
        "horta",
        "alçar",
        "vivos",
        "gaita",
        "solto",
        "cetro",
        "redes",
        "criar",
        "sacro",
        "banir",
        "prato",
        "gorro",
        "miúdo",
        "moída",
        "aliar",
        "bater",
        "fauna",
        "norte",
        "haste",
        "alado",
        "bloco",
        "pinga",
        "ético",
        "corja",
        "morno",
        "ideal",
        "fusão",
        "verão",
        "vozes",
        "bílis",
        "ímpar",
        "sogra",
        "jovem",
        "testa",
        "metal",
        "falsa",
        "bruto",
        "tenso",
        "dique",
        "fator",
        "sutil",
        "grupo",
        "matar",
        "motor",
        "meses",
        "vazio",
        "cujos",
        "parda",
        "carpa",
        "árabe",
        "plebe",
        "advir",
        "punir",
        "rival",
        "trave",
        "tricô",
        "lento",
        "sarda",
        "gozar",
        "caber",
        "sexta",
        "sacra",
        "rolha",
        "açude",
        "casos",
        "cisão",
        "chata",
        "ossos",
        "expor",
        "venda",
        "casco",
        "banco",
        "bomba",
        "sinal",
        "horto",
        "ramos",
        "fonte",
        "leito",
        "cobre",
        "tíbia",
        "cinco",
        "noiva",
        "ponto",
        "aluno",
        "traje",
        "canal",
        "rouco",
        "boate",
        "mútuo",
        "caros",
        "lente",
        "lares",
        "sacar",
        "porém",
        "feudo",
        "vezes",
        "carga",
        "invés",
        "presa",
        "geral",
        "negar",
        "atuar",
        "ciúme",
        "fiado",
        "força",
        "corvo",
        "gordo",
        "tutor",
        "duros",
        "exame",
        "caldo",
        "cupim",
        "ótimo",
        "mamar",
        "índio",
        "autos",
        "pavio",
        "fobia",
        "jeito",
        "votos",
        "tesão",
        "lagoa",
        "pampa",
        "diodo",
        "parte",
        "ambas",
        "farda",
        "sonar",
        "bacon",
        "gatas",
        "banca",
        "meigo",
        "pavão",
        "fixos",
        "doido",
        "valer",
        "girar",
        "fofas",
        "caspa",
        "opção",
        "macro",
        "prego",
        "perda",
        "enjoo",
        "longe",
        "ícone",
        "ferro",
        "braço",
        "unida",
        "lição",
        "roçar",
        "bambu",
        "dorso",
        "moral",
        "ameba",
        "viril",
        "amora",
        "magna",
        "rural",
        "penal",
        "abuso",
        "sunga",
        "poção",
        "erros",
        "surda",
        "beber",
        "cifra",
        "móvel",
        "atrás",
        "farol",
        "fugaz",
        "zerar",
        "menta",
        "estes",
        "vênus",
        "vista",
        "final",
        "nevar",
        "norma",
        "leste",
        "nudez",
        "telas",
        "tinto",
        "saber",
        "bingo",
        "cacau",
        "fardo",
        "morar",
        "bioma",
        "domar",
        "grega",
        "coice",
        "ervas",
        "medir",
        "mista",
        "atroz",
        "raios",
        "tosar",
        "muros",
        "santa",
        "desde",
        "posto",
        "cesto",
        "abril",
        "penta",
        "celta",
        "mudar",
        "cacho",
        "bando",
        "caixa",
        "resto",
        "libra",
        "régua",
        "calda",
        "preto",
        "tênue",
        "vazar",
        "reger",
        "usina",
        "vazia",
        "todos",
        "durar",
        "rimar",
        "angra",
        "selos",
        "aliás",
        "preço",
        "bufar",
        "nuvem",
        "ética",
        "lapso",
        "união",
        "civis",
        "grito",
        "bônus",
        "cinto",
        "matos",
        "safra",
        "algoz",
        "letra",
        "dogma",
        "pesca",
        "linho",
        "tchau",
        "graxa",
        "casal",
        "lidos",
        "zonas",
        "lorde",
        "larva",
        "gnomo",
        "casca",
        "botar",
        "tinta",
        "prado",
        "ânimo",
        "bacia",
        "magia",
        "saque",
        "grato",
        "bares",
        "rolos",
        "loura",
        "óbvio",
        "viola",
        "linda",
        "sábio",
        "cueca",
        "santo",
        "couve",
        "susto",
        "ostra",
        "altar",
        "fúria",
        "limpo",
        "trair",
        "ídolo",
        "deusa",
        "usura",
        "caçar",
        "todas",
        "obter",
        "tampa",
        "fossa",
        "lavar",
        "gueto",
        "lunar",
        "panda",
        "vácuo",
        "rigor",
        "humor",
        "pulso",
        "terno",
        "anéis",
        "donos",
        "coxão",
        "civil",
        "bocal",
        "aroma",
        "soldo",
        "morro",
        "coxas",
        "cupom",
        "jogos",
        "furos",
        "arcos",
        "louca",
        "peste",
        "crise",
        "homem",
        "duplo",
        "táxis",
        "pauta",
        "canja",
        "cauda",
        "dizer",
        "rapaz",
        "atlas",
        "jogar",
        "sítio",
        "guiar",
        "babar",
        "trono",
        "trigo",
        "novos",
        "massa",
        "horas",
        "junto",
        "ômega",
        "salsa",
        "pinho",
        "brisa",
        "ambos",
        "guria",
        "brega",
        "motim",
        "rumor",
        "sutiã",
        "ducha",
        "misto",
        "farto",
        "pólen",
        "débil",
        "dicas",
        "canto",
        "cargo",
        "seita",
        "graus",
        "baile",
        "zelar",
        "apelo",
        "arroz",
        "canoa",
        "perna",
        "tarja",
        "vasos",
        "fluxo",
        "falar",
        "dobro",
        "órfão",
        "leite",
        "curso",
        "comer",
        "cisne",
        "fêmea",
        "cheia",
        "lugar",
        "prazo",
        "letal",
        "seção",
        "fiapo",
        "vinte",
        "puxão",
        "revés",
        "clipe",
        "tomar",
        "manto",
        "gesto",
        "praga",
        "áudio",
        "ânsia",
        "tripé",
        "licor",
        "álibi",
        "inato",
        "lance",
        "rédea",
        "mútua",
        "vagão",
        "lesma",
        "beira",
        "abono",
        "salão",
        "russo",
        "caqui",
        "pelos",
        "servo",
        "facão",
        "barro",
        "filme",
        "rouca",
        "nisto",
        "corar",
        "idade",
        "lisos",
        "selim",
        "peixe",
        "untar",
        "sanar",
        "grana",
        "panos",
        "relva",
        "plena",
        "besta",
        "banda",
        "sódio",
        "feira",
        "pompa",
        "veloz",
        "belas",
        "poema",
        "tecla",
        "adeus",
        "dobra",
        "fruto",
        "sorte",
        "sabão",
        "sushi",
        "quibe",
        "corno",
        "tênis",
        "tosco",
        "valsa",
        "lacre",
        "fosco",
        "neném",
        "clero",
        "dever",
        "dúzia",
        "ração",
        "terça",
        "sótão",
        "fuzuê",
        "aviso",
        "prole",
        "costa",
        "manga",
        "metro",
        "pirar",
        "verde",
        "único",
        "vacas",
        "suado",
        "fixar",
        "loiro",
        "fogos",
        "dunas",
        "radar",
        "baixa",
        "frevo",
        "terra",
        "calva",
        "harpa",
        "dueto",
        "prova",
        "pluma",
        "irmão",
        "justa",
        "pagar",
        "farpa",
        "cerca",
        "vôlei",
        "rosca",
        "euros",
        "curar",
        "fenda",
        "farra",
        "áreas",
        "unhas",
        "nomes",
        "tábua",
        "gosma",
        "capuz",
        "ileso",
        "lenha",
        "perua",
        "padre",
        "fazer",
        "tocar",
        "bruxo",
        "lojas",
        "lerdo",
        "nisso",
        "golfo",
        "topar",
        "usada",
        "ruivo",
        "saúde",
        "nadar",
        "lixar",
        "vidas",
        "pomba",
        "êxodo",
        "acolá",
        "dotar",
        "raiar",
        "batom",
        "ontem",
        "torpe",
        "oásis",
        "cloro",
        "curva",
        "surto",
        "ricos",
        "ursos",
        "hiena",
        "vasta",
        "risos",
        "febre",
        "fumar",
        "fórum",
        "lutar",
        "catar",
        "trela",
        "litro",
        "surdo",
        "menos",
        "choro",
        "chefe",
        "vasto",
        "cetim",
        "traço",
        "cílio",
        "extra",
        "greve",
        "tapar",
        "tufão",
        "sarau",
        "rosas",
        "touro",
        "trapo",
        "lírio",
        "abano",
        "delta",
        "cação",
        "anzol",
        "sarna",
        "clave",
        "refém",
        "hífen",
        "claro",
        "nasal",
        "burra",
        "conde",
        "ponte",
        "ondas",
        "quota",
        "mexer",
        "verba",
        "aonde",
        "obras",
        "idosa",
        "signo",
        "frias",
        "lesão",
        "mundo",
        "gênio",
        "legal",
        "tempo",
        "âmbar",
        "culta",
        "vinho",
        "livro",
        "ninho",
        "germe",
        "culto",
        "pasto",
        "podre",
        "mirar",
        "teses",
        "ébrio",
        "naves",
        "afago",
        "laudo",
        "ditar",
        "selar",
        "garra",
        "folia",
        "pedal",
        "ninar",
        "tirar",
        "fugir",
        "calor",
        "naval",
        "porta",
        "âmago",
        "ponta",
        "calma",
        "capaz",
        "genro",
        "almas",
        "feias",
        "senão",
        "barco",
        "zonzo",
        "senha",
        "focos",
        "óssea",
        "rosto",
        "socar",
        "carne",
        "garfo",
        "luvas",
        "chiar",
        "vazão",
        "porco",
        "gases",
        "úmido",
        "boina",
        "laços",
        "ferir",
        "média",
        "roupa",
        "duque",
        "bonde",
        "tiros",
        "avaro",
        "exato",
        "dócil",
        "basta",
        "viver",
        "placa",
        "disso",
        "poros",
        "arame",
        "outro",
        "sopas",
        "ótima",
        "bruxa",
        "raiva",
        "museu",
        "astro",
        "rente",
        "lombo",
        "bordo",
        "cinta",
        "manhã",
        "palco",
        "peões",
        "folha",
        "treco",
        "casar",
        "louco",
        "turvo",
        "rádio",
        "tipos",
        "somar",
        "achar",
        "macho",
        "ajuda",
        "times",
        "meter",
        "graça",
        "mosca",
        "milha",
        "carro",
        "algum",
        "conta",
        "nicho",
        "sabor",
        "natal",
        "tátil",
        "cerne",
        "torta",
        "apoio",
        "símio",
        "fetal",
        "hotel",
        "setor",
        "vesgo",
        "amada",
        "firma",
        "hábil",
        "calça",
        "aspas",
        "latas",
        "quase",
        "creme",
        "telha",
        "teias",
        "assar",
        "lousa",
        "baque",
        "rubro",
        "fotos",
        "adiar",
        "dólar",
        "polar",
        "limão",
        "lança",
        "coroa",
        "pomar",
        "tripa",
        "mesmo",
        "jegue",
        "álbum",
        "custo",
        "fútil",
        "laico",
        "dedos",
        "ganso",
        "visor",
        "abrir",
        "dedão",
        "bazar",
        "gerir",
        "mania",
        "rodar",
        "turno",
        "anões",
        "sexto",
        "palma",
        "parco",
        "pouso",
        "moela",
        "ótico",
        "áries",
        "tenor",
        "amido",
        "solar",
        "poste",
        "urubu",
        "coisa",
        "seara",
        "xampu",
        "dieta",
        "rocha",
        "turma",
        "paiol",
        "vilão",
        "nível",
        "pouca",
        "vinil",
        "frade",
        "tonto",
        "cavar",
        "lilás",
        "nariz",
        "torre",
        "parar",
        "supor",
        "gambá",
        "cravo",
        "árduo",
        "tosca",
        "clima",
        "sósia",
        "chato",
        "moita",
        "vagar",
        "pausa",
        "truta",
        "podar",
        "fuçar",
        "posar",
        "autor",
        "cruel",
        "quiçá",
        "avião",
        "retro",
        "dores",
        "credo",
        "hinos",
        "capim",
        "tango",
        "vocês",
        "jurar",
    ],
    Gf = B(Pf);
try {
    for (Gf.s(); !(Uf = Gf.n()).done; ) {
        var qf = Uf.value;
        Rf.add(qf);
    }
} catch (a) {
    Gf.e(a);
} finally {
    Gf.f();
}
var Hf,
    Jf,
    Vf = new Set("abcdefghijklmnopqrstuvwxyz"),
    Wf = {
        games: 0,
        wins: 0,
        curstreak: 0,
        avgtime: 0,
        mintime: 0,
        maxtime: 0,
        maxstreak: 0,
        lastwin: void 0,
        histo: [0, 0, 0, 0, 0, 0],
    },
    Kf = { startTime: 0, endTime: 0, highContrastChange: 0 },
    Xf = { highContrast: 0, hardMode: 0 },
    Zf = new Set(["space", "enter", "backspace", "escape", "arrowleft", "arrowright"]),
    _f = {
        right: "var(--colorRight)",
        place: "var(--colorPlace)",
        wrong: "var(--colorWrong)",
        null: "var(--colorWrong)",
    },
    $f = new WeakSet(),
    ab = (function () {
        s(e, Lf);
        var a = p(e);
        function e() {
            var o;
            r(this, e);
            for (var i = arguments.length, t = new Array(i), n = 0; n < i; n++) t[n] = arguments[n];
            return M(g((o = a.call.apply(a, [this].concat(t)))), $f), o;
        }
        return (
            t(e, [
                {
                    key: "reset",
                    value: function () {
                        var a,
                            e = B(this.shadowRoot.querySelectorAll("button"));
                        try {
                            for (e.s(); !(a = e.n()).done; ) {
                                var o = a.value;
                                o.classList.remove("right"),
                                    o.classList.remove("place"),
                                    o.classList.remove("wrong"),
                                    (o.style.animationDuration = null);
                            }
                        } catch (a) {
                            e.e(a);
                        } finally {
                            e.f();
                        }
                    },
                },
                {
                    key: "letterToMulti",
                    value: function (a, e, o) {
                        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
                        return 4 == a
                            ? this.letterToQuatro(e, o)
                            : 2 == a
                              ? this.letterToDuo(e, o)
                              : this.letterTo(e, o[0], r);
                    },
                },
                {
                    key: "letterToDuo",
                    value: function (a, e) {
                        var o = this.shadowRoot.getElementById("kbd_".concat(a));
                        if (o) {
                            if (
                                e.every(function (a) {
                                    return null === a || "wrong" === a;
                                })
                            )
                                return (o.style.background = ""), void o.classList.add("wrong");
                            var r = ["".concat(_f[e[0]], " 50%"), "".concat(_f[e[1]], " 50%")];
                            o.style.background = "linear-gradient(to right, ".concat(r.join(","), ")");
                        }
                    },
                },
                {
                    key: "letterToQuatro",
                    value: function (a, e) {
                        var o = this.shadowRoot.getElementById("kbd_".concat(a));
                        if (o) {
                            if (
                                e.every(function (a) {
                                    return null === a || "wrong" === a;
                                })
                            )
                                return (o.style.background = ""), void o.classList.add("wrong");
                            o.classList.remove("wrong");
                            var r = [
                                "".concat(_f[e[1]], " 90deg"),
                                "".concat(_f[e[3]], " 90deg 180deg"),
                                "".concat(_f[e[2]], " 180deg 270deg"),
                                "".concat(_f[e[0]], " 270deg"),
                            ];
                            o.style.background = "conic-gradient(".concat(r.join(","), ")");
                        }
                    },
                },
                {
                    key: "letterTo",
                    value: function (a, e) {
                        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                            r = this.shadowRoot.getElementById("kbd_".concat(a));
                        r &&
                            ("right" === e &&
                                (r.classList.remove("place"), r.classList.remove("wrong"), r.classList.add("right")),
                            "place" !== e ||
                                r.classList.contains("right") ||
                                (r.classList.remove("wrong"), r.classList.add("place")),
                            "wrong" !== e ||
                                r.classList.contains("right") ||
                                r.classList.contains("place") ||
                                r.classList.add("wrong"),
                            o || (r.style.animationDuration = "0s"));
                    },
                },
                {
                    key: "connect",
                    value: function () {
                        var a = this;
                        this.reset();
                        var e,
                            o = B(this.shadowRoot.querySelectorAll("button"));
                        try {
                            var r = function () {
                                var o = e.value,
                                    r = o.id.split("_")[1].toLowerCase();
                                o.addEventListener("click", function (e) {
                                    Q(a, $f, eb).call(a, r), e.preventDefault(), e.stopPropagation();
                                });
                            };
                            for (o.s(); !(e = o.n()).done; ) r();
                        } catch (a) {
                            o.e(a);
                        } finally {
                            o.f();
                        }
                        window.addEventListener("keyup", function (e) {
                            var o = e.key.toLowerCase();
                            " " == o && (o = "space"),
                                (Vf.has(o) || Zf.has(o)) &&
                                    (Q(a, $f, eb).call(a, o), e.preventDefault(), e.stopPropagation());
                        });
                    },
                },
                {
                    key: "html",
                    value: function () {
                        var a,
                            e = [],
                            o = B("qwertyuiopasdfghjkl1zxcvbnm2");
                        try {
                            for (o.s(); !(a = o.n()).done; ) {
                                var r = a.value,
                                    i =
                                        "1" == r
                                            ? "<img src='".concat(
                                                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjI1NSIgdmlld0JveD0iMCAwIDI5MCAyNTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOS44OTE0IDEyNy4yNTFMMTAzLjA2OCA0MEgyNzVWMjE2SDEwMy4xM0wxOS44OTE0IDEyNy4yNTFaIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGxpbmUgeDE9IjEzIiB5MT0iLTEzIiB4Mj0iMTMwLjk0NyIgeTI9Ii0xMyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxMDcgMC43MDcxMDcgLTAuNzY1MzY3IDAuNjQzNTk0IDExNSA4NikiIHN0cm9rZT0iI0ZBRkFGRiIgc3Ryb2tlLXdpZHRoPSIyNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxsaW5lIHgxPSIxMyIgeTE9Ii0xMyIgeDI9IjEzMC45NDciIHkyPSItMTMiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IC0wLjcwNzEwNyAwLjc2NTM2NyAwLjY0MzU5NCAxMzMuNDY1IDE4Ny43ODYpIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K",
                                                  "'>"
                                              )
                                            : "2" == r
                                              ? "ENTER"
                                              : r.toUpperCase(),
                                    t = "1" == r ? "backspace" : "2" == r ? "enter" : r;
                                e.push('<button id="kbd_'.concat(t, '">').concat(i, "</button>"));
                            }
                        } catch (a) {
                            o.e(a);
                        } finally {
                            o.f();
                        }
                        return e.join("");
                    },
                },
                {
                    key: "stylesheet",
                    value: function () {
                        return Of(
                            Hf ||
                                (Hf = f([
                                    "\n:host {\n  user-select: none;\n  flex-shrink: 0;\n  padding: 0 0.5em 0.3em 0.5em;\n  margin: 0;\n  box-sizing: border-box;\n  height: var(--kbd-height);\n  font-size: min(4rem, calc(var(--kbd-height) / 7));\n  display: grid;\n  grid-template-rows: repeat(3, 1fr);\n  grid-template-columns: repeat(32, 1fr);\n  grid-gap: 0.25em;\n}\n\nbutton {\n  touch-action: manipulation;\n  outline: none;\n  background-color: #4C4347;\n  grid-column: span 3;\n  display: flex;\n  font-size: 1em;\n  line-height: 1em;\n  margin: 0;\n  justify-content: center;\n  align-items: center;\n  border-radius: 8%;\n  font-weight: 500;\n  font-family: 'Mitr', sans-serif;\n  cursor: pointer;\n  border: none;\n  color: #FAFAFF;\n}\n\nbutton.right {\n  background-color: var(--colorRight) !important;\n}\n\nbutton.place {\n  background-color: var(--colorPlace);\n}\n\nbutton.wrong {\n  background-color: #594B4F;\n  color: #6E5C62;\n}\n\nbutton.right, button.place, button.wrong {\n  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out,\n    background 0.5s ease-in-out;\n}\n\n#kbd_a {\n  grid-column: 2 / span 3;\n}\n\n#kbd_z {\n  grid-column: 3 / span 3;\n}\n\n#kbd_backspace {\n  grid-column: 30 / span 3;\n}\n\n#kbd_backspace img {\n  width: 1em;\n}\n\n#kbd_enter {\n  grid-row: 3 span 1;\n  grid-column: 25 / span 8;\n  font-size: 0.9em;\n}\n    ",
                                ]))
                        );
                    },
                },
            ]),
            e
        );
    })();
function eb(a) {
    this.dispatchEvent(new CustomEvent("kbd", { detail: { key: a } }));
}
customElements.define("wc-kbd", ab);
var ob,
    rb = (function () {
        s(e, Lf);
        var a = p(e);
        function e() {
            return r(this, e), a.apply(this, arguments);
        }
        return (
            t(e, [
                {
                    key: "connect",
                    value: function () {
                        for (
                            var a = this,
                                e = function () {
                                    var e = r[o];
                                    a.shadowRoot.getElementById(e).addEventListener("click", function (o) {
                                        a.dispatchEvent(new CustomEvent(e)), o.preventDefault(), o.stopPropagation();
                                    });
                                },
                                o = 0,
                                r = ["help", "stats", "config"];
                            o < r.length;
                            o++
                        )
                            e();
                        (this.bar = 0),
                            this.shadowRoot.getElementById("bar").addEventListener("click", function (e) {
                                a.bar
                                    ? (document.querySelector("wc-bar").hide(),
                                      a.shadowRoot.getElementById("bar").classList.remove("rotate"),
                                      (a.bar = 0))
                                    : a.showBar(),
                                    e.preventDefault(),
                                    e.stopPropagation();
                            });
                    },
                },
                {
                    key: "showBar",
                    value: function () {
                        document.querySelector("wc-bar").show(),
                            this.shadowRoot.getElementById("bar").classList.add("rotate"),
                            (this.bar = 1);
                    },
                },
                {
                    key: "update",
                    value: function () {
                        var a,
                            e = "true" == (null !== (a = this.getAttribute("stats")) && void 0 !== a ? a : "true");
                        this.shadowRoot.getElementById("stats").style.display = e ? "flex" : "none";
                    },
                },
                {
                    key: "html",
                    value: function () {
                        return '\n    <button id="bar"><img src=\''
                            .concat(
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00My4zODE1IDc2LjUyNDZMNjMuODg5OCA1Mi45NjQ0TDg0LjM5OCA3Ni41MjQ2IiBzdHJva2U9IiNCN0FFQjQiIHN0cm9rZS13aWR0aD0iMTIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K",
                                '\'></button>\n    <button id="help"><div>?</div></button>\n    <h1><slot></slot></h1>\n    <div><button id="stats"><img src=\''
                            )
                            .concat(
                                "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI3IDYzLjVDMjcgNTkuMzU3OSAzMC4zNTc5IDU2IDM0LjUgNTZWNTZDMzguNjQyMSA1NiA0MiA1OS4zNTc5IDQyIDYzLjVWMTAySDI3VjYzLjVaIiBmaWxsPSIjQjdBRUI0Ii8+CjxwYXRoIGQ9Ik00NyAzMy41QzQ3IDI5LjM1NzkgNTAuMzU3OSAyNiA1NC41IDI2VjI2QzU4LjY0MjEgMjYgNjIgMjkuMzU3OSA2MiAzMy41VjEwMkg0N1YzMy41WiIgZmlsbD0iI0I3QUVCNCIvPgo8cGF0aCBkPSJNNjcgNTAuNUM2NyA0Ni4zNTc5IDcwLjM1NzkgNDMgNzQuNSA0M1Y0M0M3OC42NDIxIDQzIDgyIDQ2LjM1NzkgODIgNTAuNVYxMDJINjdWNTAuNVoiIGZpbGw9IiNCN0FFQjQiLz4KPHBhdGggZD0iTTg3IDczLjVDODcgNjkuMzU3OSA5MC4zNTc5IDY2IDk0LjUgNjZWNjZDOTguNjQyMSA2NiAxMDIgNjkuMzU3OSAxMDIgNzMuNVYxMDJIODdWNzMuNVoiIGZpbGw9IiNCN0FFQjQiLz4KPC9zdmc+Cg==",
                                "'></button></div>\n    <button id=\"config\"><img src='"
                            )
                            .concat(
                                "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05Ny45ODAxIDU5LjAyNjNDOTguNjE1OCA1OS4yNDAxIDk5LjI4ODggNTkuNDY2NSAxMDAgNTkuNzE5M1Y2OS4yODA3Qzk5LjI5MjggNjkuNTMyMyA5OC42MjE5IDY5Ljc1NzggOTcuOTg2OSA2OS45NzEyQzk0LjI4MzkgNzEuMjE1NyA5MS44MDIgNzIuMDQ5OCA5MC40NzEyIDc1LjI1OTVDODkuMTM5NSA3OC40NzY0IDkwLjMwNzQgODAuODIzNCA5Mi4wNDgxIDg0LjMyMTRDOTIuMzQ1MiA4NC45MTg0IDkyLjY1OSA4NS41NDg5IDkyLjk3OTkgODYuMjIzTDg2LjIyMDEgOTIuOTg1OEM4NS41MzMzIDkyLjY1OTQgODQuODkyNiA5Mi4zNDEgODQuMjg3NCA5Mi4wNDAyQzgwLjc3OTEgOTAuMjk2NiA3OC40NjQzIDg5LjE0NjEgNzUuMjgwMiA5MC40NjgySDc1LjI3NzJDNzIuMDQ4IDkxLjgxMzUgNzEuMjE1OSA5NC4yODcyIDY5Ljk2NyA5OEM2OS43NTQ5IDk4LjYzMDcgNjkuNTMwNyA5OS4yOTcyIDY5LjI4MDcgMTAwSDU5LjcxOTNDNTkuNDY2NyA5OS4yODkzIDU5LjI0MDUgOTguNjE1OCA1OS4wMjY3IDk3Ljk3OTFDNTcuNzgwNyA5NC4yNjkxIDU2Ljk1MzIgOTEuODA1MyA1My43NDY1IDkwLjQ3NzFINTMuNzQzNUM1MC41MjY5IDg5LjE0MyA0OC4xNzU3IDkwLjMxMjMgNDQuNjc4OSA5Mi4wNTE1QzQ0LjA4MTcgOTIuMzQ4NSA0My40NTEgOTIuNjYyMiA0Mi43NzcgOTIuOTgyOEwzNi4wMTcyIDg2LjIyMDFDMzYuMzM4MyA4NS41NDUgMzYuNjUzNiA4NC45MTI1IDM2Ljk1MjggODQuMzEyNUMzOC42NzM3IDgwLjg2MDkgMzkuODU4NiA3OC40ODQ1IDM4LjUyMjkgNzUuMjUzNUMzNy4xOTE1IDcyLjA0NTIgMzQuNzEwNCA3MS4yMTIgMzEuMDA3NSA2OS45Njg2QzMwLjM3NDIgNjkuNzU1OSAyOS43MDUyIDY5LjUzMTMgMjkgNjkuMjgwN1Y1OS43MTkzQzI5LjcxMDMgNTkuNDY2NSAzMC4zODM4IDU5LjI0MDEgMzEuMDIwOSA1OS4wMjZDMzQuNzIxNSA1Ny43ODIgMzcuMTkyOCA1Ni45NTEzIDM4LjUyMjkgNTMuNzQzNUMzOS44NTU3IDUwLjUzMDEgMzguNjk0MyA0OC4xOTMzIDM2Ljk1NTYgNDQuNjk1QzM2LjY1NjYgNDQuMDkzNCAzNi4zNDA1IDQzLjQ1NzYgMzYuMDE3MiA0Mi43NzdMNDIuNzc3IDM2LjAxNzJDNDMuNDU2NiAzNi4zNDA0IDQ0LjA5MTMgMzYuNjU1OCA0NC42OTE0IDM2Ljk1NDFDNDguMjA1MiAzOC43MDA2IDUwLjUzMTkgMzkuODU3IDUzLjc0MzUgMzguNTIyOUg1My43NDY1QzU2Ljk1MTQgMzcuMTkzIDU3Ljc4MTkgMzQuNzIyMSA1OS4wMjU1IDMxLjAyMjJDNTkuMjM5OCAzMC4zODQ4IDU5LjQ2NjMgMjkuNzEwOCA1OS43MTkzIDI5SDY5LjI4MDdDNjkuNTMzIDI5LjcwOTkgNjkuNzU4OSAzMC4zODIzIDY5Ljk3MjUgMzEuMDE4QzcxLjIyMTQgMzQuNzM0OCA3Mi4wNDc3IDM3LjE5NDEgNzUuMjUzNSAzOC41MjI5SDc1LjI1NjVDNzguNDczMiAzOS44NTYgODAuODIzNyAzOC42ODcyIDg0LjMxNDQgMzYuOTUxNEM4NC45MTM2IDM2LjY1MzUgODUuNTQ2NSAzNi4zMzg4IDg2LjIyMyAzNi4wMTcyTDkyLjk4MjggNDIuNzc3QzkyLjY1OTUgNDMuNDU3OSA5Mi4zNDM3IDQ0LjA5MzggOTIuMDQ1MSA0NC42OTUyQzkwLjMwMzIgNDguMjAzNCA4OS4xNDYyIDUwLjUzMzcgOTAuNDc3MSA1My43NDM1VjUzLjc0NjVDOTEuODA0MSA1Ni45NDg5IDk0LjI0OTcgNTcuNzcxNSA5Ny45ODAxIDU5LjAyNjNaTTY0LjUgODBDNzMuMDYwNCA4MCA4MCA3My4wNjA0IDgwIDY0LjVDODAgNTUuOTM5NiA3My4wNjA0IDQ5IDY0LjUgNDlDNTUuOTM5NiA0OSA0OSA1NS45Mzk2IDQ5IDY0LjVDNDkgNzMuMDYwNCA1NS45Mzk2IDgwIDY0LjUgODBaIiBmaWxsPSIjQjdBRUI0Ii8+Cjwvc3ZnPgo=",
                                "'></button>\n  "
                            );
                    },
                },
                {
                    key: "stylesheet",
                    value: function () {
                        return Of(
                            Jf ||
                                (Jf = f([
                                    "\n:host {\n  height: 6vh;\n  flex-shrink: 0;\n  max-width: 720px;\n  width: 100%;\n  box-sizing: border-box;\n  display: grid;\n  grid-template-columns: 5vh 5vh 1fr 5vh 5vh;\n  grid-gap: 0;\n  color: #FAFAFF;\n  font-family: 'Mitr', sans-serif;\n  font-weight: 600;\n  font-size: 1em;\n  user-select: none;\n}\n\nh1 {\n  font-weight: 600;\n  font-size: 4vh;\n  line-height: 6vh;\n  height: 6vh;\n  margin: 0;\n  padding: 0;\n  text-transform: uppercase;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton {\n  z-index: 1000;\n  cursor: pointer;\n  padding: 0;\n  width: 5vh;\n  height: 6vh;\n  background-color: transparent;\n  border: none;\n  color: #B7AEB4;\n  font-weight: 400;\n  line-height: 1em;\n  font-size: 2vh;\n  font-family: 'Mitr', sans-serif;\n  font-weight: 400;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\nbutton img, button div {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px solid #B7AEB4;\n  border-radius: 20%;\n  width: 3vh;\n  height: 3vh;\n  margin: 0 0.25vh;\n  transition: transform 0.5s ease-in-out;\n}\n\nbutton.rotate img {\n  transform: rotate(180deg);\n}\n\n#bar, #stats {\n  justify-content: flex-end;\n}\n\n#help, #config {\n  justify-content: flex-start;\n}\n\n\n",
                                ]))
                        );
                    },
                },
            ]),
            e
        );
    })();
n(rb, "attr", ["stats"]), customElements.define("wc-header", rb);
var ib,
    tb = (function () {
        s(e, Lf);
        var a = p(e);
        function e() {
            return r(this, e), a.apply(this, arguments);
        }
        return (
            t(e, [
                {
                    key: "connect",
                    value: function () {
                        this.open = 0;
                    },
                },
                {
                    key: "popup",
                    value: function (a) {
                        this.innerHTML = a;
                        var e = this.shadowRoot.getElementById("msg");
                        e.focus(), (this.open = 1), Ff(e, "0.25s linear popup forwards");
                    },
                },
                {
                    key: "popoff",
                    value: function () {
                        this.open &&
                            ((this.open = 0),
                            Ff(this.shadowRoot.getElementById("msg"), "0.25s linear popup reverse forwards"));
                    },
                },
                {
                    key: "html",
                    value: function () {
                        return '<div aria-live="assertive" tabindex=0 id="msg"><slot></slot></div>';
                    },
                },
                {
                    key: "stylesheet",
                    value: function () {
                        return Of(
                            ob ||
                                (ob = f([
                                    "\n:host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #FAFAFF;\n  font-family: 'Mitr', sans-serif;\n  font-weight: 600;\n  user-select: none;\n  touch-action: manipulation;\n  outline: none;\n}\n\n#msg {\n  touch-action: manipulation;\n  outline: none;\n  opacity: 0;\n  z-index: 20000;\n  background-color: #009AFE;\n  font-weight: 400;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  box-sizing: border-box;\n  font-size: 2.5vh;\n  margin: 0 auto;\n  padding: 0.4em 1.5em;\n  border-radius: 0.4em;\n}\n\n#msg ::slotted(b) {\n  font-weight: 400 !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 1.25em;\n  height: 1.25em;\n  background-color: #186295;\n  border-radius: 10%;\n  margin: 0 0.25em;\n}\n\n@keyframes popup {\n  0% {\n    opacity: 0;\n    transform: scale(0, 0);\n  }\n\n  25% {\n    opacity: 1;\n  }\n\n  75% {\n    transform: scale(1.15, 1.15);\n  }\n\n  100% {\n    transform: scale(1, 1);\n    opacity: 1;\n  }\n}",
                                ]))
                        );
                    },
                },
            ]),
            e
        );
    })();
n(tb, "attr", []), customElements.define("wc-notify", tb);
var nb = (function () {
    s(e, Lf);
    var a = p(e);
    function e() {
        var o;
        return r(this, e), ((o = a.call(this)).modals = {}), o;
    }
    return (
        t(e, [
            {
                key: "connect",
                value: function () {
                    var a = this;
                    this.shadowRoot.getElementById("all").addEventListener("click", function (e) {
                        a.hide(), e.stopPropagation(), e.preventDefault();
                    });
                },
            },
            {
                key: "registerModal",
                value: function (a, e) {
                    e.parentNode && e.parentNode.removeChild(e), (this.modals[a] = e);
                },
            },
            {
                key: "getModal",
                value: function (a) {
                    return this.modals[a];
                },
            },
            {
                key: "hide",
                value: function () {
                    (this.style.display = "none"), this.firstChild && this.removeChild(this.firstChild);
                },
            },
            {
                key: "show",
                value: function (a) {
                    this.firstChild
                        ? this.replaceChild(this.modals[a], this.firstChild)
                        : this.appendChild(this.modals[a]),
                        (this.style.display = "block");
                },
            },
            {
                key: "isOpen",
                value: function () {
                    return "block" == this.style.display;
                },
            },
            {
                key: "html",
                value: function () {
                    return "<div id=all><div id=box><slot></slot></div></div>";
                },
            },
            {
                key: "stylesheet",
                value: function () {
                    return Of(
                        ib ||
                            (ib = f([
                                "\n:host {\n  display: none;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 10000;\n  color: white;\n  color: #BBB;\n  font-family: 'Mitr', sans-serif;\n  font-weight: 300;\n}\n\n#all {\n  width: 100%;\n  box-sizing: border-box;\n  height: 100%;\n  background-color: rgba(70, 70, 70, 0.5);\n  display: flex;\n  flex-direction: column;\n  font-size: 3rem;\n  line-height: 1.35em;\n  font-weight: 300;\n  justify-content: center;\n  align-items: center;\n  padding: 6vh 2em 2em 2em;\n}\n\n#box {\n  max-width: 720px;\n  padding: 1.5em;\n  margin: 0;\n  width: 100%;\n  background-color: #312B2D;\n  box-sizing: border-box;\n  border-radius: 0.5em;\n  overflow: auto;\n  z-index: 19000;\n  pointer-events: auto;\n  line-height: 1.5em;\n}\n",
                            ]))
                    );
                },
            },
        ]),
        e
    );
})();
n(nb, "attr", []), customElements.define("wc-modal", nb);
var sb,
    ub,
    cb = gs,
    lb = C.TypeError,
    mb = Qe("match"),
    Ab = di,
    gb = Z,
    db = N.f,
    pb = Er,
    fb = qt,
    bb = function (a) {
        if (cb(a)) throw lb("The method doesn't accept regular expressions");
        return a;
    },
    vb = ca,
    hb = gb("".startsWith),
    wb = gb("".slice),
    Bb = Math.min,
    yb = (function () {
        var a = /./;
        try {
            "/./".startsWith(a);
        } catch (e) {
            try {
                return (a[mb] = 0), "/./".startsWith(a);
            } catch (a) {}
        }
        return 0;
    })();
Ab(
    {
        target: "String",
        proto: 1,
        forced: !((!yb && ((sb = db(String.prototype, "startsWith")), sb && !sb.writable)) || yb),
    },
    {
        startsWith: function (a) {
            var e = fb(vb(this));
            bb(a);
            var o = pb(Bb(arguments.length > 1 ? arguments[1] : void 0, e.length)),
                r = fb(a);
            return hb ? hb(e, r, o) : wb(e, o, o + r.length) === r;
        },
    }
);
var Eb = (function () {
    s(e, Lf);
    var a = p(e);
    function e() {
        return r(this, e), a.apply(this, arguments);
    }
    return (
        t(e, [
            {
                key: "connect",
                value: function () {
                    var a = this;
                    this.update();
                    var e,
                        o = B(this.shadowRoot.querySelectorAll("a,input,label,#version"));
                    try {
                        for (o.s(); !(e = o.n()).done; )
                            e.value.addEventListener("click", function (a) {
                                a.stopPropagation();
                            });
                    } catch (a) {
                        o.e(a);
                    } finally {
                        o.f();
                    }
                    var r,
                        i = B(this.shadowRoot.querySelectorAll("input"));
                    try {
                        var t = function () {
                            var e = r.value;
                            e.addEventListener("change", function () {
                                a.dispatchEvent(new CustomEvent("update", { detail: { id: e.id } }));
                            });
                        };
                        for (i.s(); !(r = i.n()).done; ) t();
                    } catch (a) {
                        i.e(a);
                    } finally {
                        i.f();
                    }
                    this.lastCfg && this.setConfig(this.lastCfg);
                },
            },
            {
                key: "getConfig",
                value: function () {
                    var a, e;
                    return {
                        highContrast: !(
                            null === (a = this.shadowRoot.getElementById("contrast")) ||
                            void 0 === a ||
                            !a.checked
                        ),
                        hardMode: !(
                            null === (e = this.shadowRoot.getElementById("hardmode")) ||
                            void 0 === e ||
                            !e.checked
                        ),
                    };
                },
            },
            {
                key: "setConfig",
                value: function (a) {
                    (this.lastCfg = a),
                        this.boxes.has("contrast") &&
                            (this.shadowRoot.getElementById("contrast").checked = a.highContrast),
                        this.boxes.has("hardmode") && (this.shadowRoot.getElementById("hardmode").checked = a.hardMode);
                },
            },
            {
                key: "update",
                value: function () {
                    this.boxes = new Set(
                        this.getAttribute("boxes")
                            .split(",")
                            .map(function (a) {
                                return a.trim();
                            })
                    );
                    var a,
                        e = B(this.shadowRoot.querySelectorAll("div[name]"));
                    try {
                        for (e.s(); !(a = e.n()).done; ) {
                            var o = a.value;
                            this.boxes.has(o.getAttribute("name"))
                                ? (o.style.display = "grid")
                                : (o.style.display = "none");
                        }
                    } catch (a) {
                        e.e(a);
                    } finally {
                        e.f();
                    }
                },
            },
            {
                key: "html",
                value: function () {
                    return '\n<div name="contrast">\n<p><label for="contrast">Contraste alto</label></p>\n<span><input id="contrast" class="toggle" type="checkbox"></span>\n</div>\n\n<div name="hardmode">\n<p><label for="hardmode">Modo difícil</label><i>dicas são forçadas</i></p>\n<span><input id="hardmode" class="toggle" type="checkbox"></span>\n</div>\n\n<div name="index">\n<p>Estatísticas</p> <span>\n<a tabindex=0 href=\'https://term.ooo/stato\'>Termostato</a></span>\n</div>\n\n<div name="index">\n<p><b>Termo</b> é baseado no\n<a href="https://www.powerlanguage.co.uk/wordle">Wordle</a>.</p><span></span>\n</div>\n\n<div name="multi">\n<p>Versão multi-palavra do <a href=\'https://term.ooo\'>Termo</a>.</p>\n<span></span>\n</div>\n\n<div>\n<p>Comentários</p><span>\n<a tabindex=0 href=\'mailto:fserb@fserb.com.br\'>E-mail</a>\n<a tabindex=0 href=\'https://twitter.com/fserb\'>Twitter</a>\n</span>\n</div>\n\n<div><p></p>\n<span id=\'version\'>#'.concat(
                        "811eb29".startsWith("__") ? "dev" : "811eb29",
                        "</span>\n</div>\n"
                    );
                },
            },
            {
                key: "stylesheet",
                value: function () {
                    return Of(
                        ub ||
                            (ub = f([
                                "\n:host {\n  pointer-events: auto;\n  z-index: 20000;\n  color: #FAFAFF;\n  font-family: 'Mitr', sans-serif;\n  padding: 1.7rem 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5em;\n}\n\ndiv {\n  display: grid;\n  grid-template-columns: 70% 30%;\n}\n\nb {\n  font-weight: 400;\n}\n\na {\n  color: #EBE;\n}\n\np {\n  margin: 0;\n}\n\np i {\n  display: block;\n  font-size: 0.75em;\n  color: #9F9E9E;\n  margin: 0;\n  line-height: 1em;\n}\n\nspan {\n  text-align: right;\n  line-height: 1em;\n}\n\nlabel {\n  cursor: pointer;\n}\n\n#version {\n  color: #9F9E9E;\n  font-size: 0.75em;\n  font-weight: 300;\n  user-select: all;\n}\n\ninput[type=checkbox] {\n  font-size: 1em;\n  appearance: none;\n  -webkit-tap-highlight-color: transparent;\n  cursor: pointer;\n  outline: 0;\n}\n\ninput.toggle {\n  aspect-ratio: 53 / 32;\n  height: 1.75em;\n  border-radius: 1em;\n  display: inline-block;\n\n  position: relative;\n  margin: 0;\n  background-color: #312A2D;\n  border: 0.1em solid #FAFAFF;\n}\n\ninput.toggle:after {\n  content: '';\n  position: absolute;\n  top: 0.075em;\n  left: 0.1em;\n  height: 1.2em;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  border: 0.1em solid #FAFAFF;\n  background-color: transparent;\n  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);\n}\n\ninput.toggle:checked {\n}\n\ninput.toggle:checked:after {\n  background-color: #fafaff;\n  transform: translatex(1.05em);\n}\n",
                            ]))
                    );
                },
            },
        ]),
        e
    );
})();
n(Eb, "attr", ["boxes"]), customElements.define("wc-config", Eb);
var Db = fr,
    Qb = qt,
    xb = ca,
    jb = C.RangeError,
    Mb = Z,
    zb = Er,
    Ib = qt,
    Cb = ca,
    Nb = Mb(function (a) {
        var e = Qb(xb(this)),
            o = "",
            r = Db(a);
        if (r < 0 || r == 1 / 0) throw jb("Wrong number of repetitions");
        for (; r > 0; (r >>>= 1) && (e += e)) 1 & r && (o += e);
        return o;
    }),
    kb = Mb("".slice),
    Fb = Math.ceil,
    Ob = function (a) {
        return function (e, o, r) {
            var i,
                t,
                n = Ib(Cb(e)),
                s = zb(o),
                u = n.length,
                c = void 0 === r ? " " : Ib(r);
            return s <= u || "" == c
                ? n
                : ((t = Nb(c, Fb((i = s - u) / c.length))).length > i && (t = kb(t, 0, i)), a ? n + t : t + n);
        };
    },
    Tb = { start: Ob(0), end: Ob(1) },
    Sb = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(Ba),
    Lb = Tb.start;
di(
    { target: "String", proto: 1, forced: Sb },
    {
        padStart: function (a) {
            return Lb(this, a, arguments.length > 1 ? arguments[1] : void 0);
        },
    }
);
var Ub =
        Object.is ||
        function (a, e) {
            return a === e ? 0 !== a || 1 / a == 1 / e : a != a && e != e;
        },
    Rb = L,
    Yb = io,
    Pb = ca,
    Gb = Ub,
    qb = qt,
    Hb = Ja,
    Jb = Gs;
cs("search", function (a, e, o) {
    return [
        function (e) {
            var o = Pb(this),
                r = null == e ? void 0 : Hb(e, a);
            return r ? Rb(r, e, o) : new RegExp(e)[a](qb(o));
        },
        function (a) {
            var r = Yb(this),
                i = qb(a),
                t = o(e, r, i);
            if (t.done) return t.value;
            var n = r.lastIndex;
            Gb(n, 0) || (r.lastIndex = 0);
            var s = Jb(r, i);
            return Gb(r.lastIndex, n) || (r.lastIndex = n), null === s ? -1 : s.index;
        },
    ];
});
var Vb = Z,
    Wb = or.PROPER,
    Kb = bo.exports,
    Xb = io,
    Zb = wa,
    _b = qt,
    $b = k,
    av = Jt,
    ev = RegExp.prototype,
    ov = ev.toString,
    rv = Vb(av),
    iv = $b(function () {
        return "/a/b" != ov.call({ source: "a", flags: "b" });
    }),
    tv = Wb && "toString" != ov.name;
(iv || tv) &&
    Kb(
        RegExp.prototype,
        "toString",
        function () {
            var a = Xb(this),
                e = _b(a.source),
                o = a.flags;
            return "/" + e + "/" + _b(void 0 === o && Zb(ev, a) && !("flags" in ev) ? rv(a) : o);
        },
        { unsafe: 1 }
    );
var nv = io,
    sv = il,
    uv = Ct,
    cv = L,
    lv = ne,
    mv = function (a, e, o, r) {
        try {
            return r ? e(nv(o)[0], o[1]) : e(o);
        } catch (e) {
            sv(a, "throw", e);
        }
    },
    Av = Pc,
    gv = qi,
    dv = Qr,
    pv = wi,
    fv = al,
    bv = Vc,
    vv = C.Array;
di(
    {
        target: "Array",
        stat: 1,
        forced: !jl(function (a) {
            Array.from(a);
        }),
    },
    {
        from: function (a) {
            var e = lv(a),
                o = gv(this),
                r = arguments.length,
                i = r > 1 ? arguments[1] : void 0,
                t = void 0 !== i;
            t && (i = uv(i, r > 2 ? arguments[2] : void 0));
            var n,
                s,
                u,
                c,
                l,
                m,
                A = bv(e),
                g = 0;
            if (!A || (this == vv && Av(A)))
                for (n = dv(e), s = o ? new this(n) : vv(n); n > g; g++) (m = t ? i(e[g], g) : e[g]), pv(s, g, m);
            else
                for (l = (c = fv(e, A)).next, s = o ? new this() : []; !(u = cv(l, c)).done; g++)
                    (m = t ? mv(c, i, [u.value, g], 1) : u.value), pv(s, g, m);
            return (s.length = g), s;
        },
    }
),
    mp(
        "Map",
        function (a) {
            return function () {
                return a(this, arguments.length ? arguments[0] : void 0);
            };
        },
        Dp
    );
var hv = Z,
    wv = ne,
    Bv = Math.floor,
    yv = hv("".charAt),
    Ev = hv("".replace),
    Dv = hv("".slice),
    Qv = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
    xv = /\$([$&'`]|\d{1,2})/g,
    jv = as,
    Mv = L,
    zv = Z,
    Iv = cs,
    Cv = k,
    Nv = io,
    kv = ga,
    Fv = fr,
    Ov = Er,
    Tv = qt,
    Sv = ca,
    Lv = Is,
    Uv = Ja,
    Rv = function (a, e, o, r, i, t) {
        var n = o + a.length,
            s = r.length,
            u = xv;
        return (
            void 0 !== i && ((i = wv(i)), (u = Qv)),
            Ev(t, u, function (t, u) {
                var c;
                switch (yv(u, 0)) {
                    case "$":
                        return "$";
                    case "&":
                        return a;
                    case "`":
                        return Dv(e, 0, o);
                    case "'":
                        return Dv(e, n);
                    case "<":
                        c = i[Dv(u, 1, -1)];
                        break;
                    default:
                        var l = +u;
                        if (0 === l) return t;
                        if (l > s) {
                            var m = Bv(l / 10);
                            return 0 === m ? t : m <= s ? (void 0 === r[m - 1] ? yv(u, 1) : r[m - 1] + yv(u, 1)) : t;
                        }
                        c = r[l - 1];
                }
                return void 0 === c ? "" : c;
            })
        );
    },
    Yv = Gs,
    Pv = Qe("replace"),
    Gv = Math.max,
    qv = Math.min,
    Hv = zv([].concat),
    Jv = zv([].push),
    Vv = zv("".indexOf),
    Wv = zv("".slice),
    Kv = "$0" === "a".replace(/./, "$0"),
    Xv = /./[Pv] ? "" === /./[Pv]("a", "$0") : 0,
    Zv = !Cv(function () {
        var a = /./;
        return (
            (a.exec = function () {
                var a = [];
                return (a.groups = { a: "7" }), a;
            }),
            "7" !== "".replace(a, "$<a>")
        );
    });
Iv(
    "replace",
    function (a, e, o) {
        var r = Xv ? "$" : "$0";
        return [
            function (a, o) {
                var r = Sv(this),
                    i = null == a ? void 0 : Uv(a, Pv);
                return i ? Mv(i, a, r, o) : Mv(e, Tv(r), a, o);
            },
            function (a, i) {
                var t = Nv(this),
                    n = Tv(a);
                if ("string" == typeof i && -1 === Vv(i, r) && -1 === Vv(i, "$<")) {
                    var s = o(e, t, n, i);
                    if (s.done) return s.value;
                }
                var u = kv(i);
                u || (i = Tv(i));
                var c = t.global;
                if (c) {
                    var l = t.unicode;
                    t.lastIndex = 0;
                }
                for (var m = []; ; ) {
                    var A = Yv(t, n);
                    if (null === A) break;
                    if ((Jv(m, A), !c)) break;
                    "" === Tv(A[0]) && (t.lastIndex = Lv(n, Ov(t.lastIndex), l));
                }
                for (var g, d = "", p = 0, f = 0; f < m.length; f++) {
                    for (
                        var b = Tv((A = m[f])[0]), v = Gv(qv(Fv(A.index), n.length), 0), h = [], w = 1;
                        w < A.length;
                        w++
                    )
                        Jv(h, void 0 === (g = A[w]) ? g : String(g));
                    var B = A.groups;
                    if (u) {
                        var y = Hv([b], h, v, n);
                        void 0 !== B && Jv(y, B);
                        var E = Tv(jv(i, void 0, y));
                    } else E = Rv(b, n, v, h, B, i);
                    v >= p && ((d += Wv(n, p, v) + E), (p = v + b.length));
                }
                return d + Wv(n, p);
            },
        ];
    },
    !Zv || !Kv || Xv
);
var _v = di,
    $v = C,
    ah = fi,
    eh = qi,
    oh = pa,
    rh = wr,
    ih = Qr,
    th = Aa,
    nh = wi,
    sh = Qe,
    uh = Ml,
    ch = et("slice"),
    lh = sh("species"),
    mh = $v.Array,
    Ah = Math.max;
function gh(a) {
    return new Promise(function (e) {
        return setTimeout(e, 1e3 * a);
    });
}
_v(
    { target: "Array", proto: 1, forced: !ch },
    {
        slice: function (a, e) {
            var o,
                r,
                i,
                t = th(this),
                n = ih(t),
                s = rh(a, n),
                u = rh(void 0 === e ? n : e, n);
            if (
                ah(t) &&
                ((o = t.constructor),
                ((eh(o) && (o === mh || ah(o.prototype))) || (oh(o) && null === (o = o[lh]))) && (o = void 0),
                o === mh || void 0 === o)
            )
                return uh(t, s, u);
            for (r = new (void 0 === o ? mh : o)(Ah(u - s, 0)), i = 0; s < u; s++, i++) s in t && nh(r, i, t[s]);
            return (r.length = i), r;
        },
    }
);
var dh = new Map();
function ph(a, e, o) {
    dh.has(o) || dh.set(o, new Map());
    var r = dh.get(o);
    return (
        r.set(e, 1),
        a.every(function (a) {
            return a.gameOver || 1 == r.get(a);
        })
            ? (dh.delete(o), 1)
            : 0
    );
}
function fh(a) {
    return a.normalize("NFD").replace(/[^\w]/g, "");
}
function bh(a, e, o, r, i, t) {
    a.beginPath(),
        a.moveTo(e + t, o),
        a.lineTo(e + r - t, o),
        a.arcTo(e + r, o, e + r, o + t, t),
        a.lineTo(e + r, o + i - t),
        a.arcTo(e + r, o + i, e + r - t, o + i, t),
        a.lineTo(e + t, o + i),
        a.arcTo(e, o + i, e, o + i - t, t),
        a.lineTo(e, o + t),
        a.arcTo(e, o, e + t, o, t),
        a.closePath();
}
var vh,
    hh = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hourCycle: "h23" },
    wh = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)/;
function Bh(e, o) {
    var r = o
            ? (function (e) {
                  for (var o = 1; o < arguments.length; o++) {
                      var r = null != arguments[o] ? arguments[o] : {};
                      o % 2
                          ? a(Object(r), 1).forEach(function (a) {
                                n(e, a, r[a]);
                            })
                          : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                            : a(Object(r)).forEach(function (a) {
                                  Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
                              });
                  }
                  return e;
              })({ timeZone: o }, hh)
            : hh,
        i = new Intl.DateTimeFormat("en-US", r).format(e);
    return (
        (i = i.replace(/[\u200E\u200F]/g, "")),
        wh
            .exec(i)
            .slice(1)
            .map(function (a) {
                return Number.parseInt(a);
            })
    );
}
function yh() {
    var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
        e = null != a ? a : new Date(),
        o = Bh(e),
        r = Bh(e, "America/Sao_Paulo"),
        i = new Date(o[2], o[0] - 1, o[1], o[3], o[4], 0, 0),
        t = new Date(r[2], r[0] - 1, r[1], r[3], r[4], 0, 0);
    return (t - i) / 1e3;
}
function Eh() {
    return Math.floor(
        (new Date() - ((a = new Date(2022, 0, 2, 0, 0, 0, 0)), new Date(2022, 0, 2, 0, 0, -yh(a), 0))) / 864e5
    );
    var a;
}
var Dh = new WeakSet(),
    Qh = new WeakSet(),
    xh = (function () {
        s(e, Lf);
        var a = p(e);
        function e() {
            var o;
            r(this, e);
            for (var i = arguments.length, t = new Array(i), n = 0; n < i; n++) t[n] = arguments[n];
            return M(g((o = a.call.apply(a, [this].concat(t)))), Qh), M(g(o), Dh), o;
        }
        return (
            t(e, [
                {
                    key: "connect",
                    value: function () {
                        var a = this;
                        if (
                            (this.shadowRoot.getElementById("stats_share").addEventListener("click", function (e) {
                                a.dispatchEvent(new CustomEvent("share")), e.stopPropagation(), e.preventDefault();
                            }),
                            null === this.raf)
                        ) {
                            var e = Eh(),
                                o = function () {
                                    var o = new Date();
                                    o.setSeconds(o.getSeconds() + yh());
                                    var r = String(23 - o.getHours()).padStart(2, "0"),
                                        i = String(59 - o.getMinutes()).padStart(2, "0"),
                                        t = String(59 - o.getSeconds()).padStart(2, "0");
                                    (a.shadowRoot.getElementById("stats_time").innerText = ""
                                        .concat(r, ":")
                                        .concat(i, ":")
                                        .concat(t)),
                                        e != Eh() &&
                                            (document.location.search =
                                                "?f=" + btoa(Math.random().toString()).substr(10, 8));
                                };
                            (this.raf = setInterval(o, 1e3)), o();
                        }
                    },
                },
                {
                    key: "disconnect",
                    value: function () {
                        this.hideStats();
                    },
                },
                {
                    key: "hideStats",
                    value: function () {
                        null !== this.raf && (clearInterval(this.raf), (this.raf = null));
                    },
                },
                {
                    key: "update",
                    value: function () {
                        var a,
                            e = "true" == (null !== (a = this.getAttribute("stato")) && void 0 !== a ? a : "false"),
                            o = b(Q(this, Dh, jh).call(this), 2),
                            r = o[0],
                            i = o[1],
                            t = this.shadowRoot.getElementById("histo");
                        (t.innerHTML = ""),
                            e
                                ? t.appendChild(
                                      kf(
                                          "<p><a tabindex=0 href='https://term.ooo/stato'>\n  <img src=\"".concat(
                                              "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02MyA0M0M2MC43OTA5IDQzIDU5IDQ0Ljc5MDkgNTkgNDdWNzMuNTQyM0M1NC4zNjAyIDc1LjAyMzEgNTEgNzkuMzY5MSA1MSA4NC41QzUxIDkwLjg1MTMgNTYuMTQ4NyA5NiA2Mi41IDk2QzY4Ljg1MTMgOTYgNzQgOTAuODUxMyA3NCA4NC41Qzc0IDc5Ljc0NTcgNzEuMTE0OSA3NS42NjUyIDY3IDczLjkxMzhWNDdDNjcgNDQuNzkwOSA2NS4yMDkxIDQzIDYzIDQzWiIgZmlsbD0iI0I3QUVCNCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ2IDM3QzQ2IDI3LjYxMTEgNTMuNjExMSAyMCA2MyAyMEM3Mi4zODg5IDIwIDgwIDI3LjYxMTEgODAgMzdWNjkuODE1M0M4My43MzA4IDczLjk3NSA4NiA3OS40NzI1IDg2IDg1LjVDODYgOTguNDc4NyA3NS40Nzg3IDEwOSA2Mi41IDEwOUM0OS41MjEzIDEwOSAzOSA5OC40Nzg3IDM5IDg1LjVDMzkgNzguOTUxMyA0MS42Nzg2IDczLjAyODMgNDYgNjguNzY2OFYzN1pNNTQgMzdDNTQgMzIuMDI5NCA1OC4wMjk0IDI4IDYzIDI4QzY3Ljk3MDYgMjggNzIgMzIuMDI5NCA3MiAzN1Y3My4yNTE2Qzc1LjY1MDggNzYuMDg3MyA3OCA4MC41MTkzIDc4IDg1LjVDNzggOTQuMDYwNCA3MS4wNjA0IDEwMSA2Mi41IDEwMUM1My45Mzk2IDEwMSA0NyA5NC4wNjA0IDQ3IDg1LjVDNDcgODAuMDc4MiA0OS43ODM4IDc1LjMwNjUgNTQgNzIuNTM2NFYzN1oiIGZpbGw9IiNCN0FFQjQiLz4KPC9zdmc+Cg==",
                                              '"></a></p>'
                                          )
                                      )
                                  )
                                : t.appendChild(kf("<p></p>"));
                        for (var n = r; n <= i; ++n)
                            t.appendChild(kf("<b>".concat(n, '</b><span><div class="stats_histo">0</div></span>')));
                        Q(this, Qh, Mh).call(this) &&
                            t.appendChild(kf('<b>💀</b><span><div class="stats_histo">0</div></span>'));
                        var s,
                            u = B(this.shadowRoot.querySelectorAll("a"));
                        try {
                            for (u.s(); !(s = u.n()).done; )
                                s.value.addEventListener("click", function (a) {
                                    a.stopPropagation();
                                });
                        } catch (a) {
                            u.e(a);
                        } finally {
                            u.f();
                        }
                    },
                },
                {
                    key: "setStats",
                    value: function (a, e) {
                        this.shadowRoot.getElementById("stats_games").innerText = a.games;
                        var o = a.games > 0 ? Math.round((100 * a.wins) / a.games) : 0;
                        (this.shadowRoot.getElementById("stats_pct").innerText = "".concat(o, "%")),
                            (this.shadowRoot.getElementById("stats_streak").innerText = a.curstreak),
                            (this.shadowRoot.getElementById("stats_maxstreak").innerText = a.maxstreak);
                        var r = this.shadowRoot.querySelectorAll("#histo .stats_histo"),
                            i = Array.from(a.histo),
                            t = Q(this, Dh, jh).call(this);
                        Q(this, Qh, Mh).call(this) && (i[t[1] - t[0] + 1] = a.games - a.wins);
                        for (
                            var n = Math.max.apply(Math, [1].concat(v(i))),
                                s = t[1] + (Q(this, Qh, Mh).call(this) ? 1 : 0) - t[0],
                                u = 0;
                            u <= s;
                            ++u
                        ) {
                            var c,
                                l = null !== (c = i[u]) && void 0 !== c ? c : 0,
                                m = Math.floor((1e4 * l) / n) / 100;
                            (r[u].style.width = "".concat(m, "%")),
                                (r[u].innerText = l),
                                r[u].classList.toggle("dark", 0 == l);
                        }
                        this.shadowRoot.getElementById("statsnext").style.display = e ? "grid" : "none";
                    },
                },
                {
                    key: "html",
                    value: function () {
                        return '\n<div tabindex=0 id="stats"><h2>progresso</h2>\n<div id="statstable">\n  <b id="stats_games">1</b><p>jogos</p>\n  <b id="stats_pct">100%</b><p>de vitórias</p>\n  <b id="stats_streak">1</b><p>sequência<br>de vitórias</p>\n  <b id="stats_maxstreak">1</b><p>melhor<br>sequência</p>\n</div>\n\n<h2>distribuição de tentativas</h2>\n\n<div id="histo">\n</div>\n\n<div id="statsnext">\n  <div><p>próxima palavra em</p>\n    <b id="stats_time">-</b></div>\n  <div><button tabindex=0 id="stats_share">\n    compartilhe <img src="'.concat(
                            "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkFGQUZGIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTSAxOCAyIEMgMTYuMzU0OTkgMiAxNSAzLjM1NDk5MDQgMTUgNSBDIDE1IDUuMTkwOTUyOSAxNS4wMjE3OTEgNS4zNzcxMjI0IDE1LjA1NjY0MSA1LjU1ODU5MzggTCA3LjkyMTg3NSA5LjcyMDcwMzEgQyA3LjM5ODUzOTkgOS4yNzc4NTM5IDYuNzMyMDc3MSA5IDYgOSBDIDQuMzU0OTkwNCA5IDMgMTAuMzU0OTkgMyAxMiBDIDMgMTMuNjQ1MDEgNC4zNTQ5OTA0IDE1IDYgMTUgQyA2LjczMjA3NzEgMTUgNy4zOTg1Mzk5IDE0LjcyMjE0NiA3LjkyMTg3NSAxNC4yNzkyOTcgTCAxNS4wNTY2NDEgMTguNDM5NDUzIEMgMTUuMDIxNTU1IDE4LjYyMTUxNCAxNSAxOC44MDgzODYgMTUgMTkgQyAxNSAyMC42NDUwMSAxNi4zNTQ5OSAyMiAxOCAyMiBDIDE5LjY0NTAxIDIyIDIxIDIwLjY0NTAxIDIxIDE5IEMgMjEgMTcuMzU0OTkgMTkuNjQ1MDEgMTYgMTggMTYgQyAxNy4yNjc0OCAxNiAxNi42MDE1OTMgMTYuMjc5MzI4IDE2LjA3ODEyNSAxNi43MjI2NTYgTCA4Ljk0MzM1OTQgMTIuNTU4NTk0IEMgOC45NzgyMDk1IDEyLjM3NzEyMiA5IDEyLjE5MDk1MyA5IDEyIEMgOSAxMS44MDkwNDcgOC45NzgyMDk1IDExLjYyMjg3OCA4Ljk0MzM1OTQgMTEuNDQxNDA2IEwgMTYuMDc4MTI1IDcuMjc5Mjk2OSBDIDE2LjYwMTQ2IDcuNzIyMTQ2MSAxNy4yNjc5MjMgOCAxOCA4IEMgMTkuNjQ1MDEgOCAyMSA2LjY0NTAwOTYgMjEgNSBDIDIxIDMuMzU0OTkwNCAxOS42NDUwMSAyIDE4IDIgeiBNIDE4IDQgQyAxOC41NjQxMjkgNCAxOSA0LjQzNTg3MDYgMTkgNSBDIDE5IDUuNTY0MTI5NCAxOC41NjQxMjkgNiAxOCA2IEMgMTcuNDM1ODcxIDYgMTcgNS41NjQxMjk0IDE3IDUgQyAxNyA0LjQzNTg3MDYgMTcuNDM1ODcxIDQgMTggNCB6IE0gNiAxMSBDIDYuNTY0MTI5NCAxMSA3IDExLjQzNTg3MSA3IDEyIEMgNyAxMi41NjQxMjkgNi41NjQxMjk0IDEzIDYgMTMgQyA1LjQzNTg3MDYgMTMgNSAxMi41NjQxMjkgNSAxMiBDIDUgMTEuNDM1ODcxIDUuNDM1ODcwNiAxMSA2IDExIHogTSAxOCAxOCBDIDE4LjU2NDEyOSAxOCAxOSAxOC40MzU4NzEgMTkgMTkgQyAxOSAxOS41NjQxMjkgMTguNTY0MTI5IDIwIDE4IDIwIEMgMTcuNDM1ODcxIDIwIDE3IDE5LjU2NDEyOSAxNyAxOSBDIDE3IDE4LjQzNTg3MSAxNy40MzU4NzEgMTggMTggMTggeiIvPjwvc3ZnPgo=",
                            '"></button></div>\n</div>\n</div>'
                        );
                    },
                },
                {
                    key: "stylesheet",
                    value: function () {
                        return Of(
                            vh ||
                                (vh = f([
                                    "\n:host {\n  display: block;\n  pointer-events: auto;\n  font-weight: 300;\n  color: #FAFAFF;\n  font-family: 'Mitr', sans-serif;\n}\n\nb {\n  font-weight: 400;\n}\n\nh2 {\n  margin: 0.5em 0 0 0;\n  font-size: 4rem;\n  color: #FAFAFF;\n  font-weight: 500;\n  text-align: center;\n}\n\n#statstable {\n  display: grid;\n  grid-template-rows: repeat(2, 1fr);\n  grid-template-columns: repeat(4, 1fr);\n  text-align: center;\n  color: #BBB;\n  line-height: 1em;\n  padding: 2em 0;\n}\n\n#statstable b {\n  grid-row: 1;\n  color: #FAFAFF;\n  font-size: 2em;\n  padding-bottom: 0.5em;\n}\n\n#statstable p {\n  grid-row: 2;\n  height: 2em;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n\n}\n\n#histo {\n  width: 85%;\n  margin: 0 auto 1em auto;\n  display: grid;\n  grid-template-rows: repeate(7, 1fr);\n  grid-template-columns: auto 1fr;\n  grid-gap: 0.2em 0.2em;\n  font-weight: 300;\n  line-height: 1.5em;\n}\n\n#histo b {\n  font-weight: 500;\n  text-align: center;\n}\n\n#histo span div {\n  min-width: 9%;\n  font-weight: 300;\n  box-sizing: border-box;\n  padding: 0 0.75em;\n  background-color: #009AFE;\n  text-align: right;\n}\n\n#histo span div.dark {\n  background-color: #4C4347;\n}\n\n#histo p {\n  grid-column: 1 / span 2;\n  text-align: right;\n  margin: 0;\n  font-size: 0.75em;\n}\n\n#histo p img {\n  width: 2em;\n  height: 2em;\n}\n\n#statsnext {\n  margin: 3em auto 1em auto;\n  display: grid;\n  font-size: 3rem;\n  grid-template-columns: 1fr 1fr;\n  font-weight: 300;\n}\n\n#statsnext div {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#statsnext div p {\n  margin: 0;\n  color: #BBB;\n}\n\n#statsnext div b {\n  display: block;\n  font-size: 2em;\n  margin-top: 0.3rem;\n}\n\n#statsnext button {\n  font-family: 'Mitr', sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.25em;\n  background-color: #009AFE;\n  border-radius: 0.25em;\n  cursor: pointer;\n  padding: 0.75em 1.25em;\n  color: #FAFAFF;\n  border: none;\n}\n\n#statsnext button img {\n  width: 1.25em;\n  margin-left: 0.5em;\n}\n\n\n",
                                ]))
                        );
                    },
                },
            ]),
            e
        );
    })();
function jh() {
    var a,
        e = b((null !== (a = this.getAttribute("range")) && void 0 !== a ? a : "1-6").split("-"), 2),
        o = e[0],
        r = e[1];
    return [Number.parseInt(o), Number.parseInt(r)];
}
function Mh() {
    var a;
    return "true" == (null !== (a = this.getAttribute("death")) && void 0 !== a ? a : "true");
}
n(xh, "attr", ["range", "stato", "death"]), customElements.define("wc-stats", xh);
var zh = (function () {
        if ("undefined" != typeof Map) return Map;
        function a(a, e) {
            var o = -1;
            return (
                a.some(function (a, r) {
                    return a[0] === e ? ((o = r), 1) : 0;
                }),
                o
            );
        }
        return (function () {
            function e() {
                this.__entries__ = [];
            }
            return (
                Object.defineProperty(e.prototype, "size", {
                    get: function () {
                        return this.__entries__.length;
                    },
                    enumerable: 1,
                    configurable: 1,
                }),
                (e.prototype.get = function (e) {
                    var o = a(this.__entries__, e),
                        r = this.__entries__[o];
                    return r && r[1];
                }),
                (e.prototype.set = function (e, o) {
                    var r = a(this.__entries__, e);
                    ~r ? (this.__entries__[r][1] = o) : this.__entries__.push([e, o]);
                }),
                (e.prototype.delete = function (e) {
                    var o = this.__entries__,
                        r = a(o, e);
                    ~r && o.splice(r, 1);
                }),
                (e.prototype.has = function (e) {
                    return !!~a(this.__entries__, e);
                }),
                (e.prototype.clear = function () {
                    this.__entries__.splice(0);
                }),
                (e.prototype.forEach = function (a, e) {
                    void 0 === e && (e = null);
                    for (var o = 0, r = this.__entries__; o < r.length; o++) {
                        var i = r[o];
                        a.call(e, i[1], i[0]);
                    }
                }),
                e
            );
        })();
    })(),
    Ih = "undefined" != typeof window && "undefined" != typeof document && window.document === document,
    Ch =
        "undefined" != typeof global && global.Math === Math
            ? global
            : "undefined" != typeof self && self.Math === Math
              ? self
              : "undefined" != typeof window && window.Math === Math
                ? window
                : Function("return this")(),
    Nh =
        "function" == typeof requestAnimationFrame
            ? requestAnimationFrame.bind(Ch)
            : function (a) {
                  return setTimeout(function () {
                      return a(Date.now());
                  }, 1e3 / 60);
              },
    kh = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
    Fh = "undefined" != typeof MutationObserver,
    Oh = (function () {
        function a() {
            (this.connected_ = 0),
                (this.mutationEventsAdded_ = 0),
                (this.mutationsObserver_ = null),
                (this.observers_ = []),
                (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
                (this.refresh = (function (a) {
                    var e = 0,
                        o = 0,
                        r = 0;
                    function i() {
                        e && ((e = 0), a()), o && n();
                    }
                    function t() {
                        Nh(i);
                    }
                    function n() {
                        var a = Date.now();
                        if (e) {
                            if (a - r < 2) return;
                            o = 1;
                        } else (e = 1), (o = 0), setTimeout(t, 20);
                        r = a;
                    }
                    return n;
                })(this.refresh.bind(this)));
        }
        return (
            (a.prototype.addObserver = function (a) {
                ~this.observers_.indexOf(a) || this.observers_.push(a), this.connected_ || this.connect_();
            }),
            (a.prototype.removeObserver = function (a) {
                var e = this.observers_,
                    o = e.indexOf(a);
                ~o && e.splice(o, 1), !e.length && this.connected_ && this.disconnect_();
            }),
            (a.prototype.refresh = function () {
                this.updateObservers_() && this.refresh();
            }),
            (a.prototype.updateObservers_ = function () {
                var a = this.observers_.filter(function (a) {
                    return a.gatherActive(), a.hasActive();
                });
                return (
                    a.forEach(function (a) {
                        return a.broadcastActive();
                    }),
                    a.length > 0
                );
            }),
            (a.prototype.connect_ = function () {
                Ih &&
                    !this.connected_ &&
                    (document.addEventListener("transitionend", this.onTransitionEnd_),
                    window.addEventListener("resize", this.refresh),
                    Fh
                        ? ((this.mutationsObserver_ = new MutationObserver(this.refresh)),
                          this.mutationsObserver_.observe(document, {
                              attributes: 1,
                              childList: 1,
                              characterData: 1,
                              subtree: 1,
                          }))
                        : (document.addEventListener("DOMSubtreeModified", this.refresh),
                          (this.mutationEventsAdded_ = 1)),
                    (this.connected_ = 1));
            }),
            (a.prototype.disconnect_ = function () {
                Ih &&
                    this.connected_ &&
                    (document.removeEventListener("transitionend", this.onTransitionEnd_),
                    window.removeEventListener("resize", this.refresh),
                    this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
                    this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh),
                    (this.mutationsObserver_ = null),
                    (this.mutationEventsAdded_ = 0),
                    (this.connected_ = 0));
            }),
            (a.prototype.onTransitionEnd_ = function (a) {
                var e = a.propertyName,
                    o = void 0 === e ? "" : e,
                    r = kh.some(function (a) {
                        return !!~o.indexOf(a);
                    });
                r && this.refresh();
            }),
            (a.getInstance = function () {
                return this.instance_ || (this.instance_ = new a()), this.instance_;
            }),
            (a.instance_ = null),
            a
        );
    })(),
    Th = function (a, e) {
        for (var o = 0, r = Object.keys(e); o < r.length; o++) {
            var i = r[o];
            Object.defineProperty(a, i, { value: e[i], enumerable: 0, writable: 0, configurable: 1 });
        }
        return a;
    },
    Sh = function (a) {
        return (a && a.ownerDocument && a.ownerDocument.defaultView) || Ch;
    },
    Lh = Ph(0, 0, 0, 0);
function Uh(a) {
    return parseFloat(a) || 0;
}
function Rh(a) {
    for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
    return e.reduce(function (e, o) {
        return e + Uh(a["border-" + o + "-width"]);
    }, 0);
}
var Yh =
    "undefined" != typeof SVGGraphicsElement
        ? function (a) {
              return a instanceof Sh(a).SVGGraphicsElement;
          }
        : function (a) {
              return a instanceof Sh(a).SVGElement && "function" == typeof a.getBBox;
          };
function Ph(a, e, o, r) {
    return { x: a, y: e, width: o, height: r };
}
var Gh = (function () {
        function a(a) {
            (this.broadcastWidth = 0),
                (this.broadcastHeight = 0),
                (this.contentRect_ = Ph(0, 0, 0, 0)),
                (this.target = a);
        }
        return (
            (a.prototype.isActive = function () {
                var a,
                    e =
                        ((a = this.target),
                        Ih
                            ? Yh(a)
                                ? (function (a) {
                                      var e = a.getBBox();
                                      return Ph(0, 0, e.width, e.height);
                                  })(a)
                                : (function (a) {
                                      var e = a.clientWidth,
                                          o = a.clientHeight;
                                      if (!e && !o) return Lh;
                                      var r = Sh(a).getComputedStyle(a),
                                          i = (function (a) {
                                              for (
                                                  var e = {}, o = 0, r = ["top", "right", "bottom", "left"];
                                                  o < r.length;
                                                  o++
                                              ) {
                                                  var i = r[o],
                                                      t = a["padding-" + i];
                                                  e[i] = Uh(t);
                                              }
                                              return e;
                                          })(r),
                                          t = i.left + i.right,
                                          n = i.top + i.bottom,
                                          s = Uh(r.width),
                                          u = Uh(r.height);
                                      if (
                                          ("border-box" === r.boxSizing &&
                                              (Math.round(s + t) !== e && (s -= Rh(r, "left", "right") + t),
                                              Math.round(u + n) !== o && (u -= Rh(r, "top", "bottom") + n)),
                                          !(function (a) {
                                              return a === Sh(a).document.documentElement;
                                          })(a))
                                      ) {
                                          var c = Math.round(s + t) - e,
                                              l = Math.round(u + n) - o;
                                          1 !== Math.abs(c) && (s -= c), 1 !== Math.abs(l) && (u -= l);
                                      }
                                      return Ph(i.left, i.top, s, u);
                                  })(a)
                            : Lh);
                return (this.contentRect_ = e), e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
            }),
            (a.prototype.broadcastRect = function () {
                var a = this.contentRect_;
                return (this.broadcastWidth = a.width), (this.broadcastHeight = a.height), a;
            }),
            a
        );
    })(),
    qh = function (a, e) {
        var o = (function (a) {
            var e = a.x,
                o = a.y,
                r = a.width,
                i = a.height,
                t = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
                n = Object.create(t.prototype);
            return Th(n, { x: e, y: o, width: r, height: i, top: o, right: e + r, bottom: i + o, left: e }), n;
        })(e);
        Th(this, { target: a, contentRect: o });
    },
    Hh = (function () {
        function a(a, e, o) {
            if (((this.activeObservations_ = []), (this.observations_ = new zh()), "function" != typeof a))
                throw new TypeError("The callback provided as parameter 1 is not a function.");
            (this.callback_ = a), (this.controller_ = e), (this.callbackCtx_ = o);
        }
        return (
            (a.prototype.observe = function (a) {
                if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                if ("undefined" != typeof Element && Element instanceof Object) {
                    if (!(a instanceof Sh(a).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                    var e = this.observations_;
                    e.has(a) || (e.set(a, new Gh(a)), this.controller_.addObserver(this), this.controller_.refresh());
                }
            }),
            (a.prototype.unobserve = function (a) {
                if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                if ("undefined" != typeof Element && Element instanceof Object) {
                    if (!(a instanceof Sh(a).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                    var e = this.observations_;
                    e.has(a) && (e.delete(a), e.size || this.controller_.removeObserver(this));
                }
            }),
            (a.prototype.disconnect = function () {
                this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
            }),
            (a.prototype.gatherActive = function () {
                var a = this;
                this.clearActive(),
                    this.observations_.forEach(function (e) {
                        e.isActive() && a.activeObservations_.push(e);
                    });
            }),
            (a.prototype.broadcastActive = function () {
                if (this.hasActive()) {
                    var a = this.callbackCtx_,
                        e = this.activeObservations_.map(function (a) {
                            return new qh(a.target, a.broadcastRect());
                        });
                    this.callback_.call(a, e, a), this.clearActive();
                }
            }),
            (a.prototype.clearActive = function () {
                this.activeObservations_.splice(0);
            }),
            (a.prototype.hasActive = function () {
                return this.activeObservations_.length > 0;
            }),
            a
        );
    })(),
    Jh = "undefined" != typeof WeakMap ? new WeakMap() : new zh(),
    Vh = function a(e) {
        if (!(this instanceof a)) throw new TypeError("Cannot call a class as a function.");
        if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
        var o = Oh.getInstance(),
            r = new Hh(e, o, this);
        Jh.set(this, r);
    };
["observe", "unobserve", "disconnect"].forEach(function (a) {
    Vh.prototype[a] = function () {
        var e;
        return (e = Jh.get(this))[a].apply(e, arguments);
    };
});
var Wh,
    Kh,
    Xh,
    Zh = void 0 !== Ch.ResizeObserver ? Ch.ResizeObserver : Vh,
    _h = { right: "correta", place: "em outro local", wrong: "errada" },
    $h = (function () {
        s(n, Lf);
        var a,
            e,
            i = p(n);
        function n() {
            return r(this, n), i.apply(this, arguments);
        }
        return (
            t(n, [
                {
                    key: "getLetters",
                    value: function () {
                        return this.shadowRoot.querySelectorAll(".letter");
                    },
                },
                {
                    key: "getLetter",
                    value: function (a) {
                        return this.getLetters()[a];
                    },
                },
                {
                    key: "setValue",
                    value: function (a, e) {
                        this.getLetter(a).innerHTML = e;
                    },
                },
                {
                    key: "letterTo",
                    value:
                        ((e = o(
                            regeneratorRuntime.mark(function a(e, o) {
                                var r,
                                    i,
                                    t = arguments;
                                return regeneratorRuntime.wrap(
                                    function (a) {
                                        for (;;)
                                            switch ((a.prev = a.next)) {
                                                case 0:
                                                    if (
                                                        ((r = t.length > 2 && void 0 !== t[2] ? t[2] : 1),
                                                        !(i = this.getLetter(e)).classList.contains(o))
                                                    ) {
                                                        a.next = 4;
                                                        break;
                                                    }
                                                    return a.abrupt("return");
                                                case 4:
                                                    if (
                                                        ((i.style.animation = null),
                                                        i.classList.add(o),
                                                        i.classList.remove("empty"),
                                                        (i.ariaLabel = 'letra "'
                                                            .concat(i.innerText, '" ')
                                                            .concat(_h[o])),
                                                        !r)
                                                    ) {
                                                        a.next = 13;
                                                        break;
                                                    }
                                                    return (a.next = 11), gh(0.275);
                                                case 11:
                                                    a.next = 14;
                                                    break;
                                                case 13:
                                                    i.style.animationDuration = "0s";
                                                case 14:
                                                case "end":
                                                    return a.stop();
                                            }
                                    },
                                    a,
                                    this
                                );
                            })
                        )),
                        function (a, o) {
                            return e.apply(this, arguments);
                        }),
                },
                {
                    key: "setRowEmpty",
                    value: function () {
                        var a,
                            e = B(this.getLetters());
                        try {
                            for (e.s(); !(a = e.n()).done; ) a.value.classList.add("empty");
                        } catch (a) {
                            e.e(a);
                        } finally {
                            e.f();
                        }
                    },
                },
                {
                    key: "setEdit",
                    value: function (a) {
                        for (var e = this.getLetters(), o = 0; o < 5; ++o) e[o].classList.toggle("edit", o == a);
                    },
                },
                {
                    key: "victory",
                    value:
                        ((a = o(
                            regeneratorRuntime.mark(function a() {
                                var e, o, r;
                                return regeneratorRuntime.wrap(
                                    function (a) {
                                        for (;;)
                                            switch ((a.prev = a.next)) {
                                                case 0:
                                                    for (e = this.getLetters(), o = 0; o < e.length; ++o)
                                                        (r = e[o]).classList.add("done"),
                                                            Ff(r, "0.3s ease-out happy ".concat(0.05 * o, "s"));
                                                    return (a.next = 4), gh(0.55);
                                                case 4:
                                                case "end":
                                                    return a.stop();
                                            }
                                    },
                                    a,
                                    this
                                );
                            })
                        )),
                        function () {
                            return a.apply(this, arguments);
                        }),
                },
                {
                    key: "connect",
                    value: function () {
                        var a = this,
                            e = this.getAttribute("termo-row");
                        (this.tabIndex = 0),
                            this.setAttribute("role", "group"),
                            this.setAttribute("aria-label", "palavra ".concat(e)),
                            this.setAttribute("aria-live", "polite"),
                            this.setAttribute("aria-roledescription", "letra");
                        for (
                            var o = this.shadowRoot.querySelectorAll("div"),
                                r = function (r) {
                                    var i = o[r];
                                    (i.tabIndex = 0),
                                        i.setAttribute("role", "text"),
                                        i.setAttribute("aria-label", ""),
                                        i.setAttribute("aria-live", "polite"),
                                        i.setAttribute("aria-roledescription", "letra"),
                                        i.setAttribute("termo-row", e),
                                        i.setAttribute("termo-pos", r),
                                        i.addEventListener("click", function () {
                                            a.parentNode.parentNode.host.dispatchEvent(
                                                new CustomEvent("letter", {
                                                    detail: { letter: i, row: Number.parseInt(e), pos: r },
                                                })
                                            );
                                        });
                                },
                                i = 0;
                            i < o.length;
                            ++i
                        )
                            r(i);
                    },
                },
                {
                    key: "html",
                    value: function () {
                        for (var a = [], e = 0; e < 5; ++e) a.push("<div lid=".concat(e, ' class="letter"></div>'));
                        return a.join("");
                    },
                },
                {
                    key: "stylesheet",
                    value: function () {
                        return Of(
                            Wh ||
                                (Wh = f([
                                    "\n* {\n  touch-action: manipulation;\n  outline: none;\n}\n\n:host {\n  display: grid;\n  grid-template-columns: repeat(5, 1em);\n  grid-gap: 0.0625em;\n  font-size: 1em;\n  height: 1em;\n  margin: 0;\n  line-height: 0;\n}\n\n.letter {\n  aspect-ratio: 1;\n  font-weight: 600;\n  font-family: 'Mitr', sans-serif;\n  color: #FAFAFF;\n  background-color: #615458;\n  border-radius: 10%;\n  display: flex;\n  box-sizing: border-box;\n  justify-content: center;\n  align-items: center;\n  font-size: 0.65em;\n  line-height: 1em;\n  text-transform: uppercase;\n  --happy-jump: 55%;\n  cursor: pointer;\n}\n\n@keyframes rownope {\n  10%  { transform: translateX(-14px); }\n  20%  { transform: translateX(14px); }\n  30%  { transform: translateX(-8px); }\n  40%  { transform: translateX(8px); }\n  50%  { transform: translateX(-4px); }\n  60%  { transform: translateX(4px); }\n  70%  { transform: translateX(-2px); }\n  80%  { transform: translateX(2px); }\n  90%  { transform: translateX(-1px); }\n  100% { transform: translateX(1px); }\n}\n\n@keyframes happy {\n  10%  { transform: translateY(calc(var(--happy-jump)*-0.3)); }\n  20%  { transform: translateY(calc(var(--happy-jump)*-0.58)); }\n  30%  { transform: translateY(calc(var(--happy-jump)*-0.8)); }\n  40%  { transform: translateY(calc(var(--happy-jump)*-0.95)); }\n  50%  { transform: translateY(calc(var(--happy-jump)*-1)); }\n  60%  { transform: translateY(calc(var(--happy-jump)*-0.95)); }\n  70%  { transform: translateY(calc(var(--happy-jump)*-0.8)); }\n  80%  { transform: translateY(calc(var(--happy-jump)*-0.58)); }\n  90%  { transform: translateY(calc(var(--happy-jump)*-0.3)); }\n  100% { transform: translateY(0px); }\n}\n\n@keyframes flip {\n  0% {\n    background-color: transparent;\n    border: 0.125em solid #4C4347;\n    transform: perspective(200px) rotateY(0deg);\n  }\n\n  49.99999% {\n    background-color: transparent;\n    border: 0.125em solid #4C4347;\n    transform: perspective(200px) rotateY(90deg);\n  }\n\n  50% {\n    transform: perspective(200px) rotateY(-90deg);\n    background-color: var(--color);\n    border: none;\n  }\n\n  50.00001% {\n    background-color: var(--color);\n    border: none;\n  }\n\n  100% {\n    transform: perspective(200px) rotateY(0deg);\n    background-color: var(--color);\n  }\n}\n\n@keyframes type {\n  0% {\n    transform: perspective(200px) translateZ(0);\n    color: transparent;\n  }\n\n  24.99999% {\n    color: transparent;\n  }\n\n  25% {\n    transform: perspective(200px) translateZ(30px);\n    color: #FAFAFF;\n  }\n\n  100% {\n    transform: perspective(200px) translateZ(0);\n    color: #FAFAFF;\n  }\n}\n\n.letter.edit {\n  border-bottom: 0.25em solid #4C4347 !important;\n}\n\n.letter.ontype {\n  animation: 0.15s ease-out type 0s none;\n}\n\n.letter.empty {\n  background-color: transparent;\n  border: 0.125em solid #4C4347;\n}\n\n.letter.right {\n  --color: var(--colorRight);\n  animation: 0.45s linear flip 0s forwards;\n}\n\n.letter.place {\n  --color: var(--colorPlace);\n  animation: 0.45s linear flip 0s forwards;\n}\n\n.letter.wrong {\n  --color: var(--colorWrong);\n  animation: 0.45s linear flip 0s forwards;\n}\n\n.letter.done {\n  background-color: var(--colorRight);\n}\n    ",
                                ]))
                        );
                    },
                },
            ]),
            n
        );
    })();
n($h, "attr", ["termo-row"]), customElements.define("wc-row", $h);
var aw,
    ew = null !== (Kh = window.ResizeObserver) && void 0 !== Kh ? Kh : Zh,
    ow = new WeakMap(),
    rw = (function () {
        s(e, Lf);
        var a = p(e);
        function e() {
            var o;
            r(this, e);
            for (var i = arguments.length, t = new Array(i), n = 0; n < i; n++) t[n] = arguments[n];
            return j(g((o = a.call.apply(a, [this].concat(t)))), ow, { writable: 1, value: null }), o;
        }
        return (
            t(e, [
                {
                    key: "connect",
                    value: function () {
                        E(this, ow, new ew(this.resize.bind(this))), y(this, ow).observe(this.parentNode);
                    },
                },
                {
                    key: "html",
                    value: function () {
                        return "<div id=hold></div>";
                    },
                },
                {
                    key: "stylesheet",
                    value: function () {
                        return Of(
                            Xh ||
                                (Xh = f([
                                    "\n:host {\n  user-select: none;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  font-size: 100em;\n  margin: 0 0.2em;\n  box-sizing: border-box;\n}\n\n#hold {\n  font-size: 1em;\n  display: grid;\n  grid-template-rows: repeat(auto-fill, 1em);\n  grid-gap: 0.0625em;\n  margin: 0;\n  padding: 0;\n}\n\n@keyframes rownope {\n  10%  { transform: translateX(-14px); }\n  20%  { transform: translateX(14px); }\n  30%  { transform: translateX(-8px); }\n  40%  { transform: translateX(8px); }\n  50%  { transform: translateX(-4px); }\n  60%  { transform: translateX(4px); }\n  70%  { transform: translateX(-2px); }\n  80%  { transform: translateX(2px); }\n  90%  { transform: translateX(-1px); }\n  100% { transform: translateX(1px); }\n}\n    ",
                                ]))
                        );
                    },
                },
                {
                    key: "addRow",
                    value: function () {
                        var a = this.shadowRoot.querySelectorAll("wc-row").length;
                        return (
                            this.shadowRoot
                                .getElementById("hold")
                                .append(kf("<wc-row termo-row=".concat(a, "></wc-row>"))),
                            a
                        );
                    },
                },
                {
                    key: "update",
                    value: function () {
                        var a,
                            e = Number.parseInt(null !== (a = this.getAttribute("rows")) && void 0 !== a ? a : 6);
                        if (-1 != e) {
                            for (var o = this.shadowRoot.querySelectorAll("wc-row"), r = e; r < o.length; ++r)
                                this.shadowRoot.getElementById("hold").removeChild(o[r]);
                            for (var i = Math.min(e, o.length); i < e; ++i) this.addRow();
                        }
                    },
                },
                {
                    key: "resize",
                    value: function () {
                        var a,
                            e = Number.parseInt(null !== (a = this.getAttribute("rows")) && void 0 !== a ? a : 6),
                            o = this.clientWidth / 5.65,
                            r = -1 == e ? 1e7 : this.clientHeight / (e + 0.0625 * (e - 1)),
                            i = Math.floor(Math.min(o, r));
                        this.style.fontSize = "".concat(i, "px");
                    },
                },
                {
                    key: "getRow",
                    value: function (a) {
                        return this.shadowRoot.querySelectorAll("wc-row")[a];
                    },
                },
                {
                    key: "getAllRows",
                    value: function () {
                        return this.shadowRoot.querySelectorAll("wc-row");
                    },
                },
            ]),
            e
        );
    })();
n(rw, "attr", ["rows"]), customElements.define("wc-board", rw);
var iw = (function () {
    s(e, Lf);
    var a = p(e);
    function e() {
        return r(this, e), a.apply(this, arguments);
    }
    return (
        t(e, [
            {
                key: "connect",
                value: function () {
                    var a,
                        e = B(this.shadowRoot.querySelectorAll("a"));
                    try {
                        for (e.s(); !(a = e.n()).done; )
                            a.value.addEventListener("click", function (a) {
                                a.stopPropagation();
                            });
                    } catch (a) {
                        e.e(a);
                    } finally {
                        e.f();
                    }
                },
            },
            {
                key: "isOpen",
                value: function () {
                    return this.classList.has("show");
                },
            },
            {
                key: "show",
                value: function () {
                    this.classList.add("show");
                },
            },
            {
                key: "hide",
                value: function () {
                    this.classList.remove("show");
                },
            },
            {
                key: "disableLink",
                value: function (a) {
                    var e = this.shadowRoot.getElementById(a);
                    e && (e.classList.add("nope"), e.removeAttribute("href"));
                },
            },
            {
                key: "html",
                value: function () {
                    return '\n  <div id=left>\n<a id="termo" href=\'https://term.ooo\'>termo</a>\n<a id="duo" href=\'https://term.ooo/2\'>dueto</a>\n<a id="quatro" href=\'https://term.ooo/4\'>quarteto</a>\n</div>\n<div id="right">\n<a id="about" href=\'https://term.ooo/sobre\'><img src=\''.concat(
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02My41MDA0IDI0QzQxLjY4NDQgMjQgMjQgNDEuNjg0IDI0IDYzLjQ5OTZDMjQgODUuMzE1MiA0MS42ODQ0IDEwMyA2My41MDA0IDEwM0M4NS4zMTY0IDEwMyAxMDMgODUuMzE1MiAxMDMgNjMuNDk5NkMxMDMgNDEuNjg0IDg1LjMxNjQgMjQgNjMuNTAwNCAyNFpNNzAuMzkyMiA4Ni44NTgxQzcwLjM5MjIgOTAuMzk5MyA2Ny4zMzA0IDkzLjI2ODcgNjMuNTU0MyA5My4yNjg3QzU5Ljc3ODIgOTMuMjY4NyA1Ni43MTY0IDkwLjM5OTMgNTYuNzE2NCA4Ni44NTgxVjU3LjQ0NjJDNTYuNzE2NCA1My45MDU5IDU5Ljc3ODIgNTEuMDM1NiA2My41NTQzIDUxLjAzNTZDNjcuMzMwNCA1MS4wMzU2IDcwLjM5MjIgNTMuOTA1OSA3MC4zOTIyIDU3LjQ0NjJWODYuODU4MVpNNjMuNTAwNCA0OC4zOTIyQzU5LjQzOTUgNDguMzkyMiA1Ni4xNDY5IDQ1LjEwMDUgNTYuMTQ2OSA0MS4wMzhDNTYuMTQ2OSAzNi45NzY0IDU5LjQzODcgMzMuNjg0NiA2My41MDA0IDMzLjY4NDZDNjcuNTYyOSAzMy42ODQ2IDcwLjg1NDcgMzYuOTc2NCA3MC44NTQ3IDQxLjAzOEM3MC44NTM5IDQ1LjEwMDUgNjcuNTYyMSA0OC4zOTIyIDYzLjUwMDQgNDguMzkyMloiIGZpbGw9IiNGQUZBRkYiLz4KPC9zdmc+Cg==",
                        "'></a></div>\n  "
                    );
                },
            },
            {
                key: "stylesheet",
                value: function () {
                    return Of(
                        aw ||
                            (aw = f([
                                "\n:host {\n  transition: height 0.5s ease-in-out;\n  height: 0;\n  overflow: hidden;\n  flex-shrink: 0;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  display: grid;\n  grid-template-columns: auto auto;\n  grid-template-rows: 3em;\n  grid-gap: 0;\n  color: #FAFAFF;\n  font-family: 'Mitr', sans-serif;\n  font-weight: 400;\n  font-size: 3em;\n  background-color: #222;\n  user-select: none;\n  z-index: 15000;\n}\n\n:host(.show) {\n  height: 3em;\n}\n\n.nope {\n  opacity: 0.25;\n}\n\n#left, #right {\n  padding: 0;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  flex-direction: row;\n}\n\n#left {\n  justify-content: flex-start;\n}\n\n#right {\n  justify-content: flex-end;\n}\n\na {\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-decoration: none;\n  line-height: 1.5em;\n  height: 4vh;\n  color: #FAFAFF;\n  padding: 0 1em;\n  margin: 0;\n}\n\nimg {\n  height: 1.5em;\n  margin: 0;\n  padding: 0;\n  float: right;\n}\n\n",
                            ]))
                    );
                },
            },
        ]),
        e
    );
})();
n(iw, "attr", []), customElements.define("wc-bar", iw);
var tw = ce,
    nw = L,
    sw = pa,
    uw = io,
    cw = function (a) {
        return void 0 !== a && (tw(a, "value") || tw(a, "writable"));
    },
    lw = N,
    mw = Ng;
di(
    { target: "Reflect", stat: 1 },
    {
        get: function a(e, o) {
            var r,
                i,
                t = arguments.length < 3 ? e : arguments[2];
            return uw(e) === t
                ? e[o]
                : (r = lw.f(e, o))
                  ? cw(r)
                      ? r.value
                      : void 0 === r.get
                        ? void 0
                        : nw(r.get, t)
                  : sw((i = mw(e)))
                    ? a(i, o, t)
                    : void 0;
        },
    }
);
var Aw = C,
    gw = zc;
di({ global: 1 }, { Reflect: {} }), gw(Aw.Reflect, "Reflect", 1);
var dw = new Proxy(
    {},
    {
        get: function (a, e) {
            var o = Reflect.get(a, e);
            return o || (o = a[e] = document.querySelector("wc-".concat(e))), o;
        },
    }
);
function pw(a, e) {
    (a.style.animation = null), a.getClientRects(), (a.style.animation = e);
}
function fw(a) {
    dw.notify.popup(a);
}
function bw() {
    dw.notify.popoff();
}
function vw() {
    dw.modal.getModal("config").setConfig({ highContrast: Xf.highContrast, hardMode: Xf.hardMode }),
        document.body.classList.toggle("high", Xf.highContrast);
}
var hw = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView,
    ww = fr,
    Bw = Er,
    yw = C.RangeError,
    Ew = C.Array,
    Dw = Math.abs,
    Qw = Math.pow,
    xw = Math.floor,
    jw = Math.log,
    Mw = Math.LN2,
    zw = {
        pack: function (a, e, o) {
            var r,
                i,
                t,
                n = Ew(o),
                s = 8 * o - e - 1,
                u = (1 << s) - 1,
                c = u >> 1,
                l = 23 === e ? Qw(2, -24) - Qw(2, -77) : 0,
                m = a < 0 || (0 === a && 1 / a < 0) ? 1 : 0,
                A = 0;
            for (
                (a = Dw(a)) != a || a === 1 / 0
                    ? ((i = a != a ? 1 : 0), (r = u))
                    : ((r = xw(jw(a) / Mw)),
                      a * (t = Qw(2, -r)) < 1 && (r--, (t *= 2)),
                      (a += r + c >= 1 ? l / t : l * Qw(2, 1 - c)) * t >= 2 && (r++, (t /= 2)),
                      r + c >= u
                          ? ((i = 0), (r = u))
                          : r + c >= 1
                            ? ((i = (a * t - 1) * Qw(2, e)), (r += c))
                            : ((i = a * Qw(2, c - 1) * Qw(2, e)), (r = 0)));
                e >= 8;

            )
                (n[A++] = 255 & i), (i /= 256), (e -= 8);
            for (r = (r << e) | i, s += e; s > 0; ) (n[A++] = 255 & r), (r /= 256), (s -= 8);
            return (n[--A] |= 128 * m), n;
        },
        unpack: function (a, e) {
            var o,
                r = a.length,
                i = 8 * r - e - 1,
                t = (1 << i) - 1,
                n = t >> 1,
                s = i - 7,
                u = r - 1,
                c = a[u--],
                l = 127 & c;
            for (c >>= 7; s > 0; ) (l = 256 * l + a[u--]), (s -= 8);
            for (o = l & ((1 << -s) - 1), l >>= -s, s += e; s > 0; ) (o = 256 * o + a[u--]), (s -= 8);
            if (0 === l) l = 1 - n;
            else {
                if (l === t) return o ? NaN : c ? -1 / 0 : 1 / 0;
                (o += Qw(2, e)), (l -= n);
            }
            return (c ? -1 : 1) * o * Qw(2, l - e);
        },
    },
    Iw = ne,
    Cw = wr,
    Nw = Qr,
    kw = function (a) {
        for (
            var e = Iw(this),
                o = Nw(e),
                r = arguments.length,
                i = Cw(r > 1 ? arguments[1] : void 0, o),
                t = r > 2 ? arguments[2] : void 0,
                n = void 0 === t ? o : Cw(t, o);
            n > i;

        )
            e[i++] = a;
        return e;
    },
    Fw = C,
    Ow = Z,
    Tw = F,
    Sw = hw,
    Lw = or,
    Uw = fo,
    Rw = Qc,
    Yw = k,
    Pw = Sc,
    Gw = fr,
    qw = Er,
    Hw = function (a) {
        if (void 0 === a) return 0;
        var e = ww(a),
            o = Bw(e);
        if (e !== o) throw yw("Wrong length or index");
        return o;
    },
    Jw = zw,
    Vw = Ng,
    Ww = Lu,
    Kw = gr.f,
    Xw = _e.f,
    Zw = kw,
    _w = Ts,
    $w = zc,
    aB = Lw.PROPER,
    eB = Lw.CONFIGURABLE,
    oB = Xo.get,
    rB = Xo.set,
    iB = Fw.ArrayBuffer,
    tB = iB,
    nB = tB && tB.prototype,
    sB = Fw.DataView,
    uB = sB && sB.prototype,
    cB = Object.prototype,
    lB = Fw.Array,
    mB = Fw.RangeError,
    AB = Ow(Zw),
    gB = Ow([].reverse),
    dB = Jw.pack,
    pB = Jw.unpack,
    fB = function (a) {
        return [255 & a];
    },
    bB = function (a) {
        return [255 & a, (a >> 8) & 255];
    },
    vB = function (a) {
        return [255 & a, (a >> 8) & 255, (a >> 16) & 255, (a >> 24) & 255];
    },
    hB = function (a) {
        return (a[3] << 24) | (a[2] << 16) | (a[1] << 8) | a[0];
    },
    wB = function (a) {
        return dB(a, 23, 4);
    },
    BB = function (a) {
        return dB(a, 52, 8);
    },
    yB = function (a, e) {
        Xw(a.prototype, e, {
            get: function () {
                return oB(this)[e];
            },
        });
    },
    EB = function (a, e, o, r) {
        var i = Hw(o),
            t = oB(a);
        if (i + e > t.byteLength) throw mB("Wrong index");
        var n = oB(t.buffer).bytes,
            s = i + t.byteOffset,
            u = _w(n, s, s + e);
        return r ? u : gB(u);
    },
    DB = function (a, e, o, r, i, t) {
        var n = Hw(o),
            s = oB(a);
        if (n + e > s.byteLength) throw mB("Wrong index");
        for (var u = oB(s.buffer).bytes, c = n + s.byteOffset, l = r(+i), m = 0; m < e; m++)
            u[c + m] = l[t ? m : e - m - 1];
    };
if (Sw) {
    var QB = aB && "ArrayBuffer" !== iB.name;
    if (
        Yw(function () {
            iB(1);
        }) &&
        Yw(function () {
            new iB(-1);
        }) &&
        !Yw(function () {
            return new iB(), new iB(1.5), new iB(NaN), QB && !eB;
        })
    )
        QB && eB && Uw(iB, "name", "ArrayBuffer");
    else {
        (tB = function (a) {
            return Pw(this, nB), new iB(Hw(a));
        }).prototype = nB;
        for (var xB, jB = Kw(iB), MB = 0; jB.length > MB; ) (xB = jB[MB++]) in tB || Uw(tB, xB, iB[xB]);
        nB.constructor = tB;
    }
    Ww && Vw(uB) !== cB && Ww(uB, cB);
    var zB = new sB(new tB(2)),
        IB = Ow(uB.setInt8);
    zB.setInt8(0, 2147483648),
        zB.setInt8(1, 2147483649),
        (!zB.getInt8(0) && zB.getInt8(1)) ||
            Rw(
                uB,
                {
                    setInt8: function (a, e) {
                        IB(this, a, (e << 24) >> 24);
                    },
                    setUint8: function (a, e) {
                        IB(this, a, (e << 24) >> 24);
                    },
                },
                { unsafe: 1 }
            );
} else
    (nB = (tB = function (a) {
        Pw(this, nB);
        var e = Hw(a);
        rB(this, { bytes: AB(lB(e), 0), byteLength: e }), Tw || (this.byteLength = e);
    }).prototype),
        (uB = (sB = function (a, e, o) {
            Pw(this, uB), Pw(a, nB);
            var r = oB(a).byteLength,
                i = Gw(e);
            if (i < 0 || i > r) throw mB("Wrong offset");
            if (i + (o = void 0 === o ? r - i : qw(o)) > r) throw mB("Wrong length");
            rB(this, { buffer: a, byteLength: o, byteOffset: i }),
                Tw || ((this.buffer = a), (this.byteLength = o), (this.byteOffset = i));
        }).prototype),
        Tw && (yB(tB, "byteLength"), yB(sB, "buffer"), yB(sB, "byteLength"), yB(sB, "byteOffset")),
        Rw(uB, {
            getInt8: function (a) {
                return (EB(this, 1, a)[0] << 24) >> 24;
            },
            getUint8: function (a) {
                return EB(this, 1, a)[0];
            },
            getInt16: function (a) {
                var e = EB(this, 2, a, arguments.length > 1 ? arguments[1] : void 0);
                return (((e[1] << 8) | e[0]) << 16) >> 16;
            },
            getUint16: function (a) {
                var e = EB(this, 2, a, arguments.length > 1 ? arguments[1] : void 0);
                return (e[1] << 8) | e[0];
            },
            getInt32: function (a) {
                return hB(EB(this, 4, a, arguments.length > 1 ? arguments[1] : void 0));
            },
            getUint32: function (a) {
                return hB(EB(this, 4, a, arguments.length > 1 ? arguments[1] : void 0)) >>> 0;
            },
            getFloat32: function (a) {
                return pB(EB(this, 4, a, arguments.length > 1 ? arguments[1] : void 0), 23);
            },
            getFloat64: function (a) {
                return pB(EB(this, 8, a, arguments.length > 1 ? arguments[1] : void 0), 52);
            },
            setInt8: function (a, e) {
                DB(this, 1, a, fB, e);
            },
            setUint8: function (a, e) {
                DB(this, 1, a, fB, e);
            },
            setInt16: function (a, e) {
                DB(this, 2, a, bB, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setUint16: function (a, e) {
                DB(this, 2, a, bB, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setInt32: function (a, e) {
                DB(this, 4, a, vB, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setUint32: function (a, e) {
                DB(this, 4, a, vB, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setFloat32: function (a, e) {
                DB(this, 4, a, wB, e, arguments.length > 2 ? arguments[2] : void 0);
            },
            setFloat64: function (a, e) {
                DB(this, 8, a, BB, e, arguments.length > 2 ? arguments[2] : void 0);
            },
        });
$w(tB, "ArrayBuffer"), $w(sB, "DataView");
var CB = { ArrayBuffer: tB, DataView: sB },
    NB = di,
    kB = Z,
    FB = k,
    OB = io,
    TB = wr,
    SB = Er,
    LB = hs,
    UB = CB.ArrayBuffer,
    RB = CB.DataView,
    YB = RB.prototype,
    PB = kB(UB.prototype.slice),
    GB = kB(YB.getUint8),
    qB = kB(YB.setUint8);
NB(
    {
        target: "ArrayBuffer",
        proto: 1,
        unsafe: 1,
        forced: FB(function () {
            return !new UB(2).slice(1, void 0).byteLength;
        }),
    },
    {
        slice: function (a, e) {
            if (PB && void 0 === e) return PB(OB(this), a);
            for (
                var o = OB(this).byteLength,
                    r = TB(a, o),
                    i = TB(void 0 === e ? o : e, o),
                    t = new (LB(this, UB))(SB(i - r)),
                    n = new RB(this),
                    s = new RB(t),
                    u = 0;
                r < i;

            )
                qB(s, u++, GB(n, r++));
            return t;
        },
    }
);
for (
    var HB = window.atob(
            "fgWqAEIEgQFgAzMC/wBpBcYApwSJApsBIgVnAaECrAMaBQgAAAXMAdIBlgD3BPUDZwN8AnYBmgQWA6IDJwXDA0sDyQMIBCEDsQT+BM8ATAG6BKsBbQDQA/MDMQNXAdwEGgAGA1MEQwABARABnQFeBFYC1QOrBFIAXwINA40ELwTOAW8FJwIgBdcCngJMBN8AmgDCAOUBHwAcAl4BcQMXBGUBjQELARcF1QCTBa0CBwPuA9YC1QR4BCsAkgVAAHAFrwFpAh8B0wFKBNoC0AIYBeQDjQArBOwE4QP3AdwABQBhBbkAzwGLBJECjwPZAaYCqQBdA5AAjgT7AFwAYgChAAIDAAFxAAMAxgRbBE0DYwR1Ak0EOgH9AxwAwwTqASsD+AOfBW4AywEpAz0FUAPUAJUFjAVrAMAADQUjAPEDRAGDAZkBpwNLBDkCPAKqBJ0COAECAY4A8wElAf4D1gPsAb0BTQVOAFYALQBIAowAjgW1ApMA4ADjAKMESwDkAS8D6AHLAuMBQgK/AzcFFACEA/ADYAQ+ASgAigNGBGcCRwJAAegAFQLTBEUBwwDmA7UBHwQKAogBPAUBApMC0ASbAhACngFkAtcBeAFGApQCBAO+AGAADAKDA7UE8gB0AUUFUwBOAmIEFgF4A7IEhASNAkoBLASBAvECNQNIBfQD3gOHAlcC+QDhBMUAbgWyAxICTgR4BWEBegGoANMD+QIUAXYEEQI7BLAATwBeAv0AvAHZAp0E5wM/A1MCLQRqAZsFgABbA+4AYwA8AHoFbwDCAZoFVQR5ACQBwQOIAmgEnAT8BIkFTgPbAT0AVQDyAlkEmgKDBSUA7QGYAGYFXwQgAuUCigGRA9oBbgJMAqQCDQIPAg8A3wMfBfQALAH/AV0E7gLRBIYAXQExASoF5ACxATQBcgRvAUkAogKhBV8BUgEbBHAApQH7A7wA+wKsAFQBugKKBJEBcwWPAAUFKAO3AM4DTAVSAxMDBgE7AR8DLgKZAN0BIwROBXQEDQDKAb8CGAE4AD4FIQH+ARIDuANkBIABPwUQAC8CAwQ6AAgDVQWPBXoDFQFkAXMDrwPUBKgBuQFABKYAjgIaBAIEFQPXAzYF3gS2AasDbwLuBN0DNQUoBX0AfwMJAqoCcQFxBLMD6AIOApcFLQJZBXICggDZA8oA6gTdBLcDlQRYAOYBBwRBBfQCMASEAjUBewOiBJQBIATjAzcDAwJ+AEYF6wJ/BSUCpAOmBKAAUQRhAAcFWwIZAKABgQSFAooAUQKhAwcBTwVsArsELAN+BFMBlAM6A4wEnQDmAPoDBQK+BO8DBAGFBE8C5AIyAuUDDACMAfACvAL2BIIDawV3Ag4EFwIPBOkEzQCSAdUBrAETBEoAtAL2AFAFUAQnAMUD3gAkBY4BRACJAwkAjgM8Ab8AaQBcAsEBcgHxBBwDBgV+AbECPgK7ArkE8QEeBFwDlgI8A3IAAQUMBKIBUgQ0ApABagSfAWwBdAIuAzkDSQW0AxYF4AFiA0IAMAOeA3sAeQTMAJkFswRlApgFjQVkAFkChgQbA5MEGwA6BSkAuAEiAZ8A6wGwBFACEgFLBSsCFgT4ApoBggSPBDIBJALFAYAESAQiA/kD+wFHBckAeADEAoEDRwGdA8oDVgXRAxQDlAXJBNIEXgAMBWsEEgXCBB0FHQFDA3YF/AAuBQ0EbAW3At8BwQJ5AoYCiAC6AakBNACtBBEBMgWrAs4A6wQxAD8BIAB2A8YBVwAvBbMCoAUhAv0C1gT2AXYCEwXiAdEAdANoAjoEswBEAksCRAWWA7ABVQOKBW0FCAJMAEEE9wKHAOIAZQC/BDgEKQQ5AU0BvAQEBcQBDgBqA/UA/QEmBYQFzALaBMcDrwDHAXECiAQFAcwEdwAhAGQDCgDHAOkBMwEPA1EDAAIzBM0EkAUaAioETwNfABAD7ANWA/wDRwAyACIEBABJAWoCVgQmAUEDcwAyBK0B7QI3AhcB2gPnAPIDagXsAq4CIgAZAwgF1APsAHABlgTGA8EE3AIvATwE1wRLASgE9ATCAwkDJwOyAE8ERQT7BEID7gGUAJwFLQWbAK4ExASjAkYB0AA9BEcEFwD8AmgBIgKeAKgDgAXFAlIF+QEeA5UCfQJQAFgFEAXIBN0CAATYAJYBOwIlBB0DvgPrAMgDSgNVAusDYQKQAiEFlQCxA2wE7QShBPMEIQTbA3wAGQSKAmgFWgV5AyABdwTDAQ4AEARUA3oEDQGPAWICYgHtA1cFfQQsBTkAHgKCAuICYwUVAB4ARAN7BfQBawIuBHIDjAK7AzUEXQUzBRsCAQAYAm4DlAQAA5cCoAQ4BXcFiwU+AyQDugPgA4EFJgT6AosAFAXiA3UDXAHcAV0AvwHSA2YBSQRmAH8CMAGhAX0FfAQDATsALADTAkgDBATdAFgB4QCjAKcAZwSFAYwDfgKoBF4DCgPkBDMDNgCsAvYCMALLBJMDtwSVA0UApAD6AG4ELgB6AC0BCQW+Ab0DagDoBEQExwSdBZ8EkQTyASMCMgNYBDECBQRsANQC8wKkBCYDdQHIATEFWQCvBFoAswETAAwDQwWSA30BfAMnAa0AoANUBFMDPgTTANQB5QBZA7gCcQUCAAYErQPYA+MCtgKlA7oATwGqAcQA/gKcAlcEwAHpA6cBKAIGACkF4QK8AzgCOQXoAz0CkgThAZgBowPAAz0BFwMDA70CpAG4AOoDHQCGAZ8DgwQBA2YDXARAAmAF7QD6BEkCtgM0A8IC3AOlAioCJgA2AzUAWgTXAJkCqQJgAjsF+ASIAxUEVgHYAqcCCgHvAqkEdQTbBAsFSABtAzgD0gILBHMEUwXQAZwBUQVDBOcCCgURAFcDlwGuATYC+gEtA5YFhQAzAAoEhwQZAssAiAWVAQsDaAORAHYAQAOrAG8DmQQeBVsAPwAWAo0DXAU3AJkDnAO9BJoDDgVGAG0EGgHgAssDEQUoAc4ExAN5BVUBbwQdBKgC1gBkBc8EwARwApgEgwLbAm4BSAHwAcAC8wDpAL0AhgX2A0MCdQD1AQcAlwClABgErgNGAw4B1QKiACsBCwJABVgDYAFUACQAZgK2BJsE4ARsA2sDEgDNAcgAAgX+ACkCKgFaAekCmwOXBFEBNwE5BMoEGwFBAs0CpgE/AmsB2QAjARMB5wSFBYIBcASPAgQChAGJAM4CcgV7ASUDyQGwA9IAwwIuAXUFfAG2AOcBZgRnBXkBQgGqA/gBRQN7AiMD5QRbAWEDUAFwA0oCiwNoAN8CJAQBBIUDggVlA7IC/wJiBUcDNARzAv0EygJjA9oA5gKQA7kC3gEJAU4B8AR4AtgB+QSuAFQChwE9A+IEuwEFAw8BlwN/ABgDtQN/AXsEdAAbBTQFWgJCBVQFLAIZBdECiQT3AEUC8ABNAB8CUQAYAFsFNgE2BBUFegJBAXQF0QFjAvgAHQLGAlICngSlBLACnwKYAioA8gSxAM8CSgVpA4ACHAX3A9kEuAQ+ACUFGQERA5EFWQGmA5gDrATxAHcDyQLbADEELwBlBFoDFAIrBeoCtQDvAIYDgANlBQsA9QKQBJMBJgL1BBEE3wQAAHcBKgP/BK8CNwRjAUEA7wQ1AqkDcwEnBKMBwQBfBc8DMAW7ALkDxQR8BYEABwI7AwgBnACEAH8EQwHvAYMAbQJnAH4DYQReBQ8FtAGeBYcDFgC0AIkB4wQaAwMFHAGyAYsBvgIeAV0CIwXqALcBFASSAkkDAgLmBAwBfQMgA/wBzAPeAmkEiwLWAbQEyAI/BDoC/wNYApIAhwVfA2kBTQLYBG0BDgMJBKACxwJMAxwEEwIpATAAzQMSBAYCVAQcA1QAiAQRBWIB6QL2A6YBNwIfAQAFWwLZAo0D4gTfADICEwAkAMAEzASkA3AF/ALnACgEqQQIBGgCkQBvBSAB8ALYA8EBNgT0A1YFXgAGA5AEFALGAnACzgP/AWEDzQR6A/YE1QKUAnsEjACUAdEDQAJ4A2wDDQOhASoDBATeAZICBgF3BVEFsgSVABACJQLmAZkCygKUA/gBMQT9AuUDqQLVAzgBwgMjAv0DSwCYARYCsAF5AyUANgFRBHkBsQHNAYYAAwCUBWEBLAKDBDwCdQPCAX0DEwJHAJ4BZQKBAaQEFQUlBLoE9gHQAhcAXASfA2YBdQFZAfsCSAOzAYgCAgCKAsoACAXNA48BaQJiBTsEJwF+AFcCrwQfAtkDJwIEAmoF0gG/BOoEbwMIA3wDsAD5BCICGAHrA2AEGgQNBPcBUQEHAbIC+QDbAAsCkAUJBQwA8gECBbkBmgCvA3UAYQVDBTgEwwAWALMALAR/BE4ClgVhAtAEUwCWAC0DcwFEBJYEWAAoA8gDQgGyA18BoAAmABgCCgN5AKUCyAGABeEBDwDlAt0C8wG0A3EDAgOBBOICawFmAAUAhgLFBNYDMAWfBV4DiwVEABUAYwIbBZgCmANWAA8BxQMvA9cCZQWtAh0AKwXzA3kFMQDuARgEGwCvAjsCTAFZBAEFMgB6AmgFwQS8AAUCCQQeAk0AoQVSAR4AmgJyAZsCZwJNBbcBLAC1AL0EiwMjAFcBtgGIAckCmQHhBGQESwKRAbcASALXBPwAywTKA0EBLwHMAlYBnAKEARwAqADkAJkAzABKAFUAdQV5BBQE0wAVAnoASwMTBeMB8QP5AdABQQRhAKABFQQpBKoEzAFlAz4CTgShAMQDmAVPA1oC+gAHBWYCNwVmBP4BZgVFAsYAzQAnAygCjwUYAJIE3ACBA+YCEgB2ABADyAR7AbYDugBIBa8AUAFkBQkDrQCkAXICuAOuALMExAGOBboDhwB6BY8AOwH1AlQCRgSFAC0CBgIsA6UBmwHaAlkCJAPoAtIE4AOdAEYAvQC+BEABgADSAJEDJAFPBJoEwQAUAPcDuARBAI4C6gK6AssBVAVrBEwC3AEiAx4FVQKsAdEA3wHkAVQD7QQBBPgDwgTEBHcEBwMRAHAEsAKoAZgA7ADFAaEDfwVJBbgBSgPeAv0BkANyBOwD9QDJAx0FzwJNAlMCxAAmBU0EqgCkAJUB4wRzAkMDWgDvBDsFXwQqASMB5QQ6BPoBRwRKAu0A/wLAAksEHQOpA3EFuwQSAm8EgwGoBJ8AHwTIAFUDGgBdAIUBlQWTBL8CvQJ8AKcDZgPOACEDMgPQA8MEpgDwAWwBiwANAqcCIQVPAOgB9gCtAzoBcQC4AkUEkwGOAKEC+gTTAa4EYgK1AW0FbQFzBQAD5gPzBAMCuQD/BAoEPwMWA3MAWAXWAJsAfgGuAngBTwEgAOUBawU/BVwDUAU1AvcAhQUHBLQBnwQWBFICPACKBWADfAFPBaACQwGgA4cBGAVDBGoD+AD+ApMFCgUzBbgA5wTSA4wBBgWNAF0D/gQJAYIBjwQBA/IAIAWJANgCbQOeAkUFiQR3ASUBAgE/BBIE/wAMAn8D2AGmBPADUgU9AccBWgE9BNMD+gOLBKsEJgMwAXAAggM5ACAD1AIVAfgCDAPuAIwFIgEEAc8EQQUiAOgDPgRYAjIENwEWBRAE5AJqBNYEzgHfAyQFRQEwA+QDkgMDAXoB5wENACcEOQGiAbwCgQB6BJACIQSMBIgDVgJpBKUALwDqATEFHASaAQYAQgLfAnsAdQLqALIAVwULBe8D3QS9AcICrAJ2BBMBrgG+AcEDEQLBAr8BkwPgAAoBVwTRAb4DrANYBNoB7gKdASkFHAXnAuYARAF2AkIEXAIDBUwDSwWABGMEWwGBBcYBJQX7ABkEJASTAIQASwEFBXcDNwCCAAsDYgCBAhEBaAQ8Ax8AOAOWAj0CuwGPA3gEKwBgAEcCPgPDA5UDnAFAAHQEVAGCAjsDbgOJBewBuwOoAgABPAH0ATAEzwErA8cCZwTLAz4FAwPoANcDQQNrA/ICaABqAnMDRAMGBBoC+wExAp4ExgOJA6sBNAHVBDUEUwHyA2wAxwAgBFAEcwR8BewC6AQBAWQBaQEmBNMChATpAHwEUwTvAvkDbARcAR8D1AGvATYAmgVHA50DWQAOBPMAbQTwADUBEgFNA0MAiwFuAcYEKgAjBbcE/QScBbsCUABnANsDYAWrA9ECrQT3BEAEDQUQBZcAkACtAYoAhwM4Bb8ATADbAioCHAKGBMcEDAV8AsADQQLiA6MEewW3A2kFTwIdAg8FeAJcAC4EdQTEAmMD1AQrAj0FGwIOBTQEiAW8AZ8CYgSEA34CpgM5BY0ETAR3AH0E6wE6Ay8EHgTxAc8DeAXtAn0AawK8A48CQgBcBbADyQTeA/AEMwQZALEEyAL1A30BBQQHAPEEfgXAADQFpwRyAzYFNwNQAkYF1ABeAnsCmwSFBJcEgAOZBQkCEwN5AgQDlAAZA30CdwIiBS0AMgV/AaUDEgO5BNQDgwOQAZcD9ACVAmUBGwMdAQAC/gNlAGwChwXVABUDwwKjAzkElwEQAA4BzwAMATUD/wPZAGQATgAoAUgE2QEIAOkBXgHpBCoEMQPLAC0FhQIBAEAFUAPhAiwBdAHQAIgAhgEvAmoAzQJOAy4DAgSxAp0CAQIUA8oEbwBRAAQF9wJRAr4APgCsBF8F2QRGA30FOQOjAXQCGQX0BB0EqgIKAJwECwBoAY0FKAUyAV4E2AQvBcwDMwLuA3YBMAI2AvEC3gTcAo0BHwVAA1gBVQGVBG4CdAMRBDMBOABbAOcDggX2AlIEYwV+A/sENgPyBBcERwFhBEMC2gAIAp4A1QHjApIAtQIbAdEEAARJAqoBmwNuBS4F2AD1BAwEDwQhAZIFcgDcA2QDpgJJA5cCWQUrBE0B+wMlA6gDKwFTBckAtQQZAakAmwWOA+AB6wC9A6QCBABKAUYB3gCzAt0DVQU/ARwB+gKeBbEDXwKZBOQENQDxAL4CogI6ACQChgV+BDQC5gQmAi0E8wJ2BeIBLQFxAmkDbAUhAvgEDgA1BR4BKQHfBHIFNACOBMUAzgT9AGMBeACzAykAPATSAjgCWwWeA64DMwBaBMcDhQO5AqsAXgXOAqwAXQQuAgsEogBFACEAkwLXAdoDIgQsBWoBFwXcBF0FywJ0BW0AaAMXAhQBFwGyATwFOwCHAm8BRgKlBA4CRAJWAwoC3QC6AUkBZAKjADoF+QIxAW0C1wBRA4QFXQIWASYBqQG0AEcF6QMLAVIDjgGMAxsEVwNTA50FPwIpAoMC9QHKAQkAWQMPA1gDtwJCA4oDGgFgAmMAggR7AxIFBQMeA6sCGQIAAJwDlgNrAEoEQgWgBA8CtgJbBGABZwViA4ACoAXDAfQC4ARlBFIASABEBVUENANOAdoEcQFwAX8ALgHhA7AE4gAQAUkEKgWHBLwEPQBwA38CpwD8BPwBGAMIAdsE0wSfAeACWwMjA1YEhgMFAVoFiwInBZkDsQBfAG4EPwCJAqcB6wSJAfwDGgVFA3EEOgJaA7QE7ASRBCMEPgEOA6IDGgORApoDXwMTBE4FowLCAIMA6gM3BAMEgAHlAEoFDQEXA5QEbwK/A9YCogTJAdYB3QFdAbkD2wEoAGcDlwW2BEgBtAInAG4AnQQRAykDqgM5ApwAtQO2AI0CAgLjA4QCBwKhBDAA7QORBeMAMwPvAMABkgEOAD0DFAVnAXQAigSYBEwF/gDFAowCSQCKAS4A6wJXAIMFIAJ2A5YBuwDvAe4E7QFpAOEA"
        ),
        JB = new DataView(new ArrayBuffer(HB.length)),
        VB = 0;
    VB < HB.length;
    ++VB
)
    JB.setUint8(VB, HB.charCodeAt(VB));
for (var WB = [], KB = 0; KB < HB.length; KB += 2) WB.push(JB.getUint16(KB, 1));
for (
    var XB = window.atob(
            "aAIJBcoAXQUDBWUBZgVVBe0DSgP6AoABlgB+AVQFwQK3AzoCpwGEBAUBowLRAcwCPgXcAjAFHwSMAHcA6gHFAx0DQwA+AgkBRAUpARACfwVzAlwDkQNMAvgCYgOcAJgDjwMCAnQEfQE1BOEEoQCXBKEFoAWrAXYE/QPhApMA0gEIAkUANQK/AxAF5wFBBCMEogJRBXUE8gCPBAQBxQCBA40BhgJjA+YCkQFuBBoBZADsA70AVAJQAZMCqgTlAFMFtQLEA6oBHAVnBSoAGgTMBNoCEwQzBDIBZAV5BCADXQNgAE8C3wJZBVsEGQUSBUwEDQL2A8sAMQKxARsEBQCcBGsCfwIEBesC/wLJAm8BggKGBAsCDQAqBJMB1gOGAAcFRgEYAIoCHwOAAJQDtwHJAxMBhQLeA8ADDQUmBUcApAFUBFcAnwWGA1oDJwBfBVEBlQNxAK8BJwKgAYoAygMZAHoCNQXmA6kCNALvBPgAlQB+BZUCKgJ3AiQA7gEaBe4ApwReBLYDNAPUAJ4FdgNtAjsDRgWyBFwBHQA4BBMDXwKEABQDBgIpA/kDHAFsBIIEbQEBBOEBLAKiAxsFZgLmAYkFLQP/A9IAJATZATwBzwEBAzkEdQM9AmEDWgTaAX8EYgAhBRUAVQJHATgBKwSqAsYDnwJCAgoFwwN3AdAAvARZAmAChwJ5ADsAXQE7AS8CkARDAzUDmwN4AqQDewFwBBABeAG2BNQC4gHNAusAvQPgAccEgwUWBOUEdQF5AXwChwSmAckASQHiBPwCXAQsBc4DaQLOBMEBKwOiAUMF0ANIBAEB+QTeAWoFSwQ2A5wC6QHkA+sEFQQQBMEEmwWhAVkA9gTiAqcCPgArAesDuwRjBZUExgDXAuIDKwD+A8sEiQFABNwD4wE2AewEvQKmAqAArQR7AJ8BqANDAaMBXgJdAKcAuAJVA/cAcQFRAEoC8QC+Ag4AKQSVBRoD7gO1AHQBjgFlA7gB2QLeBAQARQFtBcABzwS/AFkERAOwAQYBJQXkBMIBDwCABK0AxQF7BKAEYwHEAtUEeADuAq0DVAAKAW0DBQI9A+MCzQALBREDPQDyBIgBcwRcAjkA8wNFBNwETAPkAbgEYwTfBCEEyQGDAbQA1QO5A4UFfgTbBI8FfADgAtUCvAMtAlgDZQANAZADVgC7AJsAkQCmA+0AUQQZBDEDMgN2BTcDOQVrBGcD6gK5AMQBSQCzAFEC4wCkAgkE/QF8AwQESgSaBJIFEgCxAy4FYgU0AdgCDwIDASgAMwEnAT8DGwNhAJMDxwN1BVYF5wLDAbUDmQERAT8ByQQiAVIBRAERBEUF/AC2AX8DfgJBAT8CigMMALoDVgLFAqkDWgUWBeMEyASsA/4EvAG3AL0BIgD1AowB7wJCAW8ESwV6BNkE3QLTBBcB2gRnAjEEPASmAPoAzQTqBF4FDgAkAW4ChAHgALIDCAAPA+cEIwO0AUYCqgOBBGQEqQQRBfMElAUjAosEwgIGBOkAmwIAACYB5gBYAE8AggFOAJACQwLXAPYCbQTdBKkBHQVrAAwDewWGBQAF9wQsAyIDRgMKAnoDrQJgAXkF2wNEBKgEogCLA3MBVwRcAG4BAAG1AWwBMwN2AH0ARQIFBB0CYQTUBCQFCgBLAYYB+gF2AnsCKAEiBQ4CfQKyAiwA8AF0A0sDbgVQA24AIQDuBAsEZgHDBMAE6AIiBJ4AHgEXA90DnQDtAR0BOgVEAoIFFAWOADYFIwBbBTUAkAUiAgQDKQIoA/QCHwAlBLoA/wAgAHAFaQGxAFcBWQNMAN0BUgL4BGwDpQCoAB4EuQIVATUBPwR5ApkCmwSABY0AzwPcAB8CjQXRAmgDIALbAKgBUABQAtICAAQtBdYAkgInBIUBsQTXAQMDpgQjATEAlgNzABkDlAAYBcIDGgB7A28AdQJ6AdkDTwUwAOcDBwFCBXoA1gFYApYB4AP3Ap4BUAT+AHkDAwL2ABMAtAOYAAwEXQSuBC0B1gQpAAIDvwGhAmUFPQHRA64DvACYAuwBVgPNA9QDSgFoAMcBxgTPAPIDwgQAA5IANgSuAVEDXgNOAt8DSgCwANIEYQLIAiYEDAX9AC4EpASMA18ARwM0APUBHgLQAXABzgCaAYkEJQJwA/ADGgJTABYBmQCSAy8A1gILAasEawEqA4QF6AQkApMEqwBPBB4FlAJSAEkEjQIIBF4AUAWSBJIBOAWzAwYA3AGUAaED6gNGBI8AQAKNBGAFzgLyAlUARwI4A4IDSALKBL0EbAI+BHECKwU6ALAE2ABhAWcArAB3BdMAWgAWA4ACMgADBAYDtARzBTAD1wQvAboChwUuAnICmgBSBTEFaASxAjsC+wNYBYUAfQN0Ag4DpwP6BCkFmAQ5AZsBBwS5AQkAcgEDABEApQNTAlgEywKJAGMAngQ0BN8AlgUmA/MBmgNyAyAFagLZAJkDAgENBPIBiwKfBDcBhQOcA18D0QCAA2QDPgMMAvUDuAAdBGUEjgIQAOwAoAMuAOYEAQLtBPMCigQWANMBOgMtAAgD5QNAAEUDKAWvA9sBtwJMAaQAPAA4AkME/wQJAxcCAgRAAbkE8AA3APEC5AC6AZcAMQGjABgE/gL9BKgC/gE+ATkDkQQMAVcFqgAnBR8FjgVOA4MAMwDTAmoE7AKtAdgBagM7BU8DSQIhA38A7wN2AZQESAUnAxMCLwWiBFUB+wIcBEkDGAHPAsQAjASVAaMDEwXkAvsBYwJpBbgD6QIfASAEpQGfAPEE/AMYApEFTwGJA0EFPAW0AsYC7QLeAgoDMwV6BeoAnQUuARIDFARCBH0EvwKJAj0FnQLjA94AuwEBBYsBiARHBb4DTgH0BNoAAAIqBUgDDQPbAiABNgLHALwC9AGRAggBUwNkApMFyAHxA7ADQQNyBIQCyAMcAo4DngP9Am8CiANMBVoCjgTDAhUCFQMEAvoDOwRbAXQFmAHLAWcBtgIPBGgFlgQmAE4FYgF+AOIAjAU5AsgAHABoAU0BmgJSAyEBiABmA/EB+QK+BIECfAHUAW8D5QGuAgYFEgSFBEIAJgJzAzcCVAPrAcoCcgBvBWsDJQFyBVoBRgBKBfUEnQTMAUAFPANpAEsAZgQoBA8FxQRNAHUAqQDnAMwAGAOjBEgA+AFWBF8BUwH0AOgALgMeA8EDTQXzAJ8DMAQwAggFGQHvAQkCPAKBAS8E6QTQAigC9wFwAugDwAJkATICFwVVBFsD8AQZAkgBJQCwAgIACwNnBIsAigEOBN0AOgFfBGICMAHMA5kFiwWrAhADnAVcBV4BfwG7A74BFACBBfACZQKcAcQEwQAsAWAD3wHHAmwAMgVWARsABQUcAyUD6AG+AIMDvwT0A/sAGwI3BaACcQMCBQ4BlwF8BGYAnQFhBawCOAAeAMsDtgABAKEEUgTKAXgFcACzAhECkABHBK8ADwGaBTMC4QALAIIArwQsBF0ChwGWAqUChAPhA3QA1QG7AoMEWwKsAdEE/AHNARICNAUrAn4D1wMUAmwFQQIOBRYCTQLDAKwE/AQHAjIE0wOPAlsAjAJuA50DsgDGARQBswQ9BBIBcQXYA/sEsgFqARUFeATvAPYBVwKeAi0EYAQhAvcD5QKHAIoFTQNpBC8DlwMHA4gFaQOPAZcFugTCAK4ANwRZAWoA+QF4A3cDzgHYBE4EFwA2ANIDfAX5AEkFqwNxBNoD9QBAAzoE4AQjBUQAKgEHAG0A/wGzAZkEYgQkA1QBUwRrBaUErwKHA9UAQQAFA5ABVwMXBHcEgQB9BRsBwADQBI0DQgM/BZcCSwL4AwoEtwS1BIgCPwBNBOkDWAGYBYMChgDJA/cEIgWKAkUFAQXBAbgEHgV5BQQChQFiAX0CqQAgAhsCXgNEAr4DqAKQBcECqQF3BbAAawJpAaQBywPfA3IBJgLqBGMDNANZAcoDVwIZA3UEmwTMA/sE8ABAAqUEKANpA7wDlACgA/cAPADrAB0CiAXGAW0AswC3ASEFjAVVAKACSwLuAxAAWgA/ATgEIAPkBEwDjAEXBFUBmQGkAzwF6gNVAp4AxwHcBC0C+gTNA/UALgDZAV0DDgUAAv8ArgA3AjoCNQERAlACDgLDATUDGAQxBZgF3QKvABICxAAsBJ8FAQRcAFgB0AFDBKsAkAQ2AIwDzgDGBLAD1wBOAKgAkwBmAaQAewEpAwEAJQLNBCQDgwJQBWoEogKABA0DewPXBG8BlQXvBG0BqgJ/A9ICIQFCBfkEJQWQAEwFogORAYAFnwNaAuADHAWsA+8AwAOSBKYC2QJjAoYDqwGLAGQBlAIGBIMBUQSyBDEDzgM3ACIAJgC7BCUEngEjBG4F9gBnA4sE9wOtA1wBRANrBDEBdAMPBFMDXAToAJoA4QIvBacAngR5AjsDxwTUBHEAPgMiBNUEHAMgALQC9QNPBUsEhwG+ArQDiQAaBEkEeAUPAo8FnAXoAnsAnQNfBbQEWAQCAXkDfQO1AxoALAXcAQEBHwGmAzABRQDbBDMDeAG2AXMBcAAwBNIBwQT8AoQA+gLJBH8FZwHzAZsFXwPYBPsAhwXWADQC1QBPAy4BGQI3BIwCHwCdAREArQCRA5gAvgGhBC0FQgIcAHoErAHRAUMCzAFfALwCDQFhBWsAmgVgAzwB2gDTAi4CKACmBKkDtQQnAAkDrwJeARkAtQCxBD0CUgPlATAF9AGBBAQAlgTLAIEF+AGIBBUD6wQ9AG8DmgLxAHwEPQGRBFMEUQEMBfQAxgDRAtsD0wBjBBUCJgWvBPMAQgCGBNgDZAACBeAClwVVBIUDKgUCBPUClARBAO4AbAM0BIsD4QEqAwUA8APPAGIDmwJJAAwC0gNPABUBzwOxA1AAtgLVAycBdQMdAFIBAQLIAt0BKASeBYEASwOLAkEDEwFLAN0EtwCGAmcE/wF+BL0EPgBqAfIEOQKiBAIAjgCjAuwExAO3A/oDGwVuAHIF5AJqAPACcgO8APIDNwMzBPkCagOhAnUBDQSaAfkAmQJRBZYBGANIBIMEJQCtAnQBrgHiAGQC2gFEBP0AOAVAAKcD7wOIAi8A6AQOACMAgwCKAEMD+gESA1IEoQMQA9YENgHsAuwDnAR1BQMEYAE/BHkAEwRwBaYApwJ5AUUDgwUqAe4EeQRCAZsDggOVAZ0EXALnAxAFGQTIBLICdgIAAFgAagKKBBQESwEMBHcAOgQKBLwBNQQbANAA5AHHAnwBiwGeA0wCSAPIAWED5wEkAZgEPQNZAFABFgCfAFsBfwIfA2cANgVrAeMBNwGTAYQEywQgAUgCEQRuAWICLALeAUsFVgKLBecCCgVVA4gAPwLPAZIDlAXDA4IFlwPwBA8DDgOtBIoBcgT/BLUCTwQuBBcCMAOHAykChQLfAY0BLwGxAjgC/QFUBHwD7gJiBR8EKgTlA7sBOABNALwEYQCxAHEEbwBxAdIE/QTFADMCRAVABEYBjgQMAEYAwAH2AYIEZwKwBLYAGALeAkADCQISABED3gCGBeAANQBNAgYA+AOEAl0E9AIaBZEAmgNMAQsBggCTBVQCWgM5AEYEjwNHACwDnAGoBP8DgAL8ABwChAVjBdAD0QSgAEcEGQHFASwAfwFmAwABDwXoAzICrABlBf4DxAJ9BGwAdgQ/BSICFAI8BBQFdgDlAuUEfgHpAG0E4QOTA4UAvwAtA2cFLgPtAX4FmgQRBXMEBwN6BWgFjQMOBHwCuQBbBIgDygEgBV4FZgRPAQMA3QA9BeUA9QSMBAcFwgMfBZgCqwLpAcICPwPfBFcA/gI5BXoDjQXIAFMCBQS7AE0DaQVxBU0BqwOvAXABMwEeAp4CJQHjAlECjQLBA6IBFQBvAnoBIwIHBKgD6QLEBM0AGgMVBEoCBgUwAKEAAgMKAF8CyQCbAI4ByQJ3A4ICwQAaAfYCwgTDAmsFlwD7AwsFBQKcAGgB9AOBAZUC+QEIAsgDDQUSAY8B2gKgAZECxgILAKMBsQFuAwcCsgDwAaYB/QKgBUcBEgR3BNYCIgFmBfYDuAPCAV0BPgRKBSsCNgQ+AQgDVAXPAv4BDwFNBTIAvQMLAi0EzADOBPsC1wOyAYcA4wMGAroBrwNjAPMEfAUABaUBLwLpBNgBJwQvBDACaARxAjwCdwFOBEgF6AE+AgoCZQCHBG0DVgG5BMwE0wROBQsDaQDeBAMBCQQtAL8BbQVOAisE7wGuBGEE8gLiBOMAdQCFBOsB6wMdBKcBaAMyBHMFFgSQA/IBywF7BCkA7ABFAZ8EvwKJA4kFgQMMAe0EAwPxBLoC3QPHAKoEuAAhA8MEFgW5A0UCWALnBDQArgKWAsoAGwR+A1MFhgH8AUgBDgERAcoEwADEAVIAOQG3Ap0AfgDVAusCQAUcAeICCQFKBBMAXwRbAoIBfQUoAUoDJAUrAI4DrAS3BJMEKwFHAyQETAAPAJkAWgWpBJEFrAI7BeAEBAGoAQ0CfAD8AwMFuAHpA2YA+gDxA3UCnwIoAr0AzgGEAeYExQN/AF0AKgKXBDoBCQAxBHMABgHUAzoAnAKWBWkERgLbAH0AVwUWAXYFgAG+ADEAUgI5A0gAoQWjA/UBlAG+BFIFOwDcAwkFcANaBIwAbAVYBZsBEgUpBEMAXwEUAcMABQWPAhgF3AKzAnACkAI4A3sCYgRvBRcDuAKqAVYAVAPRAGAF1AG9AYAA1QETAnQEZQPfAvcCsALtA4oFuQHGA/8CAAPaA4gBFwFzAoQD8wMYAPMCbgJGBdIA8gAKAUIDbAHHA2wERwUkAgsEWwUfAqIAKAV6AJUEdAJRACYD0wNZAnQAjgIFAeAB5gPiAX0BBgOFBTYC+wFcBSAE1AKZBSMFYAJcAysDHQOVAHICRAEBA6oAEwMMAxUF5gLnACcFQQWcA4kE2gReADIFOgW7AhkFUQO/A0QAsgOzAe0CPANzAzECmQTQAkkFQQJrA7MEYwFPAmIAXgQyAy8DSQPeA/0DEwU5BI4FygJmAtcCcARDBRQAIgNxA3YB+ATqAngCYABUANwApQI6A1kEagXUAEoAhwKSAssCpwSXATQBBwFlBGECIQR2Ax0BlQNOA1YDbwSlAO8CtgNpAlQBGwEmAZQDCgPqAAMCQAEeBAgEQQSZA24ELAHmAMIANgPFAlsDkgAdBc0CFwW7A9YDFgOWAysF0ASAA5gB/gChAZYA+QNlASkBWANQBNcBYAQ3BakCEAEjAzQFJwOrBOQDFgJNBFcEbAJGA0kC+ABdBcwCKgDYAo0AmAOjBLoDHgMbA14C2QN+AqUDKQXhAIkB2QQzBc4C2ABkA6QCZAR7BboEVgSKA0oBOwE/ADsEDQAtAbkCJgQEBcACdwLJAR4ASQF/BAUDtQFbAOQAnQJMBD0EnwEnAoMD/gSgBAgA5gEIBVADjwQkAFkFdAUhAjUFTgHTAYkCEAJTARQDzQEOAHIAswPqAVYFkgE4AVcBBASPAOEELgV6AgcAjQQzANsCowDuAeMEZAV4AxAEAgLtAPECMgHfAFoBIwH4AkIEZQL2BEMB0QNXA20CeASuA/cBugD0BJMCnQUaAtsBIQC/BJcCHgHZAPwEkgXiA8UEGAFhAQAEQQE7AlkDkAE+BWgAzwSwARcAqgMEA10CeABHAuwBpATABLQBRQTxAVUFrQE1AoECaAIlA70CUwC2BAgBtAAcBNYBgAR/A/0BEgBvARAFvQG8AuwEXQG7AVEAiAP7Ad4AEwWaBCcDwQCoBHQEDQLRBKkAKQJOBMMCqACsAKIDjQD2AhYEOgVrAVUC9wPfAKsBkgHlAEwD4QOZAxQDTADXA1kDxQFkBWoD9QTAANgDJAUuAUYA4wQhAvwEiAKqAgIB1AK6AeQDrQGUBBEB6AGbA+gAEgKxA44ATAIEA30AeQSbBV8BzAB9A1QCoQACAKEChQQVBJ0FxAEaBMQATASwAg8F8QIZBRsC5QSlA3oFEQMqAX8F4AS/ARwEPQOJAR4AMQB7BZ8DIgRxAbQAEgGOA7gD+gJXA4EB2gICA9IALgT/BDwEIQWaA0oDXwN5AqMExgI2BWEB1gFUBeYEIAPVA7kBHwXTBAEAAgSyBD4D3AGyAmgFcgI5BdoAzwMpBR8CIADHAZMD3ACiAAUENQEbAOoB+QTPAgwF4QGUAVoCxgGUA3YDPgTDA24AJQAPBHQBQwIPAIsBhQWWBGYDTQM4BPgDrwH9AJID4QSBAFMD0gNEBKwCTQLiAfMDrAF2AQkEtwFGAvMAvwLpADEBjAL2AZIEGwSTBd0BUAToAxQBUwU/AygAVgRVBDMBRQEOAisCXgKcBPIDNgOCANECWQWsA1YBKQC4AE0B8gLuBMID0QG9AzwB3ANIBEEEoAK8AEQFhwXIBHEE2QOlAowFGQB6BC8FeQWCA1cC4AHtBLUANAD2BDQFaQB8AlEEaAA6ATgDpQAyAY8EfwH4APIBJwGbBB4CzQK6Aw4EpgNgAiQBBAWQBU8EawOVAogBmgFdBd8BMwWYAUkE9wKEAd4EAwRmBHcAJQMcBbcEkAFbA4sAQQDKAegClQBBBbAAFwGLBQUABgOMA7sDcATVAXQCCQP/AScFHQOXBUYDIwK4AUEB7wAFAnED+AHtATgASAXEA5UEkABkBFQAMgXNBFMB+gRNBDMEEAROA1gC7QMrAZ4DOgDPBG4FIgKJA7EA1QR3BNcAowEKAPAAlwPvA34DbQKKAeUCvwAQAwcD5gPkAj8EnAVcBJ0EOQH7A2wAMgNcAXgABgAWBfIA0gJiAIcDxwLqAyYBkgVyA6UB9AEOAH4EmQXbAFQB/ACoAlMENwIgAiYDtAJdBHMDowNaAdYD8QTpAl8CZAIxBRMDKgJvAq0AIQOgAa4DbQTkBFMCygJgA7kCtgMqBO4AdwMgBBgAXwVNAJwADwFKBHUABgG9AqYBIgE3AYQFvQCGA8kEGAJ7Ah4DLQTCAI0CkQTFA80DTgB5AYcE5QN+ATAEGAQyAh8DMAWRAxMAHwAeARoFrwDIAWcB8wQ5A0ECagFXABAArQI1BIYF3gLwBK0E3QN+AGIEsASeAqQB2wGBAuQBoAMpATMDowKhAeYCgABHBcwDigVuAnsAWgCTAesDSwA9AtkB1QJaBFkCkwCVBTwCHAISBD0BRQJqBEQCbwP/AnwF5wPSBAgEHAPTAucBSwEsAYMFMAGGBEQBWAB4BfABPwJFAP8DowBvBG4B4wDGAAoDCgGsBK4AwgFoAZMEzAQ+BRkBIQH+ADwFTgVOAisAgwCRAYoAngU2AWsCUAUJAdQBKgDeA3gBcAVlBfQEmAJkAGsFqAGZAc4CNAPxAHsDKAWKBJkEYgNWBXEAnwAwApgDWAWPAhoCSgChA2cEYAWxAiAB0AOfATIANQJCAyUBLAAjBBgDAwMoAaAFpALzAi4A4APyBM4EKANMBVQElgO8BL4CCgIZBMcD1gLLAJoFwAL0AOEAagV1A+AAkgABA/0ELwNhAh0BdwF6AT0AyAIXA5YAbQDxAaAAWwB/AoACQAQuBREAYgGCBTADPwCmAGEESQCHAREC+ARHADcAEgNVAz4A7gGzAn0BtAHqAJgAQABYAVsFGwO6AuMBXgQSBZADAwJWAAACSQVSAg0DBwV1AsQE5gC1BJQFeQC3A4AFBAHaAR8ELgMjBXsEDABRBY0EvgQQAisDugCmAo8BYAENBTgBPAPdBC8ANgR4AmEFeQMLBOkBzwFoA9MAOwArBbcA9QKvAuACiQTfBDwAogFnAuECLQWWAWwDKQNCBCUC0AQtAhcCyQB6ADsCkQXvAYYCEwFAAlwDIwOSAiIAIwFVAGwBJQWJAngDNQNjAnMCwwBkAxUCxgQkAKAEdAU1AKEEJAKIBbUD2gRdAv0ClQEBBTYAUgVQAMEE6QTQAn8EyQL8A+ICfQK+AHwA2QRgAGUAGQIkA1cBjgVfAFcFtQHNAXoC0QCeBKkEWwKfBIgAeAQ4AnADhACnBF0AWwTLAjoDbQXYAYcC2wRDAZwCYATqBGIFDQS+AUEDZQEkBMMBWQA2AhsBTwIqA3UFIwAcARUAzwAaASwF1ADjAsABBgIcAOgE/QNeAL8DBAD8AV4DfgUIALkEnQH5AMMEBQEdAMEDygTwA7kDuAIpBEsEpAPpA7cCXgWMAAsDRgTaAw4FhgExBEwBCgRqAI4EyABiAggCnAOKA/cEsAMFA/8AtgB3Au8CVwRCAQAFpASnA0oFHQR9BY8DXAX5AqQAswTHBOUBYwP6AXABHgQmBHIERwIJAh4FggTrBGwEgwNoAvYDgQT5AYkAfQS2ArIAOgQKBZsBzAKXBCEAVQFzBJAENwNsBYoCiwMIAUkCZwBGBasCHwE0AfUAZQLLBFIA3wNzAK8EJgDrAEABcwVbAT0FFQFKAi8EqQOBAzMASwURBUYBZgAHAuIABAI3BQMAdgQDBdcCHQJIAMgDCwIMAy0A0gF8BMkDCwCdA2kB5ACuBKcBQwQqBSYCFAA1BScCWAMIBYwEdwV+AmUEtQJjAEADGAGzATkAQgA6ApkCUQOuAocA5wB8Ae8EDQBpBLwDNAQBBLsAaQK4BAcAMgQBAXsBmwCTAr0EUAEZAzsBOQLXBJ0AhAR0A7QDjAGLAkUEMwKnAtQEEwJmBZEAYwVnBWEAXwR6A4EF4gQCBQwB5gG2ATsEDgG+AzcEBgTVAJQAbQPwAgAD9QHFAgkFNAJuBL8EcwF1BA0BcgHOAwMBXAIPAvoAmgCNAXIAngA5BPEDQwDnBJECFgAIA/kDnAEtAdABggLuA5cCSALiAwUFYwG7As4AxQSXAfcBnQLtAk4BAQKfBVgEZwOuAdsCdgVCBbMAoQWPBZ8CRAD1A4gE2ARrABcFfAMWAtQDPwU4BfMBLARLAy0DSgFABQwCLgKtA8IEcAC5AOwA9gBsAuwC/gJIAZcA+gNEAywDwAMoAhoDYQMUAkgDiwTMAQAE7AEPA20BGAVwAqsDRwMUBT4BPwGqBNwEgAMOA+0ApgQMBFYDjgGFAk8DlQMdBaICPgLdACcEwASWAo4CcQWxBIUBOwNFBVkBdQFpBSAFBASrBIMB+wAsAkkBlgVHAScAPQS2BG8ALwLuAgkAMQMiBcECUALsA4UApQRmAhQE6gITBCYFwgJ2AssB6wHYAJoCmATcAuMDaATKAA4A5wIvAQICQwVqAgYF/AJTANMDgwJRAnYACwVmASEEuwQbBdgCQgK0BLABxQBQA1oFVAOrANMB2wPZAqkC0ABSAREETwVZBIQCFwQlBFwAdACPAJQCZQPrAqoBygMiA6cAyQGFA7IDTQXLA0UD/gEaAP4DQwP7AvcA1gRkAdkAsgHOAcYDOwWeAbwB3QL4Al4BaQODBJkAmAWJBTECTwH7BG8FFgNSA2MEBwSqA2sEswOoAwcBAAHfAl0DkAKxAYIB9AIQAVUFWgPHAP4EUgQVA0kDgAFxAo0DAAArBMQCFwCpATAAmwJPANEDVgJHBLoEKASvA80A9AMLAd4BogSqAMEBfwBLAhUFhgDXAVEBbgPWAIQDcgUWAY0F1QOyAoMAoQMBABAAfAGIAVMEwQTUAQIFWwX1AWAFoQUSA5YF0AS8BLwDkATAAhMFGQFDAXoAPAR3ASAAhQAXAp0BnAESBH0D4QSJBcYB/gEAAo4APwCqBKcAfQS1AcQCdQPdAioCSQWkBFMBggQ4A5kEvAGPAP4EvQLcAbgANAKpBCcAfwA6AEIBYARnAXYBHgAQA/wAzANHBEYBrwC1ABQAjgXyAi4APABUAW8CXgCvApACpwMOAjEAqwBpAi8DmQDQAScDEQDLAbMCZwQeAVcCIQAVABYBSwCaAtgCAwAvAdwAkwVkAHIFiQJsBFIFeQWqA5ICNQOiAbQDaAGsBH8CAgEDAx4FNADpAGYCwwAcAnECjQV9AlIAEgLkAjIEdQJZAKMEKwEPBBsEvQOGBX0BAwHaAfcCvwDrAWcF6AOhAKYALQNhAAwA5QQpAcsD2gC+AAUC1QQLAqIAIQJtAUQD6QRFAF0EtgPiAe4ATwS2AoAA8AIGAwEDjQToADUCpgKcAPAB9wB4APMDbQJNAMwCnwHVADkCBAXUAyMAqgJLBVQAuAKCBawCjwRWBc8CsAPzAmwAaQVhAjUF/wB5AAMEQwVOA2AB8AMRA38EJgVOAF8CpgSkAu0BXAAbAGUBwQOGASsDBgIaBQcFkAUZAkkEfARgAz8B5APpAjQDaQA1BPQEwgJKAdQCiwAkAUYCuwHzBJIBNwS3AkEACAJSA0kBTwKYACUAMABAAWMAFAKYBRcEkgAxA8MEPwThAw0FTwMUBOoASARzAZMBZgHRBMIB7QIiAL0EoAEiBf4A3AKOAisCuwDLBCoDhwReBKQB1wE1AWgCFwBWA5QDzwQbA4IAzgNDAMMCUAEsAdcAbQOBAR0F2AQNAOIEtwSSBfEDcgEQBO4CzwGLAwAA6gETARYCcARHACoAnAI3AoEFKQXnAksD+QM2BSIDhQS2BDEFXgEoAsgAuASBBEcFLwSbAvgDoAApBGUF3QFdAi4EFQJnAkwAowAGAQUDawQKAy4FSQDCAO4BBgSjA34BNgOsAUECHQTvAZYArgFTAygEMgAKBIwBaAVYBD4FoQHMAA8DUgTxBHADFwGFA3IDbgQRBQAEGQQNAkEBGQWaBAwBFAElAbsCSAAxAqICjAA7AOECGAC/AZoAJgALBCcBMQRjAqgDMAOxA3sERACYAXYAiwRQBW4FQgQJBdcErAPeA0AC2QT6Af0DFQFRAaEElQFFAtYC9QBaAoIDWAVAA+oCVwHtADYEuAHfAxUE/wSRA74BCQFiAaUC4AQdAZUFsACbBHABfwFaAyMEiQFuAuABiAADBZ0CDgCABREBKgSgA7ECjwJvBMYARgRcBRgBMAI4AaIDggEVBaMCwABZAUQFqAKxBJ4A7wQTApkDBwCEBNEC6AFqBAQAYgDoAhoE+QKdA7YBIQUCBIcCxwPaBCMCjgTmBKgEJwV7AXgEVwBrBT4BUASEAVoAsASAAx8AQQTNBFwCrQReAjUAWACgAr4COwVhA9IE6AT4ARgFiwKDA/ECUABcA/YDwwGpAWoFcgJxBV8BNgIaAesEvQDHAYYDXAGRBKgAVAVjA+cAUAJCBYcFMgJ6Ad8CxAT6BDsCcwR5BOMD9wOXBR8FXwR+AMUE8ABFA5IEWgQ6A6UErgQIBbEBwgQtBCYBhwBOAv8CmgXbA2UASwJFBDwD4AA4BMoCXgUJAogFDgCdAMQBBQR+BF8AxQEfApEB3QB4AVUEYgWtAqcC/QKMAzMFIQRxA9gALgKcBSABjgEPAqgB2wKXACwD2wTpAf8B+wM5AIUB/ASqAPQAUAOTAAoC8QDWBPIB+wH/A8wEUwAfA8AB7wNWBKUDPwVMBQ8AewKGBPQBngF+ApQA3gFwAh4CSgS0AGMFEwQLAz0BZwNDBPkAqwOZArAC9wF2BLkBDQOrAisFDgMlAz8CMAQgApMDVQFfBWsC+AS/BB0AigTkBLIBDAPKAw0BAAEMBXgD5QMlBRoAYwGHA6YByQLzAV0FTQGRALUEeAV+BUgF0gEnBMcCngOQATMEkQK3AyQFYQWfALcBDgRTAiICeQJvBcYCwAShApMELQV6AysEmwHUAOoD0gLXA3UELAK5AIsBTwG6ATMCzwOqAfgCfwWUARkDJwLKAJUEAgMlBFIBdADQA7oDZgXjBO4EFgC6BCQCOQO9AVcDLQAHAxkApwSXAbQEKQNsBeUB3gA3BTcDmAQsBA0EpQBhAf4DnwKVAmYAxQDJAWQBrgK/AgoFJgS5A0QBswMrAAsALwX2AK8EWAHsAEAFzwBdAHAAvABjBKkDBARrATYBIQPNAvIARQWJACoBPQIAA+wBnwV3BHkBhAXHBHkDCgAtAtEBrQPdBGIDngRgAiIBswAIA+4DBQB3AsEANwARBCQE+ACuA0wBvgNcBHgCAAWjAWoAQgAqBSgAmwUIAX0F4wFpARsBzgSTAkwEtgBbASgBgQJaASgFIwUIBFUA5wRqAv0B0gCwAQ8FmAO7BEgDbwDIATgC9AN1ANAC/AFHAigDxQITA0oDTgGMAkEFVQIYAo8BFAULBQoBrwNKAF0BcQAJA9QEqQKGADYAiwUjAUUBFwPmA3QF2wEwAacBwQLrAPQCfQA+APoCZALkAG8BsQCEAwkAPAJ0A+YA3APsAp0FFgNvA0oF9gI9BWQEhQUuAUcDuQRZAlYA5QLgAssCdwCkA84B5wFVA3sDSQKgBCAEUQCrBJADbQCKAogERgDXAmwBJAONARwBjAVGA38DZANZBawAWgXjAl4DjgPtAzoFFwWUAtkCdQFZBFICTgR2AkgBrgCfBBoCgAHiA/IEMgUbAm0EggKcA3oCOQTmArIEgwIzAGoDiQMiBFEFzAHsBNkACAA8AV8DlgFdA6UB2QHlAPwCmQXTBI8DRAJNAjMBTAIWBaIEzgIwBfYBaQQBBRgDywARAnAFHgQfBLsDHABNBOkDTwXIBNMDVwR0BDIBwwNoAPUEQQPWA5sAyAMMBMkDUQTcBBABcQRMA5oBFgRDAnUFagGcBGcACQQ8BbIDVAKPBUYFJgJiAnMC1QLiAjsDlgNRAhIBJQKUBFUFfAUVA1gDAQItAdoCSQNsAgcBVAMFBWUDOQGfAykA/QB3A8YD4gA5BYgCHQLyAx8BlwJTBdUB9gTfAZUDigA9BEoC8QEPAe0EewUGAIcBBgWzBH4D3gSBAMkA2QNAAMoErwEvAsUDBAHvApEFJgPSA1QE+QQ0AfUCewBbAIoFkgNrA40DzQBuAT4DjARlBLoA+QGAAvwDmwMOBQIAlgLjAIMEZgSeAhoDbAMhAToBwAOFAiAD6gQDAlsECwGKAw4BEALKAYgDMQEQBd8ArQC+BLoCQwNHAW4ANAUcA0ICgQO1AxwF0wHWAJgChACeBXMFdAESAKkAegXNA2EEWQP1A2IEOAUYBJAAlAXeAgUBvwNoBB0D6wN3BdEAbQX3BDcBgwVOBWkDawDdA4kEegRuA+YB1gEvAEAEhgKaA/oDlgS0AuwDpgNWAU8AmQGEAjoEUQO4A+sCOADhAYMBMwOdBOcDPwMMAkIDBANmA3EBOwT7Aj4ENASkADoCqwF8A/MAGwVYAkgCYACNABMAfADCAz0AyQRXBdgDjQJ2A8cAzQFlAgEBlwRNA+QBPQP7BFsDZAW5ArIAHARLBM4AEgUUA7MBPgKVAMQDaANWAkQETQXTAP4C/QQBBMQAtQLGBHIELAD7AMEB4APaA9AAHgN0AnYFBALYAbQB8AQsBcgC0QMpAt8ElwOKAQcESwHhAAICMgNbArcAIwOgBdMC2wD6ALwCcwCtAXIAgAQgBe8AJAB8AjsBcwMHAi4D"
        ),
        ZB = new DataView(new ArrayBuffer(XB.length)),
        _B = 0;
    _B < XB.length;
    ++_B
)
    ZB.setUint8(_B, XB.charCodeAt(_B));
for (var $B = [], ay = 0; ay < XB.length; ay += 2) $B.push(ZB.getUint16(ay, 1));
function ey() {
    return 1 == bc ? Eh() : Eh() - 51;
}
function oy(a, e) {
    var o,
        r = {},
        i = B(a);
    try {
        for (i.s(); !(o = i.n()).done; ) {
            var t,
                n = o.value;
            r[n] = (null !== (t = r[n]) && void 0 !== t ? t : 0) + 1;
        }
    } catch (a) {
        i.e(a);
    } finally {
        i.f();
    }
    for (var s = 0; s < 5; ++s) {
        var u,
            c = e[s];
        a[s] == c && (r[c] = (null !== (u = r[c]) && void 0 !== u ? u : 0) - 1);
    }
    for (var l = [], m = 0; m < 5; ++m)
        a[m] == e[m] ? l.push("right") : r[e[m]] > 0 ? (l.push("place"), r[e[m]]--) : l.push("wrong");
    return l;
}
function ry(a) {
    return "<b>".concat(fh(a).toUpperCase(), "</b>");
}
function iy(a, e) {
    for (var o = [], r = [], i = 0; i < 5; ++i) o.push(new Set()), r.push(null);
    var t,
        n = new Map(),
        s = B(e);
    try {
        for (s.s(); !(t = s.n()).done; ) {
            for (var u = t.value, c = oy(a, u), l = {}, m = 0; m < 5; ++m) {
                var A,
                    g = u[m];
                l[g] = (null !== (A = l[g]) && void 0 !== A ? A : 0) + 1;
            }
            var d,
                p = B(n.keys());
            try {
                for (p.s(); !(d = p.n()).done; ) {
                    var f,
                        v = d.value,
                        h = b(n.get(v), 2),
                        w = h[0],
                        y = h[1],
                        E = null !== (f = l[v]) && void 0 !== f ? f : 0;
                    if (E < w) return "Existe pelo menos ".concat(w, " ").concat(ry(v));
                    if (E > y)
                        return y > 0
                            ? "Existe no máximo ".concat(y, " ").concat(ry(v))
                            : "".concat(ry(v), " não faz parte");
                }
            } catch (a) {
                p.e(a);
            } finally {
                p.f();
            }
            for (var D = 0; D < 5; ++D) {
                var Q = u[D];
                if (null !== r[D] && r[D] !== Q)
                    return "".concat(ry(r[D]), " tem que estar na ").concat(D + 1, "ª posição");
                if (o[D].has(Q)) return "".concat(ry(Q), " não pode estar na ").concat(D + 1, "ª posição");
            }
            for (var x = {}, j = new Set(), M = 0; M < 5; ++M) {
                var z,
                    I = u[M];
                if ("wrong" === c[M]) o[M].add(I), (x[I] = null !== (z = x[I]) && void 0 !== z ? z : 0), j.add(I);
                else if ("right" === c[M]) {
                    var C;
                    (r[M] = I), (x[I] = (null !== (C = x[I]) && void 0 !== C ? C : 0) + 1);
                } else if ("place" === c[M]) {
                    var N;
                    o[M].add(I), (x[I] = (null !== (N = x[I]) && void 0 !== N ? N : 0) + 1);
                }
            }
            n.clear();
            for (var k = 0, F = Object.keys(x); k < F.length; k++) {
                var O = F[k],
                    T = x[O],
                    S = j.has(O) ? T : 5;
                n.set(O, [T, S]);
            }
        }
    } catch (a) {
        s.e(a);
    } finally {
        s.f();
    }
    return null;
}
var ty = (function () {
        function a(e) {
            r(this, a), (this.board = e), (this.cursor = 0);
        }
        return (
            t(a, [
                {
                    key: "reset",
                    value: function () {
                        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                        (this.cursor = a), this.updateEdit();
                    },
                },
                {
                    key: "moveEditVisual",
                    value: function (a) {
                        var e = this.board.getLetters(),
                            o = this.cursor;
                        (o < 0 || o >= 5) && (o = a > 0 ? -1 : 5);
                        var r = Math.min(4, Math.max(0, o + a));
                        return (this.cursor = r), this.updateEdit(), e[r];
                    },
                },
                {
                    key: "moveEditToNext",
                    value: function () {
                        for (var a = this.board.getLetters(), e = 1; e < 5; ++e) {
                            var o = (this.cursor + e) % 5;
                            if ("" == a[o].innerText) return (this.cursor = o), this.updateEdit(), a[o];
                        }
                        return (this.cursor = 5), this.clearEdit(), null;
                    },
                },
                {
                    key: "moveEditToPrev",
                    value: function () {
                        var a = this.board.getLetters();
                        return this.cursor <= 0 ? null : (this.cursor--, this.updateEdit(), a[this.cursor]);
                    },
                },
                {
                    key: "clearEdit",
                    value: function () {
                        var a,
                            e = B(this.board.wcb.getAllRows());
                        try {
                            for (e.s(); !(a = e.n()).done; ) a.value.setEdit(-1);
                        } catch (a) {
                            e.e(a);
                        } finally {
                            e.f();
                        }
                    },
                },
                {
                    key: "updateEdit",
                    value: function () {
                        this.board.getRow().setEdit(this.cursor);
                    },
                },
                {
                    key: "getEditLetter",
                    value: function () {
                        return this.board.getLetter(this.cursor);
                    },
                },
            ]),
            a
        );
    })(),
    ny = di,
    sy = Ut.findIndex,
    uy = yg,
    cy = 1;
"findIndex" in [] &&
    Array(1).findIndex(function () {
        cy = 0;
    }),
    ny(
        { target: "Array", proto: 1, forced: cy },
        {
            findIndex: function (a) {
                return sy(this, a, arguments.length > 1 ? arguments[1] : void 0);
            },
        }
    ),
    uy("findIndex");
var ly = di,
    my = C,
    Ay = wr,
    gy = fr,
    dy = Qr,
    py = ne,
    fy = Zi,
    by = wi,
    vy = et("splice"),
    hy = my.TypeError,
    wy = Math.max,
    By = Math.min;
ly(
    { target: "Array", proto: 1, forced: !vy },
    {
        splice: function (a, e) {
            var o,
                r,
                i,
                t,
                n,
                s,
                u = py(this),
                c = dy(u),
                l = Ay(a, c),
                m = arguments.length;
            if (
                (0 === m
                    ? (o = r = 0)
                    : 1 === m
                      ? ((o = 0), (r = c - l))
                      : ((o = m - 2), (r = By(wy(gy(e), 0), c - l))),
                c + o - r > 9007199254740991)
            )
                throw hy("Maximum allowed length exceeded");
            for (i = fy(u, r), t = 0; t < r; t++) (n = l + t) in u && by(i, t, u[n]);
            if (((i.length = r), o < r)) {
                for (t = l; t < c - r; t++) (s = t + o), (n = t + r) in u ? (u[s] = u[n]) : delete u[s];
                for (t = c; t > c - r + o; t--) delete u[t - 1];
            } else if (o > r)
                for (t = c - r; t > l; t--) (s = t + o - 1), (n = t + r - 1) in u ? (u[s] = u[n]) : delete u[s];
            for (t = 0; t < o; t++) u[t + l] = arguments[t + 2];
            return (u.length = c - r + o), i;
        },
    }
);
var yy = k,
    Ey = function (a, e) {
        var o = [][a];
        return (
            !!o &&
            yy(function () {
                o.call(
                    null,
                    e ||
                        function () {
                            return 1;
                        },
                    1
                );
            })
        );
    },
    Dy = Ut.forEach,
    Qy = C,
    xy = Cp,
    jy = Fp,
    My = Ey("forEach")
        ? [].forEach
        : function (a) {
              return Dy(this, a, arguments.length > 1 ? arguments[1] : void 0);
          },
    zy = fo,
    Iy = function (a) {
        if (a && a.forEach !== My)
            try {
                zy(a, "forEach", My);
            } catch (e) {
                a.forEach = My;
            }
    };
for (var Cy in xy) xy[Cy] && Iy(Qy[Cy] && Qy[Cy].prototype);
Iy(jy);
var Ny = (function () {
        function a() {
            r(this, a), (this._listeners = []);
        }
        return (
            t(a, [
                {
                    key: "hasEventListener",
                    value: function (a, e) {
                        return this._listeners.some(function (o) {
                            return o.type === a && o.listener === e;
                        });
                    },
                },
                {
                    key: "addEventListener",
                    value: function (a, e) {
                        return (
                            this.hasEventListener(a, e) ||
                                this._listeners.push({ type: a, listener: e, options: { once: 0 } }),
                            this
                        );
                    },
                },
                {
                    key: "removeEventListener",
                    value: function (a, e) {
                        var o = this._listeners.findIndex(function (o) {
                            return o.type === a && o.listener === e;
                        });
                        return o >= 0 && this._listeners.splice(o, 1), this;
                    },
                },
                {
                    key: "removeEventListeners",
                    value: function () {
                        return (this._listeners = []), this;
                    },
                },
                {
                    key: "dispatchEvent",
                    value: function (a) {
                        var e = this;
                        return (
                            this._listeners
                                .filter(function (e) {
                                    return e.type === a.type;
                                })
                                .forEach(function (o) {
                                    var r = o.type,
                                        i = o.listener,
                                        t = o.options.once;
                                    i.call(e, a), 1 == t && e.removeEventListener(r, i);
                                }),
                            this
                        );
                    },
                },
            ]),
            a
        );
    })(),
    ky = (function () {
        s(n, Ny);
        var a,
            e,
            i = p(n);
        function n(a) {
            var e,
                o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6;
            return (
                r(this, n),
                ((e = i.call(this)).maxRows = o),
                (e.wcb = a),
                (e.curday = -100),
                (e.solution = null),
                (e.normSolution = null),
                (e.tries = []),
                (e.invalids = []),
                (e.curRow = -1),
                (e.curTry = null),
                (e.gameOver = 0),
                (e.cursor = new ty(g(e))),
                (e.won = null),
                (e.locked = 0),
                (e.inHardMode = Xf.hardMode),
                e.wcb.addEventListener("letter", function (a) {
                    e.gameOver ||
                        (e.cursor.getEditLetter() != a.detail.letter &&
                            e.curRow == a.detail.row &&
                            e.cursor.reset(a.detail.pos));
                }),
                e
            );
        }
        return (
            t(n, [
                {
                    key: "getRow",
                    value: function () {
                        return this.wcb.getRow(this.curRow);
                    },
                },
                {
                    key: "getLetter",
                    value: function (a) {
                        return this.wcb.getRow(this.curRow).getLetter(a);
                    },
                },
                {
                    key: "getLetters",
                    value: function () {
                        return this.wcb.getRow(this.curRow).getLetters();
                    },
                },
                {
                    key: "animateVictory",
                    value:
                        ((e = o(
                            regeneratorRuntime.mark(function a() {
                                return regeneratorRuntime.wrap(
                                    function (a) {
                                        for (;;)
                                            switch ((a.prev = a.next)) {
                                                case 0:
                                                    return (a.next = 2), this.getRow().victory();
                                                case 2:
                                                    return a.abrupt("return", a.sent);
                                                case 3:
                                                case "end":
                                                    return a.stop();
                                            }
                                    },
                                    a,
                                    this
                                );
                            })
                        )),
                        function () {
                            return e.apply(this, arguments);
                        }),
                },
                {
                    key: "event",
                    value: function (a) {
                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        this.dispatchEvent(new CustomEvent(a, { detail: e }));
                    },
                },
                {
                    key: "newLine",
                    value: function () {
                        if (!this.gameOver) {
                            this.tries.length > 0 && 0 === this.tries[this.tries.length - 1].length && this.tries.pop(),
                                this.cursor.clearEdit(),
                                this.curRow++,
                                this.cursor.reset();
                            var a = this.getRow();
                            a.setRowEmpty(),
                                a.setEdit(0),
                                null !== this.curTry && this.curTry.length > 0 && this.tries.push(this.curTry),
                                (this.curTry = []);
                        }
                    },
                },
                {
                    key: "setClues",
                    value:
                        ((a = o(
                            regeneratorRuntime.mark(function a(e) {
                                var o, r;
                                return regeneratorRuntime.wrap(
                                    function (a) {
                                        for (;;)
                                            switch ((a.prev = a.next)) {
                                                case 0:
                                                    (o = this.getRow()), (r = 0);
                                                case 2:
                                                    if (!(r < 5)) {
                                                        a.next = 8;
                                                        break;
                                                    }
                                                    return (a.next = 5), o.letterTo(r, e[r]);
                                                case 5:
                                                    ++r, (a.next = 2);
                                                    break;
                                                case 8:
                                                case "end":
                                                    return a.stop();
                                            }
                                    },
                                    a,
                                    this
                                );
                            })
                        )),
                        function (e) {
                            return a.apply(this, arguments);
                        }),
                },
                {
                    key: "commitWord",
                    value: function () {
                        var a = this.curTry
                            .filter(function (a) {
                                return Vf.has(a);
                            })
                            .join("");
                        if (0 == a.length) return this.event("commitError");
                        if (5 != a.length) return this.event("commitError", { msg: "só palavras com 5 letras" });
                        if (!Rf.has(a) && void 0 === Yf[a] && a != this.solution && a != this.normSolution)
                            return (
                                this.invalids.push(a), this.event("commitError", { msg: "essa palavra não é aceita" })
                            );
                        if (
                            (Xf.hardMode ? 0 == this.curRow && (this.inHardMode = 1) : (this.inHardMode = 0),
                            this.inHardMode)
                        ) {
                            var e = Array.from(this.tries);
                            e.push(this.curTry);
                            var o = iy(this.normSolution, e);
                            if (null !== o) return this.event("commitError", { msg: o });
                        }
                        this.locked = 1;
                        var r = this.getLetters();
                        if ((this.getRow().setEdit(-1), void 0 !== Yf[a]))
                            for (var i = Yf[a], t = 0; t < 5; ++t) r[t].innerText = i[t];
                        this.event("commit", { cur: this.curTry });
                    },
                },
                {
                    key: "press",
                    value: function (a) {
                        if (this.gameOver) return 0;
                        if (this.locked) return 0;
                        if (this.tries.length > this.maxRows) return 0;
                        if (((a = fh(a)), Vf.has(a) && this.curTry)) {
                            var e = this.cursor.getEditLetter();
                            return e
                                ? ((this.curTry[this.cursor.cursor] = a),
                                  this.getRow().setValue(this.cursor.cursor, a),
                                  e.focus(),
                                  pw(e, "0.15s ease-out type 0s none"),
                                  this.cursor.moveEditToNext(),
                                  1)
                                : 0;
                        }
                        if ("backspace" === a) {
                            var o = this.cursor.getEditLetter();
                            return (
                                (o && null != this.curTry[this.cursor.cursor]) || (o = this.cursor.moveEditToPrev()),
                                null !== o && ((o.innerText = ""), o.focus(), (this.curTry[this.cursor.cursor] = null)),
                                1
                            );
                        }
                        return "arrowright" === a
                            ? (this.cursor.moveEditVisual(1), 1)
                            : "arrowleft" === a
                              ? (this.cursor.moveEditVisual(-1), 1)
                              : "space" === a
                                ? (this.cursor.moveEditToNext(), 1)
                                : "enter" === a
                                  ? (this.commitWord(), 1)
                                  : 0;
                    },
                },
            ]),
            n
        );
    })();
function Fy(a, e, o) {
    Wf.games++;
    var r = Math.max.apply(
        Math,
        v(
            a.map(function (a) {
                return a.curRow;
            })
        )
    );
    1 == e
        ? (Wf.wins++,
          Wf.histo[r - bc + 1]++,
          void 0 === Wf.lastwin && (Wf.lastwin = a[0].curday - 1),
          Wf.lastwin == a[0].curday - 1 ? Wf.curstreak++ : (Wf.curstreak = 1),
          (Wf.lastwin = a[0].curday))
        : (Wf.curstreak = 0),
        (Wf.maxstreak = Math.max(Wf.maxstreak, Wf.curstreak));
    var i = Kf.startTime && Kf.endTime ? Math.round((Kf.endTime - Kf.startTime) / 1e3) : 0;
    Wf.avgtime || (Wf.avgtime = i),
        Wf.mintime || (Wf.mintime = i),
        Wf.maxtime || (Wf.maxtime = i),
        (Wf.avgtime = ((Wf.games - 1) * Wf.avgtime + i) / Wf.games),
        (Wf.maxtime = Math.max(Wf.maxtime, i)),
        (Wf.mintime = Math.max(Wf.mintime, i));
    var t,
        n = [],
        s = B(o.tries);
    try {
        for (s.s(); !(t = s.n()).done; ) {
            var u = t.value;
            n.push(u.join(""));
        }
    } catch (a) {
        s.e(a);
    } finally {
        s.f();
    }
    mg({
        type: "termo" == hc ? "commit" : hc,
        tries: n,
        invalids: Array.from(new Set(o.invalids)),
        won: e,
        day: o.curday,
        duration: i,
        stats: Wf,
    });
}
var Oy = yg;
di({ target: "Array", proto: 1 }, { fill: kw }), Oy("fill");
var Ty,
    Sy,
    Ly = di,
    Uy = C,
    Ry = L,
    Yy = Z,
    Py = ga,
    Gy = pa,
    qy =
        ((Ty = 0),
        ((Sy = /[ac]/).exec = function () {
            return (Ty = 1), /./.exec.apply(this, arguments);
        }),
        1 == Sy.test("abc") && Ty),
    Hy = Uy.Error,
    Jy = Yy(/./.test);
Ly(
    { target: "RegExp", proto: 1, forced: !qy },
    {
        test: function (a) {
            var e = this.exec;
            if (!Py(e)) return Jy(this, a);
            var o = Ry(e, this, a);
            if (null !== o && !Gy(o))
                throw new Hy("RegExp exec method returned something other than an Object or null");
            return !!o;
        },
    }
);
var Vy = di,
    Wy = Ir.indexOf,
    Ky = Ey,
    Xy = Z([].indexOf),
    Zy = !!Xy && 1 / Xy([1], 1, -0) < 0,
    _y = Ky("indexOf");
Vy(
    { target: "Array", proto: 1, forced: Zy || !_y },
    {
        indexOf: function (a) {
            var e = arguments.length > 1 ? arguments[1] : void 0;
            return Zy ? Xy(this, a, e) || 0 : Wy(this, a, e);
        },
    }
);
var $y = {},
    aE = Qe;
$y.f = aE;
var eE = C,
    oE = ce,
    rE = $y,
    iE = _e.f,
    tE = function (a) {
        var e = eE.Symbol || (eE.Symbol = {});
        oE(e, a) || iE(e, a, { value: rE.f(a) });
    },
    nE = di,
    sE = C,
    uE = ha,
    cE = as,
    lE = L,
    mE = Z,
    AE = F,
    gE = Ca,
    dE = k,
    pE = ce,
    fE = fi,
    bE = ga,
    vE = pa,
    hE = wa,
    wE = La,
    BE = io,
    yE = ne,
    EE = Aa,
    DE = Te,
    QE = qt,
    xE = H,
    jE = yn,
    ME = Qt,
    zE = gr,
    IE = yd,
    CE = Rr,
    NE = N,
    kE = _e,
    FE = $t,
    OE = U,
    TE = Ml,
    SE = bo.exports,
    LE = Za.exports,
    UE = ko,
    RE = de,
    YE = Qe,
    PE = $y,
    GE = tE,
    qE = zc,
    HE = Xo,
    JE = Ut.forEach,
    VE = No("hidden"),
    WE = YE("toPrimitive"),
    KE = HE.set,
    XE = HE.getterFor("Symbol"),
    ZE = Object.prototype,
    _E = sE.Symbol,
    $E = _E && _E.prototype,
    aD = sE.TypeError,
    eD = sE.QObject,
    oD = uE("JSON", "stringify"),
    rD = NE.f,
    iD = kE.f,
    tD = IE.f,
    nD = OE.f,
    sD = mE([].push),
    uD = LE("symbols"),
    cD = LE("op-symbols"),
    lD = LE("string-to-symbol-registry"),
    mD = LE("symbol-to-string-registry"),
    AD = LE("wks"),
    gD = !eD || !eD.prototype || !eD.prototype.findChild,
    dD =
        AE &&
        dE(function () {
            return (
                7 !=
                jE(
                    iD({}, "a", {
                        get: function () {
                            return iD(this, "a", { value: 7 }).a;
                        },
                    })
                ).a
            );
        })
            ? function (a, e, o) {
                  var r = rD(ZE, e);
                  r && delete ZE[e], iD(a, e, o), r && a !== ZE && iD(ZE, e, r);
              }
            : iD,
    pD = function (a, e) {
        var o = (uD[a] = jE($E));
        return KE(o, { type: "Symbol", tag: a, description: e }), AE || (o.description = e), o;
    },
    fD = function (a, e, o) {
        a === ZE && fD(cD, e, o), BE(a);
        var r = DE(e);
        return (
            BE(o),
            pE(uD, r)
                ? (o.enumerable
                      ? (pE(a, VE) && a[VE][r] && (a[VE][r] = 0), (o = jE(o, { enumerable: xE(0, 0) })))
                      : (pE(a, VE) || iD(a, VE, xE(1, {})), (a[VE][r] = 1)),
                  dD(a, r, o))
                : iD(a, r, o)
        );
    },
    bD = function (a, e) {
        BE(a);
        var o = EE(e),
            r = ME(o).concat(BD(o));
        return (
            JE(r, function (e) {
                (AE && !lE(vD, o, e)) || fD(a, e, o[e]);
            }),
            a
        );
    },
    vD = function (a) {
        var e = DE(a),
            o = lE(nD, this, e);
        return this === ZE && pE(uD, e) && !pE(cD, e)
            ? 0
            : o || !pE(this, e) || !pE(uD, e) || (pE(this, VE) && this[VE][e])
              ? o
              : 1;
    },
    hD = function (a, e) {
        var o = EE(a),
            r = DE(e);
        if (o !== ZE || !pE(uD, r) || pE(cD, r)) {
            var i = rD(o, r);
            return !i || !pE(uD, r) || (pE(o, VE) && o[VE][r]) || (i.enumerable = 1), i;
        }
    },
    wD = function (a) {
        var e = tD(EE(a)),
            o = [];
        return (
            JE(e, function (a) {
                pE(uD, a) || pE(UE, a) || sD(o, a);
            }),
            o
        );
    },
    BD = function (a) {
        var e = a === ZE,
            o = tD(e ? cD : EE(a)),
            r = [];
        return (
            JE(o, function (a) {
                !pE(uD, a) || (e && !pE(ZE, a)) || sD(r, uD[a]);
            }),
            r
        );
    };
if (
    (gE ||
        (SE(
            ($E = (_E = function () {
                if (hE($E, this)) throw aD("Symbol is not a constructor");
                var a = arguments.length && void 0 !== arguments[0] ? QE(arguments[0]) : void 0,
                    e = RE(a),
                    o = function (a) {
                        this === ZE && lE(o, cD, a),
                            pE(this, VE) && pE(this[VE], e) && (this[VE][e] = 0),
                            dD(this, e, xE(1, a));
                    };
                return AE && gD && dD(ZE, e, { configurable: 1, set: o }), pD(e, a);
            }).prototype),
            "toString",
            function () {
                return XE(this).tag;
            }
        ),
        SE(_E, "withoutSetter", function (a) {
            return pD(RE(a), a);
        }),
        (OE.f = vD),
        (kE.f = fD),
        (FE.f = bD),
        (NE.f = hD),
        (zE.f = IE.f = wD),
        (CE.f = BD),
        (PE.f = function (a) {
            return pD(YE(a), a);
        }),
        AE &&
            (iD($E, "description", {
                configurable: 1,
                get: function () {
                    return XE(this).description;
                },
            }),
            SE(ZE, "propertyIsEnumerable", vD, { unsafe: 1 }))),
    nE({ global: 1, wrap: 1, forced: !gE, sham: !gE }, { Symbol: _E }),
    JE(ME(AD), function (a) {
        GE(a);
    }),
    nE(
        { target: "Symbol", stat: 1, forced: !gE },
        {
            for: function (a) {
                var e = QE(a);
                if (pE(lD, e)) return lD[e];
                var o = _E(e);
                return (lD[e] = o), (mD[o] = e), o;
            },
            keyFor: function (a) {
                if (!wE(a)) throw aD(a + " is not a symbol");
                if (pE(mD, a)) return mD[a];
            },
            useSetter: function () {
                gD = 1;
            },
            useSimple: function () {
                gD = 0;
            },
        }
    ),
    nE(
        { target: "Object", stat: 1, forced: !gE, sham: !AE },
        {
            create: function (a, e) {
                return void 0 === e ? jE(a) : bD(jE(a), e);
            },
            defineProperty: fD,
            defineProperties: bD,
            getOwnPropertyDescriptor: hD,
        }
    ),
    nE({ target: "Object", stat: 1, forced: !gE }, { getOwnPropertyNames: wD, getOwnPropertySymbols: BD }),
    nE(
        {
            target: "Object",
            stat: 1,
            forced: dE(function () {
                CE.f(1);
            }),
        },
        {
            getOwnPropertySymbols: function (a) {
                return CE.f(yE(a));
            },
        }
    ),
    oD &&
        nE(
            {
                target: "JSON",
                stat: 1,
                forced:
                    !gE ||
                    dE(function () {
                        var a = _E();
                        return "[null]" != oD([a]) || "{}" != oD({ a }) || "{}" != oD(Object(a));
                    }),
            },
            {
                stringify: function (a, e, o) {
                    var r = TE(arguments),
                        i = e;
                    if ((vE(e) || void 0 !== a) && !wE(a))
                        return (
                            fE(e) ||
                                (e = function (a, e) {
                                    if ((bE(i) && (e = lE(i, this, a, e)), !wE(e))) return e;
                                }),
                            (r[1] = e),
                            cE(oD, null, r)
                        );
                },
            }
        ),
    !$E[WE])
) {
    var yD = $E.valueOf;
    SE($E, WE, function () {
        return lE(yD, this);
    });
}
qE(_E, "Symbol"), (UE[VE] = 1);
var ED = di,
    DD = F,
    QD = C,
    xD = Z,
    jD = ce,
    MD = ga,
    zD = wa,
    ID = qt,
    CD = _e.f,
    ND = Zr,
    kD = QD.Symbol,
    FD = kD && kD.prototype;
if (DD && MD(kD) && (!("description" in FD) || void 0 !== kD().description)) {
    var OD = {},
        TD = function () {
            var a = arguments.length < 1 || void 0 === arguments[0] ? void 0 : ID(arguments[0]),
                e = zD(FD, this) ? new kD(a) : void 0 === a ? kD() : kD(a);
            return "" === a && (OD[e] = 1), e;
        };
    ND(TD, kD), (TD.prototype = FD), (FD.constructor = TD);
    var SD = "Symbol(test)" == String(kD("test")),
        LD = xD(FD.toString),
        UD = xD(FD.valueOf),
        RD = /^Symbol\((.*)\)[^)]+$/,
        YD = xD("".replace),
        PD = xD("".slice);
    CD(FD, "description", {
        configurable: 1,
        get: function () {
            var a = UD(this),
                e = LD(a);
            if (jD(OD, a)) return "";
            var o = SD ? PD(e, 7, -1) : YD(e, RD, "$1");
            return "" === o ? void 0 : o;
        },
    }),
        ED({ global: 1, forced: 1 }, { Symbol: TD });
}
tE("iterator");
var GD = qt,
    qD = pa,
    HD = fo,
    JD = Z("".replace),
    VD = String(Error("zxcasd").stack),
    WD = /\n\s*at [^:]*:[^\n]*/,
    KD = WD.test(VD),
    XD = H,
    ZD = !k(function () {
        var a = Error("a");
        return "stack" in a ? (Object.defineProperty(a, "stack", XD(1, 7)), 7 !== a.stack) : 1;
    }),
    _D = ha,
    $D = ce,
    aQ = fo,
    eQ = wa,
    oQ = Lu,
    rQ = Zr,
    iQ = Pu,
    tQ = function (a, e) {
        return void 0 === a ? (arguments.length < 2 ? "" : e) : GD(a);
    },
    nQ = function (a, e) {
        qD(e) && "cause" in e && HD(a, "cause", e.cause);
    },
    sQ = function (a, e) {
        if (KD && "string" == typeof a) for (; e--; ) a = JD(a, WD, "");
        return a;
    },
    uQ = ZD,
    cQ = di,
    lQ = as,
    mQ = function (a, e, o, r) {
        var i = r ? 2 : 1,
            t = a.split("."),
            n = t[t.length - 1],
            s = _D.apply(null, t);
        if (s) {
            var u = s.prototype;
            if (($D(u, "cause") && delete u.cause, !o)) return s;
            var c = _D("Error"),
                l = e(function (a, e) {
                    var o = tQ(r ? e : a, void 0),
                        t = r ? new s(a) : new s();
                    return (
                        void 0 !== o && aQ(t, "message", o),
                        uQ && aQ(t, "stack", sQ(t.stack, 2)),
                        this && eQ(u, this) && iQ(t, this, l),
                        arguments.length > i && nQ(t, arguments[i]),
                        t
                    );
                });
            (l.prototype = u), "Error" !== n && (oQ ? oQ(l, c) : rQ(l, c, { name: 1 })), rQ(l, s);
            try {
                u.name !== n && aQ(u, "name", n), (u.constructor = l);
            } catch (a) {}
            return l;
        }
    },
    AQ = C.WebAssembly,
    gQ = 7 !== Error("e", { cause: 7 }).cause,
    dQ = function (a, e) {
        var o = {};
        (o[a] = mQ(a, e, gQ)), cQ({ global: 1, forced: gQ }, o);
    },
    pQ = function (a, e) {
        if (AQ && AQ[a]) {
            var o = {};
            (o[a] = mQ("WebAssembly." + a, e, gQ)), cQ({ target: "WebAssembly", stat: 1, forced: gQ }, o);
        }
    };
function fQ(a, e, o, r) {
    return new (o || (o = Promise))(function (i, t) {
        function n(a) {
            try {
                u(r.next(a));
            } catch (a) {
                t(a);
            }
        }
        function s(a) {
            try {
                u(r.throw(a));
            } catch (a) {
                t(a);
            }
        }
        function u(a) {
            var e;
            a.done
                ? i(a.value)
                : ((e = a.value),
                  e instanceof o
                      ? e
                      : new o(function (a) {
                            a(e);
                        })).then(n, s);
        }
        u((r = r.apply(a, e || [])).next());
    });
}
function bQ(a, e) {
    var o,
        r,
        i,
        t,
        n = {
            label: 0,
            sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
            },
            trys: [],
            ops: [],
        };
    return (
        (t = { next: s(0), throw: s(1), return: s(2) }),
        "function" == typeof Symbol &&
            (t[Symbol.iterator] = function () {
                return this;
            }),
        t
    );
    function s(t) {
        return function (s) {
            return (function (t) {
                if (o) throw new TypeError("Generator is already executing.");
                for (; n; )
                    try {
                        if (
                            ((o = 1),
                            r &&
                                (i =
                                    2 & t[0]
                                        ? r.return
                                        : t[0]
                                          ? r.throw || ((i = r.return) && i.call(r), 0)
                                          : r.next) &&
                                !(i = i.call(r, t[1])).done)
                        )
                            return i;
                        switch (((r = 0), i && (t = [2 & t[0], i.value]), t[0])) {
                            case 0:
                            case 1:
                                i = t;
                                break;
                            case 4:
                                return n.label++, { value: t[1], done: 0 };
                            case 5:
                                n.label++, (r = t[1]), (t = [0]);
                                continue;
                            case 7:
                                (t = n.ops.pop()), n.trys.pop();
                                continue;
                            default:
                                if (!((i = (i = n.trys).length > 0 && i[i.length - 1]) || (6 !== t[0] && 2 !== t[0]))) {
                                    n = 0;
                                    continue;
                                }
                                if (3 === t[0] && (!i || (t[1] > i[0] && t[1] < i[3]))) {
                                    n.label = t[1];
                                    break;
                                }
                                if (6 === t[0] && n.label < i[1]) {
                                    (n.label = i[1]), (i = t);
                                    break;
                                }
                                if (i && n.label < i[2]) {
                                    (n.label = i[2]), n.ops.push(t);
                                    break;
                                }
                                i[2] && n.ops.pop(), n.trys.pop();
                                continue;
                        }
                        t = e.call(a, n);
                    } catch (a) {
                        (t = [6, a]), (r = 0);
                    } finally {
                        o = i = 0;
                    }
                if (5 & t[0]) throw t[1];
                return { value: t[0] ? t[1] : void 0, done: 1 };
            })([t, s]);
        };
    }
}
dQ("Error", function (a) {
    return function (e) {
        return lQ(a, this, arguments);
    };
}),
    dQ("EvalError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    dQ("RangeError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    dQ("ReferenceError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    dQ("SyntaxError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    dQ("TypeError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    dQ("URIError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    pQ("CompileError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    pQ("LinkError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    pQ("RuntimeError", function (a) {
        return function (e) {
            return lQ(a, this, arguments);
        };
    }),
    function () {
        (console.warn || console.log).apply(console, arguments);
    }.bind("[clipboard-polyfill]");
var vQ,
    hQ,
    wQ,
    BQ,
    yQ = "undefined" == typeof navigator ? void 0 : navigator,
    EQ = null == yQ ? void 0 : yQ.clipboard;
null === (vQ = null == EQ ? void 0 : EQ.read) || void 0 === vQ || vQ.bind(EQ),
    null === (hQ = null == EQ ? void 0 : EQ.readText) || void 0 === hQ || hQ.bind(EQ);
var DQ = null === (wQ = null == EQ ? void 0 : EQ.write) || void 0 === wQ ? void 0 : wQ.bind(EQ),
    QQ = null === (BQ = null == EQ ? void 0 : EQ.writeText) || void 0 === BQ ? void 0 : BQ.bind(EQ),
    xQ = "undefined" == typeof window ? void 0 : window,
    jQ = null == xQ ? void 0 : xQ.ClipboardItem,
    MQ = xQ,
    zQ = function () {
        this.success = 0;
    };
function IQ(a, e, o) {
    for (var r in ((a.success = 1), e)) {
        var i = e[r],
            t = o.clipboardData;
        t.setData(r, i), "text/plain" === r && t.getData(r) !== i && (a.success = 0);
    }
    o.preventDefault();
}
function CQ(a) {
    var e = new zQ(),
        o = IQ.bind(this, e, a);
    document.addEventListener("copy", o);
    try {
        document.execCommand("copy");
    } finally {
        document.removeEventListener("copy", o);
    }
    return e.success;
}
function NQ(a, e) {
    kQ(a);
    var o = CQ(e);
    return FQ(), o;
}
function kQ(a) {
    var e = document.getSelection();
    if (e) {
        var o = document.createRange();
        o.selectNodeContents(a), e.removeAllRanges(), e.addRange(o);
    }
}
function FQ() {
    var a = document.getSelection();
    a && a.removeAllRanges();
}
function OQ(a) {
    return fQ(this, void 0, void 0, function () {
        var e;
        return bQ(this, function () {
            if (
                ((e = "text/plain" in a),
                "undefined" == typeof ClipboardEvent &&
                    void 0 !== MQ.clipboardData &&
                    void 0 !== MQ.clipboardData.setData)
            ) {
                if (!e) throw new Error("No `text/plain` value was specified.");
                if (((o = a["text/plain"]), MQ.clipboardData.setData("Text", o))) return [2, 1];
                throw new Error("Copying failed, possibly because the user rejected it.");
            }
            var o;
            return CQ(a) ||
                navigator.userAgent.indexOf("Edge") > -1 ||
                NQ(document.body, a) ||
                (function (a) {
                    var e = document.createElement("div");
                    e.setAttribute("style", "-webkit-user-select: text !important"),
                        (e.textContent = "temporary element"),
                        document.body.appendChild(e);
                    var o = NQ(e, a);
                    return document.body.removeChild(e), o;
                })(a) ||
                (function (a) {
                    var e = document.createElement("div");
                    e.setAttribute("style", "-webkit-user-select: text !important");
                    var o = e;
                    e.attachShadow && (o = e.attachShadow({ mode: "open" }));
                    var r = document.createElement("span");
                    (r.innerText = a), o.appendChild(r), document.body.appendChild(e), kQ(r);
                    var i = document.execCommand("copy");
                    return FQ(), document.body.removeChild(e), i;
                })(a["text/plain"])
                ? [2, 1]
                : [2, 0];
        });
    });
}
function TQ(a) {
    return fQ(this, void 0, void 0, function () {
        return bQ(this, function () {
            if (QQ) return [2, QQ(a)];
            if (
                !OQ(
                    (function (a) {
                        var e = {};
                        return (e["text/plain"] = a), e;
                    })(a)
                )
            )
                throw new Error("writeText() failed");
            return [2];
        });
    });
}
function SQ(a, e) {
    for (var o = 0, r = a; o < r.length; o++) if (-1 !== r[o].types.indexOf(e)) return 1;
    return 0;
}
var LQ = (function () {
    function a(a, e) {
        var o;
        for (var r in (void 0 === e && (e = {}), (this.types = Object.keys(a)), (this._items = {}), a)) {
            var i = a[r];
            this._items[r] = "string" == typeof i ? UQ(r, i) : i;
        }
        this.presentationStyle =
            null !== (o = null == e ? void 0 : e.presentationStyle) && void 0 !== o ? o : "unspecified";
    }
    return (
        (a.prototype.getType = function (a) {
            return fQ(this, void 0, void 0, function () {
                return bQ(this, function () {
                    return [2, this._items[a]];
                });
            });
        }),
        a
    );
})();
function UQ(a, e) {
    return new Blob([e], { type: a });
}
function RQ(a) {
    return fQ(this, void 0, void 0, function () {
        return bQ(this, function () {
            return [
                2,
                new Promise(function (e, o) {
                    var r = new FileReader();
                    r.addEventListener("load", function () {
                        var a = r.result;
                        "string" == typeof a ? e(a) : o("could not convert blob to string");
                    }),
                        r.readAsText(a);
                }),
            ];
        });
    });
}
function YQ(a) {
    return fQ(this, void 0, void 0, function () {
        var e, o, r, i, t, n, s;
        return bQ(this, function (u) {
            switch (u.label) {
                case 0:
                    (e = {}), (o = 0), (r = a.types), (u.label = 1);
                case 1:
                    return o < r.length ? ((i = r[o]), (t = e), (n = i), [4, a.getType(i)]) : [3, 4];
                case 2:
                    (t[n] = u.sent()), (u.label = 3);
                case 3:
                    return o++, [3, 1];
                case 4:
                    return (
                        (s = {}), a.presentationStyle && (s.presentationStyle = a.presentationStyle), [2, new jQ(e, s)]
                    );
            }
        });
    });
}
function PQ(a, e) {
    return fQ(this, void 0, void 0, function () {
        return bQ(this, function (o) {
            switch (o.label) {
                case 0:
                    return [4, a.getType(e)];
                case 1:
                    return [4, RQ(o.sent())];
                case 2:
                    return [2, o.sent()];
            }
        });
    });
}
function GQ(a) {
    return fQ(this, void 0, void 0, function () {
        var e, o, r, i, t, n;
        return bQ(this, function (s) {
            switch (s.label) {
                case 0:
                    (e = {}), (o = 0), (r = a.types), (s.label = 1);
                case 1:
                    return o < r.length ? ((i = r[o]), (t = e), (n = i), [4, PQ(a, i)]) : [3, 4];
                case 2:
                    (t[n] = s.sent()), (s.label = 3);
                case 3:
                    return o++, [3, 1];
                case 4:
                    return [2, e];
            }
        });
    });
}
function qQ(a) {
    return fQ(this, void 0, void 0, function () {
        var e, o, r;
        return bQ(this, function (i) {
            switch (i.label) {
                case 0:
                    return DQ && jQ ? [4, Promise.all(a.map(YQ))] : [3, 5];
                case 1:
                    (e = i.sent()), (i.label = 2);
                case 2:
                    return i.trys.push([2, 4, , 5]), [4, DQ(e)];
                case 3:
                    return [2, i.sent()];
                case 4:
                    if (((o = i.sent()), !SQ(a, "text/plain") && !SQ(a, "text/html"))) throw o;
                    return [3, 5];
                case 5:
                    return SQ(a, "text/plain"), (r = OQ), [4, GQ(a[0])];
                case 6:
                    if (!r.apply(void 0, [i.sent()])) throw new Error("write() failed");
                    return [2];
            }
        });
    });
}
var HQ = { right: "🟩", place: "🟨", wrong: "⬛" };
function JQ(a) {
    return VQ.apply(this, arguments);
}
function VQ() {
    return (
        (VQ = o(
            regeneratorRuntime.mark(function a(e) {
                var o, r, i, t, n, s, u, c, l, m, A, g;
                return regeneratorRuntime.wrap(function (a) {
                    for (;;)
                        switch ((a.prev = a.next)) {
                            case 0:
                                (o = e.curRow),
                                    (r = e.won ? o + 1 : "X"),
                                    (i = null === iy(e.normSolution, e.tries) ? "*" : ""),
                                    (t = Wf.curstreak > 0 ? " 🔥 ".concat(Wf.curstreak) : ""),
                                    (n = [
                                        "joguei term.ooo #".concat(e.curday, " ").concat(i).concat(r, "/6").concat(t),
                                        "",
                                    ]),
                                    (s = B(e.tries));
                                try {
                                    for (s.s(); !(u = s.n()).done; ) {
                                        (c = u.value), (l = []), (m = B(oy(e.normSolution, c)));
                                        try {
                                            for (m.s(); !(A = m.n()).done; ) (g = A.value), l.push(HQ[g]);
                                        } catch (a) {
                                            m.e(a);
                                        } finally {
                                            m.f();
                                        }
                                        n.push(l.join(""));
                                    }
                                } catch (a) {
                                    s.e(a);
                                } finally {
                                    s.f();
                                }
                                return n.push(""), n.push(""), (a.next = 11), XQ(n.join("\n"));
                            case 11:
                                setTimeout(bw, 2e3);
                            case 12:
                            case "end":
                                return a.stop();
                        }
                }, a);
            })
        )),
        VQ.apply(this, arguments)
    );
}
function WQ(a, e) {
    return KQ.apply(this, arguments);
}
function KQ() {
    return (KQ = o(
        regeneratorRuntime.mark(function a(e, o) {
            var r;
            return regeneratorRuntime.wrap(
                function (a) {
                    for (;;)
                        switch ((a.prev = a.next)) {
                            case 0:
                                if (
                                    ((r = {
                                        text: e,
                                        files: [
                                            new File([o], "quarteto.png", {
                                                type: "image/png",
                                                lastModified: new Date().getTime(),
                                            }),
                                        ],
                                    }),
                                    !(
                                        _Q() &&
                                        -1 == navigator.userAgent.toLowerCase().indexOf("firefox") &&
                                        navigator.share &&
                                        navigator.canShare &&
                                        navigator.canShare(r)
                                    ))
                                ) {
                                    a.next = 11;
                                    break;
                                }
                                return (a.prev = 2), (a.next = 5), navigator.share(r);
                            case 5:
                                return fw("compartilhado"), a.abrupt("return");
                            case 9:
                                (a.prev = 9), (a.t0 = a.catch(2));
                            case 11:
                                qQ([
                                    new LQ({ "text/plain": new Blob([e], { type: "text/plain" }), "image/png": o }),
                                ]).then(
                                    function () {
                                        fw("copiado para o ctrl+V");
                                    },
                                    function () {
                                        fw("compartilhamento falhou");
                                    }
                                );
                            case 14:
                            case "end":
                                return a.stop();
                        }
                },
                a,
                null,
                [[2, 9]]
            );
        })
    )).apply(this, arguments);
}
function XQ(a) {
    return ZQ.apply(this, arguments);
}
function ZQ() {
    return (ZQ = o(
        regeneratorRuntime.mark(function a(e) {
            return regeneratorRuntime.wrap(
                function (a) {
                    for (;;)
                        switch ((a.prev = a.next)) {
                            case 0:
                                if (
                                    ((window._shared = e),
                                    !(
                                        _Q() &&
                                        -1 == navigator.userAgent.toLowerCase().indexOf("firefox") &&
                                        navigator.share &&
                                        navigator.canShare &&
                                        navigator.canShare({ text: e })
                                    ))
                                ) {
                                    a.next = 11;
                                    break;
                                }
                                return (a.prev = 2), (a.next = 5), navigator.share({ text: e });
                            case 5:
                                return fw("compartilhado"), a.abrupt("return");
                            case 9:
                                (a.prev = 9), (a.t0 = a.catch(2));
                            case 11:
                                TQ(e).then(
                                    function () {
                                        fw("copiado para o ctrl+V");
                                    },
                                    function () {
                                        fw("compartilhamento falhou");
                                    }
                                );
                            case 12:
                            case "end":
                                return a.stop();
                        }
                },
                a,
                null,
                [[2, 9]]
            );
        })
    )).apply(this, arguments);
}
function _Q() {
    var a, e;
    if (navigator.userAgentData) return navigator.userAgentData.mobile;
    var o =
        null !== (a = null !== (e = navigator.userAgent) && void 0 !== e ? e : navigator.vendor) && void 0 !== a
            ? a
            : window.opera;
    return (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            o
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            o.substr(0, 4)
        )
    );
}
var $Q = regeneratorRuntime.mark(ix),
    ax = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🟥"];
function ex(a) {
    return a.won ? ax[a.curRow] : ax[9];
}
var ox = { right: "#3AA394", place: "#D3AD69", wrong: "#312A2C" };
function rx(a) {
    var e = document.createElement("canvas");
    (e.width = 1024), (e.height = 576);
    var o = e.getContext("2d");
    o.scale(2, 2),
        (o.fillStyle = "#6E5C62"),
        o.fillRect(0, 0, 512, 288),
        (o.lineWidth = 2),
        (o.strokeStyle = "#312A2C"),
        o.strokeRect(0, 0, 512, 288),
        (o.fillStyle = "#FAFAFF"),
        (o.font = "300 20px Mitr"),
        (o.textAlign = "center"),
        o.fillText("".concat(wc, " #").concat(a[0].curday), 256, 36),
        (o.fillStyle = "#312A2C"),
        (o.font = "300 12px Mitr"),
        (o.textAlign = "right"),
        o.fillText("term.ooo/".concat(bc), 496, 272);
    for (
        var r = 5 * bc + 0.75 * (bc + 1),
            i = Bc,
            t = Math.min(512 / r, 188 / i),
            n = 60 + (188 - i * t) / 2,
            s = (512 - 5 * bc * t) / (bc + 1),
            u = 0;
        u < a.length;
        ++u
    ) {
        var c = a[u];
        o.save(), o.translate(s + u * (s + 5 * t), n);
        for (var l = 0; l < Bc; ++l) {
            var m = c.tries[l];
            if (!m) break;
            for (var A = oy(c.normSolution, m), g = 0; g < 5; ++g)
                (o.fillStyle = ox[A[g]]), bh(o, g * t, l * t, 0.9 * t, 0.9 * t, (0.9 * t) / 5), o.fill();
        }
        o.restore();
    }
    return new Promise(function (a) {
        return e.toBlob(a);
    });
}
function ix(a) {
    var e, o, r, i, t, n, s, u;
    return regeneratorRuntime.wrap(function (c) {
        for (;;)
            switch ((c.prev = c.next)) {
                case 0:
                    (e = Math.max.apply(
                        Math,
                        v(
                            a.map(function (a) {
                                return a.curRow + 1;
                            })
                        )
                    )),
                        (o = 0);
                case 2:
                    if (!(o < e)) {
                        c.next = 11;
                        break;
                    }
                    (r = []), (i = B(a));
                    try {
                        for (i.s(); !(t = i.n()).done; )
                            (s = t.value),
                                (u = null !== (n = s.tries[o]) && void 0 !== n ? n : "%%%%%"),
                                r.push(
                                    oy(s.normSolution, u)
                                        .map(function (a) {
                                            return HQ[a];
                                        })
                                        .join("")
                                );
                    } catch (a) {
                        i.e(a);
                    } finally {
                        i.f();
                    }
                    return (c.next = 8), r.join("  ");
                case 8:
                    ++o, (c.next = 2);
                    break;
                case 11:
                case "end":
                    return c.stop();
            }
    }, $Q);
}
function tx() {
    return (tx = o(
        regeneratorRuntime.mark(function a(e) {
            var o, r, i;
            return regeneratorRuntime.wrap(function (a) {
                for (;;)
                    switch ((a.prev = a.next)) {
                        case 0:
                            if (1 !== bc) {
                                a.next = 2;
                                break;
                            }
                            return a.abrupt("return", JQ(e[0]));
                        case 2:
                            if (
                                ((o = Wf.curstreak > 0 ? " 🔥 ".concat(Wf.curstreak) : ""),
                                (r = ["term.ooo/".concat(bc, " #").concat(e[0].curday).concat(o), ""]),
                                2 === bc
                                    ? r.push(ex(e[0]) + ex(e[1]))
                                    : 3 == bc
                                      ? r.push(ex(e[0]) + ex(e[1]) + ex(e[2]))
                                      : 4 == bc && (r.push(ex(e[0]) + ex(e[1])), r.push(ex(e[2]) + ex(e[3]))),
                                r.push(""),
                                !(bc >= 3))
                            ) {
                                a.next = 15;
                                break;
                            }
                            return r.push(""), (a.next = 10), rx(e);
                        case 10:
                            return (i = a.sent), (a.next = 13), WQ(r.join("\n"), i);
                        case 13:
                            a.next = 20;
                            break;
                        case 15:
                            return r.push.apply(r, v(ix(e))), r.push(""), r.push(""), (a.next = 20), XQ(r.join("\n"));
                        case 20:
                            setTimeout(bw, 2e3);
                        case 21:
                        case "end":
                            return a.stop();
                    }
            }, a);
        })
    )).apply(this, arguments);
}
function nx(a) {
    dw.modal.show(a);
}
function sx(a) {
    nx("stats"), dw.modal.getModal("stats").setStats(Wf, a);
}
function ux() {
    return dw.modal.isOpen();
}
var cx = F,
    lx = Z,
    mx = L,
    Ax = k,
    gx = Qt,
    dx = Rr,
    px = U,
    fx = ne,
    bx = sa,
    vx = Object.assign,
    hx = Object.defineProperty,
    wx = lx([].concat),
    Bx =
        !vx ||
        Ax(function () {
            if (
                cx &&
                1 !==
                    vx(
                        { b: 1 },
                        vx(
                            hx({}, "a", {
                                enumerable: 1,
                                get: function () {
                                    hx(this, "b", { value: 3, enumerable: 0 });
                                },
                            }),
                            { b: 2 }
                        )
                    ).b
            )
                return 1;
            var a = {},
                e = {},
                o = Symbol(),
                r = "abcdefghijklmnopqrst";
            return (
                (a[o] = 7),
                r.split("").forEach(function (a) {
                    e[a] = a;
                }),
                7 != vx({}, a)[o] || gx(vx({}, e)).join("") != r
            );
        })
            ? function (a, e) {
                  for (var o = fx(a), r = arguments.length, i = 1, t = dx.f, n = px.f; r > i; )
                      for (var s, u = bx(arguments[i++]), c = t ? wx(gx(u), t(u)) : gx(u), l = c.length, m = 0; l > m; )
                          (s = c[m++]), (cx && !mx(n, u, s)) || (o[s] = u[s]);
                  return o;
              }
            : vx,
    yx = Bx;
function Ex(a, e) {
    if (void 0 !== e) {
        for (var o = 0, r = Object.keys(a); o < r.length; o++) delete a[r[o]];
        return Object.assign(a, e);
    }
}
di({ target: "Object", stat: 1, forced: Object.assign !== yx }, { assign: yx });
var Dx = ["curday", "solution", "normSolution", "tries", "invalids", "curRow", "curTry", "gameOver", "won"];
function Qx(a) {
    var e,
        o = [],
        r = B(a);
    try {
        for (r.s(); !(e = r.n()).done; ) {
            var i,
                t = e.value,
                n = {},
                s = B(Dx);
            try {
                for (s.s(); !(i = s.n()).done; ) {
                    var u = i.value;
                    n[u] = t[u];
                }
            } catch (a) {
                s.e(a);
            } finally {
                s.f();
            }
            o.push(n);
        }
    } catch (a) {
        r.e(a);
    } finally {
        r.f();
    }
    !(function (a, e) {
        try {
            window.localStorage.setItem(a, JSON.stringify(e));
        } catch (a) {}
    })(hc, { config: Xf, meta: Kf, stats: Wf, state: o });
}
(lg = hc),
    window.addEventListener("error", function (a) {
        var e, o;
        return gg(
            null == a || null === (e = a.error) || void 0 === e ? void 0 : e.message,
            null == a || null === (o = a.error) || void 0 === o ? void 0 : o.stack
        );
    }),
    window.addEventListener("unhandledrejection", function (a) {
        var e;
        return gg(null == a || null === (e = a.reason) || void 0 === e ? void 0 : e.message, "[Promise]");
    });
var xx = ["Genial", "Fantástico", "Extraordinário", "Fenomenal", "Impressionante", "Ufa!"],
    jx = {};
function Mx(a, e, o, r) {
    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
        t = jx[a];
    t || (t = jx[a] = new Array(bc)),
        ("right" == o || ("place" == o && "right" != t[e]) || ("wrong" == o && void 0 === t[e])) && (t[e] = o);
    for (var n = 0; n < bc; ++n)
        if (r[n].gameOver) t[n] = null;
        else if (void 0 === t[n]) return;
    dw.kbd.letterToMulti(bc, a, t, i);
}
!(function a(e) {
    if ("complete" !== document.readyState)
        return document.addEventListener(
            "readystatechange",
            function () {
                return a(e);
            },
            { once: 1 }
        );
    e();
})(function () {
    !(function () {
        document.querySelector("wc-bar").disableLink(hc),
            (document.querySelector("head title").innerText = wc),
            (document.querySelector("wc-header").innerHTML = wc),
            (document.getElementById("style_".concat(hc)).media = "");
        for (var a = document.querySelector("main"), e = 0; e < bc; ++e) {
            var o = document.createElement("wc-board");
            (o.id = "board".concat(e)),
                o.setAttribute("rows", Bc),
                (o.ariaLive = "polite"),
                (o.role = "group"),
                a.appendChild(o);
        }
        document.querySelector("wc-stats").setAttribute("range", "".concat(bc, "-").concat(Bc));
    })();
    for (
        var a = [],
            e = function (e) {
                var r = new ky(document.getElementById("board".concat(e)), Bc);
                (r.idx = e),
                    a.push(r),
                    r.wcb.addEventListener("letter", function (e) {
                        if (!r.gameOver && r.curRow == e.detail.row) {
                            var o,
                                i = B(a);
                            try {
                                for (i.s(); !(o = i.n()).done; ) {
                                    var t = o.value;
                                    t.gameOver || t.cursor.reset(e.detail.pos);
                                }
                            } catch (a) {
                                i.e(a);
                            } finally {
                                i.f();
                            }
                        }
                    }),
                    r.addEventListener("commitError", function (e) {
                        ph(a, r, "commit-error") && e.detail.msg && fw(e.detail.msg),
                            pw(r.getRow(), "0.75s ease-in-out rownope");
                    }),
                    r.addEventListener(
                        "commit",
                        (function () {
                            var t = o(
                                regeneratorRuntime.mark(function o(t) {
                                    var n, s, u, c, l, m, A;
                                    return regeneratorRuntime.wrap(function (o) {
                                        for (;;)
                                            switch ((o.prev = o.next)) {
                                                case 0:
                                                    return (
                                                        (n = t.detail.cur),
                                                        (s = oy(r.normSolution, n)),
                                                        (o.next = 4),
                                                        r.setClues(s)
                                                    );
                                                case 4:
                                                    for (u = 0; u < 5; ++u) Mx(n[u], e, s[u], a);
                                                    if (
                                                        !s.every(function (a) {
                                                            return "right" === a;
                                                        })
                                                    ) {
                                                        o.next = 12;
                                                        break;
                                                    }
                                                    return r.animateVictory(), (o.next = 9), i(r, 1);
                                                case 9:
                                                    if ((Qx(a), ph(a, r, "unlock"))) {
                                                        c = B(a);
                                                        try {
                                                            for (c.s(); !(l = c.n()).done; ) l.value.locked = 0;
                                                        } catch (a) {
                                                            c.e(a);
                                                        } finally {
                                                            c.f();
                                                        }
                                                    }
                                                    return o.abrupt("return");
                                                case 12:
                                                    if (!(r.curRow >= r.maxRows - 1)) {
                                                        o.next = 17;
                                                        break;
                                                    }
                                                    return (
                                                        pw(r.getRow(), "0.75s ease-in-out rownope"),
                                                        (o.next = 16),
                                                        i(r, 0)
                                                    );
                                                case 16:
                                                    return o.abrupt("return");
                                                case 17:
                                                    if ((r.newLine(), Qx(a), ph(a, r, "unlock"))) {
                                                        m = B(a);
                                                        try {
                                                            for (m.s(); !(A = m.n()).done; ) A.value.locked = 0;
                                                        } catch (a) {
                                                            m.e(a);
                                                        } finally {
                                                            m.f();
                                                        }
                                                    }
                                                case 20:
                                                case "end":
                                                    return o.stop();
                                            }
                                    }, o);
                                })
                            );
                            return function (a) {
                                return t.apply(this, arguments);
                            };
                        })()
                    );
            },
            r = 0;
        r < bc;
        ++r
    )
        e(r);
    function i(a, e) {
        return t.apply(this, arguments);
    }
    function t() {
        return (
            (t = o(
                regeneratorRuntime.mark(function e(o, r) {
                    var i, t, n, s, u;
                    return regeneratorRuntime.wrap(function (e) {
                        for (;;)
                            switch ((e.prev = e.next)) {
                                case 0:
                                    if (((o.gameOver = 1), (o.won = r), o.tries.push(o.curTry), r && bc > 1))
                                        for (i = 0, t = Object.keys(jx); i < t.length; i++)
                                            (n = t[i]), (jx[n][o.idx] = null), dw.kbd.letterToMulti(bc, n, jx[n], 0);
                                    if (
                                        a.every(function (a) {
                                            return a.gameOver;
                                        })
                                    ) {
                                        e.next = 6;
                                        break;
                                    }
                                    return e.abrupt("return");
                                case 6:
                                    return (e.next = 8), gh(0.5);
                                case 8:
                                    return (
                                        (s = a.every(function (a) {
                                            return a.won;
                                        })),
                                        s
                                            ? ((u = Math.max.apply(
                                                  Math,
                                                  v(
                                                      a.map(function (a) {
                                                          return a.curRow;
                                                      })
                                                  )
                                              )),
                                              fw(xx[u - Bc + 6]))
                                            : fw(
                                                  "".concat(yc.palavras, ": ").concat(
                                                      a
                                                          .map(function (a) {
                                                              return a.solution;
                                                          })
                                                          .join(", ")
                                                  )
                                              ),
                                        (e.next = 12),
                                        gh(1)
                                    );
                                case 12:
                                    (Kf.endTime = +new Date()), Fy(a, s, o), dw.header.showBar(), sx(1), Qx(a);
                                case 17:
                                case "end":
                                    return e.stop();
                            }
                    }, e);
                })
            )),
            t.apply(this, arguments)
        );
    }
    (function (a, e, o) {
        1 == bc && (dw.stats.setAttribute("stato", "true"), dw.config.setAttribute("boxes", "contrast,hardmode,index")),
            dw.kbd.addEventListener("kbd", function (a) {
                "escape" != a.detail.key ? (bw(), e(a.detail.key)) : o();
            }),
            document.addEventListener("click", function (a) {
                o(), a.stopPropagation(), a.preventDefault();
            }),
            dw.modal.registerModal("help", document.querySelector("div#help")),
            dw.modal.registerModal("stats", document.querySelector("#stats")),
            dw.modal.registerModal("config", dw.config),
            dw.modal.getModal("config").addEventListener("update", function () {
                return (
                    (a = dw.modal.getModal("config").getConfig()),
                    (Xf.highContrast = a.highContrast),
                    (Xf.hardMode = a.hardMode),
                    (Kf.highContrastChange = 1),
                    void vw()
                );
                var a;
            });
        for (
            var r = function () {
                    var e = t[i];
                    dw.header.addEventListener(e, function () {
                        "stats" === e
                            ? sx(
                                  a.every(function (a) {
                                      return a.gameOver;
                                  })
                              )
                            : nx(e);
                    });
                },
                i = 0,
                t = ["stats", "config", "help"];
            i < t.length;
            i++
        )
            r();
        dw.modal.getModal("stats").addEventListener("share", function () {
            !(function (a) {
                tx.apply(this, arguments);
            })(a);
        });
    })(
        a,
        function (e) {
            var o,
                r = B(a);
            try {
                for (r.s(); !(o = r.n()).done; ) o.value.press(e);
            } catch (a) {
                r.e(a);
            } finally {
                r.f();
            }
        },
        function () {
            ux() ||
            !a.every(function (a) {
                return a.gameOver;
            })
                ? dw.modal.hide()
                : sx(1);
        }
    ),
        (function (a) {
            var e = (function (a) {
                try {
                    var e;
                    return JSON.parse(null !== (e = window.localStorage.getItem(a)) && void 0 !== e ? e : "null");
                } catch (a) {
                    return null;
                }
            })(hc);
            if (e && (Ex(Xf, e.config), Ex(Wf, e.stats), Ex(Kf, e.meta), e.state))
                for (var o = 0; o < e.state.length; ++o) {
                    var r,
                        i = B(Dx);
                    try {
                        for (i.s(); !(r = i.n()).done; ) {
                            var t = r.value;
                            void 0 !== e.state[o][t] && (a[o][t] = e.state[o][t]);
                        }
                    } catch (a) {
                        i.e(a);
                    } finally {
                        i.f();
                    }
                }
        })(a),
        vw(),
        !Kf.highContrastChange && Xf.highContrast && (fw("as cores trocaram!"), (Kf.highContrastChange = 1)),
        0 === Wf.games && a[0].curRow <= 0 && !a[0].gameOver && nx("help"),
        ey() !== a[0].curday &&
            (function (a) {
                for (
                    var e = ey(),
                        o = { 1: Pf, 2: WB, 4: $B }[bc],
                        r = (bc * e) % o.length,
                        i = o.slice(r, r + bc),
                        t = 0;
                    t < a.length;
                    ++t
                ) {
                    var n = a[t];
                    (n.solution = 1 == bc ? o[r] : Pf[i[t]]),
                        (n.normSolution = fh(n.solution)),
                        (n.curday = e),
                        (n.tries = []),
                        (n.invalids = []),
                        (n.curRow = -1),
                        (n.curTry = null),
                        (n.gameOver = 0),
                        (n.won = null);
                }
                (Kf.startTime = +new Date()), (Kf.endTime = 0);
            })(a),
        (function (a, e) {
            for (
                var o = 1,
                    r = 1,
                    i = function (i) {
                        var t = a[i];
                        !(function (a, e) {
                            if (0 != a.tries.length) {
                                a.tries = a.tries.filter(function (a) {
                                    return 5 == a.length;
                                });
                                for (var o = 0; o < a.tries.length; ++o) {
                                    var r = a.tries[o],
                                        i = r.join("");
                                    a.curRow = o;
                                    for (
                                        var t = a.getLetters(),
                                            n = oy(a.normSolution, r),
                                            s = void 0 !== Yf[i] ? Yf[i] : i,
                                            u = a.getRow(),
                                            c = 0;
                                        c < 5;
                                        ++c
                                    )
                                        (t[c].innerText = s[c]), u.letterTo(c, n[c], 0), e(r[c], n[c]);
                                }
                            }
                        })(t, function (o, r) {
                            return e(o, i, r, a, 0);
                        }),
                            t.gameOver || (o = 0),
                            t.won || (r = 0);
                    },
                    t = 0;
                t < bc;
                ++t
            )
                i(t);
            o &&
                (r ||
                    fw(
                        "".concat(yc.palavras, ": ").concat(
                            a
                                .map(function (a) {
                                    return a.solution;
                                })
                                .join(", ")
                        )
                    ),
                gh(1).then(function () {
                    ux() || (dw.header.showBar(), sx(1));
                }));
        })(a, Mx);
    for (var n = 0, s = a; n < s.length; n++) s[n].newLine();
});

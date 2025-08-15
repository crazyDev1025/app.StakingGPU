(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [457],
  {
    9391: function () {},
    6472: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return l;
        },
      });
      var o = n(1773);
      function l() {
        return (0, o.jsxs)("img", {
          width: "50",
          height: "50",
          src: "/DPU_icon.png"
        });
      }
    },
    6318: function (e, t, n) {
      "use strict";
      n.d(t, {
        Z: function () {
          return g;
        },
      });
      var o = n(1773),
        l = n(5789),
        s = n(7591),
        r = n(4723),
        a = n(737),
        i = n(6472),
        c = (e) => {
          let { open: t, onClose: n, children: s } = e,
            r = (0, l.useRef)(null);
          return t
            ? (0, o.jsx)("div", {
                className:
                  "fixed inset-0 z-50 \n flex items-center justify-center bg-black bg-opacity-50  font-sans ".concat(
                    t ? "modal-enter-active" : "modal-exit-active"
                  ),
                onClick: (e) => {
                  r.current && !r.current.contains(e.target) && n();
                },
                children: (0, o.jsxs)("div", {
                  ref: r,
                  className: "bg-[#222223] rounded-xl relative max-w-md w-full",
                  onClick: (e) => e.stopPropagation(),
                  children: [
                    (0, o.jsxs)("div", {
                      className:
                        "bg-[#121214] p-7 h-96 rounded-lg shadow-lg relative max-w-md w-full",
                      children: [
                        (0, o.jsx)("button", {
                          className:
                            "absolute text-xl top-3 right-5 text-gray-300 hover:text-white",
                          onClick: n,
                          children: "\xd7",
                        }),
                        s,
                      ],
                    }),
                    (0, o.jsx)("div", {
                      className: "px-4 py-3",
                      children: (0, o.jsxs)("div", {
                        className:
                          "text-white text-lg gap-2 flex items-center font-[400]",
                        children: [
                          (0, o.jsx)(i.Z, {}),
                          (0, o.jsx)("span", { children: "Protocol" }),
                        ],
                      }),
                    }),
                  ],
                }),
              })
            : null;
        },
        d = n(7386),
        h = {
          src: "/_next/static/media/solana-sol-logo.253cb587.svg",
          height: 312,
          width: 398,
          blurWidth: 0,
          blurHeight: 0,
        };
      let u = [];
      var g = (e) => {
        let { cn: t, open: n, setOpen: i, hide: g } = e,
          [m, p] = (0, l.useState)(!1),
          { select: f, wallets: x, publicKey: w, disconnect: b } = (0, r.O)(),
          j = (0, l.useRef)(null),
          { addToast: v, toasts: C } = (0, d.p)(),
          A = x
            .filter((e) => "Installed" === e.readyState)
            .map((e) => e.adapter.name),
          k = async () => {
            await b(), p(!1);
          },
          V = async (e) => {
            await f(e), i(!1);
          };
        return (
          (0, l.useEffect)(() => {
            let e = (e) => {
              j.current && !j.current.contains(e.target) && p(!1);
            };
            return (
              m
                ? document.addEventListener("mousedown", e)
                : document.removeEventListener("mousedown", e),
              () => {
                document.removeEventListener("mousedown", e);
              }
            );
          }, [m]),
          (0, o.jsxs)("div", {
            className: "flex justify-center items-center",
            children: [
              g
                ? (0, o.jsx)(o.Fragment, {})
                : w
                ? (0, o.jsxs)("div", {
                    className: "relative",
                    children: [
                      (0, o.jsxs)("button", {
                        className:
                          "bg-black border font-sans flex items-center gap-2 border-white/20 text-white h-12 px-2 text-sm rounded",
                        onClick: () => p((e) => !e),
                        children: [
                          (0, o.jsx)(s.default, {
                            src: h,
                            width: 15,
                            height: 15,
                            alt: "solana",
                          }),
                          (0, a.Tg)(w),
                          (0, o.jsx)("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "20",
                            height: "20",
                            viewBox: "0 0 20 20",
                            fill: "none",
                            children: (0, o.jsx)("path", {
                              d: "M5 7.5L10 12.5L15 7.5",
                              stroke: "#CDD5DF",
                              strokeWidth: "1.5",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                            }),
                          }),
                        ],
                      }),
                      m &&
                        (0, o.jsxs)("div", {
                          ref: j,
                          className:
                            "absolute font-sans right-0 md:mt-2 -mt-32 overflow-hidden bg-black border border-gray-200 rounded shadow-lg",
                          children: [
                            (0, o.jsxs)("button", {
                              className:
                                "w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-900",
                              onClick: () => {
                                w &&
                                  (navigator.clipboard.writeText(w.toBase58()),
                                  v(
                                    "Success! Address has been copied.",
                                    3e3,
                                    "Copied ✔"
                                  ));
                              },
                              children: [
                                (0, o.jsx)("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  strokeWidth: "1.5",
                                  stroke: "currentColor",
                                  className: "size-4",
                                  children: (0, o.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75",
                                  }),
                                }),
                                "Address",
                              ],
                            }),
                            (0, o.jsxs)("button", {
                              className:
                                "flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-900",
                              onClick: k,
                              children: [
                                (0, o.jsx)("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  strokeWidth: "1.5",
                                  stroke: "currentColor",
                                  className: "size-4",
                                  children: (0, o.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9",
                                  }),
                                }),
                                "Disconnect",
                              ],
                            }),
                          ],
                        }),
                    ],
                  })
                : (0, o.jsx)("button", {
                    className:
                      "bg-black border --font-proxima font-[600] border-white/20 text-white h-12 px-6 rounded ".concat(
                        t
                      ),
                    onClick: () => i(!0),
                    children: "Connect Wallet",
                  }),
              (0, o.jsxs)(c, {
                open: n,
                onClose: () => i(!1),
                children: [
                  (0, o.jsx)("h2", {
                    className: "text-lg font-sans font-semibold",
                    children: "Connect Wallet",
                  }),
                  (0, o.jsxs)("div", {
                    className: "grid grid-cols-2 gap-4 mt-4",
                    children: [
                      null == x
                        ? void 0
                        : x
                            .filter((e) => "Installed" === e.readyState)
                            .map((e) =>
                              (0, o.jsxs)(
                                "button",
                                {
                                  onClick: () => V(e.adapter.name),
                                  className:
                                    "border p-4 rounded font-sans flex justify-between items-center hover:bg-white/20 transition",
                                  children: [
                                    (0, o.jsx)("span", {
                                      children: e.adapter.name,
                                    }),
                                    // (0, o.jsx)(s.default, {
                                    //   src: e.adapter.icon,
                                    //   alt: e.adapter.name,
                                    //   width: 24,
                                    //   height: 24,
                                    // }),
                                  ],
                                },
                                e.adapter.name
                              )
                            ),
                      null == u
                        ? void 0
                        : u
                            .filter((e) => !A.includes(e.name))
                            .map((e) =>
                              (0, o.jsxs)(
                                "button",
                                {
                                  onClick: () => window.open(e.url, "_blank"),
                                  className:
                                    "border p-4 rounded flex font-sans justify-between items-center hover:bg-white/20 transition",
                                  children: [
                                    (0, o.jsx)("span", { children: e.name }),
                                    (0, o.jsx)(s.default, {
                                      src: null == e ? void 0 : e.logo,
                                      alt: e.name,
                                      width: 24,
                                      height: 24,
                                    }),
                                  ],
                                },
                                e.name
                              )
                            ),
                    ],
                  }),
                ],
              }),
              (0, o.jsx)(d.I, { toasts: C }),
            ],
          })
        );
      };
    },
    7386: function (e, t, n) {
      "use strict";
      n.d(t, {
        I: function () {
          return r;
        },
        p: function () {
          return l;
        },
      });
      var o = n(5789);
      let l = () => {
        let [e, t] = (0, o.useState)([]);
        return {
          addToast: (0, o.useCallback)(function (e) {
            let n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 3e3,
              o = arguments.length > 2 ? arguments[2] : void 0,
              l = arguments.length > 3 ? arguments[3] : void 0,
              s = Math.random();
            t((t) => [
              ...t,
              {
                id: s,
                message: e,
                duration: n,
                title: o,
                mode: l || "success",
              },
            ]),
              setTimeout(() => {
                t((e) => e.filter((e) => e.id !== s));
              }, n);
          }, []),
          toasts: e,
        };
      };
      var s = n(1773);
      let r = (e) => {
        let { toasts: t } = e;
        return (0, s.jsx)("div", {
          className: "fixed bottom-4 right-4 space-y-2 z-50",
          children: t.map((e) =>
            (0, s.jsxs)(
              "div",
              {
                className:
                  "relative px-4 py-2 font-mono bg-gray-800 text-white rounded-lg shadow-lg transition-opacity duration-300 ease-in-out flex flex-col gap-2",
                children: [
                  (0, s.jsx)("span", {
                    className: "font-mono text-white ",
                    children: null == e ? void 0 : e.title,
                  }),
                  (0, s.jsx)("p", {
                    className: "text-sm text-gray-300 whitespace-pre-wrap",
                    children: e.message,
                  }),
                  (0, s.jsx)("div", {
                    className: "absolute bottom-0 left-0 h-1 bg-green-300",
                    style: {
                      animation: "progressBar ".concat(
                        e.duration,
                        "ms linear forwards"
                      ),
                      backgroundColor:
                        "error" === e.mode ? "red" : "rgb(134 239 172 / 1)",
                    },
                  }),
                ],
              },
              e.id
            )
          ),
        });
      };
    },
    1347: function (e, t, n) {
      "use strict";
      n.d(t, {
        jT: function () {
          return l;
        },
        mT: function () {
          return s;
        },
        vc: function () {
          return o;
        },
      });
      let o = {
          SOLANA_RPC: "https://eth.llamarpc.com",
          mode: "mainnet",
        },
        l = "https://docs.deepgpuai.org",
        s = "/#";
    },
    737: function (e, t, n) {
      "use strict";
      n.d(t, {
        ER: function () {
          return s;
        },
        Li: function () {
          return r;
        },
        Tg: function () {
          return o;
        },
        uf: function () {
          return a;
        },
        yt: function () {
          return l;
        },
      });
      let o = function (e) {
          var t;
          let n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 4,
            o =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 4;
          if (!e) return "";
          let l = null == e ? void 0 : e.toBase58().slice(0, n),
            s =
              null == e
                ? void 0
                : null === (t = e.toBase58()) || void 0 === t
                ? void 0
                : t.slice(-o);
          return "".concat(l, "...").concat(s);
        },
        l = function (e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6;
          if (isNaN(Number(e))) throw Error("Invalid number provided");
          let [n, o] = e.toString().split(".");
          return !o || o.length <= t
            ? e.toString()
            : "".concat(n, ".").concat(o.slice(0, t));
        },
        s = (e) => {
          if (!e || !e[e.length - 1].match(/[0-9.]/)) return !1;
          let [t, n] = e.split(".");
          return t || n
            ? t
              ? n
                ? "".concat(t, ".").concat(n.slice(0, 6))
                : t && !n && 1 === e.split(".").length
                ? Number(t).toString()
                : e
              : "0.".concat(n.slice(0, 6))
            : "0.";
        },
        r = (e) => {
          try {
            e = e.replace(/^0+(?!$)/, "");
            let t = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/.test(e),
              n = (e.match(/\./g) || []).length;
            if (!t && n <= 1) return !0;
            return !1;
          } catch (e) {
            return console.log("err in inputFieldValidator", e), !1;
          }
        },
        a = (e) => {
          let [t, n] = e.toString().split("."),
            o = t.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return n ? "".concat(o, ".").concat(n.slice(0, 6)) : o;
        };
    },
  },
]);

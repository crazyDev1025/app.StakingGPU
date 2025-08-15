"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [673],
  {
    8673: function (e, s, t) {
      t.r(s),
        t.d(s, {
          default: function () {
            return x;
          },
        });
      var n = t(1773),
        i = t(4723),
        a = t(5789),
        o = t(3040),
        r = t(4520),
        l = t(4482),
        c = t(1347),
        p = t(9457);
      function x() {
        let [e, s] = (0, a.useState)({}),
          { publicKey: t } = (0, i.O)(),
          x = new l.Connection(c.vc.SOLANA_RPC, "processed");
        return (
          (0, a.useEffect)(() => {
            (async () => {
              if (t)
                try {
                  let e = new o.$r(r, { connection: x }),
                    n = await (0, p.ne)(t, e, 5);
                  if (n) {
                    let e = n.reduce(
                      (e, s) => ((e[s.tierId] = s.nftCount), e),
                      {}
                    );
                    s(e);
                  } else console.error("Failed to fetch user tiers");
                } catch (e) {
                  console.error("Error fetching user tiers:", e);
                }
            })();
          }, [t]),
          (0, n.jsxs)(n.Fragment, {
            children: [
              (0, n.jsx)("h2", {
                className: "text-2xl text-center --font-proxima font-[600]",
                children: "My GPU NFTS",
              }),
              [
                {
                  tierNo: 1,
                  ownedNFTs: 0,
                  price: "15,000 ",
                  pays: "5,000",
                  poster: "/imgs/gold.webp",
                  animation: "/videos/safari-gold.mp4",
                },
                {
                  tierNo: 2,
                  ownedNFTs: 0,
                  price: "35,000",
                  pays: "10,000",
                  poster: "/imgs/red.webp",
                  animation: "/videos/RED-output.mp4",
                },
                {
                  tierNo: 3,
                  ownedNFTs: 0,
                  price: "60,000",
                  pays: " 20,000",
                  poster: "/imgs/green.webp",
                  animation: "/videos/GREEN-output.mp4",
                },
                {
                  tierNo: 4,
                  ownedNFTs: 0,
                  price: "100,000",
                  pays: "50,000",
                  poster: "/imgs/purple.webp",
                  animation: "/videos/PURPLE-output.mp4",
                },
                {
                  tierNo: 5,
                  ownedNFTs: 0,
                  price: "250,000",
                  pays: "100,000",
                  poster: "/imgs/holo.webp",
                  animation: "/videos/HOLO-output.mp4",
                },
              ].map((s, t) =>
                (0, n.jsx)(
                  "div",
                  {
                    className: "relative min-w-full w-full clip-shape-gpu",
                    children: (0, n.jsxs)("div", {
                      className: " flex items-start p-5 --item-no-bg",
                      children: [
                        (0, n.jsxs)("span", {
                          className: "font-mono font-[700] text-xs text-white",
                          children: ["Tier ", s.tierNo],
                        }),
                        (0, n.jsx)("div", {
                          className:
                            "md:w-[140px] md:h-[140px] relative w-[110px] my-auto h-[110px] mix-blend-screen object-cover",
                          children: (0, n.jsx)("video", {
                            src: s.animation,
                            poster: s.poster,
                            className:
                              "w-[120%] h-[120%] absolute top-1/2 -translate-y-1/2  mix-blend-screen object-cover",
                            autoPlay: !0,
                            muted: !0,
                            playsInline: !0,
                            loop: !0,
                          }),
                        }),
                        (0, n.jsxs)("div", {
                          className: "flex flex-col my-auto gap-3",
                          children: [
                            (0, n.jsxs)("div", {
                              className: "flex flex-col",
                              children: [
                                (0, n.jsx)("span", {
                                  className:
                                    "text-xs text-white/50 font-[400] font-sans",
                                  children: "Price:",
                                }),
                                (0, n.jsxs)("span", {
                                  className:
                                    "text-sm text-white font-[700] font-sans",
                                  children: [
                                    null == s ? void 0 : s.price,
                                    " Points",
                                  ],
                                }),
                              ],
                            }),
                            (0, n.jsxs)("div", {
                              className: "flex flex-col",
                              children: [
                                (0, n.jsx)("span", {
                                  className:
                                    "text-xs text-white/50 font-[400] font-sans",
                                  children: "Mines:",
                                }),
                                (0, n.jsxs)("span", {
                                  className:
                                    "text-sm text-white font-[700] font-sans",
                                  children: [
                                    null == s ? void 0 : s.pays,
                                    " DPU",
                                    " ",
                                    (0, n.jsx)("span", {
                                      className: "text-white/50 text-xs",
                                      children: "/year",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, n.jsx)("div", {
                              className: "block",
                              children: (0, n.jsxs)("span", {
                                className:
                                  "text-xs text-white/50 font-[400] font-sans",
                                children: [
                                  "Owned:",
                                  " ",
                                  (0, n.jsx)("span", {
                                    className: "text-white",
                                    children: e[s.tierNo] || 0,
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  },
                  t
                )
              ),
            ],
          })
        );
      }
    },
  },
]);

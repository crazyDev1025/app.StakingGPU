(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    688: function (e, t, n) {
      Promise.resolve().then(n.bind(n, 2721));
    },
    2721: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return el;
          },
        });
      var a = n(1773),
        r = n(4482),
        s = n(5789),
        i = n(6318),
        o = () =>
          (0, a.jsx)("div", {
            className: "flex align-middle justify-center",
            children: (0, a.jsx)("div", {
              className:
                "w-12 h-12 border-4 border-blue-[#222223] border-solid rounded-full border-t-transparent animate-spin",
            }),
          }),
        c = n(6230),
        l = n.n(c);
      function u(e) {
        let { children: t, onClick: n, disabled: r, loading: s } = e;
        return s
          ? (0, a.jsx)(o, {})
          : (0, a.jsxs)("button", {
              className: l().button,
              onClick: n,
              disabled: r,
              children: [
                !r &&
                  (0, a.jsx)("span", {
                    className: l().spanWrapper,
                    children: (0, a.jsxs)("span", {
                      className: l().container,
                      children: [
                        (0, a.jsx)("span", { className: l().primary }),
                        (0, a.jsx)("span", { className: l().complimentary }),
                      ],
                    }),
                  }),
                (0, a.jsx)("p", {
                  className: "".concat(l().text, " --font-proxima"),
                  children: t,
                }),
              ],
            });
      }
      var d = n(737),
        m = n(7386),
        p = n(4723),
        f = n(3040),
        g = n(5336),
        _ = n(4520),
        h = n(9145);
      let y = new h.Z(31536e3),
        k = new h.Z(1e4);
      function x(e, t, n, a) {
        if (t.eq(0)) return new h.Z(0);
        let r = new h.Z(a),
          s = new h.Z(e.stake_amount.toString()),
          i = (Date.now() / 1e3 - Number(e.stake_start_time)) / 86400,
          o = new h.Z(e.get_multiplier(n, i));
        return r.div(k).mul(s).div(y).mul(t).mul(o);
      }
      async function w(e, t) {
        let n = e.publicKey,
          a = await z(e, t),
          r = new f.$r(_, a),
          s = await T(r),
          i = await E(r, n),
          o = await K(r);
        if (null == s) throw Error("config acc not initialized yet");
        if (null == i) throw Error("user has not staked yet");
        if (null == o) throw Error("multipliers not initialized yet");
        return await (function (e, t, n) {
          if (
            null ==
            C(n, (Date.now() / 1e3 - Number(e.stake_start_time)) / 86400)
          )
            throw Error("InvalidMultiplierAcc");
          return (
            t.apy_changes.length > 1 &&
              (function (e, t, n) {
                let a = t.apy_changes.filter((t) =>
                    t.apr_change_timestamp.gte(e.last_synced)
                  ),
                  r = new h.Z(0),
                  s = new h.Z(e.last_synced.toString()),
                  i = e.current_apr;
                for (let t of a) {
                  let a = x(
                    e,
                    new h.Z(t.apr_change_timestamp.toString()).sub(s),
                    n,
                    i
                  );
                  (r = r.add(a)),
                    (s = new h.Z(t.apr_change_timestamp.toString())),
                    (i = t.new_apr);
                }
                (e.total_points = e.total_points.add(
                  new f.BN(r.floor().toString())
                )),
                  (e.last_synced = new f.BN(s.floor().toString()));
              })(e, t, n),
            (function (e, t, n) {
              let a = new h.Z(t || Math.floor(Date.now() / 1e3)),
                r = a.sub(new h.Z(e.last_synced.toString())),
                s = new f.BN(x(e, r, n, e.current_apr).floor().toString());
              (e.total_points = Number(e.total_points) + Number(s)),
                (e.last_synced = new f.BN(a.floor().toString()));
            })(e, t.end_date, n),
            V(e.total_points)
          );
        })(i, s, o);
      }
      async function b(e, t) {
        let n = e.publicKey,
          a = await z(e, t),
          r = new f.$r(_, a),
          s = await E(r, n);
        return null != s && s;
      }
      async function v(e, t) {
        let n = await z(e, t),
          a = new f.$r(_, n),
          r = await K(a);
        return null != r && r;
      }
      var A = n(9417).Buffer;
      function C(e, t) {
        let n = e.multiplier_records
          .filter((e) => t >= e.minRewardAge)
          .map((e) => e.multiplier);
        return n.length > 0 ? Math.max(...n) : 1;
      }
      let j = new r.PublicKey("HTAXC4T8i9w95yLUxn6LfsiXGeZabMU6Lxc19mcr5FCL");
      new r.PublicKey("HTAXC4T8i9w95yLUxn6LfsiXGeZabMU6Lxc19mcr5FCL");
      let N = r.PublicKey.findProgramAddressSync(
        [A.from(f.P6.bytes.utf8.encode("dojo_stake_config"))],
        j
      )[0];
      r.PublicKey.findProgramAddressSync(
        [A.from(f.P6.bytes.utf8.encode("staking_stats"))],
        j
      )[0],
        new r.PublicKey("HDACD5tVQgV2hQx738wKdNb4pZsSX9RAEW6iQW7DPoFL");
      let S = new r.PublicKey("CHi8AwgykA3BMJ3GUsGZ1t3pHwy54ZDaNn4X8ZvS6yux"),
        P = () =>
          r.PublicKey.findProgramAddressSync(
            [A.from(f.P6.bytes.utf8.encode("multiplier_acc"))],
            j
          )[0];
      async function T(e) {
        let t = await e.account.stakingConfiguration.fetchNullable(N);
        return null == t
          ? null
          : {
              end_date: t.endDate,
              apy_changes: t.apyChanges.map((e) => ({
                apr_change_timestamp: e.aprChangeTimestamp,
                new_apr: e.newApr,
              })),
            };
      }
      async function E(e, t) {
        let n = await e.account.userStakeInfo.fetchNullable(
          r.PublicKey.findProgramAddressSync(
            [A.from(f.P6.bytes.utf8.encode("user_stake")), t.toBuffer()],
            j
          )[0]
        );
        return null == n
          ? null
          : {
              stake_start_time: n.stakingStartTimestamp,
              stake_amount: n.stakeAmount,
              last_synced: n.lastSynced,
              current_apr: n.currentApr,
              total_points: n.totalPoints,
              get_multiplier: C,
            };
      }
      async function K(e) {
        let t = await e.account.multiplierConfig.fetchNullable(P());
        return null == t
          ? null
          : {
              multiplier_records: t.multiplierRecords.map((e) => ({
                minRewardAge: e.minimumRewardAge,
                multiplier: e.multiplier,
              })),
            };
      }
      let D = async (e, t) => {
        try {
          let n = "40%";
          if (null == e ? void 0 : e.publicKey) {
            let a = await b(e, t),
              r = await v(e, t);
            if (a && r) {
              let e = (Date.now() / 1e3 - Number(a.stake_start_time)) / 86400,
                t = C(r, e);
              1 === t
                ? (n = "40%")
                : 2 === t
                ? (n = "80%")
                : 3 === t && (n = "120%");
            } else {
              n = "40%";
              return;
            }
          }
          return n;
        } catch (e) {
          console.log("err", e);
        }
      };
      var B = n(9457),
        R = n(1347),
        L = n(9417).Buffer;
      function O(e) {
        if (e < 0 || e > 4294967295)
          throw RangeError("The number is out of range for a u32");
        let t = new Uint8Array(4);
        return (
          (t[0] = 255 & e),
          (t[1] = (e >> 8) & 255),
          (t[2] = (e >> 16) & 255),
          (t[3] = (e >> 24) & 255),
          t
        );
      }
      let M = new r.PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"),
        U = new r.PublicKey("11111111111111111111111111111111"),
        I = async (e) => {
          try {
            let t = await z(e),
              n = e.publicKey,
              a = new f.$r(_, t),
              s = r.PublicKey.findProgramAddressSync(
                [L.from(f.P6.bytes.utf8.encode("user_stake")), n.toBuffer()],
                j
              )[0];
            return (
              console.log("USER_STAKE_ACCOUNT", s),
              await a.account.userStakeInfo.fetch(s)
            );
          } catch (e) {
            console.log("error in fetching ", e);
          }
        },
        Z = async (e) => {
          try {
            let t = new r.PublicKey(
                "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
              ),
              n = new r.PublicKey(
                "3vmfEaTR9M2Pp5JcFNC8c8u6U4eFUBdq6FQjgPpcnfKS"
              ),
              a = r.PublicKey.findProgramAddressSync(
                [e.toBuffer(), g.H_.toBuffer(), n.toBuffer()],
                t
              )[0];
            return console.log("associatedTokenAddress", a.toBase58()), a;
          } catch (e) {
            return (
              console.log("error in getUserTokenAccount ", e),
              new r.PublicKey("")
            );
          }
        },
        H = (e) => new f.BN(1e9 * Number(e)),
        V = (e) => e / 1e9,
        F = async (e, t, n) => {
          try {
            console.log("stake working");
            let a = e.publicKey,
              s = await z(e),
              i = await Z(a),
              o = H(n),
              c = new f.$r(_, s),
              l = c.programId,
              [u] = r.PublicKey.findProgramAddressSync(
                [L.from("dojo_stake_vault")],
                l
              ),
              d = await c.methods
                .stake(o, a)
                .accounts({
                  payer: a,
                  userDojoTokenAcc: i,
                  tokenProgram: g.H_,
                  dojoProgramVaultAcc: u,
                })
                .instruction(),
              m = new f.rV.Transaction();
            m.add(d),
              (m.feePayer = a),
              (m.recentBlockhash = (await t.getLatestBlockhash()).blockhash);
            let p = await e.sendTransaction(m, t);
            return console.log("sign is ", p), console.log("stake success"), p;
          } catch (e) {
            return "403";
          }
        },
        W = async (e, t, n) => {
          try {
            if (!t) return console.error("connection error", t), "error";
            if (!e || !e.publicKey)
              return console.error("Wallet not connected"), "error";
            let a = e.publicKey,
              s = await z(e);
            if (!s)
              return console.error("Provider is not initialized"), "error";
            let i = await Z(a),
              o = H(n),
              c = new f.$r(_, s),
              l = c.programId,
              [u] = r.PublicKey.findProgramAddressSync(
                [L.from("dojo_stake_vault")],
                l
              ),
              d = [L.from("multiplier_acc")],
              m = r.PublicKey.findProgramAddressSync(d, j)[0],
              p = await c.methods
                .increaseStakeOrLockin(o)
                .accounts({
                  tokenProgram: g.H_,
                  userAuthoritySigner: a,
                  userDojoTokenAcc: i,
                  dojoProgramVaultAcc: u,
                  multiplierAcc: m,
                })
                .instruction(),
              h = new f.rV.Transaction();
            return (
              h.add(p),
              (h.feePayer = a),
              (h.recentBlockhash = (await t.getLatestBlockhash()).blockhash),
              await e.sendTransaction(h, t)
            );
          } catch (e) {
            return console.log("in catch", e), "403";
          }
        },
        Y = async (e, t) => {
          try {
            let n = await z(e),
              a = e.publicKey,
              s = n.wallet.publicKey,
              i = new f.$r(_, n),
              o = [L.from("dojo_stake_config")],
              c = [L.from("user_stake"), L.from(s.toBuffer())],
              l = [L.from("multiplier_acc")],
              u = [L.from("nft_tier"), L.from([t])],
              d = [L.from("staking_stats")],
              m = [
                L.from("nft_tier_indexer"),
                L.from(n.wallet.publicKey.toBuffer()),
                L.from([t]),
              ],
              p = r.PublicKey.findProgramAddressSync(o, j)[0],
              g = r.PublicKey.findProgramAddressSync(c, j)[0],
              h = r.PublicKey.findProgramAddressSync(d, j)[0],
              y = r.PublicKey.findProgramAddressSync(l, j)[0];
            console.log("test MULTIPLIER_ACCOUNT", y.toBase58());
            let k = r.PublicKey.findProgramAddressSync(u, j)[0],
              x = r.PublicKey.findProgramAddressSync(m, j)[0],
              w = [L.from("nft_collection"), L.from([t])],
              b = (await (0, B.ne)(n.wallet.publicKey, i)).find(
                (e) => e.tierId === t
              ),
              v = b ? b.nftCount : 0,
              A = [
                L.from("user_nft_timestamp_tracker"),
                L.from(n.wallet.publicKey.toBuffer()),
                L.from([t]),
                O(Math.floor(v / 25)),
              ],
              C = [
                L.from("nft_asset"),
                L.from(n.wallet.publicKey.toBuffer()),
                L.from([t]),
                O(v + 1),
              ],
              N = r.PublicKey.findProgramAddressSync(A, j)[0],
              P = r.PublicKey.findProgramAddressSync(C, j)[0],
              T = r.PublicKey.findProgramAddressSync(w, j)[0],
              E = await i.methods
                .redeemNft(new f.BN(t))
                .accountsStrict({
                  payer: a,
                  stakingConfigAccount: p,
                  userStakeAccount: g,
                  userAuthoritySigner: a,
                  dojoAuthorityAcc: S,
                  stakingStatsAccount: h,
                  multiplierAcc: y,
                  nftTierAccount: k,
                  userNftTierTracker: x,
                  userNftTimestampTracker: N,
                  asset: P,
                  collection: T,
                  systemProgram: U,
                  logWrapper: null,
                  mplCore: M,
                })
                .instruction(),
              K = new f.rV.Transaction();
            return (
              K.add(E),
              (K.feePayer = a),
              (K.recentBlockhash = (
                await n.connection.getLatestBlockhash()
              ).blockhash),
              await e.sendTransaction(K, n.connection)
            );
          } catch (e) {
            return "403";
          }
        },
        G = async (e, t, n) => {
          try {
            let a = e.publicKey,
              s = await z(e),
              i = new f.$r(_, s),
              o = new r.PublicKey(
                "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
              ),
              c = new r.PublicKey(
                "3vmfEaTR9M2Pp5JcFNC8c8u6U4eFUBdq6FQjgPpcnfKS"
              ),
              l = r.PublicKey.findProgramAddressSync(
                [a.toBuffer(), g.H_.toBuffer(), c.toBuffer()],
                o
              )[0],
              u = i.programId,
              [d] = r.PublicKey.findProgramAddressSync(
                [L.from("dojo_stake_vault")],
                u
              ),
              m = H(n),
              p = [L.from("multiplier_acc")],
              h = r.PublicKey.findProgramAddressSync(p, j)[0],
              y = await i.methods
                .unstake(new f.BN(m))
                .accounts({
                  userDojoTokenAcc: l,
                  dojoProgramVaultAcc: d,
                  tokenProgram: g.H_,
                  userAuthoritySigner: a,
                  multiplierAcc: h,
                  dojoAuthorityAcc: S,
                })
                .instruction(),
              k = new f.rV.Transaction();
            return (
              k.add(y),
              (k.feePayer = a),
              (k.recentBlockhash = (await t.getLatestBlockhash()).blockhash),
              await e.sendTransaction(k, t)
            );
          } catch (e) {
            return "403";
          }
        },
        X = (e) => ({
          publicKey: e,
          signTransaction: async (e) => e,
          signAllTransactions: async (e) => e,
        }),
        $ = async (e) => {
          try {
            return await w(e);
          } catch (e) {
            return console.log("err :", e), "0";
          }
        };
      async function z(e) {
        let t = "processed",
          n = new r.Connection(R.vc.SOLANA_RPC, t);
        return new f.Y7(n, e, { commitment: t });
      }
      let q = () => {
        let [e, t] = (0, s.useState)(!1),
          [n, a] = (0, s.useState)(null);
        return {
          isOpen: e,
          transactionHash: n,
          openPopup: (0, s.useCallback)((e) => {
            a(e), t(!0);
          }, []),
          closePopup: (0, s.useCallback)(() => {
            t(!1), a(null);
          }, []),
        };
      };
      var J = (e) => {
        let { isOpen: t, transactionHash: n, onClose: r } = e;
        if (!t || !n) return null;
        let s = "devnet" === R.vc.mode ? "devnet" : "mainnet",
          i = "https://explorer.solana.com/tx/"
            .concat(n, "?cluster=")
            .concat(s);
        return (0, a.jsx)("div", {
          style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1e3,
            opacity: t ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          },
          children: (0, a.jsxs)("div", {
            className: "font-mono",
            style: {
              background: "#1e1e1e",
              color: "#fff",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
              transform: t ? "scale(1)" : "scale(0.9)",
              transition: "transform 0.3s ease-in-out",
              maxWidth: "400px",
              width: "100%",
            },
            children: [
              (0, a.jsx)("h2", {
                style: { marginBottom: "20px", fontSize: "24px" },
                children: "Transaction Successful",
              }),
              (0, a.jsx)("p", {
                children: "View your transaction on BSC Explorer:",
              }),
              (0, a.jsx)("a", {
                href: i,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  display: "inline-block",
                  backgroundColor: "#333",
                  marginTop: "20px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  color: "#fff",
                  textDecoration: "none",
                  marginBottom: "20px",
                  wordBreak: "break-all",
                },
                children: "View Transaction",
              }),
              (0, a.jsx)("br", {}),
              (0, a.jsx)(u, { onClick: r, children: "Close" }),
            ],
          }),
        });
      };
      function Q(e) {
        let { stakeStartTimeStamp: t } = e,
          n = [
            {
              id: 1,
              title: "Tier 1",
              sub: "Mines:",
              text: "5,000 DPU",
              poster: "/imgs/gold.webp",
              video: "/videos/safari-gold.mp4",
              price: 15e3,
            },
            {
              id: 2,
              title: "Tier 2",
              sub: "Mines:",
              text: "10,000 DPU",
              poster: "/imgs/red.webp",
              video: "/videos/RED-output.mp4",
              price: 35e3,
            },
            {
              id: 3,
              title: "Tier 3",
              sub: "Mines:",
              text: "20,000 DPU",
              poster: "/imgs/green.webp",
              video: "/videos/GREEN-output.mp4",
              price: 6e4,
            },
            {
              id: 4,
              title: "Tier 4",
              sub: "Mines:",
              text: "50,000 DPU",
              poster: "/imgs/purple.webp",
              video: "/videos/PURPLE-output.mp4",
              price: 1e5,
            },
            {
              id: 5,
              title: "Tier 5",
              sub: "Mines:",
              text: "100,000 DPU",
              poster: "/imgs/holo.webp",
              video: "/videos/HOLO-output.mp4",
              price: 25e4,
            },
          ],
          [r, o] = (0, s.useState)(!1),
          [c, l] = (0, s.useState)(!1),
          [f, g] = (0, s.useState)(0),
          [_, h] = (0, s.useState)(0),
          [y, k] = (0, s.useState)(!1),
          { addToast: x, toasts: w } = (0, m.p)(),
          { publicKey: b } = (0, p.O)(),
          { isOpen: v, transactionHash: A, openPopup: C, closePopup: j } = q(),
          N = () => {
            g((e) => (e + 1) % n.length);
          };
        (0, s.useEffect)(() => {
          if (!r) {
            let e = setInterval(() => {
              N();
            }, 1e4);
            return () => clearInterval(e);
          }
        }, [f, r]),
          (0, s.useEffect)(() => {
            (async () => {
              try {
                if ((l(!0), console.log(t), b)) {
                  let e = X(b),
                    t = await $(e);
                  t ? h(t) : console.error("Failed to fetch staking reward");
                }
                l(!1);
              } catch (e) {
                console.error("Error fetching staking reward: ", e), l(!1);
              }
            })();
          }, [b]);
        let S = async () => {
          try {
            if (!b) {
              k(!0);
              return;
            }
            console.log("click 1"), o(!0);
            let e = X(b);
            await Y(e, f + 1).then((e) => {
              "403" != e && C(e);
            }),
              o(!1);
          } catch (e) {
            console.error("Error claiming NFT: ", e),
              x("Your Transaction Failed!", 3e3, "☹️ Try again!", "error"),
              o(!1);
          }
        };
        return (0, a.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, a.jsxs)("div", {
              className: "flex items-center gap-2 px-2",
              children: [
                (0, a.jsx)("button", {
                  onClick: () => {
                    g((e) => (0 === e ? n.length - 1 : e - 1));
                  },
                  className: "rounded-full shadow-md focus:outline-none",
                  children: (0, a.jsx)("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "25",
                    viewBox: "0 0 12 25",
                    fill: "none",
                    children: (0, a.jsx)("path", {
                      d: "M11 1L2 12.5L11 24",
                      stroke: "white",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                    }),
                  }),
                }),
                (0, a.jsx)("div", {
                  className: "overflow-hidden space-x-6 w-full",
                  children: (0, a.jsx)("div", {
                    className:
                      "flex transition-transform duration-500 ease-in-out",
                    style: { transform: "translateX(-".concat(100 * f, "%)") },
                    children: n.map((e, t) =>
                      (0, a.jsx)(
                        "div",
                        {
                          className: "relative min-w-full w-full clip-shape",
                          children: (0, a.jsxs)("div", {
                            className:
                              " bg-[#0F1113] flex items-center  p-2 --item",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "md:w-[160px] relative md:h-[160px] w-[100px] h-[100px] mix-blend-screen object-cover",
                                children: (0, a.jsx)("video", {
                                  src: e.video,
                                  poster: e.poster,
                                  className:
                                    "w-[120%] h-[120%] absolute top-1/2 -translate-y-1/2  mix-blend-screen object-cover",
                                  autoPlay: !0,
                                  muted: !0,
                                  playsInline: !0,
                                  loop: !0,
                                }),
                              }),
                              (0, a.jsxs)("div", {
                                className: "flex flex-col  space-y-1",
                                children: [
                                  (0, a.jsx)("span", {
                                    className:
                                      "text-[var(--is-not-active)] font-mono font-[400] text-sm",
                                    children: e.title,
                                  }),
                                  (0, a.jsxs)("p", {
                                    className:
                                      "md:text-sm text-xs font-mono font-[700]",
                                    children: [
                                      " ",
                                      null == e ? void 0 : e.sub,
                                      " ",
                                      (0, a.jsx)("br", {
                                        className: "md:hidden block",
                                      }),
                                      " ",
                                      e.text,
                                      " /",
                                      " ",
                                      (0, a.jsx)("span", {
                                        className:
                                          "font-mono font-[400] text-white/50",
                                        children: "year",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        },
                        t
                      )
                    ),
                  }),
                }),
                (0, a.jsx)("button", {
                  onClick: N,
                  className:
                    "rounded-full relative z-10 shadow-md focus:outline-none",
                  children: (0, a.jsx)("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "12",
                    height: "25",
                    viewBox: "0 0 12 25",
                    fill: "none",
                    children: (0, a.jsx)("path", {
                      d: "M1 1L10 12.5L1 24",
                      stroke: "white",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                    }),
                  }),
                }),
              ],
            }),
            (0, a.jsxs)("div", {
              className: "flex flex-col  items-center",
              children: [
                (0, a.jsxs)("span", {
                  className:
                    "md:text-xl --font-proxima text-lg font-[600] mb-6 leading-[110%]",
                  children: ["Price: ", (0, d.uf)(n[f].price), " Points"],
                }),
                (0, a.jsx)(u, {
                  loading: r,
                  onClick: () => S(),
                  disabled: !!b && Number(_) < n[f].price,
                  children: b ? "Redeem" : "Connect Wallet",
                }),
                (0, a.jsxs)("p", {
                  className:
                    "text-[var(--is-not-active)] font-mono font-[400] mt-3 text-sm",
                  children: [
                    "Your Reward Balance:",
                    " ",
                    (0, a.jsx)("strong", {
                      className: "text-white font-mono font-[700]",
                      children: c
                        ? "Loading..."
                        : b
                        ? 0 === Number(_)
                          ? "0"
                          : (null == _
                              ? void 0
                              : _.toLocaleString("en", {
                                  minimumFractionDigits: 6,
                                })) || "0"
                        : "N/A",
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)(J, { isOpen: v, transactionHash: A, onClose: j }),
            (0, a.jsx)(m.I, { toasts: w }),
            (0, a.jsx)(i.Z, { open: y, setOpen: k, hide: !0 }),
          ],
        });
      }
      function ee() {
        return (0, a.jsxs)("img", {
          width: "30",
          height: "30",
          src: "/DPU_icon.png"
        });
      }
      function et(e) {
        let {
            tokenBalance: t,
            contractLockingPeriod: n,
            stakedAmount: o,
            firstTimeStaked: c,
            refresh: l,
          } = e,
          [g, h] = (0, s.useState)(0),
          [y, k] = (0, s.useState)("0"),
          [x, w] = (0, s.useState)(!1),
          [b, v] = (0, s.useState)(!1),
          { addToast: A, toasts: C } = (0, m.p)(),
          [j, N] = (0, s.useState)(n || "30"),
          { publicKey: S } = (0, p.O)(),
          P = (0, p.O)(),
          { isOpen: T, transactionHash: E, openPopup: K, closePopup: D } = q();
        (0, s.useEffect)(() => {
          S
            ? ((async () => {
                try {
                  let e = new f.$r(_, { connection: B }),
                    t = await e.account.stakingConfiguration.all(),
                    n = V(Number(t[0].account.minimumStakeAmount));
                  console.log(n), h(n);
                } catch (e) {
                  console.error("Error fetching stake amount:", e);
                }
              })(),
              l())
            : (k("0"), w(!1));
        }, [S, P]);
        let B = new r.Connection(R.vc.SOLANA_RPC, "processed"),
          L = async () => {
            try {
              if (!S) {
                w(!0);
                return;
              }
              if (!(null == P ? void 0 : P.publicKey) || !B || !y || !j) return;
              v(!0),
                c
                  ? (await F(P, B, y)
                      .then((e) => {
                        "403" != e
                          ? (K(e), l(), v(!1), k("0"))
                          : (A("Your Transaction Failed!", 3e3, "☹️", "error"),
                            v(!1));
                      })
                      .catch(() => {
                        A("Your Transaction Failed!", 3e3, "☹️", "error");
                      })
                      .finally(() => {
                        l();
                      }),
                    k("0"))
                  : (await W(P, B, y)
                      .then((e) => {
                        "403" != e && (K(e), l(), k("0"));
                      })
                      .catch()
                      .finally(() => {
                        l();
                      }),
                    v(!1));
            } catch (e) {
              console.error("stake err", e),
                v(!1),
                A(
                  "Your Transaction failed",
                  3e3,
                  "Stake Transaction Failed ☹️",
                  "error"
                );
            }
          },
          O = o <= g && Number(y) >= g;
        return (0, a.jsxs)("div", {
          className: "md:space-y-9 space-y-8 px-6 flex flex-col",
          children: [
            (0, a.jsx)("div", {
              className: "flex flex-col",
              children: (0, a.jsxs)("div", {
                className:
                  "py-4 px-[22px] bg-[#14171A] flex flex-col w-full relative gap-4",
                children: [
                  (0, a.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, a.jsxs)("span", {
                        className:
                          "text-[var(--is-not-active)] items-center gap-2 flex --font-proxima font-[600] leading-[150%]",
                        children: [
                          "Stake Amount",
                          o <= g &&
                            (0, a.jsxs)("code", {
                              className: "text-xs font-medium text-white",
                              children: ["Min: ", g],
                            }),
                        ],
                      }),
                      (0, a.jsx)(ee, {}),
                    ],
                  }),
                  (0, a.jsx)("input", {
                    type: "text",
                    placeholder: "0",
                    className:
                      "bg-[#14171A] font-mono text-2xl text-white font-[700] border border-none rounded-md p-2 focus:outline-none",
                    value: y,
                    disabled: !S,
                    onChange: (e) => {
                      let t = e.target.value;
                      if (!(0, d.Li)(t)) return;
                      0 == t.length && k("0");
                      let n = (0, d.ER)(t);
                      n && k(n);
                    },
                  }),
                  !o &&
                    o <= g &&
                    !O &&
                    Number(y) > 0 &&
                    (0, a.jsx)("div", {
                      className: "text-red-500 font-sans text-xs mt-2",
                      children: "The minimum stake amount is 1000.",
                    }),
                  (0, a.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, a.jsxs)("span", {
                        className:
                          "text-[var(--is-not-active)] font-mono font-[400] leading-[150%] text-sm",
                        children: [
                          "Balance:",
                          " ",
                          (0, a.jsx)("span", {
                            className: "text-white",
                            children: S
                              ? t.toLocaleString("en") + " DPU"
                              : "N/A",
                          }),
                        ],
                      }),
                      (0, a.jsx)("button", {
                        className:
                          "uppercase text-[#636363] bg-transparent font-mono text-sm font-[400] hover:text-white transition-colors",
                        onClick: () => k((0, d.yt)(t.toString())),
                        children: "max",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, a.jsxs)("div", {
              className:
                "flex flex-col max-w-[360px] mx-auto gap-3 items-center",
              children: [
                (0, a.jsx)("p", {
                  className:
                    "md:text-sm font-mono text-xs text-center font-[400]",
                  children:
                    "Your staking APY increases over time. The base APY is 40%. After which you’ll increase to new tiers:",
                }),
                (0, a.jsxs)("div", {
                  className: "w-full grid grid-cols-2 gap-4",
                  children: [
                    (0, a.jsx)("button", {
                      className:
                        "md:h-12 h-10 w-full --font-proxima text-white md:tracking-[0.32px] tracking-[0.28px] border rounded-lg border-[#313335] font-[600] md:text-base text-sm",
                      onClick: () => N("180"),
                      children: "180D = 80% APY",
                    }),
                    (0, a.jsx)("button", {
                      className:
                        "md:h-12 h-10 w-full --font-proxima text-white md:tracking-[0.32px] tracking-[0.28px] border border-[#313335] font-[600] rounded-lg md:text-base text-sm",
                      onClick: () => N("365"),
                      children: "1Y = 120% APY",
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)(u, {
              loading: b,
              onClick: L,
              disabled:
                !!S &&
                !!(
                  Number(y) > Number(t) ||
                  (c && o <= g && Number(y) > 0 && Number(y) < g) ||
                  1 > Number(y)
                ),
              children: S
                ? Number(y) > Number(t)
                  ? "Insufficient balance"
                  : "Stake"
                : "Connect Wallet",
            }),
            (0, a.jsx)(J, {
              isOpen: T,
              transactionHash: E,
              onClose: () => {
                l(), D();
              },
            }),
            (0, a.jsx)(i.Z, { open: x, setOpen: w, hide: !0 }),
            (0, a.jsx)(m.I, { toasts: C }),
          ],
        });
      }
      function en(e) {
        let { firstTimeStaked: t, stakedAmount: n, updateStakedAmount: o } = e,
          [c, l] = (0, s.useState)(!1),
          [f, g] = (0, s.useState)(0),
          [_, h] = (0, s.useState)(!1),
          { addToast: y, toasts: k } = (0, m.p)(),
          [x, w] = (0, s.useState)(!0),
          [b, v] = (0, s.useState)(null),
          [A, C] = (0, s.useState)("40%"),
          [j, N] = (0, s.useState)(0),
          [S, P] = (0, s.useState)(!1),
          { isOpen: T, transactionHash: E, openPopup: K, closePopup: B } = q(),
          { publicKey: L, connected: O } = (0, p.O)(),
          M = (0, p.O)();
        console.log(t),
          (0, s.useEffect)(() => {
            (async () => {
              if (!O) {
                N(0);
                return;
              }
              try {
                if (L) {
                  P(!0);
                  let t = X(L),
                    n = await I(t);
                  if (n) {
                    var e;
                    let t =
                      null == n
                        ? void 0
                        : null === (e = n.stakingStartTimestamp) || void 0 === e
                        ? void 0
                        : e.toString();
                    if (t) {
                      let e = Date.now() / 1e3;
                      N(Math.floor((e - t) / 86400));
                    } else N(0);
                  } else console.error("Failed to calculate days passed");
                  P(!1);
                }
              } catch (e) {
                console.error("Error calculating days passed: ", e), P(!1);
              }
            })();
          }, [O, M]),
          (0, s.useEffect)(() => {
            L ? h(!1) : g("0");
          }, [L]);
        let U = new r.Connection(R.vc.SOLANA_RPC, "processed");
        (0, s.useEffect)(() => {
          (async () => {
            if (L)
              try {
                let e = X(L),
                  t = await D(e, U);
                t ? C(t) : console.error("Failed to fetch Bonus APY");
              } catch (e) {
                console.error("Error fetching Bonus APY: ", e);
              }
          })();
        }, [L]);
        let Z = async () => {
            try {
              let e = await fetch("/api/connection")
                .then((e) => e.json())
                .then((e) =>
                  Function("return (".concat(e.function, ")"))()(r.Connection)
                );
              if (!L) {
                h(!0);
                return;
              }
              l(!0),
                await G(M, e, f).then((e) => {
                  "403" != e && K(e);
                }),
                o(),
                g("0"),
                l(!1);
            } catch (e) {
              l(!1),
                y("Un Stake Transaction Failed ☹️", 3e3, "Error", "error"),
                g("0");
            }
          },
          H = new Intl.NumberFormat("en-US");
        return (0, a.jsxs)("div", {
          className: "flex flex-col px-6",
          children: [
            (0, a.jsxs)("div", {
              className:
                "py-4 px-[22px] bg-[#14171A] flex flex-col w-full relative gap-4",
              children: [
                (0, a.jsxs)("div", {
                  className: "flex items-center justify-between ",
                  children: [
                    (0, a.jsx)("div", {
                      className:
                        "w-0 h-0 border-l-[0px] border-r-[14px] rotate-[90deg] absolute left-0 top-0 border-b-[14px] border-l-transparent border-r-transparent border-b-black",
                    }),
                    (0, a.jsx)("span", {
                      className:
                        "text-white/50 --font-proxima font-[600] leading-[150%]",
                      children: "Unstake Amount",
                    }),
                    (0, a.jsx)(ee, {}),
                  ],
                }),
                (0, a.jsx)("input", {
                  type: "text",
                  placeholder: "0",
                  className:
                    "bg-[#14171A] text-2xl font-mono text-white font-[700] border border-none rounded-md p-2 focus:outline-none",
                  value: f,
                  disabled: !L,
                  onChange: (e) => {
                    let t = e.target.value;
                    if (!(0, d.Li)(t)) return;
                    0 == t.length && g("0");
                    let a = (0, d.ER)(t);
                    a &&
                      (g(a),
                      Number(a) > Number(n)
                        ? (w(!0), v(null))
                        : Number(n) === Number(a)
                        ? (w(!0), v(null))
                        : Number(n) - Number(a) >= 1e3
                        ? (w(!0), v(null))
                        : (w(!1),
                          y(
                            "You must leave at least 1,000 DPU staked.\nAdjust the amount to unstake or perform Max unstake.",
                            3e3,
                            "Error",
                            "error"
                          )));
                  },
                }),
                (0, a.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, a.jsxs)("span", {
                      className:
                        "text-white/50 font-mono font-[400] leading-[150%] text-sm",
                      children: [
                        "Staked:",
                        " ",
                        (0, a.jsx)("span", {
                          className: "text-[#EBEBDE]",
                          children: L
                            ? H.format(Number((0, d.yt)(n.toString(), 2))) +
                              " DPU"
                            : "N/A",
                        }),
                      ],
                    }),
                    (0, a.jsx)("button", {
                      className:
                        "uppercase font-mono text-[#636363] text-sm font-[400] hover:text-white transition-colors",
                      onClick: () => {
                        g((0, d.yt)(n.toString())), w(!0), v(null);
                      },
                      children: "max",
                    }),
                  ],
                }),
                !x &&
                  (0, a.jsx)("div", {
                    className: "text-red-500 font-sans text-xs mt-2",
                    children: b,
                  }),
              ],
            }),
            (0, a.jsxs)("div", {
              className:
                "flex font-mono text-sm justify-between font-[400] items-center mt-8 ",
              children: [
                (0, a.jsx)("span", {
                  className: "  text-white/50  text-center",
                  children: "Total Days Staked",
                }),
                (0, a.jsx)("span", {
                  className: "text-sm",
                  children: S
                    ? "Loading..."
                    : L
                    ? "".concat(j, " Days") || 0
                    : "N/A",
                }),
              ],
            }),
            (0, a.jsxs)("div", {
              className:
                "text-sm text-white/50 font-mono flex justify-between text-center mt-3 mb-8",
              children: [
                (0, a.jsx)("span", {
                  className: " font-[400]",
                  children: "Current APY:",
                }),
                (0, a.jsx)("span", {
                  className: "font-[400] text-[#EBEBDE]",
                  children: L ? A : "N/A",
                }),
              ],
            }),
            (0, a.jsx)(u, {
              loading: c,
              onClick: Z,
              disabled:
                !!L && !!(!x || 0 == Number(f) || Number(f) > Number(n)),
              children: L
                ? Number(f) > Number(n)
                  ? "Insufficient balance"
                  : "Unstake"
                : "Connect Wallet",
            }),
            (0, a.jsx)(J, {
              isOpen: T,
              transactionHash: E,
              onClose: () => {
                o(), B();
              },
            }),
            (0, a.jsx)(m.I, { toasts: k }),
            (0, a.jsx)(i.Z, { open: _, setOpen: h, hide: !0 }),
          ],
        });
      }
      var ea = (e) => {
          let { activeTab: t } = e,
            [n, i] = (0, s.useState)(0),
            [o, c] = (0, s.useState)(0),
            [l, u] = (0, s.useState)(!0),
            [d, m] = (0, s.useState)("0"),
            [f, g] = (0, s.useState)(null),
            { publicKey: _, connected: h } = (0, p.O)(),
            y = (0, p.O)(),
            k = async function (e) {
              let t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 5,
                n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 1e3;
              try {
                return await e();
              } catch (a) {
                if (a.message.includes("429") && t > 0)
                  return (
                    console.log(
                      "Rate limit hit, retrying in ".concat(n, "ms...")
                    ),
                    await new Promise((e) => setTimeout(e, n)),
                    k(e, t - 1, 2 * n)
                  );
                throw a;
              }
            },
            x = (0, s.useCallback)(async () => {
              try {
                if (_ && y && h) {
                  let e = await Z(_),
                    t = await w.getTokenAccountBalance(e);
                  i(t.value.uiAmount || 0);
                }
              } catch (e) {
                console.error("Error fetching token balance:", e), i(0);
              }
            }, [h, _, y]);
          (0, s.useEffect)(() => {
            (async () => {
              await x();
            })();
          }, [_, h, n, x]);
          let w = new r.Connection(R.vc.SOLANA_RPC, "processed");
          (0, s.useEffect)(() => {
            (async () => {
              if (!h) {
                c(0), u(!0);
                return;
              }
              try {
                let e = await I(y);
                if (null == e ? void 0 : e.stakeAmount) {
                  let t = (e.stakeAmount / 1e9).toString();
                  c(parseFloat(t)),
                    m(e.stakingStartTimestamp.toString()),
                    u(!1);
                } else u(!0);
              } catch (e) {
                console.error("Error fetching user stake info: ", e);
              }
            })();
          }, [h, y, n]);
          let b = async () => {
            let e = await I(y);
            (null == e ? void 0 : e.stakeAmount) &&
              c(parseFloat((e.stakeAmount / 1e9).toString()));
          };
          return (0, a.jsxs)("div", {
            className: "pb-4",
            children: [
              "stake" === t &&
                (0, a.jsx)(et, {
                  tokenBalance: n,
                  stakedAmount: o,
                  contractLockingPeriod: f,
                  firstTimeStaked: l,
                  refresh: () => {
                    x(), b();
                  },
                }),
              "reward" === t && (0, a.jsx)(Q, { stakeStartTimeStamp: d }),
              "unstake" === t &&
                (0, a.jsx)(en, {
                  firstTimeStaked: l,
                  stakedAmount: o,
                  updateStakedAmount: b,
                }),
            ],
          });
        },
        er = (e) => {
          let { activeTab: t, onTabClick: n } = e;
          return (0, a.jsxs)("div", {
            className: "relative w-full",
            children: [
              (0, a.jsxs)("div", {
                className:
                  "flex font-mono space-x-4 w-full items-center justify-between border-b border-[var(--is-not-active)]",
                children: [
                  (0, a.jsx)("button", {
                    className:
                      "relative  py-2 px-4 font-[400] h-12 text-center w-full text-white focus:outline-none ".concat(
                        "stake" === t ? "" : "text-[var(--is-not-active)]"
                      ),
                    onClick: () => n("stake"),
                    children: "Stake",
                  }),
                  (0, a.jsx)("button", {
                    className:
                      "relative py-2 px-4 font-[400] h-12 text-center w-full text-white focus:outline-none ".concat(
                        "reward" === t ? "" : "text-[var(--is-not-active)]"
                      ),
                    onClick: () => n("reward"),
                    children: "Reward",
                  }),
                  (0, a.jsx)("button", {
                    className:
                      "relative py-2 px-4 font-[400] h-12 text-center w-full text-white focus:outline-none ".concat(
                        "unstake" === t ? "" : "text-[var(--is-not-active)]"
                      ),
                    onClick: () => n("unstake"),
                    children: "Unstake",
                  }),
                ],
              }),
              (0, a.jsx)("div", {
                className:
                  "absolute bottom-0 left-0 w-1/3 h-[2px] bg-white transition-transform duration-300 ease-in-out "
                    .concat("stake" === t ? "translate-x-0" : "", " ")
                    .concat("reward" === t ? "translate-x-full" : "", " ")
                    .concat("unstake" === t ? "translate-x-[200%]" : ""),
              }),
            ],
          });
        },
        es = () => {
          let [e, t] = (0, s.useState)("0"),
            { publicKey: n } = (0, p.O)(),
            i = new r.Connection(R.vc.SOLANA_RPC, "processed"),
            o = async () => {
              if (!n) {
                t("0");
                return;
              }
              try {
                let e = await (0, B.y0)(i, n);
                if ((console.log("gpu tiersRewards", e), e)) {
                  let n = Object.values(e).reduce((e, t) => e + t, 0);
                  t(V(n).toString());
                } else throw Error("Failed to fetch reward");
              } catch (e) {
                console.error("Error fetching rewards:", e), t("0");
              }
            };
          return (
            (0, s.useEffect)(() => {
              o();
            }, [n]),
            (0, s.useEffect)(() => {
              (async () => {
                if (n) {
                  console.log("fetch running");
                  try {
                    let e = new f.$r(_, { connection: i }),
                      t = await (0, B.ne)(n, e, 5);
                    console.log("userTiers", t),
                      Object.entries(t).forEach((e) => {
                        let [t, n] = e;
                        console.log("key", t), console.log("value", n);
                      });
                  } catch (e) {
                    console.error("Error fetching user tiers:", e);
                  }
                }
              })();
            }, [n]),
            (0, a.jsxs)("div", {
              children: [
                (0, a.jsxs)("div", {
                  className: "flex flex-col w-full text-center gap-2",
                  children: [
                    (0, a.jsx)("h2", {
                      className:
                        "text-2xl font-[600] --font-proxima leading-[110%]",
                      children: "Claim your $DPU",
                    }),
                    (0, a.jsx)("span", {
                      className:
                        "text-[var(--is-not-active)] font-sans text-sm font-[400]",
                      children: "Your Reward Balance:",
                    }),
                    (0, a.jsx)("h3", {
                      className: "text-xl font-[400] font-mono text-[#EBEBDE]",
                      children: n
                        ? (0, d.uf)(e.toLocaleString("en")) + " $DPU"
                        : "N/A",
                    }),
                  ],
                }),
                (0, a.jsx)("div", {
                  className:
                    "bg-black p-6 rounded mt-6 flex flex-col space-y-6 border border-[var(--border)]",
                  children: (0, a.jsx)(u, {
                    disabled: !0,
                    children: " Claim Coming Soon",
                  }),
                }),
              ],
            })
          );
        };
      let ei = (0, n(7898).default)(() => n.e(673).then(n.bind(n, 8673)), {
          loadableGenerated: { webpack: () => [8673] },
        }),
        eo = { activeTab: "stake", activeCategory: "staking" },
        ec = (e, t) => {
          switch (t.type) {
            case "SET_TAB":
              return { ...e, activeTab: t.payload };
            case "SET_CATEGORY":
              return { ...e, activeCategory: t.payload };
            default:
              return e;
          }
        };
      function el() {
        let [e, t] = (0, s.useReducer)(ec, eo),
          n = (0, s.useCallback)((e) => {
            t({ type: "SET_TAB", payload: e });
          }, []),
          r = (0, s.useCallback)((e) => {
            t({ type: "SET_CATEGORY", payload: e });
          }, []);
        return (
          (0, s.useEffect)(() => {
            document.body.addEventListener("pointermove", (e) => {
              let { x: t, y: n } = e;
              document.documentElement.style.setProperty("--x", t),
                document.documentElement.style.setProperty("--y", n);
            });
          }, []),
          (0, a.jsxs)("div", {
            className:
              "w-full min-h-screen-[calc(100vh-48px)] 2xl:py-0 xl:py-20 mt-10 flex flex-col gap-5",
            children: [
              (0, a.jsxs)("div", {
                className:
                  "bg-[var(--stake-box)] card md:w-[500px] w-full max-w-[94.5%] relative mx-auto p-6 rounded-lg flex flex-col gap-7 z-20",
                children: [
                  (0, a.jsxs)("div", {
                    className:
                      "grid grid-cols-2 gap-2 w-full bg-black h-[60px] items-center p-1 rounded",
                    children: [
                      (0, a.jsx)("button", {
                        onClick: () => r("staking"),
                        className:
                          "w-full h-full rounded --font-proxima text-lg  ".concat(
                            "staking" === e.activeCategory
                              ? "bg-[var(--stake-box)] font-[600] text-white border border-[var(--border)]"
                              : "text-[var(--is-not-active)] font-[400]"
                          ),
                        children: "Staking",
                      }),
                      (0, a.jsx)("button", {
                        onClick: () => r("GPU"),
                        className:
                          "w-full h-full --font-proxima rounded text-lg  ".concat(
                            "GPU" === e.activeCategory
                              ? "bg-[var(--stake-box)] text-white font-[600] border border-[var(--border)]"
                              : "text-[var(--is-not-active)] font-[400]"
                          ),
                        children: "Deep GPU AI",
                      }),
                    ],
                  }),
                  "staking" === e.activeCategory &&
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsxs)("div", {
                          className: "flex flex-col w-full text-center gap-2",
                          children: [
                            (0, a.jsxs)("h2", {
                              className:
                                "text-2xl font-[600] --font-proxima leading-[110%]",
                              children: [
                                "stake" === e.activeTab && "Stake DPU",
                                "reward" === e.activeTab && "DPU Rewards",
                                "unstake" === e.activeTab && "Unstake DPU",
                              ],
                            }),
                            (0, a.jsxs)("span", {
                              className:
                                "text-[var(--is-not-active)] font-sans text-sm font-[400]",
                              children: [
                                "stake" === e.activeTab &&
                                  "Select how much DPU you want to stake",
                                "reward" === e.activeTab &&
                                  "Redeem your points for Deep GPUs",
                                "unstake" === e.activeTab &&
                                  "Select how much DPU you want to unstake",
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)("div", {
                          className:
                            "bg-black py-3 rounded space-y-9 mt-6 border border-[var(--border)]",
                          children: [
                            (0, a.jsx)(er, {
                              activeTab: e.activeTab,
                              onTabClick: n,
                            }),
                            (0, a.jsx)(ea, { activeTab: e.activeTab }),
                          ],
                        }),
                      ],
                    }),
                  "GPU" === e.activeCategory && (0, a.jsx)(es, {}),
                ],
              }),
              "GPU" === e.activeCategory &&
                (0, a.jsx)("div", {
                  className:
                    "bg-[var(--stake-box)] card md:w-[500px]  w-full max-w-[94.5%] relative mx-auto p-6 rounded-lg flex flex-col gap-7 z-20",
                  children: (0, a.jsx)(ei, {}),
                }),
            ],
          })
        );
      }
    },
    9457: function (e, t, n) {
      "use strict";
      n.d(t, {
        ne: function () {
          return l;
        },
        y0: function () {
          return m;
        },
      });
      var a = n(3040),
        r = n(4520),
        s = n(9417).Buffer;
      let i = (e) => {
          if (e < 0 || e > 255)
            throw RangeError("The number is out of range for a u8");
          return new Uint8Array([255 & e]);
        },
        o = (e) => {
          if (e < 0 || e > 4294967295)
            throw RangeError("The number is out of range for a u32");
          let t = new Uint8Array(4);
          return (
            (t[0] = 255 & e),
            (t[1] = (e >> 8) & 255),
            (t[2] = (e >> 16) & 255),
            (t[3] = (e >> 24) & 255),
            t
          );
        };
      async function c(e, t) {
        let n = {},
          r = [];
        for (let i = 1; i <= e; i++) {
          let [e] = a.rV.PublicKey.findProgramAddressSync(
            [s.from("nft_tier"), s.from([i])],
            t.programId
          );
          r.push(
            t.account.nftTierDetails
              .fetch(e)
              .then((e) => {
                n[e.nftTier] = {
                  pointsCost: e.pointsCost,
                  emissionRate: e.emissionRate / 31536e3,
                  nftCount: e.nftCount,
                  name: e.name,
                  uri: e.uri,
                };
              })
              .catch((e) => {
                console.error(
                  "Failed to fetch details for tier ".concat(i, ":"),
                  e
                );
              })
          );
        }
        return await Promise.all(r), n;
      }
      async function l(e, t) {
        let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5,
          r = s.from(e.toBuffer()),
          i = [],
          o = [];
        for (let c = 1; c <= n; c++) {
          let [n] = a.rV.PublicKey.findProgramAddressSync(
            [s.from("nft_tier_indexer"), r, s.from([c])],
            t.programId
          );
          o.push(
            t.account.userNftTierTracker
              .fetch(n)
              .then((e) => {
                e.nftsMinted > 0 &&
                  i.push({ tierId: c, nftCount: e.nftsMinted });
              })
              .catch((t) => {
                console.error(
                  "Failed to fetch tier "
                    .concat(c, " for user ")
                    .concat(e.toBase58(), ":"),
                  t
                );
              })
          );
        }
        return await Promise.all(o), i;
      }
      async function u(e, t, n) {
        let r = s.from(e.toBuffer()),
          c = {},
          l = t.map((e) => {
            let { tierId: t, nftCount: l } = e,
              [u] = a.rV.PublicKey.findProgramAddressSync(
                [
                  s.from("user_nft_timestamp_tracker"),
                  r,
                  i(t),
                  o(Math.floor(l / 25)),
                ],
                n.programId
              );
            return n.account.userNftTimeStampTracker
              .fetch(u)
              .then((e) => {
                c[t] || (c[t] = []), c[t].push(e.timeStampMintedAt);
              })
              .catch((e) => {
                console.error(
                  "Failed to fetch timestamp for tier ".concat(t, ":"),
                  e
                );
              });
          });
        return await Promise.all(l), c;
      }
      async function d(e, t) {
        let n = Object.keys(t),
          a = {},
          r = Math.floor(Date.now() / 1e3);
        return (
          console.log("comm tiers", n),
          n.forEach((n) => {
            let s = Number(n);
            (a[s] = 0),
              console.log("comm userTiersTimestamps length", t[s][0]),
              t[s][0].forEach((n, i) => {
                console.log("comm index", i),
                  console.log("comm test userTiersTimestamps[tierId]", t[s]),
                  console.log("comm params", r, n);
                let o = Number(r) - Number(n);
                console.log("comm timeDifference", o),
                  console.log("comm diff", n.toString(), n),
                  console.log("comm emission", s, e[s].emissionRate, s),
                  (a[s] += o * e[s].emissionRate),
                  console.log("comm emission", a[s]),
                  console.log("comm final", a[s]);
              });
          }),
          a
        );
      }
      async function m(e, t) {
        let n =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 5;
        try {
          let s = new a.$r(r, { connection: e }),
            i = await c(n, s),
            o = await l(t, s, n),
            m = await u(t, o, s);
          console.log("comm time stamps", m, i);
          let p = await d(i, m);
          return console.log("comm tiersRewards", p), p;
        } catch (e) {
          throw (console.error("Error calculating rewards:", e), e);
        }
      }
    },
    6230: function (e) {
      e.exports = {
        button: "Button_button__izga_",
        container: "Button_container__q2pqL",
        primary: "Button_primary__aPagT",
        complimentary: "Button_complimentary__JzQEq",
        "fly-by": "Button_fly-by__vU4Pu",
        text: "Button_text__QLYqG",
      };
    },
    4520: function (e) {
      "use strict";
      e.exports = JSON.parse(
        '{"address":"HTAXC4T8i9w95yLUxn6LfsiXGeZabMU6Lxc19mcr5FCL","metadata":{"name":"dojo_staking_nft_program","version":"0.1.0","spec":"0.1.0","description":"Created with Anchor"},"instructions":[{"name":"add_multiplier_record","discriminator":[198,196,230,73,42,247,137,18],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"multiplier_acc","writable":true}],"args":[{"name":"new_multiplier_record","type":{"defined":{"name":"MultiplierRecord"}}}]},{"name":"batch_stake","discriminator":[49,68,55,207,83,130,50,242],"accounts":[{"name":"payer","writable":true,"signer":true},{"name":"staking_config_account","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}},{"name":"user_stake_account_one","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(0)"}]}},{"name":"user_stake_account_two","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(1)"}]}},{"name":"user_stake_account_three","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(2)"}]}},{"name":"user_stake_account_four","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(3)"}]}},{"name":"user_stake_account_five","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(4)"}]}},{"name":"user_stake_account_six","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(5)"}]}},{"name":"user_stake_account_seven","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(6)"}]}},{"name":"user_stake_account_eight","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(7)"}]}},{"name":"user_stake_account_nine","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(8)"}]}},{"name":"user_stake_account_ten","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(9)"}]}},{"name":"user_stake_account_eleven","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(10)"}]}},{"name":"user_stake_account_twelve","writable":true,"optional":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_configs.get(11)"}]}},{"name":"admin_acc","pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"staking_stats_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[115,116,97,107,105,110,103,95,115,116,97,116,115]}]}}],"args":[{"name":"user_configs","type":{"vec":{"defined":{"name":"UserStakeConfiguration"}}}},{"name":"staking_start_time","type":"i64"}]},{"name":"change_apr","discriminator":[167,33,18,234,116,85,32,198],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"staking_config_account","docs":["Configuration Account PDA"],"writable":true,"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}}],"args":[{"name":"new_apr","type":"u16"}]},{"name":"change_exit_fee","discriminator":[187,177,61,133,162,160,159,18],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"staking_config_account","docs":["Configuration Account PDA"],"writable":true,"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}}],"args":[{"name":"new_exit_fee_percentage","type":"u16"}]},{"name":"change_minimum_stake_amount","discriminator":[146,189,91,94,92,149,229,198],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"staking_config_account","docs":["Configuration Account PDA"],"writable":true,"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}}],"args":[{"name":"new_minimum_stake_amount","type":"u64"}]},{"name":"change_owner","discriminator":[109,40,40,90,224,120,193,184],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"writable":true,"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}}],"args":[{"name":"new_owner","type":"pubkey"}]},{"name":"create_new_nft_tier","discriminator":[220,125,100,91,177,8,177,250],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"payer","docs":["Funding Wallet"],"writable":true,"signer":true},{"name":"nft_tier_detail_acc","writable":true,"pda":{"seeds":[{"kind":"const","value":[110,102,116,95,116,105,101,114]},{"kind":"arg","path":"tier_num"}]}},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"collection","docs":["The address of the new collection."],"writable":true,"pda":{"seeds":[{"kind":"const","value":[110,102,116,95,99,111,108,108,101,99,116,105,111,110]},{"kind":"arg","path":"tier_num"}]}},{"name":"dojo_authority_acc","docs":["The authority on the new asset."]},{"name":"mpl_core","docs":["The MPL Core program."],"address":"CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"}],"args":[{"name":"tier_num","type":"u8"},{"name":"points_cost","type":"u64"},{"name":"emission_rate","type":"u64"},{"name":"name","type":"string"},{"name":"uri","type":"string"}]},{"name":"end_program","discriminator":[52,169,162,67,229,102,137,27],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"staking_config_account","docs":["Configuration Account PDA"],"writable":true,"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}}],"args":[]},{"name":"increase_multiplier_config_space","discriminator":[224,84,184,74,41,34,33,124],"accounts":[{"name":"payer","writable":true,"signer":true},{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"multiplier_acc","docs":["Configuration Account PDA"],"writable":true},{"name":"system_program","address":"11111111111111111111111111111111"}],"args":[]},{"name":"increase_stake_or_lockin","discriminator":[117,20,34,254,195,121,10,4],"accounts":[{"name":"staking_config_account","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}},{"name":"user_stake_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"account","path":"user_authority_signer"}]}},{"name":"user_authority_signer","signer":true},{"name":"user_dojo_token_acc","writable":true},{"name":"dojo_program_vault_acc","writable":true},{"name":"token_program"},{"name":"staking_stats_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[115,116,97,107,105,110,103,95,115,116,97,116,115]}]}},{"name":"multiplier_acc"}],"args":[{"name":"stake_amount","type":"u64"}],"returns":"u64"},{"name":"increase_staking_config_account_space","discriminator":[129,199,87,132,163,102,165,130],"accounts":[{"name":"payer","writable":true,"signer":true},{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"staking_config_account","docs":["Configuration Account PDA"],"writable":true,"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}},{"name":"system_program","address":"11111111111111111111111111111111"}],"args":[]},{"name":"initialize","discriminator":[175,175,109,31,13,152,155,237],"accounts":[{"name":"payer","docs":["Funding Wallet"],"writable":true,"signer":true},{"name":"staking_stats_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[115,116,97,107,105,110,103,95,115,116,97,116,115]}]}},{"name":"staking_config_account","docs":["Configuration Account PDA"],"writable":true,"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}},{"name":"initial_admin","signer":true,"address":"i3h765SS3M2KvWkdniVWaMjexJQb1EN6WkbqiuepDvE"},{"name":"dojo_authority_acc","docs":["CHECK : Checked via a validated onchain state acc"],"writable":true,"address":"CHi8AwgykA3BMJ3GUsGZ1t3pHwy54ZDaNn4X8ZvS6yux"},{"name":"dojo_program_vault_acc","writable":true,"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,118,97,117,108,116]}]}},{"name":"dojo_mint"},{"name":"token_program"},{"name":"admin_acc","writable":true,"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"system_program","address":"11111111111111111111111111111111"}],"args":[{"name":"admin_key","type":"pubkey"},{"name":"staking_config_settings","type":{"defined":{"name":"StakingConfigurationSettings"}}}]},{"name":"initialize_multipliers","discriminator":[117,76,198,0,199,175,69,52],"accounts":[{"name":"payer","writable":true,"signer":true},{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"multiplier_acc","writable":true,"pda":{"seeds":[{"kind":"const","value":[109,117,108,116,105,112,108,105,101,114,95,97,99,99]}]}},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"staking_config_account","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}}],"args":[{"name":"multiplier_record","type":{"vec":{"defined":{"name":"MultiplierRecord"}}}}]},{"name":"modify_nft_tier_details","discriminator":[137,180,67,123,84,202,234,221],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"nft_tier_detail_acc","writable":true,"pda":{"seeds":[{"kind":"const","value":[110,102,116,95,116,105,101,114]},{"kind":"arg","path":"tier_num"}]}}],"args":[{"name":"tier_num","type":"u8"},{"name":"points_cost","type":{"option":"u64"}},{"name":"emission_rate","type":{"option":"u64"}}]},{"name":"redeem_nft","discriminator":[113,9,91,16,166,235,118,133],"accounts":[{"name":"payer","writable":true,"signer":true},{"name":"staking_config_account","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}},{"name":"user_stake_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"account","path":"user_authority_signer"}]}},{"name":"user_authority_signer","signer":true},{"name":"dojo_authority_acc","docs":["CHECK : Checked via a validated onchain state acc"]},{"name":"staking_stats_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[115,116,97,107,105,110,103,95,115,116,97,116,115]}]}},{"name":"multiplier_acc"},{"name":"nft_tier_account","pda":{"seeds":[{"kind":"const","value":[110,102,116,95,116,105,101,114]},{"kind":"arg","path":"nft_tier"}]}},{"name":"user_nft_tier_tracker","writable":true,"pda":{"seeds":[{"kind":"const","value":[110,102,116,95,116,105,101,114,95,105,110,100,101,120,101,114]},{"kind":"account","path":"user_stake_account.user_key","account":"UserStakeInfo"},{"kind":"arg","path":"nft_tier"}]}},{"name":"user_nft_timestamp_tracker","writable":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,110,102,116,95,116,105,109,101,115,116,97,109,112,95,116,114,97,99,107,101,114]},{"kind":"account","path":"user_stake_account.user_key","account":"UserStakeInfo"},{"kind":"arg","path":"nft_tier"},{"kind":"account","path":"user_nft_tier_tracker"}]}},{"name":"asset","docs":["CHECK : The address of the new nft asset., checked via pda","seed : static asset seed + user stake account owner + nft tier"],"writable":true,"pda":{"seeds":[{"kind":"const","value":[110,102,116,95,97,115,115,101,116]},{"kind":"account","path":"user_stake_account.user_key","account":"UserStakeInfo"},{"kind":"arg","path":"nft_tier"},{"kind":"account","path":"user_nft_tier_tracker"}]}},{"name":"collection","docs":["The collection to which the asset belongs."],"writable":true,"pda":{"seeds":[{"kind":"const","value":[110,102,116,95,99,111,108,108,101,99,116,105,111,110]},{"kind":"account","path":"nft_tier_account.nft_tier","account":"NftTierDetails"}]}},{"name":"system_program","docs":["The system program."],"address":"11111111111111111111111111111111"},{"name":"log_wrapper","docs":["The SPL Noop program."],"optional":true},{"name":"mpl_core","address":"CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"}],"args":[{"name":"tier_num","type":"u8"}]},{"name":"remove_multiplier_record","discriminator":[179,126,85,129,17,247,197,24],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"multiplier_acc","writable":true},{"name":"staking_config_account","pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}}],"args":[{"name":"multiplier_record_to_remove","type":{"defined":{"name":"MultiplierRecord"}}}]},{"name":"stake","discriminator":[206,176,202,18,200,209,179,108],"accounts":[{"name":"payer","writable":true,"signer":true},{"name":"staking_config_account","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}},{"name":"user_stake_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"arg","path":"user_addr"}]}},{"name":"user_authority_signer","signer":true,"optional":true},{"name":"user_dojo_token_acc","writable":true},{"name":"dojo_program_vault_acc","writable":true},{"name":"staking_stats_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[115,116,97,107,105,110,103,95,115,116,97,116,115]}]}},{"name":"system_program","address":"11111111111111111111111111111111"},{"name":"token_program"}],"args":[{"name":"stake_amount","type":"u64"},{"name":"user_addr","type":"pubkey"}]},{"name":"tweak_multiplier_record","discriminator":[218,167,83,224,250,113,253,115],"accounts":[{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"multiplier_acc","writable":true},{"name":"staking_config_account","pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}}],"args":[{"name":"new_multiplier_record","type":{"defined":{"name":"MultiplierRecord"}}},{"name":"old_multiplier","type":"u8"}]},{"name":"unstake","discriminator":[90,95,107,42,205,124,50,225],"accounts":[{"name":"staking_config_account","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[100,111,106,111,95,115,116,97,107,101,95,99,111,110,102,105,103]}]}},{"name":"user_stake_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,115,116,97,107,101]},{"kind":"account","path":"user_authority_signer"}]}},{"name":"user_authority_signer","signer":true},{"name":"user_dojo_token_acc","writable":true},{"name":"dojo_authority_acc","docs":["CHECK : Checked via a validated onchain state acc"]},{"name":"dojo_program_vault_acc","writable":true},{"name":"token_program"},{"name":"staking_stats_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[115,116,97,107,105,110,103,95,115,116,97,116,115]}]}},{"name":"multiplier_acc"}],"args":[{"name":"unstake_amount","type":"u64"}]},{"name":"user_redeem_nft_rewards","discriminator":[117,199,76,95,152,64,198,122],"accounts":[{"name":"user_authority_signer","signer":true},{"name":"user_dojo_token_acc","writable":true},{"name":"nft_tier_account","pda":{"seeds":[{"kind":"const","value":[110,102,116,95,116,105,101,114]},{"kind":"arg","path":"nft_tier"}]}},{"name":"user_nft_timestamp_tracker","writable":true,"pda":{"seeds":[{"kind":"const","value":[117,115,101,114,95,110,102,116,95,116,105,109,101,115,116,97,109,112,95,116,114,97,99,107,101,114]},{"kind":"account","path":"user_authority_signer"},{"kind":"arg","path":"nft_tier"},{"kind":"arg","path":"user_nft_tracker_acc_id"}]}},{"name":"admin_dojo_rewards_holder_acc","writable":true},{"name":"dojo_authority_acc"},{"name":"token_program"}],"args":[{"name":"_nft_tier","type":"u8"},{"name":"_user_nft_tracker_acc_id","type":"u32"}]},{"name":"withdraw_exit_fees","discriminator":[228,124,153,89,129,74,128,230],"accounts":[{"name":"dojo_authority_acc","docs":["Configuration Account PDA","CHECK : Checked via a validated onchain state acc"]},{"name":"dojo_program_vault_acc","writable":true},{"name":"token_program"},{"name":"admin_exit_fee_receive_token_account","writable":true},{"name":"admin_sign","docs":["Signer of the Admin Key"],"signer":true},{"name":"admin_acc","docs":["Configuration Account PDA"],"pda":{"seeds":[{"kind":"const","value":[97,100,109,105,110]}]}},{"name":"staking_stats_account","writable":true,"pda":{"seeds":[{"kind":"const","value":[115,116,97,107,105,110,103,95,115,116,97,116,115]}]}}],"args":[{"name":"withdraw_amount","type":{"option":"u64"}}]}],"accounts":[{"name":"AdminSettings","discriminator":[72,250,196,91,93,154,17,15]},{"name":"MultiplierConfig","discriminator":[181,92,4,234,240,56,88,127]},{"name":"NftTierDetails","discriminator":[119,1,234,116,162,215,18,96]},{"name":"StakingConfiguration","discriminator":[42,151,207,209,7,27,30,227]},{"name":"StakingStats","discriminator":[166,5,189,163,53,97,113,241]},{"name":"UserNftTierTracker","discriminator":[226,114,148,147,153,109,48,147]},{"name":"UserNftTimeStampTracker","discriminator":[19,215,247,54,1,69,75,166]},{"name":"UserStakeInfo","discriminator":[219,233,236,123,28,113,89,56]}],"types":[{"name":"AdminSettings","type":{"kind":"struct","fields":[{"name":"admin_key","type":"pubkey"}]}},{"name":"AprChangeRecord","type":{"kind":"struct","fields":[{"name":"apr_change_timestamp","type":"i64"},{"name":"new_apr","type":"u16"}]}},{"name":"MultiplierConfig","type":{"kind":"struct","fields":[{"name":"bump","type":"u8"},{"name":"multiplier_records","type":{"vec":{"defined":{"name":"MultiplierRecord"}}}}]}},{"name":"MultiplierRecord","type":{"kind":"struct","fields":[{"name":"minimum_reward_age","type":"u32"},{"name":"multiplier","type":"u8"}]}},{"name":"NftTierDetails","type":{"kind":"struct","fields":[{"name":"bump","type":"u8"},{"name":"nft_tier","type":"u8"},{"name":"points_cost","type":"u64"},{"name":"emission_rate","type":"u64"},{"name":"nft_count","type":"u32"},{"name":"name","type":"string"},{"name":"uri","type":"string"}]}},{"name":"OnClaim","type":{"kind":"struct","fields":[{"name":"user","type":"pubkey"},{"name":"cost_of_nft","type":"u64"},{"name":"nft_collection_addr","type":"pubkey"}]}},{"name":"OnExitFeesWithdraw","type":{"kind":"struct","fields":[{"name":"exit_fee_withdrawed","type":"u64"},{"name":"timestamp","type":"i64"}]}},{"name":"OnRestake","type":{"kind":"struct","fields":[{"name":"additional_stake_amount","type":"u64"},{"name":"user","type":"pubkey"},{"name":"reward_age","type":"u32"}]}},{"name":"OnStake","type":{"kind":"struct","fields":[{"name":"stake_amount","type":"u64"},{"name":"user","type":"pubkey"}]}},{"name":"OnUnstake","type":{"kind":"struct","fields":[{"name":"unstake_amount","type":"u64"},{"name":"user","type":"pubkey"},{"name":"exit_fee","type":"u64"},{"name":"amount_released","type":"u64"}]}},{"name":"RedeemNftRewardEvent","type":{"kind":"struct","fields":[{"name":"user","type":"pubkey"},{"name":"nft_tier","type":"u8"},{"name":"nft_emission_rate","type":"u64"},{"name":"redeem_nft_reward_amnt","type":"u64"}]}},{"name":"StakingConfiguration","type":{"kind":"struct","fields":[{"name":"bump","type":"u8"},{"name":"minimum_stake_amount","type":"u64"},{"name":"program_start_time","type":"i64"},{"name":"exit_fee_percentage","type":"u16"},{"name":"end_date","type":{"option":"i64"}},{"name":"apy_changes","type":{"vec":{"defined":{"name":"AprChangeRecord"}}}}]}},{"name":"StakingConfigurationSettings","type":{"kind":"struct","fields":[{"name":"minimum_stake_amount","type":"u64"},{"name":"program_start_time","type":"i64"},{"name":"exit_fee_percentage","type":"u16"},{"name":"new_apr","type":"u16"}]}},{"name":"StakingStats","type":{"kind":"struct","fields":[{"name":"bump","type":"u8"},{"name":"accumulated_exit_fees","type":"u64"},{"name":"total_stake_amount","type":"u64"},{"name":"total_users","type":"u32"}]}},{"name":"UserNftTierTracker","type":{"kind":"struct","fields":[{"name":"bump","type":"u8"},{"name":"nfts_minted","type":"u32"}]}},{"name":"UserNftTimeStampTracker","type":{"kind":"struct","fields":[{"name":"bump","type":"u8"},{"name":"time_stamp_minted_at","type":{"vec":"i64"}}]}},{"name":"UserStakeConfiguration","type":{"kind":"struct","fields":[{"name":"user_addr","type":"pubkey"},{"name":"stake_amount","type":"u64"},{"name":"bump","type":"u8"}]}},{"name":"UserStakeInfo","type":{"kind":"struct","fields":[{"name":"user_key","type":"pubkey"},{"name":"stake_amount","type":"u64"},{"name":"last_synced","type":"i64"},{"name":"total_points","type":"u64"},{"name":"current_apr","type":"u16"},{"name":"staking_start_timestamp","type":"i64"},{"name":"bump","type":"u8"}]}}]}'
      );
    },
  },
  function (e) {
    e.O(0, [636, 186, 652, 531, 305, 476, 457, 195, 514, 744], function () {
      return e((e.s = 688));
    }),
      (_N_E = e.O());
  },
]);

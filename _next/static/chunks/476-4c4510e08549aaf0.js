"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [476],
  {
    3448: function (e, t, n) {
      var r = n(9417).Buffer,
        i =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.map =
          t.array =
          t.rustEnum =
          t.str =
          t.vecU8 =
          t.tagged =
          t.vec =
          t.bool =
          t.option =
          t.publicKey =
          t.i256 =
          t.u256 =
          t.i128 =
          t.u128 =
          t.i64 =
          t.u64 =
          t.struct =
          t.f64 =
          t.f32 =
          t.i32 =
          t.u32 =
          t.i16 =
          t.u16 =
          t.i8 =
          t.u8 =
            void 0);
      let s = n(8773),
        o = n(4482),
        u = i(n(7057));
      var a = n(8773);
      Object.defineProperty(t, "u8", {
        enumerable: !0,
        get: function () {
          return a.u8;
        },
      }),
        Object.defineProperty(t, "i8", {
          enumerable: !0,
          get: function () {
            return a.s8;
          },
        }),
        Object.defineProperty(t, "u16", {
          enumerable: !0,
          get: function () {
            return a.u16;
          },
        }),
        Object.defineProperty(t, "i16", {
          enumerable: !0,
          get: function () {
            return a.s16;
          },
        }),
        Object.defineProperty(t, "u32", {
          enumerable: !0,
          get: function () {
            return a.u32;
          },
        }),
        Object.defineProperty(t, "i32", {
          enumerable: !0,
          get: function () {
            return a.s32;
          },
        }),
        Object.defineProperty(t, "f32", {
          enumerable: !0,
          get: function () {
            return a.f32;
          },
        }),
        Object.defineProperty(t, "f64", {
          enumerable: !0,
          get: function () {
            return a.f64;
          },
        }),
        Object.defineProperty(t, "struct", {
          enumerable: !0,
          get: function () {
            return a.struct;
          },
        });
      class c extends s.Layout {
        constructor(e, t, n) {
          super(e, n), (this.blob = (0, s.blob)(e)), (this.signed = t);
        }
        decode(e, t = 0) {
          let n = new u.default(this.blob.decode(e, t), 10, "le");
          return this.signed ? n.fromTwos(8 * this.span).clone() : n;
        }
        encode(e, t, n = 0) {
          return (
            this.signed && (e = e.toTwos(8 * this.span)),
            this.blob.encode(e.toArrayLike(r, "le", this.span), t, n)
          );
        }
      }
      function d(e) {
        return new c(8, !1, e);
      }
      (t.u64 = d),
        (t.i64 = function (e) {
          return new c(8, !0, e);
        }),
        (t.u128 = function (e) {
          return new c(16, !1, e);
        }),
        (t.i128 = function (e) {
          return new c(16, !0, e);
        }),
        (t.u256 = function (e) {
          return new c(32, !1, e);
        }),
        (t.i256 = function (e) {
          return new c(32, !0, e);
        });
      class l extends s.Layout {
        constructor(e, t, n, r) {
          super(e.span, r),
            (this.layout = e),
            (this.decoder = t),
            (this.encoder = n);
        }
        decode(e, t) {
          return this.decoder(this.layout.decode(e, t));
        }
        encode(e, t, n) {
          return this.layout.encode(this.encoder(e), t, n);
        }
        getSpan(e, t) {
          return this.layout.getSpan(e, t);
        }
      }
      t.publicKey = function (e) {
        return new l(
          (0, s.blob)(32),
          (e) => new o.PublicKey(e),
          (e) => e.toBuffer(),
          e
        );
      };
      class h extends s.Layout {
        constructor(e, t) {
          super(-1, t), (this.layout = e), (this.discriminator = (0, s.u8)());
        }
        encode(e, t, n = 0) {
          return null == e
            ? this.discriminator.encode(0, t, n)
            : (this.discriminator.encode(1, t, n),
              this.layout.encode(e, t, n + 1) + 1);
        }
        decode(e, t = 0) {
          let n = this.discriminator.decode(e, t);
          if (0 === n) return null;
          if (1 === n) return this.layout.decode(e, t + 1);
          throw Error("Invalid option " + this.property);
        }
        getSpan(e, t = 0) {
          let n = this.discriminator.decode(e, t);
          if (0 === n) return 1;
          if (1 === n) return this.layout.getSpan(e, t + 1) + 1;
          throw Error("Invalid option " + this.property);
        }
      }
      function f(e) {
        if (0 === e) return !1;
        if (1 === e) return !0;
        throw Error("Invalid bool: " + e);
      }
      function p(e) {
        return e ? 1 : 0;
      }
      function g(e) {
        let t = (0, s.u32)("length");
        return new l(
          (0, s.struct)([t, (0, s.blob)((0, s.offset)(t, -t.span), "data")]),
          ({ data: e }) => e,
          (e) => ({ data: e }),
          e
        );
      }
      (t.option = function (e, t) {
        return new h(e, t);
      }),
        (t.bool = function (e) {
          return new l((0, s.u8)(), f, p, e);
        }),
        (t.vec = function (e, t) {
          let n = (0, s.u32)("length");
          return new l(
            (0, s.struct)([
              n,
              (0, s.seq)(e, (0, s.offset)(n, -n.span), "values"),
            ]),
            ({ values: e }) => e,
            (e) => ({ values: e }),
            t
          );
        }),
        (t.tagged = function (e, t, n) {
          return new l(
            (0, s.struct)([d("tag"), t.replicate("data")]),
            function ({ tag: t, data: n }) {
              if (!t.eq(e))
                throw Error(
                  "Invalid tag, expected: " +
                    e.toString("hex") +
                    ", got: " +
                    t.toString("hex")
                );
              return n;
            },
            (t) => ({ tag: e, data: t }),
            n
          );
        }),
        (t.vecU8 = g),
        (t.str = function (e) {
          return new l(
            g(),
            (e) => e.toString("utf-8"),
            (e) => r.from(e, "utf-8"),
            e
          );
        }),
        (t.rustEnum = function (e, t, n) {
          let r = (0, s.union)(null != n ? n : (0, s.u8)(), t);
          return e.forEach((e, t) => r.addVariant(t, e, e.property)), r;
        }),
        (t.array = function (e, t, n) {
          return new l(
            (0, s.struct)([(0, s.seq)(e, t, "values")]),
            ({ values: e }) => e,
            (e) => ({ values: e }),
            n
          );
        });
      class w extends s.Layout {
        constructor(e, t, n) {
          super(e.span + t.span, n),
            (this.keyLayout = e),
            (this.valueLayout = t);
        }
        decode(e, t) {
          return (
            (t = t || 0),
            [
              this.keyLayout.decode(e, t),
              this.valueLayout.decode(e, t + this.keyLayout.getSpan(e, t)),
            ]
          );
        }
        encode(e, t, n) {
          n = n || 0;
          let r = this.keyLayout.encode(e[0], t, n),
            i = this.valueLayout.encode(e[1], t, n + r);
          return r + i;
        }
        getSpan(e, t) {
          return this.keyLayout.getSpan(e, t) + this.valueLayout.getSpan(e, t);
        }
      }
      t.map = function (e, t, n) {
        let r = (0, s.u32)("length");
        return new l(
          (0, s.struct)([
            r,
            (0, s.seq)(new w(e, t), (0, s.offset)(r, -r.span), "values"),
          ]),
          ({ values: e }) => new Map(e),
          (e) => ({ values: Array.from(e.entries()) }),
          n
        );
      };
    },
    8773: function (e, t, n) {
      var r = n(9417).Buffer;
      class i {
        constructor(e, t) {
          if (!Number.isInteger(e)) throw TypeError("span must be an integer");
          (this.span = e), (this.property = t);
        }
        makeDestinationObject() {
          return {};
        }
        decode(e, t) {
          throw Error("Layout is abstract");
        }
        encode(e, t, n) {
          throw Error("Layout is abstract");
        }
        getSpan(e, t) {
          if (0 > this.span) throw RangeError("indeterminate span");
          return this.span;
        }
        replicate(e) {
          let t = Object.create(this.constructor.prototype);
          return Object.assign(t, this), (t.property = e), t;
        }
        fromArray(e) {}
      }
      function s(e, t) {
        return t.property ? e + "[" + t.property + "]" : e;
      }
      (t.Layout = i),
        (t.nameWithProperty = s),
        (t.bindConstructorLayout = function (e, t) {
          if ("function" != typeof e)
            throw TypeError("Class must be constructor");
          if (e.hasOwnProperty("layout_"))
            throw Error("Class is already bound to a layout");
          if (!(t && t instanceof i))
            throw TypeError("layout must be a Layout");
          if (t.hasOwnProperty("boundConstructor_"))
            throw Error("layout is already bound to a constructor");
          (e.layout_ = t),
            (t.boundConstructor_ = e),
            (t.makeDestinationObject = () => new e()),
            Object.defineProperty(e.prototype, "encode", {
              value: function (e, n) {
                return t.encode(this, e, n);
              },
              writable: !0,
            }),
            Object.defineProperty(e, "decode", {
              value: function (e, n) {
                return t.decode(e, n);
              },
              writable: !0,
            });
        });
      class o extends i {
        isCount() {
          throw Error("ExternalLayout is abstract");
        }
      }
      class u extends o {
        constructor(e, t) {
          if ((void 0 === e && (e = 1), !Number.isInteger(e) || 0 >= e))
            throw TypeError("elementSpan must be a (positive) integer");
          super(-1, t), (this.elementSpan = e);
        }
        isCount() {
          return !0;
        }
        decode(e, t) {
          return (
            void 0 === t && (t = 0),
            Math.floor((e.length - t) / this.elementSpan)
          );
        }
        encode(e, t, n) {
          return 0;
        }
      }
      class a extends o {
        constructor(e, t, n) {
          if (!(e instanceof i)) throw TypeError("layout must be a Layout");
          if (void 0 === t) t = 0;
          else if (!Number.isInteger(t))
            throw TypeError("offset must be integer or undefined");
          super(e.span, n || e.property), (this.layout = e), (this.offset = t);
        }
        isCount() {
          return this.layout instanceof c || this.layout instanceof d;
        }
        decode(e, t) {
          return (
            void 0 === t && (t = 0), this.layout.decode(e, t + this.offset)
          );
        }
        encode(e, t, n) {
          return (
            void 0 === n && (n = 0), this.layout.encode(e, t, n + this.offset)
          );
        }
      }
      class c extends i {
        constructor(e, t) {
          if ((super(e, t), 6 < this.span))
            throw RangeError("span must not exceed 6 bytes");
        }
        decode(e, t) {
          return void 0 === t && (t = 0), e.readUIntLE(t, this.span);
        }
        encode(e, t, n) {
          return (
            void 0 === n && (n = 0), t.writeUIntLE(e, n, this.span), this.span
          );
        }
      }
      class d extends i {
        constructor(e, t) {
          if ((super(e, t), 6 < this.span))
            throw RangeError("span must not exceed 6 bytes");
        }
        decode(e, t) {
          return void 0 === t && (t = 0), e.readUIntBE(t, this.span);
        }
        encode(e, t, n) {
          return (
            void 0 === n && (n = 0), t.writeUIntBE(e, n, this.span), this.span
          );
        }
      }
      class l extends i {
        constructor(e, t) {
          if ((super(e, t), 6 < this.span))
            throw RangeError("span must not exceed 6 bytes");
        }
        decode(e, t) {
          return void 0 === t && (t = 0), e.readIntLE(t, this.span);
        }
        encode(e, t, n) {
          return (
            void 0 === n && (n = 0), t.writeIntLE(e, n, this.span), this.span
          );
        }
      }
      class h extends i {
        constructor(e, t) {
          if ((super(e, t), 6 < this.span))
            throw RangeError("span must not exceed 6 bytes");
        }
        decode(e, t) {
          return void 0 === t && (t = 0), e.readIntBE(t, this.span);
        }
        encode(e, t, n) {
          return (
            void 0 === n && (n = 0), t.writeIntBE(e, n, this.span), this.span
          );
        }
      }
      function f(e) {
        let t = Math.floor(e / 4294967296);
        return { hi32: t, lo32: e - 4294967296 * t };
      }
      function p(e, t) {
        return 4294967296 * e + t;
      }
      class g extends i {
        constructor(e) {
          super(8, e);
        }
        decode(e, t) {
          void 0 === t && (t = 0);
          let n = e.readUInt32LE(t);
          return p(e.readUInt32LE(t + 4), n);
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = f(e);
          return t.writeUInt32LE(r.lo32, n), t.writeUInt32LE(r.hi32, n + 4), 8;
        }
      }
      class w extends i {
        constructor(e) {
          super(8, e);
        }
        decode(e, t) {
          return (
            void 0 === t && (t = 0), p(e.readUInt32BE(t), e.readUInt32BE(t + 4))
          );
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = f(e);
          return t.writeUInt32BE(r.hi32, n), t.writeUInt32BE(r.lo32, n + 4), 8;
        }
      }
      class m extends i {
        constructor(e) {
          super(8, e);
        }
        decode(e, t) {
          void 0 === t && (t = 0);
          let n = e.readUInt32LE(t);
          return p(e.readInt32LE(t + 4), n);
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = f(e);
          return t.writeUInt32LE(r.lo32, n), t.writeInt32LE(r.hi32, n + 4), 8;
        }
      }
      class y extends i {
        constructor(e) {
          super(8, e);
        }
        decode(e, t) {
          return (
            void 0 === t && (t = 0), p(e.readInt32BE(t), e.readUInt32BE(t + 4))
          );
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = f(e);
          return t.writeInt32BE(r.hi32, n), t.writeUInt32BE(r.lo32, n + 4), 8;
        }
      }
      class v extends i {
        constructor(e) {
          super(4, e);
        }
        decode(e, t) {
          return void 0 === t && (t = 0), e.readFloatLE(t);
        }
        encode(e, t, n) {
          return void 0 === n && (n = 0), t.writeFloatLE(e, n), 4;
        }
      }
      class b extends i {
        constructor(e) {
          super(4, e);
        }
        decode(e, t) {
          return void 0 === t && (t = 0), e.readFloatBE(t);
        }
        encode(e, t, n) {
          return void 0 === n && (n = 0), t.writeFloatBE(e, n), 4;
        }
      }
      class E extends i {
        constructor(e) {
          super(8, e);
        }
        decode(e, t) {
          return void 0 === t && (t = 0), e.readDoubleLE(t);
        }
        encode(e, t, n) {
          return void 0 === n && (n = 0), t.writeDoubleLE(e, n), 8;
        }
      }
      class x extends i {
        constructor(e) {
          super(8, e);
        }
        decode(e, t) {
          return void 0 === t && (t = 0), e.readDoubleBE(t);
        }
        encode(e, t, n) {
          return void 0 === n && (n = 0), t.writeDoubleBE(e, n), 8;
        }
      }
      class N extends i {
        constructor(e, t, n) {
          if (!(e instanceof i))
            throw TypeError("elementLayout must be a Layout");
          if (
            !(
              (t instanceof o && t.isCount()) ||
              (Number.isInteger(t) && 0 <= t)
            )
          )
            throw TypeError(
              "count must be non-negative integer or an unsigned integer ExternalLayout"
            );
          let r = -1;
          t instanceof o || !(0 < e.span) || (r = t * e.span),
            super(r, n),
            (this.elementLayout = e),
            (this.count = t);
        }
        getSpan(e, t) {
          if (0 <= this.span) return this.span;
          void 0 === t && (t = 0);
          let n = 0,
            r = this.count;
          if (
            (r instanceof o && (r = r.decode(e, t)),
            0 < this.elementLayout.span)
          )
            n = r * this.elementLayout.span;
          else {
            let i = 0;
            for (; i < r; ) (n += this.elementLayout.getSpan(e, t + n)), ++i;
          }
          return n;
        }
        decode(e, t) {
          void 0 === t && (t = 0);
          let n = [],
            r = 0,
            i = this.count;
          for (i instanceof o && (i = i.decode(e, t)); r < i; )
            n.push(this.elementLayout.decode(e, t)),
              (t += this.elementLayout.getSpan(e, t)),
              (r += 1);
          return n;
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = this.elementLayout,
            i = e.reduce((e, i) => e + r.encode(i, t, n + e), 0);
          return (
            this.count instanceof o && this.count.encode(e.length, t, n), i
          );
        }
      }
      class L extends i {
        constructor(e, t, n) {
          if (
            !(Array.isArray(e) && e.reduce((e, t) => e && t instanceof i, !0))
          )
            throw TypeError("fields must be array of Layout instances");
          for (let r of ("boolean" == typeof t &&
            void 0 === n &&
            ((n = t), (t = void 0)),
          e))
            if (0 > r.span && void 0 === r.property)
              throw Error(
                "fields cannot contain unnamed variable-length layout"
              );
          let r = -1;
          try {
            r = e.reduce((e, t) => e + t.getSpan(), 0);
          } catch (e) {}
          super(r, t), (this.fields = e), (this.decodePrefixes = !!n);
        }
        getSpan(e, t) {
          if (0 <= this.span) return this.span;
          void 0 === t && (t = 0);
          let n = 0;
          try {
            n = this.fields.reduce((n, r) => {
              let i = r.getSpan(e, t);
              return (t += i), n + i;
            }, 0);
          } catch (e) {
            throw RangeError("indeterminate span");
          }
          return n;
        }
        decode(e, t) {
          void 0 === t && (t = 0);
          let n = this.makeDestinationObject();
          for (let r of this.fields)
            if (
              (void 0 !== r.property && (n[r.property] = r.decode(e, t)),
              (t += r.getSpan(e, t)),
              this.decodePrefixes && e.length === t)
            )
              break;
          return n;
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = n,
            i = 0,
            s = 0;
          for (let r of this.fields) {
            let o = r.span;
            if (((s = 0 < o ? o : 0), void 0 !== r.property)) {
              let i = e[r.property];
              void 0 !== i &&
                ((s = r.encode(i, t, n)), 0 > o && (o = r.getSpan(t, n)));
            }
            (i = n), (n += o);
          }
          return i + s - r;
        }
        fromArray(e) {
          let t = this.makeDestinationObject();
          for (let n of this.fields)
            void 0 !== n.property &&
              0 < e.length &&
              (t[n.property] = e.shift());
          return t;
        }
        layoutFor(e) {
          if ("string" != typeof e) throw TypeError("property must be string");
          for (let t of this.fields) if (t.property === e) return t;
        }
        offsetOf(e) {
          if ("string" != typeof e) throw TypeError("property must be string");
          let t = 0;
          for (let n of this.fields) {
            if (n.property === e) return t;
            0 > n.span ? (t = -1) : 0 <= t && (t += n.span);
          }
        }
      }
      class S {
        constructor(e) {
          this.property = e;
        }
        decode() {
          throw Error("UnionDiscriminator is abstract");
        }
        encode() {
          throw Error("UnionDiscriminator is abstract");
        }
      }
      class P extends S {
        constructor(e, t) {
          if (!(e instanceof o && e.isCount()))
            throw TypeError(
              "layout must be an unsigned integer ExternalLayout"
            );
          super(t || e.property || "variant"), (this.layout = e);
        }
        decode(e, t) {
          return this.layout.decode(e, t);
        }
        encode(e, t, n) {
          return this.layout.encode(e, t, n);
        }
      }
      class O extends i {
        constructor(e, t, n) {
          let r = e instanceof c || e instanceof d;
          if (r) e = new P(new a(e));
          else if (e instanceof o && e.isCount()) e = new P(e);
          else if (!(e instanceof S))
            throw TypeError(
              "discr must be a UnionDiscriminator or an unsigned integer layout"
            );
          if ((void 0 === t && (t = null), !(null === t || t instanceof i)))
            throw TypeError("defaultLayout must be null or a Layout");
          if (null !== t) {
            if (0 > t.span)
              throw Error("defaultLayout must have constant span");
            void 0 === t.property && (t = t.replicate("content"));
          }
          let s = -1;
          t && 0 <= (s = t.span) && r && (s += e.layout.span),
            super(s, n),
            (this.discriminator = e),
            (this.usesPrefixDiscriminator = r),
            (this.defaultLayout = t),
            (this.registry = {});
          let u = this.defaultGetSourceVariant.bind(this);
          (this.getSourceVariant = function (e) {
            return u(e);
          }),
            (this.configGetSourceVariant = function (e) {
              u = e.bind(this);
            });
        }
        getSpan(e, t) {
          if (0 <= this.span) return this.span;
          void 0 === t && (t = 0);
          let n = this.getVariant(e, t);
          if (!n)
            throw Error("unable to determine span for unrecognized variant");
          return n.getSpan(e, t);
        }
        defaultGetSourceVariant(e) {
          if (e.hasOwnProperty(this.discriminator.property)) {
            if (
              this.defaultLayout &&
              e.hasOwnProperty(this.defaultLayout.property)
            )
              return;
            let t = this.registry[e[this.discriminator.property]];
            if (t && (!t.layout || e.hasOwnProperty(t.property))) return t;
          } else
            for (let t in this.registry) {
              let n = this.registry[t];
              if (e.hasOwnProperty(n.property)) return n;
            }
          throw Error("unable to infer src variant");
        }
        decode(e, t) {
          let n;
          void 0 === t && (t = 0);
          let r = this.discriminator,
            i = r.decode(e, t),
            s = this.registry[i];
          if (void 0 === s) {
            let o = 0;
            (s = this.defaultLayout),
              this.usesPrefixDiscriminator && (o = r.layout.span),
              ((n = this.makeDestinationObject())[r.property] = i),
              (n[s.property] = this.defaultLayout.decode(e, t + o));
          } else n = s.decode(e, t);
          return n;
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = this.getSourceVariant(e);
          if (void 0 === r) {
            let r = this.discriminator,
              i = this.defaultLayout,
              s = 0;
            return (
              this.usesPrefixDiscriminator && (s = r.layout.span),
              r.encode(e[r.property], t, n),
              s + i.encode(e[i.property], t, n + s)
            );
          }
          return r.encode(e, t, n);
        }
        addVariant(e, t, n) {
          let r = new I(this, e, t, n);
          return (this.registry[e] = r), r;
        }
        getVariant(e, t) {
          let n = e;
          return (
            r.isBuffer(e) &&
              (void 0 === t && (t = 0), (n = this.discriminator.decode(e, t))),
            this.registry[n]
          );
        }
      }
      class I extends i {
        constructor(e, t, n, r) {
          if (!(e instanceof O)) throw TypeError("union must be a Union");
          if (!Number.isInteger(t) || 0 > t)
            throw TypeError("variant must be a (non-negative) integer");
          if (
            ("string" == typeof n && void 0 === r && ((r = n), (n = null)), n)
          ) {
            if (!(n instanceof i)) throw TypeError("layout must be a Layout");
            if (
              null !== e.defaultLayout &&
              0 <= n.span &&
              n.span > e.defaultLayout.span
            )
              throw Error("variant span exceeds span of containing union");
            if ("string" != typeof r)
              throw TypeError("variant must have a String property");
          }
          let s = e.span;
          0 > e.span &&
            0 <= (s = n ? n.span : 0) &&
            e.usesPrefixDiscriminator &&
            (s += e.discriminator.layout.span),
            super(s, r),
            (this.union = e),
            (this.variant = t),
            (this.layout = n || null);
        }
        getSpan(e, t) {
          if (0 <= this.span) return this.span;
          void 0 === t && (t = 0);
          let n = 0;
          return (
            this.union.usesPrefixDiscriminator &&
              (n = this.union.discriminator.layout.span),
            n + this.layout.getSpan(e, t + n)
          );
        }
        decode(e, t) {
          let n = this.makeDestinationObject();
          if ((void 0 === t && (t = 0), this !== this.union.getVariant(e, t)))
            throw Error("variant mismatch");
          let r = 0;
          return (
            this.union.usesPrefixDiscriminator &&
              (r = this.union.discriminator.layout.span),
            this.layout
              ? (n[this.property] = this.layout.decode(e, t + r))
              : this.property
              ? (n[this.property] = !0)
              : this.union.usesPrefixDiscriminator &&
                (n[this.union.discriminator.property] = this.variant),
            n
          );
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = 0;
          if (
            (this.union.usesPrefixDiscriminator &&
              (r = this.union.discriminator.layout.span),
            this.layout && !e.hasOwnProperty(this.property))
          )
            throw TypeError("variant lacks property " + this.property);
          this.union.discriminator.encode(this.variant, t, n);
          let i = r;
          if (
            this.layout &&
            (this.layout.encode(e[this.property], t, n + r),
            (i += this.layout.getSpan(t, n + r)),
            0 <= this.union.span && i > this.union.span)
          )
            throw Error("encoded variant overruns containing union");
          return i;
        }
        fromArray(e) {
          if (this.layout) return this.layout.fromArray(e);
        }
      }
      function M(e) {
        return 0 > e && (e += 4294967296), e;
      }
      class T extends i {
        constructor(e, t, n) {
          if (!(e instanceof c || e instanceof d))
            throw TypeError("word must be a UInt or UIntBE layout");
          if (
            ("string" == typeof t && void 0 === n && ((n = t), (t = void 0)),
            4 < e.span)
          )
            throw RangeError("word cannot exceed 32 bits");
          super(e.span, n),
            (this.word = e),
            (this.msb = !!t),
            (this.fields = []);
          let r = 0;
          (this._packedSetValue = function (e) {
            return (r = M(e)), this;
          }),
            (this._packedGetValue = function () {
              return r;
            });
        }
        decode(e, t) {
          let n = this.makeDestinationObject();
          void 0 === t && (t = 0);
          let r = this.word.decode(e, t);
          for (let e of (this._packedSetValue(r), this.fields))
            void 0 !== e.property && (n[e.property] = e.decode(r));
          return n;
        }
        encode(e, t, n) {
          void 0 === n && (n = 0);
          let r = this.word.decode(t, n);
          for (let t of (this._packedSetValue(r), this.fields))
            if (void 0 !== t.property) {
              let n = e[t.property];
              void 0 !== n && t.encode(n);
            }
          return this.word.encode(this._packedGetValue(), t, n);
        }
        addField(e, t) {
          let n = new k(this, e, t);
          return this.fields.push(n), n;
        }
        addBoolean(e) {
          let t = new B(this, e);
          return this.fields.push(t), t;
        }
        fieldFor(e) {
          if ("string" != typeof e) throw TypeError("property must be string");
          for (let t of this.fields) if (t.property === e) return t;
        }
      }
      class k {
        constructor(e, t, n) {
          if (!(e instanceof T))
            throw TypeError("container must be a BitStructure");
          if (!Number.isInteger(t) || 0 >= t)
            throw TypeError("bits must be positive integer");
          let r = 8 * e.span,
            i = e.fields.reduce((e, t) => e + t.bits, 0);
          if (t + i > r)
            throw Error(
              "bits too long for span remainder (" +
                (r - i) +
                " of " +
                r +
                " remain)"
            );
          (this.container = e),
            (this.bits = t),
            (this.valueMask = (1 << t) - 1),
            32 === t && (this.valueMask = 4294967295),
            (this.start = i),
            this.container.msb && (this.start = r - i - t),
            (this.wordMask = M(this.valueMask << this.start)),
            (this.property = n);
        }
        decode() {
          return (
            M(this.container._packedGetValue() & this.wordMask) >>> this.start
          );
        }
        encode(e) {
          if (!Number.isInteger(e) || e !== M(e & this.valueMask))
            throw TypeError(
              s("BitField.encode", this) +
                " value must be integer not exceeding " +
                this.valueMask
            );
          let t = this.container._packedGetValue(),
            n = M(e << this.start);
          this.container._packedSetValue(M(t & ~this.wordMask) | n);
        }
      }
      class B extends k {
        constructor(e, t) {
          super(e, 1, t);
        }
        decode(e, t) {
          return !!k.prototype.decode.call(this, e, t);
        }
        encode(e) {
          return (
            "boolean" == typeof e && (e = +e), k.prototype.encode.call(this, e)
          );
        }
      }
      class _ extends i {
        constructor(e, t) {
          if (
            !(
              (e instanceof o && e.isCount()) ||
              (Number.isInteger(e) && 0 <= e)
            )
          )
            throw TypeError(
              "length must be positive integer or an unsigned integer ExternalLayout"
            );
          let n = -1;
          e instanceof o || (n = e), super(n, t), (this.length = e);
        }
        getSpan(e, t) {
          let n = this.span;
          return 0 > n && (n = this.length.decode(e, t)), n;
        }
        decode(e, t) {
          void 0 === t && (t = 0);
          let n = this.span;
          return 0 > n && (n = this.length.decode(e, t)), e.slice(t, t + n);
        }
        encode(e, t, n) {
          let i = this.length;
          if (
            (this.length instanceof o && (i = e.length),
            !(r.isBuffer(e) && i === e.length))
          )
            throw TypeError(
              s("Blob.encode", this) +
                " requires (length " +
                i +
                ") Buffer as src"
            );
          if (n + i > t.length) throw RangeError("encoding overruns Buffer");
          return (
            t.write(e.toString("hex"), n, i, "hex"),
            this.length instanceof o && this.length.encode(i, t, n),
            i
          );
        }
      }
      class D extends i {
        constructor(e) {
          super(-1, e);
        }
        getSpan(e, t) {
          if (!r.isBuffer(e)) throw TypeError("b must be a Buffer");
          void 0 === t && (t = 0);
          let n = t;
          for (; n < e.length && 0 !== e[n]; ) n += 1;
          return 1 + n - t;
        }
        decode(e, t, n) {
          void 0 === t && (t = 0);
          let r = this.getSpan(e, t);
          return e.slice(t, t + r - 1).toString("utf-8");
        }
        encode(e, t, n) {
          void 0 === n && (n = 0), "string" != typeof e && (e = e.toString());
          let i = new r(e, "utf8"),
            s = i.length;
          if (n + s > t.length) throw RangeError("encoding overruns Buffer");
          return i.copy(t, n), (t[n + s] = 0), s + 1;
        }
      }
      class U extends i {
        constructor(e, t) {
          if (
            ("string" == typeof e && void 0 === t && ((t = e), (e = void 0)),
            void 0 === e)
          )
            e = -1;
          else if (!Number.isInteger(e))
            throw TypeError("maxSpan must be an integer");
          super(-1, t), (this.maxSpan = e);
        }
        getSpan(e, t) {
          if (!r.isBuffer(e)) throw TypeError("b must be a Buffer");
          return void 0 === t && (t = 0), e.length - t;
        }
        decode(e, t, n) {
          void 0 === t && (t = 0);
          let r = this.getSpan(e, t);
          if (0 <= this.maxSpan && this.maxSpan < r)
            throw RangeError("text length exceeds maxSpan");
          return e.slice(t, t + r).toString("utf-8");
        }
        encode(e, t, n) {
          void 0 === n && (n = 0), "string" != typeof e && (e = e.toString());
          let i = new r(e, "utf8"),
            s = i.length;
          if (0 <= this.maxSpan && this.maxSpan < s)
            throw RangeError("text length exceeds maxSpan");
          if (n + s > t.length) throw RangeError("encoding overruns Buffer");
          return i.copy(t, n), s;
        }
      }
      class j extends i {
        constructor(e, t) {
          super(0, t), (this.value = e);
        }
        decode(e, t, n) {
          return this.value;
        }
        encode(e, t, n) {
          return 0;
        }
      }
      (t.ExternalLayout = o),
        (t.GreedyCount = u),
        (t.OffsetLayout = a),
        (t.UInt = c),
        (t.UIntBE = d),
        (t.Int = l),
        (t.IntBE = h),
        (t.Float = v),
        (t.FloatBE = b),
        (t.Double = E),
        (t.DoubleBE = x),
        (t.Sequence = N),
        (t.Structure = L),
        (t.UnionDiscriminator = S),
        (t.UnionLayoutDiscriminator = P),
        (t.Union = O),
        (t.VariantLayout = I),
        (t.BitStructure = T),
        (t.BitField = k),
        (t.Boolean = B),
        (t.Blob = _),
        (t.CString = D),
        (t.UTF8 = U),
        (t.Constant = j),
        (t.greedy = (e, t) => new u(e, t)),
        (t.offset = (e, t, n) => new a(e, t, n)),
        (t.u8 = (e) => new c(1, e)),
        (t.u16 = (e) => new c(2, e)),
        (t.u24 = (e) => new c(3, e)),
        (t.u32 = (e) => new c(4, e)),
        (t.u40 = (e) => new c(5, e)),
        (t.u48 = (e) => new c(6, e)),
        (t.nu64 = (e) => new g(e)),
        (t.u16be = (e) => new d(2, e)),
        (t.u24be = (e) => new d(3, e)),
        (t.u32be = (e) => new d(4, e)),
        (t.u40be = (e) => new d(5, e)),
        (t.u48be = (e) => new d(6, e)),
        (t.nu64be = (e) => new w(e)),
        (t.s8 = (e) => new l(1, e)),
        (t.s16 = (e) => new l(2, e)),
        (t.s24 = (e) => new l(3, e)),
        (t.s32 = (e) => new l(4, e)),
        (t.s40 = (e) => new l(5, e)),
        (t.s48 = (e) => new l(6, e)),
        (t.ns64 = (e) => new m(e)),
        (t.s16be = (e) => new h(2, e)),
        (t.s24be = (e) => new h(3, e)),
        (t.s32be = (e) => new h(4, e)),
        (t.s40be = (e) => new h(5, e)),
        (t.s48be = (e) => new h(6, e)),
        (t.ns64be = (e) => new y(e)),
        (t.f32 = (e) => new v(e)),
        (t.f32be = (e) => new b(e)),
        (t.f64 = (e) => new E(e)),
        (t.f64be = (e) => new x(e)),
        (t.struct = (e, t, n) => new L(e, t, n)),
        (t.bits = (e, t, n) => new T(e, t, n)),
        (t.seq = (e, t, n) => new N(e, t, n)),
        (t.union = (e, t, n) => new O(e, t, n)),
        (t.unionLayoutDiscriminator = (e, t) => new P(e, t)),
        (t.blob = (e, t) => new _(e, t)),
        (t.cstr = (e) => new D(e)),
        (t.utf8 = (e, t) => new U(e, t)),
        (t.const = (e, t) => new j(e, t));
    },
    2879: function (e) {
      let t = /[\p{Lu}]/u,
        n = /[\p{Ll}]/u,
        r = /^[\p{Lu}](?![\p{Lu}])/gu,
        i = /([\p{Alpha}\p{N}_]|$)/u,
        s = /[_.\- ]+/,
        o = RegExp("^" + s.source),
        u = RegExp(s.source + i.source, "gu"),
        a = RegExp("\\d+" + i.source, "gu"),
        c = (e, r, i) => {
          let s = !1,
            o = !1,
            u = !1;
          for (let a = 0; a < e.length; a++) {
            let c = e[a];
            s && t.test(c)
              ? ((e = e.slice(0, a) + "-" + e.slice(a)),
                (s = !1),
                (u = o),
                (o = !0),
                a++)
              : o && u && n.test(c)
              ? ((e = e.slice(0, a - 1) + "-" + e.slice(a - 1)),
                (u = o),
                (o = !1),
                (s = !0))
              : ((s = r(c) === c && i(c) !== c),
                (u = o),
                (o = i(c) === c && r(c) !== c));
          }
          return e;
        },
        d = (e, t) => ((r.lastIndex = 0), e.replace(r, (e) => t(e))),
        l = (e, t) => (
          (u.lastIndex = 0),
          (a.lastIndex = 0),
          e.replace(u, (e, n) => t(n)).replace(a, (e) => t(e))
        ),
        h = (e, t) => {
          if (!("string" == typeof e || Array.isArray(e)))
            throw TypeError("Expected the input to be `string | string[]`");
          if (
            ((t = { pascalCase: !1, preserveConsecutiveUppercase: !1, ...t }),
            0 ===
              (e = Array.isArray(e)
                ? e
                    .map((e) => e.trim())
                    .filter((e) => e.length)
                    .join("-")
                : e.trim()).length)
          )
            return "";
          let n =
              !1 === t.locale
                ? (e) => e.toLowerCase()
                : (e) => e.toLocaleLowerCase(t.locale),
            r =
              !1 === t.locale
                ? (e) => e.toUpperCase()
                : (e) => e.toLocaleUpperCase(t.locale);
          return 1 === e.length
            ? t.pascalCase
              ? r(e)
              : n(e)
            : (e !== n(e) && (e = c(e, n, r)),
              (e = e.replace(o, "")),
              (e = t.preserveConsecutiveUppercase ? d(e, n) : n(e)),
              t.pascalCase && (e = r(e.charAt(0)) + e.slice(1)),
              l(e, r));
        };
      (e.exports = h), (e.exports.default = h);
    },
    7898: function (e, t, n) {
      n.d(t, {
        default: function () {
          return i.a;
        },
      });
      var r = n(1493),
        i = n.n(r);
    },
    1493: function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let r = n(9742);
      n(1773), n(5789);
      let i = r._(n(5929));
      function s(e, t) {
        var n;
        let r = {
          loading: (e) => {
            let { error: t, isLoading: n, pastDelay: r } = e;
            return null;
          },
        };
        "function" == typeof e && (r.loader = e);
        let s = { ...r, ...t };
        return (0, i.default)({
          ...s,
          modules: null == (n = s.loadableGenerated) ? void 0 : n.modules,
        });
      }
      ("function" == typeof t.default ||
        ("object" == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, "__esModule", { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    5046: function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "BailoutToCSR", {
          enumerable: !0,
          get: function () {
            return i;
          },
        });
      let r = n(2143);
      function i(e) {
        let { reason: t, children: n } = e;
        if ("undefined" == typeof window) throw new r.BailoutToCSRError(t);
        return n;
      }
    },
    5929: function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "default", {
          enumerable: !0,
          get: function () {
            return c;
          },
        });
      let r = n(1773),
        i = n(5789),
        s = n(5046),
        o = n(4820);
      function u(e) {
        return { default: e && "default" in e ? e.default : e };
      }
      let a = {
          loader: () => Promise.resolve(u(() => null)),
          loading: null,
          ssr: !0,
        },
        c = function (e) {
          let t = { ...a, ...e },
            n = (0, i.lazy)(() => t.loader().then(u)),
            c = t.loading;
          function d(e) {
            let u = c
                ? (0, r.jsx)(c, { isLoading: !0, pastDelay: !0, error: null })
                : null,
              a = t.ssr
                ? (0, r.jsxs)(r.Fragment, {
                    children: [
                      "undefined" == typeof window
                        ? (0, r.jsx)(o.PreloadCss, { moduleIds: t.modules })
                        : null,
                      (0, r.jsx)(n, { ...e }),
                    ],
                  })
                : (0, r.jsx)(s.BailoutToCSR, {
                    reason: "next/dynamic",
                    children: (0, r.jsx)(n, { ...e }),
                  });
            return (0, r.jsx)(i.Suspense, { fallback: u, children: a });
          }
          return (d.displayName = "LoadableComponent"), d;
        };
    },
    4820: function (e, t, n) {
      Object.defineProperty(t, "__esModule", { value: !0 }),
        Object.defineProperty(t, "PreloadCss", {
          enumerable: !0,
          get: function () {
            return s;
          },
        });
      let r = n(1773),
        i = n(4770);
      function s(e) {
        let { moduleIds: t } = e;
        if ("undefined" != typeof window) return null;
        let n = (0, i.getExpectedRequestStore)("next/dynamic css"),
          s = [];
        if (n.reactLoadableManifest && t) {
          let e = n.reactLoadableManifest;
          for (let n of t) {
            if (!e[n]) continue;
            let t = e[n].files.filter((e) => e.endsWith(".css"));
            s.push(...t);
          }
        }
        return 0 === s.length
          ? null
          : (0, r.jsx)(r.Fragment, {
              children: s.map((e) =>
                (0, r.jsx)(
                  "link",
                  {
                    precedence: "dynamic",
                    rel: "stylesheet",
                    href: n.assetPrefix + "/_next/" + encodeURI(e),
                    as: "style",
                  },
                  e
                )
              ),
            });
      }
    },
    5336: function (e, t, n) {
      n.d(t, {
        H_: function () {
          return i;
        },
      });
      var r = n(4482);
      let i = new r.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
      new r.PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"),
        new r.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
        new r.PublicKey("So11111111111111111111111111111111111111112"),
        new r.PublicKey("9pan9bMn5HatX4EJdBwg9VgCa7Uz5HL8N1m5D3NdXejP");
    },
    9145: function (e, t, n) {
      var r,
        i,
        s = "0123456789abcdef",
        o =
          "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
        u =
          "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
        a = {
          precision: 20,
          rounding: 4,
          modulo: 1,
          toExpNeg: -7,
          toExpPos: 21,
          minE: -9e15,
          maxE: 9e15,
          crypto: !1,
        },
        c = !0,
        d = "[DecimalError] ",
        l = d + "Invalid argument: ",
        h = d + "Precision limit exceeded",
        f = d + "crypto unavailable",
        p = "[object Decimal]",
        g = Math.floor,
        w = Math.pow,
        m = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
        y = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
        v = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
        b = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        E = o.length - 1,
        x = u.length - 1,
        N = { toStringTag: p };
      function L(e) {
        var t,
          n,
          r,
          i = e.length - 1,
          s = "",
          o = e[0];
        if (i > 0) {
          for (s += o, t = 1; t < i; t++)
            (n = 7 - (r = e[t] + "").length) && (s += U(n)), (s += r);
          (n = 7 - (r = (o = e[t]) + "").length) && (s += U(n));
        } else if (0 === o) return "0";
        for (; o % 10 == 0; ) o /= 10;
        return s + o;
      }
      function S(e, t, n) {
        if (e !== ~~e || e < t || e > n) throw Error(l + e);
      }
      function P(e, t, n, r) {
        var i, s, o, u;
        for (s = e[0]; s >= 10; s /= 10) --t;
        return (
          --t < 0
            ? ((t += 7), (i = 0))
            : ((i = Math.ceil((t + 1) / 7)), (t %= 7)),
          (s = w(10, 7 - t)),
          (u = e[i] % s | 0),
          null == r
            ? t < 3
              ? (0 == t ? (u = (u / 100) | 0) : 1 == t && (u = (u / 10) | 0),
                (o =
                  (n < 4 && 99999 == u) ||
                  (n > 3 && 49999 == u) ||
                  5e4 == u ||
                  0 == u))
              : (o =
                  (((n < 4 && u + 1 == s) || (n > 3 && u + 1 == s / 2)) &&
                    ((e[i + 1] / s / 100) | 0) == w(10, t - 2) - 1) ||
                  ((u == s / 2 || 0 == u) && ((e[i + 1] / s / 100) | 0) == 0))
            : t < 4
            ? (0 == t
                ? (u = (u / 1e3) | 0)
                : 1 == t
                ? (u = (u / 100) | 0)
                : 2 == t && (u = (u / 10) | 0),
              (o = ((r || n < 4) && 9999 == u) || (!r && n > 3 && 4999 == u)))
            : (o =
                (((r || n < 4) && u + 1 == s) ||
                  (!r && n > 3 && u + 1 == s / 2)) &&
                ((e[i + 1] / s / 1e3) | 0) == w(10, t - 3) - 1),
          o
        );
      }
      function O(e, t, n) {
        for (var r, i, o = [0], u = 0, a = e.length; u < a; ) {
          for (i = o.length; i--; ) o[i] *= t;
          for (o[0] += s.indexOf(e.charAt(u++)), r = 0; r < o.length; r++)
            o[r] > n - 1 &&
              (void 0 === o[r + 1] && (o[r + 1] = 0),
              (o[r + 1] += (o[r] / n) | 0),
              (o[r] %= n));
        }
        return o.reverse();
      }
      (N.absoluteValue = N.abs =
        function () {
          var e = new this.constructor(this);
          return e.s < 0 && (e.s = 1), M(e);
        }),
        (N.ceil = function () {
          return M(new this.constructor(this), this.e + 1, 2);
        }),
        (N.clampedTo = N.clamp =
          function (e, t) {
            var n = this.constructor;
            if (((e = new n(e)), (t = new n(t)), !e.s || !t.s))
              return new n(NaN);
            if (e.gt(t)) throw Error(l + t);
            return 0 > this.cmp(e) ? e : this.cmp(t) > 0 ? t : new n(this);
          }),
        (N.comparedTo = N.cmp =
          function (e) {
            var t,
              n,
              r,
              i,
              s = this.d,
              o = (e = new this.constructor(e)).d,
              u = this.s,
              a = e.s;
            if (!s || !o)
              return u && a
                ? u !== a
                  ? u
                  : s === o
                  ? 0
                  : !s ^ (u < 0)
                  ? 1
                  : -1
                : NaN;
            if (!s[0] || !o[0]) return s[0] ? u : o[0] ? -a : 0;
            if (u !== a) return u;
            if (this.e !== e.e) return (this.e > e.e) ^ (u < 0) ? 1 : -1;
            for (t = 0, n = (r = s.length) < (i = o.length) ? r : i; t < n; ++t)
              if (s[t] !== o[t]) return (s[t] > o[t]) ^ (u < 0) ? 1 : -1;
            return r === i ? 0 : (r > i) ^ (u < 0) ? 1 : -1;
          }),
        (N.cosine = N.cos =
          function () {
            var e,
              t,
              n = this,
              r = n.constructor;
            return n.d
              ? n.d[0]
                ? ((e = r.precision),
                  (t = r.rounding),
                  (r.precision = e + Math.max(n.e, n.sd()) + 7),
                  (r.rounding = 1),
                  (n = (function (e, t) {
                    var n, r, i;
                    if (t.isZero()) return t;
                    (r = t.d.length) < 32
                      ? (i = (1 / H(4, (n = Math.ceil(r / 3)))).toString())
                      : ((n = 16), (i = "2.3283064365386962890625e-10")),
                      (e.precision += n),
                      (t = Z(e, 1, t.times(i), new e(1)));
                    for (var s = n; s--; ) {
                      var o = t.times(t);
                      t = o.times(o).minus(o).times(8).plus(1);
                    }
                    return (e.precision -= n), t;
                  })(r, G(r, n))),
                  (r.precision = e),
                  (r.rounding = t),
                  M(2 == i || 3 == i ? n.neg() : n, e, t, !0))
                : new r(1)
              : new r(NaN);
          }),
        (N.cubeRoot = N.cbrt =
          function () {
            var e,
              t,
              n,
              r,
              i,
              s,
              o,
              u,
              a,
              d,
              l = this.constructor;
            if (!this.isFinite() || this.isZero()) return new l(this);
            for (
              c = !1,
                (s = this.s * w(this.s * this, 1 / 3)) && Math.abs(s) != 1 / 0
                  ? (r = new l(s.toString()))
                  : ((n = L(this.d)),
                    (s = ((e = this.e) - n.length + 1) % 3) &&
                      (n += 1 == s || -2 == s ? "0" : "00"),
                    (s = w(n, 1 / 3)),
                    (e = g((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2))),
                    ((r = new l(
                      (n =
                        s == 1 / 0
                          ? "5e" + e
                          : (n = s.toExponential()).slice(
                              0,
                              n.indexOf("e") + 1
                            ) + e)
                    )).s = this.s)),
                o = (e = l.precision) + 3;
              ;

            )
              if (
                ((r = I(
                  (d = (a = (u = r).times(u).times(u)).plus(this))
                    .plus(this)
                    .times(u),
                  d.plus(a),
                  o + 2,
                  1
                )),
                L(u.d).slice(0, o) === (n = L(r.d)).slice(0, o))
              ) {
                if (
                  "9999" != (n = n.slice(o - 3, o + 1)) &&
                  (i || "4999" != n)
                ) {
                  (+n && (+n.slice(1) || "5" != n.charAt(0))) ||
                    (M(r, e + 1, 1), (t = !r.times(r).times(r).eq(this)));
                  break;
                }
                if (!i && (M(u, e + 1, 0), u.times(u).times(u).eq(this))) {
                  r = u;
                  break;
                }
                (o += 4), (i = 1);
              }
            return (c = !0), M(r, e, l.rounding, t);
          }),
        (N.decimalPlaces = N.dp =
          function () {
            var e,
              t = this.d,
              n = NaN;
            if (t) {
              if (((n = ((e = t.length - 1) - g(this.e / 7)) * 7), (e = t[e])))
                for (; e % 10 == 0; e /= 10) n--;
              n < 0 && (n = 0);
            }
            return n;
          }),
        (N.dividedBy = N.div =
          function (e) {
            return I(this, new this.constructor(e));
          }),
        (N.dividedToIntegerBy = N.divToInt =
          function (e) {
            var t = this.constructor;
            return M(I(this, new t(e), 0, 1, 1), t.precision, t.rounding);
          }),
        (N.equals = N.eq =
          function (e) {
            return 0 === this.cmp(e);
          }),
        (N.floor = function () {
          return M(new this.constructor(this), this.e + 1, 3);
        }),
        (N.greaterThan = N.gt =
          function (e) {
            return this.cmp(e) > 0;
          }),
        (N.greaterThanOrEqualTo = N.gte =
          function (e) {
            var t = this.cmp(e);
            return 1 == t || 0 === t;
          }),
        (N.hyperbolicCosine = N.cosh =
          function () {
            var e,
              t,
              n,
              r,
              i,
              s = this,
              o = s.constructor,
              u = new o(1);
            if (!s.isFinite()) return new o(s.s ? 1 / 0 : NaN);
            if (s.isZero()) return u;
            (n = o.precision),
              (r = o.rounding),
              (o.precision = n + Math.max(s.e, s.sd()) + 4),
              (o.rounding = 1),
              (i = s.d.length) < 32
                ? (t = (1 / H(4, (e = Math.ceil(i / 3)))).toString())
                : ((e = 16), (t = "2.3283064365386962890625e-10")),
              (s = Z(o, 1, s.times(t), new o(1), !0));
            for (var a, c = e, d = new o(8); c--; )
              (a = s.times(s)), (s = u.minus(a.times(d.minus(a.times(d)))));
            return M(s, (o.precision = n), (o.rounding = r), !0);
          }),
        (N.hyperbolicSine = N.sinh =
          function () {
            var e,
              t,
              n,
              r,
              i = this,
              s = i.constructor;
            if (!i.isFinite() || i.isZero()) return new s(i);
            if (
              ((t = s.precision),
              (n = s.rounding),
              (s.precision = t + Math.max(i.e, i.sd()) + 4),
              (s.rounding = 1),
              (r = i.d.length) < 3)
            )
              i = Z(s, 2, i, i, !0);
            else {
              (e = (e = 1.4 * Math.sqrt(r)) > 16 ? 16 : 0 | e),
                (i = Z(s, 2, (i = i.times(1 / H(5, e))), i, !0));
              for (var o, u = new s(5), a = new s(16), c = new s(20); e--; )
                (o = i.times(i)),
                  (i = i.times(u.plus(o.times(a.times(o).plus(c)))));
            }
            return (s.precision = t), (s.rounding = n), M(i, t, n, !0);
          }),
        (N.hyperbolicTangent = N.tanh =
          function () {
            var e,
              t,
              n = this.constructor;
            return this.isFinite()
              ? this.isZero()
                ? new n(this)
                : ((e = n.precision),
                  (t = n.rounding),
                  (n.precision = e + 7),
                  (n.rounding = 1),
                  I(
                    this.sinh(),
                    this.cosh(),
                    (n.precision = e),
                    (n.rounding = t)
                  ))
              : new n(this.s);
          }),
        (N.inverseCosine = N.acos =
          function () {
            var e,
              t = this,
              n = t.constructor,
              r = t.abs().cmp(1),
              i = n.precision,
              s = n.rounding;
            return -1 !== r
              ? 0 === r
                ? t.isNeg()
                  ? _(n, i, s)
                  : new n(0)
                : new n(NaN)
              : t.isZero()
              ? _(n, i + 4, s).times(0.5)
              : ((n.precision = i + 6),
                (n.rounding = 1),
                (t = t.asin()),
                (e = _(n, i + 4, s).times(0.5)),
                (n.precision = i),
                (n.rounding = s),
                e.minus(t));
          }),
        (N.inverseHyperbolicCosine = N.acosh =
          function () {
            var e,
              t,
              n = this,
              r = n.constructor;
            return n.lte(1)
              ? new r(n.eq(1) ? 0 : NaN)
              : n.isFinite()
              ? ((e = r.precision),
                (t = r.rounding),
                (r.precision = e + Math.max(Math.abs(n.e), n.sd()) + 4),
                (r.rounding = 1),
                (c = !1),
                (n = n.times(n).minus(1).sqrt().plus(n)),
                (c = !0),
                (r.precision = e),
                (r.rounding = t),
                n.ln())
              : new r(n);
          }),
        (N.inverseHyperbolicSine = N.asinh =
          function () {
            var e,
              t,
              n = this,
              r = n.constructor;
            return !n.isFinite() || n.isZero()
              ? new r(n)
              : ((e = r.precision),
                (t = r.rounding),
                (r.precision = e + 2 * Math.max(Math.abs(n.e), n.sd()) + 6),
                (r.rounding = 1),
                (c = !1),
                (n = n.times(n).plus(1).sqrt().plus(n)),
                (c = !0),
                (r.precision = e),
                (r.rounding = t),
                n.ln());
          }),
        (N.inverseHyperbolicTangent = N.atanh =
          function () {
            var e,
              t,
              n,
              r,
              i = this,
              s = i.constructor;
            return i.isFinite()
              ? i.e >= 0
                ? new s(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN)
                : ((e = s.precision),
                  (t = s.rounding),
                  Math.max((r = i.sd()), e) < -(2 * i.e) - 1)
                ? M(new s(i), e, t, !0)
                : ((s.precision = n = r - i.e),
                  (i = I(i.plus(1), new s(1).minus(i), n + e, 1)),
                  (s.precision = e + 4),
                  (s.rounding = 1),
                  (i = i.ln()),
                  (s.precision = e),
                  (s.rounding = t),
                  i.times(0.5))
              : new s(NaN);
          }),
        (N.inverseSine = N.asin =
          function () {
            var e,
              t,
              n,
              r,
              i = this,
              s = i.constructor;
            return i.isZero()
              ? new s(i)
              : ((t = i.abs().cmp(1)),
                (n = s.precision),
                (r = s.rounding),
                -1 !== t)
              ? 0 === t
                ? (((e = _(s, n + 4, r).times(0.5)).s = i.s), e)
                : new s(NaN)
              : ((s.precision = n + 6),
                (s.rounding = 1),
                (i = i.div(new s(1).minus(i.times(i)).sqrt().plus(1)).atan()),
                (s.precision = n),
                (s.rounding = r),
                i.times(2));
          }),
        (N.inverseTangent = N.atan =
          function () {
            var e,
              t,
              n,
              r,
              i,
              s,
              o,
              u,
              a,
              d = this,
              l = d.constructor,
              h = l.precision,
              f = l.rounding;
            if (d.isFinite()) {
              if (d.isZero()) return new l(d);
              if (d.abs().eq(1) && h + 4 <= x)
                return ((o = _(l, h + 4, f).times(0.25)).s = d.s), o;
            } else {
              if (!d.s) return new l(NaN);
              if (h + 4 <= x)
                return ((o = _(l, h + 4, f).times(0.5)).s = d.s), o;
            }
            for (
              l.precision = u = h + 10,
                l.rounding = 1,
                e = n = Math.min(28, (u / 7 + 2) | 0);
              e;
              --e
            )
              d = d.div(d.times(d).plus(1).sqrt().plus(1));
            for (
              c = !1,
                t = Math.ceil(u / 7),
                r = 1,
                a = d.times(d),
                o = new l(d),
                i = d;
              -1 !== e;

            )
              if (
                ((i = i.times(a)),
                (s = o.minus(i.div((r += 2)))),
                (i = i.times(a)),
                void 0 !== (o = s.plus(i.div((r += 2)))).d[t])
              )
                for (e = t; o.d[e] === s.d[e] && e--; );
            return (
              n && (o = o.times(2 << (n - 1))),
              (c = !0),
              M(o, (l.precision = h), (l.rounding = f), !0)
            );
          }),
        (N.isFinite = function () {
          return !!this.d;
        }),
        (N.isInteger = N.isInt =
          function () {
            return !!this.d && g(this.e / 7) > this.d.length - 2;
          }),
        (N.isNaN = function () {
          return !this.s;
        }),
        (N.isNegative = N.isNeg =
          function () {
            return this.s < 0;
          }),
        (N.isPositive = N.isPos =
          function () {
            return this.s > 0;
          }),
        (N.isZero = function () {
          return !!this.d && 0 === this.d[0];
        }),
        (N.lessThan = N.lt =
          function (e) {
            return 0 > this.cmp(e);
          }),
        (N.lessThanOrEqualTo = N.lte =
          function (e) {
            return 1 > this.cmp(e);
          }),
        (N.logarithm = N.log =
          function (e) {
            var t,
              n,
              r,
              i,
              s,
              o,
              u,
              a = this.constructor,
              d = a.precision,
              l = a.rounding;
            if (null == e) (e = new a(10)), (t = !0);
            else {
              if (((n = (e = new a(e)).d), e.s < 0 || !n || !n[0] || e.eq(1)))
                return new a(NaN);
              t = e.eq(10);
            }
            if (((n = this.d), this.s < 0 || !n || !n[0] || this.eq(1)))
              return new a(
                n && !n[0] ? -1 / 0 : 1 != this.s ? NaN : n ? 0 : 1 / 0
              );
            if (t) {
              if (n.length > 1) i = !0;
              else {
                for (r = n[0]; r % 10 == 0; ) r /= 10;
                i = 1 !== r;
              }
            }
            if (
              ((c = !1),
              P(
                (u = I(F(this, (o = d + 5)), t ? B(a, o + 10) : F(e, o), o, 1))
                  .d,
                (r = d),
                l
              ))
            )
              do
                if (
                  ((o += 10),
                  (u = I(F(this, o), t ? B(a, o + 10) : F(e, o), o, 1)),
                  !i)
                ) {
                  +L(u.d).slice(r + 1, r + 15) + 1 == 1e14 &&
                    (u = M(u, d + 1, 0));
                  break;
                }
              while (P(u.d, (r += 10), l));
            return (c = !0), M(u, d, l);
          }),
        (N.minus = N.sub =
          function (e) {
            var t,
              n,
              r,
              i,
              s,
              o,
              u,
              a,
              d,
              l,
              h,
              f,
              p = this.constructor;
            if (((e = new p(e)), !this.d || !e.d))
              return (
                this.s && e.s
                  ? this.d
                    ? (e.s = -e.s)
                    : (e = new p(e.d || this.s !== e.s ? this : NaN))
                  : (e = new p(NaN)),
                e
              );
            if (this.s != e.s) return (e.s = -e.s), this.plus(e);
            if (
              ((d = this.d),
              (f = e.d),
              (u = p.precision),
              (a = p.rounding),
              !d[0] || !f[0])
            ) {
              if (f[0]) e.s = -e.s;
              else {
                if (!d[0]) return new p(3 === a ? -0 : 0);
                e = new p(this);
              }
              return c ? M(e, u, a) : e;
            }
            if (
              ((n = g(e.e / 7)),
              (l = g(this.e / 7)),
              (d = d.slice()),
              (s = l - n))
            ) {
              for (
                (h = s < 0)
                  ? ((t = d), (s = -s), (o = f.length))
                  : ((t = f), (n = l), (o = d.length)),
                  s > (r = Math.max(Math.ceil(u / 7), o) + 2) &&
                    ((s = r), (t.length = 1)),
                  t.reverse(),
                  r = s;
                r--;

              )
                t.push(0);
              t.reverse();
            } else {
              for (
                (h = (r = d.length) < (o = f.length)) && (o = r), r = 0;
                r < o;
                r++
              )
                if (d[r] != f[r]) {
                  h = d[r] < f[r];
                  break;
                }
              s = 0;
            }
            for (
              h && ((t = d), (d = f), (f = t), (e.s = -e.s)),
                o = d.length,
                r = f.length - o;
              r > 0;
              --r
            )
              d[o++] = 0;
            for (r = f.length; r > s; ) {
              if (d[--r] < f[r]) {
                for (i = r; i && 0 === d[--i]; ) d[i] = 1e7 - 1;
                --d[i], (d[r] += 1e7);
              }
              d[r] -= f[r];
            }
            for (; 0 === d[--o]; ) d.pop();
            for (; 0 === d[0]; d.shift()) --n;
            return d[0]
              ? ((e.d = d), (e.e = k(d, n)), c ? M(e, u, a) : e)
              : new p(3 === a ? -0 : 0);
          }),
        (N.modulo = N.mod =
          function (e) {
            var t,
              n = this.constructor;
            return ((e = new n(e)), this.d && e.s && (!e.d || e.d[0]))
              ? e.d && (!this.d || this.d[0])
                ? ((c = !1),
                  9 == n.modulo
                    ? ((t = I(this, e.abs(), 0, 3, 1)), (t.s *= e.s))
                    : (t = I(this, e, 0, n.modulo, 1)),
                  (t = t.times(e)),
                  (c = !0),
                  this.minus(t))
                : M(new n(this), n.precision, n.rounding)
              : new n(NaN);
          }),
        (N.naturalExponential = N.exp =
          function () {
            return A(this);
          }),
        (N.naturalLogarithm = N.ln =
          function () {
            return F(this);
          }),
        (N.negated = N.neg =
          function () {
            var e = new this.constructor(this);
            return (e.s = -e.s), M(e);
          }),
        (N.plus = N.add =
          function (e) {
            var t,
              n,
              r,
              i,
              s,
              o,
              u,
              a,
              d,
              l,
              h = this.constructor;
            if (((e = new h(e)), !this.d || !e.d))
              return (
                this.s && e.s
                  ? this.d || (e = new h(e.d || this.s === e.s ? this : NaN))
                  : (e = new h(NaN)),
                e
              );
            if (this.s != e.s) return (e.s = -e.s), this.minus(e);
            if (
              ((d = this.d),
              (l = e.d),
              (u = h.precision),
              (a = h.rounding),
              !d[0] || !l[0])
            )
              return l[0] || (e = new h(this)), c ? M(e, u, a) : e;
            if (
              ((s = g(this.e / 7)),
              (r = g(e.e / 7)),
              (d = d.slice()),
              (i = s - r))
            ) {
              for (
                i < 0
                  ? ((n = d), (i = -i), (o = l.length))
                  : ((n = l), (r = s), (o = d.length)),
                  i > (o = (s = Math.ceil(u / 7)) > o ? s + 1 : o + 1) &&
                    ((i = o), (n.length = 1)),
                  n.reverse();
                i--;

              )
                n.push(0);
              n.reverse();
            }
            for (
              (o = d.length) - (i = l.length) < 0 &&
                ((i = o), (n = l), (l = d), (d = n)),
                t = 0;
              i;

            )
              (t = ((d[--i] = d[i] + l[i] + t) / 1e7) | 0), (d[i] %= 1e7);
            for (t && (d.unshift(t), ++r), o = d.length; 0 == d[--o]; ) d.pop();
            return (e.d = d), (e.e = k(d, r)), c ? M(e, u, a) : e;
          }),
        (N.precision = N.sd =
          function (e) {
            var t;
            if (void 0 !== e && !!e !== e && 1 !== e && 0 !== e)
              throw Error(l + e);
            return (
              this.d
                ? ((t = D(this.d)), e && this.e + 1 > t && (t = this.e + 1))
                : (t = NaN),
              t
            );
          }),
        (N.round = function () {
          var e = this.constructor;
          return M(new e(this), this.e + 1, e.rounding);
        }),
        (N.sine = N.sin =
          function () {
            var e,
              t,
              n = this,
              r = n.constructor;
            return n.isFinite()
              ? n.isZero()
                ? new r(n)
                : ((e = r.precision),
                  (t = r.rounding),
                  (r.precision = e + Math.max(n.e, n.sd()) + 7),
                  (r.rounding = 1),
                  (n = (function (e, t) {
                    var n,
                      r = t.d.length;
                    if (r < 3) return t.isZero() ? t : Z(e, 2, t, t);
                    (n = (n = 1.4 * Math.sqrt(r)) > 16 ? 16 : 0 | n),
                      (t = Z(e, 2, (t = t.times(1 / H(5, n))), t));
                    for (
                      var i, s = new e(5), o = new e(16), u = new e(20);
                      n--;

                    )
                      (i = t.times(t)),
                        (t = t.times(s.plus(i.times(o.times(i).minus(u)))));
                    return t;
                  })(r, G(r, n))),
                  (r.precision = e),
                  (r.rounding = t),
                  M(i > 2 ? n.neg() : n, e, t, !0))
              : new r(NaN);
          }),
        (N.squareRoot = N.sqrt =
          function () {
            var e,
              t,
              n,
              r,
              i,
              s,
              o = this.d,
              u = this.e,
              a = this.s,
              d = this.constructor;
            if (1 !== a || !o || !o[0])
              return new d(
                !a || (a < 0 && (!o || o[0])) ? NaN : o ? this : 1 / 0
              );
            for (
              c = !1,
                0 == (a = Math.sqrt(+this)) || a == 1 / 0
                  ? (((t = L(o)).length + u) % 2 == 0 && (t += "0"),
                    (a = Math.sqrt(t)),
                    (u = g((u + 1) / 2) - (u < 0 || u % 2)),
                    (r = new d(
                      (t =
                        a == 1 / 0
                          ? "5e" + u
                          : (t = a.toExponential()).slice(
                              0,
                              t.indexOf("e") + 1
                            ) + u)
                    )))
                  : (r = new d(a.toString())),
                n = (u = d.precision) + 3;
              ;

            )
              if (
                ((r = (s = r).plus(I(this, s, n + 2, 1)).times(0.5)),
                L(s.d).slice(0, n) === (t = L(r.d)).slice(0, n))
              ) {
                if (
                  "9999" != (t = t.slice(n - 3, n + 1)) &&
                  (i || "4999" != t)
                ) {
                  (+t && (+t.slice(1) || "5" != t.charAt(0))) ||
                    (M(r, u + 1, 1), (e = !r.times(r).eq(this)));
                  break;
                }
                if (!i && (M(s, u + 1, 0), s.times(s).eq(this))) {
                  r = s;
                  break;
                }
                (n += 4), (i = 1);
              }
            return (c = !0), M(r, u, d.rounding, e);
          }),
        (N.tangent = N.tan =
          function () {
            var e,
              t,
              n = this,
              r = n.constructor;
            return n.isFinite()
              ? n.isZero()
                ? new r(n)
                : ((e = r.precision),
                  (t = r.rounding),
                  (r.precision = e + 10),
                  (r.rounding = 1),
                  ((n = n.sin()).s = 1),
                  (n = I(n, new r(1).minus(n.times(n)).sqrt(), e + 10, 0)),
                  (r.precision = e),
                  (r.rounding = t),
                  M(2 == i || 4 == i ? n.neg() : n, e, t, !0))
              : new r(NaN);
          }),
        (N.times = N.mul =
          function (e) {
            var t,
              n,
              r,
              i,
              s,
              o,
              u,
              a,
              d,
              l = this.constructor,
              h = this.d,
              f = (e = new l(e)).d;
            if (((e.s *= this.s), !h || !h[0] || !f || !f[0]))
              return new l(
                e.s && (!h || h[0] || f) && (!f || f[0] || h)
                  ? h && f
                    ? 0 * e.s
                    : e.s / 0
                  : NaN
              );
            for (
              n = g(this.e / 7) + g(e.e / 7),
                (a = h.length) < (d = f.length) &&
                  ((s = h), (h = f), (f = s), (o = a), (a = d), (d = o)),
                s = [],
                r = o = a + d;
              r--;

            )
              s.push(0);
            for (r = d; --r >= 0; ) {
              for (t = 0, i = a + r; i > r; )
                (u = s[i] + f[r] * h[i - r - 1] + t),
                  (s[i--] = u % 1e7 | 0),
                  (t = (u / 1e7) | 0);
              s[i] = (s[i] + t) % 1e7 | 0;
            }
            for (; !s[--o]; ) s.pop();
            return (
              t ? ++n : s.shift(),
              (e.d = s),
              (e.e = k(s, n)),
              c ? M(e, l.precision, l.rounding) : e
            );
          }),
        (N.toBinary = function (e, t) {
          return K(this, 2, e, t);
        }),
        (N.toDecimalPlaces = N.toDP =
          function (e, t) {
            var n = this,
              r = n.constructor;
            return ((n = new r(n)), void 0 === e)
              ? n
              : (S(e, 0, 1e9),
                void 0 === t ? (t = r.rounding) : S(t, 0, 8),
                M(n, e + n.e + 1, t));
          }),
        (N.toExponential = function (e, t) {
          var n,
            r = this,
            i = r.constructor;
          return (
            void 0 === e
              ? (n = T(r, !0))
              : (S(e, 0, 1e9),
                void 0 === t ? (t = i.rounding) : S(t, 0, 8),
                (n = T((r = M(new i(r), e + 1, t)), !0, e + 1))),
            r.isNeg() && !r.isZero() ? "-" + n : n
          );
        }),
        (N.toFixed = function (e, t) {
          var n,
            r,
            i = this.constructor;
          return (
            void 0 === e
              ? (n = T(this))
              : (S(e, 0, 1e9),
                void 0 === t ? (t = i.rounding) : S(t, 0, 8),
                (n = T(
                  (r = M(new i(this), e + this.e + 1, t)),
                  !1,
                  e + r.e + 1
                ))),
            this.isNeg() && !this.isZero() ? "-" + n : n
          );
        }),
        (N.toFraction = function (e) {
          var t,
            n,
            r,
            i,
            s,
            o,
            u,
            a,
            d,
            h,
            f,
            p,
            g = this.d,
            m = this.constructor;
          if (!g) return new m(this);
          if (
            ((d = n = new m(1)),
            (r = a = new m(0)),
            (o = (s = (t = new m(r)).e = D(g) - this.e - 1) % 7),
            (t.d[0] = w(10, o < 0 ? 7 + o : o)),
            null == e)
          )
            e = s > 0 ? t : d;
          else {
            if (!(u = new m(e)).isInt() || u.lt(d)) throw Error(l + u);
            e = u.gt(t) ? (s > 0 ? t : d) : u;
          }
          for (
            c = !1,
              u = new m(L(g)),
              h = m.precision,
              m.precision = s = 14 * g.length;
            (f = I(u, t, 0, 1, 1)), 1 != (i = n.plus(f.times(r))).cmp(e);

          )
            (n = r),
              (r = i),
              (i = d),
              (d = a.plus(f.times(i))),
              (a = i),
              (i = t),
              (t = u.minus(f.times(i))),
              (u = i);
          return (
            (i = I(e.minus(n), r, 0, 1, 1)),
            (a = a.plus(i.times(d))),
            (n = n.plus(i.times(r))),
            (a.s = d.s = this.s),
            (p =
              1 >
              I(d, r, s, 1)
                .minus(this)
                .abs()
                .cmp(I(a, n, s, 1).minus(this).abs())
                ? [d, r]
                : [a, n]),
            (m.precision = h),
            (c = !0),
            p
          );
        }),
        (N.toHexadecimal = N.toHex =
          function (e, t) {
            return K(this, 16, e, t);
          }),
        (N.toNearest = function (e, t) {
          var n = this,
            r = n.constructor;
          if (((n = new r(n)), null == e)) {
            if (!n.d) return n;
            (e = new r(1)), (t = r.rounding);
          } else {
            if (
              ((e = new r(e)),
              void 0 === t ? (t = r.rounding) : S(t, 0, 8),
              !n.d)
            )
              return e.s ? n : e;
            if (!e.d) return e.s && (e.s = n.s), e;
          }
          return (
            e.d[0]
              ? ((c = !1), (n = I(n, e, 0, t, 1).times(e)), (c = !0), M(n))
              : ((e.s = n.s), (n = e)),
            n
          );
        }),
        (N.toNumber = function () {
          return +this;
        }),
        (N.toOctal = function (e, t) {
          return K(this, 8, e, t);
        }),
        (N.toPower = N.pow =
          function (e) {
            var t,
              n,
              r,
              i,
              s,
              o,
              u = this,
              a = u.constructor,
              d = +(e = new a(e));
            if (!u.d || !e.d || !u.d[0] || !e.d[0]) return new a(w(+u, d));
            if ((u = new a(u)).eq(1)) return u;
            if (((r = a.precision), (s = a.rounding), e.eq(1)))
              return M(u, r, s);
            if (
              (t = g(e.e / 7)) >= e.d.length - 1 &&
              (n = d < 0 ? -d : d) <= 9007199254740991
            )
              return (
                (i = j(a, u, n, r)), e.s < 0 ? new a(1).div(i) : M(i, r, s)
              );
            if ((o = u.s) < 0) {
              if (t < e.d.length - 1) return new a(NaN);
              if (
                ((1 & e.d[t]) == 0 && (o = 1),
                0 == u.e && 1 == u.d[0] && 1 == u.d.length)
              )
                return (u.s = o), u;
            }
            return (t =
              0 != (n = w(+u, d)) && isFinite(n)
                ? new a(n + "").e
                : g(d * (Math.log("0." + L(u.d)) / Math.LN10 + u.e + 1))) >
              a.maxE + 1 || t < a.minE - 1
              ? new a(t > 0 ? o / 0 : 0)
              : ((c = !1),
                (a.rounding = u.s = 1),
                (n = Math.min(12, (t + "").length)),
                (i = A(e.times(F(u, r + n)), r)).d &&
                  P((i = M(i, r + 5, 1)).d, r, s) &&
                  ((t = r + 10),
                  +L((i = M(A(e.times(F(u, t + n)), t), t + 5, 1)).d).slice(
                    r + 1,
                    r + 15
                  ) +
                    1 ==
                    1e14 && (i = M(i, r + 1, 0))),
                (i.s = o),
                (c = !0),
                (a.rounding = s),
                M(i, r, s));
          }),
        (N.toPrecision = function (e, t) {
          var n,
            r = this,
            i = r.constructor;
          return (
            void 0 === e
              ? (n = T(r, r.e <= i.toExpNeg || r.e >= i.toExpPos))
              : (S(e, 1, 1e9),
                void 0 === t ? (t = i.rounding) : S(t, 0, 8),
                (n = T(
                  (r = M(new i(r), e, t)),
                  e <= r.e || r.e <= i.toExpNeg,
                  e
                ))),
            r.isNeg() && !r.isZero() ? "-" + n : n
          );
        }),
        (N.toSignificantDigits = N.toSD =
          function (e, t) {
            var n = this.constructor;
            return (
              void 0 === e
                ? ((e = n.precision), (t = n.rounding))
                : (S(e, 1, 1e9), void 0 === t ? (t = n.rounding) : S(t, 0, 8)),
              M(new n(this), e, t)
            );
          }),
        (N.toString = function () {
          var e = this.constructor,
            t = T(this, this.e <= e.toExpNeg || this.e >= e.toExpPos);
          return this.isNeg() && !this.isZero() ? "-" + t : t;
        }),
        (N.truncated = N.trunc =
          function () {
            return M(new this.constructor(this), this.e + 1, 1);
          }),
        (N.valueOf = N.toJSON =
          function () {
            var e = this.constructor,
              t = T(this, this.e <= e.toExpNeg || this.e >= e.toExpPos);
            return this.isNeg() ? "-" + t : t;
          });
      var I = (function () {
        function e(e, t, n) {
          var r,
            i = 0,
            s = e.length;
          for (e = e.slice(); s--; )
            (r = e[s] * t + i), (e[s] = r % n | 0), (i = (r / n) | 0);
          return i && e.unshift(i), e;
        }
        function t(e, t, n, r) {
          var i, s;
          if (n != r) s = n > r ? 1 : -1;
          else
            for (i = s = 0; i < n; i++)
              if (e[i] != t[i]) {
                s = e[i] > t[i] ? 1 : -1;
                break;
              }
          return s;
        }
        function n(e, t, n, r) {
          for (var i = 0; n--; )
            (e[n] -= i),
              (i = e[n] < t[n] ? 1 : 0),
              (e[n] = i * r + e[n] - t[n]);
          for (; !e[0] && e.length > 1; ) e.shift();
        }
        return function (i, s, o, u, a, c) {
          var d,
            l,
            h,
            f,
            p,
            w,
            m,
            y,
            v,
            b,
            E,
            x,
            N,
            L,
            S,
            P,
            O,
            I,
            T,
            k,
            B = i.constructor,
            _ = i.s == s.s ? 1 : -1,
            D = i.d,
            U = s.d;
          if (!D || !D[0] || !U || !U[0])
            return new B(
              i.s && s.s && (D ? !U || D[0] != U[0] : U)
                ? (D && 0 == D[0]) || !U
                  ? 0 * _
                  : _ / 0
                : NaN
            );
          for (
            c
              ? ((p = 1), (l = i.e - s.e))
              : ((c = 1e7), (p = 7), (l = g(i.e / p) - g(s.e / p))),
              T = U.length,
              O = D.length,
              b = (v = new B(_)).d = [],
              h = 0;
            U[h] == (D[h] || 0);
            h++
          );
          if (
            (U[h] > (D[h] || 0) && l--,
            null == o
              ? ((L = o = B.precision), (u = B.rounding))
              : (L = a ? o + (i.e - s.e) + 1 : o),
            L < 0)
          )
            b.push(1), (w = !0);
          else {
            if (((L = (L / p + 2) | 0), (h = 0), 1 == T)) {
              for (f = 0, U = U[0], L++; (h < O || f) && L--; h++)
                (S = f * c + (D[h] || 0)),
                  (b[h] = (S / U) | 0),
                  (f = S % U | 0);
              w = f || h < O;
            } else {
              for (
                (f = (c / (U[0] + 1)) | 0) > 1 &&
                  ((U = e(U, f, c)),
                  (D = e(D, f, c)),
                  (T = U.length),
                  (O = D.length)),
                  P = T,
                  x = (E = D.slice(0, T)).length;
                x < T;

              )
                E[x++] = 0;
              (k = U.slice()).unshift(0), (I = U[0]), U[1] >= c / 2 && ++I;
              do
                (f = 0),
                  (d = t(U, E, T, x)) < 0
                    ? ((N = E[0]),
                      T != x && (N = N * c + (E[1] || 0)),
                      (f = (N / I) | 0) > 1
                        ? (f >= c && (f = c - 1),
                          (y = (m = e(U, f, c)).length),
                          (x = E.length),
                          1 == (d = t(m, E, y, x)) &&
                            (f--, n(m, T < y ? k : U, y, c)))
                        : (0 == f && (d = f = 1), (m = U.slice())),
                      (y = m.length) < x && m.unshift(0),
                      n(E, m, x, c),
                      -1 == d &&
                        ((x = E.length),
                        (d = t(U, E, T, x)) < 1 &&
                          (f++, n(E, T < x ? k : U, x, c))),
                      (x = E.length))
                    : 0 === d && (f++, (E = [0])),
                  (b[h++] = f),
                  d && E[0] ? (E[x++] = D[P] || 0) : ((E = [D[P]]), (x = 1));
              while ((P++ < O || void 0 !== E[0]) && L--);
              w = void 0 !== E[0];
            }
            b[0] || b.shift();
          }
          if (1 == p) (v.e = l), (r = w);
          else {
            for (h = 1, f = b[0]; f >= 10; f /= 10) h++;
            (v.e = h + l * p - 1), M(v, a ? o + v.e + 1 : o, u, w);
          }
          return v;
        };
      })();
      function M(e, t, n, r) {
        var i,
          s,
          o,
          u,
          a,
          d,
          l,
          h,
          f,
          p = e.constructor;
        e: if (null != t) {
          if (!(h = e.d)) return e;
          for (i = 1, u = h[0]; u >= 10; u /= 10) i++;
          if ((s = t - i) < 0)
            (s += 7),
              (o = t),
              (a = ((l = h[(f = 0)]) / w(10, i - o - 1)) % 10 | 0);
          else if ((f = Math.ceil((s + 1) / 7)) >= (u = h.length)) {
            if (r) {
              for (; u++ <= f; ) h.push(0);
              (l = a = 0), (i = 1), (s %= 7), (o = s - 7 + 1);
            } else break e;
          } else {
            for (i = 1, l = u = h[f]; u >= 10; u /= 10) i++;
            (s %= 7),
              (a = (o = s - 7 + i) < 0 ? 0 : (l / w(10, i - o - 1)) % 10 | 0);
          }
          if (
            ((r =
              r ||
              t < 0 ||
              void 0 !== h[f + 1] ||
              (o < 0 ? l : l % w(10, i - o - 1))),
            (d =
              n < 4
                ? (a || r) && (0 == n || n == (e.s < 0 ? 3 : 2))
                : a > 5 ||
                  (5 == a &&
                    (4 == n ||
                      r ||
                      (6 == n &&
                        (s > 0 ? (o > 0 ? l / w(10, i - o) : 0) : h[f - 1]) %
                          10 &
                          1) ||
                      n == (e.s < 0 ? 8 : 7)))),
            t < 1 || !h[0])
          )
            return (
              (h.length = 0),
              d
                ? ((t -= e.e + 1),
                  (h[0] = w(10, (7 - (t % 7)) % 7)),
                  (e.e = -t || 0))
                : (h[0] = e.e = 0),
              e
            );
          if (
            (0 == s
              ? ((h.length = f), (u = 1), f--)
              : ((h.length = f + 1),
                (u = w(10, 7 - s)),
                (h[f] = o > 0 ? ((l / w(10, i - o)) % w(10, o) | 0) * u : 0)),
            d)
          )
            for (;;) {
              if (0 == f) {
                for (s = 1, o = h[0]; o >= 10; o /= 10) s++;
                for (o = h[0] += u, u = 1; o >= 10; o /= 10) u++;
                s != u && (e.e++, 1e7 == h[0] && (h[0] = 1));
                break;
              }
              if (((h[f] += u), 1e7 != h[f])) break;
              (h[f--] = 0), (u = 1);
            }
          for (s = h.length; 0 === h[--s]; ) h.pop();
        }
        return (
          c &&
            (e.e > p.maxE
              ? ((e.d = null), (e.e = NaN))
              : e.e < p.minE && ((e.e = 0), (e.d = [0]))),
          e
        );
      }
      function T(e, t, n) {
        if (!e.isFinite()) return R(e);
        var r,
          i = e.e,
          s = L(e.d),
          o = s.length;
        return (
          t
            ? (n && (r = n - o) > 0
                ? (s = s.charAt(0) + "." + s.slice(1) + U(r))
                : o > 1 && (s = s.charAt(0) + "." + s.slice(1)),
              (s = s + (e.e < 0 ? "e" : "e+") + e.e))
            : i < 0
            ? ((s = "0." + U(-i - 1) + s), n && (r = n - o) > 0 && (s += U(r)))
            : i >= o
            ? ((s += U(i + 1 - o)),
              n && (r = n - i - 1) > 0 && (s = s + "." + U(r)))
            : ((r = i + 1) < o && (s = s.slice(0, r) + "." + s.slice(r)),
              n && (r = n - o) > 0 && (i + 1 === o && (s += "."), (s += U(r)))),
          s
        );
      }
      function k(e, t) {
        var n = e[0];
        for (t *= 7; n >= 10; n /= 10) t++;
        return t;
      }
      function B(e, t, n) {
        if (t > E) throw ((c = !0), n && (e.precision = n), Error(h));
        return M(new e(o), t, 1, !0);
      }
      function _(e, t, n) {
        if (t > x) throw Error(h);
        return M(new e(u), t, n, !0);
      }
      function D(e) {
        var t = e.length - 1,
          n = 7 * t + 1;
        if ((t = e[t])) {
          for (; t % 10 == 0; t /= 10) n--;
          for (t = e[0]; t >= 10; t /= 10) n++;
        }
        return n;
      }
      function U(e) {
        for (var t = ""; e--; ) t += "0";
        return t;
      }
      function j(e, t, n, r) {
        var i,
          s = new e(1),
          o = Math.ceil(r / 7 + 4);
        for (c = !1; ; ) {
          if (
            (n % 2 && W((s = s.times(t)).d, o) && (i = !0),
            0 === (n = g(n / 2)))
          ) {
            (n = s.d.length - 1), i && 0 === s.d[n] && ++s.d[n];
            break;
          }
          W((t = t.times(t)).d, o);
        }
        return (c = !0), s;
      }
      function C(e) {
        return 1 & e.d[e.d.length - 1];
      }
      function q(e, t, n) {
        for (var r, i = new e(t[0]), s = 0; ++s < t.length; )
          if ((r = new e(t[s])).s) i[n](r) && (i = r);
          else {
            i = r;
            break;
          }
        return i;
      }
      function A(e, t) {
        var n,
          r,
          i,
          s,
          o,
          u,
          a,
          d = 0,
          l = 0,
          h = 0,
          f = e.constructor,
          p = f.rounding,
          g = f.precision;
        if (!e.d || !e.d[0] || e.e > 17)
          return new f(
            e.d
              ? e.d[0]
                ? e.s < 0
                  ? 0
                  : 1 / 0
                : 1
              : e.s
              ? e.s < 0
                ? 0
                : e
              : 0 / 0
          );
        for (
          null == t ? ((c = !1), (a = g)) : (a = t), u = new f(0.03125);
          e.e > -2;

        )
          (e = e.times(u)), (h += 5);
        for (
          a += r = ((Math.log(w(2, h)) / Math.LN10) * 2 + 5) | 0,
            n = s = o = new f(1),
            f.precision = a;
          ;

        ) {
          if (
            ((s = M(s.times(e), a, 1)),
            (n = n.times(++l)),
            L((u = o.plus(I(s, n, a, 1))).d).slice(0, a) === L(o.d).slice(0, a))
          ) {
            for (i = h; i--; ) o = M(o.times(o), a, 1);
            if (null != t) return (f.precision = g), o;
            if (!(d < 3 && P(o.d, a - r, p, d)))
              return M(o, (f.precision = g), p, (c = !0));
            (f.precision = a += 10), (n = s = u = new f(1)), (l = 0), d++;
          }
          o = u;
        }
      }
      function F(e, t) {
        var n,
          r,
          i,
          s,
          o,
          u,
          a,
          d,
          l,
          h,
          f,
          p = 1,
          g = e,
          w = g.d,
          m = g.constructor,
          y = m.rounding,
          v = m.precision;
        if (g.s < 0 || !w || !w[0] || (!g.e && 1 == w[0] && 1 == w.length))
          return new m(w && !w[0] ? -1 / 0 : 1 != g.s ? NaN : w ? 0 : g);
        if (
          (null == t ? ((c = !1), (l = v)) : (l = t),
          (m.precision = l += 10),
          (r = (n = L(w)).charAt(0)),
          !(15e14 > Math.abs((s = g.e))))
        )
          return (
            (d = B(m, l + 2, v).times(s + "")),
            (g = F(new m(r + "." + n.slice(1)), l - 10).plus(d)),
            (m.precision = v),
            null == t ? M(g, v, y, (c = !0)) : g
          );
        for (; (r < 7 && 1 != r) || (1 == r && n.charAt(1) > 3); )
          (r = (n = L((g = g.times(e)).d)).charAt(0)), p++;
        for (
          s = g.e,
            r > 1
              ? ((g = new m("0." + n)), s++)
              : (g = new m(r + "." + n.slice(1))),
            h = g,
            a = o = g = I(g.minus(1), g.plus(1), l, 1),
            f = M(g.times(g), l, 1),
            i = 3;
          ;

        ) {
          if (
            ((o = M(o.times(f), l, 1)),
            L((d = a.plus(I(o, new m(i), l, 1))).d).slice(0, l) ===
              L(a.d).slice(0, l))
          ) {
            if (
              ((a = a.times(2)),
              0 !== s && (a = a.plus(B(m, l + 2, v).times(s + ""))),
              (a = I(a, new m(p), l, 1)),
              null != t)
            )
              return (m.precision = v), a;
            if (!P(a.d, l - 10, y, u))
              return M(a, (m.precision = v), y, (c = !0));
            (m.precision = l += 10),
              (d = o = g = I(h.minus(1), h.plus(1), l, 1)),
              (f = M(g.times(g), l, 1)),
              (i = u = 1);
          }
          (a = d), (i += 2);
        }
      }
      function R(e) {
        return String((e.s * e.s) / 0);
      }
      function V(e, t) {
        var n, r, i;
        for (
          (n = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
            (r = t.search(/e/i)) > 0
              ? (n < 0 && (n = r),
                (n += +t.slice(r + 1)),
                (t = t.substring(0, r)))
              : n < 0 && (n = t.length),
            r = 0;
          48 === t.charCodeAt(r);
          r++
        );
        for (i = t.length; 48 === t.charCodeAt(i - 1); --i);
        if ((t = t.slice(r, i))) {
          if (
            ((i -= r),
            (e.e = n = n - r - 1),
            (e.d = []),
            (r = (n + 1) % 7),
            n < 0 && (r += 7),
            r < i)
          ) {
            for (r && e.d.push(+t.slice(0, r)), i -= 7; r < i; )
              e.d.push(+t.slice(r, (r += 7)));
            r = 7 - (t = t.slice(r)).length;
          } else r -= i;
          for (; r--; ) t += "0";
          e.d.push(+t),
            c &&
              (e.e > e.constructor.maxE
                ? ((e.d = null), (e.e = NaN))
                : e.e < e.constructor.minE && ((e.e = 0), (e.d = [0])));
        } else (e.e = 0), (e.d = [0]);
        return e;
      }
      function Z(e, t, n, r, i) {
        var s,
          o,
          u,
          a,
          d = e.precision,
          l = Math.ceil(d / 7);
        for (c = !1, a = n.times(n), u = new e(r); ; ) {
          if (
            ((o = I(u.times(a), new e(t++ * t++), d, 1)),
            (u = i ? r.plus(o) : r.minus(o)),
            (r = I(o.times(a), new e(t++ * t++), d, 1)),
            void 0 !== (o = u.plus(r)).d[l])
          ) {
            for (s = l; o.d[s] === u.d[s] && s--; );
            if (-1 == s) break;
          }
          (s = u), (u = r), (r = o), (o = s);
        }
        return (c = !0), (o.d.length = l + 1), o;
      }
      function H(e, t) {
        for (var n = e; --t; ) n *= e;
        return n;
      }
      function G(e, t) {
        var n,
          r = t.s < 0,
          s = _(e, e.precision, 1),
          o = s.times(0.5);
        if ((t = t.abs()).lte(o)) return (i = r ? 4 : 1), t;
        if ((n = t.divToInt(s)).isZero()) i = r ? 3 : 2;
        else {
          if ((t = t.minus(n.times(s))).lte(o))
            return (i = C(n) ? (r ? 2 : 3) : r ? 4 : 1), t;
          i = C(n) ? (r ? 1 : 4) : r ? 3 : 2;
        }
        return t.minus(s).abs();
      }
      function K(e, t, n, i) {
        var o,
          u,
          a,
          c,
          d,
          l,
          h,
          f,
          p,
          g = e.constructor,
          w = void 0 !== n;
        if (
          (w
            ? (S(n, 1, 1e9), void 0 === i ? (i = g.rounding) : S(i, 0, 8))
            : ((n = g.precision), (i = g.rounding)),
          e.isFinite())
        ) {
          for (
            a = (h = T(e)).indexOf("."),
              w
                ? ((o = 2),
                  16 == t ? (n = 4 * n - 3) : 8 == t && (n = 3 * n - 2))
                : (o = t),
              a >= 0 &&
                ((h = h.replace(".", "")),
                ((p = new g(1)).e = h.length - a),
                (p.d = O(T(p), 10, o)),
                (p.e = p.d.length)),
              u = d = (f = O(h, 10, o)).length;
            0 == f[--d];

          )
            f.pop();
          if (f[0]) {
            if (
              (a < 0
                ? u--
                : (((e = new g(e)).d = f),
                  (e.e = u),
                  (f = (e = I(e, p, n, i, 0, o)).d),
                  (u = e.e),
                  (l = r)),
              (a = f[n]),
              (c = o / 2),
              (l = l || void 0 !== f[n + 1]),
              (l =
                i < 4
                  ? (void 0 !== a || l) && (0 === i || i === (e.s < 0 ? 3 : 2))
                  : a > c ||
                    (a === c &&
                      (4 === i ||
                        l ||
                        (6 === i && 1 & f[n - 1]) ||
                        i === (e.s < 0 ? 8 : 7)))),
              (f.length = n),
              l)
            )
              for (; ++f[--n] > o - 1; ) (f[n] = 0), n || (++u, f.unshift(1));
            for (d = f.length; !f[d - 1]; --d);
            for (a = 0, h = ""; a < d; a++) h += s.charAt(f[a]);
            if (w) {
              if (d > 1) {
                if (16 == t || 8 == t) {
                  for (a = 16 == t ? 4 : 3, --d; d % a; d++) h += "0";
                  for (d = (f = O(h, o, t)).length; !f[d - 1]; --d);
                  for (a = 1, h = "1."; a < d; a++) h += s.charAt(f[a]);
                } else h = h.charAt(0) + "." + h.slice(1);
              }
              h = h + (u < 0 ? "p" : "p+") + u;
            } else if (u < 0) {
              for (; ++u; ) h = "0" + h;
              h = "0." + h;
            } else if (++u > d) for (u -= d; u--; ) h += "0";
            else u < d && (h = h.slice(0, u) + "." + h.slice(u));
          } else h = w ? "0p+0" : "0";
          h = (16 == t ? "0x" : 2 == t ? "0b" : 8 == t ? "0o" : "") + h;
        } else h = R(e);
        return e.s < 0 ? "-" + h : h;
      }
      function W(e, t) {
        if (e.length > t) return (e.length = t), !0;
      }
      function $(e) {
        return new this(e).abs();
      }
      function z(e) {
        return new this(e).acos();
      }
      function J(e) {
        return new this(e).acosh();
      }
      function X(e, t) {
        return new this(e).plus(t);
      }
      function Q(e) {
        return new this(e).asin();
      }
      function Y(e) {
        return new this(e).asinh();
      }
      function ee(e) {
        return new this(e).atan();
      }
      function et(e) {
        return new this(e).atanh();
      }
      function en(e, t) {
        (e = new this(e)), (t = new this(t));
        var n,
          r = this.precision,
          i = this.rounding,
          s = r + 4;
        return (
          e.s && t.s
            ? e.d || t.d
              ? !t.d || e.isZero()
                ? ((n = t.s < 0 ? _(this, r, i) : new this(0)).s = e.s)
                : !e.d || t.isZero()
                ? ((n = _(this, s, 1).times(0.5)).s = e.s)
                : t.s < 0
                ? ((this.precision = s),
                  (this.rounding = 1),
                  (n = this.atan(I(e, t, s, 1))),
                  (t = _(this, s, 1)),
                  (this.precision = r),
                  (this.rounding = i),
                  (n = e.s < 0 ? n.minus(t) : n.plus(t)))
                : (n = this.atan(I(e, t, s, 1)))
              : ((n = _(this, s, 1).times(t.s > 0 ? 0.25 : 0.75)).s = e.s)
            : (n = new this(NaN)),
          n
        );
      }
      function er(e) {
        return new this(e).cbrt();
      }
      function ei(e) {
        return M((e = new this(e)), e.e + 1, 2);
      }
      function es(e, t, n) {
        return new this(e).clamp(t, n);
      }
      function eo(e) {
        if (!e || "object" != typeof e) throw Error(d + "Object expected");
        var t,
          n,
          r,
          i = !0 === e.defaults,
          s = [
            "precision",
            1,
            1e9,
            "rounding",
            0,
            8,
            "toExpNeg",
            -9e15,
            0,
            "toExpPos",
            0,
            9e15,
            "maxE",
            0,
            9e15,
            "minE",
            -9e15,
            0,
            "modulo",
            0,
            9,
          ];
        for (t = 0; t < s.length; t += 3)
          if (((n = s[t]), i && (this[n] = a[n]), void 0 !== (r = e[n]))) {
            if (g(r) === r && r >= s[t + 1] && r <= s[t + 2]) this[n] = r;
            else throw Error(l + n + ": " + r);
          }
        if (((n = "crypto"), i && (this[n] = a[n]), void 0 !== (r = e[n]))) {
          if (!0 === r || !1 === r || 0 === r || 1 === r) {
            if (r) {
              if (
                "undefined" != typeof crypto &&
                crypto &&
                (crypto.getRandomValues || crypto.randomBytes)
              )
                this[n] = !0;
              else throw Error(f);
            } else this[n] = !1;
          } else throw Error(l + n + ": " + r);
        }
        return this;
      }
      function eu(e) {
        return new this(e).cos();
      }
      function ea(e) {
        return new this(e).cosh();
      }
      function ec(e, t) {
        return new this(e).div(t);
      }
      function ed(e) {
        return new this(e).exp();
      }
      function el(e) {
        return M((e = new this(e)), e.e + 1, 3);
      }
      function eh() {
        var e,
          t,
          n = new this(0);
        for (e = 0, c = !1; e < arguments.length; )
          if (((t = new this(arguments[e++])), t.d))
            n.d && (n = n.plus(t.times(t)));
          else {
            if (t.s) return (c = !0), new this(1 / 0);
            n = t;
          }
        return (c = !0), n.sqrt();
      }
      function ef(e) {
        return e instanceof eD || (e && e.toStringTag === p) || !1;
      }
      function ep(e) {
        return new this(e).ln();
      }
      function eg(e, t) {
        return new this(e).log(t);
      }
      function ew(e) {
        return new this(e).log(2);
      }
      function em(e) {
        return new this(e).log(10);
      }
      function ey() {
        return q(this, arguments, "lt");
      }
      function ev() {
        return q(this, arguments, "gt");
      }
      function eb(e, t) {
        return new this(e).mod(t);
      }
      function eE(e, t) {
        return new this(e).mul(t);
      }
      function ex(e, t) {
        return new this(e).pow(t);
      }
      function eN(e) {
        var t,
          n,
          r,
          i,
          s = 0,
          o = new this(1),
          u = [];
        if (
          (void 0 === e ? (e = this.precision) : S(e, 1, 1e9),
          (r = Math.ceil(e / 7)),
          this.crypto)
        ) {
          if (crypto.getRandomValues)
            for (t = crypto.getRandomValues(new Uint32Array(r)); s < r; )
              (i = t[s]) >= 429e7
                ? (t[s] = crypto.getRandomValues(new Uint32Array(1))[0])
                : (u[s++] = i % 1e7);
          else if (crypto.randomBytes) {
            for (t = crypto.randomBytes((r *= 4)); s < r; )
              (i =
                t[s] +
                (t[s + 1] << 8) +
                (t[s + 2] << 16) +
                ((127 & t[s + 3]) << 24)) >= 214e7
                ? crypto.randomBytes(4).copy(t, s)
                : (u.push(i % 1e7), (s += 4));
            s = r / 4;
          } else throw Error(f);
        } else for (; s < r; ) u[s++] = (1e7 * Math.random()) | 0;
        for (
          r = u[--s],
            e %= 7,
            r && e && ((i = w(10, 7 - e)), (u[s] = ((r / i) | 0) * i));
          0 === u[s];
          s--
        )
          u.pop();
        if (s < 0) (n = 0), (u = [0]);
        else {
          for (n = -1; 0 === u[0]; n -= 7) u.shift();
          for (r = 1, i = u[0]; i >= 10; i /= 10) r++;
          r < 7 && (n -= 7 - r);
        }
        return (o.e = n), (o.d = u), o;
      }
      function eL(e) {
        return M((e = new this(e)), e.e + 1, this.rounding);
      }
      function eS(e) {
        return (e = new this(e)).d ? (e.d[0] ? e.s : 0 * e.s) : e.s || NaN;
      }
      function eP(e) {
        return new this(e).sin();
      }
      function eO(e) {
        return new this(e).sinh();
      }
      function eI(e) {
        return new this(e).sqrt();
      }
      function eM(e, t) {
        return new this(e).sub(t);
      }
      function eT() {
        var e = 0,
          t = arguments,
          n = new this(t[0]);
        for (c = !1; n.s && ++e < t.length; ) n = n.plus(t[e]);
        return (c = !0), M(n, this.precision, this.rounding);
      }
      function ek(e) {
        return new this(e).tan();
      }
      function eB(e) {
        return new this(e).tanh();
      }
      function e_(e) {
        return M((e = new this(e)), e.e + 1, 1);
      }
      (N[Symbol.for("nodejs.util.inspect.custom")] = N.toString),
        (N[Symbol.toStringTag] = "Decimal");
      var eD = (N.constructor = (function e(t) {
        var n, r, i;
        function s(e) {
          var t, n, r;
          if (!(this instanceof s)) return new s(e);
          if (((this.constructor = s), ef(e))) {
            (this.s = e.s),
              c
                ? !e.d || e.e > s.maxE
                  ? ((this.e = NaN), (this.d = null))
                  : e.e < s.minE
                  ? ((this.e = 0), (this.d = [0]))
                  : ((this.e = e.e), (this.d = e.d.slice()))
                : ((this.e = e.e), (this.d = e.d ? e.d.slice() : e.d));
            return;
          }
          if ("number" == (r = typeof e)) {
            if (0 === e) {
              (this.s = 1 / e < 0 ? -1 : 1), (this.e = 0), (this.d = [0]);
              return;
            }
            if (
              (e < 0 ? ((e = -e), (this.s = -1)) : (this.s = 1),
              e === ~~e && e < 1e7)
            ) {
              for (t = 0, n = e; n >= 10; n /= 10) t++;
              c
                ? t > s.maxE
                  ? ((this.e = NaN), (this.d = null))
                  : t < s.minE
                  ? ((this.e = 0), (this.d = [0]))
                  : ((this.e = t), (this.d = [e]))
                : ((this.e = t), (this.d = [e]));
              return;
            }
            if (0 * e != 0) {
              e || (this.s = NaN), (this.e = NaN), (this.d = null);
              return;
            }
            return V(this, e.toString());
          }
          if ("string" !== r) throw Error(l + e);
          return (
            45 === (n = e.charCodeAt(0))
              ? ((e = e.slice(1)), (this.s = -1))
              : (43 === n && (e = e.slice(1)), (this.s = 1)),
            b.test(e)
              ? V(this, e)
              : (function (e, t) {
                  var n, r, i, s, o, u, a, d, h;
                  if (t.indexOf("_") > -1) {
                    if (((t = t.replace(/(\d)_(?=\d)/g, "$1")), b.test(t)))
                      return V(e, t);
                  } else if ("Infinity" === t || "NaN" === t)
                    return +t || (e.s = NaN), (e.e = NaN), (e.d = null), e;
                  if (y.test(t)) (n = 16), (t = t.toLowerCase());
                  else if (m.test(t)) n = 2;
                  else if (v.test(t)) n = 8;
                  else throw Error(l + t);
                  for (
                    (s = t.search(/p/i)) > 0
                      ? ((a = +t.slice(s + 1)), (t = t.substring(2, s)))
                      : (t = t.slice(2)),
                      o = (s = t.indexOf(".")) >= 0,
                      r = e.constructor,
                      o &&
                        ((s = (u = (t = t.replace(".", "")).length) - s),
                        (i = j(r, new r(n), s, 2 * s))),
                      s = h = (d = O(t, n, 1e7)).length - 1;
                    0 === d[s];
                    --s
                  )
                    d.pop();
                  return s < 0
                    ? new r(0 * e.s)
                    : ((e.e = k(d, h)),
                      (e.d = d),
                      (c = !1),
                      o && (e = I(e, i, 4 * u)),
                      a &&
                        (e = e.times(
                          54 > Math.abs(a) ? w(2, a) : eD.pow(2, a)
                        )),
                      (c = !0),
                      e);
                })(this, e)
          );
        }
        if (
          ((s.prototype = N),
          (s.ROUND_UP = 0),
          (s.ROUND_DOWN = 1),
          (s.ROUND_CEIL = 2),
          (s.ROUND_FLOOR = 3),
          (s.ROUND_HALF_UP = 4),
          (s.ROUND_HALF_DOWN = 5),
          (s.ROUND_HALF_EVEN = 6),
          (s.ROUND_HALF_CEIL = 7),
          (s.ROUND_HALF_FLOOR = 8),
          (s.EUCLID = 9),
          (s.config = s.set = eo),
          (s.clone = e),
          (s.isDecimal = ef),
          (s.abs = $),
          (s.acos = z),
          (s.acosh = J),
          (s.add = X),
          (s.asin = Q),
          (s.asinh = Y),
          (s.atan = ee),
          (s.atanh = et),
          (s.atan2 = en),
          (s.cbrt = er),
          (s.ceil = ei),
          (s.clamp = es),
          (s.cos = eu),
          (s.cosh = ea),
          (s.div = ec),
          (s.exp = ed),
          (s.floor = el),
          (s.hypot = eh),
          (s.ln = ep),
          (s.log = eg),
          (s.log10 = em),
          (s.log2 = ew),
          (s.max = ey),
          (s.min = ev),
          (s.mod = eb),
          (s.mul = eE),
          (s.pow = ex),
          (s.random = eN),
          (s.round = eL),
          (s.sign = eS),
          (s.sin = eP),
          (s.sinh = eO),
          (s.sqrt = eI),
          (s.sub = eM),
          (s.sum = eT),
          (s.tan = ek),
          (s.tanh = eB),
          (s.trunc = e_),
          void 0 === t && (t = {}),
          t && !0 !== t.defaults)
        )
          for (
            n = 0,
              i = [
                "precision",
                "rounding",
                "toExpNeg",
                "toExpPos",
                "maxE",
                "minE",
                "modulo",
                "crypto",
              ];
            n < i.length;

          )
            t.hasOwnProperty((r = i[n++])) || (t[r] = this[r]);
        return s.config(t), s;
      })(a));
      (o = new eD(o)), (u = new eD(u)), (t.Z = eD);
    },
  },
]);

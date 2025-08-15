(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [305],
  {
    6154: function (t, e, r) {
      "use strict";
      (e._O = e.Jq = e.KB = e.u8 = e.cv = void 0),
        (e.Ik = e.A9 = e.n_ = e.gM = void 0);
      let n = r(9417);
      function i(t) {
        if (!(t instanceof Uint8Array))
          throw TypeError("b must be a Uint8Array");
      }
      function o(t) {
        return i(t), n.Buffer.from(t.buffer, t.byteOffset, t.length);
      }
      class s {
        constructor(t, e) {
          if (!Number.isInteger(t)) throw TypeError("span must be an integer");
          (this.span = t), (this.property = e);
        }
        makeDestinationObject() {
          return {};
        }
        getSpan(t, e) {
          if (0 > this.span) throw RangeError("indeterminate span");
          return this.span;
        }
        replicate(t) {
          let e = Object.create(this.constructor.prototype);
          return Object.assign(e, this), (e.property = t), e;
        }
        fromArray(t) {}
      }
      function u(t, e) {
        return e.property ? t + "[" + e.property + "]" : t;
      }
      class a extends s {
        isCount() {
          throw Error("ExternalLayout is abstract");
        }
      }
      class h extends a {
        constructor(t, e = 0, r) {
          if (!(t instanceof s)) throw TypeError("layout must be a Layout");
          if (!Number.isInteger(e))
            throw TypeError("offset must be integer or undefined");
          super(t.span, r || t.property), (this.layout = t), (this.offset = e);
        }
        isCount() {
          return this.layout instanceof l || this.layout instanceof f;
        }
        decode(t, e = 0) {
          return this.layout.decode(t, e + this.offset);
        }
        encode(t, e, r = 0) {
          return this.layout.encode(t, e, r + this.offset);
        }
      }
      class l extends s {
        constructor(t, e) {
          if ((super(t, e), 6 < this.span))
            throw RangeError("span must not exceed 6 bytes");
        }
        decode(t, e = 0) {
          return o(t).readUIntLE(e, this.span);
        }
        encode(t, e, r = 0) {
          return o(e).writeUIntLE(t, r, this.span), this.span;
        }
      }
      class f extends s {
        constructor(t, e) {
          if ((super(t, e), 6 < this.span))
            throw RangeError("span must not exceed 6 bytes");
        }
        decode(t, e = 0) {
          return o(t).readUIntBE(e, this.span);
        }
        encode(t, e, r = 0) {
          return o(e).writeUIntBE(t, r, this.span), this.span;
        }
      }
      function c(t) {
        let e = Math.floor(t / 4294967296);
        return { hi32: e, lo32: t - 4294967296 * e };
      }
      function d(t, e) {
        return 4294967296 * t + e;
      }
      class p extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          let r = o(t),
            n = r.readUInt32LE(e);
          return d(r.readUInt32LE(e + 4), n);
        }
        encode(t, e, r = 0) {
          let n = c(t),
            i = o(e);
          return i.writeUInt32LE(n.lo32, r), i.writeUInt32LE(n.hi32, r + 4), 8;
        }
      }
      class g extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          let r = o(t),
            n = r.readUInt32LE(e);
          return d(r.readInt32LE(e + 4), n);
        }
        encode(t, e, r = 0) {
          let n = c(t),
            i = o(e);
          return i.writeUInt32LE(n.lo32, r), i.writeInt32LE(n.hi32, r + 4), 8;
        }
      }
      class m extends s {
        constructor(t, e, r) {
          if (!(t instanceof s))
            throw TypeError("elementLayout must be a Layout");
          if (
            !(
              (e instanceof a && e.isCount()) ||
              (Number.isInteger(e) && 0 <= e)
            )
          )
            throw TypeError(
              "count must be non-negative integer or an unsigned integer ExternalLayout"
            );
          let n = -1;
          e instanceof a || !(0 < t.span) || (n = e * t.span),
            super(n, r),
            (this.elementLayout = t),
            (this.count = e);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let r = 0,
            n = this.count;
          if (
            (n instanceof a && (n = n.decode(t, e)),
            0 < this.elementLayout.span)
          )
            r = n * this.elementLayout.span;
          else {
            let i = 0;
            for (; i < n; ) (r += this.elementLayout.getSpan(t, e + r)), ++i;
          }
          return r;
        }
        decode(t, e = 0) {
          let r = [],
            n = 0,
            i = this.count;
          for (i instanceof a && (i = i.decode(t, e)); n < i; )
            r.push(this.elementLayout.decode(t, e)),
              (e += this.elementLayout.getSpan(t, e)),
              (n += 1);
          return r;
        }
        encode(t, e, r = 0) {
          let n = this.elementLayout,
            i = t.reduce((t, i) => t + n.encode(i, e, r + t), 0);
          return (
            this.count instanceof a && this.count.encode(t.length, e, r), i
          );
        }
      }
      class y extends s {
        constructor(t, e, r) {
          if (
            !(Array.isArray(t) && t.reduce((t, e) => t && e instanceof s, !0))
          )
            throw TypeError("fields must be array of Layout instances");
          for (let n of ("boolean" == typeof e &&
            void 0 === r &&
            ((r = e), (e = void 0)),
          t))
            if (0 > n.span && void 0 === n.property)
              throw Error(
                "fields cannot contain unnamed variable-length layout"
              );
          let n = -1;
          try {
            n = t.reduce((t, e) => t + e.getSpan(), 0);
          } catch (t) {}
          super(n, e), (this.fields = t), (this.decodePrefixes = !!r);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let r = 0;
          try {
            r = this.fields.reduce((r, n) => {
              let i = n.getSpan(t, e);
              return (e += i), r + i;
            }, 0);
          } catch (t) {
            throw RangeError("indeterminate span");
          }
          return r;
        }
        decode(t, e = 0) {
          i(t);
          let r = this.makeDestinationObject();
          for (let n of this.fields)
            if (
              (void 0 !== n.property && (r[n.property] = n.decode(t, e)),
              (e += n.getSpan(t, e)),
              this.decodePrefixes && t.length === e)
            )
              break;
          return r;
        }
        encode(t, e, r = 0) {
          let n = r,
            i = 0,
            o = 0;
          for (let n of this.fields) {
            let s = n.span;
            if (((o = 0 < s ? s : 0), void 0 !== n.property)) {
              let i = t[n.property];
              void 0 !== i &&
                ((o = n.encode(i, e, r)), 0 > s && (s = n.getSpan(e, r)));
            }
            (i = r), (r += s);
          }
          return i + o - n;
        }
        fromArray(t) {
          let e = this.makeDestinationObject();
          for (let r of this.fields)
            void 0 !== r.property &&
              0 < t.length &&
              (e[r.property] = t.shift());
          return e;
        }
        layoutFor(t) {
          if ("string" != typeof t) throw TypeError("property must be string");
          for (let e of this.fields) if (e.property === t) return e;
        }
        offsetOf(t) {
          if ("string" != typeof t) throw TypeError("property must be string");
          let e = 0;
          for (let r of this.fields) {
            if (r.property === t) return e;
            0 > r.span ? (e = -1) : 0 <= e && (e += r.span);
          }
        }
      }
      class w {
        constructor(t) {
          this.property = t;
        }
        decode(t, e) {
          throw Error("UnionDiscriminator is abstract");
        }
        encode(t, e, r) {
          throw Error("UnionDiscriminator is abstract");
        }
      }
      class v extends w {
        constructor(t, e) {
          if (!(t instanceof a && t.isCount()))
            throw TypeError(
              "layout must be an unsigned integer ExternalLayout"
            );
          super(e || t.property || "variant"), (this.layout = t);
        }
        decode(t, e) {
          return this.layout.decode(t, e);
        }
        encode(t, e, r) {
          return this.layout.encode(t, e, r);
        }
      }
      class b extends s {
        constructor(t, e, r) {
          let n;
          if (t instanceof l || t instanceof f) n = new v(new h(t));
          else if (t instanceof a && t.isCount()) n = new v(t);
          else if (t instanceof w) n = t;
          else
            throw TypeError(
              "discr must be a UnionDiscriminator or an unsigned integer layout"
            );
          if ((void 0 === e && (e = null), !(null === e || e instanceof s)))
            throw TypeError("defaultLayout must be null or a Layout");
          if (null !== e) {
            if (0 > e.span)
              throw Error("defaultLayout must have constant span");
            void 0 === e.property && (e = e.replicate("content"));
          }
          let i = -1;
          e &&
            0 <= (i = e.span) &&
            (t instanceof l || t instanceof f) &&
            (i += n.layout.span),
            super(i, r),
            (this.discriminator = n),
            (this.usesPrefixDiscriminator = t instanceof l || t instanceof f),
            (this.defaultLayout = e),
            (this.registry = {});
          let o = this.defaultGetSourceVariant.bind(this);
          (this.getSourceVariant = function (t) {
            return o(t);
          }),
            (this.configGetSourceVariant = function (t) {
              o = t.bind(this);
            });
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let r = this.getVariant(t, e);
          if (!r)
            throw Error("unable to determine span for unrecognized variant");
          return r.getSpan(t, e);
        }
        defaultGetSourceVariant(t) {
          if (
            Object.prototype.hasOwnProperty.call(t, this.discriminator.property)
          ) {
            if (
              this.defaultLayout &&
              this.defaultLayout.property &&
              Object.prototype.hasOwnProperty.call(
                t,
                this.defaultLayout.property
              )
            )
              return;
            let e = this.registry[t[this.discriminator.property]];
            if (
              e &&
              (!e.layout ||
                (e.property &&
                  Object.prototype.hasOwnProperty.call(t, e.property)))
            )
              return e;
          } else
            for (let e in this.registry) {
              let r = this.registry[e];
              if (
                r.property &&
                Object.prototype.hasOwnProperty.call(t, r.property)
              )
                return r;
            }
          throw Error("unable to infer src variant");
        }
        decode(t, e = 0) {
          let r;
          let n = this.discriminator,
            i = n.decode(t, e),
            o = this.registry[i];
          if (void 0 === o) {
            let o = this.defaultLayout,
              s = 0;
            this.usesPrefixDiscriminator && (s = n.layout.span),
              ((r = this.makeDestinationObject())[n.property] = i),
              (r[o.property] = o.decode(t, e + s));
          } else r = o.decode(t, e);
          return r;
        }
        encode(t, e, r = 0) {
          let n = this.getSourceVariant(t);
          if (void 0 === n) {
            let n = this.discriminator,
              i = this.defaultLayout,
              o = 0;
            return (
              this.usesPrefixDiscriminator && (o = n.layout.span),
              n.encode(t[n.property], e, r),
              o + i.encode(t[i.property], e, r + o)
            );
          }
          return n.encode(t, e, r);
        }
        addVariant(t, e, r) {
          let n = new E(this, t, e, r);
          return (this.registry[t] = n), n;
        }
        getVariant(t, e = 0) {
          let r;
          return (
            t instanceof Uint8Array
              ? (r = this.discriminator.decode(t, e))
              : (r = t),
            this.registry[r]
          );
        }
      }
      class E extends s {
        constructor(t, e, r, n) {
          if (!(t instanceof b)) throw TypeError("union must be a Union");
          if (!Number.isInteger(e) || 0 > e)
            throw TypeError("variant must be a (non-negative) integer");
          if (
            ("string" == typeof r && void 0 === n && ((n = r), (r = null)), r)
          ) {
            if (!(r instanceof s)) throw TypeError("layout must be a Layout");
            if (
              null !== t.defaultLayout &&
              0 <= r.span &&
              r.span > t.defaultLayout.span
            )
              throw Error("variant span exceeds span of containing union");
            if ("string" != typeof n)
              throw TypeError("variant must have a String property");
          }
          let i = t.span;
          0 > t.span &&
            0 <= (i = r ? r.span : 0) &&
            t.usesPrefixDiscriminator &&
            (i += t.discriminator.layout.span),
            super(i, n),
            (this.union = t),
            (this.variant = e),
            (this.layout = r || null);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let r = 0;
          this.union.usesPrefixDiscriminator &&
            (r = this.union.discriminator.layout.span);
          let n = 0;
          return this.layout && (n = this.layout.getSpan(t, e + r)), r + n;
        }
        decode(t, e = 0) {
          let r = this.makeDestinationObject();
          if (this !== this.union.getVariant(t, e))
            throw Error("variant mismatch");
          let n = 0;
          return (
            this.union.usesPrefixDiscriminator &&
              (n = this.union.discriminator.layout.span),
            this.layout
              ? (r[this.property] = this.layout.decode(t, e + n))
              : this.property
              ? (r[this.property] = !0)
              : this.union.usesPrefixDiscriminator &&
                (r[this.union.discriminator.property] = this.variant),
            r
          );
        }
        encode(t, e, r = 0) {
          let n = 0;
          if (
            (this.union.usesPrefixDiscriminator &&
              (n = this.union.discriminator.layout.span),
            this.layout &&
              !Object.prototype.hasOwnProperty.call(t, this.property))
          )
            throw TypeError("variant lacks property " + this.property);
          this.union.discriminator.encode(this.variant, e, r);
          let i = n;
          if (
            this.layout &&
            (this.layout.encode(t[this.property], e, r + n),
            (i += this.layout.getSpan(e, r + n)),
            0 <= this.union.span && i > this.union.span)
          )
            throw Error("encoded variant overruns containing union");
          return i;
        }
        fromArray(t) {
          if (this.layout) return this.layout.fromArray(t);
        }
      }
      function M(t) {
        return 0 > t && (t += 4294967296), t;
      }
      class x extends s {
        constructor(t, e, r) {
          if (!(t instanceof l || t instanceof f))
            throw TypeError("word must be a UInt or UIntBE layout");
          if (
            ("string" == typeof e && void 0 === r && ((r = e), (e = !1)),
            4 < t.span)
          )
            throw RangeError("word cannot exceed 32 bits");
          super(t.span, r),
            (this.word = t),
            (this.msb = !!e),
            (this.fields = []);
          let n = 0;
          (this._packedSetValue = function (t) {
            return (n = M(t)), this;
          }),
            (this._packedGetValue = function () {
              return n;
            });
        }
        decode(t, e = 0) {
          let r = this.makeDestinationObject(),
            n = this.word.decode(t, e);
          for (let e of (this._packedSetValue(n), this.fields))
            void 0 !== e.property && (r[e.property] = e.decode(t));
          return r;
        }
        encode(t, e, r = 0) {
          let n = this.word.decode(e, r);
          for (let e of (this._packedSetValue(n), this.fields))
            if (void 0 !== e.property) {
              let r = t[e.property];
              void 0 !== r && e.encode(r);
            }
          return this.word.encode(this._packedGetValue(), e, r);
        }
        addField(t, e) {
          let r = new _(this, t, e);
          return this.fields.push(r), r;
        }
        addBoolean(t) {
          let e = new B(this, t);
          return this.fields.push(e), e;
        }
        fieldFor(t) {
          if ("string" != typeof t) throw TypeError("property must be string");
          for (let e of this.fields) if (e.property === t) return e;
        }
      }
      class _ {
        constructor(t, e, r) {
          if (!(t instanceof x))
            throw TypeError("container must be a BitStructure");
          if (!Number.isInteger(e) || 0 >= e)
            throw TypeError("bits must be positive integer");
          let n = 8 * t.span,
            i = t.fields.reduce((t, e) => t + e.bits, 0);
          if (e + i > n)
            throw Error(
              "bits too long for span remainder (" +
                (n - i) +
                " of " +
                n +
                " remain)"
            );
          (this.container = t),
            (this.bits = e),
            (this.valueMask = (1 << e) - 1),
            32 === e && (this.valueMask = 4294967295),
            (this.start = i),
            this.container.msb && (this.start = n - i - e),
            (this.wordMask = M(this.valueMask << this.start)),
            (this.property = r);
        }
        decode(t, e) {
          return (
            M(this.container._packedGetValue() & this.wordMask) >>> this.start
          );
        }
        encode(t) {
          if (
            "number" != typeof t ||
            !Number.isInteger(t) ||
            t !== M(t & this.valueMask)
          )
            throw TypeError(
              u("BitField.encode", this) +
                " value must be integer not exceeding " +
                this.valueMask
            );
          let e = this.container._packedGetValue(),
            r = M(t << this.start);
          this.container._packedSetValue(M(e & ~this.wordMask) | r);
        }
      }
      class B extends _ {
        constructor(t, e) {
          super(t, 1, e);
        }
        decode(t, e) {
          return !!super.decode(t, e);
        }
        encode(t) {
          "boolean" == typeof t && (t = +t), super.encode(t);
        }
      }
      class A extends s {
        constructor(t, e) {
          if (
            !(
              (t instanceof a && t.isCount()) ||
              (Number.isInteger(t) && 0 <= t)
            )
          )
            throw TypeError(
              "length must be positive integer or an unsigned integer ExternalLayout"
            );
          let r = -1;
          t instanceof a || (r = t), super(r, e), (this.length = t);
        }
        getSpan(t, e) {
          let r = this.span;
          return 0 > r && (r = this.length.decode(t, e)), r;
        }
        decode(t, e = 0) {
          let r = this.span;
          return 0 > r && (r = this.length.decode(t, e)), o(t).slice(e, e + r);
        }
        encode(t, e, r) {
          let n = this.length;
          if (
            (this.length instanceof a && (n = t.length),
            !(t instanceof Uint8Array && n === t.length))
          )
            throw TypeError(
              u("Blob.encode", this) +
                " requires (length " +
                n +
                ") Uint8Array as src"
            );
          if (r + n > e.length)
            throw RangeError("encoding overruns Uint8Array");
          let i = o(t);
          return (
            o(e).write(i.toString("hex"), r, n, "hex"),
            this.length instanceof a && this.length.encode(n, e, r),
            n
          );
        }
      }
      (e.cv = (t, e, r) => new h(t, e, r)),
        (e.u8 = (t) => new l(1, t)),
        (e.KB = (t) => new l(2, t)),
        (e.Jq = (t) => new l(4, t)),
        (e._O = (t) => new p(t)),
        (e.gM = (t) => new g(t)),
        (e.n_ = (t, e, r) => new y(t, e, r)),
        (e.A9 = (t, e, r) => new m(t, e, r)),
        (e.Ik = (t, e) => new A(t, e));
    },
    7984: function (t, e, r) {
      "use strict";
      var n = r(5455).Buffer;
      t.exports = function (t) {
        if (t.length >= 255) throw TypeError("Alphabet too long");
        for (var e = new Uint8Array(256), r = 0; r < e.length; r++) e[r] = 255;
        for (var i = 0; i < t.length; i++) {
          var o = t.charAt(i),
            s = o.charCodeAt(0);
          if (255 !== e[s]) throw TypeError(o + " is ambiguous");
          e[s] = i;
        }
        var u = t.length,
          a = t.charAt(0),
          h = Math.log(u) / Math.log(256),
          l = Math.log(256) / Math.log(u);
        function f(t) {
          if ("string" != typeof t) throw TypeError("Expected String");
          if (0 === t.length) return n.alloc(0);
          for (var r = 0, i = 0, o = 0; t[r] === a; ) i++, r++;
          for (
            var s = ((t.length - r) * h + 1) >>> 0, l = new Uint8Array(s);
            r < t.length;

          ) {
            var f = e[t.charCodeAt(r)];
            if (255 === f) return;
            for (var c = 0, d = s - 1; (0 !== f || c < o) && -1 !== d; d--, c++)
              (f += (u * l[d]) >>> 0),
                (l[d] = f % 256 >>> 0),
                (f = (f / 256) >>> 0);
            if (0 !== f) throw Error("Non-zero carry");
            (o = c), r++;
          }
          for (var p = s - o; p !== s && 0 === l[p]; ) p++;
          var g = n.allocUnsafe(i + (s - p));
          g.fill(0, 0, i);
          for (var m = i; p !== s; ) g[m++] = l[p++];
          return g;
        }
        return {
          encode: function (e) {
            if (
              ((Array.isArray(e) || e instanceof Uint8Array) && (e = n.from(e)),
              !n.isBuffer(e))
            )
              throw TypeError("Expected Buffer");
            if (0 === e.length) return "";
            for (var r = 0, i = 0, o = 0, s = e.length; o !== s && 0 === e[o]; )
              o++, r++;
            for (
              var h = ((s - o) * l + 1) >>> 0, f = new Uint8Array(h);
              o !== s;

            ) {
              for (
                var c = e[o], d = 0, p = h - 1;
                (0 !== c || d < i) && -1 !== p;
                p--, d++
              )
                (c += (256 * f[p]) >>> 0),
                  (f[p] = c % u >>> 0),
                  (c = (c / u) >>> 0);
              if (0 !== c) throw Error("Non-zero carry");
              (i = d), o++;
            }
            for (var g = h - i; g !== h && 0 === f[g]; ) g++;
            for (var m = a.repeat(r); g < h; ++g) m += t.charAt(f[g]);
            return m;
          },
          decodeUnsafe: f,
          decode: function (t) {
            var e = f(t);
            if (e) return e;
            throw Error("Non-base" + u + " character");
          },
        };
      };
    },
    7721: function (t, e) {
      "use strict";
      (e.byteLength = function (t) {
        var e = a(t),
          r = e[0],
          n = e[1];
        return ((r + n) * 3) / 4 - n;
      }),
        (e.toByteArray = function (t) {
          var e,
            r,
            o = a(t),
            s = o[0],
            u = o[1],
            h = new i(((s + u) * 3) / 4 - u),
            l = 0,
            f = u > 0 ? s - 4 : s;
          for (r = 0; r < f; r += 4)
            (e =
              (n[t.charCodeAt(r)] << 18) |
              (n[t.charCodeAt(r + 1)] << 12) |
              (n[t.charCodeAt(r + 2)] << 6) |
              n[t.charCodeAt(r + 3)]),
              (h[l++] = (e >> 16) & 255),
              (h[l++] = (e >> 8) & 255),
              (h[l++] = 255 & e);
          return (
            2 === u &&
              ((e = (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)),
              (h[l++] = 255 & e)),
            1 === u &&
              ((e =
                (n[t.charCodeAt(r)] << 10) |
                (n[t.charCodeAt(r + 1)] << 4) |
                (n[t.charCodeAt(r + 2)] >> 2)),
              (h[l++] = (e >> 8) & 255),
              (h[l++] = 255 & e)),
            h
          );
        }),
        (e.fromByteArray = function (t) {
          for (
            var e, n = t.length, i = n % 3, o = [], s = 0, u = n - i;
            s < u;
            s += 16383
          )
            o.push(
              (function (t, e, n) {
                for (var i, o = [], s = e; s < n; s += 3)
                  o.push(
                    r[
                      ((i =
                        ((t[s] << 16) & 16711680) +
                        ((t[s + 1] << 8) & 65280) +
                        (255 & t[s + 2])) >>
                        18) &
                        63
                    ] +
                      r[(i >> 12) & 63] +
                      r[(i >> 6) & 63] +
                      r[63 & i]
                  );
                return o.join("");
              })(t, s, s + 16383 > u ? u : s + 16383)
            );
          return (
            1 === i
              ? o.push(r[(e = t[n - 1]) >> 2] + r[(e << 4) & 63] + "==")
              : 2 === i &&
                o.push(
                  r[(e = (t[n - 2] << 8) + t[n - 1]) >> 10] +
                    r[(e >> 4) & 63] +
                    r[(e << 2) & 63] +
                    "="
                ),
            o.join("")
          );
        });
      for (
        var r = [],
          n = [],
          i = "undefined" != typeof Uint8Array ? Uint8Array : Array,
          o =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          s = 0,
          u = o.length;
        s < u;
        ++s
      )
        (r[s] = o[s]), (n[o.charCodeAt(s)] = s);
      function a(t) {
        var e = t.length;
        if (e % 4 > 0)
          throw Error("Invalid string. Length must be a multiple of 4");
        var r = t.indexOf("=");
        -1 === r && (r = e);
        var n = r === e ? 0 : 4 - (r % 4);
        return [r, n];
      }
      (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
    },
    1725: function (t, e, r) {
      "use strict";
      var n = r(9417).Buffer;
      (e.oU = function (t) {
        {
          let e = n.from(t);
          e.reverse();
          let r = e.toString("hex");
          return 0 === r.length ? BigInt(0) : BigInt(`0x${r}`);
        }
      }),
        (e.k$ = function (t, e) {
          {
            let r = t.toString(16),
              i = n.from(r.padStart(2 * e, "0").slice(0, 2 * e), "hex");
            return i.reverse(), i;
          }
        });
    },
    7057: function (t, e, r) {
      !(function (t, e) {
        "use strict";
        function n(t, e) {
          if (!t) throw Error(e || "Assertion failed");
        }
        function i(t, e) {
          t.super_ = e;
          var r = function () {};
          (r.prototype = e.prototype),
            (t.prototype = new r()),
            (t.prototype.constructor = t);
        }
        function o(t, e, r) {
          if (o.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" === e || "be" === e) && ((r = e), (e = 10)),
              this._init(t || 0, e || 10, r || "be"));
        }
        "object" == typeof t ? (t.exports = o) : (e.BN = o),
          (o.BN = o),
          (o.wordSize = 26);
        try {
          f =
            "undefined" != typeof window && void 0 !== window.Buffer
              ? window.Buffer
              : r(9391).Buffer;
        } catch (t) {}
        function s(t, e) {
          var r = t.charCodeAt(e);
          return r >= 48 && r <= 57
            ? r - 48
            : r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : void n(!1, "Invalid character in " + t);
        }
        function u(t, e, r) {
          var n = s(t, r);
          return r - 1 >= e && (n |= s(t, r - 1) << 4), n;
        }
        function a(t, e, r, i) {
          for (var o = 0, s = 0, u = Math.min(t.length, r), a = e; a < u; a++) {
            var h = t.charCodeAt(a) - 48;
            (o *= i),
              (s = h >= 49 ? h - 49 + 10 : h >= 17 ? h - 17 + 10 : h),
              n(h >= 0 && s < i, "Invalid character"),
              (o += s);
          }
          return o;
        }
        function h(t, e) {
          (t.words = e.words),
            (t.length = e.length),
            (t.negative = e.negative),
            (t.red = e.red);
        }
        if (
          ((o.isBN = function (t) {
            return (
              t instanceof o ||
              (null !== t &&
                "object" == typeof t &&
                t.constructor.wordSize === o.wordSize &&
                Array.isArray(t.words))
            );
          }),
          (o.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (o.min = function (t, e) {
            return 0 > t.cmp(e) ? t : e;
          }),
          (o.prototype._init = function (t, e, r) {
            if ("number" == typeof t) return this._initNumber(t, e, r);
            if ("object" == typeof t) return this._initArray(t, e, r);
            "hex" === e && (e = 16), n(e === (0 | e) && e >= 2 && e <= 36);
            var i = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
              (i++, (this.negative = 1)),
              i < t.length &&
                (16 === e
                  ? this._parseHex(t, i, r)
                  : (this._parseBase(t, e, i),
                    "le" === r && this._initArray(this.toArray(), e, r)));
          }),
          (o.prototype._initNumber = function (t, e, r) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (n(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === r && this._initArray(this.toArray(), e, r);
          }),
          (o.prototype._initArray = function (t, e, r) {
            if ((n("number" == typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = Array(this.length));
            for (var i, o, s = 0; s < this.length; s++) this.words[s] = 0;
            var u = 0;
            if ("be" === r)
              for (s = t.length - 1, i = 0; s >= 0; s -= 3)
                (o = t[s] | (t[s - 1] << 8) | (t[s - 2] << 16)),
                  (this.words[i] |= (o << u) & 67108863),
                  (this.words[i + 1] = (o >>> (26 - u)) & 67108863),
                  (u += 24) >= 26 && ((u -= 26), i++);
            else if ("le" === r)
              for (s = 0, i = 0; s < t.length; s += 3)
                (o = t[s] | (t[s + 1] << 8) | (t[s + 2] << 16)),
                  (this.words[i] |= (o << u) & 67108863),
                  (this.words[i + 1] = (o >>> (26 - u)) & 67108863),
                  (u += 24) >= 26 && ((u -= 26), i++);
            return this._strip();
          }),
          (o.prototype._parseHex = function (t, e, r) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = Array(this.length));
            for (var n, i = 0; i < this.length; i++) this.words[i] = 0;
            var o = 0,
              s = 0;
            if ("be" === r)
              for (i = t.length - 1; i >= e; i -= 2)
                (n = u(t, e, i) << o),
                  (this.words[s] |= 67108863 & n),
                  o >= 18
                    ? ((o -= 18), (s += 1), (this.words[s] |= n >>> 26))
                    : (o += 8);
            else
              for (
                i = (t.length - e) % 2 == 0 ? e + 1 : e;
                i < t.length;
                i += 2
              )
                (n = u(t, e, i) << o),
                  (this.words[s] |= 67108863 & n),
                  o >= 18
                    ? ((o -= 18), (s += 1), (this.words[s] |= n >>> 26))
                    : (o += 8);
            this._strip();
          }),
          (o.prototype._parseBase = function (t, e, r) {
            (this.words = [0]), (this.length = 1);
            for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
            n--, (i = (i / e) | 0);
            for (
              var o = t.length - r,
                s = o % n,
                u = Math.min(o, o - s) + r,
                h = 0,
                l = r;
              l < u;
              l += n
            )
              (h = a(t, l, l + n, e)),
                this.imuln(i),
                this.words[0] + h < 67108864
                  ? (this.words[0] += h)
                  : this._iaddn(h);
            if (0 !== s) {
              var f = 1;
              for (h = a(t, l, t.length, e), l = 0; l < s; l++) f *= e;
              this.imuln(f),
                this.words[0] + h < 67108864
                  ? (this.words[0] += h)
                  : this._iaddn(h);
            }
            this._strip();
          }),
          (o.prototype.copy = function (t) {
            t.words = Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (o.prototype._move = function (t) {
            h(t, this);
          }),
          (o.prototype.clone = function () {
            var t = new o(null);
            return this.copy(t), t;
          }),
          (o.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (o.prototype._strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (o.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          "undefined" != typeof Symbol && "function" == typeof Symbol.for)
        )
          try {
            o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l;
          } catch (t) {
            o.prototype.inspect = l;
          }
        else o.prototype.inspect = l;
        function l() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        }
        var f,
          c = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          d = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          p = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        function g(t, e, r) {
          r.negative = e.negative ^ t.negative;
          var n = (t.length + e.length) | 0;
          (r.length = n), (n = (n - 1) | 0);
          var i = 0 | t.words[0],
            o = 0 | e.words[0],
            s = i * o,
            u = 67108863 & s,
            a = (s / 67108864) | 0;
          r.words[0] = u;
          for (var h = 1; h < n; h++) {
            for (
              var l = a >>> 26,
                f = 67108863 & a,
                c = Math.min(h, e.length - 1),
                d = Math.max(0, h - t.length + 1);
              d <= c;
              d++
            ) {
              var p = (h - d) | 0;
              (l +=
                ((s = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + f) /
                  67108864) |
                0),
                (f = 67108863 & s);
            }
            (r.words[h] = 0 | f), (a = 0 | l);
          }
          return 0 !== a ? (r.words[h] = 0 | a) : r.length--, r._strip();
        }
        (o.prototype.toString = function (t, e) {
          if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
            r = "";
            for (var r, i = 0, o = 0, s = 0; s < this.length; s++) {
              var u = this.words[s],
                a = (((u << i) | o) & 16777215).toString(16);
              (o = (u >>> (24 - i)) & 16777215),
                (i += 2) >= 26 && ((i -= 26), s--),
                (r =
                  0 !== o || s !== this.length - 1
                    ? c[6 - a.length] + a + r
                    : a + r);
            }
            for (0 !== o && (r = o.toString(16) + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var h = d[t],
              l = p[t];
            r = "";
            var f = this.clone();
            for (f.negative = 0; !f.isZero(); ) {
              var g = f.modrn(l).toString(t);
              r = (f = f.idivn(l)).isZero() ? g + r : c[h - g.length] + g + r;
            }
            for (this.isZero() && (r = "0" + r); r.length % e != 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          n(!1, "Base should be between 2 and 36");
        }),
          (o.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  n(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (o.prototype.toJSON = function () {
            return this.toString(16, 2);
          }),
          f &&
            (o.prototype.toBuffer = function (t, e) {
              return this.toArrayLike(f, t, e);
            }),
          (o.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          }),
          (o.prototype.toArrayLike = function (t, e, r) {
            this._strip();
            var i = this.byteLength(),
              o = r || Math.max(1, i);
            n(i <= o, "byte array longer than desired length"),
              n(o > 0, "Requested array length <= 0");
            var s = t.allocUnsafe ? t.allocUnsafe(o) : new t(o);
            return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, i), s;
          }),
          (o.prototype._toArrayLikeLE = function (t, e) {
            for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
              var s = (this.words[i] << o) | n;
              (t[r++] = 255 & s),
                r < t.length && (t[r++] = (s >> 8) & 255),
                r < t.length && (t[r++] = (s >> 16) & 255),
                6 === o
                  ? (r < t.length && (t[r++] = (s >> 24) & 255),
                    (n = 0),
                    (o = 0))
                  : ((n = s >>> 24), (o += 2));
            }
            if (r < t.length) for (t[r++] = n; r < t.length; ) t[r++] = 0;
          }),
          (o.prototype._toArrayLikeBE = function (t, e) {
            for (
              var r = t.length - 1, n = 0, i = 0, o = 0;
              i < this.length;
              i++
            ) {
              var s = (this.words[i] << o) | n;
              (t[r--] = 255 & s),
                r >= 0 && (t[r--] = (s >> 8) & 255),
                r >= 0 && (t[r--] = (s >> 16) & 255),
                6 === o
                  ? (r >= 0 && (t[r--] = (s >> 24) & 255), (n = 0), (o = 0))
                  : ((n = s >>> 24), (o += 2));
            }
            if (r >= 0) for (t[r--] = n; r >= 0; ) t[r--] = 0;
          }),
          Math.clz32
            ? (o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (o.prototype._countBits = function (t) {
                var e = t,
                  r = 0;
                return (
                  e >= 4096 && ((r += 13), (e >>>= 13)),
                  e >= 64 && ((r += 7), (e >>>= 7)),
                  e >= 8 && ((r += 4), (e >>>= 4)),
                  e >= 2 && ((r += 2), (e >>>= 2)),
                  r + e
                );
              }),
          (o.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              r = 0;
            return (
              (8191 & e) == 0 && ((r += 13), (e >>>= 13)),
              (127 & e) == 0 && ((r += 7), (e >>>= 7)),
              (15 & e) == 0 && ((r += 4), (e >>>= 4)),
              (3 & e) == 0 && ((r += 2), (e >>>= 2)),
              (1 & e) == 0 && r++,
              r
            );
          }),
          (o.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return (this.length - 1) * 26 + e;
          }),
          (o.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var r = this._zeroBits(this.words[e]);
              if (((t += r), 26 !== r)) break;
            }
            return t;
          }),
          (o.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (o.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (o.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (o.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (o.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (o.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (o.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this._strip();
          }),
          (o.prototype.ior = function (t) {
            return n((this.negative | t.negative) == 0), this.iuor(t);
          }),
          (o.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (o.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (o.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var r = 0; r < e.length; r++)
              this.words[r] = this.words[r] & t.words[r];
            return (this.length = e.length), this._strip();
          }),
          (o.prototype.iand = function (t) {
            return n((this.negative | t.negative) == 0), this.iuand(t);
          }),
          (o.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (o.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (o.prototype.iuxor = function (t) {
            this.length > t.length
              ? ((e = this), (r = t))
              : ((e = t), (r = this));
            for (var e, r, n = 0; n < r.length; n++)
              this.words[n] = e.words[n] ^ r.words[n];
            if (this !== e)
              for (; n < e.length; n++) this.words[n] = e.words[n];
            return (this.length = e.length), this._strip();
          }),
          (o.prototype.ixor = function (t) {
            return n((this.negative | t.negative) == 0), this.iuxor(t);
          }),
          (o.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (o.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (o.prototype.inotn = function (t) {
            n("number" == typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              r = t % 26;
            this._expand(e), r > 0 && e--;
            for (var i = 0; i < e; i++)
              this.words[i] = 67108863 & ~this.words[i];
            return (
              r > 0 &&
                (this.words[i] = ~this.words[i] & (67108863 >> (26 - r))),
              this._strip()
            );
          }),
          (o.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (o.prototype.setn = function (t, e) {
            n("number" == typeof t && t >= 0);
            var r = (t / 26) | 0,
              i = t % 26;
            return (
              this._expand(r + 1),
              e
                ? (this.words[r] = this.words[r] | (1 << i))
                : (this.words[r] = this.words[r] & ~(1 << i)),
              this._strip()
            );
          }),
          (o.prototype.iadd = function (t) {
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((r = this), (n = t))
              : ((r = t), (n = this));
            for (var e, r, n, i = 0, o = 0; o < n.length; o++)
              (e = (0 | r.words[o]) + (0 | n.words[o]) + i),
                (this.words[o] = 67108863 & e),
                (i = e >>> 26);
            for (; 0 !== i && o < r.length; o++)
              (e = (0 | r.words[o]) + i),
                (this.words[o] = 67108863 & e),
                (i = e >>> 26);
            if (((this.length = r.length), 0 !== i))
              (this.words[this.length] = i), this.length++;
            else if (r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o];
            return this;
          }),
          (o.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (o.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e,
                r,
                n = this.iadd(t);
              return (t.negative = 1), n._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var i = this.cmp(t);
            if (0 === i)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            i > 0 ? ((e = this), (r = t)) : ((e = t), (r = this));
            for (var o = 0, s = 0; s < r.length; s++)
              (o = (n = (0 | e.words[s]) - (0 | r.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & n);
            for (; 0 !== o && s < e.length; s++)
              (o = (n = (0 | e.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & n);
            if (0 === o && s < e.length && e !== this)
              for (; s < e.length; s++) this.words[s] = e.words[s];
            return (
              (this.length = Math.max(this.length, s)),
              e !== this && (this.negative = 1),
              this._strip()
            );
          }),
          (o.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var m = function (t, e, r) {
          var n,
            i,
            o,
            s = t.words,
            u = e.words,
            a = r.words,
            h = 0,
            l = 0 | s[0],
            f = 8191 & l,
            c = l >>> 13,
            d = 0 | s[1],
            p = 8191 & d,
            g = d >>> 13,
            m = 0 | s[2],
            y = 8191 & m,
            w = m >>> 13,
            v = 0 | s[3],
            b = 8191 & v,
            E = v >>> 13,
            M = 0 | s[4],
            x = 8191 & M,
            _ = M >>> 13,
            B = 0 | s[5],
            A = 8191 & B,
            S = B >>> 13,
            I = 0 | s[6],
            O = 8191 & I,
            U = I >>> 13,
            R = 0 | s[7],
            k = 8191 & R,
            L = R >>> 13,
            P = 0 | s[8],
            T = 8191 & P,
            C = P >>> 13,
            j = 0 | s[9],
            N = 8191 & j,
            z = j >>> 13,
            q = 0 | u[0],
            F = 8191 & q,
            $ = q >>> 13,
            Z = 0 | u[1],
            H = 8191 & Z,
            D = Z >>> 13,
            V = 0 | u[2],
            G = 8191 & V,
            K = V >>> 13,
            W = 0 | u[3],
            Y = 8191 & W,
            Q = W >>> 13,
            J = 0 | u[4],
            X = 8191 & J,
            tt = J >>> 13,
            te = 0 | u[5],
            tr = 8191 & te,
            tn = te >>> 13,
            ti = 0 | u[6],
            to = 8191 & ti,
            ts = ti >>> 13,
            tu = 0 | u[7],
            ta = 8191 & tu,
            th = tu >>> 13,
            tl = 0 | u[8],
            tf = 8191 & tl,
            tc = tl >>> 13,
            td = 0 | u[9],
            tp = 8191 & td,
            tg = td >>> 13;
          (r.negative = t.negative ^ e.negative), (r.length = 19);
          var tm =
            (((h + (n = Math.imul(f, F))) | 0) +
              ((8191 & (i = ((i = Math.imul(f, $)) + Math.imul(c, F)) | 0)) <<
                13)) |
            0;
          (h = ((((o = Math.imul(c, $)) + (i >>> 13)) | 0) + (tm >>> 26)) | 0),
            (tm &= 67108863),
            (n = Math.imul(p, F)),
            (i = ((i = Math.imul(p, $)) + Math.imul(g, F)) | 0),
            (o = Math.imul(g, $));
          var ty =
            (((h + (n = (n + Math.imul(f, H)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, D)) | 0) + Math.imul(c, H)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, D)) | 0) + (i >>> 13)) | 0) +
              (ty >>> 26)) |
            0),
            (ty &= 67108863),
            (n = Math.imul(y, F)),
            (i = ((i = Math.imul(y, $)) + Math.imul(w, F)) | 0),
            (o = Math.imul(w, $)),
            (n = (n + Math.imul(p, H)) | 0),
            (i = ((i = (i + Math.imul(p, D)) | 0) + Math.imul(g, H)) | 0),
            (o = (o + Math.imul(g, D)) | 0);
          var tw =
            (((h + (n = (n + Math.imul(f, G)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, K)) | 0) + Math.imul(c, G)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, K)) | 0) + (i >>> 13)) | 0) +
              (tw >>> 26)) |
            0),
            (tw &= 67108863),
            (n = Math.imul(b, F)),
            (i = ((i = Math.imul(b, $)) + Math.imul(E, F)) | 0),
            (o = Math.imul(E, $)),
            (n = (n + Math.imul(y, H)) | 0),
            (i = ((i = (i + Math.imul(y, D)) | 0) + Math.imul(w, H)) | 0),
            (o = (o + Math.imul(w, D)) | 0),
            (n = (n + Math.imul(p, G)) | 0),
            (i = ((i = (i + Math.imul(p, K)) | 0) + Math.imul(g, G)) | 0),
            (o = (o + Math.imul(g, K)) | 0);
          var tv =
            (((h + (n = (n + Math.imul(f, Y)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, Q)) | 0) + Math.imul(c, Y)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, Q)) | 0) + (i >>> 13)) | 0) +
              (tv >>> 26)) |
            0),
            (tv &= 67108863),
            (n = Math.imul(x, F)),
            (i = ((i = Math.imul(x, $)) + Math.imul(_, F)) | 0),
            (o = Math.imul(_, $)),
            (n = (n + Math.imul(b, H)) | 0),
            (i = ((i = (i + Math.imul(b, D)) | 0) + Math.imul(E, H)) | 0),
            (o = (o + Math.imul(E, D)) | 0),
            (n = (n + Math.imul(y, G)) | 0),
            (i = ((i = (i + Math.imul(y, K)) | 0) + Math.imul(w, G)) | 0),
            (o = (o + Math.imul(w, K)) | 0),
            (n = (n + Math.imul(p, Y)) | 0),
            (i = ((i = (i + Math.imul(p, Q)) | 0) + Math.imul(g, Y)) | 0),
            (o = (o + Math.imul(g, Q)) | 0);
          var tb =
            (((h + (n = (n + Math.imul(f, X)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, tt)) | 0) + Math.imul(c, X)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, tt)) | 0) + (i >>> 13)) | 0) +
              (tb >>> 26)) |
            0),
            (tb &= 67108863),
            (n = Math.imul(A, F)),
            (i = ((i = Math.imul(A, $)) + Math.imul(S, F)) | 0),
            (o = Math.imul(S, $)),
            (n = (n + Math.imul(x, H)) | 0),
            (i = ((i = (i + Math.imul(x, D)) | 0) + Math.imul(_, H)) | 0),
            (o = (o + Math.imul(_, D)) | 0),
            (n = (n + Math.imul(b, G)) | 0),
            (i = ((i = (i + Math.imul(b, K)) | 0) + Math.imul(E, G)) | 0),
            (o = (o + Math.imul(E, K)) | 0),
            (n = (n + Math.imul(y, Y)) | 0),
            (i = ((i = (i + Math.imul(y, Q)) | 0) + Math.imul(w, Y)) | 0),
            (o = (o + Math.imul(w, Q)) | 0),
            (n = (n + Math.imul(p, X)) | 0),
            (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(g, X)) | 0),
            (o = (o + Math.imul(g, tt)) | 0);
          var tE =
            (((h + (n = (n + Math.imul(f, tr)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, tn)) | 0) + Math.imul(c, tr)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, tn)) | 0) + (i >>> 13)) | 0) +
              (tE >>> 26)) |
            0),
            (tE &= 67108863),
            (n = Math.imul(O, F)),
            (i = ((i = Math.imul(O, $)) + Math.imul(U, F)) | 0),
            (o = Math.imul(U, $)),
            (n = (n + Math.imul(A, H)) | 0),
            (i = ((i = (i + Math.imul(A, D)) | 0) + Math.imul(S, H)) | 0),
            (o = (o + Math.imul(S, D)) | 0),
            (n = (n + Math.imul(x, G)) | 0),
            (i = ((i = (i + Math.imul(x, K)) | 0) + Math.imul(_, G)) | 0),
            (o = (o + Math.imul(_, K)) | 0),
            (n = (n + Math.imul(b, Y)) | 0),
            (i = ((i = (i + Math.imul(b, Q)) | 0) + Math.imul(E, Y)) | 0),
            (o = (o + Math.imul(E, Q)) | 0),
            (n = (n + Math.imul(y, X)) | 0),
            (i = ((i = (i + Math.imul(y, tt)) | 0) + Math.imul(w, X)) | 0),
            (o = (o + Math.imul(w, tt)) | 0),
            (n = (n + Math.imul(p, tr)) | 0),
            (i = ((i = (i + Math.imul(p, tn)) | 0) + Math.imul(g, tr)) | 0),
            (o = (o + Math.imul(g, tn)) | 0);
          var tM =
            (((h + (n = (n + Math.imul(f, to)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, ts)) | 0) + Math.imul(c, to)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, ts)) | 0) + (i >>> 13)) | 0) +
              (tM >>> 26)) |
            0),
            (tM &= 67108863),
            (n = Math.imul(k, F)),
            (i = ((i = Math.imul(k, $)) + Math.imul(L, F)) | 0),
            (o = Math.imul(L, $)),
            (n = (n + Math.imul(O, H)) | 0),
            (i = ((i = (i + Math.imul(O, D)) | 0) + Math.imul(U, H)) | 0),
            (o = (o + Math.imul(U, D)) | 0),
            (n = (n + Math.imul(A, G)) | 0),
            (i = ((i = (i + Math.imul(A, K)) | 0) + Math.imul(S, G)) | 0),
            (o = (o + Math.imul(S, K)) | 0),
            (n = (n + Math.imul(x, Y)) | 0),
            (i = ((i = (i + Math.imul(x, Q)) | 0) + Math.imul(_, Y)) | 0),
            (o = (o + Math.imul(_, Q)) | 0),
            (n = (n + Math.imul(b, X)) | 0),
            (i = ((i = (i + Math.imul(b, tt)) | 0) + Math.imul(E, X)) | 0),
            (o = (o + Math.imul(E, tt)) | 0),
            (n = (n + Math.imul(y, tr)) | 0),
            (i = ((i = (i + Math.imul(y, tn)) | 0) + Math.imul(w, tr)) | 0),
            (o = (o + Math.imul(w, tn)) | 0),
            (n = (n + Math.imul(p, to)) | 0),
            (i = ((i = (i + Math.imul(p, ts)) | 0) + Math.imul(g, to)) | 0),
            (o = (o + Math.imul(g, ts)) | 0);
          var tx =
            (((h + (n = (n + Math.imul(f, ta)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, th)) | 0) + Math.imul(c, ta)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, th)) | 0) + (i >>> 13)) | 0) +
              (tx >>> 26)) |
            0),
            (tx &= 67108863),
            (n = Math.imul(T, F)),
            (i = ((i = Math.imul(T, $)) + Math.imul(C, F)) | 0),
            (o = Math.imul(C, $)),
            (n = (n + Math.imul(k, H)) | 0),
            (i = ((i = (i + Math.imul(k, D)) | 0) + Math.imul(L, H)) | 0),
            (o = (o + Math.imul(L, D)) | 0),
            (n = (n + Math.imul(O, G)) | 0),
            (i = ((i = (i + Math.imul(O, K)) | 0) + Math.imul(U, G)) | 0),
            (o = (o + Math.imul(U, K)) | 0),
            (n = (n + Math.imul(A, Y)) | 0),
            (i = ((i = (i + Math.imul(A, Q)) | 0) + Math.imul(S, Y)) | 0),
            (o = (o + Math.imul(S, Q)) | 0),
            (n = (n + Math.imul(x, X)) | 0),
            (i = ((i = (i + Math.imul(x, tt)) | 0) + Math.imul(_, X)) | 0),
            (o = (o + Math.imul(_, tt)) | 0),
            (n = (n + Math.imul(b, tr)) | 0),
            (i = ((i = (i + Math.imul(b, tn)) | 0) + Math.imul(E, tr)) | 0),
            (o = (o + Math.imul(E, tn)) | 0),
            (n = (n + Math.imul(y, to)) | 0),
            (i = ((i = (i + Math.imul(y, ts)) | 0) + Math.imul(w, to)) | 0),
            (o = (o + Math.imul(w, ts)) | 0),
            (n = (n + Math.imul(p, ta)) | 0),
            (i = ((i = (i + Math.imul(p, th)) | 0) + Math.imul(g, ta)) | 0),
            (o = (o + Math.imul(g, th)) | 0);
          var t_ =
            (((h + (n = (n + Math.imul(f, tf)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, tc)) | 0) + Math.imul(c, tf)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, tc)) | 0) + (i >>> 13)) | 0) +
              (t_ >>> 26)) |
            0),
            (t_ &= 67108863),
            (n = Math.imul(N, F)),
            (i = ((i = Math.imul(N, $)) + Math.imul(z, F)) | 0),
            (o = Math.imul(z, $)),
            (n = (n + Math.imul(T, H)) | 0),
            (i = ((i = (i + Math.imul(T, D)) | 0) + Math.imul(C, H)) | 0),
            (o = (o + Math.imul(C, D)) | 0),
            (n = (n + Math.imul(k, G)) | 0),
            (i = ((i = (i + Math.imul(k, K)) | 0) + Math.imul(L, G)) | 0),
            (o = (o + Math.imul(L, K)) | 0),
            (n = (n + Math.imul(O, Y)) | 0),
            (i = ((i = (i + Math.imul(O, Q)) | 0) + Math.imul(U, Y)) | 0),
            (o = (o + Math.imul(U, Q)) | 0),
            (n = (n + Math.imul(A, X)) | 0),
            (i = ((i = (i + Math.imul(A, tt)) | 0) + Math.imul(S, X)) | 0),
            (o = (o + Math.imul(S, tt)) | 0),
            (n = (n + Math.imul(x, tr)) | 0),
            (i = ((i = (i + Math.imul(x, tn)) | 0) + Math.imul(_, tr)) | 0),
            (o = (o + Math.imul(_, tn)) | 0),
            (n = (n + Math.imul(b, to)) | 0),
            (i = ((i = (i + Math.imul(b, ts)) | 0) + Math.imul(E, to)) | 0),
            (o = (o + Math.imul(E, ts)) | 0),
            (n = (n + Math.imul(y, ta)) | 0),
            (i = ((i = (i + Math.imul(y, th)) | 0) + Math.imul(w, ta)) | 0),
            (o = (o + Math.imul(w, th)) | 0),
            (n = (n + Math.imul(p, tf)) | 0),
            (i = ((i = (i + Math.imul(p, tc)) | 0) + Math.imul(g, tf)) | 0),
            (o = (o + Math.imul(g, tc)) | 0);
          var tB =
            (((h + (n = (n + Math.imul(f, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(f, tg)) | 0) + Math.imul(c, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(c, tg)) | 0) + (i >>> 13)) | 0) +
              (tB >>> 26)) |
            0),
            (tB &= 67108863),
            (n = Math.imul(N, H)),
            (i = ((i = Math.imul(N, D)) + Math.imul(z, H)) | 0),
            (o = Math.imul(z, D)),
            (n = (n + Math.imul(T, G)) | 0),
            (i = ((i = (i + Math.imul(T, K)) | 0) + Math.imul(C, G)) | 0),
            (o = (o + Math.imul(C, K)) | 0),
            (n = (n + Math.imul(k, Y)) | 0),
            (i = ((i = (i + Math.imul(k, Q)) | 0) + Math.imul(L, Y)) | 0),
            (o = (o + Math.imul(L, Q)) | 0),
            (n = (n + Math.imul(O, X)) | 0),
            (i = ((i = (i + Math.imul(O, tt)) | 0) + Math.imul(U, X)) | 0),
            (o = (o + Math.imul(U, tt)) | 0),
            (n = (n + Math.imul(A, tr)) | 0),
            (i = ((i = (i + Math.imul(A, tn)) | 0) + Math.imul(S, tr)) | 0),
            (o = (o + Math.imul(S, tn)) | 0),
            (n = (n + Math.imul(x, to)) | 0),
            (i = ((i = (i + Math.imul(x, ts)) | 0) + Math.imul(_, to)) | 0),
            (o = (o + Math.imul(_, ts)) | 0),
            (n = (n + Math.imul(b, ta)) | 0),
            (i = ((i = (i + Math.imul(b, th)) | 0) + Math.imul(E, ta)) | 0),
            (o = (o + Math.imul(E, th)) | 0),
            (n = (n + Math.imul(y, tf)) | 0),
            (i = ((i = (i + Math.imul(y, tc)) | 0) + Math.imul(w, tf)) | 0),
            (o = (o + Math.imul(w, tc)) | 0);
          var tA =
            (((h + (n = (n + Math.imul(p, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(p, tg)) | 0) + Math.imul(g, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(g, tg)) | 0) + (i >>> 13)) | 0) +
              (tA >>> 26)) |
            0),
            (tA &= 67108863),
            (n = Math.imul(N, G)),
            (i = ((i = Math.imul(N, K)) + Math.imul(z, G)) | 0),
            (o = Math.imul(z, K)),
            (n = (n + Math.imul(T, Y)) | 0),
            (i = ((i = (i + Math.imul(T, Q)) | 0) + Math.imul(C, Y)) | 0),
            (o = (o + Math.imul(C, Q)) | 0),
            (n = (n + Math.imul(k, X)) | 0),
            (i = ((i = (i + Math.imul(k, tt)) | 0) + Math.imul(L, X)) | 0),
            (o = (o + Math.imul(L, tt)) | 0),
            (n = (n + Math.imul(O, tr)) | 0),
            (i = ((i = (i + Math.imul(O, tn)) | 0) + Math.imul(U, tr)) | 0),
            (o = (o + Math.imul(U, tn)) | 0),
            (n = (n + Math.imul(A, to)) | 0),
            (i = ((i = (i + Math.imul(A, ts)) | 0) + Math.imul(S, to)) | 0),
            (o = (o + Math.imul(S, ts)) | 0),
            (n = (n + Math.imul(x, ta)) | 0),
            (i = ((i = (i + Math.imul(x, th)) | 0) + Math.imul(_, ta)) | 0),
            (o = (o + Math.imul(_, th)) | 0),
            (n = (n + Math.imul(b, tf)) | 0),
            (i = ((i = (i + Math.imul(b, tc)) | 0) + Math.imul(E, tf)) | 0),
            (o = (o + Math.imul(E, tc)) | 0);
          var tS =
            (((h + (n = (n + Math.imul(y, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(y, tg)) | 0) + Math.imul(w, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(w, tg)) | 0) + (i >>> 13)) | 0) +
              (tS >>> 26)) |
            0),
            (tS &= 67108863),
            (n = Math.imul(N, Y)),
            (i = ((i = Math.imul(N, Q)) + Math.imul(z, Y)) | 0),
            (o = Math.imul(z, Q)),
            (n = (n + Math.imul(T, X)) | 0),
            (i = ((i = (i + Math.imul(T, tt)) | 0) + Math.imul(C, X)) | 0),
            (o = (o + Math.imul(C, tt)) | 0),
            (n = (n + Math.imul(k, tr)) | 0),
            (i = ((i = (i + Math.imul(k, tn)) | 0) + Math.imul(L, tr)) | 0),
            (o = (o + Math.imul(L, tn)) | 0),
            (n = (n + Math.imul(O, to)) | 0),
            (i = ((i = (i + Math.imul(O, ts)) | 0) + Math.imul(U, to)) | 0),
            (o = (o + Math.imul(U, ts)) | 0),
            (n = (n + Math.imul(A, ta)) | 0),
            (i = ((i = (i + Math.imul(A, th)) | 0) + Math.imul(S, ta)) | 0),
            (o = (o + Math.imul(S, th)) | 0),
            (n = (n + Math.imul(x, tf)) | 0),
            (i = ((i = (i + Math.imul(x, tc)) | 0) + Math.imul(_, tf)) | 0),
            (o = (o + Math.imul(_, tc)) | 0);
          var tI =
            (((h + (n = (n + Math.imul(b, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(b, tg)) | 0) + Math.imul(E, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(E, tg)) | 0) + (i >>> 13)) | 0) +
              (tI >>> 26)) |
            0),
            (tI &= 67108863),
            (n = Math.imul(N, X)),
            (i = ((i = Math.imul(N, tt)) + Math.imul(z, X)) | 0),
            (o = Math.imul(z, tt)),
            (n = (n + Math.imul(T, tr)) | 0),
            (i = ((i = (i + Math.imul(T, tn)) | 0) + Math.imul(C, tr)) | 0),
            (o = (o + Math.imul(C, tn)) | 0),
            (n = (n + Math.imul(k, to)) | 0),
            (i = ((i = (i + Math.imul(k, ts)) | 0) + Math.imul(L, to)) | 0),
            (o = (o + Math.imul(L, ts)) | 0),
            (n = (n + Math.imul(O, ta)) | 0),
            (i = ((i = (i + Math.imul(O, th)) | 0) + Math.imul(U, ta)) | 0),
            (o = (o + Math.imul(U, th)) | 0),
            (n = (n + Math.imul(A, tf)) | 0),
            (i = ((i = (i + Math.imul(A, tc)) | 0) + Math.imul(S, tf)) | 0),
            (o = (o + Math.imul(S, tc)) | 0);
          var tO =
            (((h + (n = (n + Math.imul(x, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(x, tg)) | 0) + Math.imul(_, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(_, tg)) | 0) + (i >>> 13)) | 0) +
              (tO >>> 26)) |
            0),
            (tO &= 67108863),
            (n = Math.imul(N, tr)),
            (i = ((i = Math.imul(N, tn)) + Math.imul(z, tr)) | 0),
            (o = Math.imul(z, tn)),
            (n = (n + Math.imul(T, to)) | 0),
            (i = ((i = (i + Math.imul(T, ts)) | 0) + Math.imul(C, to)) | 0),
            (o = (o + Math.imul(C, ts)) | 0),
            (n = (n + Math.imul(k, ta)) | 0),
            (i = ((i = (i + Math.imul(k, th)) | 0) + Math.imul(L, ta)) | 0),
            (o = (o + Math.imul(L, th)) | 0),
            (n = (n + Math.imul(O, tf)) | 0),
            (i = ((i = (i + Math.imul(O, tc)) | 0) + Math.imul(U, tf)) | 0),
            (o = (o + Math.imul(U, tc)) | 0);
          var tU =
            (((h + (n = (n + Math.imul(A, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(A, tg)) | 0) + Math.imul(S, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(S, tg)) | 0) + (i >>> 13)) | 0) +
              (tU >>> 26)) |
            0),
            (tU &= 67108863),
            (n = Math.imul(N, to)),
            (i = ((i = Math.imul(N, ts)) + Math.imul(z, to)) | 0),
            (o = Math.imul(z, ts)),
            (n = (n + Math.imul(T, ta)) | 0),
            (i = ((i = (i + Math.imul(T, th)) | 0) + Math.imul(C, ta)) | 0),
            (o = (o + Math.imul(C, th)) | 0),
            (n = (n + Math.imul(k, tf)) | 0),
            (i = ((i = (i + Math.imul(k, tc)) | 0) + Math.imul(L, tf)) | 0),
            (o = (o + Math.imul(L, tc)) | 0);
          var tR =
            (((h + (n = (n + Math.imul(O, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(O, tg)) | 0) + Math.imul(U, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(U, tg)) | 0) + (i >>> 13)) | 0) +
              (tR >>> 26)) |
            0),
            (tR &= 67108863),
            (n = Math.imul(N, ta)),
            (i = ((i = Math.imul(N, th)) + Math.imul(z, ta)) | 0),
            (o = Math.imul(z, th)),
            (n = (n + Math.imul(T, tf)) | 0),
            (i = ((i = (i + Math.imul(T, tc)) | 0) + Math.imul(C, tf)) | 0),
            (o = (o + Math.imul(C, tc)) | 0);
          var tk =
            (((h + (n = (n + Math.imul(k, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(k, tg)) | 0) + Math.imul(L, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(L, tg)) | 0) + (i >>> 13)) | 0) +
              (tk >>> 26)) |
            0),
            (tk &= 67108863),
            (n = Math.imul(N, tf)),
            (i = ((i = Math.imul(N, tc)) + Math.imul(z, tf)) | 0),
            (o = Math.imul(z, tc));
          var tL =
            (((h + (n = (n + Math.imul(T, tp)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(T, tg)) | 0) + Math.imul(C, tp)) | 0)) <<
                13)) |
            0;
          (h =
            ((((o = (o + Math.imul(C, tg)) | 0) + (i >>> 13)) | 0) +
              (tL >>> 26)) |
            0),
            (tL &= 67108863);
          var tP =
            (((h + (n = Math.imul(N, tp))) | 0) +
              ((8191 & (i = ((i = Math.imul(N, tg)) + Math.imul(z, tp)) | 0)) <<
                13)) |
            0;
          return (
            (h =
              ((((o = Math.imul(z, tg)) + (i >>> 13)) | 0) + (tP >>> 26)) | 0),
            (tP &= 67108863),
            (a[0] = tm),
            (a[1] = ty),
            (a[2] = tw),
            (a[3] = tv),
            (a[4] = tb),
            (a[5] = tE),
            (a[6] = tM),
            (a[7] = tx),
            (a[8] = t_),
            (a[9] = tB),
            (a[10] = tA),
            (a[11] = tS),
            (a[12] = tI),
            (a[13] = tO),
            (a[14] = tU),
            (a[15] = tR),
            (a[16] = tk),
            (a[17] = tL),
            (a[18] = tP),
            0 !== h && ((a[19] = h), r.length++),
            r
          );
        };
        function y(t, e, r) {
          (r.negative = e.negative ^ t.negative),
            (r.length = t.length + e.length);
          for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
            var s = i;
            i = 0;
            for (
              var u = 67108863 & n,
                a = Math.min(o, e.length - 1),
                h = Math.max(0, o - t.length + 1);
              h <= a;
              h++
            ) {
              var l = o - h,
                f = (0 | t.words[l]) * (0 | e.words[h]),
                c = 67108863 & f;
              (s = (s + ((f / 67108864) | 0)) | 0),
                (u = 67108863 & (c = (c + u) | 0)),
                (i += (s = (s + (c >>> 26)) | 0) >>> 26),
                (s &= 67108863);
            }
            (r.words[o] = u), (n = s), (s = i);
          }
          return 0 !== n ? (r.words[o] = n) : r.length--, r._strip();
        }
        function w(t, e) {
          (this.x = t), (this.y = e);
        }
        Math.imul || (m = g),
          (o.prototype.mulTo = function (t, e) {
            var r,
              n = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? m(this, t, e)
              : n < 63
              ? g(this, t, e)
              : y(this, t, e);
          }),
          (w.prototype.makeRBT = function (t) {
            for (
              var e = Array(t), r = o.prototype._countBits(t) - 1, n = 0;
              n < t;
              n++
            )
              e[n] = this.revBin(n, r, t);
            return e;
          }),
          (w.prototype.revBin = function (t, e, r) {
            if (0 === t || t === r - 1) return t;
            for (var n = 0, i = 0; i < e; i++)
              (n |= (1 & t) << (e - i - 1)), (t >>= 1);
            return n;
          }),
          (w.prototype.permute = function (t, e, r, n, i, o) {
            for (var s = 0; s < o; s++) (n[s] = e[t[s]]), (i[s] = r[t[s]]);
          }),
          (w.prototype.transform = function (t, e, r, n, i, o) {
            this.permute(o, t, e, r, n, i);
            for (var s = 1; s < i; s <<= 1)
              for (
                var u = s << 1,
                  a = Math.cos((2 * Math.PI) / u),
                  h = Math.sin((2 * Math.PI) / u),
                  l = 0;
                l < i;
                l += u
              )
                for (var f = a, c = h, d = 0; d < s; d++) {
                  var p = r[l + d],
                    g = n[l + d],
                    m = r[l + d + s],
                    y = n[l + d + s],
                    w = f * m - c * y;
                  (y = f * y + c * m),
                    (m = w),
                    (r[l + d] = p + m),
                    (n[l + d] = g + y),
                    (r[l + d + s] = p - m),
                    (n[l + d + s] = g - y),
                    d !== u &&
                      ((w = a * f - h * c), (c = a * c + h * f), (f = w));
                }
          }),
          (w.prototype.guessLen13b = function (t, e) {
            var r = 1 | Math.max(e, t),
              n = 1 & r,
              i = 0;
            for (r = (r / 2) | 0; r; r >>>= 1) i++;
            return 1 << (i + 1 + n);
          }),
          (w.prototype.conjugate = function (t, e, r) {
            if (!(r <= 1))
              for (var n = 0; n < r / 2; n++) {
                var i = t[n];
                (t[n] = t[r - n - 1]),
                  (t[r - n - 1] = i),
                  (i = e[n]),
                  (e[n] = -e[r - n - 1]),
                  (e[r - n - 1] = -i);
              }
          }),
          (w.prototype.normalize13b = function (t, e) {
            for (var r = 0, n = 0; n < e / 2; n++) {
              var i =
                8192 * Math.round(t[2 * n + 1] / e) +
                Math.round(t[2 * n] / e) +
                r;
              (t[n] = 67108863 & i),
                (r = i < 67108864 ? 0 : (i / 67108864) | 0);
            }
            return t;
          }),
          (w.prototype.convert13b = function (t, e, r, i) {
            for (var o = 0, s = 0; s < e; s++)
              (o += 0 | t[s]),
                (r[2 * s] = 8191 & o),
                (o >>>= 13),
                (r[2 * s + 1] = 8191 & o),
                (o >>>= 13);
            for (s = 2 * e; s < i; ++s) r[s] = 0;
            n(0 === o), n((-8192 & o) == 0);
          }),
          (w.prototype.stub = function (t) {
            for (var e = Array(t), r = 0; r < t; r++) e[r] = 0;
            return e;
          }),
          (w.prototype.mulp = function (t, e, r) {
            var n = 2 * this.guessLen13b(t.length, e.length),
              i = this.makeRBT(n),
              o = this.stub(n),
              s = Array(n),
              u = Array(n),
              a = Array(n),
              h = Array(n),
              l = Array(n),
              f = Array(n),
              c = r.words;
            (c.length = n),
              this.convert13b(t.words, t.length, s, n),
              this.convert13b(e.words, e.length, h, n),
              this.transform(s, o, u, a, n, i),
              this.transform(h, o, l, f, n, i);
            for (var d = 0; d < n; d++) {
              var p = u[d] * l[d] - a[d] * f[d];
              (a[d] = u[d] * f[d] + a[d] * l[d]), (u[d] = p);
            }
            return (
              this.conjugate(u, a, n),
              this.transform(u, a, c, o, n, i),
              this.conjugate(c, o, n),
              this.normalize13b(c, n),
              (r.negative = t.negative ^ e.negative),
              (r.length = t.length + e.length),
              r._strip()
            );
          }),
          (o.prototype.mul = function (t) {
            var e = new o(null);
            return (e.words = Array(this.length + t.length)), this.mulTo(t, e);
          }),
          (o.prototype.mulf = function (t) {
            var e = new o(null);
            return (e.words = Array(this.length + t.length)), y(this, t, e);
          }),
          (o.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (o.prototype.imuln = function (t) {
            var e = t < 0;
            e && (t = -t), n("number" == typeof t), n(t < 67108864);
            for (var r = 0, i = 0; i < this.length; i++) {
              var o = (0 | this.words[i]) * t,
                s = (67108863 & o) + (67108863 & r);
              (r >>= 26),
                (r += ((o / 67108864) | 0) + (s >>> 26)),
                (this.words[i] = 67108863 & s);
            }
            return (
              0 !== r && ((this.words[i] = r), this.length++),
              e ? this.ineg() : this
            );
          }),
          (o.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (o.prototype.sqr = function () {
            return this.mul(this);
          }),
          (o.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (o.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = Array(t.bitLength()), r = 0; r < e.length; r++) {
                var n = (r / 26) | 0,
                  i = r % 26;
                e[r] = (t.words[n] >>> i) & 1;
              }
              return e;
            })(t);
            if (0 === e.length) return new o(1);
            for (
              var r = this, n = 0;
              n < e.length && 0 === e[n];
              n++, r = r.sqr()
            );
            if (++n < e.length)
              for (var i = r.sqr(); n < e.length; n++, i = i.sqr())
                0 !== e[n] && (r = r.mul(i));
            return r;
          }),
          (o.prototype.iushln = function (t) {
            n("number" == typeof t && t >= 0);
            var e,
              r = t % 26,
              i = (t - r) / 26,
              o = (67108863 >>> (26 - r)) << (26 - r);
            if (0 !== r) {
              var s = 0;
              for (e = 0; e < this.length; e++) {
                var u = this.words[e] & o,
                  a = ((0 | this.words[e]) - u) << r;
                (this.words[e] = a | s), (s = u >>> (26 - r));
              }
              s && ((this.words[e] = s), this.length++);
            }
            if (0 !== i) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + i] = this.words[e];
              for (e = 0; e < i; e++) this.words[e] = 0;
              this.length += i;
            }
            return this._strip();
          }),
          (o.prototype.ishln = function (t) {
            return n(0 === this.negative), this.iushln(t);
          }),
          (o.prototype.iushrn = function (t, e, r) {
            n("number" == typeof t && t >= 0),
              (i = e ? (e - (e % 26)) / 26 : 0);
            var i,
              o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              u = 67108863 ^ ((67108863 >>> o) << o);
            if (((i -= s), (i = Math.max(0, i)), r)) {
              for (var a = 0; a < s; a++) r.words[a] = this.words[a];
              r.length = s;
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, a = 0; a < this.length; a++)
                this.words[a] = this.words[a + s];
            else (this.words[0] = 0), (this.length = 1);
            var h = 0;
            for (a = this.length - 1; a >= 0 && (0 !== h || a >= i); a--) {
              var l = 0 | this.words[a];
              (this.words[a] = (h << (26 - o)) | (l >>> o)), (h = l & u);
            }
            return (
              r && 0 !== h && (r.words[r.length++] = h),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this._strip()
            );
          }),
          (o.prototype.ishrn = function (t, e, r) {
            return n(0 === this.negative), this.iushrn(t, e, r);
          }),
          (o.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (o.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (o.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (o.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (o.prototype.testn = function (t) {
            n("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            return !(this.length <= r) && !!(this.words[r] & (1 << e));
          }),
          (o.prototype.imaskn = function (t) {
            n("number" == typeof t && t >= 0);
            var e = t % 26,
              r = (t - e) / 26;
            return (n(
              0 === this.negative,
              "imaskn works only with positive numbers"
            ),
            this.length <= r)
              ? this
              : (0 !== e && r++,
                (this.length = Math.min(r, this.length)),
                0 !== e &&
                  (this.words[this.length - 1] &=
                    67108863 ^ ((67108863 >>> e) << e)),
                this._strip());
          }),
          (o.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (o.prototype.iaddn = function (t) {
            return (n("number" == typeof t), n(t < 67108864), t < 0)
              ? this.isubn(-t)
              : 0 !== this.negative
              ? (1 === this.length && (0 | this.words[0]) <= t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0))
                  : ((this.negative = 0), this.isubn(t), (this.negative = 1)),
                this)
              : this._iaddn(t);
          }),
          (o.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (o.prototype.isubn = function (t) {
            if ((n("number" == typeof t), n(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1);
            return this._strip();
          }),
          (o.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (o.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (o.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (o.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (o.prototype._ishlnsubmul = function (t, e, r) {
            var i,
              o,
              s = t.length + r;
            this._expand(s);
            var u = 0;
            for (i = 0; i < t.length; i++) {
              o = (0 | this.words[i + r]) + u;
              var a = (0 | t.words[i]) * e;
              (o -= 67108863 & a),
                (u = (o >> 26) - ((a / 67108864) | 0)),
                (this.words[i + r] = 67108863 & o);
            }
            for (; i < this.length - r; i++)
              (u = (o = (0 | this.words[i + r]) + u) >> 26),
                (this.words[i + r] = 67108863 & o);
            if (0 === u) return this._strip();
            for (n(-1 === u), u = 0, i = 0; i < this.length; i++)
              (u = (o = -(0 | this.words[i]) + u) >> 26),
                (this.words[i] = 67108863 & o);
            return (this.negative = 1), this._strip();
          }),
          (o.prototype._wordDiv = function (t, e) {
            var r,
              n = this.length - t.length,
              i = this.clone(),
              s = t,
              u = 0 | s.words[s.length - 1];
            0 != (n = 26 - this._countBits(u)) &&
              ((s = s.ushln(n)), i.iushln(n), (u = 0 | s.words[s.length - 1]));
            var a = i.length - s.length;
            if ("mod" !== e) {
              ((r = new o(null)).length = a + 1), (r.words = Array(r.length));
              for (var h = 0; h < r.length; h++) r.words[h] = 0;
            }
            var l = i.clone()._ishlnsubmul(s, 1, a);
            0 === l.negative && ((i = l), r && (r.words[a] = 1));
            for (var f = a - 1; f >= 0; f--) {
              var c =
                (0 | i.words[s.length + f]) * 67108864 +
                (0 | i.words[s.length + f - 1]);
              for (
                c = Math.min((c / u) | 0, 67108863), i._ishlnsubmul(s, c, f);
                0 !== i.negative;

              )
                c--,
                  (i.negative = 0),
                  i._ishlnsubmul(s, 1, f),
                  i.isZero() || (i.negative ^= 1);
              r && (r.words[f] = c);
            }
            return (
              r && r._strip(),
              i._strip(),
              "div" !== e && 0 !== n && i.iushrn(n),
              { div: r || null, mod: i }
            );
          }),
          (o.prototype.divmod = function (t, e, r) {
            var i, s, u;
            return (n(!t.isZero()), this.isZero())
              ? { div: new o(0), mod: new o(0) }
              : 0 !== this.negative && 0 === t.negative
              ? ((u = this.neg().divmod(t, e)),
                "mod" !== e && (i = u.div.neg()),
                "div" !== e &&
                  ((s = u.mod.neg()), r && 0 !== s.negative && s.iadd(t)),
                { div: i, mod: s })
              : 0 === this.negative && 0 !== t.negative
              ? ((u = this.divmod(t.neg(), e)),
                "mod" !== e && (i = u.div.neg()),
                { div: i, mod: u.mod })
              : (this.negative & t.negative) != 0
              ? ((u = this.neg().divmod(t.neg(), e)),
                "div" !== e &&
                  ((s = u.mod.neg()), r && 0 !== s.negative && s.isub(t)),
                { div: u.div, mod: s })
              : t.length > this.length || 0 > this.cmp(t)
              ? { div: new o(0), mod: this }
              : 1 === t.length
              ? "div" === e
                ? { div: this.divn(t.words[0]), mod: null }
                : "mod" === e
                ? { div: null, mod: new o(this.modrn(t.words[0])) }
                : {
                    div: this.divn(t.words[0]),
                    mod: new o(this.modrn(t.words[0])),
                  }
              : this._wordDiv(t, e);
          }),
          (o.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (o.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (o.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (o.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              n = t.ushrn(1),
              i = t.andln(1),
              o = r.cmp(n);
            return o < 0 || (1 === i && 0 === o)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (o.prototype.modrn = function (t) {
            var e = t < 0;
            e && (t = -t), n(t <= 67108863);
            for (var r = 67108864 % t, i = 0, o = this.length - 1; o >= 0; o--)
              i = (r * i + (0 | this.words[o])) % t;
            return e ? -i : i;
          }),
          (o.prototype.modn = function (t) {
            return this.modrn(t);
          }),
          (o.prototype.idivn = function (t) {
            var e = t < 0;
            e && (t = -t), n(t <= 67108863);
            for (var r = 0, i = this.length - 1; i >= 0; i--) {
              var o = (0 | this.words[i]) + 67108864 * r;
              (this.words[i] = (o / t) | 0), (r = o % t);
            }
            return this._strip(), e ? this.ineg() : this;
          }),
          (o.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (o.prototype.egcd = function (t) {
            n(0 === t.negative), n(!t.isZero());
            var e = this,
              r = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var i = new o(1), s = new o(0), u = new o(0), a = new o(1), h = 0;
              e.isEven() && r.isEven();

            )
              e.iushrn(1), r.iushrn(1), ++h;
            for (var l = r.clone(), f = e.clone(); !e.isZero(); ) {
              for (
                var c = 0, d = 1;
                (e.words[0] & d) == 0 && c < 26;
                ++c, d <<= 1
              );
              if (c > 0)
                for (e.iushrn(c); c-- > 0; )
                  (i.isOdd() || s.isOdd()) && (i.iadd(l), s.isub(f)),
                    i.iushrn(1),
                    s.iushrn(1);
              for (
                var p = 0, g = 1;
                (r.words[0] & g) == 0 && p < 26;
                ++p, g <<= 1
              );
              if (p > 0)
                for (r.iushrn(p); p-- > 0; )
                  (u.isOdd() || a.isOdd()) && (u.iadd(l), a.isub(f)),
                    u.iushrn(1),
                    a.iushrn(1);
              e.cmp(r) >= 0
                ? (e.isub(r), i.isub(u), s.isub(a))
                : (r.isub(e), u.isub(i), a.isub(s));
            }
            return { a: u, b: a, gcd: r.iushln(h) };
          }),
          (o.prototype._invmp = function (t) {
            n(0 === t.negative), n(!t.isZero());
            var e,
              r = this,
              i = t.clone();
            r = 0 !== r.negative ? r.umod(t) : r.clone();
            for (
              var s = new o(1), u = new o(0), a = i.clone();
              r.cmpn(1) > 0 && i.cmpn(1) > 0;

            ) {
              for (
                var h = 0, l = 1;
                (r.words[0] & l) == 0 && h < 26;
                ++h, l <<= 1
              );
              if (h > 0)
                for (r.iushrn(h); h-- > 0; )
                  s.isOdd() && s.iadd(a), s.iushrn(1);
              for (
                var f = 0, c = 1;
                (i.words[0] & c) == 0 && f < 26;
                ++f, c <<= 1
              );
              if (f > 0)
                for (i.iushrn(f); f-- > 0; )
                  u.isOdd() && u.iadd(a), u.iushrn(1);
              r.cmp(i) >= 0 ? (r.isub(i), s.isub(u)) : (i.isub(r), u.isub(s));
            }
            return 0 > (e = 0 === r.cmpn(1) ? s : u).cmpn(0) && e.iadd(t), e;
          }),
          (o.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              r = t.clone();
            (e.negative = 0), (r.negative = 0);
            for (var n = 0; e.isEven() && r.isEven(); n++)
              e.iushrn(1), r.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; r.isEven(); ) r.iushrn(1);
              var i = e.cmp(r);
              if (i < 0) {
                var o = e;
                (e = r), (r = o);
              } else if (0 === i || 0 === r.cmpn(1)) break;
              e.isub(r);
            }
            return r.iushln(n);
          }),
          (o.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (o.prototype.isEven = function () {
            return (1 & this.words[0]) == 0;
          }),
          (o.prototype.isOdd = function () {
            return (1 & this.words[0]) == 1;
          }),
          (o.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (o.prototype.bincn = function (t) {
            n("number" == typeof t);
            var e = t % 26,
              r = (t - e) / 26,
              i = 1 << e;
            if (this.length <= r)
              return this._expand(r + 1), (this.words[r] |= i), this;
            for (var o = i, s = r; 0 !== o && s < this.length; s++) {
              var u = 0 | this.words[s];
              (u += o), (o = u >>> 26), (u &= 67108863), (this.words[s] = u);
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this;
          }),
          (o.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (o.prototype.cmpn = function (t) {
            var e,
              r = t < 0;
            if (0 !== this.negative && !r) return -1;
            if (0 === this.negative && r) return 1;
            if ((this._strip(), this.length > 1)) e = 1;
            else {
              r && (t = -t), n(t <= 67108863, "Number is too big");
              var i = 0 | this.words[0];
              e = i === t ? 0 : i < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, r = this.length - 1; r >= 0; r--) {
              var n = 0 | this.words[r],
                i = 0 | t.words[r];
              if (n !== i) {
                n < i ? (e = -1) : n > i && (e = 1);
                break;
              }
            }
            return e;
          }),
          (o.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (o.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (o.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (o.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (o.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (o.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (o.prototype.lten = function (t) {
            return 0 >= this.cmpn(t);
          }),
          (o.prototype.lte = function (t) {
            return 0 >= this.cmp(t);
          }),
          (o.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (o.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (o.red = function (t) {
            return new B(t);
          }),
          (o.prototype.toRed = function (t) {
            return (
              n(!this.red, "Already a number in reduction context"),
              n(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (o.prototype.fromRed = function () {
            return (
              n(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (o.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (o.prototype.forceRed = function (t) {
            return (
              n(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (o.prototype.redAdd = function (t) {
            return (
              n(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (o.prototype.redIAdd = function (t) {
            return (
              n(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (o.prototype.redSub = function (t) {
            return (
              n(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (o.prototype.redISub = function (t) {
            return (
              n(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (o.prototype.redShl = function (t) {
            return (
              n(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (o.prototype.redMul = function (t) {
            return (
              n(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (o.prototype.redIMul = function (t) {
            return (
              n(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (o.prototype.redSqr = function () {
            return (
              n(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (o.prototype.redISqr = function () {
            return (
              n(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (o.prototype.redSqrt = function () {
            return (
              n(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (o.prototype.redInvm = function () {
            return (
              n(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (o.prototype.redNeg = function () {
            return (
              n(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (o.prototype.redPow = function (t) {
            return (
              n(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var v = { k256: null, p224: null, p192: null, p25519: null };
        function b(t, e) {
          (this.name = t),
            (this.p = new o(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new o(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function E() {
          b.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function M() {
          b.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function x() {
          b.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function _() {
          b.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function B(t) {
          if ("string" == typeof t) {
            var e = o._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            n(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function A(t) {
          B.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new o(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (b.prototype._tmp = function () {
          var t = new o(null);
          return (t.words = Array(Math.ceil(this.n / 13))), t;
        }),
          (b.prototype.ireduce = function (t) {
            var e,
              r = t;
            do
              this.split(r, this.tmp),
                (e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
            while (e > this.n);
            var n = e < this.n ? -1 : r.ucmp(this.p);
            return (
              0 === n
                ? ((r.words[0] = 0), (r.length = 1))
                : n > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            );
          }),
          (b.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (b.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          i(E, b),
          (E.prototype.split = function (t, e) {
            for (var r = Math.min(t.length, 9), n = 0; n < r; n++)
              e.words[n] = t.words[n];
            if (((e.length = r), t.length <= 9)) {
              (t.words[0] = 0), (t.length = 1);
              return;
            }
            var i = t.words[9];
            for (n = 10, e.words[e.length++] = 4194303 & i; n < t.length; n++) {
              var o = 0 | t.words[n];
              (t.words[n - 10] = ((4194303 & o) << 4) | (i >>> 22)), (i = o);
            }
            (i >>>= 22),
              (t.words[n - 10] = i),
              0 === i && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (E.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, r = 0; r < t.length; r++) {
              var n = 0 | t.words[r];
              (e += 977 * n),
                (t.words[r] = 67108863 & e),
                (e = 64 * n + ((e / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          i(M, b),
          i(x, b),
          i(_, b),
          (_.prototype.imulK = function (t) {
            for (var e = 0, r = 0; r < t.length; r++) {
              var n = (0 | t.words[r]) * 19 + e,
                i = 67108863 & n;
              (n >>>= 26), (t.words[r] = i), (e = n);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (o._prime = function (t) {
            var e;
            if (v[t]) return v[t];
            if ("k256" === t) e = new E();
            else if ("p224" === t) e = new M();
            else if ("p192" === t) e = new x();
            else if ("p25519" === t) e = new _();
            else throw Error("Unknown prime " + t);
            return (v[t] = e), e;
          }),
          (B.prototype._verify1 = function (t) {
            n(0 === t.negative, "red works only with positives"),
              n(t.red, "red works only with red numbers");
          }),
          (B.prototype._verify2 = function (t, e) {
            n((t.negative | e.negative) == 0, "red works only with positives"),
              n(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (B.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : (h(t, t.umod(this.m)._forceRed(this)), t);
          }),
          (B.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (B.prototype.add = function (t, e) {
            this._verify2(t, e);
            var r = t.add(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
          }),
          (B.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var r = t.iadd(e);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r;
          }),
          (B.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var r = t.sub(e);
            return 0 > r.cmpn(0) && r.iadd(this.m), r._forceRed(this);
          }),
          (B.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var r = t.isub(e);
            return 0 > r.cmpn(0) && r.iadd(this.m), r;
          }),
          (B.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (B.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (B.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (B.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (B.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (B.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((n(e % 2 == 1), 3 === e)) {
              var r = this.m.add(new o(1)).iushrn(2);
              return this.pow(t, r);
            }
            for (
              var i = this.m.subn(1), s = 0;
              !i.isZero() && 0 === i.andln(1);

            )
              s++, i.iushrn(1);
            n(!i.isZero());
            var u = new o(1).toRed(this),
              a = u.redNeg(),
              h = this.m.subn(1).iushrn(1),
              l = this.m.bitLength();
            for (
              l = new o(2 * l * l).toRed(this);
              0 !== this.pow(l, h).cmp(a);

            )
              l.redIAdd(a);
            for (
              var f = this.pow(l, i),
                c = this.pow(t, i.addn(1).iushrn(1)),
                d = this.pow(t, i),
                p = s;
              0 !== d.cmp(u);

            ) {
              for (var g = d, m = 0; 0 !== g.cmp(u); m++) g = g.redSqr();
              n(m < p);
              var y = this.pow(f, new o(1).iushln(p - m - 1));
              (c = c.redMul(y)), (f = y.redSqr()), (d = d.redMul(f)), (p = m);
            }
            return c;
          }),
          (B.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (B.prototype.pow = function (t, e) {
            if (e.isZero()) return new o(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var r = Array(16);
            (r[0] = new o(1).toRed(this)), (r[1] = t);
            for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
            var i = r[0],
              s = 0,
              u = 0,
              a = e.bitLength() % 26;
            for (0 === a && (a = 26), n = e.length - 1; n >= 0; n--) {
              for (var h = e.words[n], l = a - 1; l >= 0; l--) {
                var f = (h >> l) & 1;
                if ((i !== r[0] && (i = this.sqr(i)), 0 === f && 0 === s)) {
                  u = 0;
                  continue;
                }
                (s <<= 1),
                  (s |= f),
                  (4 == ++u || (0 === n && 0 === l)) &&
                    ((i = this.mul(i, r[s])), (u = 0), (s = 0));
              }
              a = 26;
            }
            return i;
          }),
          (B.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (B.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (o.mont = function (t) {
            return new A(t);
          }),
          i(A, B),
          (A.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (A.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (A.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var r = t.imul(e),
              n = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = r.isub(n).iushrn(this.shift),
              o = i;
            return (
              i.cmp(this.m) >= 0
                ? (o = i.isub(this.m))
                : 0 > i.cmpn(0) && (o = i.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (A.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
            var r = t.mul(e),
              n = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = r.isub(n).iushrn(this.shift),
              s = i;
            return (
              i.cmp(this.m) >= 0
                ? (s = i.isub(this.m))
                : 0 > i.cmpn(0) && (s = i.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (A.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })((t = r.nmd(t)), this);
    },
    6445: function (t, e, r) {
      "use strict";
      var n = r(9417).Buffer,
        i =
          (this && this.__createBinding) ||
          (Object.create
            ? function (t, e, r, n) {
                void 0 === n && (n = r),
                  Object.defineProperty(t, n, {
                    enumerable: !0,
                    get: function () {
                      return e[r];
                    },
                  });
              }
            : function (t, e, r, n) {
                void 0 === n && (n = r), (t[n] = e[r]);
              }),
        o =
          (this && this.__setModuleDefault) ||
          (Object.create
            ? function (t, e) {
                Object.defineProperty(t, "default", {
                  enumerable: !0,
                  value: e,
                });
              }
            : function (t, e) {
                t.default = e;
              }),
        s =
          (this && this.__decorate) ||
          function (t, e, r, n) {
            var i,
              o = arguments.length,
              s =
                o < 3
                  ? e
                  : null === n
                  ? (n = Object.getOwnPropertyDescriptor(e, r))
                  : n;
            if (
              "object" == typeof Reflect &&
              "function" == typeof Reflect.decorate
            )
              s = Reflect.decorate(t, e, r, n);
            else
              for (var u = t.length - 1; u >= 0; u--)
                (i = t[u]) &&
                  (s = (o < 3 ? i(s) : o > 3 ? i(e, r, s) : i(e, r)) || s);
            return o > 3 && s && Object.defineProperty(e, r, s), s;
          },
        u =
          (this && this.__importStar) ||
          function (t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var r in t)
                "default" !== r &&
                  Object.hasOwnProperty.call(t, r) &&
                  i(e, t, r);
            return o(e, t), e;
          },
        a =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.deserializeUnchecked =
          e.deserialize =
          e.serialize =
          e.BinaryReader =
          e.BinaryWriter =
          e.BorshError =
          e.baseDecode =
          e.baseEncode =
            void 0);
      let h = a(r(7057)),
        l = a(r(8561)),
        f = u(r(801)),
        c = new (
          "function" != typeof TextDecoder ? f.TextDecoder : TextDecoder
        )("utf-8", { fatal: !0 });
      (e.baseEncode = function (t) {
        return (
          "string" == typeof t && (t = n.from(t, "utf8")),
          l.default.encode(n.from(t))
        );
      }),
        (e.baseDecode = function (t) {
          return n.from(l.default.decode(t));
        });
      class d extends Error {
        constructor(t) {
          super(t), (this.fieldPath = []), (this.originalMessage = t);
        }
        addToFieldPath(t) {
          this.fieldPath.splice(0, 0, t),
            (this.message =
              this.originalMessage + ": " + this.fieldPath.join("."));
        }
      }
      e.BorshError = d;
      class p {
        constructor() {
          (this.buf = n.alloc(1024)), (this.length = 0);
        }
        maybeResize() {
          this.buf.length < 16 + this.length &&
            (this.buf = n.concat([this.buf, n.alloc(1024)]));
        }
        writeU8(t) {
          this.maybeResize(),
            this.buf.writeUInt8(t, this.length),
            (this.length += 1);
        }
        writeU16(t) {
          this.maybeResize(),
            this.buf.writeUInt16LE(t, this.length),
            (this.length += 2);
        }
        writeU32(t) {
          this.maybeResize(),
            this.buf.writeUInt32LE(t, this.length),
            (this.length += 4);
        }
        writeU64(t) {
          this.maybeResize(),
            this.writeBuffer(n.from(new h.default(t).toArray("le", 8)));
        }
        writeU128(t) {
          this.maybeResize(),
            this.writeBuffer(n.from(new h.default(t).toArray("le", 16)));
        }
        writeU256(t) {
          this.maybeResize(),
            this.writeBuffer(n.from(new h.default(t).toArray("le", 32)));
        }
        writeU512(t) {
          this.maybeResize(),
            this.writeBuffer(n.from(new h.default(t).toArray("le", 64)));
        }
        writeBuffer(t) {
          (this.buf = n.concat([
            n.from(this.buf.subarray(0, this.length)),
            t,
            n.alloc(1024),
          ])),
            (this.length += t.length);
        }
        writeString(t) {
          this.maybeResize();
          let e = n.from(t, "utf8");
          this.writeU32(e.length), this.writeBuffer(e);
        }
        writeFixedArray(t) {
          this.writeBuffer(n.from(t));
        }
        writeArray(t, e) {
          for (let r of (this.maybeResize(), this.writeU32(t.length), t))
            this.maybeResize(), e(r);
        }
        toArray() {
          return this.buf.subarray(0, this.length);
        }
      }
      function g(t, e, r) {
        let n = r.value;
        r.value = function (...t) {
          try {
            return n.apply(this, t);
          } catch (t) {
            if (
              t instanceof RangeError &&
              ["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(
                t.code
              ) >= 0
            )
              throw new d("Reached the end of buffer when deserializing");
            throw t;
          }
        };
      }
      e.BinaryWriter = p;
      class m {
        constructor(t) {
          (this.buf = t), (this.offset = 0);
        }
        readU8() {
          let t = this.buf.readUInt8(this.offset);
          return (this.offset += 1), t;
        }
        readU16() {
          let t = this.buf.readUInt16LE(this.offset);
          return (this.offset += 2), t;
        }
        readU32() {
          let t = this.buf.readUInt32LE(this.offset);
          return (this.offset += 4), t;
        }
        readU64() {
          let t = this.readBuffer(8);
          return new h.default(t, "le");
        }
        readU128() {
          let t = this.readBuffer(16);
          return new h.default(t, "le");
        }
        readU256() {
          let t = this.readBuffer(32);
          return new h.default(t, "le");
        }
        readU512() {
          let t = this.readBuffer(64);
          return new h.default(t, "le");
        }
        readBuffer(t) {
          if (this.offset + t > this.buf.length)
            throw new d(`Expected buffer length ${t} isn't within bounds`);
          let e = this.buf.slice(this.offset, this.offset + t);
          return (this.offset += t), e;
        }
        readString() {
          let t = this.readU32(),
            e = this.readBuffer(t);
          try {
            return c.decode(e);
          } catch (t) {
            throw new d(`Error decoding UTF-8 string: ${t}`);
          }
        }
        readFixedArray(t) {
          return new Uint8Array(this.readBuffer(t));
        }
        readArray(t) {
          let e = this.readU32(),
            r = [];
          for (let n = 0; n < e; ++n) r.push(t());
          return r;
        }
      }
      function y(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }
      function w(t, e, r, n, i) {
        try {
          if ("string" == typeof n) i[`write${y(n)}`](r);
          else if (n instanceof Array) {
            if ("number" == typeof n[0]) {
              if (r.length !== n[0])
                throw new d(
                  `Expecting byte array of length ${n[0]}, but got ${r.length} bytes`
                );
              i.writeFixedArray(r);
            } else if (2 === n.length && "number" == typeof n[1]) {
              if (r.length !== n[1])
                throw new d(
                  `Expecting byte array of length ${n[1]}, but got ${r.length} bytes`
                );
              for (let e = 0; e < n[1]; e++) w(t, null, r[e], n[0], i);
            } else
              i.writeArray(r, (r) => {
                w(t, e, r, n[0], i);
              });
          } else if (void 0 !== n.kind)
            switch (n.kind) {
              case "option":
                null == r
                  ? i.writeU8(0)
                  : (i.writeU8(1), w(t, e, r, n.type, i));
                break;
              case "map":
                i.writeU32(r.size),
                  r.forEach((r, o) => {
                    w(t, e, o, n.key, i), w(t, e, r, n.value, i);
                  });
                break;
              default:
                throw new d(`FieldType ${n} unrecognized`);
            }
          else v(t, r, i);
        } catch (t) {
          throw (t instanceof d && t.addToFieldPath(e), t);
        }
      }
      function v(t, e, r) {
        if ("function" == typeof e.borshSerialize) {
          e.borshSerialize(r);
          return;
        }
        let n = t.get(e.constructor);
        if (!n) throw new d(`Class ${e.constructor.name} is missing in schema`);
        if ("struct" === n.kind)
          n.fields.map(([n, i]) => {
            w(t, n, e[n], i, r);
          });
        else if ("enum" === n.kind) {
          let i = e[n.field];
          for (let o = 0; o < n.values.length; ++o) {
            let [s, u] = n.values[o];
            if (s === i) {
              r.writeU8(o), w(t, s, e[s], u, r);
              break;
            }
          }
        } else
          throw new d(
            `Unexpected schema kind: ${n.kind} for ${e.constructor.name}`
          );
      }
      function b(t, e, r, n) {
        try {
          if ("string" == typeof r) return n[`read${y(r)}`]();
          if (r instanceof Array) {
            if ("number" == typeof r[0]) return n.readFixedArray(r[0]);
            if ("number" != typeof r[1])
              return n.readArray(() => b(t, e, r[0], n));
            {
              let e = [];
              for (let i = 0; i < r[1]; i++) e.push(b(t, null, r[0], n));
              return e;
            }
          }
          if ("option" === r.kind) {
            if (n.readU8()) return b(t, e, r.type, n);
            return;
          }
          if ("map" === r.kind) {
            let i = new Map(),
              o = n.readU32();
            for (let s = 0; s < o; s++) {
              let o = b(t, e, r.key, n),
                s = b(t, e, r.value, n);
              i.set(o, s);
            }
            return i;
          }
          return E(t, r, n);
        } catch (t) {
          throw (t instanceof d && t.addToFieldPath(e), t);
        }
      }
      function E(t, e, r) {
        if ("function" == typeof e.borshDeserialize)
          return e.borshDeserialize(r);
        let n = t.get(e);
        if (!n) throw new d(`Class ${e.name} is missing in schema`);
        if ("struct" === n.kind) {
          let n = {};
          for (let [i, o] of t.get(e).fields) n[i] = b(t, i, o, r);
          return new e(n);
        }
        if ("enum" === n.kind) {
          let i = r.readU8();
          if (i >= n.values.length)
            throw new d(`Enum index: ${i} is out of range`);
          let [o, s] = n.values[i],
            u = b(t, o, s, r);
          return new e({ [o]: u });
        }
        throw new d(
          `Unexpected schema kind: ${n.kind} for ${e.constructor.name}`
        );
      }
      s([g], m.prototype, "readU8", null),
        s([g], m.prototype, "readU16", null),
        s([g], m.prototype, "readU32", null),
        s([g], m.prototype, "readU64", null),
        s([g], m.prototype, "readU128", null),
        s([g], m.prototype, "readU256", null),
        s([g], m.prototype, "readU512", null),
        s([g], m.prototype, "readString", null),
        s([g], m.prototype, "readFixedArray", null),
        s([g], m.prototype, "readArray", null),
        (e.BinaryReader = m),
        (e.serialize = function (t, e, r = p) {
          let n = new r();
          return v(t, e, n), n.toArray();
        }),
        (e.deserialize = function (t, e, r, n = m) {
          let i = new n(r),
            o = E(t, e, i);
          if (i.offset < r.length)
            throw new d(
              `Unexpected ${r.length - i.offset} bytes after deserialized data`
            );
          return o;
        }),
        (e.deserializeUnchecked = function (t, e, r, n = m) {
          return E(t, e, new n(r));
        });
    },
    8561: function (t, e, r) {
      var n = r(7984);
      t.exports = n(
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      );
    },
    9417: function (t, e, r) {
      "use strict";
      let n = r(7721),
        i = r(9008),
        o =
          "function" == typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : null;
      function s(t) {
        if (t > 2147483647)
          throw RangeError(
            'The value "' + t + '" is invalid for option "size"'
          );
        let e = new Uint8Array(t);
        return Object.setPrototypeOf(e, u.prototype), e;
      }
      function u(t, e, r) {
        if ("number" == typeof t) {
          if ("string" == typeof e)
            throw TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return l(t);
        }
        return a(t, e, r);
      }
      function a(t, e, r) {
        if ("string" == typeof t)
          return (function (t, e) {
            if (
              (("string" != typeof e || "" === e) && (e = "utf8"),
              !u.isEncoding(e))
            )
              throw TypeError("Unknown encoding: " + e);
            let r = 0 | p(t, e),
              n = s(r),
              i = n.write(t, e);
            return i !== r && (n = n.slice(0, i)), n;
          })(t, e);
        if (ArrayBuffer.isView(t))
          return (function (t) {
            if (j(t, Uint8Array)) {
              let e = new Uint8Array(t);
              return c(e.buffer, e.byteOffset, e.byteLength);
            }
            return f(t);
          })(t);
        if (null == t)
          throw TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof t
          );
        if (
          j(t, ArrayBuffer) ||
          (t && j(t.buffer, ArrayBuffer)) ||
          ("undefined" != typeof SharedArrayBuffer &&
            (j(t, SharedArrayBuffer) || (t && j(t.buffer, SharedArrayBuffer))))
        )
          return c(t, e, r);
        if ("number" == typeof t)
          throw TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        let n = t.valueOf && t.valueOf();
        if (null != n && n !== t) return u.from(n, e, r);
        let i = (function (t) {
          var e;
          if (u.isBuffer(t)) {
            let e = 0 | d(t.length),
              r = s(e);
            return 0 === r.length || t.copy(r, 0, 0, e), r;
          }
          return void 0 !== t.length
            ? "number" != typeof t.length || (e = t.length) != e
              ? s(0)
              : f(t)
            : "Buffer" === t.type && Array.isArray(t.data)
            ? f(t.data)
            : void 0;
        })(t);
        if (i) return i;
        if (
          "undefined" != typeof Symbol &&
          null != Symbol.toPrimitive &&
          "function" == typeof t[Symbol.toPrimitive]
        )
          return u.from(t[Symbol.toPrimitive]("string"), e, r);
        throw TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof t
        );
      }
      function h(t) {
        if ("number" != typeof t)
          throw TypeError('"size" argument must be of type number');
        if (t < 0)
          throw RangeError(
            'The value "' + t + '" is invalid for option "size"'
          );
      }
      function l(t) {
        return h(t), s(t < 0 ? 0 : 0 | d(t));
      }
      function f(t) {
        let e = t.length < 0 ? 0 : 0 | d(t.length),
          r = s(e);
        for (let n = 0; n < e; n += 1) r[n] = 255 & t[n];
        return r;
      }
      function c(t, e, r) {
        let n;
        if (e < 0 || t.byteLength < e)
          throw RangeError('"offset" is outside of buffer bounds');
        if (t.byteLength < e + (r || 0))
          throw RangeError('"length" is outside of buffer bounds');
        return (
          Object.setPrototypeOf(
            (n =
              void 0 === e && void 0 === r
                ? new Uint8Array(t)
                : void 0 === r
                ? new Uint8Array(t, e)
                : new Uint8Array(t, e, r)),
            u.prototype
          ),
          n
        );
      }
      function d(t) {
        if (t >= 2147483647)
          throw RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes"
          );
        return 0 | t;
      }
      function p(t, e) {
        if (u.isBuffer(t)) return t.length;
        if (ArrayBuffer.isView(t) || j(t, ArrayBuffer)) return t.byteLength;
        if ("string" != typeof t)
          throw TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
              typeof t
          );
        let r = t.length,
          n = arguments.length > 2 && !0 === arguments[2];
        if (!n && 0 === r) return 0;
        let i = !1;
        for (;;)
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
              return P(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return T(t).length;
            default:
              if (i) return n ? -1 : P(t).length;
              (e = ("" + e).toLowerCase()), (i = !0);
          }
      }
      function g(t, e, r) {
        let i = !1;
        if (
          ((void 0 === e || e < 0) && (e = 0),
          e > this.length ||
            ((void 0 === r || r > this.length) && (r = this.length),
            r <= 0 || (r >>>= 0) <= (e >>>= 0)))
        )
          return "";
        for (t || (t = "utf8"); ; )
          switch (t) {
            case "hex":
              return (function (t, e, r) {
                let n = t.length;
                (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
                let i = "";
                for (let n = e; n < r; ++n) i += N[t[n]];
                return i;
              })(this, e, r);
            case "utf8":
            case "utf-8":
              return v(this, e, r);
            case "ascii":
              return (function (t, e, r) {
                let n = "";
                r = Math.min(t.length, r);
                for (let i = e; i < r; ++i)
                  n += String.fromCharCode(127 & t[i]);
                return n;
              })(this, e, r);
            case "latin1":
            case "binary":
              return (function (t, e, r) {
                let n = "";
                r = Math.min(t.length, r);
                for (let i = e; i < r; ++i) n += String.fromCharCode(t[i]);
                return n;
              })(this, e, r);
            case "base64":
              var o, s;
              return (
                (o = e),
                (s = r),
                0 === o && s === this.length
                  ? n.fromByteArray(this)
                  : n.fromByteArray(this.slice(o, s))
              );
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return (function (t, e, r) {
                let n = t.slice(e, r),
                  i = "";
                for (let t = 0; t < n.length - 1; t += 2)
                  i += String.fromCharCode(n[t] + 256 * n[t + 1]);
                return i;
              })(this, e, r);
            default:
              if (i) throw TypeError("Unknown encoding: " + t);
              (t = (t + "").toLowerCase()), (i = !0);
          }
      }
      function m(t, e, r) {
        let n = t[e];
        (t[e] = t[r]), (t[r] = n);
      }
      function y(t, e, r, n, i) {
        var o;
        if (0 === t.length) return -1;
        if (
          ("string" == typeof r
            ? ((n = r), (r = 0))
            : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
          (o = r = +r) != o && (r = i ? 0 : t.length - 1),
          r < 0 && (r = t.length + r),
          r >= t.length)
        ) {
          if (i) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!i) return -1;
          r = 0;
        }
        if (("string" == typeof e && (e = u.from(e, n)), u.isBuffer(e)))
          return 0 === e.length ? -1 : w(t, e, r, n, i);
        if ("number" == typeof e)
          return ((e &= 255), "function" == typeof Uint8Array.prototype.indexOf)
            ? i
              ? Uint8Array.prototype.indexOf.call(t, e, r)
              : Uint8Array.prototype.lastIndexOf.call(t, e, r)
            : w(t, [e], r, n, i);
        throw TypeError("val must be string, number or Buffer");
      }
      function w(t, e, r, n, i) {
        let o,
          s = 1,
          u = t.length,
          a = e.length;
        if (
          void 0 !== n &&
          ("ucs2" === (n = String(n).toLowerCase()) ||
            "ucs-2" === n ||
            "utf16le" === n ||
            "utf-16le" === n)
        ) {
          if (t.length < 2 || e.length < 2) return -1;
          (s = 2), (u /= 2), (a /= 2), (r /= 2);
        }
        function h(t, e) {
          return 1 === s ? t[e] : t.readUInt16BE(e * s);
        }
        if (i) {
          let n = -1;
          for (o = r; o < u; o++)
            if (h(t, o) === h(e, -1 === n ? 0 : o - n)) {
              if ((-1 === n && (n = o), o - n + 1 === a)) return n * s;
            } else -1 !== n && (o -= o - n), (n = -1);
        } else
          for (r + a > u && (r = u - a), o = r; o >= 0; o--) {
            let r = !0;
            for (let n = 0; n < a; n++)
              if (h(t, o + n) !== h(e, n)) {
                r = !1;
                break;
              }
            if (r) return o;
          }
        return -1;
      }
      function v(t, e, r) {
        r = Math.min(t.length, r);
        let n = [],
          i = e;
        for (; i < r; ) {
          let e = t[i],
            o = null,
            s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
          if (i + s <= r) {
            let r, n, u, a;
            switch (s) {
              case 1:
                e < 128 && (o = e);
                break;
              case 2:
                (192 & (r = t[i + 1])) == 128 &&
                  (a = ((31 & e) << 6) | (63 & r)) > 127 &&
                  (o = a);
                break;
              case 3:
                (r = t[i + 1]),
                  (n = t[i + 2]),
                  (192 & r) == 128 &&
                    (192 & n) == 128 &&
                    (a = ((15 & e) << 12) | ((63 & r) << 6) | (63 & n)) >
                      2047 &&
                    (a < 55296 || a > 57343) &&
                    (o = a);
                break;
              case 4:
                (r = t[i + 1]),
                  (n = t[i + 2]),
                  (u = t[i + 3]),
                  (192 & r) == 128 &&
                    (192 & n) == 128 &&
                    (192 & u) == 128 &&
                    (a =
                      ((15 & e) << 18) |
                      ((63 & r) << 12) |
                      ((63 & n) << 6) |
                      (63 & u)) > 65535 &&
                    a < 1114112 &&
                    (o = a);
            }
          }
          null === o
            ? ((o = 65533), (s = 1))
            : o > 65535 &&
              ((o -= 65536),
              n.push(((o >>> 10) & 1023) | 55296),
              (o = 56320 | (1023 & o))),
            n.push(o),
            (i += s);
        }
        return (function (t) {
          let e = t.length;
          if (e <= 4096) return String.fromCharCode.apply(String, t);
          let r = "",
            n = 0;
          for (; n < e; )
            r += String.fromCharCode.apply(String, t.slice(n, (n += 4096)));
          return r;
        })(n);
      }
      function b(t, e, r) {
        if (t % 1 != 0 || t < 0) throw RangeError("offset is not uint");
        if (t + e > r)
          throw RangeError("Trying to access beyond buffer length");
      }
      function E(t, e, r, n, i, o) {
        if (!u.isBuffer(t))
          throw TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < o)
          throw RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw RangeError("Index out of range");
      }
      function M(t, e, r, n, i) {
        U(e, n, i, t, r, 7);
        let o = Number(e & BigInt(4294967295));
        (t[r++] = o),
          (o >>= 8),
          (t[r++] = o),
          (o >>= 8),
          (t[r++] = o),
          (o >>= 8),
          (t[r++] = o);
        let s = Number((e >> BigInt(32)) & BigInt(4294967295));
        return (
          (t[r++] = s),
          (s >>= 8),
          (t[r++] = s),
          (s >>= 8),
          (t[r++] = s),
          (s >>= 8),
          (t[r++] = s),
          r
        );
      }
      function x(t, e, r, n, i) {
        U(e, n, i, t, r, 7);
        let o = Number(e & BigInt(4294967295));
        (t[r + 7] = o),
          (o >>= 8),
          (t[r + 6] = o),
          (o >>= 8),
          (t[r + 5] = o),
          (o >>= 8),
          (t[r + 4] = o);
        let s = Number((e >> BigInt(32)) & BigInt(4294967295));
        return (
          (t[r + 3] = s),
          (s >>= 8),
          (t[r + 2] = s),
          (s >>= 8),
          (t[r + 1] = s),
          (s >>= 8),
          (t[r] = s),
          r + 8
        );
      }
      function _(t, e, r, n, i, o) {
        if (r + n > t.length || r < 0) throw RangeError("Index out of range");
      }
      function B(t, e, r, n, o) {
        return (
          (e = +e),
          (r >>>= 0),
          o || _(t, e, r, 4, 34028234663852886e22, -34028234663852886e22),
          i.write(t, e, r, n, 23, 4),
          r + 4
        );
      }
      function A(t, e, r, n, o) {
        return (
          (e = +e),
          (r >>>= 0),
          o || _(t, e, r, 8, 17976931348623157e292, -17976931348623157e292),
          i.write(t, e, r, n, 52, 8),
          r + 8
        );
      }
      (e.Buffer = u),
        (e.SlowBuffer = function (t) {
          return +t != t && (t = 0), u.alloc(+t);
        }),
        (e.INSPECT_MAX_BYTES = 50),
        (e.kMaxLength = 2147483647),
        (u.TYPED_ARRAY_SUPPORT = (function () {
          try {
            let t = new Uint8Array(1),
              e = {
                foo: function () {
                  return 42;
                },
              };
            return (
              Object.setPrototypeOf(e, Uint8Array.prototype),
              Object.setPrototypeOf(t, e),
              42 === t.foo()
            );
          } catch (t) {
            return !1;
          }
        })()),
        u.TYPED_ARRAY_SUPPORT ||
          "undefined" == typeof console ||
          "function" != typeof console.error ||
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          ),
        Object.defineProperty(u.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (u.isBuffer(this)) return this.buffer;
          },
        }),
        Object.defineProperty(u.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (u.isBuffer(this)) return this.byteOffset;
          },
        }),
        (u.poolSize = 8192),
        (u.from = function (t, e, r) {
          return a(t, e, r);
        }),
        Object.setPrototypeOf(u.prototype, Uint8Array.prototype),
        Object.setPrototypeOf(u, Uint8Array),
        (u.alloc = function (t, e, r) {
          return (h(t), t <= 0)
            ? s(t)
            : void 0 !== e
            ? "string" == typeof r
              ? s(t).fill(e, r)
              : s(t).fill(e)
            : s(t);
        }),
        (u.allocUnsafe = function (t) {
          return l(t);
        }),
        (u.allocUnsafeSlow = function (t) {
          return l(t);
        }),
        (u.isBuffer = function (t) {
          return null != t && !0 === t._isBuffer && t !== u.prototype;
        }),
        (u.compare = function (t, e) {
          if (
            (j(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)),
            j(e, Uint8Array) && (e = u.from(e, e.offset, e.byteLength)),
            !u.isBuffer(t) || !u.isBuffer(e))
          )
            throw TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          if (t === e) return 0;
          let r = t.length,
            n = e.length;
          for (let i = 0, o = Math.min(r, n); i < o; ++i)
            if (t[i] !== e[i]) {
              (r = t[i]), (n = e[i]);
              break;
            }
          return r < n ? -1 : n < r ? 1 : 0;
        }),
        (u.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (u.concat = function (t, e) {
          let r;
          if (!Array.isArray(t))
            throw TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return u.alloc(0);
          if (void 0 === e)
            for (r = 0, e = 0; r < t.length; ++r) e += t[r].length;
          let n = u.allocUnsafe(e),
            i = 0;
          for (r = 0; r < t.length; ++r) {
            let e = t[r];
            if (j(e, Uint8Array))
              i + e.length > n.length
                ? (u.isBuffer(e) || (e = u.from(e)), e.copy(n, i))
                : Uint8Array.prototype.set.call(n, e, i);
            else if (u.isBuffer(e)) e.copy(n, i);
            else throw TypeError('"list" argument must be an Array of Buffers');
            i += e.length;
          }
          return n;
        }),
        (u.byteLength = p),
        (u.prototype._isBuffer = !0),
        (u.prototype.swap16 = function () {
          let t = this.length;
          if (t % 2 != 0)
            throw RangeError("Buffer size must be a multiple of 16-bits");
          for (let e = 0; e < t; e += 2) m(this, e, e + 1);
          return this;
        }),
        (u.prototype.swap32 = function () {
          let t = this.length;
          if (t % 4 != 0)
            throw RangeError("Buffer size must be a multiple of 32-bits");
          for (let e = 0; e < t; e += 4)
            m(this, e, e + 3), m(this, e + 1, e + 2);
          return this;
        }),
        (u.prototype.swap64 = function () {
          let t = this.length;
          if (t % 8 != 0)
            throw RangeError("Buffer size must be a multiple of 64-bits");
          for (let e = 0; e < t; e += 8)
            m(this, e, e + 7),
              m(this, e + 1, e + 6),
              m(this, e + 2, e + 5),
              m(this, e + 3, e + 4);
          return this;
        }),
        (u.prototype.toString = function () {
          let t = this.length;
          return 0 === t
            ? ""
            : 0 == arguments.length
            ? v(this, 0, t)
            : g.apply(this, arguments);
        }),
        (u.prototype.toLocaleString = u.prototype.toString),
        (u.prototype.equals = function (t) {
          if (!u.isBuffer(t)) throw TypeError("Argument must be a Buffer");
          return this === t || 0 === u.compare(this, t);
        }),
        (u.prototype.inspect = function () {
          let t = "",
            r = e.INSPECT_MAX_BYTES;
          return (
            (t = this.toString("hex", 0, r)
              .replace(/(.{2})/g, "$1 ")
              .trim()),
            this.length > r && (t += " ... "),
            "<Buffer " + t + ">"
          );
        }),
        o && (u.prototype[o] = u.prototype.inspect),
        (u.prototype.compare = function (t, e, r, n, i) {
          if (
            (j(t, Uint8Array) && (t = u.from(t, t.offset, t.byteLength)),
            !u.isBuffer(t))
          )
            throw TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                typeof t
            );
          if (
            (void 0 === e && (e = 0),
            void 0 === r && (r = t ? t.length : 0),
            void 0 === n && (n = 0),
            void 0 === i && (i = this.length),
            e < 0 || r > t.length || n < 0 || i > this.length)
          )
            throw RangeError("out of range index");
          if (n >= i && e >= r) return 0;
          if (n >= i) return -1;
          if (e >= r) return 1;
          if (((e >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === t))
            return 0;
          let o = i - n,
            s = r - e,
            a = Math.min(o, s),
            h = this.slice(n, i),
            l = t.slice(e, r);
          for (let t = 0; t < a; ++t)
            if (h[t] !== l[t]) {
              (o = h[t]), (s = l[t]);
              break;
            }
          return o < s ? -1 : s < o ? 1 : 0;
        }),
        (u.prototype.includes = function (t, e, r) {
          return -1 !== this.indexOf(t, e, r);
        }),
        (u.prototype.indexOf = function (t, e, r) {
          return y(this, t, e, r, !0);
        }),
        (u.prototype.lastIndexOf = function (t, e, r) {
          return y(this, t, e, r, !1);
        }),
        (u.prototype.write = function (t, e, r, n) {
          var i, o, s, u, a, h, l, f;
          if (void 0 === e) (n = "utf8"), (r = this.length), (e = 0);
          else if (void 0 === r && "string" == typeof e)
            (n = e), (r = this.length), (e = 0);
          else if (isFinite(e))
            (e >>>= 0),
              isFinite(r)
                ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                : ((n = r), (r = void 0));
          else
            throw Error(
              "Buffer.write(string, encoding, offset[, length]) is no longer supported"
            );
          let c = this.length - e;
          if (
            ((void 0 === r || r > c) && (r = c),
            (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
          )
            throw RangeError("Attempt to write outside buffer bounds");
          n || (n = "utf8");
          let d = !1;
          for (;;)
            switch (n) {
              case "hex":
                return (function (t, e, r, n) {
                  let i;
                  r = Number(r) || 0;
                  let o = t.length - r;
                  n ? (n = Number(n)) > o && (n = o) : (n = o);
                  let s = e.length;
                  for (n > s / 2 && (n = s / 2), i = 0; i < n; ++i) {
                    let n = parseInt(e.substr(2 * i, 2), 16);
                    if (n != n) break;
                    t[r + i] = n;
                  }
                  return i;
                })(this, t, e, r);
              case "utf8":
              case "utf-8":
                return (i = e), (o = r), C(P(t, this.length - i), this, i, o);
              case "ascii":
              case "latin1":
              case "binary":
                return (
                  (s = e),
                  (u = r),
                  C(
                    (function (t) {
                      let e = [];
                      for (let r = 0; r < t.length; ++r)
                        e.push(255 & t.charCodeAt(r));
                      return e;
                    })(t),
                    this,
                    s,
                    u
                  )
                );
              case "base64":
                return (a = e), (h = r), C(T(t), this, a, h);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return (
                  (l = e),
                  (f = r),
                  C(
                    (function (t, e) {
                      let r, n;
                      let i = [];
                      for (let o = 0; o < t.length && !((e -= 2) < 0); ++o)
                        (n = (r = t.charCodeAt(o)) >> 8),
                          i.push(r % 256),
                          i.push(n);
                      return i;
                    })(t, this.length - l),
                    this,
                    l,
                    f
                  )
                );
              default:
                if (d) throw TypeError("Unknown encoding: " + n);
                (n = ("" + n).toLowerCase()), (d = !0);
            }
        }),
        (u.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        }),
        (u.prototype.slice = function (t, e) {
          let r = this.length;
          (t = ~~t),
            (e = void 0 === e ? r : ~~e),
            t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
            e < t && (e = t);
          let n = this.subarray(t, e);
          return Object.setPrototypeOf(n, u.prototype), n;
        }),
        (u.prototype.readUintLE = u.prototype.readUIntLE =
          function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || b(t, e, this.length);
            let n = this[t],
              i = 1,
              o = 0;
            for (; ++o < e && (i *= 256); ) n += this[t + o] * i;
            return n;
          }),
        (u.prototype.readUintBE = u.prototype.readUIntBE =
          function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || b(t, e, this.length);
            let n = this[t + --e],
              i = 1;
            for (; e > 0 && (i *= 256); ) n += this[t + --e] * i;
            return n;
          }),
        (u.prototype.readUint8 = u.prototype.readUInt8 =
          function (t, e) {
            return (t >>>= 0), e || b(t, 1, this.length), this[t];
          }),
        (u.prototype.readUint16LE = u.prototype.readUInt16LE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || b(t, 2, this.length),
              this[t] | (this[t + 1] << 8)
            );
          }),
        (u.prototype.readUint16BE = u.prototype.readUInt16BE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || b(t, 2, this.length),
              (this[t] << 8) | this[t + 1]
            );
          }),
        (u.prototype.readUint32LE = u.prototype.readUInt32LE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || b(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                16777216 * this[t + 3]
            );
          }),
        (u.prototype.readUint32BE = u.prototype.readUInt32BE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || b(t, 4, this.length),
              16777216 * this[t] +
                ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            );
          }),
        (u.prototype.readBigUInt64LE = z(function (t) {
          R((t >>>= 0), "offset");
          let e = this[t],
            r = this[t + 7];
          (void 0 === e || void 0 === r) && k(t, this.length - 8);
          let n =
              e + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t],
            i = this[++t] + 256 * this[++t] + 65536 * this[++t] + 16777216 * r;
          return BigInt(n) + (BigInt(i) << BigInt(32));
        })),
        (u.prototype.readBigUInt64BE = z(function (t) {
          R((t >>>= 0), "offset");
          let e = this[t],
            r = this[t + 7];
          (void 0 === e || void 0 === r) && k(t, this.length - 8);
          let n =
              16777216 * e + 65536 * this[++t] + 256 * this[++t] + this[++t],
            i = 16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r;
          return (BigInt(n) << BigInt(32)) + BigInt(i);
        })),
        (u.prototype.readIntLE = function (t, e, r) {
          (t >>>= 0), (e >>>= 0), r || b(t, e, this.length);
          let n = this[t],
            i = 1,
            o = 0;
          for (; ++o < e && (i *= 256); ) n += this[t + o] * i;
          return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n;
        }),
        (u.prototype.readIntBE = function (t, e, r) {
          (t >>>= 0), (e >>>= 0), r || b(t, e, this.length);
          let n = e,
            i = 1,
            o = this[t + --n];
          for (; n > 0 && (i *= 256); ) o += this[t + --n] * i;
          return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
        }),
        (u.prototype.readInt8 = function (t, e) {
          return ((t >>>= 0), e || b(t, 1, this.length), 128 & this[t])
            ? -((255 - this[t] + 1) * 1)
            : this[t];
        }),
        (u.prototype.readInt16LE = function (t, e) {
          (t >>>= 0), e || b(t, 2, this.length);
          let r = this[t] | (this[t + 1] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (u.prototype.readInt16BE = function (t, e) {
          (t >>>= 0), e || b(t, 2, this.length);
          let r = this[t + 1] | (this[t] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (u.prototype.readInt32LE = function (t, e) {
          return (
            (t >>>= 0),
            e || b(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          );
        }),
        (u.prototype.readInt32BE = function (t, e) {
          return (
            (t >>>= 0),
            e || b(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          );
        }),
        (u.prototype.readBigInt64LE = z(function (t) {
          R((t >>>= 0), "offset");
          let e = this[t],
            r = this[t + 7];
          return (
            (void 0 === e || void 0 === r) && k(t, this.length - 8),
            (BigInt(
              this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24)
            ) <<
              BigInt(32)) +
              BigInt(
                e + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t]
              )
          );
        })),
        (u.prototype.readBigInt64BE = z(function (t) {
          R((t >>>= 0), "offset");
          let e = this[t],
            r = this[t + 7];
          return (
            (void 0 === e || void 0 === r) && k(t, this.length - 8),
            (BigInt(
              (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t]
            ) <<
              BigInt(32)) +
              BigInt(
                16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r
              )
          );
        })),
        (u.prototype.readFloatLE = function (t, e) {
          return (
            (t >>>= 0), e || b(t, 4, this.length), i.read(this, t, !0, 23, 4)
          );
        }),
        (u.prototype.readFloatBE = function (t, e) {
          return (
            (t >>>= 0), e || b(t, 4, this.length), i.read(this, t, !1, 23, 4)
          );
        }),
        (u.prototype.readDoubleLE = function (t, e) {
          return (
            (t >>>= 0), e || b(t, 8, this.length), i.read(this, t, !0, 52, 8)
          );
        }),
        (u.prototype.readDoubleBE = function (t, e) {
          return (
            (t >>>= 0), e || b(t, 8, this.length), i.read(this, t, !1, 52, 8)
          );
        }),
        (u.prototype.writeUintLE = u.prototype.writeUIntLE =
          function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), (r >>>= 0), !n)) {
              let n = Math.pow(2, 8 * r) - 1;
              E(this, t, e, r, n, 0);
            }
            let i = 1,
              o = 0;
            for (this[e] = 255 & t; ++o < r && (i *= 256); )
              this[e + o] = (t / i) & 255;
            return e + r;
          }),
        (u.prototype.writeUintBE = u.prototype.writeUIntBE =
          function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), (r >>>= 0), !n)) {
              let n = Math.pow(2, 8 * r) - 1;
              E(this, t, e, r, n, 0);
            }
            let i = r - 1,
              o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
              this[e + i] = (t / o) & 255;
            return e + r;
          }),
        (u.prototype.writeUint8 = u.prototype.writeUInt8 =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 1, 255, 0),
              (this[e] = 255 & t),
              e + 1
            );
          }),
        (u.prototype.writeUint16LE = u.prototype.writeUInt16LE =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 2, 65535, 0),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              e + 2
            );
          }),
        (u.prototype.writeUint16BE = u.prototype.writeUInt16BE =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 2, 65535, 0),
              (this[e] = t >>> 8),
              (this[e + 1] = 255 & t),
              e + 2
            );
          }),
        (u.prototype.writeUint32LE = u.prototype.writeUInt32LE =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 4, 4294967295, 0),
              (this[e + 3] = t >>> 24),
              (this[e + 2] = t >>> 16),
              (this[e + 1] = t >>> 8),
              (this[e] = 255 & t),
              e + 4
            );
          }),
        (u.prototype.writeUint32BE = u.prototype.writeUInt32BE =
          function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || E(this, t, e, 4, 4294967295, 0),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
        (u.prototype.writeBigUInt64LE = z(function (t, e = 0) {
          return M(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
        })),
        (u.prototype.writeBigUInt64BE = z(function (t, e = 0) {
          return x(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
        })),
        (u.prototype.writeIntLE = function (t, e, r, n) {
          if (((t = +t), (e >>>= 0), !n)) {
            let n = Math.pow(2, 8 * r - 1);
            E(this, t, e, r, n - 1, -n);
          }
          let i = 0,
            o = 1,
            s = 0;
          for (this[e] = 255 & t; ++i < r && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1),
              (this[e + i] = (((t / o) >> 0) - s) & 255);
          return e + r;
        }),
        (u.prototype.writeIntBE = function (t, e, r, n) {
          if (((t = +t), (e >>>= 0), !n)) {
            let n = Math.pow(2, 8 * r - 1);
            E(this, t, e, r, n - 1, -n);
          }
          let i = r - 1,
            o = 1,
            s = 0;
          for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1),
              (this[e + i] = (((t / o) >> 0) - s) & 255);
          return e + r;
        }),
        (u.prototype.writeInt8 = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 1, 127, -128),
            t < 0 && (t = 255 + t + 1),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (u.prototype.writeInt16LE = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 2, 32767, -32768),
            (this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            e + 2
          );
        }),
        (u.prototype.writeInt16BE = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 2, 32767, -32768),
            (this[e] = t >>> 8),
            (this[e + 1] = 255 & t),
            e + 2
          );
        }),
        (u.prototype.writeInt32LE = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 4, 2147483647, -2147483648),
            (this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            (this[e + 2] = t >>> 16),
            (this[e + 3] = t >>> 24),
            e + 4
          );
        }),
        (u.prototype.writeInt32BE = function (t, e, r) {
          return (
            (t = +t),
            (e >>>= 0),
            r || E(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            (this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t),
            e + 4
          );
        }),
        (u.prototype.writeBigInt64LE = z(function (t, e = 0) {
          return M(
            this,
            t,
            e,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          );
        })),
        (u.prototype.writeBigInt64BE = z(function (t, e = 0) {
          return x(
            this,
            t,
            e,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          );
        })),
        (u.prototype.writeFloatLE = function (t, e, r) {
          return B(this, t, e, !0, r);
        }),
        (u.prototype.writeFloatBE = function (t, e, r) {
          return B(this, t, e, !1, r);
        }),
        (u.prototype.writeDoubleLE = function (t, e, r) {
          return A(this, t, e, !0, r);
        }),
        (u.prototype.writeDoubleBE = function (t, e, r) {
          return A(this, t, e, !1, r);
        }),
        (u.prototype.copy = function (t, e, r, n) {
          if (!u.isBuffer(t)) throw TypeError("argument should be a Buffer");
          if (
            (r || (r = 0),
            n || 0 === n || (n = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            n > 0 && n < r && (n = r),
            n === r || 0 === t.length || 0 === this.length)
          )
            return 0;
          if (e < 0) throw RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length) throw RangeError("Index out of range");
          if (n < 0) throw RangeError("sourceEnd out of bounds");
          n > this.length && (n = this.length),
            t.length - e < n - r && (n = t.length - e + r);
          let i = n - r;
          return (
            this === t && "function" == typeof Uint8Array.prototype.copyWithin
              ? this.copyWithin(e, r, n)
              : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
            i
          );
        }),
        (u.prototype.fill = function (t, e, r, n) {
          let i;
          if ("string" == typeof t) {
            if (
              ("string" == typeof e
                ? ((n = e), (e = 0), (r = this.length))
                : "string" == typeof r && ((n = r), (r = this.length)),
              void 0 !== n && "string" != typeof n)
            )
              throw TypeError("encoding must be a string");
            if ("string" == typeof n && !u.isEncoding(n))
              throw TypeError("Unknown encoding: " + n);
            if (1 === t.length) {
              let e = t.charCodeAt(0);
              (("utf8" === n && e < 128) || "latin1" === n) && (t = e);
            }
          } else
            "number" == typeof t
              ? (t &= 255)
              : "boolean" == typeof t && (t = Number(t));
          if (e < 0 || this.length < e || this.length < r)
            throw RangeError("Out of range index");
          if (r <= e) return this;
          if (
            ((e >>>= 0),
            (r = void 0 === r ? this.length : r >>> 0),
            t || (t = 0),
            "number" == typeof t)
          )
            for (i = e; i < r; ++i) this[i] = t;
          else {
            let o = u.isBuffer(t) ? t : u.from(t, n),
              s = o.length;
            if (0 === s)
              throw TypeError(
                'The value "' + t + '" is invalid for argument "value"'
              );
            for (i = 0; i < r - e; ++i) this[i + e] = o[i % s];
          }
          return this;
        });
      let S = {};
      function I(t, e, r) {
        S[t] = class extends r {
          constructor() {
            super(),
              Object.defineProperty(this, "message", {
                value: e.apply(this, arguments),
                writable: !0,
                configurable: !0,
              }),
              (this.name = `${this.name} [${t}]`),
              this.stack,
              delete this.name;
          }
          get code() {
            return t;
          }
          set code(t) {
            Object.defineProperty(this, "code", {
              configurable: !0,
              enumerable: !0,
              value: t,
              writable: !0,
            });
          }
          toString() {
            return `${this.name} [${t}]: ${this.message}`;
          }
        };
      }
      function O(t) {
        let e = "",
          r = t.length,
          n = "-" === t[0] ? 1 : 0;
        for (; r >= n + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
        return `${t.slice(0, r)}${e}`;
      }
      function U(t, e, r, n, i, o) {
        if (t > r || t < e) {
          let n;
          let i = "bigint" == typeof e ? "n" : "";
          throw (
            ((n =
              o > 3
                ? 0 === e || e === BigInt(0)
                  ? `>= 0${i} and < 2${i} ** ${(o + 1) * 8}${i}`
                  : `>= -(2${i} ** ${(o + 1) * 8 - 1}${i}) and < 2 ** ${
                      (o + 1) * 8 - 1
                    }${i}`
                : `>= ${e}${i} and <= ${r}${i}`),
            new S.ERR_OUT_OF_RANGE("value", n, t))
          );
        }
        R(i, "offset"),
          (void 0 === n[i] || void 0 === n[i + o]) && k(i, n.length - (o + 1));
      }
      function R(t, e) {
        if ("number" != typeof t)
          throw new S.ERR_INVALID_ARG_TYPE(e, "number", t);
      }
      function k(t, e, r) {
        if (Math.floor(t) !== t)
          throw (
            (R(t, r), new S.ERR_OUT_OF_RANGE(r || "offset", "an integer", t))
          );
        if (e < 0) throw new S.ERR_BUFFER_OUT_OF_BOUNDS();
        throw new S.ERR_OUT_OF_RANGE(
          r || "offset",
          `>= ${r ? 1 : 0} and <= ${e}`,
          t
        );
      }
      I(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function (t) {
          return t
            ? `${t} is outside of buffer bounds`
            : "Attempt to access memory outside buffer bounds";
        },
        RangeError
      ),
        I(
          "ERR_INVALID_ARG_TYPE",
          function (t, e) {
            return `The "${t}" argument must be of type number. Received type ${typeof e}`;
          },
          TypeError
        ),
        I(
          "ERR_OUT_OF_RANGE",
          function (t, e, r) {
            let n = `The value of "${t}" is out of range.`,
              i = r;
            return (
              Number.isInteger(r) && Math.abs(r) > 4294967296
                ? (i = O(String(r)))
                : "bigint" == typeof r &&
                  ((i = String(r)),
                  (r > BigInt(2) ** BigInt(32) ||
                    r < -(BigInt(2) ** BigInt(32))) &&
                    (i = O(i)),
                  (i += "n")),
              (n += ` It must be ${e}. Received ${i}`)
            );
          },
          RangeError
        );
      let L = /[^+/0-9A-Za-z-_]/g;
      function P(t, e) {
        let r;
        e = e || 1 / 0;
        let n = t.length,
          i = null,
          o = [];
        for (let s = 0; s < n; ++s) {
          if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
            if (!i) {
              if (r > 56319 || s + 1 === n) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = r;
              continue;
            }
            if (r < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189), (i = r);
              continue;
            }
            r = (((i - 55296) << 10) | (r - 56320)) + 65536;
          } else i && (e -= 3) > -1 && o.push(239, 191, 189);
          if (((i = null), r < 128)) {
            if ((e -= 1) < 0) break;
            o.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            o.push((r >> 6) | 192, (63 & r) | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
          } else if (r < 1114112) {
            if ((e -= 4) < 0) break;
            o.push(
              (r >> 18) | 240,
              ((r >> 12) & 63) | 128,
              ((r >> 6) & 63) | 128,
              (63 & r) | 128
            );
          } else throw Error("Invalid code point");
        }
        return o;
      }
      function T(t) {
        return n.toByteArray(
          (function (t) {
            if ((t = (t = t.split("=")[0]).trim().replace(L, "")).length < 2)
              return "";
            for (; t.length % 4 != 0; ) t += "=";
            return t;
          })(t)
        );
      }
      function C(t, e, r, n) {
        let i;
        for (i = 0; i < n && !(i + r >= e.length) && !(i >= t.length); ++i)
          e[i + r] = t[i];
        return i;
      }
      function j(t, e) {
        return (
          t instanceof e ||
          (null != t &&
            null != t.constructor &&
            null != t.constructor.name &&
            t.constructor.name === e.name)
        );
      }
      let N = (function () {
        let t = "0123456789abcdef",
          e = Array(256);
        for (let r = 0; r < 16; ++r) {
          let n = 16 * r;
          for (let i = 0; i < 16; ++i) e[n + i] = t[r] + t[i];
        }
        return e;
      })();
      function z(t) {
        return "undefined" == typeof BigInt ? q : t;
      }
      function q() {
        throw Error("BigInt not supported");
      }
    },
    6153: function (t) {
      "use strict";
      var e = Object.prototype.hasOwnProperty,
        r = "~";
      function n() {}
      function i(t, e, r) {
        (this.fn = t), (this.context = e), (this.once = r || !1);
      }
      function o(t, e, n, o, s) {
        if ("function" != typeof n)
          throw TypeError("The listener must be a function");
        var u = new i(n, o || t, s),
          a = r ? r + e : e;
        return (
          t._events[a]
            ? t._events[a].fn
              ? (t._events[a] = [t._events[a], u])
              : t._events[a].push(u)
            : ((t._events[a] = u), t._eventsCount++),
          t
        );
      }
      function s(t, e) {
        0 == --t._eventsCount ? (t._events = new n()) : delete t._events[e];
      }
      function u() {
        (this._events = new n()), (this._eventsCount = 0);
      }
      Object.create &&
        ((n.prototype = Object.create(null)), new n().__proto__ || (r = !1)),
        (u.prototype.eventNames = function () {
          var t,
            n,
            i = [];
          if (0 === this._eventsCount) return i;
          for (n in (t = this._events))
            e.call(t, n) && i.push(r ? n.slice(1) : n);
          return Object.getOwnPropertySymbols
            ? i.concat(Object.getOwnPropertySymbols(t))
            : i;
        }),
        (u.prototype.listeners = function (t) {
          var e = r ? r + t : t,
            n = this._events[e];
          if (!n) return [];
          if (n.fn) return [n.fn];
          for (var i = 0, o = n.length, s = Array(o); i < o; i++)
            s[i] = n[i].fn;
          return s;
        }),
        (u.prototype.listenerCount = function (t) {
          var e = r ? r + t : t,
            n = this._events[e];
          return n ? (n.fn ? 1 : n.length) : 0;
        }),
        (u.prototype.emit = function (t, e, n, i, o, s) {
          var u = r ? r + t : t;
          if (!this._events[u]) return !1;
          var a,
            h,
            l = this._events[u],
            f = arguments.length;
          if (l.fn) {
            switch ((l.once && this.removeListener(t, l.fn, void 0, !0), f)) {
              case 1:
                return l.fn.call(l.context), !0;
              case 2:
                return l.fn.call(l.context, e), !0;
              case 3:
                return l.fn.call(l.context, e, n), !0;
              case 4:
                return l.fn.call(l.context, e, n, i), !0;
              case 5:
                return l.fn.call(l.context, e, n, i, o), !0;
              case 6:
                return l.fn.call(l.context, e, n, i, o, s), !0;
            }
            for (h = 1, a = Array(f - 1); h < f; h++) a[h - 1] = arguments[h];
            l.fn.apply(l.context, a);
          } else {
            var c,
              d = l.length;
            for (h = 0; h < d; h++)
              switch (
                (l[h].once && this.removeListener(t, l[h].fn, void 0, !0), f)
              ) {
                case 1:
                  l[h].fn.call(l[h].context);
                  break;
                case 2:
                  l[h].fn.call(l[h].context, e);
                  break;
                case 3:
                  l[h].fn.call(l[h].context, e, n);
                  break;
                case 4:
                  l[h].fn.call(l[h].context, e, n, i);
                  break;
                default:
                  if (!a)
                    for (c = 1, a = Array(f - 1); c < f; c++)
                      a[c - 1] = arguments[c];
                  l[h].fn.apply(l[h].context, a);
              }
          }
          return !0;
        }),
        (u.prototype.on = function (t, e, r) {
          return o(this, t, e, r, !1);
        }),
        (u.prototype.once = function (t, e, r) {
          return o(this, t, e, r, !0);
        }),
        (u.prototype.removeListener = function (t, e, n, i) {
          var o = r ? r + t : t;
          if (!this._events[o]) return this;
          if (!e) return s(this, o), this;
          var u = this._events[o];
          if (u.fn)
            u.fn !== e ||
              (i && !u.once) ||
              (n && u.context !== n) ||
              s(this, o);
          else {
            for (var a = 0, h = [], l = u.length; a < l; a++)
              (u[a].fn !== e ||
                (i && !u[a].once) ||
                (n && u[a].context !== n)) &&
                h.push(u[a]);
            h.length
              ? (this._events[o] = 1 === h.length ? h[0] : h)
              : s(this, o);
          }
          return this;
        }),
        (u.prototype.removeAllListeners = function (t) {
          var e;
          return (
            t
              ? ((e = r ? r + t : t), this._events[e] && s(this, e))
              : ((this._events = new n()), (this._eventsCount = 0)),
            this
          );
        }),
        (u.prototype.off = u.prototype.removeListener),
        (u.prototype.addListener = u.prototype.on),
        (u.prefixed = r),
        (u.EventEmitter = u),
        (t.exports = u);
    },
    1064: function (t) {
      "use strict";
      var e = Object.prototype.hasOwnProperty,
        r = "~";
      function n() {}
      function i(t, e, r) {
        (this.fn = t), (this.context = e), (this.once = r || !1);
      }
      function o(t, e, n, o, s) {
        if ("function" != typeof n)
          throw TypeError("The listener must be a function");
        var u = new i(n, o || t, s),
          a = r ? r + e : e;
        return (
          t._events[a]
            ? t._events[a].fn
              ? (t._events[a] = [t._events[a], u])
              : t._events[a].push(u)
            : ((t._events[a] = u), t._eventsCount++),
          t
        );
      }
      function s(t, e) {
        0 == --t._eventsCount ? (t._events = new n()) : delete t._events[e];
      }
      function u() {
        (this._events = new n()), (this._eventsCount = 0);
      }
      Object.create &&
        ((n.prototype = Object.create(null)), new n().__proto__ || (r = !1)),
        (u.prototype.eventNames = function () {
          var t,
            n,
            i = [];
          if (0 === this._eventsCount) return i;
          for (n in (t = this._events))
            e.call(t, n) && i.push(r ? n.slice(1) : n);
          return Object.getOwnPropertySymbols
            ? i.concat(Object.getOwnPropertySymbols(t))
            : i;
        }),
        (u.prototype.listeners = function (t) {
          var e = r ? r + t : t,
            n = this._events[e];
          if (!n) return [];
          if (n.fn) return [n.fn];
          for (var i = 0, o = n.length, s = Array(o); i < o; i++)
            s[i] = n[i].fn;
          return s;
        }),
        (u.prototype.listenerCount = function (t) {
          var e = r ? r + t : t,
            n = this._events[e];
          return n ? (n.fn ? 1 : n.length) : 0;
        }),
        (u.prototype.emit = function (t, e, n, i, o, s) {
          var u = r ? r + t : t;
          if (!this._events[u]) return !1;
          var a,
            h,
            l = this._events[u],
            f = arguments.length;
          if (l.fn) {
            switch ((l.once && this.removeListener(t, l.fn, void 0, !0), f)) {
              case 1:
                return l.fn.call(l.context), !0;
              case 2:
                return l.fn.call(l.context, e), !0;
              case 3:
                return l.fn.call(l.context, e, n), !0;
              case 4:
                return l.fn.call(l.context, e, n, i), !0;
              case 5:
                return l.fn.call(l.context, e, n, i, o), !0;
              case 6:
                return l.fn.call(l.context, e, n, i, o, s), !0;
            }
            for (h = 1, a = Array(f - 1); h < f; h++) a[h - 1] = arguments[h];
            l.fn.apply(l.context, a);
          } else {
            var c,
              d = l.length;
            for (h = 0; h < d; h++)
              switch (
                (l[h].once && this.removeListener(t, l[h].fn, void 0, !0), f)
              ) {
                case 1:
                  l[h].fn.call(l[h].context);
                  break;
                case 2:
                  l[h].fn.call(l[h].context, e);
                  break;
                case 3:
                  l[h].fn.call(l[h].context, e, n);
                  break;
                case 4:
                  l[h].fn.call(l[h].context, e, n, i);
                  break;
                default:
                  if (!a)
                    for (c = 1, a = Array(f - 1); c < f; c++)
                      a[c - 1] = arguments[c];
                  l[h].fn.apply(l[h].context, a);
              }
          }
          return !0;
        }),
        (u.prototype.on = function (t, e, r) {
          return o(this, t, e, r, !1);
        }),
        (u.prototype.once = function (t, e, r) {
          return o(this, t, e, r, !0);
        }),
        (u.prototype.removeListener = function (t, e, n, i) {
          var o = r ? r + t : t;
          if (!this._events[o]) return this;
          if (!e) return s(this, o), this;
          var u = this._events[o];
          if (u.fn)
            u.fn !== e ||
              (i && !u.once) ||
              (n && u.context !== n) ||
              s(this, o);
          else {
            for (var a = 0, h = [], l = u.length; a < l; a++)
              (u[a].fn !== e ||
                (i && !u[a].once) ||
                (n && u[a].context !== n)) &&
                h.push(u[a]);
            h.length
              ? (this._events[o] = 1 === h.length ? h[0] : h)
              : s(this, o);
          }
          return this;
        }),
        (u.prototype.removeAllListeners = function (t) {
          var e;
          return (
            t
              ? ((e = r ? r + t : t), this._events[e] && s(this, e))
              : ((this._events = new n()), (this._eventsCount = 0)),
            this
          );
        }),
        (u.prototype.off = u.prototype.removeListener),
        (u.prototype.addListener = u.prototype.on),
        (u.prefixed = r),
        (u.EventEmitter = u),
        (t.exports = u);
    },
    9008: function (t, e) {
      (e.read = function (t, e, r, n, i) {
        var o,
          s,
          u = 8 * i - n - 1,
          a = (1 << u) - 1,
          h = a >> 1,
          l = -7,
          f = r ? i - 1 : 0,
          c = r ? -1 : 1,
          d = t[e + f];
        for (
          f += c, o = d & ((1 << -l) - 1), d >>= -l, l += u;
          l > 0;
          o = 256 * o + t[e + f], f += c, l -= 8
        );
        for (
          s = o & ((1 << -l) - 1), o >>= -l, l += n;
          l > 0;
          s = 256 * s + t[e + f], f += c, l -= 8
        );
        if (0 === o) o = 1 - h;
        else {
          if (o === a) return s ? NaN : (1 / 0) * (d ? -1 : 1);
          (s += Math.pow(2, n)), (o -= h);
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - n);
      }),
        (e.write = function (t, e, r, n, i, o) {
          var s,
            u,
            a,
            h = 8 * o - i - 1,
            l = (1 << h) - 1,
            f = l >> 1,
            c = 23 === i ? 5960464477539062e-23 : 0,
            d = n ? 0 : o - 1,
            p = n ? 1 : -1,
            g = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
          for (
            isNaN((e = Math.abs(e))) || e === 1 / 0
              ? ((u = isNaN(e) ? 1 : 0), (s = l))
              : ((s = Math.floor(Math.log(e) / Math.LN2)),
                e * (a = Math.pow(2, -s)) < 1 && (s--, (a *= 2)),
                s + f >= 1 ? (e += c / a) : (e += c * Math.pow(2, 1 - f)),
                e * a >= 2 && (s++, (a /= 2)),
                s + f >= l
                  ? ((u = 0), (s = l))
                  : s + f >= 1
                  ? ((u = (e * a - 1) * Math.pow(2, i)), (s += f))
                  : ((u = e * Math.pow(2, f - 1) * Math.pow(2, i)), (s = 0)));
            i >= 8;
            t[r + d] = 255 & u, d += p, u /= 256, i -= 8
          );
          for (
            s = (s << i) | u, h += i;
            h > 0;
            t[r + d] = 255 & s, d += p, s /= 256, h -= 8
          );
          t[r + d - p] |= 128 * g;
        });
    },
    9731: function (t, e, r) {
      "use strict";
      let n = r(9918).v4,
        i = r(6639),
        o = function (t, e) {
          if (!(this instanceof o)) return new o(t, e);
          e || (e = {}),
            (this.options = {
              reviver: void 0 !== e.reviver ? e.reviver : null,
              replacer: void 0 !== e.replacer ? e.replacer : null,
              generator:
                void 0 !== e.generator
                  ? e.generator
                  : function () {
                      return n();
                    },
              version: void 0 !== e.version ? e.version : 2,
              notificationIdNull:
                "boolean" == typeof e.notificationIdNull &&
                e.notificationIdNull,
            }),
            (this.callServer = t);
        };
      (t.exports = o),
        (o.prototype.request = function (t, e, r, n) {
          let o;
          let s = this,
            u = null,
            a = Array.isArray(t) && "function" == typeof e;
          if (1 === this.options.version && a)
            throw TypeError("JSON-RPC 1.0 does not support batching");
          let h = !a && t && "object" == typeof t && "function" == typeof e;
          if (a || h) (n = e), (u = t);
          else {
            "function" == typeof r && ((n = r), (r = void 0));
            let o = "function" == typeof n;
            try {
              u = i(t, e, r, {
                generator: this.options.generator,
                version: this.options.version,
                notificationIdNull: this.options.notificationIdNull,
              });
            } catch (t) {
              if (o) return n(t);
              throw t;
            }
            if (!o) return u;
          }
          try {
            o = JSON.stringify(u, this.options.replacer);
          } catch (t) {
            return n(t);
          }
          return (
            this.callServer(o, function (t, e) {
              s._parseResponse(t, e, n);
            }),
            u
          );
        }),
        (o.prototype._parseResponse = function (t, e, r) {
          let n;
          if (t) {
            r(t);
            return;
          }
          if (!e) return r();
          try {
            n = JSON.parse(e, this.options.reviver);
          } catch (t) {
            return r(t);
          }
          if (3 === r.length) {
            if (!Array.isArray(n)) return r(null, n.error, n.result);
            {
              let t = function (t) {
                return void 0 !== t.error;
              };
              return r(
                null,
                n.filter(t),
                n.filter(function (e) {
                  return !t(e);
                })
              );
            }
          }
          r(null, n);
        });
    },
    6639: function (t, e, r) {
      "use strict";
      let n = r(9918).v4;
      t.exports = function (t, e, r, i) {
        if ("string" != typeof t) throw TypeError(t + " must be a string");
        let o = "number" == typeof (i = i || {}).version ? i.version : 2;
        if (1 !== o && 2 !== o) throw TypeError(o + " must be 1 or 2");
        let s = { method: t };
        if ((2 === o && (s.jsonrpc = "2.0"), e)) {
          if ("object" != typeof e && !Array.isArray(e))
            throw TypeError(e + " must be an object, array or omitted");
          s.params = e;
        }
        if (void 0 === r) {
          let t =
            "function" == typeof i.generator
              ? i.generator
              : function () {
                  return n();
                };
          s.id = t(s, i);
        } else
          2 === o && null === r
            ? i.notificationIdNull && (s.id = null)
            : (s.id = r);
        return s;
      };
    },
    7591: function (t, e, r) {
      "use strict";
      r.d(e, {
        default: function () {
          return i.a;
        },
      });
      var n = r(9788),
        i = r.n(n);
    },
    3666: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "Image", {
          enumerable: !0,
          get: function () {
            return v;
          },
        });
      let n = r(9742),
        i = r(3933),
        o = r(1773),
        s = i._(r(5789)),
        u = n._(r(1968)),
        a = n._(r(4329)),
        h = r(8234),
        l = r(3098),
        f = r(6071);
      r(8317);
      let c = r(8907),
        d = n._(r(8883)),
        p = {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          path: "/_next/image",
          loader: "default",
          dangerouslyAllowSVG: !1,
          unoptimized: !1,
        };
      function g(t, e, r, n, i, o, s) {
        let u = null == t ? void 0 : t.src;
        t &&
          t["data-loaded-src"] !== u &&
          ((t["data-loaded-src"] = u),
          ("decode" in t ? t.decode() : Promise.resolve())
            .catch(() => {})
            .then(() => {
              if (t.parentElement && t.isConnected) {
                if (("empty" !== e && i(!0), null == r ? void 0 : r.current)) {
                  let e = new Event("load");
                  Object.defineProperty(e, "target", {
                    writable: !1,
                    value: t,
                  });
                  let n = !1,
                    i = !1;
                  r.current({
                    ...e,
                    nativeEvent: e,
                    currentTarget: t,
                    target: t,
                    isDefaultPrevented: () => n,
                    isPropagationStopped: () => i,
                    persist: () => {},
                    preventDefault: () => {
                      (n = !0), e.preventDefault();
                    },
                    stopPropagation: () => {
                      (i = !0), e.stopPropagation();
                    },
                  });
                }
                (null == n ? void 0 : n.current) && n.current(t);
              }
            }));
      }
      function m(t) {
        return s.use ? { fetchPriority: t } : { fetchpriority: t };
      }
      "undefined" == typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
      let y = (0, s.forwardRef)((t, e) => {
        let {
          src: r,
          srcSet: n,
          sizes: i,
          height: u,
          width: a,
          decoding: h,
          className: l,
          style: f,
          fetchPriority: c,
          placeholder: d,
          loading: p,
          unoptimized: y,
          fill: w,
          onLoadRef: v,
          onLoadingCompleteRef: b,
          setBlurComplete: E,
          setShowAltText: M,
          sizesInput: x,
          onLoad: _,
          onError: B,
          ...A
        } = t;
        return (0, o.jsx)("img", {
          ...A,
          ...m(c),
          loading: p,
          width: a,
          height: u,
          decoding: h,
          "data-nimg": w ? "fill" : "1",
          className: l,
          style: f,
          sizes: i,
          srcSet: n,
          src: r,
          ref: (0, s.useCallback)(
            (t) => {
              e &&
                ("function" == typeof e
                  ? e(t)
                  : "object" == typeof e && (e.current = t)),
                t &&
                  (B && (t.src = t.src), t.complete && g(t, d, v, b, E, y, x));
            },
            [r, d, v, b, E, B, y, x, e]
          ),
          onLoad: (t) => {
            g(t.currentTarget, d, v, b, E, y, x);
          },
          onError: (t) => {
            M(!0), "empty" !== d && E(!0), B && B(t);
          },
        });
      });
      function w(t) {
        let { isAppRouter: e, imgAttributes: r } = t,
          n = {
            as: "image",
            imageSrcSet: r.srcSet,
            imageSizes: r.sizes,
            crossOrigin: r.crossOrigin,
            referrerPolicy: r.referrerPolicy,
            ...m(r.fetchPriority),
          };
        return e && u.default.preload
          ? (u.default.preload(r.src, n), null)
          : (0, o.jsx)(a.default, {
              children: (0, o.jsx)(
                "link",
                { rel: "preload", href: r.srcSet ? void 0 : r.src, ...n },
                "__nimg-" + r.src + r.srcSet + r.sizes
              ),
            });
      }
      let v = (0, s.forwardRef)((t, e) => {
        let r = (0, s.useContext)(c.RouterContext),
          n = (0, s.useContext)(f.ImageConfigContext),
          i = (0, s.useMemo)(() => {
            let t = p || n || l.imageConfigDefault,
              e = [...t.deviceSizes, ...t.imageSizes].sort((t, e) => t - e),
              r = t.deviceSizes.sort((t, e) => t - e);
            return { ...t, allSizes: e, deviceSizes: r };
          }, [n]),
          { onLoad: u, onLoadingComplete: a } = t,
          g = (0, s.useRef)(u);
        (0, s.useEffect)(() => {
          g.current = u;
        }, [u]);
        let m = (0, s.useRef)(a);
        (0, s.useEffect)(() => {
          m.current = a;
        }, [a]);
        let [v, b] = (0, s.useState)(!1),
          [E, M] = (0, s.useState)(!1),
          { props: x, meta: _ } = (0, h.getImgProps)(t, {
            defaultLoader: d.default,
            imgConf: i,
            blurComplete: v,
            showAltText: E,
          });
        return (0, o.jsxs)(o.Fragment, {
          children: [
            (0, o.jsx)(y, {
              ...x,
              unoptimized: _.unoptimized,
              placeholder: _.placeholder,
              fill: _.fill,
              onLoadRef: g,
              onLoadingCompleteRef: m,
              setBlurComplete: b,
              setShowAltText: M,
              sizesInput: t.sizes,
              ref: e,
            }),
            _.priority
              ? (0, o.jsx)(w, { isAppRouter: !r, imgAttributes: x })
              : null,
          ],
        });
      });
      ("function" == typeof e.default ||
        ("object" == typeof e.default && null !== e.default)) &&
        void 0 === e.default.__esModule &&
        (Object.defineProperty(e.default, "__esModule", { value: !0 }),
        Object.assign(e.default, e),
        (t.exports = e.default));
    },
    4100: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "AmpStateContext", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let n = r(9742)._(r(5789)).default.createContext({});
    },
    95: function (t, e) {
      "use strict";
      function r(t) {
        let {
          ampFirst: e = !1,
          hybrid: r = !1,
          hasQuery: n = !1,
        } = void 0 === t ? {} : t;
        return e || (r && n);
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "isInAmpMode", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
    },
    8234: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "getImgProps", {
          enumerable: !0,
          get: function () {
            return u;
          },
        }),
        r(8317);
      let n = r(209),
        i = r(3098);
      function o(t) {
        return void 0 !== t.default;
      }
      function s(t) {
        return void 0 === t
          ? t
          : "number" == typeof t
          ? Number.isFinite(t)
            ? t
            : NaN
          : "string" == typeof t && /^[0-9]+$/.test(t)
          ? parseInt(t, 10)
          : NaN;
      }
      function u(t, e) {
        var r;
        let u,
          a,
          h,
          {
            src: l,
            sizes: f,
            unoptimized: c = !1,
            priority: d = !1,
            loading: p,
            className: g,
            quality: m,
            width: y,
            height: w,
            fill: v = !1,
            style: b,
            overrideSrc: E,
            onLoad: M,
            onLoadingComplete: x,
            placeholder: _ = "empty",
            blurDataURL: B,
            fetchPriority: A,
            layout: S,
            objectFit: I,
            objectPosition: O,
            lazyBoundary: U,
            lazyRoot: R,
            ...k
          } = t,
          { imgConf: L, showAltText: P, blurComplete: T, defaultLoader: C } = e,
          j = L || i.imageConfigDefault;
        if ("allSizes" in j) u = j;
        else {
          let t = [...j.deviceSizes, ...j.imageSizes].sort((t, e) => t - e),
            e = j.deviceSizes.sort((t, e) => t - e);
          u = { ...j, allSizes: t, deviceSizes: e };
        }
        if (void 0 === C)
          throw Error(
            "images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"
          );
        let N = k.loader || C;
        delete k.loader, delete k.srcSet;
        let z = "__next_img_default" in N;
        if (z) {
          if ("custom" === u.loader)
            throw Error(
              'Image with src "' +
                l +
                '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'
            );
        } else {
          let t = N;
          N = (e) => {
            let { config: r, ...n } = e;
            return t(n);
          };
        }
        if (S) {
          "fill" === S && (v = !0);
          let t = {
            intrinsic: { maxWidth: "100%", height: "auto" },
            responsive: { width: "100%", height: "auto" },
          }[S];
          t && (b = { ...b, ...t });
          let e = { responsive: "100vw", fill: "100vw" }[S];
          e && !f && (f = e);
        }
        let q = "",
          F = s(y),
          $ = s(w);
        if ("object" == typeof (r = l) && (o(r) || void 0 !== r.src)) {
          let t = o(l) ? l.default : l;
          if (!t.src)
            throw Error(
              "An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " +
                JSON.stringify(t)
            );
          if (!t.height || !t.width)
            throw Error(
              "An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " +
                JSON.stringify(t)
            );
          if (
            ((a = t.blurWidth),
            (h = t.blurHeight),
            (B = B || t.blurDataURL),
            (q = t.src),
            !v)
          ) {
            if (F || $) {
              if (F && !$) {
                let e = F / t.width;
                $ = Math.round(t.height * e);
              } else if (!F && $) {
                let e = $ / t.height;
                F = Math.round(t.width * e);
              }
            } else (F = t.width), ($ = t.height);
          }
        }
        let Z = !d && ("lazy" === p || void 0 === p);
        (!(l = "string" == typeof l ? l : q) ||
          l.startsWith("data:") ||
          l.startsWith("blob:")) &&
          ((c = !0), (Z = !1)),
          u.unoptimized && (c = !0),
          z && l.endsWith(".svg") && !u.dangerouslyAllowSVG && (c = !0),
          d && (A = "high");
        let H = s(m),
          D = Object.assign(
            v
              ? {
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  objectFit: I,
                  objectPosition: O,
                }
              : {},
            P ? {} : { color: "transparent" },
            b
          ),
          V =
            T || "empty" === _
              ? null
              : "blur" === _
              ? 'url("data:image/svg+xml;charset=utf-8,' +
                (0, n.getImageBlurSvg)({
                  widthInt: F,
                  heightInt: $,
                  blurWidth: a,
                  blurHeight: h,
                  blurDataURL: B || "",
                  objectFit: D.objectFit,
                }) +
                '")'
              : 'url("' + _ + '")',
          G = V
            ? {
                backgroundSize: D.objectFit || "cover",
                backgroundPosition: D.objectPosition || "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundImage: V,
              }
            : {},
          K = (function (t) {
            let {
              config: e,
              src: r,
              unoptimized: n,
              width: i,
              quality: o,
              sizes: s,
              loader: u,
            } = t;
            if (n) return { src: r, srcSet: void 0, sizes: void 0 };
            let { widths: a, kind: h } = (function (t, e, r) {
                let { deviceSizes: n, allSizes: i } = t;
                if (r) {
                  let t = /(^|\s)(1?\d?\d)vw/g,
                    e = [];
                  for (let n; (n = t.exec(r)); n) e.push(parseInt(n[2]));
                  if (e.length) {
                    let t = 0.01 * Math.min(...e);
                    return {
                      widths: i.filter((e) => e >= n[0] * t),
                      kind: "w",
                    };
                  }
                  return { widths: i, kind: "w" };
                }
                return "number" != typeof e
                  ? { widths: n, kind: "w" }
                  : {
                      widths: [
                        ...new Set(
                          [e, 2 * e].map(
                            (t) => i.find((e) => e >= t) || i[i.length - 1]
                          )
                        ),
                      ],
                      kind: "x",
                    };
              })(e, i, s),
              l = a.length - 1;
            return {
              sizes: s || "w" !== h ? s : "100vw",
              srcSet: a
                .map(
                  (t, n) =>
                    u({ config: e, src: r, quality: o, width: t }) +
                    " " +
                    ("w" === h ? t : n + 1) +
                    h
                )
                .join(", "),
              src: u({ config: e, src: r, quality: o, width: a[l] }),
            };
          })({
            config: u,
            src: l,
            unoptimized: c,
            width: F,
            quality: H,
            sizes: f,
            loader: N,
          });
        return {
          props: {
            ...k,
            loading: Z ? "lazy" : p,
            fetchPriority: A,
            width: F,
            height: $,
            decoding: "async",
            className: g,
            style: { ...D, ...G },
            sizes: K.sizes,
            srcSet: K.srcSet,
            src: E || K.src,
          },
          meta: { unoptimized: c, priority: d, placeholder: _, fill: v },
        };
      }
    },
    4329: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (function (t, e) {
          for (var r in e)
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
        })(e, {
          default: function () {
            return g;
          },
          defaultHead: function () {
            return f;
          },
        });
      let n = r(9742),
        i = r(3933),
        o = r(1773),
        s = i._(r(5789)),
        u = n._(r(511)),
        a = r(4100),
        h = r(4441),
        l = r(95);
      function f(t) {
        void 0 === t && (t = !1);
        let e = [(0, o.jsx)("meta", { charSet: "utf-8" })];
        return (
          t ||
            e.push(
              (0, o.jsx)("meta", {
                name: "viewport",
                content: "width=device-width",
              })
            ),
          e
        );
      }
      function c(t, e) {
        return "string" == typeof e || "number" == typeof e
          ? t
          : e.type === s.default.Fragment
          ? t.concat(
              s.default.Children.toArray(e.props.children).reduce(
                (t, e) =>
                  "string" == typeof e || "number" == typeof e
                    ? t
                    : t.concat(e),
                []
              )
            )
          : t.concat(e);
      }
      r(8317);
      let d = ["name", "httpEquiv", "charSet", "itemProp"];
      function p(t, e) {
        let { inAmpMode: r } = e;
        return t
          .reduce(c, [])
          .reverse()
          .concat(f(r).reverse())
          .filter(
            (function () {
              let t = new Set(),
                e = new Set(),
                r = new Set(),
                n = {};
              return (i) => {
                let o = !0,
                  s = !1;
                if (
                  i.key &&
                  "number" != typeof i.key &&
                  i.key.indexOf("$") > 0
                ) {
                  s = !0;
                  let e = i.key.slice(i.key.indexOf("$") + 1);
                  t.has(e) ? (o = !1) : t.add(e);
                }
                switch (i.type) {
                  case "title":
                  case "base":
                    e.has(i.type) ? (o = !1) : e.add(i.type);
                    break;
                  case "meta":
                    for (let t = 0, e = d.length; t < e; t++) {
                      let e = d[t];
                      if (i.props.hasOwnProperty(e)) {
                        if ("charSet" === e) r.has(e) ? (o = !1) : r.add(e);
                        else {
                          let t = i.props[e],
                            r = n[e] || new Set();
                          ("name" !== e || !s) && r.has(t)
                            ? (o = !1)
                            : (r.add(t), (n[e] = r));
                        }
                      }
                    }
                }
                return o;
              };
            })()
          )
          .reverse()
          .map((t, e) => {
            let n = t.key || e;
            if (
              !r &&
              "link" === t.type &&
              t.props.href &&
              [
                "https://fonts.googleapis.com/css",
                "https://use.typekit.net/",
              ].some((e) => t.props.href.startsWith(e))
            ) {
              let e = { ...(t.props || {}) };
              return (
                (e["data-href"] = e.href),
                (e.href = void 0),
                (e["data-optimized-fonts"] = !0),
                s.default.cloneElement(t, e)
              );
            }
            return s.default.cloneElement(t, { key: n });
          });
      }
      let g = function (t) {
        let { children: e } = t,
          r = (0, s.useContext)(a.AmpStateContext),
          n = (0, s.useContext)(h.HeadManagerContext);
        return (0, o.jsx)(u.default, {
          reduceComponentsToState: p,
          headManager: n,
          inAmpMode: (0, l.isInAmpMode)(r),
          children: e,
        });
      };
      ("function" == typeof e.default ||
        ("object" == typeof e.default && null !== e.default)) &&
        void 0 === e.default.__esModule &&
        (Object.defineProperty(e.default, "__esModule", { value: !0 }),
        Object.assign(e.default, e),
        (t.exports = e.default));
    },
    209: function (t, e) {
      "use strict";
      function r(t) {
        let {
            widthInt: e,
            heightInt: r,
            blurWidth: n,
            blurHeight: i,
            blurDataURL: o,
            objectFit: s,
          } = t,
          u = n ? 40 * n : e,
          a = i ? 40 * i : r,
          h = u && a ? "viewBox='0 0 " + u + " " + a + "'" : "";
        return (
          "%3Csvg xmlns='http://www.w3.org/2000/svg' " +
          h +
          "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" +
          (h
            ? "none"
            : "contain" === s
            ? "xMidYMid"
            : "cover" === s
            ? "xMidYMid slice"
            : "none") +
          "' style='filter: url(%23b);' href='" +
          o +
          "'/%3E%3C/svg%3E"
        );
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "getImageBlurSvg", {
          enumerable: !0,
          get: function () {
            return r;
          },
        });
    },
    6071: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "ImageConfigContext", {
          enumerable: !0,
          get: function () {
            return o;
          },
        });
      let n = r(9742)._(r(5789)),
        i = r(3098),
        o = n.default.createContext(i.imageConfigDefault);
    },
    3098: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (function (t, e) {
          for (var r in e)
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
        })(e, {
          VALID_LOADERS: function () {
            return r;
          },
          imageConfigDefault: function () {
            return n;
          },
        });
      let r = ["default", "imgix", "cloudinary", "akamai", "custom"],
        n = {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          path: "/_next/image",
          loader: "default",
          loaderFile: "",
          domains: [],
          disableStaticImages: !1,
          minimumCacheTTL: 60,
          formats: ["image/webp"],
          dangerouslyAllowSVG: !1,
          contentSecurityPolicy:
            "script-src 'none'; frame-src 'none'; sandbox;",
          contentDispositionType: "inline",
          remotePatterns: [],
          unoptimized: !1,
        };
    },
    9788: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (function (t, e) {
          for (var r in e)
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
        })(e, {
          default: function () {
            return a;
          },
          getImageProps: function () {
            return u;
          },
        });
      let n = r(9742),
        i = r(8234),
        o = r(3666),
        s = n._(r(8883));
      function u(t) {
        let { props: e } = (0, i.getImgProps)(t, {
          defaultLoader: s.default,
          imgConf: {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: "/_next/image",
            loader: "default",
            dangerouslyAllowSVG: !1,
            unoptimized: !1,
          },
        });
        for (let [t, r] of Object.entries(e)) void 0 === r && delete e[t];
        return { props: e };
      }
      let a = o.Image;
    },
    8883: function (t, e) {
      "use strict";
      function r(t) {
        let { config: e, src: r, width: n, quality: i } = t;
        return (
          e.path +
          "?url=" +
          encodeURIComponent(r) +
          "&w=" +
          n +
          "&q=" +
          (i || 75)
        );
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "default", {
          enumerable: !0,
          get: function () {
            return n;
          },
        }),
        (r.__next_img_default = !0);
      let n = r;
    },
    8907: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "RouterContext", {
          enumerable: !0,
          get: function () {
            return n;
          },
        });
      let n = r(9742)._(r(5789)).default.createContext(null);
    },
    511: function (t, e, r) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        Object.defineProperty(e, "default", {
          enumerable: !0,
          get: function () {
            return u;
          },
        });
      let n = r(5789),
        i = "undefined" == typeof window,
        o = i ? () => {} : n.useLayoutEffect,
        s = i ? () => {} : n.useEffect;
      function u(t) {
        let { headManager: e, reduceComponentsToState: r } = t;
        function u() {
          if (e && e.mountedInstances) {
            let i = n.Children.toArray(
              Array.from(e.mountedInstances).filter(Boolean)
            );
            e.updateHead(r(i, t));
          }
        }
        if (i) {
          var a;
          null == e || null == (a = e.mountedInstances) || a.add(t.children),
            u();
        }
        return (
          o(() => {
            var r;
            return (
              null == e ||
                null == (r = e.mountedInstances) ||
                r.add(t.children),
              () => {
                var r;
                null == e ||
                  null == (r = e.mountedInstances) ||
                  r.delete(t.children);
              }
            );
          }),
          o(
            () => (
              e && (e._pendingUpdate = u),
              () => {
                e && (e._pendingUpdate = u);
              }
            )
          ),
          s(
            () => (
              e &&
                e._pendingUpdate &&
                (e._pendingUpdate(), (e._pendingUpdate = null)),
              () => {
                e &&
                  e._pendingUpdate &&
                  (e._pendingUpdate(), (e._pendingUpdate = null));
              }
            )
          ),
          null
        );
      }
    },
    5455: function (t, e, r) {
      var n = r(9417),
        i = n.Buffer;
      function o(t, e) {
        for (var r in t) e[r] = t[r];
      }
      function s(t, e, r) {
        return i(t, e, r);
      }
      i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
        ? (t.exports = n)
        : (o(n, e), (e.Buffer = s)),
        (s.prototype = Object.create(i.prototype)),
        o(i, s),
        (s.from = function (t, e, r) {
          if ("number" == typeof t)
            throw TypeError("Argument must not be a number");
          return i(t, e, r);
        }),
        (s.alloc = function (t, e, r) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          var n = i(t);
          return (
            void 0 !== e
              ? "string" == typeof r
                ? n.fill(e, r)
                : n.fill(e)
              : n.fill(0),
            n
          );
        }),
        (s.allocUnsafe = function (t) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          return i(t);
        }),
        (s.allocUnsafeSlow = function (t) {
          if ("number" != typeof t)
            throw TypeError("Argument must be a number");
          return n.SlowBuffer(t);
        });
    },
    801: function (t, e) {
      "use strict";
      function r(t, e, r) {
        return e <= t && t <= r;
      }
      function n(t) {
        if (void 0 === t) return {};
        if (t === Object(t)) return t;
        throw TypeError("Could not convert argument to dictionary");
      }
      function i(t) {
        this.tokens = [].slice.call(t);
      }
      function o(t, e) {
        if (t) throw TypeError("Decoder error");
        return e || 65533;
      }
      i.prototype = {
        endOfStream: function () {
          return !this.tokens.length;
        },
        read: function () {
          return this.tokens.length ? this.tokens.shift() : -1;
        },
        prepend: function (t) {
          if (Array.isArray(t)) for (; t.length; ) this.tokens.unshift(t.pop());
          else this.tokens.unshift(t);
        },
        push: function (t) {
          if (Array.isArray(t)) for (; t.length; ) this.tokens.push(t.shift());
          else this.tokens.push(t);
        },
      };
      var s = "utf-8";
      function u(t, e) {
        if (!(this instanceof u)) return new u(t, e);
        if ((t = void 0 !== t ? String(t).toLowerCase() : s) !== s)
          throw Error("Encoding not supported. Only utf-8 is supported");
        (e = n(e)),
          (this._streaming = !1),
          (this._BOMseen = !1),
          (this._decoder = null),
          (this._fatal = !!e.fatal),
          (this._ignoreBOM = !!e.ignoreBOM),
          Object.defineProperty(this, "encoding", { value: "utf-8" }),
          Object.defineProperty(this, "fatal", { value: this._fatal }),
          Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
      }
      function a(t, e) {
        if (!(this instanceof a)) return new a(t, e);
        if ((t = void 0 !== t ? String(t).toLowerCase() : s) !== s)
          throw Error("Encoding not supported. Only utf-8 is supported");
        (e = n(e)),
          (this._streaming = !1),
          (this._encoder = null),
          (this._options = { fatal: !!e.fatal }),
          Object.defineProperty(this, "encoding", { value: "utf-8" });
      }
      function h(t) {
        var e = t.fatal,
          n = 0,
          i = 0,
          s = 0,
          u = 128,
          a = 191;
        this.handler = function (t, h) {
          if (-1 === h && 0 !== s) return (s = 0), o(e);
          if (-1 === h) return -1;
          if (0 === s) {
            if (r(h, 0, 127)) return h;
            if (r(h, 194, 223)) (s = 1), (n = h - 192);
            else if (r(h, 224, 239))
              224 === h && (u = 160),
                237 === h && (a = 159),
                (s = 2),
                (n = h - 224);
            else {
              if (!r(h, 240, 244)) return o(e);
              240 === h && (u = 144),
                244 === h && (a = 143),
                (s = 3),
                (n = h - 240);
            }
            return (n <<= 6 * s), null;
          }
          if (!r(h, u, a))
            return (n = s = i = 0), (u = 128), (a = 191), t.prepend(h), o(e);
          if (
            ((u = 128),
            (a = 191),
            (i += 1),
            (n += (h - 128) << (6 * (s - i))),
            i !== s)
          )
            return null;
          var l = n;
          return (n = s = i = 0), l;
        };
      }
      function l(t) {
        t.fatal,
          (this.handler = function (t, e) {
            if (-1 === e) return -1;
            if (r(e, 0, 127)) return e;
            r(e, 128, 2047)
              ? ((n = 1), (i = 192))
              : r(e, 2048, 65535)
              ? ((n = 2), (i = 224))
              : r(e, 65536, 1114111) && ((n = 3), (i = 240));
            for (var n, i, o = [(e >> (6 * n)) + i]; n > 0; ) {
              var s = e >> (6 * (n - 1));
              o.push(128 | (63 & s)), (n -= 1);
            }
            return o;
          });
      }
      (u.prototype = {
        decode: function (t, e) {
          (r =
            "object" == typeof t && t instanceof ArrayBuffer
              ? new Uint8Array(t)
              : "object" == typeof t &&
                "buffer" in t &&
                t.buffer instanceof ArrayBuffer
              ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
              : new Uint8Array(0)),
            (e = n(e)),
            this._streaming ||
              ((this._decoder = new h({ fatal: this._fatal })),
              (this._BOMseen = !1)),
            (this._streaming = !!e.stream);
          for (
            var r, o, s = new i(r), u = [];
            !s.endOfStream() && -1 !== (o = this._decoder.handler(s, s.read()));

          )
            null !== o && (Array.isArray(o) ? u.push.apply(u, o) : u.push(o));
          if (!this._streaming) {
            do {
              if (-1 === (o = this._decoder.handler(s, s.read()))) break;
              if (null === o) continue;
              Array.isArray(o) ? u.push.apply(u, o) : u.push(o);
            } while (!s.endOfStream());
            this._decoder = null;
          }
          return (
            !u.length ||
              -1 === ["utf-8"].indexOf(this.encoding) ||
              this._ignoreBOM ||
              this._BOMseen ||
              (65279 === u[0]
                ? ((this._BOMseen = !0), u.shift())
                : (this._BOMseen = !0)),
            (function (t) {
              for (var e = "", r = 0; r < t.length; ++r) {
                var n = t[r];
                n <= 65535
                  ? (e += String.fromCharCode(n))
                  : ((n -= 65536),
                    (e += String.fromCharCode(
                      (n >> 10) + 55296,
                      (1023 & n) + 56320
                    )));
              }
              return e;
            })(u)
          );
        },
      }),
        (a.prototype = {
          encode: function (t, e) {
            (t = t ? String(t) : ""),
              (e = n(e)),
              this._streaming || (this._encoder = new l(this._options)),
              (this._streaming = !!e.stream);
            for (
              var r,
                o = [],
                s = new i(
                  (function (t) {
                    for (
                      var e = String(t), r = e.length, n = 0, i = [];
                      n < r;

                    ) {
                      var o = e.charCodeAt(n);
                      if (o < 55296 || o > 57343) i.push(o);
                      else if (56320 <= o && o <= 57343) i.push(65533);
                      else if (55296 <= o && o <= 56319) {
                        if (n === r - 1) i.push(65533);
                        else {
                          var s = t.charCodeAt(n + 1);
                          if (56320 <= s && s <= 57343) {
                            var u = 1023 & o,
                              a = 1023 & s;
                            i.push(65536 + (u << 10) + a), (n += 1);
                          } else i.push(65533);
                        }
                      }
                      n += 1;
                    }
                    return i;
                  })(t)
                );
              !s.endOfStream() &&
              -1 !== (r = this._encoder.handler(s, s.read()));

            )
              Array.isArray(r) ? o.push.apply(o, r) : o.push(r);
            if (!this._streaming) {
              for (; -1 !== (r = this._encoder.handler(s, s.read())); )
                Array.isArray(r) ? o.push.apply(o, r) : o.push(r);
              this._encoder = null;
            }
            return new Uint8Array(o);
          },
        }),
        (e.TextEncoder = a),
        (e.TextDecoder = u);
    },
    9918: function (t, e, r) {
      "use strict";
      r.d(e, {
        v4: function () {
          return h;
        },
      });
      for (
        var n,
          i = new Uint8Array(16),
          o =
            /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
          s = [],
          u = 0;
        u < 256;
        ++u
      )
        s.push((u + 256).toString(16).substr(1));
      var a = function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            r = (
              s[t[e + 0]] +
              s[t[e + 1]] +
              s[t[e + 2]] +
              s[t[e + 3]] +
              "-" +
              s[t[e + 4]] +
              s[t[e + 5]] +
              "-" +
              s[t[e + 6]] +
              s[t[e + 7]] +
              "-" +
              s[t[e + 8]] +
              s[t[e + 9]] +
              "-" +
              s[t[e + 10]] +
              s[t[e + 11]] +
              s[t[e + 12]] +
              s[t[e + 13]] +
              s[t[e + 14]] +
              s[t[e + 15]]
            ).toLowerCase();
          if (!("string" == typeof r && o.test(r)))
            throw TypeError("Stringified UUID is invalid");
          return r;
        },
        h = function (t, e, r) {
          var o =
            (t = t || {}).random ||
            (
              t.rng ||
              function () {
                if (
                  !n &&
                  !(n =
                    ("undefined" != typeof crypto &&
                      crypto.getRandomValues &&
                      crypto.getRandomValues.bind(crypto)) ||
                    ("undefined" != typeof msCrypto &&
                      "function" == typeof msCrypto.getRandomValues &&
                      msCrypto.getRandomValues.bind(msCrypto)))
                )
                  throw Error(
                    "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
                  );
                return n(i);
              }
            )();
          if (((o[6] = (15 & o[6]) | 64), (o[8] = (63 & o[8]) | 128), e)) {
            r = r || 0;
            for (var s = 0; s < 16; ++s) e[r + s] = o[s];
            return e;
          }
          return a(o);
        };
    },
    6406: function (t, e, r) {
      "use strict";
      r.d(e, {
        D1: function () {
          return l;
        },
        Kd: function () {
          return f;
        },
        Mx: function () {
          return h;
        },
      });
      var n = r(8110),
        i = r(3611);
      let o = BigInt(0),
        s = BigInt(1),
        u = new WeakMap(),
        a = new WeakMap();
      function h(t, e) {
        let r = (t, e) => {
            let r = e.negate();
            return t ? r : e;
          },
          n = (t) => {
            if (!Number.isSafeInteger(t) || t <= 0 || t > e)
              throw Error(`Wrong window size=${t}, should be [1..${e}]`);
          },
          i = (t) => (
            n(t), { windows: Math.ceil(e / t) + 1, windowSize: 2 ** (t - 1) }
          );
        return {
          constTimeNegate: r,
          unsafeLadder(e, r) {
            let n = t.ZERO,
              i = e;
            for (; r > o; )
              r & s && (n = n.add(i)), (i = i.double()), (r >>= s);
            return n;
          },
          precomputeWindow(t, e) {
            let { windows: r, windowSize: n } = i(e),
              o = [],
              s = t,
              u = s;
            for (let t = 0; t < r; t++) {
              (u = s), o.push(u);
              for (let t = 1; t < n; t++) (u = u.add(s)), o.push(u);
              s = u.double();
            }
            return o;
          },
          wNAF(e, n, o) {
            let { windows: u, windowSize: a } = i(e),
              h = t.ZERO,
              l = t.BASE,
              f = BigInt(2 ** e - 1),
              c = 2 ** e,
              d = BigInt(e);
            for (let t = 0; t < u; t++) {
              let e = t * a,
                i = Number(o & f);
              (o >>= d), i > a && ((i -= c), (o += s));
              let u = e + Math.abs(i) - 1,
                p = t % 2 != 0,
                g = i < 0;
              0 === i ? (l = l.add(r(p, n[e]))) : (h = h.add(r(g, n[u])));
            }
            return { p: h, f: l };
          },
          wNAFCached(t, e, r) {
            let n = a.get(t) || 1,
              i = u.get(t);
            return (
              i ||
                ((i = this.precomputeWindow(t, n)), 1 !== n && u.set(t, r(i))),
              this.wNAF(n, i, e)
            );
          },
          setWindowSize(t, e) {
            n(e), a.set(t, e), u.delete(t);
          },
        };
      }
      function l(t, e, r, n) {
        if (!Array.isArray(r) || !Array.isArray(n) || n.length !== r.length)
          throw Error("arrays of points and scalars must have equal length");
        n.forEach((t, r) => {
          if (!e.isValid(t)) throw Error(`wrong scalar at index ${r}`);
        }),
          r.forEach((e, r) => {
            if (!(e instanceof t)) throw Error(`wrong point at index ${r}`);
          });
        let o = (0, i.Dd)(BigInt(r.length)),
          s = o > 12 ? o - 3 : o > 4 ? o - 2 : o ? 2 : 1,
          u = (1 << s) - 1,
          a = Array(u + 1).fill(t.ZERO),
          h = Math.floor((e.BITS - 1) / s) * s,
          l = t.ZERO;
        for (let e = h; e >= 0; e -= s) {
          a.fill(t.ZERO);
          for (let t = 0; t < n.length; t++) {
            let i = Number((n[t] >> BigInt(e)) & BigInt(u));
            a[i] = a[i].add(r[t]);
          }
          let i = t.ZERO;
          for (let e = a.length - 1, r = t.ZERO; e > 0; e--)
            (r = r.add(a[e])), (i = i.add(r));
          if (((l = l.add(i)), 0 !== e))
            for (let t = 0; t < s; t++) l = l.double();
        }
        return l;
      }
      function f(t) {
        return (
          (0, n.OP)(t.Fp),
          (0, i.FF)(
            t,
            { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
            { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }
          ),
          Object.freeze({
            ...(0, n.kK)(t.n, t.nBitLength),
            ...t,
            p: t.Fp.ORDER,
          })
        );
      }
    },
    8110: function (t, e, r) {
      "use strict";
      r.d(e, {
        OP: function () {
          return m;
        },
        PS: function () {
          return b;
        },
        Tu: function () {
          return p;
        },
        U_: function () {
          return d;
        },
        Us: function () {
          return E;
        },
        gN: function () {
          return w;
        },
        kK: function () {
          return y;
        },
        oA: function () {
          return c;
        },
        wQ: function () {
          return f;
        },
      });
      var n = r(3611);
      let i = BigInt(0),
        o = BigInt(1),
        s = BigInt(2),
        u = BigInt(3),
        a = BigInt(4),
        h = BigInt(5),
        l = BigInt(8);
      function f(t, e) {
        let r = t % e;
        return r >= i ? r : e + r;
      }
      function c(t, e, r) {
        let n = t;
        for (; e-- > i; ) (n *= n), (n %= r);
        return n;
      }
      function d(t, e) {
        if (t === i || e <= i)
          throw Error(
            `invert: expected positive integers, got n=${t} mod=${e}`
          );
        let r = f(t, e),
          n = e,
          s = i,
          u = o,
          a = o,
          h = i;
        for (; r !== i; ) {
          let t = n / r,
            e = n % r,
            i = s - a * t,
            o = u - h * t;
          (n = r), (r = e), (s = a), (u = h), (a = i), (h = o);
        }
        if (n !== o) throw Error("invert: does not exist");
        return f(s, e);
      }
      BigInt(9), BigInt(16);
      let p = (t, e) => (f(t, e) & o) === o,
        g = [
          "create",
          "isValid",
          "is0",
          "neg",
          "inv",
          "sqrt",
          "sqr",
          "eql",
          "add",
          "sub",
          "mul",
          "pow",
          "div",
          "addN",
          "subN",
          "mulN",
          "sqrN",
        ];
      function m(t) {
        let e = g.reduce((t, e) => ((t[e] = "function"), t), {
          ORDER: "bigint",
          MASK: "bigint",
          BYTES: "isSafeInteger",
          BITS: "isSafeInteger",
        });
        return (0, n.FF)(t, e);
      }
      function y(t, e) {
        let r = void 0 !== e ? e : t.toString(2).length;
        return { nBitLength: r, nByteLength: Math.ceil(r / 8) };
      }
      function w(t, e, r = !1, c = {}) {
        if (t <= i) throw Error(`Expected Field ORDER > 0, got ${t}`);
        let { nBitLength: p, nByteLength: g } = y(t, e);
        if (g > 2048)
          throw Error("Field lengths over 2048 bytes are not supported");
        let m = (function (t) {
            if (t % a === u) {
              let e = (t + o) / a;
              return function (t, r) {
                let n = t.pow(r, e);
                if (!t.eql(t.sqr(n), r)) throw Error("Cannot find square root");
                return n;
              };
            }
            if (t % l === h) {
              let e = (t - h) / l;
              return function (t, r) {
                let n = t.mul(r, s),
                  i = t.pow(n, e),
                  o = t.mul(r, i),
                  u = t.mul(t.mul(o, s), i),
                  a = t.mul(o, t.sub(u, t.ONE));
                if (!t.eql(t.sqr(a), r)) throw Error("Cannot find square root");
                return a;
              };
            }
            return (function (t) {
              let e, r, n;
              let u = (t - o) / s;
              for (e = t - o, r = 0; e % s === i; e /= s, r++);
              for (
                n = s;
                n < t &&
                (function (t, e, r) {
                  if (r <= i || e < i) throw Error("Expected power/modulo > 0");
                  if (r === o) return i;
                  let n = o;
                  for (; e > i; )
                    e & o && (n = (n * t) % r), (t = (t * t) % r), (e >>= o);
                  return n;
                })(n, u, t) !==
                  t - o;
                n++
              );
              if (1 === r) {
                let e = (t + o) / a;
                return function (t, r) {
                  let n = t.pow(r, e);
                  if (!t.eql(t.sqr(n), r))
                    throw Error("Cannot find square root");
                  return n;
                };
              }
              let h = (e + o) / s;
              return function (t, i) {
                if (t.pow(i, u) === t.neg(t.ONE))
                  throw Error("Cannot find square root");
                let s = r,
                  a = t.pow(t.mul(t.ONE, n), e),
                  l = t.pow(i, h),
                  f = t.pow(i, e);
                for (; !t.eql(f, t.ONE); ) {
                  if (t.eql(f, t.ZERO)) return t.ZERO;
                  let e = 1;
                  for (let r = t.sqr(f); e < s && !t.eql(r, t.ONE); e++)
                    r = t.sqr(r);
                  let r = t.pow(a, o << BigInt(s - e - 1));
                  (a = t.sqr(r)), (l = t.mul(l, r)), (f = t.mul(f, a)), (s = e);
                }
                return l;
              };
            })(t);
          })(t),
          w = Object.freeze({
            ORDER: t,
            BITS: p,
            BYTES: g,
            MASK: (0, n.dQ)(p),
            ZERO: i,
            ONE: o,
            create: (e) => f(e, t),
            isValid: (e) => {
              if ("bigint" != typeof e)
                throw Error(
                  `Invalid field element: expected bigint, got ${typeof e}`
                );
              return i <= e && e < t;
            },
            is0: (t) => t === i,
            isOdd: (t) => (t & o) === o,
            neg: (e) => f(-e, t),
            eql: (t, e) => t === e,
            sqr: (e) => f(e * e, t),
            add: (e, r) => f(e + r, t),
            sub: (e, r) => f(e - r, t),
            mul: (e, r) => f(e * r, t),
            pow: (t, e) =>
              (function (t, e, r) {
                if (r < i) throw Error("Expected power > 0");
                if (r === i) return t.ONE;
                if (r === o) return e;
                let n = t.ONE,
                  s = e;
                for (; r > i; )
                  r & o && (n = t.mul(n, s)), (s = t.sqr(s)), (r >>= o);
                return n;
              })(w, t, e),
            div: (e, r) => f(e * d(r, t), t),
            sqrN: (t) => t * t,
            addN: (t, e) => t + e,
            subN: (t, e) => t - e,
            mulN: (t, e) => t * e,
            inv: (e) => d(e, t),
            sqrt: c.sqrt || ((t) => m(w, t)),
            invertBatch: (t) =>
              (function (t, e) {
                let r = Array(e.length),
                  n = e.reduce(
                    (e, n, i) => (t.is0(n) ? e : ((r[i] = e), t.mul(e, n))),
                    t.ONE
                  ),
                  i = t.inv(n);
                return (
                  e.reduceRight(
                    (e, n, i) =>
                      t.is0(n) ? e : ((r[i] = t.mul(e, r[i])), t.mul(e, n)),
                    i
                  ),
                  r
                );
              })(w, t),
            cmov: (t, e, r) => (r ? e : t),
            toBytes: (t) => (r ? (0, n.S5)(t, g) : (0, n.tL)(t, g)),
            fromBytes: (t) => {
              if (t.length !== g)
                throw Error(`Fp.fromBytes: expected ${g}, got ${t.length}`);
              return r ? (0, n.ty)(t) : (0, n.bytesToNumberBE)(t);
            },
          });
        return Object.freeze(w);
      }
      function v(t) {
        if ("bigint" != typeof t) throw Error("field order must be bigint");
        return Math.ceil(t.toString(2).length / 8);
      }
      function b(t) {
        let e = v(t);
        return e + Math.ceil(e / 2);
      }
      function E(t, e, r = !1) {
        let i = t.length,
          s = v(e),
          u = b(e);
        if (i < 16 || i < u || i > 1024)
          throw Error(`expected ${u}-1024 bytes of input, got ${i}`);
        let a = f(r ? (0, n.bytesToNumberBE)(t) : (0, n.ty)(t), e - o) + o;
        return r ? (0, n.S5)(a, s) : (0, n.tL)(a, s);
      }
    },
    3611: function (t, e, r) {
      "use strict";
      r.d(e, {
        Dd: function () {
          return B;
        },
        FF: function () {
          return R;
        },
        Fy: function () {
          return _;
        },
        H9: function () {
          return k;
        },
        S5: function () {
          return v;
        },
        Z2: function () {
          return x;
        },
        _t: function () {
          return s;
        },
        bytesToNumberBE: function () {
          return m;
        },
        ci: function () {
          return l;
        },
        dQ: function () {
          return A;
        },
        eV: function () {
          return E;
        },
        gk: function () {
          return u;
        },
        hexToBytes: function () {
          return g;
        },
        n$: function () {
          return O;
        },
        ql: function () {
          return b;
        },
        tL: function () {
          return w;
        },
        ty: function () {
          return y;
        },
        uw: function () {
          return a;
        },
        uz: function () {
          return f;
        },
      });
      let n = BigInt(0),
        i = BigInt(1),
        o = BigInt(2);
      function s(t) {
        return (
          t instanceof Uint8Array ||
          (null != t &&
            "object" == typeof t &&
            "Uint8Array" === t.constructor.name)
        );
      }
      function u(t) {
        if (!s(t)) throw Error("Uint8Array expected");
      }
      function a(t, e) {
        if ("boolean" != typeof e)
          throw Error(`${t} must be valid boolean, got "${e}".`);
      }
      let h = Array.from({ length: 256 }, (t, e) =>
        e.toString(16).padStart(2, "0")
      );
      function l(t) {
        u(t);
        let e = "";
        for (let r = 0; r < t.length; r++) e += h[t[r]];
        return e;
      }
      function f(t) {
        let e = t.toString(16);
        return 1 & e.length ? `0${e}` : e;
      }
      function c(t) {
        if ("string" != typeof t)
          throw Error("hex string expected, got " + typeof t);
        return BigInt("" === t ? "0" : `0x${t}`);
      }
      let d = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
      function p(t) {
        return t >= d._0 && t <= d._9
          ? t - d._0
          : t >= d._A && t <= d._F
          ? t - (d._A - 10)
          : t >= d._a && t <= d._f
          ? t - (d._a - 10)
          : void 0;
      }
      function g(t) {
        if ("string" != typeof t)
          throw Error("hex string expected, got " + typeof t);
        let e = t.length,
          r = e / 2;
        if (e % 2)
          throw Error(
            "padded hex string expected, got unpadded hex of length " + e
          );
        let n = new Uint8Array(r);
        for (let e = 0, i = 0; e < r; e++, i += 2) {
          let r = p(t.charCodeAt(i)),
            o = p(t.charCodeAt(i + 1));
          if (void 0 === r || void 0 === o)
            throw Error(
              'hex string expected, got non-hex character "' +
                (t[i] + t[i + 1]) +
                '" at index ' +
                i
            );
          n[e] = 16 * r + o;
        }
        return n;
      }
      function m(t) {
        return c(l(t));
      }
      function y(t) {
        return u(t), c(l(Uint8Array.from(t).reverse()));
      }
      function w(t, e) {
        return g(t.toString(16).padStart(2 * e, "0"));
      }
      function v(t, e) {
        return w(t, e).reverse();
      }
      function b(t, e, r) {
        let n;
        if ("string" == typeof e)
          try {
            n = g(e);
          } catch (r) {
            throw Error(
              `${t} must be valid hex string, got "${e}". Cause: ${r}`
            );
          }
        else if (s(e)) n = Uint8Array.from(e);
        else throw Error(`${t} must be hex string or Uint8Array`);
        let i = n.length;
        if ("number" == typeof r && i !== r)
          throw Error(`${t} expected ${r} bytes, got ${i}`);
        return n;
      }
      function E(...t) {
        let e = 0;
        for (let r = 0; r < t.length; r++) {
          let n = t[r];
          u(n), (e += n.length);
        }
        let r = new Uint8Array(e);
        for (let e = 0, n = 0; e < t.length; e++) {
          let i = t[e];
          r.set(i, n), (n += i.length);
        }
        return r;
      }
      let M = (t) => "bigint" == typeof t && n <= t;
      function x(t, e, r) {
        return M(t) && M(e) && M(r) && e <= t && t < r;
      }
      function _(t, e, r, n) {
        if (!x(e, r, n))
          throw Error(
            `expected valid ${t}: ${r} <= n < ${n}, got ${typeof e} ${e}`
          );
      }
      function B(t) {
        let e;
        for (e = 0; t > n; t >>= i, e += 1);
        return e;
      }
      let A = (t) => (o << BigInt(t - 1)) - i,
        S = (t) => new Uint8Array(t),
        I = (t) => Uint8Array.from(t);
      function O(t, e, r) {
        if ("number" != typeof t || t < 2)
          throw Error("hashLen must be a number");
        if ("number" != typeof e || e < 2)
          throw Error("qByteLen must be a number");
        if ("function" != typeof r) throw Error("hmacFn must be a function");
        let n = S(t),
          i = S(t),
          o = 0,
          s = () => {
            n.fill(1), i.fill(0), (o = 0);
          },
          u = (...t) => r(i, n, ...t),
          a = (t = S()) => {
            (i = u(I([0]), t)),
              (n = u()),
              0 !== t.length && ((i = u(I([1]), t)), (n = u()));
          },
          h = () => {
            if (o++ >= 1e3) throw Error("drbg: tried 1000 values");
            let t = 0,
              r = [];
            for (; t < e; ) {
              let e = (n = u()).slice();
              r.push(e), (t += n.length);
            }
            return E(...r);
          };
        return (t, e) => {
          let r;
          for (s(), a(t); !(r = e(h())); ) a();
          return s(), r;
        };
      }
      let U = {
        bigint: (t) => "bigint" == typeof t,
        function: (t) => "function" == typeof t,
        boolean: (t) => "boolean" == typeof t,
        string: (t) => "string" == typeof t,
        stringOrUint8Array: (t) => "string" == typeof t || s(t),
        isSafeInteger: (t) => Number.isSafeInteger(t),
        array: (t) => Array.isArray(t),
        field: (t, e) => e.Fp.isValid(t),
        hash: (t) =>
          "function" == typeof t && Number.isSafeInteger(t.outputLen),
      };
      function R(t, e, r = {}) {
        let n = (e, r, n) => {
          let i = U[r];
          if ("function" != typeof i)
            throw Error(`Invalid validator "${r}", expected function`);
          let o = t[e];
          if ((!n || void 0 !== o) && !i(o, t))
            throw Error(
              `Invalid param ${String(e)}=${o} (${typeof o}), expected ${r}`
            );
        };
        for (let [t, r] of Object.entries(e)) n(t, r, !1);
        for (let [t, e] of Object.entries(r)) n(t, e, !0);
        return t;
      }
      function k(t) {
        let e = new WeakMap();
        return (r, ...n) => {
          let i = e.get(r);
          if (void 0 !== i) return i;
          let o = t(r, ...n);
          return e.set(r, o), o;
        };
      }
    },
    9864: function (t, e, r) {
      "use strict";
      r.d(e, {
        UN: function () {
          return O;
        },
      });
      var n = r(9027),
        i = r(171),
        o = r(2231);
      let [s, u] = i.ZP.split(
          [
            "0x428a2f98d728ae22",
            "0x7137449123ef65cd",
            "0xb5c0fbcfec4d3b2f",
            "0xe9b5dba58189dbbc",
            "0x3956c25bf348b538",
            "0x59f111f1b605d019",
            "0x923f82a4af194f9b",
            "0xab1c5ed5da6d8118",
            "0xd807aa98a3030242",
            "0x12835b0145706fbe",
            "0x243185be4ee4b28c",
            "0x550c7dc3d5ffb4e2",
            "0x72be5d74f27b896f",
            "0x80deb1fe3b1696b1",
            "0x9bdc06a725c71235",
            "0xc19bf174cf692694",
            "0xe49b69c19ef14ad2",
            "0xefbe4786384f25e3",
            "0x0fc19dc68b8cd5b5",
            "0x240ca1cc77ac9c65",
            "0x2de92c6f592b0275",
            "0x4a7484aa6ea6e483",
            "0x5cb0a9dcbd41fbd4",
            "0x76f988da831153b5",
            "0x983e5152ee66dfab",
            "0xa831c66d2db43210",
            "0xb00327c898fb213f",
            "0xbf597fc7beef0ee4",
            "0xc6e00bf33da88fc2",
            "0xd5a79147930aa725",
            "0x06ca6351e003826f",
            "0x142929670a0e6e70",
            "0x27b70a8546d22ffc",
            "0x2e1b21385c26c926",
            "0x4d2c6dfc5ac42aed",
            "0x53380d139d95b3df",
            "0x650a73548baf63de",
            "0x766a0abb3c77b2a8",
            "0x81c2c92e47edaee6",
            "0x92722c851482353b",
            "0xa2bfe8a14cf10364",
            "0xa81a664bbc423001",
            "0xc24b8b70d0f89791",
            "0xc76c51a30654be30",
            "0xd192e819d6ef5218",
            "0xd69906245565a910",
            "0xf40e35855771202a",
            "0x106aa07032bbd1b8",
            "0x19a4c116b8d2d0c8",
            "0x1e376c085141ab53",
            "0x2748774cdf8eeb99",
            "0x34b0bcb5e19b48a8",
            "0x391c0cb3c5c95a63",
            "0x4ed8aa4ae3418acb",
            "0x5b9cca4f7763e373",
            "0x682e6ff3d6b2b8a3",
            "0x748f82ee5defb2fc",
            "0x78a5636f43172f60",
            "0x84c87814a1f0ab72",
            "0x8cc702081a6439ec",
            "0x90befffa23631e28",
            "0xa4506cebde82bde9",
            "0xbef9a3f7b2c67915",
            "0xc67178f2e372532b",
            "0xca273eceea26619c",
            "0xd186b8c721c0c207",
            "0xeada7dd6cde0eb1e",
            "0xf57d4f7fee6ed178",
            "0x06f067aa72176fba",
            "0x0a637dc5a2c898a6",
            "0x113f9804bef90dae",
            "0x1b710b35131c471b",
            "0x28db77f523047d84",
            "0x32caab7b40c72493",
            "0x3c9ebe0a15c9bebc",
            "0x431d67c49c100d4c",
            "0x4cc5d4becb3e42b6",
            "0x597f299cfc657e2a",
            "0x5fcb6fab3ad6faec",
            "0x6c44198c4a475817",
          ].map((t) => BigInt(t))
        ),
        a = new Uint32Array(80),
        h = new Uint32Array(80);
      class l extends n.VR {
        constructor() {
          super(128, 64, 16, !1),
            (this.Ah = 1779033703),
            (this.Al = -205731576),
            (this.Bh = -1150833019),
            (this.Bl = -2067093701),
            (this.Ch = 1013904242),
            (this.Cl = -23791573),
            (this.Dh = -1521486534),
            (this.Dl = 1595750129),
            (this.Eh = 1359893119),
            (this.El = -1377402159),
            (this.Fh = -1694144372),
            (this.Fl = 725511199),
            (this.Gh = 528734635),
            (this.Gl = -79577749),
            (this.Hh = 1541459225),
            (this.Hl = 327033209);
        }
        get() {
          let {
            Ah: t,
            Al: e,
            Bh: r,
            Bl: n,
            Ch: i,
            Cl: o,
            Dh: s,
            Dl: u,
            Eh: a,
            El: h,
            Fh: l,
            Fl: f,
            Gh: c,
            Gl: d,
            Hh: p,
            Hl: g,
          } = this;
          return [t, e, r, n, i, o, s, u, a, h, l, f, c, d, p, g];
        }
        set(t, e, r, n, i, o, s, u, a, h, l, f, c, d, p, g) {
          (this.Ah = 0 | t),
            (this.Al = 0 | e),
            (this.Bh = 0 | r),
            (this.Bl = 0 | n),
            (this.Ch = 0 | i),
            (this.Cl = 0 | o),
            (this.Dh = 0 | s),
            (this.Dl = 0 | u),
            (this.Eh = 0 | a),
            (this.El = 0 | h),
            (this.Fh = 0 | l),
            (this.Fl = 0 | f),
            (this.Gh = 0 | c),
            (this.Gl = 0 | d),
            (this.Hh = 0 | p),
            (this.Hl = 0 | g);
        }
        process(t, e) {
          for (let r = 0; r < 16; r++, e += 4)
            (a[r] = t.getUint32(e)), (h[r] = t.getUint32((e += 4)));
          for (let t = 16; t < 80; t++) {
            let e = 0 | a[t - 15],
              r = 0 | h[t - 15],
              n =
                i.ZP.rotrSH(e, r, 1) ^
                i.ZP.rotrSH(e, r, 8) ^
                i.ZP.shrSH(e, r, 7),
              o =
                i.ZP.rotrSL(e, r, 1) ^
                i.ZP.rotrSL(e, r, 8) ^
                i.ZP.shrSL(e, r, 7),
              s = 0 | a[t - 2],
              u = 0 | h[t - 2],
              l =
                i.ZP.rotrSH(s, u, 19) ^
                i.ZP.rotrBH(s, u, 61) ^
                i.ZP.shrSH(s, u, 6),
              f =
                i.ZP.rotrSL(s, u, 19) ^
                i.ZP.rotrBL(s, u, 61) ^
                i.ZP.shrSL(s, u, 6),
              c = i.ZP.add4L(o, f, h[t - 7], h[t - 16]),
              d = i.ZP.add4H(c, n, l, a[t - 7], a[t - 16]);
            (a[t] = 0 | d), (h[t] = 0 | c);
          }
          let {
            Ah: r,
            Al: n,
            Bh: o,
            Bl: l,
            Ch: f,
            Cl: c,
            Dh: d,
            Dl: p,
            Eh: g,
            El: m,
            Fh: y,
            Fl: w,
            Gh: v,
            Gl: b,
            Hh: E,
            Hl: M,
          } = this;
          for (let t = 0; t < 80; t++) {
            let e =
                i.ZP.rotrSH(g, m, 14) ^
                i.ZP.rotrSH(g, m, 18) ^
                i.ZP.rotrBH(g, m, 41),
              x =
                i.ZP.rotrSL(g, m, 14) ^
                i.ZP.rotrSL(g, m, 18) ^
                i.ZP.rotrBL(g, m, 41),
              _ = (g & y) ^ (~g & v),
              B = (m & w) ^ (~m & b),
              A = i.ZP.add5L(M, x, B, u[t], h[t]),
              S = i.ZP.add5H(A, E, e, _, s[t], a[t]),
              I = 0 | A,
              O =
                i.ZP.rotrSH(r, n, 28) ^
                i.ZP.rotrBH(r, n, 34) ^
                i.ZP.rotrBH(r, n, 39),
              U =
                i.ZP.rotrSL(r, n, 28) ^
                i.ZP.rotrBL(r, n, 34) ^
                i.ZP.rotrBL(r, n, 39),
              R = (r & o) ^ (r & f) ^ (o & f),
              k = (n & l) ^ (n & c) ^ (l & c);
            (E = 0 | v),
              (M = 0 | b),
              (v = 0 | y),
              (b = 0 | w),
              (y = 0 | g),
              (w = 0 | m),
              ({ h: g, l: m } = i.ZP.add(0 | d, 0 | p, 0 | S, 0 | I)),
              (d = 0 | f),
              (p = 0 | c),
              (f = 0 | o),
              (c = 0 | l),
              (o = 0 | r),
              (l = 0 | n);
            let L = i.ZP.add3L(I, U, k);
            (r = i.ZP.add3H(L, S, O, R)), (n = 0 | L);
          }
          ({ h: r, l: n } = i.ZP.add(0 | this.Ah, 0 | this.Al, 0 | r, 0 | n)),
            ({ h: o, l: l } = i.ZP.add(0 | this.Bh, 0 | this.Bl, 0 | o, 0 | l)),
            ({ h: f, l: c } = i.ZP.add(0 | this.Ch, 0 | this.Cl, 0 | f, 0 | c)),
            ({ h: d, l: p } = i.ZP.add(0 | this.Dh, 0 | this.Dl, 0 | d, 0 | p)),
            ({ h: g, l: m } = i.ZP.add(0 | this.Eh, 0 | this.El, 0 | g, 0 | m)),
            ({ h: y, l: w } = i.ZP.add(0 | this.Fh, 0 | this.Fl, 0 | y, 0 | w)),
            ({ h: v, l: b } = i.ZP.add(0 | this.Gh, 0 | this.Gl, 0 | v, 0 | b)),
            ({ h: E, l: M } = i.ZP.add(0 | this.Hh, 0 | this.Hl, 0 | E, 0 | M)),
            this.set(r, n, o, l, f, c, d, p, g, m, y, w, v, b, E, M);
        }
        roundClean() {
          a.fill(0), h.fill(0);
        }
        destroy() {
          this.buffer.fill(0),
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      }
      let f = (0, o.hE)(() => new l());
      var c = r(6406),
        d = r(8110),
        p = r(3611);
      let g = BigInt(0),
        m = BigInt(1),
        y = BigInt(2),
        w = BigInt(8),
        v = { zip215: !0 },
        b = BigInt(
          "57896044618658097711785492504343953926634992332820282019728792003956564819949"
        ),
        E = BigInt(
          "19681161376707505956807079304988542015446066515923890162744021073123829784752"
        ),
        M = BigInt(0),
        x = BigInt(1),
        _ = BigInt(2);
      BigInt(3);
      let B = BigInt(5),
        A = BigInt(8);
      function S(t, e) {
        let r = (0, d.wQ)(e * e * e, b),
          n = (function (t) {
            let e = BigInt(10),
              r = BigInt(20),
              n = BigInt(40),
              i = BigInt(80),
              o = (((t * t) % b) * t) % b,
              s = ((0, d.oA)(o, _, b) * o) % b,
              u = ((0, d.oA)(s, x, b) * t) % b,
              a = ((0, d.oA)(u, B, b) * u) % b,
              h = ((0, d.oA)(a, e, b) * a) % b,
              l = ((0, d.oA)(h, r, b) * h) % b,
              f = ((0, d.oA)(l, n, b) * l) % b,
              c = ((0, d.oA)(f, i, b) * f) % b,
              p = ((0, d.oA)(c, i, b) * f) % b,
              g = ((0, d.oA)(p, e, b) * a) % b;
            return { pow_p_5_8: ((0, d.oA)(g, _, b) * t) % b, b2: o };
          })(t * (0, d.wQ)(r * r * e, b)).pow_p_5_8,
          i = (0, d.wQ)(t * r * n, b),
          o = (0, d.wQ)(e * i * i, b),
          s = i,
          u = (0, d.wQ)(i * E, b),
          a = o === t,
          h = o === (0, d.wQ)(-t, b),
          l = o === (0, d.wQ)(-t * E, b);
        return (
          a && (i = s),
          (h || l) && (i = u),
          (0, d.Tu)(i, b) && (i = (0, d.wQ)(-i, b)),
          { isValid: a || h, value: i }
        );
      }
      let I = (0, d.gN)(b, void 0, !0),
        O = (function (t) {
          let e = (function (t) {
              let e = (0, c.Kd)(t);
              return (
                p.FF(
                  t,
                  {
                    hash: "function",
                    a: "bigint",
                    d: "bigint",
                    randomBytes: "function",
                  },
                  {
                    adjustScalarBytes: "function",
                    domain: "function",
                    uvRatio: "function",
                    mapToCurve: "function",
                  }
                ),
                Object.freeze({ ...e })
              );
            })(t),
            {
              Fp: r,
              n: n,
              prehash: i,
              hash: o,
              randomBytes: s,
              nByteLength: u,
              h: a,
            } = e,
            h = y << (BigInt(8 * u) - m),
            l = r.create,
            f = (0, d.gN)(e.n, e.nBitLength),
            b =
              e.uvRatio ||
              ((t, e) => {
                try {
                  return { isValid: !0, value: r.sqrt(t * r.inv(e)) };
                } catch (t) {
                  return { isValid: !1, value: g };
                }
              }),
            E = e.adjustScalarBytes || ((t) => t),
            M =
              e.domain ||
              ((t, e, r) => {
                if (((0, p.uw)("phflag", r), e.length || r))
                  throw Error("Contexts/pre-hash are not supported");
                return t;
              });
          function x(t, e) {
            p.Fy("coordinate " + t, e, g, h);
          }
          function _(t) {
            if (!(t instanceof S)) throw Error("ExtendedPoint expected");
          }
          let B = (0, p.H9)((t, e) => {
              let { ex: n, ey: i, ez: o } = t,
                s = t.is0();
              null == e && (e = s ? w : r.inv(o));
              let u = l(n * e),
                a = l(i * e),
                h = l(o * e);
              if (s) return { x: g, y: m };
              if (h !== m) throw Error("invZ was invalid");
              return { x: u, y: a };
            }),
            A = (0, p.H9)((t) => {
              let { a: r, d: n } = e;
              if (t.is0()) throw Error("bad point: ZERO");
              let { ex: i, ey: o, ez: s, et: u } = t,
                a = l(i * i),
                h = l(o * o),
                f = l(s * s),
                c = l(f * f),
                d = l(a * r);
              if (l(f * l(d + h)) !== l(c + l(n * l(a * h))))
                throw Error("bad point: equation left != right (1)");
              if (l(i * o) !== l(s * u))
                throw Error("bad point: equation left != right (2)");
              return !0;
            });
          class S {
            constructor(t, e, r, n) {
              (this.ex = t),
                (this.ey = e),
                (this.ez = r),
                (this.et = n),
                x("x", t),
                x("y", e),
                x("z", r),
                x("t", n),
                Object.freeze(this);
            }
            get x() {
              return this.toAffine().x;
            }
            get y() {
              return this.toAffine().y;
            }
            static fromAffine(t) {
              if (t instanceof S) throw Error("extended point not allowed");
              let { x: e, y: r } = t || {};
              return x("x", e), x("y", r), new S(e, r, m, l(e * r));
            }
            static normalizeZ(t) {
              let e = r.invertBatch(t.map((t) => t.ez));
              return t.map((t, r) => t.toAffine(e[r])).map(S.fromAffine);
            }
            static msm(t, e) {
              return (0, c.D1)(S, f, t, e);
            }
            _setWindowSize(t) {
              U.setWindowSize(this, t);
            }
            assertValidity() {
              A(this);
            }
            equals(t) {
              _(t);
              let { ex: e, ey: r, ez: n } = this,
                { ex: i, ey: o, ez: s } = t,
                u = l(e * s),
                a = l(i * n),
                h = l(r * s),
                f = l(o * n);
              return u === a && h === f;
            }
            is0() {
              return this.equals(S.ZERO);
            }
            negate() {
              return new S(l(-this.ex), this.ey, this.ez, l(-this.et));
            }
            double() {
              let { a: t } = e,
                { ex: r, ey: n, ez: i } = this,
                o = l(r * r),
                s = l(n * n),
                u = l(y * l(i * i)),
                a = l(t * o),
                h = r + n,
                f = l(l(h * h) - o - s),
                c = a + s,
                d = c - u,
                p = a - s,
                g = l(f * d),
                m = l(c * p),
                w = l(f * p);
              return new S(g, m, l(d * c), w);
            }
            add(t) {
              _(t);
              let { a: r, d: n } = e,
                { ex: i, ey: o, ez: s, et: u } = this,
                { ex: a, ey: h, ez: f, et: c } = t;
              if (r === BigInt(-1)) {
                let t = l((o - i) * (h + a)),
                  e = l((o + i) * (h - a)),
                  r = l(e - t);
                if (r === g) return this.double();
                let n = l(s * y * c),
                  d = l(u * y * f),
                  p = d + n,
                  m = e + t,
                  w = d - n,
                  v = l(p * r),
                  b = l(m * w),
                  E = l(p * w);
                return new S(v, b, l(r * m), E);
              }
              let d = l(i * a),
                p = l(o * h),
                m = l(u * n * c),
                w = l(s * f),
                v = l((i + o) * (a + h) - d - p),
                b = w - m,
                E = w + m,
                M = l(p - r * d),
                x = l(v * b),
                B = l(E * M),
                A = l(v * M);
              return new S(x, B, l(b * E), A);
            }
            subtract(t) {
              return this.add(t.negate());
            }
            wNAF(t) {
              return U.wNAFCached(this, t, S.normalizeZ);
            }
            multiply(t) {
              p.Fy("scalar", t, m, n);
              let { p: e, f: r } = this.wNAF(t);
              return S.normalizeZ([e, r])[0];
            }
            multiplyUnsafe(t) {
              return (p.Fy("scalar", t, g, n), t === g)
                ? O
                : this.equals(O) || t === m
                ? this
                : this.equals(I)
                ? this.wNAF(t).p
                : U.unsafeLadder(this, t);
            }
            isSmallOrder() {
              return this.multiplyUnsafe(a).is0();
            }
            isTorsionFree() {
              return U.unsafeLadder(this, n).is0();
            }
            toAffine(t) {
              return B(this, t);
            }
            clearCofactor() {
              let { h: t } = e;
              return t === m ? this : this.multiplyUnsafe(t);
            }
            static fromHex(t, n = !1) {
              let { d: i, a: o } = e,
                s = r.BYTES;
              (t = (0, p.ql)("pointHex", t, s)), (0, p.uw)("zip215", n);
              let u = t.slice(),
                a = t[s - 1];
              u[s - 1] = -129 & a;
              let f = p.ty(u),
                c = n ? h : r.ORDER;
              p.Fy("pointHex.y", f, g, c);
              let d = l(f * f),
                { isValid: y, value: w } = b(l(d - m), l(i * d - o));
              if (!y) throw Error("Point.fromHex: invalid y coordinate");
              let v = (w & m) === m,
                E = (128 & a) != 0;
              if (!n && w === g && E)
                throw Error("Point.fromHex: x=0 and x_0=1");
              return E !== v && (w = l(-w)), S.fromAffine({ x: w, y: f });
            }
            static fromPrivateKey(t) {
              return k(t).point;
            }
            toRawBytes() {
              let { x: t, y: e } = this.toAffine(),
                n = p.S5(e, r.BYTES);
              return (n[n.length - 1] |= t & m ? 128 : 0), n;
            }
            toHex() {
              return p.ci(this.toRawBytes());
            }
          }
          (S.BASE = new S(e.Gx, e.Gy, m, l(e.Gx * e.Gy))),
            (S.ZERO = new S(g, m, m, g));
          let { BASE: I, ZERO: O } = S,
            U = (0, c.Mx)(S, 8 * u);
          function R(t) {
            var e;
            return (e = p.ty(t)), (0, d.wQ)(e, n);
          }
          function k(t) {
            t = (0, p.ql)("private key", t, u);
            let e = (0, p.ql)("hashed private key", o(t), 2 * u),
              r = E(e.slice(0, u)),
              n = e.slice(u, 2 * u),
              i = R(r),
              s = I.multiply(i),
              a = s.toRawBytes();
            return { head: r, prefix: n, scalar: i, point: s, pointBytes: a };
          }
          function L(t = new Uint8Array(), ...e) {
            return R(o(M(p.eV(...e), (0, p.ql)("context", t), !!i)));
          }
          return (
            I._setWindowSize(8),
            {
              CURVE: e,
              getPublicKey: function (t) {
                return k(t).pointBytes;
              },
              sign: function (t, e, o = {}) {
                var s;
                (t = (0, p.ql)("message", t)), i && (t = i(t));
                let { prefix: a, scalar: h, pointBytes: l } = k(e),
                  f = L(o.context, a, t),
                  c = I.multiply(f).toRawBytes(),
                  m = ((s = f + L(o.context, c, l, t) * h), (0, d.wQ)(s, n));
                p.Fy("signature.s", m, g, n);
                let y = p.eV(c, p.S5(m, r.BYTES));
                return (0, p.ql)("result", y, 2 * u);
              },
              verify: function (t, e, n, o = v) {
                let s, u, a;
                let { context: h, zip215: l } = o,
                  f = r.BYTES;
                (t = (0, p.ql)("signature", t, 2 * f)),
                  (e = (0, p.ql)("message", e)),
                  void 0 !== l && (0, p.uw)("zip215", l),
                  i && (e = i(e));
                let c = p.ty(t.slice(f, 2 * f));
                try {
                  (s = S.fromHex(n, l)),
                    (u = S.fromHex(t.slice(0, f), l)),
                    (a = I.multiplyUnsafe(c));
                } catch (t) {
                  return !1;
                }
                if (!l && s.isSmallOrder()) return !1;
                let d = L(h, u.toRawBytes(), s.toRawBytes(), e);
                return u
                  .add(s.multiplyUnsafe(d))
                  .subtract(a)
                  .clearCofactor()
                  .equals(S.ZERO);
              },
              ExtendedPoint: S,
              utils: {
                getExtendedPublicKey: k,
                randomPrivateKey: () => s(r.BYTES),
                precompute: (t = 8, e = S.BASE) => (
                  e._setWindowSize(t), e.multiply(BigInt(3)), e
                ),
              },
            }
          );
        })({
          a: BigInt(-1),
          d: BigInt(
            "37095705934669439343138083508754565189542113879843219016388785533085940283555"
          ),
          Fp: I,
          n: BigInt(
            "7237005577332262213973186563042994240857116359379907606001950938285454250989"
          ),
          h: A,
          Gx: BigInt(
            "15112221349535400772501151409588531511454012693041857206046113283949847762202"
          ),
          Gy: BigInt(
            "46316835694926478169428394003475163141307993866256225615783033603165251855960"
          ),
          hash: f,
          randomBytes: o.O6,
          adjustScalarBytes: function (t) {
            return (t[0] &= 248), (t[31] &= 127), (t[31] |= 64), t;
          },
          uvRatio: S,
        });
      function U(t) {
        if (!(t instanceof P)) throw Error("RistrettoPoint expected");
      }
      let R = (t) => S(x, t),
        k = (t) => O.CURVE.Fp.create(null & bytesToNumberLE(t));
      function L(t) {
        let { d: e } = O.CURVE,
          r = O.CURVE.Fp.ORDER,
          n = O.CURVE.Fp.create,
          i = n(null * t * t),
          o = n((i + x) * null),
          s = BigInt(-1),
          u = n((s - e * i) * n(i + e)),
          { isValid: a, value: h } = S(o, u),
          l = n(h * t);
        isNegativeLE(l, r) || (l = n(-l)), a || (h = l), a || (s = i);
        let f = n(s * (i - x) * null - u),
          c = h * h,
          d = n((h + h) * u),
          p = n(null * f),
          g = n(x - c),
          m = n(x + c);
        return new O.ExtendedPoint(n(d * m), n(g * p), n(p * m), n(d * g));
      }
      class P {
        constructor(t) {
          this.ep = t;
        }
        static fromAffine(t) {
          return new P(O.ExtendedPoint.fromAffine(t));
        }
        static hashToCurve(t) {
          let e = L(k((t = ensureBytes("ristrettoHash", t, 64)).slice(0, 32))),
            r = L(k(t.slice(32, 64)));
          return new P(e.add(r));
        }
        static fromHex(t) {
          t = ensureBytes("ristrettoHex", t, 32);
          let { a: e, d: r } = O.CURVE,
            n = O.CURVE.Fp.ORDER,
            i = O.CURVE.Fp.create,
            o =
              "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint",
            s = k(t);
          if (!equalBytes(numberToBytesLE(s, 32), t) || isNegativeLE(s, n))
            throw Error(o);
          let u = i(s * s),
            a = i(x + e * u),
            h = i(x - e * u),
            l = i(a * a),
            f = i(h * h),
            c = i(e * r * l - f),
            { isValid: d, value: p } = R(i(c * f)),
            g = i(p * h),
            m = i(p * g * c),
            y = i((s + s) * g);
          isNegativeLE(y, n) && (y = i(-y));
          let w = i(a * m),
            v = i(y * w);
          if (!d || isNegativeLE(v, n) || w === M) throw Error(o);
          return new P(new O.ExtendedPoint(y, w, x, v));
        }
        toRawBytes() {
          let t,
            { ex: e, ey: r, ez: n, et: i } = this.ep,
            o = O.CURVE.Fp.ORDER,
            s = O.CURVE.Fp.create,
            u = s(s(n + r) * s(n - r)),
            a = s(e * r),
            h = s(a * a),
            { value: l } = R(s(u * h)),
            f = s(l * u),
            c = s(l * a),
            d = s(f * c * i);
          if (isNegativeLE(i * d, o)) {
            let n = s(null * r),
              i = s(null * e);
            (e = n), (r = i), (t = s(null * f));
          } else t = c;
          isNegativeLE(e * d, o) && (r = s(-r));
          let p = s((n - r) * t);
          return isNegativeLE(p, o) && (p = s(-p)), numberToBytesLE(p, 32);
        }
        toHex() {
          return bytesToHex(this.toRawBytes());
        }
        toString() {
          return this.toHex();
        }
        equals(t) {
          U(t);
          let { ex: e, ey: r } = this.ep,
            { ex: n, ey: i } = t.ep,
            o = O.CURVE.Fp.create,
            s = o(e * i) === o(r * n),
            u = o(r * i) === o(e * n);
          return s || u;
        }
        add(t) {
          return U(t), new P(this.ep.add(t.ep));
        }
        subtract(t) {
          return U(t), new P(this.ep.subtract(t.ep));
        }
        multiply(t) {
          return new P(this.ep.multiply(t));
        }
        multiplyUnsafe(t) {
          return new P(this.ep.multiplyUnsafe(t));
        }
        double() {
          return new P(this.ep.double());
        }
        negate() {
          return new P(this.ep.negate());
        }
      }
    },
    9495: function (t, e, r) {
      "use strict";
      r.d(e, {
        kA: function () {
          return _;
        },
      });
      var n = r(3636),
        i = r(3652),
        o = r(2231);
      class s extends o.kb {
        constructor(t, e) {
          super(), (this.finished = !1), (this.destroyed = !1), (0, i.vp)(t);
          let r = (0, o.O0)(e);
          if (
            ((this.iHash = t.create()), "function" != typeof this.iHash.update)
          )
            throw Error("Expected instance of class which extends utils.Hash");
          (this.blockLen = this.iHash.blockLen),
            (this.outputLen = this.iHash.outputLen);
          let n = this.blockLen,
            s = new Uint8Array(n);
          s.set(r.length > n ? t.create().update(r).digest() : r);
          for (let t = 0; t < s.length; t++) s[t] ^= 54;
          this.iHash.update(s), (this.oHash = t.create());
          for (let t = 0; t < s.length; t++) s[t] ^= 106;
          this.oHash.update(s), s.fill(0);
        }
        update(t) {
          return (0, i.Gg)(this), this.iHash.update(t), this;
        }
        digestInto(t) {
          (0, i.Gg)(this),
            (0, i.aI)(t, this.outputLen),
            (this.finished = !0),
            this.iHash.digestInto(t),
            this.oHash.update(t),
            this.oHash.digestInto(t),
            this.destroy();
        }
        digest() {
          let t = new Uint8Array(this.oHash.outputLen);
          return this.digestInto(t), t;
        }
        _cloneInto(t) {
          t || (t = Object.create(Object.getPrototypeOf(this), {}));
          let {
            oHash: e,
            iHash: r,
            finished: n,
            destroyed: i,
            blockLen: o,
            outputLen: s,
          } = this;
          return (
            (t.finished = n),
            (t.destroyed = i),
            (t.blockLen = o),
            (t.outputLen = s),
            (t.oHash = e._cloneInto(t.oHash)),
            (t.iHash = r._cloneInto(t.iHash)),
            t
          );
        }
        destroy() {
          (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
        }
      }
      let u = (t, e, r) => new s(t, e).update(r).digest();
      u.create = (t, e) => new s(t, e);
      var a = r(6406),
        h = r(8110),
        l = r(3611);
      function f(t) {
        void 0 !== t.lowS && (0, l.uw)("lowS", t.lowS),
          void 0 !== t.prehash && (0, l.uw)("prehash", t.prehash);
      }
      let { bytesToNumberBE: c, hexToBytes: d } = l,
        p = {
          Err: class extends Error {
            constructor(t = "") {
              super(t);
            }
          },
          _tlv: {
            encode: (t, e) => {
              let { Err: r } = p;
              if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
              if (1 & e.length) throw new r("tlv.encode: unpadded data");
              let n = e.length / 2,
                i = l.uz(n);
              if ((i.length / 2) & 128)
                throw new r("tlv.encode: long form length too big");
              let o = n > 127 ? l.uz((i.length / 2) | 128) : "";
              return `${l.uz(t)}${o}${i}${e}`;
            },
            decode(t, e) {
              let { Err: r } = p,
                n = 0;
              if (t < 0 || t > 256) throw new r("tlv.encode: wrong tag");
              if (e.length < 2 || e[n++] !== t)
                throw new r("tlv.decode: wrong tlv");
              let i = e[n++],
                o = 0;
              if (128 & i) {
                let t = 127 & i;
                if (!t)
                  throw new r(
                    "tlv.decode(long): indefinite length not supported"
                  );
                if (t > 4)
                  throw new r("tlv.decode(long): byte length is too big");
                let s = e.subarray(n, n + t);
                if (s.length !== t)
                  throw new r("tlv.decode: length bytes not complete");
                if (0 === s[0])
                  throw new r("tlv.decode(long): zero leftmost byte");
                for (let t of s) o = (o << 8) | t;
                if (((n += t), o < 128))
                  throw new r("tlv.decode(long): not minimal encoding");
              } else o = i;
              let s = e.subarray(n, n + o);
              if (s.length !== o) throw new r("tlv.decode: wrong value length");
              return { v: s, l: e.subarray(n + o) };
            },
          },
          _int: {
            encode(t) {
              let { Err: e } = p;
              if (t < g)
                throw new e("integer: negative integers are not allowed");
              let r = l.uz(t);
              if (
                (8 & Number.parseInt(r[0], 16) && (r = "00" + r), 1 & r.length)
              )
                throw new e("unexpected assertion");
              return r;
            },
            decode(t) {
              let { Err: e } = p;
              if (128 & t[0])
                throw new e("Invalid signature integer: negative");
              if (0 === t[0] && !(128 & t[1]))
                throw new e(
                  "Invalid signature integer: unnecessary leading zero"
                );
              return c(t);
            },
          },
          toSig(t) {
            let { Err: e, _int: r, _tlv: n } = p,
              i = "string" == typeof t ? d(t) : t;
            l.gk(i);
            let { v: o, l: s } = n.decode(48, i);
            if (s.length)
              throw new e("Invalid signature: left bytes after parsing");
            let { v: u, l: a } = n.decode(2, o),
              { v: h, l: f } = n.decode(2, a);
            if (f.length)
              throw new e("Invalid signature: left bytes after parsing");
            return { r: r.decode(u), s: r.decode(h) };
          },
          hexFromSig(t) {
            let { _tlv: e, _int: r } = p,
              n = `${e.encode(2, r.encode(t.r))}${e.encode(2, r.encode(t.s))}`;
            return e.encode(48, n);
          },
        },
        g = BigInt(0),
        m = BigInt(1),
        y = (BigInt(2), BigInt(3));
      BigInt(4);
      let w = BigInt(
          "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
        ),
        v = BigInt(
          "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        ),
        b = BigInt(1),
        E = BigInt(2),
        M = (t, e) => (t + e / E) / e,
        x = (0, h.gN)(w, void 0, void 0, {
          sqrt: function (t) {
            let e = BigInt(3),
              r = BigInt(6),
              n = BigInt(11),
              i = BigInt(22),
              o = BigInt(23),
              s = BigInt(44),
              u = BigInt(88),
              a = (t * t * t) % w,
              l = (a * a * t) % w,
              f = ((0, h.oA)(l, e, w) * l) % w,
              c = ((0, h.oA)(f, e, w) * l) % w,
              d = ((0, h.oA)(c, E, w) * a) % w,
              p = ((0, h.oA)(d, n, w) * d) % w,
              g = ((0, h.oA)(p, i, w) * p) % w,
              m = ((0, h.oA)(g, s, w) * g) % w,
              y = ((0, h.oA)(m, u, w) * m) % w,
              v = ((0, h.oA)(y, s, w) * g) % w,
              b = ((0, h.oA)(v, e, w) * l) % w,
              M = ((0, h.oA)(b, o, w) * p) % w,
              _ = ((0, h.oA)(M, r, w) * a) % w,
              B = (0, h.oA)(_, E, w);
            if (!x.eql(x.sqr(B), t)) throw Error("Cannot find square root");
            return B;
          },
        }),
        _ = (function (t, e) {
          let r = (e) =>
            (function (t) {
              let e = (function (t) {
                  let e = (0, a.Kd)(t);
                  return (
                    l.FF(
                      e,
                      {
                        hash: "hash",
                        hmac: "function",
                        randomBytes: "function",
                      },
                      {
                        bits2int: "function",
                        bits2int_modN: "function",
                        lowS: "boolean",
                      }
                    ),
                    Object.freeze({ lowS: !0, ...e })
                  );
                })(t),
                { Fp: r, n: n } = e,
                i = r.BYTES + 1,
                o = 2 * r.BYTES + 1;
              function s(t) {
                return h.wQ(t, n);
              }
              function u(t) {
                return h.U_(t, n);
              }
              let {
                  ProjectivePoint: c,
                  normPrivateKeyToScalar: d,
                  weierstrassEquation: w,
                  isWithinCurveOrder: v,
                } = (function (t) {
                  let e = (function (t) {
                      let e = (0, a.Kd)(t);
                      l.FF(
                        e,
                        { a: "field", b: "field" },
                        {
                          allowedPrivateKeyLengths: "array",
                          wrapPrivateKey: "boolean",
                          isTorsionFree: "function",
                          clearCofactor: "function",
                          allowInfinityPoint: "boolean",
                          fromBytes: "function",
                          toBytes: "function",
                        }
                      );
                      let { endo: r, Fp: n, a: i } = e;
                      if (r) {
                        if (!n.eql(i, n.ZERO))
                          throw Error(
                            "Endomorphism can only be defined for Koblitz curves that have a=0"
                          );
                        if (
                          "object" != typeof r ||
                          "bigint" != typeof r.beta ||
                          "function" != typeof r.splitScalar
                        )
                          throw Error(
                            "Expected endomorphism with beta: bigint and splitScalar: function"
                          );
                      }
                      return Object.freeze({ ...e });
                    })(t),
                    { Fp: r } = e,
                    n = h.gN(e.n, e.nBitLength),
                    i =
                      e.toBytes ||
                      ((t, e, n) => {
                        let i = e.toAffine();
                        return l.eV(
                          Uint8Array.from([4]),
                          r.toBytes(i.x),
                          r.toBytes(i.y)
                        );
                      }),
                    o =
                      e.fromBytes ||
                      ((t) => {
                        let e = t.subarray(1);
                        return {
                          x: r.fromBytes(e.subarray(0, r.BYTES)),
                          y: r.fromBytes(e.subarray(r.BYTES, 2 * r.BYTES)),
                        };
                      });
                  function s(t) {
                    let { a: n, b: i } = e,
                      o = r.sqr(t),
                      s = r.mul(o, t);
                    return r.add(r.add(s, r.mul(t, n)), i);
                  }
                  if (!r.eql(r.sqr(e.Gy), s(e.Gx)))
                    throw Error("bad generator point: equation left != right");
                  function u(t) {
                    let r;
                    let {
                      allowedPrivateKeyLengths: n,
                      nByteLength: i,
                      wrapPrivateKey: o,
                      n: s,
                    } = e;
                    if (n && "bigint" != typeof t) {
                      if (
                        (l._t(t) && (t = l.ci(t)),
                        "string" != typeof t || !n.includes(t.length))
                      )
                        throw Error("Invalid key");
                      t = t.padStart(2 * i, "0");
                    }
                    try {
                      r =
                        "bigint" == typeof t
                          ? t
                          : l.bytesToNumberBE((0, l.ql)("private key", t, i));
                    } catch (e) {
                      throw Error(
                        `private key must be ${i} bytes, hex or bigint, not ${typeof t}`
                      );
                    }
                    return (
                      o && (r = h.wQ(r, s)), l.Fy("private key", r, m, s), r
                    );
                  }
                  function f(t) {
                    if (!(t instanceof p))
                      throw Error("ProjectivePoint expected");
                  }
                  let c = (0, l.H9)((t, e) => {
                      let { px: n, py: i, pz: o } = t;
                      if (r.eql(o, r.ONE)) return { x: n, y: i };
                      let s = t.is0();
                      null == e && (e = s ? r.ONE : r.inv(o));
                      let u = r.mul(n, e),
                        a = r.mul(i, e),
                        h = r.mul(o, e);
                      if (s) return { x: r.ZERO, y: r.ZERO };
                      if (!r.eql(h, r.ONE)) throw Error("invZ was invalid");
                      return { x: u, y: a };
                    }),
                    d = (0, l.H9)((t) => {
                      if (t.is0()) {
                        if (e.allowInfinityPoint && !r.is0(t.py)) return;
                        throw Error("bad point: ZERO");
                      }
                      let { x: n, y: i } = t.toAffine();
                      if (!r.isValid(n) || !r.isValid(i))
                        throw Error("bad point: x or y not FE");
                      let o = r.sqr(i),
                        u = s(n);
                      if (!r.eql(o, u))
                        throw Error("bad point: equation left != right");
                      if (!t.isTorsionFree())
                        throw Error("bad point: not in prime-order subgroup");
                      return !0;
                    });
                  class p {
                    constructor(t, e, n) {
                      if (
                        ((this.px = t),
                        (this.py = e),
                        (this.pz = n),
                        null == t || !r.isValid(t))
                      )
                        throw Error("x required");
                      if (null == e || !r.isValid(e)) throw Error("y required");
                      if (null == n || !r.isValid(n)) throw Error("z required");
                      Object.freeze(this);
                    }
                    static fromAffine(t) {
                      let { x: e, y: n } = t || {};
                      if (!t || !r.isValid(e) || !r.isValid(n))
                        throw Error("invalid affine point");
                      if (t instanceof p)
                        throw Error("projective point not allowed");
                      let i = (t) => r.eql(t, r.ZERO);
                      return i(e) && i(n) ? p.ZERO : new p(e, n, r.ONE);
                    }
                    get x() {
                      return this.toAffine().x;
                    }
                    get y() {
                      return this.toAffine().y;
                    }
                    static normalizeZ(t) {
                      let e = r.invertBatch(t.map((t) => t.pz));
                      return t
                        .map((t, r) => t.toAffine(e[r]))
                        .map(p.fromAffine);
                    }
                    static fromHex(t) {
                      let e = p.fromAffine(o((0, l.ql)("pointHex", t)));
                      return e.assertValidity(), e;
                    }
                    static fromPrivateKey(t) {
                      return p.BASE.multiply(u(t));
                    }
                    static msm(t, e) {
                      return (0, a.D1)(p, n, t, e);
                    }
                    _setWindowSize(t) {
                      v.setWindowSize(this, t);
                    }
                    assertValidity() {
                      d(this);
                    }
                    hasEvenY() {
                      let { y: t } = this.toAffine();
                      if (r.isOdd) return !r.isOdd(t);
                      throw Error("Field doesn't support isOdd");
                    }
                    equals(t) {
                      f(t);
                      let { px: e, py: n, pz: i } = this,
                        { px: o, py: s, pz: u } = t,
                        a = r.eql(r.mul(e, u), r.mul(o, i)),
                        h = r.eql(r.mul(n, u), r.mul(s, i));
                      return a && h;
                    }
                    negate() {
                      return new p(this.px, r.neg(this.py), this.pz);
                    }
                    double() {
                      let { a: t, b: n } = e,
                        i = r.mul(n, y),
                        { px: o, py: s, pz: u } = this,
                        a = r.ZERO,
                        h = r.ZERO,
                        l = r.ZERO,
                        f = r.mul(o, o),
                        c = r.mul(s, s),
                        d = r.mul(u, u),
                        g = r.mul(o, s);
                      return (
                        (g = r.add(g, g)),
                        (l = r.mul(o, u)),
                        (l = r.add(l, l)),
                        (a = r.mul(t, l)),
                        (h = r.mul(i, d)),
                        (h = r.add(a, h)),
                        (a = r.sub(c, h)),
                        (h = r.add(c, h)),
                        (h = r.mul(a, h)),
                        (a = r.mul(g, a)),
                        (l = r.mul(i, l)),
                        (d = r.mul(t, d)),
                        (g = r.sub(f, d)),
                        (g = r.mul(t, g)),
                        (g = r.add(g, l)),
                        (l = r.add(f, f)),
                        (f = r.add(l, f)),
                        (f = r.add(f, d)),
                        (f = r.mul(f, g)),
                        (h = r.add(h, f)),
                        (d = r.mul(s, u)),
                        (d = r.add(d, d)),
                        (f = r.mul(d, g)),
                        (a = r.sub(a, f)),
                        (l = r.mul(d, c)),
                        (l = r.add(l, l)),
                        new p(a, h, (l = r.add(l, l)))
                      );
                    }
                    add(t) {
                      f(t);
                      let { px: n, py: i, pz: o } = this,
                        { px: s, py: u, pz: a } = t,
                        h = r.ZERO,
                        l = r.ZERO,
                        c = r.ZERO,
                        d = e.a,
                        g = r.mul(e.b, y),
                        m = r.mul(n, s),
                        w = r.mul(i, u),
                        v = r.mul(o, a),
                        b = r.add(n, i),
                        E = r.add(s, u);
                      (b = r.mul(b, E)),
                        (E = r.add(m, w)),
                        (b = r.sub(b, E)),
                        (E = r.add(n, o));
                      let M = r.add(s, a);
                      return (
                        (E = r.mul(E, M)),
                        (M = r.add(m, v)),
                        (E = r.sub(E, M)),
                        (M = r.add(i, o)),
                        (h = r.add(u, a)),
                        (M = r.mul(M, h)),
                        (h = r.add(w, v)),
                        (M = r.sub(M, h)),
                        (c = r.mul(d, E)),
                        (h = r.mul(g, v)),
                        (c = r.add(h, c)),
                        (h = r.sub(w, c)),
                        (c = r.add(w, c)),
                        (l = r.mul(h, c)),
                        (w = r.add(m, m)),
                        (w = r.add(w, m)),
                        (v = r.mul(d, v)),
                        (E = r.mul(g, E)),
                        (w = r.add(w, v)),
                        (v = r.sub(m, v)),
                        (v = r.mul(d, v)),
                        (E = r.add(E, v)),
                        (m = r.mul(w, E)),
                        (l = r.add(l, m)),
                        (m = r.mul(M, E)),
                        (h = r.mul(b, h)),
                        (h = r.sub(h, m)),
                        (m = r.mul(b, w)),
                        (c = r.mul(M, c)),
                        new p(h, l, (c = r.add(c, m)))
                      );
                    }
                    subtract(t) {
                      return this.add(t.negate());
                    }
                    is0() {
                      return this.equals(p.ZERO);
                    }
                    wNAF(t) {
                      return v.wNAFCached(this, t, p.normalizeZ);
                    }
                    multiplyUnsafe(t) {
                      l.Fy("scalar", t, g, e.n);
                      let n = p.ZERO;
                      if (t === g) return n;
                      if (t === m) return this;
                      let { endo: i } = e;
                      if (!i) return v.unsafeLadder(this, t);
                      let {
                          k1neg: o,
                          k1: s,
                          k2neg: u,
                          k2: a,
                        } = i.splitScalar(t),
                        h = n,
                        f = n,
                        c = this;
                      for (; s > g || a > g; )
                        s & m && (h = h.add(c)),
                          a & m && (f = f.add(c)),
                          (c = c.double()),
                          (s >>= m),
                          (a >>= m);
                      return (
                        o && (h = h.negate()),
                        u && (f = f.negate()),
                        (f = new p(r.mul(f.px, i.beta), f.py, f.pz)),
                        h.add(f)
                      );
                    }
                    multiply(t) {
                      let n, i;
                      let { endo: o, n: s } = e;
                      if ((l.Fy("scalar", t, m, s), o)) {
                        let {
                            k1neg: e,
                            k1: s,
                            k2neg: u,
                            k2: a,
                          } = o.splitScalar(t),
                          { p: h, f: l } = this.wNAF(s),
                          { p: f, f: c } = this.wNAF(a);
                        (h = v.constTimeNegate(e, h)),
                          (f = v.constTimeNegate(u, f)),
                          (f = new p(r.mul(f.px, o.beta), f.py, f.pz)),
                          (n = h.add(f)),
                          (i = l.add(c));
                      } else {
                        let { p: e, f: r } = this.wNAF(t);
                        (n = e), (i = r);
                      }
                      return p.normalizeZ([n, i])[0];
                    }
                    multiplyAndAddUnsafe(t, e, r) {
                      let n = p.BASE,
                        i = (t, e) =>
                          e !== g && e !== m && t.equals(n)
                            ? t.multiply(e)
                            : t.multiplyUnsafe(e),
                        o = i(this, e).add(i(t, r));
                      return o.is0() ? void 0 : o;
                    }
                    toAffine(t) {
                      return c(this, t);
                    }
                    isTorsionFree() {
                      let { h: t, isTorsionFree: r } = e;
                      if (t === m) return !0;
                      if (r) return r(p, this);
                      throw Error(
                        "isTorsionFree() has not been declared for the elliptic curve"
                      );
                    }
                    clearCofactor() {
                      let { h: t, clearCofactor: r } = e;
                      return t === m
                        ? this
                        : r
                        ? r(p, this)
                        : this.multiplyUnsafe(e.h);
                    }
                    toRawBytes(t = !0) {
                      return (
                        (0, l.uw)("isCompressed", t),
                        this.assertValidity(),
                        i(p, this, t)
                      );
                    }
                    toHex(t = !0) {
                      return (
                        (0, l.uw)("isCompressed", t), l.ci(this.toRawBytes(t))
                      );
                    }
                  }
                  (p.BASE = new p(e.Gx, e.Gy, r.ONE)),
                    (p.ZERO = new p(r.ZERO, r.ONE, r.ZERO));
                  let w = e.nBitLength,
                    v = (0, a.Mx)(p, e.endo ? Math.ceil(w / 2) : w);
                  return {
                    CURVE: e,
                    ProjectivePoint: p,
                    normPrivateKeyToScalar: u,
                    weierstrassEquation: s,
                    isWithinCurveOrder: function (t) {
                      return l.Z2(t, m, e.n);
                    },
                  };
                })({
                  ...e,
                  toBytes(t, e, n) {
                    let i = e.toAffine(),
                      o = r.toBytes(i.x),
                      s = l.eV;
                    return ((0, l.uw)("isCompressed", n), n)
                      ? s(Uint8Array.from([e.hasEvenY() ? 2 : 3]), o)
                      : s(Uint8Array.from([4]), o, r.toBytes(i.y));
                  },
                  fromBytes(t) {
                    let e = t.length,
                      n = t[0],
                      s = t.subarray(1);
                    if (e === i && (2 === n || 3 === n)) {
                      let t;
                      let e = l.bytesToNumberBE(s);
                      if (!l.Z2(e, m, r.ORDER))
                        throw Error("Point is not on curve");
                      let i = w(e);
                      try {
                        t = r.sqrt(i);
                      } catch (t) {
                        throw Error(
                          "Point is not on curve" +
                            (t instanceof Error ? ": " + t.message : "")
                        );
                      }
                      return (
                        ((1 & n) == 1) != ((t & m) === m) && (t = r.neg(t)),
                        { x: e, y: t }
                      );
                    }
                    if (e === o && 4 === n)
                      return {
                        x: r.fromBytes(s.subarray(0, r.BYTES)),
                        y: r.fromBytes(s.subarray(r.BYTES, 2 * r.BYTES)),
                      };
                    throw Error(
                      `Point of length ${e} was invalid. Expected ${i} compressed bytes or ${o} uncompressed bytes`
                    );
                  },
                }),
                b = (t) => l.ci(l.tL(t, e.nByteLength)),
                E = (t, e, r) => l.bytesToNumberBE(t.slice(e, r));
              class M {
                constructor(t, e, r) {
                  (this.r = t),
                    (this.s = e),
                    (this.recovery = r),
                    this.assertValidity();
                }
                static fromCompact(t) {
                  let r = e.nByteLength;
                  return new M(
                    E((t = (0, l.ql)("compactSignature", t, 2 * r)), 0, r),
                    E(t, r, 2 * r)
                  );
                }
                static fromDER(t) {
                  let { r: e, s: r } = p.toSig((0, l.ql)("DER", t));
                  return new M(e, r);
                }
                assertValidity() {
                  l.Fy("r", this.r, m, n), l.Fy("s", this.s, m, n);
                }
                addRecoveryBit(t) {
                  return new M(this.r, this.s, t);
                }
                recoverPublicKey(t) {
                  let { r: n, s: i, recovery: o } = this,
                    a = B((0, l.ql)("msgHash", t));
                  if (null == o || ![0, 1, 2, 3].includes(o))
                    throw Error("recovery id invalid");
                  let h = 2 === o || 3 === o ? n + e.n : n;
                  if (h >= r.ORDER) throw Error("recovery id 2 or 3 invalid");
                  let f = (1 & o) == 0 ? "02" : "03",
                    d = c.fromHex(f + b(h)),
                    p = u(h),
                    g = s(-a * p),
                    m = s(i * p),
                    y = c.BASE.multiplyAndAddUnsafe(d, g, m);
                  if (!y) throw Error("point at infinify");
                  return y.assertValidity(), y;
                }
                hasHighS() {
                  return this.s > n >> m;
                }
                normalizeS() {
                  return this.hasHighS()
                    ? new M(this.r, s(-this.s), this.recovery)
                    : this;
                }
                toDERRawBytes() {
                  return l.hexToBytes(this.toDERHex());
                }
                toDERHex() {
                  return p.hexFromSig({ r: this.r, s: this.s });
                }
                toCompactRawBytes() {
                  return l.hexToBytes(this.toCompactHex());
                }
                toCompactHex() {
                  return b(this.r) + b(this.s);
                }
              }
              function x(t) {
                let e = l._t(t),
                  r = "string" == typeof t,
                  n = (e || r) && t.length;
                return e
                  ? n === i || n === o
                  : r
                  ? n === 2 * i || n === 2 * o
                  : t instanceof c;
              }
              let _ =
                  e.bits2int ||
                  function (t) {
                    let r = l.bytesToNumberBE(t),
                      n = 8 * t.length - e.nBitLength;
                    return n > 0 ? r >> BigInt(n) : r;
                  },
                B =
                  e.bits2int_modN ||
                  function (t) {
                    return s(_(t));
                  },
                A = l.dQ(e.nBitLength);
              function S(t) {
                return (
                  l.Fy(`num < 2^${e.nBitLength}`, t, g, A),
                  l.tL(t, e.nByteLength)
                );
              }
              let I = { lowS: e.lowS, prehash: !1 },
                O = { lowS: e.lowS, prehash: !1 };
              return (
                c.BASE._setWindowSize(8),
                {
                  CURVE: e,
                  getPublicKey: function (t, e = !0) {
                    return c.fromPrivateKey(t).toRawBytes(e);
                  },
                  getSharedSecret: function (t, e, r = !0) {
                    if (x(t)) throw Error("first arg must be private key");
                    if (!x(e)) throw Error("second arg must be public key");
                    return c.fromHex(e).multiply(d(t)).toRawBytes(r);
                  },
                  sign: function (t, i, o = I) {
                    let { seed: a, k2sig: h } = (function (t, i, o = I) {
                      if (["recovered", "canonical"].some((t) => t in o))
                        throw Error("sign() legacy options not supported");
                      let { hash: a, randomBytes: h } = e,
                        { lowS: p, prehash: y, extraEntropy: w } = o;
                      null == p && (p = !0),
                        (t = (0, l.ql)("msgHash", t)),
                        f(o),
                        y && (t = (0, l.ql)("prehashed msgHash", a(t)));
                      let b = B(t),
                        E = d(i),
                        x = [S(E), S(b)];
                      if (null != w && !1 !== w) {
                        let t = !0 === w ? h(r.BYTES) : w;
                        x.push((0, l.ql)("extraEntropy", t));
                      }
                      return {
                        seed: l.eV(...x),
                        k2sig: function (t) {
                          let e = _(t);
                          if (!v(e)) return;
                          let r = u(e),
                            i = c.BASE.multiply(e).toAffine(),
                            o = s(i.x);
                          if (o === g) return;
                          let a = s(r * s(b + o * E));
                          if (a === g) return;
                          let h = (i.x === o ? 0 : 2) | Number(i.y & m),
                            l = a;
                          if (p && a > n >> m)
                            (l = a > n >> m ? s(-a) : a), (h ^= 1);
                          return new M(o, l, h);
                        },
                      };
                    })(t, i, o);
                    return l.n$(e.hash.outputLen, e.nByteLength, e.hmac)(a, h);
                  },
                  verify: function (t, r, n, i = O) {
                    let o, a;
                    if (
                      ((r = (0, l.ql)("msgHash", r)),
                      (n = (0, l.ql)("publicKey", n)),
                      "strict" in i)
                    )
                      throw Error("options.strict was renamed to lowS");
                    f(i);
                    let { lowS: h, prehash: d } = i;
                    try {
                      if ("string" == typeof t || l._t(t))
                        try {
                          a = M.fromDER(t);
                        } catch (e) {
                          if (!(e instanceof p.Err)) throw e;
                          a = M.fromCompact(t);
                        }
                      else if (
                        "object" == typeof t &&
                        "bigint" == typeof t.r &&
                        "bigint" == typeof t.s
                      ) {
                        let { r: e, s: r } = t;
                        a = new M(e, r);
                      } else throw Error("PARSE");
                      o = c.fromHex(n);
                    } catch (t) {
                      if ("PARSE" === t.message)
                        throw Error(
                          "signature must be Signature instance, Uint8Array or hex string"
                        );
                      return !1;
                    }
                    if (h && a.hasHighS()) return !1;
                    d && (r = e.hash(r));
                    let { r: g, s: m } = a,
                      y = B(r),
                      w = u(m),
                      v = s(y * w),
                      b = s(g * w),
                      E = c.BASE.multiplyAndAddUnsafe(o, v, b)?.toAffine();
                    return !!E && s(E.x) === g;
                  },
                  ProjectivePoint: c,
                  Signature: M,
                  utils: {
                    isValidPrivateKey(t) {
                      try {
                        return d(t), !0;
                      } catch (t) {
                        return !1;
                      }
                    },
                    normPrivateKeyToScalar: d,
                    randomPrivateKey: () => {
                      let t = h.PS(e.n);
                      return h.Us(e.randomBytes(t), e.n);
                    },
                    precompute: (t = 8, e = c.BASE) => (
                      e._setWindowSize(t), e.multiply(BigInt(3)), e
                    ),
                  },
                }
              );
            })({
              ...t,
              hash: e,
              hmac: (t, ...r) => u(e, t, (0, o.eV)(...r)),
              randomBytes: o.O6,
            });
          return Object.freeze({ ...r(e), create: r });
        })(
          {
            a: BigInt(0),
            b: BigInt(7),
            Fp: x,
            n: v,
            Gx: BigInt(
              "55066263022277343669578718895168534326250603453777594175500187360389116729240"
            ),
            Gy: BigInt(
              "32670510020758816978083085130507043184471273380659243275938904335757337482424"
            ),
            h: BigInt(1),
            lowS: !0,
            endo: {
              beta: BigInt(
                "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"
              ),
              splitScalar: (t) => {
                let e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                  r = -b * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                  n = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
                  i = BigInt("0x100000000000000000000000000000000"),
                  o = M(e * t, v),
                  s = M(-r * t, v),
                  u = (0, h.wQ)(t - o * e - s * n, v),
                  a = (0, h.wQ)(-o * r - s * e, v),
                  l = u > i,
                  f = a > i;
                if ((l && (u = v - u), f && (a = v - a), u > i || a > i))
                  throw Error("splitScalar: Endomorphism failed, k=" + t);
                return { k1neg: l, k1: u, k2neg: f, k2: a };
              },
            },
          },
          n.JQ
        );
      BigInt(0), _.ProjectivePoint;
    },
    3652: function (t, e, r) {
      "use strict";
      function n(t) {
        if (!Number.isSafeInteger(t) || t < 0)
          throw Error(`positive integer expected, not ${t}`);
      }
      function i(t, ...e) {
        if (
          !(
            t instanceof Uint8Array ||
            (null != t &&
              "object" == typeof t &&
              "Uint8Array" === t.constructor.name)
          )
        )
          throw Error("Uint8Array expected");
        if (e.length > 0 && !e.includes(t.length))
          throw Error(
            `Uint8Array expected of length ${e}, not of length=${t.length}`
          );
      }
      function o(t) {
        if ("function" != typeof t || "function" != typeof t.create)
          throw Error("Hash should be wrapped by utils.wrapConstructor");
        n(t.outputLen), n(t.blockLen);
      }
      function s(t, e = !0) {
        if (t.destroyed) throw Error("Hash instance has been destroyed");
        if (e && t.finished)
          throw Error("Hash#digest() has already been called");
      }
      function u(t, e) {
        i(t);
        let r = e.outputLen;
        if (t.length < r)
          throw Error(
            `digestInto() expects output buffer of length at least ${r}`
          );
      }
      r.d(e, {
        Gg: function () {
          return s;
        },
        J8: function () {
          return u;
        },
        Rx: function () {
          return n;
        },
        aI: function () {
          return i;
        },
        vp: function () {
          return o;
        },
      });
    },
    9027: function (t, e, r) {
      "use strict";
      r.d(e, {
        VR: function () {
          return u;
        },
        bc: function () {
          return o;
        },
        l3: function () {
          return s;
        },
      });
      var n = r(3652),
        i = r(2231);
      let o = (t, e, r) => (t & e) ^ (~t & r),
        s = (t, e, r) => (t & e) ^ (t & r) ^ (e & r);
      class u extends i.kb {
        constructor(t, e, r, n) {
          super(),
            (this.blockLen = t),
            (this.outputLen = e),
            (this.padOffset = r),
            (this.isLE = n),
            (this.finished = !1),
            (this.length = 0),
            (this.pos = 0),
            (this.destroyed = !1),
            (this.buffer = new Uint8Array(t)),
            (this.view = (0, i.GL)(this.buffer));
        }
        update(t) {
          (0, n.Gg)(this);
          let { view: e, buffer: r, blockLen: o } = this,
            s = (t = (0, i.O0)(t)).length;
          for (let n = 0; n < s; ) {
            let u = Math.min(o - this.pos, s - n);
            if (u === o) {
              let e = (0, i.GL)(t);
              for (; o <= s - n; n += o) this.process(e, n);
              continue;
            }
            r.set(t.subarray(n, n + u), this.pos),
              (this.pos += u),
              (n += u),
              this.pos === o && (this.process(e, 0), (this.pos = 0));
          }
          return (this.length += t.length), this.roundClean(), this;
        }
        digestInto(t) {
          (0, n.Gg)(this), (0, n.J8)(t, this), (this.finished = !0);
          let { buffer: e, view: r, blockLen: o, isLE: s } = this,
            { pos: u } = this;
          (e[u++] = 128),
            this.buffer.subarray(u).fill(0),
            this.padOffset > o - u && (this.process(r, 0), (u = 0));
          for (let t = u; t < o; t++) e[t] = 0;
          !(function (t, e, r, n) {
            if ("function" == typeof t.setBigUint64)
              return t.setBigUint64(e, r, n);
            let i = BigInt(32),
              o = BigInt(4294967295),
              s = Number((r >> i) & o),
              u = Number(r & o),
              a = n ? 4 : 0,
              h = n ? 0 : 4;
            t.setUint32(e + a, s, n), t.setUint32(e + h, u, n);
          })(r, o - 8, BigInt(8 * this.length), s),
            this.process(r, 0);
          let a = (0, i.GL)(t),
            h = this.outputLen;
          if (h % 4) throw Error("_sha2: outputLen should be aligned to 32bit");
          let l = h / 4,
            f = this.get();
          if (l > f.length) throw Error("_sha2: outputLen bigger than state");
          for (let t = 0; t < l; t++) a.setUint32(4 * t, f[t], s);
        }
        digest() {
          let { buffer: t, outputLen: e } = this;
          this.digestInto(t);
          let r = t.slice(0, e);
          return this.destroy(), r;
        }
        _cloneInto(t) {
          t || (t = new this.constructor()), t.set(...this.get());
          let {
            blockLen: e,
            buffer: r,
            length: n,
            finished: i,
            destroyed: o,
            pos: s,
          } = this;
          return (
            (t.length = n),
            (t.pos = s),
            (t.finished = i),
            (t.destroyed = o),
            n % e && t.buffer.set(r),
            t
          );
        }
      }
    },
    171: function (t, e, r) {
      "use strict";
      r.d(e, {
        EP: function () {
          return u;
        },
        SD: function () {
          return h;
        },
        Vl: function () {
          return s;
        },
        gm: function () {
          return a;
        },
        mk: function () {
          return l;
        },
      });
      let n = BigInt(4294967296 - 1),
        i = BigInt(32);
      function o(t, e = !1) {
        return e
          ? { h: Number(t & n), l: Number((t >> i) & n) }
          : { h: 0 | Number((t >> i) & n), l: 0 | Number(t & n) };
      }
      function s(t, e = !1) {
        let r = new Uint32Array(t.length),
          n = new Uint32Array(t.length);
        for (let i = 0; i < t.length; i++) {
          let { h: s, l: u } = o(t[i], e);
          [r[i], n[i]] = [s, u];
        }
        return [r, n];
      }
      let u = (t, e, r) => (t << r) | (e >>> (32 - r)),
        a = (t, e, r) => (e << r) | (t >>> (32 - r)),
        h = (t, e, r) => (e << (r - 32)) | (t >>> (64 - r)),
        l = (t, e, r) => (t << (r - 32)) | (e >>> (64 - r));
      e.ZP = {
        fromBig: o,
        split: s,
        toBig: (t, e) => (BigInt(t >>> 0) << i) | BigInt(e >>> 0),
        shrSH: (t, e, r) => t >>> r,
        shrSL: (t, e, r) => (t << (32 - r)) | (e >>> r),
        rotrSH: (t, e, r) => (t >>> r) | (e << (32 - r)),
        rotrSL: (t, e, r) => (t << (32 - r)) | (e >>> r),
        rotrBH: (t, e, r) => (t << (64 - r)) | (e >>> (r - 32)),
        rotrBL: (t, e, r) => (t >>> (r - 32)) | (e << (64 - r)),
        rotr32H: (t, e) => e,
        rotr32L: (t, e) => t,
        rotlSH: u,
        rotlSL: a,
        rotlBH: h,
        rotlBL: l,
        add: function (t, e, r, n) {
          let i = (e >>> 0) + (n >>> 0);
          return { h: (t + r + ((i / 4294967296) | 0)) | 0, l: 0 | i };
        },
        add3L: (t, e, r) => (t >>> 0) + (e >>> 0) + (r >>> 0),
        add3H: (t, e, r, n) => (e + r + n + ((t / 4294967296) | 0)) | 0,
        add4L: (t, e, r, n) => (t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0),
        add4H: (t, e, r, n, i) => (e + r + n + i + ((t / 4294967296) | 0)) | 0,
        add5H: (t, e, r, n, i, o) =>
          (e + r + n + i + o + ((t / 4294967296) | 0)) | 0,
        add5L: (t, e, r, n, i) =>
          (t >>> 0) + (e >>> 0) + (r >>> 0) + (n >>> 0) + (i >>> 0),
      };
    },
    3636: function (t, e, r) {
      "use strict";
      r.d(e, {
        JQ: function () {
          return h;
        },
      });
      var n = r(9027),
        i = r(2231);
      let o = new Uint32Array([
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
          2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
          1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
          4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
          1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
          1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
          2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
          3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
          659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
          2756734187, 3204031479, 3329325298,
        ]),
        s = new Uint32Array([
          1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
          2600822924, 528734635, 1541459225,
        ]),
        u = new Uint32Array(64);
      class a extends n.VR {
        constructor() {
          super(64, 32, 8, !1),
            (this.A = 0 | s[0]),
            (this.B = 0 | s[1]),
            (this.C = 0 | s[2]),
            (this.D = 0 | s[3]),
            (this.E = 0 | s[4]),
            (this.F = 0 | s[5]),
            (this.G = 0 | s[6]),
            (this.H = 0 | s[7]);
        }
        get() {
          let { A: t, B: e, C: r, D: n, E: i, F: o, G: s, H: u } = this;
          return [t, e, r, n, i, o, s, u];
        }
        set(t, e, r, n, i, o, s, u) {
          (this.A = 0 | t),
            (this.B = 0 | e),
            (this.C = 0 | r),
            (this.D = 0 | n),
            (this.E = 0 | i),
            (this.F = 0 | o),
            (this.G = 0 | s),
            (this.H = 0 | u);
        }
        process(t, e) {
          for (let r = 0; r < 16; r++, e += 4) u[r] = t.getUint32(e, !1);
          for (let t = 16; t < 64; t++) {
            let e = u[t - 15],
              r = u[t - 2],
              n = (0, i.np)(e, 7) ^ (0, i.np)(e, 18) ^ (e >>> 3),
              o = (0, i.np)(r, 17) ^ (0, i.np)(r, 19) ^ (r >>> 10);
            u[t] = (o + u[t - 7] + n + u[t - 16]) | 0;
          }
          let { A: r, B: s, C: a, D: h, E: l, F: f, G: c, H: d } = this;
          for (let t = 0; t < 64; t++) {
            let e =
                (d +
                  ((0, i.np)(l, 6) ^ (0, i.np)(l, 11) ^ (0, i.np)(l, 25)) +
                  (0, n.bc)(l, f, c) +
                  o[t] +
                  u[t]) |
                0,
              p =
                (((0, i.np)(r, 2) ^ (0, i.np)(r, 13) ^ (0, i.np)(r, 22)) +
                  (0, n.l3)(r, s, a)) |
                0;
            (d = c),
              (c = f),
              (f = l),
              (l = (h + e) | 0),
              (h = a),
              (a = s),
              (s = r),
              (r = (e + p) | 0);
          }
          (r = (r + this.A) | 0),
            (s = (s + this.B) | 0),
            (a = (a + this.C) | 0),
            (h = (h + this.D) | 0),
            (l = (l + this.E) | 0),
            (f = (f + this.F) | 0),
            (c = (c + this.G) | 0),
            (d = (d + this.H) | 0),
            this.set(r, s, a, h, l, f, c, d);
        }
        roundClean() {
          u.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
        }
      }
      let h = (0, i.hE)(() => new a());
    },
    2642: function (t, e, r) {
      "use strict";
      r.d(e, {
        fr: function () {
          return b;
        },
      });
      var n = r(3652),
        i = r(171),
        o = r(2231);
      let s = [],
        u = [],
        a = [],
        h = BigInt(0),
        l = BigInt(1),
        f = BigInt(2),
        c = BigInt(7),
        d = BigInt(256),
        p = BigInt(113);
      for (let t = 0, e = l, r = 1, n = 0; t < 24; t++) {
        ([r, n] = [n, (2 * r + 3 * n) % 5]),
          s.push(2 * (5 * n + r)),
          u.push((((t + 1) * (t + 2)) / 2) % 64);
        let i = h;
        for (let t = 0; t < 7; t++)
          (e = ((e << l) ^ ((e >> c) * p)) % d) & f &&
            (i ^= l << ((l << BigInt(t)) - l));
        a.push(i);
      }
      let [g, m] = (0, i.Vl)(a, !0),
        y = (t, e, r) => (r > 32 ? (0, i.SD)(t, e, r) : (0, i.EP)(t, e, r)),
        w = (t, e, r) => (r > 32 ? (0, i.mk)(t, e, r) : (0, i.gm)(t, e, r));
      class v extends o.kb {
        constructor(t, e, r, i = !1, s = 24) {
          if (
            (super(),
            (this.blockLen = t),
            (this.suffix = e),
            (this.outputLen = r),
            (this.enableXOF = i),
            (this.rounds = s),
            (this.pos = 0),
            (this.posOut = 0),
            (this.finished = !1),
            (this.destroyed = !1),
            (0, n.Rx)(r),
            0 >= this.blockLen || this.blockLen >= 200)
          )
            throw Error("Sha3 supports only keccak-f1600 function");
          (this.state = new Uint8Array(200)),
            (this.state32 = (0, o.Jq)(this.state));
        }
        keccak() {
          o.iA || (0, o.l1)(this.state32),
            (function (t, e = 24) {
              let r = new Uint32Array(10);
              for (let n = 24 - e; n < 24; n++) {
                for (let e = 0; e < 10; e++)
                  r[e] = t[e] ^ t[e + 10] ^ t[e + 20] ^ t[e + 30] ^ t[e + 40];
                for (let e = 0; e < 10; e += 2) {
                  let n = (e + 8) % 10,
                    i = (e + 2) % 10,
                    o = r[i],
                    s = r[i + 1],
                    u = y(o, s, 1) ^ r[n],
                    a = w(o, s, 1) ^ r[n + 1];
                  for (let r = 0; r < 50; r += 10)
                    (t[e + r] ^= u), (t[e + r + 1] ^= a);
                }
                let e = t[2],
                  i = t[3];
                for (let r = 0; r < 24; r++) {
                  let n = u[r],
                    o = y(e, i, n),
                    a = w(e, i, n),
                    h = s[r];
                  (e = t[h]), (i = t[h + 1]), (t[h] = o), (t[h + 1] = a);
                }
                for (let e = 0; e < 50; e += 10) {
                  for (let n = 0; n < 10; n++) r[n] = t[e + n];
                  for (let n = 0; n < 10; n++)
                    t[e + n] ^= ~r[(n + 2) % 10] & r[(n + 4) % 10];
                }
                (t[0] ^= g[n]), (t[1] ^= m[n]);
              }
              r.fill(0);
            })(this.state32, this.rounds),
            o.iA || (0, o.l1)(this.state32),
            (this.posOut = 0),
            (this.pos = 0);
        }
        update(t) {
          (0, n.Gg)(this);
          let { blockLen: e, state: r } = this,
            i = (t = (0, o.O0)(t)).length;
          for (let n = 0; n < i; ) {
            let o = Math.min(e - this.pos, i - n);
            for (let e = 0; e < o; e++) r[this.pos++] ^= t[n++];
            this.pos === e && this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished) return;
          this.finished = !0;
          let { state: t, suffix: e, pos: r, blockLen: n } = this;
          (t[r] ^= e),
            (128 & e) != 0 && r === n - 1 && this.keccak(),
            (t[n - 1] ^= 128),
            this.keccak();
        }
        writeInto(t) {
          (0, n.Gg)(this, !1), (0, n.aI)(t), this.finish();
          let e = this.state,
            { blockLen: r } = this;
          for (let n = 0, i = t.length; n < i; ) {
            this.posOut >= r && this.keccak();
            let o = Math.min(r - this.posOut, i - n);
            t.set(e.subarray(this.posOut, this.posOut + o), n),
              (this.posOut += o),
              (n += o);
          }
          return t;
        }
        xofInto(t) {
          if (!this.enableXOF)
            throw Error("XOF is not possible for this instance");
          return this.writeInto(t);
        }
        xof(t) {
          return (0, n.Rx)(t), this.xofInto(new Uint8Array(t));
        }
        digestInto(t) {
          if (((0, n.J8)(t, this), this.finished))
            throw Error("digest() was already called");
          return this.writeInto(t), this.destroy(), t;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          (this.destroyed = !0), this.state.fill(0);
        }
        _cloneInto(t) {
          let {
            blockLen: e,
            suffix: r,
            outputLen: n,
            rounds: i,
            enableXOF: o,
          } = this;
          return (
            t || (t = new v(e, r, n, o, i)),
            t.state32.set(this.state32),
            (t.pos = this.pos),
            (t.posOut = this.posOut),
            (t.finished = this.finished),
            (t.rounds = i),
            (t.suffix = r),
            (t.outputLen = n),
            (t.enableXOF = o),
            (t.destroyed = this.destroyed),
            t
          );
        }
      }
      let b = (0, o.hE)(() => new v(136, 1, 32));
    },
    2231: function (t, e, r) {
      "use strict";
      r.d(e, {
        kb: function () {
          return d;
        },
        l1: function () {
          return l;
        },
        eV: function () {
          return c;
        },
        GL: function () {
          return s;
        },
        iA: function () {
          return a;
        },
        O6: function () {
          return g;
        },
        np: function () {
          return u;
        },
        O0: function () {
          return f;
        },
        Jq: function () {
          return o;
        },
        hE: function () {
          return p;
        },
      });
      let n =
        "object" == typeof globalThis && "crypto" in globalThis
          ? globalThis.crypto
          : void 0;
      var i = r(3652);
      let o = (t) =>
          new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)),
        s = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
        u = (t, e) => (t << (32 - e)) | (t >>> e),
        a = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0],
        h = (t) =>
          ((t << 24) & 4278190080) |
          ((t << 8) & 16711680) |
          ((t >>> 8) & 65280) |
          ((t >>> 24) & 255);
      function l(t) {
        for (let e = 0; e < t.length; e++) t[e] = h(t[e]);
      }
      function f(t) {
        return (
          "string" == typeof t &&
            (t = (function (t) {
              if ("string" != typeof t)
                throw Error(`utf8ToBytes expected string, got ${typeof t}`);
              return new Uint8Array(new TextEncoder().encode(t));
            })(t)),
          (0, i.aI)(t),
          t
        );
      }
      function c(...t) {
        let e = 0;
        for (let r = 0; r < t.length; r++) {
          let n = t[r];
          (0, i.aI)(n), (e += n.length);
        }
        let r = new Uint8Array(e);
        for (let e = 0, n = 0; e < t.length; e++) {
          let i = t[e];
          r.set(i, n), (n += i.length);
        }
        return r;
      }
      class d {
        clone() {
          return this._cloneInto();
        }
      }
      function p(t) {
        let e = (e) => t().update(f(e)).digest(),
          r = t();
        return (
          (e.outputLen = r.outputLen),
          (e.blockLen = r.blockLen),
          (e.create = () => t()),
          e
        );
      }
      function g(t = 32) {
        if (n && "function" == typeof n.getRandomValues)
          return n.getRandomValues(new Uint8Array(t));
        if (n && "function" == typeof n.randomBytes) return n.randomBytes(t);
        throw Error("crypto.getRandomValues must be defined");
      }
    },
    4723: function (t, e, r) {
      "use strict";
      r.d(e, {
        O: function () {
          return a;
        },
        z: function () {
          return u;
        },
      });
      var n = r(5789);
      let i = [],
        o = {
          autoConnect: !1,
          connecting: !1,
          connected: !1,
          disconnecting: !1,
          select() {
            s("call", "select");
          },
          connect: () => Promise.reject(s("call", "connect")),
          disconnect: () => Promise.reject(s("call", "disconnect")),
          sendTransaction: () => Promise.reject(s("call", "sendTransaction")),
          signTransaction: () => Promise.reject(s("call", "signTransaction")),
          signAllTransactions: () =>
            Promise.reject(s("call", "signAllTransactions")),
          signMessage: () => Promise.reject(s("call", "signMessage")),
          signIn: () => Promise.reject(s("call", "signIn")),
        };
      function s(t, e) {
        let r = Error(
          `You have tried to ${t} "${e}" on a WalletContext without providing one. Make sure to render a WalletProvider as an ancestor of the component that uses WalletContext.`
        );
        return console.error(r), r;
      }
      Object.defineProperty(o, "wallets", {
        get: () => (s("read", "wallets"), i),
      }),
        Object.defineProperty(o, "wallet", {
          get: () => (s("read", "wallet"), null),
        }),
        Object.defineProperty(o, "publicKey", {
          get: () => (s("read", "publicKey"), null),
        });
      let u = (0, n.createContext)(o);
      function a() {
        return (0, n.useContext)(u);
      }
    },
    1676: function (t, e, r) {
      "use strict";
      r.d(e, {
        v: function () {
          return n;
        },
      });
      var n = r(1064);
      e.Z = n;
    },
    8730: function (t, e, r) {
      "use strict";
      r.d(e, {
        Ey: function () {
          return a;
        },
        XY: function () {
          return s;
        },
      });
      var n = r(9417),
        i = r(1676),
        o = class extends i.v {
          socket;
          constructor(t, e, r) {
            super(),
              (this.socket = new window.WebSocket(t, r)),
              (this.socket.onopen = () => this.emit("open")),
              (this.socket.onmessage = (t) => this.emit("message", t.data)),
              (this.socket.onerror = (t) => this.emit("error", t)),
              (this.socket.onclose = (t) => {
                this.emit("close", t.code, t.reason);
              });
          }
          send(t, e, r) {
            let n = r || e;
            try {
              this.socket.send(t), n();
            } catch (t) {
              n(t);
            }
          }
          close(t, e) {
            this.socket.close(t, e);
          }
          addEventListener(t, e, r) {
            this.socket.addEventListener(t, e, r);
          }
        };
      function s(t, e) {
        return new o(t, e);
      }
      var u = class {
          encode(t) {
            return JSON.stringify(t);
          }
          decode(t) {
            return JSON.parse(t);
          }
        },
        a = class extends i.v {
          address;
          rpc_id;
          queue;
          options;
          autoconnect;
          ready;
          reconnect;
          reconnect_timer_id;
          reconnect_interval;
          max_reconnects;
          rest_options;
          current_reconnects;
          generate_request_id;
          socket;
          webSocketFactory;
          dataPack;
          constructor(
            t,
            e = "ws://localhost:8080",
            {
              autoconnect: r = !0,
              reconnect: n = !0,
              reconnect_interval: i = 1e3,
              max_reconnects: o = 5,
              ...s
            } = {},
            a,
            h
          ) {
            super(),
              (this.webSocketFactory = t),
              (this.queue = {}),
              (this.rpc_id = 0),
              (this.address = e),
              (this.autoconnect = r),
              (this.ready = !1),
              (this.reconnect = n),
              (this.reconnect_timer_id = void 0),
              (this.reconnect_interval = i),
              (this.max_reconnects = o),
              (this.rest_options = s),
              (this.current_reconnects = 0),
              (this.generate_request_id = a || (() => ++this.rpc_id)),
              h ? (this.dataPack = h) : (this.dataPack = new u()),
              this.autoconnect &&
                this._connect(this.address, {
                  autoconnect: this.autoconnect,
                  reconnect: this.reconnect,
                  reconnect_interval: this.reconnect_interval,
                  max_reconnects: this.max_reconnects,
                  ...this.rest_options,
                });
          }
          connect() {
            this.socket ||
              this._connect(this.address, {
                autoconnect: this.autoconnect,
                reconnect: this.reconnect,
                reconnect_interval: this.reconnect_interval,
                max_reconnects: this.max_reconnects,
                ...this.rest_options,
              });
          }
          call(t, e, r, n) {
            return (
              n || "object" != typeof r || ((n = r), (r = null)),
              new Promise((i, o) => {
                if (!this.ready) return o(Error("socket not ready"));
                let s = this.generate_request_id(t, e);
                this.socket.send(
                  this.dataPack.encode({
                    jsonrpc: "2.0",
                    method: t,
                    params: e || void 0,
                    id: s,
                  }),
                  n,
                  (t) => {
                    if (t) return o(t);
                    (this.queue[s] = { promise: [i, o] }),
                      r &&
                        (this.queue[s].timeout = setTimeout(() => {
                          delete this.queue[s], o(Error("reply timeout"));
                        }, r));
                  }
                );
              })
            );
          }
          async login(t) {
            let e = await this.call("rpc.login", t);
            if (!e) throw Error("authentication failed");
            return e;
          }
          async listMethods() {
            return await this.call("__listMethods");
          }
          notify(t, e) {
            return new Promise((r, n) => {
              if (!this.ready) return n(Error("socket not ready"));
              this.socket.send(
                this.dataPack.encode({ jsonrpc: "2.0", method: t, params: e }),
                (t) => {
                  if (t) return n(t);
                  r();
                }
              );
            });
          }
          async subscribe(t) {
            "string" == typeof t && (t = [t]);
            let e = await this.call("rpc.on", t);
            if ("string" == typeof t && "ok" !== e[t])
              throw Error(
                "Failed subscribing to an event '" + t + "' with: " + e[t]
              );
            return e;
          }
          async unsubscribe(t) {
            "string" == typeof t && (t = [t]);
            let e = await this.call("rpc.off", t);
            if ("string" == typeof t && "ok" !== e[t])
              throw Error("Failed unsubscribing from an event with: " + e);
            return e;
          }
          close(t, e) {
            this.socket.close(t || 1e3, e);
          }
          setAutoReconnect(t) {
            this.reconnect = t;
          }
          setReconnectInterval(t) {
            this.reconnect_interval = t;
          }
          setMaxReconnects(t) {
            this.max_reconnects = t;
          }
          _connect(t, e) {
            clearTimeout(this.reconnect_timer_id),
              (this.socket = this.webSocketFactory(t, e)),
              this.socket.addEventListener("open", () => {
                (this.ready = !0),
                  this.emit("open"),
                  (this.current_reconnects = 0);
              }),
              this.socket.addEventListener("message", ({ data: t }) => {
                t instanceof ArrayBuffer && (t = n.Buffer.from(t).toString());
                try {
                  t = this.dataPack.decode(t);
                } catch (t) {
                  return;
                }
                if (t.notification && this.listeners(t.notification).length) {
                  if (!Object.keys(t.params).length)
                    return this.emit(t.notification);
                  let e = [t.notification];
                  if (t.params.constructor === Object) e.push(t.params);
                  else
                    for (let r = 0; r < t.params.length; r++)
                      e.push(t.params[r]);
                  return Promise.resolve().then(() => {
                    this.emit.apply(this, e);
                  });
                }
                if (!this.queue[t.id])
                  return t.method
                    ? Promise.resolve().then(() => {
                        this.emit(t.method, t?.params);
                      })
                    : void 0;
                "error" in t == "result" in t &&
                  this.queue[t.id].promise[1](
                    Error(
                      'Server response malformed. Response must include either "result" or "error", but not both.'
                    )
                  ),
                  this.queue[t.id].timeout &&
                    clearTimeout(this.queue[t.id].timeout),
                  t.error
                    ? this.queue[t.id].promise[1](t.error)
                    : this.queue[t.id].promise[0](t.result),
                  delete this.queue[t.id];
              }),
              this.socket.addEventListener("error", (t) =>
                this.emit("error", t)
              ),
              this.socket.addEventListener(
                "close",
                ({ code: r, reason: n }) => {
                  this.ready && setTimeout(() => this.emit("close", r, n), 0),
                    (this.ready = !1),
                    (this.socket = void 0),
                    1e3 !== r &&
                      (this.current_reconnects++,
                      this.reconnect &&
                        (this.max_reconnects > this.current_reconnects ||
                          0 === this.max_reconnects) &&
                        (this.reconnect_timer_id = setTimeout(
                          () => this._connect(t, e),
                          this.reconnect_interval
                        )));
                }
              );
          }
        };
    },
    5674: function (t, e, r) {
      "use strict";
      r.d(e, {
        AG: function () {
          return v;
        },
        G0: function () {
          return A;
        },
        IM: function () {
          return M;
        },
        IX: function () {
          return g;
        },
        O7: function () {
          return m;
        },
        Rx: function () {
          return b;
        },
        Ue: function () {
          return f;
        },
        Yj: function () {
          return p;
        },
        Z_: function () {
          return x;
        },
        _4: function () {
          return S;
        },
        bc: function () {
          return _;
        },
        dt: function () {
          return B;
        },
        eE: function () {
          return y;
        },
        hu: function () {
          return l;
        },
        i0: function () {
          return w;
        },
        jt: function () {
          return E;
        },
        oQ: function () {
          return I;
        },
      });
      class n extends TypeError {
        constructor(t, e) {
          let r;
          let { message: n, explanation: i, ...o } = t,
            { path: s } = t,
            u = 0 === s.length ? n : `At path: ${s.join(".")} -- ${n}`;
          super(i ?? u),
            null != i && (this.cause = u),
            Object.assign(this, o),
            (this.name = this.constructor.name),
            (this.failures = () => r ?? (r = [t, ...e()]));
        }
      }
      function i(t) {
        return "object" == typeof t && null != t;
      }
      function o(t) {
        return i(t) && !Array.isArray(t);
      }
      function s(t) {
        return "symbol" == typeof t
          ? t.toString()
          : "string" == typeof t
          ? JSON.stringify(t)
          : `${t}`;
      }
      function* u(t, e, r, n) {
        var o;
        for (let u of ((i((o = t)) &&
          "function" == typeof o[Symbol.iterator]) ||
          (t = [t]),
        t)) {
          let t = (function (t, e, r, n) {
            if (!0 === t) return;
            !1 === t ? (t = {}) : "string" == typeof t && (t = { message: t });
            let { path: i, branch: o } = e,
              { type: u } = r,
              {
                refinement: a,
                message: h = `Expected a value of type \`${u}\`${
                  a ? ` with refinement \`${a}\`` : ""
                }, but received: \`${s(n)}\``,
              } = t;
            return {
              value: n,
              type: u,
              refinement: a,
              key: i[i.length - 1],
              path: i,
              branch: o,
              ...t,
              message: h,
            };
          })(u, e, r, n);
          t && (yield t);
        }
      }
      function* a(t, e, r = {}) {
        let { path: n = [], branch: o = [t], coerce: s = !1, mask: u = !1 } = r,
          h = { path: n, branch: o, mask: u };
        s && (t = e.coercer(t, h));
        let l = "valid";
        for (let n of e.validator(t, h))
          (n.explanation = r.message), (l = "not_valid"), yield [n, void 0];
        for (let [f, c, d] of e.entries(t, h))
          for (let e of a(c, d, {
            path: void 0 === f ? n : [...n, f],
            branch: void 0 === f ? o : [...o, c],
            coerce: s,
            mask: u,
            message: r.message,
          }))
            e[0]
              ? ((l = null != e[0].refinement ? "not_refined" : "not_valid"),
                yield [e[0], void 0])
              : s &&
                ((c = e[1]),
                void 0 === f
                  ? (t = c)
                  : t instanceof Map
                  ? t.set(f, c)
                  : t instanceof Set
                  ? t.add(c)
                  : i(t) && (void 0 !== c || f in t) && (t[f] = c));
        if ("not_valid" !== l)
          for (let n of e.refiner(t, h))
            (n.explanation = r.message), (l = "not_refined"), yield [n, void 0];
        "valid" === l && (yield [void 0, t]);
      }
      class h {
        constructor(t) {
          let {
            type: e,
            schema: r,
            validator: n,
            refiner: i,
            coercer: o = (t) => t,
            entries: s = function* () {},
          } = t;
          (this.type = e),
            (this.schema = r),
            (this.entries = s),
            (this.coercer = o),
            n
              ? (this.validator = (t, e) => u(n(t, e), e, this, t))
              : (this.validator = () => []),
            i
              ? (this.refiner = (t, e) => u(i(t, e), e, this, t))
              : (this.refiner = () => []);
        }
        assert(t, e) {
          return l(t, this, e);
        }
        create(t, e) {
          return f(t, this, e);
        }
        is(t) {
          return !c(t, this)[0];
        }
        mask(t, e) {
          return (function (t, e, r) {
            let n = c(t, e, { coerce: !0, mask: !0, message: r });
            if (!n[0]) return n[1];
            throw n[0];
          })(t, this, e);
        }
        validate(t, e = {}) {
          return c(t, this, e);
        }
      }
      function l(t, e, r) {
        let n = c(t, e, { message: r });
        if (n[0]) throw n[0];
      }
      function f(t, e, r) {
        let n = c(t, e, { coerce: !0, message: r });
        if (!n[0]) return n[1];
        throw n[0];
      }
      function c(t, e, r = {}) {
        let i = a(t, e, r),
          o = (function (t) {
            let { done: e, value: r } = t.next();
            return e ? void 0 : r;
          })(i);
        return o[0]
          ? [
              new n(o[0], function* () {
                for (let t of i) t[0] && (yield t[0]);
              }),
              void 0,
            ]
          : [void 0, o[1]];
      }
      function d(t, e) {
        return new h({ type: t, schema: null, validator: e });
      }
      function p() {
        return d("any", () => !0);
      }
      function g(t) {
        return new h({
          type: "array",
          schema: t,
          *entries(e) {
            if (t && Array.isArray(e))
              for (let [r, n] of e.entries()) yield [r, n, t];
          },
          coercer: (t) => (Array.isArray(t) ? t.slice() : t),
          validator: (t) =>
            Array.isArray(t) ||
            `Expected an array value, but received: ${s(t)}`,
        });
      }
      function m() {
        return d("boolean", (t) => "boolean" == typeof t);
      }
      function y(t) {
        return d(
          "instance",
          (e) =>
            e instanceof t ||
            `Expected a \`${t.name}\` instance, but received: ${s(e)}`
        );
      }
      function w(t) {
        let e = s(t),
          r = typeof t;
        return new h({
          type: "literal",
          schema:
            "string" === r || "number" === r || "boolean" === r ? t : null,
          validator: (r) =>
            r === t || `Expected the literal \`${e}\`, but received: ${s(r)}`,
        });
      }
      function v(t) {
        return new h({
          ...t,
          validator: (e, r) => null === e || t.validator(e, r),
          refiner: (e, r) => null === e || t.refiner(e, r),
        });
      }
      function b() {
        return d(
          "number",
          (t) =>
            ("number" == typeof t && !isNaN(t)) ||
            `Expected a number, but received: ${s(t)}`
        );
      }
      function E(t) {
        return new h({
          ...t,
          validator: (e, r) => void 0 === e || t.validator(e, r),
          refiner: (e, r) => void 0 === e || t.refiner(e, r),
        });
      }
      function M(t, e) {
        return new h({
          type: "record",
          schema: null,
          *entries(r) {
            if (i(r))
              for (let n in r) {
                let i = r[n];
                yield [n, n, t], yield [n, i, e];
              }
          },
          validator: (t) => o(t) || `Expected an object, but received: ${s(t)}`,
          coercer: (t) => (o(t) ? { ...t } : t),
        });
      }
      function x() {
        return d(
          "string",
          (t) =>
            "string" == typeof t || `Expected a string, but received: ${s(t)}`
        );
      }
      function _(t) {
        let e = d("never", () => !1);
        return new h({
          type: "tuple",
          schema: null,
          *entries(r) {
            if (Array.isArray(r)) {
              let n = Math.max(t.length, r.length);
              for (let i = 0; i < n; i++) yield [i, r[i], t[i] || e];
            }
          },
          validator: (t) =>
            Array.isArray(t) || `Expected an array, but received: ${s(t)}`,
          coercer: (t) => (Array.isArray(t) ? t.slice() : t),
        });
      }
      function B(t) {
        let e = Object.keys(t);
        return new h({
          type: "type",
          schema: t,
          *entries(r) {
            if (i(r)) for (let n of e) yield [n, r[n], t[n]];
          },
          validator: (t) => o(t) || `Expected an object, but received: ${s(t)}`,
          coercer: (t) => (o(t) ? { ...t } : t),
        });
      }
      function A(t) {
        let e = t.map((t) => t.type).join(" | ");
        return new h({
          type: "union",
          schema: null,
          coercer(e, r) {
            for (let n of t) {
              let [t, i] = n.validate(e, { coerce: !0, mask: r.mask });
              if (!t) return i;
            }
            return e;
          },
          validator(r, n) {
            let i = [];
            for (let e of t) {
              let [...t] = a(r, e, n),
                [o] = t;
              if (!o[0]) return [];
              for (let [e] of t) e && i.push(e);
            }
            return [
              `Expected the value to satisfy a union of \`${e}\`, but received: ${s(
                r
              )}`,
              ...i,
            ];
          },
        });
      }
      function S() {
        return d("unknown", () => !0);
      }
      function I(t, e, r) {
        return new h({
          ...t,
          coercer: (n, i) =>
            c(n, e)[0] ? t.coercer(n, i) : t.coercer(r(n, i), i),
        });
      }
    },
  },
]);

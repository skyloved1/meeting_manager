var CanvasKitInit = (() => {
    var _scriptName = import.meta.url;

    return (
        function (moduleArg = {}) {
            var moduleRtn;

            var r = moduleArg, ba, ca, da = new Promise((a, b) => {
                ba = a;
                ca = b
            }), fa = "object" == typeof window, ia = "function" == typeof importScripts;
            (function (a) {
                a.ce = a.ce || [];
                a.ce.push(function () {
                    a.MakeSWCanvasSurface = function (b) {
                        var c = b, e = "undefined" !== typeof OffscreenCanvas && c instanceof OffscreenCanvas;
                        if (!("undefined" !== typeof HTMLCanvasElement && c instanceof HTMLCanvasElement || e || (c = document.getElementById(b), c))) throw "Canvas with id " + b + " was not found";
                        if (b = a.MakeSurface(c.width, c.height)) b.Ae = c;
                        return b
                    };
                    a.MakeCanvasSurface || (a.MakeCanvasSurface = a.MakeSWCanvasSurface);
                    a.MakeSurface = function (b, c) {
                        var e = {
                            width: b, height: c, colorType: a.ColorType.RGBA_8888,
                            alphaType: a.AlphaType.Unpremul, colorSpace: a.ColorSpace.SRGB
                        }, f = b * c * 4, k = a._malloc(f);
                        if (e = a.Surface._makeRasterDirect(e, k, 4 * b)) e.Ae = null, e.$e = b, e.Xe = c, e.Ye = f, e.He = k, e.getCanvas().clear(a.TRANSPARENT);
                        return e
                    };
                    a.MakeRasterDirectSurface = function (b, c, e) {
                        return a.Surface._makeRasterDirect(b, c.byteOffset, e)
                    };
                    a.Surface.prototype.flush = function (b) {
                        a.$d(this.Zd);
                        this._flush();
                        if (this.Ae) {
                            var c = new Uint8ClampedArray(a.HEAPU8.buffer, this.He, this.Ye);
                            c = new ImageData(c, this.$e, this.Xe);
                            b ? this.Ae.getContext("2d").putImageData(c,
                                0, 0, b[0], b[1], b[2] - b[0], b[3] - b[1]) : this.Ae.getContext("2d").putImageData(c, 0, 0)
                        }
                    };
                    a.Surface.prototype.dispose = function () {
                        this.He && a._free(this.He);
                        this.delete()
                    };
                    a.$d = a.$d || function () {
                    };
                    a.Be = a.Be || function () {
                        return null
                    }
                })
            })(r);
            (function (a) {
                a.ce = a.ce || [];
                a.ce.push(function () {
                    function b(l, p, v) {
                        return l && l.hasOwnProperty(p) ? l[p] : v
                    }

                    function c(l) {
                        var p = ja(ka);
                        ka[p] = l;
                        return p
                    }

                    function e(l) {
                        return l.naturalHeight || l.videoHeight || l.displayHeight || l.height
                    }

                    function f(l) {
                        return l.naturalWidth || l.videoWidth || l.displayWidth || l.width
                    }

                    function k(l, p, v, w) {
                        l.bindTexture(l.TEXTURE_2D, p);
                        w || v.alphaType !== a.AlphaType.Premul || l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
                        return p
                    }

                    function n(l, p, v) {
                        v || p.alphaType !== a.AlphaType.Premul ||
                        l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);
                        l.bindTexture(l.TEXTURE_2D, null)
                    }

                    a.GetWebGLContext = function (l, p) {
                        if (!l) throw "null canvas passed into makeWebGLContext";
                        var v = {
                            alpha: b(p, "alpha", 1),
                            depth: b(p, "depth", 1),
                            stencil: b(p, "stencil", 8),
                            antialias: b(p, "antialias", 0),
                            premultipliedAlpha: b(p, "premultipliedAlpha", 1),
                            preserveDrawingBuffer: b(p, "preserveDrawingBuffer", 0),
                            preferLowPowerToHighPerformance: b(p, "preferLowPowerToHighPerformance", 0),
                            failIfMajorPerformanceCaveat: b(p, "failIfMajorPerformanceCaveat",
                                0),
                            enableExtensionsByDefault: b(p, "enableExtensionsByDefault", 1),
                            explicitSwapControl: b(p, "explicitSwapControl", 0),
                            renderViaOffscreenBackBuffer: b(p, "renderViaOffscreenBackBuffer", 0)
                        };
                        v.majorVersion = p && p.majorVersion ? p.majorVersion : "undefined" !== typeof WebGL2RenderingContext ? 2 : 1;
                        if (v.explicitSwapControl) throw "explicitSwapControl is not supported";
                        l = na(l, v);
                        if (!l) return 0;
                        oa(l);
                        z.le.getExtension("WEBGL_debug_renderer_info");
                        return l
                    };
                    a.deleteContext = function (l) {
                        z === pa[l] && (z = null);
                        "object" == typeof JSEvents &&
                        JSEvents.Af(pa[l].le.canvas);
                        pa[l] && pa[l].le.canvas && (pa[l].le.canvas.Ve = void 0);
                        pa[l] = null
                    };
                    a._setTextureCleanup({
                        deleteTexture: function (l, p) {
                            var v = ka[p];
                            v && pa[l].le.deleteTexture(v);
                            ka[p] = null
                        }
                    });
                    a.MakeWebGLContext = function (l) {
                        if (!this.$d(l)) return null;
                        var p = this._MakeGrContext();
                        if (!p) return null;
                        p.Zd = l;
                        var v = p.delete.bind(p);
                        p["delete"] = function () {
                            a.$d(this.Zd);
                            v()
                        }.bind(p);
                        return z.Je = p
                    };
                    a.MakeGrContext = a.MakeWebGLContext;
                    a.GrDirectContext.prototype.getResourceCacheLimitBytes = function () {
                        a.$d(this.Zd);
                        this._getResourceCacheLimitBytes()
                    };
                    a.GrDirectContext.prototype.getResourceCacheUsageBytes = function () {
                        a.$d(this.Zd);
                        this._getResourceCacheUsageBytes()
                    };
                    a.GrDirectContext.prototype.releaseResourcesAndAbandonContext = function () {
                        a.$d(this.Zd);
                        this._releaseResourcesAndAbandonContext()
                    };
                    a.GrDirectContext.prototype.setResourceCacheLimitBytes = function (l) {
                        a.$d(this.Zd);
                        this._setResourceCacheLimitBytes(l)
                    };
                    a.MakeOnScreenGLSurface = function (l, p, v, w, A, D) {
                        if (!this.$d(l.Zd)) return null;
                        p = void 0 === A || void 0 === D ?
                            this._MakeOnScreenGLSurface(l, p, v, w) : this._MakeOnScreenGLSurface(l, p, v, w, A, D);
                        if (!p) return null;
                        p.Zd = l.Zd;
                        return p
                    };
                    a.MakeRenderTarget = function () {
                        var l = arguments[0];
                        if (!this.$d(l.Zd)) return null;
                        if (3 === arguments.length) {
                            var p = this._MakeRenderTargetWH(l, arguments[1], arguments[2]);
                            if (!p) return null
                        } else if (2 === arguments.length) {
                            if (p = this._MakeRenderTargetII(l, arguments[1]), !p) return null
                        } else return null;
                        p.Zd = l.Zd;
                        return p
                    };
                    a.MakeWebGLCanvasSurface = function (l, p, v) {
                        p = p || null;
                        var w = l, A = "undefined" !==
                            typeof OffscreenCanvas && w instanceof OffscreenCanvas;
                        if (!("undefined" !== typeof HTMLCanvasElement && w instanceof HTMLCanvasElement || A || (w = document.getElementById(l), w))) throw "Canvas with id " + l + " was not found";
                        l = this.GetWebGLContext(w, v);
                        if (!l || 0 > l) throw "failed to create webgl context: err " + l;
                        l = this.MakeWebGLContext(l);
                        p = this.MakeOnScreenGLSurface(l, w.width, w.height, p);
                        return p ? p : (p = w.cloneNode(!0), w.parentNode.replaceChild(p, w), p.classList.add("ck-replaced"), a.MakeSWCanvasSurface(p))
                    };
                    a.MakeCanvasSurface =
                        a.MakeWebGLCanvasSurface;
                    a.Surface.prototype.makeImageFromTexture = function (l, p) {
                        a.$d(this.Zd);
                        l = c(l);
                        if (p = this._makeImageFromTexture(this.Zd, l, p)) p.ue = l;
                        return p
                    };
                    a.Surface.prototype.makeImageFromTextureSource = function (l, p, v) {
                        p ||= {
                            height: e(l),
                            width: f(l),
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: v ? a.AlphaType.Premul : a.AlphaType.Unpremul
                        };
                        p.colorSpace || (p.colorSpace = a.ColorSpace.SRGB);
                        a.$d(this.Zd);
                        var w = z.le;
                        v = k(w, w.createTexture(), p, v);
                        2 === z.version ? w.texImage2D(w.TEXTURE_2D, 0, w.RGBA, p.width, p.height,
                            0, w.RGBA, w.UNSIGNED_BYTE, l) : w.texImage2D(w.TEXTURE_2D, 0, w.RGBA, w.RGBA, w.UNSIGNED_BYTE, l);
                        n(w, p);
                        this._resetContext();
                        return this.makeImageFromTexture(v, p)
                    };
                    a.Surface.prototype.updateTextureFromSource = function (l, p, v) {
                        if (l.ue) {
                            a.$d(this.Zd);
                            var w = l.getImageInfo(), A = z.le, D = k(A, ka[l.ue], w, v);
                            2 === z.version ? A.texImage2D(A.TEXTURE_2D, 0, A.RGBA, f(p), e(p), 0, A.RGBA, A.UNSIGNED_BYTE, p) : A.texImage2D(A.TEXTURE_2D, 0, A.RGBA, A.RGBA, A.UNSIGNED_BYTE, p);
                            n(A, w, v);
                            this._resetContext();
                            ka[l.ue] = null;
                            l.ue = c(D);
                            w.colorSpace =
                                l.getColorSpace();
                            p = this._makeImageFromTexture(this.Zd, l.ue, w);
                            v = l.Yd.ae;
                            A = l.Yd.ee;
                            l.Yd.ae = p.Yd.ae;
                            l.Yd.ee = p.Yd.ee;
                            p.Yd.ae = v;
                            p.Yd.ee = A;
                            p.delete();
                            w.colorSpace.delete()
                        }
                    };
                    a.MakeLazyImageFromTextureSource = function (l, p, v) {
                        p ||= {
                            height: e(l),
                            width: f(l),
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: v ? a.AlphaType.Premul : a.AlphaType.Unpremul
                        };
                        p.colorSpace || (p.colorSpace = a.ColorSpace.SRGB);
                        var w = {
                            makeTexture: function () {
                                var A = z, D = A.le, I = k(D, D.createTexture(), p, v);
                                2 === A.version ? D.texImage2D(D.TEXTURE_2D, 0, D.RGBA,
                                    p.width, p.height, 0, D.RGBA, D.UNSIGNED_BYTE, l) : D.texImage2D(D.TEXTURE_2D, 0, D.RGBA, D.RGBA, D.UNSIGNED_BYTE, l);
                                n(D, p, v);
                                return c(I)
                            }, freeSrc: function () {
                            }
                        };
                        "VideoFrame" === l.constructor.name && (w.freeSrc = function () {
                            l.close()
                        });
                        return a.Image._makeFromGenerator(p, w)
                    };
                    a.$d = function (l) {
                        return l ? oa(l) : !1
                    };
                    a.Be = function () {
                        return z && z.Je && !z.Je.isDeleted() ? z.Je : null
                    }
                })
            })(r);
            (function (a) {
                function b(g) {
                    return (f(255 * g[3]) << 24 | f(255 * g[0]) << 16 | f(255 * g[1]) << 8 | f(255 * g[2]) << 0) >>> 0
                }

                function c(g) {
                    if (g && g._ck) return g;
                    if (g instanceof Float32Array) {
                        for (var d = Math.floor(g.length / 4), h = new Uint32Array(d), m = 0; m < d; m++) h[m] = b(g.slice(4 * m, 4 * (m + 1)));
                        return h
                    }
                    if (g instanceof Uint32Array) return g;
                    if (g instanceof Array && g[0] instanceof Float32Array) return g.map(b)
                }

                function e(g) {
                    if (void 0 === g) return 1;
                    var d = parseFloat(g);
                    return g && -1 !== g.indexOf("%") ? d / 100 : d
                }

                function f(g) {
                    return Math.round(Math.max(0,
                        Math.min(g || 0, 255)))
                }

                function k(g, d) {
                    d && d._ck || a._free(g)
                }

                function n(g, d, h) {
                    if (!g || !g.length) return 0;
                    if (g && g._ck) return g.byteOffset;
                    var m = a[d].BYTES_PER_ELEMENT;
                    h ||= a._malloc(g.length * m);
                    a[d].set(g, h / m);
                    return h
                }

                function l(g) {
                    var d = {he: 0, count: g.length, colorType: a.ColorType.RGBA_F32};
                    if (g instanceof Float32Array) d.he = n(g, "HEAPF32"), d.count = g.length / 4; else if (g instanceof Uint32Array) d.he = n(g, "HEAPU32"), d.colorType = a.ColorType.RGBA_8888; else if (g instanceof Array) {
                        if (g && g.length) {
                            for (var h = a._malloc(16 *
                                g.length), m = 0, t = h / 4, u = 0; u < g.length; u++) for (var x = 0; 4 > x; x++) a.HEAPF32[t + m] = g[u][x], m++;
                            g = h
                        } else g = 0;
                        d.he = g
                    } else throw "Invalid argument to copyFlexibleColorArray, Not a color array " + typeof g;
                    return d
                }

                function p(g) {
                    if (!g) return 0;
                    var d = aa.toTypedArray();
                    if (g.length) {
                        if (6 === g.length || 9 === g.length) return n(g, "HEAPF32", P), 6 === g.length && a.HEAPF32.set(Vc, 6 + P / 4), P;
                        if (16 === g.length) return d[0] = g[0], d[1] = g[1], d[2] = g[3], d[3] = g[4], d[4] = g[5], d[5] = g[7], d[6] = g[12], d[7] = g[13], d[8] = g[15], P;
                        throw "invalid matrix size";
                    }
                    if (void 0 === g.m11) throw "invalid matrix argument";
                    d[0] = g.m11;
                    d[1] = g.m21;
                    d[2] = g.m41;
                    d[3] = g.m12;
                    d[4] = g.m22;
                    d[5] = g.m42;
                    d[6] = g.m14;
                    d[7] = g.m24;
                    d[8] = g.m44;
                    return P
                }

                function v(g) {
                    if (!g) return 0;
                    var d = X.toTypedArray();
                    if (g.length) {
                        if (16 !== g.length && 6 !== g.length && 9 !== g.length) throw "invalid matrix size";
                        if (16 === g.length) return n(g, "HEAPF32", la);
                        d.fill(0);
                        d[0] = g[0];
                        d[1] = g[1];
                        d[3] = g[2];
                        d[4] = g[3];
                        d[5] = g[4];
                        d[7] = g[5];
                        d[10] = 1;
                        d[12] = g[6];
                        d[13] = g[7];
                        d[15] = g[8];
                        6 === g.length && (d[12] = 0, d[13] = 0, d[15] = 1);
                        return la
                    }
                    if (void 0 ===
                        g.m11) throw "invalid matrix argument";
                    d[0] = g.m11;
                    d[1] = g.m21;
                    d[2] = g.m31;
                    d[3] = g.m41;
                    d[4] = g.m12;
                    d[5] = g.m22;
                    d[6] = g.m32;
                    d[7] = g.m42;
                    d[8] = g.m13;
                    d[9] = g.m23;
                    d[10] = g.m33;
                    d[11] = g.m43;
                    d[12] = g.m14;
                    d[13] = g.m24;
                    d[14] = g.m34;
                    d[15] = g.m44;
                    return la
                }

                function w(g, d) {
                    return n(g, "HEAPF32", d || ha)
                }

                function A(g, d, h, m) {
                    var t = Ea.toTypedArray();
                    t[0] = g;
                    t[1] = d;
                    t[2] = h;
                    t[3] = m;
                    return ha
                }

                function D(g) {
                    for (var d = new Float32Array(4), h = 0; 4 > h; h++) d[h] = a.HEAPF32[g / 4 + h];
                    return d
                }

                function I(g, d) {
                    return n(g, "HEAPF32", d || V)
                }

                function Q(g, d) {
                    return n(g,
                        "HEAPF32", d || tb)
                }

                a.Color = function (g, d, h, m) {
                    void 0 === m && (m = 1);
                    return a.Color4f(f(g) / 255, f(d) / 255, f(h) / 255, m)
                };
                a.ColorAsInt = function (g, d, h, m) {
                    void 0 === m && (m = 255);
                    return (f(m) << 24 | f(g) << 16 | f(d) << 8 | f(h) << 0 & 268435455) >>> 0
                };
                a.Color4f = function (g, d, h, m) {
                    void 0 === m && (m = 1);
                    return Float32Array.of(g, d, h, m)
                };
                Object.defineProperty(a, "TRANSPARENT", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 0)
                    }
                });
                Object.defineProperty(a, "BLACK", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 1)
                    }
                });
                Object.defineProperty(a, "WHITE", {
                    get: function () {
                        return a.Color4f(1,
                            1, 1, 1)
                    }
                });
                Object.defineProperty(a, "RED", {
                    get: function () {
                        return a.Color4f(1, 0, 0, 1)
                    }
                });
                Object.defineProperty(a, "GREEN", {
                    get: function () {
                        return a.Color4f(0, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "BLUE", {
                    get: function () {
                        return a.Color4f(0, 0, 1, 1)
                    }
                });
                Object.defineProperty(a, "YELLOW", {
                    get: function () {
                        return a.Color4f(1, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "CYAN", {
                    get: function () {
                        return a.Color4f(0, 1, 1, 1)
                    }
                });
                Object.defineProperty(a, "MAGENTA", {
                    get: function () {
                        return a.Color4f(1, 0, 1, 1)
                    }
                });
                a.getColorComponents = function (g) {
                    return [Math.floor(255 *
                        g[0]), Math.floor(255 * g[1]), Math.floor(255 * g[2]), g[3]]
                };
                a.parseColorString = function (g, d) {
                    g = g.toLowerCase();
                    if (g.startsWith("#")) {
                        d = 255;
                        switch (g.length) {
                            case 9:
                                d = parseInt(g.slice(7, 9), 16);
                            case 7:
                                var h = parseInt(g.slice(1, 3), 16);
                                var m = parseInt(g.slice(3, 5), 16);
                                var t = parseInt(g.slice(5, 7), 16);
                                break;
                            case 5:
                                d = 17 * parseInt(g.slice(4, 5), 16);
                            case 4:
                                h = 17 * parseInt(g.slice(1, 2), 16), m = 17 * parseInt(g.slice(2, 3), 16), t = 17 * parseInt(g.slice(3, 4), 16)
                        }
                        return a.Color(h, m, t, d / 255)
                    }
                    return g.startsWith("rgba") ? (g = g.slice(5,
                        -1), g = g.split(","), a.Color(+g[0], +g[1], +g[2], e(g[3]))) : g.startsWith("rgb") ? (g = g.slice(4, -1), g = g.split(","), a.Color(+g[0], +g[1], +g[2], e(g[3]))) : g.startsWith("gray(") || g.startsWith("hsl") || !d || (g = d[g], void 0 === g) ? a.BLACK : g
                };
                a.multiplyByAlpha = function (g, d) {
                    g = g.slice();
                    g[3] = Math.max(0, Math.min(g[3] * d, 1));
                    return g
                };
                a.Malloc = function (g, d) {
                    var h = a._malloc(d * g.BYTES_PER_ELEMENT);
                    return {
                        _ck: !0, length: d, byteOffset: h, qe: null, subarray: function (m, t) {
                            m = this.toTypedArray().subarray(m, t);
                            m._ck = !0;
                            return m
                        }, toTypedArray: function () {
                            if (this.qe &&
                                this.qe.length) return this.qe;
                            this.qe = new g(a.HEAPU8.buffer, h, d);
                            this.qe._ck = !0;
                            return this.qe
                        }
                    }
                };
                a.Free = function (g) {
                    a._free(g.byteOffset);
                    g.byteOffset = 0;
                    g.toTypedArray = null;
                    g.qe = null
                };
                var P = 0, aa, la = 0, X, ha = 0, Ea, ea, V = 0, Ub, Aa = 0, Vb, ub = 0, Wb, vb = 0, $a, Ma = 0, Xb,
                    tb = 0, Yb, Zb = 0, Vc = Float32Array.of(0, 0, 1);
                a.onRuntimeInitialized = function () {
                    function g(d, h, m, t, u, x, C) {
                        x || (x = 4 * t.width, t.colorType === a.ColorType.RGBA_F16 ? x *= 2 : t.colorType === a.ColorType.RGBA_F32 && (x *= 4));
                        var G = x * t.height;
                        var F = u ? u.byteOffset : a._malloc(G);
                        if (C ? !d._readPixels(t, F, x, h, m, C) : !d._readPixels(t, F, x, h, m)) return u || a._free(F), null;
                        if (u) return u.toTypedArray();
                        switch (t.colorType) {
                            case a.ColorType.RGBA_8888:
                            case a.ColorType.RGBA_F16:
                                d = (new Uint8Array(a.HEAPU8.buffer, F, G)).slice();
                                break;
                            case a.ColorType.RGBA_F32:
                                d = (new Float32Array(a.HEAPU8.buffer, F, G)).slice();
                                break;
                            default:
                                return null
                        }
                        a._free(F);
                        return d
                    }

                    Ea = a.Malloc(Float32Array, 4);
                    ha = Ea.byteOffset;
                    X = a.Malloc(Float32Array, 16);
                    la = X.byteOffset;
                    aa = a.Malloc(Float32Array, 9);
                    P = aa.byteOffset;
                    Xb = a.Malloc(Float32Array,
                        12);
                    tb = Xb.byteOffset;
                    Yb = a.Malloc(Float32Array, 12);
                    Zb = Yb.byteOffset;
                    ea = a.Malloc(Float32Array, 4);
                    V = ea.byteOffset;
                    Ub = a.Malloc(Float32Array, 4);
                    Aa = Ub.byteOffset;
                    Vb = a.Malloc(Float32Array, 3);
                    ub = Vb.byteOffset;
                    Wb = a.Malloc(Float32Array, 3);
                    vb = Wb.byteOffset;
                    $a = a.Malloc(Int32Array, 4);
                    Ma = $a.byteOffset;
                    a.ColorSpace.SRGB = a.ColorSpace._MakeSRGB();
                    a.ColorSpace.DISPLAY_P3 = a.ColorSpace._MakeDisplayP3();
                    a.ColorSpace.ADOBE_RGB = a.ColorSpace._MakeAdobeRGB();
                    a.GlyphRunFlags = {IsWhiteSpace: a._GlyphRunFlags_isWhiteSpace};
                    a.Path.MakeFromCmds =
                        function (d) {
                            var h = n(d, "HEAPF32"), m = a.Path._MakeFromCmds(h, d.length);
                            k(h, d);
                            return m
                        };
                    a.Path.MakeFromVerbsPointsWeights = function (d, h, m) {
                        var t = n(d, "HEAPU8"), u = n(h, "HEAPF32"), x = n(m, "HEAPF32"),
                            C = a.Path._MakeFromVerbsPointsWeights(t, d.length, u, h.length, x, m && m.length || 0);
                        k(t, d);
                        k(u, h);
                        k(x, m);
                        return C
                    };
                    a.Path.prototype.addArc = function (d, h, m) {
                        d = I(d);
                        this._addArc(d, h, m);
                        return this
                    };
                    a.Path.prototype.addCircle = function (d, h, m, t) {
                        this._addCircle(d, h, m, !!t);
                        return this
                    };
                    a.Path.prototype.addOval = function (d, h, m) {
                        void 0 ===
                        m && (m = 1);
                        d = I(d);
                        this._addOval(d, !!h, m);
                        return this
                    };
                    a.Path.prototype.addPath = function () {
                        var d = Array.prototype.slice.call(arguments), h = d[0], m = !1;
                        "boolean" === typeof d[d.length - 1] && (m = d.pop());
                        if (1 === d.length) this._addPath(h, 1, 0, 0, 0, 1, 0, 0, 0, 1, m); else if (2 === d.length) d = d[1], this._addPath(h, d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1, m); else if (7 === d.length || 10 === d.length) this._addPath(h, d[1], d[2], d[3], d[4], d[5], d[6], d[7] || 0, d[8] || 0, d[9] || 1, m); else return null;
                        return this
                    };
                    a.Path.prototype.addPoly =
                        function (d, h) {
                            var m = n(d, "HEAPF32");
                            this._addPoly(m, d.length / 2, h);
                            k(m, d);
                            return this
                        };
                    a.Path.prototype.addRect = function (d, h) {
                        d = I(d);
                        this._addRect(d, !!h);
                        return this
                    };
                    a.Path.prototype.addRRect = function (d, h) {
                        d = Q(d);
                        this._addRRect(d, !!h);
                        return this
                    };
                    a.Path.prototype.addVerbsPointsWeights = function (d, h, m) {
                        var t = n(d, "HEAPU8"), u = n(h, "HEAPF32"), x = n(m, "HEAPF32");
                        this._addVerbsPointsWeights(t, d.length, u, h.length, x, m && m.length || 0);
                        k(t, d);
                        k(u, h);
                        k(x, m)
                    };
                    a.Path.prototype.arc = function (d, h, m, t, u, x) {
                        d = a.LTRBRect(d -
                            m, h - m, d + m, h + m);
                        u = (u - t) / Math.PI * 180 - 360 * !!x;
                        x = new a.Path;
                        x.addArc(d, t / Math.PI * 180, u);
                        this.addPath(x, !0);
                        x.delete();
                        return this
                    };
                    a.Path.prototype.arcToOval = function (d, h, m, t) {
                        d = I(d);
                        this._arcToOval(d, h, m, t);
                        return this
                    };
                    a.Path.prototype.arcToRotated = function (d, h, m, t, u, x, C) {
                        this._arcToRotated(d, h, m, !!t, !!u, x, C);
                        return this
                    };
                    a.Path.prototype.arcToTangent = function (d, h, m, t, u) {
                        this._arcToTangent(d, h, m, t, u);
                        return this
                    };
                    a.Path.prototype.close = function () {
                        this._close();
                        return this
                    };
                    a.Path.prototype.conicTo =
                        function (d, h, m, t, u) {
                            this._conicTo(d, h, m, t, u);
                            return this
                        };
                    a.Path.prototype.computeTightBounds = function (d) {
                        this._computeTightBounds(V);
                        var h = ea.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.Path.prototype.cubicTo = function (d, h, m, t, u, x) {
                        this._cubicTo(d, h, m, t, u, x);
                        return this
                    };
                    a.Path.prototype.dash = function (d, h, m) {
                        return this._dash(d, h, m) ? this : null
                    };
                    a.Path.prototype.getBounds = function (d) {
                        this._getBounds(V);
                        var h = ea.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.Path.prototype.lineTo = function (d,
                                                        h) {
                        this._lineTo(d, h);
                        return this
                    };
                    a.Path.prototype.moveTo = function (d, h) {
                        this._moveTo(d, h);
                        return this
                    };
                    a.Path.prototype.offset = function (d, h) {
                        this._transform(1, 0, d, 0, 1, h, 0, 0, 1);
                        return this
                    };
                    a.Path.prototype.quadTo = function (d, h, m, t) {
                        this._quadTo(d, h, m, t);
                        return this
                    };
                    a.Path.prototype.rArcTo = function (d, h, m, t, u, x, C) {
                        this._rArcTo(d, h, m, t, u, x, C);
                        return this
                    };
                    a.Path.prototype.rConicTo = function (d, h, m, t, u) {
                        this._rConicTo(d, h, m, t, u);
                        return this
                    };
                    a.Path.prototype.rCubicTo = function (d, h, m, t, u, x) {
                        this._rCubicTo(d,
                            h, m, t, u, x);
                        return this
                    };
                    a.Path.prototype.rLineTo = function (d, h) {
                        this._rLineTo(d, h);
                        return this
                    };
                    a.Path.prototype.rMoveTo = function (d, h) {
                        this._rMoveTo(d, h);
                        return this
                    };
                    a.Path.prototype.rQuadTo = function (d, h, m, t) {
                        this._rQuadTo(d, h, m, t);
                        return this
                    };
                    a.Path.prototype.stroke = function (d) {
                        d = d || {};
                        d.width = d.width || 1;
                        d.miter_limit = d.miter_limit || 4;
                        d.cap = d.cap || a.StrokeCap.Butt;
                        d.join = d.join || a.StrokeJoin.Miter;
                        d.precision = d.precision || 1;
                        return this._stroke(d) ? this : null
                    };
                    a.Path.prototype.transform = function () {
                        if (1 ===
                            arguments.length) {
                            var d = arguments[0];
                            this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1)
                        } else if (6 === arguments.length || 9 === arguments.length) d = arguments, this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1); else throw "transform expected to take 1 or 9 arguments. Got " + arguments.length;
                        return this
                    };
                    a.Path.prototype.trim = function (d, h, m) {
                        return this._trim(d, h, !!m) ? this : null
                    };
                    a.Image.prototype.encodeToBytes = function (d, h) {
                        var m = a.Be();
                        d = d || a.ImageFormat.PNG;
                        h = h || 100;
                        return m ? this._encodeToBytes(d, h, m) : this._encodeToBytes(d, h)
                    };
                    a.Image.prototype.makeShaderCubic = function (d, h, m, t, u) {
                        u = p(u);
                        return this._makeShaderCubic(d, h, m, t, u)
                    };
                    a.Image.prototype.makeShaderOptions = function (d, h, m, t, u) {
                        u = p(u);
                        return this._makeShaderOptions(d, h, m, t, u)
                    };
                    a.Image.prototype.readPixels = function (d, h, m, t, u) {
                        var x = a.Be();
                        return g(this, d, h, m, t, u, x)
                    };
                    a.Canvas.prototype.clear = function (d) {
                        a.$d(this.Zd);
                        d = w(d);
                        this._clear(d)
                    };
                    a.Canvas.prototype.clipRRect = function (d, h, m) {
                        a.$d(this.Zd);
                        d = Q(d);
                        this._clipRRect(d,
                            h, m)
                    };
                    a.Canvas.prototype.clipRect = function (d, h, m) {
                        a.$d(this.Zd);
                        d = I(d);
                        this._clipRect(d, h, m)
                    };
                    a.Canvas.prototype.concat = function (d) {
                        a.$d(this.Zd);
                        d = v(d);
                        this._concat(d)
                    };
                    a.Canvas.prototype.drawArc = function (d, h, m, t, u) {
                        a.$d(this.Zd);
                        d = I(d);
                        this._drawArc(d, h, m, t, u)
                    };
                    a.Canvas.prototype.drawAtlas = function (d, h, m, t, u, x, C) {
                        if (d && t && h && m && h.length === m.length) {
                            a.$d(this.Zd);
                            u || (u = a.BlendMode.SrcOver);
                            var G = n(h, "HEAPF32"), F = n(m, "HEAPF32"), S = m.length / 4, T = n(c(x), "HEAPU32");
                            if (C && "B" in C && "C" in C) this._drawAtlasCubic(d,
                                F, G, T, S, u, C.B, C.C, t); else {
                                let q = a.FilterMode.Linear, y = a.MipmapMode.None;
                                C && (q = C.filter, "mipmap" in C && (y = C.mipmap));
                                this._drawAtlasOptions(d, F, G, T, S, u, q, y, t)
                            }
                            k(G, h);
                            k(F, m);
                            k(T, x)
                        }
                    };
                    a.Canvas.prototype.drawCircle = function (d, h, m, t) {
                        a.$d(this.Zd);
                        this._drawCircle(d, h, m, t)
                    };
                    a.Canvas.prototype.drawColor = function (d, h) {
                        a.$d(this.Zd);
                        d = w(d);
                        void 0 !== h ? this._drawColor(d, h) : this._drawColor(d)
                    };
                    a.Canvas.prototype.drawColorInt = function (d, h) {
                        a.$d(this.Zd);
                        this._drawColorInt(d, h || a.BlendMode.SrcOver)
                    };
                    a.Canvas.prototype.drawColorComponents =
                        function (d, h, m, t, u) {
                            a.$d(this.Zd);
                            d = A(d, h, m, t);
                            void 0 !== u ? this._drawColor(d, u) : this._drawColor(d)
                        };
                    a.Canvas.prototype.drawDRRect = function (d, h, m) {
                        a.$d(this.Zd);
                        d = Q(d, tb);
                        h = Q(h, Zb);
                        this._drawDRRect(d, h, m)
                    };
                    a.Canvas.prototype.drawImage = function (d, h, m, t) {
                        a.$d(this.Zd);
                        this._drawImage(d, h, m, t || null)
                    };
                    a.Canvas.prototype.drawImageCubic = function (d, h, m, t, u, x) {
                        a.$d(this.Zd);
                        this._drawImageCubic(d, h, m, t, u, x || null)
                    };
                    a.Canvas.prototype.drawImageOptions = function (d, h, m, t, u, x) {
                        a.$d(this.Zd);
                        this._drawImageOptions(d,
                            h, m, t, u, x || null)
                    };
                    a.Canvas.prototype.drawImageNine = function (d, h, m, t, u) {
                        a.$d(this.Zd);
                        h = n(h, "HEAP32", Ma);
                        m = I(m);
                        this._drawImageNine(d, h, m, t, u || null)
                    };
                    a.Canvas.prototype.drawImageRect = function (d, h, m, t, u) {
                        a.$d(this.Zd);
                        I(h, V);
                        I(m, Aa);
                        this._drawImageRect(d, V, Aa, t, !!u)
                    };
                    a.Canvas.prototype.drawImageRectCubic = function (d, h, m, t, u, x) {
                        a.$d(this.Zd);
                        I(h, V);
                        I(m, Aa);
                        this._drawImageRectCubic(d, V, Aa, t, u, x || null)
                    };
                    a.Canvas.prototype.drawImageRectOptions = function (d, h, m, t, u, x) {
                        a.$d(this.Zd);
                        I(h, V);
                        I(m, Aa);
                        this._drawImageRectOptions(d,
                            V, Aa, t, u, x || null)
                    };
                    a.Canvas.prototype.drawLine = function (d, h, m, t, u) {
                        a.$d(this.Zd);
                        this._drawLine(d, h, m, t, u)
                    };
                    a.Canvas.prototype.drawOval = function (d, h) {
                        a.$d(this.Zd);
                        d = I(d);
                        this._drawOval(d, h)
                    };
                    a.Canvas.prototype.drawPaint = function (d) {
                        a.$d(this.Zd);
                        this._drawPaint(d)
                    };
                    a.Canvas.prototype.drawParagraph = function (d, h, m) {
                        a.$d(this.Zd);
                        this._drawParagraph(d, h, m)
                    };
                    a.Canvas.prototype.drawPatch = function (d, h, m, t, u) {
                        if (24 > d.length) throw "Need 12 cubic points";
                        if (h && 4 > h.length) throw "Need 4 colors";
                        if (m && 8 > m.length) throw "Need 4 shader coordinates";
                        a.$d(this.Zd);
                        const x = n(d, "HEAPF32"), C = h ? n(c(h), "HEAPU32") : 0, G = m ? n(m, "HEAPF32") : 0;
                        t || (t = a.BlendMode.Modulate);
                        this._drawPatch(x, C, G, t, u);
                        k(G, m);
                        k(C, h);
                        k(x, d)
                    };
                    a.Canvas.prototype.drawPath = function (d, h) {
                        a.$d(this.Zd);
                        this._drawPath(d, h)
                    };
                    a.Canvas.prototype.drawPicture = function (d) {
                        a.$d(this.Zd);
                        this._drawPicture(d)
                    };
                    a.Canvas.prototype.drawPoints = function (d, h, m) {
                        a.$d(this.Zd);
                        var t = n(h, "HEAPF32");
                        this._drawPoints(d, t, h.length / 2, m);
                        k(t, h)
                    };
                    a.Canvas.prototype.drawRRect = function (d, h) {
                        a.$d(this.Zd);
                        d = Q(d);
                        this._drawRRect(d, h)
                    };
                    a.Canvas.prototype.drawRect = function (d, h) {
                        a.$d(this.Zd);
                        d = I(d);
                        this._drawRect(d, h)
                    };
                    a.Canvas.prototype.drawRect4f = function (d, h, m, t, u) {
                        a.$d(this.Zd);
                        this._drawRect4f(d, h, m, t, u)
                    };
                    a.Canvas.prototype.drawShadow = function (d, h, m, t, u, x, C) {
                        a.$d(this.Zd);
                        var G = n(u, "HEAPF32"), F = n(x, "HEAPF32");
                        h = n(h, "HEAPF32", ub);
                        m = n(m, "HEAPF32", vb);
                        this._drawShadow(d, h, m, t, G, F, C);
                        k(G, u);
                        k(F, x)
                    };
                    a.getShadowLocalBounds = function (d, h, m, t, u, x, C) {
                        d = p(d);
                        m = n(m, "HEAPF32", ub);
                        t = n(t, "HEAPF32", vb);
                        if (!this._getShadowLocalBounds(d,
                            h, m, t, u, x, V)) return null;
                        h = ea.toTypedArray();
                        return C ? (C.set(h), C) : h.slice()
                    };
                    a.Canvas.prototype.drawTextBlob = function (d, h, m, t) {
                        a.$d(this.Zd);
                        this._drawTextBlob(d, h, m, t)
                    };
                    a.Canvas.prototype.drawVertices = function (d, h, m) {
                        a.$d(this.Zd);
                        this._drawVertices(d, h, m)
                    };
                    a.Canvas.prototype.getDeviceClipBounds = function (d) {
                        this._getDeviceClipBounds(Ma);
                        var h = $a.toTypedArray();
                        d ? d.set(h) : d = h.slice();
                        return d
                    };
                    a.Canvas.prototype.quickReject = function (d) {
                        d = I(d);
                        return this._quickReject(d)
                    };
                    a.Canvas.prototype.getLocalToDevice =
                        function () {
                            this._getLocalToDevice(la);
                            for (var d = la, h = Array(16), m = 0; 16 > m; m++) h[m] = a.HEAPF32[d / 4 + m];
                            return h
                        };
                    a.Canvas.prototype.getTotalMatrix = function () {
                        this._getTotalMatrix(P);
                        for (var d = Array(9), h = 0; 9 > h; h++) d[h] = a.HEAPF32[P / 4 + h];
                        return d
                    };
                    a.Canvas.prototype.makeSurface = function (d) {
                        d = this._makeSurface(d);
                        d.Zd = this.Zd;
                        return d
                    };
                    a.Canvas.prototype.readPixels = function (d, h, m, t, u) {
                        a.$d(this.Zd);
                        return g(this, d, h, m, t, u)
                    };
                    a.Canvas.prototype.saveLayer = function (d, h, m, t, u) {
                        h = I(h);
                        return this._saveLayer(d ||
                            null, h, m || null, t || 0, u || a.TileMode.Clamp)
                    };
                    a.Canvas.prototype.writePixels = function (d, h, m, t, u, x, C, G) {
                        if (d.byteLength % (h * m)) throw "pixels length must be a multiple of the srcWidth * srcHeight";
                        a.$d(this.Zd);
                        var F = d.byteLength / (h * m);
                        x = x || a.AlphaType.Unpremul;
                        C = C || a.ColorType.RGBA_8888;
                        G = G || a.ColorSpace.SRGB;
                        var S = F * h;
                        F = n(d, "HEAPU8");
                        h = this._writePixels({
                            width: h,
                            height: m,
                            colorType: C,
                            alphaType: x,
                            colorSpace: G
                        }, F, S, t, u);
                        k(F, d);
                        return h
                    };
                    a.ColorFilter.MakeBlend = function (d, h, m) {
                        d = w(d);
                        m = m || a.ColorSpace.SRGB;
                        return a.ColorFilter._MakeBlend(d, h, m)
                    };
                    a.ColorFilter.MakeMatrix = function (d) {
                        if (!d || 20 !== d.length) throw "invalid color matrix";
                        var h = n(d, "HEAPF32"), m = a.ColorFilter._makeMatrix(h);
                        k(h, d);
                        return m
                    };
                    a.ContourMeasure.prototype.getPosTan = function (d, h) {
                        this._getPosTan(d, V);
                        d = ea.toTypedArray();
                        return h ? (h.set(d), h) : d.slice()
                    };
                    a.ImageFilter.prototype.getOutputBounds = function (d, h, m) {
                        d = I(d, V);
                        h = p(h);
                        this._getOutputBounds(d, h, Ma);
                        h = $a.toTypedArray();
                        return m ? (m.set(h), m) : h.slice()
                    };
                    a.ImageFilter.MakeDropShadow =
                        function (d, h, m, t, u, x) {
                            u = w(u, ha);
                            return a.ImageFilter._MakeDropShadow(d, h, m, t, u, x)
                        };
                    a.ImageFilter.MakeDropShadowOnly = function (d, h, m, t, u, x) {
                        u = w(u, ha);
                        return a.ImageFilter._MakeDropShadowOnly(d, h, m, t, u, x)
                    };
                    a.ImageFilter.MakeImage = function (d, h, m, t) {
                        m = I(m, V);
                        t = I(t, Aa);
                        if ("B" in h && "C" in h) return a.ImageFilter._MakeImageCubic(d, h.B, h.C, m, t);
                        const u = h.filter;
                        let x = a.MipmapMode.None;
                        "mipmap" in h && (x = h.mipmap);
                        return a.ImageFilter._MakeImageOptions(d, u, x, m, t)
                    };
                    a.ImageFilter.MakeMatrixTransform = function (d, h,
                                                                  m) {
                        d = p(d);
                        if ("B" in h && "C" in h) return a.ImageFilter._MakeMatrixTransformCubic(d, h.B, h.C, m);
                        const t = h.filter;
                        let u = a.MipmapMode.None;
                        "mipmap" in h && (u = h.mipmap);
                        return a.ImageFilter._MakeMatrixTransformOptions(d, t, u, m)
                    };
                    a.Paint.prototype.getColor = function () {
                        this._getColor(ha);
                        return D(ha)
                    };
                    a.Paint.prototype.setColor = function (d, h) {
                        h = h || null;
                        d = w(d);
                        this._setColor(d, h)
                    };
                    a.Paint.prototype.setColorComponents = function (d, h, m, t, u) {
                        u = u || null;
                        d = A(d, h, m, t);
                        this._setColor(d, u)
                    };
                    a.Path.prototype.getPoint = function (d,
                                                          h) {
                        this._getPoint(d, V);
                        d = ea.toTypedArray();
                        return h ? (h[0] = d[0], h[1] = d[1], h) : d.slice(0, 2)
                    };
                    a.Picture.prototype.makeShader = function (d, h, m, t, u) {
                        t = p(t);
                        u = I(u);
                        return this._makeShader(d, h, m, t, u)
                    };
                    a.Picture.prototype.cullRect = function (d) {
                        this._cullRect(V);
                        var h = ea.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.PictureRecorder.prototype.beginRecording = function (d, h) {
                        d = I(d);
                        return this._beginRecording(d, !!h)
                    };
                    a.Surface.prototype.getCanvas = function () {
                        var d = this._getCanvas();
                        d.Zd = this.Zd;
                        return d
                    };
                    a.Surface.prototype.makeImageSnapshot =
                        function (d) {
                            a.$d(this.Zd);
                            d = n(d, "HEAP32", Ma);
                            return this._makeImageSnapshot(d)
                        };
                    a.Surface.prototype.makeSurface = function (d) {
                        a.$d(this.Zd);
                        d = this._makeSurface(d);
                        d.Zd = this.Zd;
                        return d
                    };
                    a.Surface.prototype.Ze = function (d, h) {
                        this.te || (this.te = this.getCanvas());
                        return requestAnimationFrame(function () {
                            a.$d(this.Zd);
                            d(this.te);
                            this.flush(h)
                        }.bind(this))
                    };
                    a.Surface.prototype.requestAnimationFrame || (a.Surface.prototype.requestAnimationFrame = a.Surface.prototype.Ze);
                    a.Surface.prototype.We = function (d, h) {
                        this.te ||
                        (this.te = this.getCanvas());
                        requestAnimationFrame(function () {
                            a.$d(this.Zd);
                            d(this.te);
                            this.flush(h);
                            this.dispose()
                        }.bind(this))
                    };
                    a.Surface.prototype.drawOnce || (a.Surface.prototype.drawOnce = a.Surface.prototype.We);
                    a.PathEffect.MakeDash = function (d, h) {
                        h ||= 0;
                        if (!d.length || 1 === d.length % 2) throw "Intervals array must have even length";
                        var m = n(d, "HEAPF32");
                        h = a.PathEffect._MakeDash(m, d.length, h);
                        k(m, d);
                        return h
                    };
                    a.PathEffect.MakeLine2D = function (d, h) {
                        h = p(h);
                        return a.PathEffect._MakeLine2D(d, h)
                    };
                    a.PathEffect.MakePath2D =
                        function (d, h) {
                            d = p(d);
                            return a.PathEffect._MakePath2D(d, h)
                        };
                    a.Shader.MakeColor = function (d, h) {
                        h = h || null;
                        d = w(d);
                        return a.Shader._MakeColor(d, h)
                    };
                    a.Shader.Blend = a.Shader.MakeBlend;
                    a.Shader.Color = a.Shader.MakeColor;
                    a.Shader.MakeLinearGradient = function (d, h, m, t, u, x, C, G) {
                        G = G || null;
                        var F = l(m), S = n(t, "HEAPF32");
                        C = C || 0;
                        x = p(x);
                        var T = ea.toTypedArray();
                        T.set(d);
                        T.set(h, 2);
                        d = a.Shader._MakeLinearGradient(V, F.he, F.colorType, S, F.count, u, C, x, G);
                        k(F.he, m);
                        t && k(S, t);
                        return d
                    };
                    a.Shader.MakeRadialGradient = function (d, h, m,
                                                            t, u, x, C, G) {
                        G = G || null;
                        var F = l(m), S = n(t, "HEAPF32");
                        C = C || 0;
                        x = p(x);
                        d = a.Shader._MakeRadialGradient(d[0], d[1], h, F.he, F.colorType, S, F.count, u, C, x, G);
                        k(F.he, m);
                        t && k(S, t);
                        return d
                    };
                    a.Shader.MakeSweepGradient = function (d, h, m, t, u, x, C, G, F, S) {
                        S = S || null;
                        var T = l(m), q = n(t, "HEAPF32");
                        C = C || 0;
                        G = G || 0;
                        F = F || 360;
                        x = p(x);
                        d = a.Shader._MakeSweepGradient(d, h, T.he, T.colorType, q, T.count, u, G, F, C, x, S);
                        k(T.he, m);
                        t && k(q, t);
                        return d
                    };
                    a.Shader.MakeTwoPointConicalGradient = function (d, h, m, t, u, x, C, G, F, S) {
                        S = S || null;
                        var T = l(u), q = n(x, "HEAPF32");
                        F = F || 0;
                        G = p(G);
                        var y = ea.toTypedArray();
                        y.set(d);
                        y.set(m, 2);
                        d = a.Shader._MakeTwoPointConicalGradient(V, h, t, T.he, T.colorType, q, T.count, C, F, G, S);
                        k(T.he, u);
                        x && k(q, x);
                        return d
                    };
                    a.Vertices.prototype.bounds = function (d) {
                        this._bounds(V);
                        var h = ea.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.ce && a.ce.forEach(function (d) {
                        d()
                    })
                };
                a.computeTonalColors = function (g) {
                    var d = n(g.ambient, "HEAPF32"), h = n(g.spot, "HEAPF32");
                    this._computeTonalColors(d, h);
                    var m = {ambient: D(d), spot: D(h)};
                    k(d, g.ambient);
                    k(h, g.spot);
                    return m
                };
                a.LTRBRect = function (g, d, h, m) {
                    return Float32Array.of(g, d, h, m)
                };
                a.XYWHRect = function (g, d, h, m) {
                    return Float32Array.of(g, d, g + h, d + m)
                };
                a.LTRBiRect = function (g, d, h, m) {
                    return Int32Array.of(g, d, h, m)
                };
                a.XYWHiRect = function (g, d, h, m) {
                    return Int32Array.of(g, d, g + h, d + m)
                };
                a.RRectXY = function (g, d, h) {
                    return Float32Array.of(g[0], g[1], g[2], g[3], d, h, d, h, d, h, d, h)
                };
                a.MakeAnimatedImageFromEncoded = function (g) {
                    g = new Uint8Array(g);
                    var d = a._malloc(g.byteLength);
                    a.HEAPU8.set(g, d);
                    return (g = a._decodeAnimatedImage(d, g.byteLength)) ?
                        g : null
                };
                a.MakeImageFromEncoded = function (g) {
                    g = new Uint8Array(g);
                    var d = a._malloc(g.byteLength);
                    a.HEAPU8.set(g, d);
                    return (g = a._decodeImage(d, g.byteLength)) ? g : null
                };
                var ab = null;
                a.MakeImageFromCanvasImageSource = function (g) {
                    var d = g.width, h = g.height;
                    ab ||= document.createElement("canvas");
                    ab.width = d;
                    ab.height = h;
                    var m = ab.getContext("2d", {willReadFrequently: !0});
                    m.drawImage(g, 0, 0);
                    g = m.getImageData(0, 0, d, h);
                    return a.MakeImage({
                            width: d,
                            height: h,
                            alphaType: a.AlphaType.Unpremul,
                            colorType: a.ColorType.RGBA_8888,
                            colorSpace: a.ColorSpace.SRGB
                        },
                        g.data, 4 * d)
                };
                a.MakeImage = function (g, d, h) {
                    var m = a._malloc(d.length);
                    a.HEAPU8.set(d, m);
                    return a._MakeImage(g, m, d.length, h)
                };
                a.MakeVertices = function (g, d, h, m, t, u) {
                    var x = t && t.length || 0, C = 0;
                    h && h.length && (C |= 1);
                    m && m.length && (C |= 2);
                    void 0 === u || u || (C |= 4);
                    g = new a._VerticesBuilder(g, d.length / 2, x, C);
                    n(d, "HEAPF32", g.positions());
                    g.texCoords() && n(h, "HEAPF32", g.texCoords());
                    g.colors() && n(c(m), "HEAPU32", g.colors());
                    g.indices() && n(t, "HEAPU16", g.indices());
                    return g.detach()
                };
                (function (g) {
                    g.ce = g.ce || [];
                    g.ce.push(function () {
                        function d(q) {
                            q &&
                            (q.dir = 0 === q.dir ? g.TextDirection.RTL : g.TextDirection.LTR);
                            return q
                        }

                        function h(q) {
                            if (!q || !q.length) return [];
                            for (var y = [], M = 0; M < q.length; M += 5) {
                                var W = g.LTRBRect(q[M], q[M + 1], q[M + 2], q[M + 3]), wa = g.TextDirection.LTR;
                                0 === q[M + 4] && (wa = g.TextDirection.RTL);
                                y.push({rect: W, dir: wa})
                            }
                            g._free(q.byteOffset);
                            return y
                        }

                        function m(q) {
                            q = q || {};
                            void 0 === q.weight && (q.weight = g.FontWeight.Normal);
                            q.width = q.width || g.FontWidth.Normal;
                            q.slant = q.slant || g.FontSlant.Upright;
                            return q
                        }

                        function t(q) {
                            if (!q || !q.length) return 0;
                            for (var y =
                                [], M = 0; M < q.length; M++) {
                                var W = u(q[M]);
                                y.push(W)
                            }
                            return n(y, "HEAPU32")
                        }

                        function u(q) {
                            if (G[q]) return G[q];
                            var y = qa(q) + 1, M = g._malloc(y);
                            ra(q, M, y);
                            return G[q] = M
                        }

                        function x(q) {
                            q._colorPtr = w(q.color);
                            q._foregroundColorPtr = 0;
                            q._backgroundColorPtr = 0;
                            q._decorationColorPtr = 0;
                            q.foregroundColor && (q._foregroundColorPtr = w(q.foregroundColor, F));
                            q.backgroundColor && (q._backgroundColorPtr = w(q.backgroundColor, S));
                            q.decorationColor && (q._decorationColorPtr = w(q.decorationColor, T));
                            Array.isArray(q.fontFamilies) && q.fontFamilies.length ?
                                (q._fontFamiliesPtr = t(q.fontFamilies), q._fontFamiliesLen = q.fontFamilies.length) : (q._fontFamiliesPtr = 0, q._fontFamiliesLen = 0);
                            if (q.locale) {
                                var y = q.locale;
                                q._localePtr = u(y);
                                q._localeLen = qa(y)
                            } else q._localePtr = 0, q._localeLen = 0;
                            if (Array.isArray(q.shadows) && q.shadows.length) {
                                y = q.shadows;
                                var M = y.map(function (ma) {
                                    return ma.color || g.BLACK
                                }), W = y.map(function (ma) {
                                    return ma.blurRadius || 0
                                });
                                q._shadowLen = y.length;
                                for (var wa = g._malloc(8 * y.length), wb = wa / 4, xb = 0; xb < y.length; xb++) {
                                    var $b = y[xb].offset || [0, 0];
                                    g.HEAPF32[wb] =
                                        $b[0];
                                    g.HEAPF32[wb + 1] = $b[1];
                                    wb += 2
                                }
                                q._shadowColorsPtr = l(M).he;
                                q._shadowOffsetsPtr = wa;
                                q._shadowBlurRadiiPtr = n(W, "HEAPF32")
                            } else q._shadowLen = 0, q._shadowColorsPtr = 0, q._shadowOffsetsPtr = 0, q._shadowBlurRadiiPtr = 0;
                            Array.isArray(q.fontFeatures) && q.fontFeatures.length ? (y = q.fontFeatures, M = y.map(function (ma) {
                                return ma.name
                            }), W = y.map(function (ma) {
                                return ma.value
                            }), q._fontFeatureLen = y.length, q._fontFeatureNamesPtr = t(M), q._fontFeatureValuesPtr = n(W, "HEAPU32")) : (q._fontFeatureLen = 0, q._fontFeatureNamesPtr = 0, q._fontFeatureValuesPtr =
                                0);
                            Array.isArray(q.fontVariations) && q.fontVariations.length ? (y = q.fontVariations, M = y.map(function (ma) {
                                return ma.axis
                            }), W = y.map(function (ma) {
                                return ma.value
                            }), q._fontVariationLen = y.length, q._fontVariationAxesPtr = t(M), q._fontVariationValuesPtr = n(W, "HEAPF32")) : (q._fontVariationLen = 0, q._fontVariationAxesPtr = 0, q._fontVariationValuesPtr = 0)
                        }

                        function C(q) {
                            g._free(q._fontFamiliesPtr);
                            g._free(q._shadowColorsPtr);
                            g._free(q._shadowOffsetsPtr);
                            g._free(q._shadowBlurRadiiPtr);
                            g._free(q._fontFeatureNamesPtr);
                            g._free(q._fontFeatureValuesPtr);
                            g._free(q._fontVariationAxesPtr);
                            g._free(q._fontVariationValuesPtr)
                        }

                        g.Paragraph.prototype.getRectsForRange = function (q, y, M, W) {
                            q = this._getRectsForRange(q, y, M, W);
                            return h(q)
                        };
                        g.Paragraph.prototype.getRectsForPlaceholders = function () {
                            var q = this._getRectsForPlaceholders();
                            return h(q)
                        };
                        g.Paragraph.prototype.getGlyphInfoAt = function (q) {
                            return d(this._getGlyphInfoAt(q))
                        };
                        g.Paragraph.prototype.getClosestGlyphInfoAtCoordinate = function (q, y) {
                            return d(this._getClosestGlyphInfoAtCoordinate(q, y))
                        };
                        g.TypefaceFontProvider.prototype.registerFont =
                            function (q, y) {
                                q = g.Typeface.MakeTypefaceFromData(q);
                                if (!q) return null;
                                y = u(y);
                                this._registerFont(q, y);
                                q.delete()
                            };
                        g.ParagraphStyle = function (q) {
                            q.disableHinting = q.disableHinting || !1;
                            if (q.ellipsis) {
                                var y = q.ellipsis;
                                q._ellipsisPtr = u(y);
                                q._ellipsisLen = qa(y)
                            } else q._ellipsisPtr = 0, q._ellipsisLen = 0;
                            null == q.heightMultiplier && (q.heightMultiplier = -1);
                            q.maxLines = q.maxLines || 0;
                            q.replaceTabCharacters = q.replaceTabCharacters || !1;
                            y = (y = q.strutStyle) || {};
                            y.strutEnabled = y.strutEnabled || !1;
                            y.strutEnabled && Array.isArray(y.fontFamilies) &&
                            y.fontFamilies.length ? (y._fontFamiliesPtr = t(y.fontFamilies), y._fontFamiliesLen = y.fontFamilies.length) : (y._fontFamiliesPtr = 0, y._fontFamiliesLen = 0);
                            y.fontStyle = m(y.fontStyle);
                            null == y.fontSize && (y.fontSize = -1);
                            null == y.heightMultiplier && (y.heightMultiplier = -1);
                            y.halfLeading = y.halfLeading || !1;
                            y.leading = y.leading || 0;
                            y.forceStrutHeight = y.forceStrutHeight || !1;
                            q.strutStyle = y;
                            q.textAlign = q.textAlign || g.TextAlign.Start;
                            q.textDirection = q.textDirection || g.TextDirection.LTR;
                            q.textHeightBehavior = q.textHeightBehavior ||
                                g.TextHeightBehavior.All;
                            q.textStyle = g.TextStyle(q.textStyle);
                            q.applyRoundingHack = !1 !== q.applyRoundingHack;
                            return q
                        };
                        g.TextStyle = function (q) {
                            q.color || (q.color = g.BLACK);
                            q.decoration = q.decoration || 0;
                            q.decorationThickness = q.decorationThickness || 0;
                            q.decorationStyle = q.decorationStyle || g.DecorationStyle.Solid;
                            q.textBaseline = q.textBaseline || g.TextBaseline.Alphabetic;
                            null == q.fontSize && (q.fontSize = -1);
                            q.letterSpacing = q.letterSpacing || 0;
                            q.wordSpacing = q.wordSpacing || 0;
                            null == q.heightMultiplier && (q.heightMultiplier =
                                -1);
                            q.halfLeading = q.halfLeading || !1;
                            q.fontStyle = m(q.fontStyle);
                            return q
                        };
                        var G = {}, F = g._malloc(16), S = g._malloc(16), T = g._malloc(16);
                        g.ParagraphBuilder.Make = function (q, y) {
                            x(q.textStyle);
                            y = g.ParagraphBuilder._Make(q, y);
                            C(q.textStyle);
                            return y
                        };
                        g.ParagraphBuilder.MakeFromFontProvider = function (q, y) {
                            x(q.textStyle);
                            y = g.ParagraphBuilder._MakeFromFontProvider(q, y);
                            C(q.textStyle);
                            return y
                        };
                        g.ParagraphBuilder.MakeFromFontCollection = function (q, y) {
                            x(q.textStyle);
                            y = g.ParagraphBuilder._MakeFromFontCollection(q, y);
                            C(q.textStyle);
                            return y
                        };
                        g.ParagraphBuilder.ShapeText = function (q, y, M) {
                            let W = 0;
                            for (const wa of y) W += wa.length;
                            if (W !== q.length) throw "Accumulated block lengths must equal text.length";
                            return g.ParagraphBuilder._ShapeText(q, y, M)
                        };
                        g.ParagraphBuilder.prototype.pushStyle = function (q) {
                            x(q);
                            this._pushStyle(q);
                            C(q)
                        };
                        g.ParagraphBuilder.prototype.pushPaintStyle = function (q, y, M) {
                            x(q);
                            this._pushPaintStyle(q, y, M);
                            C(q)
                        };
                        g.ParagraphBuilder.prototype.addPlaceholder = function (q, y, M, W, wa) {
                            M = M || g.PlaceholderAlignment.Baseline;
                            W = W || g.TextBaseline.Alphabetic;
                            this._addPlaceholder(q || 0, y || 0, M, W, wa || 0)
                        };
                        g.ParagraphBuilder.prototype.setWordsUtf8 = function (q) {
                            var y = n(q, "HEAPU32");
                            this._setWordsUtf8(y, q && q.length || 0);
                            k(y, q)
                        };
                        g.ParagraphBuilder.prototype.setWordsUtf16 = function (q) {
                            var y = n(q, "HEAPU32");
                            this._setWordsUtf16(y, q && q.length || 0);
                            k(y, q)
                        };
                        g.ParagraphBuilder.prototype.setGraphemeBreaksUtf8 = function (q) {
                            var y = n(q, "HEAPU32");
                            this._setGraphemeBreaksUtf8(y, q && q.length || 0);
                            k(y, q)
                        };
                        g.ParagraphBuilder.prototype.setGraphemeBreaksUtf16 =
                            function (q) {
                                var y = n(q, "HEAPU32");
                                this._setGraphemeBreaksUtf16(y, q && q.length || 0);
                                k(y, q)
                            };
                        g.ParagraphBuilder.prototype.setLineBreaksUtf8 = function (q) {
                            var y = n(q, "HEAPU32");
                            this._setLineBreaksUtf8(y, q && q.length || 0);
                            k(y, q)
                        };
                        g.ParagraphBuilder.prototype.setLineBreaksUtf16 = function (q) {
                            var y = n(q, "HEAPU32");
                            this._setLineBreaksUtf16(y, q && q.length || 0);
                            k(y, q)
                        }
                    })
                })(r);
                a.ce = a.ce || [];
                a.ce.push(function () {
                    a.Path.prototype.op = function (g, d) {
                        return this._op(g, d) ? this : null
                    };
                    a.Path.prototype.simplify = function () {
                        return this._simplify() ?
                            this : null
                    }
                });
                a.ce = a.ce || [];
                a.ce.push(function () {
                    a.Canvas.prototype.drawText = function (g, d, h, m, t) {
                        var u = qa(g), x = a._malloc(u + 1);
                        ra(g, x, u + 1);
                        this._drawSimpleText(x, u, d, h, t, m);
                        a._free(x)
                    };
                    a.Canvas.prototype.drawGlyphs = function (g, d, h, m, t, u) {
                        if (!(2 * g.length <= d.length)) throw "Not enough positions for the array of gyphs";
                        a.$d(this.Zd);
                        const x = n(g, "HEAPU16"), C = n(d, "HEAPF32");
                        this._drawGlyphs(g.length, x, C, h, m, t, u);
                        k(C, d);
                        k(x, g)
                    };
                    a.Font.prototype.getGlyphBounds = function (g, d, h) {
                        var m = n(g, "HEAPU16"), t = a._malloc(16 *
                            g.length);
                        this._getGlyphWidthBounds(m, g.length, 0, t, d || null);
                        d = new Float32Array(a.HEAPU8.buffer, t, 4 * g.length);
                        k(m, g);
                        if (h) return h.set(d), a._free(t), h;
                        g = Float32Array.from(d);
                        a._free(t);
                        return g
                    };
                    a.Font.prototype.getGlyphIDs = function (g, d, h) {
                        d || (d = g.length);
                        var m = qa(g) + 1, t = a._malloc(m);
                        ra(g, t, m);
                        g = a._malloc(2 * d);
                        d = this._getGlyphIDs(t, m - 1, d, g);
                        a._free(t);
                        if (0 > d) return a._free(g), null;
                        t = new Uint16Array(a.HEAPU8.buffer, g, d);
                        if (h) return h.set(t), a._free(g), h;
                        h = Uint16Array.from(t);
                        a._free(g);
                        return h
                    };
                    a.Font.prototype.getGlyphIntercepts =
                        function (g, d, h, m) {
                            var t = n(g, "HEAPU16"), u = n(d, "HEAPF32");
                            return this._getGlyphIntercepts(t, g.length, !(g && g._ck), u, d.length, !(d && d._ck), h, m)
                        };
                    a.Font.prototype.getGlyphWidths = function (g, d, h) {
                        var m = n(g, "HEAPU16"), t = a._malloc(4 * g.length);
                        this._getGlyphWidthBounds(m, g.length, t, 0, d || null);
                        d = new Float32Array(a.HEAPU8.buffer, t, g.length);
                        k(m, g);
                        if (h) return h.set(d), a._free(t), h;
                        g = Float32Array.from(d);
                        a._free(t);
                        return g
                    };
                    a.FontMgr.FromData = function () {
                        if (!arguments.length) return null;
                        var g = arguments;
                        1 === g.length &&
                        Array.isArray(g[0]) && (g = arguments[0]);
                        if (!g.length) return null;
                        for (var d = [], h = [], m = 0; m < g.length; m++) {
                            var t = new Uint8Array(g[m]), u = n(t, "HEAPU8");
                            d.push(u);
                            h.push(t.byteLength)
                        }
                        d = n(d, "HEAPU32");
                        h = n(h, "HEAPU32");
                        g = a.FontMgr._fromData(d, h, g.length);
                        a._free(d);
                        a._free(h);
                        return g
                    };
                    a.Typeface.MakeTypefaceFromData = function (g) {
                        g = new Uint8Array(g);
                        var d = n(g, "HEAPU8");
                        return (g = a.Typeface._MakeTypefaceFromData(d, g.byteLength)) ? g : null
                    };
                    a.Typeface.MakeFreeTypeFaceFromData = a.Typeface.MakeTypefaceFromData;
                    a.Typeface.prototype.getGlyphIDs =
                        function (g, d, h) {
                            d || (d = g.length);
                            var m = qa(g) + 1, t = a._malloc(m);
                            ra(g, t, m);
                            g = a._malloc(2 * d);
                            d = this._getGlyphIDs(t, m - 1, d, g);
                            a._free(t);
                            if (0 > d) return a._free(g), null;
                            t = new Uint16Array(a.HEAPU8.buffer, g, d);
                            if (h) return h.set(t), a._free(g), h;
                            h = Uint16Array.from(t);
                            a._free(g);
                            return h
                        };
                    a.TextBlob.MakeOnPath = function (g, d, h, m) {
                        if (g && g.length && d && d.countPoints()) {
                            if (1 === d.countPoints()) return this.MakeFromText(g, h);
                            m ||= 0;
                            var t = h.getGlyphIDs(g);
                            t = h.getGlyphWidths(t);
                            var u = [];
                            d = new a.ContourMeasureIter(d, !1, 1);
                            for (var x =
                                d.next(), C = new Float32Array(4), G = 0; G < g.length && x; G++) {
                                var F = t[G];
                                m += F / 2;
                                if (m > x.length()) {
                                    x.delete();
                                    x = d.next();
                                    if (!x) {
                                        g = g.substring(0, G);
                                        break
                                    }
                                    m = F / 2
                                }
                                x.getPosTan(m, C);
                                var S = C[2], T = C[3];
                                u.push(S, T, C[0] - F / 2 * S, C[1] - F / 2 * T);
                                m += F / 2
                            }
                            g = this.MakeFromRSXform(g, u, h);
                            x && x.delete();
                            d.delete();
                            return g
                        }
                    };
                    a.TextBlob.MakeFromRSXform = function (g, d, h) {
                        var m = qa(g) + 1, t = a._malloc(m);
                        ra(g, t, m);
                        g = n(d, "HEAPF32");
                        h = a.TextBlob._MakeFromRSXform(t, m - 1, g, h);
                        a._free(t);
                        return h ? h : null
                    };
                    a.TextBlob.MakeFromRSXformGlyphs = function (g,
                                                                 d, h) {
                        var m = n(g, "HEAPU16");
                        d = n(d, "HEAPF32");
                        h = a.TextBlob._MakeFromRSXformGlyphs(m, 2 * g.length, d, h);
                        k(m, g);
                        return h ? h : null
                    };
                    a.TextBlob.MakeFromGlyphs = function (g, d) {
                        var h = n(g, "HEAPU16");
                        d = a.TextBlob._MakeFromGlyphs(h, 2 * g.length, d);
                        k(h, g);
                        return d ? d : null
                    };
                    a.TextBlob.MakeFromText = function (g, d) {
                        var h = qa(g) + 1, m = a._malloc(h);
                        ra(g, m, h);
                        g = a.TextBlob._MakeFromText(m, h - 1, d);
                        a._free(m);
                        return g ? g : null
                    };
                    a.MallocGlyphIDs = function (g) {
                        return a.Malloc(Uint16Array, g)
                    }
                });
                a.ce = a.ce || [];
                a.ce.push(function () {
                    a.MakePicture =
                        function (g) {
                            g = new Uint8Array(g);
                            var d = a._malloc(g.byteLength);
                            a.HEAPU8.set(g, d);
                            return (g = a._MakePicture(d, g.byteLength)) ? g : null
                        }
                });
                a.ce = a.ce || [];
                a.ce.push(function () {
                    a.RuntimeEffect.Make = function (g, d) {
                        return a.RuntimeEffect._Make(g, {
                            onError: d || function (h) {
                                console.log("RuntimeEffect error", h)
                            }
                        })
                    };
                    a.RuntimeEffect.MakeForBlender = function (g, d) {
                        return a.RuntimeEffect._MakeForBlender(g, {
                            onError: d || function (h) {
                                console.log("RuntimeEffect error", h)
                            }
                        })
                    };
                    a.RuntimeEffect.prototype.makeShader = function (g, d) {
                        var h =
                            !g._ck, m = n(g, "HEAPF32");
                        d = p(d);
                        return this._makeShader(m, 4 * g.length, h, d)
                    };
                    a.RuntimeEffect.prototype.makeShaderWithChildren = function (g, d, h) {
                        var m = !g._ck, t = n(g, "HEAPF32");
                        h = p(h);
                        for (var u = [], x = 0; x < d.length; x++) u.push(d[x].Yd.ae);
                        d = n(u, "HEAPU32");
                        return this._makeShaderWithChildren(t, 4 * g.length, m, d, u.length, h)
                    };
                    a.RuntimeEffect.prototype.makeBlender = function (g) {
                        var d = !g._ck, h = n(g, "HEAPF32");
                        return this._makeBlender(h, 4 * g.length, d)
                    }
                })
            })(r);
            var sa = Object.assign({}, r), ta = "", ua, va;
            if (fa || ia) ia ? ta = self.location.href : "undefined" != typeof document && document.currentScript && (ta = document.currentScript.src), _scriptName && (ta = _scriptName), ta.startsWith("blob:") ? ta = "" : ta = ta.substr(0, ta.replace(/[?#].*/, "").lastIndexOf("/") + 1), ia && (va = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response)
            }), ua = a => fetch(a, {credentials: "same-origin"}).then(b => b.ok ? b.arrayBuffer() : Promise.reject(Error(b.status + " : " + b.url)));
            var xa = console.log.bind(console), ya = console.error.bind(console);
            Object.assign(r, sa);
            sa = null;
            var za, Ba = !1, Ca, B, Da, Fa, E, H, J, Ga;

            function Ha() {
                var a = za.buffer;
                r.HEAP8 = Ca = new Int8Array(a);
                r.HEAP16 = Da = new Int16Array(a);
                r.HEAPU8 = B = new Uint8Array(a);
                r.HEAPU16 = Fa = new Uint16Array(a);
                r.HEAP32 = E = new Int32Array(a);
                r.HEAPU32 = H = new Uint32Array(a);
                r.HEAPF32 = J = new Float32Array(a);
                r.HEAPF64 = Ga = new Float64Array(a)
            }

            var Ia = [], Ja = [], Ka = [], La = 0, Na = null, Oa = null;

            function Pa(a) {
                a = "Aborted(" + a + ")";
                ya(a);
                Ba = !0;
                a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
                ca(a);
                throw a;
            }

            var Qa = a => a.startsWith("data:application/octet-stream;base64,"), Ra;

            function Sa(a) {
                return ua(a).then(b => new Uint8Array(b), () => {
                    if (va) var b = va(a); else throw "both async and sync fetching of the wasm failed";
                    return b
                })
            }

            function Ta(a, b, c) {
                return Sa(a).then(e => WebAssembly.instantiate(e, b)).then(c, e => {
                    ya(`failed to asynchronously prepare wasm: ${e}`);
                    Pa(e)
                })
            }

            function Ua(a, b) {
                var c = Ra;
                return "function" != typeof WebAssembly.instantiateStreaming || Qa(c) || "function" != typeof fetch ? Ta(c, a, b) : fetch(c, {credentials: "same-origin"}).then(e => WebAssembly.instantiateStreaming(e, a).then(b, function (f) {
                    ya(`wasm streaming compile failed: ${f}`);
                    ya("falling back to ArrayBuffer instantiation");
                    return Ta(c, a, b)
                }))
            }

            function Va(a) {
                this.name = "ExitStatus";
                this.message = `Program terminated with exit(${a})`;
                this.status = a
            }

            var Wa = a => {
                a.forEach(b => b(r))
            }, Xa = r.noExitRuntime || !0;

            class Ya {
                constructor(a) {
                    this.ae = a - 24
                }
            }

            var Za = 0, bb = 0, cb = "undefined" != typeof TextDecoder ? new TextDecoder : void 0,
                db = (a, b = 0, c = NaN) => {
                    var e = b + c;
                    for (c = b; a[c] && !(c >= e);) ++c;
                    if (16 < c - b && a.buffer && cb) return cb.decode(a.subarray(b, c));
                    for (e = ""; b < c;) {
                        var f = a[b++];
                        if (f & 128) {
                            var k = a[b++] & 63;
                            if (192 == (f & 224)) e += String.fromCharCode((f & 31) << 6 | k); else {
                                var n = a[b++] & 63;
                                f = 224 == (f & 240) ? (f & 15) << 12 | k << 6 | n : (f & 7) << 18 | k << 12 | n << 6 | a[b++] & 63;
                                65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023))
                            }
                        } else e += String.fromCharCode(f)
                    }
                    return e
                },
                eb = {}, fb = a => {
                    for (; a.length;) {
                        var b = a.pop();
                        a.pop()(b)
                    }
                };

            function gb(a) {
                return this.fromWireType(H[a >> 2])
            }

            var hb = {}, ib = {}, jb = {}, kb, mb = (a, b, c) => {
                function e(l) {
                    l = c(l);
                    if (l.length !== a.length) throw new kb("Mismatched type converter count");
                    for (var p = 0; p < a.length; ++p) lb(a[p], l[p])
                }

                a.forEach(l => jb[l] = b);
                var f = Array(b.length), k = [], n = 0;
                b.forEach((l, p) => {
                    ib.hasOwnProperty(l) ? f[p] = ib[l] : (k.push(l), hb.hasOwnProperty(l) || (hb[l] = []), hb[l].push(() => {
                        f[p] = ib[l];
                        ++n;
                        n === k.length && e(f)
                    }))
                });
                0 === k.length && e(f)
            }, nb, K = a => {
                for (var b = ""; B[a];) b += nb[B[a++]];
                return b
            }, L;

            function ob(a, b, c = {}) {
                var e = b.name;
                if (!a) throw new L(`type "${e}" must have a positive integer typeid pointer`);
                if (ib.hasOwnProperty(a)) {
                    if (c.lf) return;
                    throw new L(`Cannot register type '${e}' twice`);
                }
                ib[a] = b;
                delete jb[a];
                hb.hasOwnProperty(a) && (b = hb[a], delete hb[a], b.forEach(f => f()))
            }

            function lb(a, b, c = {}) {
                return ob(a, b, c)
            }

            var pb = a => {
                throw new L(a.Yd.de.be.name + " instance already deleted");
            }, qb = !1, rb = () => {
            }, sb = (a, b, c) => {
                if (b === c) return a;
                if (void 0 === c.ge) return null;
                a = sb(a, b, c.ge);
                return null === a ? null : c.cf(a)
            }, yb = {}, zb = {}, Ab = (a, b) => {
                if (void 0 === b) throw new L("ptr should not be undefined");
                for (; a.ge;) b = a.ye(b), a = a.ge;
                return zb[b]
            }, Cb = (a, b) => {
                if (!b.de || !b.ae) throw new kb("makeClassHandle requires ptr and ptrType");
                if (!!b.ie !== !!b.ee) throw new kb("Both smartPtrType and smartPtr must be specified");
                b.count = {value: 1};
                return Bb(Object.create(a,
                    {Yd: {value: b, writable: !0}}))
            }, Bb = a => {
                if ("undefined" === typeof FinalizationRegistry) return Bb = b => b, a;
                qb = new FinalizationRegistry(b => {
                    b = b.Yd;
                    --b.count.value;
                    0 === b.count.value && (b.ee ? b.ie.ne(b.ee) : b.de.be.ne(b.ae))
                });
                Bb = b => {
                    var c = b.Yd;
                    c.ee && qb.register(b, {Yd: c}, b);
                    return b
                };
                rb = b => {
                    qb.unregister(b)
                };
                return Bb(a)
            }, Db = [];

            function Eb() {
            }

            var Fb = (a, b) => Object.defineProperty(b, "name", {value: a}), Gb = (a, b, c) => {
                if (void 0 === a[b].fe) {
                    var e = a[b];
                    a[b] = function (...f) {
                        if (!a[b].fe.hasOwnProperty(f.length)) throw new L(`Function '${c}' called with an invalid number of arguments (${f.length}) - expects one of (${a[b].fe})!`);
                        return a[b].fe[f.length].apply(this, f)
                    };
                    a[b].fe = [];
                    a[b].fe[e.oe] = e
                }
            }, Hb = (a, b, c) => {
                if (r.hasOwnProperty(a)) {
                    if (void 0 === c || void 0 !== r[a].fe && void 0 !== r[a].fe[c]) throw new L(`Cannot register public name '${a}' twice`);
                    Gb(r, a, a);
                    if (r[a].fe.hasOwnProperty(c)) throw new L(`Cannot register multiple overloads of a function with the same number of arguments (${c})!`);
                    r[a].fe[c] = b
                } else r[a] = b, r[a].oe = c
            }, Ib = a => {
                a = a.replace(/[^a-zA-Z0-9_]/g, "$");
                var b = a.charCodeAt(0);
                return 48 <= b && 57 >= b ? `_${a}` : a
            };

            function Jb(a, b, c, e, f, k, n, l) {
                this.name = a;
                this.constructor = b;
                this.se = c;
                this.ne = e;
                this.ge = f;
                this.ff = k;
                this.ye = n;
                this.cf = l;
                this.pf = []
            }

            var Kb = (a, b, c) => {
                for (; b !== c;) {
                    if (!b.ye) throw new L(`Expected null or instance of ${c.name}, got an instance of ${b.name}`);
                    a = b.ye(a);
                    b = b.ge
                }
                return a
            };

            function Lb(a, b) {
                if (null === b) {
                    if (this.Ke) throw new L(`null is not a valid ${this.name}`);
                    return 0
                }
                if (!b.Yd) throw new L(`Cannot pass "${Mb(b)}" as a ${this.name}`);
                if (!b.Yd.ae) throw new L(`Cannot pass deleted object as a pointer of type ${this.name}`);
                return Kb(b.Yd.ae, b.Yd.de.be, this.be)
            }

            function Nb(a, b) {
                if (null === b) {
                    if (this.Ke) throw new L(`null is not a valid ${this.name}`);
                    if (this.De) {
                        var c = this.Le();
                        null !== a && a.push(this.ne, c);
                        return c
                    }
                    return 0
                }
                if (!b || !b.Yd) throw new L(`Cannot pass "${Mb(b)}" as a ${this.name}`);
                if (!b.Yd.ae) throw new L(`Cannot pass deleted object as a pointer of type ${this.name}`);
                if (!this.Ce && b.Yd.de.Ce) throw new L(`Cannot convert argument of type ${b.Yd.ie ? b.Yd.ie.name : b.Yd.de.name} to parameter type ${this.name}`);
                c = Kb(b.Yd.ae, b.Yd.de.be, this.be);
                if (this.De) {
                    if (void 0 ===
                        b.Yd.ee) throw new L("Passing raw pointer to smart pointer is illegal");
                    switch (this.uf) {
                        case 0:
                            if (b.Yd.ie === this) c = b.Yd.ee; else throw new L(`Cannot convert argument of type ${b.Yd.ie ? b.Yd.ie.name : b.Yd.de.name} to parameter type ${this.name}`);
                            break;
                        case 1:
                            c = b.Yd.ee;
                            break;
                        case 2:
                            if (b.Yd.ie === this) c = b.Yd.ee; else {
                                var e = b.clone();
                                c = this.qf(c, Ob(() => e["delete"]()));
                                null !== a && a.push(this.ne, c)
                            }
                            break;
                        default:
                            throw new L("Unsupporting sharing policy");
                    }
                }
                return c
            }

            function Pb(a, b) {
                if (null === b) {
                    if (this.Ke) throw new L(`null is not a valid ${this.name}`);
                    return 0
                }
                if (!b.Yd) throw new L(`Cannot pass "${Mb(b)}" as a ${this.name}`);
                if (!b.Yd.ae) throw new L(`Cannot pass deleted object as a pointer of type ${this.name}`);
                if (b.Yd.de.Ce) throw new L(`Cannot convert argument of type ${b.Yd.de.name} to parameter type ${this.name}`);
                return Kb(b.Yd.ae, b.Yd.de.be, this.be)
            }

            function Qb(a, b, c, e, f, k, n, l, p, v, w) {
                this.name = a;
                this.be = b;
                this.Ke = c;
                this.Ce = e;
                this.De = f;
                this.nf = k;
                this.uf = n;
                this.Se = l;
                this.Le = p;
                this.qf = v;
                this.ne = w;
                f || void 0 !== b.ge ? this.toWireType = Nb : (this.toWireType = e ? Lb : Pb, this.ke = null)
            }

            var Rb = (a, b, c) => {
                if (!r.hasOwnProperty(a)) throw new kb("Replacing nonexistent public symbol");
                void 0 !== r[a].fe && void 0 !== c ? r[a].fe[c] = b : (r[a] = b, r[a].oe = c)
            }, N, Sb = (a, b, c = []) => {
                a.includes("j") ? (a = a.replace(/p/g, "i"), b = (0, r["dynCall_" + a])(b, ...c)) : b = N.get(b)(...c);
                return b
            }, Tb = (a, b) => (...c) => Sb(a, b, c), O = (a, b) => {
                a = K(a);
                var c = a.includes("j") ? Tb(a, b) : N.get(b);
                if ("function" != typeof c) throw new L(`unknown function pointer with signature ${a}: ${b}`);
                return c
            }, ac, dc = a => {
                a = bc(a);
                var b = K(a);
                cc(a);
                return b
            }, ec =
                (a, b) => {
                    function c(k) {
                        f[k] || ib[k] || (jb[k] ? jb[k].forEach(c) : (e.push(k), f[k] = !0))
                    }

                    var e = [], f = {};
                    b.forEach(c);
                    throw new ac(`${a}: ` + e.map(dc).join([", "]));
                };

            function fc(a) {
                for (var b = 1; b < a.length; ++b) if (null !== a[b] && void 0 === a[b].ke) return !0;
                return !1
            }

            function gc(a, b, c, e, f) {
                var k = b.length;
                if (2 > k) throw new L("argTypes array size mismatch! Must at least get return value and 'this' types!");
                var n = null !== b[1] && null !== c, l = fc(b), p = "void" !== b[0].name, v = k - 2, w = Array(v),
                    A = [], D = [];
                return Fb(a, function (...I) {
                    D.length = 0;
                    A.length = n ? 2 : 1;
                    A[0] = f;
                    if (n) {
                        var Q = b[1].toWireType(D, this);
                        A[1] = Q
                    }
                    for (var P = 0; P < v; ++P) w[P] = b[P + 2].toWireType(D, I[P]), A.push(w[P]);
                    I = e(...A);
                    if (l) fb(D); else for (P = n ? 1 : 2; P < b.length; P++) {
                        var aa = 1 === P ? Q : w[P - 2];
                        null !== b[P].ke && b[P].ke(aa)
                    }
                    Q = p ? b[0].fromWireType(I) :
                        void 0;
                    return Q
                })
            }

            var hc = (a, b) => {
                    for (var c = [], e = 0; e < a; e++) c.push(H[b + 4 * e >> 2]);
                    return c
                }, ic = a => {
                    a = a.trim();
                    const b = a.indexOf("(");
                    return -1 !== b ? a.substr(0, b) : a
                }, jc = [], kc = [], lc = a => {
                    9 < a && 0 === --kc[a + 1] && (kc[a] = void 0, jc.push(a))
                }, mc = a => {
                    if (!a) throw new L("Cannot use deleted val. handle = " + a);
                    return kc[a]
                }, Ob = a => {
                    switch (a) {
                        case void 0:
                            return 2;
                        case null:
                            return 4;
                        case !0:
                            return 6;
                        case !1:
                            return 8;
                        default:
                            const b = jc.pop() || kc.length;
                            kc[b] = a;
                            kc[b + 1] = 1;
                            return b
                    }
                }, nc = {
                    name: "emscripten::val", fromWireType: a => {
                        var b = mc(a);
                        lc(a);
                        return b
                    }, toWireType: (a, b) => Ob(b), je: 8, readValueFromPointer: gb, ke: null
                }, oc = (a, b, c) => {
                    switch (b) {
                        case 1:
                            return c ? function (e) {
                                return this.fromWireType(Ca[e])
                            } : function (e) {
                                return this.fromWireType(B[e])
                            };
                        case 2:
                            return c ? function (e) {
                                return this.fromWireType(Da[e >> 1])
                            } : function (e) {
                                return this.fromWireType(Fa[e >> 1])
                            };
                        case 4:
                            return c ? function (e) {
                                return this.fromWireType(E[e >> 2])
                            } : function (e) {
                                return this.fromWireType(H[e >> 2])
                            };
                        default:
                            throw new TypeError(`invalid integer width (${b}): ${a}`);
                    }
                }, pc = (a, b) => {
                    var c = ib[a];
                    if (void 0 === c) throw a = `${b} has unknown type ${dc(a)}`, new L(a);
                    return c
                }, Mb = a => {
                    if (null === a) return "null";
                    var b = typeof a;
                    return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
                }, qc = (a, b) => {
                    switch (b) {
                        case 4:
                            return function (c) {
                                return this.fromWireType(J[c >> 2])
                            };
                        case 8:
                            return function (c) {
                                return this.fromWireType(Ga[c >> 3])
                            };
                        default:
                            throw new TypeError(`invalid float width (${b}): ${a}`);
                    }
                }, rc = (a, b, c) => {
                    switch (b) {
                        case 1:
                            return c ? e => Ca[e] : e => B[e];
                        case 2:
                            return c ? e => Da[e >> 1] : e => Fa[e >>
                            1];
                        case 4:
                            return c ? e => E[e >> 2] : e => H[e >> 2];
                        default:
                            throw new TypeError(`invalid integer width (${b}): ${a}`);
                    }
                }, ra = (a, b, c) => {
                    var e = B;
                    if (!(0 < c)) return 0;
                    var f = b;
                    c = b + c - 1;
                    for (var k = 0; k < a.length; ++k) {
                        var n = a.charCodeAt(k);
                        if (55296 <= n && 57343 >= n) {
                            var l = a.charCodeAt(++k);
                            n = 65536 + ((n & 1023) << 10) | l & 1023
                        }
                        if (127 >= n) {
                            if (b >= c) break;
                            e[b++] = n
                        } else {
                            if (2047 >= n) {
                                if (b + 1 >= c) break;
                                e[b++] = 192 | n >> 6
                            } else {
                                if (65535 >= n) {
                                    if (b + 2 >= c) break;
                                    e[b++] = 224 | n >> 12
                                } else {
                                    if (b + 3 >= c) break;
                                    e[b++] = 240 | n >> 18;
                                    e[b++] = 128 | n >> 12 & 63
                                }
                                e[b++] = 128 | n >> 6 &
                                    63
                            }
                            e[b++] = 128 | n & 63
                        }
                    }
                    e[b] = 0;
                    return b - f
                }, qa = a => {
                    for (var b = 0, c = 0; c < a.length; ++c) {
                        var e = a.charCodeAt(c);
                        127 >= e ? b++ : 2047 >= e ? b += 2 : 55296 <= e && 57343 >= e ? (b += 4, ++c) : b += 3
                    }
                    return b
                }, sc = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, tc = (a, b) => {
                    var c = a >> 1;
                    for (var e = c + b / 2; !(c >= e) && Fa[c];) ++c;
                    c <<= 1;
                    if (32 < c - a && sc) return sc.decode(B.subarray(a, c));
                    c = "";
                    for (e = 0; !(e >= b / 2); ++e) {
                        var f = Da[a + 2 * e >> 1];
                        if (0 == f) break;
                        c += String.fromCharCode(f)
                    }
                    return c
                }, uc = (a, b, c) => {
                    c ??= 2147483647;
                    if (2 > c) return 0;
                    c -= 2;
                    var e =
                        b;
                    c = c < 2 * a.length ? c / 2 : a.length;
                    for (var f = 0; f < c; ++f) Da[b >> 1] = a.charCodeAt(f), b += 2;
                    Da[b >> 1] = 0;
                    return b - e
                }, vc = a => 2 * a.length, wc = (a, b) => {
                    for (var c = 0, e = ""; !(c >= b / 4);) {
                        var f = E[a + 4 * c >> 2];
                        if (0 == f) break;
                        ++c;
                        65536 <= f ? (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : e += String.fromCharCode(f)
                    }
                    return e
                }, xc = (a, b, c) => {
                    c ??= 2147483647;
                    if (4 > c) return 0;
                    var e = b;
                    c = e + c - 4;
                    for (var f = 0; f < a.length; ++f) {
                        var k = a.charCodeAt(f);
                        if (55296 <= k && 57343 >= k) {
                            var n = a.charCodeAt(++f);
                            k = 65536 + ((k & 1023) << 10) | n & 1023
                        }
                        E[b >> 2] = k;
                        b +=
                            4;
                        if (b + 4 > c) break
                    }
                    E[b >> 2] = 0;
                    return b - e
                }, yc = a => {
                    for (var b = 0, c = 0; c < a.length; ++c) {
                        var e = a.charCodeAt(c);
                        55296 <= e && 57343 >= e && ++c;
                        b += 4
                    }
                    return b
                }, zc = (a, b, c) => {
                    var e = [];
                    a = a.toWireType(e, c);
                    e.length && (H[b >> 2] = Ob(e));
                    return a
                }, Ac = [], Bc = {}, Cc = a => {
                    var b = Bc[a];
                    return void 0 === b ? K(a) : b
                }, Dc = () => {
                    function a(b) {
                        b.$$$embind_global$$$ = b;
                        var c = "object" == typeof $$$embind_global$$$ && b.$$$embind_global$$$ == b;
                        c || delete b.$$$embind_global$$$;
                        return c
                    }

                    if ("object" == typeof globalThis) return globalThis;
                    if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
                    "object" == typeof global && a(global) ? $$$embind_global$$$ = global : "object" == typeof self && a(self) && ($$$embind_global$$$ = self);
                    if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
                    throw Error("unable to get global object.");
                }, Ec = a => {
                    var b = Ac.length;
                    Ac.push(a);
                    return b
                }, Fc = (a, b) => {
                    for (var c = Array(a), e = 0; e < a; ++e) c[e] = pc(H[b + 4 * e >> 2], "parameter " + e);
                    return c
                }, Gc = Reflect.construct, R, Hc = a => {
                    var b = a.getExtension("ANGLE_instanced_arrays");
                    b && (a.vertexAttribDivisor = (c, e) => b.vertexAttribDivisorANGLE(c,
                        e), a.drawArraysInstanced = (c, e, f, k) => b.drawArraysInstancedANGLE(c, e, f, k), a.drawElementsInstanced = (c, e, f, k, n) => b.drawElementsInstancedANGLE(c, e, f, k, n))
                }, Ic = a => {
                    var b = a.getExtension("OES_vertex_array_object");
                    b && (a.createVertexArray = () => b.createVertexArrayOES(), a.deleteVertexArray = c => b.deleteVertexArrayOES(c), a.bindVertexArray = c => b.bindVertexArrayOES(c), a.isVertexArray = c => b.isVertexArrayOES(c))
                }, Jc = a => {
                    var b = a.getExtension("WEBGL_draw_buffers");
                    b && (a.drawBuffers = (c, e) => b.drawBuffersWEBGL(c, e))
                }, Kc = a => {
                    var b = "ANGLE_instanced_arrays EXT_blend_minmax EXT_disjoint_timer_query EXT_frag_depth EXT_shader_texture_lod EXT_sRGB OES_element_index_uint OES_fbo_render_mipmap OES_standard_derivatives OES_texture_float OES_texture_half_float OES_texture_half_float_linear OES_vertex_array_object WEBGL_color_buffer_float WEBGL_depth_texture WEBGL_draw_buffers EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" ");
                    return (a.getSupportedExtensions() || []).filter(c => b.includes(c))
                }, Lc = 1, Mc = [], Nc = [], Oc = [], Pc = [], ka = [], Qc = [], Rc = [], pa = [], Sc = [], Tc = [],
                Uc = [], Wc = {}, Xc = {}, Yc = 4, Zc = 0, ja = a => {
                    for (var b = Lc++, c = a.length; c < b; c++) a[c] = null;
                    return b
                }, $c = (a, b, c, e) => {
                    for (var f = 0; f < a; f++) {
                        var k = R[c](), n = k && ja(e);
                        k ? (k.name = n, e[n] = k) : U ||= 1282;
                        E[b + 4 * f >> 2] = n
                    }
                }, na = (a, b) => {
                    a.Ne || (a.Ne = a.getContext, a.getContext = function (e, f) {
                        f = a.Ne(e, f);
                        return "webgl" == e == f instanceof WebGLRenderingContext ? f : null
                    });
                    var c = 1 < b.majorVersion ? a.getContext("webgl2",
                        b) : a.getContext("webgl", b);
                    return c ? ad(c, b) : 0
                }, ad = (a, b) => {
                    var c = ja(pa), e = {handle: c, attributes: b, version: b.majorVersion, le: a};
                    a.canvas && (a.canvas.Ve = e);
                    pa[c] = e;
                    ("undefined" == typeof b.df || b.df) && bd(e);
                    return c
                }, oa = a => {
                    z = pa[a];
                    r.vf = R = z?.le;
                    return !(a && !R)
                }, bd = a => {
                    a ||= z;
                    if (!a.mf) {
                        a.mf = !0;
                        var b = a.le;
                        b.zf = b.getExtension("WEBGL_multi_draw");
                        b.xf = b.getExtension("EXT_polygon_offset_clamp");
                        b.wf = b.getExtension("EXT_clip_control");
                        b.Bf = b.getExtension("WEBGL_polygon_mode");
                        Hc(b);
                        Ic(b);
                        Jc(b);
                        b.Pe = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
                        b.Re = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
                        2 <= a.version && (b.me = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                        if (2 > a.version || !b.me) b.me = b.getExtension("EXT_disjoint_timer_query");
                        Kc(b).forEach(c => {
                            c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
                        })
                    }
                }, z, U, cd = (a, b) => {
                    R.bindFramebuffer(a, Oc[b])
                }, dd = a => {
                    R.bindVertexArray(Rc[a])
                }, ed = a => R.clear(a), fd = (a, b, c, e) => R.clearColor(a, b, c, e), gd = a => R.clearStencil(a),
                hd = (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var e = E[b +
                        4 * c >> 2];
                        R.deleteVertexArray(Rc[e]);
                        Rc[e] = null
                    }
                }, jd = [], kd = (a, b) => {
                    $c(a, b, "createVertexArray", Rc)
                };

            function ld() {
                var a = Kc(R);
                return a = a.concat(a.map(b => "GL_" + b))
            }

            var md = (a, b, c) => {
                if (b) {
                    var e = void 0;
                    switch (a) {
                        case 36346:
                            e = 1;
                            break;
                        case 36344:
                            0 != c && 1 != c && (U ||= 1280);
                            return;
                        case 34814:
                        case 36345:
                            e = 0;
                            break;
                        case 34466:
                            var f = R.getParameter(34467);
                            e = f ? f.length : 0;
                            break;
                        case 33309:
                            if (2 > z.version) {
                                U ||= 1282;
                                return
                            }
                            e = ld().length;
                            break;
                        case 33307:
                        case 33308:
                            if (2 > z.version) {
                                U ||= 1280;
                                return
                            }
                            e = 33307 == a ? 3 : 0
                    }
                    if (void 0 === e) switch (f = R.getParameter(a), typeof f) {
                        case "number":
                            e = f;
                            break;
                        case "boolean":
                            e = f ? 1 : 0;
                            break;
                        case "string":
                            U ||= 1280;
                            return;
                        case "object":
                            if (null === f) switch (a) {
                                case 34964:
                                case 35725:
                                case 34965:
                                case 36006:
                                case 36007:
                                case 32873:
                                case 34229:
                                case 36662:
                                case 36663:
                                case 35053:
                                case 35055:
                                case 36010:
                                case 35097:
                                case 35869:
                                case 32874:
                                case 36389:
                                case 35983:
                                case 35368:
                                case 34068:
                                    e =
                                        0;
                                    break;
                                default:
                                    U ||= 1280;
                                    return
                            } else {
                                if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
                                    for (a = 0; a < f.length; ++a) switch (c) {
                                        case 0:
                                            E[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 2:
                                            J[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 4:
                                            Ca[b + a] = f[a] ? 1 : 0
                                    }
                                    return
                                }
                                try {
                                    e = f.name | 0
                                } catch (k) {
                                    U ||= 1280;
                                    ya(`GL_INVALID_ENUM in glGet${c}v: Unknown object returned from WebGL getParameter(${a})! (error: ${k})`);
                                    return
                                }
                            }
                            break;
                        default:
                            U ||= 1280;
                            ya(`GL_INVALID_ENUM in glGet${c}v: Native code calling glGet${c}v(${a}) and it returns ${f} of type ${typeof f}!`);
                            return
                    }
                    switch (c) {
                        case 1:
                            c = e;
                            H[b >> 2] = c;
                            H[b + 4 >> 2] = (c - H[b >> 2]) / 4294967296;
                            break;
                        case 0:
                            E[b >> 2] = e;
                            break;
                        case 2:
                            J[b >> 2] = e;
                            break;
                        case 4:
                            Ca[b] = e ? 1 : 0
                    }
                } else U ||= 1281
            }, nd = (a, b) => md(a, b, 0), od = (a, b, c) => {
                if (c) {
                    a = Sc[a];
                    b = 2 > z.version ? R.me.getQueryObjectEXT(a, b) : R.getQueryParameter(a, b);
                    var e;
                    "boolean" == typeof b ? e = b ? 1 : 0 : e = b;
                    H[c >> 2] = e;
                    H[c + 4 >> 2] = (e - H[c >> 2]) / 4294967296
                } else U ||= 1281
            }, qd = a => {
                var b = qa(a) + 1, c = pd(b);
                c && ra(a, c, b);
                return c
            }, rd = a => {
                var b = Wc[a];
                if (!b) {
                    switch (a) {
                        case 7939:
                            b = qd(ld().join(" "));
                            break;
                        case 7936:
                        case 7937:
                        case 37445:
                        case 37446:
                            (b =
                                R.getParameter(a)) || (U ||= 1280);
                            b = b ? qd(b) : 0;
                            break;
                        case 7938:
                            b = R.getParameter(7938);
                            var c = `OpenGL ES 2.0 (${b})`;
                            2 <= z.version && (c = `OpenGL ES 3.0 (${b})`);
                            b = qd(c);
                            break;
                        case 35724:
                            b = R.getParameter(35724);
                            c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                            null !== c && (3 == c[1].length && (c[1] += "0"), b = `OpenGL ES GLSL ES ${c[1]} (${b})`);
                            b = qd(b);
                            break;
                        default:
                            U ||= 1280
                    }
                    Wc[a] = b
                }
                return b
            }, sd = (a, b) => {
                if (2 > z.version) return U ||= 1282, 0;
                var c = Xc[a];
                if (c) return 0 > b || b >= c.length ? (U ||= 1281, 0) : c[b];
                switch (a) {
                    case 7939:
                        return c =
                            ld().map(qd), c = Xc[a] = c, 0 > b || b >= c.length ? (U ||= 1281, 0) : c[b];
                    default:
                        return U ||= 1280, 0
                }
            }, td = a => "]" == a.slice(-1) && a.lastIndexOf("["), ud = a => {
                a -= 5120;
                return 0 == a ? Ca : 1 == a ? B : 2 == a ? Da : 4 == a ? E : 6 == a ? J : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? H : Fa
            }, vd = (a, b, c, e, f) => {
                a = ud(a);
                b = e * ((Zc || c) * ({
                    5: 3,
                    6: 4,
                    8: 2,
                    29502: 3,
                    29504: 4,
                    26917: 2,
                    26918: 2,
                    29846: 3,
                    29847: 4
                }[b - 6402] || 1) * a.BYTES_PER_ELEMENT + Yc - 1 & -Yc);
                return a.subarray(f >>> 31 - Math.clz32(a.BYTES_PER_ELEMENT), f + b >>> 31 - Math.clz32(a.BYTES_PER_ELEMENT))
            }, Y = a => {
                var b = R.bf;
                if (b) {
                    var c =
                        b.xe[a];
                    "number" == typeof c && (b.xe[a] = c = R.getUniformLocation(b, b.Te[a] + (0 < c ? `[${c}]` : "")));
                    return c
                }
                U ||= 1282
            }, wd = [], xd = [], yd = {}, Ad = () => {
                if (!zd) {
                    var a = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                        _: "./this.program"
                    }, b;
                    for (b in yd) void 0 === yd[b] ? delete a[b] : a[b] = yd[b];
                    var c = [];
                    for (b in a) c.push(`${b}=${a[b]}`);
                    zd = c
                }
                return zd
            }, zd, Bd = [null, [], []];
            kb = r.InternalError = class extends Error {
                constructor(a) {
                    super(a);
                    this.name = "InternalError"
                }
            };
            for (var Cd = Array(256), Dd = 0; 256 > Dd; ++Dd) Cd[Dd] = String.fromCharCode(Dd);
            nb = Cd;
            L = r.BindingError = class extends Error {
                constructor(a) {
                    super(a);
                    this.name = "BindingError"
                }
            };
            Object.assign(Eb.prototype, {
                isAliasOf: function (a) {
                    if (!(this instanceof Eb && a instanceof Eb)) return !1;
                    var b = this.Yd.de.be, c = this.Yd.ae;
                    a.Yd = a.Yd;
                    var e = a.Yd.de.be;
                    for (a = a.Yd.ae; b.ge;) c = b.ye(c), b = b.ge;
                    for (; e.ge;) a = e.ye(a), e = e.ge;
                    return b === e && c === a
                }, clone: function () {
                    this.Yd.ae || pb(this);
                    if (this.Yd.we) return this.Yd.count.value += 1, this;
                    var a = Bb, b = Object, c = b.create, e = Object.getPrototypeOf(this), f = this.Yd;
                    a = a(c.call(b, e, {
                        Yd: {
                            value: {
                                count: f.count,
                                ve: f.ve,
                                we: f.we,
                                ae: f.ae,
                                de: f.de,
                                ee: f.ee,
                                ie: f.ie
                            }
                        }
                    }));
                    a.Yd.count.value +=
                        1;
                    a.Yd.ve = !1;
                    return a
                }, ["delete"]() {
                    this.Yd.ae || pb(this);
                    if (this.Yd.ve && !this.Yd.we) throw new L("Object already scheduled for deletion");
                    rb(this);
                    var a = this.Yd;
                    --a.count.value;
                    0 === a.count.value && (a.ee ? a.ie.ne(a.ee) : a.de.be.ne(a.ae));
                    this.Yd.we || (this.Yd.ee = void 0, this.Yd.ae = void 0)
                }, isDeleted: function () {
                    return !this.Yd.ae
                }, deleteLater: function () {
                    this.Yd.ae || pb(this);
                    if (this.Yd.ve && !this.Yd.we) throw new L("Object already scheduled for deletion");
                    Db.push(this);
                    this.Yd.ve = !0;
                    return this
                }
            });
            Object.assign(Qb.prototype, {
                gf(a) {
                    this.Se && (a = this.Se(a));
                    return a
                }, Oe(a) {
                    this.ne?.(a)
                }, je: 8, readValueFromPointer: gb, fromWireType: function (a) {
                    function b() {
                        return this.De ? Cb(this.be.se, {
                            de: this.nf,
                            ae: c,
                            ie: this,
                            ee: a
                        }) : Cb(this.be.se, {de: this, ae: a})
                    }

                    var c = this.gf(a);
                    if (!c) return this.Oe(a), null;
                    var e = Ab(this.be, c);
                    if (void 0 !== e) {
                        if (0 === e.Yd.count.value) return e.Yd.ae = c, e.Yd.ee = a, e.clone();
                        e = e.clone();
                        this.Oe(a);
                        return e
                    }
                    e = this.be.ff(c);
                    e = yb[e];
                    if (!e) return b.call(this);
                    e = this.Ce ? e.af : e.pointerType;
                    var f =
                        sb(c, this.be, e.be);
                    return null === f ? b.call(this) : this.De ? Cb(e.be.se, {
                        de: e,
                        ae: f,
                        ie: this,
                        ee: a
                    }) : Cb(e.be.se, {de: e, ae: f})
                }
            });
            ac = r.UnboundTypeError = ((a, b) => {
                var c = Fb(b, function (e) {
                    this.name = b;
                    this.message = e;
                    e = Error(e).stack;
                    void 0 !== e && (this.stack = this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, ""))
                });
                c.prototype = Object.create(a.prototype);
                c.prototype.constructor = c;
                c.prototype.toString = function () {
                    return void 0 === this.message ? this.name : `${this.name}: ${this.message}`
                };
                return c
            })(Error, "UnboundTypeError");
            kc.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1);
            r.count_emval_handles = () => kc.length / 2 - 5 - jc.length;
            for (var Ed = 0; 32 > Ed; ++Ed) jd.push(Array(Ed));
            var Fd = new Float32Array(288);
            for (Ed = 0; 288 >= Ed; ++Ed) wd[Ed] = Fd.subarray(0, Ed);
            var Gd = new Int32Array(288);
            for (Ed = 0; 288 >= Ed; ++Ed) xd[Ed] = Gd.subarray(0, Ed);
            var Vd = {
                    F: (a, b, c) => {
                        var e = new Ya(a);
                        H[e.ae + 16 >> 2] = 0;
                        H[e.ae + 4 >> 2] = b;
                        H[e.ae + 8 >> 2] = c;
                        Za = a;
                        bb++;
                        throw Za;
                    },
                    V: function () {
                        return 0
                    },
                    vd: () => {
                    },
                    ud: function () {
                        return 0
                    },
                    td: () => {
                    },
                    sd: () => {
                    },
                    U: function () {
                    },
                    rd: () => {
                    },
                    nd: () => {
                        Pa("")
                    },
                    B: a => {
                        var b = eb[a];
                        delete eb[a];
                        var c = b.Le, e = b.ne, f = b.Qe, k = f.map(n => n.kf).concat(f.map(n => n.sf));
                        mb([a], k, n => {
                            var l = {};
                            f.forEach((p, v) => {
                                var w = n[v], A = p.hf, D = p.jf, I = n[v + f.length], Q = p.rf, P = p.tf;
                                l[p.ef] = {
                                    read: aa => w.fromWireType(A(D, aa)), write: (aa, la) => {
                                        var X = [];
                                        Q(P, aa, I.toWireType(X,
                                            la));
                                        fb(X)
                                    }
                                }
                            });
                            return [{
                                name: b.name, fromWireType: p => {
                                    var v = {}, w;
                                    for (w in l) v[w] = l[w].read(p);
                                    e(p);
                                    return v
                                }, toWireType: (p, v) => {
                                    for (var w in l) if (!(w in v)) throw new TypeError(`Missing field: "${w}"`);
                                    var A = c();
                                    for (w in l) l[w].write(A, v[w]);
                                    null !== p && p.push(e, A);
                                    return A
                                }, je: 8, readValueFromPointer: gb, ke: e
                            }]
                        })
                    },
                    Y: () => {
                    },
                    md: (a, b, c, e) => {
                        b = K(b);
                        lb(a, {
                            name: b, fromWireType: function (f) {
                                return !!f
                            }, toWireType: function (f, k) {
                                return k ? c : e
                            }, je: 8, readValueFromPointer: function (f) {
                                return this.fromWireType(B[f])
                            }, ke: null
                        })
                    },
                    k: (a, b, c, e, f, k, n, l, p, v, w, A, D) => {
                        w = K(w);
                        k = O(f, k);
                        l &&= O(n, l);
                        v &&= O(p, v);
                        D = O(A, D);
                        var I = Ib(w);
                        Hb(I, function () {
                            ec(`Cannot construct ${w} due to unbound types`, [e])
                        });
                        mb([a, b, c], e ? [e] : [], Q => {
                            Q = Q[0];
                            if (e) {
                                var P = Q.be;
                                var aa = P.se
                            } else aa = Eb.prototype;
                            Q = Fb(w, function (...Ea) {
                                if (Object.getPrototypeOf(this) !== la) throw new L("Use 'new' to construct " + w);
                                if (void 0 === X.pe) throw new L(w + " has no accessible constructor");
                                var ea = X.pe[Ea.length];
                                if (void 0 === ea) throw new L(`Tried to invoke ctor of ${w} with invalid number of parameters (${Ea.length}) - expected (${Object.keys(X.pe).toString()}) parameters instead!`);
                                return ea.apply(this, Ea)
                            });
                            var la = Object.create(aa, {constructor: {value: Q}});
                            Q.prototype = la;
                            var X = new Jb(w, Q, la, D, P, k, l, v);
                            if (X.ge) {
                                var ha;
                                (ha = X.ge).ze ?? (ha.ze = []);
                                X.ge.ze.push(X)
                            }
                            P = new Qb(w, X, !0, !1, !1);
                            ha = new Qb(w + "*", X, !1, !1, !1);
                            aa = new Qb(w + " const*", X, !1, !0, !1);
                            yb[a] = {pointerType: ha, af: aa};
                            Rb(I, Q);
                            return [P, ha, aa]
                        })
                    },
                    e: (a, b, c, e, f, k, n) => {
                        var l = hc(c, e);
                        b = K(b);
                        b = ic(b);
                        k = O(f, k);
                        mb([], [a], p => {
                            function v() {
                                ec(`Cannot call ${w} due to unbound types`, l)
                            }

                            p = p[0];
                            var w = `${p.name}.${b}`;
                            b.startsWith("@@") &&
                            (b = Symbol[b.substring(2)]);
                            var A = p.be.constructor;
                            void 0 === A[b] ? (v.oe = c - 1, A[b] = v) : (Gb(A, b, w), A[b].fe[c - 1] = v);
                            mb([], l, D => {
                                D = [D[0], null].concat(D.slice(1));
                                D = gc(w, D, null, k, n);
                                void 0 === A[b].fe ? (D.oe = c - 1, A[b] = D) : A[b].fe[c - 1] = D;
                                if (p.be.ze) for (const I of p.be.ze) I.constructor.hasOwnProperty(b) || (I.constructor[b] = D);
                                return []
                            });
                            return []
                        })
                    },
                    z: (a, b, c, e, f, k) => {
                        var n = hc(b, c);
                        f = O(e, f);
                        mb([], [a], l => {
                            l = l[0];
                            var p = `constructor ${l.name}`;
                            void 0 === l.be.pe && (l.be.pe = []);
                            if (void 0 !== l.be.pe[b - 1]) throw new L(`Cannot register multiple constructors with identical number of parameters (${b -
                            1}) for class '${l.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
                            l.be.pe[b - 1] = () => {
                                ec(`Cannot construct ${l.name} due to unbound types`, n)
                            };
                            mb([], n, v => {
                                v.splice(1, 0, null);
                                l.be.pe[b - 1] = gc(p, v, null, f, k);
                                return []
                            });
                            return []
                        })
                    },
                    a: (a, b, c, e, f, k, n, l) => {
                        var p = hc(c, e);
                        b = K(b);
                        b = ic(b);
                        k = O(f, k);
                        mb([], [a], v => {
                            function w() {
                                ec(`Cannot call ${A} due to unbound types`, p)
                            }

                            v = v[0];
                            var A = `${v.name}.${b}`;
                            b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                            l && v.be.pf.push(b);
                            var D = v.be.se, I = D[b];
                            void 0 === I || void 0 === I.fe && I.className !== v.name && I.oe === c - 2 ? (w.oe = c - 2, w.className = v.name, D[b] = w) : (Gb(D, b, A), D[b].fe[c - 2] = w);
                            mb([], p, Q => {
                                Q = gc(A, Q, v, k, n);
                                void 0 === D[b].fe ? (Q.oe = c - 2, D[b] = Q) : D[b].fe[c - 2] = Q;
                                return []
                            });
                            return []
                        })
                    },
                    q: (a, b, c) => {
                        a = K(a);
                        mb([], [b], e => {
                            e = e[0];
                            r[a] = e.fromWireType(c);
                            return []
                        })
                    },
                    ld: a => lb(a, nc),
                    i: (a, b, c, e) => {
                        function f() {
                        }

                        b = K(b);
                        f.values = {};
                        lb(a, {
                            name: b, constructor: f, fromWireType: function (k) {
                                return this.constructor.values[k]
                            }, toWireType: (k, n) => n.value, je: 8,
                            readValueFromPointer: oc(b, c, e), ke: null
                        });
                        Hb(b, f)
                    },
                    b: (a, b, c) => {
                        var e = pc(a, "enum");
                        b = K(b);
                        a = e.constructor;
                        e = Object.create(e.constructor.prototype, {
                            value: {value: c},
                            constructor: {
                                value: Fb(`${e.name}_${b}`, function () {
                                })
                            }
                        });
                        a.values[c] = e;
                        a[b] = e
                    },
                    S: (a, b, c) => {
                        b = K(b);
                        lb(a, {
                            name: b,
                            fromWireType: e => e,
                            toWireType: (e, f) => f,
                            je: 8,
                            readValueFromPointer: qc(b, c),
                            ke: null
                        })
                    },
                    w: (a, b, c, e, f, k) => {
                        var n = hc(b, c);
                        a = K(a);
                        a = ic(a);
                        f = O(e, f);
                        Hb(a, function () {
                            ec(`Cannot call ${a} due to unbound types`, n)
                        }, b - 1);
                        mb([], n, l => {
                            l = [l[0], null].concat(l.slice(1));
                            Rb(a, gc(a, l, null, f, k), b - 1);
                            return []
                        })
                    },
                    C: (a, b, c, e, f) => {
                        b = K(b);
                        -1 === f && (f = 4294967295);
                        f = l => l;
                        if (0 === e) {
                            var k = 32 - 8 * c;
                            f = l => l << k >>> k
                        }
                        var n = b.includes("unsigned") ? function (l, p) {
                            return p >>> 0
                        } : function (l, p) {
                            return p
                        };
                        lb(a, {
                            name: b,
                            fromWireType: f,
                            toWireType: n,
                            je: 8,
                            readValueFromPointer: rc(b, c, 0 !== e),
                            ke: null
                        })
                    },
                    p: (a, b, c) => {
                        function e(k) {
                            return new f(Ca.buffer, H[k + 4 >> 2], H[k >> 2])
                        }

                        var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
                        c = K(c);
                        lb(a, {
                            name: c, fromWireType: e,
                            je: 8, readValueFromPointer: e
                        }, {lf: !0})
                    },
                    o: (a, b, c, e, f, k, n, l, p, v, w, A) => {
                        c = K(c);
                        k = O(f, k);
                        l = O(n, l);
                        v = O(p, v);
                        A = O(w, A);
                        mb([a], [b], D => {
                            D = D[0];
                            return [new Qb(c, D.be, !1, !1, !0, D, e, k, l, v, A)]
                        })
                    },
                    R: (a, b) => {
                        b = K(b);
                        var c = "std::string" === b;
                        lb(a, {
                            name: b, fromWireType: function (e) {
                                var f = H[e >> 2], k = e + 4;
                                if (c) for (var n = k, l = 0; l <= f; ++l) {
                                    var p = k + l;
                                    if (l == f || 0 == B[p]) {
                                        n = n ? db(B, n, p - n) : "";
                                        if (void 0 === v) var v = n; else v += String.fromCharCode(0), v += n;
                                        n = p + 1
                                    }
                                } else {
                                    v = Array(f);
                                    for (l = 0; l < f; ++l) v[l] = String.fromCharCode(B[k + l]);
                                    v = v.join("")
                                }
                                cc(e);
                                return v
                            }, toWireType: function (e, f) {
                                f instanceof ArrayBuffer && (f = new Uint8Array(f));
                                var k = "string" == typeof f;
                                if (!(k || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array)) throw new L("Cannot pass non-string to std::string");
                                var n = c && k ? qa(f) : f.length;
                                var l = pd(4 + n + 1), p = l + 4;
                                H[l >> 2] = n;
                                if (c && k) ra(f, p, n + 1); else if (k) for (k = 0; k < n; ++k) {
                                    var v = f.charCodeAt(k);
                                    if (255 < v) throw cc(p), new L("String has UTF-16 code units that do not fit in 8 bits");
                                    B[p + k] = v
                                } else for (k = 0; k < n; ++k) B[p + k] = f[k];
                                null !== e && e.push(cc, l);
                                return l
                            }, je: 8, readValueFromPointer: gb, ke(e) {
                                cc(e)
                            }
                        })
                    },
                    M: (a, b, c) => {
                        c = K(c);
                        if (2 === b) {
                            var e = tc;
                            var f = uc;
                            var k = vc;
                            var n = l => Fa[l >> 1]
                        } else 4 === b && (e = wc, f = xc, k = yc, n = l => H[l >> 2]);
                        lb(a, {
                            name: c, fromWireType: l => {
                                for (var p = H[l >> 2], v, w = l + 4, A = 0; A <= p; ++A) {
                                    var D = l + 4 + A * b;
                                    if (A == p || 0 == n(D)) w = e(w, D - w), void 0 === v ? v = w : (v += String.fromCharCode(0), v += w), w = D + b
                                }
                                cc(l);
                                return v
                            }, toWireType: (l, p) => {
                                if ("string" != typeof p) throw new L(`Cannot pass non-string to C++ string type ${c}`);
                                var v = k(p), w = pd(4 + v + b);
                                H[w >> 2] = v / b;
                                f(p, w + 4, v + b);
                                null !== l && l.push(cc, w);
                                return w
                            }, je: 8, readValueFromPointer: gb, ke(l) {
                                cc(l)
                            }
                        })
                    },
                    A: (a, b, c, e, f, k) => {
                        eb[a] = {name: K(b), Le: O(c, e), ne: O(f, k), Qe: []}
                    },
                    d: (a, b, c, e, f, k, n, l, p, v) => {
                        eb[a].Qe.push({ef: K(b), kf: c, hf: O(e, f), jf: k, sf: n, rf: O(l, p), tf: v})
                    },
                    kd: (a, b) => {
                        b = K(b);
                        lb(a, {
                            yf: !0, name: b, je: 0, fromWireType: () => {
                            }, toWireType: () => {
                            }
                        })
                    },
                    jd: () => 1,
                    id: () => {
                        throw Infinity;
                    },
                    E: (a, b, c) => {
                        a = mc(a);
                        b = pc(b, "emval::as");
                        return zc(b, c, a)
                    },
                    L: (a, b, c, e) => {
                        a = Ac[a];
                        b = mc(b);
                        return a(null, b, c, e)
                    },
                    t: (a, b, c, e, f) => {
                        a =
                            Ac[a];
                        b = mc(b);
                        c = Cc(c);
                        return a(b, b[c], e, f)
                    },
                    c: lc,
                    K: a => {
                        if (0 === a) return Ob(Dc());
                        a = Cc(a);
                        return Ob(Dc()[a])
                    },
                    n: (a, b, c) => {
                        var e = Fc(a, b), f = e.shift();
                        a--;
                        var k = Array(a);
                        b = `methodCaller<(${e.map(n => n.name).join(", ")}) => ${f.name}>`;
                        return Ec(Fb(b, (n, l, p, v) => {
                            for (var w = 0, A = 0; A < a; ++A) k[A] = e[A].readValueFromPointer(v + w), w += e[A].je;
                            n = 1 === c ? Gc(l, k) : l.apply(n, k);
                            return zc(f, p, n)
                        }))
                    },
                    y: (a, b) => {
                        a = mc(a);
                        b = mc(b);
                        return Ob(a[b])
                    },
                    H: a => {
                        9 < a && (kc[a + 1] += 1)
                    },
                    G: () => Ob([]),
                    f: a => Ob(Cc(a)),
                    D: () => Ob({}),
                    hd: a => {
                        a = mc(a);
                        return !a
                    },
                    l: a => {
                        var b = mc(a);
                        fb(b);
                        lc(a)
                    },
                    h: (a, b, c) => {
                        a = mc(a);
                        b = mc(b);
                        c = mc(c);
                        a[b] = c
                    },
                    g: (a, b) => {
                        a = pc(a, "_emval_take_value");
                        a = a.readValueFromPointer(b);
                        return Ob(a)
                    },
                    X: function () {
                        return -52
                    },
                    W: function () {
                    },
                    gd: (a, b, c, e) => {
                        var f = (new Date).getFullYear(), k = (new Date(f, 0, 1)).getTimezoneOffset();
                        f = (new Date(f, 6, 1)).getTimezoneOffset();
                        H[a >> 2] = 60 * Math.max(k, f);
                        E[b >> 2] = Number(k != f);
                        b = n => {
                            var l = Math.abs(n);
                            return `UTC${0 <= n ? "-" : "+"}${String(Math.floor(l / 60)).padStart(2, "0")}${String(l % 60).padStart(2, "0")}`
                        };
                        a = b(k);
                        b = b(f);
                        f < k ? (ra(a, c, 17), ra(b, e, 17)) : (ra(a, e, 17), ra(b, c, 17))
                    },
                    fd: () => performance.now(),
                    ed: a => R.activeTexture(a),
                    dd: (a, b) => {
                        R.attachShader(Nc[a], Qc[b])
                    },
                    cd: (a, b) => {
                        R.beginQuery(a, Sc[b])
                    },
                    bd: (a, b) => {
                        R.me.beginQueryEXT(a, Sc[b])
                    },
                    ad: (a, b, c) => {
                        R.bindAttribLocation(Nc[a], b, c ? db(B, c) : "")
                    },
                    $c: (a, b) => {
                        35051 == a ? R.Ie = b : 35052 == a && (R.re = b);
                        R.bindBuffer(a, Mc[b])
                    },
                    _c: cd,
                    Zc: (a, b) => {
                        R.bindRenderbuffer(a, Pc[b])
                    },
                    Yc: (a, b) => {
                        R.bindSampler(a, Tc[b])
                    },
                    Xc: (a, b) => {
                        R.bindTexture(a, ka[b])
                    },
                    Wc: dd,
                    Vc: dd,
                    Uc: (a, b, c, e) => R.blendColor(a,
                        b, c, e),
                    Tc: a => R.blendEquation(a),
                    Sc: (a, b) => R.blendFunc(a, b),
                    Rc: (a, b, c, e, f, k, n, l, p, v) => R.blitFramebuffer(a, b, c, e, f, k, n, l, p, v),
                    Qc: (a, b, c, e) => {
                        2 <= z.version ? c && b ? R.bufferData(a, B, e, c, b) : R.bufferData(a, b, e) : R.bufferData(a, c ? B.subarray(c, c + b) : b, e)
                    },
                    Pc: (a, b, c, e) => {
                        2 <= z.version ? c && R.bufferSubData(a, b, B, e, c) : R.bufferSubData(a, b, B.subarray(e, e + c))
                    },
                    Oc: a => R.checkFramebufferStatus(a),
                    Nc: ed,
                    Mc: fd,
                    Lc: gd,
                    Kc: (a, b, c, e) => R.clientWaitSync(Uc[a], b, (c >>> 0) + 4294967296 * e),
                    Jc: (a, b, c, e) => {
                        R.colorMask(!!a, !!b, !!c, !!e)
                    },
                    Ic: a => {
                        R.compileShader(Qc[a])
                    },
                    Hc: (a, b, c, e, f, k, n, l) => {
                        2 <= z.version ? R.re || !n ? R.compressedTexImage2D(a, b, c, e, f, k, n, l) : R.compressedTexImage2D(a, b, c, e, f, k, B, l, n) : R.compressedTexImage2D(a, b, c, e, f, k, B.subarray(l, l + n))
                    },
                    Gc: (a, b, c, e, f, k, n, l, p) => {
                        2 <= z.version ? R.re || !l ? R.compressedTexSubImage2D(a, b, c, e, f, k, n, l, p) : R.compressedTexSubImage2D(a, b, c, e, f, k, n, B, p, l) : R.compressedTexSubImage2D(a, b, c, e, f, k, n, B.subarray(p, p + l))
                    },
                    Fc: (a, b, c, e, f) => R.copyBufferSubData(a, b, c, e, f),
                    Ec: (a, b, c, e, f, k, n, l) => R.copyTexSubImage2D(a, b, c,
                        e, f, k, n, l),
                    Dc: () => {
                        var a = ja(Nc), b = R.createProgram();
                        b.name = a;
                        b.Ge = b.Ee = b.Fe = 0;
                        b.Me = 1;
                        Nc[a] = b;
                        return a
                    },
                    Cc: a => {
                        var b = ja(Qc);
                        Qc[b] = R.createShader(a);
                        return b
                    },
                    Bc: a => R.cullFace(a),
                    Ac: (a, b) => {
                        for (var c = 0; c < a; c++) {
                            var e = E[b + 4 * c >> 2], f = Mc[e];
                            f && (R.deleteBuffer(f), f.name = 0, Mc[e] = null, e == R.Ie && (R.Ie = 0), e == R.re && (R.re = 0))
                        }
                    },
                    zc: (a, b) => {
                        for (var c = 0; c < a; ++c) {
                            var e = E[b + 4 * c >> 2], f = Oc[e];
                            f && (R.deleteFramebuffer(f), f.name = 0, Oc[e] = null)
                        }
                    },
                    yc: a => {
                        if (a) {
                            var b = Nc[a];
                            b ? (R.deleteProgram(b), b.name = 0, Nc[a] = null) : U ||= 1281
                        }
                    },
                    xc: (a, b) => {
                        for (var c = 0; c < a; c++) {
                            var e = E[b + 4 * c >> 2], f = Sc[e];
                            f && (R.deleteQuery(f), Sc[e] = null)
                        }
                    },
                    wc: (a, b) => {
                        for (var c = 0; c < a; c++) {
                            var e = E[b + 4 * c >> 2], f = Sc[e];
                            f && (R.me.deleteQueryEXT(f), Sc[e] = null)
                        }
                    },
                    vc: (a, b) => {
                        for (var c = 0; c < a; c++) {
                            var e = E[b + 4 * c >> 2], f = Pc[e];
                            f && (R.deleteRenderbuffer(f), f.name = 0, Pc[e] = null)
                        }
                    },
                    uc: (a, b) => {
                        for (var c = 0; c < a; c++) {
                            var e = E[b + 4 * c >> 2], f = Tc[e];
                            f && (R.deleteSampler(f), f.name = 0, Tc[e] = null)
                        }
                    },
                    tc: a => {
                        if (a) {
                            var b = Qc[a];
                            b ? (R.deleteShader(b), Qc[a] = null) : U ||= 1281
                        }
                    },
                    sc: a => {
                        if (a) {
                            var b = Uc[a];
                            b ?
                                (R.deleteSync(b), b.name = 0, Uc[a] = null) : U ||= 1281
                        }
                    },
                    rc: (a, b) => {
                        for (var c = 0; c < a; c++) {
                            var e = E[b + 4 * c >> 2], f = ka[e];
                            f && (R.deleteTexture(f), f.name = 0, ka[e] = null)
                        }
                    },
                    qc: hd,
                    pc: hd,
                    oc: a => {
                        R.depthMask(!!a)
                    },
                    nc: a => R.disable(a),
                    mc: a => {
                        R.disableVertexAttribArray(a)
                    },
                    lc: (a, b, c) => {
                        R.drawArrays(a, b, c)
                    },
                    kc: (a, b, c, e) => {
                        R.drawArraysInstanced(a, b, c, e)
                    },
                    jc: (a, b, c, e, f) => {
                        R.Pe.drawArraysInstancedBaseInstanceWEBGL(a, b, c, e, f)
                    },
                    ic: (a, b) => {
                        for (var c = jd[a], e = 0; e < a; e++) c[e] = E[b + 4 * e >> 2];
                        R.drawBuffers(c)
                    },
                    hc: (a, b, c, e) => {
                        R.drawElements(a,
                            b, c, e)
                    },
                    gc: (a, b, c, e, f) => {
                        R.drawElementsInstanced(a, b, c, e, f)
                    },
                    fc: (a, b, c, e, f, k, n) => {
                        R.Pe.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, e, f, k, n)
                    },
                    ec: (a, b, c, e, f, k) => {
                        R.drawElements(a, e, f, k)
                    },
                    dc: a => R.enable(a),
                    cc: a => {
                        R.enableVertexAttribArray(a)
                    },
                    bc: a => R.endQuery(a),
                    ac: a => {
                        R.me.endQueryEXT(a)
                    },
                    $b: (a, b) => (a = R.fenceSync(a, b)) ? (b = ja(Uc), a.name = b, Uc[b] = a, b) : 0,
                    _b: () => R.finish(),
                    Zb: () => R.flush(),
                    Yb: (a, b, c, e) => {
                        R.framebufferRenderbuffer(a, b, c, Pc[e])
                    },
                    Xb: (a, b, c, e, f) => {
                        R.framebufferTexture2D(a, b, c, ka[e],
                            f)
                    },
                    Wb: a => R.frontFace(a),
                    Vb: (a, b) => {
                        $c(a, b, "createBuffer", Mc)
                    },
                    Ub: (a, b) => {
                        $c(a, b, "createFramebuffer", Oc)
                    },
                    Tb: (a, b) => {
                        $c(a, b, "createQuery", Sc)
                    },
                    Sb: (a, b) => {
                        for (var c = 0; c < a; c++) {
                            var e = R.me.createQueryEXT();
                            if (!e) {
                                for (U ||= 1282; c < a;) E[b + 4 * c++ >> 2] = 0;
                                break
                            }
                            var f = ja(Sc);
                            e.name = f;
                            Sc[f] = e;
                            E[b + 4 * c >> 2] = f
                        }
                    },
                    Rb: (a, b) => {
                        $c(a, b, "createRenderbuffer", Pc)
                    },
                    Qb: (a, b) => {
                        $c(a, b, "createSampler", Tc)
                    },
                    Pb: (a, b) => {
                        $c(a, b, "createTexture", ka)
                    },
                    Ob: kd,
                    Nb: kd,
                    Mb: a => R.generateMipmap(a),
                    Lb: (a, b, c) => {
                        c ? E[c >> 2] = R.getBufferParameter(a,
                            b) : U ||= 1281
                    },
                    Kb: () => {
                        var a = R.getError() || U;
                        U = 0;
                        return a
                    },
                    Jb: (a, b) => md(a, b, 2),
                    Ib: (a, b, c, e) => {
                        a = R.getFramebufferAttachmentParameter(a, b, c);
                        if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;
                        E[e >> 2] = a
                    },
                    Hb: nd,
                    Gb: (a, b, c, e) => {
                        a = R.getProgramInfoLog(Nc[a]);
                        null === a && (a = "(unknown error)");
                        b = 0 < b && e ? ra(a, e, b) : 0;
                        c && (E[c >> 2] = b)
                    },
                    Fb: (a, b, c) => {
                        if (c) if (a >= Lc) U ||= 1281; else if (a = Nc[a], 35716 == b) a = R.getProgramInfoLog(a), null === a && (a = "(unknown error)"), E[c >> 2] = a.length + 1; else if (35719 == b) {
                            if (!a.Ge) {
                                var e =
                                    R.getProgramParameter(a, 35718);
                                for (b = 0; b < e; ++b) a.Ge = Math.max(a.Ge, R.getActiveUniform(a, b).name.length + 1)
                            }
                            E[c >> 2] = a.Ge
                        } else if (35722 == b) {
                            if (!a.Ee) for (e = R.getProgramParameter(a, 35721), b = 0; b < e; ++b) a.Ee = Math.max(a.Ee, R.getActiveAttrib(a, b).name.length + 1);
                            E[c >> 2] = a.Ee
                        } else if (35381 == b) {
                            if (!a.Fe) for (e = R.getProgramParameter(a, 35382), b = 0; b < e; ++b) a.Fe = Math.max(a.Fe, R.getActiveUniformBlockName(a, b).length + 1);
                            E[c >> 2] = a.Fe
                        } else E[c >> 2] = R.getProgramParameter(a, b); else U ||= 1281
                    },
                    Eb: od,
                    Db: od,
                    Cb: (a, b, c) => {
                        if (c) {
                            a =
                                R.getQueryParameter(Sc[a], b);
                            var e;
                            "boolean" == typeof a ? e = a ? 1 : 0 : e = a;
                            E[c >> 2] = e
                        } else U ||= 1281
                    },
                    Bb: (a, b, c) => {
                        if (c) {
                            a = R.me.getQueryObjectEXT(Sc[a], b);
                            var e;
                            "boolean" == typeof a ? e = a ? 1 : 0 : e = a;
                            E[c >> 2] = e
                        } else U ||= 1281
                    },
                    Ab: (a, b, c) => {
                        c ? E[c >> 2] = R.getQuery(a, b) : U ||= 1281
                    },
                    zb: (a, b, c) => {
                        c ? E[c >> 2] = R.me.getQueryEXT(a, b) : U ||= 1281
                    },
                    yb: (a, b, c) => {
                        c ? E[c >> 2] = R.getRenderbufferParameter(a, b) : U ||= 1281
                    },
                    xb: (a, b, c, e) => {
                        a = R.getShaderInfoLog(Qc[a]);
                        null === a && (a = "(unknown error)");
                        b = 0 < b && e ? ra(a, e, b) : 0;
                        c && (E[c >> 2] = b)
                    },
                    wb: (a, b, c, e) => {
                        a = R.getShaderPrecisionFormat(a, b);
                        E[c >> 2] = a.rangeMin;
                        E[c + 4 >> 2] = a.rangeMax;
                        E[e >> 2] = a.precision
                    },
                    vb: (a, b, c) => {
                        c ? 35716 == b ? (a = R.getShaderInfoLog(Qc[a]), null === a && (a = "(unknown error)"), E[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = R.getShaderSource(Qc[a]), E[c >> 2] = a ? a.length + 1 : 0) : E[c >> 2] = R.getShaderParameter(Qc[a], b) : U ||= 1281
                    },
                    ub: rd,
                    tb: sd,
                    sb: (a, b) => {
                        b = b ? db(B, b) : "";
                        if (a = Nc[a]) {
                            var c = a, e = c.xe, f = c.Ue, k;
                            if (!e) {
                                c.xe = e = {};
                                c.Te = {};
                                var n = R.getProgramParameter(c, 35718);
                                for (k = 0; k < n; ++k) {
                                    var l = R.getActiveUniform(c, k);
                                    var p =
                                        l.name;
                                    l = l.size;
                                    var v = td(p);
                                    v = 0 < v ? p.slice(0, v) : p;
                                    var w = c.Me;
                                    c.Me += l;
                                    f[v] = [l, w];
                                    for (p = 0; p < l; ++p) e[w] = p, c.Te[w++] = v
                                }
                            }
                            c = a.xe;
                            e = 0;
                            f = b;
                            k = td(b);
                            0 < k && (e = parseInt(b.slice(k + 1)) >>> 0, f = b.slice(0, k));
                            if ((f = a.Ue[f]) && e < f[0] && (e += f[1], c[e] = c[e] || R.getUniformLocation(a, b))) return e
                        } else U ||= 1281;
                        return -1
                    },
                    rb: (a, b, c) => {
                        for (var e = jd[b], f = 0; f < b; f++) e[f] = E[c + 4 * f >> 2];
                        R.invalidateFramebuffer(a, e)
                    },
                    qb: (a, b, c, e, f, k, n) => {
                        for (var l = jd[b], p = 0; p < b; p++) l[p] = E[c + 4 * p >> 2];
                        R.invalidateSubFramebuffer(a, l, e, f, k, n)
                    },
                    pb: a => R.isSync(Uc[a]),
                    ob: a => (a = ka[a]) ? R.isTexture(a) : 0,
                    nb: a => R.lineWidth(a),
                    mb: a => {
                        a = Nc[a];
                        R.linkProgram(a);
                        a.xe = 0;
                        a.Ue = {}
                    },
                    lb: (a, b, c, e, f, k) => {
                        R.Re.multiDrawArraysInstancedBaseInstanceWEBGL(a, E, b >> 2, E, c >> 2, E, e >> 2, H, f >> 2, k)
                    },
                    kb: (a, b, c, e, f, k, n, l) => {
                        R.Re.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, E, b >> 2, c, E, e >> 2, E, f >> 2, E, k >> 2, H, n >> 2, l)
                    },
                    jb: (a, b) => {
                        3317 == a ? Yc = b : 3314 == a && (Zc = b);
                        R.pixelStorei(a, b)
                    },
                    ib: (a, b) => {
                        R.me.queryCounterEXT(Sc[a], b)
                    },
                    hb: a => R.readBuffer(a),
                    gb: (a, b, c, e, f, k, n) => {
                        if (2 <= z.version) if (R.Ie) R.readPixels(a,
                            b, c, e, f, k, n); else {
                            var l = ud(k);
                            n >>>= 31 - Math.clz32(l.BYTES_PER_ELEMENT);
                            R.readPixels(a, b, c, e, f, k, l, n)
                        } else (l = vd(k, f, c, e, n)) ? R.readPixels(a, b, c, e, f, k, l) : U ||= 1280
                    },
                    fb: (a, b, c, e) => R.renderbufferStorage(a, b, c, e),
                    eb: (a, b, c, e, f) => R.renderbufferStorageMultisample(a, b, c, e, f),
                    db: (a, b, c) => {
                        R.samplerParameterf(Tc[a], b, c)
                    },
                    cb: (a, b, c) => {
                        R.samplerParameteri(Tc[a], b, c)
                    },
                    bb: (a, b, c) => {
                        R.samplerParameteri(Tc[a], b, E[c >> 2])
                    },
                    ab: (a, b, c, e) => R.scissor(a, b, c, e),
                    $a: (a, b, c, e) => {
                        for (var f = "", k = 0; k < b; ++k) {
                            var n = (n = H[c + 4 * k >> 2]) ?
                                db(B, n, e ? H[e + 4 * k >> 2] : void 0) : "";
                            f += n
                        }
                        R.shaderSource(Qc[a], f)
                    },
                    _a: (a, b, c) => R.stencilFunc(a, b, c),
                    Za: (a, b, c, e) => R.stencilFuncSeparate(a, b, c, e),
                    Ya: a => R.stencilMask(a),
                    Xa: (a, b) => R.stencilMaskSeparate(a, b),
                    Wa: (a, b, c) => R.stencilOp(a, b, c),
                    Va: (a, b, c, e) => R.stencilOpSeparate(a, b, c, e),
                    Ua: (a, b, c, e, f, k, n, l, p) => {
                        if (2 <= z.version) {
                            if (R.re) {
                                R.texImage2D(a, b, c, e, f, k, n, l, p);
                                return
                            }
                            if (p) {
                                var v = ud(l);
                                p >>>= 31 - Math.clz32(v.BYTES_PER_ELEMENT);
                                R.texImage2D(a, b, c, e, f, k, n, l, v, p);
                                return
                            }
                        }
                        v = p ? vd(l, n, e, f, p) : null;
                        R.texImage2D(a,
                            b, c, e, f, k, n, l, v)
                    },
                    Ta: (a, b, c) => R.texParameterf(a, b, c),
                    Sa: (a, b, c) => {
                        R.texParameterf(a, b, J[c >> 2])
                    },
                    Ra: (a, b, c) => R.texParameteri(a, b, c),
                    Qa: (a, b, c) => {
                        R.texParameteri(a, b, E[c >> 2])
                    },
                    Pa: (a, b, c, e, f) => R.texStorage2D(a, b, c, e, f),
                    Oa: (a, b, c, e, f, k, n, l, p) => {
                        if (2 <= z.version) {
                            if (R.re) {
                                R.texSubImage2D(a, b, c, e, f, k, n, l, p);
                                return
                            }
                            if (p) {
                                var v = ud(l);
                                R.texSubImage2D(a, b, c, e, f, k, n, l, v, p >>> 31 - Math.clz32(v.BYTES_PER_ELEMENT));
                                return
                            }
                        }
                        p = p ? vd(l, n, f, k, p) : null;
                        R.texSubImage2D(a, b, c, e, f, k, n, l, p)
                    },
                    Na: (a, b) => {
                        R.uniform1f(Y(a), b)
                    },
                    Ma: (a,
                         b, c) => {
                        if (2 <= z.version) b && R.uniform1fv(Y(a), J, c >> 2, b); else {
                            if (288 >= b) for (var e = wd[b], f = 0; f < b; ++f) e[f] = J[c + 4 * f >> 2]; else e = J.subarray(c >> 2, c + 4 * b >> 2);
                            R.uniform1fv(Y(a), e)
                        }
                    },
                    La: (a, b) => {
                        R.uniform1i(Y(a), b)
                    },
                    Ka: (a, b, c) => {
                        if (2 <= z.version) b && R.uniform1iv(Y(a), E, c >> 2, b); else {
                            if (288 >= b) for (var e = xd[b], f = 0; f < b; ++f) e[f] = E[c + 4 * f >> 2]; else e = E.subarray(c >> 2, c + 4 * b >> 2);
                            R.uniform1iv(Y(a), e)
                        }
                    },
                    Ja: (a, b, c) => {
                        R.uniform2f(Y(a), b, c)
                    },
                    Ia: (a, b, c) => {
                        if (2 <= z.version) b && R.uniform2fv(Y(a), J, c >> 2, 2 * b); else {
                            if (144 >= b) {
                                b *= 2;
                                for (var e =
                                    wd[b], f = 0; f < b; f += 2) e[f] = J[c + 4 * f >> 2], e[f + 1] = J[c + (4 * f + 4) >> 2]
                            } else e = J.subarray(c >> 2, c + 8 * b >> 2);
                            R.uniform2fv(Y(a), e)
                        }
                    },
                    Ha: (a, b, c) => {
                        R.uniform2i(Y(a), b, c)
                    },
                    Ga: (a, b, c) => {
                        if (2 <= z.version) b && R.uniform2iv(Y(a), E, c >> 2, 2 * b); else {
                            if (144 >= b) {
                                b *= 2;
                                for (var e = xd[b], f = 0; f < b; f += 2) e[f] = E[c + 4 * f >> 2], e[f + 1] = E[c + (4 * f + 4) >> 2]
                            } else e = E.subarray(c >> 2, c + 8 * b >> 2);
                            R.uniform2iv(Y(a), e)
                        }
                    },
                    Fa: (a, b, c, e) => {
                        R.uniform3f(Y(a), b, c, e)
                    },
                    Ea: (a, b, c) => {
                        if (2 <= z.version) b && R.uniform3fv(Y(a), J, c >> 2, 3 * b); else {
                            if (96 >= b) {
                                b *= 3;
                                for (var e = wd[b], f = 0; f <
                                b; f += 3) e[f] = J[c + 4 * f >> 2], e[f + 1] = J[c + (4 * f + 4) >> 2], e[f + 2] = J[c + (4 * f + 8) >> 2]
                            } else e = J.subarray(c >> 2, c + 12 * b >> 2);
                            R.uniform3fv(Y(a), e)
                        }
                    },
                    Da: (a, b, c, e) => {
                        R.uniform3i(Y(a), b, c, e)
                    },
                    Ca: (a, b, c) => {
                        if (2 <= z.version) b && R.uniform3iv(Y(a), E, c >> 2, 3 * b); else {
                            if (96 >= b) {
                                b *= 3;
                                for (var e = xd[b], f = 0; f < b; f += 3) e[f] = E[c + 4 * f >> 2], e[f + 1] = E[c + (4 * f + 4) >> 2], e[f + 2] = E[c + (4 * f + 8) >> 2]
                            } else e = E.subarray(c >> 2, c + 12 * b >> 2);
                            R.uniform3iv(Y(a), e)
                        }
                    },
                    Ba: (a, b, c, e, f) => {
                        R.uniform4f(Y(a), b, c, e, f)
                    },
                    Aa: (a, b, c) => {
                        if (2 <= z.version) b && R.uniform4fv(Y(a), J, c >> 2, 4 *
                            b); else {
                            if (72 >= b) {
                                var e = wd[4 * b], f = J;
                                c >>= 2;
                                b *= 4;
                                for (var k = 0; k < b; k += 4) {
                                    var n = c + k;
                                    e[k] = f[n];
                                    e[k + 1] = f[n + 1];
                                    e[k + 2] = f[n + 2];
                                    e[k + 3] = f[n + 3]
                                }
                            } else e = J.subarray(c >> 2, c + 16 * b >> 2);
                            R.uniform4fv(Y(a), e)
                        }
                    },
                    za: (a, b, c, e, f) => {
                        R.uniform4i(Y(a), b, c, e, f)
                    },
                    ya: (a, b, c) => {
                        if (2 <= z.version) b && R.uniform4iv(Y(a), E, c >> 2, 4 * b); else {
                            if (72 >= b) {
                                b *= 4;
                                for (var e = xd[b], f = 0; f < b; f += 4) e[f] = E[c + 4 * f >> 2], e[f + 1] = E[c + (4 * f + 4) >> 2], e[f + 2] = E[c + (4 * f + 8) >> 2], e[f + 3] = E[c + (4 * f + 12) >> 2]
                            } else e = E.subarray(c >> 2, c + 16 * b >> 2);
                            R.uniform4iv(Y(a), e)
                        }
                    },
                    xa: (a, b, c, e) => {
                        if (2 <= z.version) b && R.uniformMatrix2fv(Y(a), !!c, J, e >> 2, 4 * b); else {
                            if (72 >= b) {
                                b *= 4;
                                for (var f = wd[b], k = 0; k < b; k += 4) f[k] = J[e + 4 * k >> 2], f[k + 1] = J[e + (4 * k + 4) >> 2], f[k + 2] = J[e + (4 * k + 8) >> 2], f[k + 3] = J[e + (4 * k + 12) >> 2]
                            } else f = J.subarray(e >> 2, e + 16 * b >> 2);
                            R.uniformMatrix2fv(Y(a), !!c, f)
                        }
                    },
                    wa: (a, b, c, e) => {
                        if (2 <= z.version) b && R.uniformMatrix3fv(Y(a), !!c, J, e >> 2, 9 * b); else {
                            if (32 >= b) {
                                b *= 9;
                                for (var f = wd[b], k = 0; k < b; k += 9) f[k] = J[e + 4 * k >> 2], f[k + 1] = J[e + (4 * k + 4) >> 2], f[k + 2] = J[e + (4 * k + 8) >> 2], f[k + 3] = J[e + (4 * k + 12) >> 2], f[k + 4] = J[e + (4 * k + 16) >> 2], f[k +
                                5] = J[e + (4 * k + 20) >> 2], f[k + 6] = J[e + (4 * k + 24) >> 2], f[k + 7] = J[e + (4 * k + 28) >> 2], f[k + 8] = J[e + (4 * k + 32) >> 2]
                            } else f = J.subarray(e >> 2, e + 36 * b >> 2);
                            R.uniformMatrix3fv(Y(a), !!c, f)
                        }
                    },
                    va: (a, b, c, e) => {
                        if (2 <= z.version) b && R.uniformMatrix4fv(Y(a), !!c, J, e >> 2, 16 * b); else {
                            if (18 >= b) {
                                var f = wd[16 * b], k = J;
                                e >>= 2;
                                b *= 16;
                                for (var n = 0; n < b; n += 16) {
                                    var l = e + n;
                                    f[n] = k[l];
                                    f[n + 1] = k[l + 1];
                                    f[n + 2] = k[l + 2];
                                    f[n + 3] = k[l + 3];
                                    f[n + 4] = k[l + 4];
                                    f[n + 5] = k[l + 5];
                                    f[n + 6] = k[l + 6];
                                    f[n + 7] = k[l + 7];
                                    f[n + 8] = k[l + 8];
                                    f[n + 9] = k[l + 9];
                                    f[n + 10] = k[l + 10];
                                    f[n + 11] = k[l + 11];
                                    f[n + 12] = k[l + 12];
                                    f[n +
                                    13] = k[l + 13];
                                    f[n + 14] = k[l + 14];
                                    f[n + 15] = k[l + 15]
                                }
                            } else f = J.subarray(e >> 2, e + 64 * b >> 2);
                            R.uniformMatrix4fv(Y(a), !!c, f)
                        }
                    },
                    ua: a => {
                        a = Nc[a];
                        R.useProgram(a);
                        R.bf = a
                    },
                    ta: (a, b) => R.vertexAttrib1f(a, b),
                    sa: (a, b) => {
                        R.vertexAttrib2f(a, J[b >> 2], J[b + 4 >> 2])
                    },
                    ra: (a, b) => {
                        R.vertexAttrib3f(a, J[b >> 2], J[b + 4 >> 2], J[b + 8 >> 2])
                    },
                    qa: (a, b) => {
                        R.vertexAttrib4f(a, J[b >> 2], J[b + 4 >> 2], J[b + 8 >> 2], J[b + 12 >> 2])
                    },
                    pa: (a, b) => {
                        R.vertexAttribDivisor(a, b)
                    },
                    oa: (a, b, c, e, f) => {
                        R.vertexAttribIPointer(a, b, c, e, f)
                    },
                    na: (a, b, c, e, f, k) => {
                        R.vertexAttribPointer(a, b, c,
                            !!e, f, k)
                    },
                    ma: (a, b, c, e) => R.viewport(a, b, c, e),
                    la: (a, b, c, e) => {
                        R.waitSync(Uc[a], b, (c >>> 0) + 4294967296 * e)
                    },
                    ka: a => {
                        var b = B.length;
                        a >>>= 0;
                        if (2147483648 < a) return !1;
                        for (var c = 1; 4 >= c; c *= 2) {
                            var e = b * (1 + 1 / c);
                            e = Math.min(e, a + 100663296);
                            a:{
                                e = (Math.min(2147483648, 65536 * Math.ceil(Math.max(a, e) / 65536)) - za.buffer.byteLength + 65535) / 65536 | 0;
                                try {
                                    za.grow(e);
                                    Ha();
                                    var f = 1;
                                    break a
                                } catch (k) {
                                }
                                f = void 0
                            }
                            if (f) return !0
                        }
                        return !1
                    },
                    ja: () => z ? z.handle : 0,
                    qd: (a, b) => {
                        var c = 0;
                        Ad().forEach((e, f) => {
                            var k = b + c;
                            f = H[a + 4 * f >> 2] = k;
                            for (k = 0; k < e.length; ++k) Ca[f++] =
                                e.charCodeAt(k);
                            Ca[f] = 0;
                            c += e.length + 1
                        });
                        return 0
                    },
                    pd: (a, b) => {
                        var c = Ad();
                        H[a >> 2] = c.length;
                        var e = 0;
                        c.forEach(f => e += f.length + 1);
                        H[b >> 2] = e;
                        return 0
                    },
                    ia: a => {
                        Xa || (Ba = !0);
                        throw new Va(a);
                    },
                    N: () => 52,
                    _: function () {
                        return 52
                    },
                    od: () => 52,
                    Z: function () {
                        return 70
                    },
                    T: (a, b, c, e) => {
                        for (var f = 0, k = 0; k < c; k++) {
                            var n = H[b >> 2], l = H[b + 4 >> 2];
                            b += 8;
                            for (var p = 0; p < l; p++) {
                                var v = B[n + p], w = Bd[a];
                                0 === v || 10 === v ? ((1 === a ? xa : ya)(db(w)), w.length = 0) : w.push(v)
                            }
                            f += l
                        }
                        H[e >> 2] = f;
                        return 0
                    },
                    ha: cd,
                    ga: ed,
                    fa: fd,
                    ea: gd,
                    J: nd,
                    Q: rd,
                    da: sd,
                    j: Hd,
                    v: Id,
                    m: Jd,
                    I: Kd,
                    ca: Ld,
                    P: Md,
                    O: Nd,
                    s: Od,
                    x: Pd,
                    r: Qd,
                    u: Rd,
                    ba: Sd,
                    aa: Td,
                    $: Ud
                }, Z = function () {
                    function a(c) {
                        Z = c.exports;
                        za = Z.wd;
                        Ha();
                        N = Z.zd;
                        Ja.unshift(Z.xd);
                        La--;
                        0 == La && (null !== Na && (clearInterval(Na), Na = null), Oa && (c = Oa, Oa = null, c()));
                        return Z
                    }

                    var b = {a: Vd};
                    La++;
                    if (r.instantiateWasm) try {
                        return r.instantiateWasm(b, a)
                    } catch (c) {
                        ya(`Module.instantiateWasm callback failed with error: ${c}`), ca(c)
                    }
                    Ra ??= r.locateFile ? Qa("canvaskit.wasm") ? "canvaskit.wasm" : ta + "canvaskit.wasm" : (new URL("canvaskit.wasm", import.meta.url)).href;
                    Ua(b, function (c) {
                        a(c.instance)
                    }).catch(ca);
                    return {}
                }(), bc = a => (bc = Z.yd)(a), pd = r._malloc = a => (pd = r._malloc = Z.Ad)(a),
                cc = r._free = a => (cc = r._free = Z.Bd)(a), Wd = (a, b) => (Wd = Z.Cd)(a, b),
                Xd = a => (Xd = Z.Dd)(a), Yd = () => (Yd = Z.Ed)();
            r.dynCall_viji = (a, b, c, e, f) => (r.dynCall_viji = Z.Fd)(a, b, c, e, f);
            r.dynCall_vijiii = (a, b, c, e, f, k, n) => (r.dynCall_vijiii = Z.Gd)(a, b, c, e, f, k, n);
            r.dynCall_viiiiij = (a, b, c, e, f, k, n, l) => (r.dynCall_viiiiij = Z.Hd)(a, b, c, e, f, k, n, l);
            r.dynCall_iiiji = (a, b, c, e, f, k) => (r.dynCall_iiiji = Z.Id)(a, b, c, e, f, k);
            r.dynCall_jii = (a, b, c) => (r.dynCall_jii = Z.Jd)(a, b, c);
            r.dynCall_vij = (a, b, c, e) => (r.dynCall_vij = Z.Kd)(a, b, c, e);
            r.dynCall_jiiiiii = (a, b, c, e, f, k, n) => (r.dynCall_jiiiiii = Z.Ld)(a, b, c, e, f, k, n);
            r.dynCall_jiiiiji = (a, b, c, e, f, k, n, l) => (r.dynCall_jiiiiji = Z.Md)(a, b, c, e, f, k, n, l);
            r.dynCall_ji = (a, b) => (r.dynCall_ji = Z.Nd)(a, b);
            r.dynCall_iijj = (a, b, c, e, f, k) => (r.dynCall_iijj = Z.Od)(a, b, c, e, f, k);
            r.dynCall_iiji = (a, b, c, e, f) => (r.dynCall_iiji = Z.Pd)(a, b, c, e, f);
            r.dynCall_iijjiii = (a, b, c, e, f, k, n, l, p) => (r.dynCall_iijjiii = Z.Qd)(a, b, c, e, f, k, n, l, p);
            r.dynCall_iij = (a, b, c, e) => (r.dynCall_iij = Z.Rd)(a, b, c, e);
            r.dynCall_vijjjii = (a, b, c, e, f, k, n, l, p, v) => (r.dynCall_vijjjii = Z.Sd)(a, b, c, e, f, k, n, l, p, v);
            r.dynCall_jiji = (a, b, c, e, f) => (r.dynCall_jiji = Z.Td)(a, b, c, e, f);
            r.dynCall_viijii = (a, b, c, e, f, k, n) => (r.dynCall_viijii = Z.Ud)(a, b, c, e, f, k, n);
            r.dynCall_iiiiij = (a, b, c, e, f, k, n) => (r.dynCall_iiiiij = Z.Vd)(a, b, c, e, f, k, n);
            r.dynCall_iiiiijj = (a, b, c, e, f, k, n, l, p) => (r.dynCall_iiiiijj = Z.Wd)(a, b, c, e, f, k, n, l, p);
            r.dynCall_iiiiiijj = (a, b, c, e, f, k, n, l, p, v) => (r.dynCall_iiiiiijj = Z.Xd)(a, b, c, e, f, k, n, l, p, v);

            function Rd(a, b, c, e, f) {
                var k = Yd();
                try {
                    N.get(a)(b, c, e, f)
                } catch (n) {
                    Xd(k);
                    if (n !== n + 0) throw n;
                    Wd(1, 0)
                }
            }

            function Id(a, b, c) {
                var e = Yd();
                try {
                    return N.get(a)(b, c)
                } catch (f) {
                    Xd(e);
                    if (f !== f + 0) throw f;
                    Wd(1, 0)
                }
            }

            function Pd(a, b, c) {
                var e = Yd();
                try {
                    N.get(a)(b, c)
                } catch (f) {
                    Xd(e);
                    if (f !== f + 0) throw f;
                    Wd(1, 0)
                }
            }

            function Hd(a, b) {
                var c = Yd();
                try {
                    return N.get(a)(b)
                } catch (e) {
                    Xd(c);
                    if (e !== e + 0) throw e;
                    Wd(1, 0)
                }
            }

            function Od(a, b) {
                var c = Yd();
                try {
                    N.get(a)(b)
                } catch (e) {
                    Xd(c);
                    if (e !== e + 0) throw e;
                    Wd(1, 0)
                }
            }

            function Jd(a, b, c, e) {
                var f = Yd();
                try {
                    return N.get(a)(b, c, e)
                } catch (k) {
                    Xd(f);
                    if (k !== k + 0) throw k;
                    Wd(1, 0)
                }
            }

            function Ud(a, b, c, e, f, k, n, l, p, v) {
                var w = Yd();
                try {
                    N.get(a)(b, c, e, f, k, n, l, p, v)
                } catch (A) {
                    Xd(w);
                    if (A !== A + 0) throw A;
                    Wd(1, 0)
                }
            }

            function Qd(a, b, c, e) {
                var f = Yd();
                try {
                    N.get(a)(b, c, e)
                } catch (k) {
                    Xd(f);
                    if (k !== k + 0) throw k;
                    Wd(1, 0)
                }
            }

            function Td(a, b, c, e, f, k, n) {
                var l = Yd();
                try {
                    N.get(a)(b, c, e, f, k, n)
                } catch (p) {
                    Xd(l);
                    if (p !== p + 0) throw p;
                    Wd(1, 0)
                }
            }

            function Md(a, b, c, e, f, k, n, l) {
                var p = Yd();
                try {
                    return N.get(a)(b, c, e, f, k, n, l)
                } catch (v) {
                    Xd(p);
                    if (v !== v + 0) throw v;
                    Wd(1, 0)
                }
            }

            function Sd(a, b, c, e, f, k) {
                var n = Yd();
                try {
                    N.get(a)(b, c, e, f, k)
                } catch (l) {
                    Xd(n);
                    if (l !== l + 0) throw l;
                    Wd(1, 0)
                }
            }

            function Kd(a, b, c, e, f) {
                var k = Yd();
                try {
                    return N.get(a)(b, c, e, f)
                } catch (n) {
                    Xd(k);
                    if (n !== n + 0) throw n;
                    Wd(1, 0)
                }
            }

            function Nd(a, b, c, e, f, k, n, l, p, v) {
                var w = Yd();
                try {
                    return N.get(a)(b, c, e, f, k, n, l, p, v)
                } catch (A) {
                    Xd(w);
                    if (A !== A + 0) throw A;
                    Wd(1, 0)
                }
            }

            function Ld(a, b, c, e, f, k, n) {
                var l = Yd();
                try {
                    return N.get(a)(b, c, e, f, k, n)
                } catch (p) {
                    Xd(l);
                    if (p !== p + 0) throw p;
                    Wd(1, 0)
                }
            }

            var Zd, $d;
            Oa = function ae() {
                Zd || be();
                Zd || (Oa = ae)
            };

            function be() {
                if (!(0 < La)) {
                    if (!$d && ($d = 1, Wa(Ia), 0 < La)) return;
                    Zd || (Zd = 1, r.calledRun = 1, Ba || (Wa(Ja), ba(r), r.onRuntimeInitialized?.(), Wa(Ka)))
                }
            }

            be();
            moduleRtn = da;


            return moduleRtn;
        }
    );
})();
export default CanvasKitInit;

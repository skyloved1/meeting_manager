var skwasm = (() => {
    var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;

    return (
        function (moduleArg = {}) {
            var moduleRtn;

            function e() {
                g.buffer != k.buffer && n();
                return k
            }

            function q() {
                g.buffer != k.buffer && n();
                return aa
            }

            function r() {
                g.buffer != k.buffer && n();
                return ba
            }

            function t() {
                g.buffer != k.buffer && n();
                return ca
            }

            function u() {
                g.buffer != k.buffer && n();
                return da
            }

            var w = moduleArg, ea, fa, ha = new Promise((a, b) => {
                    ea = a;
                    fa = b
                }), ia = "object" == typeof window, ja = "function" == typeof importScripts, ka = w.$ww,
                la = Object.assign({}, w), x = "";

            function ma(a) {
                return w.locateFile ? w.locateFile(a, x) : x + a
            }

            var na, oa;
            if (ia || ja) ja ? x = self.location.href : "undefined" != typeof document && document.currentScript && (x = document.currentScript.src), _scriptName && (x = _scriptName), x.startsWith("blob:") ? x = "" : x = x.substr(0, x.replace(/[?#].*/, "").lastIndexOf("/") + 1), ja && (oa = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response)
            }), na = a => fetch(a, {credentials: "same-origin"}).then(b => b.ok ? b.arrayBuffer() : Promise.reject(Error(b.status + " : " + b.url)));
            var pa = console.log.bind(console), y = console.error.bind(console);
            Object.assign(w, la);
            la = null;
            var g, qa, ra = !1, sa, k, aa, ta, ua, ba, ca, da;

            function n() {
                var a = g.buffer;
                k = new Int8Array(a);
                ta = new Int16Array(a);
                aa = new Uint8Array(a);
                ua = new Uint16Array(a);
                ba = new Int32Array(a);
                ca = new Uint32Array(a);
                da = new Float32Array(a);
                new Float64Array(a)
            }

            w.wasmMemory ? g = w.wasmMemory : g = new WebAssembly.Memory({initial: 256, maximum: 32768, shared: !0});
            n();
            var va = [], wa = [], xa = [];

            function ya() {
                ka ? (za = 1, Aa(w.sb, w.sz), removeEventListener("message", Ba), Ca = Ca.forEach(Da), addEventListener("message", Da)) : Ea(wa)
            }

            var z = 0, Fa = null, A = null;

            function Ga(a) {
                a = "Aborted(" + a + ")";
                y(a);
                ra = !0;
                a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
                fa(a);
                throw a;
            }

            var Ha = a => a.startsWith("data:application/octet-stream;base64,"), Ia;

            function Ja(a) {
                return na(a).then(b => new Uint8Array(b), () => {
                    if (oa) var b = oa(a); else throw "both async and sync fetching of the wasm failed";
                    return b
                })
            }

            function Ka(a, b, c) {
                return Ja(a).then(d => WebAssembly.instantiate(d, b)).then(c, d => {
                    y(`failed to asynchronously prepare wasm: ${d}`);
                    Ga(d)
                })
            }

            function La(a, b) {
                var c = Ia;
                return "function" != typeof WebAssembly.instantiateStreaming || Ha(c) || "function" != typeof fetch ? Ka(c, a, b) : fetch(c, {credentials: "same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function (f) {
                    y(`wasm streaming compile failed: ${f}`);
                    y("falling back to ArrayBuffer instantiation");
                    return Ka(c, a, b)
                }))
            }

            function Ma(a) {
                this.name = "ExitStatus";
                this.message = `Program terminated with exit(${a})`;
                this.status = a
            }

            var Ca = [], Na = a => {
                if (!(a instanceof Ma || "unwind" == a)) throw a;
            }, Oa = 0, Pa = a => {
                sa = a;
                za || 0 < Oa || (ra = !0);
                throw new Ma(a);
            }, Qa = a => {
                if (!ra) try {
                    if (a(), !(za || 0 < Oa)) try {
                        sa = a = sa, Pa(a)
                    } catch (b) {
                        Na(b)
                    }
                } catch (b) {
                    Na(b)
                }
            }, B, Da = a => {
                let b = a.data, c = b._wsc;
                c && Qa(() => B.get(c)(...b.x))
            }, Ba = a => {
                Ca.push(a)
            }, Ea = a => {
                a.forEach(b => b(w))
            }, za = w.noExitRuntime || !0;

            class Ra {
                constructor(a) {
                    this.s = a - 24
                }
            }

            var Sa = 0, Ta = 0, Ua = "undefined" != typeof TextDecoder ? new TextDecoder : void 0,
                Va = (a, b = 0, c = NaN) => {
                    var d = b + c;
                    for (c = b; a[c] && !(c >= d);) ++c;
                    if (16 < c - b && a.buffer && Ua) return Ua.decode(a.slice(b, c));
                    for (d = ""; b < c;) {
                        var f = a[b++];
                        if (f & 128) {
                            var h = a[b++] & 63;
                            if (192 == (f & 224)) d += String.fromCharCode((f & 31) << 6 | h); else {
                                var l = a[b++] & 63;
                                f = 224 == (f & 240) ? (f & 15) << 12 | h << 6 | l : (f & 7) << 18 | h << 12 | l << 6 | a[b++] & 63;
                                65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023))
                            }
                        } else d += String.fromCharCode(f)
                    }
                    return d
                },
                Wa = (a, b) => a ? Va(q(), a, b) : "", C = {}, Xa = 1, D = {}, E = (a, b, c) => {
                    var d = q();
                    if (0 < c) {
                        var f = b;
                        c = b + c - 1;
                        for (var h = 0; h < a.length; ++h) {
                            var l = a.charCodeAt(h);
                            if (55296 <= l && 57343 >= l) {
                                var m = a.charCodeAt(++h);
                                l = 65536 + ((l & 1023) << 10) | m & 1023
                            }
                            if (127 >= l) {
                                if (b >= c) break;
                                d[b++] = l
                            } else {
                                if (2047 >= l) {
                                    if (b + 1 >= c) break;
                                    d[b++] = 192 | l >> 6
                                } else {
                                    if (65535 >= l) {
                                        if (b + 2 >= c) break;
                                        d[b++] = 224 | l >> 12
                                    } else {
                                        if (b + 3 >= c) break;
                                        d[b++] = 240 | l >> 18;
                                        d[b++] = 128 | l >> 12 & 63
                                    }
                                    d[b++] = 128 | l >> 6 & 63
                                }
                                d[b++] = 128 | l & 63
                            }
                        }
                        d[b] = 0;
                        a = b - f
                    } else a = 0;
                    return a
                }, F, Ya = a => {
                    var b = a.getExtension("ANGLE_instanced_arrays");
                    b && (a.vertexAttribDivisor = (c, d) => b.vertexAttribDivisorANGLE(c, d), a.drawArraysInstanced = (c, d, f, h) => b.drawArraysInstancedANGLE(c, d, f, h), a.drawElementsInstanced = (c, d, f, h, l) => b.drawElementsInstancedANGLE(c, d, f, h, l))
                }, Za = a => {
                    var b = a.getExtension("OES_vertex_array_object");
                    b && (a.createVertexArray = () => b.createVertexArrayOES(), a.deleteVertexArray = c => b.deleteVertexArrayOES(c), a.bindVertexArray = c => b.bindVertexArrayOES(c), a.isVertexArray = c => b.isVertexArrayOES(c))
                }, $a = a => {
                    var b = a.getExtension("WEBGL_draw_buffers");
                    b && (a.drawBuffers = (c, d) => b.drawBuffersWEBGL(c, d))
                }, ab = a => {
                    a.H = a.getExtension("WEBGL_draw_instanced_base_vertex_base_instance")
                }, bb = a => {
                    a.K = a.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance")
                }, cb = a => {
                    var b = "ANGLE_instanced_arrays EXT_blend_minmax EXT_disjoint_timer_query EXT_frag_depth EXT_shader_texture_lod EXT_sRGB OES_element_index_uint OES_fbo_render_mipmap OES_standard_derivatives OES_texture_float OES_texture_half_float OES_texture_half_float_linear OES_vertex_array_object WEBGL_color_buffer_float WEBGL_depth_texture WEBGL_draw_buffers EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" ");
                    return (a.getSupportedExtensions() || []).filter(c => b.includes(c))
                }, db = 1, eb = [], G = [], fb = [], gb = [], H = [], I = [], hb = [], ib = [], J = [], K = [], L = [],
                jb = {}, kb = {}, lb = 4, mb = 0, M = a => {
                    for (var b = db++, c = a.length; c < b; c++) a[c] = null;
                    return b
                }, O = (a, b, c, d) => {
                    for (var f = 0; f < a; f++) {
                        var h = F[c](), l = h && M(d);
                        h ? (h.name = l, d[l] = h) : N ||= 1282;
                        r()[b + 4 * f >> 2] = l
                    }
                }, ob = a => {
                    var b = {
                        J: 2,
                        alpha: !0,
                        depth: !0,
                        stencil: !0,
                        antialias: !1,
                        premultipliedAlpha: !0,
                        preserveDrawingBuffer: !1,
                        powerPreference: "default",
                        failIfMajorPerformanceCaveat: !1,
                        I: !0
                    };
                    a.s || (a.s = a.getContext,
                        a.getContext = function (d, f) {
                            f = a.s(d, f);
                            return "webgl" == d == f instanceof WebGLRenderingContext ? f : null
                        });
                    var c = 1 < b.J ? a.getContext("webgl2", b) : a.getContext("webgl", b);
                    return c ? nb(c, b) : 0
                }, nb = (a, b) => {
                    var c = M(ib), d = {handle: c, attributes: b, version: b.J, v: a};
                    a.canvas && (a.canvas.Z = d);
                    ib[c] = d;
                    ("undefined" == typeof b.I || b.I) && pb(d);
                    return c
                }, pb = a => {
                    a ||= P;
                    if (!a.S) {
                        a.S = !0;
                        var b = a.v;
                        b.T = b.getExtension("WEBGL_multi_draw");
                        b.P = b.getExtension("EXT_polygon_offset_clamp");
                        b.O = b.getExtension("EXT_clip_control");
                        b.Y = b.getExtension("WEBGL_polygon_mode");
                        Ya(b);
                        Za(b);
                        $a(b);
                        ab(b);
                        bb(b);
                        2 <= a.version && (b.g = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                        if (2 > a.version || !b.g) b.g = b.getExtension("EXT_disjoint_timer_query");
                        cb(b).forEach(c => {
                            c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
                        })
                    }
                }, N, P, qb = a => {
                    F.bindVertexArray(hb[a])
                }, rb = (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var d = r()[b + 4 * c >> 2], f = H[d];
                        f && (F.deleteTexture(f), f.name = 0, H[d] = null)
                    }
                }, sb = (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var d = r()[b + 4 * c >> 2];
                        F.deleteVertexArray(hb[d]);
                        hb[d] = null
                    }
                }, tb = [], ub = (a,
                                  b) => {
                    O(a, b, "createVertexArray", hb)
                }, vb = (a, b) => {
                    t()[a >> 2] = b;
                    var c = t()[a >> 2];
                    t()[a + 4 >> 2] = (b - c) / 4294967296
                };

            function wb() {
                var a = cb(F);
                return a = a.concat(a.map(b => "GL_" + b))
            }

            var xb = (a, b, c) => {
                if (b) {
                    var d = void 0;
                    switch (a) {
                        case 36346:
                            d = 1;
                            break;
                        case 36344:
                            0 != c && 1 != c && (N ||= 1280);
                            return;
                        case 34814:
                        case 36345:
                            d = 0;
                            break;
                        case 34466:
                            var f = F.getParameter(34467);
                            d = f ? f.length : 0;
                            break;
                        case 33309:
                            if (2 > P.version) {
                                N ||= 1282;
                                return
                            }
                            d = wb().length;
                            break;
                        case 33307:
                        case 33308:
                            if (2 > P.version) {
                                N ||= 1280;
                                return
                            }
                            d = 33307 == a ? 3 : 0
                    }
                    if (void 0 === d) switch (f = F.getParameter(a), typeof f) {
                        case "number":
                            d = f;
                            break;
                        case "boolean":
                            d = f ? 1 : 0;
                            break;
                        case "string":
                            N ||= 1280;
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
                                    d =
                                        0;
                                    break;
                                default:
                                    N ||= 1280;
                                    return
                            } else {
                                if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
                                    for (a = 0; a < f.length; ++a) switch (c) {
                                        case 0:
                                            r()[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 2:
                                            u()[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 4:
                                            e()[b + a] = f[a] ? 1 : 0
                                    }
                                    return
                                }
                                try {
                                    d = f.name | 0
                                } catch (h) {
                                    N ||= 1280;
                                    y(`GL_INVALID_ENUM in glGet${c}v: Unknown object returned from WebGL getParameter(${a})! (error: ${h})`);
                                    return
                                }
                            }
                            break;
                        default:
                            N ||= 1280;
                            y(`GL_INVALID_ENUM in glGet${c}v: Native code calling glGet${c}v(${a}) and it returns ${f} of type ${typeof f}!`);
                            return
                    }
                    switch (c) {
                        case 1:
                            vb(b, d);
                            break;
                        case 0:
                            r()[b >> 2] = d;
                            break;
                        case 2:
                            u()[b >> 2] = d;
                            break;
                        case 4:
                            e()[b] = d ? 1 : 0
                    }
                } else N ||= 1281
            }, yb = (a, b) => xb(a, b, 0), zb = (a, b, c) => {
                if (c) {
                    a = J[a];
                    b = 2 > P.version ? F.g.getQueryObjectEXT(a, b) : F.getQueryParameter(a, b);
                    var d;
                    "boolean" == typeof b ? d = b ? 1 : 0 : d = b;
                    vb(c, d)
                } else N ||= 1281
            }, Bb = a => {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var d = a.charCodeAt(c);
                    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3
                }
                b += 1;
                (c = Ab(b)) && E(a, c, b);
                return c
            }, Cb = a => {
                var b = jb[a];
                if (!b) {
                    switch (a) {
                        case 7939:
                            b = Bb(wb().join(" "));
                            break;
                        case 7936:
                        case 7937:
                        case 37445:
                        case 37446:
                            (b = F.getParameter(a)) || (N ||= 1280);
                            b = b ? Bb(b) : 0;
                            break;
                        case 7938:
                            b = F.getParameter(7938);
                            var c = `OpenGL ES 2.0 (${b})`;
                            2 <= P.version && (c = `OpenGL ES 3.0 (${b})`);
                            b = Bb(c);
                            break;
                        case 35724:
                            b = F.getParameter(35724);
                            c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                            null !== c && (3 == c[1].length && (c[1] += "0"), b = `OpenGL ES GLSL ES ${c[1]} (${b})`);
                            b = Bb(b);
                            break;
                        default:
                            N ||= 1280
                    }
                    jb[a] = b
                }
                return b
            }, Db = (a, b) => {
                if (2 > P.version) return N ||= 1282, 0;
                var c = kb[a];
                if (c) return 0 >
                b || b >= c.length ? (N ||= 1281, 0) : c[b];
                switch (a) {
                    case 7939:
                        return c = wb().map(Bb), c = kb[a] = c, 0 > b || b >= c.length ? (N ||= 1281, 0) : c[b];
                    default:
                        return N ||= 1280, 0
                }
            }, Eb = a => "]" == a.slice(-1) && a.lastIndexOf("["), Fb = a => {
                a -= 5120;
                0 == a ? a = e() : 1 == a ? a = q() : 2 == a ? (g.buffer != k.buffer && n(), a = ta) : 4 == a ? a = r() : 6 == a ? a = u() : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? a = t() : (g.buffer != k.buffer && n(), a = ua);
                return a
            }, Gb = (a, b, c, d, f) => {
                a = Fb(a);
                b = d * ((mb || c) * ({
                        5: 3,
                        6: 4,
                        8: 2,
                        29502: 3,
                        29504: 4,
                        26917: 2,
                        26918: 2,
                        29846: 3,
                        29847: 4
                    }[b - 6402] || 1) * a.BYTES_PER_ELEMENT +
                    lb - 1 & -lb);
                return a.subarray(f >>> 31 - Math.clz32(a.BYTES_PER_ELEMENT), f + b >>> 31 - Math.clz32(a.BYTES_PER_ELEMENT))
            }, Q = a => {
                var b = F.N;
                if (b) {
                    var c = b.u[a];
                    "number" == typeof c && (b.u[a] = c = F.getUniformLocation(b, b.L[a] + (0 < c ? `[${c}]` : "")));
                    return c
                }
                N ||= 1282
            }, R = [], Hb = [], Ib = {}, Kb = () => {
                if (!Jb) {
                    var a = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                        _: "./this.program"
                    }, b;
                    for (b in Ib) void 0 ===
                    Ib[b] ? delete a[b] : a[b] = Ib[b];
                    var c = [];
                    for (b in a) c.push(`${b}=${a[b]}`);
                    Jb = c
                }
                return Jb
            }, Jb, Lb = [null, [], []];

            function Mb() {
            }

            function Nb() {
            }

            function Ob() {
            }

            function Pb() {
            }

            function Qb() {
            }

            function Rb() {
            }

            function Sb() {
            }

            function Tb() {
            }

            function Ub() {
            }

            function Vb() {
            }

            function Wb() {
            }

            function Xb() {
            }

            function Yb() {
            }

            function Zb() {
            }

            function $b() {
            }

            function S() {
            }

            function ac() {
            }

            var U, bc = [], dc = a => cc(a);
            w.stackAlloc = dc;
            ka && (C[0] = this, addEventListener("message", Ba));
            for (var V = 0; 32 > V; ++V) tb.push(Array(V));
            var ec = new Float32Array(288);
            for (V = 0; 288 >= V; ++V) R[V] = ec.subarray(0, V);
            var fc = new Int32Array(288);
            for (V = 0; 288 >= V; ++V) Hb[V] = fc.subarray(0, V);
            (function () {
                if (w.skwasmSingleThreaded) {
                    Xb = function () {
                        return !0
                    };
                    let c;
                    Nb = function (d, f) {
                        c = f
                    };
                    Ob = function () {
                        return performance.now()
                    };
                    S = function (d) {
                        queueMicrotask(() => c(d))
                    }
                } else {
                    Xb = function () {
                        return !1
                    };
                    let c = 0;
                    Nb = function (d, f) {
                        function h({data: l}) {
                            const m = l.h;
                            m && ("syncTimeOrigin" == m ? c = performance.timeOrigin - l.timeOrigin : f(l))
                        }

                        d ? (C[d].addEventListener("message", h), C[d].postMessage({
                            h: "syncTimeOrigin",
                            timeOrigin: performance.timeOrigin
                        })) : addEventListener("message", h)
                    };
                    Ob = function () {
                        return performance.now() +
                            c
                    };
                    S = function (d, f, h) {
                        h ? C[h].postMessage(d, {transfer: f}) : postMessage(d, {transfer: f})
                    }
                }
                const a = new Map, b = new Map;
                ac = function (c, d, f) {
                    S({h: "setAssociatedObject", F: d, object: f}, [f], c)
                };
                Wb = function (c) {
                    return b.get(c)
                };
                Pb = function (c) {
                    Nb(c, function (d) {
                        var f = d.h;
                        if (f) switch (f) {
                            case "renderPictures":
                                gc(d.l, d.V, d.U, d.m, Ob());
                                break;
                            case "onRenderComplete":
                                hc(d.l, d.m, {
                                    imageBitmaps: d.R,
                                    rasterStartMilliseconds: d.X,
                                    rasterEndMilliseconds: d.W
                                });
                                break;
                            case "setAssociatedObject":
                                b.set(d.F, d.object);
                                break;
                            case "disposeAssociatedObject":
                                d =
                                    d.F;
                                f = b.get(d);
                                f.close && f.close();
                                b.delete(d);
                                break;
                            case "disposeSurface":
                                ic(d.l);
                                break;
                            case "rasterizeImage":
                                jc(d.l, d.image, d.format, d.m);
                                break;
                            case "onRasterizeComplete":
                                kc(d.l, d.data, d.m);
                                break;
                            default:
                                console.warn(`unrecognized skwasm message: ${f}`)
                        }
                    })
                };
                Ub = function (c, d, f, h, l) {
                    S({h: "renderPictures", l: d, V: f, U: h, m: l}, [], c)
                };
                Rb = function (c, d) {
                    c = new OffscreenCanvas(c, d);
                    d = ob(c);
                    a.set(d, c);
                    return d
                };
                $b = function (c, d, f) {
                    c = a.get(c);
                    c.width = d;
                    c.height = f
                };
                Mb = function (c, d) {
                    d ||= [];
                    c = a.get(c);
                    d.push(c.transferToImageBitmap());
                    return d
                };
                Yb = async function (c, d, f, h) {
                    S({h: "onRenderComplete", l: c, m: h, R: d, X: f, W: Ob()}, [...d])
                };
                Qb = function (c, d, f) {
                    const h = P.v, l = h.createTexture();
                    h.bindTexture(h.TEXTURE_2D, l);
                    h.pixelStorei(h.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
                    h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, d, f, 0, h.RGBA, h.UNSIGNED_BYTE, c);
                    h.pixelStorei(h.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);
                    h.bindTexture(h.TEXTURE_2D, null);
                    c = M(H);
                    H[c] = l;
                    return c
                };
                Vb = function (c, d) {
                    S({h: "disposeAssociatedObject", F: d}, [], c)
                };
                Sb = function (c, d) {
                    S({h: "disposeSurface", l: d},
                        [], c)
                };
                Tb = function (c, d, f, h, l) {
                    S({h: "rasterizeImage", l: d, image: f, format: h, m: l}, [], c)
                };
                Zb = function (c, d, f) {
                    S({h: "onRasterizeComplete", l: c, data: d, m: f})
                }
            })();
            var wc = {
                __cxa_throw: (a, b, c) => {
                    var d = new Ra(a);
                    t()[d.s + 16 >> 2] = 0;
                    t()[d.s + 4 >> 2] = b;
                    t()[d.s + 8 >> 2] = c;
                    Sa = a;
                    Ta++;
                    throw Sa;
                },
                __syscall_fcntl64: function () {
                    return 0
                },
                __syscall_fstat64: () => {
                },
                __syscall_ioctl: function () {
                    return 0
                },
                __syscall_openat: function () {
                },
                _abort_js: () => {
                    Ga("")
                },
                _emscripten_create_wasm_worker: (a, b) => {
                    let c = C[Xa] = new Worker(ma("skwasm.ww.js"));
                    c.postMessage({
                        $ww: Xa,
                        wasm: qa,
                        js: w.mainScriptUrlOrBlob || _scriptName,
                        wasmMemory: g,
                        sb: a,
                        sz: b
                    });
                    c.onmessage = Da;
                    return Xa++
                },
                _emscripten_get_now_is_monotonic: () =>
                    1,
                _emscripten_runtime_keepalive_clear: () => {
                    za = !1;
                    Oa = 0
                },
                _emscripten_throw_longjmp: () => {
                    throw Infinity;
                },
                _mmap_js: function () {
                    return -52
                },
                _munmap_js: function () {
                },
                _setitimer_js: (a, b) => {
                    D[a] && (clearTimeout(D[a].id), delete D[a]);
                    if (!b) return 0;
                    var c = setTimeout(() => {
                        delete D[a];
                        Qa(() => lc(a, performance.now()))
                    }, b);
                    D[a] = {id: c, aa: b};
                    return 0
                },
                _tzset_js: (a, b, c, d) => {
                    var f = (new Date).getFullYear(), h = (new Date(f, 0, 1)).getTimezoneOffset();
                    f = (new Date(f, 6, 1)).getTimezoneOffset();
                    var l = Math.max(h, f);
                    t()[a >> 2] = 60 * l;
                    r()[b >> 2] = Number(h != f);
                    b = m => {
                        var p = Math.abs(m);
                        return `UTC${0 <= m ? "-" : "+"}${String(Math.floor(p / 60)).padStart(2, "0")}${String(p % 60).padStart(2, "0")}`
                    };
                    a = b(h);
                    b = b(f);
                    f < h ? (E(a, c, 17), E(b, d, 17)) : (E(a, d, 17), E(b, c, 17))
                },
                emscripten_get_now: () => performance.now(),
                emscripten_glActiveTexture: a => F.activeTexture(a),
                emscripten_glAttachShader: (a, b) => {
                    F.attachShader(G[a], I[b])
                },
                emscripten_glBeginQuery: (a, b) => {
                    F.beginQuery(a, J[b])
                },
                emscripten_glBeginQueryEXT: (a, b) => {
                    F.g.beginQueryEXT(a, J[b])
                },
                emscripten_glBindAttribLocation: (a,
                                                  b, c) => {
                    F.bindAttribLocation(G[a], b, Wa(c))
                },
                emscripten_glBindBuffer: (a, b) => {
                    35051 == a ? F.D = b : 35052 == a && (F.o = b);
                    F.bindBuffer(a, eb[b])
                },
                emscripten_glBindFramebuffer: (a, b) => {
                    F.bindFramebuffer(a, fb[b])
                },
                emscripten_glBindRenderbuffer: (a, b) => {
                    F.bindRenderbuffer(a, gb[b])
                },
                emscripten_glBindSampler: (a, b) => {
                    F.bindSampler(a, K[b])
                },
                emscripten_glBindTexture: (a, b) => {
                    F.bindTexture(a, H[b])
                },
                emscripten_glBindVertexArray: qb,
                emscripten_glBindVertexArrayOES: qb,
                emscripten_glBlendColor: (a, b, c, d) => F.blendColor(a, b, c, d),
                emscripten_glBlendEquation: a =>
                    F.blendEquation(a),
                emscripten_glBlendFunc: (a, b) => F.blendFunc(a, b),
                emscripten_glBlitFramebuffer: (a, b, c, d, f, h, l, m, p, v) => F.blitFramebuffer(a, b, c, d, f, h, l, m, p, v),
                emscripten_glBufferData: (a, b, c, d) => {
                    2 <= P.version ? c && b ? F.bufferData(a, q(), d, c, b) : F.bufferData(a, b, d) : F.bufferData(a, c ? q().subarray(c, c + b) : b, d)
                },
                emscripten_glBufferSubData: (a, b, c, d) => {
                    2 <= P.version ? c && F.bufferSubData(a, b, q(), d, c) : F.bufferSubData(a, b, q().subarray(d, d + c))
                },
                emscripten_glCheckFramebufferStatus: a => F.checkFramebufferStatus(a),
                emscripten_glClear: a =>
                    F.clear(a),
                emscripten_glClearColor: (a, b, c, d) => F.clearColor(a, b, c, d),
                emscripten_glClearStencil: a => F.clearStencil(a),
                emscripten_glClientWaitSync: (a, b, c, d) => F.clientWaitSync(L[a], b, (c >>> 0) + 4294967296 * d),
                emscripten_glColorMask: (a, b, c, d) => {
                    F.colorMask(!!a, !!b, !!c, !!d)
                },
                emscripten_glCompileShader: a => {
                    F.compileShader(I[a])
                },
                emscripten_glCompressedTexImage2D: (a, b, c, d, f, h, l, m) => {
                    2 <= P.version ? F.o || !l ? F.compressedTexImage2D(a, b, c, d, f, h, l, m) : F.compressedTexImage2D(a, b, c, d, f, h, q(), m, l) : F.compressedTexImage2D(a,
                        b, c, d, f, h, q().subarray(m, m + l))
                },
                emscripten_glCompressedTexSubImage2D: (a, b, c, d, f, h, l, m, p) => {
                    2 <= P.version ? F.o || !m ? F.compressedTexSubImage2D(a, b, c, d, f, h, l, m, p) : F.compressedTexSubImage2D(a, b, c, d, f, h, l, q(), p, m) : F.compressedTexSubImage2D(a, b, c, d, f, h, l, q().subarray(p, p + m))
                },
                emscripten_glCopyBufferSubData: (a, b, c, d, f) => F.copyBufferSubData(a, b, c, d, f),
                emscripten_glCopyTexSubImage2D: (a, b, c, d, f, h, l, m) => F.copyTexSubImage2D(a, b, c, d, f, h, l, m),
                emscripten_glCreateProgram: () => {
                    var a = M(G), b = F.createProgram();
                    b.name = a;
                    b.C = b.A = b.B = 0;
                    b.G = 1;
                    G[a] = b;
                    return a
                },
                emscripten_glCreateShader: a => {
                    var b = M(I);
                    I[b] = F.createShader(a);
                    return b
                },
                emscripten_glCullFace: a => F.cullFace(a),
                emscripten_glDeleteBuffers: (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var d = r()[b + 4 * c >> 2], f = eb[d];
                        f && (F.deleteBuffer(f), f.name = 0, eb[d] = null, d == F.D && (F.D = 0), d == F.o && (F.o = 0))
                    }
                },
                emscripten_glDeleteFramebuffers: (a, b) => {
                    for (var c = 0; c < a; ++c) {
                        var d = r()[b + 4 * c >> 2], f = fb[d];
                        f && (F.deleteFramebuffer(f), f.name = 0, fb[d] = null)
                    }
                },
                emscripten_glDeleteProgram: a => {
                    if (a) {
                        var b = G[a];
                        b ? (F.deleteProgram(b),
                            b.name = 0, G[a] = null) : N ||= 1281
                    }
                },
                emscripten_glDeleteQueries: (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var d = r()[b + 4 * c >> 2], f = J[d];
                        f && (F.deleteQuery(f), J[d] = null)
                    }
                },
                emscripten_glDeleteQueriesEXT: (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var d = r()[b + 4 * c >> 2], f = J[d];
                        f && (F.g.deleteQueryEXT(f), J[d] = null)
                    }
                },
                emscripten_glDeleteRenderbuffers: (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var d = r()[b + 4 * c >> 2], f = gb[d];
                        f && (F.deleteRenderbuffer(f), f.name = 0, gb[d] = null)
                    }
                },
                emscripten_glDeleteSamplers: (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var d = r()[b + 4 * c >> 2], f = K[d];
                        f &&
                        (F.deleteSampler(f), f.name = 0, K[d] = null)
                    }
                },
                emscripten_glDeleteShader: a => {
                    if (a) {
                        var b = I[a];
                        b ? (F.deleteShader(b), I[a] = null) : N ||= 1281
                    }
                },
                emscripten_glDeleteSync: a => {
                    if (a) {
                        var b = L[a];
                        b ? (F.deleteSync(b), b.name = 0, L[a] = null) : N ||= 1281
                    }
                },
                emscripten_glDeleteTextures: rb,
                emscripten_glDeleteVertexArrays: sb,
                emscripten_glDeleteVertexArraysOES: sb,
                emscripten_glDepthMask: a => {
                    F.depthMask(!!a)
                },
                emscripten_glDisable: a => F.disable(a),
                emscripten_glDisableVertexAttribArray: a => {
                    F.disableVertexAttribArray(a)
                },
                emscripten_glDrawArrays: (a,
                                          b, c) => {
                    F.drawArrays(a, b, c)
                },
                emscripten_glDrawArraysInstanced: (a, b, c, d) => {
                    F.drawArraysInstanced(a, b, c, d)
                },
                emscripten_glDrawArraysInstancedBaseInstanceWEBGL: (a, b, c, d, f) => {
                    F.H.drawArraysInstancedBaseInstanceWEBGL(a, b, c, d, f)
                },
                emscripten_glDrawBuffers: (a, b) => {
                    for (var c = tb[a], d = 0; d < a; d++) c[d] = r()[b + 4 * d >> 2];
                    F.drawBuffers(c)
                },
                emscripten_glDrawElements: (a, b, c, d) => {
                    F.drawElements(a, b, c, d)
                },
                emscripten_glDrawElementsInstanced: (a, b, c, d, f) => {
                    F.drawElementsInstanced(a, b, c, d, f)
                },
                emscripten_glDrawElementsInstancedBaseVertexBaseInstanceWEBGL: (a,
                                                                                b, c, d, f, h, l) => {
                    F.H.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, d, f, h, l)
                },
                emscripten_glDrawRangeElements: (a, b, c, d, f, h) => {
                    F.drawElements(a, d, f, h)
                },
                emscripten_glEnable: a => F.enable(a),
                emscripten_glEnableVertexAttribArray: a => {
                    F.enableVertexAttribArray(a)
                },
                emscripten_glEndQuery: a => F.endQuery(a),
                emscripten_glEndQueryEXT: a => {
                    F.g.endQueryEXT(a)
                },
                emscripten_glFenceSync: (a, b) => (a = F.fenceSync(a, b)) ? (b = M(L), a.name = b, L[b] = a, b) : 0,
                emscripten_glFinish: () => F.finish(),
                emscripten_glFlush: () => F.flush(),
                emscripten_glFramebufferRenderbuffer: (a,
                                                       b, c, d) => {
                    F.framebufferRenderbuffer(a, b, c, gb[d])
                },
                emscripten_glFramebufferTexture2D: (a, b, c, d, f) => {
                    F.framebufferTexture2D(a, b, c, H[d], f)
                },
                emscripten_glFrontFace: a => F.frontFace(a),
                emscripten_glGenBuffers: (a, b) => {
                    O(a, b, "createBuffer", eb)
                },
                emscripten_glGenFramebuffers: (a, b) => {
                    O(a, b, "createFramebuffer", fb)
                },
                emscripten_glGenQueries: (a, b) => {
                    O(a, b, "createQuery", J)
                },
                emscripten_glGenQueriesEXT: (a, b) => {
                    for (var c = 0; c < a; c++) {
                        var d = F.g.createQueryEXT();
                        if (!d) {
                            for (N ||= 1282; c < a;) r()[b + 4 * c++ >> 2] = 0;
                            break
                        }
                        var f = M(J);
                        d.name = f;
                        J[f] = d;
                        r()[b + 4 * c >> 2] = f
                    }
                },
                emscripten_glGenRenderbuffers: (a, b) => {
                    O(a, b, "createRenderbuffer", gb)
                },
                emscripten_glGenSamplers: (a, b) => {
                    O(a, b, "createSampler", K)
                },
                emscripten_glGenTextures: (a, b) => {
                    O(a, b, "createTexture", H)
                },
                emscripten_glGenVertexArrays: ub,
                emscripten_glGenVertexArraysOES: ub,
                emscripten_glGenerateMipmap: a => F.generateMipmap(a),
                emscripten_glGetBufferParameteriv: (a, b, c) => {
                    c ? r()[c >> 2] = F.getBufferParameter(a, b) : N ||= 1281
                },
                emscripten_glGetError: () => {
                    var a = F.getError() || N;
                    N = 0;
                    return a
                },
                emscripten_glGetFloatv: (a,
                                         b) => xb(a, b, 2),
                emscripten_glGetFramebufferAttachmentParameteriv: (a, b, c, d) => {
                    a = F.getFramebufferAttachmentParameter(a, b, c);
                    if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;
                    r()[d >> 2] = a
                },
                emscripten_glGetIntegerv: yb,
                emscripten_glGetProgramInfoLog: (a, b, c, d) => {
                    a = F.getProgramInfoLog(G[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && d ? E(a, d, b) : 0;
                    c && (r()[c >> 2] = b)
                },
                emscripten_glGetProgramiv: (a, b, c) => {
                    if (c) if (a >= db) N ||= 1281; else if (a = G[a], 35716 == b) a = F.getProgramInfoLog(a), null === a && (a = "(unknown error)"),
                        r()[c >> 2] = a.length + 1; else if (35719 == b) {
                        if (!a.C) {
                            var d = F.getProgramParameter(a, 35718);
                            for (b = 0; b < d; ++b) a.C = Math.max(a.C, F.getActiveUniform(a, b).name.length + 1)
                        }
                        r()[c >> 2] = a.C
                    } else if (35722 == b) {
                        if (!a.A) for (d = F.getProgramParameter(a, 35721), b = 0; b < d; ++b) a.A = Math.max(a.A, F.getActiveAttrib(a, b).name.length + 1);
                        r()[c >> 2] = a.A
                    } else if (35381 == b) {
                        if (!a.B) for (d = F.getProgramParameter(a, 35382), b = 0; b < d; ++b) a.B = Math.max(a.B, F.getActiveUniformBlockName(a, b).length + 1);
                        r()[c >> 2] = a.B
                    } else r()[c >> 2] = F.getProgramParameter(a,
                        b); else N ||= 1281
                },
                emscripten_glGetQueryObjecti64vEXT: zb,
                emscripten_glGetQueryObjectui64vEXT: zb,
                emscripten_glGetQueryObjectuiv: (a, b, c) => {
                    if (c) {
                        a = F.getQueryParameter(J[a], b);
                        var d;
                        "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
                        r()[c >> 2] = d
                    } else N ||= 1281
                },
                emscripten_glGetQueryObjectuivEXT: (a, b, c) => {
                    if (c) {
                        a = F.g.getQueryObjectEXT(J[a], b);
                        var d;
                        "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
                        r()[c >> 2] = d
                    } else N ||= 1281
                },
                emscripten_glGetQueryiv: (a, b, c) => {
                    c ? r()[c >> 2] = F.getQuery(a, b) : N ||= 1281
                },
                emscripten_glGetQueryivEXT: (a, b, c) => {
                    c ? r()[c >>
                    2] = F.g.getQueryEXT(a, b) : N ||= 1281
                },
                emscripten_glGetRenderbufferParameteriv: (a, b, c) => {
                    c ? r()[c >> 2] = F.getRenderbufferParameter(a, b) : N ||= 1281
                },
                emscripten_glGetShaderInfoLog: (a, b, c, d) => {
                    a = F.getShaderInfoLog(I[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && d ? E(a, d, b) : 0;
                    c && (r()[c >> 2] = b)
                },
                emscripten_glGetShaderPrecisionFormat: (a, b, c, d) => {
                    a = F.getShaderPrecisionFormat(a, b);
                    r()[c >> 2] = a.rangeMin;
                    r()[c + 4 >> 2] = a.rangeMax;
                    r()[d >> 2] = a.precision
                },
                emscripten_glGetShaderiv: (a, b, c) => {
                    c ? 35716 == b ? (a = F.getShaderInfoLog(I[a]),
                    null === a && (a = "(unknown error)"), a = a ? a.length + 1 : 0, r()[c >> 2] = a) : 35720 == b ? (a = (a = F.getShaderSource(I[a])) ? a.length + 1 : 0, r()[c >> 2] = a) : r()[c >> 2] = F.getShaderParameter(I[a], b) : N ||= 1281
                },
                emscripten_glGetString: Cb,
                emscripten_glGetStringi: Db,
                emscripten_glGetUniformLocation: (a, b) => {
                    b = Wa(b);
                    if (a = G[a]) {
                        var c = a, d = c.u, f = c.M, h;
                        if (!d) {
                            c.u = d = {};
                            c.L = {};
                            var l = F.getProgramParameter(c, 35718);
                            for (h = 0; h < l; ++h) {
                                var m = F.getActiveUniform(c, h);
                                var p = m.name;
                                m = m.size;
                                var v = Eb(p);
                                v = 0 < v ? p.slice(0, v) : p;
                                var T = c.G;
                                c.G += m;
                                f[v] = [m, T];
                                for (p = 0; p < m; ++p) d[T] = p, c.L[T++] = v
                            }
                        }
                        c = a.u;
                        d = 0;
                        f = b;
                        h = Eb(b);
                        0 < h && (d = parseInt(b.slice(h + 1)) >>> 0, f = b.slice(0, h));
                        if ((f = a.M[f]) && d < f[0] && (d += f[1], c[d] = c[d] || F.getUniformLocation(a, b))) return d
                    } else N ||= 1281;
                    return -1
                },
                emscripten_glInvalidateFramebuffer: (a, b, c) => {
                    for (var d = tb[b], f = 0; f < b; f++) d[f] = r()[c + 4 * f >> 2];
                    F.invalidateFramebuffer(a, d)
                },
                emscripten_glInvalidateSubFramebuffer: (a, b, c, d, f, h, l) => {
                    for (var m = tb[b], p = 0; p < b; p++) m[p] = r()[c + 4 * p >> 2];
                    F.invalidateSubFramebuffer(a, m, d, f, h, l)
                },
                emscripten_glIsSync: a => F.isSync(L[a]),
                emscripten_glIsTexture: a => (a = H[a]) ? F.isTexture(a) : 0,
                emscripten_glLineWidth: a => F.lineWidth(a),
                emscripten_glLinkProgram: a => {
                    a = G[a];
                    F.linkProgram(a);
                    a.u = 0;
                    a.M = {}
                },
                emscripten_glMultiDrawArraysInstancedBaseInstanceWEBGL: (a, b, c, d, f, h) => {
                    F.K.multiDrawArraysInstancedBaseInstanceWEBGL(a, r(), b >> 2, r(), c >> 2, r(), d >> 2, t(), f >> 2, h)
                },
                emscripten_glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL: (a, b, c, d, f, h, l, m) => {
                    F.K.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, r(), b >> 2, c, r(), d >> 2, r(), f >> 2, r(), h >>
                        2, t(), l >> 2, m)
                },
                emscripten_glPixelStorei: (a, b) => {
                    3317 == a ? lb = b : 3314 == a && (mb = b);
                    F.pixelStorei(a, b)
                },
                emscripten_glQueryCounterEXT: (a, b) => {
                    F.g.queryCounterEXT(J[a], b)
                },
                emscripten_glReadBuffer: a => F.readBuffer(a),
                emscripten_glReadPixels: (a, b, c, d, f, h, l) => {
                    if (2 <= P.version) if (F.D) F.readPixels(a, b, c, d, f, h, l); else {
                        var m = Fb(h);
                        l >>>= 31 - Math.clz32(m.BYTES_PER_ELEMENT);
                        F.readPixels(a, b, c, d, f, h, m, l)
                    } else (m = Gb(h, f, c, d, l)) ? F.readPixels(a, b, c, d, f, h, m) : N ||= 1280
                },
                emscripten_glRenderbufferStorage: (a, b, c, d) => F.renderbufferStorage(a,
                    b, c, d),
                emscripten_glRenderbufferStorageMultisample: (a, b, c, d, f) => F.renderbufferStorageMultisample(a, b, c, d, f),
                emscripten_glSamplerParameterf: (a, b, c) => {
                    F.samplerParameterf(K[a], b, c)
                },
                emscripten_glSamplerParameteri: (a, b, c) => {
                    F.samplerParameteri(K[a], b, c)
                },
                emscripten_glSamplerParameteriv: (a, b, c) => {
                    c = r()[c >> 2];
                    F.samplerParameteri(K[a], b, c)
                },
                emscripten_glScissor: (a, b, c, d) => F.scissor(a, b, c, d),
                emscripten_glShaderSource: (a, b, c, d) => {
                    for (var f = "", h = 0; h < b; ++h) {
                        var l = d ? t()[d + 4 * h >> 2] : void 0;
                        f += Wa(t()[c + 4 * h >> 2],
                            l)
                    }
                    F.shaderSource(I[a], f)
                },
                emscripten_glStencilFunc: (a, b, c) => F.stencilFunc(a, b, c),
                emscripten_glStencilFuncSeparate: (a, b, c, d) => F.stencilFuncSeparate(a, b, c, d),
                emscripten_glStencilMask: a => F.stencilMask(a),
                emscripten_glStencilMaskSeparate: (a, b) => F.stencilMaskSeparate(a, b),
                emscripten_glStencilOp: (a, b, c) => F.stencilOp(a, b, c),
                emscripten_glStencilOpSeparate: (a, b, c, d) => F.stencilOpSeparate(a, b, c, d),
                emscripten_glTexImage2D: (a, b, c, d, f, h, l, m, p) => {
                    if (2 <= P.version) {
                        if (F.o) {
                            F.texImage2D(a, b, c, d, f, h, l, m, p);
                            return
                        }
                        if (p) {
                            var v =
                                Fb(m);
                            p >>>= 31 - Math.clz32(v.BYTES_PER_ELEMENT);
                            F.texImage2D(a, b, c, d, f, h, l, m, v, p);
                            return
                        }
                    }
                    v = p ? Gb(m, l, d, f, p) : null;
                    F.texImage2D(a, b, c, d, f, h, l, m, v)
                },
                emscripten_glTexParameterf: (a, b, c) => F.texParameterf(a, b, c),
                emscripten_glTexParameterfv: (a, b, c) => {
                    c = u()[c >> 2];
                    F.texParameterf(a, b, c)
                },
                emscripten_glTexParameteri: (a, b, c) => F.texParameteri(a, b, c),
                emscripten_glTexParameteriv: (a, b, c) => {
                    c = r()[c >> 2];
                    F.texParameteri(a, b, c)
                },
                emscripten_glTexStorage2D: (a, b, c, d, f) => F.texStorage2D(a, b, c, d, f),
                emscripten_glTexSubImage2D: (a,
                                             b, c, d, f, h, l, m, p) => {
                    if (2 <= P.version) {
                        if (F.o) {
                            F.texSubImage2D(a, b, c, d, f, h, l, m, p);
                            return
                        }
                        if (p) {
                            var v = Fb(m);
                            F.texSubImage2D(a, b, c, d, f, h, l, m, v, p >>> 31 - Math.clz32(v.BYTES_PER_ELEMENT));
                            return
                        }
                    }
                    p = p ? Gb(m, l, f, h, p) : null;
                    F.texSubImage2D(a, b, c, d, f, h, l, m, p)
                },
                emscripten_glUniform1f: (a, b) => {
                    F.uniform1f(Q(a), b)
                },
                emscripten_glUniform1fv: (a, b, c) => {
                    if (2 <= P.version) b && F.uniform1fv(Q(a), u(), c >> 2, b); else {
                        if (288 >= b) for (var d = R[b], f = 0; f < b; ++f) d[f] = u()[c + 4 * f >> 2]; else d = u().subarray(c >> 2, c + 4 * b >> 2);
                        F.uniform1fv(Q(a), d)
                    }
                },
                emscripten_glUniform1i: (a,
                                         b) => {
                    F.uniform1i(Q(a), b)
                },
                emscripten_glUniform1iv: (a, b, c) => {
                    if (2 <= P.version) b && F.uniform1iv(Q(a), r(), c >> 2, b); else {
                        if (288 >= b) for (var d = Hb[b], f = 0; f < b; ++f) d[f] = r()[c + 4 * f >> 2]; else d = r().subarray(c >> 2, c + 4 * b >> 2);
                        F.uniform1iv(Q(a), d)
                    }
                },
                emscripten_glUniform2f: (a, b, c) => {
                    F.uniform2f(Q(a), b, c)
                },
                emscripten_glUniform2fv: (a, b, c) => {
                    if (2 <= P.version) b && F.uniform2fv(Q(a), u(), c >> 2, 2 * b); else {
                        if (144 >= b) {
                            b *= 2;
                            for (var d = R[b], f = 0; f < b; f += 2) d[f] = u()[c + 4 * f >> 2], d[f + 1] = u()[c + (4 * f + 4) >> 2]
                        } else d = u().subarray(c >> 2, c + 8 * b >> 2);
                        F.uniform2fv(Q(a),
                            d)
                    }
                },
                emscripten_glUniform2i: (a, b, c) => {
                    F.uniform2i(Q(a), b, c)
                },
                emscripten_glUniform2iv: (a, b, c) => {
                    if (2 <= P.version) b && F.uniform2iv(Q(a), r(), c >> 2, 2 * b); else {
                        if (144 >= b) {
                            b *= 2;
                            for (var d = Hb[b], f = 0; f < b; f += 2) d[f] = r()[c + 4 * f >> 2], d[f + 1] = r()[c + (4 * f + 4) >> 2]
                        } else d = r().subarray(c >> 2, c + 8 * b >> 2);
                        F.uniform2iv(Q(a), d)
                    }
                },
                emscripten_glUniform3f: (a, b, c, d) => {
                    F.uniform3f(Q(a), b, c, d)
                },
                emscripten_glUniform3fv: (a, b, c) => {
                    if (2 <= P.version) b && F.uniform3fv(Q(a), u(), c >> 2, 3 * b); else {
                        if (96 >= b) {
                            b *= 3;
                            for (var d = R[b], f = 0; f < b; f += 3) d[f] = u()[c +
                            4 * f >> 2], d[f + 1] = u()[c + (4 * f + 4) >> 2], d[f + 2] = u()[c + (4 * f + 8) >> 2]
                        } else d = u().subarray(c >> 2, c + 12 * b >> 2);
                        F.uniform3fv(Q(a), d)
                    }
                },
                emscripten_glUniform3i: (a, b, c, d) => {
                    F.uniform3i(Q(a), b, c, d)
                },
                emscripten_glUniform3iv: (a, b, c) => {
                    if (2 <= P.version) b && F.uniform3iv(Q(a), r(), c >> 2, 3 * b); else {
                        if (96 >= b) {
                            b *= 3;
                            for (var d = Hb[b], f = 0; f < b; f += 3) d[f] = r()[c + 4 * f >> 2], d[f + 1] = r()[c + (4 * f + 4) >> 2], d[f + 2] = r()[c + (4 * f + 8) >> 2]
                        } else d = r().subarray(c >> 2, c + 12 * b >> 2);
                        F.uniform3iv(Q(a), d)
                    }
                },
                emscripten_glUniform4f: (a, b, c, d, f) => {
                    F.uniform4f(Q(a), b, c, d, f)
                },
                emscripten_glUniform4fv: (a, b, c) => {
                    if (2 <= P.version) b && F.uniform4fv(Q(a), u(), c >> 2, 4 * b); else {
                        if (72 >= b) {
                            var d = R[4 * b], f = u();
                            c >>= 2;
                            b *= 4;
                            for (var h = 0; h < b; h += 4) {
                                var l = c + h;
                                d[h] = f[l];
                                d[h + 1] = f[l + 1];
                                d[h + 2] = f[l + 2];
                                d[h + 3] = f[l + 3]
                            }
                        } else d = u().subarray(c >> 2, c + 16 * b >> 2);
                        F.uniform4fv(Q(a), d)
                    }
                },
                emscripten_glUniform4i: (a, b, c, d, f) => {
                    F.uniform4i(Q(a), b, c, d, f)
                },
                emscripten_glUniform4iv: (a, b, c) => {
                    if (2 <= P.version) b && F.uniform4iv(Q(a), r(), c >> 2, 4 * b); else {
                        if (72 >= b) {
                            b *= 4;
                            for (var d = Hb[b], f = 0; f < b; f += 4) d[f] = r()[c + 4 * f >> 2], d[f + 1] = r()[c +
                            (4 * f + 4) >> 2], d[f + 2] = r()[c + (4 * f + 8) >> 2], d[f + 3] = r()[c + (4 * f + 12) >> 2]
                        } else d = r().subarray(c >> 2, c + 16 * b >> 2);
                        F.uniform4iv(Q(a), d)
                    }
                },
                emscripten_glUniformMatrix2fv: (a, b, c, d) => {
                    if (2 <= P.version) b && F.uniformMatrix2fv(Q(a), !!c, u(), d >> 2, 4 * b); else {
                        if (72 >= b) {
                            b *= 4;
                            for (var f = R[b], h = 0; h < b; h += 4) f[h] = u()[d + 4 * h >> 2], f[h + 1] = u()[d + (4 * h + 4) >> 2], f[h + 2] = u()[d + (4 * h + 8) >> 2], f[h + 3] = u()[d + (4 * h + 12) >> 2]
                        } else f = u().subarray(d >> 2, d + 16 * b >> 2);
                        F.uniformMatrix2fv(Q(a), !!c, f)
                    }
                },
                emscripten_glUniformMatrix3fv: (a, b, c, d) => {
                    if (2 <= P.version) b && F.uniformMatrix3fv(Q(a),
                        !!c, u(), d >> 2, 9 * b); else {
                        if (32 >= b) {
                            b *= 9;
                            for (var f = R[b], h = 0; h < b; h += 9) f[h] = u()[d + 4 * h >> 2], f[h + 1] = u()[d + (4 * h + 4) >> 2], f[h + 2] = u()[d + (4 * h + 8) >> 2], f[h + 3] = u()[d + (4 * h + 12) >> 2], f[h + 4] = u()[d + (4 * h + 16) >> 2], f[h + 5] = u()[d + (4 * h + 20) >> 2], f[h + 6] = u()[d + (4 * h + 24) >> 2], f[h + 7] = u()[d + (4 * h + 28) >> 2], f[h + 8] = u()[d + (4 * h + 32) >> 2]
                        } else f = u().subarray(d >> 2, d + 36 * b >> 2);
                        F.uniformMatrix3fv(Q(a), !!c, f)
                    }
                },
                emscripten_glUniformMatrix4fv: (a, b, c, d) => {
                    if (2 <= P.version) b && F.uniformMatrix4fv(Q(a), !!c, u(), d >> 2, 16 * b); else {
                        if (18 >= b) {
                            var f = R[16 * b], h = u();
                            d >>=
                                2;
                            b *= 16;
                            for (var l = 0; l < b; l += 16) {
                                var m = d + l;
                                f[l] = h[m];
                                f[l + 1] = h[m + 1];
                                f[l + 2] = h[m + 2];
                                f[l + 3] = h[m + 3];
                                f[l + 4] = h[m + 4];
                                f[l + 5] = h[m + 5];
                                f[l + 6] = h[m + 6];
                                f[l + 7] = h[m + 7];
                                f[l + 8] = h[m + 8];
                                f[l + 9] = h[m + 9];
                                f[l + 10] = h[m + 10];
                                f[l + 11] = h[m + 11];
                                f[l + 12] = h[m + 12];
                                f[l + 13] = h[m + 13];
                                f[l + 14] = h[m + 14];
                                f[l + 15] = h[m + 15]
                            }
                        } else f = u().subarray(d >> 2, d + 64 * b >> 2);
                        F.uniformMatrix4fv(Q(a), !!c, f)
                    }
                },
                emscripten_glUseProgram: a => {
                    a = G[a];
                    F.useProgram(a);
                    F.N = a
                },
                emscripten_glVertexAttrib1f: (a, b) => F.vertexAttrib1f(a, b),
                emscripten_glVertexAttrib2fv: (a, b) => {
                    F.vertexAttrib2f(a,
                        u()[b >> 2], u()[b + 4 >> 2])
                },
                emscripten_glVertexAttrib3fv: (a, b) => {
                    F.vertexAttrib3f(a, u()[b >> 2], u()[b + 4 >> 2], u()[b + 8 >> 2])
                },
                emscripten_glVertexAttrib4fv: (a, b) => {
                    F.vertexAttrib4f(a, u()[b >> 2], u()[b + 4 >> 2], u()[b + 8 >> 2], u()[b + 12 >> 2])
                },
                emscripten_glVertexAttribDivisor: (a, b) => {
                    F.vertexAttribDivisor(a, b)
                },
                emscripten_glVertexAttribIPointer: (a, b, c, d, f) => {
                    F.vertexAttribIPointer(a, b, c, d, f)
                },
                emscripten_glVertexAttribPointer: (a, b, c, d, f, h) => {
                    F.vertexAttribPointer(a, b, c, !!d, f, h)
                },
                emscripten_glViewport: (a, b, c, d) => F.viewport(a,
                    b, c, d),
                emscripten_glWaitSync: (a, b, c, d) => {
                    F.waitSync(L[a], b, (c >>> 0) + 4294967296 * d)
                },
                emscripten_resize_heap: a => {
                    var b = q().length;
                    a >>>= 0;
                    if (a <= b || 2147483648 < a) return !1;
                    for (var c = 1; 4 >= c; c *= 2) {
                        var d = b * (1 + .2 / c);
                        d = Math.min(d, a + 100663296);
                        a:{
                            d = (Math.min(2147483648, 65536 * Math.ceil(Math.max(a, d) / 65536)) - g.buffer.byteLength + 65535) / 65536 | 0;
                            try {
                                g.grow(d);
                                n();
                                var f = 1;
                                break a
                            } catch (h) {
                            }
                            f = void 0
                        }
                        if (f) return !0
                    }
                    return !1
                },
                emscripten_wasm_worker_post_function_v: (a, b) => {
                    C[a].postMessage({_wsc: b, x: []})
                },
                emscripten_webgl_enable_extension: function (a,
                                                             b) {
                    a = ib[a];
                    b = Wa(b);
                    b.startsWith("GL_") && (b = b.substr(3));
                    "ANGLE_instanced_arrays" == b && Ya(F);
                    "OES_vertex_array_object" == b && Za(F);
                    "WEBGL_draw_buffers" == b && $a(F);
                    "WEBGL_draw_instanced_base_vertex_base_instance" == b && ab(F);
                    "WEBGL_multi_draw_instanced_base_vertex_base_instance" == b && bb(F);
                    "WEBGL_multi_draw" == b && (F.T = F.getExtension("WEBGL_multi_draw"));
                    "EXT_polygon_offset_clamp" == b && (F.P = F.getExtension("EXT_polygon_offset_clamp"));
                    "EXT_clip_control" == b && (F.O = F.getExtension("EXT_clip_control"));
                    "WEBGL_polygon_mode" ==
                    b && (F.Y = F.getExtension("WEBGL_polygon_mode"));
                    return !!a.v.getExtension(b)
                },
                emscripten_webgl_get_current_context: () => P ? P.handle : 0,
                emscripten_webgl_make_context_current: a => {
                    P = ib[a];
                    w.$ = F = P?.v;
                    return !a || F ? 0 : -5
                },
                environ_get: (a, b) => {
                    var c = 0;
                    Kb().forEach((d, f) => {
                        var h = b + c;
                        f = t()[a + 4 * f >> 2] = h;
                        for (h = 0; h < d.length; ++h) e()[f++] = d.charCodeAt(h);
                        e()[f] = 0;
                        c += d.length + 1
                    });
                    return 0
                },
                environ_sizes_get: (a, b) => {
                    var c = Kb();
                    t()[a >> 2] = c.length;
                    var d = 0;
                    c.forEach(f => d += f.length + 1);
                    t()[b >> 2] = d;
                    return 0
                },
                fd_close: () => 52,
                fd_pread: function () {
                    return 52
                },
                fd_read: () => 52,
                fd_seek: function () {
                    return 70
                },
                fd_write: (a, b, c, d) => {
                    for (var f = 0, h = 0; h < c; h++) {
                        var l = t()[b >> 2], m = t()[b + 4 >> 2];
                        b += 8;
                        for (var p = 0; p < m; p++) {
                            var v = q()[l + p], T = Lb[a];
                            0 === v || 10 === v ? ((1 === a ? pa : y)(Va(T)), T.length = 0) : T.push(v)
                        }
                        f += m
                    }
                    t()[d >> 2] = f;
                    return 0
                },
                glDeleteTextures: rb,
                glGetIntegerv: yb,
                glGetString: Cb,
                glGetStringi: Db,
                invoke_ii: mc,
                invoke_iii: nc,
                invoke_iiii: oc,
                invoke_iiiii: pc,
                invoke_iiiiiii: qc,
                invoke_vi: rc,
                invoke_vii: sc,
                invoke_viii: tc,
                invoke_viiii: uc,
                invoke_viiiiiii: vc,
                memory: g,
                proc_exit: Pa,
                skwasm_captureImageBitmap: Mb,
                skwasm_connectThread: Pb,
                skwasm_createGlTextureFromTextureSource: Qb,
                skwasm_createOffscreenCanvas: Rb,
                skwasm_dispatchDisposeSurface: Sb,
                skwasm_dispatchRasterizeImage: Tb,
                skwasm_dispatchRenderPictures: Ub,
                skwasm_disposeAssociatedObjectOnThread: Vb,
                skwasm_getAssociatedObject: Wb,
                skwasm_isSingleThreaded: Xb,
                skwasm_postImages: Yb,
                skwasm_postRasterizeResult: Zb,
                skwasm_resizeCanvas: $b,
                skwasm_setAssociatedObjectOnThread: ac
            }, W = function () {
                function a(c, d) {
                    W = c.exports;
                    w.wasmExports = W;
                    B = W.__indirect_function_table;
                    wa.unshift(W.__wasm_call_ctors);
                    qa = d;
                    z--;
                    0 == z && (null !== Fa && (clearInterval(Fa), Fa = null), A && (c = A, A = null, c()));
                    return W
                }

                var b = {env: wc, wasi_snapshot_preview1: wc};
                z++;
                if (w.instantiateWasm) try {
                    return w.instantiateWasm(b, a)
                } catch (c) {
                    y(`Module.instantiateWasm callback failed with error: ${c}`), fa(c)
                }
                Ia ??= Ha("skwasm.wasm") ? "skwasm.wasm" : ma("skwasm.wasm");
                La(b, function (c) {
                    a(c.instance, c.module)
                }).catch(fa);
                return {}
            }();
            w._canvas_saveLayer = (a, b, c, d, f) => (w._canvas_saveLayer = W.canvas_saveLayer)(a, b, c, d, f);
            w._canvas_save = a => (w._canvas_save = W.canvas_save)(a);
            w._canvas_restore = a => (w._canvas_restore = W.canvas_restore)(a);
            w._canvas_restoreToCount = (a, b) => (w._canvas_restoreToCount = W.canvas_restoreToCount)(a, b);
            w._canvas_getSaveCount = a => (w._canvas_getSaveCount = W.canvas_getSaveCount)(a);
            w._canvas_translate = (a, b, c) => (w._canvas_translate = W.canvas_translate)(a, b, c);
            w._canvas_scale = (a, b, c) => (w._canvas_scale = W.canvas_scale)(a, b, c);
            w._canvas_rotate = (a, b) => (w._canvas_rotate = W.canvas_rotate)(a, b);
            w._canvas_skew = (a, b, c) => (w._canvas_skew = W.canvas_skew)(a, b, c);
            w._canvas_transform = (a, b) => (w._canvas_transform = W.canvas_transform)(a, b);
            w._canvas_clipRect = (a, b, c, d) => (w._canvas_clipRect = W.canvas_clipRect)(a, b, c, d);
            w._canvas_clipRRect = (a, b, c) => (w._canvas_clipRRect = W.canvas_clipRRect)(a, b, c);
            w._canvas_clipPath = (a, b, c) => (w._canvas_clipPath = W.canvas_clipPath)(a, b, c);
            w._canvas_drawColor = (a, b, c) => (w._canvas_drawColor = W.canvas_drawColor)(a, b, c);
            w._canvas_drawLine = (a, b, c, d, f, h) => (w._canvas_drawLine = W.canvas_drawLine)(a, b, c, d, f, h);
            w._canvas_drawPaint = (a, b) => (w._canvas_drawPaint = W.canvas_drawPaint)(a, b);
            w._canvas_drawRect = (a, b, c) => (w._canvas_drawRect = W.canvas_drawRect)(a, b, c);
            w._canvas_drawRRect = (a, b, c) => (w._canvas_drawRRect = W.canvas_drawRRect)(a, b, c);
            w._canvas_drawDRRect = (a, b, c, d) => (w._canvas_drawDRRect = W.canvas_drawDRRect)(a, b, c, d);
            w._canvas_drawOval = (a, b, c) => (w._canvas_drawOval = W.canvas_drawOval)(a, b, c);
            w._canvas_drawCircle = (a, b, c, d, f) => (w._canvas_drawCircle = W.canvas_drawCircle)(a, b, c, d, f);
            w._canvas_drawArc = (a, b, c, d, f, h) => (w._canvas_drawArc = W.canvas_drawArc)(a, b, c, d, f, h);
            w._canvas_drawPath = (a, b, c) => (w._canvas_drawPath = W.canvas_drawPath)(a, b, c);
            w._canvas_drawShadow = (a, b, c, d, f, h) => (w._canvas_drawShadow = W.canvas_drawShadow)(a, b, c, d, f, h);
            w._canvas_drawParagraph = (a, b, c, d) => (w._canvas_drawParagraph = W.canvas_drawParagraph)(a, b, c, d);
            w._canvas_drawPicture = (a, b) => (w._canvas_drawPicture = W.canvas_drawPicture)(a, b);
            w._canvas_drawImage = (a, b, c, d, f, h) => (w._canvas_drawImage = W.canvas_drawImage)(a, b, c, d, f, h);
            w._canvas_drawImageRect = (a, b, c, d, f, h) => (w._canvas_drawImageRect = W.canvas_drawImageRect)(a, b, c, d, f, h);
            w._canvas_drawImageNine = (a, b, c, d, f, h) => (w._canvas_drawImageNine = W.canvas_drawImageNine)(a, b, c, d, f, h);
            w._canvas_drawVertices = (a, b, c, d) => (w._canvas_drawVertices = W.canvas_drawVertices)(a, b, c, d);
            w._canvas_drawPoints = (a, b, c, d, f) => (w._canvas_drawPoints = W.canvas_drawPoints)(a, b, c, d, f);
            w._canvas_drawAtlas = (a, b, c, d, f, h, l, m, p) => (w._canvas_drawAtlas = W.canvas_drawAtlas)(a, b, c, d, f, h, l, m, p);
            w._canvas_getTransform = (a, b) => (w._canvas_getTransform = W.canvas_getTransform)(a, b);
            w._canvas_getLocalClipBounds = (a, b) => (w._canvas_getLocalClipBounds = W.canvas_getLocalClipBounds)(a, b);
            w._canvas_getDeviceClipBounds = (a, b) => (w._canvas_getDeviceClipBounds = W.canvas_getDeviceClipBounds)(a, b);
            w._contourMeasureIter_create = (a, b, c) => (w._contourMeasureIter_create = W.contourMeasureIter_create)(a, b, c);
            w._contourMeasureIter_next = a => (w._contourMeasureIter_next = W.contourMeasureIter_next)(a);
            w._contourMeasureIter_dispose = a => (w._contourMeasureIter_dispose = W.contourMeasureIter_dispose)(a);
            w._contourMeasure_dispose = a => (w._contourMeasure_dispose = W.contourMeasure_dispose)(a);
            w._contourMeasure_length = a => (w._contourMeasure_length = W.contourMeasure_length)(a);
            w._contourMeasure_isClosed = a => (w._contourMeasure_isClosed = W.contourMeasure_isClosed)(a);
            w._contourMeasure_getPosTan = (a, b, c, d) => (w._contourMeasure_getPosTan = W.contourMeasure_getPosTan)(a, b, c, d);
            w._contourMeasure_getSegment = (a, b, c, d) => (w._contourMeasure_getSegment = W.contourMeasure_getSegment)(a, b, c, d);
            w._skData_create = a => (w._skData_create = W.skData_create)(a);
            w._skData_getPointer = a => (w._skData_getPointer = W.skData_getPointer)(a);
            w._skData_getConstPointer = a => (w._skData_getConstPointer = W.skData_getConstPointer)(a);
            w._skData_getSize = a => (w._skData_getSize = W.skData_getSize)(a);
            w._skData_dispose = a => (w._skData_dispose = W.skData_dispose)(a);
            w._imageFilter_createBlur = (a, b, c) => (w._imageFilter_createBlur = W.imageFilter_createBlur)(a, b, c);
            w._imageFilter_createDilate = (a, b) => (w._imageFilter_createDilate = W.imageFilter_createDilate)(a, b);
            w._imageFilter_createErode = (a, b) => (w._imageFilter_createErode = W.imageFilter_createErode)(a, b);
            w._imageFilter_createMatrix = (a, b) => (w._imageFilter_createMatrix = W.imageFilter_createMatrix)(a, b);
            w._imageFilter_createFromColorFilter = a => (w._imageFilter_createFromColorFilter = W.imageFilter_createFromColorFilter)(a);
            w._imageFilter_compose = (a, b) => (w._imageFilter_compose = W.imageFilter_compose)(a, b);
            w._imageFilter_dispose = a => (w._imageFilter_dispose = W.imageFilter_dispose)(a);
            w._imageFilter_getFilterBounds = (a, b) => (w._imageFilter_getFilterBounds = W.imageFilter_getFilterBounds)(a, b);
            w._colorFilter_createMode = (a, b) => (w._colorFilter_createMode = W.colorFilter_createMode)(a, b);
            w._colorFilter_createMatrix = a => (w._colorFilter_createMatrix = W.colorFilter_createMatrix)(a);
            w._colorFilter_createSRGBToLinearGamma = () => (w._colorFilter_createSRGBToLinearGamma = W.colorFilter_createSRGBToLinearGamma)();
            w._colorFilter_createLinearToSRGBGamma = () => (w._colorFilter_createLinearToSRGBGamma = W.colorFilter_createLinearToSRGBGamma)();
            w._colorFilter_compose = (a, b) => (w._colorFilter_compose = W.colorFilter_compose)(a, b);
            w._colorFilter_dispose = a => (w._colorFilter_dispose = W.colorFilter_dispose)(a);
            w._maskFilter_createBlur = (a, b) => (w._maskFilter_createBlur = W.maskFilter_createBlur)(a, b);
            w._maskFilter_dispose = a => (w._maskFilter_dispose = W.maskFilter_dispose)(a);
            w._fontCollection_create = () => (w._fontCollection_create = W.fontCollection_create)();
            w._fontCollection_dispose = a => (w._fontCollection_dispose = W.fontCollection_dispose)(a);
            w._typeface_create = a => (w._typeface_create = W.typeface_create)(a);
            w._typeface_dispose = a => (w._typeface_dispose = W.typeface_dispose)(a);
            w._typefaces_filterCoveredCodePoints = (a, b, c, d) => (w._typefaces_filterCoveredCodePoints = W.typefaces_filterCoveredCodePoints)(a, b, c, d);
            w._fontCollection_registerTypeface = (a, b, c) => (w._fontCollection_registerTypeface = W.fontCollection_registerTypeface)(a, b, c);
            w._fontCollection_clearCaches = a => (w._fontCollection_clearCaches = W.fontCollection_clearCaches)(a);
            w._image_createFromPicture = (a, b, c) => (w._image_createFromPicture = W.image_createFromPicture)(a, b, c);
            w._image_createFromPixels = (a, b, c, d, f) => (w._image_createFromPixels = W.image_createFromPixels)(a, b, c, d, f);
            w._image_createFromTextureSource = (a, b, c, d) => (w._image_createFromTextureSource = W.image_createFromTextureSource)(a, b, c, d);
            w._image_ref = a => (w._image_ref = W.image_ref)(a);
            w._image_dispose = a => (w._image_dispose = W.image_dispose)(a);
            w._image_getWidth = a => (w._image_getWidth = W.image_getWidth)(a);
            w._image_getHeight = a => (w._image_getHeight = W.image_getHeight)(a);
            w._paint_create = (a, b, c, d, f, h, l, m) => (w._paint_create = W.paint_create)(a, b, c, d, f, h, l, m);
            w._paint_dispose = a => (w._paint_dispose = W.paint_dispose)(a);
            w._paint_setShader = (a, b) => (w._paint_setShader = W.paint_setShader)(a, b);
            w._paint_setImageFilter = (a, b) => (w._paint_setImageFilter = W.paint_setImageFilter)(a, b);
            w._paint_setColorFilter = (a, b) => (w._paint_setColorFilter = W.paint_setColorFilter)(a, b);
            w._paint_setMaskFilter = (a, b) => (w._paint_setMaskFilter = W.paint_setMaskFilter)(a, b);
            w._path_create = () => (w._path_create = W.path_create)();
            w._path_dispose = a => (w._path_dispose = W.path_dispose)(a);
            w._path_copy = a => (w._path_copy = W.path_copy)(a);
            w._path_setFillType = (a, b) => (w._path_setFillType = W.path_setFillType)(a, b);
            w._path_getFillType = a => (w._path_getFillType = W.path_getFillType)(a);
            w._path_moveTo = (a, b, c) => (w._path_moveTo = W.path_moveTo)(a, b, c);
            w._path_relativeMoveTo = (a, b, c) => (w._path_relativeMoveTo = W.path_relativeMoveTo)(a, b, c);
            w._path_lineTo = (a, b, c) => (w._path_lineTo = W.path_lineTo)(a, b, c);
            w._path_relativeLineTo = (a, b, c) => (w._path_relativeLineTo = W.path_relativeLineTo)(a, b, c);
            w._path_quadraticBezierTo = (a, b, c, d, f) => (w._path_quadraticBezierTo = W.path_quadraticBezierTo)(a, b, c, d, f);
            w._path_relativeQuadraticBezierTo = (a, b, c, d, f) => (w._path_relativeQuadraticBezierTo = W.path_relativeQuadraticBezierTo)(a, b, c, d, f);
            w._path_cubicTo = (a, b, c, d, f, h, l) => (w._path_cubicTo = W.path_cubicTo)(a, b, c, d, f, h, l);
            w._path_relativeCubicTo = (a, b, c, d, f, h, l) => (w._path_relativeCubicTo = W.path_relativeCubicTo)(a, b, c, d, f, h, l);
            w._path_conicTo = (a, b, c, d, f, h) => (w._path_conicTo = W.path_conicTo)(a, b, c, d, f, h);
            w._path_relativeConicTo = (a, b, c, d, f, h) => (w._path_relativeConicTo = W.path_relativeConicTo)(a, b, c, d, f, h);
            w._path_arcToOval = (a, b, c, d, f) => (w._path_arcToOval = W.path_arcToOval)(a, b, c, d, f);
            w._path_arcToRotated = (a, b, c, d, f, h, l, m) => (w._path_arcToRotated = W.path_arcToRotated)(a, b, c, d, f, h, l, m);
            w._path_relativeArcToRotated = (a, b, c, d, f, h, l, m) => (w._path_relativeArcToRotated = W.path_relativeArcToRotated)(a, b, c, d, f, h, l, m);
            w._path_addRect = (a, b) => (w._path_addRect = W.path_addRect)(a, b);
            w._path_addOval = (a, b) => (w._path_addOval = W.path_addOval)(a, b);
            w._path_addArc = (a, b, c, d) => (w._path_addArc = W.path_addArc)(a, b, c, d);
            w._path_addPolygon = (a, b, c, d) => (w._path_addPolygon = W.path_addPolygon)(a, b, c, d);
            w._path_addRRect = (a, b) => (w._path_addRRect = W.path_addRRect)(a, b);
            w._path_addPath = (a, b, c, d) => (w._path_addPath = W.path_addPath)(a, b, c, d);
            w._path_close = a => (w._path_close = W.path_close)(a);
            w._path_reset = a => (w._path_reset = W.path_reset)(a);
            w._path_contains = (a, b, c) => (w._path_contains = W.path_contains)(a, b, c);
            w._path_transform = (a, b) => (w._path_transform = W.path_transform)(a, b);
            w._path_getBounds = (a, b) => (w._path_getBounds = W.path_getBounds)(a, b);
            w._path_combine = (a, b, c) => (w._path_combine = W.path_combine)(a, b, c);
            w._path_getSvgString = a => (w._path_getSvgString = W.path_getSvgString)(a);
            w._pictureRecorder_create = () => (w._pictureRecorder_create = W.pictureRecorder_create)();
            w._pictureRecorder_dispose = a => (w._pictureRecorder_dispose = W.pictureRecorder_dispose)(a);
            w._pictureRecorder_beginRecording = (a, b) => (w._pictureRecorder_beginRecording = W.pictureRecorder_beginRecording)(a, b);
            w._pictureRecorder_endRecording = a => (w._pictureRecorder_endRecording = W.pictureRecorder_endRecording)(a);
            w._picture_getCullRect = (a, b) => (w._picture_getCullRect = W.picture_getCullRect)(a, b);
            w._picture_dispose = a => (w._picture_dispose = W.picture_dispose)(a);
            w._picture_approximateBytesUsed = a => (w._picture_approximateBytesUsed = W.picture_approximateBytesUsed)(a);
            w._shader_createLinearGradient = (a, b, c, d, f, h) => (w._shader_createLinearGradient = W.shader_createLinearGradient)(a, b, c, d, f, h);
            w._shader_createRadialGradient = (a, b, c, d, f, h, l, m) => (w._shader_createRadialGradient = W.shader_createRadialGradient)(a, b, c, d, f, h, l, m);
            w._shader_createConicalGradient = (a, b, c, d, f, h, l, m) => (w._shader_createConicalGradient = W.shader_createConicalGradient)(a, b, c, d, f, h, l, m);
            w._shader_createSweepGradient = (a, b, c, d, f, h, l, m, p) => (w._shader_createSweepGradient = W.shader_createSweepGradient)(a, b, c, d, f, h, l, m, p);
            w._shader_dispose = a => (w._shader_dispose = W.shader_dispose)(a);
            w._runtimeEffect_create = a => (w._runtimeEffect_create = W.runtimeEffect_create)(a);
            w._runtimeEffect_dispose = a => (w._runtimeEffect_dispose = W.runtimeEffect_dispose)(a);
            w._runtimeEffect_getUniformSize = a => (w._runtimeEffect_getUniformSize = W.runtimeEffect_getUniformSize)(a);
            w._shader_createRuntimeEffectShader = (a, b, c, d) => (w._shader_createRuntimeEffectShader = W.shader_createRuntimeEffectShader)(a, b, c, d);
            w._shader_createFromImage = (a, b, c, d, f) => (w._shader_createFromImage = W.shader_createFromImage)(a, b, c, d, f);
            w._skString_allocate = a => (w._skString_allocate = W.skString_allocate)(a);
            w._skString_getData = a => (w._skString_getData = W.skString_getData)(a);
            w._skString_getLength = a => (w._skString_getLength = W.skString_getLength)(a);
            w._skString_free = a => (w._skString_free = W.skString_free)(a);
            w._skString16_allocate = a => (w._skString16_allocate = W.skString16_allocate)(a);
            w._skString16_getData = a => (w._skString16_getData = W.skString16_getData)(a);
            w._skString16_free = a => (w._skString16_free = W.skString16_free)(a);
            w._surface_create = () => (w._surface_create = W.surface_create)();
            w._surface_getThreadId = a => (w._surface_getThreadId = W.surface_getThreadId)(a);
            w._surface_setCallbackHandler = (a, b) => (w._surface_setCallbackHandler = W.surface_setCallbackHandler)(a, b);
            w._surface_destroy = a => (w._surface_destroy = W.surface_destroy)(a);
            var ic = w._surface_dispose = a => (ic = w._surface_dispose = W.surface_dispose)(a);
            w._surface_renderPictures = (a, b, c) => (w._surface_renderPictures = W.surface_renderPictures)(a, b, c);
            var gc = w._surface_renderPicturesOnWorker = (a, b, c, d, f) => (gc = w._surface_renderPicturesOnWorker = W.surface_renderPicturesOnWorker)(a, b, c, d, f);
            w._surface_rasterizeImage = (a, b, c) => (w._surface_rasterizeImage = W.surface_rasterizeImage)(a, b, c);
            var jc = w._surface_rasterizeImageOnWorker = (a, b, c, d) => (jc = w._surface_rasterizeImageOnWorker = W.surface_rasterizeImageOnWorker)(a, b, c, d),
                hc = w._surface_onRenderComplete = (a, b, c) => (hc = w._surface_onRenderComplete = W.surface_onRenderComplete)(a, b, c),
                kc = w._surface_onRasterizeComplete = (a, b, c) => (kc = w._surface_onRasterizeComplete = W.surface_onRasterizeComplete)(a, b, c);
            w._skwasm_isMultiThreaded = () => (w._skwasm_isMultiThreaded = W.skwasm_isMultiThreaded)();
            w._lineMetrics_create = (a, b, c, d, f, h, l, m, p) => (w._lineMetrics_create = W.lineMetrics_create)(a, b, c, d, f, h, l, m, p);
            w._lineMetrics_dispose = a => (w._lineMetrics_dispose = W.lineMetrics_dispose)(a);
            w._lineMetrics_getHardBreak = a => (w._lineMetrics_getHardBreak = W.lineMetrics_getHardBreak)(a);
            w._lineMetrics_getAscent = a => (w._lineMetrics_getAscent = W.lineMetrics_getAscent)(a);
            w._lineMetrics_getDescent = a => (w._lineMetrics_getDescent = W.lineMetrics_getDescent)(a);
            w._lineMetrics_getUnscaledAscent = a => (w._lineMetrics_getUnscaledAscent = W.lineMetrics_getUnscaledAscent)(a);
            w._lineMetrics_getHeight = a => (w._lineMetrics_getHeight = W.lineMetrics_getHeight)(a);
            w._lineMetrics_getWidth = a => (w._lineMetrics_getWidth = W.lineMetrics_getWidth)(a);
            w._lineMetrics_getLeft = a => (w._lineMetrics_getLeft = W.lineMetrics_getLeft)(a);
            w._lineMetrics_getBaseline = a => (w._lineMetrics_getBaseline = W.lineMetrics_getBaseline)(a);
            w._lineMetrics_getLineNumber = a => (w._lineMetrics_getLineNumber = W.lineMetrics_getLineNumber)(a);
            w._lineMetrics_getStartIndex = a => (w._lineMetrics_getStartIndex = W.lineMetrics_getStartIndex)(a);
            w._lineMetrics_getEndIndex = a => (w._lineMetrics_getEndIndex = W.lineMetrics_getEndIndex)(a);
            w._paragraph_dispose = a => (w._paragraph_dispose = W.paragraph_dispose)(a);
            w._paragraph_getWidth = a => (w._paragraph_getWidth = W.paragraph_getWidth)(a);
            w._paragraph_getHeight = a => (w._paragraph_getHeight = W.paragraph_getHeight)(a);
            w._paragraph_getLongestLine = a => (w._paragraph_getLongestLine = W.paragraph_getLongestLine)(a);
            w._paragraph_getMinIntrinsicWidth = a => (w._paragraph_getMinIntrinsicWidth = W.paragraph_getMinIntrinsicWidth)(a);
            w._paragraph_getMaxIntrinsicWidth = a => (w._paragraph_getMaxIntrinsicWidth = W.paragraph_getMaxIntrinsicWidth)(a);
            w._paragraph_getAlphabeticBaseline = a => (w._paragraph_getAlphabeticBaseline = W.paragraph_getAlphabeticBaseline)(a);
            w._paragraph_getIdeographicBaseline = a => (w._paragraph_getIdeographicBaseline = W.paragraph_getIdeographicBaseline)(a);
            w._paragraph_getDidExceedMaxLines = a => (w._paragraph_getDidExceedMaxLines = W.paragraph_getDidExceedMaxLines)(a);
            w._paragraph_layout = (a, b) => (w._paragraph_layout = W.paragraph_layout)(a, b);
            w._paragraph_getPositionForOffset = (a, b, c, d) => (w._paragraph_getPositionForOffset = W.paragraph_getPositionForOffset)(a, b, c, d);
            w._paragraph_getClosestGlyphInfoAtCoordinate = (a, b, c, d, f, h) => (w._paragraph_getClosestGlyphInfoAtCoordinate = W.paragraph_getClosestGlyphInfoAtCoordinate)(a, b, c, d, f, h);
            w._paragraph_getGlyphInfoAt = (a, b, c, d, f) => (w._paragraph_getGlyphInfoAt = W.paragraph_getGlyphInfoAt)(a, b, c, d, f);
            w._paragraph_getWordBoundary = (a, b, c) => (w._paragraph_getWordBoundary = W.paragraph_getWordBoundary)(a, b, c);
            w._paragraph_getLineCount = a => (w._paragraph_getLineCount = W.paragraph_getLineCount)(a);
            w._paragraph_getLineNumberAt = (a, b) => (w._paragraph_getLineNumberAt = W.paragraph_getLineNumberAt)(a, b);
            w._paragraph_getLineMetricsAtIndex = (a, b) => (w._paragraph_getLineMetricsAtIndex = W.paragraph_getLineMetricsAtIndex)(a, b);
            w._textBoxList_dispose = a => (w._textBoxList_dispose = W.textBoxList_dispose)(a);
            w._textBoxList_getLength = a => (w._textBoxList_getLength = W.textBoxList_getLength)(a);
            w._textBoxList_getBoxAtIndex = (a, b, c) => (w._textBoxList_getBoxAtIndex = W.textBoxList_getBoxAtIndex)(a, b, c);
            w._paragraph_getBoxesForRange = (a, b, c, d, f) => (w._paragraph_getBoxesForRange = W.paragraph_getBoxesForRange)(a, b, c, d, f);
            w._paragraph_getBoxesForPlaceholders = a => (w._paragraph_getBoxesForPlaceholders = W.paragraph_getBoxesForPlaceholders)(a);
            w._paragraph_getUnresolvedCodePoints = (a, b, c) => (w._paragraph_getUnresolvedCodePoints = W.paragraph_getUnresolvedCodePoints)(a, b, c);
            w._paragraphBuilder_create = (a, b) => (w._paragraphBuilder_create = W.paragraphBuilder_create)(a, b);
            w._paragraphBuilder_dispose = a => (w._paragraphBuilder_dispose = W.paragraphBuilder_dispose)(a);
            w._paragraphBuilder_addPlaceholder = (a, b, c, d, f, h) => (w._paragraphBuilder_addPlaceholder = W.paragraphBuilder_addPlaceholder)(a, b, c, d, f, h);
            w._paragraphBuilder_addText = (a, b) => (w._paragraphBuilder_addText = W.paragraphBuilder_addText)(a, b);
            w._paragraphBuilder_getUtf8Text = (a, b) => (w._paragraphBuilder_getUtf8Text = W.paragraphBuilder_getUtf8Text)(a, b);
            w._paragraphBuilder_pushStyle = (a, b) => (w._paragraphBuilder_pushStyle = W.paragraphBuilder_pushStyle)(a, b);
            w._paragraphBuilder_pop = a => (w._paragraphBuilder_pop = W.paragraphBuilder_pop)(a);
            w._paragraphBuilder_build = a => (w._paragraphBuilder_build = W.paragraphBuilder_build)(a);
            w._unicodePositionBuffer_create = a => (w._unicodePositionBuffer_create = W.unicodePositionBuffer_create)(a);
            w._unicodePositionBuffer_getDataPointer = a => (w._unicodePositionBuffer_getDataPointer = W.unicodePositionBuffer_getDataPointer)(a);
            w._unicodePositionBuffer_free = a => (w._unicodePositionBuffer_free = W.unicodePositionBuffer_free)(a);
            w._lineBreakBuffer_create = a => (w._lineBreakBuffer_create = W.lineBreakBuffer_create)(a);
            w._lineBreakBuffer_getDataPointer = a => (w._lineBreakBuffer_getDataPointer = W.lineBreakBuffer_getDataPointer)(a);
            w._lineBreakBuffer_free = a => (w._lineBreakBuffer_free = W.lineBreakBuffer_free)(a);
            w._paragraphBuilder_setGraphemeBreaksUtf16 = (a, b) => (w._paragraphBuilder_setGraphemeBreaksUtf16 = W.paragraphBuilder_setGraphemeBreaksUtf16)(a, b);
            w._paragraphBuilder_setWordBreaksUtf16 = (a, b) => (w._paragraphBuilder_setWordBreaksUtf16 = W.paragraphBuilder_setWordBreaksUtf16)(a, b);
            w._paragraphBuilder_setLineBreaksUtf16 = (a, b) => (w._paragraphBuilder_setLineBreaksUtf16 = W.paragraphBuilder_setLineBreaksUtf16)(a, b);
            w._paragraphStyle_create = () => (w._paragraphStyle_create = W.paragraphStyle_create)();
            w._paragraphStyle_dispose = a => (w._paragraphStyle_dispose = W.paragraphStyle_dispose)(a);
            w._paragraphStyle_setTextAlign = (a, b) => (w._paragraphStyle_setTextAlign = W.paragraphStyle_setTextAlign)(a, b);
            w._paragraphStyle_setTextDirection = (a, b) => (w._paragraphStyle_setTextDirection = W.paragraphStyle_setTextDirection)(a, b);
            w._paragraphStyle_setMaxLines = (a, b) => (w._paragraphStyle_setMaxLines = W.paragraphStyle_setMaxLines)(a, b);
            w._paragraphStyle_setHeight = (a, b) => (w._paragraphStyle_setHeight = W.paragraphStyle_setHeight)(a, b);
            w._paragraphStyle_setTextHeightBehavior = (a, b, c) => (w._paragraphStyle_setTextHeightBehavior = W.paragraphStyle_setTextHeightBehavior)(a, b, c);
            w._paragraphStyle_setEllipsis = (a, b) => (w._paragraphStyle_setEllipsis = W.paragraphStyle_setEllipsis)(a, b);
            w._paragraphStyle_setStrutStyle = (a, b) => (w._paragraphStyle_setStrutStyle = W.paragraphStyle_setStrutStyle)(a, b);
            w._paragraphStyle_setTextStyle = (a, b) => (w._paragraphStyle_setTextStyle = W.paragraphStyle_setTextStyle)(a, b);
            w._paragraphStyle_setApplyRoundingHack = (a, b) => (w._paragraphStyle_setApplyRoundingHack = W.paragraphStyle_setApplyRoundingHack)(a, b);
            w._strutStyle_create = () => (w._strutStyle_create = W.strutStyle_create)();
            w._strutStyle_dispose = a => (w._strutStyle_dispose = W.strutStyle_dispose)(a);
            w._strutStyle_setFontFamilies = (a, b, c) => (w._strutStyle_setFontFamilies = W.strutStyle_setFontFamilies)(a, b, c);
            w._strutStyle_setFontSize = (a, b) => (w._strutStyle_setFontSize = W.strutStyle_setFontSize)(a, b);
            w._strutStyle_setHeight = (a, b) => (w._strutStyle_setHeight = W.strutStyle_setHeight)(a, b);
            w._strutStyle_setHalfLeading = (a, b) => (w._strutStyle_setHalfLeading = W.strutStyle_setHalfLeading)(a, b);
            w._strutStyle_setLeading = (a, b) => (w._strutStyle_setLeading = W.strutStyle_setLeading)(a, b);
            w._strutStyle_setFontStyle = (a, b, c) => (w._strutStyle_setFontStyle = W.strutStyle_setFontStyle)(a, b, c);
            w._strutStyle_setForceStrutHeight = (a, b) => (w._strutStyle_setForceStrutHeight = W.strutStyle_setForceStrutHeight)(a, b);
            w._textStyle_create = () => (w._textStyle_create = W.textStyle_create)();
            w._textStyle_copy = a => (w._textStyle_copy = W.textStyle_copy)(a);
            w._textStyle_dispose = a => (w._textStyle_dispose = W.textStyle_dispose)(a);
            w._textStyle_setColor = (a, b) => (w._textStyle_setColor = W.textStyle_setColor)(a, b);
            w._textStyle_setDecoration = (a, b) => (w._textStyle_setDecoration = W.textStyle_setDecoration)(a, b);
            w._textStyle_setDecorationColor = (a, b) => (w._textStyle_setDecorationColor = W.textStyle_setDecorationColor)(a, b);
            w._textStyle_setDecorationStyle = (a, b) => (w._textStyle_setDecorationStyle = W.textStyle_setDecorationStyle)(a, b);
            w._textStyle_setDecorationThickness = (a, b) => (w._textStyle_setDecorationThickness = W.textStyle_setDecorationThickness)(a, b);
            w._textStyle_setFontStyle = (a, b, c) => (w._textStyle_setFontStyle = W.textStyle_setFontStyle)(a, b, c);
            w._textStyle_setTextBaseline = (a, b) => (w._textStyle_setTextBaseline = W.textStyle_setTextBaseline)(a, b);
            w._textStyle_clearFontFamilies = a => (w._textStyle_clearFontFamilies = W.textStyle_clearFontFamilies)(a);
            w._textStyle_addFontFamilies = (a, b, c) => (w._textStyle_addFontFamilies = W.textStyle_addFontFamilies)(a, b, c);
            w._textStyle_setFontSize = (a, b) => (w._textStyle_setFontSize = W.textStyle_setFontSize)(a, b);
            w._textStyle_setLetterSpacing = (a, b) => (w._textStyle_setLetterSpacing = W.textStyle_setLetterSpacing)(a, b);
            w._textStyle_setWordSpacing = (a, b) => (w._textStyle_setWordSpacing = W.textStyle_setWordSpacing)(a, b);
            w._textStyle_setHeight = (a, b) => (w._textStyle_setHeight = W.textStyle_setHeight)(a, b);
            w._textStyle_setHalfLeading = (a, b) => (w._textStyle_setHalfLeading = W.textStyle_setHalfLeading)(a, b);
            w._textStyle_setLocale = (a, b) => (w._textStyle_setLocale = W.textStyle_setLocale)(a, b);
            w._textStyle_setBackground = (a, b) => (w._textStyle_setBackground = W.textStyle_setBackground)(a, b);
            w._textStyle_setForeground = (a, b) => (w._textStyle_setForeground = W.textStyle_setForeground)(a, b);
            w._textStyle_addShadow = (a, b, c, d, f) => (w._textStyle_addShadow = W.textStyle_addShadow)(a, b, c, d, f);
            w._textStyle_addFontFeature = (a, b, c) => (w._textStyle_addFontFeature = W.textStyle_addFontFeature)(a, b, c);
            w._textStyle_setFontVariations = (a, b, c, d) => (w._textStyle_setFontVariations = W.textStyle_setFontVariations)(a, b, c, d);
            w._vertices_create = (a, b, c, d, f, h, l) => (w._vertices_create = W.vertices_create)(a, b, c, d, f, h, l);
            w._vertices_dispose = a => (w._vertices_dispose = W.vertices_dispose)(a);
            var Ab = a => (Ab = W.malloc)(a), lc = (a, b) => (lc = W._emscripten_timeout)(a, b),
                X = (a, b) => (X = W.setThrew)(a, b), Y = a => (Y = W._emscripten_stack_restore)(a),
                cc = a => (cc = W._emscripten_stack_alloc)(a), Z = () => (Z = W.emscripten_stack_get_current)(),
                Aa = (a, b) => (Aa = W._emscripten_wasm_worker_initialize)(a, b);

            function nc(a, b, c) {
                var d = Z();
                try {
                    return B.get(a)(b, c)
                } catch (f) {
                    Y(d);
                    if (f !== f + 0) throw f;
                    X(1, 0)
                }
            }

            function sc(a, b, c) {
                var d = Z();
                try {
                    B.get(a)(b, c)
                } catch (f) {
                    Y(d);
                    if (f !== f + 0) throw f;
                    X(1, 0)
                }
            }

            function mc(a, b) {
                var c = Z();
                try {
                    return B.get(a)(b)
                } catch (d) {
                    Y(c);
                    if (d !== d + 0) throw d;
                    X(1, 0)
                }
            }

            function tc(a, b, c, d) {
                var f = Z();
                try {
                    B.get(a)(b, c, d)
                } catch (h) {
                    Y(f);
                    if (h !== h + 0) throw h;
                    X(1, 0)
                }
            }

            function oc(a, b, c, d) {
                var f = Z();
                try {
                    return B.get(a)(b, c, d)
                } catch (h) {
                    Y(f);
                    if (h !== h + 0) throw h;
                    X(1, 0)
                }
            }

            function uc(a, b, c, d, f) {
                var h = Z();
                try {
                    B.get(a)(b, c, d, f)
                } catch (l) {
                    Y(h);
                    if (l !== l + 0) throw l;
                    X(1, 0)
                }
            }

            function vc(a, b, c, d, f, h, l, m) {
                var p = Z();
                try {
                    B.get(a)(b, c, d, f, h, l, m)
                } catch (v) {
                    Y(p);
                    if (v !== v + 0) throw v;
                    X(1, 0)
                }
            }

            function rc(a, b) {
                var c = Z();
                try {
                    B.get(a)(b)
                } catch (d) {
                    Y(c);
                    if (d !== d + 0) throw d;
                    X(1, 0)
                }
            }

            function qc(a, b, c, d, f, h, l) {
                var m = Z();
                try {
                    return B.get(a)(b, c, d, f, h, l)
                } catch (p) {
                    Y(m);
                    if (p !== p + 0) throw p;
                    X(1, 0)
                }
            }

            function pc(a, b, c, d, f) {
                var h = Z();
                try {
                    return B.get(a)(b, c, d, f)
                } catch (l) {
                    Y(h);
                    if (l !== l + 0) throw l;
                    X(1, 0)
                }
            }

            w.wasmMemory = g;
            w.wasmExports = W;
            w.stackAlloc = dc;
            w.addFunction = (a, b) => {
                if (!U) {
                    U = new WeakMap;
                    var c = B.length;
                    if (U) for (var d = 0; d < 0 + c; d++) {
                        var f = B.get(d);
                        f && U.set(f, d)
                    }
                }
                if (c = U.get(a) || 0) return c;
                if (bc.length) c = bc.pop(); else {
                    try {
                        B.grow(1)
                    } catch (m) {
                        if (!(m instanceof RangeError)) throw m;
                        throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
                    }
                    c = B.length - 1
                }
                try {
                    B.set(c, a)
                } catch (m) {
                    if (!(m instanceof TypeError)) throw m;
                    if ("function" == typeof WebAssembly.Function) {
                        d = WebAssembly.Function;
                        f = {i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32"};
                        for (var h = {
                            parameters: [],
                            results: "v" == b[0] ? [] : [f[b[0]]]
                        }, l = 1; l < b.length; ++l) h.parameters.push(f[b[l]]);
                        b = new d(h, a)
                    } else {
                        d = [1];
                        f = b.slice(0, 1);
                        b = b.slice(1);
                        h = {i: 127, p: 127, j: 126, f: 125, d: 124, e: 111};
                        d.push(96);
                        l = b.length;
                        128 > l ? d.push(l) : d.push(l % 128 | 128, l >> 7);
                        for (l = 0; l < b.length; ++l) d.push(h[b[l]]);
                        "v" == f ? d.push(0) : d.push(1, h[f]);
                        b = [0, 97, 115, 109, 1, 0, 0, 0, 1];
                        f = d.length;
                        128 > f ? b.push(f) : b.push(f % 128 | 128, f >> 7);
                        b.push(...d);
                        b.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
                        b = new WebAssembly.Module(new Uint8Array(b));
                        b = (new WebAssembly.Instance(b,
                            {e: {f: a}})).exports.f
                    }
                    B.set(c, b)
                }
                U.set(a, c);
                return c
            };
            var xc, yc;
            A = function zc() {
                xc || Ac();
                xc || (A = zc)
            };

            function Ac() {
                if (!(0 < z)) if (ka) ea(w), ya(); else {
                    if (!yc && (yc = 1, Ea(va), 0 < z)) return;
                    xc || (xc = 1, w.calledRun = 1, ra || (ya(), ea(w), Ea(xa)))
                }
            }

            Ac();
            moduleRtn = ha;


            return moduleRtn;
        }
    );
})();
export default skwasm;

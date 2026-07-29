globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { a as toEventHandler, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/app-shell-DdqJwSTw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2466-vr/jiMKacvtLpWVuNiv/zY7uRj8\"",
		"mtime": "2026-07-28T19:01:42.823Z",
		"size": 9318,
		"path": "../public/assets/app-shell-DdqJwSTw.js"
	},
	"/assets/app-store-D6bMLqet.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a89d-JHnFjm4K5Uoqcc8gIcQI6CdCYjs\"",
		"mtime": "2026-07-28T19:01:42.823Z",
		"size": 43165,
		"path": "../public/assets/app-store-D6bMLqet.js"
	},
	"/assets/arrow-left-BoECzKg3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-Ujs8UyuuS2ymiEctbqVKVmGIMS8\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 158,
		"path": "../public/assets/arrow-left-BoECzKg3.js"
	},
	"/assets/borrowers.index-BT1lDiv6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18e6-Dv6UVOjglG0QCvSazn9pFQLDwSI\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 6374,
		"path": "../public/assets/borrowers.index-BT1lDiv6.js"
	},
	"/assets/borrowers.new-DJGo1D0n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-7Q82xMivTUyAL4Zz9uI4wv4c3ck\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 2160,
		"path": "../public/assets/borrowers.new-DJGo1D0n.js"
	},
	"/assets/borrowers._borrowerId-CMNsvdwk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5169-R12CFu4EjcqvXKm3SfKGI1Fq/lk\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 20841,
		"path": "../public/assets/borrowers._borrowerId-CMNsvdwk.js"
	},
	"/assets/collection-yPW-wpKe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e0-iTfRg7DZLc31OeS/CIxq4VuBZi4\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 2272,
		"path": "../public/assets/collection-yPW-wpKe.js"
	},
	"/assets/borrowers._borrowerId-VAY9fHBK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ed-vZjElrdeBY+mlfwetIREB+7H4hs\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 749,
		"path": "../public/assets/borrowers._borrowerId-VAY9fHBK.js"
	},
	"/assets/dashboard-BYphz7p8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94e-ije8UdQ0NYe7FTK/vUxxjhanSo8\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 2382,
		"path": "../public/assets/dashboard-BYphz7p8.js"
	},
	"/assets/loan.index-DCm6pBbc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"313-orVnbZJUAv3G37BG+TeTrBN5t2Y\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 787,
		"path": "../public/assets/loan.index-DCm6pBbc.js"
	},
	"/assets/loan-ui-BPZrqhV8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d97-P0GdsYMuZ13z9bJCvD1r0npM3kY\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 3479,
		"path": "../public/assets/loan-ui-BPZrqhV8.js"
	},
	"/assets/loan._loanId-DuFCJg-8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fb-rwq0k10T7q4cLYSl3bJnc06MuP8\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 763,
		"path": "../public/assets/loan._loanId-DuFCJg-8.js"
	},
	"/assets/loan._loanId-BWeLUZzP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"202f-nqGXWHejvaoJCeBsbB2VmLl/DWY\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 8239,
		"path": "../public/assets/loan._loanId-BWeLUZzP.js"
	},
	"/assets/loan.new-UongSxKm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e26-jPK+QhtENPeR2iHWJQ/DE+XNRm8\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 3622,
		"path": "../public/assets/loan.new-UongSxKm.js"
	},
	"/assets/preload-helper-Cizvgpp5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17df-RdEd4oC03MKjRwhJHeTlCMysLC0\"",
		"mtime": "2026-07-28T19:01:42.847Z",
		"size": 6111,
		"path": "../public/assets/preload-helper-Cizvgpp5.js"
	},
	"/assets/routes-cuzmpTRx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a35-c9oB591d5vbHUbDgwI0x/fMVMvk\"",
		"mtime": "2026-07-28T19:01:42.849Z",
		"size": 2613,
		"path": "../public/assets/routes-cuzmpTRx.js"
	},
	"/assets/settings-CG-Y6P8s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d9-Qm4A+BGnm5Hu7uq6VECavR2wfl0\"",
		"mtime": "2026-07-28T19:01:42.849Z",
		"size": 4825,
		"path": "../public/assets/settings-CG-Y6P8s.js"
	},
	"/assets/styles-zUsGL-nj.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"142e7-HkCO47GTUBcYFST9PQVHT8/s7R4\"",
		"mtime": "2026-07-28T19:01:42.849Z",
		"size": 82663,
		"path": "../public/assets/styles-zUsGL-nj.css"
	},
	"/assets/index-D_jElPNY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b8b4-bNoTY3Gt0agWyijff4YmzBKWbWc\"",
		"mtime": "2026-07-28T19:01:42.823Z",
		"size": 309428,
		"path": "../public/assets/index-D_jElPNY.js"
	},
	"/assets/graphs-DlLzyqZR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a31a-ww5l6ALpOmoWgATOVEGLDo7+iKs\"",
		"mtime": "2026-07-28T19:01:42.832Z",
		"size": 369434,
		"path": "../public/assets/graphs-DlLzyqZR.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_NjvhoS = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_NjvhoS
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };

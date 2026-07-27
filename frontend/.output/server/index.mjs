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
	"/assets/app-shell-gfbGILaS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2461-LG2DsUFSny7ELKbdDJUFet7FNa4\"",
		"mtime": "2026-07-27T02:44:23.571Z",
		"size": 9313,
		"path": "../public/assets/app-shell-gfbGILaS.js"
	},
	"/assets/arrow-left-BunhtHhK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-4dGOuhZDSXrfAQhYw6bkKGADK+4\"",
		"mtime": "2026-07-27T02:44:23.574Z",
		"size": 158,
		"path": "../public/assets/arrow-left-BunhtHhK.js"
	},
	"/assets/app-store-BT89ZOS-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8d7-QoaA9L8AZrzf9ik1ZVuolU9a8JI\"",
		"mtime": "2026-07-27T02:44:23.574Z",
		"size": 43223,
		"path": "../public/assets/app-store-BT89ZOS-.js"
	},
	"/assets/borrowers.index-Db-Me5iY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18e6-Jbddue0LS/lX4VJ2CZ/2jZ9Oyv0\"",
		"mtime": "2026-07-27T02:44:23.575Z",
		"size": 6374,
		"path": "../public/assets/borrowers.index-Db-Me5iY.js"
	},
	"/assets/borrowers.new-NqSPCghB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"870-NrfoPDyqo7eHawoJbJCvC8jUx+E\"",
		"mtime": "2026-07-27T02:44:23.576Z",
		"size": 2160,
		"path": "../public/assets/borrowers.new-NqSPCghB.js"
	},
	"/assets/borrowers._borrowerId-CJWFBOkq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"516e-P0V5kW7/L/KihnLKEIwtFdz4FTE\"",
		"mtime": "2026-07-27T02:44:23.574Z",
		"size": 20846,
		"path": "../public/assets/borrowers._borrowerId-CJWFBOkq.js"
	},
	"/assets/borrowers._borrowerId-DOVwPSQH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ed-HAQDE0zUJ9LfzbKGyFU7tRS1ot4\"",
		"mtime": "2026-07-27T02:44:23.575Z",
		"size": 749,
		"path": "../public/assets/borrowers._borrowerId-DOVwPSQH.js"
	},
	"/assets/collection-DesEZJ0I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8db-hN712FhdTWwClCKwCXMS/dy/6jc\"",
		"mtime": "2026-07-27T02:44:23.576Z",
		"size": 2267,
		"path": "../public/assets/collection-DesEZJ0I.js"
	},
	"/assets/dashboard-BR7MoQwY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94e-Ff0mkyNWRXc0MulM/EL5NlMQa5E\"",
		"mtime": "2026-07-27T02:44:23.577Z",
		"size": 2382,
		"path": "../public/assets/dashboard-BR7MoQwY.js"
	},
	"/assets/loan-ui-Dq8UQ9_y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d97-YcQMmPHkPjfWQrBUwwsFPoKaqtw\"",
		"mtime": "2026-07-27T02:44:23.578Z",
		"size": 3479,
		"path": "../public/assets/loan-ui-Dq8UQ9_y.js"
	},
	"/assets/loan.index-D4HaREMV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"313-jKSKHtCzEYO6lDPTr5VfuWh6jdM\"",
		"mtime": "2026-07-27T02:44:23.579Z",
		"size": 787,
		"path": "../public/assets/loan.index-D4HaREMV.js"
	},
	"/assets/loan.new-B1O8s4CK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e21-25UOGI6pTsYPt84u8PgRd7neCis\"",
		"mtime": "2026-07-27T02:44:23.579Z",
		"size": 3617,
		"path": "../public/assets/loan.new-B1O8s4CK.js"
	},
	"/assets/loan._loanId-BxFKHVcL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fb-kbmJxxV6M/IF23kuSIx0QxhYAJA\"",
		"mtime": "2026-07-27T02:44:23.578Z",
		"size": 763,
		"path": "../public/assets/loan._loanId-BxFKHVcL.js"
	},
	"/assets/index-i3denSRj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b8d5-dcTpGnAcRDZwvhtY1f2kf4X1Enw\"",
		"mtime": "2026-07-27T02:44:23.570Z",
		"size": 309461,
		"path": "../public/assets/index-i3denSRj.js"
	},
	"/assets/graphs-BLsiLVnq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a314-/T1dLfUwqFSAZxx4RINYXFohyMA\"",
		"mtime": "2026-07-27T02:44:23.577Z",
		"size": 369428,
		"path": "../public/assets/graphs-BLsiLVnq.js"
	},
	"/assets/loan._loanId-BYP2hsFP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"202f-RyUjqkVWnjRd9d519GgeXpk11UQ\"",
		"mtime": "2026-07-27T02:44:23.578Z",
		"size": 8239,
		"path": "../public/assets/loan._loanId-BYP2hsFP.js"
	},
	"/assets/preload-helper-CCOs2cLB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17df-1BDCz1g+L0FIx79ldILV8M7CBtc\"",
		"mtime": "2026-07-27T02:44:23.580Z",
		"size": 6111,
		"path": "../public/assets/preload-helper-CCOs2cLB.js"
	},
	"/assets/routes-DsnoVHxM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a21-tacrbq3tuSRjT66WHVLBpUZMh4A\"",
		"mtime": "2026-07-27T02:44:23.581Z",
		"size": 2593,
		"path": "../public/assets/routes-DsnoVHxM.js"
	},
	"/assets/settings-CAmTgJ2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d9-n95YDFtE13pZXF87plnCBF+UIRk\"",
		"mtime": "2026-07-27T02:44:23.581Z",
		"size": 4825,
		"path": "../public/assets/settings-CAmTgJ2o.js"
	},
	"/assets/styles-zUsGL-nj.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"142e7-HkCO47GTUBcYFST9PQVHT8/s7R4\"",
		"mtime": "2026-07-27T02:44:23.582Z",
		"size": 82663,
		"path": "../public/assets/styles-zUsGL-nj.css"
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
var _lazy_dU3b_O = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_dU3b_O
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

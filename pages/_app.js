/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<script>
					{
						!(function () {
							var analytics = (window.analytics =
								window.analytics || []);
							if (!analytics.initialize)
								if (analytics.invoked)
									window.console &&
										console.error &&
										console.error(
											"Segment snippet included twice."
										);
								else {
									analytics.invoked = !0;
									analytics.methods = [
										"trackSubmit",
										"trackClick",
										"trackLink",
										"trackForm",
										"pageview",
										"identify",
										"reset",
										"group",
										"track",
										"ready",
										"alias",
										"debug",
										"page",
										"once",
										"off",
										"on",
										"addSourceMiddleware",
										"addIntegrationMiddleware",
										"setAnonymousId",
										"addDestinationMiddleware",
									];
									analytics.factory = function (e) {
										return function () {
											var t = Array.prototype.slice.call(
												arguments
											);
											t.unshift(e);
											analytics.push(t);
											return analytics;
										};
									};
									for (
										var e = 0;
										e < analytics.methods.length;
										e++
									) {
										var key = analytics.methods[e];
										analytics[key] = analytics.factory(key);
									}
									analytics.load = function (key, e) {
										var t = document.createElement(
											"script"
										);
										t.type = "text/javascript";
										t.async = !0;
										t.src =
											"https://cdn.segment.com/analytics.js/v1/" +
											key +
											"/analytics.min.js";
										var n = document.getElementsByTagName(
											"script"
										)[0];
										n.parentNode.insertBefore(t, n);
										analytics._loadOptions = e;
									};
									analytics.SNIPPET_VERSION = "4.13.1";
									analytics.load(
										"wNeTVUQ2uN6PGhXGJBaSTC5cjKFCH37o"
									);
									analytics.page();
								}
						})()
					}
				</script>
			</Head>
			<div className="bg-gray-100 text-gray-500 h-screen w-screen overflow-auto">
				<Component {...pageProps} />;
			</div>
		</>
	);
}

export default MyApp;

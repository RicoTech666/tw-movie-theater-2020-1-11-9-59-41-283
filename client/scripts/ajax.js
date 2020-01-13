/* options = {
	url: "",
	method: "",
	headers: {},
	data: "",
	success: function(result) {}, // 请求成功后调用此方法
	fail: function(error) {}, // 请求失败或出错后调用此方法
}; */

window.ajax = function(options) {
	const ajaxData = {
		url: options.url || "",
		method: options.method.toUpperCase() || "GET",
		headers: options.headers || {},
		data: options.data || null,
		onSuccess: options.success || function(result) {},
		onFail: options.fail || function(error) {},
	};

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onload = () => ajaxData.onSuccess(JSON.parse(xmlhttp.responseText));
	xmlhttp.onerror = () => ajaxData.onFail(xmlhttp.status);
	xmlhttp.open(ajaxData.method, ajaxData.url, true);
	if ("POST" === ajaxData.method || ajaxData.method === "PUT") {
		xmlhttp.setRequestHeader("content-type", "application/json");
		ajaxData.data = JSON.stringify(ajaxData.data);
	}
	xmlhttp.send(ajaxData.data);
};

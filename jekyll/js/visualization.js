function quine(selector) {
  var code = document.createElement("code");
  var pre = document.createElement("pre");
  pre.textContent = document.getElementById(selector).textContent;
  code.append(pre);

  document.getElementById(selector + "View").append(code);

}

$(function() {
  window.d3VizInits.forEach(function(viz) { viz(); });
});

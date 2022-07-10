$("head").append(
  $('<link rel="stylesheet" type="text/css" />').attr(
    "href",
    chrome.runtime.getURL("lib/select2-materialize/select2.min.css")
  )
);
$("head").append(
  $('<link rel="stylesheet" type="text/css" />').attr(
    "href",
    chrome.runtime.getURL("styles/style.css")
  )
);
$("body").append(
  $("<script />").attr(
    "src",
    chrome.runtime.getURL("lib/jquery/dist/jquery.min.js")
  )
);
$("body").append(
  $("<script />").attr(
    "src",
    chrome.runtime.getURL("lib/select2-materialize/select2.min.js")
  )
);
$("body").append(
  $("<script />").attr("src", chrome.runtime.getURL("scripts/workload.js"))
);

window.onload = function () {
  // var $ = function (selector, startNode) {
  //   return (startNode || document).querySelector(selector);
  // };
  // var $$ = function (selector, startNode) {
  //   return (startNode || document).querySelectorAll(selector);
  // };

  /**
   * スクリプト処理
   */
  function insertUI() {
    let divEl = document.createElement("div");
    let pEl = document.createElement("p");
    pEl.innerText = "テストChrome拡張機能";
    divEl.appendChild(pEl);
    let selectHtmlStr = `<select id='select-form' placeholder='選んでね！'>
    <option disabled selected placeholder>選択してね！</option>
    <option value="1">アップル</option>
    <option value="2">オレンジ</option>
    <option value="3">バナナ</option>
    <option value="4">メロン</option>
  </select>`;
    const parser = new DOMParser();
    const selectHtmlDom = parser.parseFromString(selectHtmlStr, "text/html");
    divEl.appendChild(selectHtmlDom.getRootNode().body);
    if (document.querySelector("[aria-label='タイトル']")) {
      document
        .querySelector("[aria-label='タイトル']")
        .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.after(
          divEl
        );
    }
  }

  $("head").append(
    $('<link rel="stylesheet" type="text/css" />').attr(
      "href",
      chrome.runtime.getURL(
        "lib/bootstrap-material-design/dist/css/bootstrap-material-design.min.css"
      )
    )
  );

  $("head").append(
    $('<link rel="stylesheet" type="text/css" />').attr(
      "href",
      chrome.runtime.getURL("lib/select2-materialize/select2-materialize.css")
    )
  );

  var href = location.href;
  var observer = new MutationObserver(function (mutations) {
    if (href !== location.href) {
      console.log("Before:", href);
      console.log("After:", location.href);
      href = location.href;
      insertUI();
    }
  });

  observer.observe(document, { childList: true, subtree: true });
  insertUI();
};

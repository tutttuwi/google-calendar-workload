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
    let htmlStr = `
    <div id="app-workload"><div style="display: flex;width: calc(578px + 56px + (100% - 1049px)*0.16666667);padding: 8px 0;flex: 1 1 auto;margin-left: 60px;align-items: center;justify-content: start;">
  <select id="select-project" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
    <option disabled="" selected="" placeholder="">プロジェクト選択</option>
    <option value="1">〇〇案件</option>
    <option value="2">☓☓対応</option>
    <option value="3">▲▲改善</option>
  </select>
  <select id="select-phase" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
    <option disabled="" selected="" placeholder="">フェーズ選択</option>
    <option value="1">要件定義</option>
    <option value="2">調査</option>
    <option value="3">基本設計</option>
    <option value="4">製造</option>
  </select>
  <select id="select-task" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
    <option disabled="" selected="" placeholder="">タスク選択</option>
    <option value="1">○○機能追加</option>
    <option value="2">☓☓修正</option>
    <option value="3">▲▲のスケジュール整理</option>
    <option value="4">リファクタリング</option>
  </select></div></div>
  `;
    const parser = new DOMParser();
    const selectHtmlDom = parser.parseFromString(htmlStr, "text/html");
    const domEl = selectHtmlDom.body.childNodes[0];
    if (
      document.querySelector("[aria-label='タイトル']") &&
      !document.querySelector("#app-workload")
    ) {
      document
        .querySelector("[aria-label='タイトル']")
        .parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.after(
          domEl
        );
    }
    if (
      document.querySelector("[aria-label='タイトルを追加']") &&
      !document.querySelector("#app-workload")
    ) {
      document
        .querySelector("[aria-label='タイトルを追加']")
        .parentElement.parentElement.parentElement.parentElement.after(domEl);
    }
  }

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

  var href = location.href;
  var observer = new MutationObserver(function (mutations) {
    if (href !== location.href) {
      console.log("Before:", href);
      console.log("After:", location.href);
      href = location.href;
      if (!document.querySelector("#app-workload")) {
        insertUI();
        $("#select-project").select2();
        $("#select-phase").select2();
        $("#select-task").select2();
      }
    }
  });

  window.addEventListener("click", function () {
    console.log("click!");
    this.setTimeout(function () {
      if (!document.querySelector("#app-workload")) {
        console.log("click! #app-workload insert");
        insertUI();
        // $("#select-project").select2();
        // $("#select-phase").select2();
        // $("#select-task").select2();
      }
    }, 500);
  });

  observer.observe(document, { childList: true, subtree: true });
  insertUI();
  $("#select-project").select2();
  $("#select-phase").select2();
  $("#select-task").select2();
};

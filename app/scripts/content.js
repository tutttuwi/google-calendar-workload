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
    let htmlStr;
    if (document.querySelector("[aria-label='タイトル']")) {
      htmlStr = `
      <div id="app-workload"><div style="display: flex;width: calc(578px + 56px + (100% - 1049px)*0.16666667);padding: 8px 0;flex: 1 1 auto;margin-left: 60px;align-items: center;justify-content: start;">
    <select id="select-project" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
      <option disabled="" selected="" placeholder="">プロジェクト選択</option>
    </select>
    <select id="select-phase" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
      <option disabled="" selected="" placeholder="">フェーズ選択</option>
    </select>
    <select id="select-task" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
      <option disabled="" selected="" placeholder="">タスク選択</option>
    </select></div></div>
    `;
    } else if (document.querySelector("[aria-label='タイトルを追加']")) {
      htmlStr = `
      <div id="app-workload"><div style="display: flex;width: calc(578px + 56px + (100% - 1049px)*0.16666667);padding: 8px 0;flex: 1 1 auto;align-items: center;justify-content: start;">
    <select id="select-project" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
      <option disabled="" selected="" placeholder="">プロジェクト選択</option>
    </select>
    <select id="select-phase" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
      <option disabled="" selected="" placeholder="">フェーズ選択</option>
    </select>
    <select id="select-task" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
      <option disabled="" selected="" placeholder="">タスク選択</option>
    </select></div></div>
    `;
    } else {
      return;
    }

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
        setUI();
      }
    }
  });

  window.addEventListener("click", function () {
    console.log("click!");
    this.setTimeout(function () {
      if (!document.querySelector("#app-workload")) {
        console.log("click! #app-workload insert");
        setUI();
      }
    }, 500);
  });

  function changeSelect(e) {
    console.log("change select!");
    let idx = e.target.selectedIndex;
    let selectText = e.target.options[idx].text;
    console.log(selectText);
    let screenText;
    const detailCalendarText = "[aria-label='タイトル']";
    const popupCalendarText = "[aria-label='タイトルを追加']";
    if (document.querySelector(detailCalendarText)) {
      screenText = detailCalendarText;
    } else if (document.querySelector(popupCalendarText)) {
      screenText = popupCalendarText;
    }
    let curVal = document.querySelector(screenText).value;
    let titleAry = curVal.split(":");
    let prj = titleAry.shift();
    let phs = titleAry.shift();
    let tsk = titleAry.shift();
    let txt = titleAry.join(":");
    if (e.target.id == "select-project") {
      prj = selectText;
    } else if (e.target.id == "select-phase") {
      phs = selectText;
    } else if (e.target.id == "select-task") {
      tsk = selectText;
    }
    document.querySelector(screenText).value = [prj, phs, tsk, txt].join(":");
  }
  function setUI() {
    insertUI();
    $("#select-project")
      .select2({
        dropdownParent: $("#app-workload"),
        data: [
          { id: 10, text: "○○案件対応のユーザビリティ向上対応、幅のテスト" },
          { id: 11, text: "▲▲案件対応" },
          { id: 12, text: "■■案件対応" },
        ],
      })
      .on("select2:select", changeSelect);
    $("#select-phase")
      .select2({
        dropdownParent: $("#app-workload"),
        data: [
          { id: 10, text: "要件定義、幅のテストように文字列を長くする" },
          { id: 11, text: "基本設計" },
          { id: 12, text: "コーディング" },
        ],
      })
      .on("select2:select", changeSelect);
    $("#select-task")
      .select2({
        dropdownParent: $("#app-workload"),
        data: [
          {
            id: 10,
            text: "調査、幅のテストように文字列を長くする、幅のテストように文字列を長くする",
          },
          { id: 11, text: "会議" },
          { id: "xx", text: "障害対応" },
        ],
      })
      .on("select2:select", changeSelect);
  }

  observer.observe(document, { childList: true, subtree: true });
  setUI();
};

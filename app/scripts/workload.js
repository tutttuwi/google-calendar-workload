// window.onload = function () {
// var $ = function (selector, startNode) {
//   return (startNode || document).querySelector(selector);
// };
// var $$ = function (selector, startNode) {
//   return (startNode || document).querySelectorAll(selector);
// };

/**
 * スクリプト処理
 */
function setSelect() {
  let screenText;
  const detailCalendarText = "[aria-label='タイトル']";
  const popupCalendarText = "[aria-label='タイトルを追加']";
  if (document.querySelector(detailCalendarText)) {
    screenText = detailCalendarText;
  } else if (document.querySelector(popupCalendarText)) {
    screenText = popupCalendarText;
  }
  let curVal = document.querySelector(screenText).value;
  let titleAry = curVal.split("|");
  let prj = titleAry.shift();
  let phs = titleAry.shift();
  let tsk = titleAry.shift();
  let txt = titleAry.join("|");
  document.querySelector("#select-project").value;
}
function insertUI() {
  let htmlStr;
  if (document.querySelector("[aria-label='タイトル']")) {
    htmlStr = `
    <div id="app-workload">
      <div style="display: flex;width: calc(578px + 56px + (100% - 1049px)*0.16666667);padding: 8px 0;flex: 1 1 auto;margin-left: 60px;align-items: center;justify-content: start;">
        <select id="select-project" name="select-project" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
          <option disabled="" selected="" placeholder="">プロジェクト選択</option>
        </select>
        <select id="select-phase" name="select-phase" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
          <option disabled="" selected="" placeholder="">フェーズ選択</option>
        </select>
        <select id="select-task" name="select-task" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
          <option disabled="" selected="" placeholder="">タスク選択</option>
        </select>
      </div>
    </div>
    `;
  } else if (document.querySelector("[aria-label='タイトルを追加']")) {
    htmlStr = `
    <div id="app-workload">
      <div style="display: flex;width: calc(578px + 56px + (100% - 1049px)*0.16666667);padding: 8px 0;flex: 1 1 auto;align-items: center;justify-content: start;">
        <select id="select-project" name="select-project" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
          <option disabled="" selected="" placeholder="">プロジェクト選択</option>
        </select>
        <select id="select-phase" name="select-phase" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
          <option disabled="" selected="" placeholder="">フェーズ選択</option>
        </select>
        <select id="select-task" name="select-task" placeholder="選んでね！" style="flex-grow: 1;margin: 0px 5px;">
          <option disabled="" selected="" placeholder="">タスク選択</option>
        </select>
      </div>
    </div>
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

var href = location.href;
var observer = new MutationObserver(function (mutations) {
  if (href !== location.href) {
    console.log("Before:", href);
    console.log("After:", location.href);
    href = location.href;
    if (!document.querySelector("#app-workload") && isFetchedData()) {
      setUI();
    }
  }
});

window.addEventListener("click", function () {
  console.log("click!");
  this.setTimeout(function () {
    if (!document.querySelector("#app-workload") && isFetchedData()) {
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

  // 概要欄設定
  // let len = document.querySelectorAll("[role=textbox]").length;
  // if (len < 1) {
  //   console.log("説明欄が見つからないため処理を終了します。");
  //   return;
  // }
  // // 最後の要素が説明欄と判断
  // let curText = document.querySelectorAll("[role=textbox]")[len - 1].innerText;
  // if (!curText || curText == "\n") {
  //   alert(
  //     "説明欄が空のため選択できません。何か記載してから再度選択してください。"
  //   );
  //   return;
  // }
  // const TAG_TEXT = "[google-calendar-workload-tag]";
  // console.log("curText.includes(TAG_TEXT)");
  // console.log(curText.includes(TAG_TEXT));
  // if (!curText.includes(TAG_TEXT)) {
  //   console.log("-----tag no exists-----");
  //   curText = [TAG_TEXT, "prj", "phs", "tsk"].join("|") + curText;
  // }
  // let lineAry = curText.split("\n");
  // for (let i = 0; i < lineAry.length; i++) {
  //   let line = lineAry[i];
  //   console.log("-----line-----");
  //   console.log(line);
  //   if (line.includes(TAG_TEXT)) {
  //     console.log("-----include tag text-----");
  //     console.log(line);
  //     let tagAry = line.split("|");
  //     let tagText = tagAry.shift();
  //     let prj = tagAry.shift();
  //     let phs = tagAry.shift();
  //     let tsk = tagAry.shift();
  //     console.log("e.target.id");
  //     console.log(e.target.id);
  //     if (e.target.id == "select-project") {
  //       prj = selectText;
  //     } else if (e.target.id == "select-phase") {
  //       phs = selectText;
  //     } else if (e.target.id == "select-task") {
  //       tsk = selectText;
  //     }
  //     lineAry[i] = [tagText, prj, phs, tsk].join("|");
  //     console.log(lineAry[i]);
  //     break;
  //   }
  // }
  // curText = lineAry.join("\n");
  // // 概要欄更新
  // console.log("概要欄更新");
  // console.log(document.querySelectorAll("[role=textbox]")[len - 1].innerText);
  // console.log(curText);
  // document.querySelectorAll("[role=textbox]")[len - 1].innerText = curText;

  // タイトル設定
  if (document.querySelector(detailCalendarText)) {
    screenText = detailCalendarText;
  } else if (document.querySelector(popupCalendarText)) {
    screenText = popupCalendarText;
  }
  let curVal = document.querySelector(screenText).value;
  let titleAry = curVal.split("|");
  let prj = titleAry.shift();
  let phs = titleAry.shift();
  let tsk = titleAry.shift();
  let txt = titleAry.join("|");
  if (e.target.id == "select-project") {
    prj = selectText;
  } else if (e.target.id == "select-phase") {
    phs = selectText;
  } else if (e.target.id == "select-task") {
    tsk = selectText;
  }
  document.querySelector(screenText).value = [prj, phs, tsk, txt].join("|");
}

function defaultSelect(selElStr, tarText) {
  let ret = 0;
  console.log(selElStr);
  console.log(tarText);
  console.log($(selElStr));
  let ops = $(selElStr).find(option);
  for (let i = 0; i < ops.length; i++) {
    console.log("-- i :" + i);
    if (ops[i].value == tarText) {
      ret = ops[i].id;
    }
  }
  return ret;
}
function setUI() {
  insertUI();
  // TODO: デフォルト値を設定する処理 初期ロード時にタイトル部分が読み込めずエラーとなってしまう
  // let screenText;
  // const detailCalendarText = "[aria-label='タイトル']";
  // const popupCalendarText = "[aria-label='タイトルを追加']";
  // if (document.querySelector(detailCalendarText)) {
  //   screenText = detailCalendarText;
  // } else if (document.querySelector(popupCalendarText)) {
  //   screenText = popupCalendarText;
  // }
  // let curVal, prj, phs, tsk, txt;
  // if (screenText) {
  //   curVal = document.querySelector(screenText).value;
  //   let titleAry = curVal.split("|");
  //   prj = titleAry.shift();
  //   phs = titleAry.shift();
  //   tsk = titleAry.shift();
  //   txt = titleAry.join("|");
  // }

  $("#select-project")
    .select2({
      dropdownParent: $("#app-workload"),
      data: selectProjectData,
    })
    .on("select2:select", changeSelect);

  $("#select-phase")
    .select2({
      dropdownParent: $("#app-workload"),
      data: selectPhaseData,
    })
    .on("select2:select", changeSelect);
  $("#select-task")
    .select2({
      dropdownParent: $("#app-workload"),
      data: selectTaskData,
    })
    .on("select2:select", changeSelect);
  // TODO: StorageAreaから取得、シートIDがなければAPIコールしない
  localStorage.setItem("sheetId", "test");
  let sheetId = localStorage.getItem("sheetId");
  fetchSelectData(sheetId);
}

const WORKLOAD_URL =
  "https://script.google.com/macros/s/AKfycbyE5HDGA4HqAaCBMQoyDmcwQX8uXPD0SbsKzagwqSUK10TBaGBRAhoXUSep-l2i9KB7-Q/exec";
function doGet(qsData, callback) {
  let queryString = "";
  Object.keys(qsData).forEach((k) => {
    if (queryString) {
      queryString += "&" + k + "=" + qsData[k];
    } else {
      queryString += k + "=" + qsData[k];
    }
  });
  let ret = {};
  $.ajax({
    type: "get",
    url: WORKLOAD_URL + "?" + queryString,
    data: "",
    dataType: "jsonp",
    responseType: "application/json",
  })
    .done(function (data, textStatus, jqXHR) {
      console.log(data);
      console.log(textStatus);
      console.log(jqXHR.status);
      ret.data = data;
      if (jqXHR === 200) {
        ret.isOk = true;
      } else {
        ret.isOk = false;
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      ret.isOk = false;
      console.log(
        "XMLHttpRequest : " +
          jqXHR.status +
          "\ntextStatus     : " +
          textStatus +
          "\nerrorThrown    : " +
          errorThrown.message
      );
    })
    .always(function () {
      callback(ret); // callback関数にリクエスト結果設定
    });
}

let selectProjectData;
let selectPhaseData;
let selectTaskData;
function adjustSelectData(data) {
  console.log("--- adjustSelectData ---");
  console.log(data);
  let ret = [];
  data.data.data.forEach((v, i) => {
    ret.push({ id: i, text: v.name });
  });
  return ret;
}
function fetchSelectData(sheetId) {
  sheetId = "";
  console.log("fetchSelectData : CALLED");
  doGet({ select: "project", sheetId: sheetId }, function (data) {
    selectProjectData = adjustSelectData(data);
  });
  doGet({ select: "phase", sheetId: sheetId }, function (data) {
    selectPhaseData = adjustSelectData(data);
  });
  doGet({ select: "task", sheetId: sheetId }, function (data) {
    selectTaskData = adjustSelectData(data);
  });
}
function isFetchedData() {
  return selectProjectData && selectPhaseData && selectTaskData;
}

// ページ読み込み時実行
observer.observe(document, { childList: true, subtree: true });
setUI();

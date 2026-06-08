/* ===============================
   SORT THE TRASH CHALLENGE
   appsScript.gs
   Google Sheet Leaderboard Backend
================================ */

const SHEET_NAME = "Responses";

const HEADERS = [
  "Timestamp",
  "Name",
  "Department",
  "Designation",
  "Score",
  "Correct",
  "Incorrect",
  "Attempted",
  "Accuracy",
  "Time Taken",
  "Time Taken Seconds"
];

/* ===============================
   GET REQUEST
   Used to fetch leaderboard
================================ */

function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === "leaderboard") {
      const department = e.parameter.department || "Overall";
      const leaderboard = getLeaderboard(department);

      return createJsonResponse(leaderboard);
    }

    return createJsonResponse({
      status: "success",
      message: "Sort the Trash Challenge API is working."
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/* ===============================
   POST REQUEST
   Used to submit score
================================ */

function doPost(e) {
  try {
    const sheet = getOrCreateSheet();

    let data = {};

    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    if (data.action !== "submit") {
      return createJsonResponse({
        status: "error",
        message: "Invalid action."
      });
    }

    const timestamp = new Date();

    const name = cleanText(data.name);
    const department = cleanText(data.department);
    const designation = cleanText(data.designation);

    const score = Number(data.score) || 0;
    const correct = Number(data.correct) || 0;
    const incorrect = Number(data.incorrect) || 0;
    const attempted = Number(data.attempted) || 0;
    const accuracy = Number(data.accuracy) || 0;

    const timeTaken = cleanText(data.timeTaken);
    const timeTakenSeconds = Number(data.timeTakenSeconds) || 0;

    if (!name || !department || !designation) {
      return createJsonResponse({
        status: "error",
        message: "Name, department, and designation are required."
      });
    }

    sheet.appendRow([
      timestamp,
      name,
      department,
      designation,
      score,
      correct,
      incorrect,
      attempted,
      accuracy,
      timeTaken,
      timeTakenSeconds
    ]);

    return createJsonResponse({
      status: "success",
      message: "Score submitted successfully."
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/* ===============================
   GET OR CREATE SHEET
================================ */

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  setupHeaders(sheet);

  return sheet;
}

/* ===============================
   SETUP HEADERS
================================ */

function setupHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];

  const hasHeaders = firstRow.some(function (cell) {
    return cell !== "";
  });

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#16834c")
      .setFontColor("#ffffff");

    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }
}

/* ===============================
   GET LEADERBOARD
================================ */

function getLeaderboard(departmentFilter) {
  const sheet = getOrCreateSheet();
  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return [];
  }

  const rows = values.slice(1);

  let results = rows.map(function (row) {
    return {
      timestamp: row[0],
      name: row[1],
      department: row[2],
      designation: row[3],
      score: Number(row[4]) || 0,
      correct: Number(row[5]) || 0,
      incorrect: Number(row[6]) || 0,
      attempted: Number(row[7]) || 0,
      accuracy: Number(row[8]) || 0,
      timeTaken: row[9],
      timeTakenSeconds: Number(row[10]) || 99999
    };
  });

  if (departmentFilter && departmentFilter !== "Overall") {
    results = results.filter(function (item) {
      return item.department === departmentFilter;
    });
  }

  results.sort(function (a, b) {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    if (b.accuracy !== a.accuracy) {
      return b.accuracy - a.accuracy;
    }

    return a.timeTakenSeconds - b.timeTakenSeconds;
  });

  return results.slice(0, 10).map(function (item, index) {
    return {
      rank: index + 1,
      name: item.name,
      department: item.department,
      designation: item.designation,
      score: item.score,
      correct: item.correct,
      incorrect: item.incorrect,
      attempted: item.attempted,
      accuracy: item.accuracy,
      timeTaken: item.timeTaken,
      timeTakenSeconds: item.timeTakenSeconds
    };
  });
}

/* ===============================
   JSON RESPONSE
================================ */

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ===============================
   CLEAN TEXT
================================ */

function cleanText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

/* ===============================
   TEST FUNCTION
================================ */

function testSubmitScore() {
  const sheet = getOrCreateSheet();

  sheet.appendRow([
    new Date(),
    "Test Employee",
    "EHS",
    "Executive",
    120,
    14,
    2,
    16,
    87.5,
    "05:00",
    300
  ]);
}

/* ===============================
   CLEAR DATA
   Use carefully
================================ */

function clearLeaderboardData() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, HEADERS.length).clearContent();
  }
}
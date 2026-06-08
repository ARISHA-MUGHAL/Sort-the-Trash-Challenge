/* ===============================
   SORT THE TRASH CHALLENGE
   appsScript.gs
   Google Sheet Leaderboard Backend
   One Attempt Per Email ID
================================ */

const SHEET_NAME = "Responses";

const HEADERS = [
  "Timestamp",
  "Name",
  "Email ID",
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
   Used for leaderboard and email check
================================ */

function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === "leaderboard") {
      const department = e.parameter.department || "Overall";
      const leaderboard = getLeaderboard(department);

      return createJsonResponse(leaderboard);
    }

    if (action === "checkEmail") {
      const email = cleanText(e.parameter.email).toLowerCase();
      const exists = checkEmailExists(email);

      return createJsonResponse({
        status: "success",
        exists: exists
      });
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
    const email = cleanText(data.email).toLowerCase();
    const department = cleanText(data.department);
    const designation = cleanText(data.designation);

    const score = Number(data.score) || 0;
    const correct = Number(data.correct) || 0;
    const incorrect = Number(data.incorrect) || 0;
    const attempted = Number(data.attempted) || 0;
    const accuracy = Number(data.accuracy) || 0;

    const timeTaken = cleanText(data.timeTaken);
    const timeTakenSeconds = Number(data.timeTakenSeconds) || 0;

    if (!name || !email || !department || !designation) {
      return createJsonResponse({
        status: "error",
        message: "Name, email ID, department, and designation are required."
      });
    }

    if (!isValidEmail(email)) {
      return createJsonResponse({
        status: "error",
        message: "Please enter a valid email ID."
      });
    }

    if (checkEmailExists(email)) {
      return createJsonResponse({
        status: "error",
        message: "This email ID has already submitted one attempt."
      });
    }

    sheet.appendRow([
      timestamp,
      name,
      email,
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

    sheet.autoResizeColumns(1, HEADERS.length);

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
   CHECK IF EMAIL ALREADY EXISTS
================================ */

function checkEmailExists(email) {
  if (!email) {
    return false;
  }

  const sheet = getOrCreateSheet();
  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return false;
  }

  const rows = values.slice(1);

  return rows.some(function (row) {
    const savedEmail = String(row[2] || "").trim().toLowerCase();
    return savedEmail === email;
  });
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
      email: row[2],
      department: row[3],
      designation: row[4],
      score: Number(row[5]) || 0,
      correct: Number(row[6]) || 0,
      incorrect: Number(row[7]) || 0,
      attempted: Number(row[8]) || 0,
      accuracy: Number(row[9]) || 0,
      timeTaken: row[10],
      timeTakenSeconds: Number(row[11]) || 99999
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
   EMAIL VALIDATION
================================ */

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/* ===============================
   OPTIONAL TEST FUNCTION
   Run manually inside Apps Script
================================ */

function testSubmitScore() {
  const sheet = getOrCreateSheet();

  sheet.appendRow([
    new Date(),
    "Test Employee",
    "test@outlook.com",
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

  sheet.autoResizeColumns(1, HEADERS.length);
}

/* ===============================
   OPTIONAL CLEAR DATA
   Use carefully
================================ */

function clearLeaderboardData() {
  const sheet = getOrCreateSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, HEADERS.length).clearContent();
  }
}

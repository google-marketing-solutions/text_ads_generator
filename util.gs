function compareFn(a, b) {
  if (a.length < b.length) {
    return -1;
  } else if (a.length > b.length) {
    return 1;
  }
  return 0;
}

function checkBlockingKeywords(blocking_keywords) {
  return function(text) {
    for (let j = 0; j < blocking_keywords.length; j++) {
      if (text.toLowerCase().includes(blocking_keywords[j])) {
        return false
      }
    }
    return true
  }
}

function checkBlockedSuffix(text, keywords) {
  for (let j = 0; j < keywords.length; j++) {
    if (text.endsWith(keywords[j])) {
      return false
    }
  }
  return true
}

function removeLastNonLetterCharacter(text) {
  if (text === null) {
    return text
  }
  if (text === undefined) {
    return text
  }
  const length = text.length
  if (length === 0) {
    return text
  }
  const characters = ['!', '！', '。', '.']
  for (const c of characters) {
    if (text.endsWith(c)) {
      text = text.substring(0, length - 1)
    }
  }
  return text
}

class MultiLogger {
  constructor() {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
  }
  clear() {
    this.sheet?.clear();
    SpreadsheetApp.flush();
  }
  log(...messages) {
    const msg = messages
      .map(m => (typeof m === 'object' ? JSON.stringify(m) : m))
      .join(' ');
    Logger.log(msg);
    this.sheet?.appendRow([JSON.stringify(msg)]);
    SpreadsheetApp.flush();
  }
  static getInstance() {
    if (typeof this.instance === 'undefined') {
      this.instance = new MultiLogger();
    }
    return this.instance;
  }
}

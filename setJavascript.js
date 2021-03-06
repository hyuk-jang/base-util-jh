﻿// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

// Date 관련

Date.isLeapYear = function (year) {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

Date.getDaysInMonth = function (year, month) {
  return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () {
  return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
  return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
  var n = this.getDate();
  this.setDate(1);
  this.setMonth(this.getMonth() + value);
  this.setDate(Math.min(n, this.getDaysInMonth()));
  return this;
};

Date.prototype.addYear = function (value) {
  this.setFullYear(this.getFullYear() + value);
  return this;
};

Date.prototype.addDays = function (value) {
  this.setDate(this.getDate() + value);
  return this;
};

Date.prototype.addHours = function (value) {
  this.setHours(this.getHours() + value);
  return this;
};

Date.prototype.addMinutes = function (value) {
  this.setMinutes(this.getMinutes() + value);
  return this;
};

Date.prototype.addSeconds = function (value) {
  this.setSeconds(this.getSeconds() + value);
  return this;
};

Date.prototype.addTime = function (year, month, day, hour, min, sec) {
  year = year == '' || year == undefined ? 0 : year;
  month = month == '' || month == undefined ? 0 : month;
  day = day == '' || day == undefined ? 0 : day;
  hour = hour == '' || hour == undefined ? 0 : hour;
  min = min == '' || min == undefined ? 0 : min;
  sec = sec == '' || sec == undefined ? 0 : sec;
  this.addYear(year);
  this.addMonths(month);
  this.addDays(day);
  this.addHours(hour);
  this.addMinutes(min);
  this.addSeconds(sec);
  return this;
};


//배열을 순회하면서 프로퍼티 이름과 벨류와 같은 내용을 하나 찾기
Array.prototype.findArrayElement = function (key, value) {
  var returnvalue = null;

  this.some(function (obj) {
    if (obj[key] == value) {
      returnvalue = obj;
      return true;
    }
  });

  return returnvalue;
};
// 배열의 프로퍼티 이름이 ID이고 입력한 ID 값이 같은거 하나 찿기
Array.prototype.findArrayElementById = function (value) {
  return this.findArrayElement('ID', value);
};


// 배열의 프로퍼티 이름이 Number이고 입력한 Number 값이 같은거 하나 찿기
Array.prototype.findArrayElementByNumber = function (value) {
  return this.findArrayElement('Number', value);
};


// 다수개 찾기
Array.prototype.findArrayElements = function (key, value) {
  var returnvalue = [];

  this.forEach(function (obj) {
    if (obj[key] == value) {
      returnvalue.push(obj);
    }
  });

  return returnvalue;
};

Array.prototype.findArrayElementsByBoardid = function (value) {
  return this.findArrayElements('BoardID', value);
};

//배열의 요소를 인덱스로 삭제
Array.prototype.deleteByIndex = function (index) {
  this.splice(index, 1);
};

Array.prototype.sum = function() {
  return this.reduce(function(accumulator, currentValue) {
    return Number(accumulator) + Number(currentValue) ;
  });
};

Number.prototype.scale = function(scale, toFixed){
// BU.CLI('scale',scale, toFixed)
  return Number((this * scale).toFixed(toFixed ? toFixed : 0));
};


//replaceAll prototype 선언
String.prototype.replaceAll = function(org, dest) {

  return this.split(org).join(dest);
};


import * as React from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import { createContext, useContextSelector } from 'use-context-selector';
import FormulaParser, { DepParser, FormulaError } from 'fast-formula-parser';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var SET_DATA = "SET_DATA";
var SELECT_ENTIRE_ROW = "SELECT_ENTIRE_ROW";
var SELECT_ENTIRE_COLUMN = "SELECT_ENTIRE_COLUMN";
var SELECT_ENTIRE_TABLE = "SELECT_ENTIRE_TABLE";
var SELECT = "SELECT";
var ACTIVATE = "ACTIVATE";
var SET_CELL_DATA = "SET_CELL_DATA";
var SET_CELL_DIMENSIONS = "SET_CELL_DIMENSIONS";
var COPY = "COPY";
var CUT = "CUT";
var PASTE = "PASTE";
var EDIT = "EDIT";
var VIEW = "VIEW";
var CLEAR = "CLEAR";
var BLUR = "BLUR";
var KEY_PRESS = "KEY_PRESS";
var KEY_DOWN = "KEY_DOWN";
var DRAG_START = "DRAG_START";
var DRAG_END = "DRAG_END";
var COMMIT = "COMMIT";
function setData(data) {
    return {
        type: SET_DATA,
        payload: { data: data }
    };
}
function selectEntireRow(row, extend) {
    return {
        type: SELECT_ENTIRE_ROW,
        payload: { row: row, extend: extend }
    };
}
function selectEntireColumn(column, extend) {
    return {
        type: SELECT_ENTIRE_COLUMN,
        payload: { column: column, extend: extend }
    };
}
function selectEntireTable() {
    return { type: SELECT_ENTIRE_TABLE };
}
function select(point) {
    return {
        type: SELECT,
        payload: { point: point }
    };
}
function activate(point) {
    return {
        type: ACTIVATE,
        payload: { point: point }
    };
}
function setCellData(active, data) {
    return {
        type: SET_CELL_DATA,
        payload: { active: active, data: data }
    };
}
function setCellDimensions(point, dimensions) {
    return {
        type: SET_CELL_DIMENSIONS,
        payload: { point: point, dimensions: dimensions }
    };
}
function paste(data) {
    return {
        type: PASTE,
        payload: { data: data }
    };
}
function keyPress(event) {
    return {
        type: KEY_PRESS,
        payload: { event: event }
    };
}
function keyDown(event) {
    return {
        type: KEY_DOWN,
        payload: { event: event }
    };
}
function dragStart() {
    return { type: DRAG_START };
}
function dragEnd() {
    return { type: DRAG_END };
}
function commit$1(changes) {
    return {
        type: COMMIT,
        payload: { changes: changes }
    };
}
function copy() {
    return { type: COPY };
}
function cut() {
    return { type: CUT };
}
function edit$1() {
    return { type: EDIT };
}
function view$1() {
    return { type: VIEW };
}
function blur$1() {
    return { type: BLUR };
}

/**
 * Creates an empty matrix with given rows and columns
 * @param rows - integer, the amount of rows the matrix should have
 * @param columns - integer, the amount of columns the matrix should have
 * @returns an empty matrix with given rows and columns
 */
function createEmpty(rows, columns) {
    var matrix = Array(rows);
    for (var i = 0; i < rows; i++) {
        matrix[i] = Array(columns);
    }
    return matrix;
}
/** Gets the value at row and column of matrix. */
function get(point, matrix) {
    var columns = matrix[point.row];
    if (columns === undefined) {
        return undefined;
    }
    return columns[point.column];
}
/** Creates a slice of matrix from startPoint up to, but not including, endPoint. */
function slice(startPoint, endPoint, matrix) {
    var sliced = [];
    var columns = endPoint.column - startPoint.column;
    for (var row = startPoint.row; row <= endPoint.row; row++) {
        var slicedRow = row - startPoint.row;
        sliced[slicedRow] = sliced[slicedRow] || Array(columns);
        for (var column = startPoint.column; column <= endPoint.column; column++) {
            sliced[slicedRow][column - startPoint.column] = get({ row: row, column: column }, matrix);
        }
    }
    return sliced;
}
/** Sets the value at row and column of matrix. If a row doesn't exist, it's created. */
function set(point, value, matrix) {
    var nextMatrix = __spreadArray([], __read(matrix));
    // Synchronize first row length
    var firstRow = matrix[0];
    var nextFirstRow = firstRow ? __spreadArray([], __read(firstRow)) : [];
    if (nextFirstRow.length - 1 < point.column) {
        nextFirstRow[point.column] = undefined;
        nextMatrix[0] = nextFirstRow;
    }
    var nextRow = matrix[point.row] ? __spreadArray([], __read(matrix[point.row])) : [];
    nextRow[point.column] = value;
    nextMatrix[point.row] = nextRow;
    return nextMatrix;
}
/** Like Matrix.set() but mutates the matrix */
function mutableSet(point, value, matrix) {
    var firstRow = matrix[0];
    if (!firstRow) {
        firstRow = [];
        matrix[0] = firstRow;
    }
    if (!(point.row in matrix)) {
        matrix[point.row] = [];
    }
    // Synchronize first row length
    if (!(point.column in firstRow)) {
        firstRow[point.column] = undefined;
    }
    matrix[point.row][point.column] = value;
}
/** Removes the coordinate of matrix */
function unset(point, matrix) {
    if (!has(point, matrix)) {
        return matrix;
    }
    var nextMatrix = __spreadArray([], __read(matrix));
    var nextRow = __spreadArray([], __read(matrix[point.row]));
    // Avoid deleting to preserve first row length
    nextRow[point.column] = undefined;
    nextMatrix[point.row] = nextRow;
    return nextMatrix;
}
/** Creates an array of values by running each element in collection thru iteratee. */
function map(func, matrix) {
    var e_1, _a;
    var newMatrix = [];
    try {
        for (var _b = __values(entries(matrix)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), point = _d[0], value = _d[1];
            mutableSet(point, func(value, point), newMatrix);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return newMatrix;
}
/** Create an iterator over the cells in the matrix */
function entries(matrix) {
    var _a, _b, _c, row, values, _d, _e, _f, column, value, point, e_2_1, e_3_1;
    var e_3, _g, e_2, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 11, 12, 13]);
                _a = __values(matrix.entries()), _b = _a.next();
                _j.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 10];
                _c = __read(_b.value, 2), row = _c[0], values = _c[1];
                _j.label = 2;
            case 2:
                _j.trys.push([2, 7, 8, 9]);
                _d = (e_2 = void 0, __values(values.entries())), _e = _d.next();
                _j.label = 3;
            case 3:
                if (!!_e.done) return [3 /*break*/, 6];
                _f = __read(_e.value, 2), column = _f[0], value = _f[1];
                point = { row: row, column: column };
                return [4 /*yield*/, [point, value]];
            case 4:
                _j.sent();
                _j.label = 5;
            case 5:
                _e = _d.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_2_1 = _j.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (_e && !_e.done && (_h = _d["return"])) _h.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 9:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_3_1 = _j.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_b && !_b.done && (_g = _a["return"])) _g.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 13: return [2 /*return*/];
        }
    });
}
/**
 * Converts all elements in row into a string separated by horizontalSeparator and each row string
 * to string separated by verticalSeparator
 */
function join(matrix, horizontalSeparator, verticalSeparator) {
    if (horizontalSeparator === void 0) { horizontalSeparator = "\t"; }
    if (verticalSeparator === void 0) { verticalSeparator = "\n"; }
    var joined = "";
    var _a = getSize(matrix), rows = _a.rows, columns = _a.columns;
    for (var row = 0; row < rows; row++) {
        if (row) {
            joined += verticalSeparator;
        }
        for (var column = 0; column < columns; column++) {
            if (column) {
                joined += horizontalSeparator;
            }
            if (matrix[row] && column in matrix[row]) {
                joined += String(matrix[row][column]);
            }
        }
    }
    return joined;
}
/**
 * Parses a CSV separated by a horizontalSeparator and verticalSeparator into a
 * Matrix using a transform function
 */
function split(csv, transform, horizontalSeparator, verticalSeparator) {
    if (horizontalSeparator === void 0) { horizontalSeparator = "\t"; }
    if (verticalSeparator === void 0) { verticalSeparator = /\r\n|\n|\r/; }
    return csv
        .split(verticalSeparator)
        .map(function (row) { return row.split(horizontalSeparator).map(transform); });
}
/** Returns whether the point exists in the matrix or not. */
function has(point, matrix) {
    var firstRow = matrix[0];
    return (firstRow &&
        // validation
        point.row >= 0 &&
        point.column >= 0 &&
        Number.isInteger(point.row) &&
        Number.isInteger(point.column) &&
        // first row length is in sync with other rows
        point.column < firstRow.length &&
        point.row < matrix.length);
}
/** Gets the count of rows and columns of given matrix */
function getSize(matrix) {
    return {
        columns: getColumnsCount(matrix),
        rows: getRowsCount(matrix)
    };
}
/** Gets the count of rows of given matrix */
function getRowsCount(matrix) {
    return matrix.length;
}
/** Gets the count of columns of given matrix */
function getColumnsCount(matrix) {
    var firstRow = matrix[0];
    return firstRow ? firstRow.length : 0;
}
/**
 * Pads matrix with empty columns to match given total columns
 * @param matrix - matrix to pad
 * @param size - minimum size of the matrix after padding.
 * @returns the updated matrix
 */
function pad(matrix, size) {
    var _a = getSize(matrix), rows = _a.rows, columns = _a.columns;
    if (rows >= size.rows && columns >= size.columns) {
        // Optimization, no padding required.
        return matrix;
    }
    var resultSize = {
        rows: size.rows > rows ? size.rows : rows,
        columns: size.columns > columns ? size.columns : columns
    };
    var padded = __spreadArray([], __read(matrix));
    if (resultSize.columns > columns) {
        var padColumns_1 = resultSize.columns - columns;
        padded = padded.map(function (row) { return __spreadArray(__spreadArray([], __read(row), false), __read(Array(padColumns_1).fill(undefined))); });
    }
    if (resultSize.rows > rows) {
        var padRows_1 = resultSize.rows - rows;
        var emptyRow = Array(resultSize.columns).fill(undefined);
        padded = __spreadArray(__spreadArray([], __read(padded), false), __read(Array(padRows_1).fill(emptyRow)));
    }
    return padded;
}
/**
 * Flattens a matrix values to an array
 * @param matrix - the matrix to flatten values from
 * @param transform - optional transform function to apply to each value in the
 * matrix
 * @returns an array of the values from matrix, transformed if a transform
 * function is passed
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function toArray(matrix, transform) {
    var array = [];
    for (var row = 0; row < matrix.length; row++) {
        for (var column = 0; column < matrix[row].length; column++) {
            var value = matrix[row][column];
            array.push(transform ? transform(value, { row: row, column: column }) : value);
        }
    }
    return array;
}
/** Returns the maximum point in the matrix */
function maxPoint(matrix) {
    var size = getSize(matrix);
    return { row: size.rows - 1, column: size.columns - 1 };
}

/** Return whether two given points are the equal */
function isEqual(source, target) {
    return source.column === target.column && source.row === target.row;
}
/** The origin point in matrices */
var ORIGIN = { row: 0, column: 0 };

var PLAIN_TEXT_MIME = "text/plain";
var FOCUS_WITHIN_SELECTOR = ":focus-within";
/** Move the cursor of given input element to the input's end */
function moveCursorToEnd(el) {
    el.selectionStart = el.selectionEnd = el.value.length;
}
/**
 * Creates an array of numbers (positive and/or negative) progressing from start up to, but not including, end. A step of -1 is used if a negative start is specified without an end or step. If end is not specified, it's set to start with start then set to 0.
 * @param end - an integer number specifying at which position to stop (not included).
 * @param start - An integer number specifying at which position to start.
 * @param step - An integer number specifying the incrementation
 */
function range(end, start, step) {
    if (start === void 0) { start = 0; }
    if (step === void 0) { step = 1; }
    var array = [];
    if (Math.sign(end - start) === -1) {
        for (var element = start; element > end; element -= step) {
            array.push(element);
        }
        return array;
    }
    for (var element = start; element < end; element += step) {
        array.push(element);
    }
    return array;
}
/** Return whether given point is active */
function isActive(active, point) {
    return Boolean(active && isEqual(point, active));
}
/** Get the offset values of given element */
function getOffsetRect(element) {
    return {
        width: element.offsetWidth,
        height: element.offsetHeight,
        left: element.offsetLeft,
        top: element.offsetTop
    };
}
/** Write given data to clipboard with given event */
function writeTextToClipboard(event, data) {
    var _a;
    (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData(PLAIN_TEXT_MIME, data);
}
/** Read text from given clipboard event */
function readTextFromClipboard(event) {
    // @ts-ignore
    if (window.clipboardData && window.clipboardData.getData) {
        // @ts-ignore
        return window.clipboardData.getData("Text");
    }
    if (event.clipboardData && event.clipboardData.getData) {
        return event.clipboardData.getData(PLAIN_TEXT_MIME);
    }
    return "";
}
/** Get the dimensions of cell at point from state */
function getCellDimensions(point, rowDimensions, columnDimensions) {
    var cellRowDimensions = rowDimensions && rowDimensions[point.row];
    var cellColumnDimensions = columnDimensions && columnDimensions[point.column];
    return (cellRowDimensions &&
        cellColumnDimensions && __assign(__assign({}, cellRowDimensions), cellColumnDimensions));
}
/** Get the dimensions of a range of cells */
function getRangeDimensions(rowDimensions, columnDimensions, range) {
    var startDimensions = getCellDimensions(range.start, rowDimensions, columnDimensions);
    var endDimensions = getCellDimensions(range.end, rowDimensions, columnDimensions);
    return (startDimensions &&
        endDimensions && {
        width: endDimensions.left + endDimensions.width - startDimensions.left,
        height: endDimensions.top + endDimensions.height - startDimensions.top,
        top: startDimensions.top,
        left: startDimensions.left
    });
}
/** Get the dimensions of selected */
function getSelectedDimensions(rowDimensions, columnDimensions, data, selected) {
    var range = selected.toRange(data);
    return range
        ? getRangeDimensions(rowDimensions, columnDimensions, range)
        : undefined;
}
/** Get given data as CSV */
function getCSV(data) {
    var valueMatrix = map(function (cell) { return (cell === null || cell === void 0 ? void 0 : cell.value) || ""; }, data);
    return join(valueMatrix);
}
/**
 * Calculate the rows and columns counts of a spreadsheet
 * @param data - the spreadsheet's data
 * @param rowLabels - the spreadsheet's row labels (if defined)
 * @param columnLabels - the spreadsheet's column labels (if defined)
 * @returns the rows and columns counts of a spreadsheet
 */
function calculateSpreadsheetSize(data, rowLabels, columnLabels) {
    var _a = getSize(data), columns = _a.columns, rows = _a.rows;
    return {
        rows: rowLabels ? Math.max(rows, rowLabels.length) : rows,
        columns: columnLabels ? Math.max(columns, columnLabels.length) : columns
    };
}
/** Should spreadsheet handle clipboard event */
function shouldHandleClipboardEvent(root, mode) {
    return root !== null && mode === "view" && isFocusedWithin(root);
}
function isFocusedWithin(element) {
    return element.matches(FOCUS_WITHIN_SELECTOR);
}

var Table = function (_a) {
    var children = _a.children, columns = _a.columns, hideColumnIndicators = _a.hideColumnIndicators;
    var columnCount = columns + (hideColumnIndicators ? 0 : 1);
    var columnNodes = range(columnCount).map(function (i) { return React.createElement("col", { key: i }); });
    return (React.createElement("table", { className: "Spreadsheet__table" },
        React.createElement("colgroup", null, columnNodes),
        React.createElement("tbody", null, children)));
};

var Row = function (props) { return React.createElement("tr", __assign({}, props)); };

var HeaderRow = function (props) { return React.createElement("tr", __assign({}, props)); };

/**
 * Interface for ranges between two points
 */
/** Range between two points. Creates a normalized range between two given points */
var PointRange = /** @class */ (function () {
    function PointRange(source, target) {
        this.start = {
            row: Math.min(source.row, target.row),
            column: Math.min(source.column, target.column)
        };
        this.end = {
            row: Math.max(source.row, target.row),
            column: Math.max(source.column, target.column)
        };
    }
    /** Iterates through all the existing points in given range */
    PointRange.prototype[Symbol.iterator] = function () {
        var row, column;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    row = this.start.row;
                    _a.label = 1;
                case 1:
                    if (!(row <= this.end.row)) return [3 /*break*/, 6];
                    column = this.start.column;
                    _a.label = 2;
                case 2:
                    if (!(column <= this.end.column)) return [3 /*break*/, 5];
                    return [4 /*yield*/, { row: row, column: column }];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    column++;
                    return [3 /*break*/, 2];
                case 5:
                    row++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    };
    /** Returns the size (rows x columns) of the given range */
    PointRange.prototype.size = function () {
        var rows = this.end.row + 1 - this.start.row;
        var columns = this.end.column + 1 - this.start.column;
        return rows * columns;
    };
    /** Returns whether given point exists in given range */
    PointRange.prototype.has = function (point) {
        return (point.row >= this.start.row &&
            point.column >= this.start.column &&
            point.row <= this.end.row &&
            point.column <= this.end.column);
    };
    /** Limits given masked range with given mask */
    PointRange.prototype.mask = function (mask) {
        return new PointRange({
            row: mask.start.row > this.start.row ? mask.start.row : this.start.row,
            column: mask.start.column > this.start.column
                ? mask.start.column
                : this.start.column
        }, {
            row: mask.end.row < this.end.row ? mask.end.row : this.end.row,
            column: mask.end.column < this.end.column ? mask.end.column : this.end.column
        });
    };
    return PointRange;
}());

var Direction;
(function (Direction) {
    Direction["Left"] = "Left";
    Direction["Right"] = "Right";
    Direction["Top"] = "Top";
    Direction["Bottom"] = "Bottom";
})(Direction || (Direction = {}));
/** Selection from a spreadsheet */
var Selection = /** @class */ (function () {
    function Selection() {
    }
    /** Get the number of selected points according to given data */
    Selection.prototype.size = function (data) {
        var range = this.toRange(data);
        return range ? range.size() : 0;
    };
    /** Return whether the given point is within the selection */
    Selection.prototype.has = function (data, point) {
        var range = this.toRange(data);
        return range !== null && range.has(point);
    };
    return Selection;
}());
var EmptySelection = /** @class */ (function (_super) {
    __extends(EmptySelection, _super);
    function EmptySelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptySelection.prototype.toRange = function (data) {
        return null;
    };
    EmptySelection.prototype.normalizeTo = function (data) {
        return this;
    };
    EmptySelection.prototype.modifyEdge = function (active, data, edge) {
        return this;
    };
    EmptySelection.prototype.hasEntireRow = function (row) {
        return false;
    };
    EmptySelection.prototype.hasEntireColumn = function (column) {
        return false;
    };
    return EmptySelection;
}(Selection));
var RangeSelection = /** @class */ (function (_super) {
    __extends(RangeSelection, _super);
    function RangeSelection(range) {
        var _this = _super.call(this) || this;
        _this.range = range;
        return _this;
    }
    RangeSelection.prototype.toRange = function (data) {
        return this.range;
    };
    RangeSelection.prototype.normalizeTo = function (data) {
        var dataRange = getMatrixRange(data);
        var nextSelection = new RangeSelection(this.range.mask(dataRange));
        // @ts-expect-error
        return nextSelection;
    };
    RangeSelection.prototype.modifyEdge = function (active, data, edge) {
        var _a;
        var field = edge === Direction.Left || edge === Direction.Right ? "column" : "row";
        var key = edge === Direction.Left || edge === Direction.Top ? "start" : "end";
        var delta = key === "start" ? -1 : 1;
        var edgeOffsets = this.range.has(__assign(__assign({}, active), (_a = {}, _a[field] = active[field] + delta * -1, _a)));
        var keyToModify = edgeOffsets ? (key === "start" ? "end" : "start") : key;
        var nextRange = new PointRange(this.range.start, this.range.end);
        nextRange[keyToModify][field] += delta;
        var nextSelection = new RangeSelection(nextRange).normalizeTo(data);
        // @ts-expect-error
        return nextSelection;
    };
    RangeSelection.prototype.hasEntireRow = function (row) {
        return false;
    };
    RangeSelection.prototype.hasEntireColumn = function (column) {
        return false;
    };
    return RangeSelection;
}(Selection));
var EntireSelection = /** @class */ (function (_super) {
    __extends(EntireSelection, _super);
    function EntireSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EntireSelection;
}(Selection));
var EntireTableSelection = /** @class */ (function (_super) {
    __extends(EntireTableSelection, _super);
    function EntireTableSelection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntireTableSelection.prototype.toRange = function (data) {
        return getMatrixRange(data);
    };
    EntireTableSelection.prototype.modifyEdge = function (active, data, edge) {
        return this;
    };
    EntireTableSelection.prototype.normalizeTo = function (data) {
        return this;
    };
    EntireTableSelection.prototype.hasEntireColumn = function (column) {
        return true;
    };
    EntireTableSelection.prototype.hasEntireRow = function (row) {
        return true;
    };
    return EntireTableSelection;
}(EntireSelection));
var EntireRowsSelection = /** @class */ (function (_super) {
    __extends(EntireRowsSelection, _super);
    /**
     * @param start - row index where the selection starts, integer
     * @param end - row index where the selection ends, integer
     * @throws {@link InvalidIndexError}
     */
    function EntireRowsSelection(start, end) {
        var _this = this;
        if (!isIndex(start)) {
            throw new InvalidIndexError("start");
        }
        if (!isIndex(end)) {
            throw new InvalidIndexError("end");
        }
        _this = _super.call(this) || this;
        _this.start = Math.min(start, end);
        _this.end = Math.max(start, end);
        return _this;
    }
    EntireRowsSelection.prototype.toRange = function (data) {
        var max = maxPoint(data);
        return new PointRange({ row: this.start, column: 0 }, { row: this.end, column: max.column });
    };
    EntireRowsSelection.prototype.normalizeTo = function (data) {
        var count = getRowsCount(data);
        var nextSelection = new EntireRowsSelection(Math.max(this.start, 0), Math.min(this.end, count - 1));
        // @ts-expect-error
        return nextSelection;
    };
    EntireRowsSelection.prototype.hasEntireRow = function (row) {
        return row >= this.start && row <= this.end;
    };
    EntireRowsSelection.prototype.hasEntireColumn = function (column) {
        return false;
    };
    EntireRowsSelection.prototype.modifyEdge = function (active, data, edge) {
        if (edge === Direction.Left || edge === Direction.Right) {
            return this;
        }
        var delta = edge === Direction.Top ? -1 : 1;
        var property = edge === Direction.Top ? "start" : "end";
        var oppositeProperty = property === "start" ? "end" : "start";
        var nextSelection = new EntireRowsSelection(this.start, this.end);
        if (edge === Direction.Top ? this.end > active.row : this.start < active.row) {
            nextSelection[oppositeProperty] = this[oppositeProperty] + delta;
        }
        else {
            nextSelection[property] = this[property] + delta;
        }
        // @ts-expect-error
        return nextSelection.normalizeTo(data);
    };
    return EntireRowsSelection;
}(EntireSelection));
var EntireColumnsSelection = /** @class */ (function (_super) {
    __extends(EntireColumnsSelection, _super);
    /**
     * Creates entire columns selection
     * @param start - column index where the selection starts, integer
     * @param end - column index where the selection starts, integer
     */
    function EntireColumnsSelection(
    /** Selection start index, integer */
    start, 
    /** Selection end index, integer */
    end) {
        var _this = this;
        if (!isIndex(start)) {
            throw new InvalidIndexError("start");
        }
        if (!isIndex(end)) {
            throw new InvalidIndexError("end");
        }
        _this = _super.call(this) || this;
        _this.start = Math.min(start, end);
        _this.end = Math.max(start, end);
        return _this;
    }
    EntireColumnsSelection.prototype.toRange = function (data) {
        var max = maxPoint(data);
        return new PointRange({ row: 0, column: this.start }, { row: max.row, column: this.end });
    };
    EntireColumnsSelection.prototype.normalizeTo = function (data) {
        var count = getColumnsCount(data);
        var nextSelection = new EntireColumnsSelection(Math.max(this.start, 0), Math.min(this.end, count - 1));
        // @ts-expect-error
        return nextSelection;
    };
    EntireColumnsSelection.prototype.hasEntireRow = function (row) {
        return false;
    };
    EntireColumnsSelection.prototype.hasEntireColumn = function (column) {
        return column >= this.start && column <= this.end;
    };
    EntireColumnsSelection.prototype.modifyEdge = function (active, data, edge) {
        if (edge === Direction.Top || edge === Direction.Bottom) {
            return this;
        }
        var delta = edge === Direction.Left ? -1 : 1;
        var property = edge === Direction.Left ? "start" : "end";
        var oppositeProperty = property === "start" ? "end" : "start";
        var nextSelection = new EntireColumnsSelection(this.start, this.end);
        if (edge === Direction.Left
            ? this.end > active.column
            : this.start < active.column) {
            nextSelection[oppositeProperty] = this[oppositeProperty] + delta;
        }
        else {
            nextSelection[property] = this[property] + delta;
        }
        // @ts-expect-error
        return nextSelection.normalizeTo(data);
    };
    return EntireColumnsSelection;
}(EntireSelection));
/** Get the point range of given matrix */
function getMatrixRange(data) {
    var maxPoint$1 = maxPoint(data);
    return new PointRange(ORIGIN, maxPoint$1);
}
/** Returns whether given value is a valid index */
function isIndex(value) {
    return Number.isInteger(value) && value >= 0;
}
/** Error thrown when passing a non-index value where index is expected */
var InvalidIndexError = /** @class */ (function (_super) {
    __extends(InvalidIndexError, _super);
    function InvalidIndexError(name) {
        return _super.call(this, "".concat(name, " is not a valid index. It must be 0 or a positive integer")) || this;
    }
    return InvalidIndexError;
}(Error));

var PointMap = /** @class */ (function () {
    function PointMap(data) {
        this.data = data;
    }
    /** Creates a new PointMap instance from an array-like object. */
    PointMap.from = function (pairs) {
        var e_1, _a;
        var data = {};
        try {
            for (var pairs_1 = __values(pairs), pairs_1_1 = pairs_1.next(); !pairs_1_1.done; pairs_1_1 = pairs_1.next()) {
                var _b = __read(pairs_1_1.value, 2), point = _b[0], value = _b[1];
                data[point.row] = data[point.row] || {};
                data[point.row][point.column] = value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pairs_1_1 && !pairs_1_1.done && (_a = pairs_1["return"])) _a.call(pairs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new PointMap(data);
    };
    /** Sets the value for point in map */
    PointMap.prototype.set = function (point, value) {
        var _a, _b;
        return new PointMap(__assign(__assign({}, this.data), (_a = {}, _a[point.row] = __assign(__assign({}, this.data[point.row]), (_b = {}, _b[point.column] = value, _b)), _a)));
    };
    /** Un-sets the value for point in map */
    PointMap.prototype.unset = function (point) {
        var _a;
        var row = point.row, column = point.column;
        if (!(row in this.data) || !(column in this.data[row])) {
            return this;
        }
        var _b = this.data, 
        // @ts-ignore
        _c = String(row), 
        // @ts-ignore
        _d = _b[_c], _e = String(column); _d[_e]; var nextRow = __rest(_d, [typeof _e === "symbol" ? _e : _e + ""]), nextMap = __rest(_b, [typeof _c === "symbol" ? _c : _c + ""]);
        if (Object.keys(nextRow).length === 0) {
            return new PointMap(nextMap);
        }
        return new PointMap(__assign(__assign({}, nextMap), (_a = {}, _a[row] = nextRow, _a)));
    };
    /** Gets the value for point in map */
    PointMap.prototype.get = function (point) {
        return this.data[point.row] && this.data[point.row][point.column];
    };
    /** Checks if map has point assigned to value */
    PointMap.prototype.has = function (point) {
        return point.row in this.data && point.column in this.data[point.row];
    };
    /** Returns the number of elements in a PointMap object. */
    PointMap.prototype.size = function () {
        var acc = 0;
        var mapKeys = Object.keys(this.data);
        for (var i = 0; i < mapKeys.length; i++) {
            var row = Number(mapKeys[i]);
            var columns = this.data[row];
            acc += Object.keys(columns).length;
        }
        return acc;
    };
    /** Iterate over pairs of point and value in the map */
    PointMap.prototype.entries = function () {
        var _a, _b, _c, _i, row, _d, _e, _f, _g, column;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = this.data;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _h.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 6];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 5];
                    row = _c;
                    _d = this.data[row];
                    _e = [];
                    for (_f in _d)
                        _e.push(_f);
                    _g = 0;
                    _h.label = 2;
                case 2:
                    if (!(_g < _e.length)) return [3 /*break*/, 5];
                    _f = _e[_g];
                    if (!(_f in _d)) return [3 /*break*/, 4];
                    column = _f;
                    return [4 /*yield*/, [
                            { row: Number(row), column: Number(column) },
                            this.data[row][column],
                        ]];
                case 3:
                    _h.sent();
                    _h.label = 4;
                case 4:
                    _g++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    };
    /** Iterate over the keys of the map */
    PointMap.prototype.keys = function () {
        var _a, _b, _c, _i, row, _d, _e, _f, _g, column;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = this.data;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _h.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 6];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 5];
                    row = _c;
                    _d = this.data[row];
                    _e = [];
                    for (_f in _d)
                        _e.push(_f);
                    _g = 0;
                    _h.label = 2;
                case 2:
                    if (!(_g < _e.length)) return [3 /*break*/, 5];
                    _f = _e[_g];
                    if (!(_f in _d)) return [3 /*break*/, 4];
                    column = _f;
                    return [4 /*yield*/, { row: Number(row), column: Number(column) }];
                case 3:
                    _h.sent();
                    _h.label = 4;
                case 4:
                    _g++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    };
    return PointMap;
}());

/**
 * Immutable Set like interface of points
 */
var PointSet = /** @class */ (function () {
    function PointSet(pointMap) {
        if (pointMap === void 0) { pointMap = PointMap.from([]); }
        this.pointMap = pointMap;
    }
    /** Creates a new PointSet instance from an array-like or iterable object */
    PointSet.from = function (points) {
        return new PointSet(PointMap.from(points.map(function (point) { return [point, true]; })));
    };
    /** Returns a boolean asserting whether an point is present with the given value in the Set object or not */
    PointSet.prototype.has = function (point) {
        return this.pointMap.has(point);
    };
    /** Returns the number of points in a PointSet object */
    PointSet.prototype.size = function () {
        return this.pointMap.size();
    };
    /** Add the given point to given set */
    PointSet.prototype.add = function (point) {
        return new PointSet(this.pointMap.set(point, true));
    };
    /** Remove the given point to given set */
    PointSet.prototype.remove = function (point) {
        return new PointSet(this.pointMap.unset(point));
    };
    PointSet.prototype.difference = function (other) {
        var e_1, _a;
        var newSet = this;
        try {
            for (var other_1 = __values(other), other_1_1 = other_1.next(); !other_1_1.done; other_1_1 = other_1.next()) {
                var point = other_1_1.value;
                newSet = newSet.remove(point);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (other_1_1 && !other_1_1.done && (_a = other_1["return"])) _a.call(other_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return newSet;
    };
    PointSet.prototype[Symbol.iterator] = function () {
        return this.pointMap.keys();
    };
    return PointSet;
}());

var FORMULA_VALUE_PREFIX = "=";
/** Returns whether given value is a formula */
function isFormulaValue(value) {
    return (typeof value === "string" &&
        value.startsWith(FORMULA_VALUE_PREFIX) &&
        value.length > 1);
}
/** Extracts formula from value  */
function extractFormula(value) {
    return value.slice(1);
}
function createBoundFormulaParser(getData) {
    return new FormulaParser({
        onCell: function (ref) {
            var point = {
                row: ref.row - 1,
                column: ref.col - 1
            };
            var cell = get(point, getData());
            if (!isNaN(cell === null || cell === void 0 ? void 0 : cell.value))
                return Number(cell === null || cell === void 0 ? void 0 : cell.value);
            return cell === null || cell === void 0 ? void 0 : cell.value;
        },
        onRange: function (ref) {
            var data = getData();
            var size = getSize(data);
            var start = {
                row: ref.from.row - 1,
                column: ref.from.col - 1
            };
            var end = {
                row: Math.min(ref.to.row - 1, size.rows - 1),
                column: Math.min(ref.to.col - 1, size.columns - 1)
            };
            var dataSlice = slice(start, end, data);
            return toArray(dataSlice, function (cell) {
                if (!isNaN(cell === null || cell === void 0 ? void 0 : cell.value))
                    return Number(cell === null || cell === void 0 ? void 0 : cell.value);
                return cell === null || cell === void 0 ? void 0 : cell.value;
            });
        }
    });
}
var depParser = new DepParser();
/**
 * For given formula returns the cell references
 * @param formula - formula to get references for
 */
function getReferences(formula, point, data) {
    var _a = getSize(data), rows = _a.rows, columns = _a.columns;
    try {
        var dependencies = depParser.parse(formula, convertPointToCellRef(point));
        var references = PointSet.from(dependencies.flatMap(function (reference) {
            var isRange = "from" in reference;
            if (isRange) {
                var from = reference.from, to = reference.to;
                var normalizedFrom = {
                    row: from.row - 1,
                    column: from.col - 1
                };
                var normalizedTo = {
                    row: Math.min(to.row - 1, rows - 1),
                    column: Math.min(to.col - 1, columns - 1)
                };
                var range = new PointRange(normalizedFrom, normalizedTo);
                return Array.from(range);
            }
            return { row: reference.row - 1, column: reference.col - 1 };
        }));
        return references;
    }
    catch (error) {
        console.error(error);
        if (error instanceof FormulaError) {
            return PointSet.from([]);
        }
        else {
            throw error;
        }
    }
}
function evaluate(formula, point, formulaParser) {
    try {
        var position = convertPointToCellRef(point);
        var returned = formulaParser.parse(formula, position);
        return returned instanceof FormulaError ? returned.toString() : returned;
    }
    catch (error) {
        if (error instanceof FormulaError) {
            return error.toString();
        }
        throw error;
    }
}
function convertPointToCellRef(point) {
    return {
        row: point.row + 1,
        col: point.column + 1,
        // TODO: fill once we support multiple sheets
        sheet: "Sheet1"
    };
}

/** A graph of points */
var PointGraph = /** @class */ (function () {
    function PointGraph(forward, backward) {
        this.forward = forward;
        this.backward = backward;
    }
    /** Creates a new PointGraph instance from an array-like object. */
    PointGraph.from = function (pairs) {
        var e_1, _a, e_2, _b;
        var backward = PointMap.from([]);
        try {
            for (var pairs_1 = __values(pairs), pairs_1_1 = pairs_1.next(); !pairs_1_1.done; pairs_1_1 = pairs_1.next()) {
                var _c = __read(pairs_1_1.value, 2), point = _c[0], points = _c[1];
                var set = backward.get(point) || PointSet.from([]);
                try {
                    for (var points_1 = (e_2 = void 0, __values(points)), points_1_1 = points_1.next(); !points_1_1.done; points_1_1 = points_1.next()) {
                        var p = points_1_1.value;
                        backward = backward.set(p, set.add(point));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (points_1_1 && !points_1_1.done && (_b = points_1["return"])) _b.call(points_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (pairs_1_1 && !pairs_1_1.done && (_a = pairs_1["return"])) _a.call(pairs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new PointGraph(PointMap.from(pairs), backward);
    };
    /** Set points for point */
    PointGraph.prototype.set = function (point, points) {
        var e_3, _a, e_4, _b;
        var newForward = points.size() === 0
            ? this.forward.unset(point)
            : this.forward.set(point, points);
        var existing = this.forward.get(point);
        var toAdd = existing ? points.difference(existing) : points;
        var newBackward = this.backward;
        try {
            for (var toAdd_1 = __values(toAdd), toAdd_1_1 = toAdd_1.next(); !toAdd_1_1.done; toAdd_1_1 = toAdd_1.next()) {
                var p = toAdd_1_1.value;
                var set = newBackward.get(p) || PointSet.from([]);
                newBackward = newBackward.set(p, set.add(point));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (toAdd_1_1 && !toAdd_1_1.done && (_a = toAdd_1["return"])) _a.call(toAdd_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (existing) {
            var toRemove = existing.difference(points);
            try {
                for (var toRemove_1 = __values(toRemove), toRemove_1_1 = toRemove_1.next(); !toRemove_1_1.done; toRemove_1_1 = toRemove_1.next()) {
                    var p = toRemove_1_1.value;
                    var set = newBackward.get(p);
                    if (!set) {
                        continue;
                    }
                    var newSet = set.remove(point);
                    if (newSet.size() === 0) {
                        newBackward = newBackward.unset(p);
                    }
                    else {
                        newBackward = newBackward.set(p, newSet);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (toRemove_1_1 && !toRemove_1_1.done && (_b = toRemove_1["return"])) _b.call(toRemove_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        return new PointGraph(newForward, newBackward);
    };
    /** Get points for point backwards */
    PointGraph.prototype.getBackwards = function (point) {
        return this.backward.get(point) || PointSet.from([]);
    };
    /** Recursively get points for point backwards */
    PointGraph.prototype.getBackwardsRecursive = function (point) {
        var stack, current, backwardDependencies, backwardDependencies_1, backwardDependencies_1_1, dependent, e_5_1;
        var e_5, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    stack = [point];
                    _b.label = 1;
                case 1:
                    if (!(stack.length > 0)) return [3 /*break*/, 10];
                    current = stack.pop();
                    if (!current) {
                        return [3 /*break*/, 1];
                    }
                    backwardDependencies = this.backward.get(current);
                    // If there are no dependents, skip to the next point
                    if (!backwardDependencies) {
                        return [3 /*break*/, 1];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 9]);
                    backwardDependencies_1 = (e_5 = void 0, __values(backwardDependencies)), backwardDependencies_1_1 = backwardDependencies_1.next();
                    _b.label = 3;
                case 3:
                    if (!!backwardDependencies_1_1.done) return [3 /*break*/, 6];
                    dependent = backwardDependencies_1_1.value;
                    return [4 /*yield*/, dependent];
                case 4:
                    _b.sent();
                    stack.push(dependent);
                    _b.label = 5;
                case 5:
                    backwardDependencies_1_1 = backwardDependencies_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_5_1 = _b.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (backwardDependencies_1_1 && !backwardDependencies_1_1.done && (_a = backwardDependencies_1["return"])) _a.call(backwardDependencies_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 9: return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    };
    /** Determine whether the graph has a circular dependency, starting from given start point */
    PointGraph.prototype.hasCircularDependency = function (startPoint) {
        var e_6, _a;
        var visited = PointSet.from([]);
        var stack = [startPoint];
        while (stack.length > 0) {
            var current = stack.pop();
            if (!current) {
                continue;
            }
            if (visited.has(current)) {
                return true;
            }
            visited = visited.add(current);
            var dependents = this.forward.get(current);
            if (!dependents) {
                continue;
            }
            try {
                for (var dependents_1 = (e_6 = void 0, __values(dependents)), dependents_1_1 = dependents_1.next(); !dependents_1_1.done; dependents_1_1 = dependents_1.next()) {
                    var dependent = dependents_1_1.value;
                    stack.push(dependent);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (dependents_1_1 && !dependents_1_1.done && (_a = dependents_1["return"])) _a.call(dependents_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        return false;
    };
    /** Get the points in the graph in a breadth-first order */
    PointGraph.prototype.traverseBFS = function () {
        var visited, queue, _a, _b, _c, point, dependencies, point, dependents, dependents_2, dependents_2_1, dependent;
        var e_7, _d, e_8, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    visited = PointSet.from([]);
                    queue = [];
                    try {
                        // Iterate over all the points in the forward map and add the ones with no dependencies to the queue
                        for (_a = __values(this.forward.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                            _c = __read(_b.value, 2), point = _c[0], dependencies = _c[1];
                            if (dependencies.size() === 0 && !visited.has(point)) {
                                queue.push(point);
                                visited = visited.add(point);
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    _f.label = 1;
                case 1:
                    if (!(queue.length > 0)) return [3 /*break*/, 3];
                    point = queue.shift();
                    if (!point) {
                        return [3 /*break*/, 1];
                    }
                    return [4 /*yield*/, point];
                case 2:
                    _f.sent();
                    dependents = this.forward.get(point);
                    // If there are no dependents, skip to the next iteration
                    if (!dependents) {
                        return [3 /*break*/, 1];
                    }
                    try {
                        // Otherwise, add the dependents to the queue if they have not yet been visited
                        for (dependents_2 = (e_8 = void 0, __values(dependents)), dependents_2_1 = dependents_2.next(); !dependents_2_1.done; dependents_2_1 = dependents_2.next()) {
                            dependent = dependents_2_1.value;
                            if (!visited.has(dependent)) {
                                queue.push(dependent);
                                visited = visited.add(dependent);
                            }
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (dependents_2_1 && !dependents_2_1.done && (_e = dependents_2["return"])) _e.call(dependents_2);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
    return PointGraph;
}());

var Model = /** @class */ (function () {
    function Model(data, referenceGraph, evaluatedData) {
        this.data = data;
        this.referenceGraph = referenceGraph || createReferenceGraph(data);
        this.evaluatedData =
            evaluatedData || createEvaluatedData(data, this.referenceGraph);
    }
    return Model;
}());
function updateCellValue(model, point, cell) {
    var nextData = set(point, cell, model.data);
    var nextReferenceGraph = isFormulaValue(cell.value)
        ? updateReferenceGraph(model.referenceGraph, point, cell, nextData)
        : model.referenceGraph;
    var nextEvaluatedData = evaluateCell(model.evaluatedData, nextData, nextReferenceGraph, point, cell);
    return new Model(nextData, nextReferenceGraph, nextEvaluatedData);
}
function updateReferenceGraph(referenceGraph, point, cell, data) {
    var references = getReferences(extractFormula(cell.value), point, data);
    var nextReferenceGraph = referenceGraph.set(point, references);
    return nextReferenceGraph;
}
function evaluateCell(prevEvaluatedData, data, referenceGraph, point, cell) {
    var e_1, _a, e_2, _b;
    if (referenceGraph.hasCircularDependency(point)) {
        var visited = PointSet.from([point]);
        var nextEvaluatedData_1 = set(point, __assign(__assign({}, cell), { value: FormulaError.REF }), prevEvaluatedData);
        try {
            for (var _c = __values(referenceGraph.getBackwardsRecursive(point)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var referrer = _d.value;
                if (visited.has(referrer)) {
                    break;
                }
                visited = visited.add(referrer);
                var referrerCell = get(referrer, data);
                if (!referrerCell) {
                    continue;
                }
                nextEvaluatedData_1 = set(referrer, __assign(__assign({}, referrerCell), { value: FormulaError.REF }), nextEvaluatedData_1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return nextEvaluatedData_1;
    }
    var nextEvaluatedData = prevEvaluatedData;
    var formulaParser = createBoundFormulaParser(function () { return nextEvaluatedData; });
    var evaluatedValue = isFormulaValue(cell.value)
        ? getFormulaComputedValue(cell.value, point, formulaParser)
        : cell.value;
    var evaluatedCell = __assign(__assign({}, cell), { value: evaluatedValue });
    nextEvaluatedData = set(point, evaluatedCell, nextEvaluatedData);
    try {
        // for every formula cell that references the cell re-evaluate (recursive)
        for (var _e = __values(referenceGraph.getBackwardsRecursive(point)), _f = _e.next(); !_f.done; _f = _e.next()) {
            var referrer = _f.value;
            var referrerCell = get(referrer, data);
            if (!referrerCell) {
                continue;
            }
            var evaluatedValue_1 = isFormulaValue(referrerCell.value)
                ? getFormulaComputedValue(referrerCell.value, point, formulaParser)
                : referrerCell.value;
            var evaluatedCell_1 = __assign(__assign({}, referrerCell), { value: evaluatedValue_1 });
            nextEvaluatedData = set(referrer, evaluatedCell_1, nextEvaluatedData);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return nextEvaluatedData;
}
/**
 *
 * @param data - the spreadsheet data
 * @returns the spreadsheet reference graph
 */
function createReferenceGraph(data) {
    var e_3, _a;
    var entries$1 = [];
    try {
        for (var _b = __values(entries(data)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), point = _d[0], cell = _d[1];
            if (cell && isFormulaValue(cell.value)) {
                var references = getReferences(extractFormula(cell.value), point, data);
                entries$1.push([point, references]);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return PointGraph.from(entries$1);
}
function createEvaluatedData(data, referenceGraph) {
    var e_4, _a;
    var evaluatedData = data;
    var formulaParser = createBoundFormulaParser(function () { return evaluatedData; });
    try {
        // Iterate over the points in the reference graph, starting from the leaves
        for (var _b = __values(referenceGraph.traverseBFS()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var point = _c.value;
            // Get the cell at the current point in the data matrix
            var cell = get(point, data);
            if (!cell) {
                continue;
            }
            // If the cell is a formula cell, evaluate it
            if (isFormulaValue(cell.value)) {
                var evaluatedValue = getFormulaComputedValue(cell.value, point, formulaParser);
                evaluatedData = set(point, __assign(__assign({}, cell), { value: evaluatedValue }), evaluatedData);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return evaluatedData;
}
/** Get the computed value of a formula cell */
function getFormulaComputedValue(value, point, formulaParser) {
    var formula = extractFormula(value);
    try {
        return evaluate(formula, point, formulaParser);
    }
    catch (e) {
        return FormulaError.REF;
    }
}

var INITIAL_STATE = {
    active: null,
    mode: "view",
    rowDimensions: {},
    columnDimensions: {},
    lastChanged: null,
    hasPasted: false,
    cut: false,
    dragging: false,
    model: new Model([]),
    selected: new EmptySelection(),
    copied: null,
    lastCommit: null
};
function reducer(state, action) {
    var _a, _b, e_1, _c;
    switch (action.type) {
        case SET_DATA: {
            var data = action.payload.data;
            var nextActive = state.active && has(state.active, data) ? state.active : null;
            var nextSelected = state.selected.normalizeTo(data);
            return __assign(__assign({}, state), { model: new Model(data), active: nextActive, selected: nextSelected });
        }
        case SELECT_ENTIRE_ROW: {
            var _d = action.payload, row = _d.row, extend = _d.extend;
            var active = state.active;
            return __assign(__assign({}, state), { selected: extend && active
                    ? new EntireRowsSelection(active.row, row)
                    : new EntireRowsSelection(row, row), active: extend && active ? active : __assign(__assign({}, ORIGIN), { row: row }), mode: "view" });
        }
        case SELECT_ENTIRE_COLUMN: {
            var _e = action.payload, column = _e.column, extend = _e.extend;
            var active = state.active;
            return __assign(__assign({}, state), { selected: extend && active
                    ? new EntireColumnsSelection(active.column, column)
                    : new EntireColumnsSelection(column, column), active: extend && active ? active : __assign(__assign({}, ORIGIN), { column: column }), mode: "view" });
        }
        case SELECT_ENTIRE_TABLE: {
            return __assign(__assign({}, state), { selected: new EntireTableSelection(), active: ORIGIN, mode: "view" });
        }
        case SELECT: {
            var point = action.payload.point;
            if (state.active && !isActive(state.active, point)) {
                return __assign(__assign({}, state), { selected: new RangeSelection(new PointRange(point, state.active)), mode: "view" });
            }
            return state;
        }
        case ACTIVATE: {
            var point = action.payload.point;
            return __assign(__assign({}, state), { selected: new RangeSelection(new PointRange(point, point)), active: point, mode: isActive(state.active, point) ? "edit" : "view" });
        }
        case SET_CELL_DATA: {
            var _f = action.payload, active = _f.active, cellData = _f.data;
            if (isActiveReadOnly(state)) {
                return state;
            }
            return __assign(__assign({}, state), { model: updateCellValue(state.model, active, cellData), lastChanged: active });
        }
        case SET_CELL_DIMENSIONS: {
            var _g = action.payload, point = _g.point, dimensions = _g.dimensions;
            var prevRowDimensions = state.rowDimensions[point.row];
            var prevColumnDimensions = state.columnDimensions[point.column];
            if (prevRowDimensions &&
                prevColumnDimensions &&
                prevRowDimensions.top === dimensions.top &&
                prevRowDimensions.height === dimensions.height &&
                prevColumnDimensions.left === dimensions.left &&
                prevColumnDimensions.width === dimensions.width) {
                return state;
            }
            return __assign(__assign({}, state), { rowDimensions: __assign(__assign({}, state.rowDimensions), (_a = {}, _a[point.row] = { top: dimensions.top, height: dimensions.height }, _a)), columnDimensions: __assign(__assign({}, state.columnDimensions), (_b = {}, _b[point.column] = { left: dimensions.left, width: dimensions.width }, _b)) });
        }
        case COPY:
        case CUT: {
            var selectedRange = state.selected.toRange(state.model.data);
            return __assign(__assign({}, state), { copied: selectedRange, cut: action.type === CUT, hasPasted: false });
        }
        case PASTE: {
            var text = action.payload.data;
            var active = state.active;
            if (!active) {
                return state;
            }
            var copied = split(text, function (value) { return ({ value: value }); });
            var copiedSize = getSize(copied);
            var requiredSize = {
                rows: active.row + copiedSize.rows,
                columns: active.column + copiedSize.columns
            };
            var paddedData = pad(state.model.data, requiredSize);
            var acc = { data: paddedData, commit: [] };
            try {
                for (var _h = __values(entries(copied)), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var _k = __read(_j.value, 2), point = _k[0], cell = _k[1];
                    var commit_1 = acc.commit || [];
                    var nextPoint = {
                        row: point.row + active.row,
                        column: point.column + active.column
                    };
                    var nextData = state.cut ? unset(point, acc.data) : acc.data;
                    if (state.cut) {
                        commit_1 = __spreadArray(__spreadArray([], __read(commit_1), false), [{ prevCell: cell || null, nextCell: null }], false);
                    }
                    if (!has(nextPoint, paddedData)) {
                        acc = { data: nextData, commit: commit_1 };
                    }
                    var currentCell = get(nextPoint, nextData) || null;
                    commit_1 = __spreadArray(__spreadArray([], __read(commit_1), false), [
                        {
                            prevCell: currentCell,
                            nextCell: cell || null
                        },
                    ], false);
                    acc.data = set(nextPoint, __assign(__assign({ value: undefined }, currentCell), cell), nextData);
                    acc.commit = commit_1;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h["return"])) _c.call(_h);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return __assign(__assign({}, state), { model: new Model(acc.data), selected: new RangeSelection(new PointRange(active, {
                    row: active.row + copiedSize.rows - 1,
                    column: active.column + copiedSize.columns - 1
                })), copied: null, cut: false, hasPasted: true, mode: "view", lastCommit: acc.commit });
        }
        case EDIT: {
            return edit(state);
        }
        case VIEW: {
            return view(state);
        }
        case CLEAR: {
            return clear(state);
        }
        case BLUR: {
            return blur(state);
        }
        case KEY_PRESS: {
            var event_1 = action.payload.event;
            if (isActiveReadOnly(state) || event_1.metaKey) {
                return state;
            }
            if (state.mode === "view" && state.active) {
                return edit(state);
            }
            return state;
        }
        case KEY_DOWN: {
            var event_2 = action.payload.event;
            var handler = getKeyDownHandler(state, event_2);
            if (handler) {
                return __assign(__assign({}, state), handler(state, event_2));
            }
            return state;
        }
        case DRAG_START: {
            return __assign(__assign({}, state), { dragging: true });
        }
        case DRAG_END: {
            return __assign(__assign({}, state), { dragging: false });
        }
        case COMMIT: {
            var changes = action.payload.changes;
            return __assign(__assign({}, state), commit(changes));
        }
    }
}
// const reducer = createReducer(INITIAL_STATE, (builder) => {
//   builder.addMatcher(
//     (action) =>
//       action.type === Actions.copy.type || action.type === Actions.cut.type,
//     (state, action) => {
//     }
//   );
// });
// // Shared reducers
function edit(state) {
    if (isActiveReadOnly(state)) {
        return state;
    }
    return __assign(__assign({}, state), { mode: "edit" });
}
function clear(state) {
    var e_2, _a;
    if (!state.active) {
        return state;
    }
    var canClearCell = function (cell) {
        return cell && !cell.readOnly;
    };
    var clearCell = function (cell) {
        if (!canClearCell(cell)) {
            return cell;
        }
        return Object.assign({}, cell, { value: undefined });
    };
    var selectedRange = state.selected.toRange(state.model.data);
    var changes = [];
    var newData = state.model.data;
    try {
        for (var _b = __values(selectedRange || []), _c = _b.next(); !_c.done; _c = _b.next()) {
            var point = _c.value;
            var cell = get(point, state.model.data);
            var clearedCell = clearCell(cell);
            changes.push({
                prevCell: cell || null,
                nextCell: clearedCell || null
            });
            newData = set(point, clearedCell, newData);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return __assign(__assign(__assign({}, state), { model: new Model(newData) }), commit(changes));
}
function blur(state) {
    return __assign(__assign({}, state), { active: null, selected: new EmptySelection() });
}
function view(state) {
    return __assign(__assign({}, state), { mode: "view" });
}
function commit(changes) {
    return { lastCommit: changes };
}
// Utility
var go = function (rowDelta, columnDelta) {
    return function (state) {
        if (!state.active) {
            return;
        }
        var nextActive = {
            row: state.active.row + rowDelta,
            column: state.active.column + columnDelta
        };
        if (!has(nextActive, state.model.data)) {
            return __assign(__assign({}, state), { mode: "view" });
        }
        return __assign(__assign({}, state), { active: nextActive, selected: new RangeSelection(new PointRange(nextActive, nextActive)), mode: "view" });
    };
};
var keyDownHandlers = {
    ArrowUp: go(-1, 0),
    ArrowDown: go(+1, 0),
    ArrowLeft: go(0, -1),
    ArrowRight: go(0, +1),
    Tab: go(0, +1),
    Enter: edit,
    Backspace: clear,
    Delete: clear,
    Escape: blur
};
var editKeyDownHandlers = {
    Escape: view,
    Tab: keyDownHandlers.Tab,
    Enter: keyDownHandlers.ArrowDown
};
var editShiftKeyDownHandlers = {
    Tab: go(0, -1)
};
var shiftKeyDownHandlers = {
    ArrowUp: function (state) { return (__assign(__assign({}, state), { selected: !state.active
            ? state.selected
            : state.selected.modifyEdge(state.active, state.model.data, Direction.Top) })); },
    ArrowDown: function (state) { return (__assign(__assign({}, state), { selected: !state.active
            ? state.selected
            : state.selected.modifyEdge(state.active, state.model.data, Direction.Bottom) })); },
    ArrowLeft: function (state) { return (__assign(__assign({}, state), { selected: !state.active
            ? state.selected
            : state.selected.modifyEdge(state.active, state.model.data, Direction.Left) })); },
    ArrowRight: function (state) { return (__assign(__assign({}, state), { selected: !state.active
            ? state.selected
            : state.selected.modifyEdge(state.active, state.model.data, Direction.Right) })); },
    Tab: go(0, -1)
};
var shiftMetaKeyDownHandlers = {};
var metaKeyDownHandlers = {};
function getKeyDownHandler(state, event) {
    var key = event.key;
    var handlers;
    // Order matters
    if (state.mode === "edit") {
        if (event.shiftKey) {
            handlers = editShiftKeyDownHandlers;
        }
        else {
            handlers = editKeyDownHandlers;
        }
    }
    else if (event.shiftKey && event.metaKey) {
        handlers = shiftMetaKeyDownHandlers;
    }
    else if (event.shiftKey) {
        handlers = shiftKeyDownHandlers;
    }
    else if (event.metaKey) {
        handlers = metaKeyDownHandlers;
    }
    else {
        handlers = keyDownHandlers;
    }
    return handlers[key];
}
/** Returns whether the reducer has a handler for the given keydown event */
function hasKeyDownHandler(state, event) {
    return getKeyDownHandler(state, event) !== undefined;
}
/** Returns whether the active cell is read only */
function isActiveReadOnly(state) {
    var activeCell = getActive(state);
    return Boolean(activeCell === null || activeCell === void 0 ? void 0 : activeCell.readOnly);
}
/** Gets active cell from given state */
function getActive(state) {
    var activeCell = state.active && get(state.active, state.model.data);
    return activeCell || null;
}

var context = createContext([INITIAL_STATE, function () { }]);

function useDispatch() {
    return useContextSelector(context, function (_a) {
        var _b = __read(_a, 2); _b[0]; var dispatch = _b[1];
        return dispatch;
    });
}

function useSelector(selector) {
    return useContextSelector(context, function (_a) {
        var _b = __read(_a, 1), state = _b[0];
        return selector(state);
    });
}

var CornerIndicator = function (_a) {
    var selected = _a.selected, onSelect = _a.onSelect;
    var handleClick = React.useCallback(function () {
        onSelect();
    }, [onSelect]);
    return (React.createElement("th", { className: classNames("Spreadsheet__header", {
            "Spreadsheet__header--selected": selected
        }), onClick: handleClick, tabIndex: 0 }));
};
var enhance$3 = function (CornerIndicatorComponent) {
    return function CornerIndicatorWrapper(props) {
        var dispatch = useDispatch();
        var selectEntireTable$1 = React.useCallback(function () { return dispatch(selectEntireTable()); }, [dispatch]);
        var selected = useSelector(function (state) { return state.selected instanceof EntireTableSelection; });
        return (React.createElement(CornerIndicatorComponent, __assign({}, props, { selected: selected, onSelect: selectEntireTable$1 })));
    };
};

var ColumnIndicator = function (_a) {
    var column = _a.column, label = _a.label, selected = _a.selected, onSelect = _a.onSelect;
    var handleClick = React.useCallback(function (event) {
        onSelect(column, event.shiftKey);
    }, [onSelect, column]);
    return (React.createElement("th", { className: classNames("Spreadsheet__header", {
            "Spreadsheet__header--selected": selected
        }), onClick: handleClick, tabIndex: 0 }, label !== undefined ? label : columnIndexToLabel(column)));
};
var enhance$2 = function (ColumnIndicatorComponent) {
    return function ColumnIndicatorWrapper(props) {
        var dispatch = useDispatch();
        var selectEntireColumn$1 = React.useCallback(function (column, extend) {
            return dispatch(selectEntireColumn(column, extend));
        }, [dispatch]);
        var selected = useSelector(function (state) {
            return state.selected.hasEntireColumn(props.column);
        });
        return (React.createElement(ColumnIndicatorComponent, __assign({}, props, { selected: selected, onSelect: selectEntireColumn$1 })));
    };
};
function columnIndexToLabel(column) {
    var label = "";
    var index = column;
    while (index >= 0) {
        label = String.fromCharCode(65 + (index % 26)) + label;
        index = Math.floor(index / 26) - 1;
    }
    return label;
}

var RowIndicator = function (_a) {
    var row = _a.row, label = _a.label, selected = _a.selected, onSelect = _a.onSelect;
    var handleClick = React.useCallback(function (event) {
        onSelect(row, event.shiftKey);
    }, [onSelect, row]);
    return (React.createElement("th", { className: classNames("Spreadsheet__header", {
            "Spreadsheet__header--selected": selected
        }), onClick: handleClick, tabIndex: 0 }, label !== undefined ? label : row + 1));
};
var enhance$1 = function (RowIndicatorComponent) {
    return function RowIndicatorWrapper(props) {
        var dispatch = useDispatch();
        var selected = useSelector(function (state) {
            return state.selected.hasEntireRow(props.row);
        });
        var selectEntireRow$1 = React.useCallback(function (row, extend) {
            return dispatch(selectEntireRow(row, extend));
        }, [dispatch]);
        return (React.createElement(RowIndicatorComponent, __assign({}, props, { selected: selected, onSelect: selectEntireRow$1 })));
    };
};

var Cell = function (_a) {
    var row = _a.row, column = _a.column, DataViewer = _a.DataViewer, selected = _a.selected, active = _a.active, dragging = _a.dragging, mode = _a.mode, data = _a.data, evaluatedData = _a.evaluatedData, select = _a.select, activate = _a.activate, setCellDimensions = _a.setCellDimensions, setCellData = _a.setCellData;
    var rootRef = React.useRef(null);
    var point = React.useMemo(function () { return ({
        row: row,
        column: column
    }); }, [row, column]);
    var handleMouseDown = React.useCallback(function (event) {
        if (mode === "view") {
            setCellDimensions(point, getOffsetRect(event.currentTarget));
            if (event.shiftKey) {
                select(point);
            }
            else {
                activate(point);
            }
        }
    }, [mode, setCellDimensions, point, select, activate]);
    var handleMouseOver = React.useCallback(function (event) {
        if (dragging) {
            setCellDimensions(point, getOffsetRect(event.currentTarget));
            select(point);
        }
    }, [setCellDimensions, select, dragging, point]);
    React.useEffect(function () {
        var root = rootRef.current;
        if (selected && root) {
            setCellDimensions(point, getOffsetRect(root));
        }
        if (root && active && mode === "view") {
            root.focus();
        }
    }, [setCellDimensions, selected, active, mode, point, data]);
    if (data && data.DataViewer) {
        // @ts-ignore
        DataViewer = data.DataViewer;
    }
    return (React.createElement("td", { ref: rootRef, className: classNames("Spreadsheet__cell", data === null || data === void 0 ? void 0 : data.className, {
            "Spreadsheet__cell--readonly": data === null || data === void 0 ? void 0 : data.readOnly
        }), onMouseOver: handleMouseOver, onMouseDown: handleMouseDown, tabIndex: 0 },
        React.createElement(DataViewer, { row: row, column: column, cell: data, evaluatedCell: evaluatedData, setCellData: setCellData })));
};
var enhance = function (CellComponent) {
    return function CellWrapper(props) {
        var row = props.row, column = props.column;
        var dispatch = useDispatch();
        var point = React.useMemo(function () { return ({
            row: row,
            column: column
        }); }, [row, column]);
        var setCellData$1 = React.useCallback(function (data) { return dispatch(setCellData(point, data)); }, [dispatch, point]);
        var select$1 = React.useCallback(function (point) { return dispatch(select(point)); }, [dispatch]);
        var activate$1 = React.useCallback(function (point) { return dispatch(activate(point)); }, [dispatch]);
        var setCellDimensions$1 = React.useCallback(function (point, dimensions) {
            return dispatch(setCellDimensions(point, dimensions));
        }, [dispatch]);
        var active = useSelector(function (state) { return isActive(state.active, point); });
        var mode = useSelector(function (state) { return (active ? state.mode : "view"); });
        var data = useSelector(function (state) { return get(point, state.model.data); });
        var evaluatedData = useSelector(function (state) {
            return get(point, state.model.evaluatedData);
        });
        var selected = useSelector(function (state) {
            return state.selected.has(state.model.data, point);
        });
        var dragging = useSelector(function (state) { return state.dragging; });
        var copied = useSelector(function (state) { var _a; return ((_a = state.copied) === null || _a === void 0 ? void 0 : _a.has(point)) || false; });
        return (React.createElement(CellComponent, __assign({}, props, { selected: selected, active: active, copied: copied, dragging: dragging, mode: mode, evaluatedData: evaluatedData, data: data, select: select$1, activate: activate$1, setCellDimensions: setCellDimensions$1, setCellData: setCellData$1 })));
    };
};

var TRUE_TEXT = "TRUE";
var FALSE_TEXT = "FALSE";
/** The default Spreadsheet DataViewer component */
var DataViewer = function (_a) {
    var _b;
    var cell = _a.cell, evaluatedCell = _a.evaluatedCell;
    var value = (_b = evaluatedCell === null || evaluatedCell === void 0 ? void 0 : evaluatedCell.value) !== null && _b !== void 0 ? _b : cell === null || cell === void 0 ? void 0 : cell.value;
    return typeof value === "boolean" ? (React.createElement("span", { className: "Spreadsheet__data-viewer Spreadsheet__data-viewer--boolean" }, convertBooleanToText(value))) : (React.createElement("span", { className: "Spreadsheet__data-viewer" }, value));
};
function convertBooleanToText(value) {
    return value ? TRUE_TEXT : FALSE_TEXT;
}

/** The default Spreadsheet DataEditor component */
var DataEditor = function (_a) {
    var _b;
    var onChange = _a.onChange, cell = _a.cell;
    var inputRef = React.useRef(null);
    var handleChange = React.useCallback(function (event) {
        onChange(__assign(__assign({}, cell), { value: event.target.value }));
    }, [onChange, cell]);
    React.useEffect(function () {
        if (inputRef.current) {
            moveCursorToEnd(inputRef.current);
        }
    }, [inputRef]);
    var value = (_b = cell === null || cell === void 0 ? void 0 : cell.value) !== null && _b !== void 0 ? _b : "";
    return (React.createElement("div", { className: "Spreadsheet__data-editor" },
        React.createElement("input", { ref: inputRef, type: "text", onChange: handleChange, value: value, autoFocus: true })));
};

var ActiveCell = function (props) {
    var rootRef = React.useRef(null);
    var dispatch = useDispatch();
    var setCellData$1 = React.useCallback(function (active, data) {
        return dispatch(setCellData(active, data));
    }, [dispatch]);
    var edit = React.useCallback(function () { return dispatch(edit$1()); }, [dispatch]);
    var commit = React.useCallback(function (changes) {
        return dispatch(commit$1(changes));
    }, [dispatch]);
    var view = React.useCallback(function () {
        dispatch(view$1());
    }, [dispatch]);
    var active = useSelector(function (state) { return state.active; });
    var mode = useSelector(function (state) { return state.mode; });
    var cell = useSelector(function (state) {
        return state.active ? get(state.active, state.model.data) : undefined;
    });
    var dimensions = useSelector(function (state) {
        return active
            ? getCellDimensions(active, state.rowDimensions, state.columnDimensions)
            : undefined;
    });
    var hidden = React.useMemo(function () { return !active || !dimensions; }, [active, dimensions]);
    var initialCellRef = React.useRef(undefined);
    var prevActiveRef = React.useRef(null);
    var prevCellRef = React.useRef(undefined);
    var handleChange = React.useCallback(function (cell) {
        if (!active) {
            return;
        }
        setCellData$1(active, cell);
    }, [setCellData$1, active]);
    React.useEffect(function () {
        var root = rootRef.current;
        if (!hidden && root) {
            root.focus();
        }
    }, [rootRef, hidden]);
    React.useEffect(function () {
        var prevActive = prevActiveRef.current;
        var prevCell = prevCellRef.current;
        prevActiveRef.current = active;
        prevCellRef.current = cell;
        if (!prevActive || !prevCell) {
            return;
        }
        // Commit
        var coordsChanged = (active === null || active === void 0 ? void 0 : active.row) !== prevActive.row || (active === null || active === void 0 ? void 0 : active.column) !== prevActive.column;
        var exitedEditMode = mode !== "edit";
        if (coordsChanged || exitedEditMode) {
            var initialCell = initialCellRef.current;
            if (prevCell !== initialCell) {
                commit([
                    {
                        prevCell: initialCell || null,
                        nextCell: prevCell
                    },
                ]);
            }
            else if (!coordsChanged && cell !== prevCell) {
                commit([
                    {
                        prevCell: prevCell,
                        nextCell: cell || null
                    },
                ]);
            }
            initialCellRef.current = cell;
        }
    });
    var DataEditor = (cell && cell.DataEditor) || props.DataEditor;
    var readOnly = cell && cell.readOnly;
    return hidden ? null : (React.createElement("div", { ref: rootRef, className: classNames("Spreadsheet__active-cell", "Spreadsheet__active-cell--".concat(mode)), style: dimensions, onClick: mode === "view" && !readOnly ? edit : undefined, tabIndex: 0 }, mode === "edit" && active && (React.createElement(DataEditor, { row: active.row, column: active.column, cell: cell, 
        // @ts-ignore
        onChange: handleChange, exitEditMode: view }))));
};

var FloatingRect = function (_a) {
    var _b;
    var dimensions = _a.dimensions, dragging = _a.dragging, hidden = _a.hidden, variant = _a.variant;
    var _c = dimensions || {}, width = _c.width, height = _c.height, top = _c.top, left = _c.left;
    return (React.createElement("div", { className: classNames("Spreadsheet__floating-rect", (_b = {},
            _b["Spreadsheet__floating-rect--".concat(variant)] = variant,
            _b["Spreadsheet__floating-rect--dragging"] = dragging,
            _b["Spreadsheet__floating-rect--hidden"] = hidden,
            _b)), style: { width: width, height: height, top: top, left: left } }));
};

var Selected = function () {
    var selected = useSelector(function (state) { return state.selected; });
    var dimensions = useSelector(function (state) {
        return selected &&
            getSelectedDimensions(state.rowDimensions, state.columnDimensions, state.model.data, state.selected);
    });
    var dragging = useSelector(function (state) { return state.dragging; });
    var hidden = useSelector(function (state) { return state.selected.size(state.model.data) < 2; });
    return (React.createElement(FloatingRect, { variant: "selected", dimensions: dimensions, dragging: dragging, hidden: hidden }));
};

var Copied = function () {
    var range = useSelector(function (state) { return state.copied; });
    var dimensions = useSelector(function (state) {
        return range &&
            getRangeDimensions(state.rowDimensions, state.columnDimensions, range);
    });
    var hidden = range === null;
    return (React.createElement(FloatingRect, { variant: "copied", dimensions: dimensions, hidden: hidden, dragging: false }));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".Spreadsheet {\r\n  --background-color: white;\r\n  --text-color: black;\r\n  --readonly-text-color: rgba(0, 0, 0, 0.4);\r\n  --outline-color: #4285f4;\r\n  --outline-background-color: rgba(160, 195, 255, 0.2);\r\n  --border-color: hsl(2deg, 0%, 91%);\r\n  --header-background-color: rgba(0, 0, 0, 0.04);\r\n  --elevation: 0 2px 5px rgba(0, 0, 0, 0.4);\r\n\r\n  position: relative;\r\n  overflow: visible;\r\n  background: var(--background-color);\r\n  color: var(--text-color);\r\n  display: inline-block;\r\n}\r\n\r\n.Spreadsheet--dark-mode {\r\n  --background-color: black;\r\n  --text-color: white;\r\n  --readonly-text-color: rgba(255, 255, 255, 0.4);\r\n  --header-background-color: rgba(255, 255, 255, 0.04);\r\n  --border-color: hsl(2deg, 0%, 19%);\r\n}\r\n\r\n.Spreadsheet__active-cell {\r\n  position: absolute;\r\n  border: 2px solid var(--outline-color);\r\n  box-sizing: border-box;\r\n}\r\n\r\n.Spreadsheet__active-cell--edit {\r\n  background: var(--background-color);\r\n  box-shadow: var(--elevation);\r\n}\r\n\r\n.Spreadsheet__table {\r\n  border-collapse: collapse;\r\n  table-layout: fixed;\r\n}\r\n\r\n.Spreadsheet__cell,\r\n.Spreadsheet__active-cell {\r\n  cursor: cell;\r\n}\r\n\r\n.Spreadsheet__cell {\r\n  outline: none;\r\n}\r\n\r\n.Spreadsheet__cell--readonly {\r\n  color: var(--readonly-text-color);\r\n}\r\n\r\n.Spreadsheet__cell,\r\n.Spreadsheet__header {\r\n  min-width: 6em;\r\n  min-height: 1.9em;\r\n  height: 1.9em;\r\n  max-height: 1.9em;\r\n  border: 1px solid var(--border-color);\r\n  overflow: hidden;\r\n  word-break: keep-all;\r\n  white-space: nowrap;\r\n  text-align: left;\r\n  box-sizing: border-box;\r\n  user-select: none;\r\n}\r\n\r\n.Spreadsheet__header {\r\n  background: var(--header-background-color);\r\n  color: var(--readonly-text-color);\r\n  text-align: center;\r\n  font: inherit;\r\n}\r\n\r\n.Spreadsheet__header--selected {\r\n  background: #5f6268;\r\n  color: #fff;\r\n}\r\n\r\n.Spreadsheet__header,\r\n.Spreadsheet__data-viewer,\r\n.Spreadsheet__data-editor input {\r\n  padding: 4px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.Spreadsheet__data-editor,\r\n.Spreadsheet__data-editor input {\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.Spreadsheet__data-editor input {\r\n  font: inherit;\r\n  color: inherit;\r\n  background: none;\r\n  border: none;\r\n  outline: none;\r\n  margin: 0;\r\n}\r\n\r\n.Spreadsheet__data-viewer--boolean {\r\n  text-align: center;\r\n}\r\n\r\n.Spreadsheet__floating-rect {\r\n  position: absolute;\r\n  pointer-events: none;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.Spreadsheet__floating-rect--hidden {\r\n  display: none;\r\n}\r\n\r\n.Spreadsheet__floating-rect--selected {\r\n  background: var(--outline-background-color);\r\n  border: 2px var(--outline-color) solid;\r\n}\r\n\r\n.Spreadsheet__floating-rect--dragging {\r\n  border: none;\r\n}\r\n\r\n.Spreadsheet__floating-rect--copied {\r\n  border: 2px var(--outline-color) dashed;\r\n}\r\n";
styleInject(css_248z);

/**
 * The Spreadsheet component
 */
var Spreadsheet = function (props) {
    var className = props.className, darkMode = props.darkMode, columnLabels = props.columnLabels, rowLabels = props.rowLabels, hideColumnIndicators = props.hideColumnIndicators, hideRowIndicators = props.hideRowIndicators, onKeyDown = props.onKeyDown, _a = props.Table, Table$1 = _a === void 0 ? Table : _a, _b = props.Row, Row$1 = _b === void 0 ? Row : _b, _c = props.HeaderRow, HeaderRow$1 = _c === void 0 ? HeaderRow : _c, _d = props.DataEditor, DataEditor$1 = _d === void 0 ? DataEditor : _d, _e = props.DataViewer, DataViewer$1 = _e === void 0 ? DataViewer : _e, _f = props.onChange, onChange = _f === void 0 ? function () { } : _f, _g = props.onModeChange, onModeChange = _g === void 0 ? function () { } : _g, _h = props.onSelect, onSelect = _h === void 0 ? function () { } : _h, _j = props.onActivate, onActivate = _j === void 0 ? function () { } : _j, _k = props.onBlur, onBlur = _k === void 0 ? function () { } : _k, _l = props.onCellCommit, onCellCommit = _l === void 0 ? function () { } : _l, _m = props.dirtyFlag, dirtyFlag = _m === void 0 ? 0 : _m;
    var initialState = React.useMemo(function () {
        var model = new Model(props.data);
        return __assign(__assign({}, INITIAL_STATE), { model: model });
    }, [props.data]);
    var reducerElements = React.useReducer(reducer, initialState);
    var _o = __read(reducerElements, 2), state = _o[0], dispatch = _o[1];
    // dispatch all
    useEffect(function () {
        for (var i = 0; i < props.data.length; i++) {
            for (var j = 0; j < props.data[0].length; j++) {
                // @ts-ignore
                props.data[i][j] && dispatch(setCellData({ row: i, column: j }, 
                // @ts-ignore
                { value: props.data[i][j].value }));
            }
        }
    }, [dirtyFlag]);
    var size = React.useMemo(function () {
        return calculateSpreadsheetSize(state.model.data, rowLabels, columnLabels);
    }, [state.model.data, rowLabels, columnLabels]);
    var mode = state.mode;
    var rootRef = React.useRef(null);
    var prevStateRef = React.useRef(initialState);
    var copy$1 = React.useCallback(function () { return dispatch(copy()); }, [dispatch]);
    var cut$1 = React.useCallback(function () { return dispatch(cut()); }, [dispatch]);
    var paste$1 = React.useCallback(function (data) { return dispatch(paste(data)); }, [dispatch]);
    var onKeyDownAction = React.useCallback(function (event) { return dispatch(keyDown(event)); }, [dispatch]);
    var onKeyPress = React.useCallback(function (event) { return dispatch(keyPress(event)); }, [dispatch]);
    var onDragStart = React.useCallback(function () { return dispatch(dragStart()); }, [dispatch]);
    var onDragEnd = React.useCallback(function () { return dispatch(dragEnd()); }, [dispatch]);
    var setData$1 = React.useCallback(function (data) { return dispatch(setData(data)); }, [dispatch]);
    var blur = React.useCallback(function () { return dispatch(blur$1()); }, [dispatch]);
    React.useEffect(function () {
        var e_1, _a;
        var prevState = prevStateRef.current;
        if (state.lastCommit && state.lastCommit !== prevState.lastCommit) {
            try {
                for (var _b = __values(state.lastCommit), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var change = _c.value;
                    onCellCommit(change.prevCell, change.nextCell, state.lastChanged);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (state.model.data !== prevState.model.data) {
            // Call on change only if the data change internal
            if (state.model.data !== props.data) {
                onChange(state.model.data);
            }
        }
        if (state.selected !== prevState.selected) {
            var selectedRange = state.selected.toRange(state.model.data);
            var selectedPoints = Array.from(selectedRange || []);
            onSelect(selectedPoints);
        }
        if (state.mode !== prevState.mode) {
            onModeChange(state.mode);
        }
        if (state.active !== prevState.active) {
            if (state.active) {
                onActivate(state.active);
            }
            else {
                var root = rootRef.current;
                if (root && isFocusedWithin(root) && document.activeElement) {
                    document.activeElement.blur();
                }
                onBlur();
            }
        }
        prevStateRef.current = state;
    }, [
        props.data,
        state,
        onActivate,
        onBlur,
        onCellCommit,
        onChange,
        onModeChange,
        onSelect,
        rowLabels,
        columnLabels,
    ]);
    React.useEffect(function () {
        var prevState = prevStateRef.current;
        if (props.data !== prevState.model.data) {
            setData$1(props.data);
        }
    }, [props.data, setData$1]);
    var writeDataToClipboard = React.useCallback(function (event) {
        var model = state.model, selected = state.selected;
        var data = model.data;
        var range = selected.toRange(data);
        if (range) {
            var selectedData = slice(range.start, range.end, data);
            var csv = getCSV(selectedData);
            writeTextToClipboard(event, csv);
        }
    }, [state]);
    var handleCut = React.useCallback(function (event) {
        if (shouldHandleClipboardEvent(rootRef.current, mode)) {
            event.preventDefault();
            event.stopPropagation();
            writeDataToClipboard(event);
            cut$1();
        }
    }, [mode, writeDataToClipboard, cut$1]);
    var handleCopy = React.useCallback(function (event) {
        if (shouldHandleClipboardEvent(rootRef.current, mode)) {
            event.preventDefault();
            event.stopPropagation();
            writeDataToClipboard(event);
            copy$1();
        }
    }, [mode, writeDataToClipboard, copy$1]);
    var handlePaste = React.useCallback(function (event) {
        if (shouldHandleClipboardEvent(rootRef.current, mode)) {
            event.preventDefault();
            event.stopPropagation();
            if (event.clipboardData) {
                var text = readTextFromClipboard(event);
                paste$1(text);
            }
        }
    }, [mode, paste$1]);
    var handleKeyDown = React.useCallback(function (event) {
        event.persist();
        if (onKeyDown) {
            onKeyDown(event);
        }
        // Do not use event in case preventDefault() was called inside onKeyDown
        if (!event.defaultPrevented) {
            // Only disable default behavior if an handler exist
            if (hasKeyDownHandler(state, event)) {
                event.nativeEvent.preventDefault();
            }
            onKeyDownAction(event);
        }
    }, [state, onKeyDown, onKeyDownAction]);
    var handleMouseUp = React.useCallback(function () {
        onDragEnd();
        document.removeEventListener("mouseup", handleMouseUp);
    }, [onDragEnd]);
    var handleMouseMove = React.useCallback(function (event) {
        if (!state.dragging && event.buttons === 1) {
            onDragStart();
            document.addEventListener("mouseup", handleMouseUp);
        }
    }, [state, onDragStart, handleMouseUp]);
    var handleBlur = React.useCallback(function (event) {
        /**
         * Focus left self, Not triggered when swapping focus between children
         * @see https://reactjs.org/docs/events.html#detecting-focus-entering-and-leaving
         */
        if (!event.currentTarget.contains(event.relatedTarget)) {
            blur();
        }
    }, [blur]);
    var Cell$1 = React.useMemo(function () {
        // @ts-ignore
        return enhance(props.Cell || Cell);
    }, [props.Cell]);
    var CornerIndicator$1 = React.useMemo(function () {
        return enhance$3(props.CornerIndicator || CornerIndicator);
    }, [props.CornerIndicator]);
    var RowIndicator$1 = React.useMemo(function () { return enhance$1(props.RowIndicator || RowIndicator); }, [props.RowIndicator]);
    var ColumnIndicator$1 = React.useMemo(function () {
        return enhance$2(props.ColumnIndicator || ColumnIndicator);
    }, [props.ColumnIndicator]);
    React.useEffect(function () {
        document.addEventListener("cut", handleCut);
        document.addEventListener("copy", handleCopy);
        document.addEventListener("paste", handlePaste);
        return function () {
            document.removeEventListener("cut", handleCut);
            document.removeEventListener("copy", handleCopy);
            document.removeEventListener("paste", handlePaste);
        };
    }, [handleCut, handleCopy, handlePaste]);
    var tableNode = React.useMemo(function () { return (React.createElement(Table$1, { columns: size.columns, hideColumnIndicators: hideColumnIndicators },
        React.createElement(HeaderRow$1, null,
            !hideRowIndicators && !hideColumnIndicators && React.createElement(CornerIndicator$1, null),
            !hideColumnIndicators &&
                range(size.columns).map(function (columnNumber) {
                    return columnLabels ? (React.createElement(ColumnIndicator$1, { key: columnNumber, column: columnNumber, label: columnNumber in columnLabels
                            ? columnLabels[columnNumber]
                            : null })) : (React.createElement(ColumnIndicator$1, { key: columnNumber, column: columnNumber }));
                })),
        range(size.rows).map(function (rowNumber) { return (React.createElement(Row$1, { key: rowNumber, row: rowNumber },
            !hideRowIndicators &&
                (rowLabels ? (React.createElement(RowIndicator$1, { key: rowNumber, row: rowNumber, label: rowNumber in rowLabels ? rowLabels[rowNumber] : null })) : (React.createElement(RowIndicator$1, { key: rowNumber, row: rowNumber }))),
            range(size.columns).map(function (columnNumber) { return (React.createElement(Cell$1, { key: columnNumber, row: rowNumber, column: columnNumber, 
                // @ts-ignore
                DataViewer: DataViewer$1 })); }))); }))); }, [
        Table$1,
        size.rows,
        size.columns,
        hideColumnIndicators,
        Row$1,
        HeaderRow$1,
        hideRowIndicators,
        CornerIndicator$1,
        columnLabels,
        ColumnIndicator$1,
        rowLabels,
        RowIndicator$1,
        Cell$1,
        DataViewer$1,
    ]);
    var activeCellNode = React.useMemo(function () { return (React.createElement(ActiveCell
    // @ts-ignore
    , { 
        // @ts-ignore
        DataEditor: DataEditor$1 })); }, [DataEditor$1]);
    var rootNode = React.useMemo(function () { return (React.createElement("div", { ref: rootRef, className: classNames("Spreadsheet", className, {
            "Spreadsheet--dark-mode": darkMode
        }), onKeyPress: onKeyPress, onKeyDown: handleKeyDown, onMouseMove: handleMouseMove, onBlur: handleBlur },
        tableNode,
        activeCellNode,
        React.createElement(Selected, null),
        React.createElement(Copied, null))); }, [
        className,
        darkMode,
        onKeyPress,
        handleKeyDown,
        handleMouseMove,
        handleBlur,
        tableNode,
        activeCellNode,
    ]);
    return (React.createElement(context.Provider, { value: reducerElements }, rootNode));
};

export { DataEditor, DataViewer, Spreadsheet, createEmpty as createEmptyMatrix, Spreadsheet as default };
//# sourceMappingURL=index.js.map

// test rightLogShift
var assert = require('assert'),
    //approx = require('../../../tools/approx'),
    error = require('../../../lib/error/index'),
    math = require('../../../index'),
    //bignumber = math.bignumber,
    rightLogShift = math.rightLogShift;

describe('rightLogShift', function () {

  it('should right logically shift a number by a given amount', function () {
    assert.equal(rightLogShift(0, 1000), 0);
    assert.equal(rightLogShift(2, 0), 2);
    assert.equal(rightLogShift(12, 3), 1);
    assert.equal(rightLogShift(32, 4), 2);
    assert.equal(rightLogShift(-1, 1000), 16777215);
    assert.equal(rightLogShift(-12, 2), 1073741821);
    assert.equal(rightLogShift(122, 3), 15);
    assert.equal(rightLogShift(-13, 2), 1073741820);
    assert.equal(rightLogShift(-13, 3), 536870910);
  });

  it('should right logically shift booleans by a boolean amount', function () {
    assert.equal(rightLogShift(true, true), 0);
    assert.equal(rightLogShift(true, false), 1);
    assert.equal(rightLogShift(false, true), 0);
    assert.equal(rightLogShift(false, false), 0);
  });

  it('should right logically shift with a mix of numbers and booleans', function () {
    assert.equal(rightLogShift(2, true), 1);
    assert.equal(rightLogShift(2, false), 2);
    assert.equal(rightLogShift(true, 0), 1);
    assert.equal(rightLogShift(true, 1), 0);
    assert.equal(rightLogShift(false, 2), 0);
  });

  it('should right logically shift numbers and null', function () {
    assert.equal(rightLogShift(1, null), 1);
    assert.equal(rightLogShift(null, 1), 0);
  });

  it('should right logically shift by values given by strings', function () {
    assert.equal(rightLogShift('0', '1000'), 0);
    assert.equal(rightLogShift('2', 0), 2);
    assert.equal(rightLogShift(22, '3'), 2);
    assert.equal(rightLogShift('-256', 2), 1073741760);
  });

  it('should throw an error if string value is invalid', function () {
    assert.throws(function () {
      rightLogShift('This is not a number!', '12');
    }, /Parameter x contains a NaN value/);
    assert.throws(function () {
      rightLogShift('This is still not a number!', 12);
    }, /Parameter x contains a NaN value/);
    assert.throws(function () {
      rightLogShift(1, 'kung');
    }, /Parameter y contains a NaN value/);
    assert.throws(function () {
      rightLogShift('1', 'foo');
    }, /Parameter y contains a NaN value/);
  });

  it('should element-wise right logically shift a matrix', function () {
    var a = math.matrix([4,8]);
    var b = rightLogShift(a, 2); 
    assert.ok(b instanceof math.type.Matrix);
    assert.deepEqual(b, math.matrix([1,2]));

    a = math.matrix([[4,8],[12,16]]);
    b = rightLogShift(a, 2); 
    assert.ok(b instanceof math.type.Matrix);
    assert.deepEqual(b, math.matrix([[1,2],[3,4]]));
  });

  it('should element-wise right logically shift an array', function () {
    var a = [[4,8],[12,16]];
    assert.deepEqual(rightLogShift(a[0], 0), a[0]);
    assert.deepEqual(rightLogShift(a[0], 2), [1,2]);
    assert.deepEqual(rightLogShift(a, 0), a);
    assert.deepEqual(rightLogShift(a, 2), [[1,2],[3,4]]);
  });

  it('should throw an error if used with wrong number of arguments', function () {
    assert.throws(function () {rightLogShift(1)}, error.ArgumentsError);
    assert.throws(function () {rightLogShift(1, 2, 3)}, error.ArgumentsError);
  });

});

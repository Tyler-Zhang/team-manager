import 'mocha';
import { expect } from 'chai';
import isStringTruthy from './isStringTruthy';

describe('isStringTruthy', () => {
  it('returns true for the string "1"', () => {
    expect(isStringTruthy('1')).to.equal(true);
  })

  it('returns true for the string "true"', () => {
    expect(isStringTruthy('true')).to.equal(true);
  })

  it('returns true for the string "TRUE"', () => {
    expect(isStringTruthy('TRUE')).to.equal(true);
  })

  it('returns false for the string "false"', () => {
    expect(isStringTruthy('false')).to.equal(false);
  })

  it('returns false for the string "0"', () => {
    expect(isStringTruthy('0')).to.equal(false);
  })
})

import { assert } from 'chai';

import typeChecker from '../core/helpers/typeChecker.js';

describe('typeChecker', () => {
  it('should not throw an error for a valid array argument', () => {
    assert.doesNotThrow(() => {
      typeChecker([], 'files', 'array');
    });
  });

  it('should throw an error for an invalid array argument', () => {
    assert.throws(() => {
      typeChecker('', 'files', 'array');
    }, "The 'files' argument must be an 'array'");
  });

  it('should not throw an error for a valid string argument', () => {
    assert.doesNotThrow(() => {
      typeChecker('.js', 'extension', 'string');
    });
  });

  it('should throw an error for an invalid string argument', () => {
    assert.throws(() => {
      typeChecker({}, 'extension', 'string');
    }, "The 'extension' argument must be an 'string'");
  });

  it('should not throw an error for a valid number argument', () => {
    assert.doesNotThrow(() => {
      typeChecker(10, 'value', 'number');
    });
  });

  it('should throw an error for an invalid number argument', () => {
    assert.throws(() => {
      typeChecker('', 'value', 'number');
    }, "The 'value' argument must be an 'number'");
  });

  it('should not throw an error for a valid boolean argument', () => {
    assert.doesNotThrow(() => {
      typeChecker(true, 'isInit', 'boolean');
    });
  });

  it('should throw an error for an invalid boolean argument', () => {
    assert.throws(() => {
      typeChecker('', 'isInit', 'boolean');
    }, "The 'isInit' argument must be an 'boolean'");
  });

  it('should not throw an error for a valid undefined argument', () => {
    assert.doesNotThrow(() => {
      typeChecker(undefined, 'hasProperty', 'undefined');
    });
  });

  it('should throw an error for an invalid undefined argument', () => {
    assert.throws(() => {
      typeChecker('', 'hasProperty', 'undefined');
    }, "The 'hasProperty' argument must be an 'undefined'");
  });

  it('should not throw an error for a valid symbol argument', () => {
    assert.doesNotThrow(() => {
      typeChecker(Symbol(), 'method', 'symbol');
    });
  });

  it('should throw an error for an invalid symbol argument', () => {
    assert.throws(() => {
      typeChecker('', 'method', 'symbol');
    }, "The 'method' argument must be an 'symbol'");
  });

  it('should not throw an error for a valid null argument', () => {
    assert.doesNotThrow(() => {
      typeChecker(null, 'options', 'object');
    });
  });

  it('should throw an error for an invalid null argument', () => {
    assert.throws(() => {
      typeChecker('', 'options', 'object');
    }, "The 'options' argument must be an 'object'");
  });

  it('should not throw an error for a valid object argument', () => {
    assert.doesNotThrow(() => {
      typeChecker({}, 'options', 'object');
    });
  });

  it('should throw an error for an invalid object argument', () => {
    assert.throws(() => {
      typeChecker('', 'options', 'object');
    }, "The 'options' argument must be an 'object'");
  });

  it('should not throw an error for a valid bigint argument', () => {
    assert.doesNotThrow(() => {
      typeChecker(1234567890123456789012345678901234567890n, 'hash', 'bigint');
    });
  });

  it('should throw an error for an invalid bigint argument', () => {
    assert.throws(() => {
      typeChecker('', 'hash', 'bigint');
    }, "The 'hash' argument must be an 'bigint'");
  });
});

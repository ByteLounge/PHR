const fs = require('fs');

function patchFn(orig) {
  return function(...args) {
    try {
      return orig.apply(this, args);
    } catch (err) {
      if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
        err.code = 'EINVAL';
      }
      throw err;
    }
  };
}

function patchAsyncFn(orig) {
  return function(...args) {
    const cb = args[args.length - 1];
    if (typeof cb === 'function') {
      args[args.length - 1] = function(err, ...res) {
        if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
          err.code = 'EINVAL';
        }
        return cb.call(this, err, ...res);
      };
      return orig.apply(this, args);
    }
    return orig.apply(this, args);
  };
}

if (fs.readlinkSync) fs.readlinkSync = patchFn(fs.readlinkSync);
if (fs.readlink) fs.readlink = patchAsyncFn(fs.readlink);
if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function(...args) {
    try {
      return await origPromisesReadlink.apply(this, args);
    } catch (err) {
      if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
        err.code = 'EINVAL';
      }
      throw err;
    }
  };
}

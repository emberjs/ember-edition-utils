/**
  Sets the Edition that the application should be considered
  a part of.

  @public
  @param {string} editionName the Edition name that your application is authored in
*/
function setEdition(editionName) {
  process.env.EMBER_EDITION = editionName;
}

/**
  Resets the local state _as if_ no edition were specified. In general, this
  will be used by various addons' own local blueprint tests when testing
  generators.

  @public
*/
function clearEdition() {
  delete process.env.EMBER_EDITION;
}

/**
  Determines what edition is in use.

  @private
  @returns {boolean}
*/
function _getEdition() {
  return process.env.EMBER_EDITION;
}

/**
  Determine if the application that is running is running under a given Ember
  Edition.  When the edition in use is _newer_ than the requested edition it
  will return `true`, and if the edition in use by the application is _older_
  than the requested edition it will return `false`.



  @param {string} requestedEditionName the Edition name that the application/addon is requesting
*/
function has(requestedEditionName) {
  let edition = _getEdition();

  if (requestedEditionName === 'classic') {
    // everything is classic :)
    return true;
  }

  if (edition === requestedEditionName) {
    return true;
  }

  return false;
}

module.exports = {
  default: setEdition,
  has,
  setEdition,
  clearEdition,
};

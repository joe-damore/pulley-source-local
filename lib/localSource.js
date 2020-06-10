const pulley = require('pulley-core');

const { Source } = pulley;
const vinylFs = pulley.reexports.vinylFs;
const rules = pulley.rules;

/**
 * Pulley source that retrieves files from the file system.
 */
class LocalSource extends Source {

  /**
   * Rules that source options must be satisified for source to validate.
   *
   * @returns {Array} Array of rules that must be satisfied.
   */
  getOptionRules() {
    return [
      [rules.objects.objectExists, this.options, 'options'],
      [rules.keys.hasKeys, this.options, ['src']],
      [rules.keys.hasOnlyKeys, this.options, ['src']],
    ];
  }

  /**
   * Returns a Vinyl stream from the given source directory.
   *
   * @returns {Promise} Promise that resolves to Vinyl stream.
   */
  async fetch() {
    return vinylFs.src(this.options.src);
  }
};

module.exports = LocalSource;

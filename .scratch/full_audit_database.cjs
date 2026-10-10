const { AUDIT_REFS } = require('./audit_database_part1.cjs');
const { AUDIT_REFS_PART2 } = require('./audit_database_part2.cjs');
const { AUDIT_REFS_PART3 } = require('./audit_database_part3.cjs');
const { AUDIT_REFS_PART4 } = require('./audit_database_part4.cjs');

const FULL_AUDIT_DATA = Object.assign({}, AUDIT_REFS, AUDIT_REFS_PART2, AUDIT_REFS_PART3, AUDIT_REFS_PART4);

module.exports = { FULL_AUDIT_DATA };

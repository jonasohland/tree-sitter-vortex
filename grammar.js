/**
 * @file Vortex grammar for tree-sitter
 * @author Jonas Ohland <jonas.ohland@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "vortex",

  rules: {
    source_file: $ => repeat(
      choice(
        $.statement, 
        $.comment
      )
    ),

    statement: $ => seq(
      optional($.keyword),
      repeat1(
        choice(
          $.number,
          $.block,
          $.string, 
          $.identifier, 
        )
      ),
      choice(
        $.comment,
        $._newline,
        ';'
      )
    ),

    block: $ => seq(
      $.block_start, 
      repeat(
        choice(
          $.statement,
          $.comment,
        )
      ),
      $.block_end,
    ),

    number: $ => /[+-]?([0-9]*[.])?[0-9]+/,

    identifier: $ => /[^\s"'#;}][^\s;]*/,

    comment: $ => seq('#', /[^\n]*/, $._newline),
    
    keyword: $ => choice('no', 'add', 'delete', 'disable', 'enable'),

    string: $ => choice(
      seq('"', optional(repeat1(choice(/[^"]+/, '\\"'))), '"'), 
      seq("'", optional(repeat1(choice(/[^']+/, "\\'"))), "'"),
    ),

    block_start: $ => '{',
    block_end: $ => '}',

    _newline: $ => /(\r?\n)+/,
  }
});

import XCTest
import SwiftTreeSitter
import TreeSitterVortex

final class TreeSitterVortexTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_vortex())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Vortex grammar")
    }
}

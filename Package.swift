// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterVortex",
    products: [
        .library(name: "TreeSitterVortex", targets: ["TreeSitterVortex"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterVortex",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterVortexTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterVortex",
            ],
            path: "bindings/swift/TreeSitterVortexTests"
        )
    ],
    cLanguageStandard: .c11
)

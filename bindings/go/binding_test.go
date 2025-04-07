package tree_sitter_vortex_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_vortex "github.com/jonasohland/vortex/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_vortex.Language())
	if language == nil {
		t.Errorf("Error loading Vortex grammar")
	}
}

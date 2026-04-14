const vscode = require("vscode");

const HOOK_PATTERN = /\buse[A-Z][A-Za-z0-9_]*\b/g;
const SUPPORTED_LANGUAGES = new Set([
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
]);

let decorationType;

function createDecorationType() {
  const config = vscode.workspace.getConfiguration("hookHighlighter");

  return vscode.window.createTextEditorDecorationType({
    color: config.get("color", "#8E75A7"),
    fontWeight: config.get("fontWeight", "700")
  });
}

function isSupportedEditor(editor) {
  return Boolean(editor) && SUPPORTED_LANGUAGES.has(editor.document.languageId);
}

function buildDecorations(document) {
  const text = document.getText();
  const ranges = [];

  for (const match of text.matchAll(HOOK_PATTERN)) {
    const start = document.positionAt(match.index ?? 0);
    const end = document.positionAt((match.index ?? 0) + match[0].length);
    ranges.push({ range: new vscode.Range(start, end) });
  }

  return ranges;
}

function updateEditor(editor) {
  if (!decorationType || !editor) {
    return;
  }

  if (!isSupportedEditor(editor)) {
    editor.setDecorations(decorationType, []);
    return;
  }

  editor.setDecorations(decorationType, buildDecorations(editor.document));
}

function updateVisibleEditors() {
  for (const editor of vscode.window.visibleTextEditors) {
    updateEditor(editor);
  }
}

function activate(context) {
  decorationType = createDecorationType();
  updateVisibleEditors();

  context.subscriptions.push(
    decorationType,
    vscode.window.onDidChangeActiveTextEditor((editor) => updateEditor(editor)),
    vscode.window.onDidChangeVisibleTextEditors(() => updateVisibleEditors()),
    vscode.workspace.onDidChangeTextDocument((event) => {
      for (const editor of vscode.window.visibleTextEditors) {
        if (editor.document.uri.toString() === event.document.uri.toString()) {
          updateEditor(editor);
        }
      }
    }),
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (!event.affectsConfiguration("hookHighlighter")) {
        return;
      }

      decorationType?.dispose();
      decorationType = createDecorationType();
      context.subscriptions.push(decorationType);
      updateVisibleEditors();
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};

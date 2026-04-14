# Hook Highlighter

Lokalne rozszerzenie VS Code, które pogrubia i koloruje identyfikatory hooków Reacta po nazwie, np. `useEffect`, `useState`, `useMemo` oraz własne `useSomething`.

## Co robi

- wykrywa tokeny pasujące do `use[A-Z]...`
- działa w `js`, `jsx`, `ts`, `tsx`
- kolor domyślny: `#8E75A7`
- font weight domyślny: `700`

## Jak uruchomić lokalnie

1. Otwórz katalog `tools/vscode-hook-highlighter` jako osobny projekt w VS Code.
2. Wciśnij `F5`.
3. W nowym oknie `Extension Development Host` otwórz właściwy projekt.
4. Hooki będą stylowane automatycznie.

## Konfiguracja

W `settings.json` Extension Development Host możesz ustawić:

```json
{
  "hookHighlighter.color": "#8E75A7",
  "hookHighlighter.fontWeight": "700"
}
```

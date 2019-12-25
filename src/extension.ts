// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

function handleRules(opened: vscode.Uri, rules?: string[][], root?: string) {
	if (!rules) {
		return false;
	}
	for (const rule of rules) {
		if (rule.length !== 2) {
			continue;
		}

		function getPath(str: string) {
			if (path.isAbsolute(str)) {
				return str;
			}
			if (root) {
				return path.join(root, str);
			}
			return str;
		}
		const prefix0 = path.resolve(getPath(rule[0]));
		const prefix1 = path.resolve(getPath(rule[1]));
		// vscode.window.showInformationMessage(`${prefix0}`);
		// vscode.window.showInformationMessage(`${opened.path}`);

		if (opened.path.startsWith(prefix0)) {
			const path1 = opened.path.replace(prefix0, prefix1);
			const uri1 = opened.with({ path: path1 });
			const title = `${rule[1]} <-> ${path.basename(opened.path)}`;
			vscode.commands.executeCommand("vscode.diff", uri1, opened, title);
			return true;
		}
	}
	return false;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('diffdefault', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return null;
		}
		const opened = editor.document.uri;
		// vscode.window.showInformationMessage(`${opened.path}`);

		const all_rules = vscode.workspace.getConfiguration('diffdefault').inspect<string[][]>("rules");
		const workspace = vscode.workspace.rootPath;
		if (handleRules(opened, all_rules?.workspaceFolderValue, workspace) ||
			handleRules(opened, all_rules?.workspaceValue, workspace) ||
			handleRules(opened, all_rules?.globalValue, workspace)) { }
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

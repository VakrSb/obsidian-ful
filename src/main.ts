import { App, Editor, MarkdownView, Menu, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export class ExamplePlugin extends Plugin {
  async onload() {
      }
}


class HtmlTag {
	tag_content: string;
	description: string;
	constructor(content: string, description:string){
		this.tag_content = content;
		this.description = description;
	}
	getStartTag(): string {
		return "<"+this.tag_content+">";
	}
	getEndingTag() : string {
		return "</"+this.tag_content+">";
	}
	getDesc(){
		return this.description;
	}
}

const tags = [
	new HtmlTag("u",""),
	new HtmlTag("b",""),
	new HtmlTag("i",""),
]

function underline(editor: Editor) {
	const selection = editor.getSelection();
	editor.replaceSelection("<u>" + selection + "</u>")

}

export default class MyPlugin extends Plugin {

	async onload() {
		await this.loadSettings();

		// this.registerEvent(
		// 	this.app.workspace.on('click', (event) => {
		//
		// 	})
		// );


		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			// console.log('click', evt);
			const editor = this.app.workspace.getActiveViewOfType(MarkdownView).editor;
			if (editor.somethingSelected()) {
				const menu = new Menu(this.app);
				tags.forEach((tag) => {
					menu.addItem((item) => {
						item
							.setTitle(tag)
							.setIcon("underline")
							.onClick(async () => {
								underline(editor);
							});
					});

				})
				menu.showAtMouseEvent(evt);
			}
		});


		// this.registerEvent(
		// 	this.app.workspace.on("editor-menu", (menu, editor, view) => {
		// 		if (editor.somethingSelected()) {
		// 			menu.addItem((item) => {
		// 				item
		// 					.setTitle("Underline selection")
		// 					.setIcon("underline")
		// 					.onClick(async () => {
		// 												});
		// 			});
		// 		}
		// 	})
		// );

	}

	onunload() {

	}

	async loadSettings() {
	}

	async saveSettings() {
	}
}

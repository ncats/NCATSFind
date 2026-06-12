This repository has been archived and is no longer maintained.The code is provided for historical reference and may contain unpatched or unknown vulnerabilities. It should not be used in production systems.

NCATSFind
=========
Browser plugin for resolving / rendering chemical structures from names and images.

In process of merging firefox and chrome code into single codebase

Interim build:

	Chrome:
		1) Run chromeBuild (bat or sh)
		2) In a chrome browser, navigate to : chrome://extensions/
		3) Make sure "Development Mode" is selected
		4) Click "Load unpacked extension..."
		5) Find the chromeBundle directory, and select it
	Firefox:
		1) Run firefoxBuild (bat or sh)
		2) In terminal, launch firefox SDK's "activate"
		3) Navigate to firefoxBundle directory
		4) Run "cfx run"
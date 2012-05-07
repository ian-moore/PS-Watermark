PS-Watermark
============

Watermarking Javascript class for Photoshop. Tested with Photoshop CS3 and CS5.5

Simply copy Watermark.js or Watermark.min.js into your script to have access. View Demo.js for sample use.

## Properties:

* **wmText**: The text of the watermark that will be overlayed on the image.

* **wmFont**: The font to be used for the text. Must be specified with a the PostScript name of the font. Default is **Arial-Black**.

* **preserveLayers**: Set if you would like the script to automatically merge the document layers after creating the watermark layer. Default is **true**.

## Methods:

* **render()**: Create a new layer in the active document and render the watermark text
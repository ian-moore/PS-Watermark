PS-Watermark
============

Watermarking Javascript class for Photoshop. Tested with Photoshop CS3 and CS5.5

Simply copy Watermark.js or Watermark.min.js into your script to have access. View Demo.jsx for sample use.

Zip Archive of all files available here: http://ian-moore.net/files/PS-Watermark.zip

### To use the demo

    1. Create a folder of only images, at least medium sized photos for best results. 
	   Use as many or as few images as you would like to try.

    2. Create another empty folder to easily locate the saved images after processing.

    3. Run the Demo.jsx file through Photoshop File->Scripts->Browse...

    4. Follow the prompts to select the correct folders.
	
	6. Allow the script to execute.

## Properties:

* **wmText**: The text of the watermark that will be overlayed on the image.

* **wmFont**: The font to be used for the text. Must be specified with a the PostScript name of the font. Default is **Arial-Black**.

* **preserveLayers**: Set if you would like the script to automatically merge the document layers after creating the watermark layer. Default is **true**.

## Methods:

* **render()**: Create a new layer in the active document and render the watermark text
// Begin Watermark namespace
var Watermark = (function(){

	// Emboss function (provided in PhotoShop sample scripts)
	var emboss = function(inAngle, inHeight, inAmount){
		var keyAngleID = charIDToTypeID("Angl");
		var keyHeightID = charIDToTypeID("Hght");
		var keyAmountID = charIDToTypeID("Amnt");
		var eventEmbossID = charIDToTypeID("Embs");
		
		var filterDescriptor = new ActionDescriptor();
		filterDescriptor.putInteger(keyAngleID, inAngle);
		filterDescriptor.putInteger(keyHeightID, inHeight);
		filterDescriptor.putInteger(keyAmountID, inAmount);

		executeAction(eventEmbossID, filterDescriptor);
	} //end emboss()
	
	return {
		wmText: "Your watermark text",  // The text used for the watermark
		wmFont: "Arial-Black",          // The postscript font name used for the text
		preserveLayers: false,          // Preserve the document layers or flatten the document
		
		// Render the watermark
		render: function(){
			//Save the initial PS settings
			var initialRulerUnits = app.preferences.rulerUnits;
			var initialTypeUnits = app.preferences.typeUnits;
			var initialDialogsMode = app.displayDialogs;
			
			//Set the settings to Pixels and disable warning dialogs
			app.preferences.rulerUnits = Units.PIXELS;
			app.preferences.typeUnits = TypeUnits.PIXELS;
			app.displayDialogs = DialogModes.NO;
			
			var doc = activeDocument; //Alias the active file
				
			var textLayer = doc.artLayers.add();                                       //Add a new layer to the document
			textLayer.kind = LayerKind.TEXT;                                           //Set the layer to a text layer
			var textRef = textLayer.textItem;                                          //Store the textitem in a new variable
			textRef.font = this.wmFont;                                                //Set the font (must use the postscript name of the font)
			textRef.size = 20;                                                         //Set the font size
			textRef.contents = this.wmText;                                            //Set the text contents
			textLayer.resize(100, 150);                                                //Resize the text to make it streched vertically
			var radians = Math.atan2(doc.height, doc.width);                           //Get the angle from the image's bottom left corner to top right corner
			var degrees = radians * (180/Math.PI);                                     //Convert to degrees
			textLayer.rotate(-degrees);                                                //Rotate the text to that angle
			textRef.position = [(doc.width-(doc.width*0.97)),doc.height];              //Position the layer near the bottom left corner
				
			var bounds = textLayer.bounds;                        //save the bounds of the text layer to a variable
			var topBound = String(bounds[1]);                     //Get the y-coordinate of the top left corner, convert to string
			topBound = topBound.split(" ");                       //Split the string to seperate the " px" from the value
			var rightBound = String(bounds[2]);                   //Get the y-coordinate of the bottom right corner, convert to string
			rightBound = rightBound.split(" ");                   //Split string
				
			while(topBound[0] > 15 && rightBound[0] < doc.width-15){     //While the bounds of the image are within the image
				textLayer.resize(102, 102, AnchorPosition.BOTTOMLEFT);     //Resize by 102%, keeping the image in the bottom left
				bounds = textLayer.bounds;                                 //Refresh the bounds (Stored as array of "# px")
				topBound = String(bounds[1]);                              
				topBound = topBound.split(" ");
				rightBound = String(bounds[2]);
				rightBound = rightBound.split(" ");
			}
				
			textLayer.rasterize(RasterizeType.ENTIRELAYER);   //Rasterize the text layer
			emboss(90, 5, 100);                          //Emboss the layer
			textLayer.blendMode = BlendMode.HARDLIGHT;        //Set the layer blend mode
			textLayer.opacity = 50;                           //Set the layer opacity
			
			if(!this.preserveLayers){
				doc.flatten();											  //Flatten the document
			}
			
			//Restore initial settings
			app.preferences.rulerUnits = initialRulerUnits;
			app.preferences.typeUnits = initialTypeUnits;
			app.displayDialogs = initialDialogsMode;
		} //end render()
	} //end return

}()); //end Watermark namespace
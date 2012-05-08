//Watermark.min.js
var Watermark=function(){var a=function(a,b,c){var d=charIDToTypeID("Angl");var e=charIDToTypeID("Hght");var f=charIDToTypeID("Amnt");var g=charIDToTypeID("Embs");var h=new ActionDescriptor;h.putInteger(d,a);h.putInteger(e,b);h.putInteger(f,c);executeAction(g,h)};return{wmText:"Your watermark text",wmFont:"Arial-Black",preserveLayers:false,render:function(){var b=app.preferences.rulerUnits;var c=app.preferences.typeUnits;var d=app.displayDialogs;app.preferences.rulerUnits=Units.PIXELS;app.preferences.typeUnits=TypeUnits.PIXELS;app.displayDialogs=DialogModes.NO;var e=activeDocument;var f=e.artLayers.add();f.kind=LayerKind.TEXT;var g=f.textItem;g.font=this.wmFont;g.size=20;g.contents=this.wmText;f.resize(100,150);var h=Math.atan2(e.height,e.width);var i=h*(180/Math.PI);f.rotate(-i);g.position=[e.width-e.width*.97,e.height];var j=f.bounds;var k=String(j[1]);k=k.split(" ");var l=String(j[2]);l=l.split(" ");while(k[0]>15&&l[0]<e.width-15){f.resize(102,102,AnchorPosition.BOTTOMLEFT);j=f.bounds;k=String(j[1]);k=k.split(" ");l=String(j[2]);l=l.split(" ")}f.rasterize(RasterizeType.ENTIRELAYER);a(90,5,100);f.blendMode=BlendMode.HARDLIGHT;f.opacity=50;if(!this.preserveLayers){e.flatten()}app.preferences.rulerUnits=b;app.preferences.typeUnits=c;app.displayDialogs=d}}}();

//Demo
var batchFolder = Folder.selectDialog("Select a folder of pictures to watermark.");
var saveFolder = Folder.selectDialog("Select a folder to save the watermarked pictures.");
var fileList = batchFolder.getFiles();

for(var i=0; i < fileList.length; i++){
	if((fileList[i] instanceof File) && (fileList[i].hidden == false)){
		var fileRef = open(fileList[i]);
		Watermark.wmText = "My Watermark Text";
		Watermark.wmFont = "Palatino-Roman";
		Watermark.render();
		
		var savePath = saveFolder.path+"/"+saveFolder.name+"/"+fileList[i].name;
		var saveFile = new File(savePath);
		var saveOptions = new JPEGSaveOptions();
		saveOptions.quality = 10;
		
		activeDocument.saveAs(saveFile, saveOptions, false, Extension.LOWERCASE);	
		activeDocument.close(SaveOptions.DONOTSAVECHANGES); 
	}
}

alert("Watermarked images have been saved to "+saveFolder.path+"/"+saveFolder.name);

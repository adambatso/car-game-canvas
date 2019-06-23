class CommonGraphicApi {

	constructor(canvasContext) {
		this.canvasContext = canvasContext;

	}
	drawBitmapCenteredWithRotation(imageElement, atX,atY, withAng) {
		this.canvasContext.save();
		this.canvasContext.translate(atX, atY);
		this.canvasContext.rotate(withAng);
		this.canvasContext.drawImage(imageElement, -imageElement.width/2, -imageElement.height/2, imageElement.width, imageElement.height);
		this.canvasContext.restore();
	}
	
	drawReactangle(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
		this.canvasContext.fillStyle = fillColor;
		this.canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
	}
	
  	drawCircle(centerX,centerY, radius, fillColor) {
		this.canvasContext.fillStyle = fillColor;
		this.canvasContext.beginPath();
		this.canvasContext.arc(centerX,centerY,radius,0,Math.PI * 2);
		this.canvasContext.fill();
	}
	
	drawText(text, x, y, fillColor, font = '14px ariel') {
		this.canvasContext.font = font;
		this.canvasContext.fillStyle = fillColor;
		this.canvasContext.fillText(text, x, y);
	}
}

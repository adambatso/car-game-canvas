class ProgressLoading {
    constructor(x, y, width, height, maxPrecentage, currentPresentage, borderColor, loadingColor) {
        this.x = x;
        this.y = y;
        this.borderColor = borderColor;
        this.loadingColor = loadingColor;
        this.width = width ;
        this.height = height ;
        this.multiply = this.width / 100;
        this.progressBarPresentacge = 1;
        this.maxPrecentage = maxPrecentage;
        this.currentPresentage = currentPresentage;
        this.drawLoading = this.drawLoading.bind(this);
        this.textX = this.x + this.width / 2;
        this.textY = this.y + this.height / 2 + 10;
    }

    drawLoading() {
        if (this.progressBarPresentacge < this.currentPresentage) { 
            this.progressBarPresentacge ++;
        }
        canvasApi.drawReactangle(0,0, canvas.width,canvas.height, 'black');

        canvasApi.drawReactangle(this.x - 1, this.y, this.width + 2, this.height + 2, this.borderColor)
        canvasApi.drawReactangle(this.x + 1, this.y + 2, this.progressBarPresentacge * this.multiply - 2, this.height - 2, this.loadingColor)
        canvasApi.drawText(this.progressBarPresentacge + '%', this.textX, this.textY, 'black', '20px ariel')
        if (this.progressBarPresentacge < this.maxPrecentage) {
            window.requestAnimationFrame(this.drawLoading);
        }
    }
}
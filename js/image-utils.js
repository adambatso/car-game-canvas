let ImageUtilsInstace = null;
class ImageUtils {

    constructor() {
        this.onLoadImage = this.onLoadImage.bind(this);
        this.imagesElements = {}; 
        this.imagePredix = './images/';
        this.imagesPath = ['player1car.png','track_flag.png','track_goal.png', 'track_road.png', 'track_tree.png', 'track_wall.png','car.png'];
        this.numerOfImagesToLoad = this.imagesPath.length;
    }
    static getInstace() {
        if (!ImageUtilsInstace) {
            ImageUtilsInstace = new ImageUtils();
        }
        return ImageUtilsInstace;
    }
    loadImages(afterLoadAllImagesCallBadck) {

        this.afterLoadCallBack = afterLoadAllImagesCallBadck
        this.imagesPath.forEach((imagePath) => {
            const imageElement = this.createImage(this.imagePredix +imagePath);
            this.imagesElements[imagePath] = imageElement;

        }) 
    }
    onLoadImage() {
        this.numerOfImagesToLoad --;
        this.onLoadCallback && this.onLoadCallback(this.numerOfImagesToLoad)
        console.log(this.numerOfImagesToLoad);
        if (this.numerOfImagesToLoad === 0) {
            this.afterLoadCallBack && this.afterLoadCallBack();
        }

    }

    createImage(imageSrc) {
        const imageElement = document.createElement('img');

        imageElement.onload = this.onLoadImage;
        imageElement.src = imageSrc;
        return imageElement;
    }

    
}

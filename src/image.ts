const acceptColorTypeList = ["BGR", "RGB"]
const changeColorTypeFucntions = {
  "BGR":{
    "BGR": (image) => {return image},
    "RGB": (image) => {image.map(x => {x.map(element => { return [element[2], element[1], element[0]]});});}
  },
  "RGB":{
    "BGR": (image) => {image.map(x => {x.map(element => { return [element[2], element[1], element[0]]});});},
    "RGB": (image) => {return image}
  }
}

class image<T> {
  image: Array<Array<T>>
  colorType: string

  constructor(image:Array<Array<T>>, colorType:string|null) {
    this.image = image;
    if(typeof colorType === undefined){
      this.colorType = "BGR";
    }
    else{
      this.colorType = colorType;
    }
  }

  /* getter */
  get getGrayScale() {
    let grayScaleImage: Array<Array<Number>>
    for(let x=0;x < this.image.length;x++){
      grayScaleImage.push([])
      for(let y=0;y < this.image[x].length;y++){
        if(this.colorType == "BGR"){
          grayScaleImage[x].push(0.114 * this.image[x][y][0] + 0.587 * this.image[x][y][1] + 0.299 * this.image[x][y][2])
        }
        else if(this.colorType == "RGB"){
          grayScaleImage[x].push(0.299 * this.image[x][y][0] + 0.587 * this.image[x][y][1] + 0.114 * this.image[x][y][2])
        }
      }
    }
    return grayScaleImage;
  }

  /* setter */
  set setNewImage(newImage:Array<Array<T>>) {
    this.image = newImage;
  }

  set changeColorType(newColorType:string){
    if(newColorType in acceptColorTypeList){
     this.image = changeColorTypeFucntions[this.colorType][newColorType](this.image);
     this.colorType = newColorType;
    }
    else{
      throw new Error("This colorType is not accept.")
    }
  }
}


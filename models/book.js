const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  coverImage: { //we store the encrypted string of the picture. and then on server that string decrypted back to image.
    type: Buffer, //buffer represent data of our entire image
    required: true
  },
  coverImageType: {  
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, //referencing to other obj.
    required: true,
    ref: 'Author'
  }
})

bookSchema.virtual('coverImagePath').get(function() {  //converting the data into proper images and show them
  if (this.coverImage != null && this.coverImageType != null) {
    //data is the source of image obj, allow us to take the buffer data.
    return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
  }
})

module.exports = mongoose.model('Book', bookSchema)
FilePond.registerPlugin(  //list of all the plugins we want to register/install.
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
)
//add a class of filepond to fileinput to be parsed by FilePond.parse
FilePond.setOptions({  //set all the options for filepond instances
  stylePanelAspectRatio: 150 / 100, //150 height and 100 width
  imageResizeTargetWidth: 100,
  imageResizeTargetHeight: 150
})

FilePond.parse(document.body); // turn all file inputs into file ponds input
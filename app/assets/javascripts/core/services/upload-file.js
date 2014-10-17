onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: 'server/upload/url', //upload.php script, node.js route, or servlet url
        //method: 'POST' or 'PUT',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
     }).progress(function(evt) {
       console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
     });
      //.error(...)
      //.then(success, error, progress);
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
   }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
 };

 define(['angular','file-upload','file-upload-shim'],function() {

   function FileUploadService($http, $upload) {
     this.$http = $http;
     this.$upload = $upload
  }

  ContactsService.$inject = ["$http", "angularFileUpload"];

  ContactsService.prototype = {
   //ng-file-drag-over-class="dragOverClass($event)"
   //ng-file-drop="onFileSelect($files)"
   //ng-file-drag-over-delay="100"
   dragOverClass: function($event) {
      var items = $event.dataTransfer.items;
      var hasFile = false;
      if (items != null) {
         for (var i = 0 ; i < items.length; i++) {
            if (items[i].kind == 'file') {
               hasFile = true;
               break;
            }
         }
      } else {
         hasFile = true;
      }
      return hasFile ? "dragover" : "dragover-err";
   },
   onFileSelect: function($files) {
    // $files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = this.$upload
      .upload({
        url: 'server/upload/url', //upload.php script, node.js route, or servlet url
        method: 'POST',
        /*headers: {'header-key': 'header-value'},
        withCredentials: true,*/
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files ($files) for html5 only
        /*fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        customize file formData name ('Content-Disposition'), server side file variable name.
        fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        formDataAppender: function(formData, key, val){}*/
     })
      .progress(function(evt) {
       console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    })
      .success(function(data, status, headers, config) {
       console.log(data);
    });
      /*.error(...)
      .then(success, error, progress);
      access or attach event listeners to the underlying XMLHttpRequest.
      .xhr(function(xhr){xhr.upload.addEventListener(...)})*/
      }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
   },
   getSpecs: function() {
      return this.$http.get("/Specialtys");
   },
   sendPost : function(post) {
      return this.$http.post("/WorkPosts", post);
   }
};

return ContactsService;
});

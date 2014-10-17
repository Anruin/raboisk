define([
 "./cool-dd",
 "./cool-upload",
 "./change-timeout",
 "./http-prefix"
 ], function(coolDd, coolUpload, changeTimeout, httpPrefix) {
    return {'coolDd' : coolDd,
            'coolUpload' : coolUpload,
            'changeTimeout' : changeTimeout,
            'httpPrefix' : httpPrefix};
 });

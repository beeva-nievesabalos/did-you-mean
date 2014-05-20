// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

exports.isEmpty = function(obj){
//function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}


exports.getSortedKeys = function(obj){
//function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

exports.getSortedKeysInverse = function(obj){
//function getSortedKeysInverse(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}


exports.omitirAcentos = function(text){
//function omitirAcentos(text) {
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç?¿";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";

    for (var j=0; j<text.length; j++) {
        for (var i=0; i<acentos.length; i++) {
            text = text.replace(acentos.charAt(i), original.charAt(i));
        }
       //text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    
    return text;
}

import RSVP from 'rsvp';
class Init {
    constructor(PSD) {
        PSD.fromURL = function(url) {
            return new RSVP.Promise(function(resolve, reject) {
                var xhr;
                xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = function() {
                    var data, psd;
                    data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
                    psd = new PSD(data);
                    psd.parse();
                    return resolve(psd);
                };
                return xhr.send(null);
            });
        };
        PSD.fromEvent = function(e) {
            return new RSVP.Promise(function(resolve, reject) {
                var file, reader;
                file = e.dataTransfer.files[0];
                reader = new FileReader();
                reader.onload = function(e) {
                    var psd;
                    psd = new PSD(new Uint8Array(e.target.result));
                    psd.parse();
                    return resolve(psd);
                };
                reader.onerror = reject;
                return reader.readAsArrayBuffer(file);
            });
        };
        PSD.fromDroppedFile = function(file) {
            return new RSVP.Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var psd;
                    psd = new PSD(new Uint8Array(e.target.result));
                    psd.parse();
                    return resolve(psd);
                };
                reader.onerror = reject;
                return reader.readAsArrayBuffer(file);
            });
        };
    }
}

export default Init

import request from 'request';

export function sendPost(url, data) {
    return new Promise((resolve, reject) => {
      request.post({url:url,formData:data}, function( error, response, body) {
        if(!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });

    });
}


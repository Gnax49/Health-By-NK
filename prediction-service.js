
const request = require('request').defaults({encoding: null});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
app.use(cors());


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({type: '*/*'}))


exports.getImageStremFromMessage =  (stream) => {
    var apiUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v1.1/Prediction/bd1ccb96-0bec-45b0-9ad7-5c037bae7361/image";
    return new Promise(function (resolve, reject) {
        var requestData = {
            url: apiUrl,
            encoding: 'binary',
            json: true,
            headers: {
                "Prediction-key": "47c61ad6fe624247ab0d120411e188b4",
                'content-type': 'application/octet-stream'
            }
        };

        stream.pipe(request.post(requestData, function (error, response, body) {
            if (error) {
                reject(error);
            } else if (response.statusCode !== 200) {
                reject(body);
            } else {
                resolve(extractTag(body));
            }
        }));
    });
};

const extractTag = (body) => {
   
     if (body) {
        console.log('====================================');
        console.log(body);
        console.log('====================================');
        var max = body.Predictions[0];
        for (let index = 0; index < body.Predictions.length; index++) {
            if( max.Probability < body.Predictions[index].Probability ) {
                max = body.Predictions[index];
            }
        }
       if(max.Tag == "Calbee_original") {
           return max.Tag+"มี แคลลอรี่ 70 kilocal นะ";
       }else if(max.Tag == "Koala_march_chicolate") {
           return max.Tag+"มี แคลลอรี่ 100 kilocal นะ";
       }else if(max.Tag == "Lays_spicy_smoked_cheese") {
           return max.Tag+"มี แคลลอรี่ 70 kilocal นะ";
       }else if(max.Tag == "Taokaenoi_big_sheet_original") {
           return max.Tag+"มี แคลลอรี่ 20 kilocal นะ";
       }else if(max.Tag == "Taro_barbq") {
           return max.Tag+"ไม่มีมี แคลลอรี่  จ๊ะ";
       }else if(max.Tag == "Taro_spicy") {
           return max.Tag+"ไม่มีมี แคลลอรี่  จ๊ะ";
       }else if(max.Tag == "Tasto_pla_sam_rod") {
           return max.Tag+"ไม่มีมี แคลลอรี่  จ๊ะ";
       }

        
    
        return max.Tag;
    }
    return null;
}

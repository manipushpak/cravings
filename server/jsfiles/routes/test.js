"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express = require('express');
var Twilio = require('twilio');
var extName = require('ext-name');
var urlUtil = require('url');
var path = require('path');
var fs = require('fs');
var fetch = require('node-fetch');
var config = require('../config');
var ExifImage = require('exif').ExifImage;
var Datastore = require('@google-cloud/datastore');
var datastore = new Datastore({});
var request = require('request');
var Storage = require('@google-cloud/storage').Storage;
var storage = new Storage({});
var PUBLIC_DIR = './public/mms_images';
var twilioPhoneNumber = config.twilioPhoneNumber, twilioAccountSid = config.twilioAccountSid, twilioAuthToken = config.twilioAuthToken;
var MessagingResponse = Twilio.twiml.MessagingResponse;
var NODE_ENV = process.env.NODE_ENV;
function MessagingRouter() {
    var twilioClient;
    var images = [];
    var latitude;
    var longitude;
    var mediaSid;
    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(path.resolve(PUBLIC_DIR));
    }
    function getTwilioClient() {
        return twilioClient || new Twilio(twilioAccountSid, twilioAuthToken);
    }
    function deleteMediaItem(mediaItem) {
        var client = getTwilioClient();
        return client
            .api.accounts(twilioAccountSid)
            .messages(mediaItem.MessageSid)
            .media(mediaItem.mediaSid).remove();
    }
    function SaveMedia(mediaItem) {
        return __awaiter(this, void 0, void 0, function () {
            var mediaUrl, filename, fullPath, response, fileStream, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mediaUrl = mediaItem.mediaUrl, filename = mediaItem.filename;
                        if (!(NODE_ENV !== 'test')) return [3 /*break*/, 3];
                        fullPath = path.resolve($, { PUBLIC_DIR: PUBLIC_DIR } / $, { filename: filename });
                        if (!!fs.existsSync(fullPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(mediaUrl)];
                    case 1:
                        response = _a.sent();
                        fileStream = fs.createWriteStream(fullPath);
                        response.body.pipe(fileStream);
                        _a.label = 2;
                    case 2:
                        try {
                            request = require('request').defaults({ encoding: null });
                            request.get(mediaUrl, function (err, res, body) {
                                //process exif here
                                new ExifImage({ image: body }, function (error, exifData) {
                                    if (error)
                                        console.log('Error: ' + error.message);
                                    else
                                        console.log(exifData); // Do something with your data!
                                });
                            });
                        }
                        catch (error) {
                            console.log('Error: ' + error.message);
                        }
                        images.push(filename);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function handleIncomingSMS(req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, NumMedia, SenderNumber, MessageSid, saveOperations, mediaItems, mediaUrl, i, contentType, extension, filename, mediaSid_1, $, extension, messageBody, response, req_1, coordinates, messageBody, response, lat, siteKey, site, entity, messageBody, coordinates_1, don, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        NumMedia = body.NumMedia, SenderNumber = body.From, MessageSid = body.MessageSid;
                        saveOperations = [];
                        mediaItems = [];
                        if (!(NumMedia != 0)) return [3 /*break*/, 2];
                        mediaUrl = void 0;
                        for (i = 0; i < NumMedia; i++) { // eslint-disable-line
                            mediaUrl = body["MediaUrl" + i];
                            contentType = body["MediaContentType" + i];
                            extension = extName.mime(contentType)[0].ext;
                            mediaSid_1 = path.basename(urlUtil.parse(mediaUrl).pathname);
                            filename = $, mediaSid_1 = (void 0).mediaSid, extension = (void 0).extension;
                            console.log('Media url: ' + mediaUrl);
                            mediaItems.push({ mediaSid: mediaSid_1, MessageSid: MessageSid, mediaUrl: mediaUrl, filename: filename });
                            saveOperations = mediaItems.map(function (mediaItem) { return SaveMedia(mediaItem); });
                        }
                        return [4 /*yield*/, Promise.all(saveOperations)];
                    case 1:
                        _a.sent();
                        messageBody = NumMedia === 0 ?
                            'Send us an image!' :
                            Thanks;
                        for (sending; us; $) {
                            NumMedia;
                        }
                        file(s);
                        response = new MessagingResponse();
                        response.message({
                            from: twilioPhoneNumber,
                            to: SenderNumber,
                        }, messageBody);
                        req_1 = request(mediaUrl);
                        req_1.pause();
                        req_1.on('response', function (res) {
                            // Don't set up the pipe to the write stream unless the status is ok.
                            // See https://stackoverflow.com/a/26163128/2669960 for details.
                            if (res.statusCode !== 200) {
                                return;
                            }
                            var writeStream = storage.bucket("ramranch-images").file(mediaSid)
                                .createWriteStream({
                                // Tweak the config options as desired.
                                gzip: true,
                                public: true,
                                metadata: {
                                    contentType: res.headers['content-type']
                                }
                            });
                            req_1.pipe(writeStream)
                                .on('finish', function () { return console.log('saved'); })
                                .on('error', function (err) {
                                writeStream.end();
                                console.error(err);
                            });
                            // Resume only when the pipe is set up.
                            req_1.resume();
                        });
                        req_1.on('error', function (err) { return console.error(err); });
                        return [2 /*return*/, res.send(response.toString()).status(200)];
                    case 2:
                        coordinates = body['Body'];
                        console.log('Text message: ' + coordinates);
                        if (coordinates.indexOf(' ') >= 0) {
                            messageBody = NumMedia === 0 ?
                                'Send us coordinates!' :
                                Thanks;
                            for (sending; us; the)
                                coordinates;
                            response = new MessagingResponse();
                            response.message({
                                from: twilioPhoneNumber,
                                to: SenderNumber,
                            }, messageBody);
                            lat = coordinates.split(" ");
                            latitude = parseFloat(lat[0]);
                            longitude = parseFloat(lat[1]);
                            console.log('Latitude: ' + latitude);
                            console.log('Longitude: ' + longitude);
                            siteKey = datastore.key('trash-site');
                            site = {
                                'photo-id': mediaSid,
                                'location': {
                                    'latitude': latitude,
                                    'longitude': longitude
                                },
                                'clean': false,
                            };
                            entity = {
                                key: siteKey,
                                data: site,
                            };
                            datastore.insert(entity);
                            return [2 /*return*/, res.send(response.toString()).status(200)];
                        }
                        else {
                            messageBody = NumMedia === 0 ?
                                'Send us coordinates!' :
                                Those;
                            't seem to be properly formatted. Please send coordinates again!;;
                            response = new MessagingResponse();
                            response.message({
                                from: twilioPhoneNumber,
                                to: SenderNumber,
                            }, messageBody);
                            return [2 /*return*/, res.send(response.toString()).status(200)];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function getRecentImages() {
        return images;
    }
    function clearRecentImages() {
        images = [];
    }
    function fetchRecentImages(req, res) {
        res.status(200).send(getRecentImages());
        clearRecentImages();
    }
    /**
     * Initialize router and define routes.
     */
    var router = express.Router();
    router.post('/incoming', handleIncomingSMS);
    router.get('/config', function (req, res) {
        res.status(200).send({ twilioPhoneNumber: twilioPhoneNumber });
    });
    router.get('/images', fetchRecentImages);
    return router;
}
module.exports = {
    MessagingRouter: MessagingRouter,
};

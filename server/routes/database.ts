import * as express from 'express';
const extName = require('ext-name');
const urlUtil = require('url');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const config = require('../config');
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({});
const request = require('request');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({});

const { NODE_ENV } = process.env; 

export default class Database {
  
  constructor(){}
  
 testing() {
    const userKey = datastore.key('user');
    var user = {
      'name' : "david",
    }
    var entity = {
      key: userKey,
      data: user,
    }
    datastore.insert(entity);

  }

}
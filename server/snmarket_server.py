# -*- coding: utf-8 -*-
# __author__ = chenzhengqiang
# __date__ = 2018-10-08

import sys  
reload(sys)  
sys.setdefaultencoding('utf8') 
sys.path.append("..")

import os
import argparse
import json
import codecs
from error import *
import pymongo
from pymongo import MongoClient
import tornado
import tornado.ioloop
import tornado.web
from tornado import gen
import time
import datetime
from datetime import timedelta, date


import re
import logging
logging.basicConfig(level=logging.DEBUG)


MAGIC_NO = "FrddDkrkR123#33#"
Nana = Error()

SNMARKET_TYPES={
    1:"rent",
    2:"selling",
    3:"shops",
    4:"recruit",
    5:"carpool",
    6:"flea"
}

class BaseHandler(tornado.web.RequestHandler):
     def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Content-type', 'application/json')


class UploadHandler(BaseHandler):
    def initialize(self, connections):
        self.connections = connections

    @tornado.web.asynchronous
    def post(self):
        logging.debug("receive a post request")
        metas = self.request.files.get("image", [])
        for meta in metas:
            upload_file = meta['filename']
            logging.debug("upload image name:{}".format(upload_file))
            with codecs.open(os.path.join('images', upload_file), 'wb', "utf-8") as up:
                up.write(meta['body'])

        try:
            params = json.loads(self.request.body)
            type_ = params.get('type', -1)
            data = params.get('data', {})
        except:
            type_ = -1
            data = {}
            logging.debug("request body invalid format")

        if type_ not in SNMARKET_TYPES or not data:
            self.finish({"code":Nana.invalid_param, "message":Message[Nana.invalid_param]})
        else:
            logging.debug("upload data:{}".format(data))
            data["_id"] = int(time.time())
            self.connections[type_].save(data)
            self.finish({"code": Nana.ok, "message":Message[Nana.ok]})

    @tornado.web.asynchronous
    def options(self):
        self.finish({"code":nana.ok})



if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("--server_port", type=int, default =80)
    parser.add_argument("--mongo_addr", type=str, default ="localhost")
    parser.add_argument("--mongo_port", type=int, default= 38438)
    FLAGS, unknown = parser.parse_known_args()

    mongo_conn = MongoClient(FLAGS.mongo_addr, FLAGS.mongo_port)
    snmarket = mongo_conn.snmarket
    # analysis10.authenticate("dev", "dev!1512.kang")


    connections = {
        1: snmarket.rent,
        2: snmarket.selling,
        3: snmarket.shops,
        4: snmarket.recruit,
        5: snmarket.carpool,
        6: snmarket.flea
    }

    application = tornado.web.Application([
        (r"/upload", UploadHandler, dict(connections=connections)),
    ])

    application.listen(FLAGS.server_port)
    tornado.ioloop.IOLoop.instance().start()

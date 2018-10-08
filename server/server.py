# -*- coding: utf-8 -*-
# __author__ = chenzhengqiang
# __date__ = 2018-01-18

import sys  
reload(sys)  
sys.setdefaultencoding('utf8') 
sys.path.append("..")

import os
import jieba
import jieba.posseg as pseg
import jieba.analyse

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
import celery_tasks

import re
import logging
logging.basicConfig(level=logging.INFO)

special_chars=u'[\u3000,\x08,\xa0,\x3000,\x20,\x14,\x01,\x00,\x04,\x1a,\x1b,\x11,\x00-\x08\x0b-\x0c\x0e-\x1f]'
MAGIC_NO = "FrddDkrkR123#33#"
nana = Error()

class BaseHandler(tornado.web.RequestHandler):
     def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Content-type', 'application/json')


class OriginsHandler(BaseHandler):
    def get_data(self, from_, size_):
        mongo_conn78 = MongoClient("10.5.0.78", 38000)
        brand_xml = mongo_conn78.brand_xml
        origins_set = brand_xml.origins
        data = {"total": origins_set.count(), "keys": []}

        for man_res in origins_set.find().skip(from_).limit(size_):
            data["keys"].append(man_res)

        return data

    @tornado.web.asynchronous
    def get(self):
        from_ = int(self.get_argument("from", 0))
        size_ = int(self.get_argument("size", 10))
        self.finish(self.get_data(from_, size_))

    @tornado.web.asynchronous
    def post(self):
        params = json.loads(self.request.body)
        key = params.get('key', "")
        flag = int(params.get('flag', -1))

        if not key or flag not in [1, 2, 3, 4]:
            self.finish({"code":nana.invalid_param, "message":Message[nana.invalid_param]})
        else:
            mongo_conn78 = MongoClient("10.5.0.78", 38000)
            mongo_set = mongo_conn78.brand_xml.origins
            mongo_set.update({"_id": key}, {"$set": {"man": flag}})
            self.finish({"code":nana.ok, "message":Message[nana.ok]})

    @tornado.web.asynchronous
    def options(self):
        self.finish({"code":nana.ok})


class UpdatesHandler(BaseHandler):
    @tornado.web.asynchronous
    def get(self):
        from_ = int(self.get_argument("from", 0))
        size = int(self.get_argument("size", 10))
        last = int(self.get_argument("last", 2)) + 1
        if last > 3:
            last += 1
        mongo_conn78 = MongoClient("10.5.0.78", 38000)
        brand_xml = mongo_conn78.brand_xml
        updates_set = brand_xml.updates
        days = []

        for day in range(2, last):
            last_day = datetime.date.today() - timedelta(days=day)
            last_day = last_day.strftime("%Y-%m-%d").replace("-", "")
            days.append(last_day)

        try:
            data = {"total": updates_set.find({"scraw_date": {"$in": days}}).count(), "keys": []}

            for update_res in updates_set.find({"scraw_date": {"$in": days}}).skip(from_).limit(size):
                data["keys"].append(update_res)
        except:
            data = {}
            self.finish({"code": nana.db_error, "message":Message[nana.db_error]})

        self.finish(data)

    @tornado.web.asynchronous
    def post(self):
        params = json.loads(self.request.body)
        key = params.get('key', "")
        flag = int(params.get('flag', -1))

        if not key or flag not in [1, 2, 3, 4]:
            self.finish({"code":nana.invalid_param, "message":Message[nana.invalid_param]})
        else:
            mongo_conn78 = MongoClient("10.5.0.78", 38000)
            mongo_set = mongo_conn78.brand_xml.updates
            mongo_set.update({"_id": key}, {"$set": {"man": flag}})
            self.finish({"code":nana.ok, "message":Message[nanna.ok]})

    @tornado.web.asynchronous
    def options(self):
        self.finish({"code":nana.ok})


class MergesHandler(BaseHandler):
    @tornado.web.asynchronous
    def get(self):
        from_ = int(self.get_argument("from", 0))
        size = int(self.get_argument("size", 10))
        mongo_conn78 = MongoClient("10.5.0.78", 38000)
        brand_xml = mongo_conn78.brand_xml
        merges_set = brand_xml.merges
        data = {"total": merges_set.count(), "keys": []}

        for merge_res in merges_set.find().skip(from_).limit(size):
            data["keys"].append(merge_res)
        self.finish(data)

    @tornado.web.asynchronous
    def options(self):
        self.finish({"code":nana.ok})

class ManHandler(BaseHandler):
    def initialize(self, connections):
        self.online_ask_good_set = connections["online_ask_good_set"]
        self.online_ask_real_set = connections["online_ask_real_set"]
        self.offline_ask_good_set = connections["offline_ask_good_set"]
        self.offline_ask_bad_set = connections["offline_ask_bad_set"]

        self.origins_set = connections["origins_set"]
        self.updates_set = connections["updates_set"]
        self.mans_set = connections["mans_set"]
        self.dr = re.compile(r'<[^>]+>', re.S)

    @tornado.web.asynchronous
    def get(self):
        from_ = int(self.get_argument("from", 0))
        size = int(self.get_argument("size", 10))
        mongo_conn78 = MongoClient("10.5.0.78", 38000)
        brand_xml = mongo_conn78.brand_xml
        mans_set = brand_xml.mans
        data = {"total": mans_set.count(), "keys": []}
        for man_res in mans_set.find().sort("upload_time",pymongo.DESCENDING).skip(from_).limit(size):
            data["keys"].append(man_res)
        self.finish(data)

    @tornado.web.asynchronous
    def post(self):
        try:
            params = json.loads(self.request.body)
            key = params.get('key', "")
            jk_id = params.get('id', -1)
        except:
            key = ""
            jk_id = -1

        if jk_id == -1:
            self.finish({"code":nana.invalid_param,"message":Message[nana.invalid_param]})
        else:
            if self.mans_set.find_one({"_id":key}):
                self.finish({"code":nana.key_duplicate, "message":Message[nana.key_duplicate]})
            else:
                ask_res = self.online_ask_good_set.find_one({"_id":jk_id})
                if not ask_res:
                    ask_res = self.online_ask_real_set.find_one({"_id":jk_id})
                if not ask_res:
                    ask_res = self.offline_ask_good_set.find_one({"_id":jk_id})
                if not ask_res:
                    ask_res = self.offline_ask_bad_set.find_one({"_id":jk_id})

                if not ask_res:
                    self.finish({"code":nana.id_not_exists,"message":Message[nana.id_not_exists]})
                else:
                    origin_data = {}
                    origin_data["_id"] = key
                    origin_data["title"] = ask_res["title"]
                    origin_data["answers"] = ask_res["ans_num"]
                    origin_data["doctor_answer"] = ""
                    origin_data["jk_id"] = jk_id
                    origin_data["upload_time"] = time.time()

                    try:
                        best_answer = ask_res["answer"][0]
                    except:
                        best_answer = []
                    if "best_score_subscript" in ask_res:
                        try:
                            best_answer = ask_res["answer"][int(ask_res["best_score_subscript"])]
                        except:
                            pass

                    if best_answer:
                        origin_data["doctor_answer"] = best_answer["answer_bqfx"] + best_answer["answer_zdyj"] + best_answer["answer_other"]
                        origin_data["doctor_answer"] = self.dr.sub('', origin_data["doctor_answer"])[0:250]
                        self.mans_set.save(origin_data)
                        self.finish({"code": nana.ok, "message":Message[nana.ok]})
                    else:
                        self.finish({"code":nana.db_error, "message":Message[nana.db_error]})

    @tornado.web.asynchronous
    def delete(self):
        key = self.get_argument("key", "")
        if not key:
            self.finish({"code":nana.invalid_param, "message":Message[nana.invalid_param]})
        else:
            mongo_conn78 = MongoClient("10.5.0.78", 38000)
            brand_xml = mongo_conn78.brand_xml
            mans_set = brand_xml.mans
            try:
                mans_set.remove({"_id": key})
            except:
                pass
            self.finish({"code":nana.ok, "message":Message[nana.ok]})

    @tornado.web.asynchronous
    def put(self):
        metas = self.request.files.get("file", [])
        upload_file = ""
        for meta in metas:
            upload_file = meta['filename']
            with codecs.open(os.path.join('uploads', upload_file), 'w', "utf-8") as up:
                up.write(meta['body'])
        try:
            lines = codecs.open(os.path.join('uploads', upload_file), 'r', "utf-8").readlines()
        except:
            lines = []

        for line in lines:
            data = line.split()
            key = data[0]
            try:
                jk_id = int(data[1])
            except:
                continue

            if not self.mans_set.find_one({"_id": key}):
                ask_res = self.online_ask_good_set.find_one({"_id": jk_id})
                if not ask_res:
                    ask_res = self.online_ask_real_set.find_one({"_id": jk_id})
                if not ask_res:
                    ask_res = self.offline_ask_good_set.find_one({"_id": jk_id})
                if not ask_res:
                    ask_res = self.offline_ask_bad_set.find_one({"_id": jk_id})

                if ask_res:
                    origin_data = {}
                    origin_data["_id"] = key
                    origin_data["title"] = ask_res["title"]
                    origin_data["answers"] = ask_res["ans_num"]
                    origin_data["doctor_answer"] = ""
                    origin_data["jk_id"] = jk_id
                    origin_data["upload_time"] = time.time()
                    try:
                        best_answer = ask_res["answer"][0]
                    except:
                        best_answer = []
                    if "best_score_subscript" in ask_res:
                        try:
                            best_answer = ask_res["answer"][int(ask_res["best_score_subscript"])]
                        except:
                            pass

                    if best_answer:
                        origin_data["doctor_answer"] = best_answer["answer_bqfx"] + best_answer["answer_zdyj"] + \
                                                       best_answer["answer_other"]
                        origin_data["doctor_answer"] = self.dr.sub('', origin_data["doctor_answer"])[0:250]
                        self.mans_set.save(origin_data)

        if not upload_file:
            self.finish({"code":nana.file_content_empty, "message":Message[nana.file_content_empty]})
        else:
            self.finish({"code":nana.ok, "message":Message[nana.ok]})

    @tornado.web.asynchronous
    def options(self):
        self.finish({"code":nana.ok})


class LexiconHandler(BaseHandler):
    @tornado.web.asynchronous
    def get(self):
        type_ = int(self.get_argument("type", 0))
        from_ = int(self.get_argument("from", 0))
        size_ = int(self.get_argument("size", 0))
        mongo_conn78 = MongoClient("10.5.0.78", 38000)
        keys = mongo_conn78.keys
        if type_ not in [0,1,2]:
            self.finish({"code": nana.invalid_param, "message": Message[nana.invalid_param]})
        else:
            mongo_set = None
            if type_ == 0:
                mongo_set = keys.weights
            elif type_ == 1:
                mongo_set = keys.shorts
            elif type_ == 2:
                mongo_set = keys.stops

            data = {"total":mongo_set.count(), "keys": []}

            for res in mongo_set.find().skip(from_).limit(size_):
                data["keys"].append(res)

            self.finish(data)

    @tornado.web.asynchronous
    def delete(self):
        key = self.get_argument("key", "")
        type_ = int(self.get_argument("type", 0))
        mongo_conn = MongoClient("10.5.0.78", 38000)
        keys = mongo_conn.keys

        if type_ == 0:
            mongo_set = keys.weights
        elif type_ == 1:
            mongo_set = keys.shorts
        else:
            mongo_set = keys.stops
        try:
            if key == MAGIC_NO:
                mongo_set.remove()
            else:
                mongo_set.remove({"_id": key})
        except:
            pass

        self.finish({"code":nana.ok, "message": Message[nana.ok]})

    @tornado.web.asynchronous
    def put(self):
        tp = int(self.get_argument('type', -1))
        if tp not in [0, 1, 2]:
            self.finish({"code":nana.invalid_param, "message": Message[nana.invalid_param]})
        else:
            mongo_conn78 = MongoClient("10.5.0.78", 38000)
            keys = mongo_conn78.keys
            weights_set = keys.weights
            shorts_set = keys.shorts
            stops_set = keys.stops

            metas = self.request.files["file"]
            for meta in metas:
                file_name = meta['filename']
                with codecs.open(os.path.join('uploads', file_name), 'w', "utf-8") as up:
                    up.write(meta['body'])
                lines = codecs.open(os.path.join('uploads', file_name), 'r', "utf-8").readlines()
                has_weights = False
                first = True
                for line in lines:
                    data = line.split()
                    if len(data) <=0:
                        continue  
                    if first:
                        first = False
                        if len(data) > 1:
                            has_weights = True
                    if tp == 0:
                        if has_weights is True:
                            weights_set.save({"_id": data[0].strip(), "weight": int(data[1])})
                    elif tp == 1:
                        shorts_set.save({"_id": data[0].strip().replace("\r\n", "").replace("\n", "")})
                    elif tp == 2:
                        stops_set.save({"_id": data[0].strip().replace("\r\n", "").replace("\n", "")})

            self.finish({"code":nana.ok, "message":Message[nana.ok]})

    @tornado.web.asynchronous
    def options(self):
        self.finish({"code":nana.ok})


class XmlHandler(BaseHandler):

    @tornado.web.asynchronous
    def options(self):
        self.finish({"code": nana.ok})

    @tornado.web.asynchronous
    def put(self):
        type_ = int(self.get_argument("type", 0))
        mongo_conn = MongoClient("10.5.0.78", 38000)
        status_set = mongo_conn.brand_xml.status
        if type_ == 0:
            status_set.update({"_id":"common"}, {"$set":{"status":0}})
        else:
            status_set.update({"_id":"search"}, {"$set":{"status":0}})

        self.finish({"code":nana.ok, "message":Message[nana.ok]})

    @tornado.web.asynchronous
    def post(self):
        params = json.loads(self.request.body)
        type_ = int(params.get('type', 0))

        mongo_conn = MongoClient("10.5.0.78", 38000)
        status_set = mongo_conn.brand_xml.status

        if type_ == 0:
            stat_res = status_set.find_one({"_id":"common"})
            if stat_res["status"] == 1:
                self.finish({"code":nana.xmling, "message":Message[nana.xmling]})
            else:
                status_set.update({"_id": "common"}, {"$set": {"status": 1}})
                celery_tasks.generates_common.delay()
                self.finish({"code": nana.ok, "message": Message[nana.ok]})
        else:
            stat_res = status_set.find_one({"_id": "search"})
            if stat_res["status"] == 1:
                self.finish({"code": nana.xmling, "message": Message[nana.xmling]})
            else:
                status_set.update({"_id": "search"}, {"$set": {"status": 1}})
                celery_tasks.generates_search.delay()
                self.finish({"code": nana.ok, "message": Message[nana.ok]})

    @tornado.web.asynchronous
    def get(self):
        xml_files = []
        try:
            from_ = int(self.get_argument("from", 0))
            size_ = int(self.get_argument("size", 10))
            type_ = int(self.get_argument("type", 0))

        except:
            from_ = 1
            size_ = 0
            type_ = -1

        if type_ not in [0,1,2,3] or from_ < 0 or size_ < 0 or from_ > size_:
            self.finish({"code":nana.invalid_param, "message":Message[nana.invalid_param]})
        else:
            xml_dir = "xmls"
            file_type = "pc"
            if type_ == 1:
                file_type = "wap"

            for root, dirs, files in os.walk(xml_dir):
                for f in files:
                    if type_ in [0,1] and f.find(file_type) == -1:
                        continue
                    if type_ == 2 and f.find("search") != -1:
                        continue
                    if type_ == 3 and f.find("search") == -1:
                        continue

                    file_ab_path = os.path.join(root, f)
                    time_array = time.localtime(os.path.getmtime(file_ab_path))

                    xml_files.append({
                        "file_name": f,
                        "file_size": round(os.path.getsize(file_ab_path) / float(1024 * 1024), 4),
                        "file_time": time.strftime('%Y-%m-%d %H:%M:%S', time_array)

                    })

            mongo_conn = MongoClient("10.5.0.78", 38000)
            status_set = mongo_conn.brand_xml.status
            data = {"code": 0, "message": "ok", "data": xml_files[from_:size_], "total": len(xml_files)}

            if type_ in [2,3]:
                _id = "common"
                if type_ == 3:
                    _id = "search"
                stat_res = status_set.find_one({"_id":_id})
                if stat_res["status"] == 0:
                    data["finished"] = 1
                else:
                    data["finished"] = 0

            self.finish(data)

    @tornado.web.asynchronous
    def delete(self):
        file_name = self.get_argument("file_name", "")
        try:
            os.remove(os.path.join("xmls", file_name))
        except:
            pass
        self.finish({"code": 0, "message": "ok"})


class SearchHandler(BaseHandler):
    @tornado.web.asynchronous
    def get(self):
        try:
            key = self.get_argument("key", "")
            tp = int(self.get_argument("type", 0))
        except:
            key = ""
            tp = -1
            self.finish({"code":nana.invalid_param, "message":Message[nana.invalid_param]})

        mongo_conn78 = MongoClient("10.5.0.78", 38000)
        brand_xml = mongo_conn78.brand_xml

        if tp == 0:
            mongo_set = brand_xml.origins
        elif tp == 1:
            mongo_set = brand_xml.updates
        elif tp == 2:
            key = int(key)
            mongo_set = brand_xml.merges
        else:
            mongo_set = brand_xml.origins

        keys = mongo_set.find_one({"_id":key})
        if keys:
            self.finish({"code":0,"message":"ok", "keys":[keys]})
        else:
            self.finish({"code":nana.db_error, "message":Message[nana.db_error], "keys": [keys]})

    @tornado.web.asynchronous
    def options(self):
        self.finish({"code": 0})

if __name__ == "__main__":

    mongo_conn = MongoClient("10.15.0.10", 38000)
    analysis10 = mongo_conn.real_analysis_data
    analysis10.authenticate("dev", "dev!1512.kang")

    mongo_conn = MongoClient("10.15.0.14", 38000)
    analysis14 = mongo_conn.analysis_data
    analysis14.authenticate("dev", "dev!1512.kang")

    mongo_conn = MongoClient("10.5.0.80", 38000)
    analysis_data = mongo_conn.analysis_data_120_up


    mongo_conn78 = MongoClient("10.5.0.78", 38000)
    brand_xml = mongo_conn78.brand_xml
    origins_set = brand_xml.origins
    updates_set = brand_xml.updates
    mans_set = brand_xml.mans

    connections = {
        "online_ask_good_set":analysis14.ask_good,
        "online_ask_real_set": analysis10.ask_good,
        "offline_ask_good_set":analysis_data.ask_good,
        "offline_ask_bad_set":analysis_data.ask_bad,
        "origins_set":origins_set,
        "updates_set":updates_set,
        "mans_set": mans_set,
    }

    application = tornado.web.Application([
        (r"/origins", OriginsHandler),
        (r"/updates", UpdatesHandler),
        (r"/merges",  MergesHandler),
        (r"/man", ManHandler, dict(connections=connections)),
        (r"/lexicon", LexiconHandler),
        (r"/xml", XmlHandler),
        (r"/search",SearchHandler),
    ])

    application.listen(80)
    tornado.ioloop.IOLoop.instance().start()

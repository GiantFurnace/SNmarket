# -*- coding: utf-8 -*-
# __author__ = chenzhengqiang
# __date__ = 2018-01-18

class Error(object):
    ok = 0
    invalid_param = 1
    frequent = 2
    server_error = 3

    '''
    error message description
    '''

Message={
        0:"ok",
        1:"invalid parameters",
        2:"request frequently",
        3:"server error",
    }
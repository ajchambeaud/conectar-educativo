#!/usr/bin/env python
# -*- coding: utf-8 -*-

import glob
import json
import os
import os.path
import shutil
import xml.etree.ElementTree as ET


def leer_xml(ruta, tipo_funcional):
    tree = ET.parse(ruta)
    root = tree.getroot()

    if int(root.find('tipo_funcional').attrib['id']) == tipo_funcional:

        data = {
            'id': int(root.find('id').text),
            'titulo': root.find('titulo').text.strip(),
            'descripcion': root.find('descripcion').text.strip(),

            #debug
            'tipo_funcional': (
                int(root.find('tipo_funcional').attrib['id']),
                root.find('tipo_funcional').attrib['value'],
            ),
            'tipo_rec_educativo': (
                int(root.find('tipo_rec_educativo').attrib['id']),
                root.find('tipo_rec_educativo').attrib['desc']
            ),
        }

        #copiar archivos
        try:
            data['screenshot'] = root.find('screenshots').findall('screenshot')[0].attrib['file']
        except:
            data['screenshot'] = ''

        data['archivo'] = root.find('tipo_funcional').find('video').find('file').text


        return data

    return False


RECURSOS_ORIGEN = '/home/alumno/MiEscritorio/repositorio/'
RECURSOS_DESTINO = '/home/alumno/ConectarEducativo'

EDUCAR_URL = 'http://www.educ.ar/sitios/educar/recursos/ver?id='

recursos = glob.glob('%s/*' % RECURSOS_ORIGEN)

ce_recursos = {'recursos': []}

"""
tipo_funcional:
    ('1', 'Unidad HTML')
    ('2', 'Video')
    ('7', 'Flash')

tipo_rec_educativo:
    (2, 'Video')
    (5, u'Infografía')
    (10, 'Actividades')
"""

fallaos = 0

for recurso in recursos:
    data = leer_xml('%s/info.xml' % recurso, tipo_funcional=2)

    if data:
        ce_data = {
            'id': data['id'],
            'titulo': data['titulo'],
            'descripcion': data['descripcion'],
            'url': '%s%s' % (EDUCAR_URL, data['id']),
            'entity': 'video'
        }

        os.makedirs(os.path.join(RECURSOS_DESTINO, str(data['id'])))

        try:
            shutil.copy(
                os.path.join(RECURSOS_ORIGEN, data['screenshot']),
                os.path.join(RECURSOS_DESTINO, str(data['id']), 'thumb.png')
            )
        except:
            pass
        try:
            shutil.copy(
                os.path.join(RECURSOS_ORIGEN, data['archivo']),
                os.path.join(RECURSOS_DESTINO, str(data['id']), 'video.mp4')
            )
        except:
            print os.path.join(RECURSOS_ORIGEN, data['archivo'])
            print "\n"

        ce_recursos['recursos'].append(ce_data)

with open('./data.json', 'w') as fp:
    fp.write(json.dumps(ce_recursos, fp, indent=4, ensure_ascii=False).encode('utf-8'))

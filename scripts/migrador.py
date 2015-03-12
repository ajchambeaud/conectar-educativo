#!/usr/bin/env python
# -*- coding: utf-8 -*-

import glob
import json
import xml.etree.ElementTree as ET


def leer_xml(ruta):
    tree = ET.parse(ruta)
    root = tree.getroot()

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

    return data


RECURSOS_ORIGEN = '/home/alumno/MiEscritorio/repositorio/'
RECURSOS_DESTINO = ''
EDUCAR_URL = 'http://www.educ.ar/sitios/educar/recursos/ver?id='

recursos = glob.glob('%s/*' % RECURSOS_ORIGEN)

ce_recursos = {'recursos': []}

for recurso in recursos:
    data = leer_xml('%s/info.xml' % recurso)

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

    if data['tipo_funcional'][0] == 2:
        ce_data = {
            'id': data['id'],
            'titulo': data['titulo'],
            'descripcion': data['descripcion'],
            'url': '%s%s' % (EDUCAR_URL, data['id']),
            'entity': 'video'
        }

        ce_recursos['recursos'].append(ce_data)

with open('./data.json', 'w') as fp:
    fp.write(json.dumps(ce_recursos, fp, indent=4, ensure_ascii=False).encode('utf-8'))

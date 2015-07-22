#!/usr/bin/env python
# -*- coding: utf-8 -*-

import argparse
import glob
import json
import os
import os.path
import shutil
import sys
import time
import xml.etree.ElementTree as ET


def nombre_funcional(id_tipo):
    data = {
        2: 'video',
        7: 'flash',
        1: 'html'
    }
    return data[id_tipo]


def crear_carpeta(destino, id_recurso):
    try:
        os.makedirs(os.path.join(destino, str(id_recurso)))
    except OSError, e:
        if e.errno != 17:
            raise
        pass

def crear_html(ruta):
    html = '''
<object width="100" height="100">
    <param name="movie" value="flash.swf">
    <embed src="flash.swf" width="750" height="562"></embed>
</object>
'''
    with open(ruta, 'w') as fp:
        fp.write(html)

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

        # Encontrar contenido
        if tipo_funcional ==  1:
            data['carpeta'] = os.path.dirname(
                root.find('tipo_funcional').find('unidadhtml').find('index_file').text
            )
            data['index'] = root.find('tipo_funcional').find('unidadhtml').find('index_file').text.split('/')[-1]

        elif tipo_funcional == 7:
            data['archivo'] = root.find('tipo_funcional').find('flash').find('file').text

        elif tipo_funcional == 2:
            data['archivo'] = root.find('tipo_funcional').find('video').find('file').text


        return data

    return False


EDUCAR_URL = 'http://www.educ.ar/sitios/educar/recursos/ver?id='


def migrar_contenidos(origen, destino, tipo_funcional):
    recursos = glob.glob('%s/*' % origen)
    ce_recursos = {'recursos': []}

    for recurso in recursos:
        data = leer_xml('%s/info.xml' % recurso, tipo_funcional=tipo_funcional)

        if data:
            print( 'Procesando recurso %s ...' % data['id'])

            ce_data = {
                'id': data['id'],
                'titulo': data['titulo'],
                'descripcion': data['descripcion'],
                'url': '%s%s' % (EDUCAR_URL, data['id']),
                'entity': 'video'
            }

            # Copiar contenido
            if tipo_funcional == 1: # HTML
                try:
                    shutil.copytree(
                        os.path.join(origen, data['carpeta']),
                        os.path.join(destino, str(data['id']))
                    )

                    if data['index'] != 'index.htm':
                        os.rename(
                            os.path.join(destino, str(data['id']), data['index']),
                            os.path.join(destino, str(data['id']), 'index.htm')
                        )

                except:
                    print('  --> ', os.path.join(origen, data['carpeta']))
                    raise

            elif tipo_funcional == 7: # FLASH
                crear_carpeta(destino, data['id'])

                try:
                    shutil.copy(
                        os.path.join(origen, data['archivo']),
                        os.path.join(destino, str(data['id']), 'flash.swf')
                    )
                    crear_html(os.path.join(destino, str(data['id']), 'index.htm'))

                except:
                    print('  --> ', os.path.join(origen, data['carpeta']))
                    raise

            elif tipo_funcional == 2: #VIDEO
                crear_carpeta(destino, data['id'])

                try:
                    shutil.copy(
                        os.path.join(origen, data['archivo']),
                        os.path.join(destino, str(data['id']), 'video.mp4')
                    )
                except:
                    print('  --> ', os.path.join(origen, data['archivo']))
                    #raise

            # Copiar miniatura
            try:
                shutil.copy(
                    os.path.join(origen, data['screenshot']),
                    os.path.join(destino, str(data['id']), 'thumb.png')
                )
            except:
                pass

            # Agregar dict al JSON
            ce_recursos['recursos'].append(ce_data)

    with open('./data_%s.json' % nombre_funcional(tipo_funcional), 'w') as fp:
        fp.write(json.dumps(ce_recursos, fp, indent=4, ensure_ascii=False).encode('utf-8'))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()

    parser.add_argument("origen",
                        help='Carpeta con contenidos de MiEscritorio.',
                        nargs='?',
                        default='/media/alumno/DATOS/contenido/MiEscritorio/repositorio/')

    parser.add_argument("destino",
                        help='Carpeta para contenidos de Conectar Educativo.',
                        nargs='?',
                        default='/home/alumno/ConectarEducativo')

    parser.add_argument("--recurso",
                        help='Tipo de recurso a migrar',
                        choices=['video', 'flash', 'html'],
                        default='video')

    args = parser.parse_args()

    print('')
    print('Origen : %s' % args.origen)
    print('Destino: %s' % args.destino)
    print('Recurso: %s' % args.recurso)
    print('')

    if not os.path.isdir(args.origen):
        raise os.error('La carpeta origen "%s" no existe!' % args.origen)

    if not os.path.isdir(args.destino):
        os.makedirs(args.destino)

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

    if args.recurso == 'video':
        tipo = 2
    elif args.recurso == 'flash':
        tipo = 7
    elif args.recurso == 'html':
        tipo = 1

    sys.stdout.write('Iniciando migrador, presione "Ctrl + C" para cancelar: ')
    for i in xrange(5, 0, -1):
        sys.stdout.write('%d ' % i)
        sys.stdout.flush()
        time.sleep(1)
    sys.stdout.write('\n')

    migrar_contenidos(args.origen, args.destino, tipo)

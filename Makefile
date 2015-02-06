VERSION="0.3.0"

N=\x1b[0m
V=\x1b[32;01m

all:
	@echo ""
	@echo " $(V)deps$(N)         Instala las dependencias necesarias."
	@echo " $(V)distwin$(N)      Genera las versiones para windows."
	@echo " $(V)deps$(N)         Instala las dependencias necesarias."
	@echo " $(V)dist$(N)         Genera las versiones compiladas de la aplicación."
	@echo " $(V)test_linux$(N)   Prueba la aplicacion usando nodewebkit en linux."
	@echo " $(V)test_mac$(N)     Prueba la aplicacion usando nodewebkit en mac osx."
	@echo " $(V)run_tests$(N)    Ejecuta todos los tests de la aplicación."
	@echo ""

deps:
	npm install

test_linux:
	nw src

distwin:
	rm -r -f distwin
	sh extras/distwin.sh
	makensis distwin/instalador.nsi
	mv distwin/conectar-educativo_0.3.0.exe dist/
	open dist


test_mac:
	@echo "Cuidado - se está usando la version de nodewebkit del sistema."
	open -a /Applications/node-webkit.app --args /Users/hugoruscitti/proyectos/conectar-educativo/src

run_tests:
	./node_modules/karma/bin/karma start

dist:
	grunt nodewebkit

.PHONY: test dist distwin

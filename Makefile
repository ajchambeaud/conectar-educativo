N=\x1b[0m
V=\x1b[32;01m

all:
	@echo ""
	@echo " $(V)deps$(N)         Instala las dependencias necesarias."
	@echo " $(V)test_linux$(N)   Prueba la aplicacion usando nodewebkit en linux."
	@echo " $(V)test_mac$(N)     Prueba la aplicacion usando nodewebkit en mac osx."
	@echo ""

deps:
	npm install

test_linux:
	nw src

test_mac:
	@echo "Cuidado - se está usando la version de nodewebkit del sistema."
	open -a /Applications/node-webkit.app src

.PHONY: test

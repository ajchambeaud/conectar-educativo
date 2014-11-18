rm -r -f distwin
rm -r -f distwin.zip 
rm -r -f conectar-educativo.nw
rm -r -f /Users/hugoruscitti/shared/conectar-educativo.nw

mkdir distwin
cp -r -f src/* distwin
mkdir distwin/node_modules
cp -r -f node_modules/ffthumb distwin/node_modules/
cp -r -f node_modules/nedb distwin/node_modules/
cp -r -f node_modules/fs-extra distwin/node_modules/
cd distwin
zip -r distwin.zip *
mv distwin.zip ..
cd ..
mv distwin.zip conectar-educativo.nw
rm -r -f distwin/*

#cp conectar-educativo.nw /Users/hugoruscitti/shared/

cp extras/bins/* distwin/
mv conectar-educativo.nw distwin/
cat distwin/nw.exe distwin/conectar-educativo.nw > distwin/conectar-educativo.exe
rm distwin/nw.exe distwin/conectar-educativo.nw 

cp -rf distwin ../../shared/



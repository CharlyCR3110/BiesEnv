@echo off
set JAVA_VERSION=jdk-21
set JAVA_HOME="C:\Program Files\Java\%JAVA_VERSION%"
set PATH=%JAVA_HOME%\bin;%PATH%
set ANTLR4_HOME=..\..\..\lib\antlr-4.13.1-complete.jar
set GRAMMAR=biesASM.g4
REM
rmdir /S /Q src\asm\antlr\parser
java -jar %ANTLR4_HOME% -no-listener -visitor -o ..\antlr\parser -Dlanguage=JavaScript %GRAMMAR%
pause
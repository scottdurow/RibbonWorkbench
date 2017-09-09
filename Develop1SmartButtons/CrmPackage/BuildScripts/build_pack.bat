REM VSTS Release Script
@echo off
set connection=%~1
set password=%~2
set package_root=..\..\

REM Find the spkl in the folder and sub-folders
For /R %package_root% %%G IN (spkl.exe) do (
	IF EXIST "%%G" (set spkl_path=%%G
	goto :continue)
	)

:continue
@echo Using %spkl_path% 

REM spkl pack [path] [connection-string] [/p:release]
"%spkl_path%" import "%cd%\.." "%connection%%password%"

exit /b %errorlevel%
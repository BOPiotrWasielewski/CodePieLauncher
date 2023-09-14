#define MyAppName "Pie Launcher"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Piotr Wasielewski"
#define MyAppURL "https://codepie.pl"
#define MyAppExeName "Pie Launcher.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{5038F7A3-6FF8-4374-860B-A70D88CEF39B}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\PieLauncher
DefaultGroupName={#MyAppName}
AllowNoIcons=yes
; Uncomment the following line to run in non administrative install mode (install for current user only.)
;PrivilegesRequired=lowest
OutputDir=S:\_Projects\CodePieLauncher\installer
OutputBaseFilename=pielauncher-setup-{#MyAppVersion}
SetupIconFile=S:\_Projects\CodePieLauncher\build\icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "polish"; MessagesFile: "compiler:Languages\Polish.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\{#MyAppExeName}"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\chrome_100_percent.pak"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\chrome_200_percent.pak"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\d3dcompiler_47.dll"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\ffmpeg.dll"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\icudtl.dat"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\libEGL.dll"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\libGLESv2.dll"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\LICENSE.electron.txt"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\LICENSES.chromium.html"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\resources.pak"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\snapshot_blob.bin"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\v8_context_snapshot.bin"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\vk_swiftshader.dll"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\vk_swiftshader_icd.json"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\vulkan-1.dll"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\locales\*"; DestDir: "{app}\bin\locales"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "S:\_Projects\CodePieLauncher\dist\win-unpacked\resources\*"; DestDir: "{app}\bin\resources"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\bin\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\bin\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\bin\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

